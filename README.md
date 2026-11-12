# Muhammad Taqi Nayyer — Portfolio

Single-page React portfolio. Strict monochrome, no gradients, one continuous
scroll-drawn line that tells the story.

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # dist/  — deploy this (Vercel picks up vercel.json)
npm run build:solo   # dist-solo/index.html — one file, opens by double-click
```

Edit all text in `src/lib/site.js`.

## The Line (`src/components/TheLine.jsx`)

Sections mark their chapter with `data-line="…"`. The line measures those
elements and builds itself from their real positions, so it fits any screen:

| Checkpoint | Shape |
| --- | --- |
| Hero | heartbeat pulse |
| O Levels (Biology) | DNA double helix |
| FSc (Pre-Engineering) | blueprint profile, measuring scale, dimension line |
| Web Dev Diploma | code braces `{ }` |
| BS Computer Science | circuit traces, vias, pads |
| Experience | one node per role |
| inphint | a loop that climbs above its own start, chevron at the apex |
| Contact | endpoint crosshair |

Drawn with `stroke-dashoffset` on scroll, one rAF per frame, no React renders
on scroll. On phones it moves to the left edge at half amplitude. It turns
black over the white inphint section by itself (`mix-blend-mode: difference`).

**Section order differs from the brief** so the line's story runs in
chronological order: Hero → Premise → Education → Experience → inphint → Skills
→ Certifications → Contact. Nav is Home · Skills · Education · Contact.

## Security

- **Content Security Policy**: `'self'` only. No inline scripts, no eval,
  no plugins, no forms, no framing. Sent as a header via `vercel.json` and as a
  `<meta>` tag in the build, so it applies on any host.
- **Security headers** (`vercel.json`): HSTS, X-Frame-Options DENY,
  nosniff, strict Referrer-Policy, Permissions-Policy (camera, mic, location
  off), COOP/CORP same-origin.
- **No third-party requests at all**: fonts are self-hosted; nothing loads
  from Google, CDNs or trackers. Assets are never inlined as `data:` URIs in the
  deploy build, so the CSP can stay strict.
- Every external link uses `rel="noopener noreferrer"`.
- No source maps published. `npm audit`: 0 vulnerabilities.
- Portrait was checked for EXIF/GPS metadata (none) and re-encoded.
- **Home address not published.** The brief listed the full street address;
  the page shows "Model Town, Lahore". Change `PERSON.location` in `site.js`
  if you want the full address public.

Verified in headless Chromium at 1440×900 and 390×844: no console errors, zero
CSP violations, zero external requests, no horizontal overflow.

## Certificates

Ten, rendered from the PDFs. Nine are Google courses on Coursera; **the Jira
one was issued by the Coursera Project Network, not Google**, and is labelled
that way. Each opens in a lightbox with its own Coursera verify link.
