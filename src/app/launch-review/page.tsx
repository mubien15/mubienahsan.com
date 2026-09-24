import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { LaunchReviewAgent } from "@/components/launch-review-agent";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { SubscribeForm } from "@/components/subscribe-form";
import { CtaLink, Eyebrow, Pill } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("/launch-review", {
  title: "AI Product Launch Review",
  description:
    "Turn an AI product idea into testable claims, evaluation cases, evidence requirements, and launch gates with Mubien's interactive AI Product Launch Review.",
});

const OUTPUTS = [
  {
    number: "01",
    title: "Claims to prove",
    body: "Replace broad promises such as ‘safe’ or ‘accurate’ with an observable behaviour and a pass condition.",
  },
  {
    number: "02",
    title: "Boundary tests",
    body: "Test ambiguity, excessive authority, adversarial input, tool failure, and recovery alongside the happy path.",
  },
  {
    number: "03",
    title: "Launch gates",
    body: "Name the evidence, decision, and owner required before a consequential system reaches real users.",
  },
] as const;

export default function LaunchReviewPage() {
  return (
    <>
      <Container className="pt-10 sm:pt-14 lg:pt-16">
        <Link
          href="/projects"
          className="text-sm font-medium text-muted transition-colors hover:text-grape"
        >
          ← Projects
        </Link>

        <Reveal>
          <header className="relative mt-6 overflow-hidden rounded-[2rem] border border-grape/20 bg-grape-soft px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
            <div
              aria-hidden
              className="glow glow-mint absolute -bottom-56 -right-44 h-[34rem] w-[34rem] rounded-full opacity-60"
            />
            <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <Eyebrow tone="grape">AI Product Launch Review</Eyebrow>
                  <Pill tone="mint">Public prototype</Pill>
                </div>
                <h1 className="font-display mt-5 max-w-4xl text-4xl leading-[1.03] tracking-tight text-ink sm:text-5xl lg:text-6xl">
                  Turn an AI idea into a launch decision you can test.
                </h1>
                <p className="mt-6 max-w-[68ch] text-lg leading-relaxed text-ink/75 sm:text-xl">
                  AI Product Launch Review translates a product description into testable claims,
                  adversarial scenarios, evidence requirements, and launch gates. It is designed
                  to make the reasoning visible before a polished demo creates false confidence.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <CtaLink href="#launch-review-tool" tone="grape">
                    Start a review
                  </CtaLink>
                  <CtaLink href="#method" variant="secondary">
                    See the method
                  </CtaLink>
                </div>
              </div>

              <aside className="rounded-2xl border border-grape/20 bg-surface/75 p-5 shadow-sm sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-grape">
                  The core question
                </p>
                <p className="font-display mt-3 text-2xl leading-snug text-ink">
                  What must be true before this system deserves to reach a real user?
                </p>
                <dl className="mt-6 grid grid-cols-3 gap-2 border-t border-line pt-5">
                  <HeroFact value="3" label="steps" />
                  <HeroFact value="4" label="outputs" />
                  <HeroFact value="0" label="uploads" />
                </dl>
              </aside>
            </div>
          </header>
        </Reveal>
      </Container>

      <Container className="py-12 sm:py-16">
        <LaunchReviewAgent />
      </Container>

      <section id="method" className="scroll-mt-24">
      <Container className="pb-16 pt-4 sm:pb-20">
        <Reveal>
          <Eyebrow tone="grape">The method</Eyebrow>
          <div className="mt-3 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
              Move from confidence to evidence.
            </h2>
            <p className="text-lg leading-relaxed text-muted">
              A useful review separates what the team hopes will happen from what it can
              demonstrate. The first version follows a transparent set of rules, so every output
              can be challenged and edited rather than accepted because it sounds authoritative.
            </p>
          </div>
        </Reveal>

        <Stagger className="mt-8 grid gap-4 lg:grid-cols-3" inView>
          {OUTPUTS.map((output) => (
            <StaggerItem key={output.number}>
              <article className="h-full rounded-2xl border border-line bg-surface p-6">
                <span className="font-display text-sm text-grape">{output.number}</span>
                <h3 className="font-display mt-4 text-2xl text-ink">{output.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{output.body}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal>
          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            <section className="rounded-3xl border border-mint/25 bg-mint-soft/55 p-7 sm:p-8">
              <Eyebrow tone="mint">What it produces</Eyebrow>
              <h2 className="font-display mt-3 text-2xl text-ink sm:text-3xl">
                A review artifact a team can challenge
              </h2>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-ink/80">
                <ListItem>System boundary and prohibited-use statement</ListItem>
                <ListItem>Claims with acceptance criteria and expected evidence</ListItem>
                <ListItem>Baseline, boundary, adversarial, and recovery tests</ListItem>
                <ListItem>Launch gates with decisions and suggested owners</ListItem>
                <ListItem>Markdown export for a repository, ticket, or review document</ListItem>
              </ul>
            </section>

            <section className="rounded-3xl border border-flame/20 bg-flame-soft/45 p-7 sm:p-8">
              <Eyebrow tone="flame">The boundary</Eyebrow>
              <h2 className="font-display mt-3 text-2xl text-ink sm:text-3xl">
                A first pass is not proof
              </h2>
              <p className="mt-5 text-sm leading-6 text-ink/80">
                The review uses only the description entered in the browser. It does not inspect
                the product, run the generated tests, validate evidence, certify safety, or make a
                legal determination. Its job is to make the next questions and tests concrete.
              </p>
              <p className="mt-4 text-sm leading-6 text-ink/80">
                The next product milestone is evidence ingestion: attaching test runs, traces, and
                review records to each launch claim without allowing the model to grade itself.
              </p>
            </section>
          </div>
        </Reveal>

        <Reveal>
          <section id="worked-example" className="mt-12 rounded-3xl border border-line bg-surface p-7 sm:p-9">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <div>
                <Eyebrow tone="mint">Worked example</Eyebrow>
                <h2 className="font-display mt-3 text-3xl text-ink">
                  Inspect a complete review before starting your own.
                </h2>
                <p className="mt-4 text-base leading-7 text-muted">
                  The sample applies the current rules to a shopping agent that can complete a
                  purchase within a user mandate. It shows the generated claims, adversarial
                  cases, evidence requirements, launch gates, and open decisions in one portable
                  artifact.
                </p>
                <CtaLink
                  href="/launch-review/example"
                  tone="mint"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-mint px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:brightness-95"
                >
                  View the worked review →
                </CtaLink>
              </div>
              <div className="rounded-2xl border border-mint/25 bg-mint-soft/45 p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mint">
                  What the example establishes
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-ink/80">
                  <ListItem>The rule engine produces stable output from the same inputs</ListItem>
                  <ListItem>Money, browsing, and independent action trigger specific controls</ListItem>
                  <ListItem>Every launch gate names evidence and a suggested owner</ListItem>
                </ul>
                <p className="mt-5 border-t border-mint/20 pt-4 text-xs leading-5 text-muted">
                  This is a worked prototype output, not evidence that the reviewed product is
                  safe or ready to launch.
                </p>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="relative mt-12 overflow-hidden rounded-3xl border border-line bg-surface p-7 sm:p-10">
            <div
              aria-hidden
              className="glow glow-gold absolute -bottom-48 -right-36 h-[28rem] w-[28rem] rounded-full opacity-55"
            />
            <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <Eyebrow tone="accent">Follow the build</Eyebrow>
                <h2 className="font-display mt-3 text-3xl text-ink">
                  Get new test packs as the product develops.
                </h2>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  I share the reasoning, failures, and useful parts of what I build. Joining also
                  gets you The First Build, my practical guide to creating an AI morning brief.
                </p>
              </div>
              <div>
                <SubscribeForm source="launch-review" />
                <p className="mt-3 text-xs leading-relaxed text-muted">
                  Free, occasional, and written by me. Unsubscribe whenever you want.
                </p>
              </div>
            </div>
          </section>
        </Reveal>
      </Container>
      </section>
    </>
  );
}

function HeroFact({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="font-display text-2xl text-grape">{value}</dt>
      <dd className="mt-1 text-[0.65rem] uppercase tracking-wider text-muted">{label}</dd>
    </div>
  );
}

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mint" />
      <span>{children}</span>
    </li>
  );
}
