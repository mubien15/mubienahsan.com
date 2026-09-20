import type { Metadata } from "next";
import {
  DIMENSIONS,
  LEVELS,
  OVERSIGHT_TESTS,
  THRESHOLD_NOTE,
} from "@/content/autonomy";
import {
  PRINT_METADATA,
  PrintFooterNote,
  PrintHeader,
} from "@/components/print-doc";

export const metadata: Metadata = {
  title: "The AI Autonomy Governance Matrix — printable summary",
  description:
    "A printable summary of five levels of AI autonomy mapped against eight governance dimensions.",
  ...PRINT_METADATA,
};

const WEIGHT_WORD = ["", "Light", "Moderate", "Substantial", "Heavy", "Maximal"];

/**
 * The matrix as a document.
 *
 * On screen the framework is a tablist, because a 5x8 grid cannot be read on
 * a phone and the useful comparison runs down a level rather than across a
 * row. On paper both readings are available at once, so this version leads
 * with the grid — the one thing the interactive version genuinely cannot
 * show — and then gives each level its own block.
 */
export default function AutonomyMatrixPrintPage() {
  return (
    <div className="print-doc mx-auto w-full max-w-4xl px-5 py-10 sm:px-8">
      <PrintHeader
        kicker="The Oversight Threshold · Framework summary"
        title="The AI Autonomy Governance Matrix"
        standfirst="Five levels of AI autonomy, mapped against eight governance dimensions. As autonomy rises, the ability of a person to independently verify the system falls — so governance has to intensify before the two cross."
      />

      {/* The grid: the whole framework on one sheet. */}
      <section className="print-block mt-8">
        <h2 className="font-display text-xl text-ink">
          Governance intensity by level
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          1 is a light touch; 5 is the heaviest arrangement this framework
          describes. The number is a relative weight for comparison across
          levels, not a score, a maturity rating or a measurement.
        </p>

        <table className="mt-4 w-full border-collapse text-left text-[0.78rem]">
          <thead>
            <tr>
              <th className="border-b border-line py-2 pr-3 align-bottom font-semibold text-ink print-rule">
                Dimension
              </th>
              {LEVELS.map((l) => (
                <th
                  key={l.id}
                  className="border-b border-line px-2 py-2 align-bottom font-semibold text-ink print-rule"
                >
                  <span className="block">L{l.id}</span>
                  <span className="block font-normal text-muted">{l.short}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DIMENSIONS.map((d) => (
              <tr key={d.id} className="print-block align-top">
                <td className="border-b border-line py-2 pr-3 print-rule">
                  <span className="block font-medium text-ink">{d.name}</span>
                  <span className="block text-[0.72rem] leading-snug text-muted">
                    {d.asks}
                  </span>
                </td>
                {LEVELS.map((l) => {
                  const w = l.dimensions[d.id].weight;
                  return (
                    <td
                      key={l.id}
                      className="border-b border-line px-2 py-2 text-center print-rule"
                    >
                      <span className="font-semibold text-ink">{w}</span>
                      <span className="block text-[0.68rem] text-muted">
                        {WEIGHT_WORD[w]}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        <p className="mt-3 text-xs leading-relaxed text-muted">
          {THRESHOLD_NOTE}
        </p>
      </section>

      {/* Each level in full. */}
      {LEVELS.map((l) => (
        <section key={l.id} className="print-break mt-10">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h2 className="font-display text-xl text-ink">
              Level {l.id} — {l.name}
            </h2>
            {l.scenario ? (
              <span className="rounded-full border border-line px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-wider text-muted print-rule">
                Scenario, not a claim
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-sm font-medium text-ink/70">{l.tagline}</p>

          {l.scenario ? (
            <p className="mt-3 border-l-2 border-line pl-3 text-[0.8rem] leading-relaxed text-muted print-rule">
              Level 5 is a stress test for the framework, used to ask whether
              these governance methods still work as autonomy rises. Including
              it is not a prediction that such a system exists, is imminent or
              is inevitable.
            </p>
          ) : null}

          <div className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            <Block title="What the system does" body={l.machineDoes} />
            <Block title="What the human still does" body={l.humanDoes} />
            <List title="Examples" items={l.examples} />
            <List title="What goes wrong" items={l.failures} />
            <List title="Controls this level needs" items={l.controls} />
            <List title="Evidence the controls ran" items={l.evidence} />
            <List title="What has to be true" items={l.assumptions} />
            <Block title="What moves it up a level" body={l.escalation} />
          </div>

          <div className="mt-4 border-t border-line pt-3 print-rule">
            <p className="text-[0.68rem] font-semibold uppercase tracking-wider text-muted">
              Governance intensity across the eight dimensions
            </p>
            <div className="mt-2 grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {DIMENSIONS.map((d) => (
                <p key={d.id} className="text-[0.76rem] leading-snug">
                  <span className="font-medium text-ink">
                    {d.name} — {l.dimensions[d.id].weight}{" "}
                    {WEIGHT_WORD[l.dimensions[d.id].weight].toLowerCase()}.
                  </span>{" "}
                  <span className="text-muted">{l.dimensions[d.id].text}</span>
                </p>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* The five oversight questions, as a reference card. */}
      <section className="print-break mt-10">
        <h2 className="font-display text-xl text-ink">
          The Meaningful Human Oversight Test
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Adding a human approval button does not create oversight. It creates a
          record that somebody was present. Whether that person was exercising
          judgement depends on five separable things, and a system can pass four
          of them and still fail. The companion assessment template works
          through these against one real system.
        </p>
        <ol className="mt-4 space-y-3">
          {OVERSIGHT_TESTS.map((t, i) => (
            <li key={t.id} className="print-block">
              <p className="text-sm font-semibold text-ink">
                {i + 1}. {t.name} — {t.question}
              </p>
              <p className="mt-0.5 text-[0.78rem] leading-relaxed text-muted">
                {t.why}
              </p>
              <p className="mt-0.5 text-[0.78rem] leading-relaxed text-muted">
                <span className="font-medium text-ink/70">Failure looks like:</span>{" "}
                {t.failureLooks}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <PrintFooterNote extra="The interactive version of this framework, with the full sources and method note, is at mubienahsan.com/research/autonomy-governance." />
    </div>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div className="print-block">
      <p className="text-[0.68rem] font-semibold uppercase tracking-wider text-muted">
        {title}
      </p>
      <p className="mt-1 text-[0.82rem] leading-relaxed text-ink/85">{body}</p>
    </div>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="print-block">
      <p className="text-[0.68rem] font-semibold uppercase tracking-wider text-muted">
        {title}
      </p>
      <ul className="mt-1 space-y-1">
        {items.map((it) => (
          <li
            key={it}
            className="pl-3 -indent-3 text-[0.82rem] leading-relaxed text-ink/85"
          >
            · {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
