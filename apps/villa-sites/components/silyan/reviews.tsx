// Placeholder reviews — replace with real guest quotes sourced from
// hotelrunner.com, Google, or owner-provided when available.
// See site-plan.md §19 Content Gaps.

type Review = { quote: string; name: string; country: string; flag: string };

const REVIEWS: Review[] = [
  {
    quote: "The perfect escape from the heat of the city. Our kids loved the pool, we loved the peace.",
    name: "Sample Guest",
    country: "Germany",
    flag: "🇩🇪",
  },
  {
    quote: "Three nights felt like a week — in the best possible way. The mountain air is something else.",
    name: "Sample Guest",
    country: "United Kingdom",
    flag: "🇬🇧",
  },
  {
    quote: "Exactly what we needed: space, privacy, and Antalya five minutes away when we wanted it.",
    name: "Sample Guest",
    country: "Netherlands",
    flag: "🇳🇱",
  },
];

const SECTION_LABEL: Record<string, string> = {
  en: "Guest reviews",
  tr: "Misafir yorumları",
  ar: "آراء الضيوف",
  ru: "Отзывы гостей",
};

export default function Reviews({ lang }: { lang: string }) {
  const label = SECTION_LABEL[lang] ?? SECTION_LABEL.en!;

  return (
    <section className="section-y">
      <div className="content-wrapper">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-8"
          style={{ color: "var(--accent-500)" }}
        >
          {label}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <blockquote
              key={i}
              className="p-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex gap-0.5" aria-label="5 stars">
                {Array.from({ length: 5 }).map((_, s) => (
                  <svg
                    key={s}
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="currentColor"
                    style={{ color: "var(--accent-500)" }}
                    aria-hidden="true"
                  >
                    <path d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.44L7 8.885l-3.09 1.625.59-3.44L2 4.635l3.455-.505L7 1z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed flex-1">
                &ldquo;{r.quote}&rdquo;
              </p>
              <footer className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                <span>{r.flag}</span>
                <span>{r.name}</span>
                <span>·</span>
                <span>{r.country}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}