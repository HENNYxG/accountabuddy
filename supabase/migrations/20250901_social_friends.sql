-- Friends and Friend Requests schema with RLS
create extension if not exists pgcrypto;

-- Friend Requests
create table if not exists public.friend_requests (
	id uuid primary key default gen_random_uuid(),
	requester_id uuid not null references auth.users(id) on delete cascade,
	recipient_id uuid not null references auth.users(id) on delete cascade,
	status text not null default 'pending' check (status in ('pending','accepted','declined')),
	message text,
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now(),
	unique (requester_id, recipient_id)
);

alter table public.friend_requests enable row level security;

create policy "friend_requests_select_own"
on public.friend_requests for select
using (
	requester_id = auth.uid() or recipient_id = auth.uid()
);

create policy "friend_requests_insert_self"
on public.friend_requests for insert
with check (
	requester_id = auth.uid()
);

create policy "friend_requests_update_recipient"
on public.friend_requests for update
using (recipient_id = auth.uid())
with check (recipient_id = auth.uid());

create policy "friend_requests_delete_requester_pending"
on public.friend_requests for delete
using (requester_id = auth.uid() and status = 'pending');

-- Friends
create table if not exists public.friends (
	id uuid primary key default gen_random_uuid(),
	user1_id uuid not null references auth.users(id) on delete cascade,
	user2_id uuid not null references auth.users(id) on delete cascade,
	created_at timestamptz not null default now()
);

-- Unique pair constraint via expression index
create unique index if not exists friends_unique_pair
on public.friends (least(user1_id, user2_id), greatest(user1_id, user2_id));

alter table public.friends enable row level security;

create policy "friends_select_own"
on public.friends for select
using (user1_id = auth.uid() or user2_id = auth.uid());

create policy "friends_insert_either"
on public.friends for insert
with check (user1_id = auth.uid() or user2_id = auth.uid());

create policy "friends_delete_either"
on public.friends for delete
using (user1_id = auth.uid() or user2_id = auth.uid());

-- Blocks
create table if not exists public.user_blocks (
	id uuid primary key default gen_random_uuid(),
	blocker_id uuid not null references auth.users(id) on delete cascade,
	blocked_id uuid not null references auth.users(id) on delete cascade,
	reason text,
	created_at timestamptz not null default now(),
	unique (blocker_id, blocked_id)
);

alter table public.user_blocks enable row level security;

create policy "user_blocks_select_own"
on public.user_blocks for select
using (blocker_id = auth.uid());

create policy "user_blocks_write_self"
on public.user_blocks for all
using (blocker_id = auth.uid())
with check (blocker_id = auth.uid());

-- Reports
create table if not exists public.user_reports (
	id uuid primary key default gen_random_uuid(),
	reporter_id uuid not null references auth.users(id) on delete cascade,
	target_user_id uuid not null references auth.users(id) on delete cascade,
	reason text not null,
	status text not null default 'open' check (status in ('open','reviewed','closed')),
	created_at timestamptz not null default now()
);

alter table public.user_reports enable row level security;

create policy "user_reports_select_own"
on public.user_reports for select
using (reporter_id = auth.uid());

create policy "user_reports_insert_self"
on public.user_reports for insert
with check (reporter_id = auth.uid());

-- Trigger to update updated_at on friend_requests
create or replace function public.set_updated_at()
returns trigger as $$
begin
	new.updated_at = now();
	return new;
end;
$$ language plpgsql;

drop trigger if exists set_friend_requests_updated_at on public.friend_requests;
create trigger set_friend_requests_updated_at
before update on public.friend_requests
for each row execute procedure public.set_updated_at();

