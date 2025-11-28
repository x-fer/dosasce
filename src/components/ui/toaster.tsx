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
      richColors
      className="toaster group"
      position="bottom-right"
      icons={{
        success: <CircleCheck className="size-5" />,
        info: <Info className="size-5" />,
        warning: <TriangleAlert className="size-5" />,
        error: <OctagonX className="size-5" />,
        loading: <Loader2 className="size-5 animate-spin" />,
      }}
      toastOptions={{
        duration: 5000,
        classNames: {
          toast: "font-sans border-2 rounded-xl",
          title: "font-serif font-bold",
          description: "font-sans",
        },
        style: {
          padding: "16px",
          fontSize: "14px",
        },
      }}
      style={
        {
          "--success-bg": "#d9f2e3",
          "--success-text": "#0c6e30",
          "--success-border": "#0c6e30",
          "--error-bg": "#fbd3d9",
          "--error-text": "#e63047",
          "--error-border": "#e63047",
          "--warning-bg": "#fef3c7",
          "--warning-text": "#f59e0b",
          "--warning-border": "#f59e0b",
          "--info-bg": "#fbd3d9",
          "--info-text": "#191516",
          "--info-border": "#e63047",
          "--normal-bg": "#fdfbfe",
          "--normal-text": "#191516",
          "--normal-border": "#fbd3d9",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
