/**
 * Visuals for the shipping course. Like the prompting components, these take
 * plain props rather than children so MDX never wraps their content in a
 * stray paragraph.
 */

type Idea = { idea: string; why: string };

/**
 * Two versions of the same ambition: the one that stalls in week two, and the
 * one that reaches a live URL. The whole first lesson turns on this contrast.
 */
export function ScopeCompare({
  tooBig,
  rightSized,
  tooBigLabel = "Stalls in week two",
  rightSizedLabel = "Reaches the internet",
}: {
  tooBig: Idea;
  rightSized: Idea;
  tooBigLabel?: string;
  rightSizedLabel?: string;
}) {
  const Card = ({
    item,
    label,
    icon,
    wrap,
    text,
  }: {
    item: Idea;
    label: string;
    icon: string;
    wrap: string;
    text: string;
  }) => (
    <div className={`flex flex-col rounded-2xl border p-5 ${wrap}`}>
      <p
        className={`mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider ${text}`}
      >
        <span aria-hidden>{icon}</span>
        {label}
      </p>
      <div className="rounded-xl border border-line bg-surface p-4">
        <p className="text-[0.95rem] leading-7 text-ink/85">{item.idea}</p>
      </div>
      <p className="mt-4 mb-1.5 text-xs font-medium uppercase tracking-wider text-muted">
        What actually happens
      </p>
      <p className="text-sm leading-7 text-ink/75">{item.why}</p>
    </div>
  );

  return (
    <div className="my-8 grid gap-4 md:grid-cols-2">
      <Card
        item={tooBig}
        label={tooBigLabel}
        icon="🪨"
        wrap="border-flame/30 bg-flame-soft/40"
        text="text-flame"
      />
      <Card
        item={rightSized}
        label={rightSizedLabel}
        icon="🚀"
        wrap="border-mint/30 bg-mint-soft/40"
        text="text-mint"
      />
    </div>
  );
}

const LOOP = [
  {
    n: "1",
    title: "Describe one slice",
    body: "A single small change, said in plain words. Not the whole app.",
    dot: "bg-accent",
    text: "text-accent",
  },
  {
    n: "2",
    title: "Read what changed",
    body: "Glance at the files it touched before you approve. You are the reviewer.",
    dot: "bg-grape",
    text: "text-grape",
  },
  {
    n: "3",
    title: "Look at the browser",
    body: "Not the summary of the work. The actual page, with your own eyes.",
    dot: "bg-flame",
    text: "text-flame",
  },
  {
    n: "4",
    title: "Keep it or undo it",
    body: "Working? Save the progress. Broken? Roll back and describe it differently.",
    dot: "bg-mint",
    text: "text-mint",
  },
];

/** The four beats you repeat until the app is done. */
export function BuildLoop({
  title = "The loop, over and over",
}: {
  title?: string;
}) {
  return (
    <div className="my-8 rounded-2xl border border-line bg-surface p-6">
      <p className="mb-5 font-semibold text-ink">{title}</p>
      <ol className="grid gap-4 sm:grid-cols-2">
        {LOOP.map((step) => (
          <li key={step.n} className="flex gap-3.5">
            <span
              className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${step.dot}`}
              aria-hidden
            >
              {step.n}
            </span>
            <div className="min-w-0">
              <span
                className={`text-xs font-semibold uppercase tracking-wider ${step.text}`}
              >
                {step.title}
              </span>
              <p className="mt-1 max-w-prose text-[0.98rem] leading-7 text-ink/85">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-5 border-t border-line pt-4 text-sm leading-7 text-muted">
        Then back to step one with the next slice. That is the entire job.
      </p>
    </div>
  );
}
