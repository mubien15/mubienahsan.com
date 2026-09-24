import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { PageIntro } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { SOCIAL_LINKS } from "@/lib/nav";

export const metadata: Metadata = pageMetadata("/legal", {
  title: "Privacy, Sales Terms & Disclaimer",
  description:
    "How this site handles newsletter and purchase information, the terms for digital products, which privacy laws may apply, and the limits of the material published here.",
});

const UPDATED = "24 September 2026";
const EMAIL = "hello@mubienahsan.com";

/** Small helper so every section on this page looks the same. */
function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <Reveal>
        <h2 className="font-display pt-4 text-2xl text-ink">{title}</h2>
      </Reveal>
      <Reveal>
        <div className="mt-3 space-y-4">{children}</div>
      </Reveal>
    </section>
  );
}

export default function LegalPage() {
  return (
    <Container className="py-16 sm:py-20">
      <PageIntro
        eyebrow="The small print"
        title="Privacy, sales terms & disclaimer."
        tone="accent"
      >
        Written in plain language, because a policy nobody can read is not
        transparency. Reading remains private. If you request the newsletter or
        buy a digital product, the information needed to deliver that service is
        handled as described below.
      </PageIntro>

      <div className="mt-14 space-y-6 prose-scale text-[1.05rem] leading-8 text-ink/85">
        <Reveal>
          <p className="text-sm text-muted">
            Last updated {UPDATED}. This site is run by me, Mubien, as an
            individual, from Toronto, Ontario, Canada. You can reach me at{" "}
            <a
              href={`mailto:${EMAIL}`}
              className="font-medium text-accent underline decoration-accent/30 hover:decoration-accent"
            >
              {EMAIL}
            </a>
            .
          </p>
        </Reveal>

        <Section id="views" title="Views are my own">
          <p>
            This is my personal website. The opinions, projects, and writing here are my own and do not represent any organisation.
          </p>
          <p>
            I draw on public sources and my own personal experiments. This site contains no confidential organisational material.
          </p>
        </Section>

        <Section id="advice" title="This is not professional advice">
          <p>
            The courses, projects, writing, and digital products here are educational and operational planning materials. They are not
            legal, regulatory, compliance, audit, financial or investment
            advice, and they do not create any professional relationship between
            us.
          </p>
          <p>
            Some of what I write touches on governance and regulatory
            frameworks. Those frameworks change, they differ by jurisdiction,
            and your situation is not mine. If you are
            making a decision that carries real consequences, talk to someone
            qualified who knows your circumstances.
          </p>
        </Section>

        <Section id="technical" title="Following the technical content">
          <p>
            My courses ask you to install software, run commands and publish
            things to the internet. I have tested what I describe, but I cannot
            test it on your machine, your account or your network, and tools
            change after I write about them.
          </p>
          <p>
            Read what you are about to run before you run it. That is genuinely
            good practice rather than a formality, and it is a habit I teach in
            the courses themselves. Everything here is offered as is, with no
            warranty, and you are responsible for what you choose to do on your
            own systems and accounts.
          </p>
        </Section>

        <Section id="collect" title="What this site collects">
          <p>
            <strong className="text-ink">
              I do not add analytics, advertising trackers, or profiling to ordinary reading.
            </strong>{" "}
            The exceptions are the newsletter and a purchase you choose to make,
            both covered below. To be specific:
          </p>
          <ul className="my-4 list-disc space-y-2 pl-6 marker:text-accent">
            <li>No analytics of any kind, and no tracking pixels</li>
            <li>
              No cookies. The one thing kept in your browser is a note that you
              have already seen the newsletter box, so it does not ask you
              twice. It stays on your device and is never sent anywhere
            </li>
            <li>
              One form on this site, for the newsletter. Nothing is sent anywhere unless you
              type your address and submit it
            </li>
            <li>No advertising and no sale of personal information</li>
            <li>
              No third party requests while you read ordinary pages. Fonts are served from this
              site rather than loaded from Google. Choosing the purchase button takes
              you to Stripe, under the purchase terms below
            </li>
          </ul>
          <p>
            There is no consent banner here because there is nothing to consent
            to. If that ever changes, so will this page.
          </p>
        </Section>

        <Section id="hosting" title="Hosting, server logs and where they live">
          <p>
            This site is hosted by Vercel. Like every web host, their servers
            record standard technical information when a page is requested,
            which typically includes your IP address, the page you asked for,
            the time, and your browser type. That happens for delivery,
            security, and to keep the site running, and it is the only personal
            information involved in an ordinary visit. I do not use it to build
            a profile of you and I do not combine it with anything else.
          </p>
          <p>
            <strong className="text-ink">Where that data sits matters</strong>,
            so I will be specific. Vercel serves this site from a global
            network, and requests from Canada are usually handled close by, but
            Vercel is a company based in the United States and technical log
            data may be stored or processed outside Canada. While it is outside
            the country it is subject to the laws of wherever it sits, which can
            include lawful access by foreign courts and government agencies.
            That is true of most of the web, and I would rather say it than
            leave you to assume otherwise.
          </p>
        </Section>

        <Section id="email" title="If you email me">
          <p>
            My email address is published on this page and on the{" "}
            <Link
              href="/about"
              className="font-medium text-accent underline decoration-accent/30 hover:decoration-accent"
            >
              About page
            </Link>
            . If you write to me, I will have whatever you send: your address,
            your name if you give it, and the content of your message. I use it
            to reply to you and for nothing else. Writing to me will never put
            you on the newsletter — that only happens if you sign up and
            confirm it yourself — and I will not pass your message on.
          </p>
          <p>
            Email is not a secure channel. Please do not send me anything
            confidential, and particularly not anything belonging to your
            organisation or anyone whose information you are responsible for.
          </p>
        </Section>

        <Section id="mail" title="The newsletter">
          <p>
            There is now a newsletter. You are only on it if you asked to be,
            twice: once by entering your address, and once by clicking the
            confirmation link I email you. Until you click that link nothing is
            stored, which is what Canada&apos;s anti spam legislation means by
            express consent.
          </p>
          <p>
            All I hold is your email address, which signup placement you used,
            and the date you confirmed. No name, and nothing I have inferred
            about you.
          </p>
          <p>
            The list runs on{" "}
            <a
              href="https://www.brevo.com/legal/privacypolicy/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent underline decoration-accent/30 hover:decoration-accent"
            >
              Brevo
            </a>
            , a French company, so your address sits on their servers under the
            GDPR and they process it only on my instructions.
          </p>
          <p>
            Every newsletter email after confirmation carries a working
            unsubscribe link, and unsubscribing is immediate. If you would
            rather be deleted outright than merely unsubscribed, email me and I
            will remove you. I will not import addresses from people who emailed
            me, and I will not pass the list to anyone.
          </p>
        </Section>

        <Section id="purchases" title="Buying a digital product">
          <p>
            The AI Product Launch Execution Kit is a one-time digital purchase priced in Canadian
            dollars. The purchase button opens a Stripe-hosted checkout. Stripe collects the email,
            payment method, billing information, IP address, and technical details needed to process
            the payment, prevent fraud, provide receipts, and meet its legal obligations. I receive
            the transaction record and customer email needed to support the purchase. I do not see
            or store your full card number.
          </p>
          <p>
            Stripe handles that information under its{" "}
            <a
              href="https://stripe.com/ca/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent underline decoration-accent/30 hover:decoration-accent"
            >
              privacy policy
            </a>
            . After successful payment, Stripe confirms the purchase to this site and I use the
            checkout email only to send a signed, time-limited download link. No site account is
            created and the payment does not add you to the newsletter.
          </p>
          <p>
            Digital access is provided by email shortly after payment, so purchases are generally
            final once access is delivered. If you were charged twice, a file is broken, the email
            does not arrive, or the product is materially different from its description, email me
            at {EMAIL} and I will make it right. Nothing here limits a consumer right that cannot be
            excluded under applicable law.
          </p>
          <p>
            The included single-purchaser licence allows your own work and internal work within one
            organisation. It does not permit public sharing, resale, sublicensing, or distribution of
            the reusable source files. The complete licence is included with the download.
          </p>
        </Section>

        <Section id="law" title="Which privacy laws apply">
          <p>
            I am in Ontario, Canada, so the relevant federal law is the{" "}
            <strong className="text-ink">
              Personal Information Protection and Electronic Documents Act
            </strong>{" "}
            (PIPEDA). PIPEDA governs how organisations handle personal
            information in the course of commercial activity. Because this site
            sells a digital product, I treat purchase-related personal information
            as commercial activity and apply the accountability, purpose,
            consent, safeguarding, access, and retention principles relevant to it.
            Ontario has no separate private-sector privacy law of general application.
          </p>
          <p>
            I have written this policy to the PIPEDA standard regardless.
            The practical commitment is simple: collect only what is needed for
            delivery, payment records, support, fraud prevention, and legal duties;
            protect it; and do not reuse purchase data for marketing without consent.
          </p>
          <p>
            Readers elsewhere are welcome and their law travels with them. If
            you are in the United Kingdom or the European Union, the UK GDPR and
            the GDPR give you rights over your personal information regardless
            of where I am. If you are in Quebec, British Columbia or Alberta,
            those provinces have their own private sector privacy statutes. In
            each case, email me to exercise a right and I will respond based on
            the law and the information actually held by me or my service providers.
          </p>
        </Section>

        <Section id="rights" title="Your rights, and how to complain">
          <p>
            You have the right to ask what personal information I hold about
            you, to have it corrected, to have it deleted, and to object to how
            it is used. To do any of that, or to have our correspondence
            deleted, email me and ask. I will not charge you and I will not make
            it difficult.
          </p>
          <p>
            If you are not happy with how I have handled something, you can
            complain to a regulator. In Canada that is the{" "}
            <a
              href="https://www.priv.gc.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent underline decoration-accent/30 hover:decoration-accent"
            >
              Office of the Privacy Commissioner of Canada
            </a>
            . In the UK it is the Information Commissioner&apos;s Office, and in
            the EU it is your national data protection authority.
          </p>
        </Section>

        <Section id="children" title="Children">
          <p>
            This site is written for adults and is not directed at children. I
            do not knowingly collect information about anyone, which includes
            children.
          </p>
        </Section>

        <Section id="links" title="Links to other places">
          <p>
            This site links out to other people&apos;s work: courses, essays,
            tools, and my own projects on other domains. Once you follow a link
            you are on someone else&apos;s site, under their terms and their
            privacy practices, not mine. A link is a recommendation to read
            something, not an endorsement of how that site handles your data.
          </p>
          <p>
            The same goes for my profiles on{" "}
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent underline decoration-accent/30 hover:decoration-accent"
            >
              LinkedIn
            </a>{" "}
            and{" "}
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent underline decoration-accent/30 hover:decoration-accent"
            >
              Instagram
            </a>
            , which are run by those companies under their own rules.
          </p>
        </Section>

        <Section id="changes" title="Changes to this page">
          <p>
            If I add anything that changes the answers here, such as a
            community or analytics, I will update this page and change the date
            at the top before it goes live rather than after.
            Until then, what is written above is what happens.
          </p>
        </Section>
      </div>
    </Container>
  );
}
