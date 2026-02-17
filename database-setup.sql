-- JudoSite Supabase database bootstrap
-- Run this in Supabase SQL Editor for project: qlppmvsiupanurgsybzd

create extension if not exists pgcrypto;

create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date date not null,
  excerpt text not null,
  content text not null,
  image text not null,
  tags text[] not null default '{}',
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.competitions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date date not null,
  location text not null,
  description text not null,
  application_link text,
  created_at timestamptz not null default now()
);

create table if not exists public.competitors (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  category text not null,
  birth_year text not null,
  belt text not null,
  image text,
  results text,
  created_at timestamptz not null default now()
);

create table if not exists public.trainers (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  role text not null,
  rank text not null,
  image text,
  phone text,
  created_at timestamptz not null default now()
);

create table if not exists public.sponsors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo text,
  website text,
  partner_type text,
  created_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.gallery (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date date not null,
  cover_image text,
  images text[] not null default '{}',
  created_at timestamptz not null default now()
);

create index if not exists idx_news_created_at on public.news (created_at desc);
create index if not exists idx_competitions_date on public.competitions (date asc);
create index if not exists idx_competitors_created_at on public.competitors (created_at desc);
create index if not exists idx_trainers_created_at on public.trainers (created_at desc);
create index if not exists idx_sponsors_created_at on public.sponsors (created_at desc);
create index if not exists idx_messages_created_at on public.messages (created_at desc);
create index if not exists idx_gallery_created_at on public.gallery (created_at desc);

-- Storage bucket used by src/actions/file-upload.ts
insert into storage.buckets (id, name, public)
values ('uploads', 'uploads', true)
on conflict (id) do nothing;
