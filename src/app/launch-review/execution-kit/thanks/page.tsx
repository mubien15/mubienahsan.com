import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/motion";
import { Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Your Execution Kit is on its way",
  robots: { index: false, follow: false, noarchive: true },
};

export default function ExecutionKitThanksPage() {
  return (
    <Container className="py-16 sm:py-24">
      <Reveal>
        <main className="mx-auto max-w-2xl rounded-[2rem] border border-accent/20 bg-accent-soft/45 p-7 sm:p-12">
          <Eyebrow tone="accent">Payment received</Eyebrow>
          <h1 className="font-display mt-4 text-4xl leading-tight text-ink sm:text-5xl">
            Check your email for the kit.
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            A secure download link is being sent to the email address you used at checkout. It can
            take a minute to arrive, and it may land in spam or promotions.
          </p>
          <p className="mt-4 text-base leading-7 text-muted">
            The link expires after 30 days. Download the ZIP and keep it somewhere safe. If the
            email does not arrive, contact{" "}
            <a className="font-medium text-accent hover:underline" href="mailto:hello@mubienahsan.com">
              hello@mubienahsan.com
            </a>
            .
          </p>
          <Link
            href="/launch-review"
            className="mt-8 inline-flex rounded-full border border-accent/25 bg-surface px-5 py-3 text-sm font-semibold text-accent transition-colors hover:bg-accent-soft"
          >
            Return to the AI Product Launch Review
          </Link>
        </main>
      </Reveal>
    </Container>
  );
}
