// src/app/[locale]/layout.tsx
import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/lib/i18n'
import NavbarWrapper from '@/components/NavbarWrapper'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import '@/app/globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Carol Orofino — Design de Interiores',
  description: 'Design de Interiores que transforma espaços em experiências.',
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound()
  }

  const messages = await getMessages()
  const t = await getTranslations({ locale, namespace: 'contact' })

  return (
    <html lang={locale} className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-background">
        <NextIntlClientProvider messages={messages}>
          <NavbarWrapper />
          <main className="fade-in">{children}</main>
          <Footer />
          <WhatsAppButton message={t('whatsappMessage')} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
