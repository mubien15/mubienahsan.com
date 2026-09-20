import type { Tone } from "@/components/ui";
import { PUBLISHED_CONTROLS } from "@/content/agents";
import { LAST_CHECKED, LEVELS } from "@/content/autonomy";

/**
 * Original work, as distinct from things built (/projects) and things read
 * (/library). Each entry is an argument rather than an artefact.
 */
export type ResearchItem = {
  title: string;
  /** What kind of thing this is, in three or four words. */
  kind: string;
  href: string;
  external?: boolean;
  tone: Tone;
  question: string;
  summary: string;
  meta: string;
  cta: string;
};

export const RESEARCH: ResearchItem[] = [
  {
    title: "The Oversight Threshold",
    kind: "Interactive framework",
    href: "/research/autonomy-governance",
    tone: "grape",
    question:
      "At what point does human oversight stop being meaningful, because the system has become too capable, fast or autonomous for a person to verify?",
    summary:
      "As autonomy rises, the ability of a person to independently verify a system falls — so governance has to intensify before the two cross. Five levels of autonomy mapped against eight governance dimensions, plus a test for whether human review is still doing real work or has quietly become a signature.",
    meta: `${LEVELS.length} levels · checked ${LAST_CHECKED}`,
    cta: "Open the framework",
  },
  {
    title: "Agents that spend",
    kind: "Control framework",
    href: "/agents",
    tone: "grape",
    question:
      "AI agents are starting to buy things for people. What were they actually allowed to buy?",
    summary:
      "The payment protocols settled how an agent pays and left open what it was permitted to buy. Agency law has spent centuries on exactly that question, and the vocabulary is sitting there unused. This is a control framework built on it — a failure nobody can argue with, the principle that already governs it, the control to build, and the evidence that proves it ran.",
    meta: `${PUBLISHED_CONTROLS.length} controls · checked ${PUBLISHED_CONTROLS[0]?.lastChecked ?? ""}`,
    cta: "Read the controls",
  },
  {
    title: "The Verification Gap",
    kind: "Essay",
    href: "/essays/the-verification-gap.pdf",
    external: true,
    tone: "accent",
    question:
      "Can independent assurance actually make AI trustworthy to the institutions now betting on it?",
    summary:
      "AI auditing sits roughly where financial control attestation stood in 2003, and four unsolved problems decide whether it becomes a real discipline or a rubber stamp: what you measure against, what counts as evidence, who is qualified to judge, and whether the auditor is genuinely independent. Built on OSFI's model risk guideline, the EU AI Act and ISO 42001 rather than on opinion.",
    meta: "PDF",
    cta: "Read the essay",
  },
];
