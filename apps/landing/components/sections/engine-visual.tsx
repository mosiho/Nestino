"use client";

import { motion, useReducedMotion } from "framer-motion";

import { useLocaleContext } from "@/components/i18n/locale-provider";
import { AnimateIn } from "@/components/ui/animate-in";
import { SectionHeader } from "@/components/ui/section-header";

const SOURCE_KEYS = [
  "google",
  "chatgpt",
  "perplexity",
  "instagram",
  "direct",
] as const;

const SOURCE_YS = [28, 76, 124, 172, 220] as const;

const OUTPUT_KEYS = ["inquiry", "whatsapp", "phone", "email"] as const;
const OUTPUT_IDS = ["inq", "wa", "ph", "em"] as const;
const OUTPUT_YS = [20, 76, 132, 188] as const;

const MOBILE = {
  w: 320,
  h: 560,
  cx: 160,
  sourceRect: { x: 100, w: 120, h: 36 },
  hubRect: { x: 100, y: 234, w: 120, h: 100 },
  hubCy: 284,
  hubR: 64,
  outputRect: { x: 90, w: 140, h: 40 },
};

export function EngineVisualSection() {
  const reduced = useReducedMotion();
  const { messages } = useLocaleContext();
  const e = messages.engine;
  const src = e.sources;

  const sources = SOURCE_KEYS.map((k, i) => ({
    id: k,
    label: src[k],
    y: SOURCE_YS[i]!,
  }));

  const outputs = OUTPUT_KEYS.map((k, i) => ({
    id: OUTPUT_IDS[i]!,
    label: e.outputs[k],
    y: OUTPUT_YS[i]!,
  }));

  const mobileSources = sources.map((s, i) => ({
    ...s,
    y: 14 + i * 44,
  }));

  const mobileOutputs = outputs.map((o, i) => ({
    ...o,
    y: 358 + i * 44,
  }));

  return (
    <section
      className="scroll-mt-20 border-b border-border/80 bg-surface/40 py-20 sm:py-24"
      id="engine"
      aria-labelledby="engine-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          badge={e.badge}
          title={e.title}
          subtitle={e.subtitle}
        />

        <AnimateIn delay={0.12} className="mt-14">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-background p-6 shadow-md sm:p-10">
            <div className="mx-auto max-w-4xl">
              <svg
                viewBox="0 0 720 280"
                className="hidden h-auto w-full text-foreground lg:block"
                aria-hidden
              >
                <defs>
                  <linearGradient id="hubGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0d9488" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#0d9488" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                {sources.map((s, i) => (
                  <motion.g
                    key={s.id}
                    initial={reduced ? false : { opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                  >
                    <rect
                      x={40}
                      y={s.y}
                      width={120}
                      height={36}
                      rx={10}
                      className="fill-surface stroke-border"
                      strokeWidth={1}
                    />
                    <text
                      x={100}
                      y={s.y + 23}
                      textAnchor="middle"
                      className="fill-foreground"
                      style={{ fontSize: 11, fontWeight: 600 }}
                    >
                      {s.label}
                    </text>
                  </motion.g>
                ))}

                <motion.g
                  initial={reduced ? false : { scale: 0.92, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45 }}
                >
                  {!reduced ? (
                    <motion.circle
                      cx={360}
                      cy={140}
                      r={78}
                      fill="url(#hubGlow)"
                      animate={{ opacity: [0.5, 0.9, 0.5] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                    />
                  ) : (
                    <circle cx={360} cy={140} r={78} fill="url(#hubGlow)" />
                  )}
                  <rect
                    x={300}
                    y={88}
                    width={120}
                    height={104}
                    rx={20}
                    className="fill-accent/15 stroke-accent/50"
                    strokeWidth={2}
                  />
                  <text
                    x={360}
                    y={128}
                    textAnchor="middle"
                    className="fill-foreground"
                    style={{ fontSize: 12, fontWeight: 700 }}
                  >
                    {e.hubName}
                  </text>
                  <text
                    x={360}
                    y={148}
                    textAnchor="middle"
                    className="fill-muted"
                    style={{ fontSize: 10, fontWeight: 600 }}
                  >
                    {e.hubSubtitle}
                  </text>
                  <text
                    x={360}
                    y={172}
                    textAnchor="middle"
                    className="fill-muted"
                    style={{ fontSize: 9 }}
                  >
                    {e.hubMeta}
                  </text>
                </motion.g>

                {outputs.map((o, i) => (
                  <motion.g
                    key={o.id}
                    initial={reduced ? false : { opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.06, duration: 0.4 }}
                  >
                    <rect
                      x={560}
                      y={o.y}
                      width={140}
                      height={40}
                      rx={10}
                      className="fill-background stroke-border"
                      strokeWidth={1}
                    />
                    <text
                      x={630}
                      y={o.y + 25}
                      textAnchor="middle"
                      className="fill-foreground"
                      style={{ fontSize: 11, fontWeight: 600 }}
                    >
                      {o.label}
                    </text>
                  </motion.g>
                ))}

                <g className="stroke-border" strokeWidth={1.5} fill="none">
                  <path d="M 160 46 L 300 110" />
                  <path d="M 160 94 L 300 120" />
                  <path d="M 160 142 L 300 130" />
                  <path d="M 160 190 L 300 140" />
                  <path d="M 160 238 L 300 150" />
                  <path d="M 420 110 L 560 40" />
                  <path d="M 420 120 L 560 96" />
                  <path d="M 420 130 L 560 152" />
                  <path d="M 420 140 L 560 208" />
                </g>

                {!reduced ? (
                  <g className="text-accent" fill="currentColor">
                    <motion.circle
                      cx={230}
                      cy={100}
                      r={4}
                      animate={{ opacity: [0.3, 1, 0.3], cx: [200, 320, 340] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.circle
                      cx={230}
                      cy={140}
                      r={4}
                      animate={{ opacity: [0.3, 1, 0.3], cx: [200, 330, 350] }}
                      transition={{
                        duration: 3.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.4,
                      }}
                    />
                    <motion.circle
                      cx={400}
                      cy={130}
                      r={4}
                      animate={{ opacity: [0.3, 1, 0.3], cx: [400, 520, 600] }}
                      transition={{
                        duration: 3.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.8,
                      }}
                    />
                  </g>
                ) : null}
              </svg>

              <svg
                viewBox={`0 0 ${MOBILE.w} ${MOBILE.h}`}
                className="mx-auto h-auto w-full max-w-sm text-foreground lg:hidden"
                aria-hidden
              >
                <defs>
                  <linearGradient
                    id="hubGlowMobile"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#0d9488" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#0d9488" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                <g className="stroke-border" strokeWidth={1.5} fill="none">
                  {mobileSources.map((s) => (
                    <path
                      key={`in-${s.id}`}
                      d={`M ${MOBILE.cx} ${s.y + MOBILE.sourceRect.h} L ${MOBILE.cx} ${MOBILE.hubRect.y}`}
                    />
                  ))}
                  {mobileOutputs.map((o) => (
                    <path
                      key={`out-${o.id}`}
                      d={`M ${MOBILE.cx} ${MOBILE.hubRect.y + MOBILE.hubRect.h} L ${MOBILE.cx} ${o.y}`}
                    />
                  ))}
                </g>

                {mobileSources.map((s, i) => (
                  <motion.g
                    key={`m-${s.id}`}
                    initial={reduced ? false : { opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.35 }}
                  >
                    <rect
                      x={MOBILE.sourceRect.x}
                      y={s.y}
                      width={MOBILE.sourceRect.w}
                      height={MOBILE.sourceRect.h}
                      rx={10}
                      className="fill-surface stroke-border"
                      strokeWidth={1}
                    />
                    <text
                      x={MOBILE.cx}
                      y={s.y + 23}
                      textAnchor="middle"
                      className="fill-foreground"
                      style={{ fontSize: 11, fontWeight: 600 }}
                    >
                      {s.label}
                    </text>
                  </motion.g>
                ))}

                <motion.g
                  initial={reduced ? false : { scale: 0.92, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45 }}
                >
                  {!reduced ? (
                    <motion.circle
                      cx={MOBILE.cx}
                      cy={MOBILE.hubCy}
                      r={MOBILE.hubR}
                      fill="url(#hubGlowMobile)"
                      animate={{ opacity: [0.5, 0.9, 0.5] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                    />
                  ) : (
                    <circle
                      cx={MOBILE.cx}
                      cy={MOBILE.hubCy}
                      r={MOBILE.hubR}
                      fill="url(#hubGlowMobile)"
                    />
                  )}
                  <rect
                    x={MOBILE.hubRect.x}
                    y={MOBILE.hubRect.y}
                    width={MOBILE.hubRect.w}
                    height={MOBILE.hubRect.h}
                    rx={20}
                    className="fill-accent/15 stroke-accent/50"
                    strokeWidth={2}
                  />
                  <text
                    x={MOBILE.cx}
                    y={MOBILE.hubRect.y + 40}
                    textAnchor="middle"
                    className="fill-foreground"
                    style={{ fontSize: 12, fontWeight: 700 }}
                  >
                    {e.hubName}
                  </text>
                  <text
                    x={MOBILE.cx}
                    y={MOBILE.hubRect.y + 58}
                    textAnchor="middle"
                    className="fill-muted"
                    style={{ fontSize: 10, fontWeight: 600 }}
                  >
                    {e.hubSubtitle}
                  </text>
                  <text
                    x={MOBILE.cx}
                    y={MOBILE.hubRect.y + 76}
                    textAnchor="middle"
                    className="fill-muted"
                    style={{ fontSize: 9 }}
                  >
                    {e.hubMeta}
                  </text>
                </motion.g>

                {mobileOutputs.map((o, i) => (
                  <motion.g
                    key={`mo-${o.id}`}
                    initial={reduced ? false : { opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.35 }}
                  >
                    <rect
                      x={MOBILE.outputRect.x}
                      y={o.y}
                      width={MOBILE.outputRect.w}
                      height={MOBILE.outputRect.h}
                      rx={10}
                      className="fill-background stroke-border"
                      strokeWidth={1}
                    />
                    <text
                      x={MOBILE.cx}
                      y={o.y + 25}
                      textAnchor="middle"
                      className="fill-foreground"
                      style={{ fontSize: 11, fontWeight: 600 }}
                    >
                      {o.label}
                    </text>
                  </motion.g>
                ))}

                {!reduced ? (
                  <g className="text-accent" fill="currentColor">
                    <motion.circle
                      cx={MOBILE.cx}
                      cy={mobileSources[0]!.y + 18}
                      r={4}
                      animate={{
                        cy: [
                          mobileSources[0]!.y + 18,
                          MOBILE.hubRect.y + MOBILE.hubRect.h / 2,
                        ],
                      }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.circle
                      cx={MOBILE.cx}
                      cy={mobileSources[2]!.y + 18}
                      r={4}
                      animate={{
                        cy: [
                          mobileSources[2]!.y + 18,
                          MOBILE.hubRect.y + MOBILE.hubRect.h / 2,
                        ],
                      }}
                      transition={{
                        duration: 3.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.35,
                      }}
                    />
                    <motion.circle
                      cx={MOBILE.cx}
                      cy={MOBILE.hubCy}
                      r={4}
                      animate={{
                        cy: [
                          MOBILE.hubCy,
                          mobileOutputs[1]!.y + MOBILE.outputRect.h / 2,
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.7,
                      }}
                    />
                  </g>
                ) : null}
              </svg>

              <h3 id="engine-heading" className="sr-only">
                {e.srHeading}
              </h3>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {e.stats.map((stat) => (
                  <div
                    key={stat.key}
                    className="rounded-xl border border-border bg-surface/80 px-4 py-3 text-center shadow-sm"
                  >
                    <p className="text-sm font-bold text-foreground">{stat.key}</p>
                    <p className="mt-1 text-xs text-muted">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
