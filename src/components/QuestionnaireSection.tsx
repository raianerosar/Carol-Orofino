'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface QuestionnaireSectionProps {
  locale: string
  eyebrow: string
  title: string
  body: string
  cta: string
}

export function QuestionnaireSection({
  locale,
  eyebrow,
  title,
  body,
  cta,
}: QuestionnaireSectionProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-[560px] overflow-hidden">
      {/* Left: Text */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true, margin: '-80px' }}
        className="flex items-center justify-center px-8 py-16 md:px-16"
      >
        <div className="max-w-md">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-dark mb-6">
            {eyebrow}
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-light italic text-text-primary leading-[1.2] mb-6">
            {title}
          </h2>
          <div className="w-10 h-px bg-stone mb-6" />
          <p className="font-body text-sm font-light text-dark leading-relaxed mb-10">
            {body}
          </p>
          <Link
            href={`/${locale}/questionario`}
            className="font-body text-xs uppercase tracking-[0.25em] text-walnut border-b border-walnut pb-0.5 transition-opacity hover:opacity-60"
          >
            {cta} →
          </Link>
        </div>
      </motion.div>

      {/* Right: Image */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
        viewport={{ once: true, margin: '-80px' }}
        className="relative min-h-[400px] md:min-h-0 overflow-hidden"
      >
        <Image
          src="/images/questionnaire-section.jpg"
          alt="Interior design project"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-[8000ms] hover:scale-105"
        />
      </motion.div>
    </section>
  )
}
