import { cn } from "@/lib/cn";

/**
 * The page gutter.
 *
 * Mobile-first up to 1280px, then wider: the site was built with no
 * breakpoint above lg, so a large monitor rendered the tablet layout inside
 * a 1024px column with the rest of the screen empty. The extra width goes to
 * layout — more columns, roomier figures — and never to line length, which
 * stays capped by max-w-2xl on prose because a 1900px line of text is harder
 * to read, not easier.
 */

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn(
        "mx-auto w-full max-w-5xl px-5 sm:px-8 xl:max-w-6xl 2xl:max-w-7xl",
        className
      )}>
      {children}
    </div>
  );
}
