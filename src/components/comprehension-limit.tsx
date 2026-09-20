import { COMPREHENSION } from "@/content/autonomy";
import { Pill } from "@/components/ui";
import { Reveal } from "@/components/motion";

/**
 * The comprehension limit — why verification capacity falls.
 *
 * Laid out as an argument being had rather than a conclusion being
 * announced: the mechanism, then the strongest published version of it set
 * apart as somebody else's claim, then what I accept and what I do not in
 * two columns side by side, then the consequence for governance.
 *
 * The two-column agree/depart pair is the point of the section's design.
 * Putting them adjacent makes it structurally hard to read this as either an
 * endorsement or a dismissal, which is the failure mode in both directions
 * when a governance page touches existential-risk material.
 */
export function ComprehensionLimit() {
  const { intro, strongForm, agree, depart, consequence, pullQuote } =
    COMPREHENSION;

  return (
    <section className="mt-16">
      <Reveal>
        <h2
          id="comprehension"
          className="font-display scroll-mt-24 text-2xl text-ink sm:text-3xl"
        >
          {COMPREHENSION.heading}
        </h2>
      </Reveal>

      <div className="mt-4 max-w-2xl space-y-5 text-[1.05rem] leading-8 text-ink/85">
        {intro.map((para) => (
          <Reveal key={para.slice(0, 32)}>
            <p>{para}</p>
          </Reveal>
        ))}
      </div>

      {/* The claim, attributed and kept at arm's length. */}
      <Reveal>
        <div className="mt-8 rounded-2xl border border-line bg-surface p-6 sm:p-7">
          <div className="flex flex-wrap items-center gap-3">
            <Pill tone="grape">Argument, not a standard</Pill>
            <h3 className="font-display text-xl text-ink">
              {strongForm.heading}
            </h3>
          </div>
          <div className="mt-4 space-y-4 leading-relaxed text-ink/85">
            {strongForm.body.map((para) => (
              <p key={para.slice(0, 32)}>{para}</p>
            ))}
          </div>
          <p className="mt-4 border-t border-line pt-3 text-sm leading-relaxed text-muted">
            Summarised in my own words from the book and its authors&rsquo;
            public statements of it, and linked in the sources below so you can
            check my reading against the original. It is included because it is
            the clearest statement of the mechanism, not because a book carries
            any authority that a regulation does.
          </p>
        </div>
      </Reveal>

      {/* Accepted and not accepted, adjacent and equally weighted. */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Reveal>
          <div className="flex h-full flex-col rounded-2xl border border-mint/40 bg-mint-soft/40 p-6">
            <h3 className="font-display text-lg text-ink">{agree.heading}</h3>
            <div className="mt-3 space-y-3 text-[0.97rem] leading-relaxed text-ink/85">
              {agree.body.map((para) => (
                <p key={para.slice(0, 32)}>{para}</p>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal>
          <div className="flex h-full flex-col rounded-2xl border border-flame/40 bg-flame-soft/40 p-6">
            <h3 className="font-display text-lg text-ink">{depart.heading}</h3>
            <div className="mt-3 space-y-3 text-[0.97rem] leading-relaxed text-ink/85">
              {depart.body.map((para) => (
                <p key={para.slice(0, 32)}>{para}</p>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* The consequence, which is the part that changes what anyone does. */}
      <Reveal>
        <div className="mt-8 max-w-2xl">
          <h3 className="font-display text-xl text-ink">
            {consequence.heading}
          </h3>
          <div className="mt-3 space-y-5 text-[1.05rem] leading-8 text-ink/85">
            {consequence.body.map((para) => (
              <p key={para.slice(0, 32)}>{para}</p>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal>
        <blockquote className="mt-8 max-w-2xl border-l-2 border-accent pl-5 font-display text-lg leading-relaxed text-ink sm:text-xl">
          {pullQuote}
        </blockquote>
      </Reveal>
    </section>
  );
}
