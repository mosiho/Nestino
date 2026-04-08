"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

const TIERS = [
  {
    id: "monthly",
    badge: "STARTER",
    price: "$399",
    period: "/month",
    perMonthEquiv: null as string | null,
    savings: null as string | null,
    highlight: null as "popular" | "best_value" | null,
    ctaId: "start_trial_monthly",
  },
  {
    id: "quarterly",
    badge: "GROWTH",
    price: "$999",
    period: "/quarter",
    perMonthEquiv: null as string | null,
    savings: "Save ~$198",
    highlight: "popular" as const,
    ctaId: "start_trial_quarterly",
  },
  {
    id: "annual",
    badge: "SCALE",
    price: "$3,599",
    period: "/year",
    perMonthEquiv: null as string | null,
    savings: "Save ~$1,189",
    highlight: "best_value" as const,
    ctaId: "start_trial_annual",
  },
] as const;

export function PricingSection() {
  const included = [
    "Direct booking channel built to convert (speed, trust, mobile)",
    "Edits during your trial so it matches your property story",
    "Autonomous growth loop: discovery + on-site optimization",
    "AI-era readiness: structured answers, FAQs, entity clarity",
    "Destination-aware multilingual Tier‑1 seeding",
  ];

  return (
    <section
      className="scroll-mt-20 border-b border-border/80 py-20 sm:py-24"
      id="pricing"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          badge="Pricing"
          title="Keep the booking. Skip the commission."
          subtitle="Choose monthly, quarterly, or annual billing. Every tier includes the same product—pick the cadence that fits how you run the property."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {TIERS.map((tier, index) => {
            const isPopular = tier.highlight === "popular";
            const cardClass = isPopular
              ? "relative z-10 flex flex-col scale-[1.02] rounded-2xl border-2 border-accent bg-background p-6 shadow-lg ring-2 ring-accent/30 sm:p-8"
              : "flex flex-col rounded-2xl border border-border bg-background p-6 shadow-sm sm:p-8";

            return (
              <motion.div
                key={tier.id}
                className={cardClass}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
              >
                {isPopular ? (
                  <p className="absolute -top-3 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent-foreground shadow-sm">
                    Most popular
                  </p>
                ) : null}
                {tier.highlight === "best_value" ? (
                  <p className="mb-3 inline-block rounded-full bg-surface px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-foreground ring-1 ring-border">
                    Best value
                  </p>
                ) : null}

                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  {tier.badge}
                </p>
                <p className="mt-4 flex flex-wrap items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                  <span className="text-base font-medium text-muted">{tier.period}</span>
                </p>
                {tier.perMonthEquiv ? (
                  <p className="mt-1 text-sm text-muted">{tier.perMonthEquiv}</p>
                ) : null}
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge>First month free</Badge>
                </div>
                {tier.savings ? (
                  <p className="mt-3 text-sm font-medium text-accent">{tier.savings}</p>
                ) : null}

                <div className="mt-auto" />
                <Button
                  className="mt-6 w-full"
                  size="lg"
                  variant={isPopular ? "primary" : "secondary"}
                  analytics={{ location: "pricing", ctaId: tier.ctaId }}
                  asChild
                >
                  <a href="#trial">Start free trial</a>
                </Button>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-14 rounded-2xl border border-border bg-surface/40 p-6 sm:p-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-sm font-semibold text-foreground">What&apos;s included</p>
          <p className="mt-1 text-sm text-muted">
            All plans include the same features. No hidden setup fees on the standard path.
            Cancel anytime after your trial. See our{" "}
            <Link href="/terms" className="font-semibold text-accent hover:underline">
              Terms
            </Link>{" "}
            for details.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-muted">
            {included.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="font-bold text-accent" aria-hidden>
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
