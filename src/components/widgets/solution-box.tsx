"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Button from "@/components/ui/button";
import { Anchor } from "@/components/ui/anchor";
import { usePathname } from "next/navigation";
import { getProblemYearAndId } from "@/lib/problem";
import {
  RESPONSE_TYPE,
  type SanitizeFunction,
  type SubmissionResponse,
} from "@/lib/types";

export default function SolutionBox({
  sanitize,
}: {
  sanitize: SanitizeFunction;
}) {
  const pathname = usePathname();
  const { year, id } = getProblemYearAndId(pathname, "problem");

  const mutation = useMutation({
    mutationFn: async (user_solution: string) => {
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

      const data: SubmissionResponse = await response.json();

      if (data.type === RESPONSE_TYPE.WARNING) {
        throw { type: RESPONSE_TYPE.WARNING, message: data.value };
      }

      if (data.type === RESPONSE_TYPE.ERROR) {
        throw new Error(data.value);
      }

      if (data.type === RESPONSE_TYPE.SUCCESS) {
        return data;
      }

      if (!response.ok) {
        throw new Error("Failed to submit solution");
      }

      return data;
    },
  });

  async function handleSubmit(formData: FormData) {
    const solution = formData.get("solution") as string;

    const sanitizeResult = sanitize(solution);

    if (sanitizeResult.type === RESPONSE_TYPE.ERROR) {
      toast.error(sanitizeResult.value);
      return;
    }

    const loadingToast = toast.loading("Rješenje se šalje...");

    try {
      const result = await mutation.mutateAsync(solution);

      if (result.type === RESPONSE_TYPE.SUCCESS) {
        toast.dismiss(loadingToast);
        toast.success(`Uspjeh, vaš rezultat: ${result.value}`);
      }
    } catch (error: unknown) {
      toast.dismiss(loadingToast);

      if (
        error &&
        typeof error === "object" &&
        "type" in error &&
        error.type === RESPONSE_TYPE.WARNING
      ) {
        const warningMessage =
          typeof error === "object" && "message" in error
            ? String(error.message)
            : "Too many submissions. Please wait a bit";
        toast.warning(warningMessage);
      } else {
        toast.error(
          error instanceof Error
            ? error.message
            : "Došlo je do greške pri slanju rješenja. Molimo pokušajte ponovno.",
        );
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
