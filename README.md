# thia. — The Pink Portfolio

Personal portfolio for **Syaila Fathia Azzahra (Thia)**.
Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Motion · Lucide · self-hosted Fraunces + DM Sans.

## Run

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # prints a content audit of anything still unconfirmed
pnpm start
```

## Editing content

**Everything on the page lives in `src/content/site.ts`.**

- `todo("…")` — information that was not provided. Shows as a dashed "to confirm" chip.
- `draft("…")` — neutral wording written from the project title only (no outcomes). Renders normally.
- Replace either with a plain string to confirm it. `pnpm build` lists what's left.

Headings support `*word*` for the pink italic accent.

## Before going live

1. CV → `public/cv/Syaila-Fathia-Azzahra-CV.pdf`, then `cv.available = true`
2. Portrait (4:5) → `public/images/thia.jpg`, then `photo.src = "/images/thia.jpg"`
3. `contact.email`, LinkedIn and GitHub URLs
4. Project roles, stack and **verified** results; Beyond-the-Data entries
5. `seo.siteUrl` → production domain (canonical URL, sitemap, robots)

## Deploy

Every route prerenders as static. Verified with `next build` + `next start`; deploys to Vercel as-is.
Plain static hosting (`output: "export"`) was **not** tested: it would need `cacheComponents`
removed and the cached `BuildYear` in `contact.tsx` replaced with a static year.

See `PLAN.md` for the build plan, accessibility decisions and verification log.
