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
  /** Internal product route when the build lives on this site. */
  internalUrl?: string;
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
  caseStudy?: {
    context: string;
    approach: string;
    decisions: { title: string; body: string }[];
    limits: string[];
    next: string[];
  };
};

/**
 * Personal builds, with their purpose and the lessons from making them.
 */
export const PROJECTS: Project[] = [
  {
    slug: "ai-launch-review",
    name: "AI Launch Review",
    tone: "grape",
    tagline: "Turn an AI idea into a launch decision you can test",
    what: "An interactive product review that turns a system description into explicit claims, boundary tests, evidence requirements, and launch gates. The output is designed to be challenged, checked, and exported.",
    why: "AI product reviews often begin with broad promises and end with polished documents. I wanted to move the hard part earlier: define what must be true, how it will be tested, and who needs to see the evidence before launch.",
    stack: ["Next.js", "TypeScript", "Decision rules", "Evaluation design"],
    internalUrl: "/launch-review",
    liveLabel: "Try the launch review",
    image: "/projects/ai-launch-review.png",
    status: "Live",
    lessons:
      "A useful review should make claims falsifiable. The product becomes more trustworthy when its decision rules and limitations are visible, and when the output names evidence rather than manufacturing confidence.",
    caseStudy: {
      context:
        "Teams can describe an AI feature as helpful, accurate, or safe without agreeing on what any of those claims would look like in a test. The gap appears later, when a launch review has to connect the product promise to system boundaries, evaluation evidence, and operational ownership.",
      approach:
        "The prototype asks for the intended use, autonomy, data sensitivity, possible actions, human review model, success condition, and primary concern. Transparent rules then assemble a draft claims register, evaluation pack, evidence checklist, and set of launch gates. The result can be edited and exported as Markdown.",
      decisions: [
        {
          title: "Start with the product claim",
          body: "A review needs a specific user, task, and consequence. The tool avoids a generic AI risk score and instead asks what the team intends to put into the world.",
        },
        {
          title: "Keep the first engine inspectable",
          body: "The public prototype uses explicit decision rules rather than an opaque model call. That keeps the relationship between an input and a proposed control visible while the evaluation method is still being tested.",
        },
        {
          title: "Export decisions, not decoration",
          body: "The useful artifact is a portable review with claims, pass conditions, test cases, owners, and open questions. It should be usable in a repository or product review after the browser tab closes.",
        },
      ],
      limits: [
        "The prototype does not inspect the product or execute the generated evaluation cases.",
        "Its output depends on the completeness and accuracy of the system description entered by the user.",
        "The suggested controls are decision support, not a safety certification or legal determination.",
      ],
      next: [
        "Allow teams to attach traces, test results, and review records to each launch claim.",
        "Benchmark generated test packs against reviews produced by experienced AI product and risk practitioners.",
        "Add specialized packs for agentic commerce, customer support, and multi-agent delegation.",
      ],
    },
  },
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
    caseStudy: {
      context:
        "The problem was not access to information. It was beginning each morning with too many sources, no clear order, and no reliable stopping point. I wanted one short briefing that could tell me what happened, preserve the source trail, and leave me to decide what deserved a deeper read.",
      approach:
        "A scheduled workflow gathers a small set of recurring inputs, researches the day, drafts a briefing, and delivers it by email. The format is deliberately constrained: local context first, then important developments, then a short selection rather than an exhaustive feed. I use the result myself, which makes weak selection and awkward writing visible quickly.",
      decisions: [
        {
          title: "Constrain the output",
          body: "A fixed structure and short reading time create a real editorial standard. More stories would make the automation look busier while making the product less useful.",
        },
        {
          title: "Keep sources close",
          body: "A summary is only useful when I can inspect the underlying reporting. The briefing is a map into the news, not a replacement for it.",
        },
        {
          title: "Treat tone as part of quality",
          body: "A technically correct feed can still be exhausting. The draft has to sound like a calm briefing rather than a pile of search results stitched together.",
        },
      ],
      limits: [
        "Selection is subjective and can reflect the biases of the sources and instructions.",
        "A fluent summary can still omit context or state a claim too confidently.",
        "Daily personal use is useful feedback, but it is not evidence that the format works for a wider audience.",
      ],
      next: [
        "Record which items lead to a deeper read and which are consistently skipped.",
        "Add clearer handling for disagreement between sources.",
        "Test whether a second reader would make the same keep-or-cut decisions.",
      ],
    },
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
    caseStudy: {
      context:
        "Difficult conversations are often hard to practise. A blank chatbot gives the user no stakes, no consistent counterpart, and no useful way to reflect on what happened. I wanted to see whether a structured simulation could make rehearsal feel specific enough to be useful.",
      approach:
        "Fable gives each session a scenario, a role for the simulated counterpart, and a clear objective for the user. The model stays inside that situation during the conversation and then produces feedback. The product wraps the model in a deliberate experience instead of treating an open chat box as the product.",
      decisions: [
        {
          title: "Start with a situation",
          body: "A named relationship, source of tension, and desired outcome give the conversation something concrete to push against.",
        },
        {
          title: "Separate simulation from reflection",
          body: "The counterpart should behave like a person in the moment. Feedback belongs after the exchange, when the user can step out of the scene and examine it.",
        },
        {
          title: "Avoid pretending the score is objective",
          body: "Model feedback is a prompt for reflection, not a validated assessment of communication skill. The interface and language need to preserve that distinction.",
        },
      ],
      limits: [
        "The feedback rubric has not been validated against expert coaching or real-world outcomes.",
        "A simulated counterpart cannot reproduce the history, emotion, or consequences of a real relationship.",
        "Users may give undue weight to confident feedback produced by the model.",
      ],
      next: [
        "Compare feedback across repeated runs of the same conversation.",
        "Ask communication practitioners to critique the feedback rubric.",
        "Test whether users can name a concrete change they would make in the real conversation.",
      ],
    },
  },
  {
    slug: "ai-governance-agent",
    name: "AI Governance Assessment Agent",
    tone: "grape",
    tagline: "Automated first pass AI risk and governance reviews",
    what: "An AI tool that reviews supplied system documentation against a selected governance framework and drafts a structured assessment. It surfaces risks, missing information, and questions worth following up.",
    why: "I wanted to test whether AI could make a document-heavy governance review easier to begin. The challenge is making its reasoning, sources, and gaps visible enough for a person to check.",
    stack: ["Next.js", "Anthropic API", "Vercel"],
    liveUrl: "https://ai-governance-agent-xi.vercel.app",
    liveLabel: "ai-governance-agent-xi.vercel.app",
    image: "/projects/ai-governance-agent.png",
    status: "Live",
    lessons:
      "A tidy assessment can look more certain than the evidence behind it. Clear questions, traceable inputs, and room to say that information is missing matter as much as the generated answer.",
    caseStudy: {
      context:
        "AI governance reviews often begin with a vague request to assess a system and a large set of uneven documentation. That invites generic conclusions before the evidence has been organized. I built this prototype to test whether a framework-led first pass could make the material easier to review without disguising the result as a final assessment.",
      approach:
        "The tool takes supplied system documentation, applies the governance framework chosen by the user, and drafts a control-by-control assessment. The useful output is not a risk label on its own. It is a clearer record of what the documentation supports, what is missing, and what a reviewer should examine next.",
      decisions: [
        {
          title: "Choose the framework first",
          body: "The assessment should follow a named set of requirements or controls. Selecting the framework before analysis gives the output a structure that a reviewer can inspect.",
        },
        {
          title: "Make missing information visible",
          body: "An unanswered question should remain a gap. The model should not quietly complete the story with a plausible assumption.",
        },
        {
          title: "Draft, not determination",
          body: "The output is designed as material for a responsible reviewer to challenge. It cannot determine compliance or certify that a system is safe.",
        },
      ],
      limits: [
        "The assessment depends on the accuracy and completeness of the information entered.",
        "The current prototype has not been benchmarked against assessments produced by experienced reviewers.",
        "A structured answer can create false confidence even when caveats are present.",
      ],
      next: [
        "Create a set of expert-reviewed scenarios and compare the tool against them.",
        "Trace every material conclusion back to the answer or source that supports it.",
        "Measure unsupported claims, missed risks, and unnecessary escalations separately.",
      ],
    },
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
