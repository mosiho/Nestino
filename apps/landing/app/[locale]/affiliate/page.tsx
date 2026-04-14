import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AffiliateHero } from "@/components/affiliate/affiliate-hero";
import { AffiliateProgramSection } from "@/components/affiliate/affiliate-program-section";
import { AffiliateShell } from "@/components/affiliate/affiliate-shell";
import { FinalCtaSection } from "@/components/sections/final-cta";
import { getSiteUrl } from "@/lib/constants";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";
import { localizedPath } from "@/lib/i18n/paths";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const messages = getMessages(raw);
  const siteUrl = getSiteUrl();
  const locale = raw as Locale;
  const canonicalPath = localizedPath(locale, "/affiliate");
  const enPath = localizedPath("en", "/affiliate");
  const trPath = localizedPath("tr", "/affiliate");

  return {
    title: messages.affiliate.meta.title,
    description: messages.affiliate.meta.description,
    openGraph: {
      type: "website",
      locale: messages.meta.ogLocale,
      url: `${siteUrl}${canonicalPath}`,
      siteName: "Nestino",
      title: messages.affiliate.meta.title,
      description: messages.affiliate.meta.description,
      images: [
        {
          url: `${siteUrl}/nestino-og.png`,
          width: 1200,
          height: 628,
          alt: "Nestino affiliate program",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: messages.affiliate.meta.title,
      description: messages.affiliate.meta.description,
      images: [`${siteUrl}/nestino-og.png`],
    },
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: `${siteUrl}${enPath}`,
        tr: `${siteUrl}${trPath}`,
        "x-default": `${siteUrl}${enPath}`,
      },
    },
  };
}

export default async function AffiliatePage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) {
    notFound();
  }

  const locale = raw as Locale;
  const messages = getMessages(locale);
  const siteUrl = getSiteUrl();

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: messages.affiliate.meta.title,
    url: `${siteUrl}${localizedPath(locale, "/affiliate")}`,
    description: messages.affiliate.meta.description,
    isPartOf: {
      "@type": "WebSite",
      name: "Nestino",
      url: siteUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd),
        }}
      />
      <AffiliateShell locale={locale} messages={messages}>
        <AffiliateHero />
        <AffiliateProgramSection />
        <FinalCtaSection />
      </AffiliateShell>
    </>
  );
}
