import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { Container } from "@/components/container";
import { CtaLink, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = pageMetadata("/thank-you", {
  title: "You're confirmed",
  description: "Your copy of The First Build is ready to download.",
  // Nothing links here and it only means anything to someone who just confirmed.
  robots: { index: false, follow: false },
});

/*
  /api/confirm redirects here, adding ?status= when something went wrong. Without
  handling it this page would cheerfully tell someone they were confirmed when
  their link had expired, and they would wait for an email that never comes.
*/
const PROBLEMS = {
  expired: {
    eyebrow: "Link expired",
    title: "That link has expired",
    body: "Confirmation links last 48 hours. Sign up again on the home page and I'll send a fresh one straight away.",
  },
  invalid: {
    eyebrow: "Link not valid",
    title: "That link didn't work",
    body: "It may have been altered in transit, or only part of it was copied. Signing up again on the home page will send you a new one.",
  },
  failed: {
    eyebrow: "Something broke",
    title: "That didn't go through",
    body: "Your email is fine — this one is on me. Try again in a few minutes, or reply to my email and I'll add you by hand.",
  },
} as const;

type Problem = keyof typeof PROBLEMS;

export default async function ThankYou({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const problem = status && status in PROBLEMS ? PROBLEMS[status as Problem] : null;

  return (
    <Container className="py-20 sm:py-28">
      <Reveal>
        <div className="relative mx-auto overflow-hidden rounded-3xl border border-line bg-surface px-7 py-12 text-center sm:px-12">
          <div
            aria-hidden
            className={`glow pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full opacity-70 ${
              problem ? "glow-gold" : "glow-mint"
            }`}
          />

          <div className="relative">
            {problem ? (
              <>
                <Eyebrow tone="gold">{problem.eyebrow}</Eyebrow>
                <h1 className="font-display mt-4 text-3xl leading-tight text-ink sm:text-4xl">
                  {problem.title}
                </h1>
                <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-muted">
                  {problem.body}
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <CtaLink href="/">Back to the home page</CtaLink>
                </div>
              </>
            ) : (
              <>
                <Eyebrow tone="mint">You&apos;re in</Eyebrow>
                <h1 className="font-display mt-4 text-3xl leading-tight text-ink sm:text-4xl">
                  Thanks for confirming 🎉
                </h1>
                <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-muted">
                  <span className="font-medium text-ink">The First Build</span>{" "}
                  is ready below. I&apos;ve emailed you a link as well, so you
                  always have a copy.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <CtaLink href="/essays/the-first-build.pdf" external>
                    Download the guide
                  </CtaLink>
                  <CtaLink href="/courses" variant="secondary">
                    Browse the free courses
                  </CtaLink>
                </div>
              </>
            )}

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
