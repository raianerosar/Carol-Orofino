// src/data/services.ts

export interface Service {
  id: string
  icon?: string
  translations: {
    pt: { title: string; description: string }
    en: { title: string; description: string }
    es: { title: string; description: string }
  }
}

export const services: Service[] = [
  {
    id: 'projeto-residencial',
    translations: {
      pt: {
        title: 'Projeto Residencial',
        description:
          'Criação de ambientes residenciais personalizados, do conceito ao acabamento final.',
      },
      en: {
        title: 'Residential Design',
        description:
          'Creation of personalized residential spaces, from concept to final finish.',
      },
      es: {
        title: 'Proyecto Residencial',
        description:
          'Creación de ambientes residenciales personalizados, del concepto al acabado final.',
      },
    },
  },
  {
    id: 'projeto-comercial',
    translations: {
      pt: {
        title: 'Projeto Comercial',
        description:
          'Design de interiores para escritórios, lojas e espaços corporativos que refletem a identidade da sua marca.',
      },
      en: {
        title: 'Commercial Design',
        description:
          'Interior design for offices, stores, and corporate spaces that reflect your brand identity.',
      },
      es: {
        title: 'Proyecto Comercial',
        description:
          'Diseño de interiores para oficinas, tiendas y espacios corporativos que reflejan la identidad de su marca.',
      },
    },
  },
  {
    id: 'reforma',
    translations: {
      pt: {
        title: 'Reforma e Renovação',
        description:
          'Transformação de espaços existentes com planejamento estratégico e execução cuidadosa.',
      },
      en: {
        title: 'Renovation',
        description:
          'Transformation of existing spaces with strategic planning and careful execution.',
      },
      es: {
        title: 'Reforma y Renovación',
        description:
          'Transformación de espacios existentes con planificación estratégica y ejecución cuidadosa.',
      },
    },
  },
  {
    id: 'inspire-se',
    translations: {
      pt: {
        title: 'Design de Interiores',
        description:
          'Orientação especializada para escolha de materiais, móveis, cores e decoração.',
      },
      en: {
        title: 'Interior Design',
        description:
          'Expert guidance for the selection of materials, furniture, colors, and decor.',
      },
      es: {
        title: 'Diseño de Interiores',
        description:
          'Orientación especializada para la elección de materiales, muebles, colores y decoración.',
      },
    },
  },
]
