import { cn } from "@/lib/cn";

/** Hand-drawn underline squiggle, placed under a highlighted word. */
export function Squiggle({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 300 12"
      preserveAspectRatio="none"
      className={cn("absolute -bottom-1 left-0 h-[0.38em] w-full", className)}
    >
      <path
        d="M2 8 C 60 2, 120 2, 180 6 S 260 10, 298 4"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A small hand-drawn arc, used as a decorative accent near headings. */
export function Sparkle({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      className={cn("h-5 w-5", className)}
    >
      <path
        d="M12 2 C 12.5 7, 17 11.5, 22 12 C 17 12.5, 12.5 17, 12 22 C 11.5 17, 7 12.5, 2 12 C 7 11.5, 11.5 7, 12 2 Z"
        fill="currentColor"
      />
    </svg>
  );
}
