import type { Metadata } from "next";

import VillasIndexPage, {
  generateVillasIndexMetadata,
} from "@nestino/villa-site/routes/villas-index";

type Props = { params: Promise<{ siteSlug: string; lang: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { siteSlug } = await props.params;
  const pathPrefix = `/sites/${siteSlug}`;
  return generateVillasIndexMetadata({ params: props.params, pathPrefix });
}

export default async function Page(props: Props) {
  const { siteSlug } = await props.params;
  const pathPrefix = `/sites/${siteSlug}`;
  return <VillasIndexPage params={props.params} pathPrefix={pathPrefix} />;
}
