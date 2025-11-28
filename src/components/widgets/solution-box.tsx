"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Button from "@/components/ui/button";
import { Anchor } from "@/components/ui/anchor";
import { usePathname } from "next/navigation";
import { getProblemYearAndId } from "@/lib/problem";
import { RESPONSE_TYPE, type SubmissionResponse } from "@/lib/types";
import { getConfig } from "@/lib/config";

export default function SolutionBox() {
  const pathname = usePathname();
  const { year, id } = getProblemYearAndId(pathname, "problem");

  const yearConfig = getConfig(year);
  const problem = yearConfig?.problems.find((p) => p.id === Number(id));
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
          year_id: year,
          problem_id: id,
        }),
      });

      const responseData: SubmissionResponse = await response.json();

      return responseData;
    },
  });

  function handleResponse(response: SubmissionResponse) {
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

  return (
    <form action={handleSubmit}>
      <h3 className="text-dosasce-red mb-4 font-serif text-2xl font-bold">
        Vaše rješenje
      </h3>
      <textarea
        name="solution"
        required
        disabled={mutation.isPending}
        placeholder="Unesite vaše rješenje ovdje..."
        className="focus:border-dosasce-red focus:ring-dosasce-red/20 min-h-[200px] w-full resize-none rounded border border-gray-300 p-4 font-mono text-sm focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />
      <div className={"mt-4 flex items-center justify-between"}>
        {year && id && (
          <Anchor
            href={`/leaderboard/${year}/${id}`}
            styled={false}
            className="text-dosasce-red hover:text-dosasce-red/80 transition-colors"
          >
            Rang lista za ovaj zadatak
          </Anchor>
        )}
        <Button
          type="submit"
          variant="default"
          loading={mutation.isPending}
          disabled={mutation.isPending}
        >
          Pošalji rješenje
        </Button>
      </div>
    </form>
  );
}
