"use client";

import { AnimateIn } from "@/components/ui/animate-in";
import { SectionHeader } from "@/components/ui/section-header";
import { useLocaleContext } from "@/components/i18n/locale-provider";

const EMOJIS = ["📉", "🔍", "🛏️"] as const;

export function ProblemSection() {
  const { messages } = useLocaleContext();
  const p = messages.problem;
  const items = p.items.map((item, i) => ({
    emoji: EMOJIS[i] ?? "•",
    title: item.title,
    body: item.body,
  }));

  return (
    <section
      className="scroll-mt-20 border-b border-border/80 py-20 sm:py-24"
      id="problem"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          badge={p.badge}
          title={p.title}
          subtitle={p.subtitle}
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
          {p.disclaimer}
        </p>
      </div>
    </section>
  );
}
