import Image from "next/image";
import Link from "next/link";
import type { Lang } from "../../lib/i18n";
import { villaPath } from "../../lib/villa-path";
import { VILLA_IMAGES } from "../../lib/silyan-images";
import AnimateOnScroll from "../animate-on-scroll";

type Props = { lang: Lang; pathPrefix?: string };

const VILLAS = [
  {
    slug: "portakal",
    name: "Villa Portakal",
    hook: { en: "5 bedrooms · private pool · sleeps 10", tr: "5 yatak odası · özel havuz · 10 kişilik", ar: "5 غرف نوم · مسبح خاص · 10 أشخاص", ru: "5 спален · частный бассейн · до 10 гостей" },
    desc: { en: "Named after the orange tree. Spacious five-bedroom villa with en-suite bathrooms throughout.", tr: "Portakal ağacından adını alır. Geniş aileler için beş odalı, her odada banyolu villa.", ar: "سميت على اسم شجرة البرتقال. فيلا فسيحة من خمس غرف نوم مع حمام خاص.", ru: "Названа в честь апельсинового дерева. Просторная вилла с пятью спальнями." },
  },
  {
    slug: "incir",
    name: "Villa İncir",
    hook: { en: "3 bedrooms · private pool · sleeps 6", tr: "3 yatak odası · özel havuz · 6 kişilik", ar: "3 غرف نوم · مسبح خاص · 6 أشخاص", ru: "3 спальни · частный бассейн · до 6 гостей" },
    desc: { en: "Named for the fig tree. Your own pool, your own garden, your own pace.", tr: "İncir ağacından adını alır. Kendi havuzunuz, kendi bahçeniz, kendi temponuz.", ar: "سميت على اسم شجرة التين. مسبحك الخاص، حديقتك الخاصة، وتيرتك الخاصة.", ru: "Названа в честь смоковницы. Свой бассейн, свой сад, свой ритм." },
  },
  {
    slug: "defne",
    name: "Villa Defne",
    hook: { en: "5 bedrooms · private pool · sleeps 10", tr: "5 yatak odası · özel havuz · 10 kişilik", ar: "5 غرف نوم · مسبح خاص · 10 أشخاص", ru: "5 спален · частный бассейн · до 10 гостей" },
    desc: { en: "The largest villa — ideal for extended families or two-family trips.", tr: "En büyük villa — geniş aileler veya iki aile grupları için ideal.", ar: "أكبر الفيلات — مثالية للعائلات الممتدة أو رحلات الأسرتين.", ru: "Самая большая вилла — идеальна для больших семей или двух семей вместе." },
  },
] as const;

const IDEAL_FOR: Record<string, Record<string, string>> = {
  portakal: { en: "Large families & groups", tr: "Geniş aileler ve gruplar", ar: "العائلات الكبيرة والمجموعات", ru: "Большие семьи и группы" },
  incir: { en: "Families & friend groups", tr: "Aileler ve arkadaş grupları", ar: "العائلات ومجموعات الأصدقاء", ru: "Семьи и компании друзей" },
  defne: { en: "Extended families", tr: "Geniş aileler", ar: "العائلات الممتدة", ru: "Большие семьи" },
};

const VIEW_LABEL: Record<string, string> = { en: "View villa", tr: "Villayı görüntüle", ar: "عرض الفيلا", ru: "Смотреть виллу" };
const AI_LABEL: Record<string, string> = { en: "Best for", tr: "En uygun", ar: "الأنسب لـ", ru: "Подходит для" };

const SECTION_TITLE: Record<string, { heading: string; sub: string; showAll: string }> = {
  en: { heading: "Our Villas", sub: "Eleven independent villas, each with its own private pool and garden.", showAll: "View all 11 villas" },
  tr: { heading: "Villalarımız", sub: "Her biri özel havuzlu ve bahçeli, on bir bağımsız villa.", showAll: "Tüm 11 villayı görüntüle" },
  ar: { heading: "فيلاتنا", sub: "إحدى عشرة فيلا مستقلة، لكل منها مسبح خاص وحديقة خاصة.", showAll: "عرض جميع الفيلات الـ 11" },
  ru: { heading: "Наши виллы", sub: "Одиннадцать независимых вилл, каждая с частным бассейном и садом.", showAll: "Смотреть все 11 вилл" },
};

function VillaCard({
  villa,
  lang,
  pathPrefix,
  viewLabel,
  aiLabel,
}: {
  villa: (typeof VILLAS)[number];
  lang: string;
  pathPrefix: string;
  viewLabel: string;
  aiLabel: string;
}) {
  const hook = villa.hook[lang as keyof typeof villa.hook] ?? villa.hook.en;
  const desc = villa.desc[lang as keyof typeof villa.desc] ?? villa.desc.en;
  const imgSrc = VILLA_IMAGES[villa.slug]?.card;
  const idealFor = IDEAL_FOR[villa.slug]?.[lang] ?? IDEAL_FOR[villa.slug]?.en;

  return (
    <Link
      href={villaPath(pathPrefix, `/${lang}/villas/${villa.slug}`)}
      className="group rounded-xl overflow-hidden border border-[var(--color-border)] hover:border-[var(--accent-400)] hover:shadow-[var(--shadow-glow)] transition-all duration-500 bg-[var(--color-bg)] active:scale-[0.98] w-[82vw] sm:w-auto shrink-0 sm:shrink"
    >
      <div className="aspect-[3/2] relative overflow-hidden bg-[var(--color-border)]">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={villa.name}
            fill
            sizes="(max-width: 640px) 82vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[var(--color-text-muted)] text-xs">
            {villa.name}
          </div>
        )}
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Best-for badge */}
        {idealFor && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-white backdrop-blur-md" style={{ backgroundColor: "rgba(0,0,0,0.45)" }}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" style={{ color: "var(--gold-accent)" }} aria-hidden="true">
              <path d="M8 1l1.545 4.955L14.5 7.5l-4.955 1.545L8 14l-1.545-4.955L1.5 7.5l4.955-1.545L8 1z" />
            </svg>
            {aiLabel}: {idealFor}
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-serif font-semibold text-lg text-[var(--color-text-primary)] mb-1">
          {villa.name}
        </h3>
        <p className="text-xs font-medium mb-2" style={{ color: "var(--accent-500)" }}>
          {hook}
        </p>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed line-clamp-2">
          {desc}
        </p>
        <span
          className="inline-flex items-center gap-1 text-sm font-medium transition-all duration-300 group-hover:gap-2"
          style={{ color: "var(--accent-500)" }}
        >
          {viewLabel}
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M6 3l5 5-5 5" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

export default function VillaCards({ lang, pathPrefix = "" }: Props) {
  const viewLabel = VIEW_LABEL[lang] ?? VIEW_LABEL.en!;
  const titles = SECTION_TITLE[lang] ?? SECTION_TITLE.en!;
  const aiLabel = AI_LABEL[lang] ?? AI_LABEL.en!;

  return (
    <section className="section-y bg-[var(--color-surface)] content-lazy">
      <div className="content-wrapper">
        <AnimateOnScroll variant="fade-up">
          <h2 className="font-serif font-semibold text-h2 text-[var(--color-text-primary)] mb-3">
            {titles.heading}
          </h2>
          <p className="text-base text-[var(--color-text-secondary)] mb-8 max-w-xl">
            {titles.sub}
          </p>
        </AnimateOnScroll>

        {/* Mobile: horizontal scroll carousel / Desktop: grid */}
        <div className="snap-carousel sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:overflow-visible">
          {VILLAS.map((villa, i) => (
            <AnimateOnScroll key={villa.slug} variant="fade-up" delay={i * 0.08} className="contents sm:block">
              <VillaCard
                villa={villa}
                lang={lang}
                pathPrefix={pathPrefix}
                viewLabel={viewLabel}
                aiLabel={aiLabel}
              />
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll variant="fade-up" delay={0.2}>
          <div className="mt-10 text-center">
            <Link
              href={villaPath(pathPrefix, `/${lang}/villas`)}
              className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:gap-3 group"
              style={{ color: "var(--accent-500)" }}
            >
              {titles.showAll}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                <path d="M6 3l5 5-5 5" />
              </svg>
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
