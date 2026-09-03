import { NextResponse } from "next/server";
import { createToken } from "@/lib/confirm-token";
import { button, emailShell, sendEmail } from "@/lib/brevo";

/*
  Newsletter signup, step one of two.

    visitor submits  ->  here: send a confirmation email carrying a signed link
                     ->  /api/confirm: verify it, add to the list, redirect

  Nothing is stored until they click. That click is the express consent CASL
  expects, and it keeps the guide away from typo'd and hostile addresses.

  This deliberately does NOT use Brevo's double opt-in endpoint, which requires
  a template registered as a DOI template. We send the confirmation ourselves
  through the plain transactional endpoint and own the whole flow.

  Environment (Vercel -> Settings -> Environment Variables):
    BREVO_API_KEY          v3 API key; also derives the token signing key
    BREVO_LIST_ID          list id for this site
    CONFIRM_REDIRECT_URL   https://mubienahsan.com/thank-you
*/

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const runtime = "nodejs";

const ok = () => NextResponse.json({ success: true });
const fail = (error: string, status: number) =>
  NextResponse.json({ success: false, error }, { status });

function confirmationEmail(confirmUrl: string) {
  // No unsubscribe footer: nobody is subscribed yet, and this is the message
  // asking whether they want to be.
  return emailShell(
    `<h1 style="margin:0 0 16px;font-size:24px;line-height:1.3;color:#241a10;">One click and it&rsquo;s yours</h1>
     <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#6f6350;">
       Thanks for asking for <strong style="color:#241a10;">The First Build</strong>. Confirm your email and I&rsquo;ll send it straight over.
     </p>
     ${button(confirmUrl, "Confirm my email")}
     <p style="margin:0 0 8px;font-size:14px;line-height:1.6;color:#6f6350;">
       If you didn&rsquo;t request this, just ignore it — nothing happens without that click, and this link expires in 48 hours.
     </p>
     <p style="margin:20px 0 0;font-size:14px;color:#6f6350;">— Mubien</p>`,
    { unsubscribe: false }
  );
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return fail("Invalid request.", 400);
  }

  // Bots fill the hidden field; people never see it. Return the success shape
  // without doing work — telling a bot it failed just invites a retry.
  if (typeof payload.website === "string" && payload.website.length > 0) return ok();

  const email = String(payload.email ?? "").trim().toLowerCase();
  const source = String(payload.source ?? "unknown").slice(0, 40);
  if (!EMAIL_RE.test(email)) return fail("Please enter a valid email address.", 400);

  const apiKey = process.env.BREVO_API_KEY;
  const redirectBase = process.env.CONFIRM_REDIRECT_URL;
  if (!apiKey || !redirectBase || !process.env.BREVO_LIST_ID) {
    console.error("subscribe: missing required environment variables");
    return fail("Signup is temporarily unavailable.", 500);
  }

  const token = createToken(email, source, apiKey);
  const confirmUrl = `${new URL(redirectBase).origin}/api/confirm?token=${encodeURIComponent(token)}`;

  const sent = await sendEmail(
    {
      to: email,
      subject: "Confirm your email — The First Build",
      html: confirmationEmail(confirmUrl),
    },
    apiKey
  );

  if (sent.ok) return ok();

  console.error("subscribe: brevo rejected request", sent.status, sent.detail);

  // 401/403 means our credentials or account settings are wrong — nothing the
  // visitor did, and nothing a retry fixes.
  if (sent.status === 401 || sent.status === 403) {
    return fail("Signup is temporarily unavailable.", 503);
  }
  if (!sent.status) return fail("Something went wrong. Please try again.", 500);
  return fail("We could not sign you up. Please try again.", 400);
}
