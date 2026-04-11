import type { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";

import { isLang, type Lang } from "../lib/i18n";
import { resolveRequestOrigin } from "../lib/site-origin";
import { getSiteBySubdomain } from "../lib/tenant";
import { villaPath } from "../lib/villa-path";

import Hero from "../components/silyan/hero";
import StatBar from "../components/silyan/stat-bar";
import TheStay from "../components/silyan/the-stay";
import VillaCards from "../components/silyan/villa-cards";
import LocationTeaser from "../components/silyan/location-teaser";
import PricingOverview from "../components/silyan/pricing-overview";
import Reviews from "../components/silyan/reviews";
import FAQ from "../components/silyan/faq";
import CtaBand from "../components/silyan/cta-band";

type HomeParams = { lang: string; siteSlug?: string };

type HomeProps = {
  params: Promise<HomeParams>;
  pathPrefix: string;
};

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

export async function generateVillaHomeMetadata({
  params,
  pathPrefix,
}: HomeProps): Promise<Metadata> {
  const { lang } = await params;
  const meta = META[lang] ?? META.en!;

  const h = await headers();
  const origin = resolveRequestOrigin(h.get("host"));
  const ogPath = villaPath(pathPrefix, `/${lang}`);

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${origin.origin}${ogPath}`,
      type: "website",
    },
  };
}

function buildJsonLd(hostHeader: string | null, lang: string, pathPrefix: string) {
  const origin = resolveRequestOrigin(hostHeader);
  const base = `${origin.origin}${pathPrefix}`;

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
      sameAs: ["https://www.instagram.com/silyanvillalari/"],
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

export default async function VillaHomePage({ params, pathPrefix }: HomeProps) {
  const { lang } = await params;
  const safeLang: Lang = isLang(lang) ? lang : "en";

  const h = await headers();
  const slug = h.get("x-nestino-slug") ?? "";

  const ctx = slug ? await getSiteBySubdomain(slug) : null;
  const phone = ctx?.tenant.ownerPhone ?? "+905316960953";

  const jsonLd = buildJsonLd(h.get("host"), safeLang, pathPrefix);

  return (
    <>
      <Script
        id="jsonld-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero lang={safeLang} phone={phone} pathPrefix={pathPrefix} />
      <StatBar lang={safeLang} />
      <TheStay lang={safeLang} />
      <VillaCards lang={safeLang} pathPrefix={pathPrefix} />
      <LocationTeaser lang={safeLang} pathPrefix={pathPrefix} />
      <PricingOverview lang={safeLang} pathPrefix={pathPrefix} />
      <Reviews lang={safeLang} />
      <FAQ lang={safeLang} />
      <CtaBand lang={safeLang} phone={phone} pathPrefix={pathPrefix} />
    </>
  );
}
