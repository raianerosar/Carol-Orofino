# Questionnaire Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 4-step briefing questionnaire at `/[locale]/questionario` that collects client project info and emails it to Carol via Resend, with file uploads stored in Vercel Blob.

**Architecture:** Wizard is a Client Component (`QuestionnaireWizard`) that accumulates form state across 4 steps. On submit, a Server Action uploads files to Vercel Blob then sends a structured HTML email via Resend. All strings are i18n'd via next-intl in `src/messages/{pt,en,es}.json`.

**Tech Stack:** Next.js 14 (App Router), next-intl 4, Tailwind CSS, Resend, @vercel/blob, Jest + React Testing Library

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/messages/pt.json` | Modify | Add `questionnaire.*` and `contact.questionnaireLink` keys (PT) |
| `src/messages/en.json` | Modify | Same keys in English |
| `src/messages/es.json` | Modify | Same keys in Spanish |
| `src/app/[locale]/questionario/page.tsx` | Create | Server Component — page metadata + renders wizard |
| `src/components/questionnaire/QuestionnaireWizard.tsx` | Create | Client Component — step state, progress bar, navigation |
| `src/components/questionnaire/Step1Identity.tsx` | Create | Name, WhatsApp, Email fields + validation |
| `src/components/questionnaire/Step2Environment.tsx` | Create | Room type, area, file uploads + validation |
| `src/components/questionnaire/Step3Style.tsx` | Create | Style cards, Pinterest link, must-have textarea |
| `src/components/questionnaire/Step4Scope.tsx` | Create | Scope radio, urgency radio, budget select |
| `src/components/questionnaire/SuccessScreen.tsx` | Create | Thank-you screen shown after successful submission |
| `src/actions/submitQuestionnaire.ts` | Create | Server Action — Vercel Blob uploads + Resend email |
| `src/app/[locale]/contato/page.tsx` | Modify | Add link to questionnaire page |
| `src/components/__tests__/QuestionnaireWizard.test.tsx` | Create | Tests for wizard navigation + step state |
| `src/components/__tests__/Step1Identity.test.tsx` | Create | Tests for field validation |
| `src/actions/__tests__/submitQuestionnaire.test.ts` | Create | Tests for WhatsApp normalisation + email HTML |

---

## Task 1: Install dependencies and add i18n keys

**Files:**
- Modify: `package.json` (via npm install)
- Modify: `src/messages/pt.json`
- Modify: `src/messages/en.json`
- Modify: `src/messages/es.json`

- [ ] **Step 1: Install packages**

```bash
npm install resend @vercel/blob
```

Expected: packages appear in `package.json` dependencies.

- [ ] **Step 2: Add PT translations**

In `src/messages/pt.json`, add inside the root object:

```json
"contact": {
  ...existing keys...,
  "questionnaireLink": "Preencher questionário de briefing"
},
"questionnaire": {
  "title": "Questionário de Briefing",
  "progress": "Etapa {current} de {total}",
  "next": "Próximo",
  "back": "Voltar",
  "submit": "Enviar",
  "submitting": "Enviando...",
  "errorGeneric": "Algo deu errado. Por favor, tente novamente.",
  "step1": {
    "title": "Identificação e Contato",
    "name": "Nome completo",
    "whatsapp": "WhatsApp",
    "email": "E-mail",
    "namePlaceholder": "Seu nome completo",
    "whatsappPlaceholder": "(11) 99999-0000",
    "emailPlaceholder": "seu@email.com",
    "nameError": "Nome obrigatório",
    "whatsappError": "WhatsApp inválido",
    "emailError": "E-mail inválido"
  },
  "step2": {
    "title": "O Ambiente",
    "roomType": "Qual ambiente deseja transformar?",
    "roomTypePlaceholder": "Selecione...",
    "roomOptions": {
      "sala": "Sala",
      "quarto": "Quarto",
      "cozinha": "Cozinha",
      "escritorio": "Escritório",
      "consultorio": "Consultório",
      "outro": "Outro"
    },
    "roomTypeError": "Selecione o tipo de ambiente",
    "area": "Metragem aproximada (m²)",
    "floorPlan": "Planta baixa ou croqui (opcional)",
    "floorPlanHint": "PDF, PNG ou JPG — máx. 10MB",
    "photos": "Fotos ou vídeos do ambiente (opcional)",
    "photosHint": "Múltiplos arquivos — máx. 50MB no total",
    "fileTooLarge": "Arquivo excede o tamanho máximo",
    "fileInvalidType": "Tipo de arquivo não permitido"
  },
  "step3": {
    "title": "Estilo e Referências",
    "styles": "Qual estilo combina com você?",
    "styleOptions": {
      "minimalista": "Minimalista",
      "industrial": "Industrial",
      "escandinavo": "Escandinavo",
      "classico": "Clássico",
      "moderno": "Moderno"
    },
    "pinterest": "Link do Pinterest (opcional)",
    "pinterestPlaceholder": "https://pinterest.com/...",
    "mustHave": "O que não pode faltar no seu projeto?",
    "mustHavePlaceholder": "Ex: mesa de trabalho grande, iluminação quente...",
    "mustHaveHint": "Máx. 500 caracteres"
  },
  "step4": {
    "title": "Escopo e Investimento",
    "scopeType": "O que você busca?",
    "scopeOptions": {
      "consultoria": "Consultoria de cores e móveis",
      "projeto3d": "Projeto 3D detalhado",
      "reforma": "Reforma completa com acompanhamento"
    },
    "scopeTypeError": "Selecione o tipo de projeto",
    "urgency": "Qual a sua urgência?",
    "urgencyOptions": {
      "imediata": "Imediata",
      "3meses": "Daqui a 3 meses",
      "sondando": "Apenas sondando"
    },
    "budget": "Faixa de investimento na execução",
    "budgetOptions": {
      "ate10k": "Até R$ 10.000",
      "10a30k": "R$ 10.000 – R$ 30.000",
      "30a80k": "R$ 30.000 – R$ 80.000",
      "acima80k": "Acima de R$ 80.000"
    }
  },
  "success": {
    "title": "Obrigado!",
    "message": "Recebemos seu questionário e entraremos em contato em breve."
  }
}
```

- [ ] **Step 3: Add EN translations**

In `src/messages/en.json`, add inside the root object (merge into existing `contact` key):

```json
"contact": {
  ...existing keys...,
  "questionnaireLink": "Fill out briefing questionnaire"
},
"questionnaire": {
  "title": "Briefing Questionnaire",
  "progress": "Step {current} of {total}",
  "next": "Next",
  "back": "Back",
  "submit": "Submit",
  "submitting": "Submitting...",
  "errorGeneric": "Something went wrong. Please try again.",
  "step1": {
    "title": "Identification & Contact",
    "name": "Full name",
    "whatsapp": "WhatsApp",
    "email": "Email",
    "namePlaceholder": "Your full name",
    "whatsappPlaceholder": "(11) 99999-0000",
    "emailPlaceholder": "your@email.com",
    "nameError": "Name is required",
    "whatsappError": "Invalid WhatsApp number",
    "emailError": "Invalid email"
  },
  "step2": {
    "title": "The Space",
    "roomType": "Which space do you want to transform?",
    "roomTypePlaceholder": "Select...",
    "roomOptions": {
      "sala": "Living Room",
      "quarto": "Bedroom",
      "cozinha": "Kitchen",
      "escritorio": "Office",
      "consultorio": "Commercial Space",
      "outro": "Other"
    },
    "roomTypeError": "Please select a room type",
    "area": "Approximate area (m²)",
    "floorPlan": "Floor plan or sketch (optional)",
    "floorPlanHint": "PDF, PNG or JPG — max 10MB",
    "photos": "Photos or videos of the current space (optional)",
    "photosHint": "Multiple files — max 50MB total",
    "fileTooLarge": "File exceeds the maximum size",
    "fileInvalidType": "File type not allowed"
  },
  "step3": {
    "title": "Style & References",
    "styles": "Which style suits you best?",
    "styleOptions": {
      "minimalista": "Minimalist",
      "industrial": "Industrial",
      "escandinavo": "Scandinavian",
      "classico": "Classic",
      "moderno": "Modern"
    },
    "pinterest": "Pinterest link (optional)",
    "pinterestPlaceholder": "https://pinterest.com/...",
    "mustHave": "What must your project include?",
    "mustHavePlaceholder": "E.g. large work desk, warm lighting...",
    "mustHaveHint": "Max 500 characters"
  },
  "step4": {
    "title": "Scope & Investment",
    "scopeType": "What are you looking for?",
    "scopeOptions": {
      "consultoria": "Color and furniture consultation",
      "projeto3d": "Detailed 3D project",
      "reforma": "Full renovation with supervision"
    },
    "scopeTypeError": "Please select a project type",
    "urgency": "How urgent is this for you?",
    "urgencyOptions": {
      "imediata": "Right away",
      "3meses": "In 3 months",
      "sondando": "Just exploring"
    },
    "budget": "Execution investment range",
    "budgetOptions": {
      "ate10k": "Up to R$ 10,000",
      "10a30k": "R$ 10,000 – R$ 30,000",
      "30a80k": "R$ 30,000 – R$ 80,000",
      "acima80k": "Above R$ 80,000"
    }
  },
  "success": {
    "title": "Thank you!",
    "message": "We received your questionnaire and will be in touch soon."
  }
}
```

- [ ] **Step 4: Add ES translations**

In `src/messages/es.json`, add inside the root object (merge into existing `contact` key):

```json
"contact": {
  ...existing keys...,
  "questionnaireLink": "Completar cuestionario de briefing"
},
"questionnaire": {
  "title": "Cuestionario de Briefing",
  "progress": "Paso {current} de {total}",
  "next": "Siguiente",
  "back": "Atrás",
  "submit": "Enviar",
  "submitting": "Enviando...",
  "errorGeneric": "Algo salió mal. Por favor, inténtalo de nuevo.",
  "step1": {
    "title": "Identificación y Contacto",
    "name": "Nombre completo",
    "whatsapp": "WhatsApp",
    "email": "Correo electrónico",
    "namePlaceholder": "Tu nombre completo",
    "whatsappPlaceholder": "(11) 99999-0000",
    "emailPlaceholder": "tu@correo.com",
    "nameError": "Nombre obligatorio",
    "whatsappError": "WhatsApp inválido",
    "emailError": "Correo electrónico inválido"
  },
  "step2": {
    "title": "El Espacio",
    "roomType": "¿Qué espacio deseas transformar?",
    "roomTypePlaceholder": "Selecciona...",
    "roomOptions": {
      "sala": "Sala de estar",
      "quarto": "Dormitorio",
      "cozinha": "Cocina",
      "escritorio": "Oficina",
      "consultorio": "Local comercial",
      "outro": "Otro"
    },
    "roomTypeError": "Selecciona el tipo de espacio",
    "area": "Superficie aproximada (m²)",
    "floorPlan": "Plano o croquis (opcional)",
    "floorPlanHint": "PDF, PNG o JPG — máx. 10MB",
    "photos": "Fotos o vídeos del espacio actual (opcional)",
    "photosHint": "Varios archivos — máx. 50MB en total",
    "fileTooLarge": "El archivo supera el tamaño máximo",
    "fileInvalidType": "Tipo de archivo no permitido"
  },
  "step3": {
    "title": "Estilo y Referencias",
    "styles": "¿Qué estilo te identifica?",
    "styleOptions": {
      "minimalista": "Minimalista",
      "industrial": "Industrial",
      "escandinavo": "Escandinavo",
      "classico": "Clásico",
      "moderno": "Moderno"
    },
    "pinterest": "Enlace de Pinterest (opcional)",
    "pinterestPlaceholder": "https://pinterest.com/...",
    "mustHave": "¿Qué no puede faltar en tu proyecto?",
    "mustHavePlaceholder": "Ej: escritorio grande, iluminación cálida...",
    "mustHaveHint": "Máx. 500 caracteres"
  },
  "step4": {
    "title": "Alcance e Inversión",
    "scopeType": "¿Qué buscas en este momento?",
    "scopeOptions": {
      "consultoria": "Consultoría de colores y muebles",
      "projeto3d": "Proyecto 3D detallado",
      "reforma": "Reforma completa con seguimiento"
    },
    "scopeTypeError": "Selecciona el tipo de proyecto",
    "urgency": "¿Cuál es tu urgencia?",
    "urgencyOptions": {
      "imediata": "Inmediata",
      "3meses": "En 3 meses",
      "sondando": "Solo explorando"
    },
    "budget": "Rango de inversión en la ejecución",
    "budgetOptions": {
      "ate10k": "Hasta R$ 10.000",
      "10a30k": "R$ 10.000 – R$ 30.000",
      "30a80k": "R$ 30.000 – R$ 80.000",
      "acima80k": "Más de R$ 80.000"
    }
  },
  "success": {
    "title": "¡Gracias!",
    "message": "Recibimos tu cuestionario y nos pondremos en contacto pronto."
  }
}
```

- [ ] **Step 5: Commit**

```bash
git add src/messages/pt.json src/messages/en.json src/messages/es.json package.json package-lock.json
git commit -m "feat(questionnaire): install deps and add i18n keys"
```

---

## Task 2: Server Action — submitQuestionnaire

**Files:**
- Create: `src/actions/submitQuestionnaire.ts`
- Create: `src/actions/__tests__/submitQuestionnaire.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `src/actions/__tests__/submitQuestionnaire.test.ts`:

```ts
import { normalizeWhatsApp, buildEmailHtml } from '../submitQuestionnaire'

describe('normalizeWhatsApp', () => {
  it('strips formatting and adds 55 prefix', () => {
    expect(normalizeWhatsApp('(11) 99999-0000')).toBe('5511999990000')
  })

  it('does not double-add 55 prefix', () => {
    expect(normalizeWhatsApp('5511999990000')).toBe('5511999990000')
  })

  it('strips +55 and keeps digits', () => {
    expect(normalizeWhatsApp('+55 11 99999-0000')).toBe('5511999990000')
  })
})

describe('buildEmailHtml', () => {
  it('includes client name in subject line', () => {
    const html = buildEmailHtml({
      name: 'Ana Silva',
      whatsapp: '5511999990000',
      email: 'ana@test.com',
      roomType: 'sala',
      area: 35,
      floorPlanUrl: null,
      photoUrls: [],
      styles: ['minimalista'],
      pinterest: '',
      mustHave: 'Mesa grande',
      scopeType: 'projeto3d',
      urgency: 'imediata',
      budget: '10a30k',
    })
    expect(html).toContain('Ana Silva')
    expect(html).toContain('wa.me/5511999990000')
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test -- --testPathPattern=submitQuestionnaire
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement the Server Action**

Create `src/actions/submitQuestionnaire.ts`:

```ts
'use server'

import { put } from '@vercel/blob'
import { Resend } from 'resend'

export type QuestionnaireData = {
  // Step 1
  name: string
  whatsapp: string
  email: string
  // Step 2
  roomType: string
  area: number | null
  floorPlanFile: File | null
  photoFiles: File[]
  // Step 3
  styles: string[]
  pinterest: string
  mustHave: string
  // Step 4
  scopeType: string
  urgency: string
  budget: string
}

type ActionResult = { success: true } | { success: false; error: string }

export function normalizeWhatsApp(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  return digits.startsWith('55') ? digits : `55${digits}`
}

export function buildEmailHtml(data: {
  name: string
  whatsapp: string
  email: string
  roomType: string
  area: number | null
  floorPlanUrl: string | null
  photoUrls: string[]
  styles: string[]
  pinterest: string
  mustHave: string
  scopeType: string
  urgency: string
  budget: string
}): string {
  const waUrl = `https://wa.me/${data.whatsapp}`
  const fileLinks = [
    data.floorPlanUrl ? `<a href="${data.floorPlanUrl}">Planta baixa</a>` : null,
    ...data.photoUrls.map((url, i) => `<a href="${url}">Foto ${i + 1}</a>`),
  ]
    .filter(Boolean)
    .join(', ')

  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#333">Novo questionário — ${data.name}</h2>
      <hr/>

      <h3>👤 Identificação</h3>
      <p><strong>Nome:</strong> ${data.name}<br/>
      <strong>WhatsApp:</strong> ${data.whatsapp}<br/>
      <strong>E-mail:</strong> ${data.email}</p>

      <h3>🏠 Ambiente</h3>
      <p><strong>Tipo:</strong> ${data.roomType}<br/>
      ${data.area ? `<strong>Metragem:</strong> ${data.area} m²<br/>` : ''}
      ${fileLinks ? `<strong>Arquivos:</strong> ${fileLinks}` : ''}</p>

      <h3>🎨 Estilo</h3>
      <p><strong>Estilos:</strong> ${data.styles.join(', ') || '—'}<br/>
      ${data.pinterest ? `<strong>Pinterest:</strong> <a href="${data.pinterest}">${data.pinterest}</a><br/>` : ''}
      ${data.mustHave ? `<strong>Deve ter:</strong> ${data.mustHave}` : ''}</p>

      <h3>📋 Escopo</h3>
      <p><strong>Tipo:</strong> ${data.scopeType}<br/>
      ${data.urgency ? `<strong>Urgência:</strong> ${data.urgency}<br/>` : ''}
      ${data.budget ? `<strong>Investimento:</strong> ${data.budget}` : ''}</p>

      <hr/>
      <a href="${waUrl}" style="display:inline-block;background:#25D366;color:white;padding:10px 20px;border-radius:4px;text-decoration:none;font-weight:bold">
        💬 Responder no WhatsApp
      </a>
    </div>
  `
}

export async function submitQuestionnaire(data: QuestionnaireData): Promise<ActionResult> {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const normalizedWa = normalizeWhatsApp(data.whatsapp)

    // Upload floor plan
    let floorPlanUrl: string | null = null
    if (data.floorPlanFile) {
      const timestamp = Date.now()
      const safeName = data.floorPlanFile.name.replace(/[^a-zA-Z0-9._-]/g, '_')
      const blob = await put(`questionnaire/${timestamp}-${safeName}`, data.floorPlanFile, {
        access: 'public',
      })
      floorPlanUrl = blob.url
    }

    // Upload photos/videos
    const photoUrls: string[] = []
    for (const file of data.photoFiles) {
      const timestamp = Date.now()
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
      const blob = await put(`questionnaire/${timestamp}-${safeName}`, file, {
        access: 'public',
      })
      photoUrls.push(blob.url)
    }

    const html = buildEmailHtml({
      name: data.name,
      whatsapp: normalizedWa,
      email: data.email,
      roomType: data.roomType,
      area: data.area,
      floorPlanUrl,
      photoUrls,
      styles: data.styles,
      pinterest: data.pinterest,
      mustHave: data.mustHave,
      scopeType: data.scopeType,
      urgency: data.urgency,
      budget: data.budget,
    })

    await resend.emails.send({
      from: 'questionario@carolorofino.com.br',
      to: 'carol@carolorofino.com.br',
      subject: `Novo questionário — ${data.name}`,
      html,
    })

    return { success: true }
  } catch {
    return { success: false, error: 'generic' }
  }
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test -- --testPathPattern=submitQuestionnaire
```

Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/actions/submitQuestionnaire.ts src/actions/__tests__/submitQuestionnaire.test.ts
git commit -m "feat(questionnaire): server action with Resend + Vercel Blob"
```

---

## Task 3: Step components

**Files:**
- Create: `src/components/questionnaire/Step1Identity.tsx`
- Create: `src/components/questionnaire/Step2Environment.tsx`
- Create: `src/components/questionnaire/Step3Style.tsx`
- Create: `src/components/questionnaire/Step4Scope.tsx`
- Create: `src/components/questionnaire/SuccessScreen.tsx`
- Create: `src/components/__tests__/Step1Identity.test.tsx`

- [ ] **Step 1: Write failing tests for Step1Identity**

Create `src/components/__tests__/Step1Identity.test.tsx`:

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import Step1Identity from '../questionnaire/Step1Identity'

const messages = {
  name: 'Nome completo', whatsapp: 'WhatsApp', email: 'E-mail',
  namePlaceholder: 'Seu nome', whatsappPlaceholder: '(11) 99999-0000',
  emailPlaceholder: 'seu@email.com',
  nameError: 'Nome obrigatório', whatsappError: 'WhatsApp inválido', emailError: 'E-mail inválido',
}

const defaultData = { name: '', whatsapp: '', email: '' }

describe('Step1Identity', () => {
  it('shows name error when name is empty on submit attempt', () => {
    const onNext = jest.fn()
    render(<Step1Identity data={defaultData} onChange={jest.fn()} onNext={onNext} messages={messages} nextLabel="Próximo" />)
    fireEvent.click(screen.getByText('Próximo'))
    expect(screen.getByText('Nome obrigatório')).toBeInTheDocument()
    expect(onNext).not.toHaveBeenCalled()
  })

  it('calls onNext with valid data', () => {
    const onNext = jest.fn()
    const onChange = jest.fn()
    render(<Step1Identity data={{ name: 'Ana', whatsapp: '11999990000', email: 'a@b.com' }} onChange={onChange} onNext={onNext} messages={messages} nextLabel="Próximo" />)
    fireEvent.click(screen.getByText('Próximo'))
    expect(onNext).toHaveBeenCalled()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- --testPathPattern=Step1Identity
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement Step1Identity**

Create `src/components/questionnaire/Step1Identity.tsx`:

```tsx
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
```

- [ ] **Step 4: Implement Step2Environment**

Create `src/components/questionnaire/Step2Environment.tsx`:

```tsx
'use client'

import { useState } from 'react'

const FLOOR_PLAN_TYPES = ['application/pdf', 'image/png', 'image/jpeg']
const PHOTO_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'video/mp4', 'video/quicktime']
const FLOOR_PLAN_MAX = 10 * 1024 * 1024  // 10MB
const PHOTOS_MAX_TOTAL = 50 * 1024 * 1024 // 50MB

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
```

- [ ] **Step 5: Implement Step3Style**

Create `src/components/questionnaire/Step3Style.tsx`:

```tsx
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
```

- [ ] **Step 6: Implement Step4Scope**

Create `src/components/questionnaire/Step4Scope.tsx`:

```tsx
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
```

- [ ] **Step 7: Implement SuccessScreen**

Create `src/components/questionnaire/SuccessScreen.tsx`:

```tsx
type Props = { title: string; message: string }

export default function SuccessScreen({ title, message }: Props) {
  return (
    <div className="flex flex-col items-center gap-6 py-16 text-center">
      <div className="text-4xl">✓</div>
      <h2 className="font-heading text-2xl">{title}</h2>
      <p className="font-body text-sm text-gray-500">{message}</p>
    </div>
  )
}
```

- [ ] **Step 8: Run tests**

```bash
npm test -- --testPathPattern=Step1Identity
```

Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add src/components/questionnaire/
git add src/components/__tests__/Step1Identity.test.tsx
git commit -m "feat(questionnaire): add step components and success screen"
```

---

## Task 4: QuestionnaireWizard (orchestrator)

**Files:**
- Create: `src/components/questionnaire/QuestionnaireWizard.tsx`
- Create: `src/components/__tests__/QuestionnaireWizard.test.tsx`

- [ ] **Step 1: Write failing tests**

Create `src/components/__tests__/QuestionnaireWizard.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import QuestionnaireWizard from '../questionnaire/QuestionnaireWizard'

// Minimal messages shape
const messages = {
  title: 'Questionário',
  progress: 'Etapa {current} de {total}',
  next: 'Próximo', back: 'Voltar', submit: 'Enviar', submitting: 'Enviando...',
  errorGeneric: 'Erro',
  step1: { title: 'Identificação', name: 'Nome', whatsapp: 'WhatsApp', email: 'E-mail', namePlaceholder: '', whatsappPlaceholder: '', emailPlaceholder: '', nameError: 'Nome obrigatório', whatsappError: 'WhatsApp inválido', emailError: 'E-mail inválido' },
  step2: { title: 'Ambiente', roomType: 'Ambiente', roomTypePlaceholder: 'Selecione', roomOptions: { sala: 'Sala' }, roomTypeError: 'Selecione', area: 'Metragem', floorPlan: 'Planta', floorPlanHint: '', photos: 'Fotos', photosHint: '', fileTooLarge: 'Grande', fileInvalidType: 'Inválido' },
  step3: { title: 'Estilo', styles: 'Estilos', styleOptions: { moderno: 'Moderno' }, pinterest: 'Pinterest', pinterestPlaceholder: '', mustHave: 'Essencial', mustHavePlaceholder: '', mustHaveHint: '' },
  step4: { title: 'Escopo', scopeType: 'Tipo', scopeOptions: { consultoria: 'Consultoria' }, scopeTypeError: 'Selecione', urgency: 'Urgência', urgencyOptions: { imediata: 'Imediata' }, budget: 'Orçamento', budgetOptions: { ate10k: 'Até 10k' } },
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
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test -- --testPathPattern=QuestionnaireWizard
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement QuestionnaireWizard**

Create `src/components/questionnaire/QuestionnaireWizard.tsx`:

```tsx
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
  step1: React.ComponentProps<typeof Step1Identity>['messages']
  step2: React.ComponentProps<typeof Step2Environment>['messages']
  step3: React.ComponentProps<typeof Step3Style>['messages']
  step4: React.ComponentProps<typeof Step4Scope>['messages']
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
  const progressLabel = messages.progress.replace('{current}', String(step)).replace('{total}', String(TOTAL))

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

  if (submitted) return <SuccessScreen title={messages.success.title} message={messages.success.message} />

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <p className="font-body text-xs uppercase tracking-widest text-gray-400 mb-3">{progressLabel}</p>
        <div className="flex gap-2">
          {Array.from({ length: TOTAL }, (_, i) => (
            <div key={i} className={`h-0.5 flex-1 ${i + 1 <= step ? 'bg-text-primary' : 'bg-gray-200'}`} />
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
```

- [ ] **Step 4: Run tests**

```bash
npm test -- --testPathPattern=QuestionnaireWizard
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/questionnaire/QuestionnaireWizard.tsx src/components/__tests__/QuestionnaireWizard.test.tsx
git commit -m "feat(questionnaire): add QuestionnaireWizard orchestrator"
```

---

## Task 5: Page and contact link

**Files:**
- Create: `src/app/[locale]/questionario/page.tsx`
- Modify: `src/app/[locale]/contato/page.tsx`

- [ ] **Step 1: Create the questionnaire page**

Create `src/app/[locale]/questionario/page.tsx`:

```tsx
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
    progress: t('progress'),
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
      },
      pinterest: t('step3.pinterest'),
      pinterestPlaceholder: t('step3.pinterestPlaceholder'),
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
    },
    success: {
      title: t('success.title'),
      message: t('success.message'),
    },
  }

  return (
    <div className="min-h-[calc(100vh-80px)] px-6 py-16">
      <QuestionnaireWizard messages={messages} />
    </div>
  )
}
```

- [ ] **Step 2: Add questionnaire link to contact page**

In `src/app/[locale]/contato/page.tsx`, add `questionnaireLink` to the translation call and insert a link button above the WhatsApp CTA:

```tsx
// After: const t = await getTranslations({ locale, namespace: 'contact' })
// Add this link before the WhatsApp Link:

<Link
  href={`/${locale}/questionario`}
  className="inline-flex items-center gap-3 border border-text-primary px-10 py-4 font-body text-sm uppercase tracking-widest text-text-primary transition-colors hover:bg-text-primary hover:text-background"
>
  {t('questionnaireLink')}
</Link>
```

- [ ] **Step 3: Run full test suite**

```bash
npm test
```

Expected: all tests pass.

- [ ] **Step 4: Run dev server and manually verify**

```bash
npm run dev
```

Open `http://localhost:3000/pt/questionario` — wizard should render with 4 steps.
Open `http://localhost:3000/pt/contato` — link to questionnaire should appear.
Check `http://localhost:3000/en/questionnaire` and `http://localhost:3000/es/cuestionario` also load.

- [ ] **Step 5: Commit**

```bash
git add src/app/[locale]/questionario/ src/app/[locale]/contato/page.tsx
git commit -m "feat(questionnaire): add page route and contact page link"
```

---

## Task 6: Environment variables

**Files:**
- Modify: `.env.local` (create if absent)

- [ ] **Step 1: Add env vars to .env.local**

Add to `.env.local` (get values from Resend dashboard and Vercel Blob setup):

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxxxxx
```

- [ ] **Step 2: Verify in Vercel dashboard**

Add the same two variables in Vercel → Project Settings → Environment Variables for Production and Preview.

- [ ] **Step 3: Smoke-test the full flow**

With dev server running and env vars set, fill out the wizard completely and submit. Verify:
- Carol's inbox receives the email with all fields
- Any uploaded files are accessible via their Blob URLs in the email
- Success screen is shown after submit

---

## Task 7: Final cleanup

- [ ] **Step 1: Run full test suite one last time**

```bash
npm test
```

Expected: all tests pass, no regressions.

- [ ] **Step 2: Run build to catch type errors**

```bash
npm run build
```

Expected: successful build, no TypeScript errors.

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat(questionnaire): complete briefing questionnaire feature"
```
