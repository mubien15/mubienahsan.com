import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrowserFrame } from "@/components/browser-frame";
import { Container } from "@/components/container";
import { PhoneShowcase } from "@/components/phone-frame";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { CtaLink, Eyebrow, Pill, TONE_TEXT } from "@/components/ui";
import { PROJECTS } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PROJECTS.filter((project) => project.caseStudy).map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug && item.caseStudy);

  if (!project) return {};

  return pageMetadata(`/projects/${project.slug}`, {
    title: `${project.name} case study`,
    description: `${project.tagline}. The problem, approach, product decisions, limitations, and next tests behind this personal AI build.`,
  });
}

export default async function ProjectCaseStudy({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug && item.caseStudy);

  if (!project?.caseStudy) notFound();

  const caseStudy = project.caseStudy;

  return (
    <Container className="py-16 sm:py-20">
      <Link
        href="/projects"
        className="text-sm font-medium text-muted hover:text-flame"
      >
        ← Selected projects
      </Link>

      <article className="mt-8">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:items-end">
            <div>
              <Eyebrow tone={project.tone}>Build case study</Eyebrow>
              <h1 className="font-display mt-4 text-4xl leading-[1.05] tracking-tight text-ink sm:text-6xl">
                {project.name}
              </h1>
              <p className={`mt-4 text-lg font-medium ${TONE_TEXT[project.tone]}`}>
                {project.tagline}
              </p>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                {project.what}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <Pill tone={project.tone}>{project.status}</Pill>
                {project.stack.map((item) => (
                  <Pill key={item}>{item}</Pill>
                ))}
              </div>
              {project.liveUrl ? (
                <div className="mt-8">
                  <CtaLink href={project.liveUrl} external tone={project.tone}>
                    Open the live project ↗
                  </CtaLink>
                </div>
              ) : null}
              {project.internalUrl ? (
                <div className="mt-8">
                  <CtaLink href={project.internalUrl} tone={project.tone}>
                    Open the interactive product →
                  </CtaLink>
                </div>
              ) : null}
            </div>

            <aside className="rounded-2xl border border-line bg-surface p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                The short version
              </p>
              <dl className="mt-5 space-y-5">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Why I built it
                  </dt>
                  <dd className="mt-1.5 text-sm leading-6 text-ink/85">{project.why}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Main lesson
                  </dt>
                  <dd className="mt-1.5 text-sm leading-6 text-ink/85">
                    {project.lessons}
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </Reveal>

        {project.image ? (
          <Reveal>
            <div className="mt-14 overflow-hidden rounded-3xl border border-line bg-sunken/40">
              {project.frame === "phone" ? (
                <PhoneShowcase
                  src={project.image}
                  video={project.video}
                  alt={`${project.name} screenshot`}
                  label={project.imageNote}
                />
              ) : (
                <BrowserFrame
                  src={project.image}
                  alt={`${project.name} screenshot`}
                  label={project.liveLabel}
                  sizes="(max-width: 1023px) 100vw, 1200px"
                />
              )}
            </div>
          </Reveal>
        ) : null}

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.45fr)] lg:gap-20">
          <div className="space-y-14">
            <Reveal>
              <section>
                <Eyebrow tone={project.tone}>The problem</Eyebrow>
                <h2 className="font-display mt-3 text-3xl text-ink">Start with the real need</h2>
                <p className="prose-scale mt-5 text-[1.05rem] leading-8 text-ink/85">
                  {caseStudy.context}
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <Eyebrow tone={project.tone}>The approach</Eyebrow>
                <h2 className="font-display mt-3 text-3xl text-ink">How I shaped the product</h2>
                <p className="prose-scale mt-5 text-[1.05rem] leading-8 text-ink/85">
                  {caseStudy.approach}
                </p>
              </section>
            </Reveal>

            {caseStudy.evidence ? (
              <Reveal>
                <section id="evidence" className="scroll-mt-24">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <Eyebrow tone="mint">Evidence so far</Eyebrow>
                    <span className="text-xs text-muted">
                      Checked {caseStudy.evidence.checked}
                    </span>
                  </div>
                  <h2 className="font-display mt-3 text-3xl text-ink">
                    What I have actually checked
                  </h2>
                  <p className="prose-scale mt-5 text-[1.05rem] leading-8 text-ink/85">
                    {caseStudy.evidence.summary}
                  </p>

                  <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                    {caseStudy.evidence.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-2xl border border-mint/25 bg-mint-soft/45 p-5"
                      >
                        <dt className="font-display text-3xl text-mint">{metric.value}</dt>
                        <dd className="mt-1 text-sm leading-6 text-ink/75">{metric.label}</dd>
                      </div>
                    ))}
                  </dl>

                  <ul className="mt-6 space-y-3 text-sm leading-7 text-ink/80">
                    {caseStudy.evidence.findings.map((finding) => (
                      <li key={finding} className="flex gap-3">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mint" />
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>

                  {caseStudy.evidence.artifact ? (
                    <a
                      href={caseStudy.evidence.artifact.href}
                      className="mt-6 inline-flex text-sm font-medium text-mint hover:underline"
                    >
                      {caseStudy.evidence.artifact.label} →
                    </a>
                  ) : null}

                  <div className="mt-6 rounded-2xl border border-line bg-sunken/50 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                      What this does not establish
                    </p>
                    <p className="mt-2 text-sm leading-7 text-ink/75">
                      {caseStudy.evidence.limitation}
                    </p>
                  </div>
                </section>
              </Reveal>
            ) : null}

            <section>
              <Reveal>
                <Eyebrow tone={project.tone}>Product judgment</Eyebrow>
                <h2 className="font-display mt-3 text-3xl text-ink">Decisions that mattered</h2>
              </Reveal>
              <Stagger className="mt-6 grid gap-4" inView>
                {caseStudy.decisions.map((decision, index) => (
                  <StaggerItem key={decision.title}>
                    <div className="rounded-2xl border border-line bg-surface p-6 sm:grid sm:grid-cols-[2rem_1fr] sm:gap-4">
                      <span className={`font-display text-sm font-semibold ${TONE_TEXT[project.tone]}`}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-display text-xl text-ink">{decision.title}</h3>
                        <p className="prose-scale-sm mt-2 leading-7 text-ink/80">
                          {decision.body}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </section>
          </div>

          <div className="space-y-8">
            <Reveal>
              <section className="rounded-2xl border border-line bg-surface p-6">
                <Eyebrow tone="grape">Limits</Eyebrow>
                <h2 className="font-display mt-3 text-2xl text-ink">What this does not prove</h2>
                <ul className="mt-5 space-y-4 text-sm leading-6 text-ink/80">
                  {caseStudy.limits.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-grape" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            <Reveal>
              <section className="rounded-2xl border border-line bg-mint-soft p-6">
                <Eyebrow tone="mint">Next tests</Eyebrow>
                <h2 className="font-display mt-3 text-2xl text-ink">How I would strengthen the evidence</h2>
                <ol className="mt-5 space-y-4 text-sm leading-6 text-ink/80">
                  {caseStudy.next.map((item, index) => (
                    <li key={item} className="flex gap-3">
                      <span className="font-display shrink-0 text-mint">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </section>
            </Reveal>
          </div>
        </div>

        <Reveal>
          <div className="mt-16 flex flex-col gap-4 rounded-3xl border border-line bg-surface p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-2xl text-ink">Interested in the reasoning behind the build?</h2>
              <p className="mt-2 text-sm leading-6 text-muted">
                I share the decisions, failed assumptions, and useful lessons as the work develops.
              </p>
            </div>
            <CtaLink href="/research" variant="secondary">
              Explore the research
            </CtaLink>
          </div>
        </Reveal>
      </article>
    </Container>
  );
}
