import type { Metadata } from "next";
import { headers } from "next/headers";

import { isLang, type Lang } from "../lib/i18n";
import { resolveRequestOrigin } from "../lib/site-origin";
import { getSiteBySubdomain } from "../lib/tenant";
import { villaPath } from "../lib/villa-path";

const LAT = 36.823;
const LNG = 30.5378;
const MAP_EMBED = `https://maps.google.com/maps?q=${LAT},${LNG}&z=14&output=embed`;

type Props = { params: Promise<{ lang: string; siteSlug?: string }>; pathPrefix: string };

const META: Record<string, { title: string; description: string }> = {
  en: {
    title: "Location — Silyan Villas",
    description:
      "Silyan Villas in Hisarçandır, Konyaaltı — 22 km from Antalya Airport, 12 km from the city centre, 8 km from Konyaaltı Beach.",
  },
  tr: {
    title: "Konum — Silyan Villas",
    description:
      "Hisarçandır, Konyaaltı'daki Silyan Villas — Antalya Havalimanı'na 22 km, şehir merkezine 12 km, Konyaaltı Sahili'ne 8 km.",
  },
  ar: {
    title: "الموقع — سيليان فيلاز",
    description: "سيليان فيلاز في هيسارتشاندير، كونيالتي — 22 كم من مطار أنطاليا.",
  },
  ru: {
    title: "Расположение — Silyan Villas",
    description: "Silyan Villas в Хисарчандыре, Конъяалты — 22 км от аэропорта Анталии.",
  },
};

const COPY: Record<
  string,
  {
    h1: string;
    lead: string;
    p1: string;
    p2: string;
    tableHeadDest: string;
    tableHeadDist: string;
    tableHeadDrive: string;
    highlightsTitle: string;
    highlights: string[];
    seasonalTitle: string;
    seasonalBody: string;
    cta: string;
    ctaSub: string;
  }
> = {
  en: {
    h1: "Between the mountains and the sea",
    lead: "Forested hillside above Konyaaltı — minutes from the sea, the airport, and Antalya's old town.",
    p1:
      "Hisarçandır is one of Konyaaltı's most peaceful neighborhoods — elevated above the coastal plain, surrounded by pine and oak forest, with a microclimate that runs 3–5°C cooler than the beach in summer. The drive into Antalya takes about 20 minutes. Konyaaltı Beach is 8 km. The airport is 22 km, making arrivals and departures straightforward.",
    p2:
      "Silyan Villas is within easy reach of Kaleiçi old town, the Düden waterfalls, and the marina — but you won't hear the city from the garden.",
    tableHeadDest: "Destination",
    tableHeadDist: "Distance",
    tableHeadDrive: "Approx. drive",
    highlightsTitle: "What to do in Antalya",
    highlights: [
      "Beach days on Konyaaltı's long pebble shore",
      "Evening walks in Kaleiçi and the marina",
      "Boat trips and coastal viewpoints",
      "Düden waterfalls and green parks",
      "Local markets and regional cuisine",
    ],
    seasonalTitle: "When to visit",
    seasonalBody:
      "Spring and autumn offer mild weather ideal for hiking and sightseeing. Summer is warm at the coast but often a few degrees cooler in the hills. Winter is quiet and mild — perfect if you prefer space and calm.",
    cta: "Questions about getting here?",
    ctaSub: "Message us on WhatsApp — we reply within a few hours.",
  },
  tr: {
    h1: "Dağ ile deniz arasında",
    lead: "Konyaaltı'nın üzerindeki ormanlık yamaçlar — denize, havalimanına ve tarihi merkeze dakikalar uzaklıkta.",
    p1:
      "Hisarçandır, Konyaaltı'nın en sakin mahallelerinden biridir — sahil ovasının üzerinde, çam ve meşe ormanıyla çevrili; yazın sahilden 3–5°C daha serin bir mikroiklim sunar. Antalya merkeze arabayla yaklaşık 20 dakika. Konyaaltı Sahili 8 km, havalimanı 22 km.",
    p2:
      "Kaleiçi, Düden şelaleleri ve marinaya kolayca ulaşabilirsiniz — bahçeden şehir gürültüsünü duymazsınız.",
    tableHeadDest: "Varış noktası",
    tableHeadDist: "Mesafe",
    tableHeadDrive: "Yaklaşık süre",
    highlightsTitle: "Antalya'da neler yapılır?",
    highlights: [
      "Konyaaltı sahilinde deniz keyfi",
      "Kaleiçi ve marina akşam yürüyüşleri",
      "Tekne turları ve kıyı manzaraları",
      "Düden şelaleleri ve yeşil alanlar",
      "Yerel pazarlar ve bölgesel mutfak",
    ],
    seasonalTitle: "Ne zaman gelinir?",
    seasonalBody:
      "İlkbahar ve sonbahar yürüyüş ve geziler için ideal ılıman hava sunar. Yaz sahilde sıcaktır; tepelerde genelde biraz daha serindir. Kış sakin ve ılımandır.",
    cta: "Yol tarifi veya ulaşım hakkında soru mu var?",
    ctaSub: "WhatsApp'tan yazın — birkaç saat içinde yanıt veriyoruz.",
  },
  ar: {
    h1: "بين الجبل والبحر",
    lead: "تلة مشجرة فوق كونيالتي — قريبة من البحر والمطار والمدينة القديمة.",
    p1:
      "هيسارتشاندير من أهدوء أحياء كونيالتي — مرتفعة فوق السهل الساحلي، محاطة بغابات الصنوبر والبلوط، مع مناخ دقيق أبرد بدرجات من الشاطئ في الصيف.",
    p2:
      "يسهل الوصول من سيليان فيلاز إلى كاليتشي وشلالات دودين والمارينا — دون سماع ضجيج المدينة من الحديقة.",
    tableHeadDest: "الوجهة",
    tableHeadDist: "المسافة",
    tableHeadDrive: "الوقت تقريباً",
    highlightsTitle: "ماذا تفعل في أنطاليا",
    highlights: [
      "أيام الشاطئ في كونيالتي",
      "المشي المسائي في كاليتشي والمارينا",
      "رحلات بحرية ومناظر ساحلية",
      "شلالات دودين والحدائق",
      "الأسواق المحلية والمأكولات",
    ],
    seasonalTitle: "أفضل وقت للزيارة",
    seasonalBody:
      "الربيع والخريف مناسبان للتنزه. الصيف دافئ على الساحل وأبرد قليلاً في التلال. الشتاء هادئ ومعتدل.",
    cta: "أسئلة عن الوصول؟",
    ctaSub: "راسلنا على واتساب — نرد خلال ساعات.",
  },
  ru: {
    h1: "Между горой и морем",
    lead: "Лесистый склон над Конъяалты — недалеко от моря, аэропорта и старого города.",
    p1:
      "Хисарчандыре — один из самых тихих районов Конъяалты: над прибрежной равниной, в сосново-дубовом лесу; летом здесь на 3–5°C прохладнее, чем на пляже. До центра Анталии около 20 минут, до пляжа Конъяалты 8 км, до аэропорта 22 км.",
    p2:
      "До Калеичи, водопадов Дюден и марины — короткая поездка, но из сада город не слышен.",
    tableHeadDest: "Направление",
    tableHeadDist: "Расстояние",
    tableHeadDrive: "Примерно",
    highlightsTitle: "Чем заняться в Анталии",
    highlights: [
      "Пляжные дни в Конъяалты",
      "Вечерние прогулки в Калеичи и на марине",
      "Морские прогулки и смотровые площадки",
      "Водопады Дюден и парки",
      "Рынки и местная кухня",
    ],
    seasonalTitle: "Когда ехать",
    seasonalBody:
      "Весна и осень — мягкая погода для прогулок. Летом на побережье жарче, в горах прохладнее. Зима спокойная и тёплая.",
    cta: "Вопросы о дороге?",
    ctaSub: "Напишите в WhatsApp — ответим за несколько часов.",
  },
};

const ROWS = [
  { key: "ayt", dist: "22 km", driveEn: "~25–30 min", driveTr: "~25–30 dk", driveAr: "~25–30 د", driveRu: "~25–30 мин" },
  { key: "city", dist: "12 km", driveEn: "~20 min", driveTr: "~20 dk", driveAr: "~20 د", driveRu: "~20 мин" },
  { key: "beach", dist: "8 km", driveEn: "~15 min", driveTr: "~15 dk", driveAr: "~15 د", driveRu: "~15 мин" },
  { key: "kaleici", dist: "~15 km", driveEn: "~20 min", driveTr: "~20 dk", driveAr: "~20 د", driveRu: "~20 мин" },
  { key: "duden", dist: "~10 km", driveEn: "~15 min", driveTr: "~15 dk", driveAr: "~15 د", driveRu: "~15 мин" },
  { key: "lara", dist: "~25 km", driveEn: "~30 min", driveTr: "~30 dk", driveAr: "~30 د", driveRu: "~30 мин" },
] as const;

const ROW_LABELS: Record<string, Record<string, string>> = {
  ayt: { en: "Antalya Airport (AYT)", tr: "Antalya Havalimanı (AYT)", ar: "مطار أنطاليا", ru: "Аэропорт Анталии (AYT)" },
  city: { en: "Antalya city centre", tr: "Antalya şehir merkezi", ar: "مركز أنطاليا", ru: "Центр Анталии" },
  beach: { en: "Konyaaltı Beach", tr: "Konyaaltı Sahili", ar: "شاطئ كونيالتي", ru: "Пляж Конъяалты" },
  kaleici: { en: "Kaleiçi Old Town", tr: "Kaleiçi Eski Kent", ar: "المدينة القديمة كاليتشي", ru: "Старый город Калеичи" },
  duden: { en: "Düden Waterfalls", tr: "Düden Şelaleleri", ar: "شلالات دودين", ru: "Водопады Дюден" },
  lara: { en: "Lara Beach", tr: "Lara Sahili", ar: "شاطئ لارا", ru: "Пляж Лара" },
};

function driveForLang(lang: string, row: (typeof ROWS)[number]): string {
  if (lang === "tr") return row.driveTr;
  if (lang === "ar") return row.driveAr;
  if (lang === "ru") return row.driveRu;
  return row.driveEn;
}

export async function generateLocationMetadata({ params, pathPrefix }: Props): Promise<Metadata> {
  const { lang } = await params;
  const meta = META[lang] ?? META.en!;
  const h = await headers();
  const origin = resolveRequestOrigin(h.get("host"));
  const path = villaPath(pathPrefix, `/${lang}/location`);
  return {
    title: meta.title,
    description: meta.description,
    openGraph: { title: meta.title, description: meta.description, url: `${origin.origin}${path}` },
  };
}

export default async function LocationPage({ params, pathPrefix }: Props) {
  const { lang } = await params;
  const safeLang: Lang = isLang(lang) ? lang : "en";
  const c = COPY[safeLang] ?? COPY.en!;
  const h = await headers();
  const slug = h.get("x-nestino-slug") ?? "";
  const ctx = slug ? await getSiteBySubdomain(slug) : null;
  const phone = ctx?.tenant.ownerPhone ?? "+905316960953";
  const digits = phone.replace(/\D/g, "");
  const waHref = digits ? `https://wa.me/${digits}` : "#";

  return (
    <div className="pt-24 pb-16 section-y">
      <div className="content-wrapper max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--accent-500)" }}>
          {safeLang === "tr" ? "Konum" : safeLang === "ar" ? "الموقع" : safeLang === "ru" ? "Расположение" : "Location"}
        </p>
        <h1 className="font-serif font-semibold text-h1 text-[var(--color-text-primary)] mb-4">{c.h1}</h1>
        <p className="text-lg text-[var(--color-text-secondary)] mb-8 leading-relaxed">{c.lead}</p>

        <div className="rounded-lg overflow-hidden border border-[var(--color-border)] shadow-[var(--shadow-md)] mb-10 aspect-[16/9] md:aspect-[21/9]">
          <iframe
            title="Silyan Villas map"
            src={MAP_EMBED}
            className="w-full h-full min-h-[280px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <div className="prose-villa space-y-6 mb-10">
          <p className="text-[var(--color-text-secondary)] leading-relaxed">{c.p1}</p>
          <p className="text-[var(--color-text-secondary)] leading-relaxed">{c.p2}</p>
        </div>

        <h2 className="font-serif font-semibold text-h3 text-[var(--color-text-primary)] mb-4">{c.tableHeadDest}</h2>
        <div className="overflow-x-auto rounded-lg border border-[var(--color-border)] mb-12">
          <table className="w-full text-sm">
            <thead className="bg-[var(--color-surface)] border-b border-[var(--color-border)]">
              <tr>
                <th className="text-left p-3 font-semibold text-[var(--color-text-primary)]">{c.tableHeadDest}</th>
                <th className="text-left p-3 font-semibold text-[var(--color-text-primary)]">{c.tableHeadDist}</th>
                <th className="text-left p-3 font-semibold text-[var(--color-text-primary)]">{c.tableHeadDrive}</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.key} className="border-t border-[var(--color-border)]">
                  <td className="p-3 text-[var(--color-text-primary)]">
                    {ROW_LABELS[row.key]?.[safeLang] ?? ROW_LABELS[row.key]?.en}
                  </td>
                  <td className="p-3 font-medium tabular-nums" style={{ color: "var(--accent-500)" }}>
                    {row.dist}
                  </td>
                  <td className="p-3 text-[var(--color-text-secondary)]">{driveForLang(safeLang, row)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="font-serif font-semibold text-h3 text-[var(--color-text-primary)] mb-4">{c.highlightsTitle}</h2>
        <ul className="space-y-2 mb-10">
          {c.highlights.map((item) => (
            <li key={item} className="flex gap-2 text-[var(--color-text-secondary)]">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--accent-500)" }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="p-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] mb-10">
          <h3 className="font-serif font-semibold text-lg text-[var(--color-text-primary)] mb-2">{c.seasonalTitle}</h3>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{c.seasonalBody}</p>
        </div>

        <div
          className="text-center p-8 rounded-lg"
          style={{ backgroundColor: "var(--accent-muted)" }}
        >
          <p className="font-serif font-semibold text-lg text-[var(--color-text-primary)] mb-2">{c.cta}</p>
          <p className="text-sm text-[var(--color-text-secondary)] mb-4">{c.ctaSub}</p>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-md text-sm font-medium text-white"
            style={{ backgroundColor: "var(--accent-500)" }}
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
