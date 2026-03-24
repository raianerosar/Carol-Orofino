// src/app/[locale]/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { posts } from '@/data/posts'
import type { Locale } from '@/lib/i18n'
import { SectionDivider } from '@/components/SectionDivider'
import { QuestionnaireSection } from '@/components/QuestionnaireSection'
import { AboutTeaser } from '@/components/AboutTeaser'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://carolorofino.com.br'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home' })
  return {
    title: 'Carol Orofino — Design de Interiores',
    description: t('tagline'),
    openGraph: {
      images: [{ url: `${BASE_URL}/og-default.jpg`, width: 1200, height: 630 }],
    },
  }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home' })
  const tBlog = await getTranslations({ locale, namespace: 'blog' })
  const tAbout = await getTranslations({ locale, namespace: 'about' })

  return (
    <>
      {/* Hero */}
      <section className="relative h-[80vh] w-full">
        {/* Mobile hero */}
        <Image
          src="/hero-mobile.png"
          alt="Carol Orofino Interior Design"
          fill
          priority
          className="object-cover md:hidden"
        />
        {/* Desktop hero */}
        <Image
          src="/hero.png"
          alt="Carol Orofino Interior Design"
          fill
          priority
          className="object-cover hidden md:block"
        />
      </section>

      {/* Specialties — two panels side by side */}
      <section className="w-full">
        <div className="py-14 text-center">
          <h2 className="font-display text-3xl md:text-4xl tracking-[0.15em] uppercase text-text-primary">
            {t('collectionsTitle')}
          </h2>
          <div className="mx-auto mt-3 h-px w-10 bg-primary" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full">
          {/* Residencial */}
          <Link
            href={`/${locale}/residencial`}
            className="group relative overflow-hidden min-h-[70vw] md:min-h-[40vw] md:max-h-[500px]"
          >
            <Image
              src="/images/categories/residencial-hero.jpg"
              alt={t('residencial')}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-black/35 transition-colors duration-300 group-hover:bg-black/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-3xl md:text-4xl font-bold tracking-[0.2em] uppercase text-white">
                {t('residencial')}
              </span>
            </div>
          </Link>
          {/* Comercial */}
          <Link
            href={`/${locale}/comercial`}
            className="group relative overflow-hidden min-h-[70vw] md:min-h-[40vw] md:max-h-[500px]"
          >
            <Image
              src="/images/categories/comercial-home.png"
              alt={t('comercial')}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-black/35 transition-colors duration-300 group-hover:bg-black/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-3xl md:text-4xl font-bold tracking-[0.2em] uppercase text-white">
                {t('comercial')}
              </span>
            </div>
          </Link>
          {/* Projetos */}
          <Link
            href={`/${locale}/projetos`}
            className="group relative overflow-hidden min-h-[56vw] md:min-h-[28vw]"
          >
            <Image
              src="/images/categories/projetos-hero.png"
              alt={t('projetos')}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-black/35 transition-colors duration-300 group-hover:bg-black/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-3xl md:text-4xl font-bold tracking-[0.2em] uppercase text-white">
                {t('projetos')}
              </span>
            </div>
          </Link>
          {/* Design de Interiores */}
          <Link
            href={`/${locale}/design-de-interiores`}
            className="group relative overflow-hidden min-h-[70vw] md:min-h-[40vw] md:max-h-[500px]"
          >
            <Image
              src="/images/categories/design-interiores-card.jpg"
              alt={t('design-de-interiores')}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-black/35 transition-colors duration-300 group-hover:bg-black/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-3xl md:text-4xl font-bold tracking-[0.2em] uppercase text-white text-center">
                {t('design-de-interiores')}
              </span>
            </div>
          </Link>
        </div>
      </section>

      <SectionDivider />

      {/* About Teaser */}
      <AboutTeaser
        locale={locale}
        eyebrow={tAbout('eyebrow')}
        title={t('aboutTitle')}
        teaser={t('aboutTeaser')}
        ctaLabel={t('aboutLink')}
      />

      <SectionDivider />

      <QuestionnaireSection
        locale={locale}
        eyebrow={t('questionnaireSectionEyebrow')}
        title={t('questionnaireSectionTitle')}
        body={t('questionnaireSectionBody')}
        cta={t('questionnaireSectionCta')}
      />

      <SectionDivider />

      {/* Blog Teaser */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="font-display text-3xl md:text-4xl font-light italic text-primary leading-tight mb-10">
            {t('blogTitle')}
          </h2>
          <div className="flex flex-col divide-y divide-stone">
            {posts.map((post) => (
              <div key={post.slug} className="py-8">
                <Link href={`/${locale}/blog/${post.slug}`} className="group">
                  <h2 className="font-display text-2xl md:text-3xl text-primary tracking-wide mb-2 group-hover:text-walnut transition-colors">
                    {post.translations[locale as Locale].title}
                  </h2>
                  <p className="font-body text-sm text-dark italic leading-relaxed mb-5">
                    {post.translations[locale as Locale].subtitle}
                  </p>
                  <span className="font-body text-xs uppercase tracking-widest text-primary border-b border-primary pb-0.5 transition-colors group-hover:text-mauve group-hover:border-mauve">
                    {tBlog('readMore')} →
                  </span>
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href={`/${locale}/blog`}
              className="inline-block bg-slate border border-white/60 px-8 py-3 font-display font-light italic text-white transition-opacity hover:opacity-80"
            >
              {t('blogLink')}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
