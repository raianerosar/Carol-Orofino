// src/app/[locale]/comercial/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import ProjectImageLightbox from '@/components/ProjectImageLightbox'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'comercial' })
  return { title: `${t('hero')} — Carol Orofino` }
}

export default async function ComercialPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'comercial' })

  return (
    <main className="bg-background">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative h-[75vh] min-h-[520px] w-full overflow-hidden">
        <Image
          src="/images/categories/comercial-hero.jpg"
          alt="Projetos Comerciais"
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
            Carol Orofino
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-white tracking-wide leading-none">
            {t('hero')}
          </h1>
        </div>
      </section>

      {/* ── Seção 1: texto à esquerda, imagem à direita ──────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[540px]">
        <div className="flex flex-col items-center justify-center px-8 py-16 md:px-16 md:py-20 text-center">
          <span className="font-body text-xs uppercase tracking-widest text-primary mb-6">
            {t('s1.label')}
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-text-primary tracking-wide leading-tight mb-8 whitespace-pre-line">
            {t('s1.title')}
          </h2>
          <p className="font-body text-sm text-dark leading-relaxed max-w-md mb-6">
            {t('s1.p1')}
          </p>
          <p className="font-body text-sm text-dark leading-relaxed max-w-md">
            {t('s1.p2')}
          </p>
        </div>
        <ProjectImageLightbox
          src="/images/categories/comercial-01.jpg"
          alt={t('s1.label')}
          className="min-h-[400px] md:min-h-0"
        />
      </section>

      {/* ── Seção 2: imagem à esquerda, texto à direita ──────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[540px]">
        <ProjectImageLightbox
          src="/images/categories/comercial-02.jpg"
          alt={t('s2.label')}
          className="min-h-[400px] md:min-h-0 order-2 md:order-1"
        />
        <div className="flex flex-col items-center justify-center px-8 py-16 md:px-16 md:py-20 text-center order-1 md:order-2">
          <span className="font-body text-xs uppercase tracking-widest text-primary mb-6">
            {t('s2.label')}
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-text-primary tracking-wide leading-tight mb-8 whitespace-pre-line">
            {t('s2.title')}
          </h2>
          <p className="font-body text-sm text-dark leading-relaxed max-w-md mb-6">
            {t('s2.p1')}
          </p>
          <p className="font-body text-sm text-dark leading-relaxed max-w-md">
            {t('s2.p2')}
          </p>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="flex flex-col items-center justify-center px-8 py-20 text-center border-t border-stone">
        <h2 className="font-display text-4xl md:text-5xl text-text-primary tracking-wide mb-6">
          {t('cta.title')}
        </h2>
        <p className="font-body text-sm text-dark leading-relaxed max-w-md mb-10">
          {t('cta.body')}
        </p>
        <Link
          href={`/${locale}/questionario`}
          className="font-body text-xs uppercase tracking-widest border border-text-primary text-text-primary px-8 py-3 transition-colors hover:bg-mauve hover:text-background hover:border-mauve"
        >
          {t('cta.button')}
        </Link>
      </section>
    </main>
  )
}
