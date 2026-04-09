"use client";

import { usePathname } from "next/navigation";

import { defaultLocale, type Locale } from "@/lib/i18n/config";
import { localizedPath, switchLocalePath } from "@/lib/i18n/paths";

import { useLocaleContext } from "./locale-provider";

/** Home URL with optional query and/or hash, e.g. `?slug=demo#trial`. */
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
              "relative min-w-[4.25rem] rounded-full px-3 py-1.5 text-center text-xs font-semibold transition-[color,background-color,box-shadow] duration-200 sm:min-w-[5rem] sm:text-sm",
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
            {code === "en" ? "EN" : "TR"}
          </a>
        );
      })}
    </div>
  );
}
