import type { Metadata } from "next";
import { LAST_CHECKED, SOURCES } from "@/content/autonomy";
import {
  PAPER_ABSTRACT,
  PAPER_DATE,
  PAPER_SECTIONS,
  PAPER_SUBTITLE,
  PAPER_TITLE,
  PAPER_VERSION,
} from "@/content/autonomy-paper";
import { PRINT_METADATA } from "@/components/print-doc";

export const metadata: Metadata = {
  title: `${PAPER_TITLE} — research paper`,
  description: PAPER_SUBTITLE,
  ...PRINT_METADATA,
};

/**
 * The long-form paper, laid out as a document rather than a web page: a
 * cover, an abstract, numbered sections, and the sources as a reference
 * list. It shares src/content/autonomy.ts for the sources so the paper and
 * the site cannot end up citing different things.
 */
export default function OversightThresholdPaperPage() {
  return (
    <div className="print-doc mx-auto w-full max-w-3xl px-5 py-10 sm:px-8">
      {/* Cover */}
      <header className="print-block">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted">
          Research paper · Version {PAPER_VERSION} · {PAPER_DATE}
        </p>
        <h1 className="font-display mt-3 text-4xl leading-tight text-ink">
          {PAPER_TITLE}
        </h1>
        <p className="font-display mt-2 text-xl leading-snug text-ink/70">
          {PAPER_SUBTITLE}
        </p>
        <p className="mt-6 text-sm text-muted">
          Mubien Ahsan · mubienahsan.com/research/autonomy-governance
          <br />
          Sources last checked {LAST_CHECKED}
        </p>
      </header>

      {/* Abstract */}
      <section className="print-block mt-8 border-y border-line py-6 print-rule">
        <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted">
          Abstract
        </h2>
        <div className="mt-3 space-y-3 text-[0.9rem] leading-relaxed text-ink/85">
          {PAPER_ABSTRACT.map((para) => (
            <p key={para.slice(0, 32)}>{para}</p>
          ))}
        </div>
      </section>

      {/* Contents */}
      <nav className="print-block mt-8">
        <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted">
          Contents
        </h2>
        <ol className="mt-3 space-y-1">
          {PAPER_SECTIONS.map((s) => (
            <li key={s.id} className="text-[0.88rem] text-ink/85">
              <span className="inline-block w-7 text-muted">{s.number}.</span>
              {s.title}
            </li>
          ))}
        </ol>
      </nav>

      {/* Body */}
      {PAPER_SECTIONS.map((s) => (
        <section key={s.id} className="print-break mt-10">
          <h2 className="font-display border-b border-line pb-2 text-2xl text-ink print-rule">
            <span className="text-muted">{s.number}. </span>
            {s.title}
          </h2>
          <div className="mt-4 space-y-4">
            {s.body.map((b, i) => {
              if (b.kind === "h3") {
                return (
                  <h3
                    key={i}
                    className="font-display pt-2 text-lg text-ink"
                  >
                    {b.text}
                  </h3>
                );
              }
              if (b.kind === "quote") {
                return (
                  <blockquote
                    key={i}
                    className="print-block border-l-2 border-ink/30 pl-4 font-display text-lg leading-relaxed text-ink"
                  >
                    {b.text}
                  </blockquote>
                );
              }
              if (b.kind === "list") {
                return (
                  <ul key={i} className="print-block space-y-1.5">
                    {b.items.map((it) => (
                      <li
                        key={it}
                        className="pl-4 -indent-4 text-[0.92rem] leading-relaxed text-ink/85"
                      >
                        · {it}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p
                  key={i}
                  className="text-[0.92rem] leading-relaxed text-ink/85"
                >
                  {b.text}
                </p>
              );
            })}
          </div>
        </section>
      ))}

      {/* Reference list, shared with the site so the two cannot diverge. */}
      <section className="print-break mt-10">
        <h2 className="font-display border-b border-line pb-2 text-2xl text-ink print-rule">
          <span className="text-muted">13. </span>
          References
        </h2>
        <ol className="mt-4 space-y-4">
          {SOURCES.map((src, i) => (
            <li key={src.name} className="print-block">
              <p className="text-[0.92rem] leading-snug">
                <span className="text-muted">[{i + 1}] </span>
                <span className="font-medium text-ink">{src.name}</span>
                <span className="text-ink/70"> — {src.org}.</span>{" "}
                <span className="rounded border border-line px-1.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wider text-muted print-rule">
                  {src.kind}
                </span>
              </p>
              <p className="mt-1 text-[0.82rem] leading-relaxed text-muted">
                {src.note}
              </p>
              <p className="mt-0.5 break-all text-[0.75rem] text-muted">
                {src.href}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="print-block mt-10 border-t border-line pt-5 text-xs leading-relaxed text-muted print-rule">
        <p>
          © {new Date().getFullYear()} Mubien Ahsan. Free to use and share
          within your organisation with attribution. Version {PAPER_VERSION},{" "}
          {PAPER_DATE}.
        </p>
      </section>
    </div>
  );
}
