import Link from "next/link";
import { Container } from "@/components/container";
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/nav";
import { SubscribeLink } from "@/components/subscribe-link";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-surface/40">
      {/* Colorful accent strip */}
      <div className="h-1 w-full bg-gradient-to-r from-flame via-grape to-mint" />
      <Container className="flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <p className="font-display text-lg font-semibold text-ink">
            Mubien Ahsan
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Learning and building with AI, in public. Free courses, honest
            notes, and the things I have actually shipped.
          </p>
        </div>

        <div className="flex gap-14">
          <nav className="flex flex-col gap-2 text-sm">
            <span className="mb-1 text-xs font-medium uppercase tracking-wider text-muted">
              Explore
            </span>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-ink/80 hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
            <SubscribeLink>Get the free guide</SubscribeLink>
          </nav>

          <nav className="flex flex-col gap-2 text-sm">
            <span className="mb-1 text-xs font-medium uppercase tracking-wider text-muted">
              Elsewhere
            </span>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink/80 hover:text-accent"
            >
              LinkedIn
            </a>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink/80 hover:text-accent"
            >
              Instagram
            </a>
            <a
              href={SOCIAL_LINKS.fable}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink/80 hover:text-accent"
            >
              Fable
            </a>
          </nav>
        </div>
      </Container>

      <Container className="border-t border-line/60 py-6">
        <div className="flex flex-col gap-2 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            {`© ${year} Mubien Ahsan. Built in public with Next.js & Claude Code.`}
          </p>
          <Link href="/legal" className="hover:text-accent">
            Privacy Policy &amp; Disclaimer
          </Link>
        </div>
        <p className="mt-2 text-xs text-muted/80">
          Views are my own, not my employer&apos;s. Nothing here is professional
          advice.
        </p>
      </Container>
    </footer>
  );
}
