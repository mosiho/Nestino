import { AnimateIn } from "@/components/ui/animate-in";
import { SectionHeader } from "@/components/ui/section-header";

export function ProblemSection() {
  const items = [
    {
      emoji: "📉",
      title: "15–30% of every booking goes to OTAs",
      body: "Commissions quietly eat your margin night after night—while you still do the hosting work.",
    },
    {
      emoji: "🔍",
      title: "Guests can’t find you directly",
      body: "If you’re invisible on Google and AI answers, demand gets routed to OTAs and aggregators first.",
    },
    {
      emoji: "🛏️",
      title: "Empty nights cost you—OTAs won’t fix that",
      body: "OTAs optimize for their marketplace—not for your calendar. Direct demand is how you protect ADR and occupancy.",
    },
  ];

  return (
    <section
      className="scroll-mt-20 border-b border-border/80 py-20 sm:py-24"
      id="problem"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          badge="The problem"
          title="You’re paying OTAs to sell what’s already yours"
          subtitle="Premium villas lose margin and control when discovery happens on someone else’s rails. Direct booking is the lever you can own—without giving up a commission on every stay."
        />
        <ul className="mt-12 grid gap-8 sm:grid-cols-3">
          {items.map((item, i) => (
            <AnimateIn key={item.title} delay={i * 0.1}>
              <li className="group h-full rounded-2xl border border-border bg-background p-7 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <span className="text-2xl" aria-hidden>
                  {item.emoji}
                </span>
                <h3 className="mt-4 text-lg font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  {item.body}
                </p>
              </li>
            </AnimateIn>
          ))}
        </ul>
        <p className="mt-10 text-xs text-muted leading-relaxed">
          Illustrative context: OTAs capture a large share of online travel
          demand in many markets. Outcomes vary by property—Nestino focuses on
          measurable movement in direct inquiries and booking intent.
        </p>
      </div>
    </section>
  );
}
