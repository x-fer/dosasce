import { data } from "./data";
import type { ProblemConfig, YearConfig } from "./types";

/**
 * Get config for a specific year
 */
export function getYearConfig(yearNum: number | string): YearConfig {
  const yearTyped = typeof yearNum === "string" ? Number(yearNum) : yearNum;

  if (!data[yearTyped as keyof typeof data]) {
    throw new Error(`Config for year ${yearTyped} not found`);
  }

  return data[yearTyped as keyof typeof data];
}

/**
 * Get config for a specific year and problem
 */
export function getProblemConfig(
  yearNum: number | string,
  problemNum: number | string,
): ProblemConfig {
  const yearTyped = typeof yearNum === "string" ? Number(yearNum) : yearNum;
  const yearConfig = getYearConfig(yearTyped);

  const problemTyped =
    typeof problemNum === "string" ? Number(problemNum) : problemNum;
  const problem = yearConfig.problems.find(
    (p) => p.problem_num === problemTyped,
  );

  if (!problem) {
    throw new Error(`Problem ${problemTyped} not found for year ${yearTyped}`);
  }

  return problem;
}
