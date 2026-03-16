// src/app/[locale]/projetos/[categoria]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { routing, type Locale } from '@/lib/i18n'
import { categoryImages, KNOWN_SLUGS, type CategorySlug } from '@/data/categories'
import CategoryGallery from '@/components/CategoryGallery'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    KNOWN_SLUGS.map((categoria) => ({ locale, categoria }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; categoria: string }>
}): Promise<Metadata> {
  const { locale, categoria } = await params
  if (!KNOWN_SLUGS.includes(categoria as CategorySlug)) return {}
  const t = await getTranslations({ locale, namespace: 'home' })
  return { title: `${t(categoria)} — Carol Orofino` }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; categoria: string }>
}) {
  const { locale, categoria } = await params

  if (!KNOWN_SLUGS.includes(categoria as CategorySlug)) notFound()

  const t = await getTranslations({ locale, namespace: 'home' })
  const tNotFound = await getTranslations({ locale, namespace: 'notFound' })
  const images = categoryImages[categoria as CategorySlug]

  return (
    <div className="pt-24 pb-16">
      {/* Header */}
      <div className="text-center mb-10 px-6">
        <Link
          href={`/${locale}`}
          className="font-body text-xs uppercase tracking-widest text-text-primary/50 hover:text-primary transition-colors"
        >
          ← {tNotFound('back')}
        </Link>
        <h1 className="font-display text-4xl md:text-5xl tracking-[0.15em] uppercase text-text-primary mt-4">
          {t(categoria)}
        </h1>
        <div className="mx-auto mt-3 h-px w-10 bg-primary" />
      </div>

      {/* Gallery */}
      <CategoryGallery images={images} locale={locale as Locale} />
    </div>
  )
}
