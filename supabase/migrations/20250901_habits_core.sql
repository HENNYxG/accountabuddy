-- Up migration: habits and habit_events with RLS
create table if not exists public.habits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  icon text,
  frequency jsonb not null default '[]'::jsonb,
  is_notification_on boolean default false,
  notification_time text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.habits enable row level security;

create policy "habits_select_own" on public.habits for select using (auth.uid() = user_id);
create policy "habits_insert_own" on public.habits for insert with check (auth.uid() = user_id);
create policy "habits_update_own" on public.habits for update using (auth.uid() = user_id);
create policy "habits_delete_own" on public.habits for delete using (auth.uid() = user_id);

create table if not exists public.habit_events (
  id uuid primary key default gen_random_uuid(),
  habit_id uuid not null references public.habits(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  occurred_at timestamptz not null default now(),
  value numeric,
  mood text check (mood in ('happy','neutral','sad')),
  requires_approval boolean default false,
  approved boolean,
  created_at timestamptz default now()
);

alter table public.habit_events enable row level security;
create policy "habit_events_select_own" on public.habit_events for select using (auth.uid() = user_id);
create policy "habit_events_insert_own" on public.habit_events for insert with check (auth.uid() = user_id);

-- triggers
drop trigger if exists set_habits_updated_at on public.habits;
create trigger set_habits_updated_at before update on public.habits
for each row execute function public.set_updated_at();

-- Indexes
create index if not exists idx_habits_user_id on public.habits(user_id);
create index if not exists idx_habit_events_habit_id on public.habit_events(habit_id);
create index if not exists idx_habit_events_user_id on public.habit_events(user_id);

-- Down migration
-- drop table if exists public.habit_events cascade;
-- drop table if exists public.habits cascade;

