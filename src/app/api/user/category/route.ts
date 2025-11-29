import { NextResponse } from "next/server";
import { createServer } from "@/lib/supabase/server";
import { VALID_CATEGORIES } from "@/lib/const/categories";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const supabase = await createServer();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { user_category } = await request.json();

    if (!user_category || !VALID_CATEGORIES.includes(user_category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    const { error: updateError } = await supabase.auth.updateUser({
      data: { user_category },
    });

    if (updateError) {
      console.error("Error updating user category:", updateError);
      return NextResponse.json(
        { error: "Failed to save category" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Category update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
