import { NextResponse } from "next/server";
import { createToken } from "@/lib/confirm-token";

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

const BREVO_SMTP_ENDPOINT = "https://api.brevo.com/v3/smtp/email";
const SENDER = { name: "Mubien Ahsan", email: "hello@mubienahsan.com" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const runtime = "nodejs";

const ok = () => NextResponse.json({ success: true });
const fail = (error: string, status: number) =>
  NextResponse.json({ success: false, error }, { status });

function confirmationEmail(confirmUrl: string) {
  // Inline styles and a table: email clients strip <style> blocks and have no
  // flexbox. Deliberately plain — a confirmation that looks like marketing gets
  // ignored, and the only thing that matters here is the button.
  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#f9f1e4;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f9f1e4;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#fffdf7;border:1px solid #eaddc6;border-radius:16px;padding:36px 32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#241a10;">
        <tr><td>
          <h1 style="margin:0 0 16px;font-size:24px;line-height:1.3;color:#241a10;">One click and it&rsquo;s yours</h1>
          <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#6f6350;">
            Thanks for asking for <strong style="color:#241a10;">The First Build</strong>. Confirm your email and I&rsquo;ll send it straight over.
          </p>
          <p style="margin:0 0 24px;">
            <a href="${confirmUrl}" style="display:inline-block;background:#ee6a3a;color:#ffffff;text-decoration:none;font-weight:600;font-size:16px;padding:14px 28px;border-radius:999px;">Confirm my email</a>
          </p>
          <p style="margin:0 0 8px;font-size:14px;line-height:1.6;color:#6f6350;">
            If you didn&rsquo;t request this, just ignore it — nothing happens without that click, and this link expires in 48 hours.
          </p>
          <p style="margin:20px 0 0;font-size:14px;color:#6f6350;">— Mubien</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
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

  try {
    const response = await fetch(BREVO_SMTP_ENDPOINT, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: SENDER,
        to: [{ email }],
        subject: "Confirm your email — The First Build",
        htmlContent: confirmationEmail(confirmUrl),
      }),
    });

    if (response.ok) return ok();

    const data = await response.json().catch(() => ({}));
    console.error("subscribe: brevo rejected request", response.status, data);

    // 401/403 means our credentials or account settings are wrong — nothing the
    // visitor did, and nothing a retry fixes.
    if (response.status === 401 || response.status === 403) {
      return fail("Signup is temporarily unavailable.", 503);
    }
    return fail("We could not sign you up. Please try again.", 400);
  } catch (error) {
    console.error("subscribe: request failed", error);
    return fail("Something went wrong. Please try again.", 500);
  }
}
