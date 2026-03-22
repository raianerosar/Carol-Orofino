# Two-Image Stacked Sections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the single cover image in each alternating project section with two images stacked vertically (cover on top, second image below), and increase the section title font size.

**Architecture:** Single-file change in the category page component. The outer image column wrapper is replaced with a `flex flex-col gap-2` container holding two individual `relative aspect-[4/3]` image wrappers. No data layer changes needed — `project.images` already exists.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Jest

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/app/[locale]/projetos/[slug]/page.tsx` | Modify lines ~126-135 and ~142 | Replace single image with stacked two-image column; increase title size |

---

## Task 1: Replace single image column with stacked two-image column

**Files:**
- Modify: `src/app/[locale]/projetos/[slug]/page.tsx`

> Note: This is a pure UI change with no new functions. There are no unit tests to write for this task. Verification is TypeScript compilation + full test suite pass + visual check.

- [ ] **Step 1: Locate the image column block**

In `src/app/[locale]/projetos/[slug]/page.tsx`, find the image column inside the `categoryProjects.map(...)` loop. It currently looks like this (around line 126):

```tsx
{/* Image column — 55% desktop, full width mobile */}
<div className="relative w-full md:w-[55%] aspect-[4/3] overflow-hidden flex-shrink-0">
  <Image
    src={project.coverImage}
    alt={project.coverImageAlt[locale as Locale]}
    fill
    sizes="(max-width: 768px) 100vw, 55vw"
    className="object-cover"
  />
</div>
```

- [ ] **Step 2: Replace the image column with the stacked two-image version**

Replace the entire block above with:

```tsx
{/* Image column — 55% desktop, full width mobile */}
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

  {/* Second image — only when available */}
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

> Important: The outer wrapper loses `relative`, `aspect-[4/3]`, and `overflow-hidden` — these now belong to each individual image wrapper. The outer wrapper becomes a plain flex column container.
>
> Alt text for the second image uses `altText` (not `alt`) — this is the field name in the `ProjectImage` interface.
>
> Do NOT add `placeholder="blur"` to `images[0]` — `ProjectImage` has no `blurDataURL` field.

- [ ] **Step 3: Increase the title font size**

In the same section, find the `h2` title (around line 142):

```tsx
<h2 className="font-display text-3xl md:text-4xl text-text-primary tracking-wide mb-4">
```

Change it to:

```tsx
<h2 className="font-display text-4xl md:text-5xl text-text-primary tracking-wide mb-4">
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
cd /c/Carol-Orofino && npx tsc --noEmit
```

Expected: Zero errors.

- [ ] **Step 5: Run full test suite**

```bash
cd /c/Carol-Orofino && npx jest --no-coverage
```

Expected: All tests pass (no tests cover the JSX directly, so all existing tests should pass unchanged).

- [ ] **Step 6: Commit**

```bash
cd /c/Carol-Orofino && git add "src/app/[locale]/projetos/[slug]/page.tsx" && git commit -m "feat: stack two images per section and increase title size"
```

---

## Task 2: Visual verification

- [ ] **Step 1: Start the dev server**

```bash
cd /c/Carol-Orofino && npm run dev
```

- [ ] **Step 2: Verify affected pages**

Open each page and confirm:
- Each section shows 2 stacked images (cover on top, second below) when the project has 2 images ✓
- When a project has only 1 image (e.g. `casa-higienopolis` in reforma), only 1 image shows — no empty space ✓
- Title text is visibly larger than before ✓
- Alternating left/right layout still works ✓
- Mobile: images stack naturally above the text ✓

Pages to check:
- `http://localhost:3000/pt/projetos/residencial` — Apartamento Jardins (has 2 images)
- `http://localhost:3000/pt/projetos/comercial` — Escritório Itaim (has 2 images)
- `http://localhost:3000/pt/projetos/projetos` — all projects listed
- `http://localhost:3000/pt/projetos/reforma` — must still show CategoryGallery (unchanged)
