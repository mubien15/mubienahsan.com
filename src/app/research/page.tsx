import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { PageIntro, Pill } from "@/components/ui";
import { Reveal, Stagger, StaggerItem, HoverLift } from "@/components/motion";
import { RESEARCH } from "@/content/research";

export const metadata: Metadata = pageMetadata("/research", {
  title: "Research",
  description:
    "Personal research and explainers on how AI learns, recursive self-improvement, human oversight, and the evidence behind trust.",
});

export default function ResearchPage() {
  return (
    <Container className="py-16 sm:py-20">
      <PageIntro
        eyebrow="Research"
        title="Questions I keep coming back to."
        tone="grape"
      >
        How do these systems learn? What changes when they act on our behalf?
        And how do we know when our checks are good enough? This is where I
        explore those questions in more depth.
      </PageIntro>

      <div className="mt-12 space-y-6 prose-scale text-[1.05rem] leading-8 text-ink/85">
        <Reveal>
          <p>
            Building gives me practical questions. Reading helps me put them in context. These pieces bring the two together: explainers to untangle the technology, and frameworks to think through its governance and limitations.
          </p>
        </Reveal>
        <Reveal>
          <p>
            This is independent, personal work based on public sources. The frameworks are proposals for discussion, with assumptions and limits to examine. I want the reasoning to be clear enough that you can follow it, challenge it, and decide what is useful.
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
              <p className="mt-3 text-[0.98rem] font-medium leading-relaxed text-grape">
                {item.question}
              </p>
              <p className="prose-scale-sm mt-3 leading-relaxed text-ink/80">{item.summary}</p>
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
        <p className="mt-10 text-sm leading-relaxed text-muted">
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
