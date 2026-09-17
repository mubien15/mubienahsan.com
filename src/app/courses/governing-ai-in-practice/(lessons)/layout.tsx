import { Container } from "@/components/container";
import { LessonPager, LessonSidebar } from "@/components/lesson-nav";
import { getCourse } from "@/content/courses";

const COURSE_SLUG = "governing-ai-in-practice";

export default function LessonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const course = getCourse(COURSE_SLUG)!;
  const lessons = course.lessons.map((l) => ({
    slug: l.slug,
    title: l.title,
    minutes: l.minutes,
  }));

  return (
    <Container className="py-12 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-[15rem_1fr]">
        <aside className="lg:pt-1">
          <LessonSidebar
            courseSlug={COURSE_SLUG}
            courseTitle={course.title}
            lessons={lessons}
          />
        </aside>
        <div className="min-w-0">
          <article>{children}</article>

          {/* Every lesson carries this, not just the course page: most readers
              will arrive on a lesson from search and never see the overview. */}
          <p className="mt-12 rounded-2xl border border-line bg-surface/60 p-5 text-sm leading-relaxed text-muted">
            Written in a personal capacity, from public sources. Not derived
            from any employer&apos;s methodology or from client work. The
            organisation, the policy assistant and every figure in this course
            are invented for teaching, and none of it is professional advice.
          </p>

          <LessonPager courseSlug={COURSE_SLUG} lessons={lessons} />
        </div>
      </div>
    </Container>
  );
}
