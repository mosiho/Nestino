import { Analytics } from "@vercel/analytics/react";
import { Fraunces, Inter, Noto_Naskh_Arabic, Noto_Sans_Arabic } from "next/font/google";
import type { Metadata } from "next";
import { headers } from "next/headers";

import { PostHogProvider } from "@/components/analytics/posthog-provider";
import { htmlLang, isLocale, type Locale } from "@/lib/i18n/config";
import { getMetadataBaseUrl } from "@/lib/constants";

import { isLang, isRtl, htmlLang as villaHtmlLang, type Lang } from "@nestino/villa-site/lib/i18n";
import { getSiteBySubdomain } from "@nestino/villa-site/lib/tenant";

import "./globals.css";
import "./sites/villa-site-tokens.css";

const interMarketing = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const interVilla = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-arabic",
  display: "swap",
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-naskh-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: getMetadataBaseUrl(),
  title: {
    default: "Nestino — Zero-commission direct bookings for villas",
    template: "%s | Nestino",
  },
  description:
    "Fill your rooms with direct bookings. Nestino drives qualified guests to your villa—Google, AI search, and high-converting channels. No OTA commissions. First month free.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const h = await headers();
  const isVillaUi = h.get("x-nestino-villa-ui") === "1";
  const slug = h.get("x-nestino-slug") ?? "";
  const villaLangHeader = h.get("x-nestino-villa-lang");

  if (isVillaUi && slug) {
    let ctx: Awaited<ReturnType<typeof getSiteBySubdomain>> = null;
    try {
      ctx = await getSiteBySubdomain(slug);
    } catch {
      ctx = null;
    }
    const rawVillaLang = villaLangHeader && isLang(villaLangHeader) ? villaLangHeader : "en";
    const vLang: Lang = rawVillaLang;
    const accentHex = ctx?.site.accentHex ?? null;
    const isDark = ctx?.site.theme === "dark";
    const themeClass = isDark ? "theme-dark" : "";
    const accentStyles = accentHex
      ? `.villa-site-root {
        --accent-500: ${accentHex};
        --accent-600: color-mix(in srgb, ${accentHex} 88%, black);
        --accent-400: color-mix(in srgb, ${accentHex} 72%, white);
        --accent-muted: color-mix(in srgb, ${accentHex} 20%, transparent);
        --ring-accent: color-mix(in srgb, ${accentHex} 40%, transparent);
      }`
      : "";

    const fontVars = `${fraunces.variable} ${interVilla.variable} ${notoSansArabic.variable} ${notoNaskhArabic.variable}`;

    return (
      <html
        lang={villaHtmlLang(vLang)}
        dir={isRtl(vLang) ? "rtl" : "ltr"}
        className={`villa-site-root ${fontVars} font-sans ${themeClass}`.trim()}
      >
        <head>
          {ctx?.site.gscVerificationToken && (
            <meta name="google-site-verification" content={ctx.site.gscVerificationToken} />
          )}
          {accentStyles ? (
            <style dangerouslySetInnerHTML={{ __html: accentStyles }} />
          ) : null}
        </head>
        <body className="min-h-dvh flex flex-col">
          <PostHogProvider>{children}</PostHogProvider>
          <Analytics />
        </body>
      </html>
    );
  }

  const raw = h.get("x-nestino-locale");
  const locale: Locale = raw && isLocale(raw) ? raw : "en";
  const lang = htmlLang(locale);
  const htmlClass =
    locale === "tr"
      ? `${interMarketing.variable} font-sans is-locale-tr`
      : `${interMarketing.variable} font-sans`;

  return (
    <html lang={lang} className={htmlClass}>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <PostHogProvider>
          {children}
        </PostHogProvider>
        <Analytics />
      </body>
    </html>
  );
}
