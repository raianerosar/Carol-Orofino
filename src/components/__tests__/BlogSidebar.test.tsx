import { render, screen } from '@testing-library/react'
import BlogSidebar from '../BlogSidebar'

// Mock next-intl
jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockResolvedValue((key: string) => key),
}))

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

// Mock posts with known data for deterministic tests
jest.mock('@/data/posts', () => ({
  posts: [
    { slug: 'post-a', date: '2025-03-01', readTime: 5, category: 'Luxo', translations: { pt: { title: 'Post A' }, en: { title: 'Post A EN' }, es: { title: 'Post A ES' } } },
    { slug: 'post-b', date: '2025-03-20', readTime: 4, category: 'Minimalismo', translations: { pt: { title: 'Post B' }, en: { title: 'Post B EN' }, es: { title: 'Post B ES' } } },
    { slug: 'post-c', date: '2025-03-10', readTime: 6, category: 'Luxo', translations: { pt: { title: 'Post C' }, en: { title: 'Post C EN' }, es: { title: 'Post C ES' } } },
  ],
}))

describe('BlogSidebar', () => {
  it('renders the 2 most recent posts as highlights', async () => {
    const ui = await BlogSidebar({ locale: 'pt' })
    render(ui)
    // post-b (2025-03-20) and post-c (2025-03-10) are the 2 most recent
    expect(screen.getByText('Post B')).toBeInTheDocument()
    expect(screen.getByText('Post C')).toBeInTheDocument()
    expect(screen.queryByText('Post A')).not.toBeInTheDocument()
  })

  it('excludes currentSlug from highlights', async () => {
    const ui = await BlogSidebar({ locale: 'pt', currentSlug: 'post-b' })
    render(ui)
    // post-b excluded; should show post-c and post-a
    expect(screen.queryByText('Post B')).not.toBeInTheDocument()
    expect(screen.getByText('Post C')).toBeInTheDocument()
    expect(screen.getByText('Post A')).toBeInTheDocument()
  })

  it('renders deduplicated categories sorted alphabetically', async () => {
    const ui = await BlogSidebar({ locale: 'pt' })
    render(ui)
    const links = screen.getAllByRole('link').filter(l =>
      ['Luxo', 'Minimalismo'].includes(l.textContent ?? '')
    )
    // Luxo appears once (deduplicated), Minimalismo appears once
    const categoryTexts = links.map(l => l.textContent)
    expect(categoryTexts).toEqual(['Luxo', 'Minimalismo']) // alphabetical
  })

  it('links highlights to the correct post URL', async () => {
    const ui = await BlogSidebar({ locale: 'pt' })
    render(ui)
    const postBLink = screen.getByRole('link', { name: /Post B/ })
    expect(postBLink).toHaveAttribute('href', '/pt/blog/post-b')
  })

  it('links categories to filtered blog URL', async () => {
    const ui = await BlogSidebar({ locale: 'pt' })
    render(ui)
    const luxoLink = screen.getByRole('link', { name: 'Luxo' })
    expect(luxoLink).toHaveAttribute('href', '/pt/blog?category=Luxo')
  })
})
