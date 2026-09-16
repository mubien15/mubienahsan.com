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
      "The protocols record the checkout a buyer is completing and constrain the credential that pays for it. What no one captures is the durable authority the agent was sent out with — category, substitution, merchant, recurrence — which is where the disputes begin.",
    sections: [
      {
        heading: "The failure",
        body: [
          "Someone tells an agent to book them a flight to Toronto. The agent books business class for $4,200. They meant economy. The airline accepted the payment in good faith, the money is gone, and the argument begins.",
          "The argument is hard to settle, because nothing durable recorded what the buyer authorised the agent to go and find. There is an instruction, a checkout, a transaction, and a gap between the first and the last where the authority should have been.",
          "A sharper version is already running in the wild. Palo Alto's Unit 42 and Forcepoint's X-Labs have both found indirect prompt injection on live websites: instructions hidden in page content that a human never sees and an agent reads as direction. Forcepoint's April 2026 research includes payloads aimed at financial fraud. The commerce version is easy to see — an injected instruction causes the agent to add or substitute something the buyer never asked for, and where the interface surfaces an order total rather than a basket, the buyer may not notice until a statement arrives. That specific shopping-cart failure is a foreseeable application of the attack pattern rather than a documented incident I rely on here.",
        ],
      },
      {
        heading: "The principle",
        body: [
          "Agency law has spent centuries on the analogous problem, and it offers the most useful vocabulary available for this one. Whether an AI system is itself the legal agent — rather than the platform or provider acting through software — is an open question, and nothing here assumes it is settled.",
          "Authority is bounded by what the agent could reasonably understand the principal to have authorised. Actual authority may be express or implied, so ambiguity does not leave an agent with nothing to work from; neither does it hand over unlimited discretion. An instruction to buy a laptop is not authority to buy a Ferrari, and the space between them is not filled by the agent's view of what the principal would probably have wanted.",
          "A third party dealing with an agent in good faith may rely on apparent authority — but only where that belief is reasonable and traceable to manifestations of the principal. That may protect a merchant who relied reasonably. Whether deploying an agent, handing it payment credentials, or using a particular platform amounts to such a manifestation, and what scope a merchant may reasonably infer from it, is exactly the sort of question these disputes will have to answer.",
          "A third doctrine decides what happens afterwards. A principal who learns of an unauthorised act and does not object may be taken to have ratified it — though silence is not automatically ratification. It generally turns on knowledge of the material facts and on circumstances where others would reasonably infer assent. In a system where the buyer first learns of a purchase from a statement weeks later, that is a great deal of weight resting on notification design.",
        ],
      },
      {
        heading: "The control",
        body: [
          "Capture the mandate as an explicit, structured object before the agent goes looking, and check the transaction against it at the moment of commitment.",
          "At minimum the mandate carries a ceiling independent of any single checkout total, the categories or merchants in scope, a validity window, whether authority is single-use or recurring, and what the agent may do when the exact thing is unavailable. That last field is where most real disputes will live: substitution is where an agent's helpfulness turns into a purchase nobody authorised.",
          "The mandate is derived from the buyer's instruction but confirmed by the buyer, not inferred silently from the prompt. An agent that constructs its own authority from an ambiguous sentence has not been authorised so much as it has guessed, and the guess is what will be argued over rather than the sentence.",
          "Check it at commit, not only at the start. A task that begins inside scope can wander outside it — that is precisely what an injected instruction does. A scope check that runs only when the task is created validates the wrong moment.",
          "The Agentic Commerce Protocol constrains the delegated payment credential to a single use, a maximum amount and an expiry, derived from the checkout the buyer has just approved. That is the right instinct at the transaction layer, and it is more than critics of these protocols usually credit. What it does not describe is what the agent was authorised to go and look for before any checkout existed — which is where the failures above begin.",
        ],
      },
      {
        heading: "The evidence",
        body: [
          "Two artefacts, and without both you cannot answer the question a dispute will ask.",
          "First, the mandate record: immutable, timestamped, tied to the session, showing what the buyer confirmed rather than what the agent inferred. Second, the decision log: showing that the transaction was checked against that mandate before it committed, and what the check returned.",
          "The test is not whether you can explain the purchase today. It is whether someone who does not trust you can reconstruct it in eleven months, from your records, without your help.",
        ],
      },
      {
        heading: "Where this touches regulation",
        body: [
          "Less than people claim, and pretending otherwise is how governance writing loses its audience.",
          "The EU AI Act's Article 50 transparency obligations have applied since 2 August 2026, and they bear on whether a person knows they are dealing with an AI system. The AI Omnibus entered into force on 27 July 2026 and moved the Annex III high-risk obligations to 2 December 2027. That regime is not a general agentic-commerce regime and does not automatically capture ordinary purchasing agents.",
          "Card-network rules on authorisation, disputes and chargebacks remain immediately relevant to how losses get allocated. But the networks are no longer treating agentic commerce as an ordinary human-initiated card transaction: Visa, Mastercard and others are building agent-specific identity, authority and transaction-context controls, and in September 2026 Visa, Mastercard and Ant International announced work towards a common agent-trust framework. That is the most active rulemaking in this space and the least discussed.",
          "I am not aware of a generally applicable regulatory requirement to capture a mandate in the form described here. Agency principles and card-network rules will shape these disputes long before any dedicated statute does, which is an argument for building the control now rather than waiting to be told to.",
        ],
      },
    ],
  },
];

export const PUBLISHED_CONTROLS = CONTROLS.filter((c) => c.published);
