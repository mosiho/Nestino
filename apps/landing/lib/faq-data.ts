export type FaqEntry = {
  id: string;
  question: string;
  answer: string;
};

export const faqEntries: FaqEntry[] = [
  {
    id: "what-you-get",
    question: "What does Nestino actually do for my villa?",
    answer:
      "We build and run a direct booking growth system: a premium guest-facing presence plus continuous work to bring qualified demand to you—across Google and AI answers—so more guests reach you without an OTA taking a cut.",
  },
  {
    id: "vs-ota",
    question: "How is Nestino different from an OTA?",
    answer:
      "OTAs charge commissions on bookings that flow through their marketplace. Nestino is a flat subscription focused on helping guests discover and contact you directly—so you keep 100% of the revenue on direct stays.",
  },
  {
    id: "no-pms",
    question: "Is Nestino a PMS or channel manager?",
    answer:
      "No. We’re not replacing your operations stack. Nestino is focused on direct demand: discovery, conversion, and ongoing optimization. Keep your existing tools for availability and channels if you use them.",
  },
  {
    id: "trial",
    question: "How does the free month work?",
    answer:
      "Your first month is free with no credit card required. We’ll implement reasonable edits during the trial. After 30 days, continue from $399/mo (or quarterly/annual billing on the pricing page) or walk away—no lock-in.",
  },
  {
    id: "zero-commission",
    question: "Do you take a commission on bookings?",
    answer:
      "No. Nestino does not charge a per-booking commission. The goal is to grow direct inquiries and direct stays—your margin stays yours.",
  },
  {
    id: "data",
    question: "Who owns my content and data?",
    answer:
      "You do. Your property story, imagery, and published pages remain yours. Nestino operates the infrastructure and optimization loop on your behalf under our terms.",
  },
  {
    id: "languages",
    question: "Do you support multiple languages?",
    answer:
      "Yes. English is always included, and we seed additional Tier‑1 languages based on your destination (for example Chinese alongside English for Bali/Thailand, or German/French for Europe).",
  },
  {
    id: "ai-search",
    question: "Why does “AI search” matter for villas?",
    answer:
      "Travelers increasingly ask ChatGPT, Perplexity, and Google AI Overviews for recommendations. We structure your presence so you’re easier to cite and trust—without sacrificing classic search fundamentals.",
  },
  {
    id: "pricing-after",
    question: "What happens after the trial?",
    answer:
      "If you want to keep the momentum, stay on from $399/mo or choose a longer billing term. You keep the direct channel live and the optimization loop running. See Terms for full details.",
  },
];
