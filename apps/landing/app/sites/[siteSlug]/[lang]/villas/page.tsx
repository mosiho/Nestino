import type { Metadata } from "next";

import VillasIndexPage, {
  villasIndexMetadata,
} from "@nestino/villa-site/routes/villas-index";

type Props = { params: Promise<{ siteSlug: string; lang: string }> };

export const metadata: Metadata = villasIndexMetadata;

export default async function Page(props: Props) {
  const { siteSlug } = await props.params;
  const pathPrefix = `/sites/${siteSlug}`;
  return <VillasIndexPage params={props.params} pathPrefix={pathPrefix} />;
}
