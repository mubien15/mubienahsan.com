import Image from "next/image";

/**
 * Presents an app screenshot inside a simple browser-window chrome:
 * a title bar with three dots and the live domain, then the image.
 */
export function BrowserFrame({
  src,
  alt,
  label,
  sizes = "(max-width: 640px) 100vw, 50vw",
  priority = false,
}: {
  src: string;
  alt: string;
  label?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className="overflow-hidden bg-sunken">
      <div className="flex items-center gap-2 border-b border-line/70 bg-surface px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-flame/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-gold/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-mint/70" />
        </span>
        {label ? (
          <span className="ml-2 truncate rounded-md bg-sunken px-2 py-0.5 font-mono text-xs text-muted">
            {label}
          </span>
        ) : null}
      </div>
      <div className="relative aspect-[16/10]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover object-top"
          priority={priority}
        />
      </div>
    </div>
  );
}
