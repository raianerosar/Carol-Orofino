// src/lib/i18n.ts
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['pt', 'en', 'es'] as const,
  defaultLocale: 'pt',
})

export type Locale = (typeof routing.locales)[number]
