const MAX_SLUG_LEN = 48;

export function slugifyPropertyName(name: string): string {
  const base = name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, MAX_SLUG_LEN);

  return base || "property";
}

export function withSuffix(slug: string, suffix: string): string {
  const trimmed = slug.slice(0, Math.max(1, MAX_SLUG_LEN - suffix.length - 1));
  return `${trimmed}-${suffix}`;
}
