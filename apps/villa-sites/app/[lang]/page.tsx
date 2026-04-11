import type { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";

import { isLang, type Lang } from "@/lib/i18n";
import { getSiteBySubdomain } from "@/lib/tenant";

import Hero from "@/components/silyan/hero";
import StatBar from "@/components/silyan/stat-bar";
import TheStay from "@/components/silyan/the-stay";
import VillaCards from "@/components/silyan/villa-cards";
import LocationTeaser from "@/components/silyan/location-teaser";
import PricingOverview from "@/components/silyan/pricing-overview";
import Reviews from "@/components/silyan/reviews";
import FAQ from "@/components/silyan/faq";
import CtaBand from "@/components/silyan/cta-band";

type Props = { params: Promise<{ lang: string }> };

const META: Record<string, { title: string; description: string }> = {
  en: {
    title: "Silyan Villas — Private villas in the mountains above Antalya",
    description:
      "Three private villas with pools in Hisarçandır, Konyaaltı, Antalya. Up to 10 guests. 8 km from the sea, 22 km from the airport. Inquiry-based direct booking.",
  },
  tr: {
    title: "Silyan Villas — Antalya'nın doğasında özel villalar",
    description:
      "Hisarçandır, Konyaaltı'nda özel havuzlu üç villa. 10 kişiye kadar. Denize 8 km, havalimanına 22 km. Doğrudan rezervasyon.",
  },
  ar: {
    title: "سيليان فيلاز — فيلات خاصة في جبال أنطاليا",
    description:
      "ثلاث فيلات خاصة مع مسابح في هيسارتشاندير، كونيالتي، أنطاليا. حتى 10 ضيوف. 8 كيلومترات من البحر، 22 كيلومتراً من المطار.",
  },
  ru: {
    title: "Silyan Villas — Частные виллы в горах над Анталией",
    description:
      "Три частные виллы с бассейнами в Хисарчандыре, Конъяалты, Анталия. До 10 гостей. 8 км от моря, 22 км от аэропорта.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const meta = META[lang] ?? META.en!;

  const h = await headers();
  const host = h.get("host") ?? "";
  const protocol = host.includes("localhost") ? "http" : "https";

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${protocol}://${host}/${lang}`,
      type: "website",
    },
  };
}

function buildJsonLd(host: string, lang: string) {
  const protocol = host.includes("localhost") ? "http" : "https";
  const base = `${protocol}://${host}`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "LodgingBusiness",
      "@id": `${base}/en/#lodging`,
      name: "Silyan Villas",
      url: `${base}/${lang}/`,
      description:
        "Three private villas with pools in Hisarçandır, Konyaaltı, Antalya — boutique mountain retreat 8 km from the sea.",
      telephone: "+905316960953",
      email: "info@silyanvillas.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Hisarçandır Mah. Çandır Cad. No:182",
        addressLocality: "Konyaaltı",
        addressRegion: "Antalya",
        postalCode: "07070",
        addressCountry: "TR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 36.823,
        longitude: 30.5378,
      },
      numberOfRooms: "11",
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "Private Pool", value: true },
        { "@type": "LocationFeatureSpecification", name: "Free WiFi", value: true },
        { "@type": "LocationFeatureSpecification", name: "Private Parking", value: true },
        { "@type": "LocationFeatureSpecification", name: "Mountain View", value: true },
      ],
      inLanguage: lang,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Silyan Villas",
      url: `${base}/${lang}/`,
      inLanguage: lang,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: lang,
      mainEntity: [
        {
          "@type": "Question",
          name: "How many villas are there at Silyan Villas?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Three — Villa Badem, Villa Defne, and Villa İncir. Each is a fully independent villa with its own private pool, garden, and entrance.",
          },
        },
        {
          "@type": "Question",
          name: "How far is Silyan Villas from Antalya Airport?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "22 km — approximately 25–30 minutes by car.",
          },
        },
        {
          "@type": "Question",
          name: "Does each villa have a private pool?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Every villa has its own private pool and garden — guests do not share pools.",
          },
        },
        {
          "@type": "Question",
          name: "What is the minimum stay at Silyan Villas?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The minimum stay is 2 nights for all villas.",
          },
        },
      ],
    },
  ];
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  const safeLang: Lang = isLang(lang) ? lang : "en";

  const h = await headers();
  const slug = h.get("x-nestino-slug") ?? "";
  const host = h.get("host") ?? "";

  const ctx = slug ? await getSiteBySubdomain(slug) : null;
  const phone = ctx?.tenant.ownerPhone ?? "+905316960953";

  const jsonLd = buildJsonLd(host, safeLang);

  return (
    <>
      <Script
        id="jsonld-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1 — Hero */}
      <Hero lang={safeLang} phone={phone} />

      {/* 2 — StatBar */}
      <StatBar lang={safeLang} />

      {/* 3 — The Stay */}
      <TheStay lang={safeLang} />

      {/* 4 — Villa Cards */}
      <VillaCards lang={safeLang} />

      {/* 5 — Location Teaser */}
      <LocationTeaser lang={safeLang} />

      {/* 6 — Pricing Overview */}
      <PricingOverview lang={safeLang} />

      {/* 7 — Reviews */}
      <Reviews lang={safeLang} />

      {/* 8 — FAQ */}
      <FAQ lang={safeLang} />

      {/* 9 — Final CTA Band */}
      <CtaBand lang={safeLang} phone={phone} />
    </>
  );
}