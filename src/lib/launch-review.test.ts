import assert from "node:assert/strict";
import test from "node:test";
import {
  generateLaunchReview,
  REVIEW_PRESETS,
  type LaunchReview,
} from "./launch-review.ts";

const reviews = new Map(
  REVIEW_PRESETS.map((preset) => [
    preset.label,
    generateLaunchReview(preset.value),
  ])
);

function reviewFor(label: string): LaunchReview {
  const review = reviews.get(label);
  assert.ok(review, `Missing published review preset: ${label}`);
  return review;
}

test("published product profiles produce the documented evidence totals", () => {
  const generated = [...reviews.values()];

  assert.equal(generated.length, 3);
  assert.equal(generated.reduce((total, review) => total + review.claims.length, 0), 19);
  assert.equal(generated.reduce((total, review) => total + review.tests.length, 0), 22);
  assert.equal(generated.reduce((total, review) => total + review.gates.length, 0), 20);
});

test("money-moving agents receive high scrutiny and financial boundary checks", () => {
  for (const label of ["Refund agent", "Shopping agent"]) {
    const review = reviewFor(label);
    assert.equal(review.level, "High scrutiny");
    assert.ok(review.claims.some((claim) => claim.id === "money"));
    assert.ok(review.tests.some((item) => item.id === "cumulative"));
    assert.ok(review.gates.some((gate) => gate.id === "authority"));
  }
});

test("the research copilot stays lower scrutiny while retaining source-boundary checks", () => {
  const review = reviewFor("Research copilot");

  assert.equal(review.level, "Standard review");
  assert.ok(review.claims.some((claim) => claim.id === "untrusted-input"));
  assert.ok(review.tests.some((item) => item.id === "injection"));
  assert.ok(!review.claims.some((claim) => claim.id === "money"));
  assert.ok(!review.tests.some((item) => item.id === "cumulative"));
});

test("repeated runs return the same decision structure", () => {
  for (const preset of REVIEW_PRESETS) {
    assert.deepEqual(
      generateLaunchReview(preset.value),
      generateLaunchReview(preset.value)
    );
  }
});
