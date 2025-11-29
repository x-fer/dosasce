export const CATEGORY = {
  OSNOVNA: "osnovna",
  SREDNJA: "srednja",
  PREDDIPLOMSKI: "preddiplomski",
  DIPLOMSKI: "diplomski",
  OPEN: "open",
} as const;

export type CategoryValue = (typeof CATEGORY)[keyof typeof CATEGORY];

export const VALID_CATEGORIES = Object.values(CATEGORY);

export type FilterCategory = "ukupno" | CategoryValue;

export const CATEGORY_LABELS: Record<FilterCategory, string> = {
  ukupno: "Ukupno",
  osnovna: "Osnovna",
  srednja: "Srednja",
  preddiplomski: "Preddiplomski",
  diplomski: "Diplomski",
  open: "Open",
};
