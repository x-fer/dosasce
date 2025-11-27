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
        success: <CircleCheck className="size-5" />,
        info: <Info className="size-5" />,
        warning: <TriangleAlert className="size-5" />,
        error: <OctagonX className="size-5" />,
        loading: <Loader2 className="size-5 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast: "font-sans border-2 rounded-xl",
          title: "font-serif font-bold",
          description: "font-sans",
          success:
            "bg-dosasce-light-green text-dosasce-green border-dosasce-green",
          error: "bg-dosasce-light-red text-dosasce-red border-dosasce-red",
          warning:
            "bg-dosasce-light-yellow text-dosasce-yellow border-dosasce-yellow",
          info: "bg-dosasce-light-red text-dosasce-black border-dosasce-red",
          loading:
            "bg-dosasce-white text-dosasce-black border-dosasce-light-red",
        },
        style: {
          padding: "16px",
          fontSize: "14px",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
