import { cn } from "@/lib/cn";
import { EXECUTION_KIT } from "@/lib/execution-kit";

export function ExecutionKitBuyLink({
  children = `Get the kit — ${EXECUTION_KIT.price}`,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={EXECUTION_KIT.checkoutUrl}
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-accent-strong",
        className
      )}
    >
      {children}
    </a>
  );
}
