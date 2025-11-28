import { useAuthServer } from "@/features/auth/useAuthServer";
import { getProblemYearAndId } from "@/lib/problem";
import { usePathname } from "next/navigation";

interface LeaderboardEntry {
  user_id: string;
  full_name: string;
  avatar_url: string;
  score: number;
  submitted_at: string;
}

async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  const pathname = usePathname();
  const { year_num, problem_num } = getProblemYearAndId(
    pathname,
    "leaderboard",
  );

  const response = await fetch(`/api/leaderboard/${year_num}/${problem_num}`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    return [];
  }

  return response.json();
}

export default async function LeaderboardPage() {
  const leaderboard = await getLeaderboard();
  const { user } = await useAuthServer();
  const currentUserId = user?.id;

  if (!leaderboard || leaderboard.length === 0) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="mb-6 text-3xl font-bold">
          Leaderboard - Year 2025, Problem 8
        </h1>
        <p className="text-gray-500">No submissions yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Leaderboard - Year 2025, Problem 8
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
