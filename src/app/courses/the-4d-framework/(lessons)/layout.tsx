import { Container } from "@/components/container";
import { LessonPager, LessonSidebar } from "@/components/lesson-nav";
import { getCourse } from "@/content/courses";

const COURSE_SLUG = "the-4d-framework";

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
    <Container className="py-12 sm:py-16 lg:max-w-[70rem]">
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
          <LessonPager courseSlug={COURSE_SLUG} lessons={lessons} />
        </div>
      </div>
    </Container>
  );
}
