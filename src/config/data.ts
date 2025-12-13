import { RESPONSE_TYPE } from "@/lib/types";
import type { YearConfig } from "./types";
import {
  N,
  M,
  K,
  WEIGHTS,
  CAPACITIES,
  DEMANDS,
} from "./problem-files/2025/3/data";

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
        sanitize: (solution_string) => {
          if (!solution_string || solution_string.length === 0) {
            return {
              type: RESPONSE_TYPE.ERROR,
              value: "Unos ne smije biti prazan.",
            };
          }

          const lines = solution_string.trim().split("\n");

          if (lines.length !== M) {
            return {
              type: RESPONSE_TYPE.ERROR,
              value: "Broj redova mora biti jednak broju saonica.",
            };
          }

          const allowed = /^[0-9|:, \-]+$/;

          const delivered: Array<Record<number, number>> = Array.from(
            { length: K },
            () => ({}),
          );

          for (let sledIdx = 0; sledIdx < lines.length; sledIdx++) {
            const line = lines[sledIdx]!.trim();

            if (!allowed.test(line)) {
              return {
                type: RESPONSE_TYPE.ERROR,
                value: `Linija ${sledIdx + 1} sadrži nedozvoljene znakove.`,
              };
            }

            if (line === "-") continue;

            const parts = line.split(" ");
            const visitedDestinations = new Set();
            let sledLoad = 0;

            for (const rawPart of parts) {
              const part = rawPart.trim();

              if (!part.includes("|")) {
                return {
                  type: RESPONSE_TYPE.ERROR,
                  value: `Neispravan format rute na liniji ${sledIdx + 1}.`,
                };
              }

              const [destStr, giftsStr] = part.split("|", 2);

              if (!/^\d+$/.test(destStr!)) {
                return {
                  type: RESPONSE_TYPE.ERROR,
                  value: `Indeks odredišta mora biti cijeli broj na liniji ${sledIdx + 1}.`,
                };
              }

              const d = Number(destStr);

              if (d < 1 || d > K) {
                return {
                  type: RESPONSE_TYPE.ERROR,
                  value: `Neispravan indeks odredišta na liniji ${sledIdx + 1}.`,
                };
              }

              if (visitedDestinations.has(d)) {
                return {
                  type: RESPONSE_TYPE.ERROR,
                  value: `Saonice ${sledIdx + 1} posjećuju odredište ${d} više puta.`,
                };
              }

              visitedDestinations.add(d);

              for (const rawGift of giftsStr!.split(",")) {
                const g = rawGift.trim();

                if (!g.includes(":")) {
                  return {
                    type: RESPONSE_TYPE.ERROR,
                    value: `Neispravan format poklona na liniji ${sledIdx + 1}.`,
                  };
                }

                const [tStr, qStr] = g.split(":", 2);

                if (!/^\d+$/.test(tStr!) || !/^\d+$/.test(qStr!)) {
                  return {
                    type: RESPONSE_TYPE.ERROR,
                    value: `Tip i količina poklona moraju biti cijeli brojevi na liniji ${sledIdx + 1}.`,
                  };
                }

                const t = Number(tStr);
                const q = Number(qStr);

                if (t < 1 || t > N) {
                  return {
                    type: RESPONSE_TYPE.ERROR,
                    value: `Neispravan tip poklona na liniji ${sledIdx + 1}.`,
                  };
                }

                if (q <= 0) {
                  return {
                    type: RESPONSE_TYPE.ERROR,
                    value: `Količina poklona mora biti veća od nule na liniji ${sledIdx + 1}.`,
                  };
                }

                delivered[d - 1]![t] = (delivered[d - 1]![t] || 0) + q;
                sledLoad += WEIGHTS[t - 1]! * q;
              }
            }

            if (sledLoad > CAPACITIES[sledIdx]!) {
              return {
                type: RESPONSE_TYPE.ERROR,
                value:
                  `Opterećenje saonica ${sledIdx + 1} premašuje kapacitet ` +
                  `(${sledLoad} > ${CAPACITIES[sledIdx]}).`,
              };
            }
          }

          for (let d = 1; d <= K; d++) {
            const demand = DEMANDS[d] || {};
            const got = delivered[d - 1];

            for (const tStr in demand) {
              const t = Number(tStr);
              const q = demand[t];
              const deliveredQ = got![t] || 0;

              if (deliveredQ !== q) {
                return {
                  type: RESPONSE_TYPE.ERROR,
                  value:
                    `Neispravna količina poklona na odredištu ${d} ` +
                    `za tip ${t}: očekivano ${q}, dobiveno ${deliveredQ}.`,
                };
              }
            }

            for (const tStr in got) {
              const t = Number(tStr);
              if (!(t in demand)) {
                return {
                  type: RESPONSE_TYPE.ERROR,
                  value:
                    `Dostavljen je poklon tipa ${t} ` +
                    `koji odredište ${d} ne traži.`,
                };
              }
            }
          }

          return {
            type: RESPONSE_TYPE.SUCCESS,
            value: "",
          };
        },
      },
    ],
  },
} satisfies Record<number, YearConfig>;
