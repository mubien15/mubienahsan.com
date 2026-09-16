import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { Eyebrow, Pill } from "@/components/ui";
import { Reveal } from "@/components/motion";
import {
  CONTROLS,
  FLOW_STAGES,
  PUBLISHED_CONTROLS,
} from "@/content/agents";

export function generateStaticParams() {
  return PUBLISHED_CONTROLS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const control = CONTROLS.find((c) => c.slug === slug);
  if (!control) return {};
  return {
    title: `${control.ref} · ${control.title}`,
    description: control.summary,
  };
}

export default async function ControlPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const control = CONTROLS.find((c) => c.slug === slug && c.published);
  if (!control) notFound();

  const stage = FLOW_STAGES.find((s) => s.controlSlug === control.slug);
  const index = PUBLISHED_CONTROLS.findIndex((c) => c.slug === control.slug);
  const previous = index > 0 ? PUBLISHED_CONTROLS[index - 1] : null;
  const next =
    index < PUBLISHED_CONTROLS.length - 1
      ? PUBLISHED_CONTROLS[index + 1]
      : null;

  return (
    <Container className="py-16 sm:py-20">
      <Reveal className="max-w-2xl" y={16}>
        <Link
          href="/agents"
          className="text-sm font-medium text-muted hover:text-grape"
        >
          ← Agents that spend
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Pill tone="grape">{control.ref}</Pill>
          <Eyebrow tone="grape">{control.published}</Eyebrow>
        </div>
        <h1 className="font-display mt-4 text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl">
          {control.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-grape">
          {control.question}
        </p>
        {stage ? (
          <p className="mt-5 rounded-xl border border-grape/30 bg-grape-soft/40 px-4 py-3 text-sm leading-relaxed text-ink/85">
            <span className="font-medium text-ink">
              Where this sits: {stage.label}.
            </span>{" "}
            {stage.moment}
          </p>
        ) : null}
        <p className="mt-5 text-sm leading-relaxed text-muted">
          Claims last checked against sources on{" "}
          <span className="font-medium text-ink">{control.lastChecked}</span>.
          Protocols and guidance in this area change quickly, so treat anything
          here as accurate as of that date rather than indefinitely.
        </p>
      </Reveal>

      <div className="mt-12 max-w-2xl space-y-10">
        {control.sections.map((section) => (
          <Reveal key={section.heading}>
            <section>
              <h2 className="font-display text-2xl text-ink">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4 text-[1.05rem] leading-8 text-ink/85">
                {section.body.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </section>
          </Reveal>
        ))}
      </div>

      {previous || next ? (
        <Reveal>
          <nav
            aria-label="Other controls"
            className="mt-14 grid max-w-2xl gap-4 sm:grid-cols-2"
          >
            {previous ? (
              <Link
                href={`/agents/${previous.slug}`}
                className="group rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-grape/60"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                  ← Previous · {previous.ref}
                </span>
                <span className="font-display mt-2 block text-lg leading-snug text-ink group-hover:text-grape">
                  {previous.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/agents/${next.slug}`}
                className="group rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-grape/60 sm:text-right"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                  Next · {next.ref} →
                </span>
                <span className="font-display mt-2 block text-lg leading-snug text-ink group-hover:text-grape">
                  {next.title}
                </span>
              </Link>
            ) : null}
          </nav>
        </Reveal>
      ) : null}

      <Reveal>
        <p className="mt-10 max-w-2xl rounded-2xl border border-line bg-surface/60 p-5 text-sm leading-relaxed text-muted">
          Written in a personal capacity, from public sources. It is not legal
          advice and does not create any professional relationship. Where a
          specification, a piece of research or a set of guidance is named, it is
          named so a reader can go and check it. Nothing here is a judgement
          about any company&apos;s conduct or compliance.
        </p>
      </Reveal>
    </Container>
  );
}
