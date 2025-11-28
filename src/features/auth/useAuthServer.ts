import { createServer } from "@/lib/supabase/server";

export async function useAuthServer() {
  const supabase = await createServer();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return {
    user: session?.user ?? null,
    session: session ?? null,
    isAuthenticated: !!session?.user,
  };
}
