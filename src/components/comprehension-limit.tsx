import { COMPREHENSION } from "@/content/autonomy";
import { Pill } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { TwoProblems } from "@/components/two-problems";

/**
 * The comprehension limit — why verification capacity falls.
 *
 * Two problems, then the strongest published statement of where they lead,
 * then the author's own position, then the consequence for governance.
 *
 * The two-column pair at the centre is the point of the design, and what it
 * contrasts matters. It is not agreement against disagreement: it is the
 * argument's reasoning, which is followable and set out as such, against the
 * question of who is placed to adjudicate where that reasoning ends. Both
 * columns are toned as territory rather than as verdict — no red-versus-green
 * — because the position here is that the argument holds up and that its
 * endpoint is somebody else's field, which a right-and-wrong palette would
 * misrepresent at a glance before anyone read a word.
 */
export function ComprehensionLimit() {
  const { intro, alignment, strongForm, follow, position, consequence, pullQuote } =
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

      <div className="mt-4 space-y-5 prose-scale text-[1.05rem] leading-8 text-ink/85">
        {intro.map((para) => (
          <Reveal key={para.slice(0, 32)}>
            <p>{para}</p>
          </Reveal>
        ))}
      </div>

      {/* The second problem, given its own weight rather than a clause. */}
      <Reveal>
        <div className="mt-8">
          <h3 className="font-display text-xl text-ink">{alignment.heading}</h3>
          <div className="mt-3 space-y-5 prose-scale text-[1.05rem] leading-8 text-ink/85">
            {alignment.body.map((para) => (
              <p key={para.slice(0, 32)}>{para}</p>
            ))}
          </div>
        </div>
      </Reveal>

      {/* The compounding, which is the claim the prose works hardest for. */}
      <Reveal>
        <TwoProblems />
      </Reveal>

      {/* The claim, attributed and kept at arm's length. */}
      <Reveal>
        <div className="mt-8 rounded-2xl border border-line bg-surface p-6 sm:p-7">
          <div className="flex flex-wrap items-center gap-3">
            <Pill tone="grape">Argument, not a standard</Pill>
            <h3 className="font-display text-xl text-ink">
              {strongForm.heading}
            </h3>
          </div>
          <div className="prose-scale-sm mt-4 space-y-4 leading-relaxed text-ink/85">
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
          <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6">
            <h3 className="font-display text-lg text-ink">{follow.heading}</h3>
            <div className="mt-3 space-y-3 text-[0.97rem] leading-relaxed text-ink/85">
              {follow.body.map((para) => (
                <p key={para.slice(0, 32)}>{para}</p>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal>
          <div className="flex h-full flex-col rounded-2xl border border-grape/40 bg-grape-soft/40 p-6">
            <h3 className="font-display text-lg text-ink">{position.heading}</h3>
            <div className="mt-3 space-y-3 text-[0.97rem] leading-relaxed text-ink/85">
              {position.body.map((para) => (
                <p key={para.slice(0, 32)}>{para}</p>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* The consequence, which is the part that changes what anyone does. */}
      <Reveal>
        <div className="mt-8">
          <h3 className="font-display text-xl text-ink">
            {consequence.heading}
          </h3>
          <div className="mt-3 space-y-5 prose-scale text-[1.05rem] leading-8 text-ink/85">
            {consequence.body.map((para) => (
              <p key={para.slice(0, 32)}>{para}</p>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal>
        <blockquote className="mt-8 border-l-2 border-accent pl-5 font-display text-lg leading-relaxed text-ink sm:text-xl">
          {pullQuote}
        </blockquote>
      </Reveal>
    </section>
  );
}
