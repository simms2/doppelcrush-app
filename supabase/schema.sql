-- DoppelCrush production starter schema
-- Run this in Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  first_name text,
  age int,
  gender text,
  looking_for text,
  location text,
  bio text,
  selfie_url text,
  mode_preference text default 'doppel',
  onboarding_complete boolean default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.swipes (
  id uuid primary key default gen_random_uuid(),
  swiper_id uuid not null references auth.users(id) on delete cascade,
  target_id uuid not null references auth.users(id) on delete cascade,
  action text not null check (action in ('like', 'pass')),
  mode text not null default 'doppel',
  created_at timestamptz not null default now(),
  unique (swiper_id, target_id)
);

create table if not exists public.matches (
  id uuid primary key default gen_random_uuid(),
  pair_key text not null unique,
  user_one uuid not null references auth.users(id) on delete cascade,
  user_two uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references public.matches(id) on delete cascade,
  sender_id uuid not null references auth.users(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.swipes enable row level security;
alter table public.matches enable row level security;
alter table public.messages enable row level security;

-- Profiles
create policy if not exists "profiles are readable by authenticated users"
on public.profiles for select
using (auth.role() = 'authenticated');

create policy if not exists "users can upsert own profile"
on public.profiles for insert
with check (auth.uid() = id);

create policy if not exists "users can update own profile"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

create policy if not exists "users can delete own profile"
on public.profiles for delete
using (auth.uid() = id);

-- Swipes
create policy if not exists "users can read own swipes"
on public.swipes for select
using (auth.uid() = swiper_id);

create policy if not exists "users can write own swipes"
on public.swipes for insert
with check (auth.uid() = swiper_id);

create policy if not exists "users can update own swipes"
on public.swipes for update
using (auth.uid() = swiper_id)
with check (auth.uid() = swiper_id);

-- Matches
create policy if not exists "users can read their matches"
on public.matches for select
using (auth.uid() = user_one or auth.uid() = user_two);

create policy if not exists "users can create their matches"
on public.matches for insert
with check (auth.uid() = user_one or auth.uid() = user_two);

-- Messages
create policy if not exists "users can read messages in their matches"
on public.messages for select
using (
  exists (
    select 1 from public.matches
    where matches.id = messages.match_id
    and (matches.user_one = auth.uid() or matches.user_two = auth.uid())
  )
);

create policy if not exists "users can send messages in their matches"
on public.messages for insert
with check (
  auth.uid() = sender_id
  and exists (
    select 1 from public.matches
    where matches.id = messages.match_id
    and (matches.user_one = auth.uid() or matches.user_two = auth.uid())
  )
);

-- Storage bucket for selfies
insert into storage.buckets (id, name, public)
values ('selfies', 'selfies', true)
on conflict (id) do nothing;

create policy if not exists "selfies are publicly readable"
on storage.objects for select
using (bucket_id = 'selfies');

create policy if not exists "users can upload their own selfies"
on storage.objects for insert
with check (
  bucket_id = 'selfies'
  and auth.role() = 'authenticated'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy if not exists "users can update their own selfies"
on storage.objects for update
using (
  bucket_id = 'selfies'
  and auth.role() = 'authenticated'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'selfies'
  and auth.role() = 'authenticated'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy if not exists "users can delete their own selfies"
on storage.objects for delete
using (
  bucket_id = 'selfies'
  and auth.role() = 'authenticated'
  and (storage.foldername(name))[1] = auth.uid()::text
);
