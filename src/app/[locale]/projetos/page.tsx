// src/app/[locale]/projetos/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { SectionDivider } from '@/components/SectionDivider'

export const metadata: Metadata = {
  title: 'Projetos — Carol Orofino',
  description:
    'Conheça os projetos entregues por Carol Orofino — espaços residenciais e comerciais que unem funcionalidade, beleza e identidade.',
}

export default async function ProjetosPage({
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
          src="/images/categories/projetos-hero.png"
          alt="Projetos Carol Orofino"
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
            Projetos
          </h1>
        </div>
      </section>

      <SectionDivider />

{/* ── Seção 1: texto à esquerda, imagem à direita ──────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[540px]">
        <div className="flex flex-col items-center justify-center px-8 py-16 md:px-16 md:py-20 text-center">
          <span className="font-body text-xs uppercase tracking-widest text-primary mb-6">
            01 — Portfólio
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-text-primary tracking-wide leading-tight mb-8">
            Mais de 10 anos<br />de projetos
          </h2>
          <p className="font-body text-sm text-dark leading-relaxed max-w-md mb-6">
            Cada projeto começa com uma escuta. Quem vai viver ali, como usa o espaço,
            o que incomoda, o que falta, o que sonha. Só depois do olhar vem o lápis.
          </p>
          <p className="font-body text-sm text-dark leading-relaxed max-w-md">
            Ao longo de mais de dez anos, transformei apartamentos, casas e escritórios
            em Florianópolis — sempre com o mesmo princípio: um projeto bonito que não
            funciona não é um bom projeto.
          </p>
        </div>
        <div className="relative min-h-[400px] md:min-h-0">
          <Image
            src="/images/categories/projetos-01-new.png"
            alt="Projetos Carol Orofino"
            fill
            className="object-cover object-center"
          />
        </div>
      </section>

      {/* ── Seção 2: imagem à esquerda, texto à direita ──────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[540px]">
        <div className="relative min-h-[400px] md:min-h-0 order-2 md:order-1">
          <Image
            src="/images/categories/projetos-02-new.png"
            alt="Detalhe de projeto Carol Orofino"
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="flex flex-col items-center justify-center px-8 py-16 md:px-16 md:py-20 text-center order-1 md:order-2">
          <span className="font-body text-xs uppercase tracking-widest text-primary mb-6">
            02 — Processo
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-text-primary tracking-wide leading-tight mb-8">
            Do sonho<br />à realidade
          </h2>
          <p className="font-body text-sm text-dark leading-relaxed max-w-md mb-6">
            Não entrego apenas um arquivo de projeto. Estou presente do primeiro briefing
            à última peça colocada no lugar — acompanhando a obra, resolvendo imprevistos,
            garantindo que o que foi desenhado seja o que vai ficar.
          </p>
          <p className="font-body text-sm text-dark leading-relaxed max-w-md">
            Porque o espaço que entrego precisa ser exatamente o que você imaginou — ou melhor.
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="flex flex-col items-center justify-center px-8 py-20 text-center">
        <h2 className="font-display text-4xl md:text-5xl text-text-primary tracking-wide mb-6">
          Pronto para começar?
        </h2>
        <p className="font-body text-sm text-dark leading-relaxed max-w-md mb-10">
          Conta sobre o seu espaço e vamos criar algo incrível juntos.
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
