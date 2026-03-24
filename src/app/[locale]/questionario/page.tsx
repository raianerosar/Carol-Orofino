import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import QuestionnaireWizard from '@/components/questionnaire/QuestionnaireWizard'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'questionnaire' })
  return {
    title: `${t('title')} — Carol Orofino`,
    description:
      locale === 'en'
        ? 'Fill out our questionnaire so we can understand your project and prepare a personalized proposal.'
        : locale === 'es'
          ? 'Completa nuestro cuestionario para entender mejor tu proyecto y preparar una propuesta personalizada.'
          : 'Preencha nosso questionário para que possamos entender melhor o seu projeto e preparar uma proposta personalizada.',
    robots: { index: false },
  }
}

export default async function QuestionnairePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'questionnaire' })

  const messages = {
    title: t('title'),
    progress: t.raw('progress') as string,
    next: t('next'),
    back: t('back'),
    submit: t('submit'),
    submitting: t('submitting'),
    errorGeneric: t('errorGeneric'),
    step1: {
      title: t('step1.title'),
      name: t('step1.name'),
      whatsapp: t('step1.whatsapp'),
      email: t('step1.email'),
      namePlaceholder: t('step1.namePlaceholder'),
      whatsappPlaceholder: t('step1.whatsappPlaceholder'),
      emailPlaceholder: t('step1.emailPlaceholder'),
      nameError: t('step1.nameError'),
      whatsappError: t('step1.whatsappError'),
      emailError: t('step1.emailError'),
    },
    step2: {
      title: t('step2.title'),
      roomType: t('step2.roomType'),
      roomTypePlaceholder: t('step2.roomTypePlaceholder'),
      roomOptions: {
        sala: t('step2.roomOptions.sala'),
        quarto: t('step2.roomOptions.quarto'),
        cozinha: t('step2.roomOptions.cozinha'),
        escritorio: t('step2.roomOptions.escritorio'),
        consultorio: t('step2.roomOptions.consultorio'),
        outro: t('step2.roomOptions.outro'),
      },
      roomTypeError: t('step2.roomTypeError'),
      area: t('step2.area'),
      areaPlaceholder: t('step2.areaPlaceholder'),
      floorPlan: t('step2.floorPlan'),
      floorPlanHint: t('step2.floorPlanHint'),
      photos: t('step2.photos'),
      photosHint: t('step2.photosHint'),
      fileTooLarge: t('step2.fileTooLarge'),
      fileInvalidType: t('step2.fileInvalidType'),
    },
    step3: {
      title: t('step3.title'),
      styles: t('step3.styles'),
      styleOptions: {
        minimalista: t('step3.styleOptions.minimalista'),
        industrial: t('step3.styleOptions.industrial'),
        escandinavo: t('step3.styleOptions.escandinavo'),
        classico: t('step3.styleOptions.classico'),
        moderno: t('step3.styleOptions.moderno'),
        boho: t('step3.styleOptions.boho'),
        japandi: t('step3.styleOptions.japandi'),
        rustico: t('step3.styleOptions.rustico'),
        contemporaneo: t('step3.styleOptions.contemporaneo'),
        provencal: t('step3.styleOptions.provencal'),
      },
      mustHave: t('step3.mustHave'),
      mustHavePlaceholder: t('step3.mustHavePlaceholder'),
      mustHaveHint: t('step3.mustHaveHint'),
    },
    step4: {
      title: t('step4.title'),
      scopeType: t('step4.scopeType'),
      scopeOptions: {
        consultoria: t('step4.scopeOptions.consultoria'),
        projeto3d: t('step4.scopeOptions.projeto3d'),
        reforma: t('step4.scopeOptions.reforma'),
      },
      scopeTypeError: t('step4.scopeTypeError'),
      urgency: t('step4.urgency'),
      urgencyOptions: {
        imediata: t('step4.urgencyOptions.imediata'),
        '3meses': t('step4.urgencyOptions.3meses'),
        sondando: t('step4.urgencyOptions.sondando'),
      },
      budget: t('step4.budget'),
      budgetOptions: {
        ate10k: t('step4.budgetOptions.ate10k'),
        '10a30k': t('step4.budgetOptions.10a30k'),
        '30a80k': t('step4.budgetOptions.30a80k'),
        acima80k: t('step4.budgetOptions.acima80k'),
      },
      errorGeneric: t('errorGeneric'),
    },
    success: {
      title: t('success.title'),
      message: t('success.message'),
    },
  }

  return (
    <div className="min-h-[calc(100vh-80px)] px-6 pb-16 pt-28">
      <QuestionnaireWizard messages={messages} />
    </div>
  )
}
