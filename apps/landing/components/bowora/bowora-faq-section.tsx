"use client";

import { FaqAccordion } from "@/components/ui/accordion";
import { AnimateIn } from "@/components/ui/animate-in";
import { SectionHeader } from "@/components/ui/section-header";
import { useLocaleContext } from "@/components/i18n/locale-provider";

export function BoworaFaqSection() {
  const { messages } = useLocaleContext();
  const f = messages.faq;
  const bow = messages.bowora.faq;

  const items = f.items.map((e) => {
    if (e.id === "trial") {
      return { id: e.id, question: e.question, answer: bow.trialAnswer };
    }
    if (e.id === "pricing-after") {
      return { id: e.id, question: e.question, answer: bow.pricingAfterAnswer };
    }
    return { id: e.id, question: e.question, answer: e.answer };
  });

  return (
    <section
      className="scroll-mt-20 border-b border-border/80 py-20 sm:py-24"
      id="faq"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeader
          badge={f.badge}
          title={f.title}
          subtitle={f.subtitle}
        />
        <AnimateIn delay={0.1} className="mt-10">
          <FaqAccordion items={items} />
        </AnimateIn>
      </div>
    </section>
  );
}
