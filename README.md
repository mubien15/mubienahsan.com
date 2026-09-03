# mubienahsan.com

Personal site — free AI courses, projects, and writing. Next.js (App Router),
TypeScript, Tailwind v4, MDX for lesson content. Deployed on Vercel from
`main`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Layout

```
src/app/          routes (App Router); lessons are .mdx under (lessons)/
src/components/   shared UI — ui.tsx holds CtaLink, Eyebrow, Pill, PageIntro
src/content/      course, project and quiz data
src/app/globals.css   design tokens (warm cream, orange accent, light only)
public/essays/    downloadable PDFs
```

## Email capture

Two placements feed one double opt-in Brevo list: a band under the hero on the
home page, and a one-time popup (25s or exit intent). Both render
`SubscribeForm`, so their copy and validation cannot drift apart.

```
visitor submits
  -> POST /api/subscribe        (src/app/api/subscribe/route.ts)
     -> Brevo sends the confirmation email
        -> visitor clicks confirm
           -> Brevo adds them to the list, redirects to /thank-you
              -> the guide is offered there and emailed by the welcome automation
```

The contact is **not** added to the list until they confirm. That click is the
consent record CASL expects, and it keeps the guide away from typo'd and
hostile addresses.

### Environment variables

Set in Vercel → Settings → Environment Variables, for all three environments.
Without them the endpoint fails closed with a neutral message.

| Variable | Value |
|---|---|
| `BREVO_API_KEY` | Brevo v3 API key (secret) |
| `BREVO_LIST_ID` | `6` |
| `BREVO_DOI_TEMPLATE_ID` | `2` |
| `CONFIRM_REDIRECT_URL` | `https://mubienahsan.com/thank-you` |

### Brevo setup

- Sender `hello@mubienahsan.com`, forwarded to a personal inbox via Porkbun.
- Domain authenticated: DKIM on the `brevo1`/`brevo2` selectors, DMARC at
  `p=none`. SPF stays Porkbun-only on purpose — Brevo uses its own return-path,
  so DMARC passes on DKIM alignment and a Brevo SPF include would be cosmetic.
  There must only ever be **one** SPF record on the domain.
- Template `mubienahsan.com_lead_magnet` (id 2), button link type
  *Double opt-in link*.

### Two things that break silently

- **The API key expires after 90 days of inactivity**, whatever its stated
  expiry. If signups are sparse, run a test signup every couple of months.
- **The endpoint fails closed.** A missing or expired key shows visitors
  "Signup is temporarily unavailable" and logs the reason server-side — check
  the Vercel function logs rather than the browser.

### Before any send

Every campaign needs a physical mailing address and a working unsubscribe link
in the footer. Both are required by CASL, not optional.
