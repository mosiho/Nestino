"use client";

import { motion, useReducedMotion } from "framer-motion";

import { SectionHeader } from "@/components/ui/section-header";

const milestones = [
  {
    icon: "01",
    title: "More direct inquiries",
    body: "Guests use your site—form, WhatsApp, email—so you can compare volume and quality to your baseline.",
  },
  {
    icon: "02",
    title: "Clearer guest intent",
    body: `Fewer "what's your lowest price?" threads; more dates, party size, and ready-to-book questions.`,
  },
  {
    icon: "03",
    title: "Stronger discovery",
    body: "Better footprint in Google results and AI-style answers that summarize your property accurately.",
  },
  {
    icon: "04",
    title: "Smarter languages",
    body: "Tier-1 pages and FAQs aligned with how international guests actually search your destination.",
  },
  {
    icon: "05",
    title: "A weekly improvement loop",
    body: "Diagnose what's weak, ship fixes, then see what moved—so progress isn't a one-off launch.",
  },
] as const;

export function ProofSection() {
  const reduced = useReducedMotion();

  return (
    <section
      id="proof"
      className="relative scroll-mt-20 overflow-hidden border-b border-border/80 py-20 sm:py-24"
      aria-labelledby="proof-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_50%_-10%,rgba(13,148,136,0.06),transparent_55%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          badge="First 30 days"
          title="What villa owners usually notice first"
          subtitle="A realistic picture of early momentum—not a promise of identical numbers for every property."
          titleId="proof-heading"
        />

        <motion.div
          className="mx-auto mt-10 flex max-w-lg items-center gap-4 rounded-2xl border border-accent/20 bg-accent/[0.04] px-6 py-5"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45 }}
        >
          <span className="text-5xl font-bold tabular-nums tracking-tight text-accent">
            30
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">Day window</p>
            <p className="mt-0.5 text-sm leading-relaxed text-muted">
              When we most often see the first meaningful shifts in inquiries,
              search visibility, and how guests talk to you.
            </p>
          </div>
        </motion.div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {milestones.map((m, i) => (
            <motion.div
              key={m.icon}
              className={`group rounded-2xl border border-border bg-background p-6 shadow-sm transition-colors duration-200 hover:border-accent/30 ${
                i >= 3 ? "sm:col-span-1 lg:col-span-1" : ""
              }`}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.07, duration: 0.45 }}
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent ring-1 ring-accent/20">
                {m.icon}
              </span>
              <h3 className="mt-4 text-base font-semibold text-foreground">
                {m.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {m.body}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.figure
          className="mx-auto mt-12 max-w-2xl rounded-2xl border border-border bg-surface/50 px-6 py-8 text-center shadow-sm sm:px-10"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45 }}
        >
          <span
            className="mx-auto block font-serif text-5xl leading-none text-accent/20"
            aria-hidden
          >
            &ldquo;
          </span>
          <blockquote className="mt-2 text-lg leading-relaxed text-foreground">
            If direct inquiries rise and OTA share of voice drops—even a
            little—that&apos;s margin back in your pocket.
          </blockquote>
          <figcaption className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted">
            Nestino playbook
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
