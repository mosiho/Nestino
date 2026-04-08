import type { SelectHTMLAttributes } from "react";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
};

export function Select({
  label,
  id,
  error,
  options,
  className = "",
  ...props
}: SelectProps) {
  const selectId = id ?? props.name;
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={selectId}
        className="block text-sm font-semibold text-foreground"
      >
        {label}
      </label>
      <select
        id={selectId}
        className={`w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground shadow-sm transition-shadow focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/35 focus:shadow-[0_0_0_3px_rgba(13,148,136,0.12)] ${className}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${selectId}-error` : undefined}
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {error ? (
        <p
          id={`${selectId}-error`}
          className="text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
