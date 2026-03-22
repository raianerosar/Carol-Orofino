'use client'

import { useState } from 'react'

type Step1Data = { name: string; whatsapp: string; email: string }

type Props = {
  data: Step1Data
  onChange: (data: Step1Data) => void
  onNext: () => void
  messages: {
    name: string; whatsapp: string; email: string
    namePlaceholder: string; whatsappPlaceholder: string; emailPlaceholder: string
    nameError: string; whatsappError: string; emailError: string
  }
  nextLabel: string
}

export default function Step1Identity({ data, onChange, onNext, messages, nextLabel }: Props) {
  const [errors, setErrors] = useState<Partial<Record<keyof Step1Data, string>>>({})

  function validate(): boolean {
    const e: typeof errors = {}
    if (data.name.trim().length < 2) e.name = messages.nameError
    const digits = data.whatsapp.replace(/\D/g, '')
    if (digits.length < 10 || digits.length > 13) e.whatsapp = messages.whatsappError
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = messages.emailError
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleNext() {
    if (validate()) onNext()
  }

  const inputClass = 'w-full border border-gray-300 px-4 py-3 font-body text-sm focus:outline-none focus:border-text-primary'

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label className="mb-1 block font-body text-sm uppercase tracking-widest">{messages.name} *</label>
        <input
          type="text"
          value={data.name}
          onChange={e => onChange({ ...data, name: e.target.value })}
          placeholder={messages.namePlaceholder}
          className={inputClass}
        />
        {errors.name && <p className="mt-1 font-body text-xs text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label className="mb-1 block font-body text-sm uppercase tracking-widest">{messages.whatsapp} *</label>
        <input
          type="text"
          value={data.whatsapp}
          onChange={e => onChange({ ...data, whatsapp: e.target.value })}
          placeholder={messages.whatsappPlaceholder}
          className={inputClass}
        />
        {errors.whatsapp && <p className="mt-1 font-body text-xs text-red-600">{errors.whatsapp}</p>}
      </div>

      <div>
        <label className="mb-1 block font-body text-sm uppercase tracking-widest">{messages.email} *</label>
        <input
          type="email"
          value={data.email}
          onChange={e => onChange({ ...data, email: e.target.value })}
          placeholder={messages.emailPlaceholder}
          className={inputClass}
        />
        {errors.email && <p className="mt-1 font-body text-xs text-red-600">{errors.email}</p>}
      </div>

      <button
        type="button"
        onClick={handleNext}
        className="mt-2 border border-text-primary px-10 py-4 font-body text-sm uppercase tracking-widest transition-colors hover:bg-text-primary hover:text-background"
      >
        {nextLabel}
      </button>
    </div>
  )
}
