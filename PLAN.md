# PLAN — The Pink Portfolio (thia.)

## Repository inspection (2026-10-27)
- Working directory was empty: no existing repo, no package.json, no git. Greenfield build.
- Toolchain: Node 22, pnpm 10, npm registry reachable.
- Google Fonts CDN is **blocked** in the build environment → fonts are self-hosted via
  `@fontsource-variable/fraunces` and `@fontsource-variable/dm-sans` (also removes a
  render-blocking third-party request in production).

## Stack
Next.js (App Router) · TypeScript · Tailwind CSS v4 · Motion (`motion/react`) · Lucide · static export.

## Content integrity rules (hard constraints)
1. Every editable string lives in `src/content/site.ts`.
2. Only facts given in the brief are stated as facts: name, degree, UPI, career interests,
   the Kanwil DJPb Jawa Barat internship (Mar–Jun 2025, 27 districts/cities, Python EDA,
   forecasting, reporting, dashboards), the three project titles, and listed tools.
3. Anything not supplied (project results, organisations, roles, links, CV file, photo) is a
   **typed placeholder** — `TODO:`-prefixed in the data file and rendered with a visible
   "to confirm" marker in development so it cannot ship silently.
4. No testimonials, no metrics, no lorem ipsum.

## Tasks
- [x] 1. Scaffold Next.js + TS + Tailwind v4, install motion, lucide-react, fontsource
- [x] 2. Design tokens (palette, radii, shadows, type scale) in `globals.css` `@theme`
- [x] 3. Content model + data file with placeholder flags
- [x] 4. Primitives: Section, Reveal (reduced-motion aware), Button/pill, Sparkle, Placeholder
- [x] 5. Nav: wordmark, anchor links, active-section highlight, mobile menu (focus-managed), CV button
- [x] 6. Hero: badge, headline, subheadline, intro, CTAs, editorial photo frame
- [x] 7. About: intro + four trait cards (analytical, creative, communication, curiosity)
- [x] 8. Experience: DJPb internship timeline card
- [x] 9. Projects: 3 case-study cards (problem / role / process / stack / results)
- [x] 10. Toolkit: 4 grouped bento cards
- [x] 11. Beyond the Data: leadership/org/speaking/qualities
- [x] 12. Contact + footer
- [x] 13. SEO: metadata, Open Graph, JSON-LD Person, sitemap, robots, favicon
- [x] 14. Verify: typecheck, lint, build; screenshots at 375 / 768 / 1440; keyboard nav,
        skip link, landmarks, contrast; anchor scrolling; reduced motion

## Accessibility targets
- WCAG 2.1 AA contrast (measured): `#D66A98` is 3.13:1 on `#FFF7FB` and 2.74:1 on `#FCE4EF`;
  white on `#D66A98` is 3.29:1. Therefore:
  - primary buttons are plum `#432C3C` (white text 12.6:1), pink only on hover glow;
  - small accent text uses `#A3436F` (5.56:1 on paper);
  - large accent headings use `#D66A98` on paper and `#C4618B` on blush tints (3.22:1).
- Skip link, one `<h1>`, landmark elements, visible focus rings, `aria-current` on nav,
  `prefers-reduced-motion` disables transforms and smooth scroll.

## Open items for the owner (cannot be resolved by the builder)
- Real CV PDF → `public/cv/Syaila-Fathia-Azzahra-CV.pdf`
- Photo → `public/images/thia.jpg`
- Email, LinkedIn, GitHub URLs
- Verified project outcomes, organisation names/roles, speaking events
- Production domain for canonical URL / sitemap

## Verification log (2026-10-27)
- `tsc --noEmit`: clean · `eslint`: clean · `next build`: all routes static (○)
- axe-core (wcag2a/aa, 21aa, best-practice) on full page after scroll: **0 violations**
  (initially 3 contrast failures on tinted sections → fixed with `--color-rose-deep`)
- Horizontal overflow at 360 / 375 / 768 / 1440: 0px
- Skip link is first tab stop and moves focus to `<main>`
- Nav anchors: Projects/Skills/Contact/About land 96px below viewport top (clear of the
  sticky bar) and set `aria-current`; mobile menu link scrolls and closes the sheet
- Mobile menu: `aria-expanded` toggles, focus moves into the sheet, Escape closes and
  returns focus to the toggle, Tab is trapped
- Case-study disclosure opens via native `<details>`
- No-JS and reduced-motion: 0 hidden reveal elements; reduced motion → `scroll-behavior: auto`

## Redesign — "research report" direction (2026-10-27)
Portfolio reads like a printed analytical report: neutral paper (`--color-paper #FAF7F6`),
ink (`--color-ink`), hairline rules (`--color-rule`), IBM Plex Mono for labels/figures, and
pink reserved for data + the highlighter `.mark`. No italic accent words, sparkles or blush washes.
- [x] Hero → minimal cover: one meta rule, factual lede + text-link CTAs, abstract West Java
      composition (ink squares = regencies, pink discs = cities, swell toward the cursor;
      `west-java-map.tsx`), full-width name sized from its measured em width
- [x] Nav → plain text links, pink dot for the active section, CV as a mono label
- [ ] About → "Methodology" (numbered workflow replaces trait cards; portrait moves here)
- [ ] Experience → scrollytelling with the map sticky
- [ ] Projects → index + full-width figures with method diagrams
- [ ] Toolkit → "Data dictionary" table · Beyond → "Appendix" · Contact → back cover + colophon
- [ ] Nav → running header in the same mono/rule system

## Bugs found during verification (fixed)
1. Motion's SSR `opacity:0` + reduced-motion branch left sections permanently invisible →
   replaced with CSS progressive-enhancement reveal (`html.js` + IntersectionObserver).
2. Tailwind v4 uses the `translate`/`scale` properties, so `transition-[transform]` didn't
   animate hovers → transition lists updated.
3. `new Date()` in footer broke prerendering under Cache Components → cached `BuildYear`.
4. Header CV button ignored `hidden` (base `inline-flex` won) → wrapper element.
5. Mobile: "27" card covered the portrait caption; project number overlapped cover art;
   menu sheet didn't fill the viewport.
