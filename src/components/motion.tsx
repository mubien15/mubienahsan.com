"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

/**
 * Small, reusable animation primitives built on `motion`.
 * All of them quietly disable movement when the user prefers reduced motion.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fade + rise into view on scroll. */
export function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Container that staggers its direct <StaggerItem> children.
 * Use for hero content or grids that should cascade in.
 */
export function Stagger({
  children,
  className,
  delay = 0,
  gap = 0.09,
  inView = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  gap?: number;
  inView?: boolean;
}) {
  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: gap, delayChildren: delay },
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      {...(inView
        ? { whileInView: "show", viewport: { once: true, margin: "-80px" } }
        : { animate: "show" })}
    >
      {children}
    </motion.div>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={reduce ? undefined : itemVariants}
    >
      {children}
    </motion.div>
  );
}

/**
 * A card wrapper that gently lifts on hover. Falls back to no motion for
 * reduced-motion users (the CSS border/color hover still applies).
 */
export function HoverLift({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      {children}
    </motion.div>
  );
}
