/**
 * The Oversight Threshold — content for /research/autonomy-governance.
 *
 * Data only. Every component that renders this reads from here, so the
 * framework can be revised, extended or corrected without touching layout.
 *
 * Two disciplines this file has to keep:
 *
 *  1. Level 5 is a stress-test scenario for governance analysis. It is never
 *     written as a description of a system that exists today.
 *  2. Voluntary guidance and binding law are kept apart. Where a source is a
 *     framework or a commitment rather than a legal requirement, the text says
 *     so rather than letting the reader assume.
 */

/** When the claims and links below were last checked against their sources. */
export const LAST_CHECKED = "20 September 2026";

/* ------------------------------------------------------------ dimensions */

export type DimensionId =
  | "purpose"
  | "authority"
  | "oversight"
  | "testing"
  | "monitoring"
  | "intervention"
  | "accountability"
  | "assurance";

export const DIMENSIONS: { id: DimensionId; name: string; asks: string }[] = [
  {
    id: "purpose",
    name: "Purpose and permitted use",
    asks: "What is this system for, and what is it explicitly not for?",
  },
  {
    id: "authority",
    name: "Authority and permissions",
    asks: "What may it actually reach and do, enforced outside the model?",
  },
  {
    id: "oversight",
    name: "Human oversight",
    asks: "Who reviews what, with what information, and can they say no?",
  },
  {
    id: "testing",
    name: "Testing and evaluation",
    asks: "What was tested, against what expected behaviour, and by whom?",
  },
  {
    id: "monitoring",
    name: "Monitoring and evidence",
    asks: "What is watched in production, and what would the record show?",
  },
  {
    id: "intervention",
    name: "Intervention and containment",
    asks: "How is it stopped, how fast, and has that been exercised?",
  },
  {
    id: "accountability",
    name: "Accountability and escalation",
    asks: "Who owns the outcome, and where does a serious problem go?",
  },
  {
    id: "assurance",
    name: "Independent assurance",
    asks: "Who checks this who did not build it and does not report to whoever did?",
  },
];

/** 1 = light touch, 5 = the heaviest arrangement described in this framework. */
export type DimensionState = { weight: 1 | 2 | 3 | 4 | 5; text: string };

/* --------------------------------------------------------------- levels */

export type AutonomyLevel = {
  id: 1 | 2 | 3 | 4 | 5;
  name: string;
  /** One short word for the axis of the figure, where space is tight. */
  short: string;
  tagline: string;
  /** True only for level 5: a scenario used to stress-test the framework. */
  scenario?: boolean;
  machineDoes: string;
  humanDoes: string;
  examples: string[];
  failures: string[];
  controls: string[];
  evidence: string[];
  assumptions: string[];
  escalation: string;
  /** Illustrative, not measured. See the note under the figure. */
  verification: number;
  intensity: number;
  dimensions: Record<DimensionId, DimensionState>;
};

export const LEVELS: AutonomyLevel[] = [
  {
    id: 1,
    name: "Assistive",
    short: "Assistive",
    tagline: "It produces. A person decides and acts.",
    machineDoes:
      "Produces information, analysis, a recommendation or a draft. It does not act on the world, and nothing it writes takes effect until a person does something with it.",
    humanDoes:
      "Everything consequential. The person decides whether the output is right, decides what to do, and performs the action under their own authority.",
    examples: [
      "Summarising a long document before a meeting",
      "Drafting an email or a paper for someone to edit and send",
      "Producing background research a person will check",
      "Suggesting a risk rating that an analyst confirms or overrides",
    ],
    failures: [
      "A confident, fluent output that is wrong in a way the reader does not notice, because fluency and accuracy have come apart.",
      "Sensitive information pasted into a tool that was never approved for it.",
      "Quiet drift into decisions. The recommendation stops being an input and becomes the answer, without anyone deciding that it should.",
    ],
    controls: [
      "A stated purpose and a list of uses that are out of scope",
      "Rules on what data may be put in, enforced by access rather than by policy alone",
      "Review proportionate to what the output feeds into",
      "A named owner for the use case",
    ],
    evidence: [
      "A record of what the system was approved to be used for",
      "Spot checks of output quality, with what was checked and what was found",
      "Who owns the use case, and when that was last confirmed",
    ],
    assumptions: [
      "The reviewer has enough expertise to notice a wrong answer.",
      "People are actually reviewing rather than approving by reflex.",
      "The tool is being used for what it was approved for.",
    ],
    escalation:
      "The moment the output starts flowing into something automatically, or the reviewer becomes a formality, this is no longer level 1 whatever the documentation says.",
    verification: 96,
    intensity: 16,
    dimensions: {
      purpose: {
        weight: 1,
        text: "A plain statement of what it is for and what it must not be used for. Short is fine; testable matters more than long.",
      },
      authority: {
        weight: 1,
        text: "No ability to act. The main question is what data it can reach, which should be enforced by access controls rather than by asking people not to paste things.",
      },
      oversight: {
        weight: 2,
        text: "A person reads the output before it matters. This is genuine oversight here, because the output is small enough and slow enough to check.",
      },
      testing: {
        weight: 1,
        text: "Sample the outputs against cases where you know the right answer. You are testing usefulness and failure shape, not certifying a model.",
      },
      monitoring: {
        weight: 1,
        text: "Light. Know who uses it and roughly for what. Heavy telemetry here buys little and costs privacy.",
      },
      intervention: {
        weight: 1,
        text: "Turning it off is enough, because nothing is in flight. The recovery question is whether people can still do the work without it.",
      },
      accountability: {
        weight: 2,
        text: "The person who acts on the output is accountable for the action. Say so explicitly, because 'the AI suggested it' appears quickly otherwise.",
      },
      assurance: {
        weight: 1,
        text: "Usually not warranted on its own. It matters if many level 1 uses together start shaping a consequential decision.",
      },
    },
  },
  {
    id: 2,
    name: "Delegated task execution",
    short: "Delegated",
    tagline: "It performs a defined task. A person approves what counts.",
    machineDoes:
      "Carries out a clearly bounded task — a defined input, a defined output, narrow limits. It can touch systems, but the consequential step waits for approval.",
    humanDoes:
      "Approves the outputs or actions that matter, and handles the exceptions the system is not permitted to resolve.",
    examples: [
      "Processing a standard request end to end and presenting the result for sign-off",
      "Updating a record once a person confirms the change",
      "Preparing a structured assessment for review",
      "Running a pre-approved workflow whose steps were fixed in advance",
    ],
    failures: [
      "The approval becomes a button. The reviewer cannot see what they are approving, or sees forty a day and approves all of them.",
      "The boundary is written in a prompt rather than enforced in permissions, so it holds until something instructs the system otherwise.",
      "Exceptions get handled quietly instead of escalated, because escalating is slower and the system is usually right.",
    ],
    controls: [
      "Authority written down before deployment: the task, the limits, the prohibited actions",
      "Permissions enforced in the systems it touches, not in its instructions",
      "Approval gates placed where consequence actually sits, not on every step",
      "Logging of inputs, actions, approvals and exceptions",
      "A defined route for cases it may not resolve, with an owner and a response time",
    ],
    evidence: [
      "The approved scope, with a version and a date",
      "Test results against expected behaviour, including the cases it should refuse",
      "An action log that shows what was approved, by whom, and against what information",
      "Exception records, and what happened to them",
    ],
    assumptions: [
      "The approver can see enough to make approving a real decision.",
      "Approval volume is low enough that attention is possible.",
      "Permissions match the documented boundary — someone has checked, not assumed.",
    ],
    escalation:
      "When the system starts choosing between several possible actions rather than executing one, you are at level 3, and the controls above stop being sufficient.",
    verification: 86,
    intensity: 30,
    dimensions: {
      purpose: {
        weight: 2,
        text: "The permitted task stated precisely enough that someone else could design a test from it, with the prohibited actions named.",
      },
      authority: {
        weight: 3,
        text: "Least privilege, enforced where the action happens. If it must not change a record, it should not hold a credential that can.",
      },
      oversight: {
        weight: 3,
        text: "Approval on the consequential step. Worth auditing the approval itself: how long does the reviewer take, and can they see the basis?",
      },
      testing: {
        weight: 3,
        text: "Test the boundary as hard as the happy path. The useful cases are the ones where the right behaviour is to refuse or escalate.",
      },
      monitoring: {
        weight: 3,
        text: "Log inputs, actions, approvals and exceptions, with versions attached. A refusal rate of zero is a finding, not a success.",
      },
      intervention: {
        weight: 2,
        text: "Pausing is straightforward because work is short-lived. Decide in advance what happens to a task already half done.",
      },
      accountability: {
        weight: 3,
        text: "A named service owner distinct from whoever built it, and a named approver for the gate.",
      },
      assurance: {
        weight: 2,
        text: "Periodic review by someone outside the delivery team, proportionate to what the task affects.",
      },
    },
  },
  {
    id: 3,
    name: "Conditional autonomy",
    short: "Conditional",
    tagline: "It plans and acts within limits. Nobody approves each step.",
    machineDoes:
      "Plans an approach, chooses tools, and takes a sequence of actions without approval for each one — as long as it stays inside defined limits.",
    humanDoes:
      "Sets the limits, watches in something close to real time, and handles what the system escalates. Reviews outcomes rather than steps.",
    examples: [
      "An agent researching across several sources and producing a conclusion",
      "A system calling other systems to assemble or reconcile something",
      "An agent modifying records within a defined scope",
      "Bounded purchasing within a recorded mandate",
    ],
    failures: [
      "A task that began inside its limits ends outside them, through substitution, a price change, or several small permitted actions that add up.",
      "Something it read became something it obeyed. The open web is an input, and an input can carry instructions.",
      "The escalation route exists and nobody is on the other end of it.",
      "Actions that turn out not to be reversible, discovered at the point where that matters.",
    ],
    controls: [
      "A recorded mandate: what it may do, with whom, to what limit, for how long",
      "Checks against that mandate at the point of action, not at the point the task was created",
      "Running totals across the whole task rather than per transaction",
      "Verifiable identity and authorisation when it acts on other systems",
      "Tool access scoped to the task, with dangerous tools simply absent",
      "Behavioural evaluation, including adversarial and injected-instruction cases",
      "Escalation triggers with a named owner and an agreed response time",
      "A bias towards reversible actions, and knowing which ones are not",
    ],
    evidence: [
      "The mandate, versioned, and proof that each action was checked against it",
      "A reconstructable trail: objective, plan, tools called, actions taken, what it had read",
      "Evaluation results with observable pass criteria, repeated where variance matters",
      "Records of escalations, and of blocks — a system that never refuses is not being checked",
    ],
    assumptions: [
      "The limits are enforced somewhere the system cannot argue with.",
      "Monitoring is fast enough to matter relative to how fast it acts.",
      "Someone is actually available when an escalation fires.",
      "Actions believed reversible genuinely are.",
    ],
    escalation:
      "When objectives start spanning long periods, or the system coordinates other agents, or nobody can plausibly inspect the intermediate decisions, treat it as level 4.",
    verification: 78,
    intensity: 40,
    dimensions: {
      purpose: {
        weight: 4,
        text: "A mandate rather than a description: amount, scope, counterparties, duration, and what to do when the expected path is unavailable.",
      },
      authority: {
        weight: 4,
        text: "Explicit, narrow, and checked at the moment of action. Fail closed: if the check cannot run, the action does not happen.",
      },
      oversight: {
        weight: 3,
        text: "Oversight of outcomes and exceptions, not steps. This is where step-by-step review stops being available and people often fail to notice.",
      },
      testing: {
        weight: 4,
        text: "Behavioural evaluation of the whole system: tool use, boundary cases, injected instructions, and what it does when a dependency fails.",
      },
      monitoring: {
        weight: 4,
        text: "Near real time, with limits, totals and escalation triggers that produce an action rather than a notification.",
      },
      intervention: {
        weight: 4,
        text: "A stop that reaches every tool and credential, not just the interface. Measure how long it takes; the number is the control.",
      },
      accountability: {
        weight: 4,
        text: "One accountable owner for the agent's behaviour, and a separate challenge function with the standing to pause it.",
      },
      assurance: {
        weight: 3,
        text: "Independent review of the mandate, the evaluations and the evidence, by someone who did not build it.",
      },
    },
  },
  {
    id: 4,
    name: "High autonomy",
    short: "High",
    tagline: "It pursues an objective. A person approves the goal, not the route.",
    machineDoes:
      "Works towards a longer-running objective, adapts its strategy as it goes, and may coordinate several systems or other agents with limited intervention.",
    humanDoes:
      "Approves the objective and the boundaries. Cannot realistically inspect the intermediate decisions, and should stop pretending otherwise in the documentation.",
    examples: [
      "An agent managing a multi-stage process over days, adjusting as conditions change",
      "A system coordinating several sub-agents towards one goal",
      "Continuous optimisation of a process against a target",
    ],
    failures: [
      "The objective was specified slightly wrong and the system pursues it competently. Capability makes this worse, not better.",
      "Review becomes ceremonial: a person signs, but could not have reached a different conclusion from the information in front of them.",
      "Emergent behaviour from several agents interacting that none of them was tested for.",
      "Logs that record what happened without explaining why, so nobody can reconstruct the reasoning.",
      "The shutdown path has a dependency nobody tested, and it is discovered during the incident.",
    ],
    controls: [
      "Evaluation by people independent of the build, against stated thresholds",
      "Continuous assurance rather than an annual review",
      "Capability thresholds defined in advance, with what happens when one is crossed",
      "Containment: bounded blast radius, segregated environments, limited standing access",
      "A tested shutdown that reaches every tool, credential and delegated agent",
      "Adversarial testing, including attempts to work around the restrictions",
      "Immutable, reconstructable evidence of objectives, permissions, actions and interventions",
      "Named accountability that does not dissolve into a committee",
    ],
    evidence: [
      "Independent evaluation reports, with method, sample, limitations and what was not covered",
      "Threshold definitions and the record of what happened when one was approached",
      "Shutdown exercises: what was stopped, how long it took, what was missed",
      "Tamper-evident records of objectives, permissions and interventions",
      "A reconstructable account of any consequential decision, months later",
    ],
    assumptions: [
      "Evaluations detect the behaviours that matter, including ones nobody thought to test for.",
      "The reviewers are genuinely independent, not organisationally adjacent.",
      "Containment holds when it is tested rather than when it is described.",
      "The shutdown path works under the conditions where it would be needed.",
    ],
    escalation:
      "When the system can meaningfully improve its own capability, or when a reviewer can no longer reproduce or challenge its reasoning even with time, the assumptions underneath everything above stop holding.",
    verification: 30,
    intensity: 78,
    dimensions: {
      purpose: {
        weight: 5,
        text: "The objective specified with unusual care, because the system will pursue what you wrote rather than what you meant.",
      },
      authority: {
        weight: 5,
        text: "Standing permissions minimised and time-bounded. Anything that cannot be undone needs a separate decision, not an inherited one.",
      },
      oversight: {
        weight: 4,
        text: "Say plainly what a human can and cannot verify here. Oversight shifts to objectives, thresholds and exceptions — and that shift should be a decision, not a drift.",
      },
      testing: {
        weight: 5,
        text: "Independent evaluation, adversarial testing, and evaluation of the multi-agent behaviour rather than each component alone.",
      },
      monitoring: {
        weight: 5,
        text: "Continuous, with unexpected capability change and attempts to work around restrictions treated as findings in their own right.",
      },
      intervention: {
        weight: 5,
        text: "Tested containment and shutdown, with a measured time-to-stop and a known list of what a stop does not reach.",
      },
      accountability: {
        weight: 5,
        text: "A named accountable executive, a challenge function with standing, and an escalation route that reaches the board.",
      },
      assurance: {
        weight: 5,
        text: "Independent assurance is no longer optional. It is the only thing left that is not the system reporting on itself.",
      },
    },
  },
  {
    id: 5,
    name: "Transformative autonomy",
    short: "Scenario",
    tagline: "A scenario. Review may no longer be verification.",
    scenario: true,
    machineDoes:
      "In this scenario the system outperforms people across many relevant tasks, can accelerate parts of AI research, or can improve important aspects of its own operation.",
    humanDoes:
      "May approve, and may not be able to verify. The reviewer cannot independently reproduce, understand or challenge the reasoning, so the signature records a decision rather than a check.",
    examples: [
      "Not applicable. This level exists to test whether the framework above survives contact with a system it was not designed for.",
    ],
    failures: [
      "Oversight becomes entirely ceremonial: the form of approval with none of the substance, and no way to tell from the record which one you have.",
      "Capability increases faster than the governance around it can be revised.",
      "The evidence that the system is behaving is produced by the system, or by tools it can influence.",
      "Restrictions that are asserted rather than verifiable, so nobody can show that intervention is still possible.",
    ],
    controls: [
      "Preventing uncontrolled capability escalation, with thresholds set before they are approached",
      "Oversight from outside the operating organisation, and from institutions rather than individuals",
      "Controls on compute and deployment, not only on the model",
      "Containment that has been tested against a system trying to get out of it",
      "Restrictions that can be verified by a third party rather than taken on trust",
      "Authorisation split across parties, so no single actor can proceed alone",
      "Continuous independent evaluation, with the evaluator's own independence evidenced",
      "Coordination across jurisdictions, because unilateral limits are limits on one jurisdiction",
      "Standing evidence that intervention remains possible, refreshed rather than assumed",
    ],
    evidence: [
      "Demonstrations — not descriptions — that intervention still works, repeated over time",
      "Evaluations produced by parties with no stake in the result and no dependency on the system",
      "Records the system could not have influenced",
      "A documented answer to: what would we accept as proof that control has been lost?",
    ],
    assumptions: [
      "That containment holds against something more capable than the people who designed it. This is an assumption, not a finding.",
      "That evaluation can detect capabilities the evaluators did not anticipate.",
      "That evidence produced within reach of the system can be trusted.",
      "That intervention remains available at the moment it is needed rather than at the moment it was last tested.",
    ],
    escalation:
      "There is no level 6 in this framework. If the assumptions here fail, the answer is not more governance of the same kind — it is not deploying, which is why capability thresholds have to be set before they are reached rather than after.",
    verification: 8,
    intensity: 100,
    dimensions: {
      purpose: {
        weight: 5,
        text: "Permitted use becomes a question about deployment itself, decided before capability arrives rather than in response to it.",
      },
      authority: {
        weight: 5,
        text: "Authority to operate is split across parties. The relevant control is compute and deployment, not instructions to the system.",
      },
      oversight: {
        weight: 5,
        text: "Individual human review is no longer the primary control. Saying so is more honest — and more useful — than keeping a signature that verifies nothing.",
      },
      testing: {
        weight: 5,
        text: "Continuous independent evaluation, by parties who can publish, with the limits of their own methods stated.",
      },
      monitoring: {
        weight: 5,
        text: "Monitoring that the system cannot influence, which is a harder engineering problem than it sounds and should be treated as one.",
      },
      intervention: {
        weight: 5,
        text: "Verifiable containment and a demonstrated ability to stop. Demonstrated, repeatedly, not designed once and documented.",
      },
      accountability: {
        weight: 5,
        text: "Accountability extends past the operator to institutions with the standing and the means to intervene.",
      },
      assurance: {
        weight: 5,
        text: "External, institutional and continuous. Self-assessment carries no weight at this level and should not be presented as if it does.",
      },
    },
  },
];

export const THRESHOLD_NOTE =
  "The lines cross between level 3 and level 4. That crossing is the oversight threshold: the point at which a person's ability to independently verify the system falls below the governance intensity the system now requires. Both lines are illustrative of the argument rather than measured quantities.";

/* ------------------------------------------- meaningful human oversight */

export type OversightTest = {
  id: "understand" | "challenge" | "verify" | "intervene" | "stop";
  name: string;
  question: string;
  /** Why this one is separable from the others. */
  why: string;
  /** What failing it looks like from the inside, where it is hard to see. */
  failureLooks: string;
};

export const OVERSIGHT_TESTS: OversightTest[] = [
  {
    id: "understand",
    name: "Understand",
    question:
      "Can the responsible person understand the objective, the boundaries, the relevant inputs and the proposed action?",
    why: "Everything else depends on this one. You cannot challenge, verify or sensibly intervene in something you do not follow.",
    failureLooks:
      "The reviewer can describe what the system produced but not why, and fills the gap with an assumption about how it probably works.",
  },
  {
    id: "challenge",
    name: "Challenge",
    question:
      "Can that person question the recommendation and reach a different conclusion, without simply deferring to it?",
    why: "Deference is the quiet failure. A reviewer who always agrees is indistinguishable, in the record, from no reviewer at all.",
    failureLooks:
      "Overriding is possible in principle and never happens in practice, and nobody has asked why.",
  },
  {
    id: "verify",
    name: "Verify",
    question:
      "Can they independently test the important facts, assumptions or outputs before harm occurs?",
    why: "Verification is not review. Review asks whether the output looks right; verification checks it against something the system did not supply.",
    failureLooks:
      "The only evidence available to the reviewer is the evidence the system produced, so agreement is the only reachable outcome.",
  },
  {
    id: "intervene",
    name: "Intervene",
    question:
      "Can they interrupt or change the behaviour while the decision is still reversible?",
    why: "Timing is the whole control. The ability to intervene after the money moves is not intervention, it is reporting.",
    failureLooks:
      "Intervention exists and is slower than the process it is meant to interrupt, which nobody has measured.",
  },
  {
    id: "stop",
    name: "Stop",
    question:
      "Can they reliably end the system's authority, access and ability to act across every connected tool?",
    why: "Stopping the interface is not stopping the system. Credentials, tools, queued work and delegated agents each need to be reached.",
    failureLooks:
      "A documented shutdown procedure that has never been exercised, so its real duration and its gaps are both unknown.",
  },
];

export type OversightAnswer = "yes" | "partly" | "no";

export const OVERSIGHT_OPTIONS: { id: OversightAnswer; label: string; score: number }[] =
  [
    { id: "yes", label: "Yes, demonstrably", score: 2 },
    { id: "partly", label: "Partly, or untested", score: 1 },
    { id: "no", label: "No", score: 0 },
  ];

export type OversightResult = {
  /** Lowest total score that lands in this band. */
  min: number;
  verdict: string;
  meaning: string;
  next: string;
  tone: "mint" | "gold" | "flame" | "grape";
};

/**
 * Bands run from 10 down to 0. Ordered highest first so a lookup can take the
 * first band whose `min` the score reaches.
 */
export const OVERSIGHT_RESULTS: OversightResult[] = [
  {
    min: 9,
    verdict: "Meaningful oversight appears possible",
    meaning:
      "On your own answers, the person responsible could understand, challenge, verify, intervene and stop. That is the condition under which human review is doing real work.",
    next: "Keep it true. Re-run this when the model, the tools, the permissions or the volume of decisions change — any of those can move the answer without anyone deciding to.",
    tone: "mint",
  },
  {
    min: 7,
    verdict: "Oversight is fragile",
    meaning:
      "Most of the conditions hold, but at least one is weak or untested. Fragile oversight tends to look fine until the day it is needed, because the gap only shows under pressure.",
    next: "Find the weakest of the five and make it real rather than nominal. An untested stop and an unmeasured intervention window are the two most common.",
    tone: "gold",
  },
  {
    min: 4,
    verdict: "Oversight risks becoming ceremonial",
    meaning:
      "There is a person in the workflow, and on these answers they may not be able to reach a different conclusion from the system's. The approval records a decision without evidencing a check.",
    next: "Either strengthen the reviewer's position — information, time, independence, authority — or stop relying on human review as the primary control and put the weight on constraints that do not depend on it.",
    tone: "flame",
  },
  {
    min: 0,
    verdict: "Human review alone is not an adequate control",
    meaning:
      "On these answers, the person cannot verify the system in the time available. Keeping an approval step here does not reduce the risk; it mainly documents who was present.",
    next: "Reduce what the system may do without a constraint that holds independently of a person: narrower permissions, enforced limits, reversible actions, smaller blast radius. Then re-test.",
    tone: "grape",
  },
];

export const OVERSIGHT_CAVEAT =
  "This is a thinking tool, not an assessment, a certification or a compliance conclusion. It has no authority and produces no finding. Nothing is sent anywhere — the result is calculated in your browser and disappears when you close the page.";

/* ------------------------------------------------------- implications */

export type Audience = { role: string; point: string; ask: string };

export const IMPLICATIONS: Audience[] = [
  {
    role: "Boards and executives",
    point:
      "The question to ask is not whether AI is being used responsibly. It is which systems act without a person approving each action, and what evidence exists that someone could still stop them.",
    ask: "Ask for the inventory by autonomy level, and for the measured time-to-stop on anything above level 2. If neither exists, that is the finding.",
  },
  {
    role: "Risk teams",
    point:
      "Classification by use case is not enough, because the same model at two autonomy levels carries different risk. Autonomy, capability and reversibility are the axes that matter.",
    ask: "Set the thresholds that move a system to the next governance level before anything reaches them, and write down what happens when one is crossed.",
  },
  {
    role: "Internal audit",
    point:
      "The audit question is whether the controls could have caught the failure, not whether they are documented. For oversight controls that means testing the reviewer's position, not the existence of an approval field.",
    ask: "Test whether reviewers detect seeded errors. If approvals are universal and fast, sample them and ask what information was actually available.",
  },
  {
    role: "Compliance",
    point:
      "Human oversight appears in regulation as a requirement to make oversight effective, not as a requirement to have a person present. Those are different obligations and the gap between them is where the exposure sits.",
    ask: "Map each system's oversight arrangement against what the person can actually do, and keep voluntary framework language out of statements about legal obligation.",
  },
  {
    role: "System owners",
    point:
      "You are accountable for a system whose intermediate decisions you may not be able to inspect. That is workable at level 3 with the right constraints and becomes steadily less workable above it.",
    ask: "Before raising autonomy, produce the evidence that the current level is operating: refusals, escalations, a tested stop, and a reconstructable trail.",
  },
  {
    role: "Developers and delivery teams",
    point:
      "Most of the controls that survive contact with a capable system are architectural. A restriction in a prompt is a request; a restriction in the permission layer is a constraint.",
    ask: "Build the intervention and rollback path before deployment, and measure how long it takes to reach every tool and credential.",
  },
];

/* --------------------------------------------------- what to do now */

export const IMPLEMENT_NOW: { title: string; detail: string }[] = [
  {
    title: "Keep an inventory of AI systems and agents",
    detail:
      "Including the ones nobody registered. An inventory that only contains approved systems measures your approval process, not your exposure.",
  },
  {
    title: "Classify by autonomy, capability and impact",
    detail:
      "Not by department or vendor. Two systems on the same model belong in different classes if one drafts and the other acts.",
  },
  {
    title: "Define permitted objectives, tools, data, transactions and counterparties",
    detail:
      "Specific enough that somebody else could design a test from the definition. 'Used responsibly' is not testable.",
  },
  {
    title: "Set capability and deployment thresholds in advance",
    detail:
      "A threshold defined after it is crossed is a description of events. The value is entirely in setting it early.",
  },
  {
    title: "Require evidence before a system moves up a level",
    detail:
      "Not a business case — evidence that the controls at the current level actually operated: refusals, escalations, a tested stop.",
  },
  {
    title: "Test whether reviewers can detect errors",
    detail:
      "Seed known errors and see whether review catches them. This is the only direct measurement of whether human oversight is a control or a formality.",
  },
  {
    title: "Log objectives, permissions, actions, changes and interventions",
    detail:
      "Enough to reconstruct a consequential decision months later, for someone who does not trust you and was not there.",
  },
  {
    title: "Monitor for capability change and restriction workarounds",
    detail:
      "A model updated beneath a stable version label is a change to your system. So is an agent finding a route around a limit.",
  },
  {
    title: "Separate building, validating and approving",
    detail:
      "Three roles, and the more autonomy involved the less they should be the same person. Independence is a structure, not an attitude.",
  },
  {
    title: "Use independent assurance above level 3",
    detail:
      "At the point where step-level review is impossible, assurance is what is left that is not the system reporting on itself.",
  },
  {
    title: "Design intervention, rollback and shutdown before deployment",
    detail:
      "And exercise them. An untested runbook is a document; the number you want is how long a stop actually takes.",
  },
  {
    title: "Reassess when models, tools, permissions or context change",
    detail:
      "Each of those can move a system across a threshold without anyone deciding to raise its autonomy.",
  },
];

/* ------------------------------------- limits, and what is not solved */

export const NOT_SOLVED: { problem: string; state: string }[] = [
  {
    problem: "Prompt injection",
    state:
      "Unsolved as an architectural matter. Mitigations reduce impact; none of them reliably prevent instructions in fetched content from being followed. Treat containment as the control, not detection.",
  },
  {
    problem: "Interpretability",
    state:
      "An active research field, not a deployed assurance method. Being able to inspect some internal structure is not the same as being able to explain a particular decision to a regulator.",
  },
  {
    problem: "Alignment and specification",
    state:
      "A system pursuing a slightly wrong objective competently is a known failure mode with no general solution. Capability makes the consequences larger, not smaller.",
  },
  {
    problem: "Deceptive or strategically withheld behaviour",
    state:
      "Studied, not resolved. Evaluations that a system can anticipate are weaker evidence than evaluations it cannot, and distinguishing the two is itself unsolved.",
  },
  {
    problem: "Reliable shutdown",
    state:
      "Straightforward in principle and routinely incomplete in practice — delegated agents, cached credentials, queued work, self-contained tokens that stay valid until they expire.",
  },
];

export const OPEN_QUESTIONS: string[] = [
  "Where exactly the oversight threshold sits for a given system, and whether it can be measured rather than argued about.",
  "Whether 'effective oversight' in regulation can be evidenced at all above level 3, or whether it quietly becomes a documentation requirement.",
  "What independent assurance means when the assured system is more capable than the assurer at the task being assured.",
  "How to evidence that intervention remains possible, rather than asserting it from a design document.",
  "Whether autonomy levels are the right axis, or whether reversibility and blast radius predict governance need better.",
];

export const LIMITATIONS = [
  "This is a framework for thinking, built from public sources and my own experience in risk and assurance. It is not a standard, and nothing here has been validated against outcomes.",
  "The five levels are a simplification. Real systems sit between them, move between them, and sometimes occupy two at once depending on which action you look at.",
  "The two curves in the figure are illustrative of the argument. They are not measurements and should not be read as quantities.",
  "Level 5 is a scenario used to stress-test the framework. Its inclusion is not a prediction that such a system exists, is imminent, or is inevitable.",
  "The regulatory position summarised here changes quickly. The date at the top of the page is the date it was last checked, not a guarantee it is still current.",
];

/* ------------------------------------------------------------ sources */

export type SourceKind =
  | "Regulation"
  | "Standard"
  | "Framework"
  | "Supervisory guidance"
  | "Industry commitment"
  /** A published argument. Carries no authority beyond its own reasoning. */
  | "Argument";

export type Source = {
  name: string;
  org: string;
  kind: SourceKind;
  href: string;
  note: string;
};

export const SOURCES: Source[] = [
  {
    name: "AI Risk Management Framework (AI RMF 1.0) and the Generative AI Profile",
    org: "NIST",
    kind: "Framework",
    href: "https://www.nist.gov/itl/ai-risk-management-framework",
    note: "Voluntary. The Govern / Map / Measure / Manage structure is the closest thing to a common vocabulary; the Generative AI Profile adds risks specific to these systems. Not a certification and not binding.",
  },
  {
    name: "ISO/IEC 42001 — AI management systems",
    org: "ISO/IEC",
    kind: "Standard",
    href: "https://www.iso.org/standard/42001",
    note: "Certifiable management-system standard. It governs how an organisation manages AI, which is not the same as evidence that a particular system is safe at a given autonomy level.",
  },
  {
    name: "Guideline E-23 — Model Risk Management",
    org: "OSFI (Canada)",
    kind: "Supervisory guidance",
    href: "https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/guideline-e-23-model-risk-management-2027",
    note: "Final version published 11 September 2025, in force 1 May 2027 for federally regulated financial institutions. Expands model risk management to cover AI and machine learning explicitly, with risk-proportionate lifecycle expectations.",
  },
  {
    name: "Artificial Intelligence Act — Article 14, human oversight",
    org: "European Union",
    kind: "Regulation",
    href: "https://artificialintelligenceact.eu/article/14/",
    note: "Binding. High-risk systems must be designed so that they can be effectively overseen by natural persons while in use. The obligation attaches to effectiveness, not to the presence of a reviewer — which is the distinction this whole framework turns on.",
  },
  {
    name: "Artificial Intelligence Act — general-purpose AI with systemic risk",
    org: "European Union",
    kind: "Regulation",
    href: "https://artificialintelligenceact.eu/high-level-summary/",
    note: "Binding. Providers of GPAI models presenting systemic risk must evaluate, assess and mitigate risk, report serious incidents and maintain cybersecurity. The Act uses a training-compute threshold of 10^25 FLOP as a presumption of systemic risk.",
  },
  {
    name: "AI Security Institute",
    org: "United Kingdom",
    kind: "Framework",
    href: "https://www.aisi.gov.uk/",
    note: "Renamed from the AI Safety Institute in February 2025, with a stated shift towards security-relevant risks. Publishes evaluations and research; it is not a regulator and issues no binding requirements.",
  },
  {
    name: "Center for AI Standards and Innovation (CAISI)",
    org: "NIST / US Department of Commerce",
    kind: "Framework",
    href: "https://www.nist.gov/caisi",
    note: "Renamed from the US AI Safety Institute in June 2025, with a stated focus on demonstrable risks and on standards. Evaluative and standards-setting rather than regulatory.",
  },
  {
    name: "Frontier safety frameworks",
    org: "Frontier AI developers",
    kind: "Industry commitment",
    href: "https://www.gov.uk/government/publications/frontier-ai-safety-commitments-ai-seoul-summit-2024",
    note: "Voluntary commitments made at the 2024 Seoul summit, implemented as published frameworks that define capability thresholds and the safeguards required before crossing them. Self-defined, self-assessed, and the closest existing practice to levels 4 and 5 — which is worth noticing in both directions.",
  },
  {
    name: "If Anyone Builds It, Everyone Dies: Why Superhuman AI Would Kill Us All",
    org: "Eliezer Yudkowsky and Nate Soares (MIRI), September 2025",
    kind: "Argument",
    href: "https://en.wikipedia.org/wiki/If_Anyone_Builds_It,_Everyone_Dies",
    note: "A book, not a standard, and it carries no authority beyond its reasoning. Included because it states the strongest published version of the comprehension problem: that these systems are grown rather than designed, that nobody understands how their internals produce their behaviour, and that this is why a sufficiently capable system would not be controllable. The reasoning is followable and I follow it. Where it ends is a question about machine learning rather than about governance, and the section on the comprehension limit says which of the two I am writing from.",
  },
];

export const METHOD_NOTE =
  "The five levels are mine, built to make one argument testable: that verification capacity falls as autonomy rises, and that governance has to intensify before the two cross. The dimensions borrow their shape from existing risk practice rather than inventing a vocabulary. Where a source is cited it is summarised in my own words and linked, so you can disagree with my reading by going to the original. Voluntary frameworks are labelled as voluntary and binding law as binding, because collapsing the two is the most common error in this area — and the most flattering one, since it makes a governance programme sound more obligatory than it is.";

/* ------------------------------------------------ the comprehension limit */

/**
 * Why verification capacity falls at all.
 *
 * The figure asserts the fall. This section names the mechanism, because the
 * mechanism determines what governance can do about it: a reviewer who lacks
 * time can be given time, and a reviewer who cannot understand the artefact
 * cannot be given comprehension.
 *
 * Two disciplines specific to this section:
 *
 *  1. It engages the strongest published version of the argument rather than
 *     a convenient version, and attributes it accurately — including the
 *     part of the conclusion this framework does not accept, and the fact
 *     that serious reviewers contest that same step.
 *  2. Governability and survivability are kept apart. The claim here is that
 *     human review stops working as a control. That is not a claim about
 *     human extinction, and the second does not follow from the first.
 */
export const COMPREHENSION = {
  heading: "The comprehension limit",

  intro: [
    "The figure earlier says verification capacity falls as autonomy rises. It is worth being exact about why, because the reason decides what governance can do about it.",
    "There are three ordinary reasons a reviewer stops really reviewing. They do not have the time. They do not have the information. They do not have the standing to say no. All three are real, all three are common, and all three are fixable by an organisation that decides to fix them — give the reviewer hours instead of seconds, give them the inputs rather than the conclusion, give them a manager who does not treat a rejection as an obstruction.",
    "There is a fourth reason, and it is not fixable that way. Modern systems are grown rather than written. Their capabilities emerge from training rather than from a specification somebody authored, and nobody can point to the place inside the model where a particular behaviour lives. Interpretability research is making real progress on the general question, and it is not a deployed method for explaining a specific decision to a reviewer, an auditor or a regulator.",
    "So a reviewer can be given unlimited time, complete logs and total independence, and still not be able to answer why the system did that in the way they could for a system somebody wrote. Verification capacity does not fall because reviewers become lazy or overloaded. It falls because the thing being checked stops being the kind of thing a person can check.",
  ],

  /**
   * The second problem. Opacity and alignment are separate difficulties that
   * are routinely merged into one vague worry, which makes both easier to
   * dismiss. Kept apart here, and kept at the level of the established
   * problem statement rather than any particular researcher's prediction.
   */
  alignment: {
    heading: "And a second problem, sitting next to it",
    body: [
      "Opacity is about whether you can see what the system is doing. There is a separate difficulty about whether what it is doing is what you asked for, and the field calls it the alignment problem.",
      "The trouble is specification. You cannot write down everything you mean. Any objective handed to a capable optimiser is a proxy for the intent behind it, and a proxy that holds in the situations you tested can come apart in situations you did not — not through malice, but because it was only ever an approximation of the thing you actually wanted. A system pursuing a slightly wrong objective competently is a known failure mode with no general solution, and capability makes the consequences larger rather than smaller. A weak system pursuing the wrong goal simply fails at it.",
      "The two problems compound, and that is the part worth holding on to. A specification failure inside a system you cannot inspect is one you cannot find by looking for it. You find it when the system acts. Which is the entire case for constraining what a system may reach, rather than trusting that you will notice in time.",
    ],
  },

  /** Stated as the argument's own claim, not as this framework's finding. */
  strongForm: {
    heading: "The strongest version of this argument",
    body: [
      "The most forceful published statement of the problem is Eliezer Yudkowsky and Nate Soares, If Anyone Builds It, Everyone Dies: Why Superhuman AI Would Kill Us All, published in September 2025. Soares is president of the Machine Intelligence Research Institute.",
      "Their mechanism is the one described above, put more sharply: AI systems are grown, not crafted. They emerge from opaque training processes rather than being designed like ordinary software, so nobody understands how the enormous number of internal values interact to produce the behaviour. Soares has made the regulatory case in those terms — that a superintelligent system would not be understandable, would not be predictable, and would not have human interests at heart.",
      "From there they argue that a system built with anything close to current techniques, and substantially more capable than the people who built it, would not be controllable, and that the default outcome is severe enough to threaten human survival. Self-improvement compounds it: a system that can improve its own capability changes the thing being verified faster than a verification cycle can complete.",
    ],
  },

  follow: {
    heading: "Why the argument follows",
    body: [
      "I can follow it, and I think anyone working in governance should be able to. It is not a mystical claim about machines waking up. It is three ordinary observations placed in order.",
      "One: we do not write these systems, we train them, and nobody can point to where a particular behaviour lives inside the result. Two: we cannot fully specify what we want, so any objective we set is a proxy for the intent behind it, and a proxy that holds in the cases we tested can come apart in cases we did not. Three: a system that can improve its own capability changes faster than any verification cycle can complete.",
      "Each step is separately unremarkable, and each is the ordinary understanding of how the technology works rather than a contested one. Put in sequence, they describe something that gets harder to check exactly as it gets more consequential. That is the shape of the argument, and the shape is sound.",
    ],
  },

  position: {
    heading: "Where I put my work",
    body: [
      "Where the argument ends — whether this leads somewhere catastrophic, and on what timescale — is a question about how capability scales and how systems behave at levels nobody has built. I am not a machine learning researcher, and I am not going to pretend I can settle that from a governance background.",
      "What I can say is that the question does not need to be settled for the problem on this page to be real. It does not wait for superintelligence. It is already visible at level 4, in systems nobody claims are superhuman, and the response is the same whichever way the larger argument resolves.",
      "So that is the layer I work in: the distance between what these systems can already do and what our existing controls can actually establish. Whether the endpoint is the one Soares describes is not mine to adjudicate. Whether human review is doing real work in a system running right now is, and unlike the first question, it is answerable this quarter.",
    ],
  },

  consequence: {
    heading: "What it does to the governance model",
    body: [
      "If verification fails because the artefact is opaque, then more oversight cannot repair it. You cannot resource your way past a comprehension limit. This is the practical consequence of the whole framework, and it reverses what most AI governance programmes are built to do.",
      "Below the threshold, governance makes review work: better information, more time, genuine independence, real authority to refuse. Those are the right investments and they pay off.",
      "Above it, governance has to stop leaning on review at all and constrain what the system is permitted to become and to reach. Permissions enforced outside the model rather than requested of it. Actions that are reversible by construction. A blast radius small enough that being wrong is survivable. Capability thresholds that gate deployment before the fact instead of review that audits it afterwards.",
      "The self-improvement point does the same thing to the rest of the toolkit, and it is the part governance people underrate. Every assurance method available — testing, validation, independent review, certification — assumes the object holds still long enough to be assessed. A system that meaningfully improves its own capability breaks that assumption, and nothing in existing model risk practice is built for it. That is a gap in method, not a failure of diligence, and pretending otherwise is how an assurance programme ends up certifying a snapshot of something that has already moved.",
      "And at level 5 as described, the unit of governance stops being the organisation. If no reviewer inside a company can verify the system, an internal control framework is not the relevant instrument, and the questions become who may build such a thing, under what external verification, and with what ability to stop. That is not a prediction that level 5 exists or is close. It is what the framework would require if it did — which is the entire reason to include a level nobody has built.",
    ],
  },

  /** The one-line version, for the page's summary rail. */
  pullQuote:
    "You cannot resource your way past a comprehension limit. Above the threshold, governance has to constrain what the system may become rather than review what it did.",
} as const;
