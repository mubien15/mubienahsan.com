# Mubien — AI products, governance, and clear thinking

The source for [mubienahsan.com](https://mubienahsan.com), my personal site and working portfolio.
I build useful tools with AI, study how these systems behave in practice, and explain the
product, governance, and human questions that follow.

## Featured work

- **[AI Product Launch Review](https://mubienahsan.com/launch-review)** — a browser-based review
  that turns an AI product description into explicit risks, evidence gaps, launch conditions,
  and a decision path.
- **[Agents That Spend](https://mubienahsan.com/research/autonomy-governance)** — original research
  on authority, oversight, and accountability when software can take consequential actions.
- **[AI Product Launch Execution Kit](https://mubienahsan.com/launch-review/execution-kit)** — a paid
  operating kit with risk, evaluation, framework-applicability, and decision artifacts.
- **[Courses](https://mubienahsan.com/courses)** — practical material for people learning to work
  with AI and ship useful products.

## What this repository demonstrates

- Product design that makes complex AI questions understandable without flattening them.
- Deterministic review logic with documented boundaries and repeatable tests.
- Evidence-led writing on AI governance, autonomy, alignment, and recursive learning.
- Production delivery: responsive interfaces, metadata, accessibility, email capture, payments,
  webhook verification, and protected digital downloads.

## Architecture

- Next.js App Router, React, TypeScript, Tailwind CSS, and MDX
- Vercel hosting and serverless route handlers
- Stripe-hosted checkout with verified webhook fulfillment
- Brevo transactional email and confirmed newsletter signup
- Signed expiring links and AES-encrypted paid assets

The site deliberately keeps review logic transparent. It does not present automated output as a
legal conclusion, certification, or substitute for product-specific investigation.

## Run locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run lint
npm run test:launch-review
npm run test:execution-kit
npm run build
```

Environment variables are managed outside the repository. Copy the names required by the route
you are working on into a local `.env.local`; never commit credentials.

## Reuse

This is a public portfolio repository, not an open-source content licence. The writing, research,
paid materials, visual identity, and personal assets remain proprietary. Please contact
[hello@mubienahsan.com](mailto:hello@mubienahsan.com) before reusing them.
