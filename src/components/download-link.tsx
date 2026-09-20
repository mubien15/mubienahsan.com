/**
 * A download for one of the generated PDFs under /public/research.
 *
 * Both files are produced by scripts/build-pdfs.mjs from the same content
 * the page renders, so the wording here promises what the file actually
 * contains: the size and page count are passed in rather than guessed, and
 * the caller keeps them honest by reading them off the generated file.
 */
export function DownloadLink({
  href,
  title,
  detail,
}: {
  href: string;
  title: string;
  detail: string;
}) {
  return (
    <a
      href={href}
      download
      className="group inline-flex max-w-2xl items-start gap-3 rounded-2xl border border-line bg-surface px-5 py-4 transition-colors hover:border-accent/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="mt-0.5 h-5 w-5 shrink-0 text-accent"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3v12" />
        <path d="m7 11 5 5 5-5" />
        <path d="M4 20h16" />
      </svg>
      <span>
        <span className="block font-medium text-ink group-hover:text-accent">
          {title}
        </span>
        <span className="block text-sm leading-relaxed text-muted">
          {detail}
        </span>
      </span>
    </a>
  );
}
