"use client";

import { HeaderDropdown } from "@/components/ui/dropdown";
import { Anchor } from "../ui/anchor";
import { getYearConfig } from "@/config/utils";
import { getProblemLink, getLeaderboardLink } from "@/lib/utils";

export default function Header() {
  const config = getYearConfig(2025);
  const now = new Date();

  // Filter only active
  const activeProblems = config.problems.filter(
    (problem) => now >= problem.startDate && now <= problem.endTime,
  );

  const problems = activeProblems.map((problem) => ({
    id: problem.problem_num,
    title: "Zadatak " + problem.problem_num,
    href: getProblemLink(config.year, problem.problem_num),
  }));

  const leaderboards = activeProblems.map((problem) => ({
    id: problem.problem_num,
    title: "Zadatak " + problem.problem_num,
    href: getLeaderboardLink(config.year, problem.problem_num),
  }));

  return (
    <header className="bg-dosasce-red text-dosasce-white fixed top-0 z-50 flex min-h-[60px] w-full items-center justify-between px-4 shadow-lg sm:px-6 md:px-8">
      <Anchor href="/" className="font-serif text-2xl font-bold" styled={false}>
        došašće++
      </Anchor>

      <HeaderDropdown problems={problems} leaderboards={leaderboards} />
    </header>
  );
}
