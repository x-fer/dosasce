import type { SanitizeFunction } from "@/lib/types";

export interface YearConfig {
  year: number;
  startDate: Date;
  endTime: Date;
  awards: {
    date: Date;
    location: string;
  };
  problems: Array<ProblemConfig>;
}

export interface ProblemConfig {
  problem_num: number;
  startDate: Date;
  endTime: Date;
  sanitize?: SanitizeFunction;
}
