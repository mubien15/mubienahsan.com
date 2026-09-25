import { pageMetadata } from "@/lib/metadata";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { CtaLink, Eyebrow, Pill, type Tone } from "@/components/ui";
import { Reveal, Stagger, StaggerItem, HoverLift } from "@/components/motion";
import { BrowserFrame } from "@/components/browser-frame";
import { PhoneShowcase } from "@/components/phone-frame";
import { PhotoBlob } from "@/components/photo-blob";
import { Squiggle } from "@/components/doodle";
import { SubscribeForm } from "@/components/subscribe-form";
import { ExecutionKitBuyLink } from "@/components/execution-kit-buy-link";
import { cn } from "@/lib/cn";
import { COURSES } from "@/content/courses";
import { QUESTIONS } from "@/content/quiz";
import { PROJECTS } from "@/content/projects";
import { AGENTS_FEATURE } from "@/content/agents";

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
    emoji: "🛠️",
    title: "See what I have built",
    body: "Working AI products and case studies showing the problem, decisions, evidence, limitations, and next tests.",
    href: "/projects",
    tone: "flame",
  },
  {
    emoji: "🧭",
    title: "Explore the research",
    body: "Frameworks and explainers on autonomy, oversight, alignment, agent permissions, and how AI systems change.",
    href: "/research",
    tone: "grape",
  },
  {
    emoji: "🧑‍💻",
    title: "Learn to use and build with AI",
    body: "Free guides for working with AI deliberately, judging its output, and turning an idea into something useful.",
    href: "/courses",
    tone: "mint",
  },
  {
    emoji: "👋",
    title: "Get to know me",
    body: "My story, how I approach difficult AI questions, the contribution I try to make, and how to reach me.",
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
  const featuredProjects = [
    PROJECTS.find((project) => project.slug === "ai-launch-review"),
    PROJECTS.find((project) => project.slug === "ai-governance-agent"),
    PROJECTS.find((project) => project.slug === "fable"),
  ].filter((project): project is (typeof PROJECTS)[number] => Boolean(project));

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
                  I build useful tools with AI and study what happens when these
                  systems begin to make decisions, take actions, or change the
                  way work gets done. This is where I share the products,
                  frameworks, and evidence behind that work.
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
                  That means building things, testing the assumptions around
                  them, and being precise about what is known and what is not.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <CtaLink href="/launch-review">Try the launch review</CtaLink>
                  <CtaLink href="#start-here" variant="secondary">
                    Explore the site
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

      {/* First-visit overview */}
      <section id="start-here" className="scroll-mt-24">
      <Container className="py-14 sm:py-16">
        <Reveal className="mb-8 text-center">
          <Eyebrow tone="flame">Start here</Eyebrow>
          <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
            Choose where you want to begin
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg leading-relaxed text-muted">
            The site is organized around four simple paths. Pick the one that
            best matches what brought you here.
          </p>
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
                      Open this section →
                    </span>
                  </span>
                </Link>
              </HoverLift>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-4 sm:mx-auto sm:w-[calc(50%_-_0.5rem)]">
          <HoverLift className="h-full">
            <Link
              href="/library"
              className="group relative flex min-h-44 items-start gap-4 overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-colors before:absolute before:inset-y-0 before:left-0 before:w-1.5 before:bg-accent before:content-[''] hover:border-transparent"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-soft text-2xl">
                📚
              </span>
              <span className="flex min-h-32 flex-1 flex-col">
                <span className="font-display block text-xl text-ink">
                  Follow the source trail
                </span>
                <span className="prose-scale-sm mt-1.5 block leading-relaxed text-ink/85">
                  The books, standards, courses, and essays that have changed or sharpened my thinking.
                </span>
                <span className="mt-auto pt-3 text-sm font-medium text-accent transition-transform group-hover:translate-x-1">
                  Open the library →
                </span>
              </span>
            </Link>
          </HoverLift>
        </Reveal>
      </Container>
      </section>

      {/* Flagship research */}
      <Container className="pb-16 pt-10 sm:pb-20 sm:pt-12">
        <Reveal>
          <div
            id="flagship-research"
            className="relative scroll-mt-24 overflow-hidden rounded-3xl bg-grape-soft p-7 sm:p-10 lg:p-12"
          >
            <div
              aria-hidden
              className="glow glow-mint animate-drift absolute -bottom-44 -right-36 h-[30rem] w-[30rem] rounded-full opacity-50"
            />
            <div className="relative">
              <Eyebrow tone="grape">Flagship research</Eyebrow>
              <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
                    Useful AI becomes consequential AI
                  </h2>
                  <p className="mt-3 text-lg leading-relaxed text-ink/70">
                    What should happen when an AI system stops drafting and
                    begins acting, deciding, or spending on someone&apos;s behalf?
                  </p>
                </div>
                <Link
                  href="/research"
                  className="text-sm font-medium text-grape hover:underline"
                >
                  All research →
                </Link>
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-[1.45fr_0.85fr]">
                <Link
                  href="/agents#permission-test"
                  className="group flex min-h-[24rem] flex-col justify-between rounded-3xl border border-grape/30 bg-surface p-6 transition-colors hover:border-grape/75 sm:p-8"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <Pill tone="grape">6 published controls</Pill>
                      <span className="text-xs font-medium uppercase tracking-[0.13em] text-muted">
                        Interactive framework
                      </span>
                    </div>
                    <h3 className="font-display mt-5 text-3xl leading-tight text-ink group-hover:text-grape sm:text-4xl">
                      {AGENTS_FEATURE.title}
                    </h3>
                    <p className="mt-4 text-lg font-medium leading-relaxed text-grape">
                      {AGENTS_FEATURE.question}
                    </p>
                    <p className="mt-4 leading-relaxed text-ink/75">
                      {AGENTS_FEATURE.summary}
                    </p>
                  </div>
                  <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
                    <span className="text-sm text-muted">
                      Permission test · architecture · evaluation pack
                    </span>
                    <span className="text-sm font-medium text-grape transition-transform group-hover:translate-x-1">
                      {AGENTS_FEATURE.cta} →
                    </span>
                  </div>
                </Link>

                <div className="rounded-3xl border border-grape/20 bg-surface/65 p-5 sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                    More research
                  </p>
                  <div className="mt-3 divide-y divide-line">
                    <ResearchLink
                      href="/research/autonomy-governance"
                      kind="Framework"
                      title="The Oversight Threshold"
                      body="When does human review become a signature rather than a safeguard?"
                    />
                    <ResearchLink
                      href="/research/learning-and-self-improvement"
                      kind="Explainer"
                      title="When AI ‘learns’"
                      body="Context, memory, training, and recursive self-improvement untangled."
                    />
                    <ResearchLink
                      href="/essays/the-verification-gap.pdf"
                      kind="Essay"
                      title="The Verification Gap"
                      body="What would count as evidence that an AI system deserves trust?"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>

      {/* Paid execution kit */}
      <Container className="pb-8 sm:pb-12">
        <Reveal>
          <section className="relative overflow-hidden rounded-3xl border border-accent/20 bg-surface p-7 sm:p-10 lg:p-12">
            <div
              aria-hidden
              className="glow glow-gold absolute -bottom-48 -right-40 h-[30rem] w-[30rem] rounded-full opacity-55"
            />
            <div className="relative grid gap-9 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <Eyebrow tone="accent">AI Product Launch Execution Kit</Eyebrow>
                  <Pill tone="gold">CA$39 · one time</Pill>
                </div>
                <h2 className="font-display mt-4 text-3xl leading-tight text-ink sm:text-4xl">
                  Move from a promising AI demo to an accountable launch decision.
                </h2>
                <p className="mt-4 max-w-[66ch] text-lg leading-8 text-muted">
                  I turned the free launch review into a practical operating kit: an editable risk
                  register, evaluation plan, launch gates, decision memo, and a professional
                  applicability screen for major AI frameworks and regulations.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <ExecutionKitBuyLink />
                  <CtaLink href="/launch-review/execution-kit" variant="secondary">
                    See what is inside
                  </CtaLink>
                </div>
              </div>

              <div>
                <Link
                  href="/launch-review/execution-kit"
                  className="group block overflow-hidden rounded-2xl border border-line bg-paper shadow-sm"
                >
                  <Image
                    src="/images/execution-kit/workbook-overview.png"
                    alt="The actual AI Product Launch Execution Workbook overview and status dashboard"
                    width={1309}
                    height={828}
                    className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.015]"
                  />
                  <span className="flex items-center justify-between gap-3 border-t border-line px-4 py-3 text-xs text-muted">
                    <span>Actual workbook preview</span>
                    <span className="font-medium text-accent">Look inside →</span>
                  </span>
                </Link>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {[
                    ["12", "starter risk areas"],
                    ["7", "editable workbook tabs"],
                    ["13", "applicability prompts"],
                    ["11", "guide pages"],
                  ].map(([value, label]) => (
                    <div key={label} className="rounded-xl border border-line bg-paper/70 px-4 py-3">
                      <p className="font-display text-2xl text-accent">{value}</p>
                      <p className="mt-0.5 text-xs leading-5 text-muted">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </Reveal>
      </Container>

      {/* Selected builds */}
      <Container className="py-16">
        <Reveal className="mb-8 flex items-end justify-between">
          <div>
            <Eyebrow tone="flame">Selected builds</Eyebrow>
            <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
              Ideas tested by making them real
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden text-sm font-medium text-flame hover:underline sm:block"
          >
            All projects →
          </Link>
        </Reveal>
        <Stagger className="grid gap-4 md:grid-cols-3" inView>
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
                    {project.internalUrl ? (
                      <Link
                        href={project.internalUrl}
                        className={cn("mt-4 text-sm font-medium hover:underline", TONE_TXT[project.tone])}
                      >
                        Try the interactive product →
                      </Link>
                    ) : project.caseStudy ? (
                      <Link
                        href={`/projects/${project.slug}`}
                        className={cn("mt-4 text-sm font-medium hover:underline", TONE_TXT[project.tone])}
                      >
                        Read the case study →
                      </Link>
                    ) : null}
                  </div>
                </div>
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
                <Eyebrow tone="mint">Practical learning</Eyebrow>
                <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
                    Use AI deliberately. Then build with it.
                </h2>
                <p className="mt-3 text-lg leading-relaxed text-ink/70">
                    Free guides on prompting, judgment, responsible delegation,
                    and turning an idea into a working product. Start where the
                    gap in your own practice is.
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

function ResearchLink({
  href,
  kind,
  title,
  body,
}: {
  href: string;
  kind: string;
  title: string;
  body: string;
}) {
  return (
    <Link href={href} className="group block py-5 first:pt-3 last:pb-2">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-grape">
        {kind}
      </span>
      <span className="font-display mt-1 block text-lg leading-snug text-ink group-hover:text-grape">
        {title}
      </span>
      <span className="mt-1.5 block text-sm leading-relaxed text-ink/70">
        {body}
      </span>
    </Link>
  );
}
