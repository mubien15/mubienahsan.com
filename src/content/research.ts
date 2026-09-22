import type { Tone } from "@/components/ui";
import {
  AGENTS_FEATURE,
  FLOW_STAGES,
  PUBLISHED_CONTROLS,
} from "@/content/agents";
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
    title: AGENTS_FEATURE.title,
    kind: "Flagship · Interactive framework",
    href: AGENTS_FEATURE.href,
    tone: "grape",
    question: AGENTS_FEATURE.question,
    summary: AGENTS_FEATURE.summary,
    meta: `${PUBLISHED_CONTROLS.length} controls · ${FLOW_STAGES.length} stages`,
    cta: AGENTS_FEATURE.cta,
  },
  {
    title: "When AI learns: what actually changes?",
    kind: "Explainer",
    href: "/research/learning-and-self-improvement",
    tone: "mint",
    question: "Does a better second answer mean the model learned? And when does an improvement loop become recursive?",
    summary: "A practical distinction between context, memory, training, and self-improvement. What each changes, where the limits are, and the checks I would want around a system that can change itself.",
    meta: "Concepts & open questions",
    cta: "Read the explainer",
  },
  {
    title: "The Oversight Threshold",
    kind: "Interactive framework",
    href: "/research/autonomy-governance",
    tone: "grape",
    question:
      "At what point does human oversight stop being meaningful, because the system has become too capable, fast or autonomous for a person to verify?",
    summary:
      "A conceptual framework for asking when a system becomes too fast, complex, or autonomous for its human review process. Five levels of autonomy mapped against eight governance dimensions, plus a test for whether human review is still doing real work or has quietly become a signature.",
    meta: `${LEVELS.length} levels · checked ${LAST_CHECKED}`,
    cta: "Open the framework",
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
