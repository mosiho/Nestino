import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms for using Nestino marketing site and trial activation.",
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-foreground">Terms of Service</h1>
      <p className="mt-6 text-sm text-muted leading-relaxed">
        <strong className="text-foreground">Placeholder.</strong> Replace with
        production terms covering the trial, subscription ($399/mo or other billing
        options after the free month), acceptable use, intellectual property,
        limitation of liability,
        and governing law. Align with your billing flow when Stripe is enabled in
        the operator console.
      </p>
    </article>
  );
}
