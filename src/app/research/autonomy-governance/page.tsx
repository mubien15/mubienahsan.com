import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { PageIntro, Pill } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { VerificationCurve } from "@/components/verification-curve";
import { AutonomyMatrix } from "@/components/autonomy-matrix";
import { OversightTest } from "@/components/oversight-test";
import {
  LAST_CHECKED,
  IMPLICATIONS,
  IMPLEMENT_NOW,
  NOT_SOLVED,
  OPEN_QUESTIONS,
  LIMITATIONS,
  SOURCES,
  METHOD_NOTE,
} from "@/content/autonomy";

export const metadata: Metadata = {
  title: "The Oversight Threshold",
  description:
    "As AI autonomy rises, the ability of a person to independently verify the system falls. An interactive framework mapping five levels of autonomy against eight governance dimensions, with a test for whether human oversight is still doing real work.",
};

/** Stable anchors, so the section list keeps working if headings are edited. */
const SECTIONS = [
  { id: "argument", label: "The argument" },
  { id: "threshold-figure", label: "Where the lines cross" },
  { id: "matrix", label: "The matrix" },
  { id: "oversight-test", label: "The oversight test" },
  { id: "threshold", label: "The threshold itself" },
  { id: "implications", label: "What it means for you" },
  { id: "now", label: "What to do now" },
  { id: "limits", label: "Limits and open questions" },
  { id: "sources", label: "Sources and method" },
];

function H({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="font-display scroll-mt-24 text-2xl text-ink sm:text-3xl"
    >
      {children}
    </h2>
  );
}

export default function AutonomyGovernancePage() {
  return (
    <Container className="py-16 sm:py-20">
      <Link
        href="/research"
        className="text-sm font-medium text-muted hover:text-grape"
      >
        ← Research
      </Link>
      <div className="mt-6" />

      <PageIntro
        eyebrow="Interactive framework"
        title="The Oversight Threshold"
        tone="grape"
      >
        As AI becomes more autonomous, human approval can remain in the workflow
        while disappearing in substance.
      </PageIntro>

      {/* 1 — the argument */}
      <div className="mt-12 max-w-2xl space-y-6 text-[1.05rem] leading-8 text-ink/85">
        <Reveal>
          <p id="argument" className="scroll-mt-24">
            At what point does human oversight stop being meaningful, because
            the system has become too capable, too fast, too complex or too
            autonomous for a person to understand and verify what it decided?
          </p>
        </Reveal>
        <Reveal>
          <p>
            That question is usually asked about a distant future. It is
            already answerable about systems running now. An agent that takes
            forty actions in nine seconds has not been reviewed by the person
            who clicked approve, whatever the workflow diagram says, and the
            record will show an approval either way.
          </p>
        </Reveal>
        <Reveal>
          <p>
            The argument of this framework is narrow and, I think, hard to
            dispute:{" "}
            <strong className="text-ink">
              as autonomy and capability rise, the ability of a person to
              independently verify the system falls — so governance has to
              intensify before the two cross, not after.
            </strong>{" "}
            Past that crossing, a human approval step still produces a signature.
            It stops producing a check.
          </p>
        </Reveal>
        <Reveal>
          <p>
            This connects two conversations that are usually held in separate
            rooms. Practical AI governance deals with systems in production now.
            Alignment research deals with systems that may arrive later. The
            connection is that both are asking what happens when verification
            becomes impossible, and only one of them has to answer it this
            quarter. Level 5 below is a stress test, not a forecast: if today&apos;s
            methods cannot scale as autonomy rises, that is a fact about
            today&apos;s methods.
          </p>
        </Reveal>
        <Reveal>
          <p className="text-sm text-muted">
            Claims and links last checked{" "}
            <span className="font-medium text-ink">{LAST_CHECKED}</span>. This
            area moves quickly; treat anything here as accurate as of that date.
          </p>
        </Reveal>
      </div>

      <Reveal>
        <nav
          aria-label="Sections of this framework"
          className="mt-10 max-w-2xl rounded-2xl border border-line bg-surface p-5"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            On this page
          </p>
          <ol className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5">
            {SECTIONS.map((s, i) => (
              <li key={s.id} className="text-sm leading-snug">
                <a
                  href={`#${s.id}`}
                  className="text-ink/80 hover:text-grape hover:underline"
                >
                  <span className="mr-1.5 text-muted">{i + 1}.</span>
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </Reveal>

      {/* 2 — the figure */}
      <section className="mt-16">
        <Reveal>
          <H id="threshold-figure">Where the lines cross</H>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">
            Two things move in opposite directions as a system becomes more
            autonomous. The governance question is what happens where they meet.
          </p>
        </Reveal>
        <Reveal>
          <VerificationCurve />
        </Reveal>
      </section>

      {/* 3 — the matrix */}
      <section className="mt-16">
        <Reveal>
          <H id="matrix">The AI Autonomy Governance Matrix</H>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">
            Five levels, from a system that only drafts to one that could not be
            meaningfully reviewed. Pick a level to see what the system does,
            what the human still does, what goes wrong, which controls that
            level needs, and what would have to be true for the governance model
            to hold.
          </p>
        </Reveal>
        <Reveal>
          <AutonomyMatrix />
        </Reveal>
      </section>

      {/* 4 — the oversight test */}
      <section className="mt-16">
        <Reveal>
          <H id="oversight-test">The Meaningful Human Oversight Test</H>
          <div className="mt-3 max-w-2xl space-y-4 leading-relaxed text-muted">
            <p>
              Adding a human approval button does not create oversight. It
              creates a record that somebody was present. Whether that person
              was exercising judgement depends on five separable things, and a
              system can pass four of them and still fail.
            </p>
            <p>
              Answer for one real system you are responsible for.
            </p>
          </div>
        </Reveal>
        <Reveal>
          <OversightTest />
        </Reveal>
      </section>

      {/* 5 — the threshold */}
      <section className="mt-16">
        <Reveal>
          <H id="threshold">The threshold itself</H>
        </Reveal>
        <div className="mt-4 max-w-2xl space-y-5 text-[1.05rem] leading-8 text-ink/85">
          <Reveal>
            <p>
              The threshold is not a capability. It is the point where the
              evidence available to a reviewer stops being enough for them to
              reach an independent conclusion.
            </p>
          </Reveal>
          <Reveal>
            <p>
              It arrives from several directions and rarely announces itself.{" "}
              <strong className="text-ink">Speed</strong>: the system acts faster
              than review can happen, so approval moves to a sample or to
              afterwards.{" "}
              <strong className="text-ink">Volume</strong>: the reviewer faces
              two hundred decisions a day, and attention per decision collapses
              long before anyone reports a problem.{" "}
              <strong className="text-ink">Opacity</strong>: the reasoning cannot
              be reconstructed, so review is of the output alone.{" "}
              <strong className="text-ink">Dependence</strong>: the only evidence
              the reviewer has is evidence the system produced, which makes
              agreement the only reachable conclusion.
            </p>
          </Reveal>
          <Reveal>
            <p>
              Each of those can cross the line on its own. None of them requires
              a more capable model — a fast, high-volume, level 3 agent can put
              you past the threshold today with technology that already exists.
            </p>
          </Reveal>
          <Reveal>
            <p>
              What makes this hard to govern is that nothing visible changes at
              the crossing. The approval field is still there. The metric still
              shows a hundred per cent reviewed. The control description in the
              risk register still reads &ldquo;human review&rdquo;. The only thing
              that changed is whether that sentence is true, and no existing
              report has a column for it.
            </p>
          </Reveal>
          <Reveal>
            <p>
              Which suggests the practical move. Stop asking whether a human
              reviews the output, and start asking whether the reviewer could
              have reached a different conclusion. That question has an
              observable answer: seed errors and see whether review catches them.
              If it does not, you have measured that your primary control is
              documentation.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 6 — implications */}
      <section className="mt-16">
        <Reveal>
          <H id="implications">What this means, depending on where you sit</H>
        </Reveal>
        <Stagger className="mt-6 grid gap-4 sm:grid-cols-2" inView>
          {IMPLICATIONS.map((a) => (
            <StaggerItem key={a.role}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6">
                <h3 className="font-display text-lg text-ink">{a.role}</h3>
                <p className="mt-2 flex-1 leading-relaxed text-ink/85">
                  {a.point}
                </p>
                <p className="mt-3 border-t border-line pt-3 text-sm leading-relaxed text-grape">
                  {a.ask}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* 7 — what to do now */}
      <section className="mt-16">
        <Reveal>
          <H id="now">What organisations can do now</H>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">
            None of this requires waiting for a standard, and none of it
            presumes a more capable system than the ones already deployed.
          </p>
        </Reveal>
        <Stagger className="mt-6 grid gap-3 sm:grid-cols-2" inView>
          {IMPLEMENT_NOW.map((r, i) => (
            <StaggerItem key={r.title}>
              <div className="flex h-full gap-4 rounded-2xl border border-line bg-surface p-5">
                <span className="font-display mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-grape-soft text-sm font-semibold text-grape">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-medium leading-snug text-ink">
                    {r.title}
                  </h3>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink/80">
                    {r.detail}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* 8 — limits */}
      <section className="mt-16">
        <Reveal>
          <H id="limits">What is not solved, and what I am unsure about</H>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">
            Controls reduce risk. They do not resolve open technical problems,
            and a framework that implies otherwise is worse than no framework.
          </p>
        </Reveal>

        <div className="mt-6 max-w-3xl divide-y divide-line border-y border-line">
          {NOT_SOLVED.map((n) => (
            <Reveal key={n.problem}>
              <div className="py-5">
                <h3 className="font-medium text-ink">{n.problem}</h3>
                <p className="mt-1.5 leading-relaxed text-ink/80">{n.state}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-8 max-w-2xl">
            <h3 className="font-display text-lg text-ink">Open questions</h3>
            <ul className="mt-3 space-y-2.5">
              {OPEN_QUESTIONS.map((q) => (
                <li key={q} className="flex gap-2.5 leading-relaxed text-ink/85">
                  <span
                    aria-hidden
                    className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-grape"
                  />
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-8 max-w-2xl rounded-2xl border border-line bg-surface/60 p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
              Limitations of this framework
            </h3>
            <ul className="mt-3 space-y-2.5">
              {LIMITATIONS.map((l) => (
                <li
                  key={l}
                  className="text-sm leading-relaxed text-muted"
                >
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* 9 — sources */}
      <section className="mt-16">
        <Reveal>
          <H id="sources">Sources and method</H>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">
            Each source is summarised in my own words and linked, and labelled
            with what kind of thing it is — because a voluntary framework and a
            binding regulation carry very different weight, and are routinely
            quoted as if they did not.
          </p>
        </Reveal>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {SOURCES.map((s) => (
            <Reveal key={s.name}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Pill tone={s.kind === "Regulation" ? "flame" : "grape"}>
                    {s.kind}
                  </Pill>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                    {s.org}
                  </span>
                </div>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display mt-2.5 text-[1.05rem] leading-snug text-ink hover:text-grape hover:underline"
                >
                  {s.name}
                </a>
                <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-ink/80">
                  {s.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
            {METHOD_NOTE}
          </p>
        </Reveal>
      </section>

      {/* 10 — disclaimer */}
      <Reveal>
        <p className="mt-16 max-w-2xl rounded-2xl border border-line bg-surface/60 p-5 text-sm leading-relaxed text-muted">
          Written and published in a personal capacity, from public sources. It
          is not derived from any employer&apos;s methodology or from client
          work, it describes no real organisation, and it is not professional,
          legal or compliance advice. The framework, the five levels and the
          oversight test are my own; nothing here is a certification, a standard
          or a regulatory interpretation you should rely on without your own
          advice.
        </p>
      </Reveal>
    </Container>
  );
}
