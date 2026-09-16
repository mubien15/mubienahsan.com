/**
 * The mark: three ascending blocks reading as an M and as something built up
 * in stages. Traced from Mubien's own artwork onto a 64×64 grid.
 *
 * Two things the trace has to get right, both learned the hard way:
 *
 * 1. Filled, never stroked. The diagonal gaps between the blocks are under a
 *    unit wide on this grid, so any stroke closes them and the three blocks
 *    collapse into one mass.
 * 2. Contours, not convex hulls. A hull fills outward, which narrows those
 *    same gaps and shaves the rounded corners into flat chamfers.
 *
 * Drawn in `currentColor`: the colour comes from whatever it sits in, so one
 * component serves the header, a dark background and one-colour print.
 */

const SHAPES = [
  "11.18,59.90 2.71,59.80 1.98,59.49 1.31,58.81 1.00,57.99 1.00,44.55 1.31,43.52 1.72,42.90 2.60,42.13 18.31,34.27 19.45,34.07 20.79,34.38 21.87,35.36 22.29,36.49 22.29,57.37 22.08,58.19 21.10,59.38 20.17,59.80 11.28,59.80 11.18,59.90",
  "40.21,54.84 38.98,54.84 37.84,54.32 32.77,51.12 26.47,47.40 25.49,46.41 25.18,45.69 25.18,36.08 24.97,35.26 24.56,34.43 23.58,33.45 22.75,33.03 21.92,32.83 20.27,32.93 20.12,32.47 20.12,31.43 20.53,30.19 21.41,29.21 22.03,28.80 23.06,28.38 37.53,20.74 38.77,20.22 40.21,20.22 41.45,20.84 42.13,21.62 42.54,22.75 42.54,52.51 42.13,53.55 41.25,54.42 40.21,54.84",
  "60.88,59.80 47.55,59.80 46.62,59.38 45.85,58.61 45.43,57.68 45.43,22.55 44.92,20.89 43.93,19.81 43.00,19.29 42.28,19.08 40.47,19.03 40.47,15.73 40.99,14.59 41.87,13.71 57.99,4.72 59.02,4.20 59.54,4.10 60.88,4.20 62.02,4.82 62.59,5.39 63.00,6.43 63.00,57.58 62.59,58.61 61.81,59.38 60.88,59.80",
];

export function LogoMark({
  className,
  title = "Mubien Ahsan",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label={title}
      fill="currentColor"
    >
      {SHAPES.map((points) => (
        <polygon key={points} points={points} />
      ))}
    </svg>
  );
}
