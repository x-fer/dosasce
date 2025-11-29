-- Create dosasce_users table
CREATE TABLE public.dosasce_users (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    user_group TEXT NOT NULL CHECK (
        user_group IN ('osnovna','srednja','preddiplomski','diplomski','open')
    )
);

-- RLS
ALTER TABLE public.dosasce_users ENABLE ROW LEVEL SECURITY;

-- Access Control: Fully private
-- Revoke all permissions from public/anon/authenticated/service_role to ensure privacy
REVOKE ALL ON public.dosasce_users FROM anon, authenticated, public, service_role;
-- Grant READ and INSERT access only to service_role
GRANT SELECT, INSERT ON public.dosasce_users TO service_role;
-- Grant ALL access to postgres/dashboard
GRANT ALL ON public.dosasce_users TO postgres;

