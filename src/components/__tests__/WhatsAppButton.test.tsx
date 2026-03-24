// src/components/__tests__/WhatsAppButton.test.tsx
import { render, screen } from '@testing-library/react'
import WhatsAppButton from '../WhatsAppButton'

// next-intl mock
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

describe('WhatsAppButton', () => {
  const originalEnv = process.env

  beforeEach(() => {
    process.env = { ...originalEnv, NEXT_PUBLIC_WHATSAPP_NUMBER: '5511999999999' }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('renders a link with correct WhatsApp URL', () => {
    render(<WhatsAppButton message="Test message" />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute(
      'href',
      expect.stringContaining('wa.me/5511999999999')
    )
  })

  it('opens in a new tab', () => {
    render(<WhatsAppButton message="Test" />)
    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank')
  })

  it('renders inline variant with slate style', () => {
    render(<WhatsAppButton variant="inline" message="oi" label="Falar" />)
    const link = screen.getByRole('link')
    expect(link.className).toContain('bg-slate')
    expect(link.className).toContain('text-white')
  })
})
