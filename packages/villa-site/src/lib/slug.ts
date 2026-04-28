const VILLA_BASE_DOMAIN =
  process.env.NEXT_PUBLIC_VILLA_BASE_DOMAIN ?? "nestino.com";

/**
 * Maps Host header to tenant subdomain/slug for villa-site routing.
 * Must stay in sync with middleware — kept shared so robots.txt and sitemap.xml
 * can resolve the slug even when those routes bypass middleware.
 */
export function resolveSlug(host: string): string | null {
  const hostname = host.split(":")[0] ?? "";

  if (hostname.endsWith(`.${VILLA_BASE_DOMAIN}`)) {
    const sub = hostname.slice(0, hostname.length - VILLA_BASE_DOMAIN.length - 1);
    return sub || null;
  }

  if (hostname.endsWith(".localhost")) {
    const sub = hostname.slice(0, hostname.indexOf(".localhost"));
    return sub || null;
  }

  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return "silyan";
  }

  return null;
}
