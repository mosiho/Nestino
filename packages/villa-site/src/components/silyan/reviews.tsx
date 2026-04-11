import type { Lang } from "../../lib/i18n";
import AnimateOnScroll from "../animate-on-scroll";

type Review = { quote: string; name: string; country: string; flag: string };

const REVIEWS: Review[] = [
  { quote: "This is a fantastic property. It's huge, well furnished, classy and spotlessly clean. Akin and his team are really friendly and responsive. The location is great too — it's a good distance from the hustle and bustle of the town but close enough to get what you want easily.", name: "Richard", country: "United Kingdom", flag: "🇬🇧" },
  { quote: "Akin and Ahmet were so helpful and kind, and responsive to all my messages. They even arranged a VIP driver for us when we had a change of plans. The pool was awesome, the setting amazing as it is in the mountains and a bit cooler than down in the city.", name: "Eric", country: "United States", flag: "🇺🇸" },
  { quote: "When my friends and I first stumbled upon this villa on Airbnb, it almost seemed too good to be true! Everything was even better than it looked online. The swimming pool is incredible, well maintained, and the view of the mountains makes it the most tranquil place to be.", name: "Daniel", country: "United Kingdom", flag: "🇬🇧" },
  { quote: "Amazing stay. We will certainly return.", name: "Megan", country: "Australia", flag: "🇦🇺" },
  { quote: "Tolle und saubere Villa. Gastgeber war sehr cool drauf und hat unseren JGA mit seiner JBL Musik box unvergesslich gemacht. Immer wieder gerne.", name: "Saman", country: "Germany", flag: "🇩🇪" },
];

const SECTION_LABEL: Record<string, string> = {
  en: "Guest reviews", tr: "Misafir yorumları", ar: "آراء الضيوف", ru: "Отзывы гостей",
};

const AIRBNB_BADGE: Record<string, string> = {
  en: "reviews on Airbnb", tr: "Airbnb yorumu", ar: "تقييمات على Airbnb", ru: "отзывов на Airbnb",
};

function StarRow({ count = 5, size = 14 }: { count?: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 14 14" fill="currentColor" style={{ color: "var(--gold-accent)" }} aria-hidden="true">
          <path d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.44L7 8.885l-3.09 1.625.59-3.44L2 4.635l3.455-.505L7 1z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review, large }: { review: Review; large?: boolean }) {
  return (
    <blockquote
      className={`relative flex flex-col gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-shadow duration-300 hover:shadow-[var(--shadow-md)] ${
        large ? "p-6" : "p-5"
      } w-[85vw] sm:w-auto shrink-0 sm:shrink`}
    >
      {/* Decorative quote mark */}
      <span
        className="absolute -top-3 start-5 font-serif text-4xl leading-none select-none"
        style={{ color: "var(--gold-accent)", opacity: 0.35 }}
        aria-hidden="true"
      >
        &ldquo;
      </span>

      <StarRow />
      <p className={`${large ? "text-base" : "text-sm"} text-[var(--color-text-secondary)] leading-relaxed flex-1`}>
        &ldquo;{review.quote}&rdquo;
      </p>
      <footer className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
        <span className="text-base">{review.flag}</span>
        <span className="font-medium text-[var(--color-text-primary)]">{review.name}</span>
        <span>&middot;</span>
        <span>{review.country}</span>
      </footer>
    </blockquote>
  );
}

export default function Reviews({ lang }: { lang: Lang | string }) {
  const label = SECTION_LABEL[lang] ?? SECTION_LABEL.en!;
  const badgeText = AIRBNB_BADGE[lang] ?? AIRBNB_BADGE.en!;

  return (
    <section className="section-y content-lazy">
      <div className="content-wrapper">
        <AnimateOnScroll variant="fade-up">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--accent-500)" }}>
                {label}
              </p>
              <h2 className="font-serif font-semibold text-h2 text-[var(--color-text-primary)]">
                {lang === "tr" ? "Misafirlerimiz ne diyor?" : lang === "ar" ? "ماذا يقول ضيوفنا؟" : lang === "ru" ? "Что говорят наши гости?" : "What our guests say"}
              </h2>
            </div>

            {/* Airbnb badge */}
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)]">
              <StarRow count={5} size={15} />
              <span className="text-sm font-semibold text-[var(--color-text-primary)]">4.6</span>
              <span className="text-xs text-[var(--color-text-muted)]">&middot; 8 {badgeText}</span>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Mobile: horizontal carousel / Desktop: grid */}
        <div className="snap-carousel sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible">
          {REVIEWS.slice(0, 3).map((r, i) => (
            <AnimateOnScroll key={i} variant="fade-up" delay={i * 0.08} className="contents sm:block">
              <ReviewCard review={r} large />
            </AnimateOnScroll>
          ))}
        </div>

        {/* Additional short reviews — desktop only */}
        <div className="hidden sm:grid sm:grid-cols-2 gap-4 mt-4">
          {REVIEWS.slice(3).map((r, i) => (
            <AnimateOnScroll key={i + 3} variant="fade-up" delay={(i + 3) * 0.06}>
              <ReviewCard review={r} />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
