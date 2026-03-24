// src/app/[locale]/design-de-interiores/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { SectionDivider } from '@/components/SectionDivider'

export const metadata: Metadata = {
  title: 'Design de Interiores — Carol Orofino',
  description:
    'Projetos residenciais e comerciais que traduzem a personalidade dos clientes em espaços únicos e funcionais.',
}

export default async function DesignDeInterioresPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <main className="bg-background">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative h-[75vh] min-h-[520px] w-full overflow-hidden">
        <Image
          src="/images/categories/design-interiores-hero.jpg"
          alt="Design de Interiores"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50" />
        <Link
          href={`/${locale}`}
          className="absolute top-24 left-8 md:left-16 flex items-center gap-2 font-body text-xs uppercase tracking-widest text-white/80 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Voltar
        </Link>

        {/* Title block */}
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-12 md:px-16 md:pb-16 text-center">
          <p className="font-body text-xs uppercase tracking-widest text-white/70 mb-3">
            Carol Orofino
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-white tracking-wide leading-none">
            Design de<br />Interiores
          </h1>
        </div>
      </section>

      <SectionDivider />

{/* ── Seção 1: texto à esquerda, imagem à direita ──────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[540px]">
        {/* Texto */}
        <div className="flex flex-col items-center justify-center px-8 py-16 md:px-16 md:py-20 text-center">
          <span className="font-body text-xs uppercase tracking-widest text-primary mb-6">
            01 — Processo
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-text-primary tracking-wide leading-tight mb-8">
            Do conceito<br />à entrega
          </h2>
          <p className="font-body text-sm text-dark leading-relaxed max-w-md mb-6">
            Começo ouvindo. A rotina, os gostos, o que incomoda no espaço atual, o que faz
            falta. Só depois vem o projeto — conceito, moodboard, 3D e acompanhamento de
            obra até o dia da entrega.
          </p>
          <p className="font-body text-sm text-dark leading-relaxed max-w-md">
            O resultado é um ambiente que parece ter sido sempre assim: como se não pudesse
            ser de outra forma.
          </p>
        </div>

        {/* Imagem */}
        <div className="relative min-h-[400px] md:min-h-0">
          <Image
            src="/images/categories/design-interiores-01.jpg"
            alt="Processo de design de interiores"
            fill
            className="object-cover object-center"
          />
        </div>
      </section>

      {/* ── Seção 2: imagem à esquerda, texto à direita ──────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[540px]">
        {/* Imagem */}
        <div className="relative min-h-[400px] md:min-h-0 order-2 md:order-1">
          <Image
            src="/images/categories/design-interiores-02.jpg"
            alt="Resultado de projeto de design de interiores"
            fill
            className="object-cover object-center"
          />
        </div>

        {/* Texto */}
        <div className="flex flex-col items-center justify-center px-8 py-16 md:px-16 md:py-20 text-center order-1 md:order-2">
          <span className="font-body text-xs uppercase tracking-widest text-primary mb-6">
            02 — Filosofia
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-text-primary tracking-wide leading-tight mb-8">
            Espaços que<br />transformam
          </h2>
          <p className="font-body text-sm text-dark leading-relaxed max-w-md mb-6">
            Design de interiores não é decoração. É a diferença entre um espaço que você
            habita e um espaço que te pertence.
          </p>
          <p className="font-body text-sm text-dark leading-relaxed max-w-md">
            Cada material, cada proporção, cada fonte de luz é escolhida com intenção —
            para que o ambiente todo fale a mesma língua.
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="flex flex-col items-center justify-center px-8 py-20 text-center">
        <h2 className="font-display text-4xl md:text-5xl text-text-primary tracking-wide mb-6">
          Vamos criar juntos?
        </h2>
        <p className="font-body text-sm text-dark leading-relaxed max-w-md mb-10">
          Conta como é o seu espaço e o que você sonha para ele.
        </p>
        <Link
          href={`/${locale}/questionario`}
          className="font-body text-xs uppercase tracking-widest border border-text-primary text-text-primary px-8 py-3 transition-colors hover:bg-mauve hover:text-background hover:border-mauve"
        >
          Preencher questionário
        </Link>
      </section>
    </main>
  )
}
