-- Migration: create_content_catalog_tables
-- Purpose: Setup content releases, chapters catalog, topics, exercise sets, and questions with RLS

-- 1. Content Releases
create table if not exists public.content_releases (
  id uuid primary key default gen_random_uuid(),
  version text not null unique,
  status text not null default 'published' check (status in ('draft', 'review', 'published', 'archived')),
  rights_cleared boolean not null default true,
  editorial_approved boolean not null default true,
  created_at timestamptz not null default now(),
  published_at timestamptz default now()
);

-- 2. Chapters
create table if not exists public.chapters (
  id text primary key,
  number int not null unique check (number >= 1 and number <= 28),
  title text not null,
  slug text not null unique,
  world_number int not null check (world_number >= 1 and world_number <= 5),
  world_name text not null,
  page_range text not null,
  topics_count int not null default 0,
  exercise_groups_count int not null default 0,
  total_questions int not null default 0,
  theory_markdown text,
  editorial_status text not null default 'published' check (editorial_status in ('draft', 'machine_validated', 'editorial_approved', 'published')),
  release_id uuid references public.content_releases(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists chapters_number_idx on public.chapters(number);
create index if not exists chapters_world_idx on public.chapters(world_number);
create index if not exists chapters_status_idx on public.chapters(editorial_status);

create or replace trigger set_chapters_updated_at
  before update on public.chapters
  for each row execute function public.handle_updated_at();

-- 3. Topics
create table if not exists public.topics (
  id text primary key,
  chapter_id text not null references public.chapters(id) on delete cascade,
  order_index int not null,
  title text not null,
  rule_summary text,
  created_at timestamptz not null default now()
);

create index if not exists topics_chapter_idx on public.topics(chapter_id, order_index);

-- 4. Exercise Sets
create table if not exists public.exercise_sets (
  id text primary key,
  chapter_id text not null references public.chapters(id) on delete cascade,
  order_index int not null,
  title text not null,
  instruction text not null,
  interaction_type text not null check (interaction_type in ('fill_blank', 'matching', 'translation', 'sentence_rewrite', 'ordering', 'multiple_choice')),
  questions_count int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists exercise_sets_chapter_idx on public.exercise_sets(chapter_id, order_index);

-- 5. Questions
create table if not exists public.questions (
  id text primary key,
  exercise_set_id text not null references public.exercise_sets(id) on delete cascade,
  order_index int not null,
  prompt text not null,
  instruction text,
  tokens jsonb,
  options jsonb,
  accepted_answers text[] not null,
  explanation text,
  created_at timestamptz not null default now()
);

create index if not exists questions_exercise_set_idx on public.questions(exercise_set_id, order_index);

-- 6. Enable RLS on all content tables
alter table public.content_releases enable row level security;
alter table public.chapters enable row level security;
alter table public.topics enable row level security;
alter table public.exercise_sets enable row level security;
alter table public.questions enable row level security;

-- 7. Policies
do $$
begin
  if not exists (select 1 from pg_policies where tablename = 'content_releases' and policyname = 'content_releases_select') then
    create policy "content_releases_select" on public.content_releases for select to authenticated
      using (status = 'published' and editorial_approved = true or public.is_admin());
  end if;

  if not exists (select 1 from pg_policies where tablename = 'content_releases' and policyname = 'content_releases_admin_manage') then
    create policy "content_releases_admin_manage" on public.content_releases for all to authenticated
      using (public.is_admin()) with check (public.is_admin());
  end if;

  if not exists (select 1 from pg_policies where tablename = 'chapters' and policyname = 'chapters_select') then
    create policy "chapters_select" on public.chapters for select to authenticated
      using (editorial_status = 'published' or public.is_admin());
  end if;

  if not exists (select 1 from pg_policies where tablename = 'chapters' and policyname = 'chapters_admin_manage') then
    create policy "chapters_admin_manage" on public.chapters for all to authenticated
      using (public.is_admin()) with check (public.is_admin());
  end if;

  if not exists (select 1 from pg_policies where tablename = 'topics' and policyname = 'topics_select') then
    create policy "topics_select" on public.topics for select to authenticated
      using (
        exists (
          select 1 from public.chapters c
          where c.id = topics.chapter_id and (c.editorial_status = 'published' or public.is_admin())
        )
      );
  end if;

  if not exists (select 1 from pg_policies where tablename = 'topics' and policyname = 'topics_admin_manage') then
    create policy "topics_admin_manage" on public.topics for all to authenticated
      using (public.is_admin()) with check (public.is_admin());
  end if;

  if not exists (select 1 from pg_policies where tablename = 'exercise_sets' and policyname = 'exercise_sets_select') then
    create policy "exercise_sets_select" on public.exercise_sets for select to authenticated
      using (
        exists (
          select 1 from public.chapters c
          where c.id = exercise_sets.chapter_id and (c.editorial_status = 'published' or public.is_admin())
        )
      );
  end if;

  if not exists (select 1 from pg_policies where tablename = 'exercise_sets' and policyname = 'exercise_sets_admin_manage') then
    create policy "exercise_sets_admin_manage" on public.exercise_sets for all to authenticated
      using (public.is_admin()) with check (public.is_admin());
  end if;

  if not exists (select 1 from pg_policies where tablename = 'questions' and policyname = 'questions_select') then
    create policy "questions_select" on public.questions for select to authenticated
      using (
        exists (
          select 1 from public.exercise_sets es
          join public.chapters c on c.id = es.chapter_id
          where es.id = questions.exercise_set_id and (c.editorial_status = 'published' or public.is_admin())
        )
      );
  end if;

  if not exists (select 1 from pg_policies where tablename = 'questions' and policyname = 'questions_admin_manage') then
    create policy "questions_admin_manage" on public.questions for all to authenticated
      using (public.is_admin()) with check (public.is_admin());
  end if;
end $$;

grant select on public.content_releases to authenticated;
grant select on public.chapters to authenticated;
grant select on public.topics to authenticated;
grant select on public.exercise_sets to authenticated;
grant select on public.questions to authenticated;

grant all on public.content_releases to authenticated;
grant all on public.chapters to authenticated;
grant all on public.topics to authenticated;
grant all on public.exercise_sets to authenticated;
grant all on public.questions to authenticated;
