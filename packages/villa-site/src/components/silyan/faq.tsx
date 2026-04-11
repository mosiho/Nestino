"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Lang } from "../../lib/i18n";
import AnimateOnScroll from "../animate-on-scroll";

type FAQItem = { q: string; a: string };

const FAQ_ITEMS: Record<string, FAQItem[]> = {
  en: [
    { q: "How many villas are there?", a: "Three — Villa Badem, Villa Defne, and Villa İncir. Each is a fully independent villa with its own private pool, garden, and entrance." },
    { q: "How many guests can Silyan Villas accommodate in total?", a: "All three villas together sleep up to 22 guests: Badem and İncir each sleep 6, Defne sleeps 10." },
    { q: "Can I book more than one villa at once?", a: "Yes. Contact us directly if you'd like to book two or all three villas simultaneously for a group." },
    { q: "What is the minimum stay?", a: "2 nights minimum for all villas." },
    { q: "Is there a private pool at each villa?", a: "Yes. Every villa has its own private pool and garden — you will not share with other guests." },
    { q: "How far is Silyan Villas from Antalya Airport?", a: "22 km — approximately 25–30 minutes by car depending on traffic." },
    { q: "Are pets allowed?", a: "No pets are permitted at Silyan Villas." },
    { q: "Is the property suitable for families with children?", a: "Yes. All three villas are designed for families and groups, with private gardens and pools. Children must be supervised around pool areas at all times." },
  ],
  tr: [
    { q: "Kaç villa var?", a: "Üç — Villa Badem, Villa Defne ve Villa İncir. Her biri kendi özel havuzu, bahçesi ve girişiyle tamamen bağımsız bir villadır." },
    { q: "Silyan Villas toplamda kaç misafir ağırlayabilir?", a: "Üç villa birlikte toplam 22 misafir kapasitesine sahiptir: Badem ve İncir 6'şar, Defne ise 10 kişiliktir." },
    { q: "Birden fazla villa birden rezerve edilebilir mi?", a: "Evet. Büyük gruplar için iki veya üç villayı aynı anda rezerve etmek isterseniz doğrudan bizimle iletişime geçin." },
    { q: "Minimum konaklama süresi nedir?", a: "Tüm villalar için minimum 2 gece." },
    { q: "Her villanın özel havuzu var mı?", a: "Evet. Her villanın kendi özel havuzu ve bahçesi vardır — diğer misafirlerle paylaşmazsınız." },
    { q: "Silyan Villas, Antalya Havalimanı'na ne kadar uzak?", a: "22 km — trafiğe bağlı olarak yaklaşık 25–30 dakika." },
    { q: "Evcil hayvanlar kabul ediliyor mu?", a: "Silyan Villas'ta evcil hayvanlara izin verilmemektedir." },
    { q: "Mülk çocuklu aileler için uygun mu?", a: "Evet. Üç villa da özel bahçeleri ve havuzlarıyla aileler ve gruplar için tasarlanmıştır. Çocuklar her zaman havuz başında gözetim altında olmalıdır." },
  ],
  ar: [
    { q: "كم عدد الفيلات؟", a: "ثلاث — فيلا بادم، وفيلا دفني، وفيلا إنجير. كل فيلا مستقلة تماماً بمسبحها وحديقتها ومدخلها الخاص." },
    { q: "كم عدد الضيوف الذين يمكن استيعابهم؟", a: "يمكن لجميع الفيلات الثلاث معاً استيعاب ما يصل إلى 22 ضيفاً." },
    { q: "هل يمكن حجز أكثر من فيلا؟", a: "نعم. تواصل معنا مباشرة إذا كنت ترغب في حجز فيلتين أو الثلاث معاً." },
    { q: "ما هو الحد الأدنى لمدة الإقامة؟", a: "ليلتان كحد أدنى لجميع الفيلات." },
    { q: "هل يوجد مسبح خاص في كل فيلا؟", a: "نعم. لكل فيلا مسبحها وحديقتها الخاصين." },
    { q: "كم تبعد عن مطار أنطاليا؟", a: "22 كيلومتراً — ما يقارب 25-30 دقيقة بالسيارة." },
    { q: "هل الحيوانات الأليفة مسموح بها؟", a: "لا يُسمح بالحيوانات الأليفة في سيليان فيلاز." },
    { q: "هل المكان مناسب للعائلات ذات الأطفال؟", a: "نعم. جميع الفيلات مصممة للعائلات والمجموعات. يجب الإشراف على الأطفال دائماً في منطقة المسبح." },
  ],
  ru: [
    { q: "Сколько здесь вилл?", a: "Три — Villa Badem, Villa Defne и Villa İncir. Каждая полностью независима." },
    { q: "Сколько гостей вмещают?", a: "Все три виллы вместе вмещают до 22 гостей." },
    { q: "Можно забронировать несколько вилл?", a: "Да. Свяжитесь с нами напрямую." },
    { q: "Минимальный срок?", a: "Минимум 2 ночи для всех вилл." },
    { q: "У каждой виллы есть бассейн?", a: "Да. У каждой виллы свой частный бассейн и сад." },
    { q: "Как далеко от аэропорта?", a: "22 км — примерно 25–30 минут езды." },
    { q: "Разрешены животные?", a: "Нет, домашние животные не допускаются." },
    { q: "Подходит для семей с детьми?", a: "Да. Все виллы рассчитаны на семьи. Дети должны быть под присмотром у бассейна." },
  ],
};

const FAQ_LABEL: Record<string, string> = {
  en: "Frequently asked questions", tr: "Sık sorulan sorular", ar: "الأسئلة الشائعة", ru: "Часто задаваемые вопросы",
};

export default function FAQ({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState<number | null>(null);
  const items = FAQ_ITEMS[lang] ?? FAQ_ITEMS.en!;
  const label = FAQ_LABEL[lang] ?? FAQ_LABEL.en!;

  return (
    <section className="section-y bg-[var(--color-surface)] content-lazy">
      <div className="content-wrapper">
        <AnimateOnScroll variant="fade-up">
          <h2 className="font-serif font-semibold text-h2 text-[var(--color-text-primary)] mb-8">
            {label}
          </h2>
        </AnimateOnScroll>

        <div className="max-w-2xl space-y-2">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <AnimateOnScroll key={i} variant="fade-up" delay={i * 0.03}>
                <div
                  className={`border rounded-xl overflow-hidden transition-colors duration-300 ${
                    isOpen
                      ? "border-[var(--accent-400)]/50 bg-[var(--color-bg)]"
                      : "border-[var(--color-border)]"
                  }`}
                >
                  <button
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-start text-base font-medium text-[var(--color-text-primary)] transition-colors duration-200 min-h-[var(--tap-target)]"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.q}</span>
                    <motion.svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="flex-shrink-0 text-[var(--color-text-muted)]"
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      aria-hidden="true"
                    >
                      <path d="M4 6l4 4 4-4" />
                    </motion.svg>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-base text-[var(--color-text-secondary)] leading-relaxed border-t border-[var(--color-border)]/50">
                          <div className="pt-4">{item.a}</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
