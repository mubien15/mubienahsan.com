"use client";

import { useState, type ReactNode } from "react";

/**
 * A styled terminal window for course lessons. Shows a command with a prompt
 * glyph and an optional block of expected output, plus a one tap copy button.
 * The dark chrome reads instantly as "a terminal" regardless of site theme.
 */
export function Terminal({
  title = "Terminal",
  command,
  output,
  prompt = "$",
}: {
  title?: string;
  command: string;
  output?: string;
  prompt?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can be blocked; fail quietly rather than throw.
    }
  };

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-[#2b2b36] bg-[#1b1b22] shadow-sm">
      <div className="flex items-center gap-2 border-b border-[#2b2b36] bg-[#23232d] px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-xs text-[#8b8b9a]">{title}</span>
        <button
          type="button"
          onClick={copy}
          className="ml-auto rounded-md border border-[#3a3a47] px-2.5 py-1 font-mono text-[11px] text-[#c7c7d4] transition-colors hover:bg-[#2f2f3b]"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="overflow-x-auto px-4 py-4 font-mono text-sm leading-relaxed">
        <div className="flex gap-2.5">
          <span className="select-none text-[#28c840]">{prompt}</span>
          <span className="whitespace-pre text-[#e8e8f0]">{command}</span>
        </div>
        {output ? (
          <pre className="mt-2 whitespace-pre-wrap text-[#9aa0b3]">{output}</pre>
        ) : null}
      </div>
    </div>
  );
}

/**
 * Interactive platform switcher so a reader sees only the steps for their own
 * operating system. Each platform is passed as a ready made block of JSX.
 */
export function PlatformTabs({
  mac,
  windows,
  linux,
}: {
  mac?: ReactNode;
  windows?: ReactNode;
  linux?: ReactNode;
}) {
  const tabs = [
    { key: "mac", label: "macOS", node: mac },
    { key: "windows", label: "Windows", node: windows },
    { key: "linux", label: "Linux", node: linux },
  ].filter((t) => t.node);

  const [active, setActive] = useState(tabs[0]?.key ?? "mac");

  return (
    <div className="my-6">
      <div className="flex gap-1.5">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setActive(t.key)}
            className={
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors " +
              (active === t.key
                ? "bg-mint-soft text-mint"
                : "text-muted hover:text-ink")
            }
          >
            {t.label}
          </button>
        ))}
      </div>
      <div>{tabs.find((t) => t.key === active)?.node}</div>
    </div>
  );
}
