import type { Tone } from "@/components/ui";

/**
 * Visuals for the 4D framework course. Plain props rather than children, so
 * MDX never wraps their content in a stray paragraph.
 */

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
const SOFT: Record<Tone, string> = {
  accent: "bg-accent-soft/50",
  mint: "bg-mint-soft/50",
  flame: "bg-flame-soft/50",
  grape: "bg-grape-soft/50",
  gold: "bg-gold-soft/50",
};

const FOUR = [
  {
    d: "Delegation",
    tone: "mint" as Tone,
    q: "Should this be AI at all, and which part?",
    body: "Knowing what you are really trying to do, what the tool can actually do, and dividing the work between you on purpose.",
  },
  {
    d: "Description",
    tone: "grape" as Tone,
    q: "Have I said what I actually want?",
    body: "Communicating the outcome you need, how you want it approached, and the manner it should work in.",
  },
  {
    d: "Discernment",
    tone: "flame" as Tone,
    q: "Is what came back any good?",
    body: "Judging the result, the reasoning behind it, and the way the tool is behaving, rather than trusting how confident it sounds.",
  },
  {
    d: "Diligence",
    tone: "gold" as Tone,
    q: "Am I willing to put my name on this?",
    body: "Where the work came from, who you tell about it, and who carries it when something goes wrong.",
  },
];

/** The whole framework on one screen. Used to open and to close the course. */
export function FourD({
  title = "The four competencies",
}: {
  title?: string;
}) {
  return (
    <div className="my-8 rounded-2xl border border-line bg-surface p-6">
      <p className="mb-5 font-semibold text-ink">{title}</p>
      <ol className="grid gap-4 sm:grid-cols-2">
        {FOUR.map((c, i) => (
          <li key={c.d} className={`rounded-xl p-4 ${SOFT[c.tone]}`}>
            <div className="flex items-baseline gap-2.5">
              <span
                className={`font-display text-sm font-semibold ${TEXT[c.tone]}`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-lg text-ink">{c.d}</span>
            </div>
            <p className={`mt-1 text-sm font-medium ${TEXT[c.tone]}`}>{c.q}</p>
            <p className="mt-2 text-[0.95rem] leading-7 text-ink/80">
              {c.body}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/**
 * A three part breakdown inside one competency. Each of the four Ds splits
 * into three, and seeing the split is most of what makes it usable.
 */
export function Parts({
  title,
  tone = "gold",
  parts,
}: {
  title: string;
  tone?: Tone;
  parts: { name: string; text: string }[];
}) {
  return (
    <div className="my-8 rounded-2xl border border-line bg-surface p-6">
      <p className="mb-5 font-semibold text-ink">{title}</p>
      <div className="space-y-4">
        {parts.map((p) => (
          <div key={p.name} className="flex gap-4">
            <span
              className={`mt-1 w-1 shrink-0 rounded-full ${BAR[tone]}`}
              aria-hidden
            />
            <div className="min-w-0">
              <span
                className={`text-xs font-semibold uppercase tracking-wider ${TEXT[tone]}`}
              >
                {p.name}
              </span>
              <p className="mt-1 max-w-prose text-[0.98rem] leading-7 text-ink/85">
                {p.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Attribution block. The framework is not mine and the course says so. */
export function Credit() {
  return (
    <div className="my-8 rounded-2xl border border-line bg-sunken/60 p-5">
      <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
        Where this comes from
      </p>
      <p className="max-w-prose text-[0.98rem] leading-7 text-ink/80">
        The 4D framework is not mine. It was developed by{" "}
        <strong className="text-ink">Prof. Rick Dakan</strong> of Ringling
        College of Art and Design and{" "}
        <strong className="text-ink">Prof. Joseph Feller</strong> of University
        College Cork, and Anthropic teaches it in their free course{" "}
        <a
          href="https://anthropic.skilljar.com/ai-fluency-framework-foundations"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-accent underline decoration-accent/30 hover:decoration-accent"
        >
          AI Fluency: Framework &amp; Foundations
        </a>
        . This course is my own explanation of it, in my words and with my
        examples. If it lands, go and take theirs too, and read the original at{" "}
        <a
          href="https://aifluencyframework.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-accent underline decoration-accent/30 hover:decoration-accent"
        >
          aifluencyframework.org
        </a>
        .
      </p>
    </div>
  );
}
