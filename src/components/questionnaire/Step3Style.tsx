'use client'

import { motion } from 'framer-motion'

const fieldVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.35, ease: [0.25, 0, 0, 1] as const },
  }),
}

type Step3Data = { styles: string[]; mustHave: string }

type Props = {
  data: Step3Data
  onChange: (data: Step3Data) => void
  onNext: () => void
  onBack: () => void
  messages: {
    styles: string
    styleOptions: Record<string, string>
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
      {/* Style chips */}
      <motion.div custom={0} variants={fieldVariants} initial="hidden" animate="visible">
        <p className="mb-3 font-body text-xs uppercase tracking-[0.2em] text-slate">{messages.styles}</p>
        <div className="flex flex-wrap gap-3">
          {Object.entries(messages.styleOptions).map(([key, label]) => {
            const selected = data.styles.includes(key)
            return (
              <button
                key={key}
                type="button"
                onClick={() => toggleStyle(key)}
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
      </motion.div>

      {/* Must have textarea */}
      <motion.div custom={1} variants={fieldVariants} initial="hidden" animate="visible">
        <label className="mb-1 block font-body text-xs uppercase tracking-[0.2em] text-slate">{messages.mustHave}</label>
        <textarea
          value={data.mustHave}
          onChange={e => onChange({ ...data, mustHave: e.target.value.slice(0, 500) })}
          placeholder={messages.mustHavePlaceholder}
          rows={4}
          className="w-full border border-stone bg-linen/60 px-4 py-3 font-body text-sm placeholder:text-slate/60 focus:outline-none focus:border-walnut transition-colors duration-200 resize-none"
        />
        <p className="mt-1 font-body text-xs text-slate">{data.mustHave.length}/500 — {messages.mustHaveHint}</p>
      </motion.div>

      {/* Navigation */}
      <motion.div custom={2} variants={fieldVariants} initial="hidden" animate="visible" className="flex items-center gap-6">
        <button
          type="button"
          onClick={onBack}
          className="font-body text-sm text-slate hover:text-walnut transition-colors"
        >
          ← {backLabel}
        </button>
        <motion.button
          type="button"
          onClick={onNext}
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
