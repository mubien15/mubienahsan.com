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
  -> POST /api/subscribe   sends a confirmation email carrying a signed link
     -> visitor clicks it
        -> GET /api/confirm  verifies the signature, adds them to the list,
                             redirects to /thank-you
           -> the guide is offered there and emailed by the welcome automation
```

We do not use Brevo's double opt-in endpoint. It requires a template registered
as a DOI template, which their UI gives no obvious way to create, and it failed
with "An active DOI template does not exist" against an ordinary active
template containing a DOI link. Sending the confirmation ourselves through the
plain transactional endpoint removes that dependency entirely.

The link carries a signed token rather than a database row: the address and a
timestamp, HMAC-signed with a key derived from `BREVO_API_KEY`, valid 48 hours.
Nobody can mint a link subscribing an address they do not control, and there is
nothing to store or clean up. Rotating the API key invalidates links in flight,
which is fine given their lifetime.

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
| `CONFIRM_REDIRECT_URL` | `https://mubienahsan.com/thank-you` (its origin also builds the confirm link) |

### Brevo setup

- Sender `hello@mubienahsan.com`, forwarded to a personal inbox via Porkbun.
- Domain authenticated: DKIM on the `brevo1`/`brevo2` selectors, DMARC at
  `p=none`. SPF stays Porkbun-only on purpose — Brevo uses its own return-path,
  so DMARC passes on DKIM alignment and a Brevo SPF include would be cosmetic.
  There must only ever be **one** SPF record on the domain.
- No Brevo template is used. The confirmation email is built in
  `src/app/api/subscribe/route.ts`; edit the copy there.
- `SIGNUP_SOURCE` is sent as a contact attribute so you can see which placement
  works. It only sticks if that attribute exists under Brevo's contact
  attributes; if it does not, the confirm route retries without it rather than
  losing the subscriber.

### Brevo IP authorisation must stay off

Brevo can restrict API calls to an allowlist of IP addresses. It cannot be used
here: Vercel functions run from a large rotating AWS pool, so the address
changes per invocation and no allowlist can track it. With it on, every signup
fails with a 401 naming an "unrecognised IP address". Keep it disabled at
https://app.brevo.com/security/authorised_ips — the API key in Vercel's
encrypted environment variables is the security boundary.

### Two things that break silently

- **The API key expires after 90 days of inactivity**, whatever its stated
  expiry. If signups are sparse, run a test signup every couple of months.
- **The endpoint fails closed.** A missing or expired key shows visitors
  "Signup is temporarily unavailable" and logs the reason server-side — check
  the Vercel function logs rather than the browser.

### Before any send

Every campaign needs a physical mailing address and a working unsubscribe link
in the footer. Both are required by CASL, not optional.
