-- Create years table
CREATE TABLE public.years (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    year_num INTEGER NOT NULL UNIQUE,
    is_active BOOLEAN NOT NULL DEFAULT FALSE,
    starts_at TIMESTAMPTZ NOT NULL,
    ends_at TIMESTAMPTZ NOT NULL
);

-- RLS
ALTER TABLE public.years ENABLE ROW LEVEL SECURITY;

-- Access Control: Fully private
-- Revoke all permissions from public/anon/authenticated/service_role to ensure privacy
REVOKE ALL ON public.years FROM anon, authenticated, public;
REVOKE ALL ON public.years FROM service_role;

-- Grant READ access only to service_role
GRANT SELECT ON public.years TO service_role;
-- Grant ALL access to postgres/dashboard
GRANT ALL ON public.years TO postgres;


-- INSTRUCTIONS ON HOW TO CREATE NEW YEAR:
-- INSERT INTO public.years (year_num, is_active, starts_at, ends_at)
-- VALUES (2025, true, '2025-01-01 00:00:00+00', '2025-12-31 23:59:59+00');

-- INSTRUCTIONS ON HOW TO MAKE YEAR INACTIVE:
-- UPDATE public.years SET is_active = false WHERE year_num = 2025;

