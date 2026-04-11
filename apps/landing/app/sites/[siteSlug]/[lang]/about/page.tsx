import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="pt-24 section-y">
      <div className="content-wrapper">
        <h1 className="font-serif font-semibold text-h1 text-[var(--color-text-primary)] mb-4">
          About
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          About page — content coming in Step 3.
        </p>
      </div>
    </div>
  );
}
