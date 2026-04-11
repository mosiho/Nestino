import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage() {
  return (
    <div className="pt-24 section-y">
      <div className="content-wrapper">
        <h1 className="font-serif font-semibold text-h1 text-[var(--color-text-primary)] mb-4">
          Contact
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          Contact page with inquiry form — content coming in Step 3.
        </p>
      </div>
    </div>
  );
}