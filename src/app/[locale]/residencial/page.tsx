// src/app/[locale]/residencial/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { SectionDivider } from '@/components/SectionDivider'

export const metadata: Metadata = {
  title: 'Residencial — Carol Orofino',
  description:
    'Projetos residenciais que traduzem a personalidade e o estilo de vida de cada família em espaços únicos e acolhedores.',
}

export default async function ResidencialPage({
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
          src="/images/categories/residencial-hero.png"
          alt="Projetos Residenciais"
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
            Residencial
          </h1>
        </div>
      </section>

      <SectionDivider />

{/* ── Seção 1: texto à esquerda, imagem à direita ──────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[540px]">
        <div className="flex flex-col items-center justify-center px-8 py-16 md:px-16 md:py-20 text-center">
          <span className="font-body text-xs uppercase tracking-widest text-primary mb-6">
            01 — Abordagem
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-text-primary tracking-wide leading-tight mb-8">
            Um lar feito<br />para você
          </h2>
          <p className="font-body text-sm text-dark leading-relaxed max-w-md mb-6">
            Antes de qualquer traço, eu ouço. Como você acorda, como você recebe, o que
            te cansa no espaço que tem hoje, o que nunca abre mão.
          </p>
          <p className="font-body text-sm text-dark leading-relaxed max-w-md">
            Só com isso em mãos começa o projeto — que une o que é bonito com o que
            realmente funciona para a sua vida.
          </p>
        </div>
        <div className="relative aspect-square">
          <Image
            src="/images/categories/residencial-01.png"
            alt="Projeto residencial Carol Orofino"
            fill
            className="object-cover object-center"
          />
        </div>
      </section>

      {/* ── Seção 2: imagem à esquerda, texto à direita ──────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[540px]">
        <div className="relative aspect-square order-2 md:order-1">
          <Image
            src="/images/categories/residencial-02.png"
            alt="Detalhe de projeto residencial"
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="flex flex-col items-center justify-center px-8 py-16 md:px-16 md:py-20 text-center order-1 md:order-2">
          <span className="font-body text-xs uppercase tracking-widest text-primary mb-6">
            02 — Resultado
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-text-primary tracking-wide leading-tight mb-8">
            Espaços que<br />acolhem
          </h2>
          <p className="font-body text-sm text-dark leading-relaxed max-w-md mb-6">
            Do apartamento compacto à casa ampla, o cuidado é o mesmo: materiais que
            envelhecem bem, luz que transforma o ambiente, cada peça no lugar certo.
          </p>
          <p className="font-body text-sm text-dark leading-relaxed max-w-md">
            O resultado é um lar que parece ter sempre sido assim — e que você não
            vai querer deixar.
          </p>
        </div>
      </section>

      {/* ── Seção 3: texto à esquerda, imagem à direita ──────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[540px]">
        <div className="flex flex-col items-center justify-center px-8 py-16 md:px-16 md:py-20 text-center">
          <span className="font-body text-xs uppercase tracking-widest text-primary mb-6">
            03 — Dormitórios
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-text-primary tracking-wide leading-tight mb-8">
            Refúgio e<br />descanso
          </h2>
          <p className="font-body text-sm text-dark leading-relaxed max-w-md mb-6">
            O quarto é o espaço mais íntimo da casa. Cada detalhe — do revestimento
            têxtil à iluminação indireta — é pensado para criar um ambiente de
            acolhimento e tranquilidade.
          </p>
          <p className="font-body text-sm text-dark leading-relaxed max-w-md">
            Um lugar que convida ao descanso e reflete quem você é.
          </p>
        </div>
        <div className="relative aspect-square">
          <Image
            src="/images/categories/residencial-03.png"
            alt="Quarto de casal"
            fill
            className="object-cover object-center"
          />
        </div>
      </section>

      {/* ── Seção 4: imagem à esquerda, texto à direita ──────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[540px]">
        <div className="relative aspect-square order-2 md:order-1">
          <Image
            src="/images/categories/residencial-04.png"
            alt="Living escandinavo"
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="flex flex-col items-center justify-center px-8 py-16 md:px-16 md:py-20 text-center order-1 md:order-2">
          <span className="font-body text-xs uppercase tracking-widest text-primary mb-6">
            04 — Convivência
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-text-primary tracking-wide leading-tight mb-8">
            Salas que<br />reúnem
          </h2>
          <p className="font-body text-sm text-dark leading-relaxed max-w-md mb-6">
            A sala de estar é onde a vida acontece. Projetamos cada ambiente para
            facilitar o convívio, com circulação fluida, mobiliário sob medida e
            paleta de cores harmoniosa.
          </p>
          <p className="font-body text-sm text-dark leading-relaxed max-w-md">
            Elegância que convida as pessoas a ficarem.
          </p>
        </div>
      </section>

      {/* ── Seção 5: texto à esquerda, imagem à direita ──────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[540px]">
        <div className="flex flex-col items-center justify-center px-8 py-16 md:px-16 md:py-20 text-center">
          <span className="font-body text-xs uppercase tracking-widest text-primary mb-6">
            05 — À mesa
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-text-primary tracking-wide leading-tight mb-8">
            Refeições<br />memoráveis
          </h2>
          <p className="font-body text-sm text-dark leading-relaxed max-w-md mb-6">
            Uma sala de jantar bem projetada transforma cada refeição em ocasião
            especial. Iluminação, proporção e acabamentos que criam a atmosfera certa
            para receber com sofisticação.
          </p>
          <p className="font-body text-sm text-dark leading-relaxed max-w-md">
            Do cotidiano ao jantar especial, o cenário perfeito já está pronto.
          </p>
        </div>
        <div className="relative aspect-square">
          <Image
            src="/images/categories/residencial-05.png"
            alt="Mesa de jantar"
            fill
            className="object-cover object-center"
          />
        </div>
      </section>

      <SectionDivider />

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="flex flex-col items-center justify-center px-8 py-20 text-center">
        <h2 className="font-display text-4xl md:text-5xl text-text-primary tracking-wide mb-6">
          Vamos criar seu lar?
        </h2>
        <p className="font-body text-sm text-dark leading-relaxed max-w-md mb-10">
          Conta como é o seu espaço e o que você sonha para ele.
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
