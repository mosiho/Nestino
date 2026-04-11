import type { Metadata } from "next";

import {
  VillaLangLayout,
  generateVillaLangMetadata,
} from "@nestino/villa-site/villa-lang-layout";

type Props = {
  children: React.ReactNode;
  params: Promise<{ siteSlug: string; lang: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { siteSlug } = await props.params;
  const pathPrefix = `/sites/${siteSlug}`;
  return generateVillaLangMetadata({
    children: props.children,
    params: props.params,
    pathPrefix,
  });
}

export default async function SitesPropertyLayout(props: Props) {
  const { siteSlug } = await props.params;
  const pathPrefix = `/sites/${siteSlug}`;
  return <VillaLangLayout {...props} pathPrefix={pathPrefix} />;
}
