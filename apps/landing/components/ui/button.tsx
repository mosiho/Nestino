"use client";

import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { captureEvent } from "@/components/analytics/track-event";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  secondary:
    "border border-border bg-background text-foreground shadow-sm hover:bg-surface hover:border-border focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2",
  ghost:
    "text-foreground hover:bg-surface focus-visible:ring-2 focus-visible:ring-accent/30",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm rounded-md",
  md: "px-4 py-2.5 text-sm font-medium rounded-lg",
  lg: "px-6 py-3 text-base font-semibold rounded-xl",
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  analytics?: { location: string; ctaId: string };
  asChild?: boolean;
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  analytics,
  onClick,
  type = "button",
  asChild = false,
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`;

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    if (analytics) {
      captureEvent("cta_click", {
        location: analytics.location,
        cta_id: analytics.ctaId,
      });
    }
    onClick?.(e as React.MouseEvent<HTMLButtonElement>);
  };

  if (asChild) {
    return <Slot className={classes} onClick={handleClick} {...props} />;
  }

  return (
    <button type={type} className={classes} onClick={handleClick} {...props} />
  );
}
