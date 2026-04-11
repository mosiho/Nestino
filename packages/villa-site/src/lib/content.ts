import { unstable_cache } from "next/cache";
import { and, eq } from "drizzle-orm";
import {
  getDb,
  isDatabaseConfigured,
  contentPages,
  contentVersions,
  type BodyJson,
} from "@nestino/db";

export type PublishedVersion = {
  id: string;
  pageId: string;
  languageCode: string;
  version: number;
  title: string;
  bodyJson: BodyJson;
  metaTitle: string | null;
  metaDescription: string | null;
  schemaJson: Record<string, unknown> | Record<string, unknown>[] | null;
  publishedAt: Date | null;
};

export type PageWithVersion = {
  page: {
    id: string;
    siteId: string;
    slug: string;
    pageType: string;
  };
  version: PublishedVersion;
};

// Load the current published content version for a page by slug + language.
// Returns null if no published version exists for that lang (caller should
// try the site's default language or show a 404).
export const getPublishedPage = unstable_cache(
  async (
    siteId: string,
    slug: string,
    languageCode: string
  ): Promise<PageWithVersion | null> => {
    if (!isDatabaseConfigured()) return null;

    const db = getDb();

    const rows = await db
      .select({
        page: {
          id: contentPages.id,
          siteId: contentPages.siteId,
          slug: contentPages.slug,
          pageType: contentPages.pageType,
        },
        version: {
          id: contentVersions.id,
          pageId: contentVersions.pageId,
          languageCode: contentVersions.languageCode,
          version: contentVersions.version,
          title: contentVersions.title,
          bodyJson: contentVersions.bodyJson,
          metaTitle: contentVersions.metaTitle,
          metaDescription: contentVersions.metaDescription,
          schemaJson: contentVersions.schemaJson,
          publishedAt: contentVersions.publishedAt,
        },
      })
      .from(contentPages)
      .innerJoin(
        contentVersions,
        and(
          eq(contentVersions.pageId, contentPages.id),
          eq(contentVersions.isCurrent, true),
          eq(contentVersions.status, "published"),
          eq(contentVersions.languageCode, languageCode)
        )
      )
      .where(
        and(eq(contentPages.siteId, siteId), eq(contentPages.slug, slug))
      )
      .limit(1);

    const row = rows[0];
    if (!row) return null;

    return {
      page: row.page,
      version: row.version as PageWithVersion["version"],
    };
  },
  ["published-page"],
  { revalidate: 60, tags: ["content"] }
);