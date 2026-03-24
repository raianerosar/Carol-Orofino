# Blog Teaser Animations — Design Spec

**Date:** 2026-03-24
**Status:** Approved

## Overview

Add scroll-triggered entrance animations to the blog teaser section on the home page (`src/app/[locale]/page.tsx`). Posts appear with a staggered slide-up + fade effect as the section enters the viewport.

## Goals

- Improve perceived quality and elegance of the home page
- Animate posts sequentially (stagger) as the user scrolls to the section
- Animate only once per page load (no re-trigger on scroll back)
- Keep data fetching on the server; only animation logic on the client

## Non-Goals

- Hover card effects (not requested)
- Animating other sections of the home page
- Adding any new content or changing the blog section layout

## Architecture

### New Component: `BlogTeaser`

**File:** `src/components/BlogTeaser.tsx`
**Type:** Client component (`'use client'`)

Receives all data as props from the server component and handles animation logic. This keeps `page.tsx` as a pure server component.

**Props:**
```ts
interface BlogTeaserProps {
  posts: Post[]
  locale: string
  title: string         // t('blogTitle')
  readMore: string      // tBlog('readMore')
  blogLink: string      // t('blogLink')
  blogLinkHref: string  // `/${locale}/blog`
}
```

### Animation Design

Uses Framer Motion `motion` components with `whileInView` and `viewport: { once: true }`.

**Container variants:**
```ts
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 }
  }
}
```

**Item variants (each post + CTA button):**
```ts
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}
```

**Section title:**
Animates with a standalone `motion.h2` — `opacity: 0 → 1`, `y: 10 → 0`, `duration: 0.6s`, triggered by `whileInView` with `viewport: { once: true }`. Not part of the stagger container.

**Post list container:**
`motion.div` with container variants, `whileInView="visible"`, `initial="hidden"`, `viewport: { once: true, amount: 0.1 }`.

**Each post:**
Wrapped in `motion.div` with item variants. Inner `Link` and content remain unchanged.

**CTA button:**
Wrapped in `motion.div` with item variants — appears last in the stagger sequence.

### Update to `page.tsx`

Replace the inline blog section (lines 173–205) with `<BlogTeaser ... />`, passing all required strings and data as props.

## File Changes

| File | Action |
|------|--------|
| `src/components/BlogTeaser.tsx` | Create — new client component |
| `src/app/[locale]/page.tsx` | Update — import and use `BlogTeaser`, remove inline blog section |

## Dependencies

- `framer-motion` — already installed in the project

## Testing

- Verify stagger animation triggers on scroll on both desktop and mobile
- Verify `once: true` prevents re-animation on scroll back
- Verify no layout shift during animation (use `y` offset only, not height/width)
- Verify all locale strings render correctly in pt, en, es
