// src/app/[locale]/sobre/page.tsx
import Image from 'next/image'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { routing } from '@/lib/i18n'
import { SectionDivider } from '@/components/SectionDivider'
import WhatsAppButton from '@/components/WhatsAppButton'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })
  return {
    title: t('title'),
    description: t('bio'),
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function SobrePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })

  return (
    <>
      {/* Section 1 — Hero split: photo + bio */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[560px] overflow-hidden mt-16">
        {/* Left: Photo */}
        <div className="relative min-h-[420px] md:min-h-0 overflow-hidden">
          <Image
            src="/images/carol-portrait.png"
            alt="Carol Orofino"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top"
          />
        </div>

        {/* Right: Bio */}
        <div className="flex items-center justify-center bg-sand px-8 py-16 md:px-16">
          <div className="max-w-md">
            <p className="font-body text-xs uppercase tracking-[0.35em] text-dark mb-5">
              {t('eyebrow')}
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-light italic text-primary leading-tight mb-5">
              {t('title')}
            </h1>
            <div className="w-10 h-px bg-stone my-5" />
            <p className="font-body text-sm font-light text-dark leading-relaxed">
              {t('bio')}
            </p>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Section 2 — Filosofia de Design */}
      <section className="bg-slate py-20 px-6 md:px-24">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-10 md:gap-16">
            {/* Vertical bar — desktop only */}
            <div className="hidden md:block w-px self-stretch bg-white/20 flex-shrink-0" />

            <div>
              {/* Horizontal top accent — mobile only */}
              <div className="md:hidden h-px w-10 bg-white/20 mb-6" />

              <p className="font-body text-xs uppercase tracking-[0.35em] text-white/60 mb-4">
                {t('philosophy')}
              </p>
              <blockquote className="font-display text-2xl md:text-3xl font-light italic text-white leading-[1.3] mb-6">
                {t('philosophyText')}
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Section 3 — CTA */}
      <section className="bg-sand py-20 text-center px-6">
        <div className="max-w-md mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-light italic text-primary mb-4">
            {t('ctaTitle')}
          </h2>
          <p className="font-body text-sm font-light text-dark leading-relaxed mb-10">
            {t('ctaSubtitle')}
          </p>
          <WhatsAppButton
            variant="inline"
            message={t('ctaWhatsappMessage')}
            label={t('ctaButton')}
          />
        </div>
      </section>
    </>
  )
}
