"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import {
  CAPABILITIES,
  EMPTY_REVIEW_INPUT,
  REVIEW_PRESETS,
  generateLaunchReview,
  reviewToMarkdown,
  type Autonomy,
  type Audience,
  type CapabilityId,
  type DataSensitivity,
  type FailureImpact,
  type HumanReview,
  type LaunchReviewInput,
  type ReviewLevel,
} from "@/lib/launch-review";

type ResultTab = "overview" | "claims" | "tests" | "gates";

const STEPS = ["Purpose", "Boundaries", "Oversight"] as const;

const LEVEL_STYLE: Record<ReviewLevel, string> = {
  "Standard review": "border-mint/30 bg-mint-soft text-mint",
  "Focused review": "border-gold/40 bg-gold-soft text-ink",
  "High scrutiny": "border-flame/35 bg-flame-soft text-flame",
};

const KIND_STYLE = {
  Baseline: "bg-mint-soft text-mint",
  Boundary: "bg-gold-soft text-ink",
  Adversarial: "bg-flame-soft text-flame",
  Recovery: "bg-grape-soft text-grape",
} as const;

export function LaunchReviewAgent() {
  const [input, setInput] = useState<LaunchReviewInput>(EMPTY_REVIEW_INPUT);
  const [step, setStep] = useState(0);
  const [tab, setTab] = useState<ResultTab>("overview");
  const [error, setError] = useState("");
  const [completedGates, setCompletedGates] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const review = useMemo(() => generateLaunchReview(input), [input]);
  const isResult = step === STEPS.length;
  const requiredGates = review.gates.filter((gate) => gate.priority === "Required");
  const completeRequired = requiredGates.filter((gate) =>
    completedGates.includes(gate.id)
  ).length;

  function update<K extends keyof LaunchReviewInput>(
    key: K,
    value: LaunchReviewInput[K]
  ) {
    setInput((current) => ({ ...current, [key]: value }));
    setError("");
  }

  function toggleCapability(capability: CapabilityId) {
    update(
      "capabilities",
      input.capabilities.includes(capability)
        ? input.capabilities.filter((item) => item !== capability)
        : [...input.capabilities, capability]
    );
  }

  function validateCurrentStep() {
    if (step === 0) {
      if (input.productName.trim().length < 2) {
        setError("Give the product or feature a short name.");
        return false;
      }
      if (input.summary.trim().length < 40) {
        setError("Describe what the system does in a little more detail.");
        return false;
      }
    }

    if (step === 2 && input.success.trim().length < 20) {
      setError("Describe an observable result that would make the system useful.");
      return false;
    }

    return true;
  }

  function continueReview() {
    if (!validateCurrentStep()) return;
    setStep((current) => Math.min(current + 1, STEPS.length));
    setError("");
    window.setTimeout(() => {
      document.getElementById("launch-review-tool")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 20);
  }

  function applyPreset(index: number) {
    setInput({ ...REVIEW_PRESETS[index].value });
    setCompletedGates([]);
    setError("");
  }

  function editReview() {
    setStep(0);
    setTab("overview");
    setError("");
  }

  function resetReview() {
    setInput(EMPTY_REVIEW_INPUT);
    setCompletedGates([]);
    setStep(0);
    setTab("overview");
    setError("");
  }

  function toggleGate(id: string) {
    setCompletedGates((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }

  function copyReview() {
    const markdown = reviewToMarkdown(input, review, completedGates);
    const textArea = document.createElement("textarea");
    textArea.value = markdown;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    const copiedSynchronously = document.execCommand("copy");
    textArea.remove();

    if (!copiedSynchronously && navigator.clipboard) {
      void navigator.clipboard.writeText(markdown).catch(() => undefined);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function downloadReview() {
    const markdown = reviewToMarkdown(input, review, completedGates);
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    const slug =
      input.productName
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") || "ai-product";
    anchor.href = url;
    anchor.download = `${slug}-launch-review.md`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div
      id="launch-review-tool"
      className="scroll-mt-24 overflow-hidden rounded-[2rem] border border-grape/25 bg-surface shadow-[0_24px_80px_rgba(73,64,40,0.1)]"
    >
      <div className="border-b border-line bg-grape-soft/45 px-5 py-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-grape">
              AI Launch Review · Public prototype
            </p>
            <h2 className="font-display mt-1.5 text-2xl text-ink sm:text-3xl">
              {isResult ? `${input.productName} launch review` : "Define what must be true before launch"}
            </h2>
          </div>
          <span className="rounded-full border border-mint/25 bg-mint-soft px-3 py-1 text-xs font-medium text-mint">
            Runs in your browser · Nothing uploaded
          </span>
        </div>

        {!isResult ? (
          <ol className="mt-5 grid grid-cols-3 gap-2" aria-label="Review progress">
            {STEPS.map((label, index) => {
              const active = index === step;
              const complete = index < step;
              return (
                <li key={label}>
                  <button
                    type="button"
                    disabled={index > step}
                    onClick={() => {
                      if (index < step) {
                        setStep(index);
                        setError("");
                      }
                    }}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-xs font-medium transition-colors sm:px-3 sm:text-sm",
                      active && "bg-surface text-grape shadow-sm",
                      complete && "text-ink hover:bg-surface/60",
                      !active && !complete && "text-muted"
                    )}
                  >
                    <span
                      className={cn(
                        "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[0.7rem]",
                        active && "border-grape bg-grape text-white",
                        complete && "border-mint bg-mint text-white",
                        !active && !complete && "border-line bg-paper"
                      )}
                    >
                      {complete ? "✓" : index + 1}
                    </span>
                    <span className="hidden sm:inline">{label}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        ) : null}
      </div>

      {!isResult ? (
        <div className="p-5 sm:p-8 lg:p-10">
          {step === 0 ? (
            <PurposeStep input={input} update={update} applyPreset={applyPreset} />
          ) : null}
          {step === 1 ? (
            <BoundaryStep
              input={input}
              update={update}
              toggleCapability={toggleCapability}
            />
          ) : null}
          {step === 2 ? <OversightStep input={input} update={update} /> : null}

          {error ? (
            <p
              role="alert"
              className="mt-6 rounded-xl border border-flame/30 bg-flame-soft/55 px-4 py-3 text-sm text-accent-strong"
            >
              {error}
            </p>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
            <button
              type="button"
              onClick={() => {
                setStep((current) => Math.max(current - 1, 0));
                setError("");
              }}
              className={cn(
                "rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
                step === 0
                  ? "pointer-events-none invisible"
                  : "border border-line bg-surface text-ink hover:border-grape/50 hover:text-grape"
              )}
            >
              ← Back
            </button>
            <div className="flex items-center gap-3">
              <span className="hidden text-xs text-muted sm:inline">
                {step === STEPS.length - 1
                  ? "Produces a draft you can edit and export"
                  : "About two minutes"}
              </span>
              <button
                type="button"
                onClick={continueReview}
                className="inline-flex items-center justify-center rounded-full bg-grape px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:brightness-95"
              >
                {step === STEPS.length - 1 ? "Generate review" : "Continue"} →
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div id="review-result" aria-live="polite">
          <div className="border-b border-line p-5 sm:p-8 lg:p-10">
            <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-semibold",
                      LEVEL_STYLE[review.level]
                    )}
                  >
                    {review.level}
                  </span>
                  <span className="rounded-full border border-line bg-paper px-3 py-1 text-xs text-muted">
                    Draft review
                  </span>
                </div>
                <h3 className="font-display mt-4 text-3xl leading-tight text-ink sm:text-4xl">
                  A launch claim is only as strong as the test behind it.
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-ink/75">
                  {review.levelReason}
                </p>
              </div>

              <dl className="grid grid-cols-3 gap-2 rounded-2xl border border-line bg-paper/55 p-3">
                <Metric value={review.claims.length} label="claims" />
                <Metric value={review.tests.length} label="tests" />
                <Metric value={`${completeRequired}/${requiredGates.length}`} label="gates" />
              </dl>
            </div>

            <div className="mt-6 flex flex-wrap gap-2" data-print-hide>
              <button
                type="button"
                onClick={downloadReview}
                className="rounded-full bg-grape px-4 py-2.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:brightness-95"
              >
                Download review
              </button>
              <button
                type="button"
                onClick={copyReview}
                className="rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-grape/50 hover:text-grape"
              >
                {copied ? "Copied" : "Copy as Markdown"}
              </button>
              <button
                type="button"
                onClick={editReview}
                className="rounded-full px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:text-grape"
              >
                Edit inputs
              </button>
              <button
                type="button"
                onClick={resetReview}
                className="rounded-full px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:text-flame"
              >
                Start over
              </button>
            </div>
          </div>

          <div className="border-b border-line bg-paper/45 px-4 sm:px-8" data-print-hide>
            <div className="flex snap-x gap-1 overflow-x-auto py-2" role="tablist">
              <ResultTabButton
                active={tab === "overview"}
                onClick={() => setTab("overview")}
                count={review.openQuestions.length}
              >
                Review brief
              </ResultTabButton>
              <ResultTabButton
                active={tab === "claims"}
                onClick={() => setTab("claims")}
                count={review.claims.length}
              >
                Claims
              </ResultTabButton>
              <ResultTabButton
                active={tab === "tests"}
                onClick={() => setTab("tests")}
                count={review.tests.length}
              >
                Test pack
              </ResultTabButton>
              <ResultTabButton
                active={tab === "gates"}
                onClick={() => setTab("gates")}
                count={review.gates.length}
              >
                Launch gates
              </ResultTabButton>
            </div>
          </div>

          <div className="p-5 sm:p-8 lg:p-10">
            {tab === "overview" ? (
              <OverviewResult input={input} review={review} />
            ) : null}
            {tab === "claims" ? <ClaimsResult review={review} /> : null}
            {tab === "tests" ? <TestsResult review={review} /> : null}
            {tab === "gates" ? (
              <GatesResult
                review={review}
                completed={completedGates}
                toggle={toggleGate}
              />
            ) : null}
          </div>

          <div className="border-t border-line bg-sunken/35 px-5 py-4 sm:px-8">
            <p className="text-sm leading-relaxed text-muted">
              This output is a structured first pass based only on the information entered. It
              does not test the system, verify the evidence, certify safety, or determine legal
              compliance.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function PurposeStep({
  input,
  update,
  applyPreset,
}: {
  input: LaunchReviewInput;
  update: <K extends keyof LaunchReviewInput>(key: K, value: LaunchReviewInput[K]) => void;
  applyPreset: (index: number) => void;
}) {
  return (
    <div>
      <StepHeading
        number="01"
        title="What are you asking the system to do?"
        body="Start with the product claim. The review will test the boundaries around that claim rather than judging AI in the abstract."
      />

      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        {REVIEW_PRESETS.map((preset, index) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => applyPreset(index)}
            className="rounded-2xl border border-line bg-paper/45 p-4 text-left transition-colors hover:border-grape/45 hover:bg-grape-soft/25"
          >
            <span className="font-display text-base text-ink">Try: {preset.label}</span>
            <span className="mt-1 block text-xs leading-relaxed text-muted">
              {preset.description}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-7 grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
        <TextField
          id="product-name"
          label="Product or feature name"
          value={input.productName}
          placeholder="e.g. Resolve"
          onChange={(value) => update("productName", value)}
        />
        <SelectField
          id="audience"
          label="Primary users"
          value={input.audience}
          onChange={(value) => update("audience", value as Audience)}
          options={[
            ["customers", "Customers or consumers"],
            ["employees", "Employees"],
            ["businesses", "Business customers"],
            ["public", "Members of the public"],
          ]}
        />
      </div>

      <div className="mt-6">
        <TextAreaField
          id="summary"
          label="What does it do?"
          hint="Describe the user, task, output, and any actions the system can take."
          value={input.summary}
          placeholder="A customer support agent that answers order questions and can issue refunds up to..."
          rows={5}
          onChange={(value) => update("summary", value)}
        />
      </div>
    </div>
  );
}

function BoundaryStep({
  input,
  update,
  toggleCapability,
}: {
  input: LaunchReviewInput;
  update: <K extends keyof LaunchReviewInput>(key: K, value: LaunchReviewInput[K]) => void;
  toggleCapability: (capability: CapabilityId) => void;
}) {
  return (
    <div>
      <StepHeading
        number="02"
        title="Where can the system create a consequence?"
        body="Autonomy, sensitive data, and real-world actions change what needs to be proven before a product is ready for use."
      />

      <div className="mt-7 grid gap-6 lg:grid-cols-3">
        <SelectField
          id="autonomy"
          label="Highest level of autonomy"
          value={input.autonomy}
          onChange={(value) => update("autonomy", value as Autonomy)}
          options={[
            ["assist", "Drafts only"],
            ["recommend", "Recommends a decision"],
            ["approve", "Acts after approval"],
            ["independent", "Acts independently"],
          ]}
        />
        <SelectField
          id="data"
          label="Most sensitive data"
          value={input.data}
          onChange={(value) => update("data", value as DataSensitivity)}
          options={[
            ["public", "Public information"],
            ["internal", "Internal information"],
            ["personal", "Personal information"],
            ["regulated", "Regulated or highly sensitive"],
          ]}
        />
        <SelectField
          id="impact"
          label="Impact if it fails"
          value={input.impact}
          onChange={(value) => update("impact", value as FailureImpact)}
          options={[
            ["low", "Low · easy to reverse"],
            ["moderate", "Moderate · meaningful rework"],
            ["high", "High · material consequence"],
          ]}
        />
      </div>

      <fieldset className="mt-8">
        <legend className="text-sm font-semibold text-ink">What can the system do?</legend>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          Select every capability available anywhere in the workflow.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {CAPABILITIES.map((capability) => {
            const checked = input.capabilities.includes(capability.id);
            return (
              <label
                key={capability.id}
                className={cn(
                  "flex cursor-pointer gap-3 rounded-2xl border p-4 transition-colors",
                  checked
                    ? "border-grape/45 bg-grape-soft/40"
                    : "border-line bg-paper/35 hover:border-grape/30"
                )}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleCapability(capability.id)}
                  className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--grape)]"
                />
                <span>
                  <span className="block text-sm font-medium text-ink">{capability.label}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted">
                    {capability.detail}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}

function OversightStep({
  input,
  update,
}: {
  input: LaunchReviewInput;
  update: <K extends keyof LaunchReviewInput>(key: K, value: LaunchReviewInput[K]) => void;
}) {
  return (
    <div>
      <StepHeading
        number="03"
        title="What would make the launch defensible?"
        body="Define the result worth pursuing, the oversight model, and the concern most likely to be lost in a polished demo."
      />

      <div className="mt-7">
        <SelectField
          id="human-review"
          label="When does a person review the work?"
          value={input.review}
          onChange={(value) => update("review", value as HumanReview)}
          options={[
            ["every", "Every material output or action"],
            ["material", "Actions above a defined threshold"],
            ["sampled", "A sample after completion"],
            ["exception", "Only when the system escalates"],
            ["none", "No routine human review"],
          ]}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <TextAreaField
          id="success"
          label="What observable result would make this useful?"
          hint="Describe the outcome. A number is useful when you already have one, but it is not required."
          value={input.success}
          placeholder="Resolve eligible requests accurately without exceeding the refund limit..."
          rows={5}
          onChange={(value) => update("success", value)}
        />
        <TextAreaField
          id="concern"
          label="What concerns you most?"
          hint="Optional. Name the failure that a polished happy path could hide."
          value={input.concern}
          placeholder="The agent could split one large refund into several smaller transactions..."
          rows={5}
          onChange={(value) => update("concern", value)}
        />
      </div>
    </div>
  );
}

function OverviewResult({
  input,
  review,
}: {
  input: LaunchReviewInput;
  review: ReturnType<typeof generateLaunchReview>;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6">
        <ResultBlock eyebrow="Product description" title={input.productName}>
          {input.summary}
        </ResultBlock>
        <ResultBlock eyebrow="System boundary" title="Where the review draws the line">
          {review.systemBoundary}
        </ResultBlock>
        <ResultBlock eyebrow="Prohibited use" title="What the system must not do" tone="flame">
          {review.prohibitedUse}
        </ResultBlock>
      </div>
      <aside className="rounded-2xl border border-line bg-paper/45 p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-grape">
          Open decisions
        </p>
        <h4 className="font-display mt-2 text-2xl text-ink">
          Questions the current description cannot answer
        </h4>
        <ol className="mt-5 space-y-4">
          {review.openQuestions.map((question, index) => (
            <li key={question} className="flex gap-3 text-sm leading-6 text-ink/80">
              <span className="font-display shrink-0 text-grape">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{question}</span>
            </li>
          ))}
        </ol>
      </aside>
    </div>
  );
}

function ClaimsResult({ review }: { review: ReturnType<typeof generateLaunchReview> }) {
  return (
    <div>
      <ResultSectionHeading
        eyebrow="Claims register"
        title="Every promise needs a pass condition"
        body="These are draft claims suggested by the system description. Edit them before treating them as launch requirements."
      />
      <div className="mt-7 grid gap-4 lg:grid-cols-2">
        {review.claims.map((claim, index) => (
          <article key={claim.id} className="rounded-2xl border border-line bg-paper/35 p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <span className="font-display text-sm text-grape">
                C{String(index + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wider",
                  claim.priority === "Required"
                    ? "bg-flame-soft text-flame"
                    : "bg-grape-soft text-grape"
                )}
              >
                {claim.priority}
              </span>
            </div>
            <h4 className="font-display mt-3 text-xl text-ink">{claim.title}</h4>
            <p className="mt-2 text-sm leading-6 text-ink/85">{claim.claim}</p>
            <dl className="mt-5 space-y-4 border-t border-line pt-4 text-sm">
              <div>
                <dt className="font-semibold text-ink">Pass condition</dt>
                <dd className="mt-1 leading-6 text-muted">{claim.acceptance}</dd>
              </div>
              <div>
                <dt className="font-semibold text-ink">Evidence to retain</dt>
                <dd className="mt-1 leading-6 text-muted">{claim.evidence}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}

function TestsResult({ review }: { review: ReturnType<typeof generateLaunchReview> }) {
  return (
    <div>
      <ResultSectionHeading
        eyebrow="Evaluation pack"
        title="Test the boundary, not only the happy path"
        body="Each case names the scenario, expected behaviour, and observable pass condition before a test is run."
      />
      <div className="mt-7 space-y-3">
        {review.tests.map((test, index) => (
          <article
            key={test.id}
            className="grid gap-4 rounded-2xl border border-line bg-paper/35 p-5 lg:grid-cols-[3rem_0.75fr_1fr] lg:items-start"
          >
            <span className="font-display text-sm text-grape">
              T{String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <span
                className={cn(
                  "inline-flex rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wider",
                  KIND_STYLE[test.kind]
                )}
              >
                {test.kind}
              </span>
              <h4 className="font-display mt-3 text-xl text-ink">{test.title}</h4>
              <p className="mt-2 text-sm leading-6 text-muted">{test.scenario}</p>
            </div>
            <dl className="space-y-4 rounded-xl border border-line bg-surface p-4 text-sm">
              <div>
                <dt className="font-semibold text-ink">Expected behaviour</dt>
                <dd className="mt-1 leading-6 text-muted">{test.expected}</dd>
              </div>
              <div>
                <dt className="font-semibold text-ink">Pass condition</dt>
                <dd className="mt-1 leading-6 text-muted">{test.pass}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}

function GatesResult({
  review,
  completed,
  toggle,
}: {
  review: ReturnType<typeof generateLaunchReview>;
  completed: string[];
  toggle: (id: string) => void;
}) {
  const required = review.gates.filter((gate) => gate.priority === "Required");
  const done = required.filter((gate) => completed.includes(gate.id)).length;
  const percentage = required.length ? Math.round((done / required.length) * 100) : 0;

  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-[1fr_19rem] lg:items-end">
        <ResultSectionHeading
          eyebrow="Launch gates"
          title="A decision needs evidence and an owner"
          body="Check a gate only when the evidence exists and has been reviewed. The checklist is saved in the downloaded report during this session."
        />
        <div className="rounded-2xl border border-line bg-paper/45 p-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="font-display text-2xl text-ink">
                {done}/{required.length}
              </span>
              <p className="text-xs text-muted">required gates evidenced</p>
            </div>
            <span className="text-sm font-medium text-grape">{percentage}%</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-sunken">
            <div
              className="h-full rounded-full bg-grape transition-[width] duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-7 space-y-3">
        {review.gates.map((gate) => {
          const checked = completed.includes(gate.id);
          return (
            <article
              key={gate.id}
              className={cn(
                "rounded-2xl border p-5 transition-colors sm:p-6",
                checked ? "border-mint/35 bg-mint-soft/35" : "border-line bg-paper/35"
              )}
            >
              <div className="flex gap-4">
                <button
                  type="button"
                  aria-label={`${checked ? "Mark incomplete" : "Mark complete"}: ${gate.title}`}
                  aria-pressed={checked}
                  onClick={() => toggle(gate.id)}
                  className={cn(
                    "mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition-colors",
                    checked
                      ? "border-mint bg-mint text-white"
                      : "border-line bg-surface text-transparent hover:border-mint"
                  )}
                >
                  ✓
                </button>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h4 className="font-display text-xl text-ink">{gate.title}</h4>
                      <p className="mt-1 text-sm leading-6 text-ink/80">{gate.question}</p>
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wider",
                        gate.priority === "Required"
                          ? "bg-flame-soft text-flame"
                          : "bg-grape-soft text-grape"
                      )}
                    >
                      {gate.priority}
                    </span>
                  </div>
                  <dl className="mt-4 grid gap-4 border-t border-line pt-4 text-sm lg:grid-cols-[1fr_13rem]">
                    <div>
                      <dt className="font-semibold text-ink">Evidence expected</dt>
                      <dd className="mt-1 leading-6 text-muted">{gate.evidence}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-ink">Suggested owner</dt>
                      <dd className="mt-1 leading-6 text-muted">{gate.owner}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function StepHeading({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-[3rem_1fr]">
      <span className="font-display text-sm text-grape">{number}</span>
      <div>
        <h3 className="font-display text-2xl leading-tight text-ink sm:text-3xl">{title}</h3>
        <p className="mt-2 text-base leading-relaxed text-muted">{body}</p>
      </div>
    </div>
  );
}

function ResultSectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-grape">{eyebrow}</p>
      <h3 className="font-display mt-2 text-3xl text-ink">{title}</h3>
      <p className="mt-2 text-base leading-relaxed text-muted">{body}</p>
    </div>
  );
}

function TextField({
  id,
  label,
  value,
  placeholder,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <input
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-xl border border-line bg-paper/45 px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-muted/65 focus:border-grape focus:ring-2 focus:ring-grape/15"
      />
    </label>
  );
}

function TextAreaField({
  id,
  label,
  hint,
  value,
  placeholder,
  rows,
  onChange,
}: {
  id: string;
  label: string;
  hint: string;
  value: string;
  placeholder: string;
  rows: number;
  onChange: (value: string) => void;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <span className="mt-1 block text-xs leading-relaxed text-muted">{hint}</span>
      <textarea
        id={id}
        value={value}
        placeholder={placeholder}
        rows={rows}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full resize-y rounded-xl border border-line bg-paper/45 px-4 py-3 text-base leading-relaxed text-ink outline-none transition-colors placeholder:text-muted/65 focus:border-grape focus:ring-2 focus:ring-grape/15"
      />
    </label>
  );
}

function SelectField({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  options: [string, string][];
  onChange: (value: string) => void;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-xl border border-line bg-paper/45 px-4 py-3 text-base text-ink outline-none transition-colors focus:border-grape focus:ring-2 focus:ring-grape/15"
      >
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </label>
  );
}

function Metric({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="rounded-xl bg-surface px-2 py-3 text-center">
      <dt className="font-display text-xl text-ink">{value}</dt>
      <dd className="mt-0.5 text-[0.65rem] uppercase tracking-wider text-muted">{label}</dd>
    </div>
  );
}

function ResultTabButton({
  active,
  onClick,
  count,
  children,
}: {
  active: boolean;
  onClick: () => void;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
        active ? "bg-grape text-white" : "text-muted hover:bg-surface hover:text-ink"
      )}
    >
      {children}
      <span
        className={cn(
          "rounded-full px-1.5 py-0.5 text-[0.65rem]",
          active ? "bg-white/20 text-white" : "bg-sunken text-muted"
        )}
      >
        {count}
      </span>
    </button>
  );
}

function ResultBlock({
  eyebrow,
  title,
  tone = "grape",
  children,
}: {
  eyebrow: string;
  title: string;
  tone?: "grape" | "flame";
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-line bg-paper/35 p-5 sm:p-6">
      <p
        className={cn(
          "text-xs font-semibold uppercase tracking-[0.16em]",
          tone === "grape" ? "text-grape" : "text-flame"
        )}
      >
        {eyebrow}
      </p>
      <h4 className="font-display mt-2 text-2xl text-ink">{title}</h4>
      <p className="mt-3 text-base leading-7 text-ink/80">{children}</p>
    </section>
  );
}
