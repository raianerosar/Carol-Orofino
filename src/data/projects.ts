export interface ProjectImage {
  src: string
  altText: {
    pt: string
    en: string
    es: string
  }
}

export interface Project {
  slug: string
  category: 'residencial' | 'comercial' | 'reforma' | 'consultoria'
  year: number
  location: string
  coverImage: string
  coverImageAlt: {
    pt: string
    en: string
    es: string
  }
  coverImageBlurDataURL: string
  images: ProjectImage[]
  featured: boolean
  translations: {
    pt: { title: string; description: string }
    en: { title: string; description: string }
    es: { title: string; description: string }
  }
}

// Minimal base64 blur placeholder (1x1 beige pixel)
const BLUR_PLACEHOLDER =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoH' +
  'BwYIDAoMCwsKCwsNCxAQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/wAAR' +
  'CAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAA' +
  'AAAAAAAAAAAAAAAAP/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAA' +
  'AAAAAAAAAAD/2gAMAwEAAhEDEQA/AJIAP//Z'

export const projects: Project[] = [
  {
    slug: 'apartamento-jardins',
    category: 'residencial',
    year: 2024,
    location: 'Florianópolis, SC',
    coverImage: '/images/projects/apartamento-jardins/cover.jpg',
    coverImageAlt: {
      pt: 'Sala de estar com sofá bege e detalhes em madeira natural',
      en: 'Living room with beige sofa and natural wood details',
      es: 'Sala de estar con sofá beige y detalles en madera natural',
    },
    coverImageBlurDataURL: BLUR_PLACEHOLDER,
    images: [
      {
        src: '/images/projects/apartamento-jardins/01.jpg',
        altText: {
          pt: 'Vista da sala de jantar integrada',
          en: 'Integrated dining room view',
          es: 'Vista del comedor integrado',
        },
      },
    ],
    featured: true,
    translations: {
      pt: {
        title: 'Apartamento Jardins',
        description:
          'Projeto residencial que une sofisticação escandinava com elementos brasileiros, criando um ambiente acolhedor e atemporal.',
      },
      en: {
        title: 'Jardins Apartment',
        description:
          'Residential project uniting Scandinavian sophistication with Brazilian elements, creating a welcoming and timeless space.',
      },
      es: {
        title: 'Apartamento Jardins',
        description:
          'Proyecto residencial que une sofisticación escandinava con elementos brasileños, creando un ambiente acogedor y atemporal.',
      },
    },
  },
  {
    slug: 'escritorio-itaim',
    category: 'comercial',
    year: 2023,
    location: 'Florianópolis, SC',
    coverImage: '/images/projects/escritorio-itaim/01.png',
    coverImageAlt: {
      pt: 'Área de trabalho aberta com jardim vertical, madeira nobre e vista para São Paulo',
      en: 'Open workspace with vertical garden, noble wood and views of São Paulo',
      es: 'Espacio de trabajo abierto con jardín vertical, madera noble y vistas de São Paulo',
    },
    coverImageBlurDataURL: BLUR_PLACEHOLDER,
    images: [
      {
        src: '/images/projects/escritorio-itaim/02.png',
        altText: {
          pt: 'Espaço de convivência do Escritório Itaim',
          en: 'Common area of the Itaim Office',
          es: 'Área de convivencia de la Oficina Itaim',
        },
      },
    ],
    featured: true,
    translations: {
      pt: {
        title: 'Escritório Itaim',
        description:
          'Ambiente corporativo que equilibra performance e bem-estar: jardim vertical, travertino, madeiras aquecidas e luz natural abundante compõem espaços que inspiram — com a skyline de São Paulo como pano de fundo.',
      },
      en: {
        title: 'Itaim Office',
        description:
          'A corporate environment that balances performance and well-being: vertical garden, travertine, warm wood, and abundant natural light compose spaces that inspire — with the São Paulo skyline as a backdrop.',
      },
      es: {
        title: 'Oficina Itaim',
        description:
          'Ambiente corporativo que equilibra rendimiento y bienestar: jardín vertical, travertino, maderas cálidas y abundante luz natural componen espacios que inspiran — con el skyline de São Paulo como telón de fondo.',
      },
    },
  },
  {
    slug: 'casa-higienopolis',
    category: 'reforma',
    year: 2024,
    location: 'Florianópolis, SC',
    coverImage: '/images/projects/casa-higienopolis/cover.png',
    coverImageAlt: {
      pt: 'Casa reformada com fachada renovada e jardim frontal',
      en: 'Renovated house with updated facade and front garden',
      es: 'Casa reformada con fachada renovada y jardín frontal',
    },
    coverImageBlurDataURL: BLUR_PLACEHOLDER,
    images: [],
    featured: true,
    translations: {
      pt: {
        title: 'Casa Higienópolis',
        description:
          'Reforma completa de residência dos anos 1960, respeitando a arquitetura original e incorporando conforto contemporâneo.',
      },
      en: {
        title: 'Higienópolis House',
        description:
          "Complete renovation of a 1960s residence, respecting the original architecture while incorporating contemporary comfort.",
      },
      es: {
        title: 'Casa Higienópolis',
        description:
          'Reforma completa de residencia de los años 1960, respetando la arquitectura original e incorporando comodidad contemporánea.',
      },
    },
  },
]

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured)
}

export function getProjectBySlug(slug: string): Project | null {
  return projects.find((p) => p.slug === slug) ?? null
}

export function getAllSlugs(): string[] {
  return projects.map((p) => p.slug)
}
