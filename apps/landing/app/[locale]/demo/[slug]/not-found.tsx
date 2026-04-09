import Link from "next/link";
import { headers } from "next/headers";

import { isLocale, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";
import { localizedPath } from "@/lib/i18n/paths";

export default async function DemoNotFound() {
  const h = await headers();
  const raw = h.get("x-nestino-locale");
  const locale: Locale = raw && isLocale(raw) ? raw : "en";
  const messages = getMessages(locale);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-semibold text-foreground">
        {messages.demo.notFoundTitle}
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted">
        {messages.demo.notFoundBody}
      </p>
      <Link
        href={localizedPath(locale, "/")}
        className="mt-8 inline-flex rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground"
      >
        {messages.demo.backHome}
      </Link>
    </div>
  );
}
