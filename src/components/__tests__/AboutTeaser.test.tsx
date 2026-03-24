// src/components/__tests__/AboutTeaser.test.tsx
import { render, screen } from '@testing-library/react'
import { AboutTeaser } from '../AboutTeaser'

// Framer Motion uses browser APIs not available in jsdom — mock it
jest.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      className,
    }: {
      children: React.ReactNode
      className?: string
    }) => <div className={className}>{children}</div>,
  },
}))

// Next/image mock
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}))

const defaultProps = {
  locale: 'pt',
  eyebrow: 'Sobre nós',
  title: 'Carol Orofino',
  teaser: 'Acredito que cada espaço conta uma história.',
  ctaLabel: 'Conheça mais',
}

describe('AboutTeaser', () => {
  it('renders the eyebrow text', () => {
    render(<AboutTeaser {...defaultProps} />)
    expect(screen.getByText('Sobre nós')).toBeInTheDocument()
  })

  it('renders the title', () => {
    render(<AboutTeaser {...defaultProps} />)
    expect(screen.getByText('Carol Orofino')).toBeInTheDocument()
  })

  it('renders the teaser paragraph', () => {
    render(<AboutTeaser {...defaultProps} />)
    expect(
      screen.getByText('Acredito que cada espaço conta uma história.')
    ).toBeInTheDocument()
  })

  it('renders a CTA link pointing to the correct locale about page', () => {
    render(<AboutTeaser {...defaultProps} />)
    const link = screen.getByRole('link', { name: /Conheça mais/i })
    expect(link).toHaveAttribute('href', '/pt/sobre')
  })

  it('renders the Carol portrait image', () => {
    render(<AboutTeaser {...defaultProps} />)
    const img = screen.getByAltText('Carol Orofino')
    expect(img).toBeInTheDocument()
  })
})
