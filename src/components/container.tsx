import { cn } from "@/lib/cn";

/**
 * The one content column.
 *
 * Every page, and the header and footer with them, sit in this single
 * width — so nothing on the site is ever wider than anything else. It is
 * set a little wider than a classic reading measure and paired with a type
 * bump above 1280px (see globals.css), because the constraint that matters
 * is characters per line, not pixels: widening the column without growing
 * the text would just make the lines harder to track back.
 *
 * Deliberately not responsive above its cap. A large monitor gets generous
 * margins rather than a stretched layout, which is the trade this site
 * chose: alignment and readability over filling the glass.
 */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[52rem] px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}
