import { AnimateIn } from "@/components/ui/animate-in";

type SectionHeaderProps = {
  badge: string;
  title: string;
  subtitle: string;
  className?: string;
  /** When set, applied to the title heading (e.g. section aria-labelledby). */
  titleId?: string;
};

export function SectionHeader({
  badge,
  title,
  subtitle,
  className = "",
  titleId,
}: SectionHeaderProps) {
  return (
    <AnimateIn className={className}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        {badge}
      </p>
      <h2
        id={titleId}
        className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl [text-wrap:balance]"
      >
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-base text-muted leading-relaxed">
        {subtitle}
      </p>
    </AnimateIn>
  );
}
