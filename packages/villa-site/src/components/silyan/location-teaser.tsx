import Image from "next/image";
import Link from "next/link";
import type { Lang } from "../../lib/i18n";
import { villaPath } from "../../lib/villa-path";
import { LOCATION_IMAGE } from "../../lib/silyan-images";
import AnimateOnScroll from "../animate-on-scroll";

type Props = { lang: Lang; pathPrefix?: string };

const COPY: Record<string, { headline: string; sub: string; cta: string }> = {
  en: {
    headline: "Everything near, nothing crowded",
    sub: "Forested hillside above Konyaaltı — minutes from the sea, the airport, and the old town. Cool mountain air meets Mediterranean warmth.",
    cta: "See the location",
  },
  tr: {
    headline: "Her şey yakın, hiçbir şey kalabalık değil",
    sub: "Konyaaltı'nın üzerindeki ormanla kaplı yamaçlar — denize, havalimanına ve tarihi merkeze dakikalar uzaklıkta. Dağ serinliği ile Akdeniz sıcaklığı buluşuyor.",
    cta: "Konumu gör",
  },
  ar: {
    headline: "كل شيء قريب، لا شيء مزدحم",
    sub: "تلة مشجرة فوق كونيالتي — دقائق من البحر والمطار والمدينة القديمة. نسيم الجبل يلتقي بدفء البحر الأبيض المتوسط.",
    cta: "اعرض الموقع",
  },
  ru: {
    headline: "Всё рядом — и никакой суеты",
    sub: "Лесистый склон над Конъяалты — считанные минуты до моря, аэропорта и старого города. Прохлада гор встречается со средиземноморским теплом.",
    cta: "Посмотреть расположение",
  },
};

const DISTANCES = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M21 16v-2a4 4 0 00-4-4H7l5-5M7 10l-5 5 5 5" />
      </svg>
    ),
    label: { en: "Airport", tr: "Havalimanı", ar: "المطار", ru: "Аэропорт" },
    value: "22 km",
    detail: { en: "~25 min", tr: "~25 dk", ar: "~25 دقيقة", ru: "~25 мин" },
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 3v18M3 9h18" />
      </svg>
    ),
    label: { en: "City centre", tr: "Şehir merkezi", ar: "مركز المدينة", ru: "Центр города" },
    value: "12 km",
    detail: { en: "~20 min", tr: "~20 dk", ar: "~20 دقيقة", ru: "~20 мин" },
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M2 12s3-7 10-7 10 7 10 7" />
        <path d="M2 12s3 7 10 7 10-7 10-7" />
      </svg>
    ),
    label: { en: "Konyaaltı Beach", tr: "Konyaaltı Sahili", ar: "شاطئ كونيالتي", ru: "Пляж Конъяалты" },
    value: "8 km",
    detail: { en: "~15 min", tr: "~15 dk", ar: "~15 دقيقة", ru: "~15 мин" },
  },
] as const;

export default function LocationTeaser({ lang, pathPrefix = "" }: Props) {
  const c = COPY[lang] ?? COPY.en!;

  return (
    <section className="section-y content-lazy">
      <div className="content-wrapper">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Text — first on mobile */}
          <AnimateOnScroll variant="fade-up" className="order-1 md:order-2">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--accent-500)" }}
            >
              {lang === "tr" ? "Konum" : lang === "ar" ? "الموقع" : lang === "ru" ? "Расположение" : "Location"}
            </p>
            <h2 className="font-serif font-semibold text-h2 text-[var(--color-text-primary)] mb-4">
              {c.headline}
            </h2>
            <p className="text-base text-[var(--color-text-secondary)] mb-6 leading-relaxed">
              {c.sub}
            </p>

            {/* Distance pills — compact row on mobile */}
            <div className="flex flex-wrap gap-2 mb-6">
              {DISTANCES.map(({ value, label }) => (
                <div
                  key={value}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-sm"
                >
                  <span className="font-semibold tabular-nums" style={{ color: "var(--accent-500)" }}>
                    {value}
                  </span>
                  <span className="text-[var(--color-text-secondary)]">
                    {label[lang as keyof typeof label] ?? label.en}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href={villaPath(pathPrefix, `/${lang}/location`)}
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-300 hover:gap-2.5 group"
              style={{ color: "var(--accent-500)" }}
            >
              {c.cta}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                <path d="M6 3l5 5-5 5" />
              </svg>
            </Link>
          </AnimateOnScroll>

          {/* Image + distance details (desktop) */}
          <AnimateOnScroll variant="fade-up" delay={0.1} className="order-2 md:order-1">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-[var(--shadow-lg)]">
              <Image
                src={LOCATION_IMAGE}
                alt="Konyaaltı coastline near Silyan Villas"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
              />
            </div>

            {/* Detailed distance cards — desktop only */}
            <div className="hidden md:flex flex-col gap-3 mt-4">
              {DISTANCES.map(({ icon, label, value, detail }) => (
                <div
                  key={value}
                  className="flex items-center gap-4 p-4 rounded-lg border-s-2 border-[var(--accent-400)]/40 bg-[var(--color-surface)] shadow-[var(--shadow-sm)]"
                >
                  <span style={{ color: "var(--accent-500)" }}>{icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">
                      {label[lang as keyof typeof label] ?? label.en}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      {detail[lang as keyof typeof detail] ?? detail.en}
                    </p>
                  </div>
                  <span
                    className="text-sm font-semibold tabular-nums"
                    style={{ color: "var(--accent-500)" }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
