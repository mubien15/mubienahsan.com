import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { PageIntro, Pill } from "@/components/ui";

export const metadata: Metadata = pageMetadata("/research/learning-and-self-improvement", {
  title: "When AI learns: what actually changes?",
  description: "Context, memory, training, and recursive self-improvement explained through what changes and how we might check it.",
});

const DISTINCTIONS = [
  {
    title: "Context: using what is in front of it",
    body: "A model can use instructions, examples, and previous messages to produce a better answer. In-context learning describes this adaptation within the input; it does not require an update to the model’s weights.",
    example: "You show it the format you want, and its next answer follows that format.",
    question: "Does the improvement survive a new conversation without those examples?",
  },
  {
    title: "Memory: saving information for later",
    body: "An application can store preferences, notes, or previous results and retrieve them into a later interaction. That changes the information available to the model. The storage and retrieval system sits around the model and can have its own errors.",
    example: "An assistant saves your preferred briefing topics and retrieves them tomorrow.",
    question: "What was saved, is it still accurate, and can you inspect or remove it?",
  },
  {
    title: "Training: changing model parameters",
    body: "Training changes the model’s numerical parameters, or weights. Fine-tuning is a further training stage using selected data. A correction in a chat is not, by itself, evidence that a training update occurred. A provider may use conversation data in a later training process under its own settings and policies.",
    example: "A training process uses examples to update a model, producing a new version.",
    question: "What changed on independent evaluations, including tasks outside the training examples?",
  },
  {
    title: "An improvement loop: proposing, testing, revising",
    body: "An agent can generate code, run a check, read the result, and revise its attempt. The code or workflow can improve while the underlying model stays the same. The quality of the loop depends heavily on the check it is trying to pass.",
    example: "A coding agent fixes an error after seeing a failing test.",
    question: "Did it fix the underlying problem, or find a way to satisfy an incomplete test?",
  },
];

export default function LearningPage() {
  return (
    <Container className="py-16 sm:py-20">
      <Link href="/research" className="text-sm text-muted hover:text-mint">← Research</Link>
      <div className="mt-6" />
      <PageIntro eyebrow="Understanding AI" title="When AI learns, what actually changes?" tone="mint">
        I use AI every day, and a better second answer still invites an easy
        assumption: it learned. That word can mean several different things.
        Separating them makes both the possibilities and the limits easier to see.
      </PageIntro>
      <article className="mt-12 space-y-10 text-lg leading-relaxed text-ink/85">
        <section>
          <h2 className="font-display text-2xl text-ink">Start with the thing that changes</h2>
          <p className="mt-3">These distinctions help me ask a more useful question than whether a system is “getting smarter”: what changed, where does it persist, and what evidence supports the improvement?</p>
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {DISTINCTIONS.map((item, i) => (
              <section key={item.title} className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
                <Pill tone="mint">0{i + 1}</Pill>
                <h3 className="font-display mt-3 text-xl text-ink">{item.title}</h3>
                <p className="mt-3">{item.body}</p>
                <p className="mt-3 text-base text-muted"><strong className="text-ink">For example:</strong> {item.example}</p>
                <p className="mt-3 text-base text-mint"><strong>A useful check:</strong> {item.question}</p>
              </section>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted">For the distinction between in-context learning and training, see <a className="underline" href="https://arxiv.org/abs/2005.14165">Language Models are Few-Shot Learners</a>. For context and persistent notes in agents, see <a className="underline" href="https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents">Anthropic’s context engineering guide</a>.</p>
        </section>
        <section>
          <h2 className="font-display text-2xl text-ink">Where recursive self-improvement enters the picture</h2>
          <p className="mt-3">I use the term here for a loop in which a system helps improve the machinery responsible for its own capabilities, and those improvements help produce the next round. That machinery could include code, tools, training methods, or model design. The scope matters: improving one component establishes much less than open-ended improvement across tasks.</p>
          <p className="mt-4">Google DeepMind’s <a className="text-mint underline" href="https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/">AlphaEvolve</a> is a concrete example of AI-generated programs being selected through automated evaluation. Its reported applications include improving parts of the infrastructure used to train AI. My reading is that this shows a useful feedback loop in bounded tasks. It does not, on its own, demonstrate unlimited or reliably accelerating self-improvement.</p>
        </section>
        <section>
          <h2 className="font-display text-2xl text-ink">The limits are part of the mechanism</h2>
          <p className="mt-3">An improvement depends on the objective, the feedback, and the resources available. A test can miss important failures. Reusing generated outputs can carry errors forward. Gains on one benchmark may not transfer to a different task. None of these questions is answered just by running the loop again.</p>
          <p className="mt-4">That is why I find the governance question interesting: if a system can propose changes to itself, what can it change, who decides whether the result is better, and what prevents an untested change from reaching the real world?</p>
        </section>
        <section className="rounded-2xl border border-mint/25 bg-mint-soft p-6 sm:p-8">
          <h2 className="font-display text-2xl text-ink">The checks I would want around the loop</h2>
          <ul className="mt-4 list-disc space-y-3 pl-6">
            <li>A record of the version, the proposed change, and the evidence for accepting it.</li>
            <li>Tests the system cannot silently rewrite to make itself pass, including checks for regressions and unwanted behaviour.</li>
            <li>Explicit limits on the tools, data, and permissions it can change.</li>
            <li>A separate decision to deploy consequential changes, with monitoring and a way to roll back.</li>
          </ul>
          <p className="mt-4">These are starting questions, not a guarantee of safety. Whether they are sufficient depends on the system and its reach. I explore the human-review side in <Link href="/research/autonomy-governance" className="text-mint underline">The Oversight Threshold</Link>.</p>
        </section>
        <p className="border-t border-line pt-6 text-sm text-muted">A personal explainer based on the sources linked above. The examples are illustrative; this page reports no original experiments or measured results.</p>
      </article>
    </Container>
  );
}
