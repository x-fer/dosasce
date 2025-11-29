"use client";

import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthClient } from "@/features/auth/useAuthClient";
import { toast } from "sonner";
import { CATEGORY } from "@/lib/const/categories";
import Button from "@/components/ui/button";
import LoadingScreen from "@/components/widgets/loading-screen";

const CATEGORIES = [
  {
    value: CATEGORY.OSNOVNA,
    label: "Osnovna škola",
    description: "Učenici osnovnih škola (1.-8. razred)",
  },
  {
    value: CATEGORY.SREDNJA,
    label: "Srednja škola",
    description: "Učenici srednjih škola (1.-4. razred)",
  },
  {
    value: CATEGORY.PREDDIPLOMSKI,
    label: "Preddiplomski studij",
    description: "Studenti preddiplomskog studija (svih godina)",
  },
  {
    value: CATEGORY.DIPLOMSKI,
    label: "Diplomski studij",
    description: "Studenti diplomskog/integriranog studija",
  },
  {
    value: CATEGORY.OPEN,
    label: "Open kategorija",
    description: "Svi ostali natjecatelji",
  },
] as const;

export default function ProfilePage() {
  const { user, isLoading, login } = useAuthClient();
  const queryClient = useQueryClient();
  const currentCategory = user?.user_metadata?.user_category;
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    currentCategory,
  );

  useEffect(() => {
    if (currentCategory) {
      setSelectedCategory(currentCategory);
    }
  }, [currentCategory]);

  const categoryMutation = useMutation({
    mutationFn: async (user_category: string) => {
      const response = await fetch("/api/user/category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_category }),
      });

      if (!response.ok) {
        throw new Error("Failed to save category");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Uspješno ste promijenili kategoriju!");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    onError: () => {
      toast.error("Došlo je do greške. Pokušajte ponovno.");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedCategory) {
      toast.error("Molimo odaberite kategoriju");
      return;
    }

    if (selectedCategory === currentCategory) {
      toast.info("Kategorija nije promijenjena");
      return;
    }

    categoryMutation.mutate(selectedCategory);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return (
      <div className="flex grow flex-col items-center justify-center">
        <Button onClick={login}>Prijavi se da vidiš svoj profil</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto min-h-screen p-8 pt-[60px]">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-3xl font-bold">Profil</h1>
        <p className="mb-8 text-gray-600">{user.email}</p>

        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-bold">Natjecateljska kategorija</h2>

          <div className="mb-6 rounded-lg bg-yellow-50 p-4 text-sm">
            <p className="mb-2 font-semibold text-yellow-900">
              Važno - Pravila natjecanja
            </p>
            <p className="mb-2 text-yellow-800">
              Prema pravilima natjecanja, morate biti u{" "}
              <strong>točnoj kategoriji</strong> kako biste bili prihvatljivi za
              nagrade.
            </p>
            <p className="text-yellow-800">
              Ako niste u školi ili na fakultetu, <strong>nećete moći</strong>{" "}
              osvojiti nagradu, pa odaberite kategoriju <strong>Open</strong>.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              {CATEGORIES.map((category) => (
                <label
                  key={category.value}
                  className="hover:border-dosasce-red/50 has-checked:border-dosasce-red has-checked:bg-dosasce-light-red block cursor-pointer rounded-lg border-2 border-gray-300 p-4 transition-colors"
                >
                  <input
                    type="radio"
                    name="category"
                    value={category.value}
                    checked={selectedCategory === category.value}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="sr-only"
                  />
                  <div className="text-dosasce-black font-semibold">
                    {category.label}
                  </div>
                  <div className="text-sm text-gray-600">
                    {category.description}
                  </div>
                </label>
              ))}
            </div>

            <Button
              type="submit"
              disabled={
                !selectedCategory || selectedCategory === currentCategory
              }
              loading={categoryMutation.isPending}
              className="w-full"
            >
              Spremi kategoriju
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
