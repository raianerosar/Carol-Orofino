'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface Props {
  img: string
  title: string
  text: string
  colors: string[]
  reversed?: boolean
}

function labelColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.5 ? '#1A1A1A' : '#FFFFFF'
}

export function StyleSection({ img, title, text, colors, reversed = false }: Props) {
  const [active, setActive] = useState<number | null>(null)

  return (
    <>
      {/* ── Mobile ────────────────────────────────────────────────────── */}
      <section className="md:hidden flex flex-col w-full">
        <div className="flex flex-col items-center text-center px-8 py-8">
          <h2 className="font-display text-4xl text-text-primary tracking-wide leading-tight mb-4">
            {title}
          </h2>
          <p className="font-body text-sm text-dark leading-relaxed">
            {text}
          </p>
        </div>

        <div className="relative w-full h-[280px]">
          <Image src={img} alt={title} fill sizes="100vw" className="object-cover object-center" />
        </div>

        <div className="flex flex-row w-full h-20 overflow-hidden">
          {colors.map((hex, i) => (
            <motion.div
              key={i}
              onClick={() => setActive(active === i ? null : i)}
              className="relative h-full cursor-pointer overflow-hidden"
              animate={{ flexGrow: active === i ? 3 : 1 }}
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              style={{ backgroundColor: hex, flexShrink: 0 }}
            >
              <motion.span
                className="absolute bottom-2 left-0 right-0 text-center font-body text-[10px] tracking-widest uppercase"
                animate={{ opacity: active === i ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                style={{ color: labelColor(hex) }}
              >
                {hex}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Desktop ───────────────────────────────────────────────────── */}
      <section className={`hidden md:flex flex-row w-full h-[380px] overflow-hidden ${reversed ? 'flex-row-reverse' : ''}`}>
        {/* Texto */}
        <div className="flex flex-col justify-center items-center text-center px-16 flex-[4] shrink-0">
          <h2 className="font-display text-4xl text-text-primary tracking-wide leading-tight mb-6">
            {title}
          </h2>
          <p className="font-body text-base text-dark leading-relaxed max-w-xs">
            {text}
          </p>
        </div>

        {/* Imagem */}
        <div className="relative h-full flex-[5]">
          <Image src={img} alt={title} fill sizes="45vw" className="object-cover object-center" />
        </div>

        {/* Strips animadas */}
        <div className="flex flex-row h-full flex-[3] overflow-hidden">
          {colors.map((hex, i) => (
            <motion.div
              key={i}
              onClick={() => setActive(active === i ? null : i)}
              className="relative h-full cursor-pointer overflow-hidden"
              animate={{ flexGrow: active === i ? 3 : 1 }}
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              style={{ backgroundColor: hex, flexShrink: 0 }}
            >
              <motion.span
                className="absolute bottom-3 left-0 right-0 text-center font-body text-[10px] tracking-widest uppercase"
                animate={{ opacity: active === i ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                style={{ color: labelColor(hex) }}
              >
                {hex}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  )
}
