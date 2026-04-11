import type { Metadata } from "next";

import LocationPage, { generateLocationMetadata } from "@nestino/villa-site/routes/location-page";

type Props = { params: Promise<{ siteSlug: string; lang: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { siteSlug } = await props.params;
  return generateLocationMetadata({ params: props.params, pathPrefix: `/sites/${siteSlug}` });
}

export default async function Page(props: Props) {
  const { siteSlug } = await props.params;
  return <LocationPage params={props.params} pathPrefix={`/sites/${siteSlug}`} />;
}
