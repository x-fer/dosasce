import { useQuery } from "@tanstack/react-query";

interface LeaderboardEntry {
  user_id: string;
  full_name: string;
  avatar_url: string;
  user_category?: string;
  score: number;
  submitted_at: string;
}

export function useLeaderboard(year_num: number, problem_num: number) {
  return useQuery<LeaderboardEntry[]>({
    queryKey: ["leaderboard", year_num, problem_num],
    queryFn: async () => {
      const response = await fetch(
        `/api/leaderboard/${year_num}/${problem_num}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch leaderboard");
      }
      return response.json();
    },
    refetchInterval: 60000,
    staleTime: 30000,
  });
}

export type { LeaderboardEntry };
