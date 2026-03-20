// src/components/Navbar.tsx
'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { type Locale } from '@/lib/i18n'

const LOCALES: { code: Locale; label: string }[] = [
  { code: 'pt', label: 'PT' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
]

interface NavbarProps {
  transparent?: boolean
}

export default function Navbar({ transparent = false }: NavbarProps) {
  const t = useTranslations('nav')
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    if (!transparent) return
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [transparent])

  const isTransparentMode = transparent && !scrolled

  const navLinksLeft = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/projetos`, label: t('projectsShort') },
    { href: `/${locale}/sobre`, label: t('about') },
  ]

  const navLinksRight = [
    { href: `/${locale}/servicos`, label: t('services') },
    { href: `/${locale}/blog`, label: t('blog') },
    { href: `/${locale}/contato`, label: t('contact') },
  ]

  const navLinks = [...navLinksLeft, ...navLinksRight]

  function switchLocale(newLocale: Locale) {
    // Replace the locale prefix in the current path
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
    setDrawerOpen(false)
  }

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  const whatsappUrl = `https://wa.me/${whatsappNumber}`

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isTransparentMode
            ? 'bg-transparent'
            : 'bg-background border-b border-stone'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center px-6 py-4 md:grid md:grid-cols-[1fr_auto_1fr]">
          {/* Desktop: nav links left */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinksLeft.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body text-xs uppercase tracking-widest transition-colors hover:text-primary ${
                  isTransparentMode ? 'text-white' : 'text-text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Center: brand name */}
          <div className="flex-1 text-center md:flex-none">
            <Link
              href={`/${locale}`}
              className={`font-display text-xl tracking-logo transition-colors hover:text-primary ${
                isTransparentMode ? 'text-white' : 'text-text-primary'
              }`}
            >
              Carol Orofino
            </Link>
          </div>

          {/* Desktop: nav links right + language selector + WhatsApp */}
          <div className="hidden items-center justify-end gap-8 md:flex">
            {navLinksRight.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body text-xs uppercase tracking-widest transition-colors hover:text-primary ${
                  isTransparentMode ? 'text-white' : 'text-text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-1">
              {LOCALES.map((loc, i) => (
                <span key={loc.code} className="flex items-center">
                  <button
                    onClick={() => switchLocale(loc.code)}
                    className={`font-body text-xs uppercase tracking-widest transition-colors hover:text-primary ${
                      locale === loc.code
                        ? isTransparentMode
                          ? 'text-white font-semibold'
                          : 'text-text-primary font-semibold'
                        : isTransparentMode
                        ? 'text-white/70'
                        : 'text-dark'
                    }`}
                    aria-label={`Switch to ${loc.label}`}
                  >
                    {loc.label}
                  </button>
                  {i < LOCALES.length - 1 && (
                    <span
                      className={`mx-1 text-xs ${
                        isTransparentMode ? 'text-white/30' : 'text-dark'
                      }`}
                    >
                      /
                    </span>
                  )}
                </span>
              ))}
            </div>
            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className={`transition-colors hover:text-primary ${
                isTransparentMode ? 'text-white' : 'text-text-primary'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </Link>
          </div>

          {/* Mobile: hamburger button */}
          <div className="flex flex-1 justify-end md:hidden">
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Abrir menu"
              className={`p-2 transition-colors ${
                isTransparentMode ? 'text-white' : 'text-text-primary'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-72 bg-background shadow-xl transition-transform duration-300 ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!drawerOpen}
      >
        <div className="flex h-full flex-col px-6 py-6">
          <div className="flex justify-end">
            <button
              onClick={() => setDrawerOpen(false)}
              aria-label="Fechar menu"
              className="p-2 text-text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav className="mt-8 flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setDrawerOpen(false)}
                className="font-body text-sm uppercase tracking-widest text-text-primary transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex items-center gap-2 pb-4">
            {LOCALES.map((loc, i) => (
              <span key={loc.code} className="flex items-center">
                <button
                  onClick={() => switchLocale(loc.code)}
                  className={`font-body text-xs uppercase tracking-widest ${
                    locale === loc.code
                      ? 'font-semibold text-text-primary'
                      : 'text-dark'
                  }`}
                >
                  {loc.label}
                </button>
                {i < LOCALES.length - 1 && (
                  <span className="mx-1 text-xs text-dark">/</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </aside>
    </>
  )
}
