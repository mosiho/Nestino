import type { Locale } from "./config";
import { defaultLocale, locales } from "./config";

/** Public URL path for a locale (English has no prefix). */
export function localizedPath(locale: Locale, path: string): string {
  const suffix =
    path === "/" || path === ""
      ? ""
      : path.startsWith("/")
        ? path
        : `/${path}`;
  if (locale === defaultLocale) {
    return suffix === "" ? "/" : suffix;
  }
  return `/${locale}${suffix}`;
}

/** Strip leading /en is not used; strip /tr etc. to get the path segment for switching. */
export function pathWithoutLocale(pathname: string): string {
  for (const loc of locales) {
    if (loc === defaultLocale) continue;
    if (pathname === `/${loc}`) return "/";
    if (pathname.startsWith(`/${loc}/`)) {
      const rest = pathname.slice(`/${loc}`.length);
      return rest === "" ? "/" : rest;
    }
  }
  return pathname === "" ? "/" : pathname;
}

export function switchLocalePath(pathname: string, target: Locale): string {
  const base = pathWithoutLocale(pathname);
  return localizedPath(target, base);
}
