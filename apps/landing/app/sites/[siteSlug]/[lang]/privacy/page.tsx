import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <div className="pt-24 section-y">
      <div className="content-wrapper">
        <h1 className="font-serif font-semibold text-h1 text-[var(--color-text-primary)] mb-4">
          Privacy
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          Privacy policy for this property site — placeholder until Step 3.
        </p>
      </div>
    </div>
  );
}
