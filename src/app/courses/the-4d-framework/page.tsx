import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { CtaLink, Eyebrow, Pill } from "@/components/ui";
import { Reveal, Stagger, StaggerItem, HoverLift } from "@/components/motion";
import { getCourse } from "@/content/courses";
import { notFound } from "next/navigation";

const COURSE_SLUG = "the-4d-framework";

export const metadata: Metadata = {
  title: "The 4D Framework",
  description:
    "Delegation, Description, Discernment and Diligence. A plain explanation of the AI fluency framework by Rick Dakan and Joseph Feller, and how to actually use it.",
};

export default function CourseOverviewPage() {
  const course = getCourse(COURSE_SLUG);
  if (!course) notFound();

  const totalMinutes = course.lessons.reduce((sum, l) => sum + l.minutes, 0);

  return (
    <Container className="py-16 sm:py-20">
      <Link
        href="/courses"
        className="text-sm font-medium text-muted hover:text-gold"
      >
        ← All courses
      </Link>

      <Reveal className="mt-6" y={16}>
        <Eyebrow tone="gold">{course.level} · Free</Eyebrow>
        <h1 className="font-display mt-4 text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl">
          {course.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">{course.blurb}</p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Pill tone="gold">{course.lessons.length} lessons</Pill>
          <Pill tone="gold">~{totalMinutes} min total</Pill>
          <Pill tone="gold">No tool required</Pill>
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-8 overflow-hidden rounded-2xl bg-gold-soft p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gold">
            What you will walk away with
          </h2>
          <p className="prose-scale-sm mt-2 leading-relaxed text-ink/80">{course.outcome}</p>
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-4 rounded-2xl border border-line bg-surface p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
            Credit where it is due
          </h2>
          <p className="prose-scale-sm mt-2 leading-relaxed text-ink/85">
            The 4D framework is not mine. It was developed by Prof. Rick Dakan
            and Prof. Joseph Feller, and Anthropic teaches it in their free
            course{" "}
            <a
              href="https://anthropic.skilljar.com/ai-fluency-framework-foundations"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent underline decoration-accent/30 hover:decoration-accent"
            >
              AI Fluency: Framework &amp; Foundations
            </a>
            , which I took and{" "}
            <Link
              href="/library"
              className="font-medium text-accent underline decoration-accent/30 hover:decoration-accent"
            >
              recommend in my library
            </Link>
            . This is my own explanation of it, written the way I wish someone
            had explained it to me. Go and take theirs as well.
          </p>
        </div>
      </Reveal>

      {/* Lesson list */}
      <Stagger className="mt-10 space-y-3" inView>
        {course.lessons.map((lesson, i) => (
          <StaggerItem key={lesson.slug}>
            <HoverLift>
              <Link
                href={`/courses/${course.slug}/${lesson.slug}`}
                className="group flex items-start gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-gold/60"
              >
                <span className="font-display mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-soft text-sm font-semibold text-gold">
                  {i + 1}
                </span>
                <span className="flex-1">
                  <span className="flex items-center justify-between gap-3">
                    <span className="font-display text-lg text-ink group-hover:text-gold">
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
          tone="gold"
        >
          Start lesson 1 →
        </CtaLink>
      </div>
    </Container>
  );
}
