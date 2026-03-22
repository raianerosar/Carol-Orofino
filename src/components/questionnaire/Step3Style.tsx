'use client'

type Step3Data = { styles: string[]; pinterest: string; mustHave: string }

type Props = {
  data: Step3Data
  onChange: (data: Step3Data) => void
  onNext: () => void
  onBack: () => void
  messages: {
    styles: string
    styleOptions: Record<string, string>
    pinterest: string; pinterestPlaceholder: string
    mustHave: string; mustHavePlaceholder: string; mustHaveHint: string
  }
  nextLabel: string
  backLabel: string
}

export default function Step3Style({ data, onChange, onNext, onBack, messages, nextLabel, backLabel }: Props) {
  function toggleStyle(key: string) {
    const next = data.styles.includes(key)
      ? data.styles.filter(s => s !== key)
      : [...data.styles, key]
    onChange({ ...data, styles: next })
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-3 font-body text-sm uppercase tracking-widest">{messages.styles}</p>
        <div className="flex flex-wrap gap-3">
          {Object.entries(messages.styleOptions).map(([key, label]) => {
            const selected = data.styles.includes(key)
            return (
              <button
                key={key}
                type="button"
                onClick={() => toggleStyle(key)}
                className={`border px-6 py-3 font-body text-sm uppercase tracking-widest transition-colors ${
                  selected
                    ? 'border-text-primary bg-text-primary text-background'
                    : 'border-gray-300 hover:border-text-primary'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <label className="mb-1 block font-body text-sm uppercase tracking-widest">{messages.pinterest}</label>
        <input
          type="url"
          value={data.pinterest}
          onChange={e => onChange({ ...data, pinterest: e.target.value })}
          placeholder={messages.pinterestPlaceholder}
          className="w-full border border-gray-300 px-4 py-3 font-body text-sm focus:outline-none focus:border-text-primary"
        />
      </div>

      <div>
        <label className="mb-1 block font-body text-sm uppercase tracking-widest">{messages.mustHave}</label>
        <textarea
          value={data.mustHave}
          onChange={e => onChange({ ...data, mustHave: e.target.value.slice(0, 500) })}
          placeholder={messages.mustHavePlaceholder}
          rows={4}
          className="w-full border border-gray-300 px-4 py-3 font-body text-sm focus:outline-none focus:border-text-primary resize-none"
        />
        <p className="mt-1 font-body text-xs text-gray-400">{data.mustHave.length}/500 — {messages.mustHaveHint}</p>
      </div>

      <div className="flex gap-4">
        <button type="button" onClick={onBack} className="border border-gray-300 px-8 py-4 font-body text-sm uppercase tracking-widest transition-colors hover:bg-gray-100">
          {backLabel}
        </button>
        <button type="button" onClick={onNext} className="border border-text-primary px-10 py-4 font-body text-sm uppercase tracking-widest transition-colors hover:bg-text-primary hover:text-background">
          {nextLabel}
        </button>
      </div>
    </div>
  )
}
