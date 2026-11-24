import { NextResponse } from "next/server";
import { emailShell, sendEmail, SENDER } from "@/lib/brevo";
import { careerEnquiryHtml, parseCareerEnquiry } from "@/lib/career-enquiry";

export const runtime = "nodejs";

const fail = (error: string, status: number) => NextResponse.json({ success: false, error }, { status });

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return fail("Please send your enquiry from this website.", 403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return fail("Invalid request.", 415);

  // Bound the body before parsing it, including requests without Content-Length.
  const reader = request.body?.getReader();
  if (!reader) return fail("Please complete the enquiry form.", 400);
  let body = "";
  let bytes = 0;
  const decoder = new TextDecoder();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 12000) {
        await reader.cancel();
        return fail("Your enquiry is too long. Please shorten it and try again.", 413);
      }
      body += decoder.decode(value, { stream: true });
    }
    body += decoder.decode();
  } catch {
    return fail("Invalid request. Please try again.", 400);
  }

  let payload: unknown;
  try { payload = JSON.parse(body); } catch { return fail("Invalid request.", 400); }
  if (payload && typeof payload === "object" && "website" in payload && typeof payload.website === "string" && payload.website.trim()) {
    return NextResponse.json({ success: true });
  }
  const parsed = parseCareerEnquiry(payload);
  if (!parsed.ok) return fail(parsed.error, 400);

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) return fail("The enquiry form is temporarily unavailable. Please email me directly.", 503);
  const sent = await sendEmail({
    to: SENDER.email,
    subject: "New career preparation enquiry",
    html: emailShell(careerEnquiryHtml(parsed.enquiry), { unsubscribe: false }),
  }, apiKey);

  if (!sent.ok) {
    // Do not log the enquiry, its email address, or the provider response body.
    console.error("career-enquiry: delivery unavailable", sent.status ?? "network");
    return fail("Your enquiry could not be delivered. Please try again or email me directly.", 503);
  }
  return NextResponse.json({ success: true });
}
