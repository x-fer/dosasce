import { HeaderDropdown } from "@/components/ui/dropdown";
import { Anchor } from "../ui/anchor";
import { getConfig } from "@/lib/config";

export default function Header() {
  const config = getConfig(2025);

  const problems = config.problems
    .filter((problem) => problem.id !== 8)
    .map((problem) => ({
      id: problem.id,
      title: "Zadatak " + problem.id,
      href: `/problem/${config.year}/${problem.id}`,
    }));

  const leaderboards = config.problems
    .filter((problem) => problem.id !== 8)
    .map((problem) => ({
      id: problem.id,
      title: "Zadatak " + problem.id,
      href: `/leaderboard/${config.year}/${problem.id}`,
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
