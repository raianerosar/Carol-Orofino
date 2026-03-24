'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  src: string
  alt: string
  className?: string
}

export default function ProjectImageLightbox({ src, alt, className }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div
        className={`relative cursor-zoom-in ${className ?? ''}`}
        onClick={() => setOpen(true)}
      >
        <Image src={src} alt={alt} fill className="object-cover object-center" />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="relative max-h-full max-w-5xl w-full h-full"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={src}
                alt={alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>
            <button
              className="absolute top-16 right-4 md:top-5 md:right-5 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-black/60 border border-white/30 text-white hover:bg-black/80 active:bg-black/90 transition-colors"
              onClick={(e) => { e.stopPropagation(); setOpen(false) }}
              aria-label="Fechar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
