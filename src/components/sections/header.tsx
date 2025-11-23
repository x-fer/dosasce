import { HeaderDropdown } from "@/components/ui/dropdown";
import { config } from "@problems/2025/config";
import { Anchor } from "../ui/anchor";

export default function Header() {
  const tasks = config.problems.map((problem) => ({
    id: problem.id,
    title: "Zadatak " + problem.id,
    href: `/problem/${problem.id}`,
  }));

  const leaderboards = config.problems.map((problem) => ({
    id: problem.id,
    title: "Zadatak " + problem.id,
    href: `/leaderboard/${problem.id}`,
  }));

  return (
    <header className="bg-dosasce-red text-dosasce-white fixed top-0 z-50 flex min-h-[60px] w-full items-center justify-between px-4 shadow-lg sm:px-6 md:px-8">
      <Anchor href="/" className="font-serif text-2xl font-bold" styled={false}>
        došašće++
      </Anchor>

      <HeaderDropdown tasks={tasks} leaderboards={leaderboards} />
    </header>
  );
}
