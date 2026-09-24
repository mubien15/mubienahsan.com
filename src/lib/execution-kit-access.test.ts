import assert from "node:assert/strict";
import { createHmac, randomBytes } from "node:crypto";
import test from "node:test";
import {
  createDownloadToken,
  decryptExecutionKit,
  encryptExecutionKit,
  verifyDownloadToken,
  verifyStripeSignature,
} from "./execution-kit-access.ts";

test("download tokens are valid for 30 days and reject tampering", () => {
  const secret = "test-access-secret";
  const token = createDownloadToken(
    { sessionId: "cs_live_test", email: "Buyer@Example.com", createdAt: 1_000 },
    secret
  );

  assert.ok(verifyDownloadToken(token, secret, 1_001));
  assert.equal(verifyDownloadToken(token + "x", secret, 1_001), null);
  assert.equal(verifyDownloadToken(token, "wrong-secret", 1_001), null);
  assert.equal(verifyDownloadToken(token, secret, 1_000 + 30 * 24 * 60 * 60 + 1), null);
});

test("Stripe signatures require a valid HMAC and fresh timestamp", () => {
  const body = '{"type":"checkout.session.completed"}';
  const secret = "whsec_test";
  const timestamp = 10_000;
  const signature = createHmac("sha256", secret)
    .update(String(timestamp) + "." + body)
    .digest("hex");
  const header = "t=" + timestamp + ",v1=" + signature;

  assert.equal(verifyStripeSignature(body, header, secret, timestamp), true);
  assert.equal(verifyStripeSignature(body + " ", header, secret, timestamp), false);
  assert.equal(verifyStripeSignature(body, header, secret, timestamp + 301), false);
});

test("the encrypted kit round trips and rejects a different key", () => {
  const key = randomBytes(32).toString("base64");
  const wrongKey = randomBytes(32).toString("base64");
  const source = Buffer.from("paid execution kit test content");
  const encrypted = encryptExecutionKit(source, key);

  assert.notDeepEqual(encrypted, source);
  assert.deepEqual(decryptExecutionKit(encrypted, key), source);
  assert.throws(() => decryptExecutionKit(encrypted, wrongKey));
});
