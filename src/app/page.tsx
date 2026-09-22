import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Container } from "@/components/container";
import { CtaLink, Eyebrow, Pill, type Tone } from "@/components/ui";
import { Reveal, Stagger, StaggerItem, HoverLift } from "@/components/motion";
import { BrowserFrame } from "@/components/browser-frame";
import { PhoneShowcase } from "@/components/phone-frame";
import { PhotoBlob } from "@/components/photo-blob";
import { Squiggle } from "@/components/doodle";
import { SubscribeForm } from "@/components/subscribe-form";
import { cn } from "@/lib/cn";
import { COURSES } from "@/content/courses";
import { QUESTIONS } from "@/content/quiz";
import { PROJECTS } from "@/content/projects";

export const metadata = pageMetadata("/", {
  title: { absolute: "Mubien · A calmer way to explore AI" },
});

const PATHS: {
  emoji: string;
  title: string;
  body: string;
  href: string;
  tone: Tone;
}[] = [
  {
    emoji: "🧑‍💻",
    title: "Learn to build with AI",
    body: "Four free courses that take you from absolute zero to a live app. No coding background needed.",
    href: "/courses",
    tone: "mint",
  },
  {
    emoji: "🛠️",
    title: "See what I've built",
    body: "Useful tools, personal experiments, and the lessons from building them with AI.",
    href: "/projects",
    tone: "flame",
  },
  {
    emoji: "📚",
    title: "Find what's worth learning",
    body: "The courses, books, and essays helping me make sense of AI.",
    href: "/library",
    tone: "grape",
  },
  {
    emoji: "👋",
    title: "Get to know me",
    body: "A little about me, what makes me curious, and why this space exists.",
    href: "/about",
    tone: "gold",
  },
];

const TONE_BAR: Record<Tone, string> = {
  accent: "before:bg-accent",
  mint: "before:bg-mint",
  flame: "before:bg-flame",
  grape: "before:bg-grape",
  gold: "before:bg-gold",
};
const TONE_SOFT_BG: Record<Tone, string> = {
  accent: "bg-accent-soft",
  mint: "bg-mint-soft",
  flame: "bg-flame-soft",
  grape: "bg-grape-soft",
  gold: "bg-gold-soft",
};
const TONE_TXT: Record<Tone, string> = {
  accent: "text-accent",
  mint: "text-mint",
  flame: "text-flame",
  grape: "text-grape",
  gold: "text-gold",
};

export default function Home() {
  // Only courses that are actually readable, so a ladder step never links to a
  // page that does not exist yet. Capped at four so the row stays scannable;
  // the band already tells people more are coming.
  const ladder = COURSES.filter((c) => c.status === "Available").slice(0, 4);
  const ladderCols =
    ladder.length >= 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3";
  const featuredProjects = PROJECTS.slice(0, 2);

  return (
    <>
      {/* Hero — friendly greeting */}
      <Container className="pt-12 sm:pt-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-12 sm:px-12 sm:py-16">
            {/* Soft doodle blobs. Desktop only: they are a fixed 256px, so on a
                narrow phone card they cover most of the corner and read as a
                hard edged shape behind the photo rather than ambient warmth. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-0 hidden md:block"
            >
              <div className="glow glow-gold absolute -right-64 -top-64 h-[34rem] w-[34rem] rounded-full opacity-70" />
              <div className="glow glow-mint absolute -bottom-52 left-[15%] h-[30rem] w-[30rem] rounded-full opacity-60" />
            </div>

            <div className="relative grid items-center gap-10 md:grid-cols-[auto_1fr] lg:grid-cols-[minmax(15rem,0.8fr)_minmax(0,1.5fr)] lg:gap-16">
              <PhotoBlob src="/me-v9.webp" />

              <div>
                <h1 className="font-display text-4xl leading-tight text-ink sm:text-5xl">
                  Hey, I&apos;m{" "}
                  <span className="relative inline-block">
                    <span className="text-accent">Mubien</span>
                    <Squiggle className="text-accent/50" />
                  </span>{" "}
                  <span className="inline-block">👋</span>
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted lg:max-w-[65ch]">
                  I use AI every day, build useful tools with it, and explore
                  how it works and where it reaches its limits. This is where
                  I share the projects, questions, and lessons along the way.
                </p>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted lg:max-w-[65ch]">
                  Right now, I&apos;m deep down a research rabbit hole: how
                  neural networks are &ldquo;grown&rdquo; through training, why
                  their behaviour isn&apos;t coded rule by rule, and what the
                  alignment problem and{" "}
                  <Link
                    href="/research/learning-and-self-improvement"
                    className="text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
                  >
                    recursive learning and self-improvement
                  </Link>{" "}
                  could mean for us down the line.
                </p>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted lg:max-w-[65ch]">
                  My aim is simple: <span className="font-medium text-ink">bring
                  calm, clarity, and depth to the noisiest topic there is.</span>{" "}
                  A little structure to help you learn, build, and find your own
                  footing as things move quickly.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <CtaLink href="/projects">Explore my projects</CtaLink>
                  <CtaLink href="/research" variant="secondary">
                    Explore the questions
                  </CtaLink>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>

      {/* Free guide — email capture */}
      <Container className="pt-10 sm:pt-12">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-accent-soft p-8 sm:p-12">
            <div
              aria-hidden
              className="glow glow-gold animate-drift absolute -left-32 -bottom-40 h-[26rem] w-[26rem] rounded-full"
            />
            <div className="relative grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-center">
              <div>
                <Eyebrow tone="accent">Free guide</Eyebrow>
                <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
                  Build a morning brief that writes itself
                </h2>
                <p className="mt-3 text-lg leading-relaxed text-ink/70">
                  <span className="font-medium text-ink">The First Build</span>{" "}
                  is the whole thing: the actual instructions I use, every
                  decision behind them, and the parts I got wrong. No code, and
                  you can have it running by the end of an evening.
                </p>
              </div>

              <div>
                <SubscribeForm source="home-band" />
                <p className="mt-3 text-sm leading-relaxed text-ink/60">
                  I&apos;ll send it straight to your inbox, plus new builds as I
                  publish them. Free, always — unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>

      {/* Stuff I've built */}
      <Container className="py-16">
        <Reveal className="mb-8 flex items-end justify-between">
          <div>
            <Eyebrow tone="flame">Built with AI</Eyebrow>
            <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
              Stuff I&apos;ve actually built
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden text-sm font-medium text-flame hover:underline sm:block"
          >
            All projects →
          </Link>
        </Reveal>
        <Stagger className="grid gap-4 sm:grid-cols-2" inView>
          {featuredProjects.map((project) => (
            <StaggerItem key={project.slug}>
              <HoverLift className="h-full">
                <div
                  className={cn(
                    "relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface",
                    "before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-1 before:content-['']",
                    TONE_BAR[project.tone]
                  )}
                >
                  {project.image ? (
                    project.frame === "phone" ? (
                      <PhoneShowcase
                        src={project.image}
                        alt={`${project.name} screenshot`}
                        peek
                      />
                    ) : (
                      <BrowserFrame
                        src={project.image}
                        alt={`${project.name} screenshot`}
                        label={project.liveLabel}
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    )
                  ) : null}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-xl text-ink">
                        {project.name}
                      </h3>
                      <Pill tone={project.tone}>{project.status}</Pill>
                    </div>
                    <p className={cn("mt-2 text-sm font-medium", TONE_TXT[project.tone])}>
                      {project.tagline}
                    </p>
                    <p className="prose-scale-sm mt-3 flex-1 leading-relaxed text-ink/85">
                      {project.what}
                    </p>
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 text-sm font-medium text-ink hover:underline"
                      >
                        {project.liveLabel} ↗
                      </a>
                    ) : null}
                  </div>
                </div>
              </HoverLift>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>

      {/* Governance & ethics — the other half of the work */}
      <Container className="py-16 sm:py-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-grape-soft p-8 sm:p-12">
            <div
              aria-hidden
              className="glow glow-mint animate-drift absolute -right-40 -bottom-40 h-[28rem] w-[28rem] rounded-full opacity-50"
            />
            <div className="relative">
              <div>
                <Eyebrow tone="grape">Understanding AI</Eyebrow>
                <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
                  What can it do, and what can we trust?
                </h2>
                <p className="mt-3 text-lg leading-relaxed text-ink/70">
                  Building with AI keeps bringing me back to the same questions:
                  how does it learn, what counts as improvement, and how do we
                  stay in control as it becomes more capable? These are my notes
                  and frameworks for thinking them through.
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <Link
                  href="/agents"
                  className="group flex h-full flex-col rounded-2xl border border-grape/25 bg-surface/70 p-5 transition-colors hover:border-grape/70"
                >
                  <Pill tone="grape">In progress</Pill>
                  <span className="font-display mt-3 block text-lg leading-snug text-ink group-hover:text-grape">
                    Agents that spend
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-ink/75">
                    When an agent spends on someone&apos;s behalf, how do we
                    record permission, check it, and make it possible to stop?
                  </span>
                  <span className="mt-3 text-sm font-medium text-grape">
                    Read the work →
                  </span>
                </Link>

                <a
                  href="/essays/the-verification-gap.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-2xl border border-grape/25 bg-surface/70 p-5 transition-colors hover:border-grape/70"
                >
                  <Pill tone="grape">Writing</Pill>
                  <span className="font-display mt-3 block text-lg leading-snug text-ink group-hover:text-grape">
                    The Verification Gap
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-ink/75">
                    What would count as convincing evidence that an AI system
                    deserves our trust? An essay on assurance and its limits.
                  </span>
                  <span className="mt-3 text-sm font-medium text-grape">
                    Read the essay →
                  </span>
                </a>

                <Link
                  href="/research/autonomy-governance"
                  className="group flex h-full flex-col rounded-2xl border border-grape/25 bg-surface/70 p-5 transition-colors hover:border-grape/70"
                >
                  <Pill tone="grape">Framework</Pill>
                  <span className="font-display mt-3 block text-lg leading-snug text-ink group-hover:text-grape">
                    The Oversight Threshold
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-ink/75">
                    As AI gets more autonomous, human approval can stay in the
                    workflow while disappearing in substance. Five levels of
                    autonomy, and a test for whether review still means
                    anything.
                  </span>
                  <span className="mt-3 text-sm font-medium text-grape">
                    Open the framework →
                  </span>
                </Link>

                <Link
                  href="/research/learning-and-self-improvement"
                  className="group flex h-full flex-col rounded-2xl border border-grape/25 bg-surface/70 p-5 transition-colors hover:border-grape/70"
                >
                  <Pill tone="grape">Explainer</Pill>
                  <span className="font-display mt-3 block text-lg leading-snug text-ink group-hover:text-grape">
                    When AI “learns”
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-ink/75">
                    Context, memory, training, and recursive self-improvement:
                    what changes in each, and what a better answer can tell us.
                  </span>
                  <span className="mt-3 text-sm font-medium text-grape">
                    Untangle the terms →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>

      {/* How can I help you? */}
      <Container className="py-16 sm:py-20">
        <Reveal className="mb-8 text-center">
          <Eyebrow tone="flame">Start here</Eyebrow>
          <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
            How can I help you?
          </h2>
        </Reveal>
        <Stagger className="grid gap-4 sm:grid-cols-2" gap={0.08} inView>
          {PATHS.map((path) => (
            <StaggerItem key={path.href}>
              <HoverLift className="h-full">
                <Link
                  href={path.href}
                  className={cn(
                    "group relative flex h-full items-start gap-4 overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-transparent",
                    "before:absolute before:inset-y-0 before:left-0 before:w-1.5 before:content-['']",
                    TONE_BAR[path.tone]
                  )}
                >
                  <span
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-2xl",
                      TONE_SOFT_BG[path.tone]
                    )}
                  >
                    {path.emoji}
                  </span>
                  <span className="flex-1">
                    <span className="font-display block text-xl text-ink">
                      {path.title}
                    </span>
                    <span className="prose-scale-sm mt-1.5 block leading-relaxed text-ink/85">
                      {path.body}
                    </span>
                    <span
                      className={cn(
                        "mt-3 inline-block text-sm font-medium transition-transform group-hover:translate-x-1",
                        TONE_TXT[path.tone]
                      )}
                    >
                      Get started →
                    </span>
                  </span>
                </Link>
              </HoverLift>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>

      {/* Featured course band */}
      <Container className="py-4">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-mint-soft p-8 sm:p-12">
            <div
              aria-hidden
              className="glow glow-mint animate-drift absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full"
            />
            <div className="relative">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <Eyebrow tone="mint">Free courses</Eyebrow>
                  <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
                    Start at zero. Finish with a live app.
                  </h2>
                  <p className="mt-3 text-lg leading-relaxed text-ink/70">
                    Each course picks up where the last one left off. Take them
                    in order, or jump in wherever you already are.
                  </p>
                </div>
                <CtaLink href="/courses" tone="mint">
                  See all courses
                </CtaLink>
              </div>

              <ol className={cn("mt-8 grid gap-3", ladderCols)}>
                {ladder.map((course, i) => (
                  <li key={course.slug}>
                    <Link
                      href={`/courses/${course.slug}`}
                      className="group flex h-full flex-col rounded-2xl border border-mint/25 bg-surface/70 p-5 transition-colors hover:border-mint/70"
                    >
                      <span className="font-display text-sm font-semibold text-mint">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display mt-1 block text-lg leading-snug text-ink group-hover:text-mint">
                        {course.title}
                      </span>
                      <span className="mt-3 flex flex-wrap gap-2">
                        <Pill tone="mint">{course.level}</Pill>
                        <Pill tone="mint">
                          {course.lessons.length} lessons
                        </Pill>
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>

              {/* One question inline. Answering it opens the full finder on
                  /courses already past question one. */}
              <div className="mt-6 border-t border-mint/25 pt-5">
                <p className="text-sm font-medium text-ink">
                  {QUESTIONS[0].prompt}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {QUESTIONS[0].options.map((option) => (
                    <Link
                      key={option.id}
                      href={`/courses?start=${option.id}`}
                      className="rounded-full border border-mint/40 bg-surface/70 px-3.5 py-1.5 text-sm text-ink transition-colors hover:border-mint hover:bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-mint-soft"
                    >
                      {option.label}
                    </Link>
                  ))}
                </div>
                <p className="mt-3 text-sm text-ink/60">
                  More courses on the way as I keep building.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>

      {/* My story */}
      <Container className="py-8">
        <Reveal>
          <div className="rounded-3xl border border-line bg-surface p-8 sm:p-12">
            <div>
                <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
                  Why I keep coming back to this
                </h2>
                <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted">
                  <p>
                    Curiosity turned into a morning briefing I use every day,
                    a communication coach, and experiments with AI governance.
                    Each build gives me something concrete to question, improve,
                    and explain.
                  </p>
                  <p>
                    I want this to be a place where you can slow down and
                    understand what you are using. I share the steps, the useful
                    discoveries, and the limits I am still trying to understand.
                    The courses and writing here are free.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <CtaLink href="/about" tone="gold">
                    Read my full story
                  </CtaLink>
                  <CtaLink href="/projects" variant="secondary">
                    See my projects
                  </CtaLink>
                </div>
            </div>
          </div>
        </Reveal>
      </Container>

      {/* Closing */}
      <Container className="py-20">
        <Reveal>
          <figure className="mx-auto max-w-3xl text-center">
            <blockquote className="font-display text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
              &ldquo;Understand deeply. Explain plainly. Make room for a
              little calm along the way.&rdquo;
            </blockquote>
          </figure>
        </Reveal>
      </Container>
    </>
  );
}
