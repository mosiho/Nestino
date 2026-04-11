type Review = { quote: string; name: string; country: string; flag: string };

const REVIEWS: Review[] = [
  {
    quote: "This is a fantastic property. It's huge, well furnished, classy and spotlessly clean. Akin and his team are really friendly and responsive. The location is great too — it's a good distance from the hustle and bustle of the town but close enough to get what you want easily.",
    name: "Richard",
    country: "United Kingdom",
    flag: "🇬🇧",
  },
  {
    quote: "Akin and Ahmet were so helpful and kind, and responsive to all my messages. They even arranged a VIP driver for us when we had a change of plans. The pool was awesome, the setting amazing as it is in the mountains and a bit cooler than down in the city.",
    name: "Eric",
    country: "United States",
    flag: "🇺🇸",
  },
  {
    quote: "When my friends and I first stumbled upon this villa on Airbnb, it almost seemed too good to be true! Everything was even better than it looked online. The swimming pool is incredible, well maintained, and the view of the mountains makes it the most tranquil place to be.",
    name: "Daniel",
    country: "United Kingdom",
    flag: "🇬🇧",
  },
  {
    quote: "Amazing stay. We will certainly return.",
    name: "Megan",
    country: "Australia",
    flag: "🇦🇺",
  },
  {
    quote: "Tolle und saubere Villa. Gastgeber war sehr cool drauf und hat unseren JGA mit seiner JBL Musik box unvergesslich gemacht. Immer wieder gerne.",
    name: "Saman",
    country: "Germany",
    flag: "🇩🇪",
  },
];

const SECTION_LABEL: Record<string, string> = {
  en: "Guest reviews",
  tr: "Misafir yorumları",
  ar: "آراء الضيوف",
  ru: "Отзывы гостей",
};

const AIRBNB_BADGE: Record<string, string> = {
  en: "reviews on Airbnb",
  tr: "Airbnb yorumu",
  ar: "تقييمات على Airbnb",
  ru: "отзывов на Airbnb",
};

export default function Reviews({ lang }: { lang: string }) {
  const label = SECTION_LABEL[lang] ?? SECTION_LABEL.en!;
  const badgeText = AIRBNB_BADGE[lang] ?? AIRBNB_BADGE.en!;

  return (
    <section className="section-y">
      <div className="content-wrapper">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "var(--accent-500)" }}
            >
              {label}
            </p>
            <h2 className="font-serif font-semibold text-h2 text-[var(--color-text-primary)]">
              {lang === "tr"
                ? "Misafirlerimiz ne diyor?"
                : lang === "ar"
                  ? "ماذا يقول ضيوفنا؟"
                  : lang === "ru"
                    ? "Что говорят наши гости?"
                    : "What our guests say"}
            </h2>
          </div>

          {/* Airbnb rating badge */}
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill={i < 4 ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth={i === 4 ? "1" : "0"}
                  style={{ color: "var(--accent-500)" }}
                  aria-hidden="true"
                >
                  <path d="M8 1.5l1.76 3.57 3.94.57-2.85 2.78.67 3.93L8 10.43l-3.52 1.92.67-3.93L2.3 5.64l3.94-.57L8 1.5z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-semibold text-[var(--color-text-primary)]">4.6</span>
            <span className="text-xs text-[var(--color-text-muted)]">· 8 {badgeText}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.slice(0, 3).map((r, i) => (
            <blockquote
              key={i}
              className="p-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col gap-4"
            >
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
                <span className="font-medium text-[var(--color-text-primary)]">{r.name}</span>
                <span>·</span>
                <span>{r.country}</span>
              </footer>
            </blockquote>
          ))}
        </div>

        {/* Additional short reviews */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {REVIEWS.slice(3).map((r, i) => (
            <blockquote
              key={i + 3}
              className="p-5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] flex items-start gap-4"
            >
              <span className="text-xl leading-none mt-0.5">{r.flag}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-2">
                  &ldquo;{r.quote}&rdquo;
                </p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  <span className="font-medium text-[var(--color-text-primary)]">{r.name}</span>
                  {" · "}{r.country}
                </p>
              </div>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
