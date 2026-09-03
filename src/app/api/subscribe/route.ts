import { NextResponse } from "next/server";

/*
  Newsletter signup — double opt-in via Brevo.

    visitor submits  ->  Brevo sends a confirmation email
                     ->  visitor clicks confirm
                     ->  Brevo adds them to the list and redirects to /thank-you

  The contact is NOT added until they confirm. That click is the consent record
  CASL expects, and it keeps The First Build away from typo'd and hostile
  addresses. It costs a few raw signups and buys a list that actually opens.

  Environment variables (Vercel -> Settings -> Environment Variables):
    BREVO_API_KEY          v3 API key
    BREVO_LIST_ID          list id for this site (NOT Fable's list 3)
    BREVO_DOI_TEMPLATE_ID  id of the double opt-in template in Brevo
    CONFIRM_REDIRECT_URL   https://mubienahsan.com/thank-you
*/

const BREVO_DOI_ENDPOINT =
  "https://api.brevo.com/v3/contacts/doubleOptinConfirmation";

// Structural rather than clever: catches empty and misshapen input without
// rejecting the many legitimately odd addresses a stricter pattern eats.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const ok = () => NextResponse.json({ success: true });
const fail = (error: string, status: number) =>
  NextResponse.json({ success: false, error }, { status });

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return fail("Invalid request.", 400);
  }

  // Bots fill the hidden field; people never see it. Return the success shape
  // without doing any work — telling a bot it failed just invites a retry with
  // the field cleared.
  if (typeof payload.website === "string" && payload.website.length > 0) {
    return ok();
  }

  const email = String(payload.email ?? "").trim().toLowerCase();
  const source = String(payload.source ?? "unknown").slice(0, 40);

  if (!EMAIL_RE.test(email)) {
    return fail("Please enter a valid email address.", 400);
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_LIST_ID;
  const templateId = process.env.BREVO_DOI_TEMPLATE_ID;
  const redirectionUrl = process.env.CONFIRM_REDIRECT_URL;

  if (!apiKey || !listId || !templateId || !redirectionUrl) {
    // Misconfiguration is ours, not the visitor's: log it loudly, stay vague.
    console.error("subscribe: missing required environment variables");
    return fail("Signup is temporarily unavailable.", 500);
  }

  try {
    const response = await fetch(BREVO_DOI_ENDPOINT, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email,
        includeListIds: [Number(listId)],
        templateId: Number(templateId),
        redirectionUrl,
        attributes: { SIGNUP_SOURCE: source },
      }),
    });

    if (response.status === 201 || response.status === 204) return ok();

    const data = await response.json().catch(() => ({}));

    // Already subscribed. Say exactly what we say to everyone else — never
    // confirm or deny list membership to an anonymous caller.
    if (data?.code === "duplicate_parameter") return ok();

    console.error("subscribe: brevo rejected request", response.status, data);

    // 401/403 means our credentials or account settings are wrong — a bad or
    // expired key, or Brevo's IP allowlist blocking Vercel's rotating serverless
    // addresses. Nothing the visitor did, and nothing retrying will fix, so say
    // what the missing-config path says rather than implying their address was
    // the problem.
    if (response.status === 401 || response.status === 403) {
      return fail("Signup is temporarily unavailable.", 503);
    }

    return fail("We could not sign you up. Please try again.", 400);
  } catch (error) {
    console.error("subscribe: request failed", error);
    return fail("Something went wrong. Please try again.", 500);
  }
}
