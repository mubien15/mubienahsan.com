import { createHmac, timingSafeEqual } from "crypto";

/*
  Signed confirmation tokens.

  Double opt-in needs to remember "this address asked to subscribe" between the
  signup and the confirmation click. Rather than store that anywhere, the token
  carries it and is signed, so it cannot be edited or forged: nobody can mint a
  link that subscribes an address they do not control.

  The signing key is derived from BREVO_API_KEY so there is no second secret to
  configure. Rotating that key invalidates confirmation links already in flight,
  which is acceptable — they only live 48 hours.
*/

const MAX_AGE_MS = 48 * 60 * 60 * 1000;

type Payload = { e: string; s: string; t: number };

const b64url = (input: Buffer | string) =>
  Buffer.from(input).toString("base64url");

function sign(data: string, secret: string): string {
  return createHmac("sha256", secret).update(data).digest("base64url");
}

export function createToken(email: string, source: string, secret: string): string {
  const payload: Payload = { e: email, s: source, t: Date.now() };
  const body = b64url(JSON.stringify(payload));
  return `${body}.${sign(body, secret)}`;
}

export type VerifyResult =
  | { ok: true; email: string; source: string }
  | { ok: false; reason: "malformed" | "bad-signature" | "expired" };

export function verifyToken(token: string, secret: string): VerifyResult {
  const [body, signature] = token.split(".");
  if (!body || !signature) return { ok: false, reason: "malformed" };

  // Constant-time compare, so response timing cannot be used to guess a valid
  // signature byte by byte. Buffers of different lengths would throw, so the
  // length check comes first.
  const expected = Buffer.from(sign(body, secret));
  const actual = Buffer.from(signature);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
    return { ok: false, reason: "bad-signature" };
  }

  let payload: Payload;
  try {
    payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
  } catch {
    return { ok: false, reason: "malformed" };
  }

  if (typeof payload.e !== "string" || typeof payload.t !== "number") {
    return { ok: false, reason: "malformed" };
  }
  if (Date.now() - payload.t > MAX_AGE_MS) return { ok: false, reason: "expired" };

  return { ok: true, email: payload.e, source: String(payload.s ?? "unknown") };
}
