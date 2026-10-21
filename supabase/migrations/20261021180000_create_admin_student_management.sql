-- Migration: 20261021180000_create_admin_student_management.sql
-- Description: Suporte a cadastro administrativo de alunos e permissões de acesso fechado.

-- 1. Adicionar campos informativos de controle na tabela access_grants se não existirem
alter table public.access_grants
  add column if not exists full_name text,
  add column if not exists initial_level text default 'A1' check (initial_level in ('A1', 'A2', 'B1', 'B2')),
  add column if not exists notes text;

-- 2. Adicionar flag de senha temporária no perfil se não existir
alter table public.profiles
  add column if not exists is_temporary_password boolean not null default false,
  add column if not exists first_login_completed boolean not null default false;

-- 3. RPC para Administrador cadastrar aluno com controle de allowlist e auditoria
create or replace function public.admin_register_student(
  p_email text,
  p_full_name text,
  p_initial_level text default 'A1',
  p_notes text default null
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

  insert into public.access_grants (
    email,
    role,
    status,
    full_name,
    initial_level,
    notes,
    invited_by,
    updated_at
  ) values (
    lower(trim(p_email)),
    'student',
    'active',
    trim(p_full_name),
    p_initial_level,
    p_notes,
    v_caller,
    now()
  )
  on conflict (email) do update set
    status = 'active',
    full_name = excluded.full_name,
    initial_level = excluded.initial_level,
    notes = excluded.notes,
    updated_at = now()
  returning * into v_grant;

  -- Registrar no Audit Log
  insert into public.audit_log (
    actor_id,
    event,
    target_type,
    target_id,
    metadata
  ) values (
    v_caller,
    'student_registered',
    'access_grants',
    v_grant.id::text,
    jsonb_build_object(
      'email', v_grant.email,
      'full_name', v_grant.full_name,
      'initial_level', v_grant.initial_level
    )
  );

  return jsonb_build_object(
    'success', true,
    'student', row_to_json(v_grant)
  );
end;
$$;

revoke execute on function public.admin_register_student(text, text, text, text) from public, anon;
grant execute on function public.admin_register_student(text, text, text, text) to authenticated;
