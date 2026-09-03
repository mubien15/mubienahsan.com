import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/confirm-token";

/*
  Newsletter signup, step two: the link in the confirmation email lands here.

  Verifying the signature proves the address in the token is the one that asked
  to subscribe, so this is the point where consent exists and the contact is
  created. Everything before this stored nothing.
*/

const BREVO_CONTACTS_ENDPOINT = "https://api.brevo.com/v3/contacts";

export const runtime = "nodejs";

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
