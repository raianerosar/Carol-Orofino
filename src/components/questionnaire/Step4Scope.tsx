'use client'

import { useState } from 'react'

type Step4Data = { scopeType: string; urgency: string; budget: string }

type Props = {
  data: Step4Data
  onChange: (data: Step4Data) => void
  onSubmit: () => void
  onBack: () => void
  isSubmitting: boolean
  error: string | null
  messages: {
    scopeType: string; scopeOptions: Record<string, string>; scopeTypeError: string
    urgency: string; urgencyOptions: Record<string, string>
    budget: string; budgetOptions: Record<string, string>
    errorGeneric: string
  }
  submitLabel: string
  submittingLabel: string
  backLabel: string
}

export default function Step4Scope({ data, onChange, onSubmit, onBack, isSubmitting, error, messages, submitLabel, submittingLabel, backLabel }: Props) {
  const [scopeError, setScopeError] = useState('')

  function handleSubmit() {
    if (!data.scopeType) { setScopeError(messages.scopeTypeError); return }
    setScopeError('')
    onSubmit()
  }

  const radioClass = (selected: boolean) =>
    `flex cursor-pointer items-center gap-3 border px-4 py-3 font-body text-sm transition-colors ${
      selected ? 'border-text-primary bg-text-primary text-background' : 'border-gray-300 hover:border-text-primary'
    }`

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-3 font-body text-sm uppercase tracking-widest">{messages.scopeType} *</p>
        <div className="flex flex-col gap-2">
          {Object.entries(messages.scopeOptions).map(([key, label]) => (
            <label key={key} className={radioClass(data.scopeType === key)}>
              <input type="radio" name="scopeType" value={key} checked={data.scopeType === key} onChange={() => onChange({ ...data, scopeType: key })} className="sr-only" />
              {label}
            </label>
          ))}
        </div>
        {scopeError && <p className="mt-1 font-body text-xs text-red-600">{scopeError}</p>}
      </div>

      <div>
        <p className="mb-3 font-body text-sm uppercase tracking-widest">{messages.urgency}</p>
        <div className="flex flex-col gap-2">
          {Object.entries(messages.urgencyOptions).map(([key, label]) => (
            <label key={key} className={radioClass(data.urgency === key)}>
              <input type="radio" name="urgency" value={key} checked={data.urgency === key} onChange={() => onChange({ ...data, urgency: key })} className="sr-only" />
              {label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1 block font-body text-sm uppercase tracking-widest">{messages.budget}</label>
        <select
          value={data.budget}
          onChange={e => onChange({ ...data, budget: e.target.value })}
          className="w-full border border-gray-300 px-4 py-3 font-body text-sm focus:outline-none focus:border-text-primary"
        >
          <option value="">—</option>
          {Object.entries(messages.budgetOptions).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
      </div>

      {error && <p className="font-body text-sm text-red-600">{messages.errorGeneric}</p>}

      <div className="flex gap-4">
        <button type="button" onClick={onBack} disabled={isSubmitting} className="border border-gray-300 px-8 py-4 font-body text-sm uppercase tracking-widest transition-colors hover:bg-gray-100 disabled:opacity-50">
          {backLabel}
        </button>
        <button type="button" onClick={handleSubmit} disabled={isSubmitting} className="border border-text-primary px-10 py-4 font-body text-sm uppercase tracking-widest transition-colors hover:bg-text-primary hover:text-background disabled:opacity-50">
          {isSubmitting ? submittingLabel : submitLabel}
        </button>
      </div>
    </div>
  )
}
