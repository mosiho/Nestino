"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import type { Lang } from "../../lib/i18n";
import { villaPath } from "../../lib/villa-path";
import { HERO_VIDEO, HERO_POSTER } from "../../lib/silyan-images";

type Props = {
  lang: Lang;
  phone: string;
  pathPrefix?: string;
};

const HERO_COPY: Record<string, { headline: string; subhead: string; cta1: string; cta2: string }> = {
  en: {
    headline: "Three private villas in the mountains above Antalya",
    subhead: "Private pools, mountain air, 8 km from the sea — your retreat near one of Turkey's most-visited cities.",
    cta1: "Explore Villas",
    cta2: "WhatsApp Us",
  },
  tr: {
    headline: "Antalya'nın doğasında üç özel villa",
    subhead: "Özel havuzlar, dağ havası, denize 8 km — Türkiye'nin en gözde şehrine yakın, sakin bir kaçış noktanız.",
    cta1: "Villaları Keşfet",
    cta2: "WhatsApp",
  },
  ar: {
    headline: "ثلاث فيلات خاصة في جبال أنطاليا",
    subhead: "مسابح خاصة، هواء جبلي نقي، 8 كيلومترات من البحر — ملاذك الهادئ بالقرب من أكثر مدن تركيا زيارةً.",
    cta1: "استكشف الفيلات",
    cta2: "واتساب",
  },
  ru: {
    headline: "Три частные виллы в горах над Анталией",
    subhead: "Частные бассейны, горный воздух, 8 км от моря — ваш уединённый отдых рядом с одним из самых популярных городов Турции.",
    cta1: "Смотреть виллы",
    cta2: "WhatsApp",
  },
};

export default function Hero({ lang, phone, pathPrefix = "" }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches && videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) {
      const onInteract = () => {
        setVideoLoaded(true);
        window.removeEventListener("scroll", onInteract);
        window.removeEventListener("touchstart", onInteract);
      };
      window.addEventListener("scroll", onInteract, { once: true, passive: true });
      window.addEventListener("touchstart", onInteract, { once: true, passive: true });
      return () => {
        window.removeEventListener("scroll", onInteract);
        window.removeEventListener("touchstart", onInteract);
      };
    }
    setVideoLoaded(true);
  }, []);

  const copy = HERO_COPY[lang] ?? HERO_COPY.en!;
  const digits = phone.replace(/\D/g, "");
  const waHref = digits ? `https://wa.me/${digits}` : "#";
  const isCoarsePointer = typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)").matches;

  return (
    <section
      ref={sectionRef}
      className="relative flex items-end justify-center overflow-hidden"
      style={{ backgroundColor: "#1a1610", minHeight: "100svh" }}
    >
      {videoLoaded && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
          poster={HERO_POSTER}
        >
          <source src={HERO_VIDEO} type="video/webm" />
        </video>
      )}

      {!videoLoaded && (
        <img
          src={HERO_POSTER}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
      )}

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(10,8,5,0.78) 0%, rgba(10,8,5,0.40) 40%, rgba(10,8,5,0.15) 70%, rgba(10,8,5,0.25) 100%)",
        }}
        aria-hidden="true"
      />

      <motion.div
        className="relative content-wrapper text-center text-white z-10 pb-16 pt-32 sm:pb-20 sm:pt-40 md:pb-24"
        style={
          !prefersReducedMotion && !isCoarsePointer
            ? { y: textY, opacity: textOpacity }
            : undefined
        }
      >
        <h1
          className="font-serif font-semibold mb-4 animate-fade-up"
          style={{ fontSize: "clamp(1.75rem, 6vw, 3.5rem)", lineHeight: "1.08", letterSpacing: "-0.01em" }}
        >
          {copy.headline}
        </h1>

        {/* Gold decorative divider */}
        <div
          className="mx-auto mb-5 animate-fade-up"
          style={{
            width: "48px",
            height: "1.5px",
            background: "var(--gold-accent)",
            opacity: 0.6,
            animationDelay: "60ms",
          }}
        />

        <p
          className="mx-auto mb-10 text-white/80 animate-fade-up"
          style={{
            maxWidth: "580px",
            fontSize: "clamp(0.9375rem, 2vw, 1.125rem)",
            lineHeight: "1.65",
            animationDelay: "100ms",
          }}
        >
          {copy.subhead}
        </p>

        <div
          className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-up"
          style={{ animationDelay: "180ms" }}
        >
          {/* On mobile, WhatsApp first (higher intent) */}
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md text-sm font-medium backdrop-blur-md border border-white/20 text-white hover:bg-white/15 transition-all duration-300 active:scale-[0.97] order-2 sm:order-2 w-full sm:w-auto"
            style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {copy.cta2}
          </a>
          <Link
            href={villaPath(pathPrefix, `/${lang}/villas`)}
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-md text-sm font-medium text-white transition-all duration-300 hover:shadow-[var(--shadow-glow)] hover:brightness-110 active:scale-[0.97] order-1 sm:order-1 w-full sm:w-auto"
            style={{ backgroundColor: "var(--accent-500)" }}
          >
            {copy.cta1}
          </Link>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 z-10 hidden sm:block" aria-hidden="true">
        <svg width="20" height="28" viewBox="0 0 20 28" fill="none" className="animate-gentle-pulse">
          <rect x="1" y="1" width="18" height="26" rx="9" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="10" cy="8" r="2" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
}
