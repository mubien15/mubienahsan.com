import { LAST_CHECKED } from "@/content/autonomy";

/**
 * Shared furniture for the printable documents under /print.
 *
 * These pages exist to be turned into the PDFs in public/research by
 * scripts/build-pdfs.mjs, but they are ordinary routes, so they also work
 * for anyone who would rather print from the browser. They are marked
 * noindex and kept out of the sitemap: the canonical home of this material
 * is /research/autonomy-governance, and two URLs competing for the same
 * content helps nobody.
 */

export const PRINT_METADATA = {
  robots: { index: false, follow: false },
} as const;

export function PrintHeader({
  kicker,
  title,
  standfirst,
}: {
  kicker: string;
  title: string;
  standfirst: string;
}) {
  return (
    <header className="print-block border-b border-line pb-6 print-rule">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted">
        {kicker}
      </p>
      <h1 className="font-display mt-2 text-3xl leading-tight text-ink sm:text-4xl">
        {title}
      </h1>
      <p className="prose-scale-sm mt-3 leading-relaxed text-ink/80">{standfirst}</p>
      <p className="mt-4 text-xs text-muted">
        Mubien · mubienahsan.com/research/autonomy-governance · Sources
        last checked {LAST_CHECKED}
      </p>
    </header>
  );
}

/**
 * The same disclaimer the page carries. It travels with the document,
 * because a PDF gets forwarded away from the page that explains it.
 */
export function PrintFooterNote({ extra }: { extra?: string }) {
  return (
    <section className="print-block mt-10 border-t border-line pt-5 text-xs leading-relaxed text-muted print-rule">
      <p>
        Independent personal work based on public sources. It is educational
        material, not legal, regulatory or professional advice. Nothing here is a
        certification, an audit opinion or a compliance conclusion.
      </p>
      <p className="mt-2">
        Voluntary frameworks and binding law are distinguished throughout and
        should not be read as interchangeable. This area moves quickly; check
        the sources against their current versions before relying on them.
      </p>
      {extra ? <p className="mt-2">{extra}</p> : null}
      <p className="mt-3">
        © {new Date().getFullYear()} Mubien. Free to use and share within
        your organisation with attribution.
      </p>
    </section>
  );
}

/** A ruled line to write on, sized in characters rather than pixels. */
export function Field({
  label,
  width = "full",
}: {
  label: string;
  width?: "full" | "half" | "third";
}) {
  const span =
    width === "full" ? "sm:col-span-6" : width === "half" ? "sm:col-span-3" : "sm:col-span-2";
  return (
    <div className={`col-span-6 ${span}`}>
      <p className="text-[0.68rem] font-semibold uppercase tracking-wider text-muted">
        {label}
      </p>
      <div className="print-field mt-1 h-7 border-b border-line" />
    </div>
  );
}

/** An empty box to tick. Deliberately not a checkbox input: this is paper. */
export function Tickbox({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
      <span className="inline-block h-3.5 w-3.5 shrink-0 border border-muted/70 print-rule" />
      <span className="text-[0.8rem] text-ink/80">{label}</span>
    </span>
  );
}
