import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageIntro, Pill, TONE_TEXT } from "@/components/ui";
import { Reveal, HoverLift } from "@/components/motion";
import { BrowserFrame } from "@/components/browser-frame";
import { PhoneShowcase } from "@/components/phone-frame";
import { cn } from "@/lib/cn";
import { PROJECTS } from "@/content/projects";
import type { Tone } from "@/components/ui";

export const metadata: Metadata = pageMetadata("/projects", {
  title: "Projects",
  description:
    "Useful tools and personal experiments built with AI. What I made, why I made it, and what I learned along the way.",
});

const LEFT_BAR: Record<Tone, string> = {
  accent: "before:bg-accent",
  mint: "before:bg-mint",
  flame: "before:bg-flame",
  grape: "before:bg-grape",
  gold: "before:bg-gold",
};

export default function ProjectsPage() {
  return (
    <Container className="py-16 sm:py-20">
      <PageIntro eyebrow="Built with AI" title="Useful ideas, built with AI." tone="flame">
        These are my personal builds: things I use, ideas I wanted to try, and
        questions I wanted to explore by making something. Some are live and
        others are still taking shape. Here is what each one is teaching me.
      </PageIntro>

      <div className="mt-14 space-y-6">
        {PROJECTS.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.05}>
            <HoverLift>
              <article
                className={cn(
                  "relative overflow-hidden rounded-3xl border border-line bg-surface",
                  "before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-1.5 before:content-['']",
                  LEFT_BAR[project.tone],
                  project.image && "lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
                )}
              >
                {project.image ? (
                  <div className="min-w-0 lg:flex lg:items-center lg:border-r lg:border-line lg:bg-sunken/40">
                    <div className="w-full">
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
                          sizes="(max-width: 1023px) 100vw, (max-width: 1535px) 45vw, 620px"
                        />
                      )}
                    </div>
                  </div>
                ) : null}
                <div className="flex min-w-0 flex-col gap-6 p-7 sm:p-9">
                  <div>
                    <span
                      className={cn(
                        "font-display text-sm font-semibold",
                        TONE_TEXT[project.tone]
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="mt-2 flex items-center gap-3">
                      <h2 className="font-display text-2xl text-ink">
                        {project.name}
                      </h2>
                    </div>
                    <p
                      className={cn(
                        "mt-2 text-sm font-medium",
                        TONE_TEXT[project.tone]
                      )}
                    >
                      {project.tagline}
                    </p>
                    <div className="mt-4">
                      <Pill tone={project.tone}>{project.status}</Pill>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-sunken px-2 py-0.5 font-mono text-xs text-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "mt-4 inline-block text-sm font-medium hover:underline",
                          TONE_TEXT[project.tone]
                        )}
                      >
                        {project.liveLabel} ↗
                      </a>
                    ) : null}
                  </div>

                  <div className="flex-1 space-y-5 border-t border-line pt-6">
                    <Detail label="What it is">{project.what}</Detail>
                    <Detail label="Why I built it">{project.why}</Detail>
                    <Detail label="What it taught me">{project.lessons}</Detail>
                  </div>
                </div>
              </article>
            </HoverLift>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}

function Detail({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
        {label}
      </h3>
      <p className="prose-scale-sm mt-1.5 leading-relaxed text-ink/85">{children}</p>
    </div>
  );
}
