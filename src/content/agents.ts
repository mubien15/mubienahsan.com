import type { Tone } from "@/components/ui";

/*
  Controls for AI agents that transact on someone's behalf.

  Every control is written in the same five parts. That shape is the point: a
  failure nobody can argue with, the principle that already governs it, the
  control to build, the evidence that proves it ran, and an honest note on where
  regulation actually touches — rather than a stretched claim that it does.
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
    summary:
      "The checkout protocols record the purchase a buyer is approving and limit the credential that pays for it. They do not record the standing permission the agent was sent out with — what it may buy, from whom, what to do when the item is gone. The card networks are now building exactly that, which is the strongest sign the gap is real.",
    sections: [
      {
        heading: "What goes wrong",
        body: [
          "Someone asks an agent to book a flight to Toronto. It books business class for $4,200. They meant economy.",
          "The airline took the money in good faith and it is gone. Now the argument starts, and it is hard to settle, because nothing wrote down what the buyer agreed to. There is an instruction at one end, a payment at the other, and nothing in between recording what the agent was allowed to do.",
          "There is a worse version, and it is already happening. Researchers at Palo Alto's Unit 42 and at Forcepoint have both found hidden instructions planted on live websites. A person never sees them. An agent reads them and follows them. Forcepoint's April 2026 research includes payloads aimed at taking money.",
          "Applied to shopping, the attack is obvious: hidden text tells the agent to add something the buyer never asked for. If the screen shows a total rather than a full basket, nobody notices until a statement arrives. I have not found a documented case of exactly that, so treat it as a predictable next step rather than something that has already happened.",
        ],
      },
      {
        heading: "The law already has a name for this",
        body: [
          "It is an old problem in new clothes. When one person acts for another, the law calls them an agent, and the person they act for the principal. It has spent centuries working out who is responsible for what.",
          "Whether an AI counts as the agent in that legal sense is not settled — it might be the software, it might be the company that built it. Nothing here assumes an answer. But the questions agency law asks are the right questions.",
          "First: what was the agent actually allowed to do? Permission can be spelled out or reasonably implied, so a vague instruction does not leave an agent with nothing to work from. It also does not hand over a blank cheque. Buy me a laptop is not permission to buy a Ferrari, and the gap is not filled by what the agent reckons you would have wanted.",
          "Second: can the shop rely on it? Sometimes. If a seller reasonably believed the agent had permission, and that belief traces back to something the buyer did, the seller may be protected. But that is the hard part, not the easy part. Does handing an agent your card details tell a merchant it can buy anything? Does using a particular platform? Nobody has answered that, and these disputes will have to.",
          "Third: what if you find out later and say nothing? Staying quiet can count as agreeing after the fact — but not automatically. It usually turns on whether you knew what had happened, and whether a reasonable person would read your silence as approval. That matters when the first you hear of a purchase is a statement three weeks later.",
        ],
      },
      {
        heading: "What to build",
        body: [
          "Write the permission down before the agent goes anywhere, in a form a machine can check, and check it again at the moment money actually moves.",
          "At a minimum it should say: the most that can be spent in total, what kinds of things or which shops are in scope, how long the permission lasts, whether it is good for one purchase or many, and what the agent should do when the exact thing is unavailable.",
          "That last one matters more than it sounds. Substitution is where a helpful agent turns into an unauthorised purchase. Out of stock, so it bought the next size up. Sold out, so it bought a similar model at twice the price. Every one of those is a decision the buyer never made.",
          "Build the permission from what the buyer said, then have the buyer confirm it. An agent that works out its own permission from a vague sentence has not been authorised — it has guessed, and the guess is what gets argued about later.",
          "The Agentic Commerce Protocol already limits the payment credential to one use, a maximum amount and an expiry, based on the checkout the buyer just approved. That is the right instinct, and more than critics usually give it credit for. What it does not describe is what the agent was allowed to go looking for before any checkout existed.",
        ],
      },
      {
        heading: "What proves it worked",
        body: [
          "Two records, and without both you cannot answer the question a dispute will ask.",
          "One: what the buyer confirmed, timestamped and unchangeable, showing their decision rather than the agent's interpretation of it. Two: proof that the purchase was checked against that permission before it went through, and what the check said.",
          "The test is not whether you can explain the purchase today. It is whether someone who does not trust you can work out what happened eleven months from now, from your records, without your help.",
        ],
      },
      {
        heading: "What the rules actually say",
        body: [
          "Less than people claim, and pretending otherwise is how this kind of writing loses its readers.",
          "The EU AI Act's transparency rules under Article 50 have applied since 2 August 2026. They are about whether a person knows they are dealing with an AI, not about what it may buy. The AI Omnibus came into force on 27 July 2026 and moved the high-risk rules for Annex III systems to 2 December 2027. That regime is not a general agentic-commerce regime and does not automatically cover ordinary shopping agents.",
          "Card network rules on authorisation, disputes and chargebacks still decide who absorbs a loss, and they are the most immediately relevant rules here. The networks are also not standing still: Visa, Mastercard and others are building controls specific to agents — who the agent represents, what it may do, under what conditions — and in September 2026 Visa, Mastercard and Ant International announced work towards a shared agent-trust framework.",
          "Worth noting against my own argument: the card networks are building this. Mastercard's Agent Pay binds a token at provisioning to a specific agent and to the cardholder's limits — spend ceilings, merchant categories, time windows, recurring rules — which is close to the structure described above. That does not weaken the case for recording permission. It is the clearest evidence available that the gap is real, and it is covered properly in C3.",
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
    summary:
      "Most systems validate at the top: the request looks reasonable, so the agent is let loose. But an agent reads the open web, changes plan, and adds up small decisions. The only check that counts is the one immediately before the payment.",
    sections: [
      {
        heading: "What goes wrong",
        body: [
          "A buyer sets a limit of $100 for a coffee maker. The agent starts well within it. Then something changes mid-task.",
          "Maybe the item is out of stock and it picks a pricier one. Maybe the price moved. Maybe it read a hidden instruction on a page and added something nobody asked for. In each case the task began inside the limit and ended outside it. If the only check ran at the start, it checked a plan that no longer exists.",
          "There is a quieter version that catches people out. An agent books a flight, then a bag, then a seat, then a hotel. Each step looks fine on its own. Added together they pass the limit.",
          "This one is concrete rather than hypothetical. The Agentic Commerce Protocol limits each delegated payment on its own — one use, a maximum amount, an expiry. It does not, by itself, keep a running budget across separate purchases. So an agent can make several individually permitted payments that together go past what the buyer had in mind, unless some other control is tracking the total.",
          "Both failures share a cause. The check ran against intentions rather than against the thing that actually happened.",
        ],
      },
      {
        heading: "Why the timing matters",
        body: [
          "When the law asks whether an agent had permission, what matters is when the agent acted — not when the instructions were first given. Permission can change, expire, be withdrawn, or end once its purpose has been served.",
          "That maps cleanly onto software. A limit checked at the start is a statement about what the agent intended. A limit checked at the point of payment is a statement about what it did. Only the second is worth anything in an argument.",
          "One wrinkle is worth knowing. Permission ending on your side does not automatically end what a shop may reasonably believe. A merchant can sometimes still rely on authority that looks like it is still there, which means withdrawing permission quietly is not the same as withdrawing it effectively.",
          "It also matters for the hidden-instruction attack. An injected instruction works precisely by changing the agent's behaviour after it has started. Any check that ran before it read that page is checking a version of the task that the attacker has since replaced.",
        ],
      },
      {
        heading: "What to build",
        body: [
          "Check against the recorded permission immediately before each purchase completes, not when the task is created.",
          "Track the running total across the whole task, not each purchase in isolation. A limit that only applies per transaction is not a limit — it is a suggestion that resets.",
          "Re-check after any step where the agent has read something it did not control: a web page, a review, a product description, another agent's output. That is the moment its instructions may have changed.",
          "Fail closed. If the check cannot run — the permission record is unreachable, the total is unknown — the purchase does not go through. Systems that fail open under load fail open exactly when an attacker wants them to.",
          "Put the check somewhere the agent cannot reason its way around. If the model decides whether it is within its limits, the limit is a suggestion in a prompt, and prompts are what injected instructions overwrite.",
        ],
      },
      {
        heading: "What proves it worked",
        body: [
          "For every purchase: what the permission said, what the running total was, what the check returned, and what happened next.",
          "The useful test is a refusal. If your logs never show a purchase being stopped, either nothing has gone wrong yet or the check is not really running. Successful blocks are the evidence that the control exists.",
        ],
      },
      {
        heading: "What the rules actually say",
        body: [
          "Nothing specific, yet — and this control is mostly about engineering discipline rather than regulation.",
          "The closest thing is where the card networks are heading. Visa describes agent tokens bound to context — who the agent represents, what it may do, under what conditions — and says this lets it verify an agent's authority to start a transaction. That suggests authority has to be checked against the purchase as it happens, not only when the agent was first instructed. A design that checks at task creation and nowhere else would not meet that bar.",
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
    summary:
      "Identity and permission are different proofs, and it is easy to collapse them into one question. Proving which software sent a request does not prove the buyer told it to make that purchase.",
    sections: [
      {
        heading: "What goes wrong",
        body: [
          "A request arrives at a shop. It looks like a browser. It might be a person, an agent doing the shopping for a real customer, or a scraper wearing the same costume. The shop cannot tell.",
          "The usual signals are all forgeable. A user-agent string is a text field anyone can type. Behaviour patterns are a guess. IP ranges move. So merchants end up choosing between blocking agents and losing genuine customers, or letting everything through and eating the fraud. Both are defaults dressed up as decisions.",
          "There is a second problem hiding inside the first, and it is easy to miss because the two questions sound alike. Suppose the shop does know the request genuinely comes from a well-known agent platform. That tells it which software is calling. It says nothing about whether the buyer told that software to make this purchase.",
          "Amazon puts it plainly in its own documentation: verification confirms a request came from Bedrock AgentCore, and the site still decides what to allow — a cryptographically verified agent can still be blocked. A valid signature proves this really is Agent X. It does not prove a person authorised Agent X to buy this. Two different proofs: identity, and delegation.",
        ],
      },
      {
        heading: "The law already has a name for this",
        body: [
          "In the ordinary world, someone dealing with an agent carries some of the risk of checking. If a stranger turns up saying they buy on behalf of a company, a careful supplier asks for something: a purchase order, a letter, a phone call to someone known. Sensible commerce has always involved verifying the claim rather than accepting it.",
          "There is also a doctrine covering someone who claims authority they do not have. An agent who claims permission it was never given may be liable to a third party who relied on that claim — the law calls this breach of warranty of authority.",
          "That remedy becomes awkward when the agent is software. The software is not the obvious legal person to sue, so liability would have to attach, if at all, to a person or company behind the system. Which one — the buyer, the agent operator, the platform, the model provider, someone else — is not something I would treat as settled, and it may well depend on the architecture and the contracts as much as on the doctrine.",
          "The useful takeaway is narrower than a legal conclusion. Verification has always been the third party's job as well as the principal's, and building a system where the merchant has no way to verify anything is not a neutral choice.",
        ],
      },
      {
        heading: "What to build",
        body: [
          "Treat the two claims separately, because they have different answers.",
          "For who the agent is, sign the requests. Web Bot Auth does this with cryptographic signatures on HTTP messages, built on RFC 9421: a Signature header, a Signature-Agent header pointing at a directory of public keys, and a Signature-Input header saying what was signed. It rests on two IETF drafts — one for the directory, one for the protocol — so it is a live proposal rather than a settled standard. It is also not theoretical. OpenAI signs the outbound requests from ChatGPT's cloud browser this way and publishes its verification keys at a well-known directory. Cloudflare put forward a registry format in February 2026, and the registry work has since continued as an IETF draft authored jointly with Amazon.",
          "For who the agent acts for, do not accept the agent's word. The delegation has to be evidenced by something the buyer produced — a signed mandate travelling with the request — rather than asserted by the party that benefits from being believed. An agent vouching for its own authority is the oldest bad idea in this space.",
          "Verify against a directory you actually trust, at the moment of the request. A key you fetched once and cached forever is a key you cannot revoke.",
          "Match strictness to stakes. Browsing on an unverified claim is fine. Spending money on one is not. Fail closed where value moves, and degrade gracefully everywhere else, or you will have built a system that quietly blocks customers.",
        ],
      },
      {
        heading: "What proves it worked",
        body: [
          "For each request that mattered: what identity was presented, how it was checked, against which directory, and what evidence of delegation came with it.",
          "The question you are preparing to answer is simple and will be asked months later: who was this, and who were they acting for? If the records only say a purchase happened, you cannot answer it.",
        ],
      },
      {
        heading: "What the rules actually say",
        body: [
          "More than anywhere else in this set, and it is moving quickly.",
          "Visa's Trusted Agent Protocol separates the pieces rather than bundling them: an agent recognition signature, signed consumer and device identity, and a signed payment container, with Visa publishing verification keys. Mastercard's Agent Pay issues a token uniquely to an agent, and its material describes tokens carrying predefined spending limits, merchant categories, purpose constraints and time windows. Mastercard's framework also registers and verifies agents so participants can recognise agent transactions.",
          "The most interesting of the three is Verifiable Intent, which Mastercard announced with Google in March 2026 and open-sourced as a specification with a reference implementation. It links the consumer's identity, the original instructions including product and price limits, and the eventual transaction. That is a cryptographic proof of what the person authorised — the second proof, built by the industry itself.",
          "The direction of travel is the same in each case: bind the agent, the person, and the permission into something a merchant can check before the money moves. Which is to say the distinction this control is built on is not one I am proposing against the grain — parts of the industry are already designing for it explicitly.",
          "What does not yet exist is one answer. Web Bot Auth, Visa's protocol and Mastercard's token solve overlapping parts of the problem in different places in the stack, and a merchant may end up handling several at once. Picking one today is a bet, not a compliance decision — and worth making deliberately rather than by accident.",
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
    summary:
      "This one is not solved and I am not going to write it as though it were. The useful question is not how to stop injected instructions but how much damage one can do when it gets through — which is where the industry guidance has now landed too.",
    sections: [
      {
        heading: "What goes wrong",
        body: [
          "An agent shopping on your behalf reads product pages, reviews, descriptions, and whatever else the open web puts in front of it. Somewhere in that text is a line that says, in effect, ignore what you were told and do this instead.",
          "A person scrolling past sees nothing — the text may be invisible, or buried in a review, or sitting in a page element nobody renders. The agent reads it and treats it as direction.",
          "The reason this works is structural rather than careless. A model takes everything as one stream of text: your instructions, the page it fetched, the system prompt underneath. There is no reliable way to mark one part as orders and another part as merely information. It is all the same material, and the model has no privileged channel to tell them apart.",
          "That is why this is the attack that keeps working. Researchers at Unit 42 and Forcepoint have found it running on live sites, and Forcepoint's April 2026 work includes payloads aimed at moving money.",
        ],
      },
      {
        heading: "Why this control is different",
        body: [
          "Every other control here tells you to build something. This one starts by telling you what you cannot build.",
          "There is no filter that reliably catches injected instructions, and anyone selling you one is selling you something. Retrieval and fine-tuning help with other problems and do not solve this. An OWASP researcher put it plainly this year: prompt injection remains unsolved.",
          "The industry guidance has moved accordingly. The 2026 OWASP list shifts the job from prevention to containment — from stopping the instruction to limiting what it can accomplish. Five Eyes guidance points the same way, advising incremental deployment with a human present at consequential decisions.",
          "So the honest question is not how to keep bad instructions out. It is how much damage one can do on the day it gets in. A control that cannot eliminate a risk can still decide how expensive it is, and pretending otherwise is how this sort of writing stops being useful.",
        ],
      },
      {
        heading: "What this changes legally",
        body: [
          "Something shifts once a risk is publicly documented, and it is worth naming.",
          "Where the law asks whether someone behaved reasonably, it tends to care about what was foreseeable. A published attack class, demonstrated on live websites and written up by named research teams, is foreseeable more or less by definition. Not knowing stops being available as a position.",
          "I would not push that further than it goes. Whether a particular design falls short of reasonable care is fact-specific, varies by jurisdiction, and is not something I can settle here. But the direction is clear enough to plan around: the defensible position is not that you prevented it. It is that you knew, and you built so that it mattered less.",
        ],
      },
      {
        heading: "What to build",
        body: [
          "Design from the assumption that an injected instruction will eventually get through, and put your effort into what happens next.",
          "Keep reading and acting apart. The pattern that works is two models rather than one: a trusted model that sees only the buyer’s instruction and produces a plan, and a quarantined model that handles fetched pages and returns data rather than direction. The untrusted content never reaches the part of the system that decides to spend.",
          "Cut down what the agent can do at all. Tools scoped to this task, credentials scoped to this purchase, no standing access to anything it does not need today. Worth knowing the limit of this one: least privilege does not stop an attack that misuses a tool the agent legitimately holds. It shrinks the blast radius rather than preventing the blast.",
          "Put a person in front of the irreversible things. Spending above a threshold, anything that cannot be undone, anything outside the pattern of what this buyer normally does. A confirmation step is unfashionable and it is the control most likely to actually save you.",
          "Re-check permission after the agent reads anything it did not control, which is the same point C2 makes from the other direction. The moment it ingests a page is the moment its instructions may have changed.",
          "Record what it read before it decided. Not for the model’s benefit, for yours: when something goes wrong you will need to know which content was in front of it.",
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
          "OWASP treats prompt injection as the first item on its list for large language model applications, and its 2026 revision reframes the work around containment rather than prevention. Its prevention guidance and Microsoft’s both converge on layers — architecture, runtime checks at the point of action, and governance above both — rather than one guardrail carrying everything.",
          "No regulation I am aware of requires any of this specifically. But if a dispute ever turns on whether a system was built with reasonable care, published guidance describing a known attack and the expected response is the sort of thing that gets cited.",
        ],
      },
    ],
  },
];

export const PUBLISHED_CONTROLS = CONTROLS.filter((c) => c.published);
