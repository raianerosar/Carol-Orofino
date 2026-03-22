# Category Alternating Sections — Design Spec

**Date:** 2026-03-21
**Scope:** Sub-category pages: `/projetos/projetos`, `/projetos/comercial`, `/projetos/design-de-interiores`, `/projetos/residencial`

---

## Overview

Evolve four of the five category sub-pages to replace the simple 2-image gallery with alternating image+text project sections. The hero (large photo + floating card with category title) is preserved unchanged at the top of each page.

The `reforma` category is **out of scope** and must keep its current `<CategoryGallery>` rendering.

---

## Pages Affected

- `/[locale]/projetos/residencial`
- `/[locale]/projetos/comercial`
- `/[locale]/projetos/design-de-interiores`
- `/[locale]/projetos/projetos`

**`/[locale]/projetos/reforma` is NOT affected** — it keeps the existing `<CategoryGallery>`.

---

## Branching Logic in `page.tsx`

All five slugs currently share one code path. The implementation must split them:

```tsx
const ALTERNATING_SLUGS: CategorySlug[] = [
  'residencial',
  'comercial',
  'design-de-interiores',
  'projetos',
]

if (KNOWN_SLUGS.includes(slug as CategorySlug)) {
  // ... hero (unchanged for all slugs) ...

  if (ALTERNATING_SLUGS.includes(slug as CategorySlug)) {
    // new alternating sections
    const categoryProjects = getProjectsByCategory(slug as CategorySlug)
    // render alternating sections
  } else {
    // slug === 'reforma' — keep existing CategoryGallery
    const images = categoryImages[slug as CategorySlug]
    return <CategoryGallery images={images} locale={locale as Locale} />
  }
}
```

The `categoryImages` import and `const images = categoryImages[...]` lookup **must be removed** from the alternating branch and kept only in the `reforma` branch.

---

## Layout

### Page structure

```
[Hero — existing, unchanged]
  └─ Full-width image (21:9 desktop, 9:16 mobile)
  └─ Floating card with category title

[Alternating project sections]
  └─ Section 0 (index 0): Image LEFT  | Text RIGHT
  └─ Section 1 (index 1): Text LEFT   | Image RIGHT
  └─ Section 2 (index 2): Image LEFT  | Text RIGHT
  └─ ...
```

### Alternation rule (0-based index)

- `index % 2 === 0` → image left, text right
- `index % 2 === 1` → text left, image right

### Each section

- **Image column (55% desktop):**
  - `<Image>` with `src={project.coverImage}`, `alt={project.coverImageAlt[locale]}`
  - Aspect ratio `4/3`, `object-cover`
  - `sizes="(max-width: 768px) 100vw, 55vw"`
- **Text column (45% desktop):**
  - Location + year — `font-body text-xs uppercase tracking-widest text-primary` (above title)
  - Project title — `font-display text-3xl md:text-4xl text-text-primary tracking-wide`
  - Description — `font-body text-base text-text-primary/80 leading-relaxed`
- **No CTA button**

### Mobile

Stack vertically: image on top, text below — same order for all sections (no alternation on mobile).

### Empty state

If the project list for a category is empty, render nothing (no sections, no message) — the hero alone is shown.

---

## Data

### New function: `getProjectsByCategory()`

Add to `src/data/projects.ts`:

```ts
export function getProjectsByCategory(slug: CategorySlug): Project[] {
  // 'projetos' has no matching Project.category value — return all projects
  if (slug === 'projetos') return projects
  // For all other slugs the category field matches directly
  return projects.filter((p) => p.category === (slug as Project['category']))
}
```

> **Note:** `Project.category` is typed as `'residencial' | 'comercial' | 'reforma' | 'design-de-interiores'` — it does not include `'projetos'`. The early-return guard for `'projetos'` is required to avoid an always-empty filter result.

---

## Files Changed

| File | Change |
|------|--------|
| `src/data/projects.ts` | Add `getProjectsByCategory()` |
| `src/app/[locale]/projetos/[slug]/page.tsx` | Add `ALTERNATING_SLUGS` constant; split rendering: alternating sections for 4 slugs, keep `<CategoryGallery>` for `reforma`; remove `categoryImages` lookup from alternating branch |
| `src/components/CategoryGallery.tsx` | No change |

---

## Out of Scope

- Adding a CTA button per section
- Linking sections to the full project detail page
- Changing the hero
- Modifying the `reforma` category page
- Any changes to project detail pages (`/projetos/[project-slug]`)
