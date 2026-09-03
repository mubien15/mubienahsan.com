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
 * "Built With AI" showcase. Positioning: proof, not portfolio.
 * Someone with no CS degree built these on nights and weekends.
 */
export const PROJECTS: Project[] = [
  {
    slug: "northbound-notes",
    name: "Northbound Notes",
    tone: "accent",
    tagline: "A morning briefing that writes itself",
    what: "A daily email that is waiting for me before I start work. Toronto weather in plain language, the world news that actually matters, Canadian financial services headlines on rates, banks and AI adoption, what moved in AI, market movers like the Nasdaq and Nvidia, anything touching the consulting world I work in, and a conversation starter I can actually use that day.",
    why: "I was starting every morning stitching together five different sources, and still walking into meetings without a good opening line. This assembles the whole brief once, automatically, so I begin the day informed instead of catching up. It is the project I use most, because I use it every single day.",
    stack: ["Claude Code", "Scheduled task", "Web search", "Gmail"],
    image: "/projects/northbound-notes-v2.webp",
    video: "/projects/northbound-notes.mp4",
    frame: "phone",
    imageNote: "Delivered every morning, before work",
    status: "Live",
    lessons:
      "Editing is the product. Pulling the news in was the easy half. The hard half was deciding what to cut so the whole thing still reads in two minutes, and writing it so it sounds like a person rather than a feed.",
  },
  {
    slug: "fable",
    name: "Fable",
    tone: "flame",
    tagline: "An AI communication coach for hard conversations",
    what: "A web app that runs you through realistic workplace scenarios, like a tough client, a skeptical exec, or a difficult teammate, and coaches your delivery in real time, then scores it.",
    why: "I wanted to see how far a solo builder could take a genuinely useful AI product: real personas, tiered access, live feedback. It taught me more about shipping than any course.",
    stack: ["Next.js", "TypeScript", "Anthropic API", "Vercel"],
    liveUrl: "https://scenariolab.quest",
    liveLabel: "scenariolab.quest",
    image: "/projects/fable.png",
    status: "Live",
    lessons:
      "Building the whole loop, from auth to tiering to prompt design to evals, is where the real learning was. General chatbots can imitate the pitch. They cannot imitate having shipped it.",
  },
  {
    slug: "ai-governance-agent",
    name: "AI Governance Assessment Agent",
    tone: "grape",
    tagline: "Automated first pass AI risk and governance reviews",
    what: "An agent that interviews you about an AI system and produces a structured governance assessment, mapped to real frameworks, that a risk team can actually use as a starting point.",
    why: "Governance work is slow and repetitive at the intake stage, so an agent handles the first 80 percent and humans spend their time on judgment instead of boilerplate. The interesting constraint was making the output structured enough that a real team could pick it up and finish it.",
    stack: ["Next.js", "Anthropic API", "Vercel"],
    liveUrl: "https://ai-governance-agent-xi.vercel.app",
    liveLabel: "ai-governance-agent-xi.vercel.app",
    image: "/projects/ai-governance-agent.png",
    status: "Live",
    lessons:
      "Domain expertise is the moat. The value was not the model. It was knowing which questions a real assessment has to ask and how to structure the output.",
  },
  {
    slug: "risk-register-agent",
    name: "GRC Risk Register Tool",
    tone: "mint",
    tagline: "A lightweight risk register that drafts itself",
    what: "A tool for governance, risk and compliance teams that turns a plain description of a risk into a properly structured register entry, with likelihood, impact, controls and owner.",
    why: "Small teams live in spreadsheets. I wanted to see if an agent could remove the blank page problem of risk documentation without forcing anyone into heavyweight GRC software.",
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
