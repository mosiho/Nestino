"use client";

import Link from "next/link";

import { useLocaleContext } from "@/components/i18n/locale-provider";
import { getSiteUrl } from "@/lib/constants";
import { localizedPath } from "@/lib/i18n/paths";

export function Footer() {
  const year = new Date().getFullYear();
  const site = getSiteUrl();
  const { locale, messages } = useLocaleContext();
  const f = messages.footer;

  return (
    <footer className="border-t border-border bg-surface/60">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-lg font-bold text-foreground">Nestino</p>
            <p className="mt-2 max-w-sm text-sm text-muted leading-relaxed">
              {f.tagline}
            </p>
            <p className="mt-4 text-sm text-muted">
              <a
                href="mailto:hello@nestino.ai"
                className="font-semibold text-accent hover:underline"
              >
                hello@nestino.ai
              </a>
            </p>
          </div>
          <div className="flex gap-8 text-sm">
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-foreground">{f.legal}</span>
              <Link
                href={localizedPath(locale, "/privacy")}
                className="text-muted hover:text-foreground"
              >
                {f.privacy}
              </Link>
              <Link
                href={localizedPath(locale, "/terms")}
                className="text-muted hover:text-foreground"
              >
                {f.terms}
              </Link>
            </div>
          </div>
        </div>
        <p className="mt-10 text-xs text-muted">
          © {year} Nestino. {site.replace(/^https?:\/\//, "")}
        </p>
      </div>
    </footer>
  );
}
