# The Mandate Problem — project spec

Working title for a control framework covering AI agents that transact on a
person's behalf, plus the tool that applies it and the site section that
publishes it.

**Status:** spec, not started. **Owner:** Mubien Ahsan. **Drafted:** September 2026.

---

## 1. Why this, and why now

The Agentic Commerce Protocol — co-developed by OpenAI and Stripe, open-sourced
under Apache 2.0 in September 2025, stable spec dated 2026-04-17 — standardises
how an AI agent completes a purchase: cart, checkout, delegated payment tokens,
OAuth delegated authentication, MCP integration. PayPal joined as a payment
provider in October 2025; Stripe shipped its Agentic Commerce Suite that
December.

**The protocol settles how an agent pays. It does not settle what the agent was
authorised to buy.** The payment credential is narrowly scoped; the *mandate* —
what the human actually agreed to — is not captured, not machine-checkable, and
not auditable after the fact.

That gap is the subject.

It is not hypothetical. Palo Alto Unit 42 and Forcepoint X-Labs have both
documented indirect prompt injection running on live sites. The canonical
commerce attack: an agent crawling for discounts ingests an injected
instruction, appends a gift card routed to the attacker, and because the
interface surfaces only an order total, the buyer discovers it on a bank
statement. Separately, the industry has no agent identity layer — a merchant
cannot presently verify that an agent is acting for the principal it claims.

### The angle nobody else has

An AI agent transacting for a user is, in law, **an agent acting for a
principal**. Agency doctrine has spent centuries on exactly the questions the
industry is now rediscovering badly:

- **Actual authority** — what was the agent in fact permitted to do?
- **Apparent authority** — when may a merchant rely on what the agent appeared
  to be permitted to do?
- **Ratification** — does the principal's silence after the fact adopt an
  unauthorised act?
- **Breach of warranty of authority** — what does the agent owe a third party it
  misled about its own authority?

Mapping that doctrine onto machine-checkable controls is the contribution. It is
not another framework explainer, and it is not something a purely technical or
purely policy background produces.

---

## 2. Reader, and what success looks like

**Primary reader:** someone building or governing agentic commerce at a
payments or commerce platform — Stripe, Shopify, Block and the tier around them.
Engineering-led, ships fast, allergic to compliance theatre, genuinely unsure
how to bound an agent that spends money.

**Secondary reader:** a hiring manager for an AI governance or responsible AI
role at one of those companies, arriving from a CV link.

**Success:** a reader recognises a problem they are currently arguing about
internally, and finds it already worked through — failure mode, legal principle,
control, and how you would evidence it. Citation is the success metric, not
traffic.

**Explicit non-goals:** not legal advice; not a compliance product; not a
standard competing with ACP. This layers on top of ACP, it does not replace it.

---

## 3. What gets built

| # | Artifact | Where |
|---|---|---|
| 1 | The control framework | `public/essays/the-mandate-problem.pdf` |
| 2 | Site section | `/agents` |
| 3 | Assessment tool | `/agents/assess` |

### 3.1 The document

Same register as *The Verification Gap*: plain language, no hedging, positions
taken. Around 12–18 pages. Structure:

1. What ACP solved and what it left open
2. Agency law in four paragraphs, for readers who have never met it
3. The controls (§4), one per section, in the fixed shape below
4. What is still unresolved, stated honestly rather than papered over

**Fixed shape per control** — this is the unit of the whole project:

> **The failure** — a concrete scenario, ideally a documented one.
> **The principle** — the doctrine or regulation that already governs it.
> **The control** — what to implement, specific enough to build.
> **The evidence** — what artefact proves the control operated. If you cannot
> produce it, you cannot answer the question a dispute will ask.
> **Where it touches regulation** — EU AI Act, consumer protection, card scheme
> rules, ISO 42001, NIST AI RMF, where genuinely applicable and not stretched.

### 3.2 The site section

`/agents` — the problem stated in a few hundred words, the document, the tool,
and each control as its own entry so they can publish one at a time and be
linked individually. Built with existing primitives (`Container`, `PageIntro`,
`Pill`, `CtaLink`), grape tone, matching `/library`.

### 3.3 The tool

`/agents/assess` — describe an agentic commerce setup in plain English, receive
a structured assessment against the control set: which controls are met, which
are not, what evidence is missing.

Same architecture as the existing governance agent: a Next.js route calling the
Anthropic API with a structured output schema, no persistence, no accounts.
Rate limited. Framed as a starting point for a human review, never as a verdict.

---

## 4. The control set

Eight candidates. Five or six done properly beats eight done thinly — depth is
the signal being sent.

| # | Control | Core question |
|---|---|---|
| C1 | **Mandate capture** | What did the human actually authorise — amount, category, window, recurrence — and is it machine-checkable before the agent commits? |
| C2 | **Scope enforcement at transaction time** | Is scope checked against the mandate at commit, or merely inferred from the prompt that started the task? |
| C3 | **Agent identity and attestation** | How does a merchant verify this agent acts for the principal it claims? The layer nobody has built. |
| C4 | **Untrusted content boundary** | The agent reads the open web. Injected instructions are live in the wild. What separates content it reads from instructions it follows? |
| C5 | **Principal visibility before commit** | The gift-card attack works because the interface shows a total. What must the human see, and when? |
| C6 | **Revocation** | Can a mandate be withdrawn mid-task, and what happens to work already in flight? |
| C7 | **Reconstruction** | Can you rebuild, months later, why the agent bought this — inputs, scope check, decision? Disputes are retrospective. |
| C8 | **Liability allocation** | Agent exceeds authority: principal, agent operator, or merchant? Ratification, apparent authority, and where card scheme rules already answer it. |

**Sequencing:** C1 and C2 first — they are the thesis and the rest hang off
them. Then C4 and C5, which are where documented attacks live. C3 and C8 are the
most intellectually interesting and the slowest. C6 and C7 are the most
mechanical and can be written quickly.

---

## 5. Build order

**Phase 1 — stake the ground.** `/agents` page live with the problem statement
and C1 published in full. One control, done properly, beats an announced
roadmap. A day or two of work.

**Phase 2 — the spine.** C2, C4, C5. At four controls it reads as a body of
work rather than a blog post.

**Phase 3 — the tool.** Only once the controls exist, because the tool assesses
against them and building it first would mean inventing the criteria twice.

**Phase 4 — the document.** Collect, edit for continuity, add the opening and
the unresolved section, publish as PDF alongside *The Verification Gap*.

**Cadence:** one control every two weeks, sustained, beats weekly for a month
then silence. An abandoned series reads worse than none.

---

## 6. Constraints

- **Entirely personal.** Public sources only. Nothing drawn from, resembling, or
  informed by client work. No employer named anywhere, in any artifact.
- **Disclose at the September 2027 re-approval.**
- **No named-company assessments.** Analyse published protocols, documented
  attack classes and public incidents. Do not publish a compliance judgement
  about a named company — different risk profile entirely.
- **Not legal advice**, stated on the page and in the document.
- **Every factual claim carries a source.** Regulatory dates and protocol
  details move; a wrong citation costs more credibility here than silence.

---

## 7. Open questions

1. **Title.** *The Mandate Problem* is the working name. Alternatives: *Acting
   on Your Behalf*, *Scope of Authority*, *What the Agent Was Allowed to Do*.
2. **Tool public, or demo?** Public means maintenance and an abuse surface. A
   recorded walkthrough plus open source may buy most of the credibility for a
   fraction of the work.
3. **Jurisdiction for the agency-law grounding.** Common law generally, or
   Ontario specifically? Common law travels better for a US-headquartered
   reader; Ontario is more precise and more defensible.
4. **Does C8 belong at all?** Liability allocation is where this most resembles
   legal advice. Possibly framed as open questions rather than controls.
5. **Publish controls as MDX pages or a single growing page?** MDX matches the
   existing course structure and gives each control its own URL to link.
