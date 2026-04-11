import type { Metadata } from "next";

import VillaHomePage, {
  generateVillaHomeMetadata,
} from "@nestino/villa-site/routes/home";

type Props = { params: Promise<{ siteSlug: string; lang: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { siteSlug } = await props.params;
  const pathPrefix = `/sites/${siteSlug}`;
  return generateVillaHomeMetadata({ params: props.params, pathPrefix });
}

export default async function SitesPropertyHome(props: Props) {
  const { siteSlug } = await props.params;
  const pathPrefix = `/sites/${siteSlug}`;
  return <VillaHomePage params={props.params} pathPrefix={pathPrefix} />;
}
