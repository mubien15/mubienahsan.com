import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { PageIntro, Pill } from "@/components/ui";
import { Reveal, Stagger, StaggerItem, HoverLift } from "@/components/motion";
import { PUBLISHED_CONTROLS } from "@/content/agents";

export const metadata: Metadata = {
  title: "Agents that spend",
  description:
    "Controls for AI agents that transact on someone's behalf. The payment layer is solved; the mandate layer is empty. Agency law already answers more of this than the industry realises.",
};

export default function AgentsPage() {
  return (
    <Container className="py-16 sm:py-20">
      <PageIntro
        eyebrow="Agents that spend"
        title="The protocols settled how an agent pays. Not what it was allowed to buy."
        tone="grape"
      >
        AI agents are starting to transact for people — and the plumbing already
        exists. What does not exist is any record of what the buyer actually
        authorised. This is a working set of controls for that gap.
      </PageIntro>

      <div className="mt-14 max-w-2xl space-y-6 text-[1.05rem] leading-8 text-ink/85">
        <Reveal>
          <p>
            The Agentic Commerce Protocol, built by OpenAI and Stripe and opened
            up in 2025, defines how an agent completes a purchase: cart,
            checkout, a narrowly scoped payment token, delegated authentication.
            It works. Stripe sells a suite on top of it.
          </p>
        </Reveal>
        <Reveal>
          <p>
            None of it captures the mandate — what the person agreed the agent
            could buy. Ask for a flight to Toronto and get business class at
            $4,200, and nothing in the stack can say whether that was authorised.
            The prompt is not a record. The token scope is about the rail, not
            the purchase.
          </p>
        </Reveal>
        <Reveal>
          <p>
            That is not a new class of problem. An agent transacting for a person
            is, in law, an agent acting for a principal, and{" "}
            <strong className="text-ink">
              agency doctrine has answered these questions for centuries
            </strong>
            : what authority was actually conferred, when a merchant may rely on
            the authority an agent appeared to hold, and what a principal&apos;s
            silence afterwards amounts to. The industry is rediscovering it from
            first principles, in public, badly.
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
