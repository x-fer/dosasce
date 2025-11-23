"use client";

import Link from "next/link";
import { HeaderDropdown } from "@/components/ui/dropdown";
import { config } from "@problems/2025/config";

export default function Header() {
  const tasks = config.problems.map((problem) => ({
    id: problem.id,
    title: problem.title,
    href: `/problem/${problem.id}`,
  }));

  const leaderboards = config.problems.map((problem) => ({
    id: problem.id,
    title: problem.title,
    href: `/leaderboard/${problem.id}`,
  }));

  return (
    <header className="bg-dosasce-red text-dosasce-white fixed top-0 z-50 flex min-h-[60px] w-full items-center justify-between px-4 shadow-lg sm:px-6 md:px-8">
      <Link href="/" className="font-serif text-2xl font-bold">
        došašće++
      </Link>

      <HeaderDropdown tasks={tasks} leaderboards={leaderboards} />
    </header>
  );
}
