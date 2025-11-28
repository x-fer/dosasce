import { RESPONSE_TYPE, type SanitizeFunction } from "@/lib/types";

type YearConfig = {
  year: number;
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
    awards: {
      date: new Date(2025, 11, 20, 18, 0), // 20.12.2025. 18:00 Croatian time
      location: "FER, Unska 3, 18:00",
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
      {
        problem_num: 8,
        startDate: new Date(2025, 10, 26, 0, 0), // 26.11.2025. 00:00 Croatian time
        endTime: new Date(2025, 10, 30, 23, 59), // 30.11.2025. 23:59 Croatian time
        sanitize: (input: string) => {
          const trimmed = input.trim();
          if (trimmed.length !== 100) {
            return {
              type: RESPONSE_TYPE.ERROR,
              value: "Rješenje mora biti točno 100 znakova dugačko.",
            };
          }
          const allowed = new Set("IBESKDPOGL");
          if (!trimmed.split("").every((c) => allowed.has(c))) {
            return {
              type: RESPONSE_TYPE.ERROR,
              value:
                "Rješenje sadrži nedozvoljene znakove. Dozvoljeni: I, B, E, S, K, D, P, O, G, L",
            };
          }
          return { type: RESPONSE_TYPE.SUCCESS, value: "" };
        },
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
