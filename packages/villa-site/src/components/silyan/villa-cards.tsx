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
                  <p className="text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed">
                    {desc}
                  </p>
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
