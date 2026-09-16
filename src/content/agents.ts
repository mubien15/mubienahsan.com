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

export type ControlSection = {
  heading: string;
  /** Paragraphs. Kept as plain strings so the content stays readable here. */
  body: string[];
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
          "It is an old problem in new clothes. When one person acts for another, the law calls them an agent, and it calls the person they act for the principal. It has spent centuries working out who is responsible for what.",
          "Whether an AI counts as the agent in that legal sense is not settled — it might be the software, it might be the company that built it. Nothing here assumes an answer. But the questions agency law asks are the right questions, and there are three of them.",
          "First: what was the agent actually allowed to do? Permission can be spelled out or reasonably implied, so a vague instruction does not leave an agent with nothing to work from. It also does not hand over a blank cheque. “Buy me a laptop” is not permission to buy a Ferrari, and the gap between the two is not filled by whatever the agent guesses you would have wanted.",
          "Second: can the shop rely on it? Sometimes. If a seller reasonably believed the agent had permission, and that belief traces back to something the buyer did, the seller may be protected. But that is the hard part, not the easy part. Does handing an agent your card details tell a merchant it can buy anything? Does using a particular platform? Nobody has answered that, and these disputes will have to.",
          "Third: what if you find out later and say nothing? Staying quiet can count as agreeing after the fact, though not automatically. It usually turns on whether you knew what had happened, and on whether a reasonable person would read your silence as approval. That matters a great deal when the first you hear of a purchase is a statement three weeks later.",
        ],
      },
      {
        heading: "What to build",
        body: [
          "Write the permission down before the agent goes anywhere, in a form a machine can check, and then check it again at the moment money actually moves.",
          "At a minimum it should say: the most that can be spent in total, what kinds of things or which shops are in scope, how long the permission lasts, whether it is good for one purchase or many, and what the agent should do when the exact thing is unavailable.",
          "That last one matters more than it sounds. Substitution is where a helpful agent turns into an unauthorised purchase. Out of stock, so it bought the next size up. Sold out, so it bought a similar model at twice the price. Every one of those is a decision the buyer never made.",
          "Build the permission from what the buyer said, and then have the buyer confirm it. An agent that works out its own permission from a vague sentence has not been authorised — it has guessed, and the guess is what gets argued about later.",
          "The Agentic Commerce Protocol, the open specification for agent checkout, already limits the payment credential to one use, a maximum amount and an expiry, based on the checkout the buyer has just approved. That is the right instinct, and more than critics usually give it credit for. What the specification does not describe is what the agent was allowed to go looking for before any checkout existed — which is a boundary on its scope rather than a defect, because the document is about finishing a purchase and it does that job well.",
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
          "One wrinkle is worth knowing. Permission ending on your side does not automatically end what a shop may reasonably believe, because a merchant can sometimes still rely on authority that looks like it is still there. Withdrawing permission quietly is not the same as withdrawing it effectively.",
          "The timing also matters for the hidden-instruction attack. An injected instruction works precisely by changing the agent's behaviour after it has started, so any check that ran before it read that page is checking a version of the task the attacker has since replaced.",
        ],
      },
      {
        heading: "What to build",
        body: [
          "Check against the recorded permission immediately before each purchase completes, rather than when the task is created.",
          "Track the running total across the whole task, not each purchase in isolation. A limit that applies only per transaction is not a limit — it is a suggestion that resets.",
          "Re-check after any step where the agent has read something it did not control: a web page, a review, a product description, another agent's output. That is the moment its instructions may have changed.",
          "Fail closed. If the check cannot run, because the permission record is unreachable or the running total is unknown, the purchase does not go through. Systems that fail open under load fail open at exactly the moment an attacker wants them to.",
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
          "There is also a doctrine covering someone who claims authority they do not have. An agent who claims permission it was never given may be liable to a third party who relied on that claim, and the law calls this breach of warranty of authority.",
          "That remedy becomes awkward when the agent is software. The software is not the obvious legal person to sue, so liability would have to attach, if at all, to a person or company behind the system. Which one — the buyer, the agent operator, the platform, the model provider, someone else — is not something I would treat as settled, and it may well depend on the architecture and the contracts as much as on the doctrine.",
          "The useful takeaway is narrower than a legal conclusion. Verification has always been the third party's job as well as the principal's, so building a system in which the merchant has no way to verify anything is not a neutral choice.",
        ],
      },
      {
        heading: "What to build",
        body: [
          "Treat the two claims separately, because they have different answers.",
          "For who the agent is, sign the requests. Web Bot Auth does this with cryptographic signatures on the requests themselves, built on an existing standard for signing them (RFC 9421). A signed request carries three headers: a Signature header, a Signature-Agent header pointing at a directory of public keys, and a Signature-Input header saying what was signed.",
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
          "More than anywhere else in this set, and it is moving quickly.",
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
          "There is no filter that reliably catches injected instructions, and anyone selling you one is selling you something. Retrieval and fine-tuning can help with other problems, but neither fully mitigates prompt injection. Ariel Fogel, a researcher at OWASP — the non-profit whose security risk lists the industry treats as a baseline — put it plainly in June 2026: prompt injection remains an unsolved architectural problem.",
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
          "Cut down what the agent can do at all: tools scoped to this task, credentials scoped to this purchase, and no standing access to anything it does not need today. The limit of this one is worth knowing too. Least privilege does not stop an attack that misuses a tool the agent legitimately holds, so it shrinks the blast radius rather than preventing the blast.",
          "Put a person in front of the irreversible things — spending above a threshold, anything that cannot be undone, anything outside the pattern of what this buyer normally does. A confirmation step is unfashionable, and it is the control most likely to actually save you.",
          "Re-check permission after the agent reads anything it did not control, which is the same point C2 makes from the other direction. The moment it ingests a page is the moment its instructions may have changed.",
          "Record what it read before it decided. Not for the model's benefit, but for yours: when something goes wrong, you will need to know which content was in front of it.",
        ],
      },
      {
        heading: "What proves it worked",
        body: [
          "For any purchase that matters, you should be able to reconstruct what the agent had read before it committed, and show that untrusted content never crossed into the part of the system that acts.",
          "The second one is the real test. If you cannot point at the boundary on a diagram and say what does and does not cross it, you probably do not have one.",
          "And as with C2, blocks are evidence. A system that has never refused an action has either never been tested or is not really checking.",
        ],
      },
      {
        heading: "What the rules actually say",
        body: [
          "Nothing binding, and the useful material is guidance rather than law.",
          "Prompt injection sits at the top of OWASP's risk list for large language model applications, and has done for three years running. OWASP recommends a set of mitigations rather than claiming any single preventative control, and Microsoft explicitly calls for defence in depth, combining probabilistic and deterministic measures. Both converge on layers — architecture, checks at the point of action, and governance above them — rather than one guardrail carrying everything.",
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
          "There is a lot of law about what has to be on the screen. Under the EU Consumer Rights Directive, a trader must make the consumer aware of the main characteristics, the total price and the duration directly before the order is placed, and the ordering button itself has to be labelled so that the consumer acknowledges an obligation to pay. In the United Kingdom, the total price including every mandatory fee has to be given up front in an invitation to purchase, which has applied since April 2025. Ontario's internet agreement rules require that the consumer be given an express opportunity to accept or decline the agreement, and to correct errors, before entering into it.",
          "Read those three together and a pattern falls out. Each one describes something a person is supposed to see, and something a person is supposed to do about it. None of them contemplates that the seeing and the doing might be carried out by software the buyer switched on that morning.",
          "Here is where it gets uncomfortable, and I think this is the most interesting thing in the whole set. Agency law has a settled answer to the question of who was told. What an agent learns in the course of its work is generally treated as known by the principal, whether or not the principal was ever actually told. Apply that orthodoxy to agentic commerce and the disclosure duty is discharged the moment the page renders for the agent. The buyer is deemed to know about the renewal, because their agent read it.",
          "That is a perfectly respectable agency-law answer and a terrible consumer-protection answer, and the two bodies of law have not yet been made to argue it out. I am not going to pretend to know how that resolves. What I will say is that a system designed on the assumption that showing it to the agent counts as showing it to the buyer is a system built on the aggressive reading of an unsettled question.",
        ],
      },
      {
        heading: "What to build",
        body: [
          "Decide in advance which purchases a person has to see before they happen, and write that rule down alongside the permission from C1. Not every purchase: an agent you have to supervise line by line is a browser with extra steps. The useful triggers are the same three as in C4 — spending above a threshold, anything that cannot be undone, and anything outside the pattern of what this buyer normally does.",
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
          "More than anywhere else in this set, because disclosure before purchase is the most heavily regulated part of consumer commerce. And none of it was drafted with an agent in the middle.",
          "The three obligations above are real, in force, and enforced. What none of them says is who has to be looking when the disclosure is made, because until recently the question could not sensibly be asked.",
          "The closest thing to an answer came in March 2026, when the UK's Competition and Markets Authority published guidance on complying with consumer law when using AI agents. As far as I can tell it is the first guidance from a major consumer authority anywhere aimed squarely at agents, and its central position is that consumer law applies in the same way whether a consumer is dealing with a person or an AI agent, and that a business is responsible for the agents it deploys just as it is for its human ones. That is agency law being applied by a regulator, in as many words.",
          "The limit is important and easy to overstate if you are not careful. That guidance is addressed to businesses deploying agents towards their customers — handling queries, processing refunds, recommending products — rather than to the buyer's own shopping agent. So the thing it settles is the merchant's side of the conversation. The buyer's side, where this control lives, has no equivalent yet. The EU's Digital Fairness Act is the obvious place for one, and as of September 2026 the Commission has not yet tabled a proposal.",
          "One partial safety valve is worth knowing about, along with its hole. Distance selling in the EU carries a right of withdrawal for a period after purchase, which does take some of the sting out of a wrong purchase. It also has exceptions, and several of them cover transport and accommodation tied to a specific date — which is to say the flight in C1 is close to the worst case, not a typical one.",
          "Nothing I am aware of requires a confirmation screen sized to the risk of the purchase. That makes this the cheapest control in the set to build and the easiest one to skip, which is usually how you can tell which controls are going to matter.",
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
