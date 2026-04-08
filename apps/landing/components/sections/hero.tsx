"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";

import { HeroVisual } from "./hero-visual";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.04 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative scroll-mt-20 overflow-hidden border-b border-border/80"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-hero-gradient" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(13 148 136 / 0.07) 1px, transparent 0)`,
          backgroundSize: "48px 48px",
        }}
      />
      {!reduced ? (
        <motion.div
          className="pointer-events-none absolute -left-1/4 top-1/2 h-[min(90vw,520px)] w-[min(90vw,520px)] -translate-y-1/2 rounded-full bg-accent/[0.06] blur-3xl"
          animate={{ x: [0, 24, 0], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:grid lg:grid-cols-[1fr_min(42%,480px)] lg:items-center lg:gap-10 lg:py-32 xl:gap-14">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl lg:max-w-none"
        >
          <motion.p
            variants={item}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Zero commission · direct bookings
          </motion.p>
          <motion.h1
            variants={item}
            id="hero-heading"
            className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] xl:text-6xl [text-wrap:balance]"
          >
            Fill your rooms{" "}
            <span className="relative inline-block">
              <span className="relative z-[1] bg-gradient-to-r from-accent to-teal-600 bg-clip-text text-transparent">
                directly
              </span>
              <span
                className="absolute -inset-x-1 -bottom-1 -z-0 h-3 rounded-md bg-accent/15 sm:h-3.5"
                aria-hidden
              />
            </span>{" "}
            zero OTA commissions
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg text-muted leading-relaxed lg:max-w-2xl"
          >
            Nestino drives qualified guests straight to your villa through Google,
            AI search, and high-converting direct channels. No middleman. No
            commission. Your bookings, your margin.
          </motion.p>
          <motion.div
            variants={item}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <motion.div
              whileHover={reduced ? undefined : { scale: 1.02 }}
              whileTap={reduced ? undefined : { scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Button
                size="lg"
                analytics={{ location: "hero", ctaId: "start_filling_rooms" }}
                asChild
              >
                <a href="#trial">Start filling rooms—free for 30 days</a>
              </Button>
            </motion.div>
          </motion.div>
          <motion.p
            variants={item}
            className="mt-6 text-sm font-medium text-muted"
          >
            No credit card. No OTA commissions. Cancel anytime.
          </motion.p>
        </motion.div>

        <HeroVisual />
      </div>
    </section>
  );
}
