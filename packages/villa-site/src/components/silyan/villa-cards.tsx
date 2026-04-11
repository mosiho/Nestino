import Image from "next/image";
import Link from "next/link";
import type { Lang } from "../../lib/i18n";
import { villaPath } from "../../lib/villa-path";
import { VILLA_IMAGES } from "../../lib/silyan-images";

type Props = { lang: Lang; pathPrefix?: string };

const VILLAS = [
  {
    slug: "portakal",
    name: "Villa Portakal",
    hook: {
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
  },
  {
    slug: "incir",
    name: "Villa İncir",
    hook: {
      en: "3 bedrooms · private pool · sleeps 6",
      tr: "3 yatak odası · özel havuz · 6 kişilik",
      ar: "3 غرف نوم · مسبح خاص · 6 أشخاص",
      ru: "3 спальни · частный бассейн · до 6 гостей",
    },
    desc: {
      en: "Named for the fig tree. Your own pool, your own garden, your own pace.",
      tr: "İncir ağacından adını alır. Kendi havuzunuz, kendi bahçeniz, kendi temponuz.",
      ar: "سميت على اسم شجرة التين. مسبحك الخاص، حديقتك الخاصة، وتيرتك الخاصة.",
      ru: "Названа в честь смоковницы. Свой бассейн, свой сад, свой ритм.",
    },
  },
  {
    slug: "kayisi",
    name: "Villa Kayısı",
    hook: {
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
  },
  {
    slug: "hurma",
    name: "Villa Hurma",
    hook: {
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
  },
  {
    slug: "defne",
    name: "Villa Defne",
    hook: {
      en: "5 bedrooms · private pool · sleeps 10",
      tr: "5 yatak odası · özel havuz · 10 kişilik",
      ar: "5 غرف نوم · مسبح خاص · 10 أشخاص",
      ru: "5 спален · частный бассейн · до 10 гостей",
    },
    desc: {
      en: "The largest villa — ideal for extended families or two-family trips.",
      tr: "En büyük villa — geniş aileler veya iki aile grupları için ideal.",
      ar: "أكبر الفيلات — مثالية للعائلات الممتدة أو رحلات الأسرتين.",
      ru: "Самая большая вилла — идеальна для больших семей или двух семей вместе.",
    },
  },
  {
    slug: "mandalina",
    name: "Villa Mandalina",
    hook: {
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
  },
  {
    slug: "turunc",
    name: "Villa Turunç",
    hook: {
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
  },
  {
    slug: "zeytin",
    name: "Villa Zeytin",
    hook: {
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
  },
  {
    slug: "badem",
    name: "Villa Badem",
    hook: {
      en: "3 bedrooms · private pool · sleeps 6",
      tr: "3 yatak odası · özel havuz · 6 kişilik",
      ar: "3 غرف نوم · مسبح خاص · 6 أشخاص",
      ru: "3 спальни · частный бассейн · до 6 гостей",
    },
    desc: {
      en: "Sun-filled retreat for families or small groups. Every bedroom has its own bathroom.",
      tr: "Aileler veya küçük gruplar için güneş dolu bir tatil evi. Her yatak odasının kendi banyosu var.",
      ar: "ملاذ مشمس للعائلات أو المجموعات الصغيرة. لكل غرفة نوم حمامها الخاص.",
      ru: "Солнечный отдых для семей или небольших компаний. В каждой спальне свой санузел.",
    },
  },
  {
    slug: "limon",
    name: "Villa Limon",
    hook: {
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
  },
  {
    slug: "uzum",
    name: "Villa Üzüm",
    hook: {
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

const VIEW_LABEL: Record<string, string> = {
  en: "View villa",
  tr: "Villayı görüntüle",
  ar: "عرض الفيلا",
  ru: "Смотреть виллу",
};

const SECTION_TITLE: Record<string, { heading: string; sub: string }> = {
  en: {
    heading: "Our Villas",
    sub: "Eleven independent villas, each with its own private pool and garden.",
  },
  tr: {
    heading: "Villalarımız",
    sub: "Her biri özel havuzlu ve bahçeli, on bir bağımsız villa.",
  },
  ar: {
    heading: "فيلاتنا",
    sub: "إحدى عشرة فيلا مستقلة، لكل منها مسبح خاص وحديقة خاصة.",
  },
  ru: {
    heading: "Наши виллы",
    sub: "Одиннадцать независимых вилл, каждая с частным бассейном и садом.",
  },
};

export default function VillaCards({ lang, pathPrefix = "" }: Props) {
  const viewLabel = VIEW_LABEL[lang] ?? VIEW_LABEL.en!;
  const titles = SECTION_TITLE[lang] ?? SECTION_TITLE.en!;
  const aiLabel = AI_LABEL[lang] ?? AI_LABEL.en!;

  return (
    <section className="section-y bg-[var(--color-surface)]">
      <div className="content-wrapper">
        <h2 className="font-serif font-semibold text-h2 text-[var(--color-text-primary)] mb-3">
          {titles.heading}
        </h2>
        <p className="text-[var(--color-text-secondary)] mb-10 max-w-xl">
          {titles.sub}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VILLAS.map((villa) => {
            const hook = villa.hook[lang as keyof typeof villa.hook] ?? villa.hook.en;
            const desc = villa.desc[lang as keyof typeof villa.desc] ?? villa.desc.en;
            const imgSrc = VILLA_IMAGES[villa.slug]?.card;
            const idealFor = IDEAL_FOR[villa.slug]?.[lang] ?? IDEAL_FOR[villa.slug]?.en;

            return (
              <Link
                key={villa.slug}
                href={villaPath(pathPrefix, `/${lang}/villas/${villa.slug}`)}
                className="group rounded-lg overflow-hidden border border-[var(--color-border)] hover:border-[var(--accent-500)] hover:shadow-[var(--shadow-md)] transition-all bg-[var(--color-bg)]"
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-[var(--color-border)]">
                  {imgSrc ? (
                    <Image
                      src={imgSrc}
                      alt={villa.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-[var(--color-text-muted)] text-xs">
                      {villa.name}
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="font-serif font-semibold text-lg text-[var(--color-text-primary)] mb-1">
                    {villa.name}
                  </h3>
                  <p
                    className="text-xs font-medium mb-2"
                    style={{ color: "var(--accent-500)" }}
                  >
                    {hook}
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-3 leading-relaxed">
                    {desc}
                  </p>
                  {idealFor && (
                    <div className="flex items-start gap-1.5 mb-4 px-2.5 py-2 rounded-md bg-[var(--accent-muted)] border border-[var(--accent-500)]/10">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-px" style={{ color: "var(--accent-500)" }}>
                        <path d="M8 1l1.545 4.955L14.5 7.5l-4.955 1.545L8 14l-1.545-4.955L1.5 7.5l4.955-1.545L8 1z" fill="currentColor" />
                      </svg>
                      <p className="text-xs leading-snug text-[var(--color-text-secondary)]">
                        <span className="font-semibold" style={{ color: "var(--accent-500)" }}>{aiLabel}:</span>{" "}
                        {idealFor}
                      </p>
                    </div>
                  )}
                  <span
                    className="text-sm font-medium transition-colors group-hover:underline"
                    style={{ color: "var(--accent-500)" }}
                  >
                    {viewLabel} →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
