// src/app/[locale]/comercial/__tests__/page.test.tsx
import { render, screen } from '@testing-library/react'
import ComercialPage from '../page'

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}))

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

jest.mock('@/components/SectionDivider', () => ({
  SectionDivider: () => <hr data-testid="section-divider" />,
}))

async function renderPage() {
  const jsx = await ComercialPage({ params: Promise.resolve({ locale: 'pt' }) })
  return render(jsx)
}

describe('ComercialPage', () => {
  it('renders section 1 with correct label and heading', async () => {
    await renderPage()
    expect(screen.getByText('01 — Identidade')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Design que revela/i })).toBeInTheDocument()
  })

  it('renders section 2 with correct label and heading', async () => {
    await renderPage()
    expect(screen.getByText('02 — Presença')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Ambientes que/i })).toBeInTheDocument()
  })

  it('renders section 3 with correct label and heading', async () => {
    await renderPage()
    expect(screen.getByText('03 — Equilíbrio')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Funcionalidade/i })).toBeInTheDocument()
  })

  it('renders all three new images with correct alt text', async () => {
    await renderPage()
    expect(screen.getByAltText('Escritório comercial Carol Orofino — identidade')).toBeInTheDocument()
    expect(screen.getByAltText('Escritório executivo Carol Orofino — presença')).toBeInTheDocument()
    expect(screen.getByAltText('Escritório comercial Carol Orofino — equilíbrio')).toBeInTheDocument()
  })

  it('uses the new .png image sources', async () => {
    await renderPage()
    const images = screen.getAllByRole('img')
    const srcs = images.map((img) => img.getAttribute('src'))
    expect(srcs).toContain('/images/categories/comercial-01.png')
    expect(srcs).toContain('/images/categories/comercial-02.png')
    expect(srcs).toContain('/images/categories/comercial-03.png')
  })
})
