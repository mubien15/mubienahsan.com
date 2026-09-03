/**
 * Course recommendation quiz: questions, scoring and narrowing rules.
 *
 * EVERYTHING TUNABLE LIVES IN THIS FILE. The component renders whatever is
 * here, so changing a question, an option or a weight needs no component edit.
 *
 * How scoring works: every option carries a weight per course. Weights sum
 * across the answers given so far, the highest total wins, and ties go to
 * whichever course comes first in COURSES (which is ladder order, so a tie
 * always resolves toward the more beginner course).
 *
 * Question 1 is deliberately weighted about twice as heavily as the other two.
 * It is the experience question, and without that gate someone who has barely
 * used AI but wants to build something gets pushed straight to the
 * intermediate course, skipping the prerequisites it openly assumes.
 */

/** Slugs must match src/content/courses.ts. Nothing else is duplicated. */
export type CourseSlug =
  | "getting-started-with-claude-code"
  | "prompting-basics"
  | "the-4d-framework"
  | "ship-your-first-app";

export type QuizOption = {
  id: string;
  label: string;
  /** One line saying what picking this actually means. */
  hint: string;
  weights: Record<CourseSlug, number>;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: QuizOption[];
};

export const QUESTIONS: QuizQuestion[] = [
  {
    id: "experience",
    prompt: "How much have you used AI so far?",
    options: [
      {
        id: "new",
        label: "Barely at all",
        hint: "I have opened one of these tools once or twice, or not yet.",
        weights: {
          "getting-started-with-claude-code": 10,
          "prompting-basics": 4,
          "the-4d-framework": 4,
          "ship-your-first-app": 0,
        },
      },
      {
        id: "sometimes",
        label: "Now and then",
        hint: "I reach for it occasionally, usually for small writing jobs.",
        weights: {
          "getting-started-with-claude-code": 6,
          "prompting-basics": 8,
          "the-4d-framework": 6,
          "ship-your-first-app": 2,
        },
      },
      {
        id: "often",
        label: "Most days, with mixed results",
        hint: "It is part of my routine, but I cannot say why some answers land and others do not.",
        weights: {
          "getting-started-with-claude-code": 0,
          "prompting-basics": 8,
          "the-4d-framework": 8,
          "ship-your-first-app": 4,
        },
      },
      {
        id: "confident",
        label: "A lot, and now I want to build",
        hint: "I am comfortable asking for things. I want to make something real.",
        weights: {
          "getting-started-with-claude-code": 0,
          "prompting-basics": 2,
          "the-4d-framework": 4,
          "ship-your-first-app": 10,
        },
      },
    ],
  },
  {
    id: "goal",
    prompt: "What would make this worth your time?",
    options: [
      {
        id: "prove",
        label: "Proving to myself I can do this",
        hint: "The barrier feels higher than it probably is.",
        weights: {
          "getting-started-with-claude-code": 4,
          "prompting-basics": 2,
          "the-4d-framework": 1,
          "ship-your-first-app": 2,
        },
      },
      {
        id: "answers",
        label: "Getting better answers",
        hint: "The tools are fine. The way I ask is the weak part.",
        weights: {
          "getting-started-with-claude-code": 1,
          "prompting-basics": 5,
          "the-4d-framework": 3,
          "ship-your-first-app": 0,
        },
      },
      {
        id: "understand",
        label: "Understanding what I am actually doing",
        hint: "A method I can apply to any tool, rather than tricks for one.",
        weights: {
          "getting-started-with-claude-code": 0,
          "prompting-basics": 2,
          "the-4d-framework": 5,
          "ship-your-first-app": 0,
        },
      },
      {
        id: "show",
        label: "Having something to show for it",
        hint: "A real thing on the internet that I made.",
        weights: {
          "getting-started-with-claude-code": 1,
          "prompting-basics": 0,
          "the-4d-framework": 0,
          "ship-your-first-app": 5,
        },
      },
    ],
  },
  {
    id: "appetite",
    prompt: "How hands on do you want to get?",
    options: [
      {
        id: "reading",
        label: "Reading only, for now",
        hint: "I want to understand it before I touch anything.",
        weights: {
          "getting-started-with-claude-code": 0,
          "prompting-basics": 3,
          "the-4d-framework": 4,
          "ship-your-first-app": 0,
        },
      },
      {
        id: "follow",
        label: "Happy to follow along",
        hint: "I will install things and type the commands as I go.",
        weights: {
          "getting-started-with-claude-code": 4,
          "prompting-basics": 2,
          "the-4d-framework": 1,
          "ship-your-first-app": 2,
        },
      },
      {
        id: "finish",
        label: "I want to finish something",
        hint: "Give me a project with an actual end point.",
        weights: {
          "getting-started-with-claude-code": 0,
          "prompting-basics": 0,
          "the-4d-framework": 1,
          "ship-your-first-app": 5,
        },
      },
    ],
  },
];

/**
 * How many courses stay lit after each answer, so the panel narrows visibly
 * and predictably: 4, then 3, then 2, then 1. A score threshold was the
 * obvious alternative but it narrows unevenly depending on the path taken,
 * and the narrowing is the whole point of the design.
 */
export const KEEP_LIT = [4, 3, 2, 1];

/** Why the winning course suits this person. Quiz copy, not course data. */
export const RESULT_NOTES: Record<CourseSlug, string> = {
  "getting-started-with-claude-code":
    "You are at the beginning, which is the best place to start and the hardest place to find a decent guide. This one assumes nothing and ends with you making a real change to a real project.",
  "prompting-basics":
    "You are already using these tools and want more out of them. This is the short list of things that genuinely change your results, with the magic words and folklore left out.",
  "the-4d-framework":
    "You want to know why things work rather than collect tricks. This gives you a model you can carry to any tool, and it is the one course here that needs nothing installed.",
  "ship-your-first-app":
    "You are past the basics and want something real at the end of it. This is the full loop, from an idea small enough to finish to a live link you can send someone.",
};

/** Running total per course for the answers given so far. */
export function scoreAnswers(answers: (string | null)[]): Record<string, number> {
  const totals: Record<string, number> = {};
  QUESTIONS.forEach((question, i) => {
    const chosen = question.options.find((o) => o.id === answers[i]);
    if (!chosen) return;
    for (const [slug, weight] of Object.entries(chosen.weights)) {
      totals[slug] = (totals[slug] ?? 0) + weight;
    }
  });
  return totals;
}

/**
 * Slugs still in contention, best first. `order` is the ladder order and
 * breaks ties, so an even score always favours the earlier course.
 */
export function rankSlugs(
  totals: Record<string, number>,
  order: string[]
): string[] {
  return [...order].sort((a, b) => {
    const diff = (totals[b] ?? 0) - (totals[a] ?? 0);
    return diff !== 0 ? diff : order.indexOf(a) - order.indexOf(b);
  });
}
