import Link from "next/link";

import { getSiteUrl } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();
  const site = getSiteUrl();

  return (
    <footer className="border-t border-border bg-surface/60">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-lg font-bold text-foreground">Nestino</p>
            <p className="mt-2 max-w-sm text-sm text-muted leading-relaxed">
              Zero-commission direct bookings for premium villas—discovery,
              conversion, and a growth engine built for owners who want margin
              back.
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
              <span className="font-semibold text-foreground">Legal</span>
              <Link href="/privacy" className="text-muted hover:text-foreground">
                Privacy
              </Link>
              <Link href="/terms" className="text-muted hover:text-foreground">
                Terms
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
