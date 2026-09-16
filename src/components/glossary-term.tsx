"use client";

import { useEffect, useId, useRef, useState } from "react";
import { GLOSSARY } from "@/content/agents";

/**
 * Renders a paragraph, turning [[marked terms]] into buttons that reveal a
 * one-line gloss. Written so the prose still reads correctly with JavaScript
 * off: the term is plain text and the definition simply is not offered.
 */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[\[[^\]]+\]\])/g);
  return (
    <>
      {parts.map((part, i) => {
        const match = /^\[\[([^\]]+)\]\]$/.exec(part);
        if (!match) return <span key={i}>{part}</span>;
        return <Term key={i} label={match[1]} />;
      })}
    </>
  );
}

function Term({ label }: { label: string }) {
  const [open, setOpen] = useState(false);
  const [shift, setShift] = useState(0);
  const wrap = useRef<HTMLSpanElement>(null);
  const card = useRef<HTMLSpanElement>(null);
  const id = useId();

  // The marker carries the display text; the lookup is case-insensitive so a
  // term can start a sentence without needing a second glossary entry.
  const definition = GLOSSARY[label.toLowerCase()];

  useEffect(() => {
    if (!open) return;
    function onDocPointer(e: MouseEvent) {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    // Anchored to an inline word, the card can run off the right of a narrow
    // screen. Measure once it is up and slide it back inside the gutter.
    function place() {
      const el = card.current;
      if (!el) return;
      const GUTTER = 16;
      const prev = el.style.transform;
      el.style.transform = "none";
      const box = el.getBoundingClientRect();
      el.style.transform = prev;
      const overflowRight = box.right - (window.innerWidth - GUTTER);
      const overflowLeft = GUTTER - box.left;
      if (overflowRight > 0) setShift(-overflowRight);
      else if (overflowLeft > 0) setShift(overflowLeft);
      else setShift(0);
    }
    place();

    document.addEventListener("mousedown", onDocPointer);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", place);
    return () => {
      document.removeEventListener("mousedown", onDocPointer);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", place);
    };
  }, [open]);

  if (!definition) return <>{label}</>;

  return (
    <span ref={wrap} className="relative inline-block">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        onClick={() => setOpen((v) => !v)}
        className="cursor-help border-b border-dotted border-grape/70 text-inherit decoration-from-font hover:border-solid hover:text-grape focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grape"
      >
        {label}
      </button>
      {open ? (
        <span
          ref={card}
          id={id}
          role="note"
          style={shift ? { transform: `translateX(${shift}px)` } : undefined}
          className="absolute left-0 top-[calc(100%+0.4rem)] z-30 block w-[min(20rem,calc(100vw-2.5rem))] rounded-xl border border-grape/30 bg-surface p-4 text-[0.9rem] font-normal leading-relaxed text-ink/85 shadow-lg"
        >
          <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-grape">
            {label}
          </span>
          {definition}
        </span>
      ) : null}
    </span>
  );
}
