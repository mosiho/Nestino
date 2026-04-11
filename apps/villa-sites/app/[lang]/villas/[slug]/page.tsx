import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ lang: string; slug: string }> };

const VALID_SLUGS = new Set(["badem", "defne", "incir"]);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const name = `Villa ${slug.charAt(0).toUpperCase() + slug.slice(1)}`;
  return { title: name };
}

export default async function VillaDetailPage({ params }: Props) {
  const { slug } = await params;

  if (!VALID_SLUGS.has(slug)) {
    notFound();
  }

  const name = `Villa ${slug.charAt(0).toUpperCase() + slug.slice(1)}`;

  return (
    <div className="pt-24 section-y">
      <div className="content-wrapper">
        <h1 className="font-serif font-semibold text-h1 text-[var(--color-text-primary)] mb-4">
          {name}
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          Full villa detail page — content will be loaded from DB in Step 3.
        </p>
      </div>
    </div>
  );
}