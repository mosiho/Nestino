"use client";

import { motion } from "framer-motion";
import { useId, useState } from "react";

export type AccordionItem = {
  id: string;
  question: string;
  answer: string;
};

export function FaqAccordion({ items }: { items: AccordionItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const baseId = useId();

  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-background shadow-sm">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `${baseId}-${item.id}-panel`;
        const headerId = `${baseId}-${item.id}-header`;
        return (
          <div key={item.id} className="px-4 py-1">
            <h3>
              <button
                type="button"
                id={headerId}
                className="flex w-full items-center justify-between gap-4 py-4 text-left text-base font-semibold text-foreground transition-colors hover:text-accent"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
              >
                {item.question}
                <span className="text-muted text-xl leading-none" aria-hidden>
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              initial={false}
              animate={{
                height: isOpen ? "auto" : 0,
                opacity: isOpen ? 1 : 0,
              }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="pb-4 text-muted leading-relaxed">{item.answer}</div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
