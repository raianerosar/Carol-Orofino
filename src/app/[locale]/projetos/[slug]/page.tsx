// src/app/[locale]/projetos/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { getProjectBySlug, getAllSlugs } from '@/data/projects'
import { categoryImages, categoryHeroImages, KNOWN_SLUGS, type CategorySlug } from '@/data/categories'
import { routing, type Locale } from '@/lib/i18n'
import CategoryGallery from '@/components/CategoryGallery'
import ProjectGallery from '@/components/ProjectGallery'
import WhatsAppButton from '@/components/WhatsAppButton'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const locales = routing.locales
  const projectSlugs = getAllSlugs()
  const allSlugs = [...KNOWN_SLUGS, ...projectSlugs]
  return locales.flatMap((locale) =>
    allSlugs.map((slug) => ({ locale, slug }))
  )
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://carolorofino.com.br'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params

  if (KNOWN_SLUGS.includes(slug as CategorySlug)) {
    const t = await getTranslations({ locale, namespace: 'home' })
    return { title: `${t(slug)} — Carol Orofino` }
  }

  const project = getProjectBySlug(slug)
  if (!project) return {}
  const title = project.translations[locale as Locale]?.title ?? slug
  return {
    title: `${title} — Carol Orofino`,
    openGraph: {
      images: [{ url: `${BASE_URL}${project.coverImage}`, width: 1200, height: 630 }],
    },
  }
}

export default async function ProjectOrCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params

  // Category page
  if (KNOWN_SLUGS.includes(slug as CategorySlug)) {
    const t = await getTranslations({ locale, namespace: 'home' })
    const tNotFound = await getTranslations({ locale, namespace: 'notFound' })
    const images = categoryImages[slug as CategorySlug]
    const hero = categoryHeroImages[slug as CategorySlug]

    return (
      <div className="pb-16">
        {/* Hero with floating card */}
        <div className="relative h-[70vh] w-full overflow-hidden">
          <Image
            src={hero.src}
            alt={hero.alt[locale as Locale]}
            fill
            priority
            className="object-cover"
          />
          {/* Dark gradient at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Back link top-left */}
          <Link
            href={`/${locale}`}
            className="absolute top-6 left-6 font-body text-xs uppercase tracking-widest text-white/80 hover:text-white transition-colors"
          >
            ← {tNotFound('back')}
          </Link>

          {/* Floating card at bottom */}
          <div className="absolute bottom-0 left-4 right-4 md:left-8 md:right-8 bg-background/90 backdrop-blur-sm rounded-t-2xl px-8 py-6 text-center">
            <p className="font-body text-xs uppercase tracking-[0.2em] text-primary mb-2">
              Carol Orofino
            </p>
            <h1 className="font-display text-3xl md:text-4xl tracking-wide text-text-primary">
              {t(slug)}
            </h1>
          </div>
        </div>

        {/* Gallery */}
        <div className="mt-10">
          <CategoryGallery images={images} locale={locale as Locale} />
        </div>
      </div>
    )
  }

  // Project detail page
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const t = await getTranslations({ locale, namespace: 'project' })
  const translation = project.translations[locale as Locale]
  const whatsappMessage = t('whatsappMessage', { title: translation.title })

  return (
    <article className="mx-auto max-w-5xl px-6 py-32">
      <header className="mb-12">
        <p className="font-body text-xs uppercase tracking-widest text-primary mb-3">
          {project.category} · {project.year}
        </p>
        <h1 className="font-display text-4xl md:text-6xl text-text-primary tracking-wide">
          {translation.title}
        </h1>
        <p className="mt-2 font-body text-sm text-text-primary/50">
          {project.location}
        </p>
      </header>

      <div className="relative aspect-[16/9] overflow-hidden bg-stone mb-12">
        <Image
          src={project.coverImage}
          alt={project.coverImageAlt[locale as Locale]}
          fill
          priority
          className="object-cover"
          placeholder="blur"
          blurDataURL={project.coverImageBlurDataURL}
        />
      </div>

      <div className="max-w-2xl mb-16">
        <p className="font-body text-base text-text-primary/80 leading-relaxed">
          {translation.description}
        </p>
      </div>

      <ProjectGallery images={project.images} locale={locale as Locale} />

      <div className="mt-20 flex justify-center">
        <WhatsAppButton
          message={whatsappMessage}
          label={t('whatsappCta')}
          variant="inline"
        />
      </div>
    </article>
  )
}
