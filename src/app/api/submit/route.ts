import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { RESPONSE_TYPE } from "@/lib/types";

export const runtime = "edge";

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_MAX = 5; // 5 requests
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(userId: string): {
  allowed: boolean;
  message?: string;
} {
  const now = Date.now();
  const userLimit = rateLimitStore.get(userId);

  if (userLimit && now > userLimit.resetTime) {
    rateLimitStore.delete(userId);
  }

  const currentLimit = rateLimitStore.get(userId);

  if (!currentLimit) {
    rateLimitStore.set(userId, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return { allowed: true };
  }

  if (currentLimit.count >= RATE_LIMIT_MAX) {
    return {
      allowed: false,
      message: "Too many submissions. Please wait a minute.",
    };
  }

  currentLimit.count += 1;
  rateLimitStore.set(userId, currentLimit);

  return { allowed: true };
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        {
          type: RESPONSE_TYPE.ERROR,
          value: "Unauthorized. Please log in to submit solutions.",
        },
        { status: 401 },
      );
    }

    const rateLimitCheck = checkRateLimit(user.id);
    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        {
          type: RESPONSE_TYPE.WARNING,
          value: rateLimitCheck.message,
        },
        { status: 429 },
      );
    }

    const { user_solution, year_id, problem_id } = await request.json();

    if (!user_solution) {
      return NextResponse.json(
        { type: RESPONSE_TYPE.ERROR, value: "User solution is required" },
        { status: 400 },
      );
    }

    if (!year_id || !problem_id) {
      return NextResponse.json(
        {
          type: RESPONSE_TYPE.ERROR,
          value: "Year ID and Problem ID are required",
        },
        { status: 400 },
      );
    }

    const backendUrl = `${process.env.BACKEND_URL}/submit`;

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
        {
          type: RESPONSE_TYPE.ERROR,
          value: "Failed to submit solution to backend",
        },
        { status: backendResponse.status },
      );
    }

    const result = await backendResponse.json();

    if (result.type && result.value) {
      return NextResponse.json(result);
    }

    return NextResponse.json({
      type: RESPONSE_TYPE.ERROR,
      value: "Unexpected response format from backend",
    });
  } catch (error: unknown) {
    console.error("Judge error:", error);
    return NextResponse.json(
      {
        type: RESPONSE_TYPE.ERROR,
        value: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
