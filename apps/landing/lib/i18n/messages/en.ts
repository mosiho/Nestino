export const enMessages = {
  meta: {
    homeTitle: "Nestino — Your villa, your guests, zero commission",
    homeDescription:
      "Stop giving 15-30% to OTAs. Nestino builds your direct booking engine—Google, AI search, and high-converting channels bring qualified guests straight to you. First month free.",
    privacyTitle: "Privacy Policy",
    privacyDescription: "How Nestino handles data for the marketing site and trials.",
    termsTitle: "Terms of Service",
    termsDescription: "Terms for using Nestino marketing site and trial activation.",
    ogLocale: "en_US",
    organizationDescription:
      "Empowering villa direct bookings with AI-driven growth.",
    websiteDescription:
      "Empowering villa direct bookings with AI-driven growth.",
  },
  languageSwitcher: {
    label: "Language",
    english: "English",
    turkish: "Türkçe",
    currentAria: "Current language: {lang}",
  },
  nav: {
    onThisPage: "On this page",
    overview: "Overview",
    problem: "Problem",
    engine: "Engine",
    howItWorks: "How it works",
    proof: "Results",
    pricing: "Pricing",
    faq: "FAQ",
    contact: "WhatsApp",
    whatsapp: "WhatsApp",
    whatsappShort: "WA",
    messageWhatsApp: "Message on WhatsApp",
    messageWhatsAppShort: "Chat",
  },
  whatsappPrefill:
    "Hi Nestino — I’d like to learn about direct bookings for my property.",
  hero: {
    badge: "Zero commission · direct bookings",
    titleBefore: "Your villa deserves",
    titleHighlight: "direct",
    titleAfter: "bookings — not OTA taxes",
    body:
      "Guests find you through Google and AI search, land on a site built to convert, and book directly. No middleman takes a cut. Your property, your guests, your margin.",
    cta: "Chat on WhatsApp",
    footnote: "We reply on WhatsApp — usually within one business day.",
    visualCards: [
      {
        title: "Discovery",
        subtitle: "Google & AI-ready answers",
      },
      {
        title: "Your villa presence",
        subtitle: "Fast, trustworthy, mobile-first",
      },
      {
        title: "Direct bookings",
        subtitle: "Inquiries straight to you",
      },
    ],
  },
  problem: {
    badge: "The problem",
    title: "You’re paying OTAs to sell what’s already yours",
    subtitle:
      "Premium villas lose margin and control when discovery happens on someone else’s rails. Direct booking is the lever you can own—without giving up a commission on every stay.",
    items: [
      {
        title: "15–30% of every booking goes to OTAs",
        body: "Commissions quietly eat your margin night after night—while you still do the hosting work.",
      },
      {
        title: "Guests can’t find you directly",
        body: "If you’re invisible on Google and AI answers, demand gets routed to OTAs and aggregators first.",
      },
      {
        title: "Empty nights cost you—OTAs won’t fix that",
        body: "OTAs optimize for their marketplace—not for your calendar. Direct demand is how you protect ADR and occupancy.",
      },
    ],
    disclaimer:
      "Illustrative context: OTAs capture a large share of online travel demand in many markets. Outcomes vary by property—Nestino focuses on measurable movement in direct inquiries and booking intent.",
  },
  engine: {
    badge: "The engine",
    title: "One system: traffic in, qualified leads out",
    subtitle:
      "Guests discover you across search and AI surfaces. Nestino routes intent into your direct booking funnel—no OTA in the middle, no commission on the conversion.",
    hubName: "Nestino",
    hubSubtitle: "Engine",
    hubMeta: "routing · optimization",
    srHeading: "Nestino engine connects traffic sources to your villa leads",
    sources: {
      google: "Google",
      chatgpt: "ChatGPT",
      perplexity: "Perplexity",
      instagram: "Instagram",
      direct: "Direct",
    },
    outputs: {
      inquiry: "Direct inquiry",
      whatsapp: "WhatsApp lead",
      phone: "Phone call",
      email: "Email booking",
    },
    stats: [
      { key: "5+ sources", value: "Search, AI, social & direct" },
      { key: "Zero commissions", value: "Keep every dollar on direct stays" },
      { key: "Lead routing", value: "Inquiry → your inbox & WhatsApp" },
    ],
  },
  howItWorks: {
    badge: "How it works",
    title: "From invisible to fully booked—directly",
    subtitle:
      "Three clear steps. Built for owners who want occupancy and margin—not another dashboard to babysit.",
    steps: [
      {
        n: "01",
        title: "We set up your direct booking channel",
        body: "A premium villa presence engineered to convert—fast, mobile-first, and built to earn trust in seconds.",
      },
      {
        n: "02",
        title: "Our engine drives qualified guests to you",
        body: "Continuous discovery work across search + AI surfaces routes high-intent travelers toward your direct funnel.",
      },
      {
        n: "03",
        title: "You keep 100% of every booking",
        body: "No OTA commission on direct stays. More margin on the same guest—reinvested into your property, not a marketplace.",
      },
    ],
  },
  proof: {
    badge: "First 30 days",
    title: "What villa owners usually notice first",
    subtitle:
      "A realistic picture of early momentum—not a promise of identical numbers for every property.",
    dayWindow: "Day window",
    dayWindowBody:
      "When we most often see the first meaningful shifts in inquiries, search visibility, and how guests talk to you.",
    milestones: [
      {
        title: "More direct inquiries",
        body: "Guests use your site—form, WhatsApp, email—so you can compare volume and quality to your baseline.",
      },
      {
        title: "Clearer guest intent",
        body: "Fewer “what’s your lowest price?” threads; more dates, party size, and ready-to-book questions.",
      },
      {
        title: "Stronger discovery",
        body: "Better footprint in Google results and AI-style answers that summarize your property accurately.",
      },
      {
        title: "Smarter languages",
        body: "Tier-1 pages and FAQs aligned with how international guests actually search your destination.",
      },
      {
        title: "A weekly improvement loop",
        body: "Diagnose what’s weak, ship fixes, then see what moved—so progress isn’t a one-off launch.",
      },
    ],
    quote:
      "If direct inquiries rise and OTA share of voice drops—even a little—that’s margin back in your pocket.",
    quoteCaption: "Nestino playbook",
  },
  pricing: {
    badge: "Pricing",
    title: "Keep the booking. Skip the commission.",
    subtitle:
      "Choose monthly, quarterly, or annual billing. Every tier includes the same product—pick the cadence that fits how you run the property. A one-time $99 setup fee covers getting you launched.",
    tiers: [
      { id: "monthly" as const, badge: "STARTER", savings: null as string | null },
      { id: "quarterly" as const, badge: "GROWTH", savings: "Save ~$198" },
      { id: "annual" as const, badge: "SCALE", savings: "Save ~$1,189" },
    ],
    prices: {
      monthly: { price: "$399", period: "/month" },
      quarterly: { price: "$999", period: "/quarter" },
      annual: { price: "$3,599", period: "/year" },
    },
    mostPopular: "Most popular",
    bestValue: "Best value",
    firstMonthFree: "First month free",
    whatsAppCta: "Chat on WhatsApp",
    includedTitle: "What’s included",
    includedIntro:
      "All plans include the same features. We charge a one-time $99 setup fee when you start. See our",
    includedTermsLink: "Terms",
    includedIntroAfter: "for details.",
    includedBullets: [
      "Direct booking channel built to convert (speed, trust, mobile)",
      "Onboarding edits so your property story matches how you host",
      "Autonomous growth loop: discovery + on-site optimization",
      "AI-era readiness: structured answers, FAQs, entity clarity",
      "Destination-aware multilingual Tier‑1 seeding",
    ],
  },
  faq: {
    badge: "FAQ",
    title: "Direct bookings, explained plainly",
    subtitle: "What we do, what we don’t, and how this differs from paying commissions to OTAs.",
    items: [
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
    ],
  },
  finalCta: {
    badge: "Contact",
    title: "Message us on WhatsApp",
    subtitle:
      "No contact form — reach our team directly. Ask about direct bookings, pricing, or how Nestino fits your villa.",
    primaryButton: "Open WhatsApp",
    phoneHint: "WhatsApp number",
    phoneDisplay: "+90 534 619 16 92",
    imageAlt:
      "Premium villa with pool—example of the high-trust presence owners get with Nestino.",
  },
  footer: {
    tagline:
      "Empowering villa direct bookings with AI-driven growth.",
    legal: "Legal",
    privacy: "Privacy",
    terms: "Terms",
  },
  legal: {
    privacyHeading: "Privacy Policy",
    privacyBody:
      "Placeholder. This page is a structural stub for Nestino.ai. Replace with counsel-approved privacy policy before collecting production traffic. It should describe what you collect on the landing form (email, optional phone, property URL), analytics providers (Vercel Analytics, PostHog), email delivery (Resend), retention, and data subject rights.",
    termsHeading: "Terms of Service",
    termsBody:
      "Placeholder. Replace with production terms covering the trial, subscription ($399/mo or other billing options after the free month), acceptable use, intellectual property, limitation of liability, and governing law. Align with your billing flow when Stripe is enabled in the operator console.",
  },
  propertySites: {
    title: "Live property sites",
    subtitle:
      "Guest-facing sites we ship for owners—hosted here on Nestino so you can open them in one click.",
    visitLabel: "Open site",
    silyanName: "Silyan Villas",
    silyanHint: "Demo · Antalya, Turkey · multilingual",
  },
  demo: {
    previewTitle: "This is your new site — live preview",
    previewSr: "Live preview",
    claim: "Claim",
    claimFull: "Claim this site",
    backHome: "Back to Nestino",
    notFoundTitle: "Demo not found",
    notFoundBody:
      "We couldn’t find a live preview for that link. Start on the homepage to activate a trial or ask for your pre-built site.",
  },
};

export type Messages = typeof enMessages;
