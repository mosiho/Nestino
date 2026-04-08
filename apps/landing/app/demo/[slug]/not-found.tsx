import Link from "next/link";

export default function DemoNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-semibold text-foreground">
        Demo not found
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted">
        We couldn’t find a live preview for that link. Start on the homepage to
        activate a trial or ask for your pre-built site.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground"
      >
        Back to Nestino
      </Link>
    </div>
  );
}
