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
    title: "Mandate capture",
    question:
      "What did the person actually authorise, and can a machine check it before the agent commits?",
    tone: "grape",
    published: "September 2026",
    summary:
      "The protocols scope the payment credential. Nothing captures what the buyer agreed to buy. Until the mandate exists as a checkable object, no one can answer the only question a dispute ever asks.",
    sections: [
      {
        heading: "The failure",
        body: [
          "Someone tells an agent to book them a flight to Toronto. The agent books business class for $4,200. They meant economy. The airline accepted the payment in good faith, the money is gone, and the argument begins.",
          "The argument cannot be settled, because nothing in the system recorded what the buyer agreed to. There is a prompt, a transaction, and a gap between them where the authority should have been.",
          "A sharper version is already running in the wild. Palo Alto's Unit 42 and Forcepoint's X-Labs have both found indirect prompt injection live on real sites: instructions hidden in page content that a human never sees and an agent reads as direction. The commerce version appends something to the cart — in the documented case a gift card routed to the attacker — and because the interface surfaces an order total rather than a basket, the buyer learns about it from a bank statement. The agent was not compromised in any conventional sense. It did exactly what the page told it to, because nothing defined what it had been told to do by the only person who mattered.",
        ],
      },
      {
        heading: "The principle",
        body: [
          "This is the oldest problem in agency law, and it has settled answers.",
          "An agent binds its principal only within the authority actually conferred. Authority is not inferred from ambiguity: an instruction to buy a laptop is not authority to buy a Ferrari, and the gap is not filled by the agent's judgement about what the principal would probably have wanted.",
          "But a third party who deals with the agent in good faith may rely on the authority the agent appeared to hold. That is why the airline keeps the $4,200. Apparent authority protects the merchant and pushes the loss back onto the principal, or onto whoever put the agent in a position to seem authorised. Whether that is the buyer or the platform is the question every one of these disputes will turn on, and it is currently answered by nothing.",
          "There is a third doctrine worth knowing, because it decides what happens next. A principal who learns of an unauthorised act and does not object may be taken to have ratified it. In a system where the buyer only discovers the purchase on a statement weeks later, silence is doing legal work that nobody designed for.",
        ],
      },
      {
        heading: "The control",
        body: [
          "Capture the mandate as an explicit, structured object before the agent acts, and check the transaction against it at the moment of commitment.",
          "At minimum the mandate carries a ceiling, the categories or merchants in scope, a validity window, whether it is single-use or recurring, and what the agent may do when the exact thing is unavailable. That last field is where most real disputes live: substitution is where an agent's helpfulness turns into an unauthorised purchase.",
          "The mandate is derived from the buyer's instruction but confirmed by the buyer, not inferred silently from the prompt. An agent that constructs its own authority from an ambiguous sentence has not been authorised; it has guessed, and the guess will be litigated rather than the sentence.",
          "Check it at commit, not at the start. A task that begins inside scope can wander outside it — that is precisely what an injected instruction does. A scope check that runs only when the task is created validates the wrong moment.",
          "The Agentic Commerce Protocol already scopes the payment credential narrowly, which is the right instinct applied one layer too low. A tightly scoped token answers how much may be spent through this rail. It does not answer what the buyer agreed to buy.",
        ],
      },
      {
        heading: "The evidence",
        body: [
          "Two artefacts, and if you cannot produce both you cannot answer the question the dispute will ask.",
          "First, the mandate record: immutable, timestamped, tied to the session, showing what the buyer confirmed rather than what the agent inferred. Second, the decision log: showing that the transaction was checked against that mandate before it committed, and what the check returned.",
          "The test is not whether you can explain the purchase today. It is whether someone who does not trust you can reconstruct it in eleven months, from your records, without your help.",
        ],
      },
      {
        heading: "Where this touches regulation",
        body: [
          "Less than people claim, and pretending otherwise is how governance writing loses its audience.",
          "The EU AI Act's Article 50 transparency obligations became applicable in August 2026, and they bear on whether a person knows they are dealing with an AI system — relevant to the merchant's side of an agent transaction, not to mandate scope. The high-risk regime, which is where more of this would eventually sit, was deferred by the Digital Omnibus to December 2027 for Annex III systems.",
          "Card scheme rules on authorisation and chargeback already allocate loss between issuer, acquirer and merchant, and they were written on the assumption that a human authorised the transaction. They are the most immediately applicable body of rules here and the least discussed.",
          "The honest position is that no regulation currently requires mandate capture. Agency law will decide these disputes long before any statute does, which is an argument for building the control now rather than waiting to be told to.",
        ],
      },
    ],
  },
];

export const PUBLISHED_CONTROLS = CONTROLS.filter((c) => c.published);
