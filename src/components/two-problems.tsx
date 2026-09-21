/**
 * Comprehension and alignment, and why the combination is the hard case.
 *
 * The prose makes the point that these are two separate problems that
 * compound. A 2x2 is the honest shape for that claim: it shows that three
 * of the four quadrants are tractable and names what makes the fourth
 * different, rather than asserting "it's worse" and moving on.
 *
 * The quadrant we are in is marked, and the other three are labelled with
 * the kind of engineering they correspond to, so the grid reads as a
 * comparison rather than as a warning. Nothing depends on colour: the
 * occupied quadrant carries a label saying so.
 */

type Cell = {
  inspect: boolean;
  specify: boolean;
  title: string;
  body: string;
  here?: boolean;
};

const CELLS: Cell[] = [
  {
    inspect: true,
    specify: true,
    title: "Ordinary software",
    body: "Somebody wrote the rule, and the rule says what was meant. You can read it, test it against the specification, and point at the line that misbehaved.",
  },
  {
    inspect: true,
    specify: false,
    title: "The specification problem, on its own",
    body: "A system you can read, pursuing a goal that was only ever an approximation of what you wanted. Hard, and familiar — this is most of why we write acceptance criteria and then argue about them.",
  },
  {
    inspect: false,
    specify: true,
    title: "A black box doing a known job",
    body: "You cannot see inside, but the objective is narrow enough to check from the outside. You govern it on outputs, because outputs are sufficient evidence here.",
  },
  {
    inspect: false,
    specify: false,
    title: "Where autonomous systems sit",
    body: "You cannot inspect the reasoning, and the objective is a proxy for what you meant. A specification failure here is not one you find by looking for it. You find it when the system acts.",
    here: true,
  },
];

export function TwoProblems() {
  return (
    <figure className="mt-8 max-w-2xl">
      <div className="rounded-2xl border border-line bg-surface p-4 sm:p-6">
        <div className="grid gap-3 sm:grid-cols-2">
          {CELLS.map((c) => (
            <div
              key={c.title}
              className={`flex flex-col rounded-xl border p-4 ${
                c.here
                  ? "border-accent/50 bg-accent-soft/40"
                  : "border-line bg-paper/40"
              }`}
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="text-[0.68rem] font-medium text-muted">
                  {c.inspect ? "Can inspect" : "Cannot inspect"} ·{" "}
                  {c.specify ? "Can specify" : "Cannot specify"}
                </span>
                {c.here ? (
                  <span className="rounded-full bg-accent px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-white">
                    We are here
                  </span>
                ) : null}
              </div>
              <h4 className="font-display mt-1.5 text-base leading-tight text-ink">
                {c.title}
              </h4>
              <p className="mt-1.5 text-[0.85rem] leading-relaxed text-ink/80">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-3 max-w-prose text-sm leading-relaxed text-muted">
        Three of these four are tractable, and governance has decades of
        practice in all three. The fourth is not a harder version of the
        others — it is the one where the usual move, look at what it did and
        judge whether that was right, stops returning an answer you can rely
        on. That is the case for constraining what a system may reach, rather
        than trusting that somebody notices in time.
      </figcaption>
    </figure>
  );
}
