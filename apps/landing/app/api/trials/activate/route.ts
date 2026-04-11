import { createHash } from "node:crypto";

import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import {
  getDb,
  isDatabaseConfigured,
  siteLanguages,
  sites,
  tenants,
  trials,
} from "@nestino/db";

import { hashCmsApiKey, generateCmsApiKey } from "@/lib/cms-key";
import { getInternalNotifyEmail, getVillaSiteEntryUrl } from "@/lib/constants";
import { enqueueCrawlSiteJob } from "@/lib/engine-trigger";
import {
  rateLimitTrialByEmailHash,
  rateLimitTrialByIp,
} from "@/lib/rate-limit";
import { sendTrialEmails } from "@/lib/resend";
import { getDefaultSiteLanguages } from "@/lib/site-languages";
import { slugifyPropertyName, withSuffix } from "@/lib/slug-utils";
import {
  trialActivateRequestSchema,
  type TrialActivateRequest,
} from "@/lib/validations";

function jsonError(
  code: string,
  message: string,
  status: number,
  details?: Record<string, unknown>
) {
  return NextResponse.json(
    { error: { code, message, details: details ?? {} } },
    { status }
  );
}

function emailHash(email: string): string {
  return createHash("sha256").update(email.toLowerCase()).digest("hex");
}

async function pickUniqueSubdomain(
  db: ReturnType<typeof getDb>,
  propertyName: string
): Promise<string> {
  let candidate = slugifyPropertyName(propertyName);
  for (let i = 0; i < 8; i += 1) {
    const existing = await db
      .select({ id: sites.id })
      .from(sites)
      .where(eq(sites.subdomain, candidate))
      .limit(1);
    if (existing.length === 0) return candidate;
    candidate = withSuffix(
      slugifyPropertyName(propertyName),
      Math.random().toString(36).slice(2, 6)
    );
  }
  return withSuffix(slugifyPropertyName(propertyName), createHash("sha256").update(String(Date.now())).digest("hex").slice(0, 6));
}

async function postCrmWebhook(body: TrialActivateRequest & { demo_url: string }) {
  const url = process.env.CRM_WEBHOOK_URL;
  if (!url) return;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function POST(req: Request) {
  if (!isDatabaseConfigured()) {
    return jsonError(
      "internal_error",
      "Service temporarily unavailable",
      503
    );
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return jsonError("validation_error", "Invalid JSON body", 400);
  }

  const rawObj = raw as Record<string, unknown>;
  if (
    typeof rawObj.website === "string" &&
    rawObj.website.trim().length > 0
  ) {
    return jsonError("validation_error", "Invalid request", 400);
  }

  const parsed = trialActivateRequestSchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    return jsonError("validation_error", "Invalid request", 400, {
      fields: first,
    });
  }

  const data = parsed.data;

  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";
  const ipLimit = await rateLimitTrialByIp(ip);
  if (!ipLimit.success) {
    return jsonError("rate_limited", "Too many requests", 429);
  }

  const eHash = emailHash(data.email);
  const emailLimit = await rateLimitTrialByEmailHash(eHash);
  if (!emailLimit.success) {
    return jsonError("rate_limited", "Too many requests", 429);
  }

  const db = getDb();
  const subdomain = await pickUniqueSubdomain(db, data.property_name);
  const { plaintext: cmsKey, prefix } = generateCmsApiKey();
  const cmsHash = await hashCmsApiKey(cmsKey);

  const trialEnds = new Date();
  trialEnds.setUTCDate(trialEnds.getUTCDate() + 30);

  const demoUrl = getVillaSiteEntryUrl(subdomain);

  try {
    const result = await db.transaction(async (tx) => {
      const [tenant] = await tx
        .insert(tenants)
        .values({
          name: data.property_name,
          slug: subdomain,
          destination: data.destination,
          status: "trial",
          propertyUrl: data.property_url ?? null,
          ownerEmail: data.email,
          ownerPhone: data.whatsapp_e164 ?? null,
        })
        .returning({ id: tenants.id });

      if (!tenant) throw new Error("tenant insert failed");

      const [site] = await tx
        .insert(sites)
        .values({
          tenantId: tenant.id,
          subdomain,
          status: "demo",
          defaultLanguage: "en",
          theme: "dark",
          cmsApiKeyHash: cmsHash,
          cmsApiKeyPrefix: prefix,
        })
        .returning({ id: sites.id });

      if (!site) throw new Error("site insert failed");

      await tx.insert(trials).values({
        tenantId: tenant.id,
        startedAt: new Date(),
        endsAt: trialEnds,
        status: "active",
      });

      const langs = getDefaultSiteLanguages(data.destination);
      await tx.insert(siteLanguages).values(
        langs.map((l) => ({
          siteId: site.id,
          languageCode: l.languageCode,
          tier: l.tier,
          status: l.status,
          launchedAt: l.status === "active" ? new Date() : null,
        }))
      );

      return { tenantId: tenant.id, siteId: site.id };
    });

    try {
      await enqueueCrawlSiteJob({
        tenantId: result.tenantId,
        siteId: result.siteId,
        cmsApiKeyPlaintext: cmsKey,
        subdomain,
      });
    } catch (e) {
      console.error("Crawl enqueue failed", e);
    }

    try {
      await sendTrialEmails({
        toOwner: data.email,
        ownerName: data.property_name,
        demoUrl,
        subdomain,
        internalTo: getInternalNotifyEmail(),
      });
    } catch (e) {
      console.error("Email send failed", e);
    }

    void postCrmWebhook({ ...data, demo_url: demoUrl });

    return NextResponse.json(
      {
        tenant_id: result.tenantId,
        site_id: result.siteId,
        subdomain,
        trial_ends_at: trialEnds.toISOString(),
        demo_url: demoUrl,
      },
      { status: 201 }
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    if (message.includes("unique") || message.includes("duplicate")) {
      return jsonError("conflict", "Could not allocate subdomain", 409);
    }
    console.error("Trial activation failed", e);
    return jsonError("internal_error", "Something went wrong", 500);
  }
}
