"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { captureEvent } from "@/components/analytics/track-event";
import { useLocaleContext } from "@/components/i18n/locale-provider";
import { Button } from "@/components/ui/button";
import { getWhatsAppChatUrl } from "@/lib/constants";

const BOWORA_URL = "https://bowora.com/";

export function BoworaPartnerHero() {
  const reduced = useReducedMotion();
  const { messages } = useLocaleContext();
  const h = messages.bowora.hero;
  const waHref = getWhatsAppChatUrl(messages.whatsappPrefill);

  return (
    <section
      id="hero"
      className="relative scroll-mt-20 overflow-hidden border-b border-border/80"
      aria-labelledby="bowora-hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-hero-gradient" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(13 148 136 / 0.07) 1px, transparent 0)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex flex-col items-center text-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            <Image
              src="/nestino-logo.png"
              alt="Nestino"
              width={140}
              height={40}
              className="h-9 w-auto object-contain sm:h-10"
              priority
            />
            <span className="hidden text-2xl font-light text-muted sm:inline" aria-hidden>
              ×
            </span>
            <a
              href={BOWORA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 rounded-lg ring-1 ring-border/80 bg-background/80 px-3 py-2 transition hover:ring-accent/40"
            >
              <Image
                src="/bowora-logo.svg"
                alt="Bowora — startup launch pad"
                width={200}
                height={46}
                className="h-8 w-auto max-w-[min(200px,70vw)] object-contain object-left sm:h-9"
                priority
              />
            </a>
          </div>

          <p className="mt-8 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {h.badge}
          </p>

          <h1
            id="bowora-hero-heading"
            className="mt-4 max-w-3xl text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            {h.title}
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-lg text-muted leading-relaxed">
            {h.body}
          </p>

          <p className="mt-4 max-w-xl text-sm text-muted leading-relaxed">
            {h.partnerLine}{" "}
            <a
              href={BOWORA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent underline-offset-2 hover:underline"
            >
              {h.boworaLinkLabel}
            </a>
            .
          </p>

          <div className="mt-10">
            <Button
              size="lg"
              analytics={{ location: "bowora_hero", ctaId: "whatsapp_bowora_hero" }}
              asChild
            >
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => captureEvent("whatsapp_click")}
              >
                {h.cta}
              </a>
            </Button>
          </div>

          <p className="mt-6 text-sm font-medium text-muted">{h.footnote}</p>
        </motion.div>
      </div>
    </section>
  );
}
