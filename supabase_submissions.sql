-- Submissions table for demo/beta request forms (public insert, RLS disabled)
-- Run in Supabase SQL Editor. Uses UUID primary key and UTC created_at.

create table if not exists public.owl_ai_demo_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default (now() at time zone 'utc'),
  name text not null,
  email text not null,
  company text not null,
  title text,
  phone text,
  problems text
);

-- Optional: enable RLS but allow public insert for form submissions
-- alter table public.owl_ai_demo_requests enable row level security;
-- create policy "Allow public insert" on public.owl_ai_demo_requests for insert with (true);
-- create policy "Allow public select for admin" on public.owl_ai_demo_requests for select using (true);
-- create policy "Allow public update" on public.owl_ai_demo_requests for update using (true);
-- create policy "Allow public delete" on public.owl_ai_demo_requests for delete using (true);

-- Index for admin listing by date
create index if not exists idx_owl_ai_demo_requests_created_at
  on public.owl_ai_demo_requests (created_at desc);
