export const RESPONSE_TYPE = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
} as const;

export type SubmissionResponseType =
  (typeof RESPONSE_TYPE)[keyof typeof RESPONSE_TYPE];

export interface SubmissionResponse {
  type: SubmissionResponseType;
  value: string;
  timestamp?: string;
}

export type SanitizeFunction = (
  input: string,
) => Omit<SubmissionResponse, "timestamp">;
