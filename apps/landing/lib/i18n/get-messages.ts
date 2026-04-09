import type { Locale } from "./config";
import { isLocale } from "./config";
import type { Messages } from "./messages/en";
import { enMessages } from "./messages/en";
import { trMessages } from "./messages/tr";

const byLocale: Record<Locale, Messages> = {
  en: enMessages,
  tr: trMessages,
};

export function getMessages(locale: string): Messages {
  if (!isLocale(locale)) {
    return enMessages;
  }
  return byLocale[locale];
}
