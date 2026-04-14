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

export function BoworaQuarterlyPricingSection() {
  const { locale, messages } = useLocaleContext();
  const pr = messages.pricing;
  const b = messages.bowora.pricing;
  const termsHref = localizedPath(locale, "/terms");
  const waHref = getWhatsAppChatUrl(messages.whatsappPrefill);
  const list = pr.prices.quarterly;

  return (
    <section
      className="scroll-mt-20 border-b border-border/80 py-20 sm:py-24"
      id="pricing"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader badge={b.badge} title={b.title} subtitle={b.subtitle} />

        <div className="mx-auto mt-10 max-w-md">
          <motion.div
            className="relative z-10 flex flex-col rounded-2xl border-2 border-accent bg-background p-6 shadow-lg ring-2 ring-accent/30 sm:p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <p className="absolute -top-3 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent-foreground shadow-sm">
              {b.exclusiveBadge}
            </p>

            <div className="mt-2 flex flex-wrap gap-2">
              <Badge className="font-semibold ring-1 ring-accent/50 bg-accent/15">
                {b.discountBadge}
              </Badge>
              <Badge>{pr.firstMonthFree}</Badge>
            </div>

            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted">
              {b.tierBadge}
            </p>

            <p className="mt-1 text-sm text-muted">
              <span className="font-medium text-foreground">{b.wasLabel}: </span>
              <span className="line-through decoration-foreground/40">
                {list.price}
                <span className="font-medium">{list.period}</span>
              </span>
            </p>

            <p className="mt-4 flex flex-wrap items-baseline gap-1">
              <span className="text-4xl font-bold text-foreground">{b.nowPrice}</span>
              <span className="text-base font-medium text-muted">{list.period}</span>
            </p>

            <p className="mt-3 text-sm font-medium text-accent">{b.savingsLine}</p>

            <p className="mt-4 text-xs text-muted leading-relaxed">{b.partnerDisclaimer}</p>

            <div className="mt-auto" />
            <Button
              className="mt-6 w-full"
              size="lg"
              variant="primary"
              analytics={{ location: "bowora_pricing", ctaId: "whatsapp_bowora_quarterly_50" }}
              asChild
            >
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => captureEvent("whatsapp_click")}
              >
                {b.whatsAppCta}
              </a>
            </Button>
          </motion.div>
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
