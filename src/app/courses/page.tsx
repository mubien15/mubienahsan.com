import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Container } from "@/components/container";
import { CourseQuiz, CourseQuizFallback } from "@/components/course-quiz";
import { PageIntro, Pill, TONE_TEXT } from "@/components/ui";
import { Reveal, HoverLift } from "@/components/motion";
import { cn } from "@/lib/cn";
import { COURSES } from "@/content/courses";
import type { Tone } from "@/components/ui";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Beginner first courses on using and building with AI. A ladder from absolute zero to shipping your first real app. Free.",
};

const LEFT_BAR: Record<Tone, string> = {
  accent: "before:bg-accent",
  mint: "before:bg-mint",
  flame: "before:bg-flame",
  grape: "before:bg-grape",
  gold: "before:bg-gold",
};

export default function CoursesPage() {
  return (
    <Container className="py-16 sm:py-20">
      <PageIntro
        eyebrow="Courses & workshops"
        title="Start from wherever you are."
        tone="mint"
      >
        A ladder, not a firehose: absolute beginner, then prompting that
        actually works, then the framework that names the whole skill, then
        shipping a real app. Written to assume nothing.
      </PageIntro>

      {/* Optional finder. The full list below is never gated behind it. */}
      <div className="mt-12">
        <Suspense fallback={<CourseQuizFallback />}>
          <CourseQuiz />
        </Suspense>
      </div>

      <h2 className="font-display mt-14 text-2xl tracking-tight text-ink">
        All four courses
      </h2>

      <div className="mt-6 space-y-4">
        {COURSES.map((course, i) => {
          const available = course.status === "Available";
          const inner = (
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "font-display text-sm font-semibold",
                      TONE_TEXT[course.tone]
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display text-2xl text-ink">
                    {course.title}
                  </h2>
                  {!available ? <Pill tone={course.tone}>{course.status}</Pill> : null}
                </div>
                <p className="mt-2 leading-relaxed text-ink/85">{course.blurb}</p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <Pill tone={course.tone}>{course.level}</Pill>
                  {available ? (
                    <Pill tone={course.tone}>{course.lessons.length} lessons</Pill>
                  ) : null}
                  <Pill tone={course.tone}>Free</Pill>
                </div>
              </div>
              {available ? (
                <span
                  className={cn(
                    "shrink-0 text-sm font-medium",
                    TONE_TEXT[course.tone]
                  )}
                >
                  Start course →
                </span>
              ) : null}
            </div>
          );

          const barClass = cn(
            "relative overflow-hidden rounded-3xl border border-line bg-surface p-7",
            "before:absolute before:inset-y-0 before:left-0 before:w-1.5 before:content-['']",
            LEFT_BAR[course.tone]
          );

          return (
            <Reveal key={course.slug} delay={i * 0.05}>
              {available ? (
                <HoverLift>
                  <Link
                    href={`/courses/${course.slug}`}
                    className={cn(barClass, "block transition-colors hover:border-transparent")}
                  >
                    {inner}
                  </Link>
                </HoverLift>
              ) : (
                <div className={cn(barClass, "opacity-70")}>{inner}</div>
              )}
            </Reveal>
          );
        })}
      </div>
    </Container>
  );
}
