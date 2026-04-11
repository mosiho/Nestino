const BASE = "https://www.silyanvillas.com/wp-content/uploads/2024/07";

export const HERO_VIDEO = `${BASE}/06293.webm`;
export const HERO_POSTER = `${BASE}/DSC00636-1.webp`;

export const THE_STAY_IMAGE = `${BASE}/DSC00636-1.webp`;
export const LOCATION_IMAGE = `${BASE}/konyaalti.webp`;

export type VillaImageSet = {
  card: string;
  gallery: string[];
};

export const VILLA_IMAGES: Record<string, VillaImageSet> = {
  badem: {
    card: `${BASE}/VillaBadem1.webp`,
    gallery: [
      `${BASE}/VillaBadem1.webp`,
      `${BASE}/VillaBadem2.webp`,
      `${BASE}/DSC00573.webp`,
      `${BASE}/DSC00576.webp`,
      `${BASE}/DSC00578.webp`,
      `${BASE}/DSC00580.webp`,
      `${BASE}/DSC00587.webp`,
      `${BASE}/DSC00590.webp`,
      `${BASE}/DSC00592.webp`,
      `${BASE}/DSC00595.webp`,
      `${BASE}/DSC00599.webp`,
      `${BASE}/DSC00602.webp`,
      `${BASE}/DSC00606.webp`,
      `${BASE}/DSC00608.webp`,
      `${BASE}/DSC00612.webp`,
    ],
  },
  defne: {
    card: `${BASE}/VillaDefne.webp`,
    gallery: [
      `${BASE}/VillaDefne.webp`,
      `${BASE}/defne2.webp`,
      `${BASE}/villadefne-2.webp`,
      `${BASE}/DSC00482.webp`,
      `${BASE}/DSC00488-1.webp`,
      `${BASE}/DSC00494.webp`,
      `${BASE}/DSC00501-1.webp`,
      `${BASE}/DSC00518.webp`,
      `${BASE}/DSC00524.webp`,
      `${BASE}/DSC00545-1.webp`,
      `${BASE}/DSC00550.webp`,
      `${BASE}/DSC00563.webp`,
      `${BASE}/DSC00566.webp`,
      `${BASE}/DSC00616.webp`,
      `${BASE}/DSC00621.webp`,
      `${BASE}/DSC00629.webp`,
      `${BASE}/DSC00634.webp`,
      `${BASE}/DSC00635.webp`,
      `${BASE}/DSC00636.webp`,
      `${BASE}/DSC00640.webp`,
      `${BASE}/DSC00641.webp`,
      `${BASE}/DSC00646.webp`,
      `${BASE}/DSC00651.webp`,
    ],
  },
  incir: {
    card: `${BASE}/VillaIncir-1.webp`,
    gallery: [
      `${BASE}/VillaIncir-1.webp`,
      `${BASE}/incir1.webp`,
      `${BASE}/incir2.webp`,
      `${BASE}/DSC00295-1.webp`,
      `${BASE}/DSC00299.webp`,
      `${BASE}/DSC00307.webp`,
      `${BASE}/DSC00310-1.webp`,
      `${BASE}/DSC00653.webp`,
      `${BASE}/DSC00654.webp`,
      `${BASE}/DSC00660.webp`,
      `${BASE}/DSC00663.webp`,
      `${BASE}/DSC00665.webp`,
      `${BASE}/DSC00666.webp`,
      `${BASE}/DSC00667.webp`,
      `${BASE}/DSC00671.webp`,
      `${BASE}/DSC00680.webp`,
      `${BASE}/DSC00681.webp`,
      `${BASE}/DSC00686.webp`,
    ],
  },
};
