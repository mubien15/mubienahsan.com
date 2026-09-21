import { OVERSIGHT_TESTS } from "@/content/autonomy";

/**
 * The five oversight conditions as the dependency chain they actually are.
 *
 * The test below renders them as five independent questions, because that is
 * how they have to be answered. But they are not independent: you cannot
 * challenge what you do not understand, cannot verify what you cannot
 * challenge, cannot sensibly intervene in what you have not verified. The
 * order carries information that a list of five cards throws away.
 *
 * Stopping is set apart deliberately. It is the only one that still works
 * when the others have failed, which is exactly why it is the one worth
 * exercising and the one least often exercised.
 *
 * Rendered as an ordered list so the sequence survives without CSS and reads
 * correctly to a screen reader; the connectors are decorative and hidden
 * from the accessibility tree.
 */
export function OversightChain() {
  return (
    <figure className="mt-6 max-w-2xl">
      <ol className="flex flex-col">
        {OVERSIGHT_TESTS.map((t, i) => {
          const isStop = t.id === "stop";
          return (
            <li key={t.id} className="flex flex-col">
              <div
                className={`flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5 rounded-xl border px-4 py-2.5 ${
                  isStop
                    ? "border-accent/50 bg-accent-soft/50"
                    : "border-line bg-surface"
                }`}
              >
                <span className="text-[0.7rem] font-semibold text-muted">
                  {i + 1}
                </span>
                <span className="font-display text-base leading-tight text-ink">
                  {t.name}
                </span>
                <span className="text-[0.8rem] leading-snug text-muted">
                  — {DEPENDS[t.id]}
                </span>
              </div>
              {i < OVERSIGHT_TESTS.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="py-0.5 text-center text-sm text-muted"
                >
                  {/* The sequence runs downward now that the figure shares the
                      reading column, so one arrow does for every width. */}
                  ↓
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>

      <figcaption className="mt-3 max-w-prose text-sm leading-relaxed text-muted">
        They run in order, and each one rests on the one before it. A system
        can satisfy four and still fail, because the one it misses is the one
        that mattered. Stopping is set apart because it is the only condition
        that still holds when the others have gone — which is why it is worth
        exercising, and why it is the one almost nobody has exercised.
      </figcaption>
    </figure>
  );
}

/** What each condition needs from the one before it. */
const DEPENDS: Record<string, string> = {
  understand: "Everything rests on this",
  challenge: "Needs understanding",
  verify: "Needs a challenge worth testing",
  intervene: "Needs verification, and time",
  stop: "Works when the rest have failed",
};
