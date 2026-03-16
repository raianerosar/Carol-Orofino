// src/app/[locale]/projetos/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { getProjectBySlug, getAllSlugs } from '@/data/projects'
import { routing, type Locale } from '@/lib/i18n'
import ProjectGallery from '@/components/ProjectGallery'
import WhatsAppButton from '@/components/WhatsAppButton'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const locales = routing.locales
  const slugs = getAllSlugs()
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  )
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://carolorofino.com.br'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
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

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) notFound()

  const t = await getTranslations({ locale, namespace: 'project' })
  const translation = project.translations[locale as Locale]
  const whatsappMessage = t('whatsappMessage', { title: translation.title })

  return (
    <article className="mx-auto max-w-5xl px-6 py-32">
      {/* Header */}
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

      {/* Cover image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-neutral mb-12">
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

      {/* Description */}
      <div className="max-w-2xl mb-16">
        <p className="font-body text-base text-text-primary/80 leading-relaxed">
          {translation.description}
        </p>
      </div>

      {/* Gallery */}
      <ProjectGallery images={project.images} locale={locale as Locale} />

      {/* WhatsApp CTA */}
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
