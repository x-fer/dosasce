import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: HTMLAnchorElement["href"];
  target?: HTMLAnchorElement["target"];
  rel?: HTMLAnchorElement["rel"];
  ariaLabel?: string;
  children: React.ReactNode;
  styled?: boolean;
  icon?: boolean;
  className?: string;
}

export const Anchor = ({
  href,
  children,
  target,
  rel,
  styled = true,
  icon = true,
  ariaLabel,
  className,
  ...props
}: AnchorProps) => {
  const isExternalLink = /^https?:\/\//.test(href);
  const defaultTarget = isExternalLink ? "_blank" : "_self";
  const defaultRel = isExternalLink ? "noopener noreferrer" : undefined;

  const ariaLabelValue = props["aria-label"] ?? ariaLabel;
  const ariaLabelFallback = `Link to ${typeof children === "string" ? children : href}`;

  const showIcon = icon && styled && isExternalLink;

  return (
    <>
      <Link
        href={href}
        target={target ?? defaultTarget}
        rel={rel ?? defaultRel}
        aria-label={ariaLabelValue ?? ariaLabelFallback}
        className={cn(
          styled &&
            "text-dosasce-red hover:text-dosasce-red/80 underline transition-colors",
          className,
        )}
        {...props}
      >
        {children}
      </Link>
      {showIcon && (
        <sup
          aria-hidden="true"
          className={cn(
            "ml-0.5 shrink-0 select-none",
            styled &&
              "text-dosasce-red hover:text-dosasce-red/80 font-sans-serif-system text-xs transition-colors",
          )}
        >
          {"\u2197\uFE0E"}
        </sup>
      )}
    </>
  );
};
