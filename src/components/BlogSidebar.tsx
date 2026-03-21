import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { posts } from '@/data/posts'
import type { Locale } from '@/lib/i18n'

interface BlogSidebarProps {
  locale: Locale
  currentSlug?: string
}

export default async function BlogSidebar({ locale, currentSlug }: BlogSidebarProps) {
  const t = await getTranslations({ locale, namespace: 'blog' })

  // Highlights: sort descending by date, exclude current post, take first 2
  const highlights = [...posts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 2)

  // Categories: deduplicate and sort alphabetically
  const categories = [...new Set(posts.map((p) => p.category))].sort()

  const localeCode =
    locale === 'pt' ? 'pt-BR' : locale === 'es' ? 'es-ES' : 'en-US'

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
                {post.translations[locale].title}
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
              href={`/${locale}/blog?category=${encodeURIComponent(cat)}`}
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
