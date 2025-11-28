-- Create submissions table
CREATE TABLE public.submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    problem_id UUID NOT NULL REFERENCES public.problems(id) ON DELETE CASCADE,
    judge0_submission_id TEXT NOT NULL,
    score DOUBLE PRECISION NOT NULL,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- Access Control: Fully private
-- Revoke all permissions from public/anon/authenticated/service_role to ensure privacy
REVOKE ALL ON public.submissions FROM anon, authenticated, public;
REVOKE ALL ON public.submissions FROM service_role;
-- Grant READ and INSERT access only to service_role
GRANT SELECT, INSERT ON public.submissions TO service_role;
-- Grant ALL access to postgres/dashboard
GRANT ALL ON public.submissions TO postgres;

-- TRIGGER: Enforce that submissions follow year and problem rules
CREATE OR REPLACE FUNCTION public.validate_submission()
RETURNS TRIGGER AS $$
DECLARE
    year_active BOOLEAN;

    problem_start TIMESTAMPTZ;
    problem_end   TIMESTAMPTZ;
BEGIN
    SELECT y.is_active,
           p.starts_at, p.ends_at
    INTO year_active,
         problem_start, problem_end
    FROM public.years y
    JOIN public.problems p ON p.year_id = y.id
    WHERE p.id = NEW.problem_id;

    -- Prevent submissions if year is inactive
    IF NOT year_active THEN
        RAISE EXCEPTION 'Cannot submit to an inactive year.';
    END IF;

    -- Prevent submissions before problem opens
    IF now() < problem_start THEN
        RAISE EXCEPTION 'Problem not open yet.';
    END IF;

    -- Prevent submissions after problem closes
    IF now() > problem_end THEN
        RAISE EXCEPTION 'Problem is already closed.';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_submission_rules
BEFORE INSERT ON public.submissions
FOR EACH ROW
EXECUTE FUNCTION public.validate_submission();
