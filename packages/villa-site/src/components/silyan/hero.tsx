"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import type { Lang } from "../../lib/i18n";
import { villaPath } from "../../lib/villa-path";
import { WHATSAPP_BRAND_GREEN } from "../../lib/whatsapp-brand";
import { HERO_VIDEO, HERO_POSTER } from "../../lib/silyan-images";

type Props = {
  lang: Lang;
  phone: string;
  pathPrefix?: string;
};

type HeroCopy = {
  kicker: string;
  headline: string;
  subhead: string;
  cta1: string;
  cta2: string;
  scroll: string;
  videoHint: string;
};

const HERO_COPY: Record<string, HeroCopy> = {
  en: {
    kicker: "Hisarçandır · Antalya",
    headline: "Three private villas in the mountains above Antalya",
    subhead:
      "Private pools, mountain air, 8 km from the sea — your retreat near one of Turkey's most-visited cities.",
    cta1: "Explore Villas",
    cta2: "WhatsApp",
    scroll: "Scroll",
    videoHint: "Play video",
  },
  tr: {
    kicker: "Hisarçandır · Antalya",
    headline: "Antalya'nın doğasında üç özel villa",
    subhead:
      "Özel havuzlar, dağ havası, denize 8 km — Türkiye'nin en gözde şehrine yakın, sakin bir kaçış noktanız.",
    cta1: "Villaları Keşfet",
    cta2: "WhatsApp",
    scroll: "Kaydır",
    videoHint: "Videoyu oynat",
  },
  ar: {
    kicker: "هيسارتشاندير · أنطاليا",
    headline: "ثلاث فيلات خاصة في جبال أنطاليا",
    subhead:
      "مسابح خاصة، هواء جبلي نقي، 8 كيلومترات من البحر — ملاذك الهادئ بالقرب من أكثر مدن تركيا زيارةً.",
    cta1: "استكشف الفيلات",
    cta2: "واتساب",
    scroll: "مرر للأسفل",
    videoHint: "تشغيل الفيديو",
  },
  ru: {
    kicker: "Хисарчандыре · Анталия",
    headline: "Три частные виллы в горах над Анталией",
    subhead:
      "Частные бассейны, горный воздух, 8 км от моря — ваш уединённый отдых рядом с одним из самых популярных городов Турции.",
    cta1: "Смотреть виллы",
    cta2: "WhatsApp",
    scroll: "Вниз",
    videoHint: "Включить видео",
  },
};

function useMediaQuery(query: string): boolean | null {
  const [matches, setMatches] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const fn = () => setMatches(mq.matches);
    fn();
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, [query]);
  return matches;
}

export default function Hero({ lang, phone, pathPrefix = "" }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const isCoarse = useMediaQuery("(pointer: coarse)");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 52]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.52], [1, 0]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  const enableParallax = Boolean(!prefersReducedMotion && isCoarse === false);

  const tryLoadVideo = useCallback(() => {
    setVideoLoaded(true);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion && videoRef.current) {
      videoRef.current.pause();
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (isCoarse === null) return;

    const sd = Boolean(
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData,
    );
    setSaveData(sd);

    if (isCoarse === false) {
      if (!sd) tryLoadVideo();
      return;
    }

    const onInteract = () => {
      tryLoadVideo();
      window.removeEventListener("scroll", onInteract);
      window.removeEventListener("touchstart", onInteract);
      window.removeEventListener("pointerdown", onInteract);
    };
    window.addEventListener("scroll", onInteract, { once: true, passive: true });
    window.addEventListener("touchstart", onInteract, { once: true, passive: true });
    window.addEventListener("pointerdown", onInteract, { once: true, passive: true });
    return () => {
      window.removeEventListener("scroll", onInteract);
      window.removeEventListener("touchstart", onInteract);
      window.removeEventListener("pointerdown", onInteract);
    };
  }, [prefersReducedMotion, isCoarse, tryLoadVideo]);

  const copy = HERO_COPY[lang] ?? HERO_COPY.en!;
  const digits = phone.replace(/\D/g, "");
  const waHref = digits ? `https://wa.me/${digits}` : "#";

  const ctaBase =
    "inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 sm:px-7 rounded-xl text-[15px] sm:text-sm font-semibold tracking-wide transition-all duration-300 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80";

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
      style={{ backgroundColor: "#0f0d0a" }}
    >
      {/* ── Media layer ── */}
      <motion.div
        className="absolute inset-0"
        style={enableParallax ? { scale: mediaScale } : undefined}
      >
        {videoLoaded ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
            aria-hidden="true"
            poster={HERO_POSTER}
          >
            <source src={HERO_VIDEO} type="video/webm" />
          </video>
        ) : (
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={`relative h-full w-full ${prefersReducedMotion ? "" : "motion-safe:animate-hero-ken"}`}
            >
              <Image
                src={HERO_POSTER}
                alt=""
                fill
                priority
                quality={80}
                sizes="100vw"
                className="object-cover"
                aria-hidden
              />
            </div>
          </div>
        )}
      </motion.div>

      {/* ── Overlays (simplified — image breathes) ── */}
      <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
        {/* Top gradient: header legibility */}
        <div
          className="absolute inset-x-0 top-0 h-32 sm:h-40"
          style={{
            background:
              "linear-gradient(to bottom, rgba(15,13,10,0.55), transparent)",
          }}
        />
        {/* Desktop: subtle vignette for depth */}
        <div
          className="hidden sm:block absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% 40%, transparent 0%, rgba(5,4,3,0.22) 100%)",
          }}
        />
      </div>

      {/* ── Film-grain texture ── */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      {/* ── Video play button (mobile save-data) ── */}
      {!videoLoaded && !prefersReducedMotion && (isCoarse === true || saveData) && (
        <button
          type="button"
          onClick={tryLoadVideo}
          className="absolute end-3 top-[calc(env(safe-area-inset-top,0px)+4.25rem)] z-20 flex items-center gap-2 rounded-full border border-white/25 bg-black/40 px-3.5 py-2.5 text-xs font-semibold text-white/95 shadow-lg backdrop-blur-md transition hover:bg-black/55 active:scale-[0.97] sm:end-5 sm:top-[calc(env(safe-area-inset-top,0px)+5.5rem)]"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/18 ring-1 ring-white/20">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor" className="ms-0.5" aria-hidden>
              <path d="M2 1.5v9l8-4.5-8-4.5z" />
            </svg>
          </span>
          {copy.videoHint}
        </button>
      )}

      {/* ── Spacer: image shows through this transparent area ── */}
      <div className="relative z-10 flex-1" />

      {/* ── Content zone ── */}
      <motion.div
        className="relative z-10 w-full"
        style={enableParallax ? { y: textY, opacity: textOpacity } : undefined}
      >
        {/* Mobile: gradient transition from image into solid dark band */}
        <div
          className="h-28 sm:hidden"
          style={{
            background: "linear-gradient(to bottom, transparent, #0f0d0a)",
          }}
        />

        {/* Mobile: solid dark bg. Desktop: transparent (frosted panel handles readability) */}
        <div className="bg-[#0f0d0a] pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:bg-transparent sm:pb-[5.5rem] md:pb-24">
          <div className="content-wrapper">
            {/* Desktop: frosted glass panel, start-aligned. Mobile: content flows naturally */}
            <div className="sm:max-w-[36rem] sm:rounded-2xl sm:border sm:border-white/[0.12] sm:bg-black/35 sm:p-8 sm:shadow-[0_32px_80px_-12px_rgba(0,0,0,0.5)] sm:backdrop-blur-2xl md:max-w-[38rem] md:p-10">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55 sm:text-xs sm:tracking-[0.34em]">
                {copy.kicker}
              </p>

              <h1
                className="mb-4 font-serif text-balance font-semibold text-white sm:mb-5"
                style={{
                  fontSize: "clamp(1.75rem, 0.9rem + 4.5vw, 3.25rem)",
                  lineHeight: "1.08",
                  letterSpacing: "-0.02em",
                }}
              >
                {copy.headline}
              </h1>

              <p className="mb-7 max-w-[34rem] text-pretty text-[15px] leading-relaxed text-white/75 sm:mb-8 sm:text-base sm:leading-[1.65]">
                {copy.subhead}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:gap-3.5">
                <Link
                  href={villaPath(pathPrefix, `/${lang}/villas`)}
                  className={`${ctaBase} w-full text-white hover:shadow-[var(--shadow-glow)] hover:brightness-[1.07] sm:w-auto`}
                  style={{ backgroundColor: "var(--accent-500)" }}
                >
                  {copy.cta1}
                </Link>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${ctaBase} w-full border-0 text-white hover:brightness-110 hover:shadow-[0_14px_40px_rgba(37,211,102,0.35)] sm:w-auto`}
                  style={{ backgroundColor: WHATSAPP_BRAND_GREEN }}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="opacity-95" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {copy.cta2}
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Scroll indicator (desktop only — mobile scrolls naturally) ── */}
      <div
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-white/48 sm:flex"
        aria-hidden
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.28em]">
          {copy.scroll}
        </span>
        <svg width="22" height="30" viewBox="0 0 22 30" fill="none" className="motion-safe:animate-gentle-pulse opacity-85">
          <rect x="1.5" y="1.5" width="19" height="27" rx="9.5" stroke="currentColor" strokeWidth="1.25" />
          <circle cx="11" cy="9" r="2" fill="currentColor" className="motion-safe:animate-hero-wheel" />
        </svg>
      </div>
    </section>
  );
}
