import Image from "next/image";
import type { Lang } from "../../lib/i18n";
import { THE_STAY_IMAGE } from "../../lib/silyan-images";
import AnimateOnScroll from "../animate-on-scroll";

type Props = { lang: Lang };

const COPY: Record<string, { headline: string; body: string; label: string; pullQuote: string }> = {
  en: {
    headline: "A place between the mountain and the sea",
    body: "Silyan Villas sits in Hisarçandır, a forested hillside above Konyaaltı — quiet enough to hear the trees, close enough to reach Antalya's restaurants and beaches in minutes. Three independent villas, each with its own private pool and garden, designed for families and groups who want space without compromise.",
    label: "About Silyan Villas",
    pullQuote: "Quiet enough to hear the trees, close enough to reach the sea.",
  },
  tr: {
    headline: "Dağ ile deniz arasında bir kaçış noktası",
    body: "Silyan Villas, Konyaaltı'nın üzerindeki ormanla kaplı yamaçlarda, Hisarçandır'da yer alıyor. Ağaç seslerini duyabilecek kadar sessiz, dakikalar içinde Antalya'nın restoranlarına ve sahillerine ulaşabilecek kadar yakın. Her biri özel havuzu ve bahçesiyle tam bağımsız olan üç villa, uzlaşıdan vazgeçmek istemeyen aileler ve gruplar için tasarlandı.",
    label: "Silyan Villas Hakkında",
    pullQuote: "Ağaçları duyabilecek kadar sessiz, denize ulaşabilecek kadar yakın.",
  },
  ar: {
    headline: "ملجأ بين الجبل والبحر",
    body: "تقع سيليان فيلاز في هيسارتشاندير، على تلة مشجرة فوق كونيالتي — هادئة بما يكفي لتسمع أصوات الطبيعة، وقريبة بما يكفي للوصول إلى مطاعم أنطاليا وشواطئها في دقائق. ثلاث فيلات مستقلة، لكل منها مسبح خاص وحديقة، مصممة للعائلات والمجموعات التي تريد المساحة دون تنازلات.",
    label: "عن سيليان فيلاز",
    pullQuote: "هادئة بما يكفي لتسمع الأشجار، قريبة بما يكفي للوصول إلى البحر.",
  },
  ru: {
    headline: "Место между горой и морем",
    body: "Silyan Villas расположен в Хисарчандыре — на лесистом склоне над Конъяалты. Достаточно тихо, чтобы слышать деревья, и достаточно близко, чтобы добраться до ресторанов и пляжей Анталии за считанные минуты. Три независимые виллы, каждая со своим частным бассейном и садом, созданы для семей и групп, которые хотят простора без компромиссов.",
    label: "О Silyan Villas",
    pullQuote: "Достаточно тихо, чтобы слышать деревья, достаточно близко до моря.",
  },
};

const DISTANCES = [
  { km: "22 km", label: { en: "Airport", tr: "Havalimanı", ar: "المطار", ru: "Аэропорт" } },
  { km: "12 km", label: { en: "City centre", tr: "Şehir merkezi", ar: "مركز المدينة", ru: "Центр" } },
  { km: "8 km", label: { en: "Beach", tr: "Sahil", ar: "الشاطئ", ru: "Пляж" } },
];

export default function TheStay({ lang }: Props) {
  const c = COPY[lang] ?? COPY.en!;

  return (
    <section className="section-y">
      <div className="content-wrapper">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Image — first on mobile */}
          <AnimateOnScroll variant="fade-up" className="order-1 md:order-2">
            <div className="relative">
              {/* Decorative offset frame (hidden on mobile) */}
              <div
                className="hidden md:block absolute -right-3 -bottom-3 w-full h-full rounded-lg border-2"
                style={{ borderColor: "var(--gold-accent)", opacity: 0.2 }}
              />
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-[var(--shadow-lg)]">
                <Image
                  src={THE_STAY_IMAGE}
                  alt="Silyan Villas — pool and mountain view"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </AnimateOnScroll>

          {/* Text */}
          <AnimateOnScroll variant="fade-up" delay={0.1} className="order-2 md:order-1">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--accent-500)" }}
            >
              {c.label}
            </p>
            <h2 className="font-serif font-semibold text-h2 text-[var(--color-text-primary)] mb-5">
              {c.headline}
            </h2>

            {/* Pull quote */}
            <blockquote className="my-6 pl-4 border-l-2 border-[var(--gold-accent)]/40">
              <p className="font-serif italic text-base text-[var(--color-text-secondary)]">
                {c.pullQuote}
              </p>
            </blockquote>

            <p className="text-base text-[var(--color-text-secondary)] leading-relaxed mb-6">
              {c.body}
            </p>

            {/* Distance pills — horizontal scroll on mobile */}
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
              {DISTANCES.map(({ km, label }) => (
                <div
                  key={km}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] shrink-0"
                >
                  <span
                    className="text-sm font-semibold tabular-nums"
                    style={{ color: "var(--accent-500)" }}
                  >
                    {km}
                  </span>
                  <span className="text-sm text-[var(--color-text-secondary)]">
                    {label[lang as keyof typeof label] ?? label.en}
                  </span>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
