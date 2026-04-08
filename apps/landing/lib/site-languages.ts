import type { DestinationValue } from "./constants";

export type SiteLanguageSeed = {
  languageCode: string;
  tier: number;
  status: "active" | "planned" | "paused";
};

/** Per [multilingual-spec](../../docs/02-engine/multilingual-spec.md) destination map (Tier 1 at trial). */
export function getDefaultSiteLanguages(
  destination: DestinationValue
): SiteLanguageSeed[] {
  switch (destination) {
    case "bali":
    case "thailand":
      return [
        { languageCode: "en", tier: 1, status: "active" },
        { languageCode: "zh-Hans", tier: 1, status: "active" },
      ];
    case "europe":
      return [
        { languageCode: "en", tier: 1, status: "active" },
        { languageCode: "de", tier: 1, status: "active" },
        { languageCode: "fr", tier: 1, status: "active" },
      ];
    case "caribbean":
      return [{ languageCode: "en", tier: 1, status: "active" }];
    case "other":
    default:
      return [{ languageCode: "en", tier: 1, status: "active" }];
  }
}
