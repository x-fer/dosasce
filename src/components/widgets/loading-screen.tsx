import { Loader2 } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div
      className="flex grow flex-col items-center justify-center"
      role="status"
      aria-label="Loading"
    >
      <Loader2 className="text-dosasce-red h-20 w-20 animate-spin" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
