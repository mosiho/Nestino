"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { captureEvent } from "@/components/analytics/track-event";
import { useLocaleContext } from "@/components/i18n/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { getWhatsAppChatUrl } from "@/lib/constants";
import { localizedPath } from "@/lib/i18n/paths";

const TIER_ORDER = ["monthly", "quarterly", "annual"] as const;

export function PricingSection() {
  const { locale, messages } = useLocaleContext();
  const pr = messages.pricing;
  const termsHref = localizedPath(locale, "/terms");
  const waHref = getWhatsAppChatUrl(messages.whatsappPrefill);

  const tiers = TIER_ORDER.map((id) => {
    const tierMeta = pr.tiers.find((t) => t.id === id);
    const prices = pr.prices[id];
    if (!tierMeta || !prices) return null;
    const ctaId =
      id === "monthly"
        ? "whatsapp_pricing_monthly"
        : id === "quarterly"
          ? "whatsapp_pricing_quarterly"
          : "whatsapp_pricing_annual";
    const highlight =
      id === "quarterly"
        ? ("popular" as const)
        : id === "annual"
          ? ("best_value" as const)
          : null;
    return {
      id,
      badge: tierMeta.badge,
      price: prices.price,
      period: prices.period,
      savings: tierMeta.savings,
      highlight,
      ctaId,
    };
  }).filter(Boolean) as Array<{
    id: (typeof TIER_ORDER)[number];
    badge: string;
    price: string;
    period: string;
    savings: string | null;
    highlight: "popular" | "best_value" | null;
    ctaId: string;
  }>;

  return (
    <section
      className="scroll-mt-20 border-b border-border/80 py-20 sm:py-24"
      id="pricing"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          badge={pr.badge}
          title={pr.title}
          subtitle={pr.subtitle}
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {tiers.map((tier, index) => {
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
                    {pr.mostPopular}
                  </p>
                ) : null}
                {tier.highlight === "best_value" ? (
                  <p className="mb-3 inline-block rounded-full bg-surface px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-foreground ring-1 ring-border">
                    {pr.bestValue}
                  </p>
                ) : null}

                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  {tier.badge}
                </p>
                <p className="mt-4 flex flex-wrap items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                  <span className="text-base font-medium text-muted">{tier.period}</span>
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge>{pr.firstMonthFree}</Badge>
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
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => captureEvent("whatsapp_click")}
                  >
                    {pr.whatsAppCta}
                  </a>
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
          <p className="text-sm font-semibold text-foreground">{pr.includedTitle}</p>
          <p className="mt-1 text-sm text-muted">
            {pr.includedIntro}{" "}
            <Link href={termsHref} className="font-semibold text-accent hover:underline">
              {pr.includedTermsLink}
            </Link>{" "}
            {pr.includedIntroAfter}
          </p>
          <ul className="mt-6 space-y-3 text-sm text-muted">
            {pr.includedBullets.map((item) => (
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
