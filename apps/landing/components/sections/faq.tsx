import { FaqAccordion } from "@/components/ui/accordion";
import { AnimateIn } from "@/components/ui/animate-in";
import { SectionHeader } from "@/components/ui/section-header";
import { faqEntries } from "@/lib/faq-data";

export function FaqSection() {
  const items = faqEntries.map((e) => ({
    id: e.id,
    question: e.question,
    answer: e.answer,
  }));

  return (
    <section
      className="scroll-mt-20 border-b border-border/80 py-20 sm:py-24"
      id="faq"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeader
          badge="FAQ"
          title="Direct bookings, explained plainly"
          subtitle="What we do, what we don’t, and how this differs from paying commissions to OTAs."
        />
        <AnimateIn delay={0.1} className="mt-10">
          <FaqAccordion items={items} />
        </AnimateIn>
      </div>
    </section>
  );
}
