import { NextResponse } from "next/server";
import { createAdminServer } from "@/lib/supabase/server";

export const runtime = "edge";

export async function GET({
  params,
}: {
  params: Promise<{ year: string; problem: string }>;
}) {
  try {
    const { year, problem } = await params;
    const year_num = parseInt(year);
    const problem_num = parseInt(problem);

    if (isNaN(year_num) || isNaN(problem_num)) {
      return NextResponse.json(
        { error: "Invalid year or problem number" },
        { status: 400 },
      );
    }

    const supabaseAdmin = createAdminServer();

    const { data, error } = await supabaseAdmin
      .from("leaderboard")
      .select("user_id, full_name, avatar_url, score, submitted_at")
      .eq("year_num", year_num)
      .eq("problem_num", problem_num)
      .order("score", { ascending: false })
      .order("submitted_at", { ascending: true });

    if (error) {
      console.error("Leaderboard query error:", error);
      return NextResponse.json(
        { error: "Failed to fetch leaderboard" },
        { status: 500 },
      );
    }

    const response = NextResponse.json(data || []);
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=30",
    );
    return response;
  } catch (error) {
    console.error("Leaderboard error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
