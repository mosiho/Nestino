import { EngineVisualSection } from "@/components/sections/engine-visual";
import { FaqSection } from "@/components/sections/faq";
import { FinalCtaSection } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { PricingSection } from "@/components/sections/pricing";
import { ProblemSection } from "@/components/sections/problem";
import { ProofSection } from "@/components/sections/proof";
import { getSiteUrl } from "@/lib/constants";
import { faqEntries } from "@/lib/faq-data";

type PageProps = {
  searchParams: Promise<{ slug?: string }>;
};

export default async function HomePage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const slug = sp.slug?.trim();

  const siteUrl = getSiteUrl();

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Nestino",
    url: siteUrl,
    description:
      "Zero-commission direct bookings for premium villas—discovery, conversion, and an autonomous growth engine.",
    publisher: {
      "@type": "Organization",
      name: "Nestino",
      url: siteUrl,
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqEntries.map((item) => ({
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
      <PricingSection />
      <FaqSection />
      <FinalCtaSection
        demoSlug={
          slug && /^[a-z0-9-]+$/i.test(slug) ? slug.toLowerCase() : undefined
        }
      />
    </>
  );
}
