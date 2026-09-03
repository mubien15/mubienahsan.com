"use client";

import { OPEN_SUBSCRIBE_EVENT } from "@/components/subscribe-popup";

/*
  Opens the subscribe popup on demand.

  The popup asks once and then stays quiet forever, which is right for an
  interruption but leaves no way back for someone who dismissed it and later
  changed their mind. This is that way back, so a deliberate click ignores the
  suppression the timed popup respects.
*/
export function SubscribeLink({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_SUBSCRIBE_EVENT))}
      className="text-left text-ink/80 transition-colors hover:text-accent"
    >
      {children}
    </button>
  );
}
