"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useReducedMotion } from "motion/react";
import { COURSES } from "@/content/courses";
import {
  QUESTIONS,
  KEEP_LIT,
  RESULT_NOTES,
  scoreAnswers,
  rankSlugs,
  type CourseSlug,
} from "@/content/quiz";
import { CtaLink, Eyebrow, Pill, TONE_DOT, TONE_TEXT } from "@/components/ui";
import { cn } from "@/lib/cn";

/**
 * Optional course finder that sits above the course list. Three questions, one
 * at a time, with all four courses shown alongside from the start; each answer
 * dims the ones that no longer fit. Skipping it costs the reader nothing, the
 * full list is still right below.
 *
 * Reads `?start=<optionId>` so the homepage can ask question one inline and
 * hand the answer over. Because /courses is statically prerendered, the caller
 * must wrap this in <Suspense> or the production build fails.
 */

const FOCUS =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

/** Ladder order, and the tie break for equal scores. */
const LADDER = COURSES.filter((c) => c.status === "Available");
const ORDER = LADDER.map((c) => c.slug);

export function CourseQuiz() {
  const params = useSearchParams();
  const reduce = useReducedMotion();

  // A valid ?start= answers question one, so the reader lands on question two.
  const preset = params.get("start");
  const presetValid = QUESTIONS[0].options.some((o) => o.id === preset);

  const [answers, setAnswers] = useState<(string | null)[]>(() =>
    presetValid ? [preset, null, null] : [null, null, null]
  );

  const step = answers.findIndex((a) => a === null);
  const done = step === -1;
  const answered = answers.filter(Boolean).length;

  const { ranked, lit } = useMemo(() => {
    const totals = scoreAnswers(answers);
    const ranked = rankSlugs(totals, ORDER);
    const keep = KEEP_LIT[Math.min(answered, KEEP_LIT.length - 1)];
    return { ranked, lit: new Set(ranked.slice(0, keep)) };
  }, [answers, answered]);

  const choose = (optionId: string) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = optionId;
      return next;
    });
  };

  const back = () => {
    setAnswers((prev) => {
      const next = [...prev];
      const last = done ? next.length - 1 : step - 1;
      next[last] = null;
      return next;
    });
  };

  const restart = () => setAnswers([null, null, null]);

  const winner = LADDER.find((c) => c.slug === ranked[0]);
  const rest = LADDER.filter((c) => c.slug !== ranked[0]);
  const question = done ? null : QUESTIONS[step];

  return (
    <section
      aria-labelledby="quiz-heading"
      className="overflow-hidden rounded-3xl border border-line bg-surface"
    >
      <div className="h-1 w-full bg-gradient-to-r from-mint via-grape to-flame" />

      <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-[1fr_16rem] md:gap-10">
        {/* Question, or the result */}
        <div className="min-w-0">
          <Eyebrow tone="accent">Not sure where to start</Eyebrow>
          <h2
            id="quiz-heading"
            className="font-display mt-3 text-2xl tracking-tight text-ink sm:text-3xl"
          >
            {done ? "Start here." : "Three questions, about twenty seconds."}
          </h2>

          {done && winner ? (
            <div className="mt-5">
              <div className="rounded-2xl border border-line bg-paper/60 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Your starting point
                </p>
                <h3 className="font-display mt-1 text-xl text-ink">
                  {winner.title}
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Pill tone={winner.tone}>{winner.level}</Pill>
                  <Pill tone={winner.tone}>
                    {winner.lessons.length} lessons
                  </Pill>
                </div>
                <p className="prose-scale-sm mt-3 leading-relaxed text-ink/85">
                  {RESULT_NOTES[winner.slug as CourseSlug]}
                </p>
                <div className="mt-5">
                  <CtaLink href={`/courses/${winner.slug}`} tone={winner.tone}>
                    Start this course →
                  </CtaLink>
                </div>
              </div>

              <p className="mt-5 text-sm font-medium text-ink">
                Then, when you are ready
              </p>
              <ol className="mt-2 space-y-1.5">
                {rest.map((c) => (
                  <li key={c.slug} className="flex items-baseline gap-2.5">
                    <span
                      className={cn(
                        "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                        TONE_DOT[c.tone]
                      )}
                      aria-hidden
                    />
                    <Link
                      href={`/courses/${c.slug}`}
                      className={cn(
                        "rounded text-sm text-muted underline decoration-transparent transition-colors hover:text-ink hover:decoration-line",
                        FOCUS
                      )}
                    >
                      {c.title}
                    </Link>
                  </li>
                ))}
              </ol>

              <button
                type="button"
                onClick={restart}
                className={cn(
                  "mt-6 rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:text-ink",
                  FOCUS
                )}
              >
                ← Start over
              </button>
            </div>
          ) : question ? (
            <div className="mt-5">
              <p className="text-xs font-medium uppercase tracking-wider text-muted">
                Question {step + 1} of {QUESTIONS.length}
              </p>

              <fieldset className="mt-3">
                <legend className="font-display text-lg text-ink">
                  {question.prompt}
                </legend>
                <div className="mt-4 space-y-2.5">
                  {question.options.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => choose(option.id)}
                      className={cn(
                        "block w-full rounded-2xl border border-line bg-paper/50 px-4 py-3 text-left transition-colors",
                        "hover:border-accent/60 hover:bg-accent-soft/30",
                        FOCUS
                      )}
                    >
                      <span className="block font-medium text-ink">
                        {option.label}
                      </span>
                      <span className="mt-0.5 block text-sm leading-relaxed text-muted">
                        {option.hint}
                      </span>
                    </button>
                  ))}
                </div>
              </fieldset>

              {step > 0 ? (
                <button
                  type="button"
                  onClick={back}
                  className={cn(
                    "mt-4 rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:text-ink",
                    FOCUS
                  )}
                >
                  ← Back
                </button>
              ) : null}
            </div>
          ) : null}
        </div>

        {/* The narrowing panel */}
        <div className="md:pt-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            {answered === 0
              ? "All four courses"
              : done
                ? "Your match"
                : "Still a fit"}
          </p>

          <ul className="mt-3 space-y-2" aria-live="polite">
            {LADDER.map((course) => {
              const isLit = lit.has(course.slug);
              return (
                <li
                  key={course.slug}
                  className={cn(
                    "origin-left rounded-xl border p-3",
                    reduce ? "" : "transition-all duration-500 ease-out",
                    isLit
                      ? "border-line bg-paper/50 opacity-100"
                      : cn("border-line/50 bg-paper/20 opacity-30", !reduce && "scale-[0.97]")
                  )}
                >
                  <div className="flex items-baseline gap-2">
                    <span
                      className={cn(
                        "h-1.5 w-1.5 shrink-0 rounded-full",
                        TONE_DOT[course.tone]
                      )}
                      aria-hidden
                    />
                    <span
                      className={cn(
                        "font-display text-sm leading-snug",
                        isLit ? "text-ink" : "text-muted"
                      )}
                    >
                      {course.title}
                    </span>
                  </div>
                  <p
                    className={cn(
                      "mt-1 pl-3.5 text-xs",
                      isLit ? TONE_TEXT[course.tone] : "text-muted"
                    )}
                  >
                    {course.level} · {course.lessons.length} lessons
                  </p>
                </li>
              );
            })}
          </ul>

          <p className="mt-3 text-xs leading-relaxed text-muted">
            {done
              ? "All four are free, and you can take them in any order."
              : "Every course stays free. This only picks where to begin."}
          </p>
        </div>
      </div>
    </section>
  );
}

/** Same height and shape as the quiz, so the Suspense swap does not jump. */
export function CourseQuizFallback() {
  return (
    <section
      aria-hidden
      className="overflow-hidden rounded-3xl border border-line bg-surface"
    >
      <div className="h-1 w-full bg-gradient-to-r from-mint via-grape to-flame" />
      <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-[1fr_16rem] md:gap-10">
        <div className="min-w-0">
          <Eyebrow tone="accent">Not sure where to start</Eyebrow>
          <h2 className="font-display mt-3 text-2xl tracking-tight text-ink sm:text-3xl">
            Three questions, about twenty seconds.
          </h2>
          <div className="mt-8 space-y-2.5">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-16 rounded-2xl border border-line bg-paper/50"
              />
            ))}
          </div>
        </div>
        <div className="md:pt-1">
          <div className="mt-6 space-y-2">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-14 rounded-xl border border-line bg-paper/50"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
