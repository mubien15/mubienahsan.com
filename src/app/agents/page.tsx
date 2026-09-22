import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { PageIntro, Pill } from "@/components/ui";
import { Reveal, Stagger, StaggerItem, HoverLift } from "@/components/motion";
import { AgentFlow } from "@/components/agent-flow";
import { PUBLISHED_CONTROLS } from "@/content/agents";

export const metadata: Metadata = pageMetadata("/agents", {
  title: "Agents that spend",
  description:
    "Personal research into permission, evidence, and revocation for AI agents that make purchases on someone's behalf.",
});

export default function AgentsPage() {
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
        eyebrow="Agents that spend"
        title="When an agent buys something, what did we actually authorise?"
        tone="grape"
      >
        AI agents can turn an instruction into a purchase. I am interested in
        how permission survives that journey: what is recorded, what is checked,
        and what happens when someone changes their mind.
      </PageIntro>

      <div className="mt-14 space-y-6 prose-scale text-[1.05rem] leading-8 text-ink/85">
        <Reveal>
          <p>
            Payment protocols address different parts of this problem. Google&apos;s <a href="https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol" className="text-grape underline">AP2 includes Intent Mandates and Cart Mandates</a> to record authorisation. The question for these controls is how a particular implementation carries that permission through the whole task.
          </p>
        </Reveal>
        <Reveal>
          <p>
            A spending limit alone does not describe every condition a buyer cares about. Ask for a flight to Toronto and get business class at $4,200: the payment could fit a limit while the choice still falls outside the intended task. A useful review checks the actual mandate, how it was enforced, and what happened when the plan changed.
          </p>
        </Reveal>
        <Reveal>
          <p>
            Agency law offers useful questions about acting on another person&apos;s behalf: what was authorised, what could a third party reasonably rely on, and what happens after the fact? Applying those doctrines to software depends on the facts and jurisdiction. I use them here as a way to structure the questions, rather than as a settled legal answer.
          </p>
        </Reveal>
        <Reveal>
          <p>
            Each control below is written the same way: what goes wrong, what
            the law already says about it, what to build, what proves it worked,
            and an honest note on what the rules actually require — rather than a
            stretched claim that they require anything. Each one also carries the
            date its claims were last checked, because this area moves fast
            enough that some of it will go stale.
          </p>
        </Reveal>
      </div>

      <section className="mt-16">
        <Reveal>
          <h2 className="font-display text-2xl text-ink">
            Where the controls sit
          </h2>
          <p className="prose-scale-sm mt-3 leading-relaxed text-muted">
            A purchase made by an agent passes through seven moments. Five of
            them need a control, and those are the steps shown in colour. Pick a
            step to see what happens there, what can go wrong, and which control
            covers it. The sixth control does not sit on any one step, because
            the buyer can say stop at any of them.
          </p>
        </Reveal>
        <Reveal>
          <div className="mt-8">
            <AgentFlow />
          </div>
        </Reveal>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl text-ink">The controls</h2>
        <p className="prose-scale-sm mt-3 leading-relaxed text-muted">
          All six in full. The numbers run in the order the controls were
          written, which is deliberately not the order above — a purchase runs
          into them as C1, C4, C3, C5, C2, with C6 cutting across the lot. The
          steps are the sequence to build in; the numbers are just names.
        </p>
        <Stagger className="mt-6 grid gap-4" inView>
          {PUBLISHED_CONTROLS.map((control) => (
            <StaggerItem key={control.slug}>
              <HoverLift>
                <Link
                  href={`/agents/${control.slug}`}
                  className="group flex flex-col rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-grape/60"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <Pill tone="grape">{control.ref}</Pill>
                    <span className="font-display text-xl text-ink group-hover:text-grape">
                      {control.title}
                    </span>
                    <span className="ml-auto text-xs text-muted">
                      Checked {control.lastChecked}
                    </span>
                  </div>
                  <p className="mt-3 text-[0.95rem] font-medium leading-relaxed text-grape">
                    {control.question}
                  </p>
                  <p className="prose-scale-sm mt-2 leading-relaxed text-ink/80">
                    {control.summary}
                  </p>
                  <span className="mt-4 text-sm font-medium text-grape transition-transform group-hover:translate-x-1">
                    Read the control →
                  </span>
                </Link>
              </HoverLift>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal>
          <p className="mt-6 text-sm leading-relaxed text-muted">
            Two more are in progress: how you rebuild, months later, why the
            agent bought this particular thing, and who carries the loss when an
            agent goes beyond what it was allowed to do. I would rather publish
            these properly than announce a list.
          </p>
        </Reveal>
      </section>

      <Reveal>
        <p className="mt-14 rounded-2xl border border-line bg-surface/60 p-5 text-sm leading-relaxed text-muted">
          Written in a personal capacity, from public sources. It is not legal
          advice and does not create any professional relationship. Where a
          specification, a piece of research or a set of guidance is named, it is
          named so a reader can go and check it. Nothing here is a judgement
          about any company&apos;s conduct or compliance, and where a published
          specification stops short of something, that is a limit on what the
          document set out to cover rather than a failing of whoever wrote it.
        </p>
      </Reveal>
    </Container>
  );
}
