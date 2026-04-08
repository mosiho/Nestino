export const SITE_NAME = "Nestino";

export const DESTINATIONS = [
  { value: "bali", label: "Bali" },
  { value: "thailand", label: "Thailand" },
  { value: "europe", label: "Europe" },
  { value: "caribbean", label: "Caribbean" },
  { value: "other", label: "Other" },
] as const;

export type DestinationValue = (typeof DESTINATIONS)[number]["value"];

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://nestino.ai";
}

export function getVillaBaseDomain(): string {
  return process.env.NEXT_PUBLIC_VILLA_BASE_DOMAIN ?? "nestino.com";
}

export function getWhatsAppNumber(): string {
  return process.env.NEXT_PUBLIC_WHATSAPP_E164 ?? "";
}

export function getWhatsAppPrefillMessage(propertyName?: string): string {
  const base =
    "Hi Nestino — I want to learn more about direct bookings and the free trial.";
  if (propertyName?.trim()) {
    return `${base} Property: ${propertyName.trim()}`;
  }
  return base;
}

export function getInternalNotifyEmail(): string {
  return process.env.INTERNAL_NOTIFY_EMAIL ?? "hello@nestino.ai";
}
