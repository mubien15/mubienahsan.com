"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  DISMISSED_KEY,
  SubscribeForm,
  writeFlag,
} from "@/components/subscribe-form";

/* Opened only when a reader asks for the guide. */

/** Dispatched on window to open the popup deliberately (e.g. the footer link). */
export const OPEN_SUBSCRIBE_EVENT = "mah:open-subscribe";

export function SubscribePopup() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const dismiss = useCallback(() => {
    writeFlag(DISMISSED_KEY);
    setOpen(false);
    restoreFocusRef.current?.focus?.();
  }, []);

  // The footer invitation opens the guide without interrupting reading.
  useEffect(() => {
    const onRequest = () => {
      restoreFocusRef.current = document.activeElement as HTMLElement | null;
      setOpen(true);
    };
    window.addEventListener(OPEN_SUBSCRIBE_EVENT, onRequest);
    return () => window.removeEventListener(OPEN_SUBSCRIBE_EVENT, onRequest);
  }, []);

  // Escape to close, and keep Tab inside the dialog. Without the trap, tabbing
  // walks out into the page behind and strands keyboard and screen reader users.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        dismiss();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([tabindex="-1"]), a[href]'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown, true);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, [open, dismiss]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) dismiss();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="subscribe-popup-title"
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-line bg-surface p-7 shadow-xl sm:p-9"
      >
        <div
          aria-hidden
          className="glow glow-gold pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full opacity-70"
        />

        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-xl leading-none text-muted transition-colors hover:bg-sunken hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          ×
        </button>

        <div className="relative">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Free guide
          </span>

          <h2
            id="subscribe-popup-title"
            className="font-display mt-3 text-2xl leading-tight text-ink sm:text-3xl"
          >
            Take The First Build with you
          </h2>

          <p className="prose-scale-sm mt-3 leading-relaxed text-muted">
            A step-by-step guide to the AI morning brief I actually use — no
            code, buildable in an evening. Tell me where to send it and it&apos;s
            yours.
          </p>

          <SubscribeForm source="popup" className="mt-6" autoFocus />

          <p className="mt-3 text-sm leading-relaxed text-muted">
            You&apos;ll also get new builds as I publish them. Free, always —
            unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
