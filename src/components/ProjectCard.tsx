import Link from 'next/link'
import Image from 'next/image'
import { type Project } from '@/data/projects'
import { type Locale } from '@/lib/i18n'

interface ProjectCardProps {
  project: Project
  locale: Locale
}

export default function ProjectCard({ project, locale }: ProjectCardProps) {
  const title = project.translations[locale].title
  const altText = project.coverImageAlt[locale]
  const href = `/${locale}/projetos/${project.slug}`

  return (
    <Link href={href} className="group block">
      <div className="relative aspect-square overflow-hidden bg-neutral">
        <Image
          src={project.coverImage}
          alt={altText}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          placeholder="blur"
          blurDataURL={project.coverImageBlurDataURL}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/35 flex items-end p-4 opacity-0 group-hover:opacity-100">
          <p className="font-display text-lg text-white">{title}</p>
        </div>
      </div>
      <div className="mt-3">
        <p className="font-body text-sm text-text-primary">{title}</p>
        <p className="font-body text-xs uppercase tracking-widest text-text-primary/50 mt-1">
          {project.category}
        </p>
      </div>
    </Link>
  )
}
