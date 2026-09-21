import { LEVELS, THRESHOLD_NOTE } from "@/content/autonomy";

/**
 * The argument, drawn: as autonomy rises, the capacity of a person to
 * independently verify the system falls, while the governance intensity the
 * system needs rises. Where they cross is the oversight threshold.
 *
 * Server-rendered, no interactivity — the point is the shape of the crossing,
 * not per-point inspection. Both series are direct-labelled so identity never
 * depends on colour, and the caption says plainly that the curves illustrate
 * an argument rather than plotting measurements.
 *
 * One shared axis on purpose: both series sit on the same 0–100 relative
 * scale, because two separate scales would let the crossing be placed
 * anywhere by pinning them differently. A single relative scale does not make
 * the crossing a measurement either — rescale one series and it slides — so
 * what the figure claims is only the part that survives any rescaling: one
 * line falls, the other rises, therefore they meet. Where they meet is drawn,
 * not derived, and the caption and the limitations both say so.
 */

const W = 640;
const H = 300;
const PAD = { top: 26, right: 46, bottom: 54, left: 46 };

const x = (i: number) =>
  PAD.left + (i / (LEVELS.length - 1)) * (W - PAD.left - PAD.right);
const y = (v: number) =>
  PAD.top + (1 - v / 100) * (H - PAD.top - PAD.bottom);

type Pt = readonly [number, number];
/** One cubic segment: start, two controls, end. */
type Seg = readonly [Pt, Pt, Pt, Pt];

/**
 * Catmull-Rom through the points, as cubic segments, so the lines read as
 * trends not readings. Both the drawn path and the threshold marker are built
 * from this one function, so the marker can never drift off the drawn lines.
 */
function segments(values: number[]): Seg[] {
  const pts: Pt[] = values.map((v, i) => [x(i), y(v)]);
  const out: Seg[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    out.push([
      p1,
      [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6],
      [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6],
      p2,
    ]);
  }
  return out;
}

function curve(values: number[]) {
  const segs = segments(values);
  let d = `M ${segs[0][0][0]} ${segs[0][0][1]}`;
  for (const [, c1, c2, p] of segs) {
    d += ` C ${c1[0]} ${c1[1]}, ${c2[0]} ${c2[1]}, ${p[0]} ${p[1]}`;
  }
  return d;
}

const bezier = (a: number, b: number, c: number, d: number, t: number) => {
  const u = 1 - t;
  return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d;
};

/**
 * Where the two drawn curves actually meet, in SVG units.
 *
 * Both series share the same evenly spaced x positions, so within any segment
 * the two curves have an identical x(t) and the crossing is just the root of
 * their y difference. Solving on the curves rather than on a straight line
 * between the level values matters: the smoothing moves the real intersection
 * by a few pixels, which is enough for the dashed marker to visibly miss the
 * point where the lines cross. Bisection, because the difference changes sign
 * exactly once across the segment we search.
 */
function crossingX(verify: number[], govern: number[]): number | null {
  const a = segments(verify);
  const b = segments(govern);
  for (let s = 0; s < a.length; s++) {
    const diff = (t: number) =>
      bezier(a[s][0][1], a[s][1][1], a[s][2][1], a[s][3][1], t) -
      bezier(b[s][0][1], b[s][1][1], b[s][2][1], b[s][3][1], t);
    if (diff(0) * diff(1) >= 0) continue;
    let lo = 0;
    let hi = 1;
    for (let k = 0; k < 60; k++) {
      const mid = (lo + hi) / 2;
      if (diff(lo) * diff(mid) <= 0) hi = mid;
      else lo = mid;
    }
    const t = (lo + hi) / 2;
    return bezier(a[s][0][0], a[s][1][0], a[s][2][0], a[s][3][0], t);
  }
  return null;
}

export function VerificationCurve() {
  const verify = LEVELS.map((l) => l.verification);
  const govern = LEVELS.map((l) => l.intensity);

  // Derived, never hand-placed: editing the level values in the content file
  // moves the marker to wherever the lines genuinely meet.
  const crossX = crossingX(verify, govern);

  return (
    <figure className="mt-8 max-w-2xl">
      <div className="overflow-hidden rounded-2xl border border-line bg-surface p-4 sm:p-6">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full"
          role="img"
          aria-label="As autonomy rises from level 1 to level 5, human verification capacity falls while the governance intensity the system requires rises. The two cross between level 3 and level 4."
        >
          {/* Recessive baseline only; no grid competing with the lines. */}
          <line
            x1={PAD.left}
            y1={y(0)}
            x2={W - PAD.right}
            y2={y(0)}
            stroke="var(--line)"
            strokeWidth="1"
          />

          {crossX !== null ? (
            <>
              <line
                x1={crossX}
                y1={PAD.top - 6}
                x2={crossX}
                y2={y(0)}
                stroke="var(--muted)"
                strokeWidth="1"
                strokeDasharray="3 5"
                opacity="0.7"
              />
              <text
                x={crossX}
                y={PAD.top - 12}
                textAnchor="middle"
                className="fill-[var(--muted)] text-[11px] font-semibold uppercase tracking-wider"
              >
                Oversight threshold
              </text>
            </>
          ) : null}

          <path
            d={curve(verify)}
            fill="none"
            stroke="#10a396"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d={curve(govern)}
            fill="none"
            stroke="#ee6a3a"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {LEVELS.map((l, i) => (
            <g key={l.id}>
              <circle cx={x(i)} cy={y(l.verification)} r="4.5" fill="#10a396" />
              <circle cx={x(i)} cy={y(l.intensity)} r="4.5" fill="#ee6a3a" />
              <text
                x={x(i)}
                y={H - PAD.bottom + 22}
                textAnchor="middle"
                className="fill-[var(--ink)] text-[12px] font-semibold"
              >
                L{l.id}
              </text>
              <text
                x={x(i)}
                y={H - PAD.bottom + 38}
                textAnchor="middle"
                className="fill-[var(--muted)] text-[10px]"
              >
                {l.short}
              </text>
            </g>
          ))}

          {/* Direct labels, so the two series are never colour-alone. */}
          <text
            x={x(0) + 10}
            y={y(verify[0]) - 10}
            className="fill-[var(--ink)] text-[12px] font-semibold"
          >
            Human verification capacity
          </text>
          <text
            x={x(0) + 10}
            y={y(govern[0]) + 20}
            className="fill-[var(--ink)] text-[12px] font-semibold"
          >
            Governance intensity required
          </text>
        </svg>
      </div>
      <figcaption className="mt-3 max-w-prose text-sm leading-relaxed text-muted">
        {THRESHOLD_NOTE}
      </figcaption>
    </figure>
  );
}
