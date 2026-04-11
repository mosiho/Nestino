import type { Lang } from "../../lib/i18n";

type Props = { lang: Lang };

const COPY: Record<string, { headline: string; body: string; label: string }> = {
  en: {
    headline: "A place between the mountain and the sea",
    body: "Silyan Villas sits in Hisarçandır, a forested hillside above Konyaaltı — quiet enough to hear the trees, close enough to reach Antalya's restaurants and beaches in minutes. Three independent villas, each with its own private pool and garden, designed for families and groups who want space without compromise.",
    label: "About Silyan Villas",
  },
  tr: {
    headline: "Dağ ile deniz arasında bir kaçış noktası",
    body: "Silyan Villas, Konyaaltı'nın üzerindeki ormanla kaplı yamaçlarda, Hisarçandır'da yer alıyor. Ağaç seslerini duyabilecek kadar sessiz, dakikalar içinde Antalya'nın restoranlarına ve sahillerine ulaşabilecek kadar yakın. Her biri özel havuzu ve bahçesiyle tam bağımsız olan üç villa, uzlaşıdan vazgeçmek istemeyen aileler ve gruplar için tasarlandı.",
    label: "Silyan Villas Hakkında",
  },
  ar: {
    headline: "ملجأ بين الجبل والبحر",
    body: "تقع سيليان فيلاز في هيسارتشاندير، على تلة مشجرة فوق كونيالتي — هادئة بما يكفي لتسمع أصوات الطبيعة، وقريبة بما يكفي للوصول إلى مطاعم أنطاليا وشواطئها في دقائق. ثلاث فيلات مستقلة، لكل منها مسبح خاص وحديقة، مصممة للعائلات والمجموعات التي تريد المساحة دون تنازلات.",
    label: "عن سيليان فيلاز",
  },
  ru: {
    headline: "Место между горой и морем",
    body: "Silyan Villas расположен в Хисарчандыре — на лесистом склоне над Конъяалты. Достаточно тихо, чтобы слышать деревья, и достаточно близко, чтобы добраться до ресторанов и пляжей Анталии за считанные минуты. Три независимые виллы, каждая со своим частным бассейном и садом, созданы для семей и групп, которые хотят простора без компромиссов.",
    label: "О Silyan Villas",
  },
};

export default function TheStay({ lang }: Props) {
  const c = COPY[lang] ?? COPY.en!;

  return (
    <section className="section-y">
      <div className="content-wrapper">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Text */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--accent-500)" }}
            >
              {c.label}
            </p>
            <h2 className="font-serif font-semibold text-h2 text-[var(--color-text-primary)] mb-5">
              {c.headline}
            </h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              {c.body}
            </p>

            {/* Key facts */}
            <ul className="mt-6 space-y-2">
              {[
                { label: "22 km", detail: lang === "tr" ? "Havalimanına" : lang === "ar" ? "إلى المطار" : lang === "ru" ? "до аэропорта" : "to the airport" },
                { label: "12 km", detail: lang === "tr" ? "Şehir merkezine" : lang === "ar" ? "إلى مركز المدينة" : lang === "ru" ? "до центра города" : "to city centre" },
                { label: "8 km", detail: lang === "tr" ? "Konyaaltı Sahili'ne" : lang === "ar" ? "إلى شاطئ كونيالتي" : lang === "ru" ? "до пляжа Конъяалты" : "to Konyaaltı Beach" },
              ].map(({ label, detail }) => (
                <li key={label} className="flex items-center gap-3 text-sm">
                  <span
                    className="font-semibold tabular-nums"
                    style={{ color: "var(--accent-500)", minWidth: "3rem" }}
                  >
                    {label}
                  </span>
                  <span className="text-[var(--color-text-secondary)]">{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Image placeholder — replaced by real image once CDN is set up */}
          <div
            className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[var(--color-border)]"
            aria-hidden="true"
          >
            <div
              className="absolute inset-0 flex items-center justify-center text-[var(--color-text-muted)] text-sm"
            >
              {/* Hero image goes here — pool + mountain view */}
              Pool view photo
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}