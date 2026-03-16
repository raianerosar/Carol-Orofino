'use client'

import { useState } from 'react'
import Image from 'next/image'
import { type Locale } from '@/lib/i18n'
import { type CategoryImage } from '@/data/categories'

interface Props {
  images: [CategoryImage, CategoryImage]
  locale: Locale
}

export default function CategoryGallery({ images, locale }: Props) {
  const [zoomed0, setZoomed0] = useState(false)
  const [zoomed1, setZoomed1] = useState(false)

  const zoomedStates = [zoomed0, zoomed1]
  const setters = [setZoomed0, setZoomed1]

  return (
    <div className="grid grid-cols-2 w-full h-[60vh]">
      {images.map((image, i) => {
        const zoomed = zoomedStates[i]
        const setZoomed = setters[i]
        return (
          <div
            key={image.src}
            className={`relative overflow-hidden ${zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
            onClick={() => setZoomed(!zoomed)}
          >
            <Image
              src={image.src}
              alt={image.alt[locale] ?? image.alt.pt}
              fill
              sizes="50vw"
              className={`object-cover transition-transform duration-500 ${zoomed ? 'scale-150' : 'scale-100'}`}
            />
          </div>
        )
      })}
    </div>
  )
}
