import type { Metadata } from "next";

import VillaDetailPage, {
  generateVillaDetailMetadata,
} from "@nestino/villa-site/routes/villa-detail";

type Props = { params: Promise<{ siteSlug: string; lang: string; slug: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { siteSlug, lang, slug } = await props.params;
  const pathPrefix = `/sites/${siteSlug}`;
  return generateVillaDetailMetadata({
    params: Promise.resolve({ lang, slug, siteSlug }),
    pathPrefix,
  });
}

export default async function Page({ params }: Props) {
  const { siteSlug, lang, slug } = await params;
  const pathPrefix = `/sites/${siteSlug}`;
  return <VillaDetailPage params={{ lang, slug }} pathPrefix={pathPrefix} />;
}
