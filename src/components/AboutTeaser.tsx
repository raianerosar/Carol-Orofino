'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface AboutTeaserProps {
  locale: string
  eyebrow: string
  title: string
  teaser: string
  ctaLabel: string
}

export function AboutTeaser({
  locale,
  eyebrow,
  title,
  teaser,
  ctaLabel,
}: AboutTeaserProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-[560px] overflow-hidden">
      {/* Left: Photo */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true, margin: '-80px' }}
        className="relative min-h-[320px] md:min-h-0 overflow-hidden"
      >
        <Image
          src="/images/carol-portrait.png"
          alt="Carol Orofino"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top"
        />
      </motion.div>

      {/* Right: Text */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
        viewport={{ once: true, margin: '-80px' }}
        className="flex items-center justify-center bg-sand px-8 py-16 md:px-16"
      >
        <div className="max-w-md">
          <p className="font-body text-xs uppercase tracking-[0.35em] text-dark mb-5">
            {eyebrow}
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-light italic text-primary leading-tight mb-5">
            {title}
          </h2>
          <div className="w-10 h-px bg-stone my-5" />
          <p className="font-body text-sm font-light text-dark leading-relaxed mb-8">
            {teaser}
          </p>
          <Link
            href={`/${locale}/sobre`}
            className="font-body text-xs uppercase tracking-widest border-b border-primary text-primary pb-0.5 transition-opacity hover:opacity-60"
          >
            {ctaLabel} →
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
