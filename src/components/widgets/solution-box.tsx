"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Button from "@/components/ui/button";
import { Anchor } from "@/components/ui/anchor";
import { usePathname } from "next/navigation";
import { getYearNumAndProblemNumFromPathname } from "@/lib/problem";
import { RESPONSE_TYPE, type SubmissionResponse } from "@/lib/types";
import { getConfig } from "@/lib/config";
import { useLeaderboard } from "@/features/leaderboard/useLeaderboard";
import { useAuthClient } from "@/features/auth/useAuthClient";

export default function SolutionBox() {
  const pathname = usePathname();
  const { year_num, problem_num } = getYearNumAndProblemNumFromPathname(
    pathname,
    "problem",
  );
  const { user } = useAuthClient();
  const currentUserId = user?.id;

  const { data: leaderboard } = useLeaderboard(year_num, problem_num);
  const userEntry = leaderboard?.find(
    (entry) => entry.user_id === currentUserId,
  );
  const bestScore = userEntry?.score;

  const yearConfig = getConfig(year_num);
  const problem = yearConfig?.problems.find(
    (p) => p.problem_num === Number(problem_num),
  );
  const sanitize = problem?.sanitize;

  const mutation = useMutation({
    mutationFn: async (user_solution: string): Promise<SubmissionResponse> => {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_solution,
          problem_num,
          year_num,
        }),
      });

      const responseData: SubmissionResponse = await response.json();

      return responseData;
    },
  });

  function handleResponse(response: SubmissionResponse) {
    if (response.requiresCategory) {
      toast.warning(
        <div className="flex flex-col gap-2">
          <p>
            Molim odaberite kategoriju u kojoj se natjecate. Kategoriju možete
            odabrati u <Anchor href="/settings">postavkama</Anchor>.
          </p>
        </div>,
        {
          duration: Infinity,
        },
      );
    }

    switch (response.type) {
      case RESPONSE_TYPE.SUCCESS:
        toast.success(`Uspjeh, vaš rezultat: ${response.value}`);
        break;
      case RESPONSE_TYPE.ERROR:
        toast.error(response.value);
        break;
      case RESPONSE_TYPE.WARNING:
        toast.warning(response.value);
        break;
    }
  }

  async function handleSubmit(formData: FormData) {
    const solution = formData.get("solution") as string;

    // Dismiss all prior toasts when submitting again
    toast.dismiss();

    const loadingToast = toast.loading("Rješenje se šalje...");

    try {
      if (typeof sanitize === "function") {
        const sanitizeResult = sanitize(solution);
        if (sanitizeResult.type === RESPONSE_TYPE.ERROR) {
          toast.dismiss(loadingToast);
          toast.error(sanitizeResult.value);
          return;
        }
      }

      const result = await mutation.mutateAsync(solution);
      toast.dismiss(loadingToast);
      handleResponse(result);
    } catch (error) {
      toast.dismiss(loadingToast);
      if (
        error &&
        typeof error === "object" &&
        "type" in error &&
        "value" in error
      ) {
        handleResponse(error as SubmissionResponse);
      } else {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        handleResponse({
          type: RESPONSE_TYPE.ERROR,
          value:
            errorMessage ||
            "Došlo je do greške pri slanju rješenja. Molimo pokušajte ponovno.",
        });
      }
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.shiftKey && e.key === "Enter") {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) {
        form.requestSubmit();
      }
    }
  }

  return (
    <form action={handleSubmit}>
      <h3 className="text-dosasce-red mb-4 font-serif text-2xl font-bold">
        Vaše rješenje
        {bestScore && (
          <span className="ml-2 text-lg font-normal text-gray-600">
            (Trenutno najbolje: {bestScore})
          </span>
        )}
      </h3>
      <textarea
        name="solution"
        required
        disabled={mutation.isPending}
        placeholder="Unesite vaše rješenje ovdje..."
        onKeyDown={handleKeyDown}
        className="focus:border-dosasce-red focus:ring-dosasce-red/20 min-h-[200px] w-full resize-none rounded border border-gray-300 p-4 font-mono text-sm focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />
      <div className={"mt-4 flex items-center justify-between"}>
        {year_num && problem_num && (
          <Anchor
            href={`/leaderboard/${year_num}/${problem_num}`}
            styled={false}
            className="text-dosasce-red hover:text-dosasce-red/80 transition-colors"
          >
            Rang lista za ovaj zadatak
          </Anchor>
        )}
        <Button
          type="submit"
          loading={mutation.isPending}
          disabled={mutation.isPending}
        >
          Pošalji rješenje
        </Button>
      </div>
    </form>
  );
}
