"use client";

import Image from "next/image";

import { captureEvent } from "@/components/analytics/track-event";
import { useLocaleContext } from "@/components/i18n/locale-provider";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { getWhatsAppChatUrl } from "@/lib/constants";

export function FinalCtaSection() {
  const { messages } = useLocaleContext();
  const fc = messages.finalCta;
  const waHref = getWhatsAppChatUrl(messages.whatsappPrefill);

  return (
    <section className="scroll-mt-20 py-20 sm:py-24" id="contact">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div className="flex min-w-0 flex-col gap-8">
            <SectionHeader
              badge={fc.badge}
              title={fc.title}
              subtitle={fc.subtitle}
            />
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <Button
                size="lg"
                className="!bg-[#25D366] !text-white shadow-md hover:!bg-[#20BD5A] hover:!text-white focus-visible:!ring-[#25D366]"
                analytics={{ location: "final_cta", ctaId: "whatsapp_primary" }}
                asChild
              >
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => captureEvent("whatsapp_click")}
                >
                  {fc.primaryButton}
                </a>
              </Button>
              <div className="rounded-xl border border-border bg-surface/60 px-4 py-3 text-sm">
                <p className="font-semibold text-muted">{fc.phoneHint}</p>
                <a
                  href={waHref}
                  className="mt-1 block text-lg font-bold tabular-nums tracking-tight text-foreground hover:text-accent"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => captureEvent("whatsapp_click")}
                >
                  {fc.phoneDisplay}
                </a>
              </div>
            </div>
          </div>

          <figure className="relative mx-auto w-full max-w-lg overflow-hidden rounded-2xl border border-border/90 bg-surface shadow-2xl shadow-black/30 ring-1 ring-accent/15 lg:max-w-none">
            <div className="relative aspect-[4/3] w-full sm:aspect-[5/4]">
              <div
                className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-tr from-background/20 via-transparent to-accent/[0.07]"
                aria-hidden
              />
              <Image
                src="/images/final-cta-villa.jpg"
                alt={fc.imageAlt}
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 50vw, 100vw"
                quality={88}
                priority={false}
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
