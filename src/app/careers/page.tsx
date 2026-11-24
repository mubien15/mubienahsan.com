import Link from "next/link";
import { Container } from "@/components/container";
import { CtaLink } from "@/components/ui";
import { CareerEnquiryForm } from "@/components/career-enquiry-form";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/careers", {
  title: "Career Support",
  description: "Prepare for your first risk consulting or internal audit role with Mubien. Two individual sessions, a realistic practice exercise, interview preparation, and written feedback. Pilot: CA$149.",
});

const OUTCOMES = [
  { title: "Understand the role", body: "Translate a job description into the tasks a junior might actually do, and decide whether the direction suits you." },
  { title: "Practise your reasoning", body: "Work through a fictional business process. Identify what could go wrong, suggest a control, and explain how you would test it." },
  { title: "Explain what you bring", body: "Connect your studies, part-time work, and extracurricular activities to the role using truthful, specific examples." },
];

const STEPS = [
  { title: "Before we meet", body: "Share the role you are targeting and what feels difficult. Once we agree the package fits, you can send your CV for the first session." },
  { title: "Session one · 60 minutes", body: "We unpack the job, review how you describe your experience, and work through the foundations of a risk and controls exercise." },
  { title: "A short practice assignment", body: "Try the fictional exercise in your own time. It gives us something concrete to discuss and helps reveal where you need more practice." },
  { title: "Session two · 60 minutes", body: "We review your reasoning and practise interview questions. Afterwards, you receive written feedback and a focused preparation plan." },
];

const FAQS = [
  { question: "Who is this for?", answer: "Students and recent graduates preparing for internships or entry-level roles in risk consulting or internal audit. We use your target job posting to keep the preparation relevant. If you are exploring a different role, ask first so we can establish whether I can help." },
  { question: "Do I need previous experience?", answer: "No previous consulting or audit experience is required. Bring examples from your studies, employment, volunteering, or extracurricular activities. We will work with what you have actually done." },
  { question: "Is this a recorded course?", answer: "This pilot is personal, live preparation across two individual online sessions, with a short assignment between them. The free guides remain available to read without enrolling." },
  { question: "Will this get me a job or a referral?", answer: "The package helps you understand the work and improve your preparation. It does not include a referral, employer access, confidential interview questions, a qualification, or a guarantee of an interview or job offer." },
  { question: "How do booking and payment work?", answer: "Send an enquiry first. I will reply to discuss your needs and confirm whether the package fits. Before you pay, we will agree the session dates, full scope, and cancellation and rescheduling terms in writing. Submitting this form does not reserve a session or charge you." },
];

export default function CareersPage() {
  return (
    <Container className="py-12 sm:py-16 lg:py-20">
      <header className="relative overflow-hidden rounded-[2rem] border border-line bg-surface p-6 sm:p-10 lg:p-14">
        <div aria-hidden className="glow glow-gold pointer-events-none absolute -right-48 -top-64 h-[32rem] w-[32rem] rounded-full opacity-50" />
        <div className="relative grid gap-10 lg:grid-cols-[1.35fr_0.75fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-accent-strong">Career support · with Mubien</p>
            <h1 className="font-display mt-5 text-4xl leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Understand the work.<br />Prepare for your first role.
            </h1>
            <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-muted">
              Applying for an internship or graduate role in risk consulting or
              internal audit? Let&apos;s make the job description concrete and
              help you explain what you could bring to the work.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaLink href="#pilot" className="text-base">Explore the preparation package</CtaLink>
              <CtaLink href="/careers/first-role" variant="secondary" className="text-base">Start with the free guide</CtaLink>
            </div>
          </div>
          <aside className="rounded-3xl border border-mint/20 bg-mint-soft/50 p-6 sm:p-8" aria-label="A question we could work through">
            <p className="text-sm font-medium text-mint">A question we could work through</p>
            <p className="font-display mt-4 text-2xl leading-snug text-ink sm:text-3xl">
              A company pays the same invoice twice. Where would you start?
            </p>
            <p className="mt-5 text-base leading-relaxed text-ink/80">
              Understand the process. Identify the risk. Consider the control.
              Decide what evidence to examine. Then explain your thinking.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-muted">A fictional example of the reasoning we practise together.</p>
          </aside>
        </div>
      </header>

      <section className="py-14 sm:py-20" aria-labelledby="outcomes-title">
        <h2 id="outcomes-title" className="font-display text-3xl tracking-tight text-ink sm:text-4xl">Make your preparation practical.</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {OUTCOMES.map((item) => (
            <article key={item.title} className="rounded-2xl border border-line bg-surface p-6 sm:p-7">
              <h3 className="font-display text-2xl text-ink">{item.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="pilot" className="scroll-mt-24 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14" aria-labelledby="pilot-title">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-accent-strong">The preparation pilot</p>
          <h2 id="pilot-title" className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">Your next step, with personal feedback.</h2>
          <p className="mt-4 max-w-[62ch] text-lg leading-relaxed text-muted">Bring a role you are applying for and the questions you have been struggling to answer. We&apos;ll work from there.</p>
          <div className="mt-8 divide-y divide-line border-y border-line">
            {STEPS.map((step) => (
              <article key={step.title} className="py-6">
                <h3 className="font-display text-xl text-ink">{step.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
        <aside className="h-fit rounded-3xl border border-accent/25 bg-accent-soft/50 p-7 sm:p-9 lg:sticky lg:top-24" aria-label="Pilot package and price">
          <p className="text-sm font-semibold text-accent-strong">Individual preparation · pilot</p>
          <p className="font-display mt-4 text-5xl tracking-tight text-ink">CA$149</p>
          <p className="mt-2 text-base text-muted">For the complete two-session package.</p>
          <ul className="mt-6 space-y-3 text-base leading-relaxed text-ink/85">
            <li>Two individual online sessions, 60 minutes each</li>
            <li>One fictional risk and controls assignment</li>
            <li>Application and interview practice</li>
            <li>Written feedback and a preparation plan</li>
          </ul>
          <CtaLink href="#enquire" className="mt-7 w-full text-base">Ask about the pilot</CtaLink>
          <p className="mt-4 text-sm leading-relaxed text-muted">We confirm fit, availability, and booking terms before payment. No payment is taken on this page.</p>
        </aside>
      </section>

      <section className="mt-16 grid gap-8 rounded-3xl border border-line bg-surface p-7 sm:mt-20 sm:p-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-14" aria-labelledby="background-title">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">Who you will work with</p>
          <h2 id="background-title" className="font-display mt-3 text-3xl text-ink">Hi, I&apos;m Mubien.</h2>
        </div>
        <div className="space-y-4 text-lg leading-relaxed text-muted">
          <p>My background is in business law, internal audit, and risk consulting, with experience in Germany and Canada, including financial services. My work involves understanding processes, assessing risks, and testing controls.</p>
          <p>I want to make that work easier to understand for people preparing for their first opportunity. We use original, fictional exercises and work with your own experience.</p>
          <p className="text-base">This is an independent educational service, offered in a personal capacity and unaffiliated with any employer or recruitment process.</p>
          <Link href="/about" className="inline-block text-base font-medium text-accent-strong underline underline-offset-4">More about my background</Link>
        </div>
      </section>

      <section className="py-14 sm:py-20" aria-labelledby="questions-title">
        <h2 id="questions-title" className="font-display text-3xl tracking-tight text-ink sm:text-4xl">A few questions you might have.</h2>
        <div className="mt-8 divide-y divide-line border-y border-line">
          {FAQS.map((item) => (
            <details key={item.question} className="group py-5">
              <summary className="cursor-pointer pr-4 text-lg font-medium text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">{item.question}</summary>
              <p className="mt-4 max-w-[80ch] text-base leading-relaxed text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="enquire" className="scroll-mt-24 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14" aria-labelledby="enquiry-title">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-accent-strong">Start a conversation</p>
          <h2 id="enquiry-title" className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">What are you preparing for?</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">Tell me where you are and what you need help with. I&apos;ll reply by email to discuss whether the pilot is a good fit.</p>
          <p className="mt-4 text-base leading-relaxed text-muted">The guides are free. The paid package covers live preparation and personal feedback.</p>
          <p className="mt-5 text-base leading-relaxed text-muted">Prefer email? Write to <a href="mailto:hello@mubienahsan.com?subject=Career%20preparation%20pilot" className="break-all text-accent-strong underline underline-offset-4">hello@mubienahsan.com</a>.</p>
        </div>
        <CareerEnquiryForm />
      </section>
    </Container>
  );
}
