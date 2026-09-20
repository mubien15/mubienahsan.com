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
 * One shared axis on purpose: both series are expressed on the same 0–100
 * relative scale, so the crossing means something. Two different scales would
 * make the crossing an artefact of where the axes were pinned.
 */

const W = 640;
const H = 300;
const PAD = { top: 26, right: 46, bottom: 54, left: 46 };

const x = (i: number) =>
  PAD.left + (i / (LEVELS.length - 1)) * (W - PAD.left - PAD.right);
const y = (v: number) =>
  PAD.top + (1 - v / 100) * (H - PAD.top - PAD.bottom);

/** Catmull-Rom through the points, so the lines read as trends not readings. */
function curve(values: number[]) {
  const pts = values.map((v, i) => [x(i), y(v)] as const);
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    d += ` C ${p1[0] + (p2[0] - p0[0]) / 6} ${p1[1] + (p2[1] - p0[1]) / 6}, ${
      p2[0] - (p3[0] - p1[0]) / 6
    } ${p2[1] - (p3[1] - p1[1]) / 6}, ${p2[0]} ${p2[1]}`;
  }
  return d;
}

export function VerificationCurve() {
  const verify = LEVELS.map((l) => l.verification);
  const govern = LEVELS.map((l) => l.intensity);

  // The true intersection, interpolated between the last level where
  // verification leads and the first where governance does — so editing the
  // data moves the marker to wherever the lines genuinely meet.
  const i = LEVELS.findIndex((l) => l.intensity > l.verification);
  let crossX: number | null = null;
  if (i > 0) {
    const a = LEVELS[i - 1];
    const bb = LEVELS[i];
    const denom = bb.verification - a.verification - (bb.intensity - a.intensity);
    const t = denom === 0 ? 0.5 : (a.intensity - a.verification) / denom;
    crossX = x(i - 1) + Math.min(Math.max(t, 0), 1) * (x(i) - x(i - 1));
  }

  return (
    <figure className="mt-8">
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
      <figcaption className="mt-3 text-sm leading-relaxed text-muted">
        {THRESHOLD_NOTE}
      </figcaption>
    </figure>
  );
}
