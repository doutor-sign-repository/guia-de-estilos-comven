import React from 'react'
import { ComvenLogo, ComvenLogoLockup } from '@/components/ComvenLogo'
import { BRAND_COLORS, COLOR_FAMILIES } from '@/data/colors'
import { ButtonPlayground } from '@/components/registry/ButtonPlayground'
import { useToast } from '@/hooks/use-toast'

export default function Index() {
  const { toast } = useToast()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: `Copiado: ${text}`,
      description: 'Código hexadecimal copiado para a área de transferência.',
    })
  }

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* Top Banner / Hero matching Presentation cover */}
      <section className="bg-gradient-to-r from-[#004185] to-[#002750] text-white rounded-2xl p-8 sm:p-12 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-widest text-[#9DC6F3]">
            Design System
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Guia de Estilos COMVEN
          </h1>
          <p className="text-sm sm:text-base text-[#DCDCDC] leading-relaxed">
            Referência oficial de marca e identidade visual para uso interno — logotipo, cores,
            tipografia, iconografia e boas práticas de aplicação.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#9DC6F3]">
            <span>Versão 1.0</span>
            <span>•</span>
            <span>Agosto de 2026</span>
            <span>•</span>
            <span>Comunicação de venda em tempo real</span>
          </div>
        </div>

        {/* Decorative background watermark */}
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none select-none">
          <span className="font-comven-wordmark text-[160px] font-bold text-white tracking-tighter">
            comven
          </span>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SEÇÃO 1: LOGOTIPO                                        */}
      {/* ======================================================== */}
      <section id="logotipo" className="scroll-mt-12 space-y-6">
        <div className="flex items-baseline gap-3 border-b border-[#EBEBEB] pb-4">
          <div className="w-8 h-8 rounded-full bg-[#004185] text-white flex items-center justify-center font-bold text-sm">
            1
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#141414] tracking-tight">
              Logotipo
            </h2>
            <p className="text-sm text-[#666666] mt-0.5">
              Versão principal e aplicação em fundo escuro
            </p>
          </div>
        </div>

        {/* Grid 2 Cards: Light & Dark Lockups */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card A: Light Background */}
          <div className="bg-white rounded-xl border border-[#EBEBEB] p-8 sm:p-10 shadow-sm flex flex-col items-center justify-center min-h-[260px] group hover:shadow-md transition-shadow">
            <div className="w-full max-w-[320px] py-4">
              <ComvenLogoLockup theme="light" showTagline={true} width="100%" />
            </div>
            <span className="text-xs text-[#848484] mt-4 font-medium">
              Versão principal — Fundo claro (#FFFFFF)
            </span>
          </div>

          {/* Card B: Dark Background */}
          <div className="bg-[#141414] rounded-xl border border-[#292929] p-8 sm:p-10 shadow-sm flex flex-col items-center justify-center min-h-[260px] group hover:shadow-md transition-shadow">
            <div className="w-full max-w-[320px] py-4">
              <ComvenLogoLockup theme="dark" showTagline={true} width="100%" />
            </div>
            <span className="text-xs text-[#848484] mt-4 font-medium">
              Versão oficial — Fundo escuro (#141414)
            </span>
          </div>
        </div>

        {/* Divider + Somente marca (sem tagline) */}
        <div className="pt-6">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-[#141414]">Somente marca (sem tagline)</h3>
            <p className="text-xs text-[#666666]">Aplicação simplificada sem o texto de apoio</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Light plain */}
            <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 flex flex-col items-center justify-center min-h-[140px]">
              <ComvenLogoLockup theme="light" showTagline={false} width={180} />
              <span className="text-[11px] text-[#848484] mt-3">Fundo claro</span>
            </div>

            {/* Dark plain */}
            <div className="bg-[#141414] rounded-xl border border-[#292929] p-6 flex flex-col items-center justify-center min-h-[140px]">
              <ComvenLogoLockup theme="dark" showTagline={false} width={180} />
              <span className="text-[11px] text-[#848484] mt-3">Fundo escuro</span>
            </div>

            {/* Light plain compact */}
            <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 flex flex-col items-center justify-center min-h-[140px]">
              <ComvenLogo variant="light" showTagline={false} scale={0.7} />
              <span className="text-[11px] text-[#848484] mt-3">Versão condensada</span>
            </div>

            {/* Dark plain compact */}
            <div className="bg-[#141414] rounded-xl border border-[#292929] p-6 flex flex-col items-center justify-center min-h-[140px]">
              <ComvenLogo variant="dark" showTagline={false} scale={0.7} />
              <span className="text-[11px] text-[#848484] mt-3">Compacto invertido</span>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SEÇÃO 2: CORES                                           */}
      {/* ======================================================== */}
      <section id="cores" className="scroll-mt-12 space-y-8">
        <div className="flex items-baseline gap-3 border-b border-[#EBEBEB] pb-4">
          <div className="w-8 h-8 rounded-full bg-[#004185] text-white flex items-center justify-center font-bold text-sm">
            2
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#141414] tracking-tight">Cores</h2>
            <p className="text-sm text-[#666666] mt-0.5">
              Paleta oficial — cor primária, secundária e funcionais
            </p>
          </div>
        </div>

        {/* 5 Swatches Grandes */}
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-[#666666] mb-3">
            Cores Principais
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {BRAND_COLORS.map((c) => {
              const isDarkText = !c.textLight
              return (
                <div
                  key={c.name}
                  onClick={() => copyToClipboard(c.hex)}
                  role="button"
                  tabIndex={0}
                  className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer transform hover:-translate-y-1 group"
                >
                  <div
                    className="h-32 p-4 flex flex-col justify-between"
                    style={{ backgroundColor: c.hex }}
                  >
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${
                        isDarkText ? 'text-[#141414]' : 'text-white'
                      }`}
                    >
                      {c.name}
                    </span>
                    <div>
                      <div
                        className={`text-lg font-mono font-bold ${
                          isDarkText ? 'text-[#141414]' : 'text-white'
                        }`}
                      >
                        {c.hex}
                      </div>
                      <span
                        className={`text-[10px] opacity-75 ${
                          isDarkText ? 'text-[#141414]' : 'text-white'
                        }`}
                      >
                        Clique para copiar
                      </span>
                    </div>
                  </div>
                  <div className="bg-white p-3 border-x border-b border-[#EBEBEB]">
                    <div className="text-xs font-semibold text-[#141414]">{c.role}</div>
                    <div className="text-[11px] text-[#848484] truncate">{c.description}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 5 Escalas 50-900 com 10 células cada */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#141414]">Escalas de Tonalidade (50–900)</h3>
              <p className="text-xs text-[#666666]">
                Clique em qualquer célula para copiar o código hexadecimal
              </p>
            </div>
            <span className="text-xs text-[#848484] hidden sm:inline">10 tons por escala</span>
          </div>

          <div className="space-y-6">
            {COLOR_FAMILIES.map((family) => (
              <div
                key={family.id}
                className="bg-white rounded-xl border border-[#EBEBEB] p-5 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-[#F5F7FA]">
                  <div>
                    <h4 className="font-bold text-sm text-[#141414]">{family.name}</h4>
                    <span className="text-xs text-[#848484]">{family.subtitle}</span>
                  </div>
                  <span className="text-[11px] text-[#848484] mt-1 sm:mt-0 font-mono">
                    50 → 900
                  </span>
                </div>

                {/* 10 cells horizontal ramp */}
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                  {family.shades.map((item, idx) => {
                    // Check if shade requires dark text for readability
                    const isLightShade = idx < 5 && family.id !== 'amarelo-logo'
                    const isYellow = family.id === 'amarelo-logo'
                    const useDarkText = isYellow ? idx < 6 : isLightShade

                    return (
                      <button
                        key={item.shade}
                        type="button"
                        onClick={() => copyToClipboard(item.hex)}
                        className="group flex flex-col rounded-lg overflow-hidden border border-[#BFBFBF]/40 transition-transform duration-150 hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#004185]"
                        title={`Copiar ${item.hex}`}
                      >
                        <div
                          className="h-14 sm:h-16 w-full flex flex-col justify-between p-1.5"
                          style={{ backgroundColor: item.hex }}
                        >
                          <span
                            className={`text-[10px] font-bold ${
                              useDarkText ? 'text-[#141414]' : 'text-white'
                            }`}
                          >
                            {item.shade}
                          </span>
                        </div>
                        <div className="bg-white py-1 px-1 text-center border-t border-[#EBEBEB]">
                          <span className="text-[10px] font-mono text-[#141414] font-semibold block truncate">
                            {item.hex}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SEÇÃO 3: TIPOGRAFIA                                      */}
      {/* ======================================================== */}
      <section id="tipografia" className="scroll-mt-12 space-y-8">
        <div className="flex items-baseline gap-3 border-b border-[#EBEBEB] pb-4">
          <div className="w-8 h-8 rounded-full bg-[#004185] text-white flex items-center justify-center font-bold text-sm">
            3
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#141414] tracking-tight">
              Tipografia
            </h2>
            <p className="text-sm text-[#666666] mt-0.5">Famílias tipográficas para uso oficial</p>
          </div>
        </div>

        {/* Bloco 1: Open Sans */}
        <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#EBEBEB] gap-2">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#004185] mb-1">
                Fonte de apoio oficial
              </div>
              <h3 className="text-2xl font-bold text-[#141414]">Fonte de apoio — Open Sans</h3>
              <p className="text-xs text-[#666666]">
                Usada nos produtos digitais e nas apresentações institucionais.
              </p>
            </div>
            <a
              href="https://fonts.google.com/specimen/Open+Sans"
              target="_blank"
              rel="noreferrer noopener"
              className="text-xs font-semibold text-[#004185] hover:underline inline-flex items-center gap-1"
            >
              <span>Ver no Google Fonts</span>
              <span>↗</span>
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Glyph Specimen Aa */}
            <div className="lg:col-span-4 bg-[#F5F7FA] rounded-xl p-6 flex flex-col justify-between border border-[#EBEBEB]">
              <div className="text-xs font-bold uppercase tracking-widest text-[#848484] mb-2">
                GLYPH
              </div>
              <div className="text-7xl sm:text-8xl font-bold text-[#141414] my-4 leading-none">
                Aa
              </div>
              <div className="text-xs text-[#666666] font-medium">Open Sans Bold / Regular</div>

              {/* Characters Strip */}
              <div className="mt-6 pt-4 border-t border-[#BFBFBF]/40">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#848484] mb-1">
                  CHARACTERS
                </div>
                <div className="text-xs font-mono text-[#141414] leading-relaxed break-all">
                  ABCDEFGHIJKLMNOPQRSTUVWXYZÁÃÇÉÊ
                </div>
                <div className="text-xs font-mono text-[#666666] leading-relaxed break-all mt-1">
                  abcdefghijklmnopqrstuvwxyzáãçéê
                </div>
                <div className="text-xs font-mono text-[#848484] leading-relaxed break-all mt-1">
                  0123456789 !?@#$%&*(){}[ ]/\-+=
                </div>
              </div>
            </div>

            {/* Type Scale List */}
            <div className="lg:col-span-8 space-y-6">
              <div className="text-xs font-bold uppercase tracking-widest text-[#848484]">
                HEADLINES &amp; BODY SCALE
              </div>

              <div className="space-y-5 divide-y divide-[#EBEBEB]">
                {/* Headline 1 */}
                <div className="pt-2">
                  <div className="flex flex-wrap items-center justify-between text-xs text-[#848484] mb-1">
                    <span className="font-bold text-[#004185]">Headline 1</span>
                    <span>Open Sans Bold 40px — títulos principais</span>
                  </div>
                  <div className="text-3xl sm:text-[40px] font-bold text-[#141414] leading-tight">
                    Headline 1
                  </div>
                </div>

                {/* Headline 2 */}
                <div className="pt-4">
                  <div className="flex flex-wrap items-center justify-between text-xs text-[#848484] mb-1">
                    <span className="font-bold text-[#004185]">Headline 2</span>
                    <span>Open Sans Bold 28px — títulos de seção</span>
                  </div>
                  <div className="text-2xl sm:text-[28px] font-bold text-[#141414] leading-tight">
                    Headline 2
                  </div>
                </div>

                {/* Headline 3 */}
                <div className="pt-4">
                  <div className="flex flex-wrap items-center justify-between text-xs text-[#848484] mb-1">
                    <span className="font-bold text-[#004185]">Headline 3</span>
                    <span>Open Sans SemiBold 22px — subtítulos</span>
                  </div>
                  <div className="text-xl sm:text-[22px] font-semibold text-[#141414] leading-snug">
                    Headline 3
                  </div>
                </div>

                {/* Headline 4 / Corpo de texto */}
                <div className="pt-4">
                  <div className="flex flex-wrap items-center justify-between text-xs text-[#848484] mb-1">
                    <span className="font-bold text-[#004185]">Corpo de texto</span>
                    <span>Open Sans Regular 16px — texto padrão</span>
                  </div>
                  <div className="text-base font-normal text-[#141414] leading-normal">
                    Comunicação de venda em tempo real para equipes que demandam velocidade e
                    precisão operacional.
                  </div>
                </div>

                {/* Legenda */}
                <div className="pt-4">
                  <div className="flex flex-wrap items-center justify-between text-xs text-[#848484] mb-1">
                    <span className="font-bold text-[#004185]">Legenda</span>
                    <span>Open Sans Regular 12px — legendas e metadados</span>
                  </div>
                  <div className="text-xs font-normal text-[#666666] leading-relaxed">
                    COMVEN © 2026 — Informações confidenciais de uso interno.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bloco 2: Century Gothic */}
        <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#EBEBEB] gap-2">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#004185] mb-1">
                Tipografia da Marca
              </div>
              <h3 className="text-2xl font-bold text-[#141414]">
                Fonte do logotipo — Century Gothic
              </h3>
              <p className="text-xs text-[#666666]">
                Usada na tagline e como base do desenho do wordmark. Pré-visualização abaixo com
                fonte geométrica de alta fidelidade.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Glyph Aa Century Gothic */}
            <div className="lg:col-span-4 bg-[#F5F7FA] rounded-xl p-6 flex flex-col justify-between border border-[#EBEBEB]">
              <div className="text-xs font-bold uppercase tracking-widest text-[#848484] mb-2">
                GLYPH
              </div>
              <div className="font-comven-wordmark text-7xl sm:text-8xl font-bold text-[#004185] my-4 leading-none">
                Aa
              </div>
              <div className="text-xs text-[#666666] font-medium font-comven-wordmark">
                Century Gothic Bold
              </div>

              {/* Characters Strip */}
              <div className="mt-6 pt-4 border-t border-[#BFBFBF]/40">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#848484] mb-1">
                  CHARACTERS
                </div>
                <div className="font-comven-wordmark text-xs text-[#141414] leading-relaxed break-all font-bold">
                  ABCDEFGHIJKLMNOPQRSTUVWXYZÁÃÇÉÊ
                </div>
                <div className="font-comven-wordmark text-xs text-[#666666] leading-relaxed break-all mt-1">
                  abcdefghijklmnopqrstuvwxyzáãçéê
                </div>
                <div className="font-comven-wordmark text-xs text-[#848484] leading-relaxed break-all mt-1">
                  0123456789 !?@#$%&*(){}[ ]/\-+=
                </div>
              </div>
            </div>

            {/* Applications List */}
            <div className="lg:col-span-8 space-y-6">
              <div className="text-xs font-bold uppercase tracking-widest text-[#848484]">
                USO NO LOGOTIPO
              </div>

              <div className="space-y-6 divide-y divide-[#EBEBEB]">
                {/* Tagline oficial */}
                <div className="pt-2">
                  <div className="flex flex-wrap items-center justify-between text-xs text-[#848484] mb-1">
                    <span className="font-bold text-[#004185]">Tagline oficial</span>
                    <span>Century Gothic Bold — usada abaixo do wordmark</span>
                  </div>
                  <div className="font-comven-wordmark text-sm sm:text-base font-bold text-[#F2CB05] uppercase tracking-wider bg-[#141414] p-3 rounded-lg inline-block">
                    comunicação de venda em tempo real
                  </div>
                </div>

                {/* Wordmark */}
                <div className="pt-4">
                  <div className="flex flex-wrap items-center justify-between text-xs text-[#848484] mb-1">
                    <span className="font-bold text-[#004185]">Wordmark</span>
                    <span>Century Gothic Bold — base geométrica do desenho</span>
                  </div>
                  <div className="font-comven-wordmark text-3xl sm:text-4xl font-bold text-[#004185] tracking-tight">
                    comven
                  </div>
                  <p className="text-xs text-[#848484] mt-2">
                    O wordmark possui proporções geométricas com curvas puras nos caracteres
                    &quot;c&quot;, &quot;o&quot;, &quot;e&quot; e linhas diagonais precisas no
                    &quot;v&quot;.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SEÇÃO 4: ICONOGRAFIA                                     */}
      {/* ======================================================== */}
      <section id="iconografia" className="scroll-mt-12 space-y-6">
        <div className="flex items-baseline gap-3 border-b border-[#EBEBEB] pb-4">
          <div className="w-8 h-8 rounded-full bg-[#004185] text-white flex items-center justify-center font-bold text-sm">
            4
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#141414] tracking-tight">
              Iconografia
            </h2>
            <p className="text-sm text-[#666666] mt-0.5">
              Material Symbols (Google) — outline e filled, acabamento rounded
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 sm:p-8 shadow-sm space-y-8">
          {/* Size Chips & Style Chips */}
          <div className="flex flex-wrap items-center gap-3 pb-6 border-b border-[#EBEBEB]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#666666] mr-2">
              Tamanhos Oficiais:
            </span>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5F7FA] border border-[#BFBFBF] text-xs font-bold text-[#141414]">
              <span className="material-symbols-rounded icon-outline" style={{ fontSize: '20px' }}>
                search
              </span>
              <span>20px</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#004185]/10 border border-[#004185] text-xs font-bold text-[#004185]">
              <span className="material-symbols-rounded icon-outline" style={{ fontSize: '24px' }}>
                search
              </span>
              <span>24px (Padrão)</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5F7FA] border border-[#BFBFBF] text-xs font-bold text-[#141414]">
              <span className="material-symbols-rounded icon-outline" style={{ fontSize: '32px' }}>
                search
              </span>
              <span>32px</span>
            </div>

            <div className="h-4 w-px bg-[#BFBFBF] mx-1 hidden sm:block" />

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-[#BFBFBF] text-xs font-semibold text-[#141414]">
              <span
                className="material-symbols-rounded icon-outline text-[#004185]"
                style={{ fontSize: '20px' }}
              >
                check_circle
              </span>
              <span>Outline</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-[#BFBFBF] text-xs font-semibold text-[#141414]">
              <span
                className="material-symbols-rounded icon-filled text-[#004185]"
                style={{ fontSize: '20px' }}
              >
                check_circle
              </span>
              <span>Filled</span>
            </div>
          </div>

          {/* Grid of sample icons side-by-side: Outline vs Filled */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#666666] mb-4">
              Comparativo de Estilos (Outline × Filled)
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {[
                { name: 'search', label: 'search' },
                { name: 'home', label: 'home' },
                { name: 'settings', label: 'settings' },
                { name: 'favorite', label: 'favorite' },
                { name: 'delete', label: 'delete' },
                { name: 'arrow_forward', label: 'arrow_forward' },
                { name: 'menu', label: 'menu' },
                { name: 'close', label: 'close' },
              ].map((icon) => (
                <div
                  key={icon.name}
                  className="bg-[#F5F7FA] rounded-xl p-3 border border-[#EBEBEB] flex flex-col items-center justify-between text-center gap-2 hover:border-[#004185] transition-colors"
                >
                  <div className="flex items-center gap-2 py-1">
                    <span
                      className="material-symbols-rounded icon-outline text-[#004185]"
                      style={{ fontSize: '24px' }}
                      title="Outline"
                    >
                      {icon.name}
                    </span>
                    <span
                      className="material-symbols-rounded icon-filled text-[#004185]"
                      style={{ fontSize: '24px' }}
                      title="Filled"
                    >
                      {icon.name}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#666666] truncate w-full">
                    {icon.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Rules and Warnings block */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#FFF8E6] border border-[#F2CB05]/40 flex items-start gap-3">
              <span
                className="material-symbols-rounded text-[#C2A204] shrink-0"
                style={{ fontSize: '22px' }}
              >
                warning
              </span>
              <div>
                <h5 className="text-xs font-bold text-[#615102] uppercase tracking-wider">
                  Regra de Consistência
                </h5>
                <p className="text-xs text-[#615102] mt-0.5 font-medium">
                  Não misturar outline e filled no mesmo contexto. Escolha um estilo por fluxo de
                  tela.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#FFF8E6] border border-[#F2CB05]/40 flex items-start gap-3">
              <span
                className="material-symbols-rounded text-[#C2A204] shrink-0"
                style={{ fontSize: '22px' }}
              >
                block
              </span>
              <div>
                <h5 className="text-xs font-bold text-[#615102] uppercase tracking-wider">
                  Integridade Visual
                </h5>
                <p className="text-xs text-[#615102] mt-0.5 font-medium">
                  Não mesclar mais de um ícone em uma única composição gráfica sem aprovação.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#666666] border-t border-[#EBEBEB]">
            <div>
              <span>Escala em intervalos de 4px a partir de 20px, com acabamento rounded.</span>
            </div>
            <a
              href="https://fonts.google.com/icons"
              target="_blank"
              rel="noreferrer noopener"
              className="text-[#004185] font-semibold hover:underline inline-flex items-center gap-1 shrink-0"
            >
              <span>Biblioteca de referência: Material Symbols (Google)</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SEÇÃO 5: ÁREA DE PROTEÇÃO                                */}
      {/* ======================================================== */}
      <section id="area-de-protecao" className="scroll-mt-12 space-y-6">
        <div className="flex items-baseline gap-3 border-b border-[#EBEBEB] pb-4">
          <div className="w-8 h-8 rounded-full bg-[#004185] text-white flex items-center justify-center font-bold text-sm">
            5
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#141414] tracking-tight">
              Área de proteção
            </h2>
            <p className="text-sm text-[#666666] mt-0.5">
              Espaço de respiro mínimo ao redor do logotipo
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 sm:p-10 shadow-sm space-y-6">
          {/* Diagram Card with X markers on each side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Diagram with Tagline */}
            <div className="relative bg-[#F5F7FA] rounded-xl border border-[#EBEBEB] p-10 flex flex-col items-center justify-center min-h-[280px]">
              {/* Outer Dashed Safe Area Rectangle */}
              <div className="relative border-2 border-dashed border-[#06D04D] rounded-lg p-8 sm:p-10 bg-white/70 flex flex-col items-center justify-center">
                {/* Top X indicator */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-1 text-[11px] font-bold text-[#047D2E]">
                  <span>X</span>
                </div>
                {/* Bottom X indicator */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 text-[11px] font-bold text-[#047D2E]">
                  <span>X</span>
                </div>
                {/* Left X indicator */}
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[11px] font-bold text-[#047D2E]">
                  <span>X</span>
                </div>
                {/* Right X indicator */}
                <div className="absolute -right-6 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[11px] font-bold text-[#047D2E]">
                  <span>X</span>
                </div>

                {/* Logo inside */}
                <ComvenLogoLockup theme="light" showTagline={true} width={220} />
              </div>

              <span className="text-[11px] text-[#848484] mt-6">
                Lockup completo com área de respiro 1X
              </span>
            </div>

            {/* Diagram without Tagline */}
            <div className="relative bg-[#F5F7FA] rounded-xl border border-[#EBEBEB] p-10 flex flex-col items-center justify-center min-h-[280px]">
              <div className="relative border-2 border-dashed border-[#06D04D] rounded-lg p-8 sm:p-10 bg-white/70 flex flex-col items-center justify-center">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[11px] font-bold text-[#047D2E]">
                  X
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[11px] font-bold text-[#047D2E]">
                  X
                </div>
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 text-[11px] font-bold text-[#047D2E]">
                  X
                </div>
                <div className="absolute -right-6 top-1/2 -translate-y-1/2 text-[11px] font-bold text-[#047D2E]">
                  X
                </div>

                <ComvenLogoLockup theme="light" showTagline={false} width={180} />
              </div>

              <span className="text-[11px] text-[#848484] mt-6">
                Somente marca com área de respiro 1X
              </span>
            </div>
          </div>

          {/* Explanation captions matching specifications verbatim */}
          <div className="bg-[#F5F7FA] rounded-xl p-5 border border-[#EBEBEB] space-y-2">
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded bg-[#06D04D] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                X
              </span>
              <p className="text-xs sm:text-sm text-[#141414] font-medium leading-relaxed">
                <strong>Medida base:</strong> X = altura do símbolo (ícone + wordmark). Respiro
                mínimo de 1X livre de outros elementos em todas as direções.
              </p>
            </div>
            <p className="text-xs text-[#666666] pl-7">
              A área tracejada representa o espaço mínimo livre de outros elementos ao redor do
              logotipo.
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SEÇÃO 6: APLICAÇÕES INCORRETAS                           */}
      {/* ======================================================== */}
      <section id="aplicacoes-incorretas" className="scroll-mt-12 space-y-6">
        <div className="flex items-baseline gap-3 border-b border-[#EBEBEB] pb-4">
          <div className="w-8 h-8 rounded-full bg-[#004185] text-white flex items-center justify-center font-bold text-sm">
            6
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#141414] tracking-tight">
              Aplicações incorretas
            </h2>
            <p className="text-sm text-[#666666] mt-0.5">O que evitar ao usar o logotipo COMVEN</p>
          </div>
        </div>

        {/* Grid 6 Incorrect Application Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. Distorção / esticar */}
          <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#FF0000] text-white flex items-center justify-center text-xs font-bold shadow-sm">
              ✕
            </div>
            <div className="h-36 bg-[#F5F7FA] rounded-lg border border-[#EBEBEB] flex items-center justify-center overflow-hidden">
              <div style={{ transform: 'scaleX(1.75)' }}>
                <ComvenLogoLockup theme="light" showTagline={false} width={130} />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-xs font-bold uppercase text-[#FF0000]">
                1. Distorção / esticar
              </div>
              <p className="text-xs text-[#666666] mt-1">
                Nunca esticar ou comprimir o logotipo desproporcionalmente.
              </p>
            </div>
          </div>

          {/* 2. Rotação */}
          <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#FF0000] text-white flex items-center justify-center text-xs font-bold shadow-sm">
              ✕
            </div>
            <div className="h-36 bg-[#F5F7FA] rounded-lg border border-[#EBEBEB] flex items-center justify-center overflow-hidden">
              <div style={{ transform: 'rotate(-15deg)' }}>
                <ComvenLogoLockup theme="light" showTagline={false} width={150} />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-xs font-bold uppercase text-[#FF0000]">2. Rotação</div>
              <p className="text-xs text-[#666666] mt-1">
                Nunca rotacionar o logotipo em nenhum ângulo.
              </p>
            </div>
          </div>

          {/* 3. Alterar cores originais */}
          <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#FF0000] text-white flex items-center justify-center text-xs font-bold shadow-sm">
              ✕
            </div>
            <div className="h-36 bg-[#F5F7FA] rounded-lg border border-[#EBEBEB] flex items-center justify-center overflow-hidden">
              <div className="font-comven-wordmark text-3xl font-bold tracking-tight text-[#9C27B0]">
                comv<span className="text-[#E91E63]">e</span>n
              </div>
            </div>
            <div className="mt-4">
              <div className="text-xs font-bold uppercase text-[#FF0000]">
                3. Alterar cores originais
              </div>
              <p className="text-xs text-[#666666] mt-1">
                Nunca aplicar cores fora da paleta oficial COMVEN.
              </p>
            </div>
          </div>

          {/* 4. Amarelo usado fora do check */}
          <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#FF0000] text-white flex items-center justify-center text-xs font-bold shadow-sm">
              ✕
            </div>
            <div className="h-36 bg-white rounded-lg border border-[#EBEBEB] flex items-center justify-center overflow-hidden">
              <div className="font-comven-wordmark text-3xl font-bold tracking-tight text-[#F2CB05]">
                comven
              </div>
            </div>
            <div className="mt-4">
              <div className="text-xs font-bold uppercase text-[#FF0000]">
                4. Amarelo usado fora do check
              </div>
              <p className="text-xs text-[#666666] mt-1">
                O amarelo #F2CB05 tem uso restrito e nunca deve tingir o wordmark sobre branco.
              </p>
            </div>
          </div>

          {/* 5. Baixo contraste de fundo */}
          <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#FF0000] text-white flex items-center justify-center text-xs font-bold shadow-sm">
              ✕
            </div>
            <div className="h-36 bg-[#467CB6] rounded-lg border border-[#EBEBEB] flex items-center justify-center overflow-hidden">
              <div className="font-comven-wordmark text-3xl font-bold tracking-tight text-[#004185]">
                comven
              </div>
            </div>
            <div className="mt-4">
              <div className="text-xs font-bold uppercase text-[#FF0000]">
                5. Baixo contraste de fundo
              </div>
              <p className="text-xs text-[#666666] mt-1">
                Evitar aplicar sobre fundos de luminosidade similar que prejudiquem a legibilidade.
              </p>
            </div>
          </div>

          {/* 6. Abaixo do tamanho mínimo (120px) */}
          <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#FF0000] text-white flex items-center justify-center text-xs font-bold shadow-sm">
              ✕
            </div>
            <div className="h-36 bg-[#F5F7FA] rounded-lg border border-[#EBEBEB] flex items-center justify-center overflow-hidden">
              <div style={{ width: '60px' }}>
                <ComvenLogoLockup theme="light" showTagline={false} width={60} />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-xs font-bold uppercase text-[#FF0000]">
                6. Abaixo do tamanho mínimo (120px)
              </div>
              <p className="text-xs text-[#666666] mt-1">
                Nunca renderizar o logotipo com largura inferior a 120px em materiais digitais.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SEÇÃO COMPONENTES: BUTTON                                */}
      {/* ======================================================== */}
      <section id="button" className="scroll-mt-12 space-y-6 pt-6">
        <div className="bg-gradient-to-r from-[#004185] to-[#235F9D] text-white p-6 sm:p-8 rounded-2xl shadow-sm">
          <div className="text-xs font-bold uppercase tracking-widest text-[#9DC6F3] mb-2">
            DESIGN SYSTEM
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Componentes</h2>
          <p className="text-sm text-[#DCDCDC] mt-1">
            Biblioteca de componentes reutilizáveis para os produtos digitais COMVEN.
          </p>
        </div>

        {/* Button Component Container */}
        <div className="space-y-6">
          <div className="flex items-baseline gap-3 border-b border-[#EBEBEB] pb-4">
            <div className="w-8 h-8 rounded-full bg-[#004185] text-white flex items-center justify-center font-bold text-sm">
              01
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#141414] tracking-tight">
                Button
              </h3>
              <p className="text-sm text-[#666666] mt-0.5">
                4 tipos × 3 tamanhos × 2 estados — com ícone e texto configuráveis via painel de
                propriedades.
              </p>
            </div>
          </div>

          {/* Decorative Label Strip matching the PDF presentation playfully */}
          <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 shadow-sm overflow-hidden">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#848484] mb-3">
              Matriz de Variantes — Labels
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {/* Row 1 */}
              <div className="px-4 py-2 bg-[#004185] text-white rounded-lg text-center font-bold text-sm">
                Label
              </div>
              <div className="px-4 py-2 bg-[#8BB7E7] text-white rounded-lg text-center font-bold text-sm">
                Label
              </div>
              <div className="px-4 py-2 bg-[#004185] text-white rounded-lg text-center font-bold text-sm">
                Label
              </div>
              <div className="px-4 py-2 bg-[#8BB7E7] text-white rounded-lg text-center font-bold text-sm">
                Label
              </div>
              <div className="px-4 py-2 bg-[#004185] text-white rounded-lg text-center font-bold text-sm">
                Label
              </div>
              <div className="px-4 py-2 bg-[#8BB7E7] text-white rounded-lg text-center font-bold text-sm">
                Label
              </div>

              {/* Row 2 */}
              <div className="px-4 py-2 border-2 border-[#004185] text-[#004185] rounded-lg text-center font-bold text-sm bg-transparent">
                Label
              </div>
              <div className="px-4 py-2 border-2 border-[#8BB7E7] text-[#8BB7E7] rounded-lg text-center font-bold text-sm bg-transparent">
                Label
              </div>
              <div className="px-4 py-2 border-2 border-[#004185] text-[#004185] rounded-lg text-center font-bold text-sm bg-transparent">
                Label
              </div>
              <div className="px-4 py-2 border-2 border-[#8BB7E7] text-[#8BB7E7] rounded-lg text-center font-bold text-sm bg-transparent">
                Label
              </div>
              <div className="px-4 py-2 border-2 border-[#004185] text-[#004185] rounded-lg text-center font-bold text-sm bg-transparent">
                Label
              </div>
              <div className="px-4 py-2 border-2 border-[#8BB7E7] text-[#8BB7E7] rounded-lg text-center font-bold text-sm bg-transparent">
                Label
              </div>

              {/* Row 3 */}
              <div className="px-4 py-2 bg-[#E6FAED] text-[#004185] rounded-lg text-center font-semibold text-sm">
                Label
              </div>
              <div className="px-4 py-2 bg-[#E6FAED] text-[#8BB7E7] rounded-lg text-center font-semibold text-sm">
                Label
              </div>
              <div className="px-4 py-2 bg-[#E6FAED] text-[#004185] rounded-lg text-center font-semibold text-sm">
                Label
              </div>
              <div className="px-4 py-2 bg-[#E6FAED] text-[#8BB7E7] rounded-lg text-center font-semibold text-sm">
                Label
              </div>
              <div className="px-4 py-2 bg-[#E6FAED] text-[#004185] rounded-lg text-center font-semibold text-sm">
                Label
              </div>
              <div className="px-4 py-2 bg-[#E6FAED] text-[#8BB7E7] rounded-lg text-center font-semibold text-sm">
                Label
              </div>

              {/* Row 4 */}
              <div className="px-4 py-2 text-[#004185] underline rounded-lg text-center font-semibold text-sm">
                Label
              </div>
              <div className="px-4 py-2 text-[#8BB7E7] underline rounded-lg text-center font-semibold text-sm">
                Label
              </div>
              <div className="px-4 py-2 text-[#004185] underline rounded-lg text-center font-semibold text-sm">
                Label
              </div>
              <div className="px-4 py-2 text-[#8BB7E7] underline rounded-lg text-center font-semibold text-sm">
                Label
              </div>
              <div className="px-4 py-2 text-[#004185] underline rounded-lg text-center font-semibold text-sm">
                Label
              </div>
              <div className="px-4 py-2 text-[#8BB7E7] underline rounded-lg text-center font-semibold text-sm">
                Label
              </div>
            </div>
          </div>

          {/* Interactive Button Playground (Registry Item) */}
          <ButtonPlayground />
        </div>
      </section>
    </div>
  )
}
