import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { headers } from "next/headers";
import { Analytics } from "@vercel/analytics/react";

import { isLang, isRtl, htmlLang, type Lang } from "@nestino/villa-site/lib/i18n";
import { getSiteBySubdomain } from "@nestino/villa-site/lib/tenant";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  // Optical sizing + variable weight
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  // Each page overrides via generateMetadata in [lang]/layout.tsx
  title: "Silyan Villas",
  description: "Private villas with pools in the mountains above Antalya.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const h = await headers();
  const slug = h.get("x-nestino-slug") ?? "";
  const rawLang = h.get("x-nestino-lang") ?? "en";
  const lang: Lang = isLang(rawLang) ? rawLang : "en";

  // Load site for accent + theme — cached 60s
  const ctx = slug ? await getSiteBySubdomain(slug) : null;

  const accentHex = ctx?.site.accentHex ?? null;
  const isDark = ctx?.site.theme === "dark";

  // Build tenant-specific CSS variable overrides for the accent colour.
  // These override the :root defaults in globals.css.
  // We compute a rough darker/lighter variant — operators can refine later.
  const accentStyles = accentHex
    ? `
      :root {
        --accent-500: ${accentHex};
        --accent-600: color-mix(in srgb, ${accentHex} 88%, black);
        --accent-400: color-mix(in srgb, ${accentHex} 72%, white);
        --accent-muted: color-mix(in srgb, ${accentHex} 20%, transparent);
        --ring-accent: color-mix(in srgb, ${accentHex} 40%, transparent);
      }
    `
    : "";

  const fontVars = `${fraunces.variable} ${inter.variable}`;
  const themeClass = isDark ? "theme-dark" : "";

  return (
    <html
      lang={htmlLang(lang)}
      dir={isRtl(lang) ? "rtl" : "ltr"}
      className={`${fontVars} ${themeClass}`.trim()}
    >
      <head>
        {/* GSC verification */}
        {ctx?.site.gscVerificationToken && (
          <meta
            name="google-site-verification"
            content={ctx.site.gscVerificationToken}
          />
        )}
        {/* Per-tenant accent colour override */}
        {accentStyles && (
          <style dangerouslySetInnerHTML={{ __html: accentStyles }} />
        )}
      </head>
      <body className="min-h-dvh flex flex-col font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}