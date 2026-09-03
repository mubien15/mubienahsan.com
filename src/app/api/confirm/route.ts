import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/confirm-token";
import { LIST_UNSUBSCRIBE_HEADERS, button, emailShell, sendEmail } from "@/lib/brevo";

/*
  Newsletter signup, step two: the link in the confirmation email lands here.

  Verifying the signature proves the address in the token is the one that asked
  to subscribe, so this is the point where consent exists and the contact is
  created. Everything before this stored nothing.
*/

const BREVO_CONTACTS_ENDPOINT = "https://api.brevo.com/v3/contacts";

export const runtime = "nodejs";

function welcomeEmail(guideUrl: string) {
  return emailShell(
    `<h1 style="margin:0 0 16px;font-size:24px;line-height:1.3;color:#241a10;">Here&rsquo;s The First Build</h1>
     <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#6f6350;">
       Thanks for confirming. Here is the guide — keep this email and you will always have it.
     </p>
     ${button(guideUrl, "Download the guide")}
     <p style="margin:0 0 8px;font-size:15px;line-height:1.6;color:#6f6350;">
       It is the whole build: the actual instructions I use, every decision behind them, and the parts I got wrong. No code, and you can have it running by the end of an evening.
     </p>
     <p style="margin:16px 0 0;font-size:15px;line-height:1.6;color:#6f6350;">
       If you get stuck, reply to this email — it comes straight to me.
     </p>
     <p style="margin:20px 0 0;font-size:14px;color:#6f6350;">— Mubien</p>`
  );
}

function landing(base: string, status: string) {
  const url = new URL(base);
  if (status !== "ok") url.searchParams.set("status", status);
  return NextResponse.redirect(url, { status: 303 });
}

export async function GET(request: Request) {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_LIST_ID;
  const redirectBase = process.env.CONFIRM_REDIRECT_URL;

  if (!apiKey || !listId || !redirectBase) {
    console.error("confirm: missing required environment variables");
    return new NextResponse("Confirmation is temporarily unavailable.", { status: 500 });
  }

  const token = new URL(request.url).searchParams.get("token") ?? "";
  const result = verifyToken(token, apiKey);

  if (!result.ok) {
    console.error("confirm: token rejected", result.reason);
    return landing(redirectBase, result.reason === "expired" ? "expired" : "invalid");
  }

  const body: Record<string, unknown> = {
    email: result.email,
    listIds: [Number(listId)],
    updateEnabled: true,
    attributes: { SIGNUP_SOURCE: result.source },
  };

  try {
    let response = await fetch(BREVO_CONTACTS_ENDPOINT, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(body),
    });

    // SIGNUP_SOURCE only exists if it was created under Brevo's contact
    // attributes. It is a nice-to-have for seeing which placement works, and
    // must never cost a confirmed subscriber, so retry once without it.
    if (response.status === 400) {
      const data = await response.clone().json().catch(() => ({}));
      if (JSON.stringify(data).toLowerCase().includes("attribute")) {
        console.warn("confirm: retrying without SIGNUP_SOURCE", data);
        delete body.attributes;
        response = await fetch(BREVO_CONTACTS_ENDPOINT, {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            "api-key": apiKey,
          },
          body: JSON.stringify(body),
        });
      }
    }

    if (response.status === 201 || response.status === 204) {
      // Deliver the guide. The thank-you page promises this email, so a failure
      // here is worth logging loudly — but never worth failing the confirmation
      // over, since they are subscribed and the page offers the download too.
      const guideUrl = new URL("/essays/the-first-build.pdf", redirectBase).toString();
      const sent = await sendEmail(
        {
          to: result.email,
          subject: "Here's The First Build",
          html: welcomeEmail(guideUrl),
          headers: LIST_UNSUBSCRIBE_HEADERS,
        },
        apiKey
      );
      if (!sent.ok) {
        console.error("confirm: welcome email failed", sent.status, sent.detail);
      }
      return landing(redirectBase, "ok");
    }

    const data = await response.json().catch(() => ({}));

    // Already on the list — they clicked twice, or re-subscribed. That is a
    // success from their point of view.
    if (data?.code === "duplicate_parameter") return landing(redirectBase, "ok");

    console.error("confirm: brevo rejected request", response.status, data);
    return landing(redirectBase, "failed");
  } catch (error) {
    console.error("confirm: request failed", error);
    return landing(redirectBase, "failed");
  }
}
