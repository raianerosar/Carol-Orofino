import type { CategorySlug } from '@/data/categories'

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
  category: 'residencial' | 'comercial' | 'reforma' | 'design-de-interiores'
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
    slug: 'apartamento-luminoso',
    category: 'design-de-interiores',
    year: 2024,
    location: 'Florianópolis, SC',
    coverImage: '/images/categories/design-interiores-card.jpg',
    coverImageAlt: {
      pt: 'Sala de estar com iluminação natural e paleta neutra',
      en: 'Living room with natural lighting and neutral palette',
      es: 'Sala de estar con iluminación natural y paleta neutra',
    },
    coverImageBlurDataURL: BLUR_PLACEHOLDER,
    images: [
      {
        src: '/images/categories/design-interiores-01.jpg',
        altText: {
          pt: 'Detalhe da área de convivência com marcenaria sob medida',
          en: 'Detail of the living area with custom woodwork',
          es: 'Detalle del área de convivencia con carpintería a medida',
        },
      },
      {
        src: '/images/categories/design-interiores-02.jpg',
        altText: {
          pt: 'Vista do corredor com revestimento texturizado',
          en: 'Hallway view with textured wall cladding',
          es: 'Vista del pasillo con revestimiento texturizado',
        },
      },
    ],
    featured: true,
    translations: {
      pt: {
        title: 'Apartamento Luminoso',
        description:
          'Projeto de design de interiores que explora a luz natural como elemento central, com paleta neutra, texturas sutis e mobiliário sob medida que ampliam a percepção do espaço.',
      },
      en: {
        title: 'Luminous Apartment',
        description:
          'Interior design project that uses natural light as a central element, with a neutral palette, subtle textures and custom furniture that expand the perception of space.',
      },
      es: {
        title: 'Apartamento Luminoso',
        description:
          'Proyecto de diseño de interiores que explora la luz natural como elemento central, con paleta neutra, texturas sutiles y mobiliario a medida que amplían la percepción del espacio.',
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
    featured: false,
    translations: {
      pt: {
        title: 'Residência Vila Nova',
        description:
          'Reforma completa de residência dos anos 1960, respeitando a arquitetura original e incorporando conforto contemporâneo.',
      },
      en: {
        title: 'Vila Nova Residence',
        description:
          "Complete renovation of a 1960s residence, respecting the original architecture while incorporating contemporary comfort.",
      },
      es: {
        title: 'Residencia Vila Nova',
        description:
          'Reforma completa de residencia de los años 1960, respetando la arquitectura original e incorporando comodidad contemporánea.',
      },
    },
  },
  // --- duplicatas placeholder para preencher categorias com 2 projetos ---
  {
    slug: 'cobertura-beira-mar',
    category: 'residencial',
    year: 2023,
    location: 'Florianópolis, SC',
    coverImage: '/images/projects/apartamento-jardins/cover.jpg',
    coverImageAlt: {
      pt: 'Cobertura com terraço e vista para o mar',
      en: 'Penthouse with terrace and sea view',
      es: 'Ático con terraza y vista al mar',
    },
    coverImageBlurDataURL: BLUR_PLACEHOLDER,
    images: [],
    featured: false,
    translations: {
      pt: {
        title: 'Cobertura Beira-Mar',
        description:
          'Cobertura projetada para aproveitar ao máximo a vista privilegiada, com integração entre os espaços internos e o terraço.',
      },
      en: {
        title: 'Beachfront Penthouse',
        description:
          'Penthouse designed to make the most of its privileged view, integrating interior spaces with the terrace.',
      },
      es: {
        title: 'Ático Frente al Mar',
        description:
          'Ático diseñado para aprovechar al máximo la vista privilegiada, con integración entre los espacios interiores y la terraza.',
      },
    },
  },
  {
    slug: 'loja-conceito-centro',
    category: 'comercial',
    year: 2023,
    location: 'Florianópolis, SC',
    coverImage: '/images/projects/escritorio-itaim/01.png',
    coverImageAlt: {
      pt: 'Loja conceito com vitrine ampla e iluminação especial',
      en: 'Concept store with wide display and special lighting',
      es: 'Tienda concepto con vitrina amplia e iluminación especial',
    },
    coverImageBlurDataURL: BLUR_PLACEHOLDER,
    images: [],
    featured: false,
    translations: {
      pt: {
        title: 'Loja Conceito Centro',
        description:
          'Espaço comercial de alto padrão que combina identidade de marca forte com experiência sensorial do cliente.',
      },
      en: {
        title: 'Downtown Concept Store',
        description:
          'High-end commercial space combining strong brand identity with a sensory customer experience.',
      },
      es: {
        title: 'Tienda Concepto Centro',
        description:
          'Espacio comercial de alto nivel que combina una fuerte identidad de marca con una experiencia sensorial del cliente.',
      },
    },
  },
  {
    slug: 'suite-master-trindade',
    category: 'design-de-interiores',
    year: 2023,
    location: 'Florianópolis, SC',
    coverImage: '/images/categories/design-interiores-card.jpg',
    coverImageAlt: {
      pt: 'Suíte master com cabeceira em veludo e iluminação indireta',
      en: 'Master suite with velvet headboard and indirect lighting',
      es: 'Suite máster con cabecera de terciopelo e iluminación indirecta',
    },
    coverImageBlurDataURL: BLUR_PLACEHOLDER,
    images: [],
    featured: false,
    translations: {
      pt: {
        title: 'Suíte Master Trindade',
        description:
          'Design de interiores para suíte principal com ênfase em materiais nobres, iluminação cênica e atmosfera de hotelaria de luxo.',
      },
      en: {
        title: 'Trindade Master Suite',
        description:
          'Interior design for a master suite emphasizing noble materials, scenic lighting and a luxury hotel atmosphere.',
      },
      es: {
        title: 'Suite Máster Trindade',
        description:
          'Diseño de interiores para suite principal con énfasis en materiales nobles, iluminación escénica y atmósfera de hotelería de lujo.',
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

export function getProjectsByCategory(slug: CategorySlug): Project[] {
  // 'projetos' has no matching Project.category value — return all projects
  if (slug === 'projetos') return projects
  // For all other slugs, Project.category matches the slug directly
  return projects.filter((p) => p.category === slug)
}
