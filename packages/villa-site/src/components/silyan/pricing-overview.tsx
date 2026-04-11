"use client";

import Link from "next/link";
import type { Lang } from "../../lib/i18n";
import { villaPath } from "../../lib/villa-path";
import AnimateOnScroll from "../animate-on-scroll";

type Props = { lang: Lang; pathPrefix?: string };

const COPY: Record<string, { headline: string; note: string; cta: string; low: string; mid: string; high: string; lowSeason: string; midSeason: string; highSeason: string; starting: string }> = {
  en: {
    headline: "Rates",
    note: "Prices vary by villa size, season, and length of stay. Contact us for exact availability and rates — we reply within a few hours.",
    cta: "Request rates",
    low: "€90",
    mid: "€130",
    high: "€190",
    lowSeason: "Low season",
    midSeason: "Mid season",
    highSeason: "High season",
    starting: "from / night",
  },
  tr: {
    headline: "Fiyatlar",
    note: "Fiyatlar villa büyüklüğüne, sezona ve konaklama süresine göre değişir. Kesin müsaitlik ve fiyat için bizimle iletişime geçin — birkaç saat içinde yanıt veriyoruz.",
    cta: "Fiyat sor",
    low: "€90",
    mid: "€130",
    high: "€190",
    lowSeason: "Düşük sezon",
    midSeason: "Orta sezon",
    highSeason: "Yüksek sezon",
    starting: "başlayan / gece",
  },
  ar: {
    headline: "الأسعار",
    note: "تتفاوت الأسعار حسب حجم الفيلا والموسم ومدة الإقامة. تواصل معنا للاستفسار عن الأسعار والتوفر الدقيق — نرد في غضون ساعات قليلة.",
    cta: "استفسر عن الأسعار",
    low: "٩٠€",
    mid: "١٣٠€",
    high: "١٩٠€",
    lowSeason: "الموسم المنخفض",
    midSeason: "الموسم المتوسط",
    highSeason: "الموسم المرتفع",
    starting: "من / ليلة",
  },
  ru: {
    headline: "Стоимость",
    note: "Цены зависят от размера виллы, сезона и продолжительности пребывания. Свяжитесь с нами для уточнения доступности и точных цен — мы отвечаем в течение нескольких часов.",
    cta: "Узнать стоимость",
    low: "€90",
    mid: "€130",
    high: "€190",
    lowSeason: "Низкий сезон",
    midSeason: "Средний сезон",
    highSeason: "Высокий сезон",
    starting: "от / ночь",
  },
};

const SEASON_MONTHS: Record<string, { low: string; mid: string; high: string }> = {
  en: { low: "Nov – Mar", mid: "Apr – Jun, Oct", high: "Jul – Sep" },
  tr: { low: "Kas – Mar", mid: "Nis – Haz, Eki", high: "Tem – Eyl" },
  ar: { low: "نوف – مار", mid: "أبر – يون، أكت", high: "يول – سبت" },
  ru: { low: "Ноя – Мар", mid: "Апр – Июн, Окт", high: "Июл – Сен" },
};

const SEASON_ICONS = [
  <svg key="snow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" /></svg>,
  <svg key="leaf" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M17 8C8 10 5.9 16.17 3.82 21.34M17 8c2-1 4-.5 7 1-1 3-2 5-3 7" /><path d="M17 8l-4 4" /></svg>,
  <svg key="sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>,
];

export default function PricingOverview({ lang, pathPrefix = "" }: Props) {
  const c = COPY[lang] ?? COPY.en!;
  const months = SEASON_MONTHS[lang] ?? SEASON_MONTHS.en!;

  const seasons = [
    { label: c.lowSeason, months: months.low, price: c.low, icon: SEASON_ICONS[0], highlight: false },
    { label: c.midSeason, months: months.mid, price: c.mid, icon: SEASON_ICONS[1], highlight: false },
    { label: c.highSeason, months: months.high, price: c.high, icon: SEASON_ICONS[2], highlight: true },
  ];

  return (
    <section className="section-y bg-[var(--color-surface)] content-lazy">
      <div className="content-wrapper">
        <AnimateOnScroll variant="fade-up">
          <h2 className="font-serif font-semibold text-h2 text-[var(--color-text-primary)] mb-3">
            {c.headline}
          </h2>
          <p className="text-base text-[var(--color-text-secondary)] mb-8 max-w-xl leading-relaxed">
            {c.note}
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {seasons.map(({ label, months, price, icon, highlight }, i) => (
            <AnimateOnScroll key={label} variant="fade-up" delay={i * 0.08}>
              <div
                className={`rounded-xl border p-6 transition-shadow duration-300 ${
                  highlight
                    ? "border-[var(--accent-400)] shadow-[var(--shadow-glow)]"
                    : "border-[var(--color-border)] bg-[var(--color-bg)]"
                }`}
                style={highlight ? { backgroundColor: "var(--accent-muted)" } : undefined}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span style={{ color: highlight ? "var(--accent-500)" : "var(--color-text-muted)" }}>
                    {icon}
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                    {label}
                  </p>
                  {highlight && (
                    <span className="ml-auto text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ color: "var(--accent-600)", backgroundColor: "var(--accent-muted)" }}>
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-xs text-[var(--color-text-muted)] mb-4">{months}</p>
                <p className="font-serif font-semibold text-2xl text-[var(--color-text-primary)]">
                  {price}
                </p>
                <p className="text-xs text-[var(--color-text-muted)] mt-1 font-serif italic">
                  {c.starting}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll variant="fade-up" delay={0.2}>
          <Link
            href={villaPath(pathPrefix, `/${lang}/contact`)}
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-md text-sm font-medium text-white transition-all duration-300 hover:shadow-[var(--shadow-glow)] hover:brightness-110 active:scale-[0.97]"
            style={{ backgroundColor: "var(--accent-500)" }}
          >
            {c.cta}
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
