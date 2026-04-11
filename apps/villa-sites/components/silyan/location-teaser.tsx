import Link from "next/link";
import type { Lang } from "@/lib/i18n";

type Props = { lang: Lang };

const COPY: Record<string, { headline: string; sub: string; cta: string }> = {
  en: {
    headline: "Everything near, nothing crowded",
    sub: "Forested hillside above Konyaaltı — minutes from the sea, the airport, and the old town.",
    cta: "See the location",
  },
  tr: {
    headline: "Her şey yakın, hiçbir şey kalabalık değil",
    sub: "Konyaaltı'nın üzerindeki ormanla kaplı yamaçlar — denize, havalimanına ve tarihi merkeze dakikalar uzaklıkta.",
    cta: "Konumu gör",
  },
  ar: {
    headline: "كل شيء قريب، لا شيء مزدحم",
    sub: "تلة مشجرة فوق كونيالتي — دقائق من البحر والمطار والمدينة القديمة.",
    cta: "اعرض الموقع",
  },
  ru: {
    headline: "Всё рядом — и никакой суеты",
    sub: "Лесистый склон над Конъяалты — считанные минуты до моря, аэропорта и старого города.",
    cta: "Посмотреть расположение",
  },
};

const DISTANCES = [
  { icon: "✈", label: { en: "Airport", tr: "Havalimanı", ar: "المطار", ru: "Аэропорт" }, value: "22 km" },
  { icon: "🏙", label: { en: "City centre", tr: "Şehir merkezi", ar: "مركز المدينة", ru: "Центр города" }, value: "12 km" },
  { icon: "🏖", label: { en: "Beach", tr: "Sahil", ar: "الشاطئ", ru: "Пляж" }, value: "8 km" },
] as const;

export default function LocationTeaser({ lang }: Props) {
  const c = COPY[lang] ?? COPY.en!;

  return (
    <section className="section-y">
      <div className="content-wrapper">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Distance chips */}
          <div className="flex flex-col gap-4">
            {DISTANCES.map(({ icon, label, value }) => (
              <div
                key={value + icon}
                className="flex items-center gap-4 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]"
              >
                <span className="text-2xl leading-none">{icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">
                    {label[lang as keyof typeof label] ?? label.en}
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

          {/* Copy */}
          <div>
            <h2 className="font-serif font-semibold text-h2 text-[var(--color-text-primary)] mb-4">
              {c.headline}
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
              {c.sub}
            </p>
            <Link
              href={`/${lang}/location`}
              className="inline-flex items-center gap-1 text-sm font-medium transition-colors hover:underline underline-offset-4"
              style={{ color: "var(--accent-500)" }}
            >
              {c.cta} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}