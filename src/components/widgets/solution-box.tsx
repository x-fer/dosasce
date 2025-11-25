"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Button from "@/components/ui/button";

export default function SolutionBox({ problemId }: { problemId: string }) {
  const mutation = useMutation({
    mutationFn: async (solution: string) => {
      // TODO: Add your submission logic here
      // Example: const response = await fetch('/api/submit-solution', {
      //   method: 'POST',
      //   body: JSON.stringify({ solution, problemId }),
      // });
      // if (!response.ok) throw new Error('Submission failed');
      // return response.json();

      // Simulate API call for now
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Solution:", solution, "Problem ID:", problemId);
      return { success: true };
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
      success: "Rješenje uspješno poslano!",
      error:
        "Došlo je do greške pri slanju rješenja. Molimo pokušajte ponovno.",
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
      <div className="mt-4 flex justify-end">
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
