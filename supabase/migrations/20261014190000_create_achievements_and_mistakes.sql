-- Migration: 20261014190000_create_achievements_and_mistakes.sql
-- Description: Implementa catálogo de conquistas, conquistas do usuário, caderno de erros
-- (user_mistakes), RPCs de revisão e verificação determinística de conquistas com RLS estrito (Etapa 6).

-- 1. Catálogo de Conquistas (Achievements)
create table if not exists public.achievements (
  id text primary key,
  title text not null,
  description text not null,
  icon text not null,
  category text not null check (category in ('progress', 'mastery', 'streak', 'review')),
  xp_reward int not null default 20,
  requirement_type text not null check (requirement_type in (
    'first_session', 'perfect_stars', 'chapter_completed', 'mistakes_corrected', 'streak_days', 'review_completed', 'xp_milestone'
  )),
  requirement_value int not null default 1,
  created_at timestamptz not null default now()
);

-- Seed de conquistas essenciais do PRD (§15.1, RF-056)
insert into public.achievements (id, title, description, icon, category, xp_reward, requirement_type, requirement_value)
values
  ('first_mission', 'Premier Pas', 'Terminez votre toute première série d’exercices avec succès.', '🚀', 'progress', 20, 'first_session', 1),
  ('perfect_stars', 'Perfection', 'Obtenez 3 étoiles parfaites (≥ 90% de précision vérifiée) sur une série.', '⭐', 'mastery', 30, 'perfect_stars', 3),
  ('chapter_master', 'Maître du Chapitre', 'Complétez l’intégralité des séries d’exercices d’un chapitre.', '🏰', 'mastery', 50, 'chapter_completed', 1),
  ('mistake_hunter', 'Chasseur d’Erreurs', 'Surmontez et corrigez votre première erreur dans le carnet d’études.', '🎯', 'review', 25, 'mistakes_corrected', 1),
  ('three_day_streak', 'Flamme Ardente', 'Maintenez une régularité d’étude pendant 3 jours consécutifs.', '🔥', 'streak', 30, 'streak_days', 3),
  ('seven_day_streak', 'Discipline Olympienne', 'Atteignez un palier de 7 jours consécutifs d’apprentissage.', '⚡', 'streak', 50, 'streak_days', 7),
  ('review_champion', 'Champion de la Révision', 'Terminez une session ciblée complète de révision de vos erreurs.', '📚', 'review', 40, 'review_completed', 1),
  ('centurion_xp', 'Centurion de Grammaire', 'Accumulez 100 points d’expérience (XP) dans votre quête.', '💎', 'progress', 30, 'xp_milestone', 100)
on conflict (id) do update set
  title = excluded.title,
  description = excluded.description,
  icon = excluded.icon,
  category = excluded.category,
  xp_reward = excluded.xp_reward,
  requirement_type = excluded.requirement_type,
  requirement_value = excluded.requirement_value;

-- 2. Conquistas Desbloqueadas pelo Usuário (User Achievements)
create table if not exists public.user_achievements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  achievement_id text not null references public.achievements(id) on delete cascade,
  unlocked_at timestamptz not null default now(),
  constraint user_achievements_user_badge_uniq unique (user_id, achievement_id)
);

create index if not exists user_achievements_user_idx on public.user_achievements(user_id);

-- 3. Caderno de Erros Pessoal (User Mistakes — RF-049, RF-050)
create table if not exists public.user_mistakes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  question_id text not null references public.questions(id) on delete cascade,
  exercise_set_id text not null references public.exercise_sets(id) on delete cascade,
  chapter_id text not null references public.chapters(id) on delete cascade,
  last_wrong_answer text not null,
  wrong_count int not null default 1,
  status text not null default 'pending' check (status in ('pending', 'resolved', 'dismissed')),
  last_attempted_at timestamptz not null default now(),
  resolved_at timestamptz,
  constraint user_mistakes_user_question_uniq unique (user_id, question_id)
);

create index if not exists user_mistakes_user_status_idx on public.user_mistakes(user_id, status);
create index if not exists user_mistakes_user_ch_idx on public.user_mistakes(user_id, chapter_id);

-- 4. Habilitar RLS em todas as tabelas
alter table public.achievements enable row level security;
alter table public.user_achievements enable row level security;
alter table public.user_mistakes enable row level security;

-- 5. Políticas de RLS
-- achievements: todos os usuários autenticados podem consultar o catálogo
create policy "achievements_select_authenticated" on public.achievements
  for select to authenticated
  using (true);

-- user_achievements: usuário só lê suas conquistas; escrita via RPC ou próprio usuário
create policy "user_achievements_select_own" on public.user_achievements
  for select to authenticated
  using (auth.uid() = user_id or public.is_admin());

create policy "user_achievements_insert_own" on public.user_achievements
  for insert to authenticated
  with check (auth.uid() = user_id or public.is_admin());

-- user_mistakes: isolamento estrito de erros por usuário
create policy "user_mistakes_select_own" on public.user_mistakes
  for select to authenticated
  using (auth.uid() = user_id or public.is_admin());

create policy "user_mistakes_insert_own" on public.user_mistakes
  for insert to authenticated
  with check (auth.uid() = user_id or public.is_admin());

create policy "user_mistakes_update_own" on public.user_mistakes
  for update to authenticated
  using (auth.uid() = user_id or public.is_admin())
  with check (auth.uid() = user_id or public.is_admin());

-- 6. Atualização da RPC record_question_attempt para alimentar o caderno de erros
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

  -- 3. Atualizar Caderno de Erros (RF-049, RF-050)
  if p_evaluation_status = 'incorrect' then
    insert into public.user_mistakes (
      user_id,
      question_id,
      exercise_set_id,
      chapter_id,
      last_wrong_answer,
      wrong_count,
      status,
      last_attempted_at
    ) values (
      v_user_id,
      p_question_id,
      v_session.exercise_set_id,
      v_session.chapter_id,
      p_user_answer,
      1,
      'pending',
      now()
    )
    on conflict (user_id, question_id) do update set
      wrong_count = user_mistakes.wrong_count + 1,
      last_wrong_answer = excluded.last_wrong_answer,
      status = 'pending',
      last_attempted_at = now();

  elsif p_evaluation_status = 'correct' then
    -- Se o erro estava registrado como pendente, marca como resolvido
    update public.user_mistakes
    set status = 'resolved', resolved_at = now()
    where user_id = v_user_id and question_id = p_question_id and status = 'pending';
  end if;

  -- 4. Concessão de XP Idempotente
  if p_evaluation_status = 'correct' then
    v_reward_type := 'first_correct';

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

  -- 5. Atualizar contadores na sessão
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

-- 7. RPC para Consultar Erros Detalhados do Usuário com Dados Pedagógicos (RF-049, RF-050)
create or replace function public.get_user_mistakes(
  p_chapter_id text default null,
  p_status text default 'pending'
)
returns table (
  mistake_id uuid,
  question_id text,
  exercise_set_id text,
  chapter_id text,
  last_wrong_answer text,
  wrong_count int,
  status text,
  last_attempted_at timestamptz,
  prompt text,
  instruction text,
  interaction_type text,
  accepted_answers text[],
  explanation text
)
language sql
security definer
set search_path = public
as $$
  select
    m.id as mistake_id,
    m.question_id,
    m.exercise_set_id,
    m.chapter_id,
    m.last_wrong_answer,
    m.wrong_count,
    m.status,
    m.last_attempted_at,
    q.prompt,
    coalesce(q.instruction, e.instruction) as instruction,
    e.interaction_type,
    q.accepted_answers,
    q.explanation
  from public.user_mistakes m
  join public.questions q on q.id = m.question_id
  join public.exercise_sets e on e.id = m.exercise_set_id
  where m.user_id = auth.uid()
    and (p_chapter_id is null or m.chapter_id = p_chapter_id)
    and (p_status is null or m.status = p_status)
  order by m.last_attempted_at desc;
$$;

-- 8. RPC Confiável para Avaliar e Conceder Conquistas Deterministamente (RF-056)
create or replace function public.check_and_award_achievements()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_profile public.profiles%rowtype;
  v_completed_sessions_count int;
  v_perfect_stars_count int;
  v_resolved_mistakes_count int;
  v_completed_chapters_count int;
  v_newly_awarded text[] := array[]::text[];
  v_ach record;
begin
  if v_user_id is null then
    raise exception 'Utilisateur non authentifié';
  end if;

  select * into v_profile from public.profiles where id = v_user_id;

  -- Contagens agregadas do usuário
  select count(*) into v_completed_sessions_count
  from public.study_sessions
  where user_id = v_user_id and status = 'completed';

  select count(*) into v_perfect_stars_count
  from public.user_progress
  where user_id = v_user_id and best_stars = 3;

  select count(*) into v_resolved_mistakes_count
  from public.user_mistakes
  where user_id = v_user_id and status = 'resolved';

  -- Capítulos completos (todos os sets finalizados)
  select count(distinct p.chapter_id) into v_completed_chapters_count
  from public.user_progress p
  where p.user_id = v_user_id and p.status = 'completed';

  -- Avaliar cada conquista do catálogo
  for v_ach in select * from public.achievements loop
    -- Ignorar se o usuário já possui a conquista
    if not exists (select 1 from public.user_achievements where user_id = v_user_id and achievement_id = v_ach.id) then
      declare
        v_eligible boolean := false;
      begin
        case v_ach.requirement_type
          when 'first_session' then
            v_eligible := (v_completed_sessions_count >= v_ach.requirement_value);
          when 'perfect_stars' then
            v_eligible := (v_perfect_stars_count >= 1);
          when 'chapter_completed' then
            v_eligible := (v_completed_chapters_count >= v_ach.requirement_value);
          when 'mistakes_corrected' then
            v_eligible := (v_resolved_mistakes_count >= v_ach.requirement_value);
          when 'streak_days' then
            v_eligible := (v_profile.streak_days >= v_ach.requirement_value);
          when 'xp_milestone' then
            v_eligible := (v_profile.xp >= v_ach.requirement_value);
          else
            v_eligible := false;
        end case;

        if v_eligible then
          insert into public.user_achievements (user_id, achievement_id)
          values (v_user_id, v_ach.id)
          on conflict do nothing;

          if found then
            v_newly_awarded := array_append(v_newly_awarded, v_ach.id);

            -- Conceder XP bônus da conquista no ledger
            insert into public.xp_ledger (
              user_id,
              amount,
              reward_type,
              content_version
            ) values (
              v_user_id,
              v_ach.xp_reward,
              'streak_bonus',
              'v1.0.0'
            );

            update public.profiles
            set xp = xp + v_ach.xp_reward, updated_at = now()
            where id = v_user_id;
          end if;
        end if;
      end;
    end if;
  end loop;

  return jsonb_build_object(
    'success', true,
    'newly_awarded', v_newly_awarded,
    'total_unlocked', (select count(*) from public.user_achievements where user_id = v_user_id)
  );
end;
$$;

-- 9. RPC para Finalizar Sessão de Revisão com Concessão de Conquista (RF-019, RF-054)
create or replace function public.complete_review_session(
  p_resolved_question_ids text[]
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_qid text;
  v_resolved_count int := 0;
begin
  if v_user_id is null then
    raise exception 'Utilisateur non authentifié';
  end if;

  if p_resolved_question_ids is not null then
    foreach v_qid in array p_resolved_question_ids loop
      update public.user_mistakes
      set status = 'resolved', resolved_at = now()
      where user_id = v_user_id and question_id = v_qid and status = 'pending';

      if found then
        v_resolved_count := v_resolved_count + 1;
      end if;
    end loop;
  end if;

  -- Desbloquear conquista review_champion
  insert into public.user_achievements (user_id, achievement_id)
  values (v_user_id, 'review_champion')
  on conflict do nothing;

  -- Bônus de revisão completa (+5 XP)
  insert into public.xp_ledger (
    user_id,
    amount,
    reward_type,
    content_version
  ) values (
    v_user_id,
    5,
    'self_review',
    'v1.0.0'
  );

  update public.profiles
  set xp = xp + 5, updated_at = now()
  where id = v_user_id;

  return jsonb_build_object(
    'success', true,
    'resolved_count', v_resolved_count,
    'xp_granted', 5
  );
end;
$$;

-- 10. Permissões de Execução Estritas
revoke execute on function public.record_question_attempt(uuid, text, text, text, numeric) from public, anon;
revoke execute on function public.get_user_mistakes(text, text) from public, anon;
revoke execute on function public.check_and_award_achievements() from public, anon;
revoke execute on function public.complete_review_session(text[]) from public, anon;

grant execute on function public.record_question_attempt(uuid, text, text, text, numeric) to authenticated;
grant execute on function public.get_user_mistakes(text, text) to authenticated;
grant execute on function public.check_and_award_achievements() to authenticated;
grant execute on function public.complete_review_session(text[]) to authenticated;
