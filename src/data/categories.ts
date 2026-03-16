// src/data/categories.ts

export type CategorySlug =
  | 'residencial'
  | 'comercial'
  | 'reforma'
  | 'design-de-interiores'

export interface CategoryImage {
  src: string
  alt: { pt: string; en: string; es: string }
}

// Typed as readonly CategorySlug[] so it can be used directly in generateStaticParams
export const KNOWN_SLUGS: readonly CategorySlug[] = [
  'residencial',
  'comercial',
  'reforma',
  'design-de-interiores',
]

// Each entry has EXACTLY 2 images — enforced by the tuple type [CategoryImage, CategoryImage].
// Replace placeholder paths and alt texts with real content when provided by client.
export const categoryImages: Record<CategorySlug, [CategoryImage, CategoryImage]> = {
  residencial: [
    {
      src: '/images/categories/residencial-01.jpg',
      alt: {
        pt: 'Projeto residencial 1',
        en: 'Residential project 1',
        es: 'Proyecto residencial 1',
      },
    },
    {
      src: '/images/categories/residencial-02.jpg',
      alt: {
        pt: 'Projeto residencial 2',
        en: 'Residential project 2',
        es: 'Proyecto residencial 2',
      },
    },
  ],
  comercial: [
    {
      src: '/images/categories/comercial-01.jpg',
      alt: {
        pt: 'Projeto comercial 1',
        en: 'Commercial project 1',
        es: 'Proyecto comercial 1',
      },
    },
    {
      src: '/images/categories/comercial-02.jpg',
      alt: {
        pt: 'Projeto comercial 2',
        en: 'Commercial project 2',
        es: 'Proyecto comercial 2',
      },
    },
  ],
  reforma: [
    {
      src: '/images/categories/reforma-01.jpg',
      alt: {
        pt: 'Reforma 1',
        en: 'Renovation 1',
        es: 'Reforma 1',
      },
    },
    {
      src: '/images/categories/reforma-02.jpg',
      alt: {
        pt: 'Reforma 2',
        en: 'Renovation 2',
        es: 'Reforma 2',
      },
    },
  ],
  'design-de-interiores': [
    {
      src: '/images/categories/design-interiores-01.jpg',
      alt: {
        pt: 'Design de interiores 1',
        en: 'Interior design 1',
        es: 'Diseño de interiores 1',
      },
    },
    {
      src: '/images/categories/design-interiores-02.jpg',
      alt: {
        pt: 'Design de interiores 2',
        en: 'Interior design 2',
        es: 'Diseño de interiores 2',
      },
    },
  ],
}
