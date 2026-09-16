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
      "Two different claims get treated as one. Knowing which software is calling is not the same as knowing whose permission it carries. The first is close to solved. The second is where the interesting work is.",
    sections: [
      {
        heading: "What goes wrong",
        body: [
          "A request arrives at a shop. It looks like a browser. It might be a person, an agent doing the shopping for a real customer, or a scraper wearing the same costume. The shop cannot tell.",
          "The usual signals are all forgeable. A user-agent string is a text field anyone can type. Behaviour patterns are a guess. IP ranges move. So merchants end up choosing between blocking agents and losing genuine customers, or letting everything through and eating the fraud. Both are defaults dressed up as decisions.",
          "There is a second problem hiding inside the first, and it is the one people skip. Suppose the shop does know the request genuinely comes from a well-known agent platform. That tells it which software is calling. It says nothing about whether the agent is acting for the customer it claims, or what that customer actually allowed. Those are two separate claims and they need two separate proofs.",
        ],
      },
      {
        heading: "The law already has a name for this",
        body: [
          "In the ordinary world, someone dealing with an agent carries some of the risk of checking. If a stranger turns up saying they buy on behalf of a company, a careful supplier asks for something: a purchase order, a letter, a phone call to someone known. Sensible commerce has always involved verifying the claim rather than accepting it.",
          "There is also a doctrine covering the person who claims authority they do not have. An agent who asserts permission they were never given can be liable to the third party who relied on it. That remedy is awkward here: software owns nothing and is not a legal person, so in practice it points at whoever operated the agent. Whether it lands there is exactly the sort of question that has not been tested, and I am not going to pretend otherwise.",
          "The useful takeaway is narrower than a legal conclusion. Verification has always been the third party's job as well as the principal's, and building a system where the merchant has no way to verify anything is not a neutral choice.",
        ],
      },
      {
        heading: "What to build",
        body: [
          "Treat the two claims separately, because they have different answers.",
          "For who the agent is, sign the requests. Web Bot Auth does this with cryptographic signatures on HTTP messages: a Signature header, a Signature-Agent header pointing at a directory of public keys, and a Signature-Input header saying what was signed. It rests on two IETF drafts, and it is not theoretical — OpenAI attaches message signatures to Operator requests and publishes its keys, and Cloudflare and Amazon agreed an open registry format for agent keys in February 2026.",
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
          "Visa's Trusted Agent Protocol gives an agent a signed identity checked against a directory Visa runs, with a signed mandate from the cardholder travelling alongside the authorisation. Mastercard's Agent Pay issues a token bound at provisioning to a specific agent identity and to the cardholder's limits, and flags the transaction as agent-initiated. In March 2026 Mastercard and Google open-sourced Verifiable Intent, which ties together the user's verified identity, the instructions they actually gave, and what the transaction did.",
          "So the direction of travel is clear, and it is the same in every case: bind the agent, the person, and the permission into something a merchant can check before the money moves.",
          "What does not yet exist is one answer. Web Bot Auth, Visa's protocol and Mastercard's token solve overlapping parts of the problem in different places in the stack, and a merchant may end up handling several at once. Picking one today is a bet, not a compliance decision — and worth making deliberately rather than by accident.",
        ],
      },
    ],
  },
];

export const PUBLISHED_CONTROLS = CONTROLS.filter((c) => c.published);
