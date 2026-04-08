import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { DemoPreview } from "@/components/demo/demo-preview";
import { getDemoSiteBySubdomain } from "@/lib/demo-queries";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Demo preview — ${slug}`,
    robots: { index: false, follow: true },
  };
}

export default async function DemoPage({ params }: PageProps) {
  const { slug } = await params;
  const normalized = slug.trim().toLowerCase();
  if (!normalized || !/^[a-z0-9-]+$/.test(normalized)) {
    notFound();
  }

  const row = await getDemoSiteBySubdomain(normalized);
  if (!row) {
    notFound();
  }

  return (
    <>
      <DemoPreview slug={row.subdomain} destination={row.destination} />
      <div className="sr-only">
        <Link href="/">Back to Nestino</Link>
      </div>
    </>
  );
}
