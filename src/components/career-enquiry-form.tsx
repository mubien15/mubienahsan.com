"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

const FIELD = "mt-2 w-full rounded-xl border border-line bg-paper px-4 py-3 text-base text-ink outline-none transition-colors focus:border-accent-strong focus:ring-2 focus:ring-accent/20 disabled:opacity-60";

export function CareerEnquiryForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const data = new FormData(event.currentTarget);
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/career-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) {
        throw new Error(result.error || "Your enquiry could not be sent. Please try again or email me directly.");
      }
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error && err.name !== "TimeoutError" ? err.message : "The request timed out. Please try again or email me directly.");
      setStatus("error");
    }
  }

  return (
    <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
      <div role="status" aria-live="polite" aria-atomic="true">
        {status === "sent" && (
          <div className="rounded-2xl border border-mint/25 bg-mint-soft/50 p-6">
            <h3 className="font-display text-2xl text-ink">Your enquiry is on its way.</h3>
            <p className="mt-3 text-base leading-relaxed text-muted">Thanks for sharing what you are working towards. I&apos;ll reply to the email address you provided to discuss the next step.</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">You have not been added to a newsletter or charged for a session.</p>
          </div>
        )}
      </div>
      {status !== "sent" && (
        <form onSubmit={submit} className="space-y-5" aria-label="Career preparation enquiry">
          <p className="text-sm text-muted">All fields are required unless marked optional.</p>
          <fieldset disabled={status === "sending"} className="space-y-5">
            <legend className="sr-only">Your details and preparation needs</legend>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-base font-medium text-ink">Name
                <input name="name" autoComplete="name" required maxLength={100} className={FIELD} />
              </label>
              <label className="block text-base font-medium text-ink">Email
                <input name="email" type="email" autoComplete="email" required maxLength={254} className={FIELD} />
              </label>
            </div>
            <label className="block text-base font-medium text-ink">Where are you now?
              <span className="relative block">
                <select name="stage" required defaultValue="" className={`${FIELD} appearance-none pr-10`}>
                  <option value="" disabled>Select your stage</option>
                  <option value="student">Currently studying</option>
                  <option value="graduate">Recently graduated</option>
                  <option value="early-career">Early in my career</option>
                  <option value="other">Another stage</option>
                </select>
                <svg aria-hidden viewBox="0 0 20 20" fill="none" className="pointer-events-none absolute right-4 top-1/2 mt-1 h-4 w-4 -translate-y-1/2 text-muted"><path d="m5 7 5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </label>
            <label className="block text-base font-medium text-ink">What role are you targeting?
              <input name="targetRole" required maxLength={500} placeholder="Role title, employer, or a link to the job posting" className={FIELD} />
            </label>
            <label className="block text-base font-medium text-ink">What would you like help with?
              <textarea name="challenge" required minLength={10} maxLength={2000} rows={4} placeholder="Tell me what feels difficult and what you would like to be better prepared for." className={`${FIELD} resize-y`} />
            </label>
            <label className="block text-base font-medium text-ink">Application or interview date <span className="font-normal text-muted">(optional)</span>
              <input name="deadline" type="date" className={`${FIELD} min-w-0`} />
            </label>
            <div className="hidden" aria-hidden="true">
              <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
            </div>
          </fieldset>
          <p className="text-sm leading-relaxed text-muted">Please leave out confidential information. Your details are used to respond to this enquiry; submitting does not subscribe you to any mailing list. <Link href="/legal#career-enquiries" className="text-accent-strong underline underline-offset-4">How your enquiry is handled</Link>.</p>
          {status === "error" && <p role="alert" className="rounded-xl border border-flame/25 bg-flame-soft p-4 text-base text-flame">{error} You can also email <a href="mailto:hello@mubienahsan.com?subject=Career%20preparation%20pilot" className="break-all underline underline-offset-4">hello@mubienahsan.com</a>.</p>}
          <button type="submit" disabled={status === "sending"} className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-accent-strong px-6 py-3 text-base font-medium text-white transition-colors hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-strong disabled:cursor-wait disabled:opacity-60">
            {status === "sending" ? "Sending your enquiry…" : "Ask about the pilot"}
          </button>
          <p className="text-center text-sm text-muted">No payment or booking commitment.</p>
        </form>
      )}
    </div>
  );
}
