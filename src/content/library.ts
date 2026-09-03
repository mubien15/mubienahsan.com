import type { Tone } from "@/components/ui";

export type Certification = {
  name: string;
  issuer: string;
  status: "Completed" | "Studying" | "Researching";
  tone: Tone;
  note: string;
};

export type BookNote = {
  title: string;
  author: string;
  tone: Tone;
  take: string;
  /** Link to read the piece, when it is available to read. */
  href?: string;
  /** True when this is my own writing rather than a take on someone else's. */
  own?: boolean;
};

/** Curated learning paths: what I actually took, what it cost, was it worth it. */
export const CERTIFICATIONS: Certification[] = [
  {
    name: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    status: "Completed",
    tone: "mint",
    note: "Where to start. It lays down the core mental models for working with AI fluently, before you touch a single tool. Free and genuinely worth the time.",
  },
  {
    name: "AI Fluency for Builders",
    issuer: "Anthropic",
    status: "Completed",
    tone: "flame",
    note: "The clearest mental model I have found for working with AI deliberately rather than reactively. Free, short, and worth it for anyone starting out.",
  },
  {
    name: "Certified in Auditing Generative AI",
    issuer: "ISACA",
    status: "Completed",
    tone: "grape",
    note: "A rigorous look at how you actually assess an AI system rather than admire it. Practical if you sit anywhere near governance, audit, or compliance.",
  },
  {
    name: "Ethical & Regulatory Implications of Generative AI",
    issuer: "Microsoft",
    status: "Completed",
    tone: "gold",
    note: "A clear look at the ethical and regulatory questions that come with generative AI. A good grounding for anyone who wants to build or deploy it responsibly.",
  },
  {
    name: "Programming with Python: The Fundamentals",
    issuer: "University of Toronto",
    status: "Completed",
    tone: "accent",
    note: "A proper grounding in Python, the language most AI tools are built on. Reading and writing a little of it yourself makes everything you build with AI feel less like a black box.",
  },
];

export const BOOKS: BookNote[] = [
  {
    title: "The Verification Gap",
    author: "Mubien Ahsan",
    tone: "accent",
    own: true,
    href: "/essays/the-verification-gap.pdf",
    take: "My own essay on whether independent assurance can actually make AI trustworthy to the institutions now betting on it. I argue that AI auditing sits roughly where financial control attestation stood in 2003, and that four unsolved problems decide whether it becomes a real discipline or a rubber stamp: what you measure against, what counts as evidence, who is qualified to judge, and whether the auditor is truly independent. Built on OSFI's model risk guideline, the EU AI Act and ISO 42001 rather than on opinion.",
  },
  {
    title: "The Untethered Soul",
    author: "Michael A. Singer",
    tone: "grape",
    take: "Singer's argument is that the voice narrating your life is not you, it is just something you can notice and stop obeying. That one idea changed how I handle a busy head, which turns out to matter as much for building things as any technical skill. The least technical book on this page and probably the one I have used most.",
  },
  {
    title: "Find Your Why",
    author: "Simon Sinek",
    tone: "flame",
    take: "The practical companion to Start With Why: less manifesto, more workbook, with an actual process for pulling your purpose out of your own stories rather than inventing a slogan. It gave me the words for what this site is for, which is why the About page reads the way it does. Useful if you can explain what you do but go vague on why.",
  },
  {
    title: "Empire of AI",
    author: "Karen Hao",
    tone: "mint",
    take: "Hao reported inside OpenAI and the wider industry for years, and the result reads less like a technology book than an account of how power and money concentrate. The chapters on the data workers behind the models, and on what these systems consume, are the ones I have not been able to unsee. Uncomfortable if you are enthusiastic about AI, which is exactly why it earns a place here.",
  },
  {
    title: "Feel Good Productivity",
    author: "Ali Abdaal",
    tone: "flame",
    take: "Abdaal's claim is that feeling good is not the reward for being productive but the source of it, and he builds that into energizers, unblockers and sustainers instead of a lecture about discipline. I do not buy every study he cites, but it reframed evening projects as something to enjoy rather than grind through, and that reframe is the only reason this site exists.",
  },
  {
    title: "The Adolescence of Technology (essay)",
    author: "Dario Amodei",
    tone: "gold",
    href: "https://darioamodei.com/essay/the-adolescence-of-technology",
    take: "Amodei's January 2026 follow up to Machines of Loving Grace. Where that essay made the case for the upside, this one walks through the risks: misuse, misalignment, authoritarian power and economic disruption. What makes it worth your time is that he refuses both doom and cheerleading, and then puts an actual plan on the table. I am not convinced by every prediction, especially the timelines, but it is the most serious writing on this I have read.",
  },
];
