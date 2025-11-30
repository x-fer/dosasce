import { RESPONSE_TYPE, type SanitizeFunction } from "@/lib/types";

type YearConfig = {
  year: number;
  startDate: Date;
  endTime: Date;
  awards: {
    date: Date;
    location: string;
  };
  problems: Array<{
    problem_num: number;
    startDate: Date;
    endTime: Date;
    sanitize?: SanitizeFunction;
  }>;
};

export const config = {
  2025: {
    year: 2025,
    startDate: new Date(2025, 11, 1, 0, 0), // 1.12.2025. 00:00 Croatian time
    endTime: new Date(2025, 11, 19, 23, 59), // 19.12.2025. 23:59 Croatian time
    awards: {
      date: new Date(2025, 11, 20, 18, 0), // 20.12.2025. 18:00 Croatian time
      location: "FER, Unska 3, A201, 18:00",
    },
    problems: [
      {
        problem_num: 1,
        startDate: new Date(2025, 11, 1, 0, 0), // 1.12.2025. 00:00 Croatian time
        endTime: new Date(2025, 11, 19, 23, 59), // 19.12.2025. 23:59 Croatian time
      },
      {
        problem_num: 2,
        startDate: new Date(2025, 11, 6, 0, 0), // 6.12.2025. 00:00 Croatian time
        endTime: new Date(2025, 11, 19, 23, 59), // 19.12.2025. 23:59 Croatian time
      },
      {
        problem_num: 3,
        startDate: new Date(2025, 11, 13, 0, 0), // 13.12.2025. 00:00 Croatian time
        endTime: new Date(2025, 11, 19, 23, 59), // 19.12.2025. 23:59 Croatian time
      },
    ],
  } satisfies YearConfig,
} as const;

/**
 * Get config for a specific year
 */
export function getConfig(year: number | string): YearConfig {
  const yearNum = typeof year === "string" ? Number(year) : year;

  if (!config[yearNum as keyof typeof config]) {
    throw new Error(`Config for year ${yearNum} not found`);
  }

  return config[yearNum as keyof typeof config];
}
