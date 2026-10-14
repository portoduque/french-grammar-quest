-- Migration: 20261014200000_create_admin_and_editorial.sql
-- Description: Implementa workflow de publicação, gestão de convites com expiração,
-- auditoria (audit_log), pendências editoriais (editorial_issues), bloqueio seguro de conteúdo
-- e integridade de aprovação editorial (Etapa 7).

-- 1. Regra de Integridade: Nenhuma release publicada sem aprovação editorial e liberação de direitos (RF-061, RF-062)
alter table public.content_releases
  drop constraint if exists content_releases_published_check;

alter table public.content_releases
  add constraint content_releases_published_check
  check (status != 'published' or (editorial_approved = true and rights_cleared = true));

-- 2. Tabela de Pendências Editoriais (Editorial Issues — RF-068)
create table if not exists public.editorial_issues (
  id uuid primary key default gen_random_uuid(),
  chapter_id text references public.chapters(id) on delete cascade,
  question_id text references public.questions(id) on delete cascade,
  page_number int,
  severity text not null default 'medium' check (severity in ('low', 'medium', 'high', 'blocker')),
  issue_type text not null check (issue_type in ('typo', 'pedagogical_clarity', 'rights', 'alternative_missing', 'formatting', 'other')),
  description text not null,
  status text not null default 'open' check (status in ('open', 'in_review', 'resolved', 'wont_fix')),
  reported_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create index if not exists editorial_issues_ch_idx on public.editorial_issues(chapter_id);
create index if not exists editorial_issues_status_idx on public.editorial_issues(status);

alter table public.editorial_issues enable row level security;

create policy "editorial_issues_admin_manage" on public.editorial_issues
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Seed de pendência conhecida do PRD §22.2 (Página 28 do livro-fonte com corte visual)
insert into public.editorial_issues (
  chapter_id,
  page_number,
  severity,
  issue_type,
  description,
  status
) values (
  'ch01',
  28,
  'low',
  'formatting',
  'Source page 28 is visually clipped in original scan; manual visual check confirmed text is covered in digital exercises.',
  'resolved'
) on conflict do nothing;

-- 3. RPC para Criação de Convites com Expiração e Auditoria (RF-006, UX-16, RF-067)
create or replace function public.admin_create_access_grant(
  p_email text,
  p_role text default 'student',
  p_expires_days int default 7
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_caller uuid := auth.uid();
  v_grant public.access_grants%rowtype;
  v_expires timestamptz;
begin
  if not public.is_admin() then
    raise exception 'Accès refusé : privilèges administrateur requis';
  end if;

  if p_expires_days is not null and p_expires_days > 0 then
    v_expires := now() + (p_expires_days || ' days')::interval;
  end if;

  insert into public.access_grants (
    email,
    role,
    status,
    invited_by,
    expires_at,
    updated_at
  ) values (
    lower(trim(p_email)),
    p_role,
    'pending',
    v_caller,
    v_expires,
    now()
  )
  on conflict (email) do update set
    role = excluded.role,
    status = 'pending',
    expires_at = excluded.expires_at,
    invited_by = excluded.invited_by,
    updated_at = now()
  returning * into v_grant;

  -- Registrar no Audit Log (RF-067)
  insert into public.audit_log (
    actor_id,
    event,
    target_type,
    target_id,
    metadata
  ) values (
    v_caller,
    'invite_created',
    'access_grants',
    v_grant.id::text,
    jsonb_build_object(
      'email', v_grant.email,
      'role', v_grant.role,
      'expires_at', v_grant.expires_at
    )
  );

  return jsonb_build_object(
    'success', true,
    'grant', row_to_json(v_grant)
  );
end;
$$;

-- 4. RPC para Revogação de Convites com Auditoria
create or replace function public.admin_revoke_access_grant(
  p_grant_id uuid
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_caller uuid := auth.uid();
  v_grant public.access_grants%rowtype;
begin
  if not public.is_admin() then
    raise exception 'Accès refusé : privilèges administrateur requis';
  end if;

  update public.access_grants
  set status = 'revoked', updated_at = now()
  where id = p_grant_id
  returning * into v_grant;

  if v_grant.id is null then
    raise exception 'Invitation introuvable';
  end if;

  -- Registrar no Audit Log
  insert into public.audit_log (
    actor_id,
    event,
    target_type,
    target_id,
    metadata
  ) values (
    v_caller,
    'invite_revoked',
    'access_grants',
    p_grant_id::text,
    jsonb_build_object('email', v_grant.email)
  );

  return jsonb_build_object('success', true, 'grant', row_to_json(v_grant));
end;
$$;

-- 5. RPC para Publicação Segura de Content Release (RF-061, RF-062)
create or replace function public.admin_publish_release(
  p_release_id uuid
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_caller uuid := auth.uid();
  v_rel public.content_releases%rowtype;
begin
  if not public.is_admin() then
    raise exception 'Accès refusé : privilèges administrateur requis';
  end if;

  select * into v_rel from public.content_releases where id = p_release_id;
  if v_rel.id is null then
    raise exception 'Release introuvable';
  end if;

  if not v_rel.editorial_approved then
    raise exception 'Publication impossible : approbation éditoriale requise (RF-061)';
  end if;

  if not v_rel.rights_cleared then
    raise exception 'Publication impossible : libération des droits requise (RF-062)';
  end if;

  update public.content_releases
  set status = 'published', published_at = now()
  where id = p_release_id
  returning * into v_rel;

  -- Atualizar capítulos associados para 'published'
  update public.chapters
  set editorial_status = 'published', updated_at = now()
  where release_id = p_release_id and editorial_status != 'blocked';

  -- Registrar Audit Log
  insert into public.audit_log (
    actor_id,
    event,
    target_type,
    target_id,
    metadata
  ) values (
    v_caller,
    'content_published',
    'content_releases',
    p_release_id::text,
    jsonb_build_object('version', v_rel.version)
  );

  return jsonb_build_object('success', true, 'release', row_to_json(v_rel));
end;
$$;

-- 6. RPC para Bloqueio ou Alteração de Status Editorial de Capítulo (RF-064)
create or replace function public.admin_set_chapter_status(
  p_chapter_id text,
  p_status text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_caller uuid := auth.uid();
  v_ch public.chapters%rowtype;
begin
  if not public.is_admin() then
    raise exception 'Accès refusé : privilèges administrateur requis';
  end if;

  if p_status not in ('draft', 'machine_validated', 'editorial_approved', 'published', 'blocked') then
    raise exception 'Statut éditorial invalide';
  end if;

  update public.chapters
  set editorial_status = p_status, updated_at = now()
  where id = p_chapter_id
  returning * into v_ch;

  if v_ch.id is null then
    raise exception 'Chapitre introuvable';
  end if;

  -- Registrar Audit Log
  insert into public.audit_log (
    actor_id,
    event,
    target_type,
    target_id,
    metadata
  ) values (
    v_caller,
    'chapter_status_changed',
    'chapters',
    p_chapter_id,
    jsonb_build_object('new_status', p_status, 'title', v_ch.title)
  );

  return jsonb_build_object('success', true, 'chapter', row_to_json(v_ch));
end;
$$;

-- 7. RPC para Resolução de Pendências Editoriais (RF-068)
create or replace function public.admin_resolve_editorial_issue(
  p_issue_id uuid,
  p_resolution_status text default 'resolved'
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_caller uuid := auth.uid();
  v_issue public.editorial_issues%rowtype;
begin
  if not public.is_admin() then
    raise exception 'Accès refusé : privilèges administrateur requis';
  end if;

  update public.editorial_issues
  set status = p_resolution_status, resolved_at = now()
  where id = p_issue_id
  returning * into v_issue;

  if v_issue.id is null then
    raise exception 'Signalement introuvable';
  end if;

  -- Registrar Audit Log
  insert into public.audit_log (
    actor_id,
    event,
    target_type,
    target_id,
    metadata
  ) values (
    v_caller,
    'editorial_issue_resolved',
    'editorial_issues',
    p_issue_id::text,
    jsonb_build_object('status', p_resolution_status)
  );

  return jsonb_build_object('success', true, 'issue', row_to_json(v_issue));
end;
$$;

-- 8. Permissões de Execução Estritas
revoke execute on function public.admin_create_access_grant(text, text, int) from public, anon;
revoke execute on function public.admin_revoke_access_grant(uuid) from public, anon;
revoke execute on function public.admin_publish_release(uuid) from public, anon;
revoke execute on function public.admin_set_chapter_status(text, text) from public, anon;
revoke execute on function public.admin_resolve_editorial_issue(uuid, text) from public, anon;

grant execute on function public.admin_create_access_grant(text, text, int) to authenticated;
grant execute on function public.admin_revoke_access_grant(uuid) to authenticated;
grant execute on function public.admin_publish_release(uuid) to authenticated;
grant execute on function public.admin_set_chapter_status(text, text) to authenticated;
grant execute on function public.admin_resolve_editorial_issue(uuid, text) to authenticated;
