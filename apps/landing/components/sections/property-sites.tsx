import Link from "next/link";

import type { Messages } from "@/lib/i18n/messages/en";
import { getVillaSiteEntryUrl } from "@/lib/constants";

type Props = {
  messages: Messages["propertySites"];
};

export function PropertySitesSection({ messages }: Props) {
  const href = getVillaSiteEntryUrl("silyan");

  return (
    <section
      id="property-sites"
      className="border-y border-border bg-surface/40 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {messages.title}
        </h2>
        <p className="mt-3 text-muted leading-relaxed">{messages.subtitle}</p>
        <div className="mt-8 flex justify-center">
          <Link
            href={href}
            className="inline-flex items-center rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            {messages.visitLabel} — {messages.silyanName}
          </Link>
        </div>
        <p className="mt-2 text-xs text-muted">{messages.silyanHint}</p>
      </div>
    </section>
  );
}
