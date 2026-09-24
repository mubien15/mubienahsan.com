import Link from "next/link";
import { Container } from "@/components/container";
import { LogoMark } from "@/components/logo-mark";
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/nav";
import { SubscribeLink } from "@/components/subscribe-link";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-surface/40">
      {/* Colorful accent strip */}
      <div className="h-1 w-full bg-gradient-to-r from-flame-bright via-grape-bright to-mint-bright" />
      <Container className="flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-3">
            <LogoMark className="h-10 w-10 text-accent" />
            <div>
              <p className="font-display text-lg font-semibold text-ink">Mubien</p>
              <p className="mt-0.5 text-xs leading-5 text-muted">
                clarity for what comes next
              </p>
            </div>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Building useful AI, testing the assumptions around it, and exploring
            what meaningful human control looks like as systems become more capable.
          </p>
        </div>

        <div className="flex gap-14">
          <nav aria-label="Footer navigation" className="flex flex-col gap-2 text-sm">
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

          <nav aria-label="External profiles" className="flex flex-col gap-2 text-sm">
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
            {`© ${year} Mubien. Built in public with Next.js & Claude Code.`}
          </p>
          <Link href="/legal" className="hover:text-accent">
            Privacy Policy &amp; Disclaimer
          </Link>
        </div>
        <p className="mt-2 text-xs text-muted/80">
          Nothing here is professional advice.
        </p>
      </Container>
    </footer>
  );
}
