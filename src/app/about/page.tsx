import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { Container } from "@/components/container";
import { CtaLink, Eyebrow, PageIntro } from "@/components/ui";
import { Reveal, Stagger, StaggerItem, HoverLift } from "@/components/motion";
import { SOCIAL_LINKS } from "@/lib/nav";

export const metadata: Metadata = pageMetadata("/about", {
  title: "About",
  description:
    "Meet Mubien: curious about AI, building useful tools, and sharing a calmer way to understand a fast-moving field.",
});

const EXPECT = [
  {
    title: "Courses that assume nothing",
    body: "Beginner first, jargon last. If a step looks scary, I name it and walk through it slowly.",
    tone: "mint" as const,
  },
  {
    title: "Honest build write ups",
    body: "What I made, why, and what broke along the way. The messy parts are the useful parts.",
    tone: "flame" as const,
  },
  {
    title: "Only what earned its place",
    body: "Thoughtful reading, clear sources, and room to change my mind.",
    tone: "grape" as const,
  },
];

const DOT: Record<string, string> = {
  mint: "bg-mint",
  flame: "bg-flame",
  grape: "bg-grape",
};

export default function AboutPage() {
  return (
    <Container className="py-16 sm:py-20">
      <PageIntro
        eyebrow="About"
        title="Hey, I’m Mubien."
        tone="gold"
      >
        I&apos;m based in Toronto, curious about how things work, and happiest
        when an idea becomes something useful. AI has become part of my everyday
        life. This is my personal corner of it.
      </PageIntro>

      <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
        <div className="space-y-6 prose-scale text-[1.05rem] leading-8 text-ink/85">
          <Reveal>
            <h2 className="font-display text-2xl text-ink">How I got here</h2>
          </Reveal>
          <Reveal>
            <p>
              I grew up in Germany and studied business law. My interest in technology started much earlier: as a teenager, I built my own computer, piece by piece. I still like taking things apart, understanding the pieces, and seeing what I can make with them.
            </p>
          </Reveal>
          <Reveal>
            <p>
              I spent seven years in Frankfurt am Main before moving to Toronto, where I am now.
            </p>
          </Reveal>

          <Reveal>
            <p>
              My background in law left me curious about responsibility and evidence: who makes a decision, what supports it, and who can challenge it. Those questions travel with me as I explore AI, alongside a much simpler one: can I make something that is useful in everyday life?
            </p>
          </Reveal>
          <Reveal>
            <p>
              AI made it possible to turn more of those ideas into working tools. A daily briefing helps me start the morning informed. Fable lets people practise difficult conversations. My governance agent explores how to turn an open question into a structured assessment. Building them gives me a reason to look beneath the interface: at prompts, context, model behaviour, and the checks around an answer.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-display pt-4 text-2xl text-ink">The why</h2>
          </Reveal>
          <Reveal>
            <p>
              AI can make everything feel urgent: another model, another breakthrough, another thing to keep up with. I made this space to bring <strong className="text-ink">calm, clarity, and depth</strong> to that noise. Somewhere to slow down, understand an idea properly, and leave with a useful next step.
            </p>
          </Reveal>
          <Reveal>
            <p>
              The questions matter as much as the builds. I am especially interested in how AI learns, what recursive self-improvement would involve, and how we could check a system that changes over time. I want to be precise about what is demonstrated, what is a useful hypothesis, and what remains unknown.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-display pt-4 text-2xl text-ink">
              Why in public, and why free
            </h2>
          </Reveal>
          <Reveal>
            <p>
              Writing things down forces me to make sense of them. Sharing a build means explaining the choices, the limitations, and what I would do differently. The courses turn those lessons into steps someone else can follow. The research is where I work through the harder questions about capability, governance, and trust.
            </p>
          </Reveal>
          <Reveal>
            <p>
              The courses and writing here are free. I want curiosity to have an easy starting point, and I hope what I share helps you build your own understanding.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-display pt-4 text-2xl text-ink">
              Away from the screen
            </h2>
          </Reveal>
          <Reveal>
            <p>
              I travel whenever I can. The trips that stayed with me were New
              York, Moscow, Cairo and London, less for the sights than for the
              people I met along the way. Different cities run on very different
              assumptions about how things work, and seeing that up close changes
              how you think.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-display pt-4 text-2xl text-ink">
              What you can expect
            </h2>
          </Reveal>
          <Stagger className="grid gap-4 sm:grid-cols-3" inView>
            {EXPECT.map((item) => (
              <StaggerItem key={item.title}>
                <HoverLift className="h-full">
                  <div className="h-full rounded-2xl border border-line bg-surface p-5">
                    <span
                      className={`inline-block h-2.5 w-2.5 rounded-full ${DOT[item.tone]}`}
                    />
                    <h3 className="font-display mt-3 text-lg text-ink">
                      {item.title}
                    </h3>
                    <p className="prose-scale-sm mt-2 leading-relaxed text-ink/85">
                      {item.body}
                    </p>
                  </div>
                </HoverLift>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal>
            <h2 className="font-display pt-4 text-2xl text-ink">Get in touch</h2>
          </Reveal>
          <Reveal>
            <p>
              If something here helped, raised a question, or gave you an idea for something to build, I would like to hear about it. I welcome thoughtful disagreement too; it is one of the ways this space gets better.
            </p>
          </Reveal>
          <Reveal>
            <div className="rounded-2xl border border-line bg-surface p-6">
              <p className="text-sm font-medium uppercase tracking-wider text-muted">
                Email
              </p>
              <a
                href="mailto:mubien.ahsan@gmail.com"
                className="font-display mt-1 inline-block text-xl text-accent underline decoration-accent/30 hover:decoration-accent"
              >
                mubien.ahsan@gmail.com
              </a>
              <p className="mt-3 text-[0.98rem] leading-7 text-ink/70">
                I read everything that comes in and reply to what I can. If you
                would rather keep it short,{" "}
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-accent underline decoration-accent/30 hover:decoration-accent"
                >
                  LinkedIn
                </a>{" "}
                works just as well.
              </p>
            </div>
          </Reveal>
        </div>

        <aside className="lg:pt-2">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-line bg-surface">
              <div className="h-1.5 w-full bg-gradient-to-r from-gold via-flame to-grape" />
              <div className="p-6">
                <Eyebrow tone="gold">The short version</Eyebrow>
                <ul className="mt-4 space-y-3 text-sm text-ink/85">
                  <li>📍 Toronto, by way of Frankfurt</li>
                  <li>🛠️ Using AI daily and building with it</li>
                  <li>🔎 Curious about how it works</li>
                  <li>🧭 Exploring governance and limits</li>
                  <li>🌊 Making room for calm and depth</li>
                </ul>
                <div className="mt-6 flex flex-col gap-2">
                  <CtaLink href={SOCIAL_LINKS.linkedin} external tone="gold">
                    Connect on LinkedIn
                  </CtaLink>
                  <CtaLink href={SOCIAL_LINKS.instagram} external variant="secondary">
                    Follow on Instagram
                  </CtaLink>
                  <CtaLink href="/projects" variant="secondary">
                    See the work
                  </CtaLink>
                </div>
              </div>
            </div>
          </Reveal>
        </aside>
      </div>
    </Container>
  );
}
