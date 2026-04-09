import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { LocaleProvider } from "@/components/i18n/locale-provider";
import { getSiteUrl } from "@/lib/constants";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams(): { locale: Locale }[] {
  return [{ locale: "en" }, { locale: "tr" }];
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) {
    notFound();
  }
  const locale = raw;
  const messages = getMessages(locale);
  const siteUrl = getSiteUrl();

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Nestino",
    url: siteUrl,
    description: messages.meta.organizationDescription,
    email: "hello@nestino.ai",
  };

  return (
    <LocaleProvider locale={locale} messages={messages}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </LocaleProvider>
  );
}
