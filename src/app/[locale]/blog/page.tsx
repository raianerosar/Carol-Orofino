import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { posts } from '@/data/posts'
import BlogSidebar from '@/components/BlogSidebar'
import type { Locale } from '@/lib/i18n'
import { SectionDivider } from '@/components/SectionDivider'

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
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'blog' })
  const lang = locale as Locale

  // Sort posts descending by date
  const filteredPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="mx-auto max-w-6xl px-6 py-32">
      {/* Page heading */}
      <h1 className="font-display text-4xl md:text-5xl text-primary tracking-wide mb-4">
        {t('title')}
      </h1>
      <p className="font-body text-sm text-mauve uppercase tracking-widest mb-12">
        {t('subtitle')}
      </p>

      <SectionDivider />

      {/* Two-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16">
        {/* Main: post list */}
        <div>
          {filteredPosts.length === 0 ? (
            <p className="font-body text-sm text-sage">{t('noPosts')}</p>
          ) : (
            <div className="flex flex-col">
              {filteredPosts.map((post, index) => {
                const content = post.translations[lang]
                return (
                  <article key={post.slug}>
                    {/* Cover image — sizes accounts for 280px sidebar + 4rem gap */}
                    <Link href={`/${locale}/blog/${post.slug}`}>
                      {post.image ? (
                        <div className="relative aspect-video overflow-hidden">
                          <Image
                            src={post.image}
                            alt={content.title}
                            fill
                            priority={index === 0}
                            className="object-cover transition-transform duration-500 hover:scale-105"
                            sizes="(min-width: 1024px) calc(100vw - 280px - 4rem), 100vw"
                          />
                        </div>
                      ) : (
                        <div className="aspect-video bg-sand" />
                      )}
                    </Link>
                    {/* Text content */}
                    <div className="border-t border-stone pt-10 pb-10">
                      <p className="font-body text-xs text-mauve uppercase tracking-widest mb-4">
                        {post.category}
                        {' · '}
                        {new Date(post.date).toLocaleDateString(
                          lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es-ES' : 'en-US',
                          { year: 'numeric', month: 'long', day: 'numeric' }
                        )}
                        {' · '}
                        {post.readTime} {t('minRead')}
                      </p>
                      <Link href={`/${locale}/blog/${post.slug}`} className="group">
                        <h2 className="font-display text-2xl md:text-3xl text-primary tracking-wide mb-3 group-hover:text-walnut transition-colors">
                          {content.title}
                        </h2>
                        <p className="font-body text-base text-dark italic leading-relaxed mb-6">
                          {content.subtitle}
                        </p>
                      </Link>
                      <Link
                        href={`/${locale}/blog/${post.slug}`}
                        className="font-body text-xs uppercase tracking-widest text-primary border-b border-primary pb-0.5 transition-colors hover:text-mauve hover:border-mauve"
                      >
                        {t('readMore')} →
                      </Link>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <BlogSidebar locale={locale as Locale} />
      </div>
    </div>
  )
}
