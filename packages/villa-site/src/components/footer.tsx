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

const NAV_ITEMS: Record<string, { villas: string; location: string; about: string; contact: string }> = {
  en: { villas: "Villas", location: "Location", about: "About", contact: "Contact" },
  tr: { villas: "Villalar", location: "Konum", about: "Hakkımızda", contact: "İletişim" },
  ar: { villas: "الفيلات", location: "الموقع", about: "من نحن", contact: "اتصل بنا" },
  ru: { villas: "Виллы", location: "Расположение", about: "О нас", contact: "Контакты" },
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
    { label: nav.location, href: villaPath(pathPrefix, `/${lang}/location`) },
    { label: nav.about, href: villaPath(pathPrefix, `/${lang}/about`) },
    { label: nav.contact, href: villaPath(pathPrefix, `/${lang}/contact`) },
  ];

  return (
    <footer
      className="border-t border-[var(--color-border)] bg-[var(--color-surface)]"
      style={{ paddingTop: "var(--space-8)", paddingBottom: "var(--space-8)" }}
    >
      <div className="content-wrapper">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* NAP */}
          <div>
            <p className="font-serif font-semibold text-base text-[var(--color-text-primary)] mb-2">
              {siteName}
            </p>
            {locationLabel && (
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {locationLabel}
              </p>
            )}
            {phone && (
              <a
                href={`tel:${phone}`}
                className="block mt-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--accent-500)] transition-colors"
              >
                {phone}
              </a>
            )}
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
              {labels.explore}
            </p>
            <ul className="space-y-2">
              {links.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
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
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
                  {labels.language}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {activeLangs.map((l) => (
                    <Link
                      key={l}
                      href={villaPath(pathPrefix, `/${l}`)}
                      className={`text-xs px-2 py-1 rounded-sm border transition-colors ${
                        l === lang
                          ? "border-[var(--accent-500)] text-[var(--accent-500)]"
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
              className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
            >
              {labels.privacy}
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <p className="text-xs text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} {siteName}
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">
            Powered by{" "}
            <a
              href="https://nestino.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent-500)] transition-colors"
            >
              Nestino
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
