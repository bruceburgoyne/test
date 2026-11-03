-- Stores messages sent from the contact form.
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 200),
  email text not null check (char_length(email) between 3 and 320),
  message text not null check (char_length(message) between 1 and 5000)
);

-- RLS on with no policies: the public anon key cannot read or write.
-- Only the server-side function (service role key) can insert.
alter table public.contact_messages enable row level security;
