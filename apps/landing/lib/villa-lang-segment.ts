/**
 * First path segment after /sites/{slug}/ may be a villa UI language.
 * Kept in the landing app (not imported from @nestino/villa-site) so
 * middleware stays Edge-safe and never pulls DB / Node-only deps.
 */
const VILLA_PATH_LANGS = [
  "en",
  "tr",
  "ar",
  "ru",
  "de",
  "fr",
  "zh-Hans",
  "ko",
  "ja",
  "it",
  "nl",
  "es",
  "ms",
  "pt",
] as const;

export function isVillaPathLang(value: string): boolean {
  return (VILLA_PATH_LANGS as readonly string[]).includes(value);
}
