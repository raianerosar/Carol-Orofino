# Spec: About Section Redesign

**Date:** 2026-03-23
**Status:** Approved
**Scope:** Homepage about teaser + new `/sobre` page

---

## Overview

Redesign the About teaser on the homepage to incorporate Carol's B&W portrait photo with a split layout and scroll animation. Simultaneously create the `/sobre` page, which currently doesn't exist (the "Conheça mais" link 404s).

---

## Photo Asset

- **File:** `Whisk_6735f517845581e93e14a3e63116f2e8dr.png` (to be placed at `public/images/carol-portrait.png` — keep as PNG, no format conversion needed)
- B&W portrait of Carol Orofino in an interior design studio setting
- Primary crop: `object-cover object-top` to keep face and upper body visible

---

## 1. Homepage About Teaser

### Location
`src/app/[locale]/page.tsx` — replaces the existing centered text block (lines 151–166).

### Component
Extract as `src/components/AboutTeaser.tsx` (`'use client'` — needs Framer Motion).

### Layout
- `grid grid-cols-1 md:grid-cols-2`
- Minimum height: `min-h-[560px]`
- Full-width, no horizontal padding on the grid itself

### Left column — Photo
- Next.js `<Image>` with `fill`, `object-cover object-top`
- `sizes="(max-width: 768px) 100vw, 50vw"`
- Mobile height: `min-h-[320px]` (fixed, stacked above text)
- Framer Motion: `initial={{ opacity: 0, x: -40 }}` → `whileInView={{ opacity: 1, x: 0 }}`
  `transition={{ duration: 0.8, ease: 'easeOut' }}`, `viewport={{ once: true, margin: '-80px' }}`

### Right column — Text
- Background: `bg-sand` (`#e0cfb3`)
- Padding: `px-8 py-16 md:px-16`, flex column centered
- Max content width: `max-w-md`
- Framer Motion: same config with `delay: 0.15`, `x: 40` (slides from right)

### Text content (i18n keys from `home` namespace)
| Element | Key | Style |
|---|---|---|
| Eyebrow | `about.eyebrow` ("Sobre nós" — new key, shared with `/sobre` page) | `text-xs uppercase tracking-[0.35em] text-dark` |
| Title | `home.aboutTitle` ("Carol Orofino") | `font-display text-3xl md:text-4xl font-light italic text-primary` |
| Divider | — | `w-10 h-px bg-stone my-5` |
| Bio teaser | `home.aboutTeaser` | `font-body text-sm font-light text-dark leading-relaxed` |
| CTA link | `home.aboutLink` → `/${locale}/sobre` | `text-xs uppercase tracking-widest border-b border-primary text-primary` |

### Color rule compliance (60-30-10)
- 60%: `sand` background on text side, photo fills the other half
- 30%: `stone` divider, `dark`/`text-primary` body text
- 10%: `walnut/primary` on title, divider line, CTA

---

## 2. Page `/sobre`

### Route
`src/app/[locale]/sobre/page.tsx` — server component, exports `generateStaticParams()`.

### Metadata
- Title: `"Sobre — Carol Orofino"`
- Description: `about.bio` (first sentence)

### Section 1 — Hero split (photo + bio)
Same 50/50 grid layout as the homepage teaser with identical animation pattern, but:
- Photo is non-animated on initial load (it's above the fold) — `priority` prop on `<Image>`
- Bio text is the full `about.bio` string (longer than homepage teaser)
- No CTA link in this section (user is already on the about page)

### Section 2 — Filosofia de Design
- Background: `bg-linen` (`#edeae1`) — slightly lighter than main `sand`
- Layout: `py-20 px-6 md:px-24`, max-width container centered
- Inner: flex row with vertical walnut bar + content block

**Vertical bar:**
- `w-px self-stretch bg-walnut mr-10 md:mr-16 flex-shrink-0`
- Visible only on `md+`; hidden on mobile (replaced by top border on quote)

**Content:**
- Eyebrow: `about.philosophy` → `text-xs uppercase tracking-[0.35em] text-dark mb-4`
- Quote: `about.philosophyText` → `font-display text-2xl md:text-3xl font-light italic text-primary leading-[1.3] mb-6`
- (No additional paragraph — keep it minimal per Option B scope)

**Animation:** `motion.div` fade-in + `y: 20` → `y: 0`, `duration: 0.7`, `viewport: once`

**Mobile treatment:** vertical bar becomes `h-px w-10 bg-walnut mb-6` (horizontal top accent)

### Section 3 — CTA
- Background: `bg-sand`
- Layout: `py-20 text-center`
- Title: `"Vamos trabalhar juntas?"` (new i18n key: `about.ctaTitle`)
- Subtitle: short text (new key: `about.ctaSubtitle`) — e.g., "Conte-me sobre o seu projeto"
- Button: `<WhatsAppButton variant="inline" message={about.ctaWhatsappMessage} label={about.ctaButton} />`
  - WhatsApp message key: `about.ctaWhatsappMessage` — "Olá Carol, gostaria de saber mais sobre seus serviços."

**Animation:** fade-in on scroll, `duration: 0.6`

### SectionDividers
- `<SectionDivider />` between Section 1 and Section 2
- `<SectionDivider />` between Section 2 and Section 3

---

## 3. i18n Updates

The `about` namespace already contains these keys (no changes needed):
- `about.title`, `about.bio`, `about.philosophy`, `about.philosophyText`

Add the following **new keys** to `src/messages/{pt,en,es}.json` under `about`:

```json
"eyebrow": "Sobre nós",
"ctaTitle": "Vamos trabalhar juntas?",
"ctaSubtitle": "Conte-me sobre o seu projeto",
"ctaButton": "Falar no WhatsApp",
"ctaWhatsappMessage": "Olá Carol, gostaria de saber mais sobre seus serviços."
```

`about.eyebrow` is used in both the homepage `AboutTeaser` and the `/sobre` page — single source of truth.

(English and Spanish equivalents needed for `en.json` and `es.json`)

---

## 4. New Files

| File | Purpose |
|---|---|
| `src/components/AboutTeaser.tsx` | Homepage teaser component (`'use client'`) |
| `src/app/[locale]/sobre/page.tsx` | Full about page (server component) |
| `public/images/carol-portrait.png` | Carol's B&W photo (copied from download, keep as PNG) |

## 5. Modified Files

| File | Change |
|---|---|
| `src/app/[locale]/page.tsx` | Replace inline about section with `<AboutTeaser />` |
| `src/messages/pt.json` | Add new `about.*` keys |
| `src/messages/en.json` | Add new `about.*` keys |
| `src/messages/es.json` | Add new `about.*` keys |

---

## 6. Mobile-First Behavior

| Element | Mobile | Desktop |
|---|---|---|
| Split grid | Single column, photo top (320px) | 50/50 columns |
| Photo order | First (visual anchor) | Left |
| Text padding | `px-8 py-12` | `px-16 py-20` |
| Filosofia bar | Horizontal top accent (`h-px w-10`) | Vertical left bar |
| Slide-in animation | Simplify to fade only (no x-axis) on mobile to avoid overflow | Full slide |

---

## 7. Out of Scope

- No parallax on the homepage teaser (using slide-in instead, consistent with existing site pattern)
- No dark/contrasting section variant for the philosophy block
- No stats/numbers section
