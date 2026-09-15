import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { Eyebrow, Pill } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { CONTROLS, PUBLISHED_CONTROLS } from "@/content/agents";

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

      <Reveal>
        <p className="mt-14 max-w-2xl rounded-2xl border border-line bg-surface/60 p-5 text-sm leading-relaxed text-muted">
          Written in a personal capacity, from public sources. It is not legal
          advice and does not create any professional relationship.
        </p>
      </Reveal>
    </Container>
  );
}
