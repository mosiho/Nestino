"use client";

import { useState } from "react";
import Image from "next/image";
import type { VillaImageSet } from "../lib/silyan-images";

type Props = {
  images: VillaImageSet;
  villaName: string;
  galleryLabel: string;
};

export default function GallerySection({ images, villaName, galleryLabel }: Props) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const gallery = images.gallery;

  return (
    <>
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--accent-500)" }}>
          {galleryLabel}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {gallery.slice(0, 8).map((src, i) => (
            <button
              key={i}
              onClick={() => setLightboxIdx(i)}
              className="relative aspect-[4/3] rounded-md overflow-hidden bg-[var(--color-border)] cursor-pointer group"
            >
              <Image
                src={src}
                alt={`${villaName} — photo ${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {i === 7 && gallery.length > 8 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">+{gallery.length - 8}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center p-4"
          style={{ zIndex: "var(--z-lightbox)" }}
          onClick={() => setLightboxIdx(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl z-10"
            onClick={() => setLightboxIdx(null)}
            aria-label="Close"
          >
            ✕
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl z-10"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx(lightboxIdx > 0 ? lightboxIdx - 1 : gallery.length - 1); }}
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl z-10"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx(lightboxIdx < gallery.length - 1 ? lightboxIdx + 1 : 0); }}
            aria-label="Next"
          >
            ›
          </button>
          <div className="relative max-w-5xl w-full aspect-video" onClick={(e) => e.stopPropagation()}>
            <Image
              src={gallery[lightboxIdx]!}
              alt={`${villaName} — photo ${lightboxIdx + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {lightboxIdx + 1} / {gallery.length}
          </p>
        </div>
      )}
    </>
  );
}
