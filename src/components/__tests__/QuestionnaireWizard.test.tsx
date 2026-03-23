import { render, screen } from '@testing-library/react'
import QuestionnaireWizard from '../questionnaire/QuestionnaireWizard'

const messages = {
  title: 'Questionário',
  progress: 'Etapa {current} de {total}',
  next: 'Próximo', back: 'Voltar', submit: 'Enviar', submitting: 'Enviando...',
  errorGeneric: 'Erro',
  step1: { title: 'Identificação', name: 'Nome', whatsapp: 'WhatsApp', email: 'E-mail', namePlaceholder: '', whatsappPlaceholder: '', emailPlaceholder: '', nameError: 'Nome obrigatório', whatsappError: 'WhatsApp inválido', emailError: 'E-mail inválido' },
  step2: { title: 'Ambiente', roomType: 'Ambiente', roomTypePlaceholder: 'Selecione', roomOptions: { sala: 'Sala' }, roomTypeError: 'Selecione um ambiente', area: 'Medidas', floorPlan: 'Planta', floorPlanHint: '', photos: 'Fotos', photosHint: '', fileTooLarge: 'Grande', fileInvalidType: 'Inválido' },
  step3: { title: 'Estilo', styles: 'Estilos', styleOptions: { moderno: 'Moderno' }, mustHave: 'Essencial', mustHavePlaceholder: '', mustHaveHint: '' },
  step4: { title: 'Escopo', scopeType: 'Tipo', scopeOptions: { consultoria: 'Consultoria' }, scopeTypeError: 'Selecione', urgency: 'Urgência', urgencyOptions: { imediata: 'Imediata' }, budget: 'Orçamento', budgetOptions: { ate10k: 'Até 10k' }, errorGeneric: 'Erro' },
  success: { title: 'Obrigado!', message: 'Em breve.' },
}

jest.mock('../../actions/submitQuestionnaire', () => ({
  submitQuestionnaire: jest.fn().mockResolvedValue({ success: true }),
}))

describe('QuestionnaireWizard', () => {
  it('renders step 1 initially', () => {
    render(<QuestionnaireWizard messages={messages} />)
    expect(screen.getByText('Identificação')).toBeInTheDocument()
  })

  it('shows progress indicator', () => {
    render(<QuestionnaireWizard messages={messages} />)
    expect(screen.getByText(/Etapa 1 de 4/)).toBeInTheDocument()
  })
})
