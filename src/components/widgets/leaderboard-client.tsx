"use client";

import { useAuthClient } from "@/features/auth/useAuthClient";
import { usePathname } from "next/navigation";
import { notFound } from "next/navigation";
import { getYearNumAndProblemNumFromPathname } from "@/lib/problem";
import { useLeaderboard } from "@/features/leaderboard/useLeaderboard";

export default function LeaderboardClient() {
  const pathname = usePathname();
  const { user } = useAuthClient();
  const currentUserId = user?.id;

  let year_num: number;
  let problem_num: number;

  try {
    const parsed = getYearNumAndProblemNumFromPathname(pathname, "leaderboard");
    year_num = parsed.year_num;
    problem_num = parsed.problem_num;
  } catch {
    notFound();
  }

  const {
    data: leaderboard,
    isLoading,
    isError,
  } = useLeaderboard(year_num, problem_num);

  if (isLoading) {
    return (
      <div className="container mx-auto p-8 pt-[60px]">
        <h1 className="mb-6 text-3xl font-bold">
          Leaderboard - Year {year_num}, Problem {problem_num}
        </h1>
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (isError) {
    notFound();
  }

  if (!leaderboard || leaderboard.length === 0) {
    return (
      <div className="container mx-auto p-8 pt-[60px]">
        <h1 className="mb-6 text-3xl font-bold">
          Leaderboard - Year {year_num}, Problem {problem_num}
        </h1>
        <p className="text-gray-500">No submissions yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 pt-[60px]">
      <h1 className="mb-6 text-3xl font-bold">
        Leaderboard - Year {year_num}, Problem {problem_num}
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                User
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                Score
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                Submitted At
              </th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => {
              const isCurrentUser = currentUserId === entry.user_id;
              const bgClass = isCurrentUser
                ? "bg-green-100"
                : index % 2 === 0
                  ? "bg-white"
                  : "bg-gray-50";

              return (
                <tr key={entry.user_id} className={bgClass}>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    #{index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-3">
                      {entry.avatar_url && (
                        <img
                          src={entry.avatar_url}
                          alt={entry.full_name}
                          className="h-8 w-8 rounded-full"
                        />
                      )}
                      <span className="font-medium text-gray-900">
                        {entry.full_name || "Anonymous"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-sm text-gray-900">
                    {entry.score.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-gray-500">
                    {new Date(entry.submitted_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
