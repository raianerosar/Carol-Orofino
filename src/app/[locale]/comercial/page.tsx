// src/app/[locale]/comercial/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { SectionDivider } from '@/components/SectionDivider'

export const metadata: Metadata = {
  title: 'Comercial — Carol Orofino',
  description:
    'Projetos para escritórios, lojas e espaços corporativos que traduzem a identidade da marca em ambientes funcionais e memoráveis.',
}

export default async function ComercialPage({
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
          src="/images/categories/comercial-hero.jpg"
          alt="Projetos Comerciais"
          fill
          priority
          className="object-cover object-center"
        />
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
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-12 md:px-16 md:pb-16 text-center">
          <p className="font-body text-xs uppercase tracking-widest text-white/70 mb-3">
            Carol Orofino
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-white tracking-wide leading-none">
            Comercial
          </h1>
        </div>
      </section>

      <SectionDivider />

{/* ── Seção 1: texto à esquerda, imagem à direita ──────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[540px]">
        <div className="flex flex-col items-center justify-center px-8 py-16 md:px-16 md:py-20 text-center">
          <span className="font-body text-xs uppercase tracking-widest text-primary mb-6">
            01 — Identidade
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-text-primary tracking-wide leading-tight mb-8">
            Design que revela<br />quem você é
          </h2>
          <p className="font-body text-sm text-dark leading-relaxed max-w-md mb-6">
            O espaço comercial é uma extensão da sua marca. Antes de qualquer palavra,
            ele já comunica valores, cuidado e personalidade.
          </p>
          <p className="font-body text-sm text-dark leading-relaxed max-w-md">
            Cada escolha — a madeira, a luz, o detalhe curatorial — é pensada para
            traduzir sua essência em ambiente.
          </p>
        </div>
        <div className="relative min-h-[400px] md:min-h-0">
          <Image
            src="/images/categories/comercial-01.png"
            alt="Escritório comercial Carol Orofino — identidade"
            fill
            className="object-cover object-center"
          />
        </div>
      </section>

      {/* ── Seção 2: imagem à esquerda, texto à direita ──────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[540px]">
        <div className="relative min-h-[400px] md:min-h-0 order-2 md:order-1">
          <Image
            src="/images/categories/comercial-02.png"
            alt="Escritório executivo Carol Orofino — presença"
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="flex flex-col items-center justify-center px-8 py-16 md:px-16 md:py-20 text-center order-1 md:order-2">
          <span className="font-body text-xs uppercase tracking-widest text-primary mb-6">
            02 — Presença
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-text-primary tracking-wide leading-tight mb-8">
            Ambientes que<br />constroem autoridade
          </h2>
          <p className="font-body text-sm text-dark leading-relaxed max-w-md mb-6">
            Credibilidade se constrói também no espaço. Um ambiente bem projetado
            transmite seriedade, inspira confiança e posiciona sua marca antes mesmo
            da primeira reunião.
          </p>
          <p className="font-body text-sm text-dark leading-relaxed max-w-md">
            Do mobiliário à paleta, cada elemento reforça a mensagem que você quer passar.
          </p>
        </div>
      </section>

      {/* ── Seção 3: texto à esquerda, imagem à direita ──────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[540px]">
        <div className="flex flex-col items-center justify-center px-8 py-16 md:px-16 md:py-20 text-center">
          <span className="font-body text-xs uppercase tracking-widest text-primary mb-6">
            03 — Equilíbrio
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-text-primary tracking-wide leading-tight mb-8">
            Funcionalidade<br />com leveza
          </h2>
          <p className="font-body text-sm text-dark leading-relaxed max-w-md mb-6">
            Produtividade real exige conforto. Espaços que integram luz natural,
            proporção e materiais certos criam ambientes onde as pessoas trabalham
            melhor — e permanecem com prazer.
          </p>
          <p className="font-body text-sm text-dark leading-relaxed max-w-md">
            Projeto para que beleza e função andem juntas, sem concessões.
          </p>
        </div>
        <div className="relative min-h-[400px] md:min-h-0">
          <Image
            src="/images/categories/comercial-03.png"
            alt="Escritório comercial Carol Orofino — equilíbrio"
            fill
            className="object-cover object-center"
          />
        </div>
      </section>

      <SectionDivider />

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="flex flex-col items-center justify-center px-8 py-20 text-center">
        <h2 className="font-display text-4xl md:text-5xl text-text-primary tracking-wide mb-6">
          Vamos projetar seu espaço?
        </h2>
        <p className="font-body text-sm text-dark leading-relaxed max-w-md mb-10">
          Me conta sobre o seu negócio e o que você precisa do ambiente.
        </p>
        <Link
          href={`/${locale}/questionario`}
          className="bg-slate border border-white/60 px-8 py-3 font-display font-light italic text-white transition-opacity hover:opacity-80"
        >
          Preencher questionário
        </Link>
      </section>
    </main>
  )
}
