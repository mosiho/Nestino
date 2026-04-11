import type { Config } from "tailwindcss";

import nestinoPreset from "@nestino/config/tailwind-preset";

const config: Config = {
  presets: [nestinoPreset],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/villa-site/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "v-bg": "var(--color-bg)",
        "v-surface": "var(--color-surface)",
        "v-text": "var(--color-text-primary)",
        "v-text-secondary": "var(--color-text-secondary)",
        "v-text-muted": "var(--color-text-muted)",
        "v-border": "var(--color-border)",
        "v-border-strong": "var(--color-border-strong)",
        "v-gold": "var(--gold-accent)",
        "v-gold-muted": "var(--gold-muted)",
        "v-overlay": "var(--color-overlay)",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      fontSize: {
        display: [
          "clamp(2.25rem, 6vw, 4rem)",
          { lineHeight: "1.08", fontWeight: "600", letterSpacing: "-0.01em" },
        ],
        h1: [
          "clamp(1.75rem, 4.5vw, 2.75rem)",
          { lineHeight: "1.12", fontWeight: "600", letterSpacing: "-0.01em" },
        ],
        h2: [
          "clamp(1.375rem, 3.5vw, 2.125rem)",
          { lineHeight: "1.18", fontWeight: "600" },
        ],
        h3: [
          "clamp(1.125rem, 2.5vw, 1.5rem)",
          { lineHeight: "1.25", fontWeight: "600" },
        ],
      },
      maxWidth: {
        content: "1200px",
      },
      zIndex: {
        "sticky-header": "40",
        "sticky-cta": "45",
        "floating-wa": "50",
        "drawer-backdrop": "90",
        drawer: "95",
        lightbox: "100",
      },
      boxShadow: {
        "v-sm": "0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.04)",
        "v-md": "0 4px 12px 0 rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.06)",
        "v-lg":
          "0 20px 56px 0 rgb(0 0 0 / 0.10), 0 6px 16px -4px rgb(0 0 0 / 0.06)",
        "v-glow": "var(--shadow-glow)",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-out-right": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(100%)" },
        },
        "gentle-pulse": {
          "0%, 100%": { opacity: "0.6", transform: "translateY(0)" },
          "50%": { opacity: "1", transform: "translateY(6px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-in": "fade-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "slide-in-right":
          "slide-in-right 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "slide-out-right":
          "slide-out-right 0.25s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "gentle-pulse": "gentle-pulse 2.5s ease-in-out infinite",
      },
    },
  },
};

export default config;
