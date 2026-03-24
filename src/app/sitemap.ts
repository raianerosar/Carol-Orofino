import { MetadataRoute } from 'next'
import { routing } from '@/lib/i18n'

const BASE_URL = 'https://carolorofino.com.br'

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales

  const staticRoutes = ['', '/sobre', '/contato']

  const staticEntries = locales.flatMap((locale) =>
    staticRoutes.map((route) => ({
      url: `${BASE_URL}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  )

  return staticEntries
}
