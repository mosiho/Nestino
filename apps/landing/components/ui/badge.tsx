import type { ReactNode } from "react";

export function Badge({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-accent/35 bg-accent/10 px-3 py-0.5 text-xs font-semibold text-accent ${className}`}
    >
      {children}
    </span>
  );
}
