"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type CheckState = "pass" | "review" | "fail";

type Check = {
  label: string;
  detail: string;
  state: CheckState;
  control: string;
  slug: string;
};

type Scenario = {
  id: string;
  tab: string;
  title: string;
  summary: string;
  product: string;
  total: string;
  seller: string;
  timing: string;
  checks: Check[];
};

const SCENARIOS: Scenario[] = [
  {
    id: "exact",
    tab: "Exact match",
    title: "The cart matches the recorded permission",
    summary:
      "The item, final total, seller, and timing all fit the mandate the buyer confirmed.",
    product: "Alpine 55 · hard-shell cabin suitcase",
    total: "CA$238 · tax and delivery included",
    seller: "Maple Travel",
    timing: "5:12 p.m. · mandate is live",
    checks: [
      {
        label: "Product scope",
        detail: "One hard-shell cabin suitcase",
        state: "pass",
        control: "C1",
        slug: "mandate-capture",
      },
      {
        label: "Final total",
        detail: "CA$238 is within the CA$250 all-in cap",
        state: "pass",
        control: "C2",
        slug: "check-at-commit",
      },
      {
        label: "Seller identity",
        detail: "Maple Travel is on the approved seller list",
        state: "pass",
        control: "C3",
        slug: "prove-who-it-acts-for",
      },
      {
        label: "Substitution",
        detail: "No material, size, or product change",
        state: "pass",
        control: "C5",
        slug: "show-before-commit",
      },
      {
        label: "Live authority",
        detail: "One-use mandate is live and unused",
        state: "pass",
        control: "C6",
        slug: "make-stop-mean-stop",
      },
    ],
  },
  {
    id: "substitute",
    tab: "Substitution",
    title: "The replacement is cheaper, but materially different",
    summary:
      "The agent found an in-budget soft-shell alternative. The recorded permission says to ask before changing material.",
    product: "Cloud 55 · soft-shell cabin suitcase",
    total: "CA$211 · tax and delivery included",
    seller: "Maple Travel",
    timing: "5:20 p.m. · mandate is live",
    checks: [
      {
        label: "Product scope",
        detail: "Cabin suitcase, but the shell type changed",
        state: "review",
        control: "C1",
        slug: "mandate-capture",
      },
      {
        label: "Final total",
        detail: "CA$211 is within the CA$250 all-in cap",
        state: "pass",
        control: "C2",
        slug: "check-at-commit",
      },
      {
        label: "Seller identity",
        detail: "Maple Travel is on the approved seller list",
        state: "pass",
        control: "C3",
        slug: "prove-who-it-acts-for",
      },
      {
        label: "Substitution",
        detail: "Buyer confirmation is required for this change",
        state: "review",
        control: "C5",
        slug: "show-before-commit",
      },
      {
        label: "Live authority",
        detail: "One-use mandate is live and unused",
        state: "pass",
        control: "C6",
        slug: "make-stop-mean-stop",
      },
    ],
  },
  {
    id: "seller",
    tab: "Seller mismatch",
    title: "The storefront name hides a different marketplace seller",
    summary:
      "The product page looks familiar, but the party taking the order is outside the approved seller list.",
    product: "Alpine 55 · hard-shell cabin suitcase",
    total: "CA$226 · tax and delivery included",
    seller: "RoadKit Deals · via Maple Marketplace",
    timing: "5:31 p.m. · mandate is live",
    checks: [
      {
        label: "Product scope",
        detail: "One hard-shell cabin suitcase",
        state: "pass",
        control: "C1",
        slug: "mandate-capture",
      },
      {
        label: "Final total",
        detail: "CA$226 is within the CA$250 all-in cap",
        state: "pass",
        control: "C2",
        slug: "check-at-commit",
      },
      {
        label: "Seller identity",
        detail: "RoadKit Deals is not an approved seller",
        state: "fail",
        control: "C3",
        slug: "prove-who-it-acts-for",
      },
      {
        label: "Substitution",
        detail: "No material, size, or product change",
        state: "pass",
        control: "C5",
        slug: "show-before-commit",
      },
      {
        label: "Live authority",
        detail: "One-use mandate is live and unused",
        state: "pass",
        control: "C6",
        slug: "make-stop-mean-stop",
      },
    ],
  },
  {
    id: "revoked",
    tab: "Revoked",
    title: "The buyer withdrew permission while the agent was shopping",
    summary:
      "The cart still matches the original instruction, but the authority behind it is no longer live.",
    product: "Alpine 55 · hard-shell cabin suitcase",
    total: "CA$238 · tax and delivery included",
    seller: "Maple Travel",
    timing: "5:38 p.m. · revoked at 5:35 p.m.",
    checks: [
      {
        label: "Product scope",
        detail: "One hard-shell cabin suitcase",
        state: "pass",
        control: "C1",
        slug: "mandate-capture",
      },
      {
        label: "Final total",
        detail: "CA$238 is within the CA$250 all-in cap",
        state: "pass",
        control: "C2",
        slug: "check-at-commit",
      },
      {
        label: "Seller identity",
        detail: "Maple Travel is on the approved seller list",
        state: "pass",
        control: "C3",
        slug: "prove-who-it-acts-for",
      },
      {
        label: "Substitution",
        detail: "No material, size, or product change",
        state: "pass",
        control: "C5",
        slug: "show-before-commit",
      },
      {
        label: "Live authority",
        detail: "The mandate was revoked before commitment",
        state: "fail",
        control: "C6",
        slug: "make-stop-mean-stop",
      },
    ],
  },
];

const STATE_LABEL: Record<CheckState, string> = {
  pass: "Pass",
  review: "Ask",
  fail: "Fail",
};

const STATE_STYLE: Record<CheckState, string> = {
  pass: "bg-mint-soft text-mint",
  review: "bg-gold-soft text-ink",
  fail: "bg-flame-soft text-flame",
};

function outcome(checks: Check[]) {
  if (checks.some((check) => check.state === "fail")) {
    return {
      label: "Block the payment",
      detail: "At least one condition fails. The credential should not be usable for this cart.",
      style: "border-flame/35 bg-flame-soft/55",
      dot: "bg-flame",
    };
  }

  if (checks.some((check) => check.state === "review")) {
    return {
      label: "Ask the buyer",
      detail: "The agent needs a fresh decision before it can proceed with this changed cart.",
      style: "border-gold/45 bg-gold-soft/55",
      dot: "bg-gold",
    };
  }

  return {
    label: "Allow the payment",
    detail: "Every recorded condition matches. The payment can proceed with a scoped credential.",
    style: "border-mint/35 bg-mint-soft/55",
    dot: "bg-mint",
  };
}

export function PermissionTest() {
  const [activeId, setActiveId] = useState(SCENARIOS[0].id);
  const scenario =
    SCENARIOS.find((item) => item.id === activeId) ?? SCENARIOS[0];
  const decision = outcome(scenario.checks);

  return (
    <div className="overflow-hidden rounded-3xl border border-grape/25 bg-surface shadow-[0_18px_60px_rgba(73,64,40,0.08)]">
      <div className="border-b border-line bg-grape-soft/45 px-5 py-6 sm:px-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-grape">
              Interactive control test
            </p>
            <h3 className="font-display mt-2 text-2xl text-ink sm:text-3xl">
              Would this purchase still be authorised?
            </h3>
          </div>
          <span className="rounded-full border border-grape/25 bg-surface px-3 py-1 text-xs font-medium text-grape">
            Illustrative logic
          </span>
        </div>
        <p className="mt-3 max-w-[70ch] leading-relaxed text-ink/75">
          Keep the buyer&apos;s permission fixed. Change the proposed purchase and
          see why a budget check on its own is not enough.
        </p>
      </div>

      <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
        <section className="border-b border-line p-5 sm:p-7 lg:border-b-0 lg:border-r">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Recorded permission
          </p>
          <h4 className="font-display mt-2 text-xl text-ink">
            Buy one cabin suitcase
          </h4>
          <dl className="mt-5 divide-y divide-line rounded-2xl border border-line bg-paper/55 px-4">
            <MandateRow term="Scope" detail="Hard-shell · cabin size · one item" />
            <MandateRow term="Total cap" detail="CA$250, including tax and delivery" />
            <MandateRow term="Sellers" detail="Maple Travel or Northstar Luggage" />
            <MandateRow term="Changes" detail="Ask before changing material or size" />
            <MandateRow term="Duration" detail="One purchase · expires at 6:00 p.m." />
          </dl>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            This is a human-readable example of a mandate. A real system would
            encode the same conditions in a signed, machine-checkable record.
          </p>
        </section>

        <section className="min-w-0 p-5 sm:p-7">
          <fieldset>
            <legend className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Proposed purchase
            </legend>
            <div className="mt-3 flex snap-x gap-2 overflow-x-auto pb-2" aria-label="Purchase scenarios">
              {SCENARIOS.map((item) => {
                const selected = item.id === scenario.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setActiveId(item.id)}
                    className={cn(
                      "min-h-11 shrink-0 snap-start rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grape",
                      selected
                        ? "border-grape bg-grape text-white"
                        : "border-line bg-paper text-ink hover:border-grape/55"
                    )}
                  >
                    {item.tab}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-5" aria-live="polite">
            <h4 className="font-display text-xl leading-snug text-ink">
              {scenario.title}
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {scenario.summary}
            </p>

            <dl className="mt-5 grid gap-3 rounded-2xl border border-line bg-paper/45 p-4 sm:grid-cols-2">
              <ProposalField term="Item" detail={scenario.product} />
              <ProposalField term="Final total" detail={scenario.total} />
              <ProposalField term="Seller of record" detail={scenario.seller} />
              <ProposalField term="Commit time" detail={scenario.timing} />
            </dl>

            <div className="mt-5 space-y-2">
              {scenario.checks.map((check) => (
                <div
                  key={check.label}
                  className="grid gap-2 rounded-xl border border-line px-4 py-3 sm:grid-cols-[1fr_auto] sm:items-center"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-ink">{check.label}</span>
                      <Link
                        href={`/agents/${check.slug}`}
                        className="text-xs font-semibold text-grape hover:underline"
                      >
                        {check.control}
                      </Link>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {check.detail}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-semibold",
                      STATE_STYLE[check.state]
                    )}
                  >
                    {STATE_LABEL[check.state]}
                  </span>
                </div>
              ))}
            </div>

            <div className={cn("mt-5 rounded-2xl border p-5", decision.style)}>
              <div className="flex items-center gap-2">
                <span className={cn("h-2.5 w-2.5 rounded-full", decision.dot)} />
                <p className="font-display text-xl text-ink">{decision.label}</p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">
                {decision.detail}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function MandateRow({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="grid gap-1 py-3 sm:grid-cols-[5.5rem_1fr]">
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
        {term}
      </dt>
      <dd className="text-sm leading-relaxed text-ink/85">{detail}</dd>
    </div>
  );
}

function ProposalField({ term, detail }: { term: string; detail: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
        {term}
      </dt>
      <dd className="mt-1 text-sm leading-relaxed text-ink/85">{detail}</dd>
    </div>
  );
}
