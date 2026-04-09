import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { DemoPreview } from "@/components/demo/demo-preview";
import { getMessages } from "@/lib/i18n/get-messages";
import { localizedPath } from "@/lib/i18n/paths";
import { isLocale } from "@/lib/i18n/config";
import { getDemoSiteBySubdomain } from "@/lib/demo-queries";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale: raw } = await params;
  if (!isLocale(raw)) return { title: "Demo" };
  return {
    title: `Demo preview — ${slug}`,
    robots: { index: false, follow: true },
  };
}

export default async function DemoPage({ params }: PageProps) {
  const { slug, locale: raw } = await params;
  if (!isLocale(raw)) {
    notFound();
  }
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
        <Link href={localizedPath(raw, "/")}>{getMessages(raw).demo.backHome}</Link>
      </div>
    </>
  );
}
