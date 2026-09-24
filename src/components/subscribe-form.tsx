"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

/*
  The one email capture form, used by both the inline band on the home page and
  the popup. Keeping it in a single component means the two can never drift
  apart in copy, validation, or behaviour.
*/

export const SUBSCRIBED_KEY = "mah_subscribed";
export const DISMISSED_KEY = "mah_popup_dismissed";

// localStorage throws in Safari private mode and behind some cookie blockers,
// so every access is guarded. A capture form must never be the reason a page
// breaks — worst case we ask someone twice.
export function readFlag(key: string): boolean {
  try {
    return !!window.localStorage.getItem(key);
  } catch {
    return false;
  }
}

export function writeFlag(key: string, value = "1") {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function SubscribeForm({
  source,
  className,
  autoFocus = false,
  onSuccess,
  submitLabel = "Send me the guide",
}: {
  /** Recorded on the contact in Brevo, so you can see which placement works. */
  source: "home-band" | "popup" | "launch-review";
  className?: string;
  autoFocus?: boolean;
  onSuccess?: () => void;
  submitLabel?: string;
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;

    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setError("Please enter a valid email address.");
      return;
    }

    setState("sending");
    setError("");

    // The honeypot is read straight off the form rather than held in state:
    // React never re-renders for it, and bots fill the DOM node directly.
    const form = event.currentTarget;
    const honeypot = (form.elements.namedItem("website") as HTMLInputElement)?.value ?? "";

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value, source, website: honeypot }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.success) {
        throw new Error(typeof data.error === "string" ? data.error : "");
      }
      writeFlag(SUBSCRIBED_KEY, value);
      setState("done");
      onSuccess?.();
    } catch (err) {
      setState("idle");
      setError(
        (err instanceof Error && err.message) || "Something went wrong. Please try again."
      );
    }
  }

  if (state === "done") {
    return (
      <p
        role="status"
        className={cn(
          "rounded-2xl border border-mint/30 bg-mint-soft/60 px-5 py-4 leading-relaxed text-ink",
          className
        )}
      >
        <span className="font-medium">Check your inbox.</span> Click the
        confirmation link and The First Build is yours. It should land within a
        minute — <span className="font-medium">if it isn&apos;t there, check
        your spam folder</span>, since I&apos;m a new sender and filters are
        cautious at first.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={cn("w-full", className)}>
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <label htmlFor={`email-${source}`} className="sr-only">
          Email address
        </label>
        <input
          id={`email-${source}`}
          type="email"
          name="email"
          value={email}
          autoFocus={autoFocus}
          autoComplete="email"
          placeholder="you@example.com"
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? `error-${source}` : undefined}
          className="min-w-0 flex-1 rounded-full border border-line bg-surface px-5 py-2.5 text-sm text-ink transition-colors placeholder:text-muted/70 focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        />

        {/* Hidden from people, irresistible to bots. Out of the tab order and
            never autofilled, so a real visitor cannot trip it by accident. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="pointer-events-none absolute left-[-9999px] h-px w-px opacity-0"
        />

        <button
          type="submit"
          disabled={state === "sending"}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-accent-strong disabled:translate-y-0 disabled:opacity-60"
        >
          {state === "sending" ? "Sending…" : submitLabel}
        </button>
      </div>

      {error ? (
        <p id={`error-${source}`} role="alert" className="mt-2.5 text-sm text-accent-strong">
          {error}
        </p>
      ) : null}
    </form>
  );
}
