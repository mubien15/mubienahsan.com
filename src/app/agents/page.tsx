import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { PageIntro, Pill } from "@/components/ui";
import { Reveal, Stagger, StaggerItem, HoverLift } from "@/components/motion";
import { AgentFlow } from "@/components/agent-flow";
import { PUBLISHED_CONTROLS } from "@/content/agents";

export const metadata: Metadata = {
  title: "Agents that spend",
  description:
    "Controls for AI agents that transact on someone's behalf. The protocols constrain the checkout; nothing captures the durable authority the agent was sent out with. Agency law offers the vocabulary the industry is working without.",
};

export default function AgentsPage() {
  return (
    <Container className="py-16 sm:py-20">
      <PageIntro
        eyebrow="Agents that spend"
        title="The protocols settled how an agent pays. Not what it was allowed to buy."
        tone="grape"
      >
        AI agents are starting to buy things for people, and the payment
        plumbing already works. What is missing is any lasting record of what
        they were allowed to buy. These are controls for that gap.
      </PageIntro>

      <div className="mt-14 max-w-2xl space-y-6 text-[1.05rem] leading-8 text-ink/85">
        <Reveal>
          <p>
            The Agentic Commerce Protocol, published in 2025, sets out how an
            agent finishes a purchase: the cart, the checkout, and a card
            credential limited to one use, a maximum amount and an expiry. It
            works, and commercial tooling now sits on top of it.
          </p>
        </Reveal>
        <Reveal>
          <p>
            What that records is the checkout a buyer is about to approve. What
            it does not record is{" "}
            <strong className="text-ink">
              the standing permission the agent was sent out with
            </strong>{" "}
            — what it may buy, from whom, for how long, and what to do when the
            thing is out of stock. Ask for a flight to Toronto and get business
            class at $4,200, and the system can tell you the payment was within
            its limit. It cannot tell you the purchase was agreed to. The card
            networks are now building that missing layer, which is the strongest
            sign the gap is real.
          </p>
        </Reveal>
        <Reveal>
          <p>
            None of this is new. When one person acts for another, the law calls
            them an agent, and it has spent centuries on the same three
            questions: what were they allowed to do, when can the other side
            rely on it, and what happens if you find out later and say nothing.
            Whether an AI counts as the agent in that legal sense is unsettled,
            but the questions are sitting there unused, while the industry works
            it out from scratch in public.
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
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">
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
        <p className="mt-3 max-w-2xl leading-relaxed text-muted">
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
                  <p className="mt-2 leading-relaxed text-ink/80">
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
        <p className="mt-14 max-w-2xl rounded-2xl border border-line bg-surface/60 p-5 text-sm leading-relaxed text-muted">
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
