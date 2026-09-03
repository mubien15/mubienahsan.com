import type { Metadata } from "next";
import { Container } from "@/components/container";
import { CtaLink, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "You're confirmed",
  description: "Your copy of The First Build is ready to download.",
  // Nothing links here and it is only meaningful to someone who just confirmed.
  robots: { index: false, follow: false },
};

export default function ThankYou() {
  return (
    <Container className="py-20 sm:py-28">
      <Reveal>
        <div className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-line bg-surface px-7 py-12 text-center sm:px-12">
          <div
            aria-hidden
            className="glow glow-mint pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full opacity-70"
          />

          <div className="relative">
            <Eyebrow tone="mint">You&apos;re in</Eyebrow>

            <h1 className="font-display mt-4 text-3xl leading-tight text-ink sm:text-4xl">
              Thanks for confirming 🎉
            </h1>

            <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-muted">
              <span className="font-medium text-ink">The First Build</span> is
              ready below. I&apos;ve emailed you a link as well, so you always
              have a copy.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <CtaLink href="/essays/the-first-build.pdf" external>
                Download the guide
              </CtaLink>
              <CtaLink href="/courses" variant="secondary">
                Browse the free courses
              </CtaLink>
            </div>

            <p className="mt-8 text-sm leading-relaxed text-muted">
              Nothing in your inbox? Check spam, or just{" "}
              <a
                href="mailto:hello@mubienahsan.com"
                className="font-medium text-accent hover:underline"
              >
                reply to me directly
              </a>
              .
            </p>
          </div>
        </div>
      </Reveal>
    </Container>
  );
}
