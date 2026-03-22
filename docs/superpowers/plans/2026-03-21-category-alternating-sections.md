# Category Alternating Sections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the static 2-image gallery on four category sub-pages (residencial, comercial, design-de-interiores, projetos) with alternating image+text sections, one per project in the category.

**Architecture:** Add `getProjectsByCategory()` to the projects data layer, then update the category branch of `ProjectOrCategoryPage` to render alternating sections for four slugs while keeping `<CategoryGallery>` for `reforma`.

**Tech Stack:** Next.js 14 App Router, next-intl (pt/en/es), Tailwind CSS, Jest

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/data/projects.ts` | Modify | Add `getProjectsByCategory()` function |
| `src/data/__tests__/projects.test.ts` | Modify | Add tests for `getProjectsByCategory()` |
| `src/app/[locale]/projetos/[slug]/page.tsx` | Modify | Split category rendering: alternating sections vs CategoryGallery |

---

## Task 1: Add `getProjectsByCategory()` to the data layer

**Files:**
- Modify: `src/data/projects.ts`
- Modify: `src/data/__tests__/projects.test.ts`

- [ ] **Step 1: Write the failing tests**

Open `src/data/__tests__/projects.test.ts` and add at the end of the `describe` block:

```ts
import { projects, getFeaturedProjects, getProjectBySlug, getProjectsByCategory } from '../projects'

// (add these inside the existing describe block)

  it('getProjectsByCategory should return projects matching the given category', () => {
    const residencial = getProjectsByCategory('residencial')
    residencial.forEach((p) => expect(p.category).toBe('residencial'))
  })

  it('getProjectsByCategory with "projetos" should return all projects', () => {
    // 'projetos' is a special slug — no Project has category:'projetos',
    // so the function returns the full array as a special case
    const all = getProjectsByCategory('projetos')
    expect(all).toEqual(projects)
  })

  it('getProjectsByCategory should return empty array for a category with no projects', () => {
    // 'design-de-interiores' may have zero projects — that is a valid empty result
    const result = getProjectsByCategory('design-de-interiores')
    expect(Array.isArray(result)).toBe(true)
    result.forEach((p) => expect(p.category).toBe('design-de-interiores'))
  })
```

> Note: also update the import at the top of the test file to include `getProjectsByCategory`.

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd /c/Carol-Orofino && npx jest src/data/__tests__/projects.test.ts --no-coverage
```

Expected: 3 new tests FAIL with "getProjectsByCategory is not a function" (or similar import error).

- [ ] **Step 3: Implement `getProjectsByCategory()` in `src/data/projects.ts`**

First, add the import at the **top** of `src/data/projects.ts`, alongside the existing imports:

```ts
import type { CategorySlug } from '@/data/categories'
```

Then, add the function at the end of the file, after `getAllSlugs()`:

```ts
export function getProjectsByCategory(slug: CategorySlug): Project[] {
  // 'projetos' has no matching Project.category value — return all projects
  if (slug === 'projetos') return projects
  // For all other slugs, Project.category matches the slug directly
  return projects.filter((p) => p.category === (slug as Project['category']))
}
```

> Note: `CategorySlug` is defined in `src/data/categories.ts` and includes `'projetos'` which is not in `Project['category']`. The early-return guard prevents an always-empty filter for `'projetos'`.

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd /c/Carol-Orofino && npx jest src/data/__tests__/projects.test.ts --no-coverage
```

Expected: All tests PASS.

- [ ] **Step 5: Commit**

```bash
cd /c/Carol-Orofino && git add src/data/projects.ts src/data/__tests__/projects.test.ts
git commit -m "feat: add getProjectsByCategory data function"
```

---

## Task 2: Update the category page to render alternating sections

**Files:**
- Modify: `src/app/[locale]/projetos/[slug]/page.tsx`

- [ ] **Step 1: Update the imports**

In `src/app/[locale]/projetos/[slug]/page.tsx`, change line 6 from:

```ts
import { getProjectBySlug, getAllSlugs } from '@/data/projects'
```

to:

```ts
import { getProjectBySlug, getAllSlugs, getProjectsByCategory } from '@/data/projects'
```

> **Important:** Line 7 (`import { categoryImages, categoryHeroImages, KNOWN_SLUGS, type CategorySlug } from '@/data/categories'`) must **remain unchanged**. `categoryImages` is still used in the `reforma` branch.

- [ ] **Step 2: Add the `ALTERNATING_SLUGS` constant**

After the `BASE_URL` constant (line 23), add:

```ts
const ALTERNATING_SLUGS: CategorySlug[] = [
  'residencial',
  'comercial',
  'design-de-interiores',
  'projetos',
]
```

- [ ] **Step 3: Replace the category rendering block**

Find the category block (lines 56–115 in the original file) — it starts with:
```ts
if (KNOWN_SLUGS.includes(slug as CategorySlug)) {
```
and ends with its closing `}`.

Replace the entire block with the following:

```tsx
  // Category page
  if (KNOWN_SLUGS.includes(slug as CategorySlug)) {
    const t = await getTranslations({ locale, namespace: 'home' })
    const tNotFound = await getTranslations({ locale, namespace: 'notFound' })
    const hero = categoryHeroImages[slug as CategorySlug]

    // Hero JSX — shared for all category slugs
    const heroJSX = (
      <div className="relative">
        {/* Image container */}
        <div className="relative aspect-[9/16] md:h-auto md:aspect-[21/9] w-full overflow-hidden">
          {hero.mobileSrc && (
            <Image
              src={hero.mobileSrc}
              alt={hero.alt[locale as Locale]}
              fill
              priority
              className="object-cover md:hidden"
            />
          )}
          <Image
            src={hero.src}
            alt={hero.alt[locale as Locale]}
            fill
            priority
            className={`object-cover${hero.mobileSrc ? ' hidden md:block' : ''}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <Link
            href={`/${locale}`}
            className="absolute top-20 left-6 font-body text-xs uppercase tracking-widest text-white/80 hover:text-white transition-colors"
          >
            ← {tNotFound('back')}
          </Link>
        </div>
        {/* Floating card */}
        <div className="relative mx-4 md:mx-8 -mt-12 bg-background rounded-2xl px-8 py-7 text-center shadow-sm">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-primary mb-2">
            Carol Orofino
          </p>
          <h1 className="font-display text-3xl md:text-4xl tracking-wide text-text-primary">
            {t(slug)}
          </h1>
        </div>
      </div>
    )

    // Alternating sections for residencial, comercial, design-de-interiores, projetos
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
                  <div className="relative w-full md:w-[55%] aspect-[4/3] overflow-hidden flex-shrink-0">
                    <Image
                      src={project.coverImage}
                      alt={project.coverImageAlt[locale as Locale]}
                      fill
                      sizes="(max-width: 768px) 100vw, 55vw"
                      className="object-cover"
                    />
                  </div>

                  {/* Text column — 45% desktop */}
                  <div className="w-full md:w-[45%] flex flex-col justify-center px-6 md:px-12 py-8 md:py-0">
                    <p className="font-body text-xs uppercase tracking-widest text-primary mb-3">
                      {project.location} · {project.year}
                    </p>
                    <h2 className="font-display text-3xl md:text-4xl text-text-primary tracking-wide mb-4">
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

    // reforma — keep existing CategoryGallery
    const images = categoryImages[slug as CategorySlug]
    return (
      <div className="pb-16">
        {heroJSX}
        <div className="mt-10">
          <CategoryGallery images={images} locale={locale as Locale} />
        </div>
      </div>
    )
  }
```

- [ ] **Step 4: Verify the build compiles without errors**

```bash
cd /c/Carol-Orofino && npx tsc --noEmit
```

Expected: No TypeScript errors.

- [ ] **Step 5: Run the full test suite**

```bash
cd /c/Carol-Orofino && npx jest --no-coverage
```

Expected: All tests PASS.

- [ ] **Step 6: Commit**

```bash
cd /c/Carol-Orofino && git add src/app/\[locale\]/projetos/\[slug\]/page.tsx
git commit -m "feat: add alternating project sections to category pages"
```

---

## Task 3: Manual visual verification

- [ ] **Step 1: Start the dev server**

```bash
cd /c/Carol-Orofino && npm run dev
```

- [ ] **Step 2: Check each affected page in the browser**

Open each URL and verify:
- Hero image + floating card appears at top ✓
- Alternating sections appear below the hero ✓
- Section 0 (first project): image LEFT, text RIGHT on desktop ✓
- Section 1 (second project, if exists): text LEFT, image RIGHT on desktop ✓
- Mobile: image stacked above text for every section ✓

Pages to check:
- `http://localhost:3000/pt/projetos/residencial`
- `http://localhost:3000/pt/projetos/comercial`
- `http://localhost:3000/pt/projetos/design-de-interiores`
- `http://localhost:3000/pt/projetos/projetos`

- [ ] **Step 3: Verify `reforma` is unchanged**

- `http://localhost:3000/pt/projetos/reforma` — must still show the 2-image gallery (no alternating sections)
