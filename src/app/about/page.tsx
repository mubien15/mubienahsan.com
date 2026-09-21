import type { Metadata } from "next";
import { Container } from "@/components/container";
import { CtaLink, Eyebrow, PageIntro } from "@/components/ui";
import { Reveal, Stagger, StaggerItem, HoverLift } from "@/components/motion";
import { SOCIAL_LINKS } from "@/lib/nav";

export const metadata: Metadata = {
  title: "About",
  description:
    "From business law in Germany to building with AI in Toronto. How I got here, why I build in public, and what you can expect from this site.",
};

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
    body: "The certifications and books worth your time, and the ones I would skip.",
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
        title="From business law in Germany to building with AI in Toronto."
        tone="gold"
      >
        I&apos;m Mubien Ahsan. I build things with AI around a full time job,
        and this site is where I write down what I learn doing it. In public, in
        the open, for free.
      </PageIntro>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_18rem]">
        <div className="space-y-6 prose-scale text-[1.05rem] leading-8 text-ink/85">
          <Reveal>
            <h2 className="font-display text-2xl text-ink">How I got here</h2>
          </Reveal>
          <Reveal>
            <p>
              I grew up in Germany and studied business law. Not the background
              most people expect from someone who builds software, but the
              interest was always there. As a teenager I built my own computer,
              piece by piece. The career just went a different way.
            </p>
          </Reveal>
          <Reveal>
            <p>
              I worked in Frankfurt am Main for seven years, then moved to
              Toronto, where I am now.
            </p>
          </Reveal>

          <Reveal>
            <p>
              Law leaves you with a particular reflex. You do not ask first
              whether something works, you ask who is answerable when it does
              not, what the rules already require, and what evidence would
              satisfy someone who is not inclined to take your word for it.
              Applied to AI, that reflex turns into governance: auditing,
              assurance, and the unglamorous question of how a claim about a
              model is actually verified. It is why I hold ISACA&apos;s
              Certified in Auditing Generative AI and Microsoft&apos;s course on
              the ethical and regulatory implications of the technology, and why
              most of what I have built seriously is for risk teams rather than
              consumers.
            </p>
          </Reveal>
          <Reveal>
            <p>
              Then I opened Claude Code for the first time. I typed a few
              sentences in plain English and watched it produce a working app out
              of thin air. Not a mockup, not a tutorial, an actual thing that
              ran. That was the moment the curiosity took over and I went
              straight down the rabbit hole. Everything on this site came out of
              it.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-display pt-4 text-2xl text-ink">The why</h2>
          </Reveal>
          <Reveal>
            <p>
              The world feels rushed, reactive, and shallow, and nothing is more
              rushed and reactive right now than AI. Everyone is sprinting.
              Almost no one is stopping to understand. My whole reason for
              building this is to bring a little of the opposite:{" "}
              <strong className="text-ink">calm, clarity, and depth</strong> to
              the most breathless topic there is.
            </p>
          </Reveal>
          <Reveal>
            <p>
              If someone with a business law degree can ship a communication
              coach, a governance agent and small tools people actually use, on
              nights and weekends, then the barrier is far lower than it looks
              from the outside. That is the part I want to show rather than just
              talk about.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-display pt-4 text-2xl text-ink">
              Why in public, and why free
            </h2>
          </Reveal>
          <Reveal>
            <p>
              Every product idea I had kept failing the same test:{" "}
              <em>could someone get this by asking a chatbot for five minutes?</em>{" "}
              A platform built around me actually doing the work, learning,
              building, shipping, and writing it all down, cannot be replaced by
              a prompt. So that is what this is. My essay{" "}
              <a
                href="/essays/the-verification-gap.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent underline decoration-accent/30 hover:decoration-accent"
              >
                The Verification Gap
              </a>{" "}
              is the clearest example of where those two worlds meet.
            </p>
          </Reveal>
          <Reveal>
            <p>
              Everything here is free. Full stop. Not as a marketing
              funnel, but because charging before there is trust and a real
              community would undercut the whole point.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-display pt-4 text-2xl text-ink">
              Outside of work
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
              If something here was useful, or you are building something and
              want a second pair of eyes on it, I would genuinely like to hear
              about it. Questions about a course, an idea you are stuck on, or
              just what you are working on are all welcome.
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
                  <li>🧭 Building around a full time job</li>
                  <li>🛠️ Shipping on nights and weekends</li>
                  <li>🎓 Certified in auditing &amp; governing GenAI</li>
                  <li>🌊 Chasing depth over speed</li>
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
