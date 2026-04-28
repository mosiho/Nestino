import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { eq, and, asc } from "drizzle-orm";
import { getDb, isDatabaseConfigured, contentPages, contentVersions } from "@nestino/db";
import { resolveSiteContext, getActiveLangs } from "@nestino/villa-site/lib/tenant";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const h = await headers();
  const host = h.get("host") ?? "";
  const protocol = host.includes("localhost") ? "http" : "https";
  const base = `${protocol}://${host}`;

  const ctx = await resolveSiteContext(host, h.get("x-nestino-slug"));
  if (!ctx || !isDatabaseConfigured()) return [];

  const activeLangs = getActiveLangs(ctx);
  if (activeLangs.length === 0) return [];

  const db = getDb();

  // Fetch all published pages for this site
  const pages = await db
    .selectDistinctOn([contentPages.slug], {
      slug: contentPages.slug,
      publishedAt: contentVersions.publishedAt,
    })
    .from(contentPages)
    .innerJoin(
      contentVersions,
      and(
        eq(contentVersions.pageId, contentPages.id),
        eq(contentVersions.isCurrent, true),
        eq(contentVersions.status, "published")
      )
    )
    .where(eq(contentPages.siteId, ctx.site.id))
    .orderBy(asc(contentPages.slug));

  const entries: MetadataRoute.Sitemap = [];

  for (const lang of activeLangs) {
    entries.push({
      url: `${base}/${lang}/`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(activeLangs.map((l) => [l, `${base}/${l}/`])),
      },
    });
    entries.push({
      url: `${base}/${lang}/guides`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(activeLangs.map((l) => [l, `${base}/${l}/guides`])),
      },
    });
  }

  for (const page of pages) {
    for (const lang of activeLangs) {
      const pagePath = page.slug ? `/${page.slug}` : "";
      entries.push({
        url: `${base}/${lang}${pagePath}`,
        lastModified: page.publishedAt ?? new Date(),
        alternates: {
          languages: Object.fromEntries(
            activeLangs.map((l) => [l, `${base}/${l}${pagePath}`])
          ),
        },
      });
    }
  }

  return entries;
}