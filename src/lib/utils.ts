import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format date for Croatian locale (e.g., "14. 12.")
 */
export function formatDateHR(date: Date): string {
  return date.toLocaleDateString("hr", {
    day: "numeric",
    month: "numeric",
  });
}

/**
 * Format date for English locale (e.g., "12/14")
 */
export function formatDateEN(date: Date): string {
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "numeric",
  });
}
