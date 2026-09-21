"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { Pill, TONE_TEXT } from "@/components/ui";
import {
  OVERSIGHT_TESTS,
  OVERSIGHT_OPTIONS,
  OVERSIGHT_RESULTS,
  OVERSIGHT_CAVEAT,
  type OversightAnswer,
} from "@/content/autonomy";

/** The best band a system with any absent condition can reach. */
const CAP_MIN = 4;

/**
 * The Meaningful Human Oversight Test. Five questions about one use case,
 * answered yes / partly / no, producing a band rather than a score.
 *
 * Deliberately not a compliance tool. It runs entirely in the browser, keeps
 * nothing, and returns language that describes a condition rather than issuing
 * a verdict someone could wave at a regulator.
 *
 * Each question is a radiogroup so the whole thing is keyboard-operable, and
 * the result region is a live region so a screen reader hears it update.
 */

const FOCUS =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-grape focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

export function OversightTest() {
  const [answers, setAnswers] = useState<Record<string, OversightAnswer>>({});
  const reduce = useReducedMotion();

  const answered = OVERSIGHT_TESTS.filter((t) => answers[t.id]).length;
  const complete = answered === OVERSIGHT_TESTS.length;

  const { score, result, capped } = useMemo(() => {
    const score = OVERSIGHT_TESTS.reduce((sum, t) => {
      const a = answers[t.id];
      const opt = OVERSIGHT_OPTIONS.find((o) => o.id === a);
      return sum + (opt?.score ?? 0);
    }, 0);
    // The five conditions do not trade off against each other. The text says
    // a system can satisfy four and still fail, because the one it misses is
    // the one that mattered — and a plain total contradicts that, since it
    // lets strength elsewhere buy back a condition that is simply absent. So
    // a single "no" caps the outcome: however high the total, oversight with
    // a missing condition is not "possible" and is past "fragile".
    const answered = OVERSIGHT_TESTS.every((t) => answers[t.id]);
    const hasAbsent = OVERSIGHT_TESTS.some((t) => answers[t.id] === "no");
    const byScore = OVERSIGHT_RESULTS.find((r) => score >= r.min) ?? null;
    const capped = OVERSIGHT_RESULTS.find((r) => r.min === CAP_MIN) ?? byScore;
    const result =
      answered && hasAbsent && byScore && byScore.min > CAP_MIN ? capped : byScore;
    return { score, result, capped: answered && hasAbsent && byScore ? byScore.min > CAP_MIN : false };
  }, [answers]);

  const weakest = useMemo(
    () => OVERSIGHT_TESTS.filter((t) => answers[t.id] === "no"),
    [answers]
  );

  return (
    <div className="mt-8">
      <ol className="space-y-4">
        {OVERSIGHT_TESTS.map((t, i) => {
          const chosen = answers[t.id];
          return (
            <li
              key={t.id}
              className="rounded-2xl border border-line bg-surface p-5 sm:p-6"
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-grape">
                  {i + 1} · {t.name}
                </span>
              </div>
              <p
                className="mt-2 prose-scale-sm text-[1.05rem] font-medium leading-relaxed text-ink"
                id={`q-${t.id}`}
              >
                {t.question}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t.why}</p>

              <div
                role="radiogroup"
                aria-labelledby={`q-${t.id}`}
                className="mt-4 flex flex-wrap gap-2"
              >
                {OVERSIGHT_OPTIONS.map((o) => {
                  const selected = chosen === o.id;
                  return (
                    <button
                      key={o.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() =>
                        setAnswers((prev) => ({ ...prev, [t.id]: o.id }))
                      }
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm transition-colors",
                        FOCUS,
                        selected
                          ? "border-grape bg-grape text-white"
                          : "border-line bg-paper text-ink/80 hover:border-grape/60"
                      )}
                    >
                      {o.label}
                    </button>
                  );
                })}
              </div>

              {chosen === "no" || chosen === "partly" ? (
                <p className="mt-3 border-l-2 border-flame/50 pl-3 text-sm leading-relaxed text-muted">
                  <span className="font-medium text-ink">
                    What failing this looks like:{" "}
                  </span>
                  {t.failureLooks}
                </p>
              ) : null}
            </li>
          );
        })}
      </ol>

      <div aria-live="polite" className="mt-6">
        {complete && result ? (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-line bg-surface p-6 sm:p-8"
          >
            <div className="flex flex-wrap items-center gap-3">
              <Pill tone={result.tone}>Result</Pill>
              <span className="text-sm text-muted">
                {score} of {OVERSIGHT_TESTS.length * 2}
              </span>
            </div>
            <h3
              className={cn(
                "font-display mt-3 text-2xl leading-snug",
                TONE_TEXT[result.tone]
              )}
            >
              {result.verdict}
            </h3>
            {capped ? (
              <p className="mt-3 rounded-xl border border-line bg-paper/60 p-3 text-sm leading-relaxed text-muted">
                Your total alone would have placed this a band higher. It is
                held here because one of the five is answered no, and the five
                do not trade off against each other — strength in four cannot
                supply a condition that is simply absent.
              </p>
            ) : null}
            <p className="prose-scale-sm mt-3 leading-relaxed text-ink/85">{result.meaning}</p>
            <p className="prose-scale-sm mt-3 leading-relaxed text-ink/85">
              <span className="font-medium text-ink">What to do next: </span>
              {result.next}
            </p>

            {weakest.length ? (
              <p className="mt-4 border-t border-line pt-4 text-sm leading-relaxed text-muted">
                You answered no to{" "}
                <span className="font-medium text-ink">
                  {weakest.map((w) => w.name).join(", ")}
                </span>
                . Any single no is worth more attention than the total, because
                these five are not interchangeable — a system you cannot stop is
                not compensated for by one you understand well.
              </p>
            ) : null}

            <button
              type="button"
              onClick={() => setAnswers({})}
              className={cn(
                "mt-5 text-sm font-medium text-grape hover:underline",
                FOCUS
              )}
            >
              Start again
            </button>
          </motion.div>
        ) : (
          <p className="rounded-2xl border border-dashed border-line bg-surface/50 p-5 text-sm leading-relaxed text-muted">
            {answered === 0
              ? "Answer all five for a result. Pick one real system you are responsible for rather than a hypothetical one — the questions only bite when the answers have consequences."
              : `${OVERSIGHT_TESTS.length - answered} to go.`}
          </p>
        )}
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted">
        {OVERSIGHT_CAVEAT}
      </p>
    </div>
  );
}
