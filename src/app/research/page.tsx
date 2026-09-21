import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { PageIntro, Pill } from "@/components/ui";
import { Reveal, Stagger, StaggerItem, HoverLift } from "@/components/motion";
import { RESEARCH } from "@/content/research";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Original work on AI assurance and on agents that transact: a control framework for agentic commerce grounded in agency law, and an essay on whether independent AI auditing can become a real discipline.",
};

export default function ResearchPage() {
  return (
    <Container className="py-16 sm:py-20">
      <PageIntro
        eyebrow="Research"
        title="Arguments I am willing to defend."
        tone="grape"
      >
        Two pieces of original work, and they are about the same underlying
        problem from opposite ends.
      </PageIntro>

      <div className="mt-12 max-w-2xl space-y-6 text-[1.05rem] leading-8 text-ink/85">
        <Reveal>
          <p>
            As these systems get more capable, the scarce skill stops being the
            ability to produce work and becomes the ability to check it. One of
            these asks who is qualified to do that checking and what counts as
            evidence when they do. The other takes a single hard case — an agent
            spending someone else&apos;s money — and works out what you would
            have to record for anyone to be able to check it at all.
          </p>
        </Reveal>
        <Reveal>
          <p>
            Both are written from public sources, in a personal capacity, and
            both take positions rather than surveying the field. The control
            framework carries the date its claims were last checked, because
            that area moves fast enough that some of it will go stale.
          </p>
        </Reveal>
      </div>

      <Stagger className="mt-14 grid gap-5" inView>
        {RESEARCH.map((item) => {
          const inner = (
            <>
              <div className="flex flex-wrap items-center gap-3">
                <Pill tone={item.tone}>{item.kind}</Pill>
                <span className="font-display text-2xl text-ink group-hover:text-grape">
                  {item.title}
                </span>
                <span className="ml-auto text-xs text-muted">{item.meta}</span>
              </div>
              <p className="mt-3 max-w-prose text-[0.98rem] font-medium leading-relaxed text-grape">
                {item.question}
              </p>
              <p className="mt-3 max-w-prose leading-relaxed text-ink/80">{item.summary}</p>
              <span className="mt-5 text-sm font-medium text-grape transition-transform group-hover:translate-x-1">
                {item.cta} →
              </span>
            </>
          );

          const className =
            "group flex flex-col rounded-2xl border border-line bg-surface p-7 transition-colors hover:border-grape/60";

          return (
            <StaggerItem key={item.href}>
              <HoverLift>
                {item.external ? (
                  <a href={item.href} className={className}>
                    {inner}
                  </a>
                ) : (
                  <Link href={item.href} className={className}>
                    {inner}
                  </Link>
                )}
              </HoverLift>
            </StaggerItem>
          );
        })}
      </Stagger>

      <Reveal>
        <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted">
          Things I have built are under{" "}
          <Link href="/projects" className="text-grape hover:underline">
            Projects
          </Link>
          , and things worth reading by other people are in the{" "}
          <Link href="/library" className="text-grape hover:underline">
            Library
          </Link>
          .
        </p>
      </Reveal>
    </Container>
  );
}
