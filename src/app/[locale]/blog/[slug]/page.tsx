// src/app/[locale]/blog/[slug]/page.tsx
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { posts } from '@/data/posts'
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

  return (
    <article className="mx-auto max-w-3xl px-6 py-32">
      {/* Back link */}
      <Link
        href={`/${locale}/blog`}
        className="font-body text-xs uppercase tracking-widest text-dark hover:text-primary transition-colors mb-12 inline-block"
      >
        ← {t('backToBlog')}
      </Link>

      {/* Meta */}
      <p className="font-body text-xs text-dark uppercase tracking-widest mt-8 mb-6">
        {new Date(post.date).toLocaleDateString(
          lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es-ES' : 'en-US',
          { year: 'numeric', month: 'long', day: 'numeric' }
        )}
        {' · '}
        {post.readTime} {t('minRead')}
      </p>

      {/* Title */}
      <h1 className="font-display text-4xl md:text-5xl text-primary tracking-wide mb-4 leading-tight">
        {content.title}
      </h1>

      {/* Subtitle */}
      <p className="font-body text-lg text-dark italic leading-relaxed mb-16 border-b border-stone pb-12">
        {content.subtitle}
      </p>

      {/* Sections */}
      <div className="flex flex-col gap-12">
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

      {/* CTA */}
      <div className="mt-12">
        <Link
          href={`/${locale}/contato`}
          className="inline-block font-body text-xs uppercase tracking-widest text-primary border border-primary px-8 py-3 transition-colors hover:bg-primary hover:text-background"
        >
          {t('contactCta')}
        </Link>
      </div>
    </article>
  )
}
