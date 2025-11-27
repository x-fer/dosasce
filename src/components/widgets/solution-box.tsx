"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Button from "@/components/ui/button";
import { Anchor } from "@/components/ui/anchor";
import { usePathname } from "next/navigation";
import { getProblemYearAndId } from "@/lib/problem";

export default function SolutionBox({
  sanitize: _sanitize,
}: {
  sanitize: (input: string) => void;
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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit solution");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Rješenje uspješno poslano!");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Došlo je do greške pri slanju rješenja. Molimo pokušajte ponovno.",
      );
    },
  });

  async function handleSubmit(formData: FormData) {
    const solution = formData.get("solution") as string;

    toast.promise(mutation.mutateAsync(solution), {
      loading: "Rješenje se šalje...",
    });
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
      {mutation.error && (
        <p className="mt-2 text-sm text-red-600">
          {mutation.error instanceof Error
            ? mutation.error.message
            : "Došlo je do greške pri slanju rješenja."}
        </p>
      )}
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
