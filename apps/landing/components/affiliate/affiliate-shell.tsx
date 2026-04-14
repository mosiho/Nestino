"use client";

import { useMemo } from "react";

import { LocaleProvider } from "@/components/i18n/locale-provider";
import type { Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/messages/en";

export function AffiliateShell({
  locale,
  messages,
  children,
}: Readonly<{
  locale: Locale;
  messages: Messages;
  children: React.ReactNode;
}>) {
  const merged = useMemo(
    () => ({
      ...messages,
      whatsappPrefill: messages.affiliate.whatsappPrefill,
    }),
    [messages],
  );

  return (
    <LocaleProvider locale={locale} messages={merged}>
      {children}
    </LocaleProvider>
  );
}
