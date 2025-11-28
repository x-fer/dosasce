-- Create problems table
CREATE TABLE public.problems (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    year_id UUID NOT NULL REFERENCES public.years(id) ON DELETE CASCADE,
    problem_num INTEGER NOT NULL,
    starts_at TIMESTAMPTZ NOT NULL,
    ends_at TIMESTAMPTZ NOT NULL,
    UNIQUE (year_id, problem_num)
);

-- RLS
ALTER TABLE public.problems ENABLE ROW LEVEL SECURITY;

-- Access Control: Fully private
-- Revoke all permissions from public/anon/authenticated/service_role to ensure privacy
REVOKE ALL ON public.problems FROM anon, authenticated, public;
REVOKE ALL ON public.problems FROM service_role;
-- Grant READ access only to service_role
GRANT SELECT ON public.problems TO service_role;
-- Grant ALL access to postgres/dashboard
GRANT ALL ON public.problems TO postgres;


-- TRIGGER: Enforce problem window is within year window and the year is active
CREATE OR REPLACE FUNCTION public.check_problem_window()
RETURNS TRIGGER AS $$
DECLARE
    year_start TIMESTAMPTZ;
    year_end TIMESTAMPTZ;
    year_active BOOLEAN;
BEGIN
    SELECT starts_at, ends_at, is_active
    INTO year_start, year_end, year_active
    FROM public.years
    WHERE id = NEW.year_id;

    -- Check if the year is active
    IF NOT year_active THEN
        RAISE EXCEPTION 'Cannot create or modify problem because parent year (%) is inactive', NEW.year_id;
    END IF;

    -- Check if the problem starts too early
    IF NEW.starts_at < year_start THEN
        RAISE EXCEPTION 'Problem starts_at (%) cannot be earlier than year starts_at (%)', NEW.starts_at, year_start;
    END IF;

    -- Check if the problem ends too late
    IF NEW.ends_at > year_end THEN
        RAISE EXCEPTION 'Problem ends_at (%) cannot be later than year ends_at (%)', NEW.ends_at, year_end;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_problem_window
    BEFORE INSERT OR UPDATE ON public.problems
    FOR EACH ROW
    EXECUTE FUNCTION public.check_problem_window();


-- INSTRUCTIONS ON HOW TO CREATE NEW PROBLEM(Requires knowing the UUID of the year):
-- INSERT INTO public.problems (year_id, problem_num, starts_at, ends_at)
-- VALUES (
--   (SELECT id FROM public.years WHERE year_num = 2025),
--   1,
--   '2025-01-01 10:00:00+00',
--   '2025-01-01 12:00:00+00'
-- );
