/**
 * C6's argument, drawn. Three things end when permission is withdrawn, and
 * they end at three different times. Server-rendered; no interactivity needed
 * because the point is the comparison, not the detail.
 */

const CLOCKS = [
  {
    label: "Your agent's authority",
    ends: "The moment you say so",
    detail: "And the least useful of the three — nobody here is taking your money.",
    stop: 10,
    tone: "near" as const,
  },
  {
    label: "The payment",
    ends: "A deadline set by the plumbing",
    detail:
      "Article 80 fixes when an order stops being revocable. Card rules have their own window.",
    stop: 48,
    tone: "mid" as const,
  },
  {
    label: "What the shop may believe",
    ends: "When the other side has reason to know",
    detail:
      "Not when you act. This is the one the loss lands on, and you do not control it.",
    stop: 88,
    tone: "far" as const,
  },
];

const BAR = {
  near: "bg-mint",
  mid: "bg-gold",
  far: "bg-flame",
};

export function ThreeClocks() {
  return (
    <figure className="mt-8 rounded-2xl border border-line bg-surface p-6">
      <figcaption className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        You press stop here
      </figcaption>

      <div className="mt-5 space-y-6">
        {CLOCKS.map((c) => (
          <div key={c.label}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <span className="text-sm font-medium text-ink">{c.label}</span>
              <span className="text-sm text-muted">{c.ends}</span>
            </div>

            {/* The bar is how long the thing stays live after you press stop. */}
            <div className="relative mt-2 h-2.5 w-full overflow-hidden rounded-full bg-sunken">
              <div
                className={`h-full rounded-full ${BAR[c.tone]}`}
                style={{ width: `${c.stop}%` }}
              />
            </div>

            <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">
              {c.detail}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-6 border-t border-line pt-4 text-[0.9rem] leading-relaxed text-ink/80">
        The bars are illustrative rather than measured — no published figure
        puts numbers on these. The shape is the point: revocation is instant
        where it matters least, and slowest exactly where the loss lands.
      </p>
    </figure>
  );
}
