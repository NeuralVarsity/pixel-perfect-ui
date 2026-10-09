CREATE TABLE public.fashion_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  full_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  city text NOT NULL,
  country text NOT NULL,
  occasion text NOT NULL,
  category_interest text NOT NULL,
  collection_interest text,
  event_date date,
  budget_range text,
  contact_method text NOT NULL,
  preferred_language text NOT NULL,
  consent boolean NOT NULL DEFAULT false,
  lead_source text NOT NULL DEFAULT 'landing_page',
  campaign text,
  lead_status text NOT NULL DEFAULT 'new',
  automation_error text
);
GRANT ALL ON public.fashion_leads TO service_role;
ALTER TABLE public.fashion_leads ENABLE ROW LEVEL SECURITY;
CREATE INDEX fashion_leads_email_created_idx ON public.fashion_leads (lower(email), created_at DESC);