import Link from "next/link";
import { Container } from "@/components/container";
import { CtaLink } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/careers/first-role", {
  title: "What a Junior Risk Consultant Actually Does",
  description: "A free introduction to processes, risks, controls, and testing, with a fictional duplicate-payment exercise for students exploring risk consulting and internal audit.",
});

export default function FirstRoleGuide() {
  return (
    <Container className="py-12 sm:py-16">
      <article className="mx-auto max-w-3xl">
        <Link href="/careers" className="text-base font-medium text-accent-strong underline underline-offset-4">Career support</Link>
        <header className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-mint">Free guide · no signup required</p>
          <h1 className="font-display mt-4 text-4xl leading-tight tracking-tight text-ink sm:text-5xl">What does a junior risk consultant actually do?</h1>
          <p className="mt-6 text-xl leading-relaxed text-muted">Start with a familiar problem: a company pays the same invoice twice. What happened, how could it happen again, and what would you examine?</p>
          <p className="mt-4 text-base text-muted">By Mubien · 24 November 2026</p>
        </header>

        <div className="mt-10 space-y-10 text-lg leading-relaxed text-ink/85">
          <section>
            <h2 className="font-display text-2xl text-ink">Start by understanding the process.</h2>
            <p className="mt-4">A risk consulting or internal audit assignment might begin with conversations, documents, and questions about how work gets done. A junior could help take walkthrough notes, map a process, request evidence, or document testing. The exact work depends on the team and engagement.</p>
            <p className="mt-4">In our fictional company, an invoice arrives, someone checks it, a manager approves it, and the finance team pays it. Before suggesting improvements, find out who performs each step and what records they leave behind.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ink">Separate the risk, control, and test.</h2>
            <dl className="mt-5 space-y-5 rounded-2xl border border-line bg-surface p-6 sm:p-8">
              <div><dt className="font-semibold text-ink">Risk: what could go wrong?</dt><dd className="mt-1">The same invoice could be recorded twice and paid twice, causing a financial loss.</dd></div>
              <div><dt className="font-semibold text-ink">Control: what addresses that risk?</dt><dd className="mt-1">The payment system could flag matching supplier and invoice details before payment, with a required review of flagged items.</dd></div>
              <div><dt className="font-semibold text-ink">Test: what evidence would you examine?</dt><dd className="mt-1">Check how the flag is configured and whether it detects suitable test cases. Examine records of flagged invoices and their resolution during the period being reviewed.</dd></div>
            </dl>
            <p className="mt-4">A control can sound sensible and still fail in practice. Understanding its design and examining whether it operated are related but different tasks.</p>
          </section>

          <section className="rounded-3xl border border-mint/25 bg-mint-soft/45 p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-mint">Try it yourself</p>
            <h2 className="font-display mt-3 text-2xl text-ink">The duplicate invoice exercise</h2>
            <p className="mt-4">A fictional retailer receives invoices by email. An employee types the supplier, invoice number, amount, and bank details into a spreadsheet. A manager approves payments by replying to an email. The finance team uploads the approved payments to the bank each Friday. There is no automatic duplicate check.</p>
            <ol className="mt-5 list-decimal space-y-3 pl-6">
              <li>What three questions would you ask to understand this process better?</li>
              <li>Describe one risk precisely. What could happen, and why?</li>
              <li>Suggest a control. Who performs it, when, and what evidence remains?</li>
              <li>How would you check whether that control actually happened?</li>
            </ol>
            <p className="mt-5 text-base text-muted">Write a few sentences for each. This is a learning exercise; there are several reasonable approaches.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ink">Compare your reasoning.</h2>
            <details className="mt-5 rounded-2xl border border-line bg-surface p-6">
              <summary className="cursor-pointer text-lg font-medium text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">Read one possible approach</summary>
              <div className="mt-5 space-y-4">
                <p><strong>Questions:</strong> Can the same invoice enter through more than one email address? Who can edit the spreadsheet after approval? What exactly does the manager compare before approving?</p>
                <p><strong>Risk:</strong> An invoice entered twice could be approved in two separate payment batches because the records are not checked against previous payments.</p>
                <p><strong>Control:</strong> Before each Friday upload, a reviewer other than the preparer compares the proposed batch with the invoice register and previous payment records, investigates possible duplicates, and records the review and resolution.</p>
                <p><strong>Test:</strong> Examine selected payment batches, the information available to the reviewer at the time, and the recorded checks and resolutions. Consider whether the review could detect duplicates entered with small variations.</p>
                <p><strong>Limit:</strong> A signature alone does not establish what the reviewer checked. You would need to understand the review and assess the supporting evidence. A real engagement would also need a defined scope and testing approach.</p>
              </div>
            </details>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ink">Use this honestly in your preparation.</h2>
            <p className="mt-4">Practise explaining your reasoning out loud: what you would ask, what could go wrong, and what evidence you would want. If you discuss this exercise in an application or interview, describe it as a fictional training exercise. It is not employment or client experience.</p>
          </section>

          <aside className="rounded-3xl border border-accent/25 bg-accent-soft/50 p-7 sm:p-9">
            <h2 className="font-display text-2xl text-ink">Want feedback on your own reasoning?</h2>
            <p className="mt-4">The career preparation pilot combines a practical assignment with individual application and interview preparation. Two online sessions and written feedback, for CA$149.</p>
            <CtaLink href="/careers#enquire" className="mt-6 text-base">Ask about the pilot</CtaLink>
            <p className="mt-4 text-base text-muted">This guide remains free to read and use for your own learning.</p>
          </aside>
        </div>
      </article>
    </Container>
  );
}
