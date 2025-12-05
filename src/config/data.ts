import { RESPONSE_TYPE } from "@/lib/types";
import type { YearConfig } from "./types";

export const data = {
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
        sanitize: (input) => {
          if (/[ \t\r\n]/.test(input)) {
            return {
              type: RESPONSE_TYPE.ERROR,
              value:
                "Unos ne smije sadržavati razmake, tabove ili nove redove.",
            };
          }

          if (!/^[0-9,]+$/.test(input)) {
            return {
              type: RESPONSE_TYPE.ERROR,
              value: "Unos smije sadržavati samo znamenke i zareze.",
            };
          }

          const parts = input.split(",");

          if (parts.length !== 1000) {
            return {
              type: RESPONSE_TYPE.ERROR,
              value: "Unos mora sadržavati točno 1000 brojeva.",
            };
          }

          const numbers: number[] = [];

          for (const part of parts) {
            if (part === "") {
              return {
                type: RESPONSE_TYPE.ERROR,
                value:
                  "Unos ne smije sadržavati prazne segmente između zareza.",
              };
            }

            const n = Number(part);

            if (!Number.isInteger(n) || isNaN(n)) {
              return {
                type: RESPONSE_TYPE.ERROR,
                value: "Svi elementi moraju biti cijeli brojevi.",
              };
            }

            if (n < 1 || n > 1000) {
              return {
                type: RESPONSE_TYPE.ERROR,
                value: "Svi brojevi moraju biti između 1 i 1000.",
              };
            }

            numbers.push(n);
          }

          const unique = new Set(numbers);

          if (unique.size !== 1000) {
            return {
              type: RESPONSE_TYPE.ERROR,
              value: "Svi brojevi moraju biti jedinstveni.",
            };
          }

          return {
            type: RESPONSE_TYPE.SUCCESS,
            value: "",
          };
        },
      },
      {
        problem_num: 2,
        startDate: new Date(2025, 11, 6, 0, 0), // 6.12.2025. 00:00 Croatian time
        endTime: new Date(2025, 11, 19, 23, 59), // 19.12.2025. 23:59 Croatian time
        sanitize: (input) => {
          if (input.includes("\t")) {
            return {
              type: RESPONSE_TYPE.ERROR,
              value: "Unos ne smije sadržavati tabove.",
            };
          }

          const lines = input.trim().split("\n");

          if (lines.length !== 140) {
            return {
              type: RESPONSE_TYPE.ERROR,
              value: "Rješenje mora sadržavati točno 140 redaka.",
            };
          }

          const all: number[] = [];

          for (const line of lines) {
            const parts = line.trim().split(" ");

            if (parts.some((p) => p === "")) {
              return {
                type: RESPONSE_TYPE.ERROR,
                value: "Ne smiju postojati prazni elementi u retku.",
              };
            }

            for (const p of parts) {
              const n = Number(p);

              if (!Number.isInteger(n)) {
                return {
                  type: RESPONSE_TYPE.ERROR,
                  value: "Indeksi moraju biti cijeli brojevi.",
                };
              }

              if (n < 0 || n > 419) {
                return {
                  type: RESPONSE_TYPE.ERROR,
                  value: "Svi indeksi moraju biti između 0 i 419.",
                };
              }

              all.push(n);
            }
          }

          if (all.length !== 420) {
            return {
              type: RESPONSE_TYPE.ERROR,
              value: "Ukupan broj indeksa mora biti točno 420.",
            };
          }

          const unique = new Set(all);

          if (unique.size !== 420) {
            return {
              type: RESPONSE_TYPE.ERROR,
              value: "Svi indeksi moraju biti jedinstveni.",
            };
          }

          return {
            type: RESPONSE_TYPE.SUCCESS,
            value: "",
          };
        },
      },
      {
        problem_num: 3,
        startDate: new Date(2025, 11, 13, 0, 0), // 13.12.2025. 00:00 Croatian time
        endTime: new Date(2025, 11, 19, 23, 59), // 19.12.2025. 23:59 Croatian time
      },
    ],
  },
} satisfies Record<number, YearConfig>;
