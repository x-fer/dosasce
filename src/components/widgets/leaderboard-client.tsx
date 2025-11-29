"use client";

import { useState, useMemo, useEffect } from "react";
import { useAuthClient } from "@/features/auth/useAuthClient";
import { usePathname } from "next/navigation";
import { getYearNumAndProblemNumFromPathname } from "@/lib/problem";
import { useLeaderboard } from "@/features/leaderboard/useLeaderboard";
import LoadingScreen from "@/components/widgets/loading-screen";
import { Anchor } from "@/components/ui/anchor";
import {
  CATEGORY,
  CATEGORY_LABELS,
  type FilterCategory,
} from "@/lib/const/categories";

export default function LeaderboardClient() {
  const pathname = usePathname();
  const { user } = useAuthClient();
  const currentUserId = user?.id;
  const userCategory = user?.user_metadata?.user_category as
    | FilterCategory
    | undefined;

  let year_num: number;
  let problem_num: number;

  try {
    const parsed = getYearNumAndProblemNumFromPathname(pathname, "leaderboard");
    year_num = parsed.year_num;
    problem_num = parsed.problem_num;
  } catch {
    return (
      <div className="flex grow flex-col items-center justify-center">
        <p className="text-center text-lg font-bold text-gray-700">
          Greška u rang listi. Pričekajte, ako se ne riješi ubrzo javite nam se
          na mail{" "}
          <a
            href="mailto:dosasce@xfer.hr"
            className="text-dosasce-red hover:text-dosasce-red/80 underline"
          >
            dosasce@xfer.hr
          </a>
        </p>
      </div>
    );
  }

  const {
    data: leaderboard,
    isLoading,
    isError,
  } = useLeaderboard(year_num, problem_num);

  // Default category
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>(
    userCategory || "ukupno",
  );

  useEffect(() => {
    if (userCategory) {
      setSelectedCategory(userCategory);
    }
  }, [userCategory]);

  const filteredLeaderboard = useMemo(() => {
    if (!leaderboard) return [];
    if (selectedCategory === "ukupno") return leaderboard;
    return leaderboard.filter(
      (entry) => entry.user_category === selectedCategory,
    );
  }, [leaderboard, selectedCategory]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return (
      <div className="flex grow flex-col items-center justify-center">
        <p className="text-center text-lg font-bold text-gray-700">
          Greška u rang listi. Pričekajte, ako se ne riješi ubrzo javite nam se
          na mail:{" "}
          <a
            href="mailto:dosasce@xfer.hr"
            className="text-dosasce-red hover:text-dosasce-red/80 underline"
          >
            dosasce@xfer.hr
          </a>
        </p>
      </div>
    );
  }

  if (!leaderboard || leaderboard.length === 0) {
    return (
      <section className="bg-dosasce-white border-dosasce-light-red mx-auto mt-25 mb-15 w-full max-w-5xl rounded-xl px-4 py-6 md:border-2 md:px-8 md:py-10">
        <h1 className="mb-2 text-3xl font-bold">Rang lista</h1>
        <p className="mb-1 text-gray-600">Godina {year_num}</p>
        <p className="mb-8 text-gray-600">Zadatak: {problem_num}</p>
        <p className="text-gray-500">
          Nema još nikavih rezultata za ovu godinu i zadatak.
        </p>
      </section>
    );
  }

  const categories: FilterCategory[] = [
    "ukupno",
    CATEGORY.OSNOVNA,
    CATEGORY.SREDNJA,
    CATEGORY.PREDDIPLOMSKI,
    CATEGORY.DIPLOMSKI,
    CATEGORY.OPEN,
  ];

  return (
    <section className="bg-dosasce-white border-dosasce-light-red mx-auto mt-25 mb-15 w-full max-w-5xl rounded-xl px-4 py-6 md:border-2 md:px-8 md:py-10">
      <h1 className="mb-2 text-3xl font-bold">Rang lista</h1>
      <div className="flex flex-row items-center justify-between gap-2 text-xs sm:gap-4 sm:text-sm">
        <div>
          <p className="text-gray-600">Godina {year_num}</p>
          <p className="text-gray-600">Zadatak: {problem_num}</p>
        </div>
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="bg-dosasce-light-red h-2.5 w-2.5 rounded-full sm:h-4 sm:w-4"></div>
            <span className="text-xs text-gray-700 sm:text-sm">
              Tvoj rezultat
            </span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="bg-dosasce-light-green h-2.5 w-2.5 rounded-full sm:h-4 sm:w-4"></div>
            <span className="text-xs text-gray-700 sm:text-sm">
              Osvajači nagrada
            </span>
          </div>
        </div>
      </div>

      {/* Back to Problem Link */}
      <Anchor
        href={`/problem/${year_num}/${problem_num}`}
        className="mb-4 text-xs sm:text-sm"
      >
        ← Vrati se na zadatak
      </Anchor>

      {/* Category Filter */}
      <div className="mt-4 mb-6 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors md:px-4 md:py-2 md:text-sm ${
              selectedCategory === category
                ? "bg-dosasce-red text-dosasce-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {CATEGORY_LABELS[category]}
          </button>
        ))}
      </div>

      {/* Table */}
      <table className="w-full border border-gray-300 bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-2 py-1.5 text-center text-xs font-semibold text-gray-700 md:px-6 md:py-3 md:text-sm">
              Rang
            </th>
            <th className="px-2 py-1.5 text-center text-xs font-semibold text-gray-700 md:px-6 md:py-3 md:text-sm">
              Natjecatelj
            </th>
            <th className="px-2 py-1.5 text-center text-xs font-semibold text-gray-700 md:px-6 md:py-3 md:text-sm">
              Rezultat
            </th>
            <th className="px-2 py-1.5 text-center text-xs font-semibold text-gray-700 md:px-6 md:py-3 md:text-sm">
              Vrijeme
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredLeaderboard.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="px-2 py-4 text-center text-xs text-gray-500 md:px-6 md:text-sm"
              >
                Nema rezultata za ovu kategoriju.
              </td>
            </tr>
          ) : (
            filteredLeaderboard.map((entry, index) => {
              const isCurrentUser = currentUserId === entry.user_id;
              const bgClass = isCurrentUser
                ? "bg-dosasce-light-red"
                : index % 2 === 0
                  ? "bg-white"
                  : "bg-gray-50";

              return (
                <tr key={entry.user_id} className={bgClass}>
                  <td className="px-2 py-2 text-center text-xs text-gray-900 md:px-6 md:py-4 md:text-sm">
                    #{index + 1}
                  </td>
                  <td className="px-2 py-2 text-center text-xs md:px-6 md:py-4 md:text-sm">
                    <div className="flex items-center justify-center gap-2 md:gap-3">
                      {entry.avatar_url && (
                        <img
                          src={entry.avatar_url}
                          alt={entry.full_name}
                          className="h-5 w-5 rounded-full md:h-8 md:w-8"
                        />
                      )}
                      <span className="text-left font-medium text-gray-900">
                        {entry.full_name || "Anonymous"}
                      </span>
                    </div>
                  </td>
                  <td className="px-2 py-2 text-center font-mono text-xs text-gray-900 md:px-6 md:py-4 md:text-sm">
                    {entry.score.toFixed(2)}
                  </td>
                  <td className="px-2 py-2 text-center text-xs text-gray-500 md:px-6 md:py-4 md:text-sm">
                    {new Date(entry.submitted_at).toLocaleString("hr-HR", {
                      month: "numeric",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </section>
  );
}
