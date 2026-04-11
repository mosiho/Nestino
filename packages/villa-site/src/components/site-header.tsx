"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { LANG_LABELS, type Lang } from "../lib/i18n";
import { villaPath } from "../lib/villa-path";

type Props = {
  siteName: string;
  lang: Lang;
  activeLangs: string[];
  phone: string;
  /** e.g. `/sites/silyan` when embedded on the marketing host; empty for subdomain deployments */
  pathPrefix?: string;
  /** Optional brand image (e.g. official Silyan wordmark). */
  logoSrc?: string;
};

const NAV_LINKS = [
  { labelKey: "Villas", href: "/villas" },
  { labelKey: "Guides", href: "/guides" },
  { labelKey: "Location", href: "/location" },
  { labelKey: "About", href: "/about" },
  { labelKey: "Contact", href: "/contact" },
] as const;

// Nav labels by language
const NAV_LABELS: Record<string, Record<string, string>> = {
  en: { Villas: "Villas", Guides: "Guides", Location: "Location", About: "About", Contact: "Contact" },
  tr: { Villas: "Villalar", Guides: "Rehberler", Location: "Konum", About: "Hakkımızda", Contact: "İletişim" },
  ar: { Villas: "الفيلات", Guides: "أدلة", Location: "الموقع", About: "من نحن", Contact: "اتصل بنا" },
  ru: { Villas: "Виллы", Guides: "Гиды", Location: "Расположение", About: "О нас", Contact: "Контакты" },
  de: { Villas: "Villen", Guides: "Guides", Location: "Lage", About: "Über uns", Contact: "Kontakt" },
};

function navLabel(lang: string, key: string): string {
  return NAV_LABELS[lang]?.[key] ?? NAV_LABELS["en"]?.[key] ?? key;
}

export default function SiteHeader({
  siteName,
  lang,
  activeLangs,
  phone,
  pathPrefix = "",
  logoSrc,
}: Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const whatsappHref = phone
    ? `https://wa.me/${phone.replace(/\D/g, "")}`
    : "#";

  return (
    <header
      style={{ zIndex: "var(--z-sticky-header)" }}
      className={`fixed inset-x-0 top-0 transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--color-surface)]/95 backdrop-blur-md shadow-[var(--shadow-md)] border-b border-[var(--color-border)]"
          : "bg-transparent"
      }`}
    >
      <div className="content-wrapper flex items-center justify-between h-16 md:h-18">
        {/* Logo / wordmark */}
        <Link
          href={villaPath(pathPrefix, `/${lang}`)}
          className={
            logoSrc
              ? "inline-flex items-center shrink-0 opacity-95 hover:opacity-100 transition-opacity"
              : "font-serif font-semibold text-lg tracking-tight text-[var(--color-text-primary)] hover:text-[var(--accent-500)] transition-colors"
          }
        >
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt={siteName}
              width={250}
              height={53}
              className="h-8 md:h-9 w-auto max-w-[min(200px,55vw)] object-contain object-left"
              sizes="(max-width: 768px) 55vw, 200px"
              priority
            />
          ) : (
            siteName
          )}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {NAV_LINKS.map(({ labelKey, href }) => (
            <Link
              key={href}
              href={villaPath(pathPrefix, `/${lang}${href}`)}
              className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              {navLabel(lang, labelKey)}
            </Link>
          ))}
        </nav>

        {/* Desktop right: language switcher + CTA */}
        <div className="hidden md:flex items-center gap-3">
          {activeLangs.length > 1 && (
            <div className="flex items-center gap-1">
              {activeLangs.map((l) => (
                <Link
                  key={l}
                  href={villaPath(pathPrefix, `/${l}`)}
                  className={`text-xs font-medium px-2 py-1 rounded-sm transition-colors ${
                    l === lang
                      ? "text-[var(--accent-500)] bg-[var(--accent-muted)]"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                  }`}
                  aria-label={LANG_LABELS[l as Lang] ?? l}
                >
                  {l.toUpperCase().slice(0, 2)}
                </Link>
              ))}
            </div>
          )}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-white transition-colors"
            style={{ backgroundColor: "var(--accent-500)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor =
                "var(--accent-600)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor =
                "var(--accent-500)")
            }
          >
            WhatsApp
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 text-[var(--color-text-secondary)]"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4l12 12M16 4L4 16" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 5h14M3 10h14M3 15h14" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--color-surface)] border-t border-[var(--color-border)] px-4 pb-4">
          <nav className="flex flex-col gap-1 py-3">
            {NAV_LINKS.map(({ labelKey, href }) => (
              <Link
                key={href}
                href={villaPath(pathPrefix, `/${lang}${href}`)}
                className="py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {navLabel(lang, labelKey)}
              </Link>
            ))}
          </nav>
          {/* Language switcher mobile */}
          {activeLangs.length > 1 && (
            <div className="flex gap-2 pt-2 border-t border-[var(--color-border)]">
              {activeLangs.map((l) => (
                <Link
                  key={l}
                  href={villaPath(pathPrefix, `/${l}`)}
                  className={`text-xs font-medium px-2 py-1 rounded-sm transition-colors ${
                    l === lang
                      ? "text-[var(--accent-500)] bg-[var(--accent-muted)]"
                      : "text-[var(--color-text-muted)]"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {LANG_LABELS[l as Lang] ?? l}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </header>
  );
}