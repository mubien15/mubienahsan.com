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
      "The protocols record the checkout a buyer is completing and limit the card credential that pays for it. What nobody writes down is the standing permission the agent was sent out with — what it may buy, from whom, and what to do when the thing is out of stock. That is where the arguments start.",
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
          "There is a quieter version that catches people out. An agent books a flight, then a bag, then a seat, then a hotel. Each step looks fine on its own. Added together they pass the limit — and nothing was watching the total, because each purchase was judged alone.",
          "Both failures share a cause. The check ran against intentions rather than against the thing that actually happened.",
        ],
      },
      {
        heading: "Why the timing matters",
        body: [
          "When the law asks whether an agent had permission, it asks about the moment of the act — not the moment of the briefing. Permission can be narrowed, used up or withdrawn in between.",
          "That maps cleanly onto software. A limit checked at the start is a statement about what the agent intended. A limit checked at the point of payment is a statement about what it did. Only the second is worth anything in an argument.",
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
          "The closest thing is where the card networks are heading. Controls that bind an agent's authority to transaction context assume something is evaluating that context at the point of the transaction. A design that checks only at task creation will not satisfy that, whatever a policy document claims.",
        ],
      },
    ],
  },
];

export const PUBLISHED_CONTROLS = CONTROLS.filter((c) => c.published);
