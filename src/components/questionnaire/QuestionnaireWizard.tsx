'use client'

import { useState } from 'react'
import { submitQuestionnaire } from '@/actions/submitQuestionnaire'
import Step1Identity from './Step1Identity'
import Step2Environment from './Step2Environment'
import Step3Style from './Step3Style'
import Step4Scope from './Step4Scope'
import SuccessScreen from './SuccessScreen'

type WizardMessages = {
  title: string
  progress: string
  next: string; back: string; submit: string; submitting: string
  errorGeneric: string
  step1: React.ComponentProps<typeof Step1Identity>['messages'] & { title: string }
  step2: React.ComponentProps<typeof Step2Environment>['messages'] & { title: string }
  step3: React.ComponentProps<typeof Step3Style>['messages'] & { title: string }
  step4: React.ComponentProps<typeof Step4Scope>['messages'] & { title: string }
  success: { title: string; message: string }
}

type Props = { messages: WizardMessages }

export default function QuestionnaireWizard({ messages }: Props) {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const [step1, setStep1] = useState({ name: '', whatsapp: '', email: '' })
  const [step2, setStep2] = useState({ roomType: '', area: null as number | null, floorPlanFile: null as File | null, photoFiles: [] as File[] })
  const [step3, setStep3] = useState({ styles: [] as string[], pinterest: '', mustHave: '' })
  const [step4, setStep4] = useState({ scopeType: '', urgency: '', budget: '' })

  const TOTAL = 4
  const progressLabel = messages.progress
    .replace('{current}', String(step))
    .replace('{total}', String(TOTAL))

  async function handleSubmit() {
    setIsSubmitting(true)
    setSubmitError(null)
    const result = await submitQuestionnaire({ ...step1, ...step2, ...step3, ...step4 })
    setIsSubmitting(false)
    if (result.success) {
      setSubmitted(true)
    } else {
      setSubmitError(result.error)
    }
  }

  if (submitted) {
    return <SuccessScreen title={messages.success.title} message={messages.success.message} />
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <p className="font-body text-xs uppercase tracking-widest text-gray-400 mb-3">{progressLabel}</p>
        <div className="flex gap-2">
          {Array.from({ length: TOTAL }, (_, i) => (
            <div
              key={i}
              className={`h-0.5 flex-1 ${i + 1 <= step ? 'bg-text-primary' : 'bg-gray-200'}`}
            />
          ))}
        </div>
      </div>

      {/* Step title */}
      <h2 className="font-heading text-2xl mb-8">
        {step === 1 && messages.step1.title}
        {step === 2 && messages.step2.title}
        {step === 3 && messages.step3.title}
        {step === 4 && messages.step4.title}
      </h2>

      {step === 1 && (
        <Step1Identity
          data={step1}
          onChange={setStep1}
          onNext={() => setStep(2)}
          messages={messages.step1}
          nextLabel={messages.next}
        />
      )}
      {step === 2 && (
        <Step2Environment
          data={step2}
          onChange={setStep2}
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
          messages={messages.step2}
          nextLabel={messages.next}
          backLabel={messages.back}
        />
      )}
      {step === 3 && (
        <Step3Style
          data={step3}
          onChange={setStep3}
          onNext={() => setStep(4)}
          onBack={() => setStep(2)}
          messages={messages.step3}
          nextLabel={messages.next}
          backLabel={messages.back}
        />
      )}
      {step === 4 && (
        <Step4Scope
          data={step4}
          onChange={setStep4}
          onSubmit={handleSubmit}
          onBack={() => setStep(3)}
          isSubmitting={isSubmitting}
          error={submitError}
          messages={{ ...messages.step4, errorGeneric: messages.errorGeneric }}
          submitLabel={messages.submit}
          submittingLabel={messages.submitting}
          backLabel={messages.back}
        />
      )}
    </div>
  )
}
