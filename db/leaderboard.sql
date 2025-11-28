-- Create leaderboard view (Derived automatically from submissions, problems, years, and user metadata)
CREATE OR REPLACE VIEW public.leaderboard AS
SELECT DISTINCT ON (s.user_id, p.year_id, p.problem_num)
    s.user_id,
    u.raw_user_meta_data->>'full_name' AS full_name,
    u.raw_user_meta_data->>'avatar_url' AS avatar_url,
    y.year_num,
    p.problem_num,
    s.judge0_submission_id,
    s.score,
    s.submitted_at
FROM public.submissions s
JOIN public.problems p ON s.problem_id = p.id
JOIN public.years y ON p.year_id = y.id
JOIN auth.users u ON u.id = s.user_id
ORDER BY
    s.user_id,
    p.year_id,
    p.problem_num,
    s.score DESC,        -- highest score submission wins
    s.submitted_at ASC;  -- earliest submission wins ties

-- Access Control: Fully private
-- Revoke all permissions from public/anon/authenticated/service_role to ensure privacy
REVOKE ALL ON public.leaderboard FROM anon, authenticated, public;
REVOKE ALL ON public.leaderboard FROM service_role;
-- Grant READ access only to service_role
GRANT SELECT ON public.leaderboard TO service_role;
-- Grant ALL access to postgres/dashboard
GRANT ALL ON public.leaderboard TO postgres;
