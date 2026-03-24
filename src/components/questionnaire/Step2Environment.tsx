'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const fieldVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.35, ease: [0.25, 0, 0, 1] as const },
  }),
}

const FLOOR_PLAN_TYPES = ['application/pdf', 'image/png', 'image/jpeg']
const PHOTO_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'video/mp4', 'video/quicktime']
const FLOOR_PLAN_MAX = 10 * 1024 * 1024
const PHOTOS_MAX_TOTAL = 50 * 1024 * 1024

type Step2Data = {
  roomType: string[]
  area: string
  floorPlanFile: File | null
  photoFiles: File[]
}

type Props = {
  data: Step2Data
  onChange: (data: Step2Data) => void
  onNext: () => void
  onBack: () => void
  messages: {
    roomType: string; roomTypePlaceholder: string
    roomOptions: Record<string, string>; roomTypeError: string
    area: string; areaPlaceholder: string; floorPlan: string; floorPlanHint: string
    photos: string; photosHint: string
    fileTooLarge: string; fileInvalidType: string
  }
  nextLabel: string
  backLabel: string
}

export default function Step2Environment({ data, onChange, onNext, onBack, messages, nextLabel, backLabel }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  function toggleRoom(key: string) {
    const next = data.roomType.includes(key)
      ? data.roomType.filter(r => r !== key)
      : [...data.roomType, key]
    onChange({ ...data, roomType: next })
  }

  function validate(): boolean {
    const e: Record<string, string> = {}
    if (data.roomType.length === 0) e.roomType = messages.roomTypeError
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleFloorPlan(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    if (file) {
      if (!FLOOR_PLAN_TYPES.includes(file.type)) {
        setErrors(prev => ({ ...prev, floorPlan: messages.fileInvalidType }))
        return
      }
      if (file.size > FLOOR_PLAN_MAX) {
        setErrors(prev => ({ ...prev, floorPlan: messages.fileTooLarge }))
        return
      }
      setErrors(prev => { const n = { ...prev }; delete n.floorPlan; return n })
    }
    onChange({ ...data, floorPlanFile: file })
  }

  function handlePhotos(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    const invalidType = files.find(f => !PHOTO_TYPES.includes(f.type))
    if (invalidType) {
      setErrors(prev => ({ ...prev, photos: messages.fileInvalidType }))
      return
    }
    const totalSize = files.reduce((sum, f) => sum + f.size, 0)
    if (totalSize > PHOTOS_MAX_TOTAL) {
      setErrors(prev => ({ ...prev, photos: messages.fileTooLarge }))
      return
    }
    setErrors(prev => { const n = { ...prev }; delete n.photos; return n })
    onChange({ ...data, photoFiles: files })
  }

  const inputClass = 'w-full border border-stone bg-linen/60 px-4 py-3 font-body text-sm placeholder:text-slate/60 focus:outline-none focus:border-walnut transition-colors duration-200'

  return (
    <div className="flex flex-col gap-6">
      {/* Room type chips */}
      <motion.div custom={0} variants={fieldVariants} initial="hidden" animate="visible">
        <p className="mb-3 font-body text-xs uppercase tracking-[0.2em] text-slate">{messages.roomType} *</p>
        <div className="flex flex-wrap gap-3">
          {Object.entries(messages.roomOptions).map(([key, label]) => {
            const selected = data.roomType.includes(key)
            return (
              <button
                key={key}
                type="button"
                onClick={() => toggleRoom(key)}
                className={`border px-6 py-3 font-body text-sm uppercase tracking-widest transition-colors duration-150 ${
                  selected
                    ? 'border-walnut bg-walnut/8 text-walnut'
                    : 'border-stone bg-transparent text-text-primary hover:border-latte'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>
        {errors.roomType && <p className="mt-2 font-body text-xs text-walnut/80">{errors.roomType}</p>}
      </motion.div>

      {/* Area */}
      <motion.div custom={1} variants={fieldVariants} initial="hidden" animate="visible">
        <label className="mb-1 block font-body text-xs uppercase tracking-[0.2em] text-slate">{messages.area}</label>
        <textarea
          value={data.area}
          onChange={e => onChange({ ...data, area: e.target.value })}
          placeholder={messages.areaPlaceholder}
          rows={2}
          className={`${inputClass} resize-none`}
        />
      </motion.div>

      {/* Floor plan upload */}
      <motion.div custom={2} variants={fieldVariants} initial="hidden" animate="visible">
        <label className="mb-1 block font-body text-xs uppercase tracking-[0.2em] text-slate">{messages.floorPlan}</label>
        <label className={`flex items-center gap-3 cursor-pointer border px-4 py-3 transition-colors duration-150 ${
          data.floorPlanFile ? 'border-walnut bg-walnut/5' : 'border-stone hover:border-latte'
        }`}>
          <input type="file" accept=".pdf,.png,.jpg,.jpeg" onChange={handleFloorPlan} className="sr-only" />
          <span className={`shrink-0 font-body text-xs uppercase tracking-widest border border-current px-3 py-1 ${data.floorPlanFile ? 'text-walnut' : 'text-slate'}`}>
            {data.floorPlanFile ? '✓' : '↑'}
          </span>
          <span className={`font-body text-sm truncate ${data.floorPlanFile ? 'text-walnut' : 'text-slate/60'}`}>
            {data.floorPlanFile ? data.floorPlanFile.name : messages.floorPlanHint}
          </span>
        </label>
        {errors.floorPlan && <p className="mt-1 font-body text-xs text-walnut/80">{errors.floorPlan}</p>}
      </motion.div>

      {/* Photos upload */}
      <motion.div custom={3} variants={fieldVariants} initial="hidden" animate="visible">
        <label className="mb-1 block font-body text-xs uppercase tracking-[0.2em] text-slate">{messages.photos}</label>
        <label className={`flex items-center gap-3 cursor-pointer border px-4 py-3 transition-colors duration-150 ${
          data.photoFiles.length > 0 ? 'border-walnut bg-walnut/5' : 'border-stone hover:border-latte'
        }`}>
          <input type="file" accept=".png,.jpg,.jpeg,.webp,.mp4,.mov" multiple onChange={handlePhotos} className="sr-only" />
          <span className={`shrink-0 font-body text-xs uppercase tracking-widest border border-current px-3 py-1 ${data.photoFiles.length > 0 ? 'text-walnut' : 'text-slate'}`}>
            {data.photoFiles.length > 0 ? '✓' : '↑'}
          </span>
          <span className={`font-body text-sm truncate ${data.photoFiles.length > 0 ? 'text-walnut' : 'text-slate/60'}`}>
            {data.photoFiles.length > 0
              ? `${data.photoFiles.length} arquivo${data.photoFiles.length > 1 ? 's' : ''} selecionado${data.photoFiles.length > 1 ? 's' : ''}`
              : messages.photosHint}
          </span>
        </label>
        {errors.photos && <p className="mt-1 font-body text-xs text-walnut/80">{errors.photos}</p>}
      </motion.div>

      {/* Navigation */}
      <motion.div custom={4} variants={fieldVariants} initial="hidden" animate="visible" className="flex items-center gap-6">
        <button
          type="button"
          onClick={onBack}
          className="font-body text-sm text-slate hover:text-walnut transition-colors"
        >
          ← {backLabel}
        </button>
        <motion.button
          type="button"
          onClick={() => { if (validate()) onNext() }}
          className="bg-walnut text-linen px-10 py-4 font-display italic hover:bg-latte transition-colors duration-150"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.15 }}
        >
          {nextLabel}
        </motion.button>
      </motion.div>
    </div>
  )
}
