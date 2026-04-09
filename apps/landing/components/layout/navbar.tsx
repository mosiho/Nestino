"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { captureEvent } from "@/components/analytics/track-event";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { useLocaleContext } from "@/components/i18n/locale-provider";
import { Button } from "@/components/ui/button";
import { getWhatsAppChatUrl } from "@/lib/constants";
import { localizedPath } from "@/lib/i18n/paths";

const SECTION_IDS = [
  "hero",
  "problem",
  "engine",
  "how-it-works",
  "proof",
  "pricing",
  "faq",
  "contact",
] as const;

/** Viewport offset from top: sticky header + small buffer for scroll-spy */
const SCROLL_SPY_OFFSET_PX = 76;

function scrollToSection(id: (typeof SECTION_IDS)[number]) {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  document.getElementById(id)?.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
  });
}

export function Navbar() {
  const { locale, messages } = useLocaleContext();
  const nav = messages.nav;
  const sectionLabels: Record<(typeof SECTION_IDS)[number], string> = {
    hero: nav.overview,
    problem: nav.problem,
    engine: nav.engine,
    "how-it-works": nav.howItWorks,
    proof: nav.proof,
    pricing: nav.pricing,
    faq: nav.faq,
    contact: nav.contact,
  };

  const [activeId, setActiveId] =
    useState<(typeof SECTION_IDS)[number]>("hero");
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  const waHref = getWhatsAppChatUrl(messages.whatsappPrefill);

  const updateActive = useCallback(() => {
    let next: (typeof SECTION_IDS)[number] = SECTION_IDS[0];
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const { top } = el.getBoundingClientRect();
      if (top <= SCROLL_SPY_OFFSET_PX) next = id;
    }
    setActiveId((prev) => (prev === next ? prev : next));
  }, []);

  useEffect(() => {
    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [updateActive]);

  useEffect(() => {
    const link = linkRefs.current.get(activeId);
    const navEl = navRef.current;
    if (!link || !navEl) return;
    const navRect = navEl.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    const pad = 12;
    if (linkRect.left < navRect.left + pad) {
      navEl.scrollBy({ left: linkRect.left - navRect.left - pad, behavior: "auto" });
    } else if (linkRect.right > navRect.right - pad) {
      navEl.scrollBy({ left: linkRect.right - navRect.right + pad, behavior: "auto" });
    }
  }, [activeId]);

  const homeHref = localizedPath(locale, "/");

  return (
    <header className="sticky top-0 z-50 border-b border-border/90 bg-background/90 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-3 py-2 sm:gap-3 sm:px-6 sm:py-2.5">
        <Link
          href={homeHref}
          className="shrink-0 text-base font-bold tracking-tight text-foreground sm:text-lg"
        >
          Nestino
        </Link>

        <div className="relative min-w-0 flex-1">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-6 bg-gradient-to-r from-background to-transparent sm:w-8"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-6 bg-gradient-to-l from-background to-transparent sm:w-8"
            aria-hidden
          />
          <nav
            ref={navRef}
            className="flex gap-1 overflow-x-auto overscroll-x-contain py-0.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-1.5 [&::-webkit-scrollbar]:hidden"
            aria-label={nav.onThisPage}
          >
            {SECTION_IDS.map((id) => {
              const isActive = activeId === id;
              return (
                <a
                  key={id}
                  ref={(node) => {
                    if (node) linkRefs.current.set(id, node);
                    else linkRefs.current.delete(id);
                  }}
                  href={`#${id}`}
                  className={[
                    "shrink-0 rounded-full px-2.5 py-1.5 text-xs font-semibold transition-[color,background-color,box-shadow] duration-200 sm:px-3.5 sm:py-2 sm:text-sm",
                    isActive
                      ? "bg-accent/14 text-accent shadow-[inset_0_0_0_1px_rgb(13_148_136/0.28)]"
                      : "text-muted hover:bg-foreground/[0.04] hover:text-foreground",
                  ].join(" ")}
                  aria-current={isActive ? "true" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(id);
                  }}
                >
                  {sectionLabels[id]}
                </a>
              );
            })}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <LanguageSwitcher />
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full px-3 py-2 text-sm font-semibold text-muted transition-colors hover:bg-foreground/[0.04] hover:text-foreground sm:inline-flex"
            onClick={() => captureEvent("whatsapp_click")}
          >
            {nav.whatsapp}
          </a>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-muted transition-colors hover:bg-accent/12 hover:text-accent sm:hidden"
            aria-label={nav.whatsapp}
            onClick={() => captureEvent("whatsapp_click")}
          >
            {nav.whatsappShort}
          </a>
          <Button
            size="sm"
            className="hidden whitespace-nowrap sm:inline-flex"
            analytics={{ location: "nav", ctaId: "whatsapp_nav" }}
            asChild
          >
            <a href={waHref} target="_blank" rel="noopener noreferrer">
              {nav.messageWhatsApp}
            </a>
          </Button>
          <Button
            size="sm"
            className="px-2.5 text-xs sm:hidden"
            analytics={{ location: "nav", ctaId: "whatsapp_nav" }}
            asChild
          >
            <a href={waHref} target="_blank" rel="noopener noreferrer">
              {nav.messageWhatsAppShort}
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
