import type { Tone } from "@/components/ui";

export type Lesson = {
  slug: string;
  title: string;
  summary: string;
  minutes: number;
};

export type Course = {
  slug: string;
  title: string;
  tone: Tone;
  level: "Absolute beginner" | "Beginner" | "Intermediate";
  blurb: string;
  outcome: string;
  status: "Available" | "In progress" | "Planned";
  lessons: Lesson[];
};

/**
 * The learning ladder, in order: absolute beginner, then prompting that works,
 * then the 4D framework that names the whole skill, then shipping a real app.
 * Array order IS the ladder order, and the homepage band renders it directly.
 */
export const COURSES: Course[] = [
  {
    slug: "getting-started-with-claude-code",
    title: "Getting Started with Claude Code",
    tone: "mint",
    level: "Absolute beginner",
    blurb:
      "The thing people shy away from because it sounds like coding. It isn't. If you can describe what you want in plain English, you can use Claude Code.",
    outcome:
      "By the end you will have Claude Code installed and you will have made a real change to a real project, with no prior coding needed.",
    status: "Available",
    lessons: [
      {
        slug: "what-is-claude-code",
        title: "What Claude Code actually is",
        summary:
          "A plain explanation of what this tool is, what it isn't, and why it is the friendliest way into building with AI.",
        minutes: 6,
      },
      {
        slug: "setup",
        title: "Getting set up",
        summary:
          "Install it once, and never think about it again. We go one step at a time and name each thing you do.",
        minutes: 8,
      },
      {
        slug: "your-first-change",
        title: "Your first real change",
        summary:
          "Point Claude Code at a project, ask for a change in plain English, and watch it happen. This is the moment it clicks.",
        minutes: 10,
      },
    ],
  },
  {
    slug: "prompting-basics",
    title: "Prompting, without the hype",
    tone: "grape",
    level: "Beginner",
    blurb:
      "Most prompt engineering advice is noise. Here is the small handful of ideas that actually change your results.",
    outcome:
      "A reliable way to ask for what you want and steadily improve the answer, with no magic words and nothing to memorise.",
    status: "Available",
    lessons: [
      {
        slug: "why-most-advice-is-noise",
        title: "Why most prompting advice is noise",
        summary:
          "Magic words, secret phrases and threats do not work. The techniques that do are unglamorous and few. Here is the honest list.",
        minutes: 6,
      },
      {
        slug: "say-what-you-want",
        title: "Say exactly what you want",
        summary:
          "The biggest lever there is. What to include, what to leave out, and the reframing that fixes most bad prompts on its own.",
        minutes: 9,
      },
      {
        slug: "give-it-the-why",
        title: "Give it the why, not just the what",
        summary:
          "One extra sentence of reasoning makes your instructions cover the cases you never thought to mention. The most underrated habit here.",
        minutes: 7,
      },
      {
        slug: "show-dont-tell",
        title: "Show, don't tell",
        summary:
          "One good example beats a paragraph of description. How to use examples to lock in tone and shape, and how many you actually need.",
        minutes: 9,
      },
      {
        slug: "steer-dont-restart",
        title: "Steer, don't restart",
        summary:
          "The first answer is a draft, not a verdict. Feedback that lands, when to rewrite instead, and the draft then critique then refine loop.",
        minutes: 9,
      },
    ],
  },
  {
    slug: "the-4d-framework",
    title: "The 4D Framework",
    tone: "gold",
    level: "Beginner",
    blurb:
      "Four habits that turn using AI from something you do by instinct into something you can explain, repeat, and get right on purpose.",
    outcome:
      "A mental model you can apply to any tool and any task: knowing what to hand over, how to ask, how to judge what comes back, and what you owe the people who rely on it.",
    status: "Available",
    lessons: [
      {
        slug: "why-a-framework",
        title: "Why bother with a framework",
        summary:
          "Most of us use AI reactively and get results we cannot explain or repeat. Where the 4Ds came from, and the honest case for having a model in your head.",
        minutes: 7,
      },
      {
        slug: "delegation",
        title: "Delegation: what to hand over",
        summary:
          "The decision almost nobody makes deliberately. Knowing your problem, knowing what the tool can really do, and dividing the work between you on purpose.",
        minutes: 8,
      },
      {
        slug: "description",
        title: "Description: saying what you want",
        summary:
          "Three things you can describe and most people only ever describe one: the product you want, the process to get there, and the manner it should work in.",
        minutes: 9,
      },
      {
        slug: "discernment",
        title: "Discernment: judging what comes back",
        summary:
          "Fluent writing feels correct, which is exactly the trap. How to evaluate the output, the reasoning behind it, and the way the tool is behaving.",
        minutes: 9,
      },
      {
        slug: "diligence",
        title: "Diligence: owning what you ship",
        summary:
          "The competency people skip because it is the least fun. Where your work came from, who you tell, and who carries it when it goes wrong.",
        minutes: 8,
      },
    ],
  },
  {
    slug: "ship-your-first-app",
    title: "Ship your first small app",
    tone: "flame",
    level: "Intermediate",
    blurb:
      "Go from an idea to a live URL you can send to a friend, the same full loop I used to ship Fable.",
    outcome:
      "A real app running on the internet at its own address, built one small slice at a time, that you can hand to someone else.",
    status: "Available",
    lessons: [
      {
        slug: "pick-something-you-can-finish",
        title: "Pick something you can finish",
        summary:
          "Almost no first app dies for technical reasons. It dies because it was too big on day one. How to cut an idea down to something that reaches the internet.",
        minutes: 7,
      },
      {
        slug: "get-it-running",
        title: "Get a real app running",
        summary:
          "Three commands and you have a working app on your own machine. What each one does, and the four files that matter out of the hundreds you just made.",
        minutes: 9,
      },
      {
        slug: "build-in-slices",
        title: "Build it in slices",
        summary:
          "The mistake is describing the whole app in one giant request. The fix is one small piece at a time, checked in the browser before you move on.",
        minutes: 11,
      },
      {
        slug: "when-it-breaks",
        title: "When it breaks",
        summary:
          "It will break. That is the job, not a sign you are bad at this. How to read an error, hand it over well, and never take the word fixed on trust.",
        minutes: 9,
      },
      {
        slug: "put-it-on-the-internet",
        title: "Put it on the internet",
        summary:
          "From a page only you can see to a link you can text someone, in about five minutes. Then a proper domain if you want one.",
        minutes: 10,
      },
    ],
  },
  {
    slug: "governing-ai-in-practice",
    title: "Governing AI in Practice",
    tone: "accent",
    level: "Intermediate",
    blurb:
      "The other four courses teach you to build with AI. This one teaches you to decide whether a thing that has been built should be allowed to run. From use-case design through validation to a defensible release decision.",
    outcome:
      "By the end you will have worked a single case from first sketch to release decision: a boundary statement, an accountability map, a validation plan, a control register, and a recommendation you could defend to someone who disagreed with it.",
    status: "Available",
    lessons: [
      {
        slug: "capabilities-and-consequences",
        title: "Capability is not risk",
        summary:
          "Three systems, the same model, three completely different problems. Why the risk lives in the deployment rather than in the model.",
        minutes: 10,
      },
      {
        slug: "define-the-use-case",
        title: "Write the boundary someone else could test",
        summary:
          "What it may do, what it must not do, and what it must escalate. A purpose that cannot be tested is not a purpose.",
        minutes: 10,
      },
      {
        slug: "ownership-and-oversight",
        title: "Who owns it, who challenges it, who assures it",
        summary:
          "A system can have a dozen contributors and no owner. Separating delivery, oversight and independent assurance, and why that separation stops being real the moment audit starts operating the controls.",
        minutes: 10,
      },
      {
        slug: "evidence-and-escalation",
        title: "Turning accountability into a loop",
        summary:
          "Operate, observe, assess, act, verify. Why a dashboard of green indicators proves nothing, and the four questions worth asking about any control.",
        minutes: 10,
      },
      {
        slug: "inputs-and-architecture",
        title: "Validate the system, not the model",
        summary:
          "A benchmark cannot tell you whether the right document reached the right person. Sources, retrieval, prompts, permissions — every component is a place to fail.",
        minutes: 15,
      },
      {
        slug: "outputs-and-robustness",
        title: "Testing what actually goes wrong",
        summary:
          "Correct, grounded, complete and safe are four different questions. Building tests with observable pass criteria, and reading failures by severity rather than by average.",
        minutes: 15,
      },
      {
        slug: "oversight-and-guardrails",
        title: "Controls, and the limits of human review",
        summary:
          "\u201CA human will check it\u201D is not a control description. What a reviewer needs to actually exercise judgement, and which restrictions should never depend on the model obeying an instruction.",
        minutes: 13,
      },
      {
        slug: "monitoring-and-change",
        title: "Monitoring, change and recovery",
        summary:
          "A system that passed last month may not pass today. Choosing measures that lead to decisions, and making sure the rollback route is one you have actually tried.",
        minutes: 12,
      },
      {
        slug: "implementation-barriers",
        title: "Why the pilot does not scale",
        summary:
          "Demonstrations work on clean data and chosen questions. The barriers are usually ownership, versioning and permissions rather than anything a better prompt would fix.",
        minutes: 12,
      },
      {
        slug: "release-and-reuse",
        title: "From pilot to supported service",
        summary:
          "What has to exist before release, and the trap in shared capabilities: reusing a component is sensible, reusing its approval is not.",
        minutes: 13,
      },
      {
        slug: "value-and-residual-risk",
        title: "Measuring the benefit honestly",
        summary:
          "Faster is not the same as cheaper, and released capacity is not a saving. Keeping the value case and the risk case on the same page.",
        minutes: 15,
      },
      {
        slug: "the-decision",
        title: "The decision, and defending it",
        summary:
          "Bringing scope, accountability, evidence, controls and value into one recommendation \u2014 including what to do when a strong average hides a failure you cannot release with.",
        minutes: 15,
      },
    ],
  },
];

export function getCourse(slug: string): Course | undefined {
  return COURSES.find((c) => c.slug === slug);
}
