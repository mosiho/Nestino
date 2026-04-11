import type { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";

import { isLang, type Lang } from "../lib/i18n";
import { resolveRequestOrigin } from "../lib/site-origin";
import { getActiveLangs, getSiteBySubdomain } from "../lib/tenant";
import { villaPath } from "../lib/villa-path";
import { HERO_POSTER, SITE_LOGO } from "../lib/silyan-images";

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

const OG_LOCALE: Record<string, string> = {
  en: "en_US",
  tr: "tr_TR",
  ar: "ar_SA",
  ru: "ru_RU",
};

const META: Record<string, { title: string; description: string; openGraphTitle: string }> = {
  en: {
    title: "Private pool villas above Antalya — Hisarçandır & Konyaaltı",
    openGraphTitle: "Silyan Villas — Eleven private pool villas above Antalya",
    description:
      "Eleven independent vacation villas with private pools in Hisarçandır, Konyaaltı, Antalya — 4–10 guests per villa, 8 km to the beach, 22 km to Antalya Airport (AYT). Family-run; book by inquiry or WhatsApp.",
  },
  tr: {
    title: "Antalya'nın tepelerinde özel havuzlu villalar — Hisarçandır",
    openGraphTitle: "Silyan Villas — Hisarçandır'da on bir özel havuzlu villa",
    description:
      "Hisarçandır, Konyaaltı'nda on bir bağımsız tatil villası — her biri özel havuz ve bahçeli; villada 4–10 kişi. Denize 8 km, AYT havalimanına 22 km. Aile işletmesi; talep veya WhatsApp ile doğrudan rezervasyon.",
  },
  ar: {
    title: "فيلات خاصة بمسابح في أعلى أنطاليا — هيسارتشاندير",
    openGraphTitle: "سيليان فيلاز — أحد عشر فيلا بمسبح خاص فوق أنطاليا",
    description:
      "أحد عشر فيلا عطلات مستقلة مع مسابح خاصة في هيسارتشاندير، كونيالتي، أنطاليا — من 4 إلى 10 ضيوف لكل فيلا. 8 كم إلى الشاطئ و22 كم إلى مطار أنطاليا. إدارة عائلية؛ احجز عبر الطلب أو واتساب.",
  },
  ru: {
    title: "Частные виллы с бассейнами над Анталией — Хисарчандыре",
    openGraphTitle: "Silyan Villas — Одиннадцать вилл с частными бассейнами над Анталией",
    description:
      "Одиннадцать отдельных вилл для отдыха с частными бассейнами в Хисарчандыре, Конъяалты, Анталия — от 4 до 10 гостей на виллу. 8 км до пляжа, 22 км до аэропорта AYT. Семейное управление; бронирование по запросу или в WhatsApp.",
  },
};

export async function generateVillaHomeMetadata({
  params,
  pathPrefix,
}: HomeProps): Promise<Metadata> {
  const { lang, siteSlug: slugFromParams } = await params;
  const meta = META[lang] ?? META.en!;

  const h = await headers();
  const host = h.get("host");
  const origin = resolveRequestOrigin(host);
  const pagePath = villaPath(pathPrefix, `/${lang}`);
  const canonical = `${origin.origin}${pagePath}`;

  const siteSlug = slugFromParams ?? h.get("x-nestino-slug") ?? "";
  const ctx = siteSlug ? await getSiteBySubdomain(siteSlug) : null;
  const activeLangs = ctx ? getActiveLangs(ctx) : ["en"];
  const languages: Record<string, string> = Object.fromEntries(
    activeLangs.map((l) => [l, `${origin.origin}${villaPath(pathPrefix, `/${l}`)}`])
  );
  const defaultLang = ctx?.site.defaultLanguage ?? "en";
  if (activeLangs.includes(defaultLang)) {
    languages["x-default"] = `${origin.origin}${villaPath(pathPrefix, `/${defaultLang}`)}`;
  }

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical, languages },
    openGraph: {
      title: meta.openGraphTitle,
      description: meta.description,
      url: canonical,
      type: "website",
      siteName: "Silyan Villas",
      locale: OG_LOCALE[lang] ?? "en_US",
      images: [{ url: HERO_POSTER, width: 1200, height: 800, alt: "Silyan Villas — mountain villas near Antalya" }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.openGraphTitle,
      description: meta.description,
      images: [HERO_POSTER],
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
      "@id": `${base}/${lang}/#lodging`,
      name: "Silyan Villas",
      url: `${base}/${lang}/`,
      description:
        "Eleven independent private-pool vacation villas in Hisarçandır, Konyaaltı, Antalya — boutique hillside retreat 8 km from the Mediterranean coast.",
      telephone: "+905316960953",
      email: "info@silyanvillas.com",
      sameAs: ["https://www.instagram.com/silyanvillalari/"],
      image: HERO_POSTER,
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
      numberOfAccommodationUnits: 11,
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
      publisher: {
        "@type": "Organization",
        name: "Silyan Villas",
        logo: { "@type": "ImageObject", url: SITE_LOGO },
      },
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
            text: "Eleven independent villas — including Villa Portakal, Villa Defne, Villa İncir, Villa Badem, and others. Each is a fully separate home with its own private pool, garden, and entrance; pools are never shared between guests.",
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
