import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { ExecutionKitBuyLink } from "@/components/execution-kit-buy-link";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Eyebrow, Pill } from "@/components/ui";
import { EXECUTION_KIT } from "@/lib/execution-kit";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("/launch-review/execution-kit", {
  title: "AI Product Launch Execution Kit",
  description:
    "A practical AI launch workbook and field guide for risks, evaluations, framework and regulation applicability, launch gates, and decision records.",
});

const CONTENTS = [
  {
    title: "Risk register",
    body: "Twelve starter risk areas with failure modes, harms, mitigations, evidence, owners, scoring, status, and reference prompts.",
  },
  {
    title: "Evaluation plan",
    body: "Baseline, boundary, adversarial, recovery, oversight, fairness, regression, and monitoring tests with thresholds and evidence fields.",
  },
  {
    title: "Applicability screen",
    body: "Trigger questions for NIST, ISO, OWASP, the EU AI Act, GDPR, PIPEDA, Canadian privacy guidance, and sector rules.",
  },
  {
    title: "Launch gates",
    body: "Required evidence and owner fields for product scope, data, security, oversight, legal review, monitoring, and the final decision.",
  },
  {
    title: "Decision package",
    body: "A decision memo, 45-minute review agenda, conditions log, monitoring plan, and explicit next-review triggers.",
  },
  {
    title: "Field guide",
    body: "An 11-page method with worked examples, evidence standards, a framework crosswalk, and links to official sources.",
  },
] as const;

const REFERENCES = [
  ["NIST AI RMF", "GOVERN, MAP, MEASURE, and MANAGE across the review lifecycle."],
  ["NIST GenAI Profile", "Generative AI risks and suggested actions."],
  ["ISO/IEC 42001", "AI management systems and organisational governance."],
  ["ISO/IEC 23894", "AI-specific risk management guidance."],
  ["OWASP LLM Top 10", "Application security risks such as prompt injection and excessive agency."],
  ["EU and Canadian prompts", "Role, market, data, decision impact, transparency, privacy, and sector review questions."],
] as const;

export default function ExecutionKitPage() {
  return (
    <>
      <Container className="pt-10 sm:pt-14 lg:pt-16">
        <Link
          href="/launch-review"
          className="text-sm font-medium text-muted transition-colors hover:text-accent"
        >
          ← AI Product Launch Review
        </Link>

        <Reveal>
          <header className="relative mt-6 overflow-hidden rounded-[2rem] border border-accent/20 bg-accent-soft/55 px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
            <div
              aria-hidden
              className="glow glow-mint absolute -bottom-56 -right-44 h-[34rem] w-[34rem] rounded-full opacity-55"
            />
            <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <Eyebrow tone="accent">Execution kit</Eyebrow>
                  <Pill tone="mint">Version 1.0</Pill>
                </div>
                <h1 className="font-display mt-5 max-w-4xl text-4xl leading-[1.03] tracking-tight text-ink sm:text-5xl lg:text-6xl">
                  Move from an AI review to a launch decision.
                </h1>
                <p className="mt-6 max-w-[67ch] text-lg leading-relaxed text-ink/75 sm:text-xl">
                  A practical operating kit for teams that need to identify risks, plan evaluations,
                  check which frameworks and regulations may apply, collect evidence, and make an
                  accountable launch decision.
                </p>
              </div>

              <aside className="rounded-3xl border border-accent/20 bg-surface/85 p-6 shadow-sm sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                  One-time purchase
                </p>
                <p className="font-display mt-2 text-5xl text-ink">{EXECUTION_KIT.price}</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Immediate access to the workbook, guide, and reusable templates. No subscription.
                </p>
                <ExecutionKitBuyLink className="mt-6 w-full" />
                <p className="mt-3 text-center text-xs leading-5 text-muted">
                  Secure checkout through Stripe
                </p>
              </aside>
            </div>
          </header>
        </Reveal>
      </Container>

      <Container className="py-14 sm:py-18">
        <Reveal>
          <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <Eyebrow tone="grape">What you receive</Eyebrow>
              <h2 className="font-display mt-3 text-3xl leading-tight text-ink sm:text-4xl">
                A working system, not a static checklist.
              </h2>
            </div>
            <p className="text-lg leading-8 text-muted">
              The free review makes the first questions visible. The paid kit gives you editable
              artifacts for owners, evidence, decisions, and follow-through.
            </p>
          </div>
        </Reveal>

        <Stagger className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3" inView>
          {CONTENTS.map((item, index) => (
            <StaggerItem key={item.title}>
              <article className="h-full rounded-2xl border border-line bg-surface p-6">
                <span className="font-display text-sm text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-4 text-2xl text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{item.body}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>

      <Container className="pb-16 sm:pb-20">
        <Reveal>
          <section className="rounded-3xl border border-grape/20 bg-grape-soft/55 p-7 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <Eyebrow tone="grape">Professional reference layer</Eyebrow>
                <h2 className="font-display mt-3 text-3xl leading-tight text-ink sm:text-4xl">
                  Check coverage and route the right questions.
                </h2>
                <p className="mt-4 text-base leading-7 text-muted">
                  The kit separates voluntary frameworks, security references, laws, and regulatory
                  guidance. It records the product facts that determine applicability and leaves the
                  legal conclusion with a qualified reviewer.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {REFERENCES.map(([name, body]) => (
                  <div key={name} className="rounded-2xl border border-grape/15 bg-surface/75 p-4">
                    <h3 className="font-display text-base text-grape">{name}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-ink/75">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="mt-12 grid gap-5 lg:grid-cols-2">
            <div className="rounded-3xl border border-mint/25 bg-mint-soft/55 p-7 sm:p-8">
              <Eyebrow tone="mint">Built for action</Eyebrow>
              <h2 className="font-display mt-3 text-2xl text-ink sm:text-3xl">
                Use it with one product or across a team.
              </h2>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-ink/80">
                <ListItem>Works in Excel and compatible spreadsheet apps</ListItem>
                <ListItem>Editable fields, formulas, status controls, and starter examples</ListItem>
                <ListItem>Reusable for internal products and client work under the included licence</ListItem>
                <ListItem>Official source links and a dated reference check</ListItem>
              </ul>
            </div>
            <div className="rounded-3xl border border-gold/25 bg-gold-soft/55 p-7 sm:p-8">
              <Eyebrow tone="gold">Scope</Eyebrow>
              <h2 className="font-display mt-3 text-2xl text-ink sm:text-3xl">
                A disciplined starting point.
              </h2>
              <p className="mt-5 text-sm leading-6 text-ink/80">
                The kit supports investigation and documentation. It does not inspect your product,
                certify a system, determine legal compliance, replace legal advice, or prove that a
                product is safe. The workbook makes those boundaries visible rather than hiding them.
              </p>
              <ExecutionKitBuyLink className="mt-6" />
            </div>
          </section>
        </Reveal>
      </Container>
    </>
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
