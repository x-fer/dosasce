export const config = {
  year: 2025,
  // End time for the whole competition (all problems close at this time)
  endTime: new Date(2025, 11, 19, 23, 59), // 19.12.2025. 23:59 Croatian time
  awards: {
    date: new Date(2025, 11, 20, 18, 0), // 20.12.2025. 18:00 Croatian time
    location: "FER, Unska 3, 18:00",
  },
  problems: [
    {
      id: 1,
      title: "Zadatak 1",
      startDate: new Date(2025, 11, 1, 0, 0), // 1.12.2025. 00:00 Croatian time
      banner: "/problems/2025/1/banner.png",
      sanitize: (input: string) => input.trim(),
    },
    {
      id: 2,
      title: "Zadatak 2",
      startDate: new Date(2025, 11, 6, 0, 0), // 6.12.2025. 00:00 Croatian time
      banner: "/problems/2025/2/banner.png",
      sanitize: (input: string) => input.trim(),
    },
    {
      id: 3,
      title: "Zadatak 3",
      startDate: new Date(2025, 11, 13, 0, 0), // 13.12.2025. 00:00 Croatian time
      banner: "/problems/2025/3/banner.png",
      sanitize: (input: string) => input.trim(),
    },
  ],
};
