import { LOGO_SHAPES } from "@/lib/logo-shapes";

/**
 * The mark: three ascending blocks reading as an M and as something built up
 * in stages, traced from Mubien's own artwork.
 *
 * Drawn in `currentColor`, so the colour comes from whatever it sits in and
 * one component serves the header, the footer, a dark background and
 * one-colour print. See `logo-shapes` for the rules the geometry depends on.
 */
export function LogoMark({
  className,
  title = "Mubien",
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
      {LOGO_SHAPES.map((points) => (
        <polygon key={points} points={points} />
      ))}
    </svg>
  );
}
