-- ─── Profiles ────────────────────────────────────────────────────────────────
-- Extends auth.users — one row per authenticated user.

create table public.profiles (
  id          uuid references auth.users(id) on delete cascade primary key,
  email       text not null,
  full_name   text,
  avatar_url  text,
  created_at  timestamptz default now() not null,
  updated_at  timestamptz default now() not null
);

-- ─── Tribes ───────────────────────────────────────────────────────────────────

create table public.tribes (
  id               uuid default gen_random_uuid() primary key,
  name             text not null,
  size             integer not null check (size >= 2 and size <= 20),
  payment_period   text not null check (payment_period in ('Weekly','Biweekly','Monthly','Quarterly')),
  amount           numeric(12,2) not null check (amount > 0),
  start_date       date not null,
  end_date         date not null,
  cover_image_url  text,
  created_by       uuid references public.profiles(id) not null,
  created_at       timestamptz default now() not null,
  constraint valid_date_range check (end_date > start_date)
);

-- ─── Tribe Members ────────────────────────────────────────────────────────────

create table public.tribe_members (
  id             uuid default gen_random_uuid() primary key,
  tribe_id       uuid references public.tribes(id) on delete cascade not null,
  user_id        uuid references public.profiles(id) on delete cascade,
  invited_email  text,
  turn_number    integer not null,
  status         text not null default 'pending'
                   check (status in ('pending','active','paid','waiting','upcoming','declined')),
  joined_at      timestamptz,
  -- every slot must have either a linked user or an invite email
  constraint one_of_user_or_email check (user_id is not null or invited_email is not null),
  -- no duplicate turn numbers within a tribe
  unique (tribe_id, turn_number)
);

-- ─── Messages ─────────────────────────────────────────────────────────────────

create table public.messages (
  id         uuid default gen_random_uuid() primary key,
  tribe_id   uuid references public.tribes(id) on delete cascade not null,
  user_id    uuid references public.profiles(id) on delete cascade not null,
  text       text not null check (char_length(text) > 0),
  created_at timestamptz default now() not null
);

-- ─── Row-Level Security ───────────────────────────────────────────────────────

alter table public.profiles     enable row level security;
alter table public.tribes        enable row level security;
alter table public.tribe_members enable row level security;
alter table public.messages      enable row level security;

-- profiles: authenticated users can read all; only own row is writable
create policy "profiles_select"
  on public.profiles for select to authenticated using (true);

create policy "profiles_update_own"
  on public.profiles for update to authenticated using (auth.uid() = id);

-- tribes: visible to members and the creator
create policy "tribes_select_member_or_creator"
  on public.tribes for select to authenticated
  using (
    created_by = auth.uid()
    or exists (
      select 1 from public.tribe_members
      where tribe_id = tribes.id and user_id = auth.uid()
    )
  );

create policy "tribes_insert_own"
  on public.tribes for insert to authenticated
  with check (created_by = auth.uid());

create policy "tribes_update_creator"
  on public.tribes for update to authenticated
  using (created_by = auth.uid());

-- tribe_members: visible within the same tribe
create policy "tribe_members_select_same_tribe"
  on public.tribe_members for select to authenticated
  using (
    exists (
      select 1 from public.tribe_members tm2
      where tm2.tribe_id = tribe_members.tribe_id and tm2.user_id = auth.uid()
    )
    or exists (
      select 1 from public.tribes t
      where t.id = tribe_members.tribe_id and t.created_by = auth.uid()
    )
  );

create policy "tribe_members_insert_creator"
  on public.tribe_members for insert to authenticated
  with check (
    exists (
      select 1 from public.tribes
      where id = tribe_id and created_by = auth.uid()
    )
  );

create policy "tribe_members_update_own_or_creator"
  on public.tribe_members for update to authenticated
  using (
    user_id = auth.uid()
    or exists (
      select 1 from public.tribes
      where id = tribe_id and created_by = auth.uid()
    )
  );

-- messages: tribe members can read and write
create policy "messages_select_member"
  on public.messages for select to authenticated
  using (
    exists (
      select 1 from public.tribe_members
      where tribe_id = messages.tribe_id and user_id = auth.uid()
    )
  );

create policy "messages_insert_member"
  on public.messages for insert to authenticated
  with check (
    user_id = auth.uid()
    and exists (
      select 1 from public.tribe_members
      where tribe_id = messages.tribe_id and user_id = auth.uid()
    )
  );

-- ─── Auto-create profile on sign-up ──────────────────────────────────────────

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── Realtime ─────────────────────────────────────────────────────────────────

alter publication supabase_realtime add table public.messages;
