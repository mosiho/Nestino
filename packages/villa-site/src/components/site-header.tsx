"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { LANG_LABELS, type Lang } from "../lib/i18n";
import { villaPath } from "../lib/villa-path";

type Props = {
  siteName: string;
  lang: Lang;
  activeLangs: string[];
  phone: string;
  pathPrefix?: string;
  logoSrc?: string;
};

const NAV_LINKS = [
  { labelKey: "Villas", href: "/villas" },
  { labelKey: "Guides", href: "/guides" },
  { labelKey: "Location", href: "/location" },
  { labelKey: "About", href: "/about" },
  { labelKey: "Contact", href: "/contact" },
] as const;

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
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const whatsappHref = phone
    ? `https://wa.me/${phone.replace(/\D/g, "")}`
    : "#";

  return (
    <>
      <header
        style={{ zIndex: "var(--z-sticky-header)" }}
        className={`fixed inset-x-0 top-0 transition-all duration-500 ease-smooth ${
          isScrolled
            ? "bg-[var(--color-surface)]/90 backdrop-blur-xl shadow-[var(--shadow-sm)] border-b border-[var(--color-border)]"
            : "bg-transparent"
        }`}
      >
        <div className="content-wrapper flex items-center justify-between h-14 md:h-16">
          <Link
            href={villaPath(pathPrefix, `/${lang}`)}
            className={
              logoSrc
                ? "inline-flex items-center shrink-0 hover:scale-[1.02] transition-transform duration-300"
                : "font-serif font-semibold text-lg tracking-tight hover:text-[var(--accent-500)] transition-colors duration-300"
            }
            style={!logoSrc ? { color: isScrolled ? "var(--color-text-primary)" : "var(--color-text-primary)" } : undefined}
          >
            {logoSrc ? (
              <Image
                src={logoSrc}
                alt={siteName}
                width={250}
                height={53}
                className="h-7 md:h-9 w-auto max-w-[min(180px,50vw)] object-contain object-left"
                sizes="(max-width: 768px) 50vw, 200px"
                priority
              />
            ) : (
              siteName
            )}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
            {NAV_LINKS.map(({ labelKey, href }) => (
              <Link
                key={href}
                href={villaPath(pathPrefix, `/${lang}${href}`)}
                className="relative text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-300 after:absolute after:bottom-[-4px] after:left-0 after:h-[1.5px] after:w-0 after:bg-[var(--accent-500)] after:transition-all after:duration-300 hover:after:w-full"
              >
                {navLabel(lang, labelKey)}
              </Link>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3">
            {activeLangs.length > 1 && (
              <div className="flex items-center gap-1">
                {activeLangs.map((l) => (
                  <Link
                    key={l}
                    href={villaPath(pathPrefix, `/${l}`)}
                    className={`text-xs font-medium px-2.5 py-1 rounded-md transition-colors duration-200 ${
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
              className="inline-flex items-center gap-2 px-5 py-2 rounded-md text-sm font-medium text-white transition-all duration-300 hover:shadow-[var(--shadow-glow)] hover:brightness-110"
              style={{ backgroundColor: "var(--accent-500)" }}
            >
              WhatsApp
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 -mr-1"
            aria-label={drawerOpen ? "Close menu" : "Open menu"}
            onClick={() => setDrawerOpen((o) => !o)}
          >
            <div className="relative w-5 h-4">
              <span
                className="absolute left-0 block w-full h-[1.5px] bg-current transition-all duration-300 ease-smooth"
                style={{
                  color: "var(--color-text-primary)",
                  top: drawerOpen ? "7px" : "0",
                  transform: drawerOpen ? "rotate(45deg)" : "none",
                }}
              />
              <span
                className="absolute left-0 top-[7px] block w-full h-[1.5px] bg-current transition-opacity duration-200"
                style={{
                  color: "var(--color-text-primary)",
                  opacity: drawerOpen ? 0 : 1,
                }}
              />
              <span
                className="absolute left-0 block w-full h-[1.5px] bg-current transition-all duration-300 ease-smooth"
                style={{
                  color: "var(--color-text-primary)",
                  top: drawerOpen ? "7px" : "14px",
                  transform: drawerOpen ? "rotate(-45deg)" : "none",
                }}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile drawer backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden"
          style={{ zIndex: "var(--z-drawer-backdrop)" }}
          onClick={closeDrawer}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[min(320px,85vw)] bg-[var(--color-surface)] md:hidden flex flex-col transition-transform duration-350 ease-smooth safe-bottom ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ zIndex: "var(--z-drawer)" }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
      >
        <div className="h-14 flex items-center justify-end px-4 border-b border-[var(--color-border)]">
          <button
            onClick={closeDrawer}
            className="flex items-center justify-center w-10 h-10"
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 4l12 12M16 4L4 16" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-6">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map(({ labelKey, href }) => (
              <Link
                key={href}
                href={villaPath(pathPrefix, `/${lang}${href}`)}
                className="flex items-center h-14 text-lg font-medium text-[var(--color-text-primary)] border-b border-[var(--color-border)]/50 transition-colors duration-200 active:text-[var(--accent-500)]"
                onClick={closeDrawer}
              >
                {navLabel(lang, labelKey)}
              </Link>
            ))}
          </div>

          {activeLangs.length > 1 && (
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
                {lang === "tr" ? "Dil" : lang === "ar" ? "اللغة" : lang === "ru" ? "Язык" : "Language"}
              </p>
              <div className="flex flex-wrap gap-2">
                {activeLangs.map((l) => (
                  <Link
                    key={l}
                    href={villaPath(pathPrefix, `/${l}`)}
                    className={`text-sm font-medium px-3 py-2 rounded-md border transition-colors duration-200 ${
                      l === lang
                        ? "border-[var(--accent-500)] text-[var(--accent-500)] bg-[var(--accent-muted)]"
                        : "border-[var(--color-border)] text-[var(--color-text-muted)]"
                    }`}
                    onClick={closeDrawer}
                  >
                    {LANG_LABELS[l as Lang] ?? l}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>

        <div className="px-6 py-5 border-t border-[var(--color-border)]">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full h-12 rounded-md text-base font-medium text-white transition-all duration-200 active:scale-[0.97]"
            style={{ backgroundColor: "var(--accent-500)" }}
            onClick={closeDrawer}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
