-- Migration: 20261014180000_create_sessions_and_progress.sql
-- Description: Implementa tabelas de sessões de estudo, tentativas, progresso do usuário,
-- ledger de XP idempotente e funções RPC confiáveis com RLS estrito (Etapa 5).

-- 1. Tabela de Sessões de Estudo
create table if not exists public.study_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  exercise_set_id text not null references public.exercise_sets(id) on delete cascade,
  chapter_id text not null references public.chapters(id) on delete cascade,
  status text not null default 'in_progress' check (status in ('in_progress', 'completed', 'abandoned')),
  current_question_index int not null default 0,
  total_questions int not null default 0,
  correct_count int not null default 0,
  reviewed_count int not null default 0,
  earned_xp int not null default 0,
  stars int not null default 0 check (stars between 0 and 3),
  content_version text not null default 'v1.0.0',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz
);

create index if not exists study_sessions_user_status_idx on public.study_sessions(user_id, status);
create index if not exists study_sessions_user_set_idx on public.study_sessions(user_id, exercise_set_id);

-- 2. Tabela de Tentativas de Questões (Histórico / Append-only)
create table if not exists public.question_attempts (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.study_sessions(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  question_id text not null references public.questions(id) on delete cascade,
  user_answer text not null,
  evaluation_status text not null check (evaluation_status in ('correct', 'incorrect', 'needs_review', 'self_reviewed', 'blocked', 'ungradable')),
  score numeric(3, 2) not null default 0.00,
  created_at timestamptz not null default now(),
  constraint question_attempts_session_question_uniq unique (session_id, question_id)
);

create index if not exists question_attempts_session_idx on public.question_attempts(session_id);
create index if not exists question_attempts_user_q_idx on public.question_attempts(user_id, question_id);

-- 3. Tabela de Progresso Consolidado do Usuário por Série
create table if not exists public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  chapter_id text not null references public.chapters(id) on delete cascade,
  exercise_set_id text not null references public.exercise_sets(id) on delete cascade,
  status text not null default 'not_started' check (status in ('not_started', 'in_progress', 'completed')),
  best_stars int not null default 0 check (best_stars between 0 and 3),
  accuracy_percent int not null default 0 check (accuracy_percent between 0 and 100),
  attempts_count int not null default 0,
  last_attempted_at timestamptz not null default now(),
  constraint user_progress_user_set_uniq unique (user_id, exercise_set_id)
);

create index if not exists user_progress_user_ch_idx on public.user_progress(user_id, chapter_id);

-- 4. Ledger de Transações de XP (Imutável e Idempotente)
create table if not exists public.xp_ledger (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  question_id text references public.questions(id) on delete set null,
  exercise_set_id text references public.exercise_sets(id) on delete set null,
  amount int not null,
  reward_type text not null check (reward_type in ('first_correct', 'session_completed', 'self_review', 'streak_bonus', 'admin_adjustment')),
  content_version text not null default 'v1.0.0',
  created_at timestamptz not null default now()
);

-- Índices parciais para garantir unicidade estrita de cada recompensa
create unique index if not exists xp_ledger_question_reward_uniq
  on public.xp_ledger(user_id, question_id, content_version, reward_type)
  where question_id is not null;

create unique index if not exists xp_ledger_set_reward_uniq
  on public.xp_ledger(user_id, exercise_set_id, content_version, reward_type)
  where exercise_set_id is not null and reward_type = 'session_completed';

create index if not exists xp_ledger_user_idx on public.xp_ledger(user_id);

-- 5. Habilitar RLS em todas as 4 tabelas
alter table public.study_sessions enable row level security;
alter table public.question_attempts enable row level security;
alter table public.user_progress enable row level security;
alter table public.xp_ledger enable row level security;

-- 6. Políticas de RLS
-- study_sessions
create policy "study_sessions_select_own" on public.study_sessions
  for select to authenticated
  using (auth.uid() = user_id or public.is_admin());

create policy "study_sessions_insert_own" on public.study_sessions
  for insert to authenticated
  with check (auth.uid() = user_id or public.is_admin());

create policy "study_sessions_update_own" on public.study_sessions
  for update to authenticated
  using (auth.uid() = user_id or public.is_admin())
  with check (auth.uid() = user_id or public.is_admin());

-- question_attempts
create policy "question_attempts_select_own" on public.question_attempts
  for select to authenticated
  using (auth.uid() = user_id or public.is_admin());

create policy "question_attempts_insert_own" on public.question_attempts
  for insert to authenticated
  with check (auth.uid() = user_id or public.is_admin());

-- user_progress
create policy "user_progress_select_own" on public.user_progress
  for select to authenticated
  using (auth.uid() = user_id or public.is_admin());

create policy "user_progress_insert_own" on public.user_progress
  for insert to authenticated
  with check (auth.uid() = user_id or public.is_admin());

create policy "user_progress_update_own" on public.user_progress
  for update to authenticated
  using (auth.uid() = user_id or public.is_admin())
  with check (auth.uid() = user_id or public.is_admin());

-- xp_ledger: Estudantes só podem ler seu próprio extrato (T-010: nunca inserem XP direto)
create policy "xp_ledger_select_own" on public.xp_ledger
  for select to authenticated
  using (auth.uid() = user_id or public.is_admin());

create policy "xp_ledger_admin_manage" on public.xp_ledger
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- 7. Funções RPC Confiáveis (Security Definer)

-- 7.1 Iniciar ou Retomar Sessão de Estudo (AC-03, T-018)
create or replace function public.start_or_resume_session(
  p_exercise_set_id text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_session public.study_sessions%rowtype;
  v_chapter_id text;
  v_total_questions int;
  v_content_version text := 'v1.0.0';
begin
  if v_user_id is null then
    raise exception 'Utilisateur non authentifié';
  end if;

  -- 1. Buscar capítulo e total de questões do set
  select chapter_id, questions_count into v_chapter_id, v_total_questions
  from public.exercise_sets
  where id = p_exercise_set_id;

  if v_chapter_id is null then
    raise exception 'Exercice introuvable : %', p_exercise_set_id;
  end if;

  -- 2. Tentar recuperar sessão em andamento do usuário para este set
  select * into v_session
  from public.study_sessions
  where user_id = v_user_id
    and exercise_set_id = p_exercise_set_id
    and status = 'in_progress'
  order by updated_at desc
  limit 1;

  -- 3. Se não houver sessão ativa, criar uma nova
  if v_session.id is null then
    insert into public.study_sessions (
      user_id,
      exercise_set_id,
      chapter_id,
      status,
      current_question_index,
      total_questions,
      content_version
    ) values (
      v_user_id,
      p_exercise_set_id,
      v_chapter_id,
      'in_progress',
      0,
      v_total_questions,
      v_content_version
    )
    returning * into v_session;

    -- Registrar progresso inicial
    insert into public.user_progress (
      user_id,
      chapter_id,
      exercise_set_id,
      status,
      attempts_count,
      last_attempted_at
    ) values (
      v_user_id,
      v_chapter_id,
      p_exercise_set_id,
      'in_progress',
      1,
      now()
    )
    on conflict (user_id, exercise_set_id) do update set
      status = case when user_progress.status = 'completed' then 'completed' else 'in_progress' end,
      attempts_count = user_progress.attempts_count + 1,
      last_attempted_at = now();
  end if;

  return jsonb_build_object(
    'session_id', v_session.id,
    'exercise_set_id', v_session.exercise_set_id,
    'chapter_id', v_session.chapter_id,
    'status', v_session.status,
    'current_question_index', v_session.current_question_index,
    'total_questions', v_session.total_questions,
    'correct_count', v_session.correct_count,
    'reviewed_count', v_session.reviewed_count,
    'earned_xp', v_session.earned_xp,
    'content_version', v_session.content_version
  );
end;
$$;

-- 7.2 Registrar Tentativa de Questão com Ledger de XP Idempotente (AC-04, T-006, T-010)
create or replace function public.record_question_attempt(
  p_session_id uuid,
  p_question_id text,
  p_user_answer text,
  p_evaluation_status text,
  p_score numeric default 0.00
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_session public.study_sessions%rowtype;
  v_xp_granted int := 0;
  v_reward_type text;
begin
  if v_user_id is null then
    raise exception 'Utilisateur non authentifié';
  end if;

  -- 1. Validar posse da sessão
  select * into v_session
  from public.study_sessions
  where id = p_session_id and user_id = v_user_id;

  if v_session.id is null then
    raise exception 'Session introuvable ou non autorisée';
  end if;

  -- 2. Registrar tentativa (idempotente por sessão + questão)
  insert into public.question_attempts (
    session_id,
    user_id,
    question_id,
    user_answer,
    evaluation_status,
    score
  ) values (
    p_session_id,
    v_user_id,
    p_question_id,
    p_user_answer,
    p_evaluation_status,
    p_score
  )
  on conflict (session_id, question_id) do update set
    user_answer = excluded.user_answer,
    evaluation_status = excluded.evaluation_status,
    score = excluded.score;

  -- 3. Concessão de XP Idempotente
  if p_evaluation_status = 'correct' then
    v_reward_type := 'first_correct';

    -- Tenta inserir +10 XP no ledger (único por user + question + version)
    insert into public.xp_ledger (
      user_id,
      question_id,
      exercise_set_id,
      amount,
      reward_type,
      content_version
    ) values (
      v_user_id,
      p_question_id,
      v_session.exercise_set_id,
      10,
      v_reward_type,
      v_session.content_version
    )
    on conflict do nothing;

    -- Se inseriu com sucesso, atualiza o perfil
    if found then
      v_xp_granted := 10;
      update public.profiles
      set xp = xp + 10, updated_at = now()
      where id = v_user_id;
    end if;

  elsif p_evaluation_status = 'self_reviewed' then
    v_reward_type := 'self_review';

    insert into public.xp_ledger (
      user_id,
      question_id,
      exercise_set_id,
      amount,
      reward_type,
      content_version
    ) values (
      v_user_id,
      p_question_id,
      v_session.exercise_set_id,
      2,
      v_reward_type,
      v_session.content_version
    )
    on conflict do nothing;

    if found then
      v_xp_granted := 2;
      update public.profiles
      set xp = xp + 2, updated_at = now()
      where id = v_user_id;
    end if;
  end if;

  -- 4. Atualizar contadores na sessão
  update public.study_sessions
  set
    current_question_index = current_question_index + 1,
    correct_count = (select count(*) from public.question_attempts where session_id = p_session_id and evaluation_status = 'correct'),
    reviewed_count = (select count(*) from public.question_attempts where session_id = p_session_id and evaluation_status = 'self_reviewed'),
    earned_xp = earned_xp + v_xp_granted,
    updated_at = now()
  where id = p_session_id;

  return jsonb_build_object(
    'success', true,
    'xp_granted', v_xp_granted,
    'session_id', p_session_id,
    'evaluation_status', p_evaluation_status
  );
end;
$$;

-- 7.3 Concluir Sessão de Estudo com Cálculo Rigoroso de Estrelas e Bônus (RF-048, T-028)
create or replace function public.complete_study_session(
  p_session_id uuid
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_session public.study_sessions%rowtype;
  v_correct_count int;
  v_reviewed_count int;
  v_total_questions int;
  v_accuracy int := 0;
  v_stars int := 1;
  v_completion_xp int := 0;
begin
  if v_user_id is null then
    raise exception 'Utilisateur non authentifié';
  end if;

  select * into v_session
  from public.study_sessions
  where id = p_session_id and user_id = v_user_id;

  if v_session.id is null then
    raise exception 'Session introuvable ou non autorisée';
  end if;

  -- Obter contagem oficial de respostas
  select
    count(*) filter (where evaluation_status = 'correct'),
    count(*) filter (where evaluation_status = 'self_reviewed'),
    count(*)
  into v_correct_count, v_reviewed_count, v_total_questions
  from public.question_attempts
  where session_id = p_session_id;

  if v_total_questions > 0 then
    v_accuracy := round((v_correct_count::numeric / v_total_questions::numeric) * 100);

    -- Cálculo de Estrelas (RF-048 e T-028: 3★ exige ≥ 90% VERIFICADOS, não maioria autoavaliada)
    if v_accuracy >= 90 then
      v_stars := 3;
    elsif v_accuracy >= 80 then
      v_stars := 2;
    else
      v_stars := 1;
    end if;

    -- Conceder bônus de conclusão de sessão (+5 XP) de forma idempotente
    insert into public.xp_ledger (
      user_id,
      exercise_set_id,
      amount,
      reward_type,
      content_version
    ) values (
      v_user_id,
      v_session.exercise_set_id,
      5,
      'session_completed',
      v_session.content_version
    )
    on conflict do nothing;

    if found then
      v_completion_xp := 5;
      update public.profiles
      set xp = xp + 5, updated_at = now()
      where id = v_user_id;
    end if;
  else
    v_stars := 0;
  end if;

  -- Atualizar sessão para completed
  update public.study_sessions
  set
    status = 'completed',
    correct_count = v_correct_count,
    reviewed_count = v_reviewed_count,
    total_questions = v_total_questions,
    stars = v_stars,
    earned_xp = earned_xp + v_completion_xp,
    completed_at = now(),
    updated_at = now()
  where id = p_session_id;

  -- Atualizar progresso consolidado
  update public.user_progress
  set
    status = 'completed',
    best_stars = greatest(best_stars, v_stars),
    accuracy_percent = greatest(accuracy_percent, v_accuracy),
    last_attempted_at = now()
  where user_id = v_user_id and exercise_set_id = v_session.exercise_set_id;

  return jsonb_build_object(
    'session_id', p_session_id,
    'status', 'completed',
    'stars', v_stars,
    'accuracy_percent', v_accuracy,
    'correct_count', v_correct_count,
    'reviewed_count', v_reviewed_count,
    'total_questions', v_total_questions,
    'completion_xp', v_completion_xp
  );
end;
$$;

-- Revogar privilégios de anon e public em funções SECURITY DEFINER
revoke execute on function public.start_or_resume_session(text) from public, anon;
revoke execute on function public.record_question_attempt(uuid, text, text, text, numeric) from public, anon;
revoke execute on function public.complete_study_session(uuid) from public, anon;

-- Conceder privilégios de execução estritamente para usuários autenticados
grant execute on function public.start_or_resume_session(text) to authenticated;
grant execute on function public.record_question_attempt(uuid, text, text, text, numeric) to authenticated;
grant execute on function public.complete_study_session(uuid) to authenticated;
