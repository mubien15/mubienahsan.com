import type { ReactNode } from "react";

/**
 * Static presentational blocks for course lessons: coloured callouts, a "before
 * you start" checklist, a plain English request bubble, and a mock Claude Code
 * session that shows the describe then approve then result loop, including the
 * permission prompt a real beginner will actually see.
 */

type CalloutType = "tip" | "note" | "warning" | "important";

const CALLOUT_STYLES: Record<
  CalloutType,
  { wrap: string; label: string; icon: string; heading: string }
> = {
  tip: {
    wrap: "border-mint/40 bg-mint-soft/40",
    label: "text-mint",
    icon: "💡",
    heading: "Tip",
  },
  note: {
    wrap: "border-grape/40 bg-grape-soft/40",
    label: "text-grape",
    icon: "📝",
    heading: "Good to know",
  },
  warning: {
    wrap: "border-gold/50 bg-gold-soft/40",
    label: "text-gold",
    icon: "⚠️",
    heading: "Heads up",
  },
  important: {
    wrap: "border-flame/40 bg-flame-soft/40",
    label: "text-flame",
    icon: "❗",
    heading: "Important",
  },
};

export function Callout({
  type = "tip",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}) {
  const s = CALLOUT_STYLES[type];
  return (
    <div className={`my-6 rounded-2xl border p-5 ${s.wrap}`}>
      <p
        className={`mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider ${s.label}`}
      >
        <span aria-hidden>{s.icon}</span>
        {title ?? s.heading}
      </p>
      <div className="text-[1.02rem] leading-7 text-ink/85 [&>p]:my-0 [&_a]:font-medium [&_a]:text-accent [&_a]:underline">
        {children}
      </div>
    </div>
  );
}

export function Checklist({
  title,
  items,
}: {
  title?: string;
  items: string[];
}) {
  return (
    <div className="my-6 rounded-2xl border border-line bg-surface p-6">
      {title ? <p className="mb-3 font-semibold text-ink">{title}</p> : null}
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-ink/85">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint-soft text-mint">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 6L9 17l-5-5"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="leading-7">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PromptToClaude({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 rounded-2xl border border-accent/25 bg-accent-soft/40 p-5">
      <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent-strong">
        <span aria-hidden>💬</span>
        You, in plain words
      </p>
      <div className="text-[1.05rem] italic leading-7 text-ink/85 [&>p]:my-0">
        {children}
      </div>
    </div>
  );
}

/**
 * A mock of a real Claude Code session. Not a screenshot: a faithful, styled
 * recreation so a learner recognises the flow, especially the approval step,
 * before they ever open the terminal.
 */
export function ClaudeSession() {
  return (
    <div className="my-8 overflow-hidden rounded-xl border border-[#2b2b36] bg-[#1b1b22] font-mono text-[13px] leading-relaxed shadow-sm">
      <div className="flex items-center gap-2 border-b border-[#2b2b36] bg-[#23232d] px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-xs text-[#8b8b9a]">claude</span>
      </div>

      <div className="space-y-3 overflow-x-auto px-4 py-4">
        {/* Your request */}
        <div className="text-[#e8e8f0]">
          <span className="select-none text-[#f2a25c]">&gt; </span>
          Create a page called index.html that says &ldquo;Hello, I&apos;m
          learning to build with AI&rdquo; as a big heading.
        </div>

        {/* Claude's plan */}
        <div className="text-[#9aa0b3]">
          <span className="text-[#7c9cff]">Claude</span> I&apos;ll create{" "}
          <span className="text-[#e8e8f0]">index.html</span> with that heading and
          a light background.
        </div>

        {/* The permission prompt: the key thing to recognise */}
        <div className="rounded-md border border-[#3a3a47] bg-[#15151b] p-3">
          <div className="text-[#c7c7d4]">Create file index.html?</div>
          <div className="mt-2 space-y-0.5">
            <div className="text-[#28c840]">❯ 1. Yes</div>
            <div className="text-[#8b8b9a]">&nbsp;&nbsp;2. No, tell Claude what to change</div>
          </div>
        </div>

        {/* Result */}
        <div className="text-[#9aa0b3]">
          <span className="text-[#28c840]">✔</span> Created{" "}
          <span className="text-[#e8e8f0]">index.html</span>. Open it in your
          browser to see it.
        </div>
      </div>
    </div>
  );
}
