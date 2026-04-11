import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";
import { isVillaPathLang } from "@/lib/villa-lang-segment";

function localeFromPathname(pathname: string): Locale | null {
  for (const loc of locales) {
    if (pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)) {
      return loc;
    }
  }
  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return NextResponse.next();
  }

  if (/\.[^/]+$/.test(pathname)) {
    return NextResponse.next();
  }

  // Property sites on the same host: /sites/{subdomain}/{lang}/...
  if (pathname.startsWith("/sites/")) {
    const parts = pathname.split("/").filter(Boolean);
    const siteSlug = parts[1];
    const maybeLang = parts[2];
    const requestHeaders = new Headers(request.headers);
    if (siteSlug) {
      requestHeaders.set("x-nestino-slug", siteSlug);
    }
    requestHeaders.set("x-nestino-villa-ui", "1");
    if (maybeLang && isVillaPathLang(maybeLang)) {
      requestHeaders.set("x-nestino-villa-lang", maybeLang);
    }
    if (parts.length === 2 && siteSlug) {
      const url = request.nextUrl.clone();
      url.pathname = `/sites/${siteSlug}/en`;
      return NextResponse.redirect(url, 308);
    }
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const nextUrl = request.nextUrl.clone();
    const stripped =
      pathname === "/en" ? "/" : pathname.slice("/en".length) || "/";
    nextUrl.pathname = stripped;
    return NextResponse.redirect(nextUrl, 308);
  }

  const existing = localeFromPathname(pathname);
  if (existing) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-nestino-locale", existing);
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  const url = request.nextUrl.clone();
  url.pathname =
    pathname === "/" ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nestino-locale", defaultLocale);
  return NextResponse.rewrite(url, {
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
