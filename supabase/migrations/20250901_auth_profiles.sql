-- Up migration: profiles table and policies
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  display_name text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_insert_own" on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles_update_own" on public.profiles for update
  using (auth.uid() = id);

-- Helper trigger for updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

-- Seed example (optional)
-- insert into public.profiles (id, email, display_name) values ('00000000-0000-0000-0000-000000000000','seed@example.com','Seed User');

-- Down migration
-- drop table if exists public.profiles cascade;

