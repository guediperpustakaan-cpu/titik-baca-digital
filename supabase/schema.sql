-- ============================================================================
--  Titik Baca Digital — Admin Dashboard Schema
--  Jalankan script ini di Supabase SQL Editor (Dashboard > SQL > New query).
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Tabel: books (katalog koleksi digital)
-- ---------------------------------------------------------------------------
create table if not exists public.books (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  author      text,
  cover_url   text,
  reads_today integer not null default 0,
  created_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Tabel: visitor_stats (rekapitulasi harian untuk grafik tren)
-- ---------------------------------------------------------------------------
create table if not exists public.visitor_stats (
  id            uuid primary key default gen_random_uuid(),
  stat_date     date not null unique,
  day_label     text not null,
  visitor_count integer not null default 0
);

-- ---------------------------------------------------------------------------
-- Tabel: active_visitors (pengunjung yang sedang membaca — monitor live)
-- ---------------------------------------------------------------------------
create table if not exists public.active_visitors (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  member_code text not null,
  book_title  text not null,
  started_at  timestamptz not null default now(),
  status      text not null default 'active' check (status in ('active', 'idle')),
  created_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Tabel: locations (titik baca / lokasi perpustakaan)
-- ---------------------------------------------------------------------------
create table if not exists public.locations (
  id        uuid primary key default gen_random_uuid(),
  name      text not null,
  address   text,
  is_active boolean not null default true
);

-- ===========================================================================
-- Row Level Security
--  Kunci anon diizinkan SELECT (demo). Untuk write (admin) tambahkan auth
--  dan ubah policy sesuai kebutuhan.
-- ===========================================================================
alter table public.books           enable row level security;
alter table public.visitor_stats   enable row level security;
alter table public.active_visitors enable row level security;
alter table public.locations       enable row level security;

drop policy if exists "Public read books"           on public.books;
drop policy if exists "Public read visitor_stats"   on public.visitor_stats;
drop policy if exists "Public read active_visitors" on public.active_visitors;
drop policy if exists "Public read locations"       on public.locations;

create policy "Public read books"
  on public.books for select using (true);

create policy "Public read visitor_stats"
  on public.visitor_stats for select using (true);

create policy "Public read active_visitors"
  on public.active_visitors for select using (true);

create policy "Public read locations"
  on public.locations for select using (true);

-- ===========================================================================
-- Seed data
-- ===========================================================================

-- Buku
insert into public.books (title, author, cover_url, reads_today) values
  ('Sejarah Palembang Modern', 'Dinas Arsip', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBB2_AbnitiwirsLVMbOxUcJC1yP-jQNONLMsaICf2rlGgJ71X7Wvy6Vcvq2WLfiZUHWLqCgPF8vww185KjtVCm0UYmKcxjtDRe8I_4rwBkWC8I1CUJJOCp6s6OP7VSRyTXdtB31PCcHlmwYnltwXuCwxRwT4vhNAPN2WkVUpXspSqBpJ2XVd8TDdYAHJPAuWRs1TGr79VkRlEUGU4ddMX9sHJQjFnyh5wbEcC87aD37mc24DYEDCH6', 124),
  ('Teknologi Masa Depan', 'Prof. Wiryawan', null, 98),
  ('Kuliner Palembang', 'Tim Kuliner', null, 87),
  ('Sajak Musi', 'R.A. Kartini', null, 64),
  ('Panduan Budidaya Ikan Gabus', 'Bapak Slamet', null, 53),
  ('Palembang: Venesia dari Timur', 'Dinas Pariwisata', null, 41),
  ('Teknik Sipil Jembatan Ampera', 'Ir. Hasyim', null, 33)
on conflict do nothing;

-- Statistik 30 hari terakhir (untuk toggle 7 / 30 hari)
insert into public.visitor_stats (stat_date, day_label, visitor_count)
select
  (current_date - (g.n || ' days')::interval)::date as stat_date,
  to_char(current_date - (g.n || ' days')::interval, 'Dy') as day_label,
  (300 + floor(random() * 500))::int as visitor_count
from generate_series(0, 29) as g(n)
on conflict (stat_date) do nothing;

-- Pengunjung aktif (monitor)
insert into public.active_visitors (name, member_code, book_title, started_at, status) values
  ('Adit Nugroho',    '48210', 'Panduan Budidaya Ikan Gabus',      now() - interval '1 hour 25 minutes',  'active'),
  ('Siska Ramadhani', '48215', 'Palembang: Venesia dari Timur',    now() - interval '1 hour 40 minutes',  'active'),
  ('Bambang Pamungkas','48199','Teknik Sipil Jembatan Ampera',     now() - interval '2 hours 15 minutes',  'idle'),
  ('Dewi Lestari',    '48230', 'Sejarah Palembang Modern',         now() - interval '2 hours 40 minutes',  'active'),
  ('Rangga Aditya',   '48241', 'Kuliner Palembang',                now() - interval '3 hours',             'idle'),
  ('Fitri Sari',      '48255', 'Sajak Musi',                       now() - interval '3 hours 20 minutes',  'active')
on conflict do nothing;

-- Lokasi titik baca
insert into public.locations (name, address, is_active) values
  ('Titik Baca Ampera',       'Jl. Jenderal Sudirman, Palembang', true),
  ('Titik Baca Kambang',      'Jl. Kambang Unglen, Palembang',    true),
  ('Titik Baca Plaza Anggrek', 'Jl. Anggrek, Palembang',          true),
  ('Titik Baca Kampus UNSRI',  'Jl. Padang Selasa, Palembang',    false)
on conflict do nothing;
