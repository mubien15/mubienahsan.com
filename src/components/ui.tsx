import Link from "next/link";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion";

/** Category / accent tones used across the site for color-coding. */
export type Tone = "accent" | "mint" | "flame" | "grape" | "gold";

const TONE_TEXT: Record<Tone, string> = {
  accent: "text-accent",
  mint: "text-mint",
  flame: "text-flame",
  grape: "text-grape",
  gold: "text-gold",
};

const TONE_SOFT: Record<Tone, string> = {
  accent: "bg-accent-soft text-accent",
  mint: "bg-mint-soft text-mint",
  flame: "bg-flame-soft text-flame",
  grape: "bg-grape-soft text-grape",
  gold: "bg-gold-soft text-gold",
};

const TONE_SOLID: Record<Tone, string> = {
  accent: "bg-accent hover:bg-accent-strong",
  mint: "bg-mint hover:brightness-95",
  flame: "bg-flame hover:brightness-95",
  grape: "bg-grape hover:brightness-95",
  gold: "bg-gold hover:brightness-95",
};

const TONE_DOT: Record<Tone, string> = {
  accent: "bg-accent",
  mint: "bg-mint",
  flame: "bg-flame",
  grape: "bg-grape",
  gold: "bg-gold",
};

/** A primary/secondary call-to-action rendered as a link. */
export function CtaLink({
  href,
  children,
  variant = "primary",
  tone = "accent",
  external = false,
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  tone?: Tone;
  external?: boolean;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all";
  const styles =
    variant === "primary"
      ? cn("text-white shadow-sm hover:-translate-y-0.5", TONE_SOLID[tone])
      : "border border-line bg-surface text-ink hover:border-accent/50 hover:text-accent";

  const classes = cn(base, styles, className);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

/** Small uppercase label that sits above a section title, with a color dot. */
export function Eyebrow({
  children,
  tone = "accent",
}: {
  children: React.ReactNode;
  tone?: Tone;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]",
        TONE_TEXT[tone]
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", TONE_DOT[tone])} />
      {children}
    </span>
  );
}

/** A soft rounded pill for tags (stack, status, etc.). */
export function Pill({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone?: Tone;
}) {
  if (tone) {
    return (
      <span
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
          TONE_SOFT[tone]
        )}
      >
        {children}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full border border-line bg-surface px-2.5 py-0.5 text-xs text-muted">
      {children}
    </span>
  );
}

/** Standard page intro block used at the top of interior pages. */
export function PageIntro({
  eyebrow,
  title,
  tone = "accent",
  children,
}: {
  eyebrow: string;
  title: string;
  tone?: Tone;
  children?: React.ReactNode;
}) {
  return (
    <Reveal className="max-w-2xl" y={16}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h1 className="font-display mt-4 text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl">
        {title}
      </h1>
      {children ? (
        <div className="mt-5 text-lg leading-relaxed text-muted">{children}</div>
      ) : null}
    </Reveal>
  );
}

export { TONE_TEXT, TONE_SOFT, TONE_SOLID, TONE_DOT };
