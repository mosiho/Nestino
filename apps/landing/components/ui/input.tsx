import type { InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function Input({
  label,
  id,
  error,
  className = "",
  ...props
}: InputProps) {
  const inputId = id ?? props.name;
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={inputId}
        className="block text-sm font-semibold text-foreground"
      >
        {label}
      </label>
      <input
        id={inputId}
        className={`w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground shadow-sm placeholder:text-muted transition-shadow focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/35 focus:shadow-[0_0_0_3px_rgba(13,148,136,0.12)] ${className}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error ? (
        <p id={`${inputId}-error`} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
