import type { Metadata } from "next";

import PrivacyPage, { generatePrivacyMetadata } from "@nestino/villa-site/routes/privacy-page";

type Props = { params: Promise<{ siteSlug: string; lang: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { siteSlug } = await props.params;
  return generatePrivacyMetadata({ params: props.params, pathPrefix: `/sites/${siteSlug}` });
}

export default async function Page(props: Props) {
  const { siteSlug } = await props.params;
  return <PrivacyPage params={props.params} pathPrefix={`/sites/${siteSlug}`} />;
}
