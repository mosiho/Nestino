import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { villaPath } from "../lib/villa-path";
import { VILLA_IMAGES } from "../lib/silyan-images";

export const villasIndexMetadata: Metadata = {
  title: "Villas",
};

const VILLAS = [
  {
    slug: "badem",
    name: "Villa Badem",
    tagline: {
      en: "3 bedrooms · private pool · sleeps 6",
      tr: "3 yatak odası · özel havuz · 6 kişilik",
      ar: "3 غرف نوم · مسبح خاص · 6 أشخاص",
      ru: "3 спальни · частный бассейн · до 6 гостей",
    },
    desc: {
      en: "Sun-filled retreat for families or small groups. Every bedroom has its own bathroom.",
      tr: "Aileler veya küçük gruplar için güneş dolu bir tatil evi.",
      ar: "ملاذ مشمس للعائلات أو المجموعات الصغيرة.",
      ru: "Солнечный отдых для семей или небольших компаний.",
    },
    capacity: 6,
    bedrooms: 3,
  },
  {
    slug: "defne",
    name: "Villa Defne",
    tagline: {
      en: "5 bedrooms · private pool · sleeps 10",
      tr: "5 yatak odası · özel havuz · 10 kişilik",
      ar: "5 غرف نوم · مسبح خاص · 10 أشخاص",
      ru: "5 спален · частный бассейн · до 10 гостей",
    },
    desc: {
      en: "The largest villa — ideal for extended families or two-family trips.",
      tr: "En büyük villa — geniş aileler veya iki aile grupları için ideal.",
      ar: "أكبر الفيلات — مثالية للعائلات الممتدة.",
      ru: "Самая большая вилла — идеальна для больших семей.",
    },
    capacity: 10,
    bedrooms: 5,
  },
  {
    slug: "incir",
    name: "Villa İncir",
    tagline: {
      en: "3 bedrooms · private pool · sleeps 6",
      tr: "3 yatak odası · özel havuz · 6 kişilik",
      ar: "3 غرف نوم · مسبح خاص · 6 أشخاص",
      ru: "3 спальни · частный бассейн · до 6 гостей",
    },
    desc: {
      en: "Named for the fig tree. Your own pool, your own garden, your own pace.",
      tr: "İncir ağacından adını alır. Kendi havuzunuz, kendi bahçeniz.",
      ar: "سميت على اسم شجرة التين. مسبحك الخاص، حديقتك الخاصة.",
      ru: "Названа в честь смоковницы. Свой бассейн, свой сад.",
    },
    capacity: 6,
    bedrooms: 3,
  },
] as const;

const COPY: Record<string, { title: string; sub: string; view: string }> = {
  en: {
    title: "Our Villas",
    sub: "Three independent villas, each with a private pool and garden, designed for families and groups seeking privacy in the mountains above Antalya.",
    view: "View villa",
  },
  tr: {
    title: "Villalarımız",
    sub: "Her biri özel havuzu ve bahçesiyle bağımsız üç villa. Antalya'nın doğasında mahremiyet arayan aileler ve gruplar için tasarlandı.",
    view: "Villayı görüntüle",
  },
  ar: {
    title: "فيلاتنا",
    sub: "ثلاث فيلات مستقلة، لكل منها مسبح خاص وحديقة، مصممة للعائلات والمجموعات الباحثة عن الخصوصية في جبال أنطاليا.",
    view: "عرض الفيلا",
  },
  ru: {
    title: "Наши виллы",
    sub: "Три независимые виллы, каждая с частным бассейном и садом, созданы для семей и групп, ищущих уединение в горах над Анталией.",
    view: "Смотреть виллу",
  },
};

type Props = {
  params: Promise<{ lang: string; siteSlug?: string }>;
  pathPrefix: string;
};

export default async function VillasIndexPage({ params, pathPrefix }: Props) {
  const { lang } = await params;
  const c = COPY[lang] ?? COPY.en!;

  return (
    <div className="pt-24 section-y">
      <div className="content-wrapper">
        <h1 className="font-serif font-semibold text-h1 text-[var(--color-text-primary)] mb-4">
          {c.title}
        </h1>
        <p className="text-[var(--color-text-secondary)] mb-12 max-w-2xl leading-relaxed">
          {c.sub}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VILLAS.map((villa) => {
            const imgSrc = VILLA_IMAGES[villa.slug]?.card;
            const tagline = villa.tagline[lang as keyof typeof villa.tagline] ?? villa.tagline.en;
            const desc = villa.desc[lang as keyof typeof villa.desc] ?? villa.desc.en;

            return (
              <Link
                key={villa.slug}
                href={villaPath(pathPrefix, `/${lang}/villas/${villa.slug}`)}
                className="group rounded-lg overflow-hidden border border-[var(--color-border)] hover:border-[var(--accent-500)] hover:shadow-[var(--shadow-md)] transition-all bg-[var(--color-surface)]"
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-[var(--color-border)]">
                  {imgSrc ? (
                    <Image
                      src={imgSrc}
                      alt={villa.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-[var(--color-text-muted)] text-sm">
                      {villa.name}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h2 className="font-serif font-semibold text-lg text-[var(--color-text-primary)] mb-1">
                    {villa.name}
                  </h2>
                  <p className="text-xs font-medium mb-2" style={{ color: "var(--accent-500)" }}>
                    {tagline}
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed">
                    {desc}
                  </p>
                  <span
                    className="inline-block text-sm font-medium transition-colors group-hover:underline"
                    style={{ color: "var(--accent-500)" }}
                  >
                    {c.view} →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
