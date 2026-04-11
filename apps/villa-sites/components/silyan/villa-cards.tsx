import Link from "next/link";
import type { Lang } from "@/lib/i18n";

type Props = { lang: Lang };

const VILLAS = [
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
] as const;

const VIEW_LABEL: Record<string, string> = {
  en: "View villa",
  tr: "Villayı görüntüle",
  ar: "عرض الفيلا",
  ru: "Смотреть виллу",
};

export default function VillaCards({ lang }: Props) {
  const viewLabel = VIEW_LABEL[lang] ?? VIEW_LABEL.en!;

  return (
    <section className="section-y bg-[var(--color-surface)]">
      <div className="content-wrapper">
        <h2 className="font-serif font-semibold text-h2 text-[var(--color-text-primary)] mb-3">
          {lang === "tr" ? "Villalarımız" : lang === "ar" ? "فيلاتنا" : lang === "ru" ? "Наши виллы" : "Our Villas"}
        </h2>
        <p className="text-[var(--color-text-secondary)] mb-10 max-w-xl">
          {lang === "tr"
            ? "Her villa tamamen bağımsız — özel havuzlu, özel bahçeli."
            : lang === "ar"
            ? "كل فيلا مستقلة تماماً — مع مسبح خاص وحديقة خاصة."
            : lang === "ru"
            ? "Каждая вилла полностью независима — с частным бассейном и садом."
            : "Each villa is fully independent — its own private pool, its own garden."}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VILLAS.map((villa) => {
            const hook = villa.hook[lang as keyof typeof villa.hook] ?? villa.hook.en;
            const desc = villa.desc[lang as keyof typeof villa.desc] ?? villa.desc.en;

            return (
              <Link
                key={villa.slug}
                href={`/${lang}/villas/${villa.slug}`}
                className="group rounded-lg overflow-hidden border border-[var(--color-border)] hover:border-[var(--accent-500)] hover:shadow-[var(--shadow-md)] transition-all bg-[var(--color-bg)]"
              >
                {/* Image placeholder */}
                <div className="aspect-[4/3] bg-[var(--color-border)] relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-[var(--color-text-muted)] text-xs">
                    {villa.name} photo
                  </div>
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