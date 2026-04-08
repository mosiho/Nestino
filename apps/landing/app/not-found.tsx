import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-semibold text-foreground">Page not found</h1>
      <p className="mt-3 text-sm text-muted">
        The page you’re looking for doesn’t exist.
      </p>
      <Link
        href="/"
        className="mt-8 text-sm font-medium text-accent hover:underline"
      >
        ← Back home
      </Link>
    </div>
  );
}
