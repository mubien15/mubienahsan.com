import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { CtaLink, Eyebrow, Pill } from "@/components/ui";
import { Reveal, Stagger, StaggerItem, HoverLift } from "@/components/motion";
import { AgentFlow } from "@/components/agent-flow";
import { PermissionTest } from "@/components/permission-test";
import {
  AGENTS_FEATURE,
  AGENT_SOURCES,
  FLOW_STAGES,
  PUBLISHED_CONTROLS,
} from "@/content/agents";

export const metadata: Metadata = pageMetadata("/agents", {
  title: "AI agent payment controls",
  description:
    "An interactive six-control framework for permission, evidence, and revocation when AI agents make purchases on someone's behalf.",
  openGraph: {
    images: [
      {
        url: "/agents/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Agents that spend · An interactive framework for AI agent permission, evidence, and revocation",
      },
    ],
  },
  twitter: {
    images: [
      {
        url: "/agents/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Agents that spend · An interactive framework for AI agent permission, evidence, and revocation",
      },
    ],
  },
});

const CONTROL_DETAILS: Record<
  string,
  { enforcement: string; owner: string; evidence: string; measure: string }
> = {
  "mandate-capture": {
    enforcement: "Before the agent begins",
    owner: "Product · identity",
    evidence: "Confirmed mandate and version history",
    measure: "Mandate coverage",
  },
  "check-at-commit": {
    enforcement: "Immediately before every payment",
    owner: "Payments · risk",
    evidence: "Policy decision and running total",
    measure: "Commit-time check rate",
  },
  "prove-who-it-acts-for": {
    enforcement: "At the merchant and credential boundary",
    owner: "Identity · payments",
    evidence: "Agent, principal, seller, and credential chain",
    measure: "Unverifiable attempts blocked",
  },
  "assume-bad-instructions": {
    enforcement: "After the agent reads untrusted content",
    owner: "AI platform · security",
    evidence: "Instruction provenance and attack log",
    measure: "Adversarial block rate",
  },
  "show-before-commit": {
    enforcement: "Before a material commitment",
    owner: "Product · consumer compliance",
    evidence: "Rendered terms and buyer action",
    measure: "Required disclosure coverage",
  },
  "make-stop-mean-stop": {
    enforcement: "At every action and payment",
    owner: "Platform · payments",
    evidence: "Revocation time and final permitted action",
    measure: "P95 stop latency",
  },
};

const EVALUATION_CASES = [
  {
    test: "Taxes and delivery push the final total over the cap",
    result: "Block",
    controls: "C1 · C2",
  },
  {
    test: "A refundable request becomes a cheaper non-refundable fare",
    result: "Ask",
    controls: "C1 · C5",
  },
  {
    test: "The storefront and seller of record are different parties",
    result: "Block",
    controls: "C3",
  },
  {
    test: "The same credential is replayed for a duplicate purchase",
    result: "Block",
    controls: "C2 · C3",
  },
  {
    test: "A hidden page instruction changes the cart after approval",
    result: "Block",
    controls: "C2 · C4",
  },
  {
    test: "The buyer revokes while a payment request is in flight",
    result: "Measure",
    controls: "C6",
  },
] as const;

const RECOMMENDATIONS = [
  {
    title: "Make permission explicit",
    body: "Capture scope, total cost, seller, substitution rules, duration, and purchase count in a record the buyer confirms.",
  },
  {
    title: "Keep enforcement outside the model",
    body: "Submit the final cart to a deterministic policy engine that reads the live mandate and cumulative spend.",
  },
  {
    title: "Issue the narrowest credential",
    body: "Bind payment capability to the approved seller, amount, currency, expiry, and one specific use wherever the rail allows it.",
  },
  {
    title: "Prove and rehearse stop",
    body: "Keep tamper-evident decision records, propagate revocation, and measure the time from stop request to final permitted action.",
  },
] as const;

export default function AgentsPage() {
  return (
    <Container className="py-12 sm:py-16 lg:py-20">
      <Link
        href="/research"
        className="text-sm font-medium text-muted hover:text-grape"
      >
        ← Research
      </Link>

      <Reveal y={16}>
        <header className="relative mt-6 overflow-hidden rounded-[2rem] border border-grape/20 bg-grape-soft px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <div
            aria-hidden
            className="glow glow-mint absolute -bottom-52 -right-44 h-[32rem] w-[32rem] rounded-full opacity-55"
          />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-3">
              <Eyebrow tone="grape">Flagship research · Living framework</Eyebrow>
              <Pill tone="grape">Version 1</Pill>
            </div>
            <h1 className="font-display mt-5 max-w-5xl text-4xl leading-[1.04] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              When an agent buys something, what did we actually authorise?
            </h1>
            <p className="mt-6 max-w-[74ch] text-lg leading-relaxed text-ink/75 sm:text-xl">
              {AGENTS_FEATURE.summary} The aim is to make every consequential
              decision inspectable before money moves and explainable after it
              does.
            </p>

            <dl className="mt-8 grid gap-3 sm:grid-cols-3 lg:max-w-3xl">
              <Fact value={`${PUBLISHED_CONTROLS.length}`} label="published controls" />
              <Fact value={`${FLOW_STAGES.length}`} label="purchase stages" />
              <Fact value="22 Sep 2026" label="source review" />
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <CtaLink href="#permission-test" tone="grape">
                Test a purchase
              </CtaLink>
              <CtaLink href="#controls" variant="secondary">
                Browse the controls
              </CtaLink>
            </div>
          </div>
        </header>
      </Reveal>

      <section className="mt-14 grid gap-8 lg:grid-cols-[1.05fr_1.4fr] lg:gap-14">
        <Reveal>
          <Eyebrow tone="grape">The thesis</Eyebrow>
          <h2 className="font-display mt-3 text-3xl leading-tight text-ink sm:text-4xl">
            Permission is a state, not a moment.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink/75">
            {AGENTS_FEATURE.thesis}
          </p>
        </Reveal>

        <Stagger className="grid gap-3 sm:grid-cols-3" inView>
          <ThesisCard
            number="01"
            title="The problem"
            body="A payment can fit a spending limit while the product, seller, timing, or commitment still falls outside what the person meant."
          />
          <ThesisCard
            number="02"
            title="The lens"
            body="Treat a shopping instruction as delegated authority with a lifecycle: creation, use, amendment, exhaustion, expiry, and revocation."
          />
          <ThesisCard
            number="03"
            title="The standard"
            body="Put deterministic checks outside the model and leave enough evidence for a sceptical third party to reconstruct the decision."
          />
        </Stagger>
      </section>

      <section id="permission-test" className="scroll-mt-24 pt-20">
        <Reveal className="mb-8">
          <Eyebrow tone="grape">Try the framework</Eyebrow>
          <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
            A budget check catches only one kind of wrong purchase.
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-muted">
            This example keeps the mandate fixed and changes the cart. It is a
            product prototype for the decision logic, not a claim that a live
            payment system was tested.
          </p>
        </Reveal>
        <Reveal>
          <PermissionTest />
        </Reveal>
      </section>

      <section id="architecture" className="scroll-mt-24 pt-20">
        <Reveal>
          <Eyebrow tone="grape">System design</Eyebrow>
          <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
            The agent can propose. It cannot grade its own work.
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-muted">
            The enforcement boundary sits between the agent and the payment
            credential. The policy engine compares the final cart with live
            authority using deterministic rules the model cannot rewrite.
          </p>
        </Reveal>

        <Reveal>
          <ol className="mt-8 grid gap-3 md:grid-cols-5">
            <ArchitectureStep
              number="1"
              title="Buyer"
              body="Confirms the mandate on a trusted surface."
            />
            <ArchitectureStep
              number="2"
              title="Mandate service"
              body="Stores scope, limits, expiry, use, and revocation state."
            />
            <ArchitectureStep
              number="3"
              title="Shopping agent"
              body="Explores the web and submits a proposed final cart."
              untrusted
            />
            <ArchitectureStep
              number="4"
              title="Policy engine"
              body="Checks the cart against current authority and fails closed."
              emphasis
            />
            <ArchitectureStep
              number="5"
              title="Payment + merchant"
              body="Receives the narrow credential and returns the receipt."
            />
          </ol>
        </Reveal>

        <Reveal>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <BoundaryNote label="Untrusted input" body="Pages, reviews, product text, and other agents." />
            <BoundaryNote label="Live control inputs" body="Mandate, running total, seller identity, and revocation." />
            <BoundaryNote label="Evidence out" body="Policy decision, credential scope, buyer action, and receipt." />
          </div>
        </Reveal>
      </section>

      <section className="pt-20">
        <Reveal>
          <Eyebrow tone="grape">Current landscape</Eyebrow>
          <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
            Different standards solve different layers.
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-muted">
            ACP coordinates checkout. AP2 records delegated authority. Visa,
            Mastercard, and Stripe are building agent identity and scoped
            payment controls. EMVCo is now exploring shared intent state across
            the transaction lifecycle. Together they provide useful building
            blocks; none alone proves that an ambiguous human goal was
            interpreted correctly.
          </p>
        </Reveal>

        <Stagger className="mt-8 grid gap-4 lg:grid-cols-3" inView>
          <LandscapeCard
            title="Coordinate checkout"
            names="ACP"
            body="Lets an agent and merchant exchange product, checkout, order, and credential information through a common flow."
          />
          <LandscapeCard
            title="Represent authority"
            names="AP2 · EMVCo draft"
            body="Encodes signed mandates and explores how authorised intent persists, changes, expires, and is referenced over time."
          />
          <LandscapeCard
            title="Constrain payment"
            names="Stripe · Visa · Mastercard"
            body="Binds credentials or network checks to an agent, seller, amount, currency, expiry, or transaction context."
          />
        </Stagger>
      </section>

      <section id="journey" className="scroll-mt-24 pt-20">
        <Reveal>
          <Eyebrow tone="grape">Purchase journey</Eyebrow>
          <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
            Where the controls sit
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-muted">
            A purchase passes through seven moments. Select a stage to see what
            can go wrong and which control covers it. Revocation cuts across the
            entire journey.
          </p>
        </Reveal>
        <Reveal>
          <div className="mt-8">
            <AgentFlow />
          </div>
        </Reveal>
      </section>

      <section id="controls" className="scroll-mt-24 pt-20">
        <Reveal>
          <Eyebrow tone="grape">Executive control matrix</Eyebrow>
          <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
            Six controls, with an owner and proof.
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-muted">
            Each control begins with a failure, places enforcement at a specific
            point, and names the evidence that should remain. Open any control
            for the full legal, technical, and product reasoning.
          </p>
        </Reveal>

        <Stagger className="mt-8 grid gap-4 lg:grid-cols-2" inView>
          {PUBLISHED_CONTROLS.map((control) => {
            const detail = CONTROL_DETAILS[control.slug];
            return (
              <StaggerItem key={control.slug}>
                <HoverLift className="h-full">
                  <Link
                    href={`/agents/${control.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-grape/60 sm:p-7"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <Pill tone="grape">{control.ref}</Pill>
                      <span className="text-xs text-muted">
                        Checked {control.lastChecked}
                      </span>
                    </div>
                    <h3 className="font-display mt-4 text-2xl leading-snug text-ink group-hover:text-grape">
                      {control.title}
                    </h3>
                    <p className="mt-3 font-medium leading-relaxed text-grape">
                      {control.question}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-ink/75">
                      {control.summary}
                    </p>

                    {detail ? (
                      <dl className="mt-5 grid gap-x-5 gap-y-3 border-t border-line pt-5 sm:grid-cols-2">
                        <ControlFact term="Enforce at" detail={detail.enforcement} />
                        <ControlFact term="Owner" detail={detail.owner} />
                        <ControlFact term="Evidence" detail={detail.evidence} />
                        <ControlFact term="Measure" detail={detail.measure} />
                      </dl>
                    ) : null}

                    <span className="mt-5 text-sm font-medium text-grape transition-transform group-hover:translate-x-1">
                      Read the full control →
                    </span>
                  </Link>
                </HoverLift>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      <section className="pt-20">
        <Reveal>
          <Eyebrow tone="grape">Proposed evaluation pack</Eyebrow>
          <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
            Test the awkward cases before customers do.
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-muted">
            These are design-time acceptance tests for a future implementation,
            not empirical results. A production test pack should add currency
            changes, partial fulfilment, downstream agent delegation, disputes,
            and refunds.
          </p>
        </Reveal>

        <Stagger className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" inView>
          {EVALUATION_CASES.map((item, index) => (
            <StaggerItem key={item.test}>
              <div className="h-full rounded-2xl border border-line bg-surface p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs text-muted">
                    TEST {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="rounded-full bg-grape-soft px-2.5 py-1 text-xs font-medium text-grape">
                    {item.result}
                  </span>
                </div>
                <p className="mt-4 font-medium leading-relaxed text-ink">
                  {item.test}
                </p>
                <p className="mt-3 text-sm text-muted">Invokes {item.controls}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="pt-20">
        <Reveal>
          <div className="rounded-3xl border border-grape/20 bg-grape-soft/55 p-6 sm:p-10">
            <Eyebrow tone="grape">Product recommendation</Eyebrow>
            <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
              What I would require for a first release
            </h2>
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {RECOMMENDATIONS.map((item, index) => (
                <div key={item.title} className="rounded-2xl bg-surface/80 p-5 sm:p-6">
                  <span className="font-mono text-xs text-grape">
                    GATE {index + 1}
                  </span>
                  <h3 className="font-display mt-2 text-xl text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/75">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-2xl border border-flame/25 bg-flame-soft/45 p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-flame">
                No-go conditions
              </p>
              <p className="mt-2 leading-relaxed text-ink/80">
                Do not spend when the mandate is missing or ambiguous, the live
                state cannot be reached, the final cart falls outside a recorded
                condition, the seller or payment destination cannot be verified,
                or revocation status is unknown.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="sources" className="scroll-mt-24 pt-20">
        <Reveal>
          <Eyebrow tone="grape">Sources and limits</Eyebrow>
          <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
            What this framework is built on
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-muted">
            I reviewed primary protocol and payment-network materials, then
            compared what each layer can establish. A signed instruction gives
            tamper-evident evidence of encoded authorisation; it does not prove
            that the person&apos;s underlying intent was understood.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-3 lg:grid-cols-2">
          {AGENT_SOURCES.map((source) => (
            <a
              key={source.href}
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-grape/60"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  {source.owner}
                </span>
                <span className="rounded-full bg-grape-soft px-2.5 py-1 text-xs font-medium text-grape">
                  {source.status}
                </span>
              </div>
              <h3 className="font-display mt-3 text-xl text-ink group-hover:text-grape">
                {source.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">
                {source.scope}
              </p>
              <span className="mt-3 inline-block text-sm font-medium text-grape">
                Open primary source ↗
              </span>
            </a>
          ))}
        </div>

        <Reveal>
          <div className="mt-6 grid gap-4 rounded-2xl border border-line bg-surface/60 p-5 sm:grid-cols-3 sm:p-6">
            <BoundaryNote
              label="Scope"
              body="Consumer purchases made by an AI system acting on a person's instruction."
            />
            <BoundaryNote
              label="What remains open"
              body="Semantic intent, downstream delegation, liability, dispute policy, and recourse."
            />
            <BoundaryNote
              label="Research cutoff"
              body={`Landscape sources reviewed ${AGENTS_FEATURE.checked}; detailed controls show their own check dates.`}
            />
          </div>
        </Reveal>
      </section>

      <Reveal>
        <p className="mt-14 rounded-2xl border border-line bg-surface/60 p-5 text-sm leading-relaxed text-muted">
          Written in a personal capacity from public sources. This is a proposed
          product and control framework, not legal advice, a compliance
          determination, or a judgement about any company. Protocols and
          deployments are evolving; the status labels above are accurate to the
          research cutoff shown.
        </p>
      </Reveal>
    </Container>
  );
}

function Fact({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-grape/20 bg-surface/70 px-4 py-3">
      <dt className="font-display text-xl text-ink">{value}</dt>
      <dd className="mt-0.5 text-xs uppercase tracking-[0.12em] text-muted">
        {label}
      </dd>
    </div>
  );
}

function ThesisCard({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <StaggerItem>
      <div className="h-full rounded-2xl border border-line bg-surface p-5">
        <span className="font-mono text-xs text-grape">{number}</span>
        <h3 className="font-display mt-2 text-lg text-ink">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/75">{body}</p>
      </div>
    </StaggerItem>
  );
}

function ArchitectureStep({
  number,
  title,
  body,
  emphasis = false,
  untrusted = false,
}: {
  number: string;
  title: string;
  body: string;
  emphasis?: boolean;
  untrusted?: boolean;
}) {
  return (
    <li
      className={`relative rounded-2xl border p-5 ${
        emphasis
          ? "border-grape/45 bg-grape-soft/55"
          : untrusted
            ? "border-dashed border-flame/45 bg-flame-soft/30"
            : "border-line bg-surface"
      }`}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-grape text-xs font-semibold text-white">
        {number}
      </span>
      <h3 className="font-display mt-4 text-lg text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink/75">{body}</p>
      {untrusted ? (
        <span className="mt-3 inline-block text-xs font-semibold uppercase tracking-[0.12em] text-flame">
          Reads untrusted input
        </span>
      ) : null}
      {emphasis ? (
        <span className="mt-3 inline-block text-xs font-semibold uppercase tracking-[0.12em] text-grape">
          Control boundary
        </span>
      ) : null}
    </li>
  );
}

function BoundaryNote({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        {label}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-ink/75">{body}</p>
    </div>
  );
}

function LandscapeCard({
  title,
  names,
  body,
}: {
  title: string;
  names: string;
  body: string;
}) {
  return (
    <StaggerItem>
      <div className="h-full rounded-2xl border border-line bg-surface p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-grape">
          {names}
        </p>
        <h3 className="font-display mt-3 text-xl text-ink">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/75">{body}</p>
      </div>
    </StaggerItem>
  );
}

function ControlFact({ term, detail }: { term: string; detail: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
        {term}
      </dt>
      <dd className="mt-1 text-sm leading-relaxed text-ink/80">{detail}</dd>
    </div>
  );
}
