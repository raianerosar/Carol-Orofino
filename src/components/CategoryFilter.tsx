'use client'

import { useTranslations } from 'next-intl'
import { type Project } from '@/data/projects'

type Category = Project['category'] | 'all'

interface CategoryFilterProps {
  active: Category
  onChange: (category: Category) => void
}

const CATEGORIES: Category[] = ['all', 'residencial', 'comercial', 'reforma', 'consultoria']

export default function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  const t = useTranslations('projects.filter')

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`font-body text-xs uppercase tracking-widest px-4 py-2 border transition-colors ${
            active === cat
              ? 'border-text-primary bg-text-primary text-background'
              : 'border-neutral text-text-primary/60 hover:border-text-primary hover:text-text-primary'
          }`}
          aria-pressed={active === cat}
        >
          {t(cat)}
        </button>
      ))}
    </div>
  )
}
