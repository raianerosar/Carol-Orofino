# Blog Redesign — Design Spec

**Date:** 2026-03-21
**Status:** Approved

## Overview

Redesign both blog pages (`/blog` listing and `/blog/[slug]` post) to match a two-column editorial layout with a dark cinematic hero on post pages, sidebar with highlights and categories, and optional featured images — all within the existing site color palette.

---

## 1. Data Model Changes

File: `src/data/posts.ts`

Add two fields to the `Post` interface:

```ts
export interface Post {
  slug: string
  date: string
  readTime: number
  category: string        // e.g. "Luxo", "Minimalismo", "Design Escandinavo"
  image?: string          // optional: "/images/blog/slug.jpg"
  translations: { ... }
}
```

Assign categories to existing posts:
- `the-new-language-of-luxury` → `"Luxo"`
- `the-discipline-of-subtraction` → `"Minimalismo"`
- `where-silence-has-a-shape` → `"Design Escandinavo"`

**Categories are stored as Portuguese proper-noun labels and remain untranslated across all locales.** They are brand terms, not UI strings, so they do not need locale-specific translations. The same value (`"Luxo"`, `"Minimalismo"`, `"Design Escandinavo"`) is used in all locales for both display and URL filtering.

The `image` field is optional. When absent, no image is rendered. Images are not required for launch — the structure supports them when the user adds them later. The listing page renders no thumbnail images; images appear only on the post page.

---

## 2. New Component: `BlogSidebar`

File: `src/components/BlogSidebar.tsx`

A Server Component shared by both blog pages.

**Props:**
```ts
interface BlogSidebarProps {
  locale: string
  currentSlug?: string  // omit current post from highlights
}
```

**Content:**

- **Highlights** — sort `posts` descending by `date` field (string comparison works since dates are `YYYY-MM-DD`), then filter out `currentSlug` if provided, then take the first 2 entries via `.slice(0, 2)`. If fewer than 2 posts remain after filtering, show however many are available (no special empty state needed). Each entry shows: title (as a link to `/${locale}/blog/${post.slug}`) + date formatted with `toLocaleDateString` matching the locale (`pt-BR` / `en-US` / `es-ES`), with options `{ year: 'numeric', month: 'long', day: 'numeric' }` — consistent with the existing formatting in the two blog pages.

- **Categories** — deduplicate `posts.map(p => p.category)` and sort alphabetically. Each rendered as a link to `/${locale}/blog?category=${value}`.

The sidebar uses `getTranslations({ locale, namespace: 'blog' })` to render section headings via i18n keys `sidebarHighlights` and `sidebarCategories` (see Section 6).

Styling: walnut (`#86725a`) for section headings, uppercase tracking-widest; links in slate (`#7c777d`); subtle dividers using the stone color.

---

## 3. Blog Listing Page `/blog`

File: `src/app/[locale]/blog/page.tsx`

### Rendering Mode

The listing page has no `generateStaticParams`, so it is already dynamically rendered by Next.js App Router. Adding `searchParams` does not require `export const dynamic = 'force-dynamic'` — dynamic rendering is the default for this page. No additional configuration needed.

### Component Signature

```ts
export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ category?: string }>
})
```

### Layout

Two-column grid: `grid-cols-[1fr_280px]` (main content + sidebar), max-width `max-w-6xl`, `gap-16`, `py-32 px-6`. This intentionally widens from the current `max-w-4xl` to accommodate the sidebar column.

### Main Column

1. **Page heading:** `font-display text-4xl md:text-5xl text-primary` + subtitle in uppercase tracking-widest
2. **Category filter:** row of pill/link items — `t('allCategories')` ("Todos" / "All" / "Todos") + one per unique category sorted alphabetically. Active item (matching `searchParams.category`, or "all" if absent) is highlighted with walnut border and color. Links: "all" → `/${locale}/blog`, category → `/${locale}/blog?category=${value}`.
3. **Post list:** filter `posts` by `category === searchParams.category` if present (all posts if absent). If no posts match, render `t('noPosts')` in a muted paragraph. Posts are displayed in descending date order. Each post:
   - Category label + date · read time (uppercase, xs, sage color)
   - Title: `font-display text-2xl md:text-3xl text-primary`
   - Subtitle: `font-body italic text-dark`
   - Read more link rendered as `{t('readMore')} →` — the arrow is a hardcoded Unicode character (`→`) appended as a JSX text node after the translation string, not added to the locale file. Uses the existing `readMore` i18n key.
   - Separated by `border-t border-stone`

### Sidebar Column

`BlogSidebar` component with no `currentSlug`.

---

## 4. Blog Post Page `/blog/[slug]`

File: `src/app/[locale]/blog/[slug]/page.tsx`

### Hero Section (full-width, outside main grid)

- Background: `#2a2118` (dark walnut brown — not a named theme token; use inline `style={{ backgroundColor: '#2a2118' }}` on the wrapping div)
- Layout: centered, `py-20 px-6`
- Category + date · read time: uppercase, xs, `text-latte`
- Title: `font-display text-4xl md:text-6xl text-linen tracking-wide`, centered
- Subtitle: `font-body italic text-latte text-lg`, centered

### Featured Image (full content width, below hero)

- Rendered only if `post.image` is defined. When absent, render nothing — no wrapper div, no empty space, no placeholder. The two-column layout begins immediately after the hero with no gap shift.
- When present: `<Image src={post.image} alt={content.title} width={1200} height={600} className="w-full object-cover">` — `content.title` (the localized post title) is used as the alt text.
- Contained within the `max-w-6xl mx-auto` wrapper, no horizontal padding (edge-to-edge within the content column)

### Two-Column Layout (below image)

Grid: `grid grid-cols-[1fr_280px] gap-16 py-16 px-6 max-w-6xl mx-auto`.

### Main Column

1. `← {t('backToBlog')}` link — uses existing `backToBlog` i18n key (uppercase, xs, dark)
2. Article sections: each `<section>` has:
   - Heading: `font-display text-2xl text-primary tracking-wide`
   - Body paragraphs: `font-body text-base text-dark leading-relaxed`, split on `\n\n` (existing pattern)
3. Conclusion block: `border-t border-stone pt-12 mt-16`, italic body text
4. CTA text paragraph (plain body text)
5. CTA button: link to `/${locale}/contato`, styled as outlined walnut button (`border border-primary text-primary px-8 py-3 uppercase tracking-widest text-xs hover:bg-primary hover:text-background`)

### Sidebar Column

`BlogSidebar` with `currentSlug={post.slug}` to exclude the current post from highlights.

**Static rendering note:** The post page uses `generateStaticParams` and is statically generated at build time. `BlogSidebar` is safe to use here because it derives all its data from the `posts` array (a static import) — it reads no request-time data, accepts no `searchParams`, and performs no async fetching beyond `getTranslations`. This is intentional and compatible with static generation. Implementers must not add `searchParams` or any request-time data to `BlogSidebar`.

---

## 5. Component Architecture

```
src/
  components/
    BlogSidebar.tsx        ← new, Server Component
  app/[locale]/blog/
    page.tsx               ← updated
    [slug]/
      page.tsx             ← updated
  data/
    posts.ts               ← updated (add category, image fields)
  messages/
    pt.json                ← updated (4 new blog keys)
    en.json                ← updated (4 new blog keys)
    es.json                ← updated (4 new blog keys)
```

No new routes, no new npm dependencies.

---

## 6. i18n Keys

Add the following keys to the `blog` namespace in all three locale files:

| Key                  | pt                                    | en                                  | es                                       |
|----------------------|---------------------------------------|-------------------------------------|------------------------------------------|
| `sidebarHighlights`  | `"Destaques"`                         | `"Highlights"`                      | `"Destacados"`                           |
| `sidebarCategories`  | `"Categorias"`                        | `"Categories"`                      | `"Categorías"`                           |
| `allCategories`      | `"Todos"`                             | `"All"`                             | `"Todos"`                                |
| `noPosts`            | `"Nenhum artigo nesta categoria."`    | `"No articles in this category."`   | `"No hay artículos en esta categoría."` |

Existing keys used (no changes needed): `title`, `subtitle`, `minRead`, `readMore`, `backToBlog`, `contactCta`.

---

## 7. Palette Reference

| Token       | Hex       | Usage                                      |
|-------------|-----------|--------------------------------------------|
| `linen`     | `#edeae1` | Hero title text                            |
| `sand`      | `#e0cfb3` | Page background (inherited from global)    |
| `stone`     | `#d5d0cc` | Dividers between posts                     |
| `latte`     | `#c0af9b` | Hero subtitle, sidebar secondary text      |
| `sage`      | `#95978a` | Post meta (category, date, read time)      |
| `slate`     | `#7c777d` | Body text (`dark`), sidebar links          |
| `walnut`    | `#86725a` | Headings, CTAs, active filter (`primary`)  |
| dark hero   | `#2a2118` | Post hero background (inline style)        |
