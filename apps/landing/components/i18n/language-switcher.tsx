"use client";

import { usePathname } from "next/navigation";

import { defaultLocale, type Locale } from "@/lib/i18n/config";
import { localizedPath, switchLocalePath } from "@/lib/i18n/paths";

import { useLocaleContext } from "./locale-provider";

/** Home URL with optional query and/or hash, e.g. `?slug=demo#contact`. */
export function localizedHomeHref(locale: Locale, queryAndHash: string): string {
  const base = localizedPath(locale, "/");
  if (!queryAndHash) return base;
  const piece =
    queryAndHash.startsWith("?") || queryAndHash.startsWith("#")
      ? queryAndHash
      : `?${queryAndHash}`;
  return `${base}${piece}`;
}

const ORDER: Locale[] = ["en", "tr"];

/** Regional flag shown next to each locale label (emoji, no extra assets). */
const LOCALE_FLAG: Record<Locale, string> = {
  en: "🇬🇧",
  tr: "🇹🇷",
};

export function LanguageSwitcher() {
  const pathname = usePathname();
  const { locale, messages } = useLocaleContext();
  const ls = messages.languageSwitcher;

  return (
    <div
      className="flex items-center rounded-full border border-border/90 bg-background/80 p-0.5 shadow-sm backdrop-blur-sm"
      role="group"
      aria-label={ls.label}
    >
      {ORDER.map((code) => {
        const active = code === locale;
        const href = switchLocalePath(pathname, code);
        const label = code === "en" ? ls.english : ls.turkish;
        return (
          <a
            key={code}
            href={href}
            className={[
              "relative min-w-[5.25rem] rounded-full px-2.5 py-1.5 text-center text-xs font-semibold transition-[color,background-color,box-shadow] duration-200 sm:min-w-[6rem] sm:px-3 sm:text-sm",
              active
                ? "bg-accent text-accent-foreground shadow-sm"
                : "text-muted hover:bg-foreground/[0.06] hover:text-foreground",
            ].join(" ")}
            hrefLang={code}
            lang={code}
            aria-current={active ? "true" : undefined}
            aria-label={
              active
                ? ls.currentAria.replace(
                    "{lang}",
                    code === defaultLocale ? ls.english : ls.turkish,
                  )
                : `${ls.label}: ${label}`
            }
          >
            <span className="inline-flex items-center justify-center gap-1 sm:gap-1.5">
              <span className="text-[1.05rem] leading-none sm:text-lg" aria-hidden>
                {LOCALE_FLAG[code]}
              </span>
              <span>{code === "en" ? "EN" : "TR"}</span>
            </span>
          </a>
        );
      })}
    </div>
  );
}
