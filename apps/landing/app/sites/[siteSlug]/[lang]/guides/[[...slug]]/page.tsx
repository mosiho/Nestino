import type { Metadata } from "next";

import GuidesCatchAllPage, {
  generateGuidesCatchAllMetadata,
} from "@nestino/villa-site/routes/guides-catchall-page";

export const revalidate = 60;

type Props = { params: Promise<{ siteSlug: string; lang: string; slug?: string[] }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { siteSlug } = await props.params;
  return generateGuidesCatchAllMetadata({
    params: props.params,
    pathPrefix: `/sites/${siteSlug}`,
  });
}

export default async function Page(props: Props) {
  const { siteSlug } = await props.params;
  return <GuidesCatchAllPage params={props.params} pathPrefix={`/sites/${siteSlug}`} />;
}
