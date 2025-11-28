import { NextResponse } from "next/server";
import { createServer, createAdminServer } from "@/lib/supabase/server";
import { RESPONSE_TYPE, type SubmissionResponse } from "@/lib/types";
import { isNumber } from "util";

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
    const supabase = await createServer();
    const supabaseAdmin = createAdminServer();

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session?.user) {
      return NextResponse.json(
        {
          type: RESPONSE_TYPE.ERROR,
          value: "Unauthorized. Please log in to submit solutions.",
        },
        { status: 401 },
      );
    }

    const user = session.user;
    const supabaseToken = session.access_token;

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

    const { user_solution, year_num, problem_num } = await request.json();

    if (!user_solution) {
      return NextResponse.json(
        { type: RESPONSE_TYPE.ERROR, value: "User solution is required" },
        { status: 400 },
      );
    }

    if (!year_num || !problem_num) {
      return NextResponse.json(
        {
          type: RESPONSE_TYPE.ERROR,
          value: "Year number and Problem number are required",
        },
        { status: 400 },
      );
    }

    const { data: yearData, error: yearError } = await supabaseAdmin
      .from("years")
      .select("id")
      .eq("year_num", year_num)
      .single();

    if (yearError || !yearData) {
      console.error("Error finding year:", yearError);
      return NextResponse.json(
        {
          type: RESPONSE_TYPE.ERROR,
          value: `No year ${year_num} defined for this problem`,
        },
        { status: 404 },
      );
    }

    const { data: problemData, error: problemError } = await supabaseAdmin
      .from("problems")
      .select("id")
      .eq("year_id", yearData.id)
      .eq("problem_num", problem_num)
      .single();

    if (problemError || !problemData) {
      console.error("Error finding problem:", problemError);
      return NextResponse.json(
        {
          type: RESPONSE_TYPE.ERROR,
          value: `No problem ${problem_num} defined for year ${year_num}.}`,
        },
        { status: 404 },
      );
    }

    console.log("yearData", yearData);
    console.log("problemData", problemData);

    const problem_id = problemData.id;

    const backendUrl = `${process.env.BACKEND_URL}/submit`;

    if (!backendUrl) {
      throw new Error("BACKEND_URL is not configured");
    }

    const backendResponse = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${supabaseToken}`,
      },
      body: JSON.stringify({
        user_solution,
        year_num,
        problem_num,
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

    const result: SubmissionResponse = await backendResponse.json();

    if (
      RESPONSE_TYPE.SUCCESS === result.type &&
      isNumber(result.value) &&
      !isNaN(result.value) &&
      result.submission_id
    ) {
      try {
        const { error: insertError } = await supabaseAdmin
          .from("submissions")
          .insert({
            user_id: user.id,
            problem_id: problem_id,
            judge0_submission_id: result.submission_id,
            score: result.value,
            submitted_at: result.timestamp,
          });

        if (insertError) {
          console.error("Database insertion error:", insertError);
        }
      } catch (dbError) {
        console.error("Database error:", dbError);
      }
    }

    // Remove timestamp and submission_id from the response before returning it
    if (result.type && result.value) {
      const clientResponse: Partial<SubmissionResponse> = {
        type: result.type,
        value: result.value,
      };
      return NextResponse.json(clientResponse);
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
