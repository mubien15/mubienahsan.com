/**
 * The three blocks of the mark, as polygon point lists on a 64×64 grid.
 *
 * Single source of truth: the React component, the favicon, the Apple touch
 * icon and the social card all draw from this, so the mark cannot drift
 * between them.
 *
 * Two rules the shapes depend on:
 *  - Fill them, never stroke them. The diagonal gaps are under a unit wide,
 *    so any stroke closes them and the three blocks become one mass.
 *  - Keep the points. They come from contour-tracing the original artwork;
 *    simplifying further flattens the rounded corners into chamfers.
 */
export const LOGO_SHAPES = [
  "11.18,59.90 2.71,59.80 1.98,59.49 1.31,58.81 1.00,57.99 1.00,44.55 1.31,43.52 1.72,42.90 2.60,42.13 18.31,34.27 19.45,34.07 20.79,34.38 21.87,35.36 22.29,36.49 22.29,57.37 22.08,58.19 21.10,59.38 20.17,59.80 11.28,59.80 11.18,59.90",
  "40.21,54.84 38.98,54.84 37.84,54.32 32.77,51.12 26.47,47.40 25.49,46.41 25.18,45.69 25.18,36.08 24.97,35.26 24.56,34.43 23.58,33.45 22.75,33.03 21.92,32.83 20.27,32.93 20.12,32.47 20.12,31.43 20.53,30.19 21.41,29.21 22.03,28.80 23.06,28.38 37.53,20.74 38.77,20.22 40.21,20.22 41.45,20.84 42.13,21.62 42.54,22.75 42.54,52.51 42.13,53.55 41.25,54.42 40.21,54.84",
  "60.88,59.80 47.55,59.80 46.62,59.38 45.85,58.61 45.43,57.68 45.43,22.55 44.92,20.89 43.93,19.81 43.00,19.29 42.28,19.08 40.47,19.03 40.47,15.73 40.99,14.59 41.87,13.71 57.99,4.72 59.02,4.20 59.54,4.10 60.88,4.20 62.02,4.82 62.59,5.39 63.00,6.43 63.00,57.58 62.59,58.61 61.81,59.38 60.88,59.80",
];

/** The mark as a standalone SVG document, for anywhere React cannot reach. */
export function logoSvg(color: string, size = 64) {
  const polys = LOGO_SHAPES.map((p) => `<polygon points="${p}"/>`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}" fill="${color}">${polys}</svg>`;
}

/** Base64 data URI, which is what Satori accepts inside an ImageResponse. */
export function logoDataUri(color: string, size = 64) {
  const b64 = Buffer.from(logoSvg(color, size)).toString("base64");
  return `data:image/svg+xml;base64,${b64}`;
}
