"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { Pill } from "@/components/ui";
import { LEVELS, DIMENSIONS, type DimensionId } from "@/content/autonomy";

/**
 * The five-level matrix. A selector rail picks a level; the panel below shows
 * what changes at that level, and the eight governance dimensions expand in
 * place rather than forcing a wide table.
 *
 * Deliberately not a table: a five-by-eight grid is unreadable on a phone, and
 * the interesting comparison is down a single level rather than across a row.
 *
 * Accessibility: the rail is a tablist driven by arrow keys, Home and End; the
 * dimension rows are buttons with aria-expanded against the panel they open.
 * Weight is shown as a number and a word as well as a bar, so nothing depends
 * on colour or on reading a shape.
 */

const FOCUS =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-grape focus-visible:ring-offset-2 focus-visible:ring-offset-paper";

const WEIGHT_WORD = ["", "Light", "Moderate", "Substantial", "Heavy", "Maximal"];

function WeightBar({ weight }: { weight: number }) {
  return (
    <span className="flex items-center gap-2">
      <span className="flex gap-0.5" aria-hidden>
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className={cn(
              "h-1.5 w-4 rounded-full",
              n <= weight ? "bg-grape" : "bg-line"
            )}
          />
        ))}
      </span>
      <span className="text-xs font-medium text-muted">
        {WEIGHT_WORD[weight]}
      </span>
    </span>
  );
}

function Block({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
        {title}
      </h4>
      <ul className="mt-2 space-y-1.5">
        {items.map((t) => (
          <li
            key={t}
            className="flex gap-2.5 text-[0.95rem] leading-relaxed text-ink/85"
          >
            <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-grape" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AutonomyMatrix() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<DimensionId | null>(null);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduce = useReducedMotion();

  const level = LEVELS[active];

  function move(to: number) {
    const next = (to + LEVELS.length) % LEVELS.length;
    setActive(next);
    setOpen(null);
    tabs.current[next]?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const k = e.key;
    if (k === "ArrowRight" || k === "ArrowDown") {
      e.preventDefault();
      move(active + 1);
    } else if (k === "ArrowLeft" || k === "ArrowUp") {
      e.preventDefault();
      move(active - 1);
    } else if (k === "Home") {
      e.preventDefault();
      move(0);
    } else if (k === "End") {
      e.preventDefault();
      move(LEVELS.length - 1);
    }
  }

  return (
    <div className="mt-8">
      <div
        role="tablist"
        aria-label="Autonomy levels"
        onKeyDown={onKeyDown}
        className="grid gap-2 sm:grid-cols-5"
      >
        {LEVELS.map((l, i) => {
          const selected = i === active;
          return (
            <button
              key={l.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`level-tab-${l.id}`}
              aria-selected={selected}
              aria-controls="level-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => {
                setActive(i);
                setOpen(null);
              }}
              className={cn(
                "flex flex-col rounded-xl border p-3 text-left transition-colors",
                FOCUS,
                selected
                  ? "border-grape bg-grape-soft"
                  : "border-line bg-surface hover:border-grape/50"
              )}
            >
              <span
                className={cn(
                  "text-xs font-semibold uppercase tracking-wider",
                  selected ? "text-grape" : "text-muted"
                )}
              >
                Level {l.id}
              </span>
              <span
                className={cn(
                  "font-display mt-1 text-[0.95rem] leading-snug",
                  selected ? "text-ink" : "text-ink/80"
                )}
              >
                {l.name}
              </span>
            </button>
          );
        })}
      </div>

      <motion.div
        key={level.id}
        id="level-panel"
        role="tabpanel"
        aria-labelledby={`level-tab-${level.id}`}
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="mt-5 rounded-2xl border border-line bg-surface p-6 sm:p-8"
      >
        <div className="flex flex-wrap items-center gap-3">
          <Pill tone="grape">Level {level.id}</Pill>
          {level.scenario ? <Pill tone="flame">Scenario, not a claim</Pill> : null}
        </div>
        <h3 className="font-display mt-3 text-2xl text-ink">{level.name}</h3>
        <p className="mt-1 text-[1.05rem] leading-relaxed text-grape">
          {level.tagline}
        </p>

        {level.scenario ? (
          <p className="mt-4 rounded-xl border border-flame/30 bg-flame-soft/40 p-4 text-sm leading-relaxed text-ink/85">
            Level 5 is a stress test for the framework above, not a description
            of a system that exists. It is here to answer one question: if the
            controls at levels 1 to 4 depend on a person being able to verify
            the system, what is left when that stops being possible?
          </p>
        ) : null}

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
              What the system does
            </h4>
            <p className="mt-2 max-w-prose leading-relaxed text-ink/85">{level.machineDoes}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
              What the human still does
            </h4>
            <p className="mt-2 max-w-prose leading-relaxed text-ink/85">{level.humanDoes}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <Block title="Examples" items={level.examples} />
          <Block title="What goes wrong" items={level.failures} />
          <Block title="Controls this level needs" items={level.controls} />
          <Block title="Evidence the controls ran" items={level.evidence} />
          <Block title="What has to be true" items={level.assumptions} />
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
              What moves it up a level
            </h4>
            <p className="mt-2 max-w-prose leading-relaxed text-ink/85">{level.escalation}</p>
          </div>
        </div>

        <div className="mt-8 border-t border-line pt-6">
          <h4 className="font-display text-lg text-ink">
            Governance intensity by dimension
          </h4>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            Eight dimensions, rated for this level. Open one to see what it
            means here.
          </p>

          <ul className="mt-4 divide-y divide-line border-t border-line">
            {DIMENSIONS.map((d) => {
              const state = level.dimensions[d.id];
              const isOpen = open === d.id;
              return (
                <li key={d.id}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`dim-${level.id}-${d.id}`}
                    onClick={() => setOpen(isOpen ? null : d.id)}
                    className={cn(
                      "flex w-full flex-wrap items-center gap-x-4 gap-y-2 py-3.5 text-left transition-colors hover:text-grape",
                      FOCUS
                    )}
                  >
                    <span className="flex-1 text-[0.95rem] font-medium text-ink">
                      {d.name}
                    </span>
                    <WeightBar weight={state.weight} />
                    <span aria-hidden className="text-muted">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen ? (
                    <div
                      id={`dim-${level.id}-${d.id}`}
                      className="pb-4 pr-6"
                    >
                      <p className="text-sm italic leading-relaxed text-muted">
                        {d.asks}
                      </p>
                      <p className="mt-2 max-w-prose leading-relaxed text-ink/85">
                        {state.text}
                      </p>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
