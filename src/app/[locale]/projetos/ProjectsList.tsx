// src/app/[locale]/projetos/ProjectsList.tsx
'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { type Project } from '@/data/projects'
import { type Locale } from '@/lib/i18n'
import ProjectCard from '@/components/ProjectCard'
import CategoryFilter from '@/components/CategoryFilter'

type Category = Project['category'] | 'all'

interface ProjectsListProps {
  projects: Project[]
  locale: Locale
}

export default function ProjectsList({ projects, locale }: ProjectsListProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const t = useTranslations('projects')

  const filtered =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <>
      <div className="mb-10">
        <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} locale={locale} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="py-20 text-center font-body text-sm text-text-primary/50">
          {t('noResults')}
        </p>
      )}
    </>
  )
}
