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
  submission_id?: string;
  requiresCategory?: boolean;
}

export type SanitizeFunction = (
  input: string,
) => Omit<SubmissionResponse, "timestamp" | "submission_id">;
