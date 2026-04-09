"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { captureEvent } from "@/components/analytics/track-event";
import { localizedHomeHref } from "@/components/i18n/language-switcher";
import { useLocaleContext } from "@/components/i18n/locale-provider";
import { Button } from "@/components/ui/button";
import { getVillaBaseDomain } from "@/lib/constants";

type DemoPreviewProps = {
  slug: string;
  destination: string;
};

export function DemoPreview({ slug, destination }: DemoPreviewProps) {
  const [compact, setCompact] = useState(false);
  const domain = getVillaBaseDomain();
  const src = `https://${slug}.${domain}/en`;
  const { locale, messages } = useLocaleContext();
  const d = messages.demo;

  useEffect(() => {
    captureEvent("demo_view", { slug });
  }, [slug]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setCompact(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const claimHref = localizedHomeHref(
    locale,
    `?slug=${encodeURIComponent(slug)}#contact`,
  );

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <div className="flex items-center justify-between gap-3 border-b border-border bg-surface/90 px-3 py-3 sm:px-4">
        <div className="min-w-0 flex-1">
          {!compact ? (
            <p className="truncate text-sm text-foreground">{d.previewTitle}</p>
          ) : (
            <p className="sr-only">{d.previewSr}</p>
          )}
          <p className="truncate text-xs text-muted">
            {slug}.{domain} · {destination}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button size="sm" analytics={{ location: "demo_bar", ctaId: "claim" }} asChild>
            <Link href={claimHref}>
              {compact ? d.claim : d.claimFull}
            </Link>
          </Button>
        </div>
      </div>
      <div className="relative flex-1">
        <iframe
          title={`Preview of ${slug}`}
          src={src}
          className="absolute inset-0 h-full w-full border-0"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
