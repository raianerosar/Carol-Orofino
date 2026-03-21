# Blog Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign both blog pages to a two-column editorial layout with a dark hero on the post page, sidebar with highlights and categories, and optional featured images — using the existing site color palette.

**Architecture:** A new `BlogSidebar` Server Component is shared between listing and post pages. Category filtering uses URL `?category=` search params, read server-side (no client JS). The `Post` data model gains `category: string` and `image?: string` fields. All changes are in existing files plus one new file.

**Tech Stack:** Next.js 14+ App Router, next-intl, Tailwind CSS v4, TypeScript, Jest + React Testing Library

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Modify | `src/messages/pt.json` | Add 4 new blog i18n keys |
| Modify | `src/messages/en.json` | Add 4 new blog i18n keys |
| Modify | `src/messages/es.json` | Add 4 new blog i18n keys |
| Modify | `src/data/posts.ts` | Add `category` + `image` fields to `Post` interface and all existing posts |
| Create | `src/components/BlogSidebar.tsx` | Sidebar: highlights (2 recent) + category links |
| Create | `src/components/__tests__/BlogSidebar.test.tsx` | Unit tests for BlogSidebar |
| Modify | `src/app/[locale]/blog/page.tsx` | Two-column layout, category filter, post list |
| Modify | `src/app/[locale]/blog/[slug]/page.tsx` | Dark hero, optional image, two-column layout |

---

## Task 1: Add i18n keys

**Files:**
- Modify: `src/messages/pt.json`
- Modify: `src/messages/en.json`
- Modify: `src/messages/es.json`

- [ ] **Step 1: Add keys to pt.json**

  Find the `"blog"` object and add 4 keys after `"contactCta"`:

  ```json
  "sidebarHighlights": "Destaques",
  "sidebarCategories": "Categorias",
  "allCategories": "Todos",
  "noPosts": "Nenhum artigo nesta categoria."
  ```

- [ ] **Step 2: Add keys to en.json**

  Find the `"blog"` object and add 4 keys after `"contactCta"`:

  ```json
  "sidebarHighlights": "Highlights",
  "sidebarCategories": "Categories",
  "allCategories": "All",
  "noPosts": "No articles in this category."
  ```

- [ ] **Step 3: Add keys to es.json**

  Find the `"blog"` object and add 4 keys after `"contactCta"`:

  ```json
  "sidebarHighlights": "Destacados",
  "sidebarCategories": "Categorías",
  "allCategories": "Todos",
  "noPosts": "No hay artículos en esta categoría."
  ```

- [ ] **Step 4: Commit**

  ```bash
  git add src/messages/pt.json src/messages/en.json src/messages/es.json
  git commit -m "feat(i18n): add blog sidebar and category filter translation keys"
  ```

---

## Task 2: Extend Post data model

**Files:**
- Modify: `src/data/posts.ts`

- [ ] **Step 1: Update the `Post` interface**

  Add two fields after `readTime`:

  ```ts
  export interface Post {
    slug: string
    date: string
    readTime: number
    category: string   // Portuguese brand term, not translated
    image?: string     // optional: "/images/blog/slug.jpg"
    translations: {
      // ... existing translations unchanged
  ```

- [ ] **Step 2: Add `category` to each existing post object**

  Add the `category` field after `readTime` in each post object:

  - `the-new-language-of-luxury`: `category: 'Luxo'`
  - `the-discipline-of-subtraction`: `category: 'Minimalismo'`
  - `where-silence-has-a-shape`: `category: 'Design Escandinavo'`

  Do not add an `image` field to any post — it is optional and will be populated later.

- [ ] **Step 3: Verify TypeScript compiles with no errors**

  ```bash
  npx tsc --noEmit
  ```

  Expected: no output (zero errors).

- [ ] **Step 4: Run existing data tests**

  ```bash
  npm test -- --testPathPattern="src/data/__tests__/projects"
  ```

  Expected: all pass (verifies nothing in the data layer broke).

- [ ] **Step 5: Commit**

  ```bash
  git add src/data/posts.ts
  git commit -m "feat(data): add category and optional image fields to Post"
  ```

---

## Task 3: Create BlogSidebar component

**Files:**
- Create: `src/components/BlogSidebar.tsx`
- Create: `src/components/__tests__/BlogSidebar.test.tsx`

The sidebar is a Server Component. It accepts `locale` and an optional `currentSlug`. It renders:
1. A "Highlights" section — 2 most recent posts (excluding `currentSlug`)
2. A "Categories" section — deduplicated, alphabetically sorted category links

### Step 1–4: Write and validate the test first (TDD)

- [ ] **Step 1: Create the test file**

  `src/components/__tests__/BlogSidebar.test.tsx`:

  ```tsx
  import { render, screen } from '@testing-library/react'
  import BlogSidebar from '../BlogSidebar'

  // Mock next-intl
  jest.mock('next-intl/server', () => ({
    getTranslations: jest.fn().mockResolvedValue((key: string) => key),
  }))

  // Mock next/link
  jest.mock('next/link', () => ({
    __esModule: true,
    default: ({ children, href }: { children: React.ReactNode; href: string }) => (
      <a href={href}>{children}</a>
    ),
  }))

  // Mock posts with known data for deterministic tests
  jest.mock('@/data/posts', () => ({
    posts: [
      { slug: 'post-a', date: '2025-03-01', readTime: 5, category: 'Luxo', translations: { pt: { title: 'Post A' }, en: { title: 'Post A EN' }, es: { title: 'Post A ES' } } },
      { slug: 'post-b', date: '2025-03-20', readTime: 4, category: 'Minimalismo', translations: { pt: { title: 'Post B' }, en: { title: 'Post B EN' }, es: { title: 'Post B ES' } } },
      { slug: 'post-c', date: '2025-03-10', readTime: 6, category: 'Luxo', translations: { pt: { title: 'Post C' }, en: { title: 'Post C EN' }, es: { title: 'Post C ES' } } },
    ],
  }))

  describe('BlogSidebar', () => {
    it('renders the 2 most recent posts as highlights', async () => {
      const ui = await BlogSidebar({ locale: 'pt' })
      render(ui)
      // post-b (2025-03-20) and post-c (2025-03-10) are the 2 most recent
      expect(screen.getByText('Post B')).toBeInTheDocument()
      expect(screen.getByText('Post C')).toBeInTheDocument()
      expect(screen.queryByText('Post A')).not.toBeInTheDocument()
    })

    it('excludes currentSlug from highlights', async () => {
      const ui = await BlogSidebar({ locale: 'pt', currentSlug: 'post-b' })
      render(ui)
      // post-b excluded; should show post-c and post-a
      expect(screen.queryByText('Post B')).not.toBeInTheDocument()
      expect(screen.getByText('Post C')).toBeInTheDocument()
      expect(screen.getByText('Post A')).toBeInTheDocument()
    })

    it('renders deduplicated categories sorted alphabetically', async () => {
      const ui = await BlogSidebar({ locale: 'pt' })
      render(ui)
      const links = screen.getAllByRole('link').filter(l =>
        ['Luxo', 'Minimalismo'].includes(l.textContent ?? '')
      )
      // Luxo appears once (deduplicated), Minimalismo appears once
      const categoryTexts = links.map(l => l.textContent)
      expect(categoryTexts).toEqual(['Luxo', 'Minimalismo']) // alphabetical
    })

    it('links highlights to the correct post URL', async () => {
      const ui = await BlogSidebar({ locale: 'pt' })
      render(ui)
      const postBLink = screen.getByRole('link', { name: /Post B/ })
      expect(postBLink).toHaveAttribute('href', '/pt/blog/post-b')
    })

    it('links categories to filtered blog URL', async () => {
      const ui = await BlogSidebar({ locale: 'pt' })
      render(ui)
      const luxoLink = screen.getByRole('link', { name: 'Luxo' })
      expect(luxoLink).toHaveAttribute('href', '/pt/blog?category=Luxo')
    })
  })
  ```

- [ ] **Step 2: Run the tests — expect them to fail (component doesn't exist)**

  ```bash
  npm test -- --testPathPattern="BlogSidebar" --no-coverage
  ```

  Expected: FAIL with "Cannot find module '../BlogSidebar'"

- [ ] **Step 3: Create the BlogSidebar component**

  `src/components/BlogSidebar.tsx`:

  ```tsx
  import { getTranslations } from 'next-intl/server'
  import Link from 'next/link'
  import { posts } from '@/data/posts'
  import type { Locale } from '@/lib/i18n'

  interface BlogSidebarProps {
    locale: string
    currentSlug?: string
  }

  export default async function BlogSidebar({ locale, currentSlug }: BlogSidebarProps) {
    const t = await getTranslations({ locale, namespace: 'blog' })
    const lang = locale as Locale

    // Highlights: sort descending by date, exclude current post, take first 2
    const highlights = [...posts]
      .sort((a, b) => b.date.localeCompare(a.date))
      .filter((p) => p.slug !== currentSlug)
      .slice(0, 2)

    // Categories: deduplicate and sort alphabetically
    const categories = [...new Set(posts.map((p) => p.category))].sort()

    const localeCode =
      lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es-ES' : 'en-US'

    return (
      <aside className="flex flex-col gap-10">
        {/* Highlights */}
        <div>
          <p className="font-body text-xs uppercase tracking-widest text-primary mb-4">
            {t('sidebarHighlights')}
          </p>
          <div className="flex flex-col gap-4">
            {highlights.map((post) => (
              <div key={post.slug} className="border-t border-stone pt-4">
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="font-body text-sm text-dark hover:text-primary transition-colors leading-snug"
                >
                  {post.translations[lang].title}
                </Link>
                <p className="font-body text-xs text-sage mt-1">
                  {new Date(post.date).toLocaleDateString(localeCode, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <p className="font-body text-xs uppercase tracking-widest text-primary mb-4">
            {t('sidebarCategories')}
          </p>
          <div className="flex flex-col gap-2">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/${locale}/blog?category=${cat}`}
                className="font-body text-sm text-dark hover:text-primary transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </aside>
    )
  }
  ```

- [ ] **Step 4: Run the tests — expect them to pass**

  ```bash
  npm test -- --testPathPattern="BlogSidebar" --no-coverage
  ```

  Expected: 5 tests PASS

- [ ] **Step 5: Commit**

  ```bash
  git add src/components/BlogSidebar.tsx src/components/__tests__/BlogSidebar.test.tsx
  git commit -m "feat: add BlogSidebar component with highlights and category links"
  ```

---

## Task 4: Redesign blog listing page

**Files:**
- Modify: `src/app/[locale]/blog/page.tsx`

- [ ] **Step 1: Replace the full file content**

  `src/app/[locale]/blog/page.tsx`:

  ```tsx
  import { getTranslations } from 'next-intl/server'
  import Link from 'next/link'
  import type { Metadata } from 'next'
  import { posts } from '@/data/posts'
  import BlogSidebar from '@/components/BlogSidebar'
  import type { Locale } from '@/lib/i18n'

  export async function generateMetadata({
    params,
  }: {
    params: Promise<{ locale: string }>
  }): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'blog' })
    return { title: `${t('title')} — Carol Orofino` }
  }

  export default async function BlogPage({
    params,
    searchParams,
  }: {
    params: Promise<{ locale: string }>
    searchParams: Promise<{ category?: string }>
  }) {
    const { locale } = await params
    const { category } = await searchParams
    const t = await getTranslations({ locale, namespace: 'blog' })
    const lang = locale as Locale

    // Deduplicated, sorted categories for the filter row
    const allCategories = [...new Set(posts.map((p) => p.category))].sort()

    // Sort posts descending by date, then filter by category if active
    const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date))
    const filteredPosts = category
      ? sortedPosts.filter((p) => p.category === category)
      : sortedPosts

    return (
      <div className="mx-auto max-w-6xl px-6 py-32">
        {/* Page heading */}
        <h1 className="font-display text-4xl md:text-5xl text-primary tracking-wide mb-4">
          {t('title')}
        </h1>
        <p className="font-body text-sm text-dark uppercase tracking-widest mb-12">
          {t('subtitle')}
        </p>

        {/* Category filter */}
        <div className="flex flex-wrap gap-3 mb-16">
          <Link
            href={`/${locale}/blog`}
            className={`font-body text-xs uppercase tracking-widest px-4 py-1.5 border transition-colors ${
              !category
                ? 'border-primary text-primary'
                : 'border-stone text-dark hover:border-primary hover:text-primary'
            }`}
          >
            {t('allCategories')}
          </Link>
          {allCategories.map((cat) => (
            <Link
              key={cat}
              href={`/${locale}/blog?category=${cat}`}
              className={`font-body text-xs uppercase tracking-widest px-4 py-1.5 border transition-colors ${
                category === cat
                  ? 'border-primary text-primary'
                  : 'border-stone text-dark hover:border-primary hover:text-primary'
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16">
          {/* Main: post list */}
          <div>
            {filteredPosts.length === 0 ? (
              <p className="font-body text-sm text-sage">{t('noPosts')}</p>
            ) : (
              <div className="flex flex-col">
                {filteredPosts.map((post) => {
                  const content = post.translations[lang]
                  return (
                    <article
                      key={post.slug}
                      className="border-t border-stone pt-10 pb-10 group"
                    >
                      <p className="font-body text-xs text-sage uppercase tracking-widest mb-4">
                        {post.category}
                        {' · '}
                        {new Date(post.date).toLocaleDateString(
                          lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es-ES' : 'en-US',
                          { year: 'numeric', month: 'long', day: 'numeric' }
                        )}
                        {' · '}
                        {post.readTime} {t('minRead')}
                      </p>
                      <h2 className="font-display text-2xl md:text-3xl text-primary tracking-wide mb-3">
                        {content.title}
                      </h2>
                      <p className="font-body text-base text-dark italic leading-relaxed mb-6">
                        {content.subtitle}
                      </p>
                      <Link
                        href={`/${locale}/blog/${post.slug}`}
                        className="font-body text-xs uppercase tracking-widest text-primary border-b border-primary pb-0.5 transition-opacity hover:opacity-60"
                      >
                        {t('readMore')} →
                      </Link>
                    </article>
                  )
                })}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <BlogSidebar locale={locale} />
        </div>
      </div>
    )
  }
  ```

- [ ] **Step 2: Verify TypeScript compiles**

  ```bash
  npx tsc --noEmit
  ```

  Expected: no errors.

- [ ] **Step 4: Run all tests**

  ```bash
  npm test -- --no-coverage
  ```

  Expected: all tests pass.

- [ ] **Step 5: Commit**

  ```bash
  git add src/app/[locale]/blog/page.tsx
  git commit -m "feat(blog): two-column listing page with category filter and sidebar"
  ```

---

## Task 5: Redesign blog post page

**Files:**
- Modify: `src/app/[locale]/blog/[slug]/page.tsx`

- [ ] **Step 1: Replace the full file content**

  `src/app/[locale]/blog/[slug]/page.tsx`:

  ```tsx
  import { getTranslations } from 'next-intl/server'
  import Link from 'next/link'
  import Image from 'next/image'
  import { notFound } from 'next/navigation'
  import type { Metadata } from 'next'
  import { posts } from '@/data/posts'
  import BlogSidebar from '@/components/BlogSidebar'
  import type { Locale } from '@/lib/i18n'

  export async function generateStaticParams() {
    const locales: Locale[] = ['pt', 'en', 'es']
    return locales.flatMap((locale) =>
      posts.map((post) => ({ locale, slug: post.slug }))
    )
  }

  export async function generateMetadata({
    params,
  }: {
    params: Promise<{ locale: string; slug: string }>
  }): Promise<Metadata> {
    const { locale, slug } = await params
    const post = posts.find((p) => p.slug === slug)
    if (!post) return {}
    const content = post.translations[locale as Locale]
    return { title: `${content.title} — Carol Orofino` }
  }

  export default async function BlogPostPage({
    params,
  }: {
    params: Promise<{ locale: string; slug: string }>
  }) {
    const { locale, slug } = await params
    const post = posts.find((p) => p.slug === slug)
    if (!post) notFound()

    const lang = locale as Locale
    const content = post.translations[lang]
    const t = await getTranslations({ locale, namespace: 'blog' })

    const localeCode =
      lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es-ES' : 'en-US'

    return (
      <>
        {/* Hero — full viewport width, dark background */}
        <div
          className="w-full text-center py-20 px-6"
          style={{ backgroundColor: '#2a2118' }}
        >
          <p className="font-body text-xs text-latte uppercase tracking-widest mb-6">
            {post.category}
            {' · '}
            {new Date(post.date).toLocaleDateString(localeCode, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
            {' · '}
            {post.readTime} {t('minRead')}
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-linen tracking-wide leading-tight mb-6 max-w-4xl mx-auto">
            {content.title}
          </h1>
          <p className="font-body text-lg text-latte italic max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        {/* Featured image — only if post.image is defined */}
        {post.image && (
          <div className="max-w-6xl mx-auto">
            <Image
              src={post.image}
              alt={content.title}
              width={1200}
              height={600}
              className="w-full object-cover"
            />
          </div>
        )}

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16 py-16 px-6 max-w-6xl mx-auto">
          {/* Main: article content */}
          <article>
            <Link
              href={`/${locale}/blog`}
              className="font-body text-xs uppercase tracking-widest text-dark hover:text-primary transition-colors mb-12 inline-block"
            >
              ← {t('backToBlog')}
            </Link>

            {/* Sections */}
            <div className="flex flex-col gap-12 mt-8">
              {content.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-display text-2xl text-primary tracking-wide mb-5">
                    {section.heading}
                  </h2>
                  <div className="flex flex-col gap-4">
                    {section.body.split('\n\n').map((paragraph, i) => (
                      <p
                        key={i}
                        className="font-body text-base text-dark leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* Conclusion */}
            <div className="mt-16 border-t border-stone pt-12">
              <p className="font-body text-base text-dark leading-relaxed italic mb-8">
                {content.conclusion}
              </p>
              <p className="font-body text-sm text-dark leading-relaxed">
                {content.cta}
              </p>
            </div>

            {/* CTA button */}
            <div className="mt-12">
              <Link
                href={`/${locale}/contato`}
                className="inline-block font-body text-xs uppercase tracking-widest border border-primary text-primary px-8 py-3 transition-colors hover:bg-primary hover:text-background"
              >
                {t('contactCta')}
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <BlogSidebar locale={locale} currentSlug={post.slug} />
        </div>
      </>
    )
  }
  ```

- [ ] **Step 2: Verify TypeScript compiles**

  ```bash
  npx tsc --noEmit
  ```

  Expected: no errors.

- [ ] **Step 3: Run all tests**

  ```bash
  npm test -- --no-coverage
  ```

  Expected: all tests pass.

- [ ] **Step 4: Start the dev server and manually verify both pages**

  ```bash
  npm run dev
  ```

  Open:
  - `http://localhost:3000/pt/blog` — verify two-column layout, category filter, all 3 posts listed
  - `http://localhost:3000/pt/blog?category=Luxo` — verify only "A Nova Linguagem do Luxo" appears
  - `http://localhost:3000/pt/blog?category=XYZ` — verify "Nenhum artigo nesta categoria." message
  - `http://localhost:3000/pt/blog/the-new-language-of-luxury` — verify dark hero, two-column layout, no image (post has none)
  - `http://localhost:3000/en/blog` — verify English labels ("Highlights", "Categories", "All")

- [ ] **Step 5: Commit**

  ```bash
  git add src/app/[locale]/blog/[slug]/page.tsx
  git commit -m "feat(blog): dark hero, optional featured image, two-column post layout"
  ```

---

## Task 6: Final verification

- [ ] **Step 1: Run the full test suite**

  ```bash
  npm test -- --no-coverage
  ```

  Expected: all tests pass.

- [ ] **Step 2: TypeScript full check**

  ```bash
  npx tsc --noEmit
  ```

  Expected: no errors.

- [ ] **Step 3: Build check**

  ```bash
  npm run build
  ```

  Expected: successful build with no errors. Static params for `/blog/[slug]` should generate 9 routes (3 posts × 3 locales).
