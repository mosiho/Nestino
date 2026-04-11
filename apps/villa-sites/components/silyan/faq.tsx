"use client";

import { useState } from "react";
import type { Lang } from "@/lib/i18n";

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
    { q: "كم عدد الضيوف الذين يمكن استيعابهم في سيليان فيلاز؟", a: "يمكن لجميع الفيلات الثلاث معاً استيعاب ما يصل إلى 22 ضيفاً: تستوعب بادم وإنجير 6 ضيوف لكل منهما، وتستوعب دفني 10 ضيوف." },
    { q: "هل يمكن حجز أكثر من فيلا في آنٍ واحد؟", a: "نعم. تواصل معنا مباشرة إذا كنت ترغب في حجز فيلتين أو الثلاث معاً لمجموعة." },
    { q: "ما هو الحد الأدنى لمدة الإقامة؟", a: "ليلتان كحد أدنى لجميع الفيلات." },
    { q: "هل يوجد مسبح خاص في كل فيلا؟", a: "نعم. لكل فيلا مسبحها وحديقتها الخاصين — لن تتشاركها مع ضيوف آخرين." },
    { q: "كم تبعد سيليان فيلاز عن مطار أنطاليا؟", a: "22 كيلومتراً — ما يقارب 25-30 دقيقة بالسيارة." },
    { q: "هل الحيوانات الأليفة مسموح بها؟", a: "لا يُسمح بالحيوانات الأليفة في سيليان فيلاز." },
    { q: "هل المكان مناسب للعائلات ذات الأطفال؟", a: "نعم. جميع الفيلات الثلاث مصممة للعائلات والمجموعات. يجب الإشراف على الأطفال دائماً في منطقة المسبح." },
  ],
  ru: [
    { q: "Сколько здесь вилл?", a: "Три — Villa Badem, Villa Defne и Villa İncir. Каждая является полностью независимой виллой с собственным частным бассейном, садом и входом." },
    { q: "Сколько гостей могут разместиться в Silyan Villas?", a: "Все три виллы вместе вмещают до 22 гостей: Badem и İncir — по 6, Defne — 10." },
    { q: "Можно ли забронировать сразу несколько вилл?", a: "Да. Свяжитесь с нами напрямую, если вы хотите забронировать две или все три виллы одновременно для большой группы." },
    { q: "Каков минимальный срок проживания?", a: "Минимум 2 ночи для всех вилл." },
    { q: "У каждой виллы есть частный бассейн?", a: "Да. У каждой виллы свой частный бассейн и сад — вы не будете делить их с другими гостями." },
    { q: "Как далеко Silyan Villas от аэропорта Анталии?", a: "22 км — примерно 25–30 минут езды в зависимости от трафика." },
    { q: "Разрешены ли домашние животные?", a: "Домашние животные в Silyan Villas не допускаются." },
    { q: "Подходит ли отель для семей с детьми?", a: "Да. Все три виллы рассчитаны на семьи и группы с частными садами и бассейнами. Дети должны находиться под присмотром у бассейна." },
  ],
};

const FAQ_LABEL: Record<string, string> = {
  en: "Frequently asked questions",
  tr: "Sık sorulan sorular",
  ar: "الأسئلة الشائعة",
  ru: "Часто задаваемые вопросы",
};

export default function FAQ({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState<number | null>(null);
  const items = FAQ_ITEMS[lang] ?? FAQ_ITEMS.en!;
  const label = FAQ_LABEL[lang] ?? FAQ_LABEL.en!;

  return (
    <section className="section-y bg-[var(--color-surface)]">
      <div className="content-wrapper">
        <h2 className="font-serif font-semibold text-h2 text-[var(--color-text-primary)] mb-8">
          {label}
        </h2>

        <div className="max-w-2xl space-y-2">
          {items.map((item, i) => (
            <div
              key={i}
              className="border border-[var(--color-border)] rounded-md overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-4 py-4 text-left text-sm font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-bg)] transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span>{item.q}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className={`flex-shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
                  aria-hidden="true"
                >
                  <path d="M4 6l4 4 4-4" />
                </svg>
              </button>

              {open === i && (
                <div className="px-4 pb-4 text-sm text-[var(--color-text-secondary)] leading-relaxed border-t border-[var(--color-border)]">
                  <div className="pt-3">{item.a}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}