"use client";

import {
  CircleCheck,
  Info,
  Loader2,
  OctagonX,
  TriangleAlert,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      position="bottom-right"
      icons={{
        success: <CircleCheck className="size-4" />,
        info: <Info className="size-4" />,
        warning: <TriangleAlert className="size-4" />,
        error: <OctagonX className="size-4" />,
        loading: <Loader2 className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--color-dosasce-white)",
          "--normal-text": "var(--color-dosasce-black)",
          "--normal-border": "var(--color-dosasce-light-red)",
          "--success-bg": "var(--color-dosasce-light-green)",
          "--success-text": "var(--color-dosasce-black)",
          "--success-border": "var(--color-dosasce-green)",
          "--error-bg": "#fee2e2",
          "--error-text": "#991b1b",
          "--error-border": "#dc2626",
          "--warning-bg": "#fef3c7",
          "--warning-text": "#92400e",
          "--warning-border": "#f59e0b",
          "--info-bg": "var(--color-dosasce-light-red)",
          "--info-text": "var(--color-dosasce-black)",
          "--info-border": "var(--color-dosasce-red)",
          "--border-radius": "0.5rem",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
