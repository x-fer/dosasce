export function getYearAndProblemNumFromPathname(
  pathname: string,
  page: "problem" | "leaderboard",
) {
  const match = pathname.match(new RegExp(`^/${page}/(\\d+)/(\\d+)$`));

  if (!match || !match[1] || !match[2]) {
    throw new Error(
      `Invalid pathname format: expected /${page}/year_num/problem_num, got ${pathname}`,
    );
  }

  const year_num = parseInt(match[1]);
  const problem_num = parseInt(match[2]);

  if (isNaN(year_num) || isNaN(problem_num)) {
    throw new Error(
      `Invalid year or problem number: expected year_num and problem_num to be numbers, got ${match[1]} and ${match[2]}`,
    );
  }

  return { year_num, problem_num };
}
