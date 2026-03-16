// src/app/[locale]/projetos/page.tsx
import { getTranslations } from 'next-intl/server'
import { projects } from '@/data/projects'
import { type Locale } from '@/lib/i18n'
import ProjectsList from './ProjectsList'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'projects' })
  return { title: `${t('title')} — Carol Orofino` }
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'projects' })

  return (
    <div className="mx-auto max-w-7xl px-6 py-32">
      <h1 className="font-display text-4xl md:text-5xl text-primary tracking-wide mb-12">
        {t('title')}
      </h1>
      <ProjectsList projects={projects} locale={locale as Locale} />
    </div>
  )
}
