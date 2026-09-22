/**
 * Hero avatar. The body is clipped to a round blob so the shoulders are cut to
 * the circle, while the head rises above the top of it — two layers of the same
 * photo, perfectly aligned. Behind it sits a gold disc and a sweeping ring that
 * breaks out of the circle, with a couple of small marks for asymmetry.
 *
 * Two things to keep in mind if this is ever edited:
 *
 * 1. Everything stacks positively. A negative z-index drops the decoration
 *    behind the hero card's own opaque background and it vanishes, which is
 *    what quietly happened to the dashed ring this replaces.
 * 2. The decoration has to stay over the photo column. The hero puts a heading
 *    immediately to the right, and anything reaching into it either sits on the
 *    text or reads as a bullet point next to it.
 *
 * Falls back to a monogram when no `src` is given.
 */
export function PhotoBlob({
  src,
  alt = "Mubien",
  monogram = "M",
}: {
  src?: string;
  alt?: string;
  monogram?: string;
}) {
  // Same transform for both layers so they line up exactly. The height sets how
  // far the head rises above the circle, and it is tuned to this photo.
  const photo =
    "absolute bottom-0 left-1/2 h-[122%] w-auto max-w-none -translate-x-1/2 select-none";

  return (
    <div className="relative isolate mx-auto w-44 sm:w-52">
      {/* Gold disc, a little larger than the photo circle and sitting low so the
          head clears the top of it. */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 z-0 h-[124%] w-[124%] -translate-x-1/2 -translate-y-[44%] rounded-full bg-gold/70"
      />

      {/* The sweep, its coral tail, and two small marks. */}
      <svg
        aria-hidden
        viewBox="0 0 300 300"
        className="absolute left-1/2 top-1/2 z-0 h-[176%] w-[176%] -translate-x-1/2 -translate-y-1/2"
        fill="none"
      >
        <path
          d="M150 34 A116 116 0 1 1 70 248"
          stroke="var(--gold)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M236 206 A104 104 0 0 1 182 256"
          stroke="var(--accent)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M44 104 A116 116 0 0 1 66 68"
          stroke="var(--grape)"
          strokeWidth="7"
          strokeLinecap="round"
          opacity="0.8"
        />
        <circle cx="52" cy="232" r="8" fill="var(--mint)" />
      </svg>

      <div className="relative z-10 aspect-square">
        {/* Round blob with the body clipped inside it */}
        <div className="absolute inset-0 overflow-hidden rounded-full bg-gradient-to-br from-[#fdf0c6] to-[#f6d98c]">
          {src ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={src} alt="" aria-hidden className={photo} />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-6xl text-accent-strong">
                {monogram}
              </span>
            </div>
          )}
        </div>

        {/* Head layer: upper portion only, so the head rises above the circle */}
        {src ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={src}
            alt={alt}
            className={`${photo} pointer-events-none [clip-path:inset(0_0_58%_0)]`}
          />
        ) : null}
      </div>
    </div>
  );
}
