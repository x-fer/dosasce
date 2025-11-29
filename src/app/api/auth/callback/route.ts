import { createServer } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/";
  const origin = requestUrl.origin;

  if (code) {
    const supabase = await createServer();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const userCategory = user?.user_metadata?.user_category;

      const redirectPath = userCategory ? next : "/settings";
      const forwardedHost = request.headers.get("x-forwarded-host");
      const redirectBase = forwardedHost ? `https://${forwardedHost}` : origin;

      return NextResponse.redirect(`${redirectBase}${redirectPath}`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
