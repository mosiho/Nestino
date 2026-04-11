import type { Metadata } from "next";
import { headers } from "next/headers";

import { isLang, type Lang } from "../lib/i18n";
import { resolveRequestOrigin } from "../lib/site-origin";
import { villaPath } from "../lib/villa-path";

type Props = { params: Promise<{ lang: string; siteSlug?: string }>; pathPrefix: string };

const META: Record<string, { title: string; description: string }> = {
  en: {
    title: "About — Silyan Villas",
    description: "Family-run boutique villas in Hisarçandır — three independent homes with private pools, managed directly by the hosts.",
  },
  tr: {
    title: "Hakkımızda — Silyan Villas",
    description: "Hisarçandır'da aile işletmesi butik villalar — özel havuzlu üç bağımsız ev, doğrudan ev sahipleri tarafından yönetilir.",
  },
  ar: {
    title: "من نحن — سيليان فيلاز",
    description: "فيلات بوتيك عائلية في هيسارتشاندير — ثلاث منازل مستقلة بمسابح خاصة.",
  },
  ru: {
    title: "О нас — Silyan Villas",
    description: "Семейные бутик-виллы в Хисарчандыре — три независимых дома с частными бассейнами.",
  },
};

const COPY: Record<
  string,
  { h1: string; p1: string; p2: string; bulletsTitle: string; bullets: string[] }
> = {
  en: {
    h1: "A local family, three villas, one standard",
    p1:
      "Silyan Villas was created by a local family with roots in the Konyaaltı hills — people who knew the land well enough to know what others were missing. The villas are designed around the pace of the mountain: slow mornings, shade in the afternoon, warm evenings in the garden. Three independent villas, each with its own character, all sharing the same standard: clean, complete, cared for.",
    p2:
      "We manage the property ourselves. When you arrive, you're not checking into a hotel — you're staying in something someone cares about.",
    bulletsTitle: "What matters to us",
    bullets: [
      "Independent, family-run hosting",
      "Direct relationship with guests — no agency layer",
      "Pride in the setting and the craft of hospitality",
    ],
  },
  tr: {
    h1: "Yerel bir aile, üç villa, tek standart",
    p1:
      "Silyan Villas, Konyaaltı tepelerinde kökleri olan yerel bir aile tarafından oluşturuldu — başkalarının özlediği şeyi bilen insanlar. Villalar, dağın temposu etrafında tasarlandı: yavaş sabahlar, öğleden sonra gölge, bahçede sıcak akşamlar. Her biri kendi karakterine sahip üç bağımsız villa; hepsi aynı standardı paylaşır: temiz, eksiksiz, özenli.",
    p2:
      "Mülkü kendimiz yönetiyoruz. Geldiğinizde bir otele giriş yapmıyorsunuz — birinin önemsediği bir yerde kalıyorsunuz.",
    bulletsTitle: "Bizim için önemli olanlar",
    bullets: [
      "Bağımsız, aile işletmesi misafirperverlik",
      "Misafirlerle doğrudan ilişki — aracı katman yok",
      "Mekâna ve misafirperverlik zanaatına gurur",
    ],
  },
  ar: {
    h1: "عائلة محلية، ثلاث فيلات، معيار واحد",
    p1:
      "أسست سيليان فيلاز عائلة محلية لها جذور في تلال كونيالتي — أناس عرفوا الأرض جيداً ليعرفوا ما يفتقده الآخرون. صممت الفيلات على وتيرة الجبل: صباحات هادئة، ظل بعد الظهر، أمسيات دافئة في الحديقة. ثلاث فيلات مستقلة، لكل منها طابعها الخاص، وجميعها تشترك في المعيار نفسه: نظيفة، كاملة، معتنى بها.",
    p2:
      "ندير المكان بأنفسنا. عند وصولك، لا تسجل دخولك في فندق — أنت تقيم في مكان يهتم به أحد ما.",
    bulletsTitle: "ما يهمنا",
    bullets: [
      "استضافة عائلية مستقلة",
      "علاقة مباشرة مع الضيوف — دون وسيط",
      "الفخر بالمكان وحرفية الضيافة",
    ],
  },
  ru: {
    h1: "Местная семья, три виллы, один стандарт",
    p1:
      "Silyan Villas создана местной семьёй с корнями в холмах Конъяалты — людьми, которые знали землю достаточно хорошо, чтобы понять, чего не хватает гостям. Виллы выстроены вокруг ритма гор: неторопливые утра, тень днём, тёплые вечера в саду. Три независимые виллы, у каждой свой характер, общий стандарт: чисто, полно, с заботой.",
    p2:
      "Мы сами ведём объект. По приезде вы не заселяетесь в отель — вы останавливаетесь там, о чём кто-то искренне заботится.",
    bulletsTitle: "Что для нас важно",
    bullets: [
      "Независимый семейный хостинг",
      "Прямой контакт с гостями — без агентского слоя",
      "Гордость местом и ремеслом гостеприимства",
    ],
  },
};

export async function generateAboutMetadata({ params, pathPrefix }: Props): Promise<Metadata> {
  const { lang } = await params;
  const meta = META[lang] ?? META.en!;
  const h = await headers();
  const origin = resolveRequestOrigin(h.get("host"));
  const path = villaPath(pathPrefix, `/${lang}/about`);
  return {
    title: meta.title,
    description: meta.description,
    openGraph: { title: meta.title, description: meta.description, url: `${origin.origin}${path}` },
  };
}

export default async function AboutPage({ params, pathPrefix }: Props) {
  const { lang } = await params;
  const safeLang: Lang = isLang(lang) ? lang : "en";
  const c = COPY[safeLang] ?? COPY.en!;

  return (
    <div className="pt-24 pb-16 section-y">
      <div className="content-wrapper max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--accent-500)" }}>
          {safeLang === "tr" ? "Hakkımızda" : safeLang === "ar" ? "من نحن" : safeLang === "ru" ? "О нас" : "About"}
        </p>
        <h1 className="font-serif font-semibold text-h1 text-[var(--color-text-primary)] mb-6">{c.h1}</h1>
        <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">{c.p1}</p>
        <p className="text-[var(--color-text-secondary)] leading-relaxed mb-10">{c.p2}</p>
        <h2 className="font-serif font-semibold text-h3 text-[var(--color-text-primary)] mb-4">{c.bulletsTitle}</h2>
        <ul className="space-y-3">
          {c.bullets.map((b) => (
            <li key={b} className="flex gap-2 text-[var(--color-text-secondary)]">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--accent-500)" }} />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
