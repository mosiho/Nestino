import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { headers } from "next/headers";

import { PostHogProvider } from "@/components/analytics/posthog-provider";
import { htmlLang, isLocale, type Locale } from "@/lib/i18n/config";
import { getSiteUrl } from "@/lib/constants";

import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist-sans",
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
  const raw = h.get("x-nestino-locale");
  const locale: Locale = raw && isLocale(raw) ? raw : "en";
  const lang = htmlLang(locale);
  const htmlClass =
    locale === "tr"
      ? `${inter.variable} font-sans is-locale-tr`
      : `${inter.variable} font-sans`;

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
