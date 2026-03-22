# Paired Mirrored Project Cards — Design Spec

**Date:** 2026-03-21
**Scope:** Alternating project sections on category sub-pages (residencial, comercial, design-de-interiores, projetos)

---

## Overview

Replace the current full-width alternating sections (one project per row) with a **paired mirrored card layout**: projects are grouped into pairs, each pair occupying one row with two cards side by side. The left card shows image left / text right; the right card shows text left / image right — creating a symmetric, mirrored appearance.

This change also reverts the two-stacked-images column back to a single cover image per card, since each card is now ~50% of the page width.

---

## Pages Affected

- `/[locale]/projetos/residencial`
- `/[locale]/projetos/comercial`
- `/[locale]/projetos/design-de-interiores`
- `/[locale]/projetos/projetos`

`/[locale]/projetos/reforma` is **not affected**.

---

## Layout

### Row structure

Projects are chunked into pairs. Each pair renders as one row:

```
┌────────────────────────┐  ┌────────────────────────┐
│ [Image 55% | Text 45%] │  │ [Text 45% | Image 55%] │
│  Left card             │  │  Right card             │
└────────────────────────┘  └────────────────────────┘
```

Row wrapper: `flex flex-col md:flex-row gap-6 mb-12`

Row `key` prop: `pair[0].slug`

### Left card (pair[0])

```tsx
<div className="flex-1 flex flex-col md:flex-row">
  {/* Image — 55% of card on desktop, full width on mobile */}
  <div className="relative w-full md:w-[55%] aspect-[4/3] overflow-hidden flex-shrink-0">
    <Image
      src={pair[0].coverImage}
      alt={pair[0].coverImageAlt[locale as Locale]}
      fill
      sizes="(max-width: 768px) 100vw, 27vw"
      className="object-cover"
    />
  </div>
  {/* Text */}
  <div className="flex-1 flex flex-col justify-center px-4 md:px-6 py-6 md:py-0">
    <p className="font-body text-xs uppercase tracking-widest text-primary mb-2">
      {pair[0].location} · {pair[0].year}
    </p>
    <h2 className="font-display text-2xl md:text-3xl text-text-primary tracking-wide mb-3">
      {pair[0].translations[locale as Locale].title}
    </h2>
    <p className="font-body text-sm text-text-primary/80 leading-relaxed">
      {pair[0].translations[locale as Locale].description}
    </p>
  </div>
</div>
```

### Right card (pair[1])

Same as left card but `md:flex-row-reverse` so image is on the right on desktop. On mobile (`flex-col`), image div is first in DOM, so it appears on top — same as left card.

```tsx
<div className="flex-1 flex flex-col md:flex-row-reverse">
  {/* Image — 55% of card on desktop, full width on mobile */}
  <div className="relative w-full md:w-[55%] aspect-[4/3] overflow-hidden flex-shrink-0">
    <Image
      src={pair[1].coverImage}
      alt={pair[1].coverImageAlt[locale as Locale]}
      fill
      sizes="(max-width: 768px) 100vw, 27vw"
      className="object-cover"
    />
  </div>
  {/* Text */}
  <div className="flex-1 flex flex-col justify-center px-4 md:px-6 py-6 md:py-0">
    <p className="font-body text-xs uppercase tracking-widest text-primary mb-2">
      {pair[1].location} · {pair[1].year}
    </p>
    <h2 className="font-display text-2xl md:text-3xl text-text-primary tracking-wide mb-3">
      {pair[1].translations[locale as Locale].title}
    </h2>
    <p className="font-body text-sm text-text-primary/80 leading-relaxed">
      {pair[1].translations[locale as Locale].description}
    </p>
  </div>
</div>
```

### Mobile

Both cards use `flex-col` as base (no `md:` prefix active on mobile). The image div is always first in DOM, so it renders on top on mobile for both cards. Text follows below.

### `sizes` value

`27vw` approximates 55% of half the viewport width (0.55 × 0.50 = 0.275). The `gap-6` (24px) between cards is ignored as a minor simplification — the true rendered width is fractionally smaller but `27vw` remains an accurate-enough hint for Next.js image optimization.

### Outer container

The rows sit inside `<div className="mt-16 px-4 md:px-6">` — a small horizontal padding so cards don't flush against the viewport edge on mobile.

---

## Implementation approach

### Chunking projects into pairs

```ts
const pairs: Array<[Project, Project]> = []
for (let i = 0; i < categoryProjects.length; i += 2) {
  // Data is guaranteed to always have an even number of projects per category.
  // If noUncheckedIndexedAccess is enabled in tsconfig, add: if (!categoryProjects[i + 1]) break
  pairs.push([categoryProjects[i], categoryProjects[i + 1]])
}
```

> **Note:** Check `tsconfig.json` for `noUncheckedIndexedAccess`. If enabled, add a guard before `pairs.push` to satisfy the type checker: `if (!categoryProjects[i + 1]) break`.

---

## Files Changed

| File | Change |
|------|--------|
| `src/app/[locale]/projetos/[slug]/page.tsx` | Replace full-width alternating sections with paired mirrored card rows; revert to 1 image per card; adjust typography and outer padding |

No data changes needed.

---

## Out of Scope

- Odd number of projects per category
- Changing the hero
- Changing the `reforma` page
- Adding CTA buttons or links
- Any changes to project detail pages
