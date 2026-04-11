import Image from "next/image";
import Link from "next/link";
import type { Lang } from "../../lib/i18n";
import { villaPath } from "../../lib/villa-path";
import { LOCATION_IMAGE } from "../../lib/silyan-images";

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
  { icon: "✈️", label: { en: "Airport", tr: "Havalimanı", ar: "المطار", ru: "Аэропорт" }, value: "22 km", detail: { en: "~25 min", tr: "~25 dk", ar: "~25 دقيقة", ru: "~25 мин" } },
  { icon: "🏙️", label: { en: "City centre", tr: "Şehir merkezi", ar: "مركز المدينة", ru: "Центр города" }, value: "12 km", detail: { en: "~20 min", tr: "~20 dk", ar: "~20 دقيقة", ru: "~20 мин" } },
  { icon: "🏖️", label: { en: "Konyaaltı Beach", tr: "Konyaaltı Sahili", ar: "شاطئ كونيالتي", ru: "Пляж Конъяалты" }, value: "8 km", detail: { en: "~15 min", tr: "~15 dk", ar: "~15 دقيقة", ru: "~15 мин" } },
] as const;

export default function LocationTeaser({ lang, pathPrefix = "" }: Props) {
  const c = COPY[lang] ?? COPY.en!;

  return (
    <section className="section-y">
      <div className="content-wrapper">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Image + distance chips overlay */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-[var(--shadow-md)]">
              <Image
                src={LOCATION_IMAGE}
                alt="Konyaaltı coastline near Silyan Villas"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Distance chips */}
            <div className="mt-4 flex flex-col gap-3">
              {DISTANCES.map(({ icon, label, value, detail }) => (
                <div
                  key={value + icon}
                  className="flex items-center gap-4 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]"
                >
                  <span className="text-2xl leading-none">{icon}</span>
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
          </div>

          {/* Copy */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--accent-500)" }}
            >
              {lang === "tr" ? "Konum" : lang === "ar" ? "الموقع" : lang === "ru" ? "Расположение" : "Location"}
            </p>
            <h2 className="font-serif font-semibold text-h2 text-[var(--color-text-primary)] mb-4">
              {c.headline}
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed text-base">
              {c.sub}
            </p>
            <Link
              href={villaPath(pathPrefix, `/${lang}/location`)}
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
