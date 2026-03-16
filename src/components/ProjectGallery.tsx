import Image from 'next/image'
import { type ProjectImage } from '@/data/projects'
import { type Locale } from '@/lib/i18n'

interface ProjectGalleryProps {
  images: ProjectImage[]
  locale: Locale
}

export default function ProjectGallery({ images, locale }: ProjectGalleryProps) {
  if (images.length === 0) return null

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {images.map((image, index) => (
        <div key={index} className="relative aspect-[4/3] overflow-hidden bg-neutral">
          <Image
            src={image.src}
            alt={image.altText[locale]}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  )
}
