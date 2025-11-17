export const config = {
  startTime: new Date(2025, 11, 14, 19, 0),
  judge0: process.env.JUDGE0_CHALLENGE_2025_1,
};

export function sanitize(input: string) {
  return input.trim();
}
