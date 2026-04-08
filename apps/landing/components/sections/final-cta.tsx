"use client";

import Image from "next/image";

import { TrialForm } from "@/components/forms/trial-form";
import { captureEvent } from "@/components/analytics/track-event";
import { SectionHeader } from "@/components/ui/section-header";
import {
  getWhatsAppNumber,
  getWhatsAppPrefillMessage,
} from "@/lib/constants";

type FinalCtaProps = {
  demoSlug?: string;
};

export function FinalCtaSection({ demoSlug }: FinalCtaProps) {
  const wa = getWhatsAppNumber();
  const waHref = wa
    ? `https://wa.me/${wa.replace(/\+/g, "")}?text=${encodeURIComponent(
        getWhatsAppPrefillMessage()
      )}`
    : null;

  return (
    <section className="scroll-mt-20 py-20 sm:py-24" id="trial">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-14">
          <div className="flex min-w-0 flex-col gap-10">
            <div>
              <SectionHeader
                badge="Get started"
                title="Start getting direct bookings"
                subtitle="Tell us about your villa. We’ll set up your trial, your demo presence, and the default language stack—then kick off your first crawl job."
              />
              {waHref ? (
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex text-sm font-semibold text-accent hover:underline"
                  onClick={() => captureEvent("whatsapp_click")}
                >
                  Prefer WhatsApp? Chat with us →
                </a>
              ) : null}
            </div>

            <figure className="relative hidden w-full max-w-lg overflow-hidden rounded-2xl border border-border/90 bg-surface shadow-2xl shadow-black/30 ring-1 ring-accent/15 lg:block xl:max-w-none">
              <div className="relative aspect-[4/3] w-full sm:aspect-[5/4]">
                <div
                  className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-tr from-background/20 via-transparent to-accent/[0.07]"
                  aria-hidden
                />
                <Image
                  src="/images/final-cta-villa.jpg"
                  alt="Premium villa with pool—example of the high-trust presence owners get with Nestino."
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1280px) 520px, (min-width: 1024px) 45vw, 100vw"
                  quality={88}
                  priority={false}
                />
              </div>
            </figure>
          </div>
          <TrialForm demoSlug={demoSlug} />
        </div>
      </div>
    </section>
  );
}
