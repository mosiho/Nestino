import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { VILLA_IMAGES } from "../lib/silyan-images";
import { villaPath } from "../lib/villa-path";
import GallerySection from "./villa-detail-gallery";

type VillaData = {
  slug: string;
  name: string;
  bedrooms: number;
  baths: number;
  maxGuests: number;
  desc: Record<string, string>;
  whatsappMsg: Record<string, string>;
};

const VILLAS: Record<string, VillaData> = {
  badem: {
    slug: "badem",
    name: "Villa Badem",
    bedrooms: 3,
    baths: 3,
    maxGuests: 6,
    desc: {
      en: "Named after the almond tree, Villa Badem is a sun-filled three-bedroom retreat designed for families or small groups of up to six. A private pool and shaded garden give you room to settle in — morning swims before the heat, evenings outdoors with the mountain air cooling things down. Every bedroom has its own bathroom. The kitchen is fully equipped for self-catering or light cooking. Antalya is 12 km away when you're ready for it.",
      tr: "Bademden adını alan Villa Badem, aileler veya altı kişiye kadar küçük gruplar için tasarlanmış, güneş dolu üç yatak odalı bir tatil evidir. Özel havuz ve gölgeli bahçe, sabah yüzmeleri ve dağ havasının serinlettiği akşam keyifleri için ideal bir alan sunar. Her yatak odasının kendi banyosu vardır. Mutfak kendi yemeklerinizi pişirmeniz için tam donanımlıdır.",
      ar: "سميت على اسم شجرة اللوز، فيلا بادم هي ملاذ مشمس من ثلاث غرف نوم مصمم للعائلات أو المجموعات الصغيرة حتى ستة أشخاص. مسبح خاص وحديقة مظللة يوفران مساحة مريحة — سباحة صباحية قبل الحرارة، وأمسيات في الهواء الطلق مع نسيم الجبل المنعش.",
      ru: "Названная в честь миндального дерева, вилла Бадем — это залитый солнцем трёхспальный отдых для семей или небольших компаний до шести человек. Частный бассейн и тенистый сад дают пространство для комфортного отдыха — утренние заплывы до жары, вечера на свежем горном воздухе.",
    },
    whatsappMsg: {
      en: "Hello, I'm interested in booking Villa Badem at Silyan Villas.",
      tr: "Merhaba, Villa Badem hakkında bilgi almak istiyorum.",
      ar: "مرحباً، أريد الاستفسار عن حجز فيلا بادم.",
      ru: "Здравствуйте, хочу узнать о бронировании виллы Бадем.",
    },
  },
  defne: {
    slug: "defne",
    name: "Villa Defne",
    bedrooms: 5,
    baths: 5,
    maxGuests: 10,
    desc: {
      en: "The largest of the three, Villa Defne sleeps up to ten guests across five en-suite bedrooms — ideal for extended families, two-family trips, or larger groups who want privacy without sacrificing proximity. The private pool and garden face the mountain ridge. Antalya Airport is 22 km; Konyaaltı Beach is 8.",
      tr: "Üç villanın en büyüğü olan Villa Defne, beş suit yatak odasıyla on misafir kapasitelidir. Geniş aileler, iki aile grupları veya mahremiyet isteyen büyük gruplar için idealdir. Özel havuz ve bahçe dağ sırasına bakar.",
      ar: "أكبر الفيلات الثلاث، فيلا دفني تتسع لعشرة ضيوف في خمس غرف نوم مع حمام خاص — مثالية للعائلات الممتدة أو المجموعات الكبيرة. المسبح الخاص والحديقة يطلان على سلسلة الجبال.",
      ru: "Самая большая из трёх, вилла Дефне вмещает до десяти гостей в пяти спальнях с собственными ванными — идеальна для больших семей или групп. Частный бассейн и сад с видом на горный хребет.",
    },
    whatsappMsg: {
      en: "Hello, I'm interested in booking Villa Defne at Silyan Villas.",
      tr: "Merhaba, Villa Defne hakkında bilgi almak istiyorum.",
      ar: "مرحباً، أريد الاستفسار عن حجز فيلا دفني.",
      ru: "Здравствуйте, хочу узнать о бронировании виллы Дефне.",
    },
  },
  incir: {
    slug: "incir",
    name: "Villa İncir",
    bedrooms: 3,
    baths: 3,
    maxGuests: 6,
    desc: {
      en: "Villa İncir — named for the fig tree — mirrors Badem in layout: three bedrooms, each with its own bathroom, sleeping six. A quiet villa for a couple of families or a group of friends who want their own space, their own pool, and a stretch of mountain calm before the day begins.",
      tr: "İncir ağacından adını alan Villa İncir, Badem ile aynı yerleşime sahiptir: üç yatak odası, her birinin kendi banyosu var, altı kişi kapasiteli. Kendi alanını, kendi havuzunu ve günün başlangıcından önce dağ huzurunu isteyen aileler veya arkadaş grupları için sessiz bir villa.",
      ar: "فيلا إنجير — سميت على اسم شجرة التين — تتشابه مع بادم في التصميم: ثلاث غرف نوم، لكل منها حمام خاص، تتسع لستة أشخاص. فيلا هادئة لعائلتين أو مجموعة أصدقاء يريدون مساحتهم الخاصة.",
      ru: "Вилла Инджир — названная в честь смоковницы — зеркально повторяет планировку Бадем: три спальни с собственными ванными, вместимость шесть человек. Тихая вилла для семей или друзей, желающих собственного пространства.",
    },
    whatsappMsg: {
      en: "Hello, I'm interested in booking Villa İncir at Silyan Villas.",
      tr: "Merhaba, Villa İncir hakkında bilgi almak istiyorum.",
      ar: "مرحباً، أريد الاستفسار عن حجز فيلا إنجير.",
      ru: "Здравствуйте, хочу узнать о бронировании виллы Инджир.",
    },
  },
};

const AMENITIES = [
  "wifi", "kitchen", "dishwasher", "washer", "oven", "microwave",
  "tv", "iron", "hairdryer", "tea_coffee", "pool", "garden", "parking",
] as const;

const AMENITY_LABELS: Record<string, Record<string, string>> = {
  en: { wifi: "Free WiFi", kitchen: "Full Kitchen", dishwasher: "Dishwasher", washer: "Washing Machine", oven: "Oven", microwave: "Microwave", tv: "Satellite TV", iron: "Iron", hairdryer: "Hair Dryer", tea_coffee: "Tea/Coffee Maker", pool: "Private Pool", garden: "Private Garden", parking: "Private Parking" },
  tr: { wifi: "Ücretsiz WiFi", kitchen: "Tam Donanımlı Mutfak", dishwasher: "Bulaşık Makinesi", washer: "Çamaşır Makinesi", oven: "Fırın", microwave: "Mikrodalga", tv: "Uydu TV", iron: "Ütü", hairdryer: "Saç Kurutma", tea_coffee: "Çay/Kahve Makinesi", pool: "Özel Havuz", garden: "Özel Bahçe", parking: "Özel Otopark" },
  ar: { wifi: "واي فاي مجاني", kitchen: "مطبخ كامل", dishwasher: "غسالة أطباق", washer: "غسالة ملابس", oven: "فرن", microwave: "ميكروويف", tv: "تلفزيون فضائي", iron: "مكواة", hairdryer: "مجفف شعر", tea_coffee: "صانعة شاي/قهوة", pool: "مسبح خاص", garden: "حديقة خاصة", parking: "موقف سيارات خاص" },
  ru: { wifi: "Бесплатный WiFi", kitchen: "Полная кухня", dishwasher: "Посудомоечная машина", washer: "Стиральная машина", oven: "Духовка", microwave: "Микроволновая печь", tv: "Спутниковое ТВ", iron: "Утюг", hairdryer: "Фен", tea_coffee: "Чайник/кофеварка", pool: "Частный бассейн", garden: "Частный сад", parking: "Частная парковка" },
};

const AMENITY_ICONS: Record<string, string> = {
  wifi: "📶", kitchen: "🍳", dishwasher: "🫧", washer: "👕", oven: "🔥", microwave: "📡",
  tv: "📺", iron: "👔", hairdryer: "💨", tea_coffee: "☕", pool: "🏊", garden: "🌿", parking: "🅿️",
};

const LABELS: Record<string, Record<string, string>> = {
  en: { specs: "Specifications", bedrooms: "Bedrooms", bathrooms: "Bathrooms", maxGuests: "Max Guests", pool: "Pool", views: "Views", parking: "Parking", amenities: "Amenities", houseRules: "House Rules", checkIn: "Check-in", checkOut: "Check-out", minStay: "Minimum stay", noSmoking: "No smoking", noPets: "No pets", cta: "Inquire about this villa", whatsapp: "Message on WhatsApp", otherVillas: "Other villas", gallery: "Gallery", private: "Private, in-garden", mountain: "Mountain & garden", privateParking: "Private, on-site" },
  tr: { specs: "Özellikler", bedrooms: "Yatak Odaları", bathrooms: "Banyolar", maxGuests: "Maks. Misafir", pool: "Havuz", views: "Manzara", parking: "Otopark", amenities: "Olanaklar", houseRules: "Ev Kuralları", checkIn: "Giriş", checkOut: "Çıkış", minStay: "Minimum konaklama", noSmoking: "Sigara içilmez", noPets: "Evcil hayvan yok", cta: "Bu villa için bilgi al", whatsapp: "WhatsApp ile mesaj", otherVillas: "Diğer villalar", gallery: "Galeri", private: "Özel, bahçe içinde", mountain: "Dağ ve bahçe", privateParking: "Özel, yerleşke içinde" },
  ar: { specs: "المواصفات", bedrooms: "غرف النوم", bathrooms: "الحمامات", maxGuests: "أقصى عدد ضيوف", pool: "المسبح", views: "الإطلالة", parking: "الموقف", amenities: "المرافق", houseRules: "قواعد المنزل", checkIn: "تسجيل الدخول", checkOut: "تسجيل الخروج", minStay: "الحد الأدنى للإقامة", noSmoking: "ممنوع التدخين", noPets: "ممنوع الحيوانات الأليفة", cta: "استفسر عن هذه الفيلا", whatsapp: "أرسل رسالة واتساب", otherVillas: "فيلات أخرى", gallery: "معرض الصور", private: "خاص، في الحديقة", mountain: "جبل وحديقة", privateParking: "خاص، في الموقع" },
  ru: { specs: "Характеристики", bedrooms: "Спальни", bathrooms: "Ванные", maxGuests: "Макс. гостей", pool: "Бассейн", views: "Виды", parking: "Парковка", amenities: "Удобства", houseRules: "Правила дома", checkIn: "Заезд", checkOut: "Выезд", minStay: "Мин. проживание", noSmoking: "Не курить", noPets: "Без животных", cta: "Узнать об этой вилле", whatsapp: "Написать в WhatsApp", otherVillas: "Другие виллы", gallery: "Галерея", private: "Частный, в саду", mountain: "Горы и сад", privateParking: "Частная, на территории" },
};

type Props = { params: Promise<{ lang: string; slug: string; siteSlug?: string }>; pathPrefix?: string };

export async function generateVillaDetailMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const villa = VILLAS[slug];
  if (!villa) return { title: "Villa" };
  return { title: villa.name };
}

export default async function VillaDetailPage({ params, pathPrefix = "" }: { params: { lang: string; slug: string }; pathPrefix?: string }) {
  const { lang, slug } = params;
  const villa = VILLAS[slug];
  if (!villa) { notFound(); }

  const images = VILLA_IMAGES[slug];
  const l = (LABELS[lang] ?? LABELS.en) as Record<string, string>;
  const amenityLabels = (AMENITY_LABELS[lang] ?? AMENITY_LABELS.en) as Record<string, string>;
  const desc = villa.desc[lang] ?? villa.desc.en!;
  const waMsg = villa.whatsappMsg[lang] ?? villa.whatsappMsg.en!;
  const waHref = `https://wa.me/905316960953?text=${encodeURIComponent(waMsg)}`;
  const otherVillas = Object.values(VILLAS).filter((v) => v.slug !== slug);

  return (
    <div className="pt-24 pb-16">
      <div className="content-wrapper">
        {/* Hero image */}
        {images && (
          <div className="relative aspect-[21/9] rounded-lg overflow-hidden mb-8 shadow-[var(--shadow-md)]">
            <Image
              src={images.card}
              alt={villa.name}
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)" }}
            />
            <div className="absolute bottom-6 left-6">
              <h1 className="text-white font-serif font-semibold text-3xl md:text-4xl drop-shadow-lg">
                {villa.name}
              </h1>
            </div>
          </div>
        )}

        {!images && (
          <h1 className="font-serif font-semibold text-h1 text-[var(--color-text-primary)] mb-6">
            {villa.name}
          </h1>
        )}

        {/* Description */}
        <p className="text-[var(--color-text-secondary)] leading-relaxed text-base max-w-3xl mb-10">
          {desc}
        </p>

        {/* Specs table */}
        <div className="mb-10">
          <h2 className="font-serif font-semibold text-h3 text-[var(--color-text-primary)] mb-4">
            {l.specs}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: l.bedrooms!, value: `${villa.bedrooms} (en-suite)` },
              { label: l.bathrooms!, value: `${villa.baths}` },
              { label: l.maxGuests!, value: `${villa.maxGuests}` },
              { label: l.pool!, value: l.private! },
              { label: l.views!, value: l.mountain! },
              { label: l.parking!, value: l.privateParking! },
            ].map(({ label, value }) => (
              <div key={label} className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-1">{label}</p>
                <p className="text-sm font-medium text-[var(--color-text-primary)]">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery */}
        {images && (
          <GallerySection images={images} villaName={villa.name} galleryLabel={l.gallery ?? "Gallery"} />
        )}

        {/* Amenities */}
        <div className="mb-10">
          <h2 className="font-serif font-semibold text-h3 text-[var(--color-text-primary)] mb-4">
            {l.amenities}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {AMENITIES.map((key) => (
              <div key={key} className="flex items-center gap-3 p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
                <span className="text-lg">{AMENITY_ICONS[key]}</span>
                <span className="text-sm text-[var(--color-text-primary)]">{amenityLabels[key]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* House rules */}
        <div className="mb-10">
          <h2 className="font-serif font-semibold text-h3 text-[var(--color-text-primary)] mb-4">
            {l.houseRules}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: l.checkIn!, value: "15:00" },
              { label: l.checkOut!, value: "12:00" },
              { label: l.minStay!, value: lang === "tr" ? "2 gece" : lang === "ar" ? "ليلتان" : lang === "ru" ? "2 ночи" : "2 nights" },
              { label: l.noSmoking!, value: "🚭" },
              { label: l.noPets!, value: "🐾 ✕" },
            ].map(({ label, value }) => (
              <div key={label} className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-1">{label}</p>
                <p className="text-sm font-medium text-[var(--color-text-primary)]">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="rounded-lg p-6 md:p-8 mb-10 text-center"
          style={{ backgroundColor: "var(--accent-muted)" }}
        >
          <h2 className="font-serif font-semibold text-h3 text-[var(--color-text-primary)] mb-3">
            {l.cta}
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={villaPath(pathPrefix, `/${lang}/contact`)}
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-md text-sm font-medium text-white transition-colors hover:brightness-110"
              style={{ backgroundColor: "var(--accent-500)" }}
            >
              {l.cta}
            </Link>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md text-sm font-medium border border-[var(--color-border-strong)] text-[var(--color-text-primary)] hover:border-[var(--accent-500)] transition-colors bg-[var(--color-surface)]"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="#25D366" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {l.whatsapp}
            </a>
          </div>
        </div>

        {/* Related villas */}
        <div>
          <h2 className="font-serif font-semibold text-h3 text-[var(--color-text-primary)] mb-4">
            {l.otherVillas}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {otherVillas.map((v) => {
              const img = VILLA_IMAGES[v.slug]?.card;
              return (
                <Link
                  key={v.slug}
                  href={villaPath(pathPrefix, `/${lang}/villas/${v.slug}`)}
                  className="group rounded-lg overflow-hidden border border-[var(--color-border)] hover:border-[var(--accent-500)] hover:shadow-[var(--shadow-md)] transition-all bg-[var(--color-surface)]"
                >
                  <div className="aspect-[16/9] relative overflow-hidden bg-[var(--color-border)]">
                    {img && (
                      <Image
                        src={img}
                        alt={v.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif font-semibold text-base text-[var(--color-text-primary)]">{v.name}</h3>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1">
                      {v.bedrooms} {(l.bedrooms ?? "bedrooms").toLowerCase()} · {v.maxGuests} {(l.maxGuests ?? "guests").toLowerCase()}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
