import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EngineVisualSection } from "@/components/sections/engine-visual";
import { FaqSection } from "@/components/sections/faq";
import { FinalCtaSection } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { PricingSection } from "@/components/sections/pricing";
import { ProblemSection } from "@/components/sections/problem";
import { ProofSection } from "@/components/sections/proof";
import { PropertySitesSection } from "@/components/sections/property-sites";
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
  const canonicalPath = localizedPath(locale, "/");
  const enPath = localizedPath("en", "/");
  const trPath = localizedPath("tr", "/");

  return {
    title: messages.meta.homeTitle,
    description: messages.meta.homeDescription,
    openGraph: {
      type: "website",
      locale: messages.meta.ogLocale,
      url: `${siteUrl}${canonicalPath}`,
      siteName: "Nestino",
      title: messages.meta.homeTitle,
      description: messages.meta.homeDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: messages.meta.homeTitle,
      description: messages.meta.homeDescription,
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

export default async function HomePage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) {
    notFound();
  }

  const siteUrl = getSiteUrl();
  const messages = getMessages(raw);

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Nestino",
    url: `${siteUrl}${localizedPath(raw, "/")}`,
    description: messages.meta.websiteDescription,
    publisher: {
      "@type": "Organization",
      name: "Nestino",
      url: siteUrl,
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: messages.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />
      <Hero />
      <ProblemSection />
      <EngineVisualSection />
      <HowItWorksSection />
      <ProofSection />
      <PropertySitesSection messages={messages.propertySites} />
      <PricingSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
