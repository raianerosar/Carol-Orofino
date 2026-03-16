import { render, screen } from '@testing-library/react'
import ProjectCard from '../ProjectCard'

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: { alt: string; src: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={props.alt} src={props.src} />
  ),
}))

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

const mockProject = {
  slug: 'test-project',
  category: 'residencial' as const,
  year: 2024,
  location: 'São Paulo, SP',
  coverImage: '/images/test.jpg',
  coverImageAlt: { pt: 'Imagem de teste', en: 'Test image', es: 'Imagen de prueba' },
  coverImageBlurDataURL: 'data:image/jpeg;base64,abc',
  images: [],
  featured: false,
  translations: {
    pt: { title: 'Projeto Teste', description: 'Descrição' },
    en: { title: 'Test Project', description: 'Description' },
    es: { title: 'Proyecto Prueba', description: 'Descripción' },
  },
}

describe('ProjectCard', () => {
  it('renders project title', () => {
    render(<ProjectCard project={mockProject} locale="pt" />)
    const titles = screen.getAllByText('Projeto Teste')
    expect(titles.length).toBeGreaterThan(0)
    expect(titles[0]).toBeInTheDocument()
  })

  it('renders link to project detail', () => {
    render(<ProjectCard project={mockProject} locale="pt" />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/pt/projetos/test-project')
  })

  it('renders cover image with correct alt text', () => {
    render(<ProjectCard project={mockProject} locale="pt" />)
    expect(screen.getByAltText('Imagem de teste')).toBeInTheDocument()
  })
})
