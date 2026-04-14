import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BoworaFaqSection } from "@/components/bowora/bowora-faq-section";
import { BoworaPartnerHero } from "@/components/bowora/bowora-partner-hero";
import { BoworaQuarterlyPricingSection } from "@/components/bowora/bowora-quarterly-pricing";
import { BoworaShell } from "@/components/bowora/bowora-shell";
import { FinalCtaSection } from "@/components/sections/final-cta";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { EngineVisualSection } from "@/components/sections/engine-visual";
import { ProblemSection } from "@/components/sections/problem";
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
  const canonicalPath = localizedPath(locale, "/bowora");
  const enPath = localizedPath("en", "/bowora");
  const trPath = localizedPath("tr", "/bowora");

  return {
    title: messages.bowora.meta.title,
    description: messages.bowora.meta.description,
    openGraph: {
      type: "website",
      locale: messages.meta.ogLocale,
      url: `${siteUrl}${canonicalPath}`,
      siteName: "Nestino",
      title: messages.bowora.meta.title,
      description: messages.bowora.meta.description,
      images: [
        {
          url: `${siteUrl}/nestino-og.png`,
          width: 1200,
          height: 628,
          alt: "Nestino × Bowora — direct villa bookings",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: messages.bowora.meta.title,
      description: messages.bowora.meta.description,
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

export default async function BoworaPage({ params }: PageProps) {
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
    name: messages.bowora.meta.title,
    url: `${siteUrl}${localizedPath(locale, "/bowora")}`,
    description: messages.bowora.meta.description,
    isPartOf: {
      "@type": "WebSite",
      name: "Nestino",
      url: siteUrl,
    },
  };

  const offerJsonLd = {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: "Nestino quarterly — Bowora partner",
    description: messages.bowora.meta.description,
    price: "499.50",
    priceCurrency: "USD",
    priceValidUntil: "2027-12-31",
    url: `${siteUrl}${localizedPath(locale, "/bowora")}`,
    seller: {
      "@type": "Organization",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(offerJsonLd),
        }}
      />
      <BoworaShell locale={locale} messages={messages}>
        <BoworaPartnerHero />
        <ProblemSection />
        <EngineVisualSection />
        <HowItWorksSection />
        <BoworaQuarterlyPricingSection />
        <BoworaFaqSection />
        <FinalCtaSection />
      </BoworaShell>
    </>
  );
}
