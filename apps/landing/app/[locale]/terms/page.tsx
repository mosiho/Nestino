import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getSiteUrl } from "@/lib/constants";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";
import { localizedPath } from "@/lib/i18n/paths";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const messages = getMessages(raw);
  const siteUrl = getSiteUrl();
  const locale = raw as Locale;
  const path = localizedPath(locale, "/terms");

  return {
    title: messages.meta.termsTitle,
    description: messages.meta.termsDescription,
    alternates: {
      canonical: path,
      languages: {
        en: `${siteUrl}${localizedPath("en", "/terms")}`,
        tr: `${siteUrl}${localizedPath("tr", "/terms")}`,
        "x-default": `${siteUrl}${localizedPath("en", "/terms")}`,
      },
    },
  };
}

export default async function TermsPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) {
    notFound();
  }
  const messages = getMessages(raw);

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-foreground">
        {messages.legal.termsHeading}
      </h1>
      <p className="mt-6 text-sm text-muted leading-relaxed">
        {messages.legal.termsBody}
      </p>
    </article>
  );
}
