// src/app/[locale]/blog/page.tsx
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import type { Metadata } from 'next'
import { posts } from '@/data/posts'
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
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'blog' })
  const lang = locale as Locale

  return (
    <div className="mx-auto max-w-4xl px-6 py-32">
      <h1 className="font-display text-4xl md:text-5xl text-primary tracking-wide mb-4">
        {t('title')}
      </h1>
      <p className="font-body text-sm text-dark uppercase tracking-widest mb-16">
        {t('subtitle')}
      </p>

      <div className="flex flex-col gap-12">
        {posts.map((post) => {
          const content = post.translations[lang]
          return (
            <article
              key={post.slug}
              className="border-t border-stone pt-10 group"
            >
              <p className="font-body text-xs text-dark uppercase tracking-widest mb-4">
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
                {t('readMore')}
              </Link>
            </article>
          )
        })}
      </div>
    </div>
  )
}
