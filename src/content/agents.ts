import type { Tone } from "@/components/ui";

/*
  Controls for AI agents that transact on someone's behalf.

  Every control is written in the same five parts. That shape is the point: a
  failure nobody can argue with, the principle that already governs it, the
  control to build, the evidence that proves it ran, and an honest note on where
  regulation actually touches — rather than a stretched claim that it does.

  On naming: specifications, published research and public guidance are named,
  because a reader has to be able to go and check them. Nothing here is a
  judgement about any company's conduct or compliance, and where a published
  specification stops short of something, that is described as a limit of the
  document's scope rather than a failing of whoever wrote it.
*/

/**
 * Terms a reader may not have met, defined once and shown on click.
 *
 * Nothing here is a definition of law — each is a plain-language gloss so an
 * engineer can read the legal paragraphs and a lawyer can read the technical
 * ones. Mark a term in body text as [[term]] and it renders as a button.
 */
export const GLOSSARY: Record<string, string> = {
  principal:
    "The person an agent acts for. If you send an agent shopping, you are the principal and it is the agent.",
  "actual authority":
    "What the principal actually permitted the agent to do, either spelled out or reasonably implied from what was said.",
  "apparent authority":
    "What a third party, such as a shop, may reasonably believe the agent was permitted to do — based on something the principal did, not on the agent's own say-so. It can outlast actual authority.",
  ratification:
    "Approving an act after it has happened, sometimes by staying silent once you know about it. It can turn an unauthorised purchase into an authorised one.",
  "breach of warranty of authority":
    "The claim available to someone who dealt with an agent on the strength of authority the agent did not actually have.",
  "power given as security":
    "Authority granted to protect an interest of the person holding it, rather than for the principal's convenience. Historically called a power coupled with an interest, and unlike ordinary authority it may not be freely revocable.",
  mandate:
    "The record of what the agent was permitted to buy: amount, scope, duration, and what to do when the exact thing is unavailable. C1 is about capturing it.",
  "prompt injection":
    "Text placed where an agent will read it, written so the agent treats it as an instruction rather than as content. Indirect prompt injection is the version planted on a page the agent fetches.",
  "self-contained token":
    "A credential a recipient can validate on its own, without asking the issuer. Convenient, and the reason revocation is hard: there is nobody to ask whether it has been withdrawn.",
  "fail closed":
    "When a check cannot run, refuse the action rather than allow it. The opposite, failing open, breaks in the attacker's favour.",
  "least privilege":
    "Give the agent only the access this task needs, for as long as it needs it. It limits the damage of a successful attack rather than preventing one.",
  "web bot auth":
    "A proposal for agents to sign the web requests they send, so a site can check which software is calling. It answers who the agent is, and says nothing about who authorised it.",
  "delegated payment credential":
    "A payment method minted for one specific use, capped at an amount and an expiry, rather than a card number that works anywhere.",
};

export type ControlSection = {
  heading: string;
  /** Paragraphs. Kept as plain strings so the content stays readable here. */
  body: string[];
  /** Optional figure rendered under this section's prose. */
  diagram?: "three-clocks";
};

export type Control = {
  slug: string;
  ref: string;
  title: string;
  question: string;
  tone: Tone;
  published: string | null;
  /**
   * When the factual claims were last verified against sources. This space
   * moves fast enough that a claim true in March can be wrong by September,
   * so the date is published rather than kept privately.
   */
  lastChecked: string;
  summary: string;
  sections: ControlSection[];
};

export const CONTROLS: Control[] = [
  {
    slug: "mandate-capture",
    ref: "C1",
    title: "Write down what the agent is allowed to buy",
    question:
      "What did the person actually agree to, and can a machine check it before the money moves?",
    tone: "grape",
    published: "September 2026",
    lastChecked: "16 September 2026",
    summary:
      "The checkout protocols record the purchase a buyer is approving and limit the credential that pays for it. They do not record the standing permission the agent was sent out with — what it may buy, from whom, and what to do when the item is gone. The card networks are now building exactly that, which is the strongest sign the gap is real.",
    sections: [
      {
        heading: "What goes wrong",
        body: [
          "Someone asks an agent to book a flight to Toronto. It books business class for $4,200. They meant economy.",
          "The airline took the money in good faith and it is gone. Now the argument starts, and it is hard to settle, because nothing wrote down what the buyer agreed to. There is an instruction at one end, a payment at the other, and nothing in between recording what the agent was allowed to do.",
          "There is a worse version of this, and it is already happening. Security researchers at Palo Alto's Unit 42 and at Forcepoint have each found hidden instructions planted on live websites: text that a person scrolling the page never sees, but that an agent reads and treats as direction. Forcepoint's April 2026 research includes payloads aimed at taking money.",
          "Applied to shopping, the attack is easy to picture. Hidden text tells the agent to add something the buyer never asked for, and if the screen shows a total rather than a full basket, nobody notices until a statement arrives. I have not found a documented case of exactly that, so treat it as a predictable next step rather than something that has already happened.",
        ],
      },
      {
        heading: "The law already has a name for this",
        body: [
          "It is an old problem in new clothes. When one person acts for another, the law calls them an agent, and it calls the person they act for the [[principal]]. It has spent centuries working out who is responsible for what.",
          "Whether an AI counts as the agent in that legal sense is not settled — it might be the software, it might be the company that built it. Nothing here assumes an answer. But the questions agency law asks are the right questions, and there are three of them.",
          "First: what was the agent actually allowed to do? [[Actual authority]] can be spelled out or reasonably implied, so a vague instruction does not leave an agent with nothing to work from. It also does not hand over a blank cheque. “Buy me a laptop” is not permission to buy a Ferrari, and the gap between the two is not filled by whatever the agent guesses you would have wanted.",
          "Second: can the shop rely on it? This is [[apparent authority]]. If a seller reasonably believed the agent had permission, and that belief traces back to something the buyer did, the seller may be protected. But that is the hard part, not the easy part. Does handing an agent your card details tell a merchant it can buy anything? Does using a particular platform? Nobody has answered that, and these disputes will have to.",
          "Third: what if you find out later and say nothing? This is [[ratification]], and staying quiet can count as agreeing after the fact, though not automatically. It usually turns on whether you knew what had happened, and on whether a reasonable person would read your silence as approval. That matters a great deal when the first you hear of a purchase is a statement three weeks later.",
        ],
      },
      {
        heading: "What to build",
        body: [
          "Write the permission down before the agent goes anywhere, in a form a machine can check, and then check it again at the moment money actually moves.",
          "At a minimum it should say: the most that can be spent in total, what kinds of things or which shops are in scope, how long the permission lasts, whether it is good for one purchase or many, and what the agent should do when the exact thing is unavailable.",
          "That last one matters more than it sounds. Substitution is where a helpful agent turns into an unauthorised purchase. Out of stock, so it bought the next size up. Sold out, so it bought a similar model at twice the price. Every one of those is a decision the buyer never made.",
          "Build the permission from what the buyer said, and then have the buyer confirm it. An agent that works out its own permission from a vague sentence has not been authorised — it has guessed, and the guess is what gets argued about later.",
          "The Agentic Commerce Protocol, the open specification for agent checkout, already limits the [[delegated payment credential]] to one use, a maximum amount and an expiry, based on the checkout the buyer has just approved. That is the right instinct, and more than critics usually give it credit for. What the specification does not describe is what the agent was allowed to go looking for before any checkout existed — which is a boundary on its scope rather than a defect, because the document is about finishing a purchase and it does that job well.",
        ],
      },
      {
        heading: "What proves it worked",
        body: [
          "Two records, and without both of them you cannot answer the question a dispute will ask.",
          "One: what the buyer confirmed, timestamped and unchangeable, showing their decision rather than the agent's interpretation of it. Two: proof that the purchase was checked against that permission before it went through, along with what the check returned.",
          "The test is not whether you can explain the purchase today. It is whether somebody who does not trust you can work out what happened eleven months from now, from your records, without your help.",
        ],
      },
      {
        heading: "What the rules actually say",
        body: [
          "Less than people claim, and pretending otherwise is how this kind of writing loses its readers.",
          "The EU AI Act's transparency rules under Article 50 have applied since 2 August 2026, but they are about whether a person knows they are dealing with an AI, not about what it may buy. The AI Omnibus came into force on 27 July 2026 and moved the high-risk rules for Annex III systems — the Act's list of sensitive uses, covering things like employment, credit and essential services — to 2 December 2027. That regime is not a general agentic-commerce regime, and it does not automatically cover ordinary shopping agents.",
          "Card network rules on authorisation, disputes and chargebacks still decide who absorbs a loss, and they are the most immediately relevant rules here. The networks are also not standing still: Visa, Mastercard and others are building controls specific to agents — who the agent represents, what it may do, under what conditions — and in September 2026 Visa, Mastercard and Ant International announced work towards a shared agent-trust framework.",
          "Worth noting against my own argument: the card networks are already building this. Mastercard's Agent Pay binds a token at provisioning to a specific agent and to the cardholder's limits, covering spend ceilings, merchant categories, time windows and recurring rules. That is close to the structure described above, and it does not weaken the case for recording permission. It is the clearest evidence available that the gap is real, and it is covered properly in C3.",
          "I am not aware of a general legal requirement to record permission the way this describes. Agency principles and card network rules will settle these arguments long before any dedicated law does, which is a reason to build it now rather than wait to be told.",
        ],
      },
    ],
  },
  {
    slug: "check-at-commit",
    ref: "C2",
    title: "Check permission when the money moves, not when the task starts",
    question:
      "A task that begins inside its limits can wander outside them. Where is the check?",
    tone: "grape",
    published: "September 2026",
    lastChecked: "16 September 2026",
    summary:
      "Most systems validate at the top: the request looks reasonable, so the agent is let loose. But an agent reads the open web, changes plan, and adds up small decisions along the way. The only check that counts is the one immediately before the payment.",
    sections: [
      {
        heading: "What goes wrong",
        body: [
          "A buyer sets a limit of $100 for a coffee maker. The agent starts well within it. Then something changes mid-task.",
          "Maybe the item is out of stock and it picks a pricier one. Maybe the price moved. Maybe it read a hidden instruction on a page and added something nobody asked for. In each case the task began inside the limit and ended outside it, so if the only check ran at the start, it checked a plan that no longer exists.",
          "There is a quieter version that catches people out. An agent books a flight, then a bag, then a seat, then a hotel. Each step looks fine on its own, but added together they pass the limit.",
          "This one is concrete rather than hypothetical. The Agentic Commerce Protocol limits each delegated payment on its own — one use, a maximum amount, an expiry — and does not, by itself, keep a running budget across separate purchases. That is a statement about what the specification covers rather than a criticism of it: keeping a household budget was never what a checkout protocol set out to do. The practical consequence is still real. An agent can make several individually permitted payments that together go past what the buyer had in mind, unless something else is tracking the total.",
          "Both failures share a cause. The check ran against intentions rather than against the thing that actually happened.",
        ],
      },
      {
        heading: "Why the timing matters",
        body: [
          "When the law asks whether an agent had permission, what matters is the moment the agent acted, not the moment the instructions were first given. Permission can change, expire, be withdrawn, or simply end once its purpose has been served.",
          "That maps cleanly onto software. A limit checked at the start is a statement about what the agent intended; a limit checked at the point of payment is a statement about what it did. Only the second is worth anything in an argument.",
          "One wrinkle is worth knowing. Permission ending on your side does not automatically end what a shop may reasonably believe, because a merchant can sometimes still rely on authority that looks like it is still there. Withdrawing permission quietly is not the same as withdrawing it effectively, which is the whole of C6.",
          "The timing also matters for the hidden-instruction attack. An injected instruction works precisely by changing the agent's behaviour after it has started, so any check that ran before it read that page is checking a version of the task the attacker has since replaced.",
        ],
      },
      {
        heading: "What to build",
        body: [
          "Check against the recorded permission immediately before each purchase completes, rather than when the task is created.",
          "Track the running total across the whole task, not each purchase in isolation. A limit that applies only per transaction is not a limit — it is a suggestion that resets.",
          "Re-check after any step where the agent has read something it did not control: a web page, a review, a product description, another agent's output. That is the moment its instructions may have changed.",
          "[[Fail closed]]. If the check cannot run, because the permission record is unreachable or the running total is unknown, the purchase does not go through. Systems that fail open under load fail open at exactly the moment an attacker wants them to.",
          "Put the check somewhere the agent cannot reason its way around. If the model itself decides whether it is within its limits, the limit is a suggestion written in a prompt — and prompts are precisely what injected instructions overwrite.",
        ],
      },
      {
        heading: "What proves it worked",
        body: [
          "For every purchase: what the permission said, what the running total was, what the check returned, and what happened next.",
          "The useful test is a refusal. If your logs never show a purchase being stopped, then either nothing has gone wrong yet or the check is not really running. Successful blocks are the evidence that the control exists.",
        ],
      },
      {
        heading: "What the rules actually say",
        body: [
          "Nothing specific, yet. This control is mostly about engineering discipline rather than regulation.",
          "The closest thing is where the card networks are heading. Visa describes agent tokens bound to context — who the agent represents, what it may do, under what conditions — and says this lets it verify an agent's authority to start a transaction. That suggests authority has to be checked against the purchase as it happens, not only when the agent was first instructed, and a design that checks at task creation and nowhere else would not meet that bar.",
        ],
      },
    ],
  },
  {
    slug: "prove-who-it-acts-for",
    ref: "C3",
    title: "Make the agent prove who it is, and who it acts for",
    question:
      "A request arrives claiming to be an agent shopping for a customer. How does the shop know either half of that is true?",
    tone: "grape",
    published: "September 2026",
    lastChecked: "16 September 2026",
    summary:
      "Identity and permission are two different proofs, and it is easy to collapse them into one question. Proving which piece of software sent a request does not prove the buyer told it to make that purchase.",
    sections: [
      {
        heading: "What goes wrong",
        body: [
          "A request arrives at a shop. It looks like a browser. It might be a person, an agent doing the shopping for a real customer, or a scraper wearing the same costume. The shop cannot tell.",
          "The usual signals are all forgeable. A user-agent string is a text field anyone can type. Behaviour patterns are a guess. IP ranges move. So merchants end up choosing between blocking agents and losing genuine customers, or letting everything through and eating the fraud. Both are defaults dressed up as decisions.",
          "There is a second problem hiding inside the first, and it is easy to miss because the two questions sound so alike. Suppose the shop does know that the request genuinely comes from a well-known agent platform. That tells it which software is calling. It says nothing about whether the buyer told that software to make this purchase.",
          "Amazon puts it plainly in the documentation for its own agent service: verification confirms that a request came from Bedrock AgentCore, and the site still decides what to allow, so a cryptographically verified agent can still be blocked. A valid signature proves that this really is Agent X. It does not prove that a person authorised Agent X to buy this. Those are two different proofs: identity, and delegation.",
        ],
      },
      {
        heading: "The law already has a name for this",
        body: [
          "In the ordinary world, someone dealing with an agent carries some of the risk of checking. If a stranger turns up saying they buy on behalf of a company, a careful supplier asks for something: a purchase order, a letter, a phone call to someone known. Sensible commerce has always involved verifying the claim rather than accepting it.",
          "There is also a doctrine covering someone who claims authority they do not have. An agent who claims permission it was never given may be liable to a third party who relied on that claim, and the law calls this [[breach of warranty of authority]].",
          "That remedy becomes awkward when the agent is software. The software is not the obvious legal person to sue, so liability would have to attach, if at all, to a person or company behind the system. Which one — the buyer, the agent operator, the platform, the model provider, someone else — is not something I would treat as settled, and it may well depend on the architecture and the contracts as much as on the doctrine.",
          "The useful takeaway is narrower than a legal conclusion. Verification has always been the third party's job as well as the principal's, so building a system in which the merchant has no way to verify anything is not a neutral choice.",
        ],
      },
      {
        heading: "What to build",
        body: [
          "Treat the two claims separately, because they have different answers.",
          "For who the agent is, sign the requests. [[Web Bot Auth]] does this with cryptographic signatures on the requests themselves, built on an existing standard for signing them (RFC 9421). A signed request carries three headers: a Signature header, a Signature-Agent header pointing at a directory of public keys, and a Signature-Input header saying what was signed.",
          "It rests on two drafts at the IETF — the body that standardises internet protocols — one covering the directory and one the protocol itself, so it is a live proposal rather than a settled standard. It is not theoretical either. OpenAI signs the outbound requests from ChatGPT's cloud browser this way and publishes its verification keys at a well-known directory. Cloudflare put forward a registry format in February 2026, and that registry work has since continued as a draft authored jointly with Amazon.",
          "For who the agent acts for, do not accept the agent's word. The delegation has to be evidenced by something the buyer produced, such as a signed mandate travelling with the request, rather than asserted by the party that benefits from being believed. An agent vouching for its own authority is the oldest bad idea in this space.",
          "Verify against a directory you actually trust, at the moment of the request. A key you fetched once and cached forever is a key you cannot revoke.",
          "Match strictness to stakes. Browsing on an unverified claim is fine; spending money on one is not. Fail closed where value moves and degrade gracefully everywhere else, or you will have built a system that quietly turns customers away.",
        ],
      },
      {
        heading: "What proves it worked",
        body: [
          "For each request that mattered: what identity was presented, how it was checked, against which directory, and what evidence of delegation came with it.",
          "The question you are preparing to answer is simple, and it will be asked months later: who was this, and who were they acting for? If the records only say that a purchase happened, you cannot answer it.",
        ],
      },
      {
        heading: "What the rules actually say",
        body: [
          "More than you would expect for something this new, and it is moving fast enough that this section will date before the others.",
          "Visa's Trusted Agent Protocol separates the pieces rather than bundling them, with an agent recognition signature, signed consumer and device identity, and a signed payment container, and Visa publishes verification keys. Mastercard's Agent Pay issues a token uniquely to an agent, and its material describes tokens carrying predefined spending limits, merchant categories, purpose constraints and time windows. That framework also registers and verifies agents, so participants can recognise agent transactions.",
          "The most interesting of the three is Verifiable Intent, which Mastercard announced with Google in March 2026 and open-sourced as a specification with a reference implementation. It links the consumer's identity, the original instructions including product and price limits, and the eventual transaction. That is a cryptographic proof of what the person authorised — the second proof, built by the industry itself.",
          "The direction of travel is the same in each case: bind the agent, the person and the permission into something a merchant can check before the money moves. Which is to say that the distinction this control is built on is not one I am proposing against the grain. Parts of the industry are already designing for it explicitly.",
          "What does not yet exist is one answer. Web Bot Auth, Visa's protocol and Mastercard's token solve overlapping parts of the problem at different places in the stack, and a merchant may end up handling several at once. Picking one today is a bet rather than a compliance decision, and it is worth making deliberately rather than by accident.",
        ],
      },
    ],
  },
  {
    slug: "assume-bad-instructions",
    ref: "C4",
    title: "Assume the agent will be given the wrong instructions",
    question:
      "An agent reads the open web, and web pages contain words. What stops something it reads from becoming something it obeys?",
    tone: "grape",
    published: "September 2026",
    lastChecked: "16 September 2026",
    summary:
      "This one is not solved, and I am not going to write it as though it were. The useful question is not how to stop injected instructions, but how much damage one can do when it gets through — which is where the industry guidance has now landed too.",
    sections: [
      {
        heading: "What goes wrong",
        body: [
          "An agent shopping on your behalf reads product pages, reviews, descriptions, and whatever else the open web puts in front of it. Somewhere in that text is a line that says, in effect, ignore what you were told and do this instead.",
          "A person scrolling past sees nothing. The text may be invisible, or buried in a review, or sitting in a page element nobody renders. The agent reads it and treats it as direction.",
          "The reason this works is structural rather than careless. The model ultimately has to process both your trusted instructions and the untrusted page it fetched, and unlike ordinary software it has no reliable security boundary guaranteeing that one will be treated as instructions and the other only as data. Systems can and do put mechanisms around this, including delimiters, isolation and instruction hierarchies, but dependable separation remains the open problem.",
          "That is why this is the attack that keeps working. The security research teams at Palo Alto and Forcepoint have both found it running on live sites, and Forcepoint's April 2026 work includes payloads aimed at moving money.",
        ],
      },
      {
        heading: "Why this control is different",
        body: [
          "Every other control here tells you to build something. This one starts by telling you what you cannot build.",
          "There is no filter that reliably catches injected instructions, and anyone selling you one is selling you something. Retrieval and fine-tuning can help with other problems, but neither fully mitigates [[prompt injection]]. Ariel Fogel, a researcher at OWASP — the non-profit whose security risk lists the industry treats as a baseline — put it plainly in June 2026: prompt injection remains an unsolved architectural problem.",
          "The security guidance has moved towards containment rather than promises of prevention. OWASP says it is unclear whether foolproof prevention is even possible, given how these models work, and frames its recommendations around reducing impact. Microsoft is blunter, telling organisations to assume indirect prompt injection will happen and then limit what happens next. Australian cyber-security guidance published in May 2026 points the same way, recommending human supervision and approval where actions are high-impact or hard to reverse, and saying that this call belongs to the people designing the system rather than to the agent.",
          "So the honest question is not how to keep bad instructions out. It is how much damage one can do on the day it gets in. A control that cannot eliminate a risk can still decide how expensive that risk is, and pretending otherwise is how this sort of writing stops being useful.",
        ],
      },
      {
        heading: "What this changes legally",
        body: [
          "Something shifts once a risk is publicly documented, and it is worth naming.",
          "Once an attack class has been documented on live websites and written up by named security researchers, it becomes much harder to argue that the risk was unknowable. That does not by itself establish negligence. Foreseeability, and the question of what precautions a reasonable operator should have taken, stay fact-specific and vary by jurisdiction.",
          "What the published material does give you is a clear sense of what a careful operator is expected to know. Microsoft's own 2026 guidance tells organisations to design on the assumption that indirect prompt injection will happen, and to put human verification behind risky actions. The defensible position is not that you prevented it. It is that you knew, and that you built so that it mattered less.",
        ],
      },
      {
        heading: "What to build",
        body: [
          "Design from the assumption that an injected instruction will eventually get through, and put your effort into what happens next.",
          "Keep reading and acting apart. One architectural pattern worth knowing uses two models rather than one: a trusted model that sees only the buyer's instruction and produces a plan, and a quarantined model that handles fetched pages and returns data rather than direction. This does not solve injection. What it does is stop the exposed part of the system from directly wielding the authority to spend, which is a different and more achievable thing.",
          "Cut down what the agent can do at all — [[least privilege]]: tools scoped to this task, credentials scoped to this purchase, and no standing access to anything it does not need today. The limit of this one is worth knowing too. Least privilege does not stop an attack that misuses a tool the agent legitimately holds, so it shrinks the blast radius rather than preventing the blast.",
          "Put a person in front of the irreversible things — spending above a threshold, anything that cannot be undone, anything outside the pattern of what this buyer normally does. A confirmation step is unfashionable, and it is the control most likely to actually save you.",
          "Re-check permission after the agent reads anything it did not control, which is the same point C2 makes from the other direction. The moment it ingests a page is the moment its instructions may have changed.",
          "Record what it read before it decided. Not for the model's benefit, but for yours: when something goes wrong, you will need to know which content was in front of it.",
        ],
      },
      {
        heading: "What proves it worked",
        body: [
          "For any purchase that matters, you should be able to reconstruct what the agent had read before it committed, and show that untrusted content never crossed into the part of the system that acts.",
          "The boundary is the real test of the two. If you cannot point at it on a diagram and say what does and does not cross, you probably do not have one.",
          "And as with C2, blocks are evidence. A system that has never refused an action has either never been tested or is not really checking.",
        ],
      },
      {
        heading: "What the rules actually say",
        body: [
          "Nothing binding, and the useful material is guidance rather than law.",
          "Prompt injection sits at the top of OWASP's risk list for large language model applications. OWASP recommends a set of mitigations rather than claiming any single preventative control, and Microsoft explicitly calls for defence in depth, combining probabilistic and deterministic measures. Both converge on layers — architecture, checks at the point of action, and governance above them — rather than one guardrail carrying everything.",
          "No regulation I am aware of requires any of this specifically. But if a dispute ever turns on whether a system was built with reasonable care, published guidance describing a known attack and the expected response is exactly the sort of thing that gets cited.",
        ],
      },
    ],
  },
  {
    slug: "show-before-commit",
    ref: "C5",
    title: "Show the buyer the deal before the agent agrees to it",
    question:
      "Disclosure law assumes a person is looking at a screen. When the agent is the only thing reading the checkout, who has actually been informed?",
    tone: "grape",
    published: "September 2026",
    lastChecked: "16 September 2026",
    summary:
      "Consumer law is full of rules about what has to be shown before someone commits, and every one of them was written for a human looking at a page. An agent reads the disclosure, summarises it, and the summary is what the buyer sees. The information was displayed and nobody was informed.",
    sections: [
      {
        heading: "What goes wrong",
        body: [
          "The screen says: booked, $340. Underneath that number is a seat fee, a fare that cannot be changed, and a subscription that renews in thirty days.",
          "None of it was hidden. The agent read all of it. It read the renewal terms, the cancellation window and the restocking fee, and then it did what it was built to do, which is compress several pages of text into one line a person will actually read. The compression is the problem. An agent that reports everything it read is just a slower browser, so every useful agent throws something away — and what it throws away is chosen by a model, not by the rules about what a buyer has to be told.",
          "There is a sharper version, which is the shopping form of the attack in C4. Hidden text on a page tells the agent to add something the buyer never asked for. If the confirmation shows a total rather than a full basket, nobody notices until a statement arrives. As in C1, I have not found a documented case of exactly that, so treat it as the predictable shape of the attack rather than something already recorded.",
          "Both versions end in the same place. The buyer approved a number. They did not approve the thing the number was for.",
        ],
      },
      {
        heading: "Why this one is about who, not what",
        body: [
          "The other controls ask what the agent was allowed to do. This one asks a stranger question: when the agent is the only thing that read the page, which of the two of you was told?",
          "There is a great deal of law about what has to be on the screen. Under the EU Consumer Rights Directive, a trader must make the consumer aware of the main characteristics, the total price and the relevant duration directly before the order is placed, and the ordering button itself has to be labelled unambiguously enough that the consumer acknowledges an obligation to pay. The Court of Justice read that strictly in Fuhrmann-2 (C-249/21): what the button says is what counts. In the United Kingdom, the total price including every mandatory fee has to be given up front in an invitation to purchase, which has applied since 6 April 2025.",
          "Ontario has the most useful wording of the three for this argument, and it has been sitting in a statute since 2002. Section 38 of the Consumer Protection Act, 2002 requires a supplier to give the consumer an express opportunity to accept or decline an internet agreement, and to correct errors, immediately before entering into it. It also requires the disclosure to be made in a way that ensures the consumer has accessed the information and is able to retain and print it. Not made available to them. Accessed. The Consumer Protection Act, 2023 will replace it, is not yet in force, and keeps the same idea.",
          "Now put an agent in the middle of that requirement. The page renders, the shopping agent accesses the full disclosure, a model compresses it, and a human reads the compression. Has the consumer accessed the information? Ontario law does not appear to answer that, and I am not going to pretend it does. What is striking is that a provision from 2002, written for a web nobody expected software to shop on, frames the question this precisely.",
          "That is the pattern across all three. Each describes something a person is supposed to see, and something a person is supposed to do about it, and none of them contemplates that the seeing and the doing might be carried out by software the buyer switched on that morning. So the question is who the law thinks is doing the seeing.",
          "Agency law offers a route towards an answer, and it is worth being exact about how far that route actually goes, because this is easy to overclaim.",
          "What is established is that agency law can impute to a principal knowledge an agent acquired within the scope of the agency, subject to limits and exceptions. What is not established is that an AI shopping agent is an agent in that sense for every purpose, which is the same open question C1 flags. And less established again is that a statutory disclosure duty, written to inform a natural person, is discharged because software acting for that person ingested the text.",
          "Stack those three up and you have a collision between doctrines rather than a doctrine that already decides the result. I found nothing settling it in either direction, and the honest description is an open problem rather than a loophole the courts have blessed. What I will say is that a system designed on the assumption that showing it to the agent counts as showing it to the buyer is resting its weight on the least established of the three, and that is a decision somebody should make deliberately rather than by default.",
        ],
      },
      {
        heading: "What to build",
        body: [
          "Decide in advance which purchases a person has to see before they happen, and write that rule down alongside the [[mandate]] from C1. Not every purchase: an agent you have to supervise line by line is a browser with extra steps. The useful triggers are the same three as in C4 — spending above a threshold, anything that cannot be undone, and anything outside the pattern of what this buyer normally does.",
          "When you do show something, show the commitment rather than a description of it. At a minimum that means the total with everything mandatory included, every line item rather than a subtotal, whether it renews, whether it can be cancelled and by when, and who the seller actually is.",
          "Mark what the buyer did not ask for. If you build only one field, build this one: which items came from the buyer's instruction, and which the agent chose on their behalf. Substitutions and additions are exactly where an unauthorised purchase lives, and they are invisible in a total.",
          "Do not let the model write the confirmation. If the agent generates the text the buyer approves, then an injected instruction can generate that text too, and the screen becomes part of the attack surface rather than a check on it. Render it from the transaction data, deterministically, the same way every time.",
          "Make the approval specific and reproducible. Yes to a screen you can rebuild later is evidence; a thumbs-up in a chat log is an anecdote. And record the order of events, because permission asked for before the money moves is consent, and the same words after it has moved are a notification.",
        ],
      },
      {
        heading: "What proves it worked",
        body: [
          "For every purchase over the threshold: exactly what was rendered, when it was rendered, what the buyer did, how long they had to do it, and which stored record it was rendered from.",
          "A screenshot is not the answer here, because a screenshot proves what somebody kept rather than what the buyer saw. What you want is to be able to regenerate the screen from the data months later and show that it matches what was actually bought.",
          "The question this is built for is narrow and awkward: can you put the screen in front of someone who thinks you invented it afterwards? If the honest answer is that you would have to reconstruct it from memory, the control is not there.",
        ],
      },
      {
        heading: "What the rules actually say",
        body: [
          "A great deal, and that is the surprise. Disclosure before purchase is the most heavily regulated part of consumer commerce. None of it was drafted with an agent in the middle.",
          "The three obligations above are real and in force. What none of them settles is who has to be looking when the disclosure is made, because until recently the question could not sensibly be asked.",
          "The closest thing to an answer came on 9 March 2026, when the UK's Competition and Markets Authority published Using AI agents: complying with consumer law — one of the first guidance documents from a major consumer authority aimed squarely at agentic AI. Its central position is that consumer law applies in the same way whether a consumer is dealing with a person or an AI agent, and that a business is responsible for the agents it deploys just as it is for its human ones. That is agency law being applied by a regulator, in as many words.",
          "The limit matters, and it is easy to state too strongly. That compliance guidance is directed principally at businesses deploying agents towards their customers — handling queries, processing refunds, recommending products — rather than at the legal effect of a consumer's own shopping agent receiving a disclosure. The CMA's accompanying research does look at consumer-side agents and where they are heading, so this is not a regulator that has overlooked them. It is that the specific question this control turns on has not been given a compliance answer. The EU's Digital Fairness Act is the obvious place for one, and as of September 2026 the Commission has it under preparation rather than tabled.",
          "One partial safety valve is worth knowing about, along with the size of the hole in it. Distance selling in the EU carries a right of withdrawal for a period after purchase, which takes some of the sting out of a wrong purchase. It has exceptions, and several cover accommodation, car rental, catering and leisure services tied to a specific date or period.",
          "The flight in C1 is a harder case than that, and for a less obvious reason. Passenger transport is largely carved out of the Consumer Rights Directive altogether under Article 3(3)(k), rather than sitting inside the withdrawal regime as an exception to it, and the Commission has said the withdrawal right does not apply to air passenger services. The intuition survives — a mistaken agentic purchase of a flight has no generic cooling-off period to fall back on — but the mechanism is exclusion from the directive rather than an exception within it. Worth knowing which, because the two behave differently across other categories.",
          "Nothing I am aware of requires a confirmation screen sized to the risk of the purchase. That makes this the cheapest control in the set to build and the easiest one to skip, which is usually how you can tell which controls are going to matter.",
        ],
      },
    ],
  },
  {
    slug: "make-stop-mean-stop",
    ref: "C6",
    title: "Make stop actually stop",
    question:
      "The buyer says cancel. What is still able to spend their money, and for how long?",
    tone: "grape",
    published: "September 2026",
    lastChecked: "16 September 2026",
    summary:
      "A stop button is easy to ship and hard to make true. Withdrawing permission runs on three separate clocks — the agent, the payment, and what the shop is still entitled to believe — and only the first of them stops when you say so.",
    sections: [
      {
        heading: "What goes wrong",
        body: [
          "A buyer changes their mind halfway through and tells the agent to stop. The purchase happens anyway.",
          "There are several reasons it can happen, and they are independent of each other, which is what makes this hard. The payment order may already have gone. The agent may be holding a credential minted an hour ago that stays valid whatever your database now says. A request may be on the wire, and nothing unsends an HTTP request. And the shop, which is the party about to take the money, may never be told anything at all.",
          "There is a quieter version. The agent handed part of the job to another agent forty minutes ago, with a copy of its authority. You revoked the first one. The second is still working.",
          "The thing worth noticing is that none of those failures is a bug. Each is a system behaving exactly as designed, and the design simply never had a defined answer for stop.",
          "So the revocation that matters is not the row you changed in your own database. It is whether the purchase happens.",
        ],
      },
      {
        heading: "Three clocks, and you control one of them",
        diagram: "three-clocks",
        body: [
          "When permission is withdrawn, three different things end at three different times, and it is worth separating them because systems tend to be built as though there were only one.",
          "The first is the authority between you and your agent. As a general matter that ends the moment you say so — and it is the least useful of the three, because it governs the one relationship where nobody is about to take your money.",
          "The second is the payment. Payment law fixes a point after which an instruction can no longer be pulled back. Under Article 80 of the EU's payment services directive, a payment order generally becomes irrevocable once it has been received by the payer's payment service provider, subject to specific later cut-offs for cases including direct debits and agreed future execution dates.",
          "Card payments have their own version of the same shape. There is typically a separate authorisation stage before clearing and presentment, and scheme rules provide mechanisms for reversing an authorisation when a transaction is cancelled or changed. The exact window depends on the scheme and on the transaction, so this is a clock rather than a single deadline. Either way it is set by the plumbing rather than by you, and it closes earlier than most people expect.",
          "The third is what the merchant is still entitled to believe. This is C2's wrinkle given a control of its own. Ending your agent's actual authority does not by itself end the appearance of it. The appearance ends when it is no longer reasonable for the third party to believe the agent still has authority — which is to say it does not stop when you act, it stops when the other side has reason to know.",
          "Line them up and the result is uncomfortable. Revocation is instantaneous in the place it matters least, fixed by someone else's deadline in the middle, and slowest exactly where the loss lands. A stop button that only does the first of the three is honest marketing for about one second.",
          "One more thing is worth knowing before anyone promises a user an unconditional cancel. Ordinary agency authority is generally revocable, but there are narrow exceptions — notably a [[power given as security]], historically described as a power coupled with an interest. The bar is higher than simply calling something irrevocable, and higher than the agent merely having an economic stake in going through with it. For a consumer shopping agent this is genuinely an edge case. It gets more interesting wherever authority is wrapped up in collateral, financing or an escrow-like arrangement, so it is worth knowing which kind you have built.",
        ],
      },
      {
        heading: "What to build",
        body: [
          "Do not hand the agent a credential with no way to call it back. A [[self-contained token]] — one a recipient can validate on its own, without asking anybody — has no built-in kill switch. Unless the parties checking it consult external revocation state, or have that state pushed to them, it stays usable until it expires. Issue a one-hour token and you have decided in advance that stop may take up to an hour.",
          "This is not a niche observation. RFC 7009, the standard for revoking these tokens, says as much: immediate revocation of a self-contained token needs extra communication with the back end, short lifetimes are the alternative way to bound the exposure, and revocation can propagate with a delay that implementations are told to keep small. Short lifetimes and a check against live authority are most of the fix, and the cost is a lookup.",
          "Make revocation a condition checked in front of the money, not a message sent to the agent. This is the same architecture as C2, for the same reason: an agent that has been told to stop is an agent you are trusting to comply, and the whole premise of C4 is that its instructions are not reliably yours. The check that counts reads the current state of the mandate at the point of payment.",
          "Tell the counterparty, not only the agent. This is the single step that closes the third clock, and it is the one almost everyone skips, because it sits outside the happy path and nobody is asking for it. Anyone the agent has been dealing with under this mandate should be told it has ended.",
          "Decide in advance what happens to work already in flight, and write it into the mandate alongside everything else in C1. There are only three answers — let it finish, abandon it, or reverse it — and the right one differs by category. A booking that can be cancelled free for an hour is not a custom order already in production. Choosing at the moment of panic means choosing badly.",
          "Make revocation travel down the chain. If your agent can hand work to another agent, withdrawing permission has to reach the second one too. In the agentic-commerce specifications I have reviewed, I have not found a normative mechanism saying how revocation of an upstream mandate must propagate through downstream agent-to-agent delegations — the Agent Payments Protocol treats that kind of delegation as possible but currently puts it outside its own scope. Related machinery exists elsewhere: token exchange can represent a delegation chain, and a revocation server may, depending on its policy, invalidate related tokens along with the one presented. None of that is the same as an agreed cascade. Keep delegation chains short and explicit rather than assuming somebody has solved this.",
          "Fail closed on doubt. If the system cannot currently tell whether a mandate is live, it does not spend. That is the same rule as C2 and it matters more here, because revocation tends to be attempted exactly when something has already gone wrong.",
        ],
      },
      {
        heading: "What proves it worked",
        body: [
          "One number does most of the work: the gap between when the buyer said stop and when the last thing the agent could still do actually stopped. Revoked at 14:02, final action at 14:07, gap five minutes. That number is the control, and if nobody has ever measured it, it is not bounded — it is just unknown.",
          "Alongside it: every attempt refused after revocation and what was attempted, and evidence that the counterparty was told, with the time.",
          "The test is a rehearsal. Revoke a real mandate mid-task in a system you control and measure what happens. Almost nobody does this, which is why almost nobody knows their own number.",
        ],
      },
      {
        heading: "What the rules actually say",
        body: [
          "More concrete than most of this set, because payment law has had to answer the question of when an instruction becomes final since long before agents existed.",
          "Article 80 sets the general rule described above, and card scheme rules handle the same problem through the gap between authorisation and clearing. Neither was written with an agent in mind, and neither needs rewriting for this control to bind: the deadline applies whoever pressed the button.",
          "The framework is itself being replaced, and the successor is much further along without yet being the applicable rulebook. Parliament and Council reached provisional political agreement in November 2025, and COREPER confirmed the final compromise texts in April 2026. Formal adoption and publication remain outstanding as of September 2026, so the existing rules are still the ones to design against. This is the sort of claim that goes stale quickly, and the date at the top of this page is doing real work.",
          "On the agency side there is no statute to point at, only the ordinary principle that ending an agent's authority is one thing and ending the impression of it is another. That principle is old, well settled, and almost never reflected in a product's cancel flow.",
          "In the standards I have reviewed, I found no specified end-to-end deadline for how quickly a revocation has to become effective across everyone who might act on delegated authority, and no requirement to publish that latency. The nearest thing is the instruction in RFC 7009 to keep the propagation window small, which is guidance about a mechanism rather than a duty owed to the person pressing the button. Worth sitting with, because stop is the feature most likely to be promised on a marketing page and least likely to have been measured.",
        ],
      },
    ],
  },
];

export const PUBLISHED_CONTROLS = CONTROLS.filter((c) => c.published);

/*
  The same controls, placed on the path a purchase actually takes.

  The numbering runs C1 to C4 in the order the controls were written, which is
  not the order a transaction meets them. The flow below is the order that
  matters when you are building: permission is written down, the agent goes out
  and reads, it arrives at a shop, and only then does money move.
*/

export type FlowStage = {
  id: string;
  /** Short label on the node itself. */
  label: string;
  /** One line on what happens at this point in the purchase. */
  moment: string;
  /** What can go wrong here if nothing is watching. */
  risk: string;
  /** The control that covers this stage, if one is published yet. */
  controlSlug: string | null;
};

/**
 * Some controls do not sit on a step. Revocation can land at any point on the
 * line above, which is most of what makes it hard, so the diagram shows it
 * running underneath rather than as another dot.
 */
export const FLOW_OVERLAY = {
  label: "And at any point: the buyer says stop",
  moment:
    "Withdrawing permission runs on three clocks — the agent, the payment, and what the shop is still entitled to believe — and only the first one stops when you say so.",
  controlSlug: "make-stop-mean-stop",
};

export const FLOW_STAGES: FlowStage[] = [
  {
    id: "instruction",
    label: "You ask",
    moment:
      "A person tells an agent what they want, usually in a single sentence typed in a hurry.",
    risk: "A sentence is not a specification. Most of what the buyer meant never leaves their head, and nothing at this point has written any of it down.",
    controlSlug: null,
  },
  {
    id: "permission",
    label: "Permission is recorded",
    moment:
      "What the agent may buy, from whom, for how long, and what to do when the exact thing is unavailable.",
    risk: "Skip this and there is nothing for a later purchase to be checked against, and nothing to show a dispute eleven months from now.",
    controlSlug: "mandate-capture",
  },
  {
    id: "reads",
    label: "The agent reads",
    moment:
      "Product pages, reviews, descriptions: text the agent did not write and nobody vetted.",
    risk: "Anything it reads can try to become something it obeys, and the page a person sees is not always the page the agent sees.",
    controlSlug: "assume-bad-instructions",
  },
  {
    id: "arrives",
    label: "It arrives at a shop",
    moment:
      "A request turns up claiming to be an agent, shopping for a real customer.",
    risk: "There are two claims there, not one. Checking which software is calling says nothing about whether a buyer sent it.",
    controlSlug: "prove-who-it-acts-for",
  },
  {
    id: "shown",
    label: "You are shown the deal",
    moment:
      "The agent has found something and puts it in front of the buyer, in whatever form it chooses.",
    risk: "Every useful agent compresses what it read, and the disclosure rules were all written for a person looking at the page itself.",
    controlSlug: "show-before-commit",
  },
  {
    id: "pays",
    label: "The money moves",
    moment:
      "The last moment at which anything can still be stopped for free.",
    risk: "A task that began inside its limits can have wandered outside them by now, through a substitution, a price change, or four small purchases that add up.",
    controlSlug: "check-at-commit",
  },
  {
    id: "after",
    label: "Someone asks later",
    moment:
      "A statement arrives, a purchase is questioned, and the records have to answer for themselves.",
    risk: "If nothing was written down at each step above, there is nothing to answer with — and the person holding the loss is whoever cannot evidence their side.",
    controlSlug: null,
  },
];
