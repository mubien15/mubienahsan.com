"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ExecutionKitBuyLink } from "@/components/execution-kit-buy-link";
import { EXECUTION_KIT } from "@/lib/execution-kit";

export function ExecutionKitOffer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/55 p-3 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="execution-kit-offer-title"
        className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[1.75rem] border border-line bg-surface p-6 shadow-[0_30px_100px_rgba(36,26,16,0.3)] sm:p-9"
      >
        <button
          ref={closeButton}
          type="button"
          onClick={onClose}
          aria-label="Close offer"
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-paper text-xl leading-none text-muted transition-colors hover:border-accent/45 hover:text-accent"
        >
          ×
        </button>

        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          Take the review into execution
        </p>
        <h2
          id="execution-kit-offer-title"
          className="font-display mt-3 max-w-xl text-3xl leading-tight text-ink sm:text-4xl"
        >
          You have the first pass. Now build the evidence.
        </h2>
        <p className="mt-4 max-w-[62ch] text-base leading-7 text-muted">
          The {EXECUTION_KIT.name} turns this free review into an owned risk register,
          evaluation plan, framework and regulation applicability screen, launch gates,
          and a recorded decision.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            "Editable seven-tab Excel workbook",
            "11-page execution field guide",
            "NIST, ISO, OWASP, EU, and Canadian reference prompts",
            "Decision memo and 45-minute review agenda",
          ].map((item) => (
            <div
              key={item}
              className="flex gap-3 rounded-xl border border-line bg-paper/55 px-4 py-3 text-sm leading-6 text-ink/80"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mint" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="mt-7 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center">
          <ExecutionKitBuyLink className="sm:min-w-44" />
          <Link
            href="/launch-review/execution-kit"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent/45 hover:text-accent"
          >
            See everything inside
          </Link>
        </div>
        <p className="mt-3 text-xs leading-5 text-muted">
          One-time purchase. Immediate digital access. The applicability screen supports review;
          it does not make a legal determination.
        </p>
      </section>
    </div>
  );
}
