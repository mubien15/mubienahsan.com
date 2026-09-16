import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { PageIntro, Pill } from "@/components/ui";
import { Reveal, Stagger, StaggerItem, HoverLift } from "@/components/motion";
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
        AI agents are starting to transact for people, and the payment plumbing
        already exists. What does not exist is a durable record of the authority
        they were sent out with. This is a working set of controls for that gap.
      </PageIntro>

      <div className="mt-14 max-w-2xl space-y-6 text-[1.05rem] leading-8 text-ink/85">
        <Reveal>
          <p>
            The Agentic Commerce Protocol, built by OpenAI and Stripe and opened
            up in 2025, defines how an agent completes a purchase: cart and
            checkout state, and a delegated payment credential constrained to a
            single use, a maximum amount and an expiry. It works, and Stripe
            sells a suite on top of it.
          </p>
        </Reveal>
        <Reveal>
          <p>
            What it records is the checkout the buyer is about to complete. What
            it does not define is{" "}
            <strong className="text-ink">
              a durable mandate for what the agent was authorised to go and buy
              in the first place
            </strong>{" "}
            — permitted categories, substitution rules, merchant limits,
            recurring authority, a ceiling independent of any one basket. Ask for
            a flight to Toronto and get business class at $4,200, and the stack
            can tell you the payment was constrained. It cannot tell you the
            purchase was authorised.
          </p>
        </Reveal>
        <Reveal>
          <p>
            The problem is not new. Agency law has spent centuries answering the
            analogous questions: what authority a principal conferred, when a
            third party may rely on apparent authority, and when an unauthorised
            act is later ratified. Whether an AI system is itself the legal agent
            is unsettled — but the vocabulary is sitting there unused while the
            industry works it out from first principles in public.
          </p>
        </Reveal>
        <Reveal>
          <p>
            Each control below is written the same way: the failure, the
            principle that already governs it, what to build, what evidence
            proves it ran, and an honest note on where regulation actually
            touches — rather than a stretched claim that it does.
          </p>
        </Reveal>
      </div>

      <section className="mt-14">
        <h2 className="font-display text-2xl text-ink">The controls</h2>
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
                      {control.published}
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
            More are in progress — scope enforcement at commit, the untrusted
            content boundary, and what the buyer must see before an agent
            commits. I would rather publish one properly than announce eight.
          </p>
        </Reveal>
      </section>

      <Reveal>
        <p className="mt-14 max-w-2xl rounded-2xl border border-line bg-surface/60 p-5 text-sm leading-relaxed text-muted">
          Written in a personal capacity, from public sources. It is not legal
          advice and does not create any professional relationship. I hold no
          position on any named company&apos;s compliance.
        </p>
      </Reveal>
    </Container>
  );
}
