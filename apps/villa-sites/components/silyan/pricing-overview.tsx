import Link from "next/link";
import type { Lang } from "@/lib/i18n";

type Props = { lang: Lang };

const COPY: Record<string, { headline: string; note: string; cta: string; low: string; mid: string; high: string; lowSeason: string; midSeason: string; highSeason: string }> = {
  en: {
    headline: "Rates",
    note: "Prices vary by villa size, season, and length of stay. Contact us for exact availability and rates — we reply within a few hours.",
    cta: "Request rates",
    low: "from €90 / night",
    mid: "from €130 / night",
    high: "from €190 / night",
    lowSeason: "Low season",
    midSeason: "Mid season",
    highSeason: "High season",
  },
  tr: {
    headline: "Fiyatlar",
    note: "Fiyatlar villa büyüklüğüne, sezona ve konaklama süresine göre değişir. Kesin müsaitlik ve fiyat için bizimle iletişime geçin — birkaç saat içinde yanıt veriyoruz.",
    cta: "Fiyat sor",
    low: "€90'dan / gece",
    mid: "€130'dan / gece",
    high: "€190'dan / gece",
    lowSeason: "Düşük sezon",
    midSeason: "Orta sezon",
    highSeason: "Yüksek sezon",
  },
  ar: {
    headline: "الأسعار",
    note: "تتفاوت الأسعار حسب حجم الفيلا والموسم ومدة الإقامة. تواصل معنا للاستفسار عن الأسعار والتوفر الدقيق — نرد في غضون ساعات قليلة.",
    cta: "استفسر عن الأسعار",
    low: "من ٩٠ يورو / ليلة",
    mid: "من ١٣٠ يورو / ليلة",
    high: "من ١٩٠ يورو / ليلة",
    lowSeason: "الموسم المنخفض",
    midSeason: "الموسم المتوسط",
    highSeason: "الموسم المرتفع",
  },
  ru: {
    headline: "Стоимость",
    note: "Цены зависят от размера виллы, сезона и продолжительности пребывания. Свяжитесь с нами для уточнения доступности и точных цен — мы отвечаем в течение нескольких часов.",
    cta: "Узнать стоимость",
    low: "от €90 / ночь",
    mid: "от €130 / ночь",
    high: "от €190 / ночь",
    lowSeason: "Низкий сезон",
    midSeason: "Средний сезон",
    highSeason: "Высокий сезон",
  },
};

const SEASON_MONTHS: Record<string, { low: string; mid: string; high: string }> = {
  en: { low: "Nov – Mar", mid: "Apr – Jun, Oct", high: "Jul – Sep" },
  tr: { low: "Kas – Mar", mid: "Nis – Haz, Eki", high: "Tem – Eyl" },
  ar: { low: "نوف – مار", mid: "أبر – يون، أكت", high: "يول – سبت" },
  ru: { low: "Ноя – Мар", mid: "Апр – Июн, Окт", high: "Июл – Сен" },
};

export default function PricingOverview({ lang }: Props) {
  const c = COPY[lang] ?? COPY.en!;
  const months = SEASON_MONTHS[lang] ?? SEASON_MONTHS.en!;

  const seasons = [
    { label: c.lowSeason, months: months.low, price: c.low, muted: true },
    { label: c.midSeason, months: months.mid, price: c.mid, muted: false },
    { label: c.highSeason, months: months.high, price: c.high, muted: false },
  ];

  return (
    <section className="section-y bg-[var(--color-surface)]">
      <div className="content-wrapper">
        <h2 className="font-serif font-semibold text-h2 text-[var(--color-text-primary)] mb-3">
          {c.headline}
        </h2>
        <p className="text-[var(--color-text-secondary)] mb-8 max-w-xl">
          {c.note}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {seasons.map(({ label, months, price, muted }) => (
            <div
              key={label}
              className="rounded-lg border p-5"
              style={{
                borderColor: muted ? "var(--color-border)" : "var(--accent-400)",
                backgroundColor: muted ? "var(--color-bg)" : "var(--accent-muted)",
              }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-1">
                {label}
              </p>
              <p className="text-xs text-[var(--color-text-muted)] mb-3">{months}</p>
              <p
                className="font-serif font-semibold text-lg"
                style={{ color: "var(--color-text-primary)" }}
              >
                {price}
              </p>
            </div>
          ))}
        </div>

        <Link
          href={`/${lang}/contact`}
          className="inline-flex items-center justify-center px-6 py-3 rounded-md text-sm font-medium text-white transition-colors"
          style={{ backgroundColor: "var(--accent-500)" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--accent-600)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--accent-500)")
          }
        >
          {c.cta} →
        </Link>
      </div>
    </section>
  );
}