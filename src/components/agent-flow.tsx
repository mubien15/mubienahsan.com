"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { Pill } from "@/components/ui";
import { CONTROLS, FLOW_OVERLAY, FLOW_STAGES } from "@/content/agents";

/**
 * The path a purchase takes, with the controls pinned to the point each one
 * covers. Clicking a stage opens it below the rail; stages that map to a
 * published control link through to the full write-up.
 *
 * Built as a tablist so it works from the keyboard: arrows move between
 * stages, Home and End jump to the ends.
 */
export function AgentFlow() {
  const [active, setActive] = useState(1);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const reduce = useReducedMotion();

  const overlay = CONTROLS.find(
    (c) => c.slug === FLOW_OVERLAY.controlSlug && c.published
  );
  const stage = FLOW_STAGES[active];
  const control = stage.controlSlug
    ? CONTROLS.find((c) => c.slug === stage.controlSlug && c.published)
    : undefined;

  function move(to: number) {
    const next = (to + FLOW_STAGES.length) % FLOW_STAGES.length;
    setActive(next);
    buttons.current[next]?.focus();
  }

  function onKeyDown(event: React.KeyboardEvent) {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        move(active + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        move(active - 1);
        break;
      case "Home":
        event.preventDefault();
        move(0);
        break;
      case "End":
        event.preventDefault();
        move(FLOW_STAGES.length - 1);
        break;
    }
  }

  return (
    <div>
      {/* ---------- The rail ---------- */}
      <div
        role="tablist"
        aria-label="Stages of an agent purchase"
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
        className="relative"
      >
        {/* Horizontal on desktop, vertical on phones. */}
        <span
          aria-hidden
          className="absolute left-[calc(100%/14)] right-[calc(100%/14)] top-[13px] hidden h-px bg-line sm:block"
        />
        <ol className="relative flex snap-x gap-2 overflow-x-auto pb-2 sm:grid sm:grid-cols-7 sm:overflow-visible sm:pb-0">
          {FLOW_STAGES.map((item, i) => {
            const selected = i === active;
            const hasControl = Boolean(item.controlSlug);

            return (
              <li
                key={item.id}
                className="min-w-[7.5rem] snap-start sm:min-w-0"
              >
                <button
                  ref={(el) => {
                    buttons.current[i] = el;
                  }}
                  role="tab"
                  id={`flow-tab-${item.id}`}
                  aria-selected={selected}
                  aria-controls="flow-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={cn(
                    "group flex min-h-20 w-full flex-col items-center gap-2 rounded-xl px-2 py-2 text-center transition-colors",
                    "sm:min-h-0 sm:gap-2 sm:px-1",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grape",
                    selected ? "bg-grape-soft/60" : "hover:bg-grape-soft/40"
                  )}
                >
                  {/* Dot on the rail */}
                  <span className="relative z-10 flex h-[26px] w-[26px] shrink-0 items-center justify-center">
                    <span
                      className={cn(
                        "flex h-[26px] w-[26px] items-center justify-center rounded-full border-2 text-[10px] font-semibold transition-all",
                        selected
                          ? "border-grape bg-grape text-white"
                          : hasControl
                            ? "border-grape/50 bg-paper text-grape group-hover:border-grape"
                            : "border-line bg-paper text-muted group-hover:border-grape/40"
                      )}
                    >
                      {i + 1}
                    </span>
                  </span>

                  <span
                    className={cn(
                      "text-[0.8rem] font-medium leading-snug transition-colors",
                      selected
                        ? "text-grape"
                        : "text-muted group-hover:text-ink"
                    )}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* ---------- Runs under every step, so it is drawn under the rail ---------- */}
      {overlay ? (
        <Link
          href={`/agents/${overlay.slug}`}
          className="group mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-dashed border-grape/40 bg-grape-soft/25 px-4 py-3 transition-colors hover:border-grape/70 hover:bg-grape-soft/50"
        >
          <Pill tone="grape">{overlay.ref}</Pill>
          <span className="text-sm font-medium text-ink group-hover:text-grape">
            {FLOW_OVERLAY.label}
          </span>
          <span className="w-full text-sm leading-relaxed text-muted sm:w-auto sm:flex-1">
            {FLOW_OVERLAY.moment}
          </span>
          <span className="text-sm font-medium text-grape transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      ) : null}

      {/* ---------- The open stage ---------- */}
      <motion.div
        key={stage.id}
        id="flow-panel"
        role="tabpanel"
        aria-labelledby={`flow-tab-${stage.id}`}
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 rounded-2xl border border-line bg-surface p-6"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          Step {active + 1} of {FLOW_STAGES.length}
        </p>
        <p className="font-display mt-2 text-xl text-ink">{stage.label}</p>
        <p className="prose-scale-sm mt-2 leading-relaxed text-ink/80">{stage.moment}</p>
        <p className="prose-scale-sm mt-3 leading-relaxed text-ink/80">
          <span className="font-medium text-ink">What can go wrong: </span>
          {stage.risk}
        </p>

        {control ? (
          <div className="mt-5 rounded-xl border border-grape/30 bg-grape-soft/40 p-5">
            <div className="flex flex-wrap items-center gap-3">
              <Pill tone="grape">{control.ref}</Pill>
              <span className="font-display text-lg text-ink">
                {control.title}
              </span>
            </div>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/85">
              {control.summary}
            </p>
            <Link
              href={`/agents/${control.slug}`}
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-grape hover:underline"
            >
              Read the full control →
            </Link>
          </div>
        ) : (
          <p className="mt-5 rounded-xl border border-line bg-paper/60 p-5 text-sm leading-relaxed text-muted">
            No control sits on this step. It is where the other controls either pay off or
            turn out to have been missing.
          </p>
        )}

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
          <button
            onClick={() => setActive(active - 1)}
            disabled={active === 0}
            className="text-sm font-medium text-grape hover:underline disabled:cursor-default disabled:text-muted/50 disabled:no-underline"
          >
            ← {active === 0 ? "Start" : FLOW_STAGES[active - 1].label}
          </button>
          <button
            onClick={() => setActive(active + 1)}
            disabled={active === FLOW_STAGES.length - 1}
            className="text-right text-sm font-medium text-grape hover:underline disabled:cursor-default disabled:text-muted/50 disabled:no-underline"
          >
            {active === FLOW_STAGES.length - 1
              ? "End"
              : FLOW_STAGES[active + 1].label}{" "}
            →
          </button>
        </div>
      </motion.div>
    </div>
  );
}
