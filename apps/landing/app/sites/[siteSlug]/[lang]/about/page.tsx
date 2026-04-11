import type { Metadata } from "next";

import AboutPage, { generateAboutMetadata } from "@nestino/villa-site/routes/about-page";

type Props = { params: Promise<{ siteSlug: string; lang: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { siteSlug } = await props.params;
  return generateAboutMetadata({ params: props.params, pathPrefix: `/sites/${siteSlug}` });
}

export default async function Page(props: Props) {
  const { siteSlug } = await props.params;
  return <AboutPage params={props.params} pathPrefix={`/sites/${siteSlug}`} />;
}
