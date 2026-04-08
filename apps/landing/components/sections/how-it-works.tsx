"use client";

import { motion, useReducedMotion } from "framer-motion";

import { SectionHeader } from "@/components/ui/section-header";

export function HowItWorksSection() {
  const reduced = useReducedMotion();
  const steps = [
    {
      n: "01",
      title: "We set up your direct booking channel",
      body: "A premium villa presence engineered to convert—fast, mobile-first, and built to earn trust in seconds.",
    },
    {
      n: "02",
      title: "Our engine drives qualified guests to you",
      body: "Continuous discovery work across search + AI surfaces routes high-intent travelers toward your direct funnel.",
    },
    {
      n: "03",
      title: "You keep 100% of every booking",
      body: "No OTA commission on direct stays. More margin on the same guest—reinvested into your property, not a marketplace.",
    },
  ];

  return (
    <section
      className="scroll-mt-20 border-b border-border/80 py-20 sm:py-24"
      id="how-it-works"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          badge="How it works"
          title="From invisible to fully booked—directly"
          subtitle="Three clear steps. Built for owners who want occupancy and margin—not another dashboard to babysit."
        />
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.li
              key={s.n}
              className="group h-full rounded-2xl border border-border bg-background p-7 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
            >
              <motion.span
                className="inline-block text-3xl font-extrabold text-accent"
                initial={reduced ? false : { scale: 0.85 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                {s.n}
              </motion.span>
              <h3 className="mt-4 text-lg font-bold text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{s.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
