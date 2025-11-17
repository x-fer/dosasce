export const config = {
  year: 2025,
  // End time for the whole competition (all problems close at this time)
  endTime: new Date(2025, 11, 21, 19, 0),
  awards: {
    date: new Date(2025, 11, 21, 19, 15),
    location: "FER, Unska 3, A202, 19:15h",
    description: "Dodjela nagrada za najbolje rješenje svakog zadatka.",
  },
  problems: [
    {
      id: 1,
      title: "Zadatak 1",
      startDate: new Date(2025, 11, 14, 19, 0),
      judge0: process.env.JUDGE0_CHALLENGE_2025_1,
      banner: "/problems/2025/1/banner.png",
      sanitize: (input: string) => input.trim(),
    },
    {
      id: 2,
      title: "Zadatak 2",
      startDate: new Date(2025, 11, 16, 19, 0),
      judge0: process.env.JUDGE0_CHALLENGE_2025_2,
      banner: "/problems/2025/2/banner.png",
      sanitize: (input: string) => input.trim(),
    },
    {
      id: 3,
      title: "Zadatak 3",
      startDate: new Date(2025, 11, 18, 19, 0),
      judge0: process.env.JUDGE0_CHALLENGE_2025_3,
      banner: "/problems/2025/3/banner.png",
      sanitize: (input: string) => input.trim(),
    },
  ],
};
