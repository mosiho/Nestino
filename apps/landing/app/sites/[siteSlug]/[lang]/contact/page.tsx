import type { Metadata } from "next";

import ContactPage, { generateContactMetadata } from "@nestino/villa-site/routes/contact-page";

type Props = { params: Promise<{ siteSlug: string; lang: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { siteSlug } = await props.params;
  return generateContactMetadata({ params: props.params, pathPrefix: `/sites/${siteSlug}` });
}

export default async function Page(props: Props) {
  const { siteSlug } = await props.params;
  return <ContactPage params={props.params} pathPrefix={`/sites/${siteSlug}`} />;
}
