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
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://nestino-main.vercel.app";
}

export function getVillaBaseDomain(): string {
  return process.env.NEXT_PUBLIC_VILLA_BASE_DOMAIN ?? "nestino.com";
}

/** Public URL for a property site when served under the marketing host (`/sites/{slug}/…`). */
export function getVillaSiteEntryUrl(subdomain: string, lang = "en"): string {
  const base = getSiteUrl().replace(/\/$/, "");
  return `${base}/sites/${subdomain}/${lang}`;
}

/** Default Nestino marketing WhatsApp (overridable via NEXT_PUBLIC_WHATSAPP_E164). */
const DEFAULT_WHATSAPP_E164 = "+905346191692";

export function getWhatsAppNumber(): string {
  return process.env.NEXT_PUBLIC_WHATSAPP_E164?.trim() || DEFAULT_WHATSAPP_E164;
}

/** wa.me URL with optional pre-filled message (UTF-8). */
export function getWhatsAppChatUrl(prefill: string): string {
  const raw = getWhatsAppNumber();
  const digits = raw.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(prefill)}`;
}

export function getInternalNotifyEmail(): string {
  return process.env.INTERNAL_NOTIFY_EMAIL ?? "hello@nestino.ai";
}
