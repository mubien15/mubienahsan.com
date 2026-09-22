import type { Tone } from "@/components/ui";

export type Project = {
  slug: string;
  name: string;
  tone: Tone;
  tagline: string;
  what: string;
  why: string;
  stack: string[];
  liveUrl?: string;
  liveLabel?: string;
  image?: string;
  /** Looping video shown inside the phone, with `image` as its poster. */
  video?: string;
  /** How to present the screenshot. Web apps get a browser window, things that
   *  live on your phone get a phone. Defaults to browser. */
  frame?: "browser" | "phone";
  /** Small caption under a phone screenshot, where a web project would show
   *  its domain. */
  imageNote?: string;
  status: "Live" | "Archived" | "In progress";
  lessons: string;
};

/**
 * Personal builds, with their purpose and the lessons from making them.
 */
export const PROJECTS: Project[] = [
  {
    slug: "northbound-notes",
    name: "Northbound Notes",
    tone: "accent",
    tagline: "A morning briefing that writes itself",
    what: "A daily email I use to start the morning: Toronto weather, news, developments in AI, and a small selection of stories worth a closer look. Built with AI to bring some structure to a noisy information feed.",
    why: "I was piecing together the morning from several different sources. I wanted one readable starting point, with enough context to decide what deserves more attention. It is the project I use every day.",
    stack: ["Claude Code", "Scheduled task", "Web search", "Gmail"],
    image: "/projects/northbound-notes-v2.webp",
    video: "/projects/northbound-notes.mp4",
    frame: "phone",
    imageNote: "A calmer start to the morning",
    status: "Live",
    lessons:
      "Editing is the product. Pulling the news in was the easy half. The hard half was deciding what to cut so the whole thing still reads in two minutes, and writing it so it sounds like a person rather than a feed.",
  },
  {
    slug: "fable",
    name: "Fable",
    tone: "flame",
    tagline: "An AI communication coach for hard conversations",
    what: "An AI communication coach for practising difficult conversations. Work through scenarios, try a different approach, and get feedback on your delivery.",
    why: "I wanted a place to rehearse a conversation before having it for real. Building Fable let me explore how personas, prompts, and feedback can make an AI interaction useful beyond an open chat box.",
    stack: ["Next.js", "TypeScript", "Anthropic API", "Vercel"],
    liveUrl: "https://scenariolab.quest",
    liveLabel: "scenariolab.quest",
    image: "/projects/fable.png",
    status: "Live",
    lessons:
      "The surrounding experience matters: the scenario, the instructions, and the way feedback is presented. A model-generated score is a prompt for reflection; its usefulness still needs to be judged against the conversation you actually want to have.",
  },
  {
    slug: "ai-governance-agent",
    name: "AI Governance Assessment Agent",
    tone: "grape",
    tagline: "Automated first pass AI risk and governance reviews",
    what: "An AI tool that asks questions about a system and drafts a structured governance assessment. It is a way to explore risks, missing information, and questions worth following up.",
    why: "I wanted to test whether AI could make an open-ended governance question easier to work through. The challenge is making its reasoning and gaps visible enough for a person to check.",
    stack: ["Next.js", "Anthropic API", "Vercel"],
    liveUrl: "https://ai-governance-agent-xi.vercel.app",
    liveLabel: "ai-governance-agent-xi.vercel.app",
    image: "/projects/ai-governance-agent.png",
    status: "Live",
    lessons:
      "A tidy assessment can look more certain than the evidence behind it. Clear questions, traceable inputs, and room to say that information is missing matter as much as the generated answer.",
  },
  {
    slug: "risk-register-agent",
    name: "GRC Risk Register Tool",
    tone: "mint",
    tagline: "A lightweight risk register that drafts itself",
    what: "An experiment that turns a plain-language risk description into a draft register entry, with fields for likelihood, impact, controls, and ownership.",
    why: "I wanted to explore how a small tool could make risk documentation easier to begin. The draft gives someone a structure to question and refine; it cannot establish the risk on its own.",
    stack: ["Python", "Anthropic API"],
    status: "In progress",
    lessons:
      "Constraints beat cleverness. A tight, opinionated schema produced far more useful output than an open ended 'assess this risk' prompt.",
  },
  {
    slug: "etsy-templates",
    name: "Notion & Productivity Templates",
    tone: "gold",
    tagline: "Digital templates sold on Etsy",
    what: "A small catalogue of Notion templates, including a YouTube workflow hub and productivity systems, packaged and sold as digital downloads.",
    why: "My first taste of shipping something people actually pay for. Low stakes, real feedback, and a crash course in positioning and digital product distribution.",
    stack: ["Notion", "Etsy"],
    status: "Live",
    lessons:
      "Distribution is a skill of its own. Making the thing is maybe half the work. Getting it in front of the right person is the other half.",
  },
];
