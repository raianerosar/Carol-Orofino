// src/app/[locale]/inspire-se/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { SectionDivider } from '@/components/SectionDivider'
import { StyleSection } from '@/components/StyleSection'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'inspireSe' })
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

export default async function InspireSeePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'inspireSe' })

  const styles = [
    {
      img: '/images/inspire-se/gallery-featured.png',
      title: t('classicos.title'),
      text: t('classicos.text'),
      colors: ['#D9D9D9', '#F5F5DC', '#2B2B2B', '#FFFFFF', '#1C2A44', '#EAE0D5'],
    },
    {
      img: '/images/inspire-se/contemporaneo.png',
      title: t('contemporaneo.title'),
      text: t('contemporaneo.text'),
      colors: ['#FFFFFF', '#F5F5F5', '#CFCFCF', '#2B2B2B', '#000000', '#6B8E23', '#1F3A5F', '#C65D3B', '#A47148'],
    },
    {
      img: '/images/inspire-se/minimalista.png',
      title: t('minimalista.title'),
      text: t('minimalista.text'),
      colors: ['#FFFFFF', '#F5F5F5', '#D9D9D9', '#CFCFCF', '#E8E1D9', '#BFA58A', '#2B2B2B'],
    },
    {
      img: '/images/inspire-se/escandinavo.png',
      title: t('escandinavo.title'),
      text: t('escandinavo.text'),
      colors: ['#FFFFFF', '#F2F2F2', '#D9D9D9', '#E8E3D9', '#C7BFB0', '#A3B18A', '#D6A77A', '#2E2E2E'],
    },
    {
      img: '/images/inspire-se/industrial.png',
      title: t('industrial.title'),
      text: t('industrial.text'),
      colors: ['#F2F2F2', '#B0B0B0', '#5A5A5A', '#2B2B2B', '#8C6F5A', '#A47551', '#C65D3B', '#6E6E6E', '#B87333'],
    },
    {
      img: '/images/inspire-se/japandi.png',
      title: t('japandi.title'),
      text: t('japandi.text'),
      colors: ['#F4F1EC', '#E6DDCF', '#D2C2A8', '#A1866F', '#6E5A4B', '#8C8C8C', '#7A8F6A', '#2B2B2B'],
    },
    {
      img: '/images/inspire-se/boho.png',
      title: t('boho.title'),
      text: t('boho.text'),
      colors: ['#E6C9A8', '#C97A40', '#8B5A2B', '#D4A017', '#A63D40', '#3A7D44', '#FFFFFF', '#2B2B2B'],
    },
    {
      img: '/images/inspire-se/moderno.png',
      title: t('moderno.title'),
      text: t('moderno.text'),
      colors: ['#FFFFFF', '#F2F2F2', '#BFBFBF', '#A8A8A8', '#6E6E6E', '#D9D4CC', '#2B2B2B', '#E63946', '#1D3557'],
    },
    {
      img: '/images/inspire-se/rustico.png',
      title: t('rustico.title'),
      text: t('rustico.text'),
      colors: ['#F5F0E6', '#C2A27C', '#8B5A2B', '#A0522D', '#D2691E', '#7A8450', '#6E6E6E'],
    },
    {
      img: '/images/inspire-se/provencal.png',
      title: t('provencal.title'),
      text: t('provencal.text'),
      colors: ['#FFFFFF', '#F5F0E6', '#E6D5C3', '#D8D8D8', '#C8A2C8', '#A7C7E7', '#F4C2C2', '#CDE7D8'],
    },
  ]

  return (
    <main className="bg-background">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative h-[75vh] min-h-[520px] w-full overflow-hidden">
        <Image
          src="/images/categories/design-interiores-hero.jpg"
          alt={t('heroTitle')}
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50" />
        <Link
          href={`/${locale}`}
          className="absolute top-24 left-8 md:left-16 flex items-center gap-2 font-body text-xs uppercase tracking-widest text-white/80 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          {t('back')}
        </Link>

        <div className="absolute bottom-0 left-0 right-0 px-8 pb-12 md:px-16 md:pb-16 text-center">
          <p className="font-body text-xs uppercase tracking-widest text-white/70 mb-3">
            {t('heroLabel')}
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-white tracking-wide leading-none">
            {t('heroTitle')}
          </h1>
        </div>
      </section>

      <div className="pt-16 md:pt-24" />

      {/* ── Seções de estilo ─────────────────────────────────────────────── */}
      {styles.map(({ img, title, text, colors }, index, arr) => (
        <div key={title}>
          <StyleSection
            img={img}
            title={title}
            text={text}
            colors={colors}
            reversed={index % 2 !== 0}
          />
          {index < arr.length - 1 && <SectionDivider />}
        </div>
      ))}

      <SectionDivider />

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="flex flex-col items-center justify-center px-8 py-20 text-center">
        <h2 className="font-display text-4xl md:text-5xl text-text-primary tracking-wide mb-6">
          {t('cta.title')}
        </h2>
        <p className="font-body text-sm text-dark leading-relaxed max-w-md mb-10">
          {t('cta.body')}
        </p>
        <Link
          href={`/${locale}/questionario`}
          className="bg-slate border border-white/60 px-8 py-3 font-display font-light italic text-white transition-opacity hover:opacity-80"
        >
          {t('cta.button')}
        </Link>
      </section>
    </main>
  )
}
