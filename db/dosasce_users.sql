-- Create dosasce_users table
CREATE TABLE public.dosasce_users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    avatar_url TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    last_sign_in_at TIMESTAMPTZ,
    user_group TEXT NOT NULL CHECK (user_group IN ('osnovna','srednja','preddiplomski','diplomski','open'))
);

-- RLS
ALTER TABLE public.dosasce_users ENABLE ROW LEVEL SECURITY;

-- Access Control: Fully private
-- Revoke all permissions from anon/authenticated/public/service_role
REVOKE ALL ON public.dosasce_users FROM anon, authenticated, public;
REVOKE ALL ON public.dosasce_users FROM service_role;

-- Grant read and insert ONLY to service_role
GRANT SELECT, INSERT ON public.dosasce_users TO service_role;

-- Grant full control to postgres/dashboard
GRANT ALL ON public.dosasce_users TO postgres;

-- Policy: service role full access
CREATE POLICY "service role read" ON public.dosasce_users
    FOR SELECT TO service_role USING (true);

CREATE POLICY "service role insert" ON public.dosasce_users
    FOR INSERT TO service_role WITH CHECK (true);
