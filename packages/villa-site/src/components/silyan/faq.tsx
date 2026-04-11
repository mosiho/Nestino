"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Lang } from "../../lib/i18n";
import AnimateOnScroll from "../animate-on-scroll";

type FAQItem = { q: string; a: string };

const FAQ_ITEMS: Record<string, FAQItem[]> = {
  en: [
    {
      q: "How many villas are there?",
      a: "Eleven independent villas — including Villa Portakal, Villa Defne, Villa İncir, Villa Badem, and more. Each is a fully separate home with its own private pool, garden, and entrance.",
    },
    {
      q: "How many guests can Silyan Villas accommodate in total?",
      a: "Each villa sleeps between 4 and 10 guests depending on the property. With all eleven villas booked at full occupancy, the estate can host large groups — contact us with your dates and group size for a tailored plan.",
    },
    {
      q: "Can I book more than one villa at once?",
      a: "Yes. Message us on WhatsApp or use the inquiry form if you would like to reserve several villas together for a celebration, retreat, or extended family trip.",
    },
    {
      q: "What is the minimum stay?",
      a: "2 nights minimum for all villas.",
    },
    {
      q: "Is there a private pool at each villa?",
      a: "Yes. Every villa has its own private pool and garden — you will not share pools with other guests.",
    },
    {
      q: "How far is Silyan Villas from Antalya Airport?",
      a: "22 km — approximately 25–30 minutes by car depending on traffic.",
    },
    {
      q: "Are pets allowed?",
      a: "No pets are permitted at Silyan Villas.",
    },
    {
      q: "Is the property suitable for families with children?",
      a: "Yes. All eleven villas are designed for families and groups, with private gardens and pools. Children must be supervised around pool areas at all times.",
    },
    {
      q: "Is Silyan Villas quiet — away from city noise?",
      a: "The villas sit on a forested hillside in Hisarçandır above Konyaaltı, where nights are calm and the setting feels immersed in nature. Antalya's centre and beaches are a short drive when you want city energy or the sea.",
    },
  ],
  tr: [
    {
      q: "Kaç villa var?",
      a: "On bir bağımsız villa — Villa Portakal, Villa Defne, Villa İncir, Villa Badem ve diğerleri. Her biri kendi özel havuzu, bahçesi ve girişiyle tamamen ayrı bir konuttur.",
    },
    {
      q: "Silyan Villas toplamda kaç misafir ağırlayabilir?",
      a: "Villaya göre 4 ila 10 kişi arası konaklama sunulur. Birden fazla villa ile büyük gruplar için plan yapılabilir — tarih ve kişi sayınızı yazın, size uygun kombinasyonu önerelim.",
    },
    {
      q: "Birden fazla villa birden rezerve edilebilir mi?",
      a: "Evet. Kutlama, toplantı veya geniş aile tatili için birden fazla villayı birlikte ayırtmak isterseniz WhatsApp veya talep formu üzerinden bize ulaşın.",
    },
    { q: "Minimum konaklama süresi nedir?", a: "Tüm villalar için minimum 2 gece." },
    {
      q: "Her villanın özel havuzu var mı?",
      a: "Evet. Her villanın kendi özel havuzu ve bahçesi vardır — havuzları diğer misafirlerle paylaşmazsınız.",
    },
    { q: "Silyan Villas, Antalya Havalimanı'na ne kadar uzak?", a: "22 km — trafiğe bağlı olarak yaklaşık 25–30 dakika." },
    { q: "Evcil hayvanlar kabul ediliyor mu?", a: "Silyan Villas'ta evcil hayvanlara izin verilmemektedir." },
    {
      q: "Mülk çocuklu aileler için uygun mu?",
      a: "Evet. On bir villa da özel bahçe ve havuzlarıyla aileler ve gruplar için tasarlanmıştır. Çocuklar havuz başında her zaman gözetim altında olmalıdır.",
    },
    {
      q: "Silyan Villas sessiz mi — şehir gürültüsünden uzak mı?",
      a: "Villalar Hisarçandır'da Konyaaltı üzerinde ormanlık bir yamaçta; akşamlar sakin, ortam doğanın içinde hissedilir. Şehir merkezi ve sahiller istediğinizde kısa bir sürüşle ulaşılabilir.",
    },
  ],
  ar: [
    {
      q: "كم عدد الفيلات؟",
      a: "أحد عشر فيلا مستقلة — من بينها فيلا بورتاكال، وفيلا دفني، وفيلا إنجير، وفيلا بادم وغيرها. كل منزل منفصل بالكامل بمسبحه وحديقته ومدخله الخاص.",
    },
    {
      q: "كم عدد الضيوف الذين يمكن استيعابهم؟",
      a: "تتسع كل فيلا لما بين 4 و10 ضيوف حسب الوحدة. للمجموعات الكبيرة عند حجز عدة فيلات معاً — أرسل التواريخ وعدد الضيوف لنقترح التوليفة المناسبة.",
    },
    {
      q: "هل يمكن حجز أكثر من فيلا؟",
      a: "نعم. راسلنا عبر واتساب أو نموذج الاستفسار إذا أردتم حجز عدة فيلات معاً لمناسبة أو عائلة موسعة.",
    },
    { q: "ما هو الحد الأدنى لمدة الإقامة؟", a: "ليلتان كحد أدنى لجميع الفيلات." },
    { q: "هل يوجد مسبح خاص في كل فيلا؟", a: "نعم. لكل فيلا مسبحها وحديقتها الخاصان — لا تتشاركون المسابح مع ضيوف آخرين." },
    { q: "كم تبعد عن مطار أنطاليا؟", a: "22 كيلومتراً — ما يقارب 25–30 دقيقة بالسيارة." },
    { q: "هل الحيوانات الأليفة مسموح بها؟", a: "لا يُسمح بالحيوانات الأليفة في سيليان فيلاز." },
    {
      q: "هل المكان مناسب للعائلات ذات الأطفال؟",
      a: "نعم. الفيلات الـ11 مصممة للعائلات والمجموعات مع حدائق ومسابح خاصة. يجب الإشراف على الأطفال دائماً حول المسبح.",
    },
    {
      q: "هل سيليان فيلاز هادئة — بعيدة عن ضجيج المدينة؟",
      a: "تقع الفيلات على تلة مشجرة في هيسارتشاندير فوق كونيالتي؛ الليالٍ هادئة والجو يشعرك بالطبيعة. وسط أنطاليا والشواطئ على بعد قصير بالسيارة عند الحاجة.",
    },
  ],
  ru: [
    {
      q: "Сколько здесь вилл?",
      a: "Одиннадцать независимых вилл — в том числе Villa Portakal, Villa Defne, Villa İncir, Villa Badem и другие. Каждая — отдельный дом со своим бассейном, садом и входом.",
    },
    {
      q: "Сколько гостей можно разместить?",
      a: "В каждой вилле от 4 до 10 гостей в зависимости от объекта. Для больших групп можно бронировать несколько вилл — напишите даты и состав, мы предложим вариант.",
    },
    {
      q: "Можно забронировать несколько вилл?",
      a: "Да. Напишите в WhatsApp или через форму запроса, если хотите снять несколько вилл для праздника, ретрита или большой семьи.",
    },
    { q: "Минимальный срок?", a: "Минимум 2 ночи для всех вилл." },
    { q: "У каждой виллы есть бассейн?", a: "Да. У каждой виллы свой частный бассейн и сад — бассейны не общие с другими гостями." },
    { q: "Как далеко от аэропорта?", a: "22 км — примерно 25–30 минут езды." },
    { q: "Разрешены животные?", a: "Нет, домашние животные не допускаются." },
    {
      q: "Подходит для семей с детьми?",
      a: "Да. Все одиннадцать вилл рассчитаны на семьи и группы. Дети должны быть под присмотром у бассейна.",
    },
    {
      q: "Тихо ли здесь — далеко от городского шума?",
      a: "Виллы стоят на лесистом склоне в Хисарчандыре над Конъяалты: вечера спокойные, ощущение близости к природе. Центр Анталии и пляжи — короткая поездка, когда нужен город или море.",
    },
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
