import type { Metadata } from "next";
import {
  DIMENSIONS,
  LEVELS,
  OVERSIGHT_OPTIONS,
  OVERSIGHT_RESULTS,
  OVERSIGHT_TESTS,
} from "@/content/autonomy";
import {
  Field,
  PRINT_METADATA,
  PrintFooterNote,
  PrintHeader,
  Tickbox,
} from "@/components/print-doc";

export const metadata: Metadata = {
  title: "Meaningful Human Oversight — assessment template",
  description:
    "A printable template for assessing whether human oversight of one AI system is doing real work or has become ceremonial.",
  ...PRINT_METADATA,
};

const WEIGHT_WORD = ["", "Light", "Moderate", "Substantial", "Heavy", "Maximal"];
const MAX = OVERSIGHT_TESTS.length * 2;

/**
 * The assessment template.
 *
 * The interactive test on the site scores an answer instantly, which is the
 * right interaction for a visitor and the wrong one for an organisation: the
 * useful part is the evidence someone had to write down next to the answer.
 * So this version asks for it. Every question has space for what the claim
 * rests on, and the scoring is done by hand at the end, because a total
 * arrived at too quickly is a total nobody argues with.
 *
 * It deliberately produces a condition and a date to revisit, not a rating.
 */
export default function OversightAssessmentPrintPage() {
  return (
    <div className="print-doc mx-auto w-full max-w-4xl px-5 py-10 sm:px-8">
      <PrintHeader
        kicker="The Oversight Threshold · Assessment template"
        title="Is human oversight of this system doing real work?"
        standfirst="Work through this against one real system you are responsible for — not a class of systems, and not the policy that covers them. The answers are only worth the evidence written beside them."
      />

      <section className="print-block mt-8">
        <h2 className="font-display text-lg text-ink">How to use this</h2>
        <ol className="mt-2 space-y-1.5 text-[0.85rem] leading-relaxed text-ink/85">
          <li className="pl-5 -indent-5">
            1. Name the system and the person who is actually accountable for
            its decisions, not the team that runs it.
          </li>
          <li className="pl-5 -indent-5">
            2. Place it on the autonomy scale in part two. Place it by what it
            can do, not by what the documentation says it is for.
          </li>
          <li className="pl-5 -indent-5">
            3. Answer the five oversight questions in part three, writing the
            evidence next to each. &ldquo;We would notice&rdquo; is not
            evidence; a case where someone did notice is.
          </li>
          <li className="pl-5 -indent-5">
            4. Total the score and read the band in part four.
          </li>
          <li className="pl-5 -indent-5">
            5. Check the governance dimensions in part five against the
            intensity the level calls for, and record the gaps.
          </li>
        </ol>
        <p className="mt-3 border-l-2 border-line pl-3 text-[0.8rem] leading-relaxed text-muted print-rule">
          This is a structured way to have an argument, not a control test or an
          assurance procedure. It produces a view and a date to revisit it. It
          does not produce a rating, a certification or a compliance conclusion.
        </p>
      </section>

      {/* 1 — the system */}
      <section className="print-block mt-8">
        <Part n={1} title="The system" />
        <div className="mt-3 grid grid-cols-6 gap-x-6 gap-y-4">
          <Field label="System or agent name" width="half" />
          <Field label="Assessment date" width="half" />
          <Field label="Accountable person (named, not a team)" width="half" />
          <Field label="Assessed by" width="half" />
          <Field label="What it is for, in one line" />
          <Field label="What it is explicitly not for" />
          <Field label="What it can reach: data, tools, systems, counterparties" />
          <Field label="What it can do without a person approving that specific action" />
        </div>
      </section>

      {/* 2 — the level */}
      <section className="print-block mt-8">
        <Part n={2} title="Where it sits on the autonomy scale" />
        <p className="mt-2 text-[0.85rem] leading-relaxed text-muted">
          Tick the highest level the system can reach in practice. If people
          disagree, that disagreement is the finding — record it rather than
          resolving it by picking the lower one.
        </p>
        <div className="mt-3 space-y-2">
          {LEVELS.map((l) => (
            <div
              key={l.id}
              className="print-block flex gap-3 border-b border-line pb-2 print-rule"
            >
              <span className="mt-0.5 inline-block h-3.5 w-3.5 shrink-0 border border-muted/70 print-rule" />
              <div>
                <p className="text-[0.85rem] font-semibold text-ink">
                  Level {l.id} — {l.name}
                  {l.scenario ? " (scenario, not a claim that this exists)" : ""}
                </p>
                <p className="text-[0.78rem] leading-snug text-muted">
                  {l.machineDoes}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-6 gap-x-6 gap-y-4">
          <Field label="What would move it up a level, and is anything already moving it?" />
        </div>
      </section>

      {/* 3 — the five questions */}
      <section className="print-block print-break mt-10">
        <Part n={3} title="The Meaningful Human Oversight Test" />
        <p className="mt-2 text-[0.85rem] leading-relaxed text-muted">
          Five separable conditions. A system can satisfy four and still fail,
          because the one it misses is the one that mattered. Score{" "}
          {OVERSIGHT_OPTIONS.map((o) => `${o.label.toLowerCase()} = ${o.score}`).join(
            ", "
          )}
          .
        </p>

        <div className="mt-4 space-y-5">
          {OVERSIGHT_TESTS.map((t, i) => (
            <div
              key={t.id}
              className="print-block border-b border-line pb-4 print-rule"
            >
              <p className="text-[0.88rem] font-semibold text-ink">
                {i + 1}. {t.name} — {t.question}
              </p>
              <p className="mt-1 text-[0.78rem] leading-relaxed text-muted">
                {t.why}
              </p>
              <p className="mt-1 text-[0.78rem] leading-relaxed text-muted">
                <span className="font-medium text-ink/70">
                  Failure looks like:
                </span>{" "}
                {t.failureLooks}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
                {OVERSIGHT_OPTIONS.map((o) => (
                  <Tickbox key={o.id} label={`${o.label} (${o.score})`} />
                ))}
              </div>

              <div className="mt-3 grid grid-cols-6 gap-x-6 gap-y-3">
                <Field label="Evidence for that answer — what specifically, and when was it last true?" />
                <Field label="If partly or no: what would have to change" />
              </div>
            </div>
          ))}
        </div>

        <div className="print-block mt-4 flex items-end gap-4">
          <p className="text-[0.85rem] font-semibold text-ink">
            Total score, out of {MAX}
          </p>
          <div className="print-field h-7 w-24 border-b border-line" />
        </div>
      </section>

      {/* 4 — reading the result */}
      <section className="print-block mt-8">
        <Part n={4} title="Reading the result" />
        <div className="mt-3 space-y-3">
          {OVERSIGHT_RESULTS.map((r, i) => {
            const upper = i === 0 ? MAX : OVERSIGHT_RESULTS[i - 1].min - 1;
            return (
              <div
                key={r.verdict}
                className="print-block border-b border-line pb-3 print-rule"
              >
                <p className="text-[0.85rem] font-semibold text-ink">
                  {r.min}–{upper} · {r.verdict}
                </p>
                <p className="mt-0.5 text-[0.8rem] leading-relaxed text-ink/85">
                  {r.meaning}
                </p>
                <p className="mt-0.5 text-[0.8rem] leading-relaxed text-muted">
                  <span className="font-medium text-ink/70">Next:</span> {r.next}
                </p>
              </div>
            );
          })}
        </div>
        <div className="mt-4 grid grid-cols-6 gap-x-6 gap-y-4">
          <Field label="Band reached" width="half" />
          <Field label="Date to reassess" width="half" />
          <Field label="The weakest of the five, and who owns closing it" />
        </div>
        <p className="mt-3 text-[0.78rem] leading-relaxed text-muted">
          Re-run this whenever the model, the tools, the permissions, the
          operating context or the volume of decisions changes. Any of those can
          move the answer without anyone deciding that it should.
        </p>
      </section>

      {/* 5 — the dimensions */}
      <section className="print-block print-break mt-10">
        <Part n={5} title="Governance dimensions against the level" />
        <p className="mt-2 text-[0.85rem] leading-relaxed text-muted">
          For the level you ticked in part two, the framework calls for the
          intensity shown below. Record what is actually in place, the evidence
          it operated, and the gap. A control that exists and has never been
          exercised belongs in the gap column.
        </p>

        <table className="mt-4 w-full border-collapse text-left text-[0.74rem]">
          <thead>
            <tr>
              <th className="w-[26%] border-b border-line py-2 pr-2 align-bottom font-semibold text-ink print-rule">
                Dimension
              </th>
              {LEVELS.map((l) => (
                <th
                  key={l.id}
                  className="border-b border-line px-1 py-2 text-center align-bottom font-semibold text-ink print-rule"
                >
                  L{l.id}
                </th>
              ))}
              <th className="w-[22%] border-b border-line px-2 py-2 align-bottom font-semibold text-ink print-rule">
                In place / evidence
              </th>
              <th className="w-[22%] border-b border-line px-2 py-2 align-bottom font-semibold text-ink print-rule">
                Gap and owner
              </th>
            </tr>
          </thead>
          <tbody>
            {DIMENSIONS.map((d) => (
              <tr key={d.id} className="print-block align-top">
                <td className="border-b border-line py-3 pr-2 print-rule">
                  <span className="block font-medium text-ink">{d.name}</span>
                  <span className="block text-[0.7rem] leading-snug text-muted">
                    {d.asks}
                  </span>
                </td>
                {LEVELS.map((l) => (
                  <td
                    key={l.id}
                    className="border-b border-line px-1 py-3 text-center print-rule"
                  >
                    <span className="font-semibold text-ink">
                      {l.dimensions[d.id].weight}
                    </span>
                  </td>
                ))}
                <td className="border-b border-line px-2 py-3 print-rule" />
                <td className="border-b border-line px-2 py-3 print-rule" />
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-[0.72rem] text-muted">
          1 = light touch, 5 = the heaviest arrangement this framework
          describes. {WEIGHT_WORD.slice(1).join(" · ")}. These are relative
          weights for comparing levels, not measurements and not a maturity
          score.
        </p>
      </section>

      {/* 6 — what this did not test */}
      <section className="print-block mt-8">
        <Part n={6} title="What this did not test" />
        <p className="mt-2 text-[0.85rem] leading-relaxed text-ink/85">
          Recording the limits keeps the document honest when it is read later
          by someone who was not in the room. This template does not test
          whether the model is accurate, whether it is robust to prompt
          injection, whether its reasoning can be interpreted, or whether a
          shutdown works — those need their own work, and none of them is a
          solved problem.
        </p>
        <div className="mt-3 grid grid-cols-6 gap-x-6 gap-y-4">
          <Field label="Known limitations of this assessment" />
          <Field label="What was assumed rather than verified" />
          <Field label="Who disagreed, and with what" />
        </div>
      </section>

      <PrintFooterNote extra="The interactive version of this test, the full framework and the sources behind it are at mubienahsan.com/research/autonomy-governance." />
    </div>
  );
}

function Part({ n, title }: { n: number; title: string }) {
  return (
    <h2 className="font-display border-b border-line pb-1 text-lg text-ink print-rule">
      <span className="text-muted">Part {n} · </span>
      {title}
    </h2>
  );
}
