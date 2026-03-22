'use client'

import { useState } from 'react'

const FLOOR_PLAN_TYPES = ['application/pdf', 'image/png', 'image/jpeg']
const PHOTO_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'video/mp4', 'video/quicktime']
const FLOOR_PLAN_MAX = 10 * 1024 * 1024
const PHOTOS_MAX_TOTAL = 50 * 1024 * 1024

type Step2Data = {
  roomType: string
  area: number | null
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
    area: string; floorPlan: string; floorPlanHint: string
    photos: string; photosHint: string
    fileTooLarge: string; fileInvalidType: string
  }
  nextLabel: string
  backLabel: string
}

export default function Step2Environment({ data, onChange, onNext, onBack, messages, nextLabel, backLabel }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate(): boolean {
    const e: Record<string, string> = {}
    if (!data.roomType) e.roomType = messages.roomTypeError
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

  const inputClass = 'w-full border border-gray-300 px-4 py-3 font-body text-sm focus:outline-none focus:border-text-primary'

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label className="mb-1 block font-body text-sm uppercase tracking-widest">{messages.roomType} *</label>
        <select
          value={data.roomType}
          onChange={e => onChange({ ...data, roomType: e.target.value })}
          className={inputClass}
        >
          <option value="">{messages.roomTypePlaceholder}</option>
          {Object.entries(messages.roomOptions).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
        {errors.roomType && <p className="mt-1 font-body text-xs text-red-600">{errors.roomType}</p>}
      </div>

      <div>
        <label className="mb-1 block font-body text-sm uppercase tracking-widest">{messages.area}</label>
        <input
          type="number"
          min={1}
          max={10000}
          step={1}
          value={data.area ?? ''}
          onChange={e => onChange({ ...data, area: e.target.value ? parseInt(e.target.value) : null })}
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-1 block font-body text-sm uppercase tracking-widest">{messages.floorPlan}</label>
        <input type="file" accept=".pdf,.png,.jpg,.jpeg" onChange={handleFloorPlan} className="font-body text-sm" />
        <p className="mt-1 font-body text-xs text-gray-400">{messages.floorPlanHint}</p>
        {errors.floorPlan && <p className="mt-1 font-body text-xs text-red-600">{errors.floorPlan}</p>}
      </div>

      <div>
        <label className="mb-1 block font-body text-sm uppercase tracking-widest">{messages.photos}</label>
        <input type="file" accept=".png,.jpg,.jpeg,.webp,.mp4,.mov" multiple onChange={handlePhotos} className="font-body text-sm" />
        <p className="mt-1 font-body text-xs text-gray-400">{messages.photosHint}</p>
        {errors.photos && <p className="mt-1 font-body text-xs text-red-600">{errors.photos}</p>}
      </div>

      <div className="flex gap-4">
        <button type="button" onClick={onBack} className="border border-gray-300 px-8 py-4 font-body text-sm uppercase tracking-widest transition-colors hover:bg-gray-100">
          {backLabel}
        </button>
        <button type="button" onClick={() => { if (validate()) onNext() }} className="border border-text-primary px-10 py-4 font-body text-sm uppercase tracking-widest transition-colors hover:bg-text-primary hover:text-background">
          {nextLabel}
        </button>
      </div>
    </div>
  )
}
