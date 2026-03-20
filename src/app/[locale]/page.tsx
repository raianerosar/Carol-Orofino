// src/app/[locale]/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { posts } from '@/data/posts'
import type { Locale } from '@/lib/i18n'

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
            href={`/${locale}/projetos/residencial`}
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
            href={`/${locale}/projetos/comercial`}
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
            href={`/${locale}/projetos/projetos`}
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
            href={`/${locale}/projetos/design-de-interiores`}
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

      {/* About Teaser */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-primary tracking-wide">
            {t('aboutTitle')}
          </h2>
          <p className="mt-6 font-body text-base text-dark leading-relaxed max-w-2xl mx-auto">
            {t('aboutTeaser')}
          </p>
          <Link
            href={`/${locale}/sobre`}
            className="mt-8 inline-block font-body text-xs uppercase tracking-widest border-b border-text-primary pb-0.5 text-text-primary transition-colors hover:text-primary hover:border-primary"
          >
            {t('aboutLink')}
          </Link>
        </div>
      </section>

      {/* Blog Teaser */}
      <section className="border-t border-stone py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="max-w-xl">
              <p className="font-body text-xs uppercase tracking-widest text-dark mb-4">
                {t('blogTitle')}
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-primary tracking-wide mb-4">
                {posts[0].translations[locale as Locale].title}
              </h2>
              <p className="font-body text-base text-dark italic leading-relaxed">
                {posts[0].translations[locale as Locale].subtitle}
              </p>
            </div>
            <Link
              href={`/${locale}/blog/${posts[0].slug}`}
              className="shrink-0 inline-block font-body text-xs uppercase tracking-widest text-primary border border-primary px-8 py-3 transition-colors hover:bg-primary hover:text-background"
            >
              {t('blogLink')}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
