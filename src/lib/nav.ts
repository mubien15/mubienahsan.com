export type NavLink = {
  href: string;
  label: string;
  /** Extra path prefixes this item should light up for, e.g. /research owns /agents. */
  owns?: string[];
};

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects", owns: ["/launch-review"] },
  { href: "/research", label: "Research", owns: ["/agents"] },
  { href: "/courses", label: "Learn" },
  { href: "/library", label: "Library" },
  { href: "/about", label: "About" },
];

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/mubienahsan",
  instagram: "https://www.instagram.com/_mubien_",
  fable: "https://scenariolab.quest",
};
