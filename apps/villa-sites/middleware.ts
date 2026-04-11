import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isLang } from "@/lib/i18n";

const VILLA_BASE_DOMAIN =
  process.env.NEXT_PUBLIC_VILLA_BASE_DOMAIN ?? "nestino.com";

// Paths that bypass tenancy + language routing entirely
const BYPASS_PREFIXES = ["/api/", "/_next/", "/images/", "/favicon.ico"];
const BYPASS_EXACT = new Set(["/robots.txt", "/sitemap.xml"]);
const STATIC_EXTENSION_RE = /\.[^/]+$/;

// ---------------------------------------------------------------------------
// Slug resolution
// ---------------------------------------------------------------------------

function resolveSlug(host: string): string | null {
  // Strip port (for local dev)
  const hostname = host.split(":")[0] ?? "";

  // *.nestino.com → extract subdomain
  if (hostname.endsWith(`.${VILLA_BASE_DOMAIN}`)) {
    const sub = hostname.slice(0, hostname.length - VILLA_BASE_DOMAIN.length - 1);
    return sub || null;
  }

  // Local dev: {slug}.localhost
  if (hostname.endsWith(".localhost")) {
    const sub = hostname.slice(0, hostname.indexOf(".localhost"));
    return sub || null;
  }

  // Plain localhost (no subdomain) — return 'silyan' for dev convenience.
  // The dev fallback in lib/tenant.ts serves the Silyan context regardless of slug.
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return "silyan";
  }

  // Custom domain: treat the full hostname as the lookup key.
  // The DB query in lib/tenant.ts handles custom_domain lookup separately.
  // For now, return null — custom domain support comes post-MVP.
  return null;
}

// ---------------------------------------------------------------------------
// Language segment extraction
// ---------------------------------------------------------------------------

function langFromPathname(pathname: string): string | null {
  const segment = pathname.split("/")[1]; // pathname starts with '/'
  if (segment && isLang(segment)) return segment;
  return null;
}

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Pass through static assets and API routes
  if (
    BYPASS_EXACT.has(pathname) ||
    BYPASS_PREFIXES.some((p) => pathname.startsWith(p)) ||
    STATIC_EXTENSION_RE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const host = request.headers.get("host") ?? "";
  const slug = resolveSlug(host);

  // Unknown host — no matching slug (could be direct IP, unconfigured domain, etc.)
  if (!slug) {
    return new NextResponse("Not found", { status: 404 });
  }

  const lang = langFromPathname(pathname);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nestino-slug", slug);

  // Root path → redirect to /{defaultLang}/
  // We don't know the site's DB default_language at middleware time (no DB on edge),
  // so we redirect to /en/ which is always Tier 1. The layout will redirect
  // further if en is not active for this site.
  if (pathname === "/" || pathname === "") {
    const url = request.nextUrl.clone();
    url.pathname = "/en";
    return NextResponse.redirect(url, 308);
  }

  // Valid lang segment present → continue, attach headers
  if (lang) {
    requestHeaders.set("x-nestino-lang", lang);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Unknown first segment → rewrite to /en/{pathname}
  // The layout will validate if 'en' is active for this site.
  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname}`;
  requestHeaders.set("x-nestino-lang", "en");
  return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};