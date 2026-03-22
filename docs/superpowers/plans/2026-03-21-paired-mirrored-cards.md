# Paired Mirrored Project Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current full-width alternating sections (one project per row, two stacked images) with paired mirrored cards (two projects per row, one image each, mirrored layout).

**Architecture:** Single-file change in `src/app/[locale]/projetos/[slug]/page.tsx`. The `categoryProjects.map(...)` loop is replaced with a chunk-into-pairs approach, rendering two cards per row. Left card uses `flex-col md:flex-row`, right card uses `flex-col md:flex-row-reverse`.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Jest

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/app/[locale]/projetos/[slug]/page.tsx` | Modify lines ~111–168 | Replace single-project alternating loop with paired mirrored card rows |

> Note: `tsconfig.json` has `"strict": true` but NOT `noUncheckedIndexedAccess`, so array index access is typed as `T` (not `T | undefined`). No extra guard needed in the chunking loop.

---

## Task 1: Replace the alternating section loop with paired mirrored cards

**Files:**
- Modify: `src/app/[locale]/projetos/[slug]/page.tsx` (lines ~111–168)

> This is a pure UI change. No new functions, no unit tests. Verification is TypeScript compilation + full test suite + visual check.

- [ ] **Step 1: Locate the block to replace**

In `src/app/[locale]/projetos/[slug]/page.tsx`, find the alternating sections block starting at line ~110:

```tsx
    if (ALTERNATING_SLUGS.includes(slug as CategorySlug)) {
      const categoryProjects = getProjectsByCategory(slug as CategorySlug)

      return (
        <div className="pb-16">
          {heroJSX}
          <div className="mt-16">
            {categoryProjects.map((project, index) => {
              const translation = project.translations[locale as Locale]
              const isImageLeft = index % 2 === 0

              return (
                <div
                  key={project.slug}
                  className={`flex flex-col md:flex-row items-stretch mb-16 md:mb-24${isImageLeft ? '' : ' md:flex-row-reverse'}`}
                >
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

                  {/* Text column — 45% desktop */}
                  <div className="w-full md:w-[45%] flex flex-col justify-center px-6 md:px-12 py-8 md:py-0">
                    <p className="font-body text-xs uppercase tracking-widest text-primary mb-3">
                      {project.location} · {project.year}
                    </p>
                    <h2 className="font-display text-4xl md:text-5xl text-text-primary tracking-wide mb-4">
                      {translation.title}
                    </h2>
                    <p className="font-body text-base text-text-primary/80 leading-relaxed">
                      {translation.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
    }
```

- [ ] **Step 2: Replace the entire block with the paired mirrored cards version**

```tsx
    if (ALTERNATING_SLUGS.includes(slug as CategorySlug)) {
      const categoryProjects = getProjectsByCategory(slug as CategorySlug)

      // Chunk into pairs — data is guaranteed to always have an even number of projects
      const pairs: Array<[typeof categoryProjects[0], typeof categoryProjects[0]]> = []
      for (let i = 0; i < categoryProjects.length; i += 2) {
        pairs.push([categoryProjects[i], categoryProjects[i + 1]])
      }

      return (
        <div className="pb-16">
          {heroJSX}
          <div className="mt-16 px-4 md:px-6">
            {pairs.map((pair) => (
              <div key={pair[0].slug} className="flex flex-col md:flex-row gap-6 mb-12">

                {/* Left card — image left, text right */}
                <div className="flex-1 flex flex-col md:flex-row">
                  <div className="relative w-full md:w-[55%] aspect-[4/3] overflow-hidden flex-shrink-0">
                    <Image
                      src={pair[0].coverImage}
                      alt={pair[0].coverImageAlt[locale as Locale]}
                      fill
                      sizes="(max-width: 768px) 100vw, 27vw"
                      className="object-cover"
                    />
                  </div>
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

                {/* Right card — text left, image right */}
                <div className="flex-1 flex flex-col md:flex-row-reverse">
                  <div className="relative w-full md:w-[55%] aspect-[4/3] overflow-hidden flex-shrink-0">
                    <Image
                      src={pair[1].coverImage}
                      alt={pair[1].coverImageAlt[locale as Locale]}
                      fill
                      sizes="(max-width: 768px) 100vw, 27vw"
                      className="object-cover"
                    />
                  </div>
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

              </div>
            ))}
          </div>
        </div>
      )
    }
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd /c/Carol-Orofino && npx tsc --noEmit
```

Expected: Zero errors.

- [ ] **Step 4: Run full test suite**

```bash
cd /c/Carol-Orofino && npx jest --no-coverage
```

Expected: All 14 tests pass.

- [ ] **Step 5: Commit**

```bash
cd /c/Carol-Orofino && git add "src/app/[locale]/projetos/[slug]/page.tsx" && git commit -m "feat: paired mirrored project cards, two per row"
```

---

## Task 2: Visual verification

- [ ] **Step 1: Start the dev server**

```bash
cd /c/Carol-Orofino && npm run dev
```

- [ ] **Step 2: Verify each page**

| URL | What to verify |
|-----|---------------|
| `http://localhost:3000/pt/projetos/projetos` | 2 cards per row; left card: image left/text right; right card: text left/image right |
| `http://localhost:3000/pt/projetos/residencial` | Same layout (currently 1 project — only 1 card on its row) |
| `http://localhost:3000/pt/projetos/comercial` | Same layout |
| `http://localhost:3000/pt/projetos/reforma` | **Unchanged** — still shows CategoryGallery |

- [ ] **Step 3: Verify mobile**

Resize browser to mobile width. Both cards should stack vertically, each with image on top and text below.
