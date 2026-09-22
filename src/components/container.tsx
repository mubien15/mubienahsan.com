import { cn } from "@/lib/cn";

/**
 * Shared responsive frame: compact on phones and tablets, spacious on desktop.
 * Reading copy has its own line-length limit; cards and grids use the full frame.
 */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[52rem] px-5 sm:px-8 lg:max-w-[80rem] lg:px-10 2xl:max-w-[90rem] 2xl:px-12", className)}>
      {children}
    </div>
  );
}
