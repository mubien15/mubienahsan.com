import type { MDXComponents } from "mdx/types";
import Link from "next/link";

/**
 * Global styling for MDX (course lessons). Keeps a calm, readable measure
 * with the serif for headings and a comfortable line length for body text.
 */
const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="font-display mt-2 mb-6 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-display mt-12 mb-4 text-2xl font-semibold tracking-tight text-ink">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 mb-3 text-lg font-semibold text-ink">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="my-4 text-[1.05rem] leading-8 text-ink/85">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="my-4 list-disc space-y-2 pl-6 text-ink/85 marker:text-accent">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 list-decimal space-y-2 pl-6 text-ink/85 marker:text-muted">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-8">{children}</li>,
  a: ({ href = "", children }) => {
    const isInternal = href.startsWith("/");
    if (isInternal) {
      return (
        <Link
          href={href}
          className="font-medium text-accent underline decoration-accent/30 hover:decoration-accent"
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-accent underline decoration-accent/30 hover:decoration-accent"
      >
        {children}
      </a>
    );
  },
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-2 border-accent/50 bg-accent-soft/40 py-1 pl-5 pr-4 text-ink/80 italic">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="rounded bg-sunken px-1.5 py-0.5 font-mono text-[0.9em] text-accent-strong">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="my-6 overflow-x-auto rounded-xl border border-line bg-sunken p-4 font-mono text-sm leading-relaxed text-ink">
      {children}
    </pre>
  ),
  hr: () => <hr className="my-10 border-line" />,
  strong: ({ children }) => (
    <strong className="font-semibold text-ink">{children}</strong>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
