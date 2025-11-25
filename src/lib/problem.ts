export function getProblemYearAndId(
  pathname: string,
  page: "problem" | "leaderboard",
) {
  const match = pathname.match(new RegExp(`^/${page}/(\\d+)/(\\d+)$`));

  if (!match || !match[1] || !match[2]) {
    throw new Error(
      `Invalid pathname format: expected /${page}/year/id, got ${pathname}`,
    );
  }

  return { year: match[1], id: match[2] };
}
