import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createServer() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(
          cookiesToSet: Array<{
            name: string;
            value: string;
            options?: Record<string, unknown>;
          }>,
        ) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(
              name,
              value,
              options as Parameters<typeof cookieStore.set>[2],
            ),
          );
        },
      },
    },
  );
}

export async function createAdminServer() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(
          cookiesToSet: Array<{
            name: string;
            value: string;
            options?: Record<string, unknown>;
          }>,
        ) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(
              name,
              value,
              options as Parameters<typeof cookieStore.set>[2],
            ),
          );
        },
      },
    },
  );
}
