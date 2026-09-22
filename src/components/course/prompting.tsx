import type { Tone } from "@/components/ui";

/**
 * Visuals for the prompting course. All take plain props rather than children,
 * so MDX never wraps their content in a stray paragraph.
 */

const SOFT_BG: Record<Tone, string> = {
  accent: "bg-accent-soft/40",
  mint: "bg-mint-soft/40",
  flame: "bg-flame-soft/40",
  grape: "bg-grape-soft/40",
  gold: "bg-gold-soft/40",
};
const BORDER: Record<Tone, string> = {
  accent: "border-accent/30",
  mint: "border-mint/30",
  flame: "border-flame/30",
  grape: "border-grape/30",
  gold: "border-gold/30",
};
const TEXT: Record<Tone, string> = {
  accent: "text-accent",
  mint: "text-mint",
  flame: "text-flame",
  grape: "text-grape",
  gold: "text-gold",
};
const BAR: Record<Tone, string> = {
  accent: "bg-accent",
  mint: "bg-mint",
  flame: "bg-flame",
  grape: "bg-grape",
  gold: "bg-gold",
};

type Side = { prompt: string; result: string };

/**
 * The workhorse of this course: a weak prompt and a strong one, side by side,
 * each with the kind of answer it earns you.
 */
const Card = ({
  side,
  tone,
  label,
  icon,
}: {
  side: Side;
  tone: Tone;
  label: string;
  icon: string;
}) => (
  <div
    className={`flex flex-col rounded-2xl border p-5 ${BORDER[tone]} ${SOFT_BG[tone]}`}
  >
    <p
      className={`mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider ${TEXT[tone]}`}
    >
      <span aria-hidden>{icon}</span>
      {label}
    </p>

    <div className="rounded-xl border border-line bg-surface p-4">
      <p className="text-[0.95rem] italic leading-7 text-ink/85">
        {side.prompt}
      </p>
    </div>

    <p className="mt-4 mb-1.5 text-xs font-medium uppercase tracking-wider text-muted">
      What you get back
    </p>
    <p className="text-sm leading-7 text-ink/75">{side.result}</p>
  </div>
);

export function PromptCompare({
  weak,
  strong,
  weakLabel = "Vague ask",
  strongLabel = "Clear ask",
}: {
  weak: Side;
  strong: Side;
  weakLabel?: string;
  strongLabel?: string;
}) {
  return (
    <div className="my-8 grid gap-4 md:grid-cols-2">
      <Card side={weak} tone="flame" label={weakLabel} icon="😐" />
      <Card side={strong} tone="mint" label={strongLabel} icon="✅" />
    </div>
  );
}

/**
 * A labelled breakdown of a prompt, so the reader can see the moving parts
 * instead of being told about them.
 */
export function PromptAnatomy({
  title = "Anatomy of a prompt that works",
  parts,
}: {
  title?: string;
  parts: { label: string; tone: Tone; text: string }[];
}) {
  return (
    <div className="my-8 rounded-2xl border border-line bg-surface p-6">
      <p className="mb-5 font-semibold text-ink">{title}</p>
      <div className="space-y-4">
        {parts.map((part, i) => (
          <div key={i} className="flex gap-4">
            <span
              className={`mt-1 w-1 shrink-0 rounded-full ${BAR[part.tone]}`}
              aria-hidden
            />
            <div className="min-w-0">
              <span
                className={`text-xs font-semibold uppercase tracking-wider ${TEXT[part.tone]}`}
              >
                {part.label}
              </span>
              <p className="mt-1 text-[0.98rem] leading-7 text-ink/85">
                {part.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** The noise: things people swear by that do not earn their keep. */
export function MythList({
  title = "What you can stop doing",
  items,
}: {
  title?: string;
  items: string[];
}) {
  return (
    <div className="my-6 rounded-2xl border border-flame/30 bg-flame-soft/30 p-6">
      <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-flame">
        <span aria-hidden>🚫</span>
        {title}
      </p>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-ink/70">
            <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-flame/20 text-flame">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="leading-7 line-through decoration-flame/40">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
