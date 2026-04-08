import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { PostHogProvider } from "@/components/analytics/posthog-provider";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { getSiteUrl } from "@/lib/constants";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Nestino",
    title: "Nestino — Zero-commission direct bookings for villas",
    description:
      "Fill your rooms directly. No middleman. No commission. Your bookings, your margin.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nestino — Zero-commission direct bookings for villas",
    description:
      "Direct bookings for premium villas. Keep 100% of every booking.",
  },
  alternates: {
    canonical: "/",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Nestino",
  url: siteUrl,
  description:
    "Zero-commission direct booking growth for premium villas and boutique stays.",
  email: "hello@nestino.ai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans min-h-screen flex flex-col bg-background text-foreground antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <PostHogProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </PostHogProvider>
        <Analytics />
      </body>
    </html>
  );
}
