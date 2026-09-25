export type NavLink = {
  href: string;
  label: string;
  summary: string;
  /** Extra path prefixes this item should light up for, e.g. /research owns /agents. */
  owns?: string[];
};

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Overview", summary: "A clear starting point" },
  {
    href: "/projects",
    label: "Projects",
    summary: "Working products and case studies",
    owns: ["/launch-review"],
  },
  {
    href: "/research",
    label: "Research",
    summary: "Frameworks, explainers, and source trails",
    owns: ["/agents"],
  },
  { href: "/courses", label: "Learn", summary: "Free, practical AI guides" },
  { href: "/library", label: "Library", summary: "Books, standards, and useful reading" },
  { href: "/about", label: "About", summary: "My story, approach, and contact details" },
];

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/mubienahsan",
  instagram: "https://www.instagram.com/_mubien_",
  fable: "https://scenariolab.quest",
};
