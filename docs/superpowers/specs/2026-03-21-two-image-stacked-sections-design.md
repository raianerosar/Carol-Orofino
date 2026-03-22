# Two-Image Stacked Sections — Design Spec

**Date:** 2026-03-21
**Scope:** Alternating project sections on category sub-pages (residencial, comercial, design-de-interiores, projetos)

---

## Overview

Evolve the alternating project sections so that each section's image column displays **two images stacked vertically** (cover on top, `images[0]` below) instead of a single cover image. The title font size is also increased. The alternating left/right layout and all other page structure remain unchanged.

---

## Pages Affected

- `/[locale]/projetos/residencial`
- `/[locale]/projetos/comercial`
- `/[locale]/projetos/design-de-interiores`
- `/[locale]/projetos/projetos`

`/[locale]/projetos/reforma` is **not affected**.

---

## Layout

### Image column (55% desktop) — full replacement

The current outer image wrapper:
```tsx
<div className="relative w-full md:w-[55%] aspect-[4/3] overflow-hidden flex-shrink-0">
  <Image ... fill />
</div>
```

Must be **fully replaced** with a stacked column container. Remove `aspect-[4/3]` and `relative` from the outer wrapper — they only work for a single `fill` image and will clip or compress two stacked images.

New structure:
```tsx
<div className="w-full md:w-[55%] flex-shrink-0 flex flex-col gap-2">
  {/* Cover image — always shown */}
  <div className="relative aspect-[4/3] overflow-hidden">
    <Image
      src={project.coverImage}
      alt={project.coverImageAlt[locale as Locale]}
      fill
      sizes="(max-width: 768px) 100vw, 55vw"
      className="object-cover"
    />
  </div>

  {/* Second image — only when project.images.length > 0 */}
  {project.images.length > 0 && (
    <div className="relative aspect-[4/3] overflow-hidden">
      <Image
        src={project.images[0].src}
        alt={project.images[0].altText[locale as Locale]}
        fill
        sizes="(max-width: 768px) 100vw, 55vw"
        className="object-cover"
      />
    </div>
  )}
</div>
```

**Key details:**
- Each image uses `fill` inside its own `relative` + `aspect-[4/3]` wrapper div
- The second image guard is `project.images.length > 0` — no further defensiveness needed
- `placeholder="blur"` is **not used** on `images[0]` — `ProjectImage` has no `blurDataURL` field
- Alt text for the second image: `project.images[0].altText[locale as Locale]` — note the field is `altText` (not `alt`), consistent with the `ProjectImage` interface

### Fallback (no second image)

When `project.images.length === 0`, only the cover image is shown. The column height becomes the height of a single `aspect-[4/3]` image. No empty space, no placeholder.

### Text column (45% desktop)

Increase title font size only:
- **Before:** `font-display text-3xl md:text-4xl`
- **After:** `font-display text-4xl md:text-5xl`

All other text styles unchanged (location/year, description, spacing).

### Mobile

The image column stacks naturally — cover on top, second image below — since each image has its own aspect ratio. Text column follows below the images. No changes needed for mobile.

### Alternation

Unchanged:
- `index % 2 === 0` → image column left, text column right
- `index % 2 === 1` → `md:flex-row-reverse` (image column right, text column left)

---

## Files Changed

| File | Change |
|------|--------|
| `src/app/[locale]/projetos/[slug]/page.tsx` | Replace single-image column with stacked two-image column; increase title font size |

No data changes — `project.images` already exists in the `Project` interface.

---

## Out of Scope

- Adding a third image or more
- Changing the hero
- Changing the `reforma` page
- Any changes to project detail pages
- Adding links or CTA buttons
