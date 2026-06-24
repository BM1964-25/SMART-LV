create table if not exists public.smart_offerflow_offers (
  token text primary key,
  offer_number text not null,
  title text not null,
  payload jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists smart_offerflow_offers_offer_number_idx
  on public.smart_offerflow_offers (offer_number);

create index if not exists smart_offerflow_offers_updated_at_idx
  on public.smart_offerflow_offers (updated_at desc);

alter table public.smart_offerflow_offers enable row level security;

drop policy if exists "service role manages offerflow offers" on public.smart_offerflow_offers;

create policy "service role manages offerflow offers"
  on public.smart_offerflow_offers
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
