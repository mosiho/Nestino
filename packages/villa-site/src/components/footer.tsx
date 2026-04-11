import Link from "next/link";
import { LANG_LABELS, type Lang } from "../lib/i18n";
import { villaPath } from "../lib/villa-path";

type Props = {
  siteName: string;
  locationLabel: string;
  phone: string;
  lang: Lang;
  activeLangs: string[];
  pathPrefix?: string;
};

const NAV_ITEMS: Record<
  string,
  { villas: string; guides: string; location: string; about: string; contact: string }
> = {
  en: { villas: "Villas", guides: "Guides", location: "Location", about: "About", contact: "Contact" },
  tr: { villas: "Villalar", guides: "Rehberler", location: "Konum", about: "Hakkımızda", contact: "İletişim" },
  ar: { villas: "الفيلات", guides: "أدلة", location: "الموقع", about: "من نحن", contact: "اتصل بنا" },
  ru: { villas: "Виллы", guides: "Гиды", location: "Расположение", about: "О нас", contact: "Контакты" },
};

const FOOTER_LABELS: Record<string, { explore: string; language: string; privacy: string }> = {
  en: { explore: "Explore", language: "Language", privacy: "Privacy Policy" },
  tr: { explore: "Keşfet", language: "Dil", privacy: "Gizlilik Politikası" },
  ar: { explore: "استكشف", language: "اللغة", privacy: "سياسة الخصوصية" },
  ru: { explore: "Обзор", language: "Язык", privacy: "Политика конфиденциальности" },
};

export default function Footer({
  siteName,
  locationLabel,
  phone,
  lang,
  activeLangs,
  pathPrefix = "",
}: Props) {
  const nav = NAV_ITEMS[lang] ?? NAV_ITEMS.en!;
  const labels = FOOTER_LABELS[lang] ?? FOOTER_LABELS.en!;

  const links = [
    { label: nav.villas, href: villaPath(pathPrefix, `/${lang}/villas`) },
    { label: nav.guides, href: villaPath(pathPrefix, `/${lang}/guides`) },
    { label: nav.location, href: villaPath(pathPrefix, `/${lang}/location`) },
    { label: nav.about, href: villaPath(pathPrefix, `/${lang}/about`) },
    { label: nav.contact, href: villaPath(pathPrefix, `/${lang}/contact`) },
  ];

  const digits = phone?.replace(/\D/g, "");
  const whatsappHref = digits ? `https://wa.me/${digits}` : "#";

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] safe-bottom">
      {/* Gold divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--gold-accent)]/30 to-transparent" />

      <div
        className="content-wrapper"
        style={{ paddingTop: "var(--space-8)", paddingBottom: "var(--space-8)" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand + contact */}
          <div>
            <p className="font-serif font-semibold text-lg text-[var(--color-text-primary)] mb-1">
              {siteName}
            </p>
            <p className="font-serif italic text-sm text-[var(--color-text-muted)] mb-4">
              {lang === "tr"
                ? "Dağlar ile deniz arasında"
                : lang === "ar"
                  ? "بين الجبل والبحر"
                  : lang === "ru"
                    ? "Между горой и морем"
                    : "Between the mountains & the sea"}
            </p>
            {locationLabel && (
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
                {locationLabel}
              </p>
            )}
            {phone && (
              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href={`tel:${phone}`}
                  className="inline-flex items-center justify-center gap-2 h-11 px-4 rounded-md border border-[var(--color-border)] text-sm font-medium text-[var(--color-text-primary)] hover:border-[var(--accent-500)] transition-colors duration-200 active:scale-[0.97]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  {phone}
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-11 px-4 rounded-md text-sm font-medium text-white transition-colors duration-200 active:scale-[0.97]"
                  style={{ backgroundColor: "var(--accent-500)" }}
                >
                  WhatsApp
                </a>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-4">
              {labels.explore}
            </p>
            <ul className="space-y-3">
              {links.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Languages + legal */}
          <div>
            {activeLangs.length > 1 && (
              <>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-4">
                  {labels.language}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {activeLangs.map((l) => (
                    <Link
                      key={l}
                      href={villaPath(pathPrefix, `/${l}`)}
                      className={`text-xs px-3 py-1.5 rounded-md border transition-colors duration-200 ${
                        l === lang
                          ? "border-[var(--accent-500)] text-[var(--accent-500)] bg-[var(--accent-muted)]"
                          : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-border-strong)]"
                      }`}
                    >
                      {LANG_LABELS[l as Lang] ?? l}
                    </Link>
                  ))}
                </div>
              </>
            )}
            <Link
              href={villaPath(pathPrefix, `/${lang}/privacy`)}
              className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors duration-200"
            >
              {labels.privacy}
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <p className="text-xs text-[var(--color-text-muted)]">
            &copy; {new Date().getFullYear()} {siteName}
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">
            Powered by{" "}
            <a
              href="https://nestino.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent-500)] transition-colors duration-200"
            >
              Nestino
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
