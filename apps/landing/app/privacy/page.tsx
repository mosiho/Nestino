import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Nestino handles data for the marketing site and trials.",
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
      <p className="mt-6 text-sm text-muted leading-relaxed">
        <strong className="text-foreground">Placeholder.</strong> This page is a
        structural stub for Nestino.ai. Replace with counsel-approved privacy
        policy before collecting production traffic. It should describe what you
        collect on the landing form (email, optional phone, property URL),
        analytics providers (Vercel Analytics, PostHog), email delivery (Resend),
        retention, and data subject rights.
      </p>
    </article>
  );
}
