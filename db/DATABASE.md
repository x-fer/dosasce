# Database Schema & Policies

This directory contains the SQL definitions for the Dosasce++ database schema. These SQL files are the **source of truth** for the database structure.

The system uses a relational model on Supabase PostgreSQL. Access is strictly controlled via Row Level Security (RLS) and SQL-level permissions, generally disallowing direct client-side access in favor of a secure Backend API.

## Tables & Views

### 1. Years

**Source:** [`years.sql`](./years.sql)

Configuration for competition years.

- `id`: UUID (Primary Key, Default: `uuid_generate_v4()`)
- `year_num`: Integer (Unique, e.g., 2023, 2024)
- `is_active`: Boolean (Default: `FALSE`)
- `starts_at`: Timestamp
- `ends_at`: Timestamp

**Access Control (RLS):**

- **Fully Private**: No access for `anon` or `authenticated` users.
- **Service Role**: Read-only (`SELECT`).
- **Management**: Only modifiable via Supabase Dashboard or SQL admin.

### 2. Problems

**Source:** [`problems.sql`](./problems.sql)

Problems belonging to a specific year.

- `id`: UUID (Primary Key, Default: `uuid_generate_v4()`)
- `year_id`: UUID (Foreign Key to `years`, `ON DELETE CASCADE`)
- `problem_num`: Integer (e.g., 1, 2, 3)
- `starts_at`: Timestamp
- `ends_at`: Timestamp
- **Constraint**: Unique on `(year_id, problem_num)`

**Access Control (RLS):**

- **Fully Private**: No access for `anon` or `authenticated` users.
- **Service Role**: Read-only (`SELECT`).
- **Management**: Only modifiable via Supabase Dashboard or SQL admin.

**Triggers:**

- `enforce_problem_window`: Ensures the problem's time window is strictly contained within its parent year's window and that the parent year is active.

### 3. Submissions

**Source:** [`submissions.sql`](./submissions.sql)

Stores every user attempt at a problem. This is an append-only log of attempts.

- `id`: UUID (Primary Key, Default: `uuid_generate_v4()`)
- `user_id`: UUID (Foreign Key to `auth.users`, `ON DELETE CASCADE`)
- `problem_id`: UUID (Foreign Key to `problems`, `ON DELETE CASCADE`)
- `judge0_submission_id`: Text (External reference)
- `score`: Double Precision
- `submitted_at`: Timestamp (Default: `now()`)

**Access Control (RLS):**

- **Fully Private**: No access for `anon` or `authenticated` users.
- **Service Role**: Read (`SELECT`) and Insert (`INSERT`).
- **Management**: Only modifiable via Supabase Dashboard or SQL admin.

**Triggers:**

- `enforce_submission_rules`: Validates that the year is active and the current time is within the problem's `starts_at` and `ends_at` window before allowing insertion.

### 4. Leaderboard

**Source:** [`leaderboard.sql`](./leaderboard.sql)

A computed view that determines the best result per user for each problem.

- `user_id`, `full_name`, `avatar_url` (from `auth.users` metadata)
- `year_num`, `problem_num`
- `judge0_submission_id`, `score`, `submitted_at`

**Logic:**

- Selects the **highest score** for each user/problem pair.
- Tie-breaker: Earliest `submitted_at` wins.

**Access Control:**

- **Fully Private**: No access for `anon` or `authenticated` users.
- **Service Role**: Read-only (`SELECT`).
