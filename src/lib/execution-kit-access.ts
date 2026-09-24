import {
  createCipheriv,
  createDecipheriv,
  createHash,
  createHmac,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";

const DOWNLOAD_TOKEN_VERSION = 1;
const DOWNLOAD_LIFETIME_SECONDS = 30 * 24 * 60 * 60;
const ENCRYPTED_FILE_MAGIC = Buffer.from("EKIT1", "ascii");

type DownloadTokenPayload = {
  v: number;
  session: string;
  email: string;
  exp: number;
};

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function sign(value: string, secret: string): string {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

export function createDownloadToken(
  {
    sessionId,
    email,
    createdAt,
  }: { sessionId: string; email: string; createdAt: number },
  secret: string
): string {
  const payload: DownloadTokenPayload = {
    v: DOWNLOAD_TOKEN_VERSION,
    session: sessionId,
    email: createHash("sha256").update(email.trim().toLowerCase()).digest("base64url"),
    exp: createdAt + DOWNLOAD_LIFETIME_SECONDS,
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return encoded + "." + sign(encoded, secret);
}

export function verifyDownloadToken(
  token: string,
  secret: string,
  nowSeconds = Math.floor(Date.now() / 1000)
): DownloadTokenPayload | null {
  const [encoded, signature, extra] = token.split(".");
  if (!encoded || !signature || extra || !safeEqual(signature, sign(encoded, secret))) return null;

  try {
    const payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8")
    ) as Partial<DownloadTokenPayload>;
    if (
      payload.v !== DOWNLOAD_TOKEN_VERSION ||
      typeof payload.session !== "string" ||
      !payload.session.startsWith("cs_") ||
      typeof payload.email !== "string" ||
      typeof payload.exp !== "number" ||
      !Number.isInteger(payload.exp) ||
      payload.exp < nowSeconds
    ) {
      return null;
    }
    return payload as DownloadTokenPayload;
  } catch {
    return null;
  }
}

export function verifyStripeSignature(
  rawBody: string,
  signatureHeader: string,
  webhookSecret: string,
  nowSeconds = Math.floor(Date.now() / 1000),
  toleranceSeconds = 300
): boolean {
  const values = signatureHeader.split(",").reduce<Record<string, string[]>>((result, part) => {
    const separator = part.indexOf("=");
    if (separator === -1) return result;
    const key = part.slice(0, separator);
    const value = part.slice(separator + 1);
    (result[key] ??= []).push(value);
    return result;
  }, {});
  const timestamp = Number(values.t?.[0]);
  const signatures = values.v1 ?? [];
  if (!Number.isInteger(timestamp) || Math.abs(nowSeconds - timestamp) > toleranceSeconds) return false;

  const expected = createHmac("sha256", webhookSecret)
    .update(String(timestamp) + "." + rawBody)
    .digest("hex");
  return signatures.some((candidate) => safeEqual(candidate, expected));
}

function decodeEncryptionKey(base64Key: string): Buffer {
  const key = Buffer.from(base64Key.trim(), "base64");
  if (key.length !== 32) throw new Error("Execution Kit encryption key must be 32 bytes.");
  return key;
}

export function encryptExecutionKit(plain: Buffer, base64Key: string): Buffer {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", decodeEncryptionKey(base64Key), iv);
  const encrypted = Buffer.concat([cipher.update(plain), cipher.final()]);
  return Buffer.concat([ENCRYPTED_FILE_MAGIC, iv, cipher.getAuthTag(), encrypted]);
}

export function decryptExecutionKit(encrypted: Buffer, base64Key: string): Buffer {
  const minimumLength = ENCRYPTED_FILE_MAGIC.length + 12 + 16 + 1;
  if (
    encrypted.length < minimumLength ||
    !encrypted.subarray(0, ENCRYPTED_FILE_MAGIC.length).equals(ENCRYPTED_FILE_MAGIC)
  ) {
    throw new Error("Execution Kit file is invalid.");
  }

  const ivStart = ENCRYPTED_FILE_MAGIC.length;
  const tagStart = ivStart + 12;
  const contentStart = tagStart + 16;
  const decipher = createDecipheriv(
    "aes-256-gcm",
    decodeEncryptionKey(base64Key),
    encrypted.subarray(ivStart, tagStart)
  );
  decipher.setAuthTag(encrypted.subarray(tagStart, contentStart));
  return Buffer.concat([decipher.update(encrypted.subarray(contentStart)), decipher.final()]);
}
