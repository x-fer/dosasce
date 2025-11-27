import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in to submit solutions." },
        { status: 401 },
      );
    }

    const { user_solution, year_id, problem_id } = await request.json();

    if (!user_solution) {
      return NextResponse.json(
        { error: "User solution is required" },
        { status: 400 },
      );
    }

    if (!year_id || !problem_id) {
      return NextResponse.json(
        { error: "Year ID and Problem ID are required" },
        { status: 400 },
      );
    }

    const backendUrl = process.env.BACKEND_URL;
    if (!backendUrl) {
      throw new Error("BACKEND_URL is not configured");
    }

    const backendResponse = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_solution,
        year_id,
        problem_id,
      }),
    });

    if (!backendResponse.ok) {
      const errorText = await backendResponse.text();
      console.error("Backend error:", errorText);
      return NextResponse.json(
        { error: "Failed to submit solution to backend" },
        { status: backendResponse.status },
      );
    }

    const result = await backendResponse.json();
    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error("Judge error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
