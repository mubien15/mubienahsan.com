import { DIMENSIONS, LEVELS } from "@/content/autonomy";

/**
 * The whole matrix on one screen: eight governance dimensions against five
 * autonomy levels.
 *
 * The interactive matrix shows one level at a time, which is the right
 * interaction for reading a level in depth and the wrong one for seeing the
 * argument — that governance intensity climbs across every dimension at
 * once. That climb is the thesis, and a reader should be able to see it
 * without clicking through five tabs and holding the numbers in their head.
 *
 * Encoding: intensity is a magnitude, so the ramp is one hue, light to dark,
 * never a spectrum. Every cell also carries its number, so nothing here is
 * communicated by colour alone — the tint is there to make the gradient
 * legible at a glance, not to hold the value. Each step of the ramp clears
 * 4.5:1 against the ink the numbers are set in, checked rather than eyeballed.
 *
 * The rule between L3 and L4 is the oversight threshold, in the same place
 * the curve figure puts it.
 */

/** Sequential, light to dark. Index 0 is unused so a weight indexes directly. */
const RAMP = ["", "#fbe4d5", "#f8cdb2", "#f4b088", "#ef9462", "#e87a3c"];
const WEIGHT_WORD = ["", "Light", "Moderate", "Substantial", "Heavy", "Maximal"];

export function IntensityGrid() {
  return (
    <figure className="mt-8">
      <div className="rounded-2xl border border-line bg-surface p-4 sm:p-6">
        {/* Below roughly 360px the eight labels and five columns stop fitting
            at a legible size. Scrolling this one figure is better than
            squashing the labels to three characters, and far better than
            letting it push the whole page sideways. */}
        <div className="-mx-1 overflow-x-auto px-1">
          {/* One grid, so the columns line up across every row. */}
          <div
            className="grid min-w-[17rem] gap-x-1 gap-y-1"
            style={{
              gridTemplateColumns:
                "minmax(6.5rem, 1.6fr) repeat(5, minmax(1.9rem, 1fr))",
            }}
          >
          {/* Header */}
          <div className="self-end pb-1 text-[0.7rem] font-semibold uppercase tracking-wider text-muted">
            Dimension
          </div>
          {LEVELS.map((l) => (
            <div
              key={l.id}
              className={`self-end pb-1 text-center ${
                l.id === 4 ? "border-l border-dashed border-muted/50 pl-1" : ""
              }`}
            >
              <span className="block text-[0.78rem] font-semibold text-ink">
                L{l.id}
              </span>
              <span className="hidden text-[0.65rem] leading-tight text-muted sm:block">
                {l.short}
              </span>
            </div>
          ))}

          {/* Rows */}
          {DIMENSIONS.map((d) => (
            <div key={d.id} className="contents">
              <div className="flex items-center pr-2 text-[0.78rem] leading-tight text-ink">
                {d.name}
              </div>
              {LEVELS.map((l) => {
                const w = l.dimensions[d.id].weight;
                return (
                  <div
                    key={l.id}
                    className={l.id === 4 ? "border-l border-dashed border-muted/50 pl-1" : ""}
                  >
                    <div
                      className="flex h-9 items-center justify-center rounded-md text-[0.8rem] font-semibold text-ink"
                      style={{ backgroundColor: RAMP[w] }}
                      title={`${d.name} at level ${l.id}: ${w}, ${WEIGHT_WORD[w].toLowerCase()}`}
                    >
                      {w}
                    </div>
                  </div>
                );
              })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend. Present because the tint is a gradient, not a category. */}
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4">
          <span className="text-[0.7rem] font-semibold uppercase tracking-wider text-muted">
            Intensity
          </span>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
            {[1, 2, 3, 4, 5].map((w) => (
              <span key={w} className="flex items-center gap-1">
                <span
                  className="inline-flex h-5 w-5 items-center justify-center rounded text-[0.7rem] font-semibold text-ink"
                  style={{ backgroundColor: RAMP[w] }}
                >
                  {w}
                </span>
                <span className="text-[0.7rem] text-muted">{WEIGHT_WORD[w]}</span>
              </span>
            ))}
          </div>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-4 w-0 border-l border-dashed border-muted/70" />
            <span className="text-[0.7rem] text-muted">Oversight threshold</span>
          </span>
        </div>
      </div>
      <figcaption className="mt-3 max-w-prose text-sm leading-relaxed text-muted">
        Every dimension climbs and none of them comes back down: there is no
        level at which some part of governance gets easier. Two things in the
        grid are worth reading closely. Human oversight is the only dimension
        not at maximum by level 4, because it is the one that cannot simply be
        turned up — that is the argument of this page, visible in a single
        column. And the scale saturates: levels 4 and 5 differ in one cell,
        which is a limit of a one-to-five weight rather than a claim that the
        two levels need the same governance. What changes at level 5 is not
        how much, but who — the reliance moves off individual review and onto
        external arrangements. The numbers are relative weights for comparing
        levels against each other, not measurements, not a maturity score, and
        not something to total up.
      </figcaption>
    </figure>
  );
}
