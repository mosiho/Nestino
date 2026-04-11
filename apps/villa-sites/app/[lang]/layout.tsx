import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { isLang, type Lang } from "@/lib/i18n";
import { getSiteBySubdomain, getActiveLangs } from "@/lib/tenant";
import SiteHeader from "@/components/site-header";
import StickyCtaBar from "@/components/sticky-cta-bar";
import FloatingWhatsApp from "@/components/floating-whats-app";
import Footer from "@/components/footer";

// Re-export for sitemap / page use
export { getActiveLangs };

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const h = await headers();
  const slug = h.get("x-nestino-slug") ?? "";
  const host = h.get("host") ?? "";
  const ctx = slug ? await getSiteBySubdomain(slug) : null;
  const protocol = host.includes("localhost") ? "http" : "https";
  const siteUrl = `${protocol}://${host}`;

  const activeLangs = ctx ? getActiveLangs(ctx) : ["en"];

  return {
    metadataBase: new URL(siteUrl),
    alternates: {
      languages: Object.fromEntries(
        activeLangs.map((l) => [l, `/${l}`])
      ),
      canonical: `/${lang}`,
    },
    title: {
      default: ctx?.tenant.name ?? "Villa",
      template: `%s | ${ctx?.tenant.name ?? "Villa"}`,
    },
  };
}

export default async function SiteLayout({ children, params }: Props) {
  const { lang } = await params;

  // Validate lang segment
  if (!isLang(lang)) {
    redirect("/en");
  }

  const h = await headers();
  const slug = h.get("x-nestino-slug") ?? "";

  const ctx = slug ? await getSiteBySubdomain(slug) : null;

  // Unknown site → 404
  if (!ctx) {
    notFound();
  }

  const activeLangs = getActiveLangs(ctx);

  // Language not active for this site → redirect to default
  if (!activeLangs.includes(lang)) {
    redirect(`/${ctx.site.defaultLanguage}`);
  }

  return (
    <>
      <SiteHeader
        siteName={ctx.tenant.name}
        lang={lang as Lang}
        activeLangs={activeLangs}
        phone={ctx.tenant.ownerPhone ?? ""}
      />
      <StickyCtaBar
        phone={ctx.tenant.ownerPhone ?? ""}
        lang={lang as Lang}
      />
      <main className="flex-1">{children}</main>
      <FloatingWhatsApp phone={ctx.tenant.ownerPhone ?? ""} />
      <Footer
        siteName={ctx.tenant.name}
        locationLabel={ctx.tenant.locationLabel ?? ""}
        phone={ctx.tenant.ownerPhone ?? ""}
        lang={lang as Lang}
        activeLangs={activeLangs}
      />
    </>
  );
}