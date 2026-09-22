import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageIntro, Pill, TONE_TEXT } from "@/components/ui";
import { Reveal, Stagger, StaggerItem, HoverLift } from "@/components/motion";
import { cn } from "@/lib/cn";
import { BOOKS, CERTIFICATIONS } from "@/content/library";
import type { Tone } from "@/components/ui";

export const metadata: Metadata = pageMetadata("/library", {
  title: "Library",
  description:
    "Courses, books, and essays that have shaped how I think about AI, building, and living with a little more intention.",
});

const TOP_BAR: Record<Tone, string> = {
  accent: "before:bg-accent",
  mint: "before:bg-mint",
  flame: "before:bg-flame",
  grape: "before:bg-grape",
  gold: "before:bg-gold",
};

export default function LibraryPage() {
  return (
    <Container className="py-16 sm:py-20">
      <PageIntro
        eyebrow="Knowledge library"
        title="What was actually worth it."
        tone="grape"
      >
        There is an infinite amount of AI content and a finite amount of your
        attention. Here is what earned mine: the courses I took, the
        essays on governance and safety worth your time, and the books that
        shaped how I think.
      </PageIntro>

      {/* Certifications */}
      <section className="mt-14">
        <h2 className="font-display text-2xl text-ink">
          Courses I have taken
        </h2>
        <Stagger className="mt-6 grid gap-4 sm:grid-cols-3" inView>
          {CERTIFICATIONS.map((cert) => (
            <StaggerItem key={cert.name}>
              <HoverLift className="h-full">
                <div
                  className={cn(
                    "relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6",
                    "before:absolute before:inset-x-0 before:top-0 before:h-1 before:content-['']",
                    TOP_BAR[cert.tone]
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={cn(
                        "text-xs font-semibold uppercase tracking-wider",
                        TONE_TEXT[cert.tone]
                      )}
                    >
                      {cert.issuer}
                    </span>
                    <Pill tone={cert.tone}>{cert.status}</Pill>
                  </div>
                  {/* Same type treatment as the book cards below, so both
                      sections on this page read as one system. */}
                  <h3 className="font-display mt-3 text-lg text-ink">
                    {cert.name}
                  </h3>
                  <p className="prose-scale-sm mt-3 flex-1 leading-relaxed text-ink/85">
                    {cert.note}
                  </p>
                </div>
              </HoverLift>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Books */}
      <section className="mt-16">
        <h2 className="font-display text-2xl text-ink">Books &amp; essays</h2>
        <p className="mt-2 text-muted">
          Honest takes rather than summaries: what each one actually argues, and
          what it changed for me. Plus my own writing. Read the ones that pull at
          you.
        </p>
        <Stagger className="mt-6 grid gap-4 sm:grid-cols-2" inView>
          {BOOKS.map((book) => (
            <StaggerItem key={book.title}>
              <HoverLift className="h-full">
                <div className="flex h-full gap-4 rounded-2xl border border-line bg-surface p-6">
                  <div
                    className={cn(
                      "mt-1 h-12 w-1.5 shrink-0 rounded-full",
                      {
                        accent: "bg-accent",
                        mint: "bg-mint",
                        flame: "bg-flame",
                        grape: "bg-grape",
                        gold: "bg-gold",
                      }[book.tone]
                    )}
                  />
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-lg text-ink">
                        {book.title}
                      </h3>
                      {book.own ? <Pill tone={book.tone}>Written by me</Pill> : null}
                    </div>
                    <p className="mt-0.5 text-sm text-muted">{book.author}</p>
                    <p className="prose-scale-sm mt-3 leading-relaxed text-ink/85">{book.take}</p>
                    {book.href ? (
                      <a
                        href={book.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "mt-3 inline-block text-sm font-medium hover:underline",
                          TONE_TEXT[book.tone]
                        )}
                      >
                        Read the essay ↗
                      </a>
                    ) : null}
                  </div>
                </div>
              </HoverLift>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <Reveal>
        <p className="mt-14 rounded-2xl border border-dashed border-line bg-gold-soft/50 p-6 text-sm text-ink/70">
          More coming as I keep learning. This library grows as I do.
        </p>
      </Reveal>
    </Container>
  );
}
