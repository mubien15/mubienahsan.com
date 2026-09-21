import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageIntro, Pill, TONE_TEXT } from "@/components/ui";
import { Reveal, HoverLift } from "@/components/motion";
import { BrowserFrame } from "@/components/browser-frame";
import { PhoneShowcase } from "@/components/phone-frame";
import { cn } from "@/lib/cn";
import { PROJECTS } from "@/content/projects";
import type { Tone } from "@/components/ui";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Built with AI. A showcase of real apps I have shipped, with the stack, the story, and the lessons learned. Proof, not portfolio.",
};

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
      <PageIntro eyebrow="Built with AI" title="Proof, not portfolio." tone="flame">
        Everything here is something I actually shipped, on nights and weekends,
        without a CS degree. Each one taught me something a chatbot cannot hand
        you: what it takes to finish.
      </PageIntro>

      <div className="mt-14 space-y-6">
        {PROJECTS.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.05}>
            <HoverLift>
              <article
                className={cn(
                  "relative overflow-hidden rounded-3xl border border-line bg-surface",
                  "before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-1.5 before:content-['']",
                  LEFT_BAR[project.tone]
                )}
              >
                {project.image ? (
                  project.frame === "phone" ? (
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
                      sizes="(max-width: 1024px) 100vw, 900px"
                    />
                  )
                ) : null}
                <div className="flex flex-col gap-6 p-7 sm:p-9 lg:flex-row lg:gap-10">
                  <div className="lg:w-64 lg:shrink-0">
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

                  <div className="flex-1 space-y-5 border-t border-line pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
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
      <p className="mt-1.5 max-w-prose leading-relaxed text-ink/85">{children}</p>
    </div>
  );
}
