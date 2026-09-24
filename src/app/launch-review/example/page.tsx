import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/motion";
import { CtaLink, Eyebrow, Pill } from "@/components/ui";
import {
  generateLaunchReview,
  REVIEW_PRESETS,
  type ReviewTest,
} from "@/lib/launch-review";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("/launch-review/example", {
  title: "Worked AI product launch review",
  description:
    "A readable worked example showing the claims, tests, evidence requirements, launch gates, and open decisions generated for an AI shopping agent.",
});

function getExamplePreset() {
  const found = REVIEW_PRESETS.find((item) => item.label === "Shopping agent");
  if (!found) {
    throw new Error("The shopping-agent review example is missing.");
  }
  return found;
}

const preset = getExamplePreset();
const review = generateLaunchReview(preset.value);

const TEST_STYLE: Record<ReviewTest["kind"], string> = {
  Baseline: "bg-mint-soft text-mint",
  Boundary: "bg-gold-soft text-ink",
  Adversarial: "bg-flame-soft text-flame",
  Recovery: "bg-grape-soft text-grape",
};

export default function LaunchReviewExamplePage() {
  return (
    <Container className="py-12 sm:py-16 lg:py-20">
      <Link
        href="/launch-review#worked-example"
        className="text-sm font-medium text-muted transition-colors hover:text-grape"
      >
        ← AI Product Launch Review
      </Link>

      <article className="mt-8">
        <Reveal>
          <header className="relative overflow-hidden rounded-[2rem] border border-grape/20 bg-grape-soft px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
            <div
              aria-hidden
              className="glow glow-mint absolute -bottom-52 -right-40 h-[30rem] w-[30rem] rounded-full opacity-55"
            />
            <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <Eyebrow tone="grape">Worked example</Eyebrow>
                <h1 className="font-display mt-4 max-w-4xl text-4xl leading-[1.04] tracking-tight text-ink sm:text-5xl lg:text-6xl">
                  {preset.value.productName}: shopping with delegated authority
                </h1>
                <p className="mt-5 max-w-[68ch] text-lg leading-relaxed text-ink/75">
                  This example shows what the public prototype produces for an AI agent that can
                  find and purchase a product within a buyer&apos;s confirmed mandate.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <CtaLink href="/launch-review#launch-review-tool" tone="grape">
                    Start your own review
                  </CtaLink>
                  <a
                    href="/downloads/ai-product-launch-review-sample.md"
                    download
                    className="inline-flex items-center justify-center rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-grape/50 hover:text-grape"
                  >
                    Download Markdown
                  </a>
                </div>
              </div>

              <aside className="rounded-2xl border border-grape/20 bg-surface/80 p-5 sm:p-6">
                <Pill tone="grape">{review.level}</Pill>
                <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-5">
                  <Fact value={String(review.claims.length)} label="claims" />
                  <Fact value={String(review.tests.length)} label="tests" />
                  <Fact value={String(review.gates.length)} label="gates" />
                </dl>
                <p className="mt-5 text-xs leading-5 text-muted">
                  Illustrative output from transparent decision rules. This is not a safety
                  certification or a completed assessment of a live product.
                </p>
              </aside>
            </div>
          </header>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,0.42fr)] lg:gap-16">
          <div className="space-y-16">
            <Reveal>
              <section>
                <Eyebrow tone="grape">Example input</Eyebrow>
                <h2 className="font-display mt-3 text-3xl text-ink">What the product is meant to do</h2>
                <p className="mt-5 text-lg leading-8 text-ink/80">{preset.value.summary}</p>
                <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                  <InputFact label="Success condition" value={preset.value.success} />
                  <InputFact label="Primary concern" value={preset.value.concern} />
                </dl>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <Eyebrow tone="mint">Claims to prove</Eyebrow>
                <h2 className="font-display mt-3 text-3xl text-ink">
                  Every promise gets a pass condition
                </h2>
                <div className="mt-6 grid gap-4">
                  {review.claims.map((claim, index) => (
                    <article key={claim.id} className="rounded-2xl border border-line bg-surface p-6">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="font-mono text-xs text-mint">
                          CLAIM {String(index + 1).padStart(2, "0")}
                        </span>
                        <Pill tone={claim.priority === "Required" ? "flame" : "grape"}>
                          {claim.priority}
                        </Pill>
                      </div>
                      <h3 className="font-display mt-3 text-2xl text-ink">{claim.title}</h3>
                      <p className="mt-2 leading-7 text-ink/80">{claim.claim}</p>
                      <dl className="mt-5 grid gap-4 border-t border-line pt-5 sm:grid-cols-2">
                        <Detail label="Pass condition" value={claim.acceptance} />
                        <Detail label="Evidence expected" value={claim.evidence} />
                      </dl>
                    </article>
                  ))}
                </div>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <Eyebrow tone="flame">Evaluation cases</Eyebrow>
                <h2 className="font-display mt-3 text-3xl text-ink">
                  Test the boundary as well as the happy path
                </h2>
                <div className="mt-6 space-y-3">
                  {review.tests.map((test, index) => (
                    <article
                      key={test.id}
                      className="grid gap-4 rounded-2xl border border-line bg-surface p-5 sm:p-6 lg:grid-cols-[3rem_0.8fr_1fr]"
                    >
                      <span className="font-mono text-xs text-muted">
                        T{String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${TEST_STYLE[test.kind]}`}>
                          {test.kind}
                        </span>
                        <h3 className="font-display mt-3 text-xl text-ink">{test.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-muted">{test.scenario}</p>
                      </div>
                      <div className="rounded-xl border border-line bg-paper/45 p-4">
                        <Detail label="Expected behaviour" value={test.expected} />
                        <div className="mt-4">
                          <Detail label="Pass condition" value={test.pass} />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <Eyebrow tone="grape">Launch gates</Eyebrow>
                <h2 className="font-display mt-3 text-3xl text-ink">
                  Evidence and ownership before release
                </h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {review.gates.map((gate, index) => (
                    <article key={gate.id} className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
                      <span className="font-mono text-xs text-grape">
                        GATE {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display mt-3 text-xl text-ink">{gate.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-ink/80">{gate.question}</p>
                      <dl className="mt-4 space-y-4 border-t border-line pt-4">
                        <Detail label="Evidence expected" value={gate.evidence} />
                        <Detail label="Suggested owner" value={gate.owner} />
                      </dl>
                    </article>
                  ))}
                </div>
              </section>
            </Reveal>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <section className="rounded-2xl border border-grape/20 bg-grape-soft/50 p-6">
              <Eyebrow tone="grape">System boundary</Eyebrow>
              <p className="mt-4 text-sm leading-7 text-ink/80">{review.systemBoundary}</p>
            </section>

            <section className="rounded-2xl border border-flame/20 bg-flame-soft/40 p-6">
              <Eyebrow tone="flame">Prohibited use</Eyebrow>
              <p className="mt-4 text-sm leading-7 text-ink/80">{review.prohibitedUse}</p>
            </section>

            <section className="rounded-2xl border border-line bg-surface p-6">
              <Eyebrow tone="gold">Open decisions</Eyebrow>
              <ol className="mt-4 space-y-4">
                {review.openQuestions.map((question, index) => (
                  <li key={question} className="flex gap-3 text-sm leading-6 text-ink/80">
                    <span className="font-mono shrink-0 text-gold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{question}</span>
                  </li>
                ))}
              </ol>
            </section>
          </aside>
        </div>

        <Reveal>
          <section className="mt-16 rounded-3xl border border-line bg-surface p-7 sm:p-9">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Eyebrow tone="grape">Try the method</Eyebrow>
                <h2 className="font-display mt-3 text-2xl text-ink sm:text-3xl">
                  Turn your own product description into a review.
                </h2>
              </div>
              <CtaLink href="/launch-review#launch-review-tool" tone="grape">
                Start a review
              </CtaLink>
            </div>
          </section>
        </Reveal>
      </article>
    </Container>
  );
}

function Fact({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="font-display text-3xl text-grape">{value}</dt>
      <dd className="mt-1 text-xs text-muted">{label}</dd>
    </div>
  );
}

function InputFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{label}</dt>
      <dd className="mt-2 text-sm leading-6 text-ink/80">{value}</dd>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{label}</dt>
      <dd className="mt-1.5 text-sm leading-6 text-ink/75">{value}</dd>
    </div>
  );
}
