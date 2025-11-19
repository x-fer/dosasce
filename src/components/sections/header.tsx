"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, Trophy, Code, LogIn, User } from "lucide-react";
import { config } from "@problems/2025/config";
import { createClient } from "@/lib/supabase/client";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SupabaseUser = any;

export default function Header() {
  const [problemsOpen, setProblemsOpen] = useState(false);
  const [leaderboardsOpen, setLeaderboardsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  const problemsRef = useRef<HTMLDivElement>(null);
  const leaderboardsRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        problemsRef.current &&
        !problemsRef.current.contains(event.target as Node)
      ) {
        setProblemsOpen(false);
      }
      if (
        leaderboardsRef.current &&
        !leaderboardsRef.current.contains(event.target as Node)
      ) {
        setLeaderboardsOpen(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(window.location.pathname)}`,
      },
    });

    if (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserMenuOpen(false);
    router.refresh();
  };

  return (
    <header className="bg-dosasce-red text-dosasce-white sticky top-0 z-50 flex min-h-[60px] w-full items-center justify-between px-4 shadow-lg sm:px-6 md:px-8">
      <Link href="/" className="font-serif text-2xl font-bold">
        došašće++
      </Link>

      <nav className="flex items-center gap-4 sm:gap-6">
        {/* Problems Dropdown */}
        <div className="relative" ref={problemsRef}>
          <button
            onClick={() => {
              setProblemsOpen(!problemsOpen);
              setLeaderboardsOpen(false);
              setUserMenuOpen(false);
            }}
            className="flex items-center gap-1 font-sans text-base hover:opacity-80"
            aria-expanded={problemsOpen}
            aria-haspopup="true"
          >
            <Code size={20} />
            <span className="hidden sm:inline">Zadaci</span>
            <ChevronDown
              size={16}
              className={`transition-transform ${problemsOpen ? "rotate-180" : ""}`}
            />
          </button>
          {problemsOpen && (
            <div className="bg-dosasce-red absolute top-full right-0 mt-2 flex min-w-[160px] flex-col rounded-b-lg py-2 shadow-xl">
              {config.problems.map((problem) => (
                <Link
                  key={problem.id}
                  href={`/problem/${problem.id}`}
                  className="hover:bg-dosasce-red/80 px-4 py-2"
                  onClick={() => setProblemsOpen(false)}
                >
                  {problem.title}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Leaderboards Dropdown */}
        <div className="relative" ref={leaderboardsRef}>
          <button
            onClick={() => {
              setLeaderboardsOpen(!leaderboardsOpen);
              setProblemsOpen(false);
              setUserMenuOpen(false);
            }}
            className="flex items-center gap-1 font-sans text-base hover:opacity-80"
            aria-expanded={leaderboardsOpen}
            aria-haspopup="true"
          >
            <Trophy size={20} />
            <span className="hidden sm:inline">Rang-lista</span>
            <ChevronDown
              size={16}
              className={`transition-transform ${leaderboardsOpen ? "rotate-180" : ""}`}
            />
          </button>
          {leaderboardsOpen && (
            <div className="bg-dosasce-red absolute top-full right-0 mt-2 flex min-w-[160px] flex-col rounded-b-lg py-2 shadow-xl">
              {config.problems.map((problem) => (
                <Link
                  key={problem.id}
                  href={`/leaderboard/${problem.id}`}
                  className="hover:bg-dosasce-red/80 px-4 py-2"
                  onClick={() => setLeaderboardsOpen(false)}
                >
                  {problem.title}
                </Link>
              ))}
              <Link
                href="/leaderboard/total"
                className="hover:bg-dosasce-red/80 px-4 py-2"
                onClick={() => setLeaderboardsOpen(false)}
              >
                Ukupno
              </Link>
            </div>
          )}
        </div>

        {/* Login/User Menu */}
        {!loading && (
          <>
            {!user ? (
              <button
                onClick={handleGoogleLogin}
                className="border-dosasce-white hover:bg-dosasce-white/10 flex items-center gap-2 rounded-full border-2 px-4 py-1.5 font-sans text-sm"
              >
                <LogIn size={18} />
                <span className="hidden sm:inline">Prijavi se</span>
              </button>
            ) : (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => {
                    setUserMenuOpen(!userMenuOpen);
                    setProblemsOpen(false);
                    setLeaderboardsOpen(false);
                  }}
                  className="border-dosasce-white hover:bg-dosasce-white/10 flex items-center gap-2 rounded-full border-2 p-1.5"
                  aria-expanded={userMenuOpen}
                >
                  {user.user_metadata?.avatar_url ? (
                    <img
                      src={user.user_metadata.avatar_url}
                      alt={user.user_metadata?.full_name || "User"}
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <User size={18} />
                  )}
                </button>
                {userMenuOpen && (
                  <div className="bg-dosasce-red absolute top-full right-0 mt-2 flex min-w-[120px] flex-col rounded-b-lg py-2 shadow-xl">
                    <button
                      onClick={handleLogout}
                      className="hover:bg-dosasce-red/80 px-4 py-2 text-left"
                    >
                      Odjavi se
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </nav>
    </header>
  );
}
