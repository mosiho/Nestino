"use client";

import { motion, useReducedMotion } from "framer-motion";

const cards = [
  {
    title: "Discovery",
    subtitle: "Google & AI-ready answers",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
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
    className:
      "right-[2%] top-[4%] sm:right-[4%] w-[min(100%,260px)] rotate-[-2deg]",
    floatDelay: 0,
  },
  {
    title: "Your villa presence",
    subtitle: "Fast, trustworthy, mobile-first",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"
          className="stroke-accent"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      </svg>
    ),
    className:
      "left-[0%] top-[36%] sm:left-[2%] w-[min(100%,272px)] rotate-[1.5deg]",
    floatDelay: 0.6,
  },
  {
    title: "Direct bookings",
    subtitle: "Inquiries straight to you",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
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
    className:
      "right-[6%] bottom-[2%] sm:right-[10%] w-[min(100%,268px)] rotate-[-1deg]",
    floatDelay: 1.2,
  },
] as const;

export function HeroVisual() {
  const reduced = useReducedMotion();

  const floatTransition = reduced
    ? { duration: 0 }
    : {
        duration: 5.5,
        repeat: Infinity,
        repeatType: "mirror" as const,
        ease: "easeInOut",
      };

  return (
    <div
      className="relative mx-auto mt-14 min-h-[340px] w-full max-w-[min(100%,420px)] lg:mt-0 lg:max-w-none lg:min-h-[420px]"
      aria-hidden
    >
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
        <path
          d="M 78% 18% Q 52% 38% 42% 52% T 22% 78%"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeDasharray="5 7"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {cards.map((card) => (
        <motion.div
          key={card.title}
          className={`absolute ${card.className}`}
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.55,
            ease: "easeOut",
            delay: card.floatDelay * 0.35,
          }}
        >
          <motion.div
            animate={reduced ? undefined : { y: [0, -6, 0] }}
            transition={{
              ...floatTransition,
              delay: card.floatDelay,
            }}
          >
            <div className="rounded-2xl border border-border/90 bg-background/85 p-4 shadow-lg shadow-foreground/[0.04] ring-1 ring-accent/15 backdrop-blur-md sm:p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                  {card.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">{card.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted">
                    {card.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
