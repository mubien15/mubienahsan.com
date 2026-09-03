import { Container } from "@/components/container";
import { CtaLink } from "@/components/ui";
import { Squiggle } from "@/components/doodle";

export default function NotFound() {
  return (
    <Container className="py-24 sm:py-32">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-display text-6xl text-accent sm:text-7xl">404</p>

        <h1 className="font-display mt-6 text-3xl leading-tight text-ink sm:text-4xl">
          This page went{" "}
          <span className="relative inline-block">
            <span className="text-accent">wandering</span>
            <Squiggle className="text-accent/50" />
          </span>
        </h1>

        <p className="mt-5 text-lg leading-relaxed text-muted">
          It happens. The link may be old, or I may have moved something. Nothing
          is broken on your end.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <CtaLink href="/">Back home</CtaLink>
          <CtaLink href="/courses" variant="secondary">
            Browse the courses
          </CtaLink>
        </div>
      </div>
    </Container>
  );
}
