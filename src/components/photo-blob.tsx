/**
 * Friendly hero avatar in the style of a creator site. The body is clipped to a
 * round blob (so shoulders/arms are cut to the circle), while the head rises
 * above the top of the circle. Two layers of the same photo, perfectly aligned:
 *   - body layer: clipped inside the round blob
 *   - head layer: shows only the upper portion, so the head pops above the circle
 *
 * Falls back to a monogram when no `src` is given.
 */
export function PhotoBlob({
  src,
  alt = "Mubien Ahsan",
  monogram = "M",
}: {
  src?: string;
  alt?: string;
  monogram?: string;
}) {
  // Same transform for both layers so they line up exactly. The height sets how
  // far the head rises above the circle, and it is tuned to the photo: this one
  // has plenty of torso, so the head is a small share of the frame and the
  // original lift works without the face escaping the circle.
  const photo =
    "absolute bottom-0 left-1/2 h-[122%] w-auto max-w-none -translate-x-1/2 select-none";

  return (
    <div className="relative mx-auto w-44 sm:w-52">
      {/* Hand-drawn dashed doodle ring around the round blob */}
      <svg
        aria-hidden
        viewBox="0 0 240 240"
        className="absolute -inset-2 -z-10 h-[calc(100%+1rem)] w-[calc(100%+1rem)] text-grape"
        fill="none"
      >
        <path
          d="M120 12 C 190 12, 228 55, 228 120 C 228 195, 180 230, 118 228 C 55 226, 14 188, 12 122 C 10 58, 52 14, 120 12 Z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="2 10"
          opacity="0.6"
        />
      </svg>

      <div className="relative aspect-square">
        {/* Round yellow blob with the body clipped inside it */}
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

        {/* Head layer: shows the upper portion only, so the head rises above the circle */}
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
