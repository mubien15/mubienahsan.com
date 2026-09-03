"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

type LessonRef = { slug: string; title: string; minutes: number };

export function LessonSidebar({
  courseSlug,
  courseTitle,
  lessons,
}: {
  courseSlug: string;
  courseTitle: string;
  lessons: LessonRef[];
}) {
  const pathname = usePathname();

  const current = lessons.findIndex(
    (l) => pathname === `/courses/${courseSlug}/${l.slug}`
  );

  const list = (
    <ol className="space-y-1">
      {lessons.map((lesson, i) => {
        const href = `/courses/${courseSlug}/${lesson.slug}`;
        const active = pathname === href;
        return (
          <li key={lesson.slug}>
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-baseline gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-accent-soft text-accent-strong"
                  : "text-muted hover:bg-sunken hover:text-ink"
              )}
            >
              <span className="font-mono text-xs opacity-70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="leading-snug">{lesson.title}</span>
            </Link>
          </li>
        );
      })}
    </ol>
  );

  return (
    <nav aria-label="Lessons" className="lg:sticky lg:top-24">
      <Link
        href={`/courses/${courseSlug}`}
        className="font-display text-sm font-semibold text-ink hover:text-accent"
      >
        {courseTitle}
      </Link>

      {/* On small screens the full list would push the lesson itself off the
          screen, so it collapses into a disclosure. */}
      <details className="group mt-3 rounded-xl border border-line bg-surface lg:hidden">
        <summary className="flex cursor-pointer items-center justify-between gap-3 px-4 py-3 text-sm text-muted marker:content-['']">
          <span>
            {current >= 0
              ? `Lesson ${current + 1} of ${lessons.length}`
              : `${lessons.length} lessons`}
          </span>
          <span className="text-xs text-muted transition-transform group-open:rotate-180">
            ▾
          </span>
        </summary>
        <div className="px-2 pb-2">{list}</div>
      </details>

      <div className="mt-4 hidden lg:block">{list}</div>
    </nav>
  );
}

export function LessonPager({
  courseSlug,
  lessons,
}: {
  courseSlug: string;
  lessons: LessonRef[];
}) {
  const pathname = usePathname();
  const index = lessons.findIndex(
    (l) => pathname === `/courses/${courseSlug}/${l.slug}`
  );
  const prev = index > 0 ? lessons[index - 1] : null;
  const next =
    index >= 0 && index < lessons.length - 1 ? lessons[index + 1] : null;

  return (
    <div className="mt-16 grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          href={`/courses/${courseSlug}/${prev.slug}`}
          className="rounded-xl border border-line bg-surface p-4 transition-colors hover:border-accent/50"
        >
          <span className="text-xs text-muted">← Previous</span>
          <span className="mt-1 block font-medium text-ink">{prev.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={`/courses/${courseSlug}/${next.slug}`}
          className="rounded-xl border border-line bg-surface p-4 text-right transition-colors hover:border-accent/50 sm:col-start-2"
        >
          <span className="text-xs text-muted">Next →</span>
          <span className="mt-1 block font-medium text-ink">{next.title}</span>
        </Link>
      ) : (
        <Link
          href={`/courses/${courseSlug}`}
          className="rounded-xl border border-line bg-accent-soft/50 p-4 text-right transition-colors hover:border-accent/50 sm:col-start-2"
        >
          <span className="text-xs text-muted">You&apos;re done 🎉</span>
          <span className="mt-1 block font-medium text-accent-strong">
            Back to course overview
          </span>
        </Link>
      )}
    </div>
  );
}
