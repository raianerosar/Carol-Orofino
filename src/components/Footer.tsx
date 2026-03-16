// src/components/Footer.tsx
'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { routing, type Locale } from '@/lib/i18n'

const LOCALES: { code: Locale; label: string }[] = [
  { code: 'pt', label: 'PT' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
]

export default function Footer() {
  const t = useTranslations()
  const locale = useLocale() as Locale
  const year = new Date().getFullYear()

  return (
    <footer className="bg-dark text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="font-display text-2xl tracking-logo text-white">
              Carol Orofino
            </p>
            <p className="mt-2 font-body text-xs uppercase tracking-widest text-white/50">
              Design de Interiores
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-3">
            <Link
              href={`/${locale}/projetos`}
              className="font-body text-xs uppercase tracking-widest text-white/70 transition-colors hover:text-white"
            >
              {t('nav.projects')}
            </Link>
            <Link
              href={`/${locale}/sobre`}
              className="font-body text-xs uppercase tracking-widest text-white/70 transition-colors hover:text-white"
            >
              {t('nav.about')}
            </Link>
            <Link
              href={`/${locale}/servicos`}
              className="font-body text-xs uppercase tracking-widest text-white/70 transition-colors hover:text-white"
            >
              {t('nav.services')}
            </Link>
            <Link
              href={`/${locale}/contato`}
              className="font-body text-xs uppercase tracking-widest text-white/70 transition-colors hover:text-white"
            >
              {t('nav.contact')}
            </Link>
          </nav>

          {/* Language + Social */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              {LOCALES.map((loc, i) => (
                <span key={loc.code} className="flex items-center">
                  <Link
                    href={`/${loc.code}`}
                    className={`font-body text-xs uppercase tracking-widest transition-colors hover:text-white ${
                      locale === loc.code ? 'text-white' : 'text-white/50'
                    }`}
                  >
                    {loc.label}
                  </Link>
                  {i < LOCALES.length - 1 && (
                    <span className="mx-1 text-xs text-white/20">/</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center">
          <p className="font-body text-xs text-white/30">
            © {year} Carol Orofino. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}
