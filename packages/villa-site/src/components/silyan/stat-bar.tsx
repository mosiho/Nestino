import type { Lang } from "../../lib/i18n";

type Props = { lang: Lang };

const STATS_COPY: Record<string, string[]> = {
  en: ["3 private villas", "Up to 10 guests", "3 private pools", "Mountain views"],
  tr: ["3 özel villa", "10 kişiye kadar", "3 özel havuz", "Dağ manzarası"],
  ar: ["3 فيلات خاصة", "حتى 10 ضيوف", "3 مسابح خاصة", "إطلالة على الجبال"],
  ru: ["3 частные виллы", "До 10 гостей", "3 частных бассейна", "Горные пейзажи"],
};

const ICONS = [
  // House
  <svg key="house" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path d="M9 22V12h6v10" /></svg>,
  // Users
  <svg key="users" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>,
  // Droplet / pool
  <svg key="pool" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" /><path d="M12 6v12M6 12h12" /></svg>,
  // Mountain
  <svg key="mountain" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 20l6-10 4 6 3-4 5 8H3z" /></svg>,
];

export default function StatBar({ lang }: Props) {
  const stats = STATS_COPY[lang] ?? STATS_COPY.en!;

  return (
    <section
      className="border-y border-[var(--color-border)] bg-[var(--color-surface)]"
      aria-label="Property highlights"
    >
      <div className="content-wrapper">
        <ul className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[var(--color-border)]">
          {stats.map((label, i) => (
            <li key={i} className="flex flex-col items-center gap-2 py-5 px-4 text-center">
              <span style={{ color: "var(--accent-500)" }}>{ICONS[i]}</span>
              <span className="text-sm font-medium text-[var(--color-text-primary)]">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}