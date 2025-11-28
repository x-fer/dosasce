export function getProblemYearAndId(
  pathname: string,
  page: "problem" | "leaderboard",
) {
  const match = pathname.match(new RegExp(`^/${page}/(\\d+)/(\\d+)$`));

  if (!match || !match[1] || !match[2]) {
    throw new Error(
      `Invalid pathname format: expected /${page}/year_num/problem_num, got ${pathname}`,
    );
  }

  return { year_num: match[1], problem_num: match[2] };
}
