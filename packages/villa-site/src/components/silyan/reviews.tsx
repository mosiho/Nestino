import type { Lang } from "../../lib/i18n";
import AnimateOnScroll from "../animate-on-scroll";

type TopicKey = "hospitality" | "space" | "pool" | "location" | "celebrations";

type Review = {
  quote: string;
  name: string;
  country: string;
  flag: string;
  topics: TopicKey[];
  /** Larger card spanning multiple grid rows on wide screens */
  featured?: boolean;
};

const REVIEWS: Review[] = [
  {
    quote:
      "This is a fantastic property. It's huge, well furnished, classy and spotlessly clean. Akin and his team are really friendly and responsive. The location is great too — it's a good distance from the hustle and bustle of the town but close enough to get what you want easily.",
    name: "Richard",
    country: "United Kingdom",
    flag: "🇬🇧",
    topics: ["space", "hospitality", "location"],
    featured: true,
  },
  {
    quote:
      "Akin and Ahmet were so helpful and kind, and responsive to all my messages. They even arranged a VIP driver for us when we had a change of plans. The pool was awesome, the setting amazing as it is in the mountains and a bit cooler than down in the city.",
    name: "Eric",
    country: "United States",
    flag: "🇺🇸",
    topics: ["hospitality", "pool", "location"],
  },
  {
    quote:
      "When my friends and I first found this place online, it almost seemed too good to be true! Everything was even better than it looked online. The swimming pool is incredible, well maintained, and the view of the mountains makes it the most tranquil place to be.",
    name: "Daniel",
    country: "United Kingdom",
    flag: "🇬🇧",
    topics: ["pool", "space"],
  },
  {
    quote: "Amazing stay. We will certainly return.",
    name: "Megan",
    country: "Australia",
    flag: "🇦🇺",
    topics: ["space"],
  },
  {
    quote:
      "Tolle und saubere Villa. Gastgeber war sehr cool drauf und hat unseren JGA mit seiner JBL Musik box unvergesslich gemacht. Immer wieder gerne.",
    name: "Saman",
    country: "Germany",
    flag: "🇩🇪",
    topics: ["celebrations", "hospitality"],
  },
];

const SECTION_LABEL: Record<string, string> = {
  en: "Guest reviews",
  tr: "Misafir yorumları",
  ar: "آراء الضيوف",
  ru: "Отзывы гостей",
};

const HEADLINE: Record<string, string> = {
  en: "What our guests say",
  tr: "Misafirlerimiz ne diyor?",
  ar: "ماذا يقول ضيوفنا؟",
  ru: "Что говорят наши гости?",
};

/** Public aggregate for the complex (all units); neutral wording, no third-party names */
const AGGREGATE: Record<string, { scoreLabel: string; outOf: string; caption: string; countLabel: string }> = {
  en: {
    scoreLabel: "Guest score",
    outOf: "out of 10",
    caption: "Combined ratings from recent stays",
    countLabel: "33 reviews",
  },
  tr: {
    scoreLabel: "Misafir puanı",
    outOf: "/ 10",
    caption: "Son konaklamalardan birleşik puanlar",
    countLabel: "33 değerlendirme",
  },
  ar: {
    scoreLabel: "تقييم الضيوف",
    outOf: "من 10",
    caption: "متوسط التقييمات من إقامات حديثة",
    countLabel: "33 مراجعة",
  },
  ru: {
    scoreLabel: "Оценка гостей",
    outOf: "из 10",
    caption: "Сводно по недавним отзывам",
    countLabel: "33 отзыва",
  },
};

const TOPIC_LABEL: Record<TopicKey, Record<string, string>> = {
  hospitality: {
    en: "Hosts & service",
    tr: "Ev sahibi & hizmet",
    ar: "الضيافة والخدمة",
    ru: "Сервис и хозяева",
  },
  space: {
    en: "Space & comfort",
    tr: "Alan ve konfor",
    ar: "المساحة والراحة",
    ru: "Пространство и комфорт",
  },
  pool: {
    en: "Pool & views",
    tr: "Havuz ve manzara",
    ar: "المسبح والإطلالة",
    ru: "Бассейн и вид",
  },
  location: {
    en: "Location",
    tr: "Konum",
    ar: "الموقع",
    ru: "Расположение",
  },
  celebrations: {
    en: "Celebrations",
    tr: "Özel kutlamalar",
    ar: "الاحتفالات",
    ru: "Праздники",
  },
};

function StarRow({ count = 5, size = 14 }: { count?: number; size?: number }) {
  return (
    <div className="flex gap-0.5" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 14 14" fill="currentColor" style={{ color: "var(--gold-accent)" }}>
          <path d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.44L7 8.885l-3.09 1.625.59-3.44L2 4.635l3.455-.505L7 1z" />
        </svg>
      ))}
    </div>
  );
}

function GuestScoreCard({ lang }: { lang: Lang | string }) {
  const copy = AGGREGATE[lang] ?? AGGREGATE.en!;
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] p-5 shadow-[var(--shadow-sm)] md:max-w-sm lg:ms-auto"
      style={{
        backgroundImage:
          "linear-gradient(135deg, color-mix(in srgb, var(--gold-accent) 12%, transparent), transparent 55%), linear-gradient(to bottom right, var(--color-surface), var(--color-surface))",
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">{copy.scoreLabel}</p>
          <p className="mt-1 flex items-baseline gap-1.5">
            <span className="font-serif text-4xl font-semibold tabular-nums text-[var(--color-text-primary)]">8.3</span>
            <span className="text-sm text-[var(--color-text-muted)]">{copy.outOf}</span>
          </p>
          <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-secondary)]">{copy.caption}</p>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <StarRow count={5} size={13} />
          <span className="text-xs font-medium text-[var(--color-text-muted)]">{copy.countLabel}</span>
        </div>
      </div>
    </div>
  );
}

function TopicPills({ topics, lang }: { topics: TopicKey[]; lang: Lang | string }) {
  return (
    <ul className="flex flex-wrap gap-1.5 list-none p-0 m-0">
      {topics.map((key) => {
        const label = TOPIC_LABEL[key][lang] ?? TOPIC_LABEL[key].en!;
        return (
          <li key={key}>
            <span className="inline-block rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/80 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
              {label}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function ReviewCard({ review, lang, className = "" }: { review: Review; lang: Lang | string; className?: string }) {
  const featured = review.featured === true;
  return (
    <blockquote
      className={`group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] text-start shadow-[var(--shadow-sm)] transition-shadow duration-300 hover:shadow-[var(--shadow-md)] ${featured ? "p-6 md:p-8" : "p-5 md:p-6"} ${className}`}
    >
      {featured ? (
        <div
          className="pointer-events-none absolute inset-y-0 start-0 w-1 rounded-s-2xl"
          style={{ background: "linear-gradient(180deg, var(--gold-accent), color-mix(in srgb, var(--gold-accent) 40%, transparent))" }}
          aria-hidden="true"
        />
      ) : null}

      <div className={`flex flex-col gap-3 ${featured ? "ps-3" : ""}`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <TopicPills topics={review.topics} lang={lang} />
          <StarRow size={featured ? 15 : 13} />
        </div>

        <p className={`relative leading-relaxed text-[var(--color-text-secondary)] ${featured ? "text-base md:text-lg" : "text-sm md:text-base"}`}>
          <span
            className="absolute -top-2 start-0 font-serif text-5xl leading-none select-none pointer-events-none"
            style={{ color: "var(--gold-accent)", opacity: 0.22 }}
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <span className="relative z-[1] block ps-1 pt-4">{review.quote}</span>
        </p>
      </div>

      <footer className={`mt-auto flex items-center gap-3 border-t border-[var(--color-border)]/80 pt-4 text-xs text-[var(--color-text-muted)] ${featured ? "ps-3" : ""}`}>
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-lg" aria-hidden="true">
          {review.flag}
        </span>
        <div className="leading-tight">
          <div className="font-semibold text-[var(--color-text-primary)]">{review.name}</div>
          <div>{review.country}</div>
        </div>
      </footer>
    </blockquote>
  );
}

/** Grid placement for lg+ bento layout */
function reviewGridClass(index: number, featuredIndex: number): string {
  if (index === featuredIndex) {
    return "md:col-span-2 lg:col-span-7 lg:row-span-2 lg:row-start-1";
  }
  const order = [0, 1, 2, 3, 4].filter((i) => i !== featuredIndex);
  const pos = order.indexOf(index);
  if (pos === 0) return "md:col-span-1 lg:col-span-5 lg:row-start-1 lg:col-start-8";
  if (pos === 1) return "md:col-span-1 lg:col-span-5 lg:row-start-2 lg:col-start-8";
  if (pos === 2) return "md:col-span-1 lg:col-span-6 lg:row-start-3 lg:col-start-1";
  if (pos === 3) return "md:col-span-1 lg:col-span-6 lg:row-start-3 lg:col-start-7";
  return "";
}

export default function Reviews({ lang }: { lang: Lang | string }) {
  const label = SECTION_LABEL[lang] ?? SECTION_LABEL.en!;
  const headline = HEADLINE[lang] ?? HEADLINE.en!;
  const featuredIndex = REVIEWS.findIndex((r) => r.featured);
  const fi = featuredIndex >= 0 ? featuredIndex : 0;

  return (
    <section className="section-y content-lazy border-t border-[var(--color-border)]/60 bg-[var(--color-surface)]/35">
      <div className="content-wrapper">
        <AnimateOnScroll variant="fade-up">
          <div className="mb-10 flex flex-col gap-8 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent-500)" }}>
                {label}
              </p>
              <h2 className="font-serif text-h2 font-semibold text-[var(--color-text-primary)]">{headline}</h2>
            </div>
            <GuestScoreCard lang={lang} />
          </div>
        </AnimateOnScroll>

        {/* Mobile: horizontal scroll, all reviews */}
        <div className="snap-carousel pb-1 md:hidden">
          {REVIEWS.map((r, i) => (
            <AnimateOnScroll key={`m-${r.name}-${i}`} variant="fade-up" delay={i * 0.06} className="w-[min(88vw,400px)]">
              <ReviewCard review={r} lang={lang} />
            </AnimateOnScroll>
          ))}
        </div>

        {/* Tablet & desktop */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-12 lg:grid-rows-3 lg:gap-6 lg:items-stretch">
          {REVIEWS.map((r, i) => (
            <AnimateOnScroll key={`d-${r.name}-${i}`} variant="fade-up" delay={i * 0.07} className={`${reviewGridClass(i, fi)} h-full min-h-0`}>
              <ReviewCard review={r} lang={lang} className="h-full" />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
