import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { CtaLink, Eyebrow, Pill } from "@/components/ui";
import { Reveal, Stagger, StaggerItem, HoverLift } from "@/components/motion";
import { getCourse } from "@/content/courses";
import { notFound } from "next/navigation";

const COURSE_SLUG = "prompting-basics";

export const metadata: Metadata = pageMetadata("/courses/prompting-basics", {
  title: "Prompting, without the hype",
  description:
    "Most prompt engineering advice is noise. Here is the small handful of ideas that actually change your results, checked against Anthropic's own guidance.",
});

export default function CourseOverviewPage() {
  const course = getCourse(COURSE_SLUG);
  if (!course) notFound();

  const totalMinutes = course.lessons.reduce((sum, l) => sum + l.minutes, 0);

  return (
    <Container className="py-16 sm:py-20">
      <Link
        href="/courses"
        className="text-sm font-medium text-muted hover:text-grape"
      >
        ← All courses
      </Link>

      <Reveal className="mt-6" y={16}>
        <Eyebrow tone="grape">{course.level} · Free</Eyebrow>
        <h1 className="font-display mt-4 text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl">
          {course.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">{course.blurb}</p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Pill tone="grape">{course.lessons.length} lessons</Pill>
          <Pill tone="grape">~{totalMinutes} min total</Pill>
          <Pill tone="grape">No jargon</Pill>
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-8 overflow-hidden rounded-2xl bg-grape-soft p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-grape">
            What you will walk away with
          </h2>
          <p className="prose-scale-sm mt-2 leading-relaxed text-ink/80">{course.outcome}</p>
        </div>
      </Reveal>

      {/* Lesson list */}
      <Stagger className="mt-10 space-y-3" inView>
        {course.lessons.map((lesson, i) => (
          <StaggerItem key={lesson.slug}>
            <HoverLift>
              <Link
                href={`/courses/${course.slug}/${lesson.slug}`}
                className="group flex items-start gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-grape/60"
              >
                <span className="font-display mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-grape-soft text-sm font-semibold text-grape">
                  {i + 1}
                </span>
                <span className="flex-1">
                  <span className="flex items-center justify-between gap-3">
                    <span className="font-display text-lg text-ink group-hover:text-grape">
                      {lesson.title}
                    </span>
                    <span className="shrink-0 text-xs text-muted">
                      {lesson.minutes} min
                    </span>
                  </span>
                  <span className="prose-scale-sm mt-1 block leading-relaxed text-ink/85">
                    {lesson.summary}
                  </span>
                </span>
              </Link>
            </HoverLift>
          </StaggerItem>
        ))}
      </Stagger>

      <div className="mt-10">
        <CtaLink
          href={`/courses/${course.slug}/${course.lessons[0].slug}`}
          tone="grape"
        >
          Start lesson 1 →
        </CtaLink>
      </div>
    </Container>
  );
}
