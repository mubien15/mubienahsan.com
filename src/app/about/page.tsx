import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { CtaLink, Eyebrow, Pill, type Tone } from "@/components/ui";
import { Reveal, Stagger, StaggerItem, HoverLift } from "@/components/motion";
import { PhotoBlob } from "@/components/photo-blob";
import { SOCIAL_LINKS } from "@/lib/nav";

export const metadata: Metadata = pageMetadata("/about", {
  title: "About Mubien",
  description:
    "How Mubien builds with AI, studies its behaviour, and develops practical ways to think about product decisions, governance, risk, and human control.",
});

const STRENGTHS: {
  number: string;
  title: string;
  body: string;
  proof: string;
  href: string;
}[] = [
  {
    number: "01",
    title: "Frame the real decision",
    body: "Turn a broad AI question into a clear problem, a set of tradeoffs, and a decision someone can actually make.",
    proof: "See the Oversight Threshold",
    href: "/research/autonomy-governance",
  },
  {
    number: "02",
    title: "Build enough to learn",
    body: "Move from an idea to a working prototype, then use the result to find the product questions that a concept alone cannot reveal.",
    proof: "Review the case studies",
    href: "/projects",
  },
  {
    number: "03",
    title: "Make controls inspectable",
    body: "Name where a control sits, who owns it, what it should prevent, and which evidence would show that it worked.",
    proof: "Open Agents that Spend",
    href: "/agents#controls",
  },
  {
    number: "04",
    title: "Explain without flattening",
    body: "Make a difficult idea understandable while preserving the uncertainty, limits, and source trail that give it meaning.",
    proof: "Explore the research",
    href: "/research",
  },
];

const PROOF: {
  title: string;
  kind: string;
  question: string;
  demonstrates: string;
  href: string;
  tone: Tone;
}[] = [
  {
    title: "Agents that spend",
    kind: "Flagship research",
    question:
      "How should permission, evidence, and revocation work when an AI agent can buy something?",
    demonstrates:
      "AI strategy, control design, payment research, adversarial thinking, and executive communication.",
    href: "/agents",
    tone: "grape",
  },
  {
    title: "AI Governance Assessment Agent",
    kind: "Product case study",
    question:
      "Can AI make a document-heavy governance review easier to begin without presenting a draft as a determination?",
    demonstrates:
      "Product framing, governance workflows, evidence discipline, interface decisions, and honest limits.",
    href: "/projects/ai-governance-agent",
    tone: "mint",
  },
  {
    title: "Fable",
    kind: "Product case study",
    question:
      "Can a structured AI simulation help someone prepare for a difficult conversation?",
    demonstrates:
      "AI product design, prompt architecture, user experience, feedback design, and evaluation questions.",
    href: "/projects/fable",
    tone: "flame",
  },
];

const CURRENT_QUESTIONS = [
  {
    label: "Agentic systems",
    title: "What changes when AI can act and spend?",
    body: "I am exploring how authority should be recorded, constrained, checked, and withdrawn across a task.",
    href: "/agents",
  },
  {
    label: "Learning and alignment",
    title: "When does improvement become recursive?",
    body: "I am working through the difference between context, memory, training, self-improvement, and the alignment problem around systems that can change themselves.",
    href: "/research/learning-and-self-improvement",
  },
  {
    label: "Meaningful oversight",
    title: "When does human review stop being a real control?",
    body: "I am interested in the point where speed, complexity, or autonomy makes approval possible while verification quietly becomes impossible.",
    href: "/research/autonomy-governance",
  },
];

export default function AboutPage() {
  return (
    <Container className="py-12 sm:py-16 lg:py-20">
      <Reveal>
        <header className="relative overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
          <div
            aria-hidden
            className="glow glow-gold absolute -right-56 -top-64 h-[34rem] w-[34rem] rounded-full opacity-60"
          />
          <div className="relative grid items-center gap-10 md:grid-cols-[auto_1fr] lg:grid-cols-[minmax(15rem,0.7fr)_minmax(0,1.5fr)] lg:gap-16">
            <PhotoBlob src="/me-v9.webp" />
            <div>
              <Eyebrow tone="gold">About · Mubien</Eyebrow>
              <h1 className="font-display mt-4 max-w-4xl text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
                I build with AI, study how it behaves, and question what it
                should be trusted to do.
              </h1>
              <p className="mt-6 max-w-[68ch] text-lg leading-relaxed text-muted">
                I&apos;m based in Toronto. I use AI every day to turn ideas into
                working tools, examine the decisions behind those tools, and
                develop practical ways to think about governance, risk, and
                human control. Everything here is personal and independent.
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                <Pill tone="gold">Building useful tools</Pill>
                <Pill tone="grape">AI governance and strategy</Pill>
                <Pill tone="mint">Research and clear explanation</Pill>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <CtaLink href="/projects" tone="gold">
                  Review the work
                </CtaLink>
                <CtaLink href="/agents#permission-test" variant="secondary">
                  Try the flagship framework
                </CtaLink>
              </div>
            </div>
          </div>
        </header>
      </Reveal>

      <section className="mt-16 grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
        <Reveal>
          <Eyebrow tone="gold">How I got here</Eyebrow>
          <h2 className="font-display mt-3 text-3xl leading-tight text-ink sm:text-4xl">
            Curiosity first. Structure close behind.
          </h2>
          <div className="mt-6 rounded-2xl border border-gold/25 bg-gold-soft/45 p-5">
            <p className="font-display text-xl leading-snug text-ink">
              I like questions that are technical enough to require careful
              investigation and practical enough to end in a decision.
            </p>
          </div>
        </Reveal>

        <div className="space-y-5 text-[1.05rem] leading-8 text-ink/85 lg:text-lg">
          <Reveal>
            <p>
              I grew up in Germany and was the teenager who built his own
              computer piece by piece. I wanted to know what sat underneath the
              interface, how the parts fit together, and what changed when one
              part was replaced. That instinct still shapes how I approach
              technology.
            </p>
          </Reveal>
          <Reveal>
            <p>
              I later studied business law and spent seven years in Frankfurt
              before moving to Toronto. Law trained me to ask a different set of
              questions: who made the decision, what authority supported it,
              what evidence remains, and who can challenge the result?
            </p>
          </Reveal>
          <Reveal>
            <p>
              Generative AI brought those interests together. It gave me a way
              to turn more ideas into working products, while raising harder
              questions about behaviour, reliability, responsibility, and
              control. A morning briefing, a communication coach, and a
              governance assessment tool all started as useful personal
              problems. Building them became a way to investigate the systems
              themselves.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pt-20">
        <Reveal>
          <Eyebrow tone="grape">How I work</Eyebrow>
          <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
            The contribution I try to make
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-muted">
            I am most useful when a question sits between product ambition,
            technical possibility, and responsible execution.
          </p>
        </Reveal>

        <Stagger className="mt-8 grid gap-4 lg:grid-cols-2" inView>
          {STRENGTHS.map((item) => (
            <StaggerItem key={item.number}>
              <HoverLift className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 sm:p-7">
                  <span className="font-mono text-xs text-grape">
                    {item.number}
                  </span>
                  <h3 className="font-display mt-3 text-2xl text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 leading-relaxed text-ink/75">
                    {item.body}
                  </p>
                  <Link
                    href={item.href}
                    className="mt-5 text-sm font-medium text-grape hover:underline"
                  >
                    {item.proof} →
                  </Link>
                </div>
              </HoverLift>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="pt-20">
        <Reveal>
          <Eyebrow tone="flame">Work that shows it</Eyebrow>
          <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
            Three ways into my thinking
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-muted">
            These pieces show how I move between research, product decisions,
            control design, and working software.
          </p>
        </Reveal>

        <Stagger className="mt-8 grid gap-4 lg:grid-cols-3" inView>
          {PROOF.map((item) => (
            <StaggerItem key={item.title}>
              <HoverLift className="h-full">
                <Link
                  href={item.href}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-grape/55"
                >
                  <div className="self-start">
                    <Pill tone={item.tone}>{item.kind}</Pill>
                  </div>
                  <h3 className="font-display mt-4 text-2xl leading-snug text-ink group-hover:text-grape">
                    {item.title}
                  </h3>
                  <p className="mt-3 font-medium leading-relaxed text-grape">
                    {item.question}
                  </p>
                  <div className="mt-5 border-t border-line pt-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                      What it demonstrates
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink/75">
                      {item.demonstrates}
                    </p>
                  </div>
                  <span className="mt-5 text-sm font-medium text-grape transition-transform group-hover:translate-x-1">
                    Open the work →
                  </span>
                </Link>
              </HoverLift>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="pt-20">
        <Reveal>
          <Eyebrow tone="mint">Current questions</Eyebrow>
          <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
            The rabbit holes I am in now
          </h2>
        </Reveal>

        <div className="mt-8 divide-y divide-line overflow-hidden rounded-3xl border border-line bg-surface">
          {CURRENT_QUESTIONS.map((item, index) => (
            <Reveal key={item.title}>
              <Link
                href={item.href}
                className="group grid gap-3 p-6 transition-colors hover:bg-mint-soft/25 sm:p-8 lg:grid-cols-[3rem_0.75fr_1.25fr_auto] lg:items-start lg:gap-6"
              >
                <span className="font-mono text-xs text-mint">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                    {item.label}
                  </p>
                  <h3 className="font-display mt-2 text-xl leading-snug text-ink group-hover:text-mint">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-ink/75">
                  {item.body}
                </p>
                <span className="text-sm font-medium text-mint">Explore →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="pt-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-grape-soft p-7 sm:p-10 lg:p-12">
            <div
              aria-hidden
              className="glow glow-mint absolute -bottom-52 -right-40 h-[30rem] w-[30rem] rounded-full opacity-45"
            />
            <div className="relative grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
              <div>
                <Eyebrow tone="grape">Why this site exists</Eyebrow>
                <h2 className="font-display mt-3 text-3xl leading-tight text-ink sm:text-4xl">
                  Calm, clarity, and depth in a noisy field
                </h2>
              </div>
              <div className="space-y-5 text-lg leading-relaxed text-ink/75">
                <p>
                  AI can make everything feel urgent: another model, another
                  breakthrough, another claim that changes everything. I made
                  this space to slow the conversation down enough to understand
                  an idea properly and leave with a useful next step.
                </p>
                <p>
                  Publishing is part of how I learn. A build is stronger when I
                  have to explain the product decisions behind it. A framework
                  is stronger when the sources, assumptions, limits, and open
                  questions remain visible. The goal is not to sound certain. It
                  is to make the reasoning clear enough that someone else can
                  inspect it, challenge it, and improve it.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="grid gap-4 pt-20 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <div className="h-full rounded-3xl border border-line bg-surface p-7 sm:p-8">
            <Eyebrow tone="gold">Away from the screen</Eyebrow>
            <h2 className="font-display mt-3 text-2xl text-ink">
              Travel changes the frame
            </h2>
            <p className="mt-4 leading-relaxed text-ink/75">
              I travel whenever I can. New York, Moscow, Cairo, and London stayed
              with me less for the landmarks than for the people and the
              different assumptions each city makes about how life should work.
              Seeing those assumptions up close is a useful reminder that the
              defaults around us are choices, even when they feel inevitable.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="h-full rounded-3xl border border-grape/25 bg-grape-soft/45 p-7 sm:p-8">
            <Eyebrow tone="grape">Start a conversation</Eyebrow>
            <h2 className="font-display mt-3 text-3xl text-ink">
              Difficult AI questions are usually the interesting ones.
            </h2>
            <p className="mt-4 leading-relaxed text-ink/75">
              I am especially interested in thoughtful work where AI, product
              decisions, governance, and risk meet. If that overlaps with what
              you are building, if something here raised a useful disagreement,
              or if you see a better way to test one of these ideas, I would
              like to hear from you.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="mailto:mubien.ahsan@gmail.com"
                className="inline-flex items-center justify-center rounded-full bg-grape px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:brightness-95"
              >
                Email me
              </a>
              <CtaLink
                href={SOCIAL_LINKS.linkedin}
                external
                variant="secondary"
              >
                Connect on LinkedIn
              </CtaLink>
            </div>
          </div>
        </Reveal>
      </section>
    </Container>
  );
}
