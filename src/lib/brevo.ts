/*
  One place that talks to Brevo's transactional email endpoint, shared by the
  confirmation and welcome emails so the sender identity and error handling
  cannot drift apart between them.
*/

const BREVO_SMTP_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

export const SENDER = { name: "Mubien Ahsan", email: "hello@mubienahsan.com" };

/*
  A one-click unsubscribe address, used both in the footer and in the
  List-Unsubscribe header. Gmail and Outlook read that header to render their
  own unsubscribe button, and its presence is one of the few deliverability
  levers available to a brand new sending domain — its absence looks like a
  sender who does not expect people to leave.
*/
export const UNSUBSCRIBE_MAILTO = `${SENDER.email}?subject=unsubscribe`;
export const LIST_UNSUBSCRIBE_HEADERS = {
  "List-Unsubscribe": `<mailto:${UNSUBSCRIBE_MAILTO}>`,
};

export type SendResult =
  | { ok: true }
  | { ok: false; status?: number; detail?: unknown };

export async function sendEmail(
  {
    to,
    subject,
    html,
    headers,
  }: {
    to: string;
    subject: string;
    html: string;
    /** Extra SMTP headers, e.g. List-Unsubscribe. */
    headers?: Record<string, string>;
  },
  apiKey: string
): Promise<SendResult> {
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
        to: [{ email: to }],
        subject,
        htmlContent: html,
        ...(headers ? { headers } : {}),
      }),
    });
    if (response.ok) return { ok: true };
    const detail = await response.json().catch(() => ({}));
    return { ok: false, status: response.status, detail };
  } catch (error) {
    return { ok: false, detail: error };
  }
}

/*
  Shared shell for both emails. Table layout and inline styles throughout: mail
  clients strip <style> blocks and have no flexbox.

  The footer carries what CASL requires of a commercial message — who it is
  from, and a working way to opt out. A physical mailing address is also
  required; set MAILING_ADDRESS and it appears here.
*/
export function emailShell(body: string, { unsubscribe = true } = {}): string {
  const address = process.env.MAILING_ADDRESS?.trim();
  const footer = unsubscribe
    ? `<p style="margin:28px 0 0;padding-top:20px;border-top:1px solid #eaddc6;font-size:13px;line-height:1.6;color:#8a827a;">
         You are getting this because you asked for The First Build at mubienahsan.com.
         Don&rsquo;t want these? <a href="mailto:${UNSUBSCRIBE_MAILTO}" style="color:#8a827a;">Unsubscribe here</a> and I&rsquo;ll take you off straight away.
         ${address ? `<br>Mubien Ahsan, ${address}` : ""}
       </p>`
    : "";

  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#f9f1e4;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f9f1e4;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#fffdf7;border:1px solid #eaddc6;border-radius:16px;padding:36px 32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#241a10;">
        <tr><td>${body}${footer}</td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

export function button(href: string, label: string): string {
  return `<p style="margin:0 0 24px;">
    <a href="${href}" style="display:inline-block;background:#ee6a3a;color:#ffffff;text-decoration:none;font-weight:600;font-size:16px;padding:14px 28px;border-radius:999px;">${label}</a>
  </p>`;
}
