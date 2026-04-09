"use client";

import { createContext, useContext } from "react";

import type { Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/messages/en";

type LocaleContextValue = {
  locale: Locale;
  messages: Messages;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale,
  messages,
  children,
}: Readonly<{
  locale: Locale;
  messages: Messages;
  children: React.ReactNode;
}>) {
  return (
    <LocaleContext.Provider value={{ locale, messages }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocaleContext(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocaleContext must be used within LocaleProvider");
  }
  return ctx;
}
