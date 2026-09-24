import { NextResponse } from "next/server";
import { button, emailShell, sendEmail } from "@/lib/brevo";
import { createDownloadToken, verifyStripeSignature } from "@/lib/execution-kit-access";
import { EXECUTION_KIT } from "@/lib/execution-kit";

export const runtime = "nodejs";

type CheckoutSession = {
  id?: unknown;
  created?: unknown;
  livemode?: unknown;
  mode?: unknown;
  payment_status?: unknown;
  payment_link?: unknown;
  amount_total?: unknown;
  currency?: unknown;
  customer_email?: unknown;
  customer_details?: { email?: unknown } | null;
  metadata?: Record<string, unknown> | null;
};

function deliveryEmail(downloadUrl: string) {
  return emailShell(
    '<h1 style="margin:0 0 16px;font-size:24px;line-height:1.3;color:#241a10;">Your Execution Kit is ready</h1>' +
      '<p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#6f6350;">' +
      'Thank you for buying the <strong style="color:#241a10;">AI Product Launch Execution Kit</strong>. Your download contains the editable workbook, field guide, and reusable templates.' +
      "</p>" +
      button(downloadUrl, "Download the Execution Kit") +
      '<p style="margin:0 0 8px;font-size:14px;line-height:1.6;color:#6f6350;">' +
      "This personal download link expires in 30 days. Keep the downloaded ZIP somewhere safe. If you have any trouble, reply to this email." +
      "</p>" +
      '<p style="margin:20px 0 0;font-size:14px;color:#6f6350;">— Mubien</p>',
    { unsubscribe: false }
  );
}

function isPaidExecutionKitSession(session: CheckoutSession): boolean {
  return (
    session.livemode === true &&
    session.mode === "payment" &&
    session.payment_status === "paid" &&
    session.payment_link === EXECUTION_KIT.paymentLinkId &&
    session.amount_total === 3900 &&
    session.currency === "cad" &&
    session.metadata?.execution_kit_sku === EXECUTION_KIT.sku
  );
}

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const accessSecret = process.env.EXECUTION_KIT_ACCESS_SECRET;
  const brevoApiKey = process.env.BREVO_API_KEY;
  if (!webhookSecret || !accessSecret || !brevoApiKey) {
    console.error("stripe webhook: missing required environment variables");
    return NextResponse.json({ received: false }, { status: 500 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature");
  if (!signature || !verifyStripeSignature(rawBody, signature, webhookSecret)) {
    return NextResponse.json({ received: false }, { status: 400 });
  }

  let event: { type?: unknown; data?: { object?: CheckoutSession } };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ received: false }, { status: 400 });
  }

  if (
    event.type !== "checkout.session.completed" &&
    event.type !== "checkout.session.async_payment_succeeded"
  ) {
    return NextResponse.json({ received: true });
  }

  const session = event.data?.object;
  if (!session || !isPaidExecutionKitSession(session)) {
    console.error("stripe webhook: rejected checkout session");
    return NextResponse.json({ received: true });
  }

  const email =
    typeof session.customer_details?.email === "string"
      ? session.customer_details.email
      : typeof session.customer_email === "string"
        ? session.customer_email
        : null;
  if (typeof session.id !== "string" || typeof session.created !== "number" || !email) {
    console.error("stripe webhook: paid session has no deliverable customer details");
    return NextResponse.json({ received: true });
  }

  const token = createDownloadToken(
    { sessionId: session.id, email, createdAt: session.created },
    accessSecret
  );
  const downloadUrl = new URL("/api/execution-kit/download", "https://mubienahsan.com");
  downloadUrl.searchParams.set("token", token);

  const sent = await sendEmail(
    {
      to: email,
      subject: "Your AI Product Launch Execution Kit",
      html: deliveryEmail(downloadUrl.toString()),
    },
    brevoApiKey
  );
  if (!sent.ok) {
    console.error("stripe webhook: delivery email failed", sent.status);
    return NextResponse.json({ received: false }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
