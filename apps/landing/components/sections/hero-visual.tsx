"use client";

import { motion, useReducedMotion } from "framer-motion";

import { useLocaleContext } from "@/components/i18n/locale-provider";

const CARD_ICONS = [
  (
    <svg key="d" viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <path
        d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
        className="stroke-accent"
        strokeWidth="1.75"
      />
      <path
        d="M16.5 16.5 21 21"
        className="stroke-accent"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  ),
  (
    <svg key="v" viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <path
        d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"
        className="stroke-accent"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  ),
  (
    <svg key="b" viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <path
        d="M8 10h8M8 14h5"
        className="stroke-accent"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
        className="stroke-accent"
        strokeWidth="1.75"
      />
    </svg>
  ),
] as const;

const CARD_LAYOUT = [
  {
    className:
      "right-[2%] top-[4%] sm:right-[4%] w-[min(100%,260px)] rotate-[-2deg]",
    floatDelay: 0,
  },
  {
    className:
      "left-[0%] top-[36%] sm:left-[2%] w-[min(100%,272px)] rotate-[1.5deg]",
    floatDelay: 0.6,
  },
  {
    className:
      "right-[6%] bottom-[2%] sm:right-[10%] w-[min(100%,268px)] rotate-[-1deg]",
    floatDelay: 1.2,
  },
] as const;

function FeatureCardBody({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border/90 bg-background/85 p-4 shadow-lg shadow-foreground/[0.04] ring-1 ring-accent/15 backdrop-blur-md sm:p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <p className="mt-0.5 text-xs leading-relaxed text-muted">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

const stackSpring = {
  type: "spring" as const,
  stiffness: 420,
  damping: 32,
  mass: 0.85,
};

export function HeroVisual() {
  const reduced = useReducedMotion();
  const { messages } = useLocaleContext();
  const cards = messages.hero.visualCards.map((c, i) => {
    const layout = CARD_LAYOUT[i];
    return {
      title: c.title,
      subtitle: c.subtitle,
      icon: CARD_ICONS[i],
      className: layout?.className ?? "",
      floatDelay: layout?.floatDelay ?? 0,
    };
  });

  const floatTransition = reduced
    ? { duration: 0 }
    : {
        duration: 5.5,
        repeat: Infinity,
        repeatType: "mirror" as const,
        ease: "easeInOut",
      };

  const stackFloat = reduced ? undefined : { y: [0, -5, 0] };

  const stackFloatTransition = (index: number) =>
    reduced
      ? { duration: 0 }
      : {
          duration: 4.2 + index * 0.35,
          repeat: Infinity,
          repeatType: "mirror" as const,
          ease: "easeInOut" as const,
          delay: index * 0.22,
        };

  return (
    <div
      className="relative mx-auto mt-10 w-full max-w-lg sm:mt-12 lg:mt-0 lg:max-w-none lg:min-h-[420px]"
      aria-hidden
    >
      <motion.div
        className="flex flex-col gap-3 sm:gap-3.5 lg:hidden"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.11, delayChildren: 0.08 },
          },
        }}
      >
        {cards.map((card, index) => (
          <motion.div
            key={`stack-${card.title}`}
            variants={{
              hidden: {
                opacity: 0,
                y: 28,
                scale: 0.94,
                x: index % 2 === 0 ? -18 : 18,
              },
              show: {
                opacity: 1,
                y: 0,
                scale: 1,
                x: 0,
                transition: stackSpring,
              },
            }}
          >
            <motion.div
              animate={stackFloat}
              transition={stackFloatTransition(index)}
            >
              <FeatureCardBody
                title={card.title}
                subtitle={card.subtitle}
                icon={card.icon}
              />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      <div className="relative hidden min-h-[420px] lg:block">
        <motion.div
          className="absolute -right-4 -top-8 h-56 w-56 rounded-full bg-accent/25 blur-3xl sm:h-72 sm:w-72"
          animate={
            reduced
              ? undefined
              : { scale: [1, 1.12, 1], opacity: [0.45, 0.65, 0.45] }
          }
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-12 left-0 h-48 w-48 rounded-full bg-accent/15 blur-3xl sm:h-64 sm:w-64"
          animate={
            reduced
              ? undefined
              : { scale: [1.08, 1, 1.08], opacity: [0.35, 0.55, 0.35] }
          }
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <svg
          className="pointer-events-none absolute inset-0 h-full w-full text-accent/25"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M 78% 18% Q 52% 38% 42% 52% T 22% 78%"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeDasharray="5 7"
            vectorEffect="non-scaling-stroke"
            initial={
              reduced
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: 0, opacity: 0.35 }
            }
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 1.35, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
              opacity: { duration: 0.6, delay: 0.2 },
            }}
          />
        </svg>

        {cards.map((card) => (
          <motion.div
            key={card.title}
            className={`absolute ${card.className}`}
            initial={{ opacity: 0, y: 36, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 26,
              mass: 0.95,
              delay: 0.12 + card.floatDelay * 0.32,
            }}
          >
            <motion.div
              animate={reduced ? undefined : { y: [0, -6, 0] }}
              transition={{
                ...floatTransition,
                delay: card.floatDelay,
              }}
            >
              <FeatureCardBody
                title={card.title}
                subtitle={card.subtitle}
                icon={card.icon}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
