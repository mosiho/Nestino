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
    slug: "portakal",
    name: "Villa Portakal",
    tagline: {
      en: "5 bedrooms · private pool · sleeps 10",
      tr: "5 yatak odası · özel havuz · 10 kişilik",
      ar: "5 غرف نوم · مسبح خاص · 10 أشخاص",
      ru: "5 спален · частный бассейн · до 10 гостей",
    },
    desc: {
      en: "Named after the orange tree. Spacious five-bedroom villa with en-suite bathrooms throughout.",
      tr: "Portakal ağacından adını alır. Geniş aileler için beş odalı, her odada banyolu villa.",
      ar: "سميت على اسم شجرة البرتقال. فيلا فسيحة من خمس غرف نوم مع حمام خاص.",
      ru: "Названа в честь апельсинового дерева. Просторная вилла с пятью спальнями.",
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
  {
    slug: "kayisi",
    name: "Villa Kayısı",
    tagline: {
      en: "3 bedrooms · private pool · sleeps 6",
      tr: "3 yatak odası · özel havuz · 6 kişilik",
      ar: "3 غرف نوم · مسبح خاص · 6 أشخاص",
      ru: "3 спальни · частный бассейн · до 6 гостей",
    },
    desc: {
      en: "Named after the apricot tree. En-suite bathrooms and a garden retreat.",
      tr: "Kayısı ağacından adını alır. Her odada banyo, bahçe içinde huzurlu bir tatil.",
      ar: "سميت على اسم شجرة المشمش. حمام خاص في كل غرفة وملاذ في الحديقة.",
      ru: "Названа в честь абрикосового дерева. Собственные ванные и отдых в саду.",
    },
    capacity: 6,
    bedrooms: 3,
  },
  {
    slug: "hurma",
    name: "Villa Hurma",
    tagline: {
      en: "2 bedrooms · private pool · sleeps 4",
      tr: "2 yatak odası · özel havuz · 4 kişilik",
      ar: "غرفتا نوم · مسبح خاص · 4 أشخاص",
      ru: "2 спальни · частный бассейн · до 4 гостей",
    },
    desc: {
      en: "Named after the date palm. Cosy retreat for couples or a small family.",
      tr: "Hurma ağacından adını alır. Çiftler veya küçük aileler için şirin bir tatil evi.",
      ar: "سميت على اسم شجرة النخيل. ملاذ مريح للأزواج أو العائلات الصغيرة.",
      ru: "Названа в честь финиковой пальмы. Уютный отдых для пар или небольшой семьи.",
    },
    capacity: 4,
    bedrooms: 2,
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
    slug: "mandalina",
    name: "Villa Mandalina",
    tagline: {
      en: "3 bedrooms · private pool · sleeps 6",
      tr: "3 yatak odası · özel havuz · 6 kişilik",
      ar: "3 غرف نوم · مسبح خاص · 6 أشخاص",
      ru: "3 спальни · частный бассейн · до 6 гостей",
    },
    desc: {
      en: "Named after the mandarin tree. En-suite bedrooms with mountain backdrop.",
      tr: "Mandalina ağacından adını alır. Dağ manzarasına karşı her odada banyolu villa.",
      ar: "سميت على اسم شجرة اليوسفي. غرف نوم مع حمام خاص وخلفية جبلية.",
      ru: "Названа в честь мандаринового дерева. Спальни с ванными на фоне гор.",
    },
    capacity: 6,
    bedrooms: 3,
  },
  {
    slug: "turunc",
    name: "Villa Turunç",
    tagline: {
      en: "3 bedrooms · private pool · sleeps 6",
      tr: "3 yatak odası · özel havuz · 6 kişilik",
      ar: "3 غرف نوم · مسبح خاص · 6 أشخاص",
      ru: "3 спальни · частный бассейн · до 6 гостей",
    },
    desc: {
      en: "Named for the bitter orange. A peaceful base with pool and mountain views.",
      tr: "Turunç ağacından adını alır. Havuz ve dağ manzarasıyla huzurlu bir konaklama.",
      ar: "سميت على اسم البرتقال المر. قاعدة هادئة مع مسبح وإطلالة جبلية.",
      ru: "Названа в честь горького апельсина. Спокойный отдых с бассейном и горными видами.",
    },
    capacity: 6,
    bedrooms: 3,
  },
  {
    slug: "zeytin",
    name: "Villa Zeytin",
    tagline: {
      en: "2 bedrooms · private pool · sleeps 4",
      tr: "2 yatak odası · özel havuz · 4 kişilik",
      ar: "غرفتا نوم · مسبح خاص · 4 أشخاص",
      ru: "2 спальни · частный бассейн · до 4 гостей",
    },
    desc: {
      en: "Named for the olive tree. Intimate villa for couples or a small family.",
      tr: "Zeytin ağacından adını alır. Çiftler veya küçük aileler için samimi bir villa.",
      ar: "سميت على اسم شجرة الزيتون. فيلا حميمة للأزواج أو العائلات الصغيرة.",
      ru: "Названа в честь оливкового дерева. Уютная вилла для пар или небольшой семьи.",
    },
    capacity: 4,
    bedrooms: 2,
  },
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
    slug: "limon",
    name: "Villa Limon",
    tagline: {
      en: "3 bedrooms · private pool · sleeps 6",
      tr: "3 yatak odası · özel havuz · 6 kişilik",
      ar: "3 غرف نوم · مسبح خاص · 6 أشخاص",
      ru: "3 спальни · частный бассейн · до 6 гостей",
    },
    desc: {
      en: "Named for the lemon tree. Three en-suite bedrooms with lush garden views.",
      tr: "Limon ağacından adını alır. Üç odalı, her odada banyolu, bahçe manzaralı villa.",
      ar: "سميت على اسم شجرة الليمون. ثلاث غرف نوم مع حمام خاص وإطلالة حديقة.",
      ru: "Названа в честь лимонного дерева. Три спальни с ванными и видом на сад.",
    },
    capacity: 6,
    bedrooms: 3,
  },
  {
    slug: "uzum",
    name: "Villa Üzüm",
    tagline: {
      en: "2 bedrooms · private pool · sleeps 4",
      tr: "2 yatak odası · özel havuz · 4 kişilik",
      ar: "غرفتا نوم · مسبح خاص · 4 أشخاص",
      ru: "2 спальни · частный бассейн · до 4 гостей",
    },
    desc: {
      en: "Named after the grape vine. A compact escape with pool and nature all around.",
      tr: "Üzüm bağından adını alır. Doğayla iç içe, havuzlu şirin bir kaçamak.",
      ar: "سميت على اسم شجرة العنب. ملاذ مريح مع مسبح ومحاطة بالطبيعة.",
      ru: "Названа в честь виноградной лозы. Компактный отдых с бассейном среди природы.",
    },
    capacity: 4,
    bedrooms: 2,
  },
] as const;

const IDEAL_FOR: Record<string, Record<string, string>> = {
  portakal: {
    en: "Large families & group reunions",
    tr: "Geniş aileler ve grup buluşmaları",
    ar: "العائلات الكبيرة ولقاءات المجموعات",
    ru: "Большие семьи и групповые встречи",
  },
  incir: {
    en: "Families & friend groups",
    tr: "Aileler ve arkadaş grupları",
    ar: "العائلات ومجموعات الأصدقاء",
    ru: "Семьи и компании друзей",
  },
  kayisi: {
    en: "Families seeking comfort & privacy",
    tr: "Konfor ve mahremiyet arayan aileler",
    ar: "العائلات الباحثة عن الراحة والخصوصية",
    ru: "Семьи, ценящие комфорт и уединение",
  },
  hurma: {
    en: "Couples & small families",
    tr: "Çiftler ve küçük aileler",
    ar: "الأزواج والعائلات الصغيرة",
    ru: "Пары и небольшие семьи",
  },
  defne: {
    en: "Extended families & two-family trips",
    tr: "Geniş aileler ve iki aile tatilleri",
    ar: "العائلات الممتدة ورحلات الأسرتين",
    ru: "Большие семьи и отдых двумя семьями",
  },
  mandalina: {
    en: "Families who love mountain views",
    tr: "Dağ manzarasını seven aileler",
    ar: "العائلات المحبة لإطلالات الجبال",
    ru: "Семьи, любящие горные виды",
  },
  turunc: {
    en: "Peace seekers & nature lovers",
    tr: "Huzur arayanlar ve doğa severler",
    ar: "الباحثون عن الهدوء ومحبو الطبيعة",
    ru: "Любители тишины и природы",
  },
  zeytin: {
    en: "Romantic getaways & quiet retreats",
    tr: "Romantik kaçamaklar ve sessiz tatiller",
    ar: "العطلات الرومانسية والخلوات الهادئة",
    ru: "Романтические поездки и тихий отдых",
  },
  badem: {
    en: "Families & small friend groups",
    tr: "Aileler ve küçük arkadaş grupları",
    ar: "العائلات ومجموعات الأصدقاء الصغيرة",
    ru: "Семьи и небольшие компании друзей",
  },
  limon: {
    en: "Garden lovers & relaxed families",
    tr: "Bahçe severler ve rahat aileler",
    ar: "محبو الحدائق والعائلات المسترخية",
    ru: "Любители садов и спокойные семьи",
  },
  uzum: {
    en: "Budget-friendly couple escapes",
    tr: "Bütçe dostu çift kaçamakları",
    ar: "عطلات اقتصادية للأزواج",
    ru: "Бюджетный отдых для пар",
  },
};

const AI_LABEL: Record<string, string> = {
  en: "Best for",
  tr: "En uygun",
  ar: "الأنسب لـ",
  ru: "Подходит для",
};

const COPY: Record<string, { title: string; sub: string; view: string }> = {
  en: {
    title: "Our Villas",
    sub: "Eleven independent villas, each with a private pool and garden, designed for families and groups seeking privacy in the mountains above Antalya.",
    view: "View villa",
  },
  tr: {
    title: "Villalarımız",
    sub: "Her biri özel havuzu ve bahçesiyle bağımsız on bir villa. Antalya'nın doğasında mahremiyet arayan aileler ve gruplar için tasarlandı.",
    view: "Villayı görüntüle",
  },
  ar: {
    title: "فيلاتنا",
    sub: "إحدى عشرة فيلا مستقلة، لكل منها مسبح خاص وحديقة، مصممة للعائلات والمجموعات الباحثة عن الخصوصية في جبال أنطاليا.",
    view: "عرض الفيلا",
  },
  ru: {
    title: "Наши виллы",
    sub: "Одиннадцать независимых вилл, каждая с частным бассейном и садом, для семей и групп, ищущих уединение в горах над Анталией.",
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
  const aiLabel = AI_LABEL[lang] ?? AI_LABEL.en!;

  return (
    <div className="pt-20 pb-16">
      <div className="section-y">
        <div className="content-wrapper">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--accent-500)" }}>
            Silyan Villas
          </p>
          <h1 className="font-serif font-semibold text-h1 text-[var(--color-text-primary)] mb-4">
            {c.title}
          </h1>
          <p className="text-base text-[var(--color-text-secondary)] mb-10 max-w-2xl leading-relaxed">
            {c.sub}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VILLAS.map((villa) => {
              const imgSrc = VILLA_IMAGES[villa.slug]?.card;
              const tagline = villa.tagline[lang as keyof typeof villa.tagline] ?? villa.tagline.en;
              const desc = villa.desc[lang as keyof typeof villa.desc] ?? villa.desc.en;
              const idealFor = IDEAL_FOR[villa.slug]?.[lang] ?? IDEAL_FOR[villa.slug]?.en;

              return (
                <Link
                  key={villa.slug}
                  href={villaPath(pathPrefix, `/${lang}/villas/${villa.slug}`)}
                  className="group rounded-xl overflow-hidden border border-[var(--color-border)] hover:border-[var(--accent-400)] hover:shadow-[var(--shadow-glow)] transition-all duration-500 bg-[var(--color-surface)] active:scale-[0.98]"
                >
                  <div className="aspect-[3/2] relative overflow-hidden bg-[var(--color-border)]">
                    {imgSrc ? (
                      <Image
                        src={imgSrc}
                        alt={villa.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-[var(--color-text-muted)] text-sm">
                        {villa.name}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {idealFor && (
                      <div className="absolute top-3 start-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-white backdrop-blur-md" style={{ backgroundColor: "rgba(0,0,0,0.45)" }}>
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" style={{ color: "var(--gold-accent)" }} aria-hidden="true">
                          <path d="M8 1l1.545 4.955L14.5 7.5l-4.955 1.545L8 14l-1.545-4.955L1.5 7.5l4.955-1.545L8 1z" />
                        </svg>
                        {aiLabel}: {idealFor}
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
                    <p className="text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed line-clamp-2">
                      {desc}
                    </p>
                    <span
                      className="inline-flex items-center gap-1 text-sm font-medium transition-all duration-300 group-hover:gap-2"
                      style={{ color: "var(--accent-500)" }}
                    >
                      {c.view}
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="rtl:rotate-180"><path d="M6 3l5 5-5 5" /></svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
