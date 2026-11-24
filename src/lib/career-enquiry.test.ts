import assert from "node:assert/strict";
import test from "node:test";
import { careerEnquiryHtml, parseCareerEnquiry } from "./career-enquiry.ts";

const valid = { name: "A Student", email: "student@example.com", stage: "student", targetRole: "Internal audit internship", challenge: "I would like help explaining my experience.", deadline: "2026-12-10" };

test("accepts an enquiry, normalises whitespace and email, and ignores unknown fields", () => {
  const result = parseCareerEnquiry({ ...valid, name: "  A Student  ", email: " Student@Example.com ", newsletter: true });
  assert.deepEqual(result, { ok: true, enquiry: valid });
});

test("rejects malformed bodies, missing details, unsupported stages, and invalid email", () => {
  for (const body of [null, [], "text", {}, { ...valid, email: "invalid" }, { ...valid, email: "a@example.com\r\nBcc:other@example.com" }, { ...valid, stage: "unexpected" }, { ...valid, targetRole: 42 }, { ...valid, challenge: "short" }, { ...valid, name: "A\nB" }]) {
    assert.equal(parseCareerEnquiry(body).ok, false);
  }
});

test("enforces field size bounds", () => {
  for (const body of [{ ...valid, name: "a".repeat(101) }, { ...valid, targetRole: "a".repeat(501) }, { ...valid, challenge: "a".repeat(2001) }, { ...valid, email: `${"a".repeat(250)}@example.com` }]) {
    assert.equal(parseCareerEnquiry(body).ok, false);
  }
});

test("supports no deadline and rejects invalid calendar dates", () => {
  assert.equal(parseCareerEnquiry({ ...valid, deadline: "" }).ok, true);
  assert.equal(parseCareerEnquiry({ ...valid, deadline: undefined }).ok, true);
  for (const deadline of ["tomorrow", "2026-02-30", "2026-13-01", "26-12-10"]) assert.equal(parseCareerEnquiry({ ...valid, deadline }).ok, false);
});

test("escapes user content in the notification and keeps links fixed", () => {
  const html = careerEnquiryHtml({ ...valid, name: '<img src=x onerror="alert(1)">', challenge: "<script>bad()</script> & 'quotes'" });
  assert.ok(!html.includes("<img"));
  assert.ok(!html.includes("<script>"));
  assert.ok(html.includes("&lt;script&gt;"));
  assert.ok(html.includes("&amp;"));
  assert.ok(html.includes("mailto:student%40example.com"));
});
