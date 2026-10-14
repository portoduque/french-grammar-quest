-- Migration: create_auth_and_profiles_tables
-- Purpose: Setup user profiles, access_grants (allowlist), audit_log and strict RLS policies

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  display_name text,
  avatar_url text,
  role text not null default 'student' check (role in ('student', 'teacher', 'admin')),
  timezone text default 'UTC',
  preferences jsonb default '{"theme": "dark", "sound": true, "daily_goal_xp": 50}'::jsonb,
  hearts int not null default 5 check (hearts >= 0 and hearts <= 5),
  max_hearts int not null default 5,
  xp int not null default 0 check (xp >= 0),
  level int not null default 1 check (level >= 1),
  streak_days int not null default 0 check (streak_days >= 0),
  streak_frozen boolean not null default false,
  last_active_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_role_idx on public.profiles(role);
create index if not exists profiles_email_idx on public.profiles(lower(email));

create or replace trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

create table if not exists public.access_grants (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  role text not null default 'student' check (role in ('student', 'teacher', 'admin')),
  status text not null default 'active' check (status in ('pending', 'active', 'revoked')),
  invited_by uuid references auth.users(id) on delete set null,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists access_grants_email_idx on public.access_grants(lower(email));
create index if not exists access_grants_status_idx on public.access_grants(status);

create or replace trigger set_access_grants_updated_at
  before update on public.access_grants
  for each row execute function public.handle_updated_at();

create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id) on delete set null,
  event text not null,
  target_type text not null,
  target_id text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists audit_log_actor_idx on public.audit_log(actor_id);
create index if not exists audit_log_created_at_idx on public.audit_log(created_at desc);

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_grant_role text := 'student';
  v_grant_status text;
  v_grant_expires timestamptz;
begin
  select role, status, expires_at
  into v_grant_role, v_grant_status, v_grant_expires
  from public.access_grants
  where lower(email) = lower(new.email);

  if exists (select 1 from public.access_grants) then
    if v_grant_status is null or v_grant_status != 'active' or (v_grant_expires is not null and v_grant_expires < now()) then
      raise exception 'User with email % is not on the active authorization allowlist.', new.email;
    end if;
  else
    v_grant_role := 'admin';
    insert into public.access_grants (email, role, status)
    values (new.email, 'admin', 'active');
  end if;

  insert into public.profiles (
    id,
    email,
    display_name,
    avatar_url,
    role
  ) values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url',
    v_grant_role
  );

  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.access_grants enable row level security;
alter table public.audit_log enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where tablename = 'profiles' and policyname = 'profiles_select_own_or_admin') then
    create policy "profiles_select_own_or_admin" on public.profiles for select to authenticated using ((select auth.uid()) = id or public.is_admin());
  end if;

  if not exists (select 1 from pg_policies where tablename = 'profiles' and policyname = 'profiles_update_own') then
    create policy "profiles_update_own" on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id and (role = (select p.role from public.profiles p where p.id = (select auth.uid())) or public.is_admin()));
  end if;

  if not exists (select 1 from pg_policies where tablename = 'access_grants' and policyname = 'access_grants_select') then
    create policy "access_grants_select" on public.access_grants for select to authenticated using (public.is_admin() or lower(email) = lower(coalesce(auth.jwt()->>'email', '')));
  end if;

  if not exists (select 1 from pg_policies where tablename = 'access_grants' and policyname = 'access_grants_admin_manage') then
    create policy "access_grants_admin_manage" on public.access_grants for all to authenticated using (public.is_admin()) with check (public.is_admin());
  end if;

  if not exists (select 1 from pg_policies where tablename = 'audit_log' and policyname = 'audit_log_select_admin') then
    create policy "audit_log_select_admin" on public.audit_log for select to authenticated using (public.is_admin());
  end if;

  if not exists (select 1 from pg_policies where tablename = 'audit_log' and policyname = 'audit_log_insert_own') then
    create policy "audit_log_insert_own" on public.audit_log for insert to authenticated with check ((select auth.uid()) = actor_id);
  end if;
end $$;

grant usage on schema public to anon, authenticated;
grant select, update on public.profiles to authenticated;
grant select on public.access_grants to authenticated;
grant all on public.access_grants to authenticated;
grant select, insert on public.audit_log to authenticated;

revoke all on function public.handle_new_user() from public, anon, authenticated;
revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;
