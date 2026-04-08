import type { Config } from "tailwindcss";

import nestinoPreset from "@nestino/config/tailwind-preset";

const config: Config = {
  presets: [nestinoPreset],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;
