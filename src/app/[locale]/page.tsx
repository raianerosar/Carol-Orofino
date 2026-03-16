// src/app/[locale]/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { getFeaturedProjects } from '@/data/projects'
import ProjectCard from '@/components/ProjectCard'
import { type Locale } from '@/lib/i18n'
import type { Metadata } from 'next'

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
  const featured = getFeaturedProjects()
  const t = await getTranslations({ locale, namespace: 'home' })

  return (
    <>
      {/* Hero */}
      <section className="relative h-screen w-full">
        {featured[0] && (
          <Image
            src={featured[0].coverImage}
            alt={featured[0].coverImageAlt[locale as Locale]}
            fill
            priority
            className="object-cover"
            placeholder="blur"
            blurDataURL={featured[0].coverImageBlurDataURL}
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="font-display text-5xl md:text-7xl tracking-logo text-white">
            Carol Orofino
          </h1>
          <p className="mt-4 font-body text-sm md:text-base uppercase tracking-widest text-white/80 max-w-xl">
            {t('tagline')}
          </p>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              locale={locale as Locale}
            />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href={`/${locale}/projetos`}
            className="font-body text-xs uppercase tracking-widest border border-text-primary px-8 py-3 text-text-primary transition-colors hover:bg-text-primary hover:text-background"
          >
            {t('viewAllProjects')}
          </Link>
        </div>
      </section>

      {/* About Teaser */}
      <section className="bg-neutral/20 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-primary tracking-wide">
            {t('aboutTitle')}
          </h2>
          <p className="mt-6 font-body text-base text-text-primary/70 leading-relaxed max-w-2xl mx-auto">
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
    </>
  )
}
