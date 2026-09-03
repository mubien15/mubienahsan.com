/**
 * Tiny classNames joiner. Filters out falsy values so you can write
 * cn("base", condition && "extra"). No dependency on clsx/tailwind-merge
 * to keep the skeleton lean.
 */
export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}
