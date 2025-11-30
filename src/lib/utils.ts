import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format date for Croatian locale (e.g., "14. 12.")
 */
export function formatDateHR(date: Date): string {
  return date.toLocaleDateString("hr", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
}

/**
 * Format date for English locale (e.g., "12/14")
 */
export function formatDateEN(date: Date): string {
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
}

export const getProblemLink = (year_num: number, problem_num: number) => {
  return `/${year_num}/${problem_num}/problem`;
};

export const getLeaderboardLink = (year_num: number, problem_num: number) => {
  return `/${year_num}/${problem_num}/leaderboard`;
};

export function getYearNumAndProblemNumFromPathname(pathname: string) {
  const match = pathname.match(/^\/(\d+)\/(\d+)\//);

  if (!match || !match[1] || !match[2]) {
    throw new Error(
      `Invalid pathname format: expected /year_num/problem_num, got ${pathname}`,
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
