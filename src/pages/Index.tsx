import React from 'react'
import { ComvenLogoLockup, ComvenOfficialLogo } from '@/components/ComvenLogo'
import { BRAND_COLORS, COLOR_FAMILIES } from '@/data/colors'
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
    <div className="w-full">
      {/* Top Banner / Hero fluido com padding generoso e proporcional */}
      <section className="w-full bg-[#004185] text-white py-14 sm:py-16 lg:py-20 px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="w-full">
          {/* Badge / Pill */}
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#205898] text-[#E8F1FC] text-[11px] font-semibold tracking-[0.12em] uppercase mb-7 select-none shadow-sm">
            DESIGN SYSTEM
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] leading-[1.1] font-bold tracking-tight text-white mb-6">
            Guia de Estilos COMVEN
          </h1>

          {/* Subtitle / Paragraph */}
          <p className="max-w-4xl text-base sm:text-lg lg:text-[19px] leading-relaxed text-[#D2E4F7] font-normal">
            Referência oficial de marca e identidade visual para uso interno — logotipo, cores,
            tipografia, iconografia e boas práticas de aplicação.
          </p>
        </div>
      </section>

      {/* Main Content Sections: fluida com padding proporcional */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 2xl:px-24 py-8 lg:py-10 space-y-8 lg:space-y-10 pb-16">
        {/* ======================================================== */}
        {/* SEÇÃO 1: LOGOTIPO                                        */}
        {/* ======================================================== */}
        <section
          id="logotipo"
          className="scroll-mt-12 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#EBEBEB] shadow-sm space-y-8"
        >
          {/* Card Header matching reference screenshot */}
          <div className="flex items-start gap-4 pb-2 border-b border-[#F0F2F5]">
            <div className="w-9 h-9 rounded-full bg-[#004185] text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5 shadow-sm">
              1
            </div>
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#141414] tracking-tight">
                Logotipo
              </h2>
              <p className="text-sm text-[#666666] mt-0.5">
                Versão principal e aplicação em fundo escuro
              </p>
            </div>
            <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#004185]/10 text-[#004185]">
              8 variações oficiais
            </span>
          </div>

          {/* 2-Column Grid matching Figma screenshot:
              Light version on light blue-grey card (#F1F3F6), Dark version on navy blue card (#0B2A52) */}
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-[#141414] flex items-center gap-2">
                <span>Versões com Tagline</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-[#666666]">
                  Lockup completo
                </span>
              </h3>
              <p className="text-xs text-[#666666] mt-0.5">
                Aplicações institucionais principais acompanhadas da assinatura &quot;COMUNICAÇÃO DE
                VENDA EM TEMPO REAL&quot;.
              </p>
            </div>

            {/* Row 1: Versões Coloridas (Light × Dark) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {/* Light Background (#F1F3F6) - Colorida com Tagline */}
              <div className="bg-[#F1F3F6] rounded-2xl p-6 sm:p-8 flex flex-col justify-between min-h-[280px] sm:min-h-[320px] transition-all border border-transparent hover:border-[#004185]/20 group">
                <div className="flex items-center justify-between text-xs font-semibold text-[#004185]">
                  <span className="uppercase tracking-wider text-[11px] font-bold">
                    Fundo Claro · Colorida (Principal)
                  </span>
                  <span className="text-[11px] font-medium px-2 py-0.5 bg-white text-[#047D2E] rounded shadow-xs">
                    Oficial #1
                  </span>
                </div>
                <div className="w-full max-w-[420px] mx-auto py-8 flex items-center justify-center">
                  <ComvenOfficialLogo variant="light-colorida" showTagline={true} width="100%" />
                </div>
                <div className="pt-2 text-[11px] text-[#666666]">
                  <strong className="text-[#141414]">Light Mode — Colorida:</strong> Azul #004185,
                  verde #06D04D e check amarelo #F2CB05.
                </div>
              </div>

              {/* Dark Background (#0B2A52) - Colorida com Tagline */}
              <div className="bg-[#0B2A52] rounded-2xl p-6 sm:p-8 flex flex-col justify-between min-h-[280px] sm:min-h-[320px] transition-all border border-transparent hover:border-white/20 group">
                <div className="flex items-center justify-between text-xs font-semibold text-[#8BB7E7]">
                  <span className="uppercase tracking-wider text-[11px] font-bold">
                    Fundo Escuro · Colorida
                  </span>
                  <span className="text-[11px] font-medium px-2 py-0.5 bg-white/10 text-white rounded">
                    Fundo Escuro #0B2A52
                  </span>
                </div>
                <div className="w-full max-w-[420px] mx-auto py-8 flex items-center justify-center">
                  <ComvenOfficialLogo variant="dark-colorida" showTagline={true} width="100%" />
                </div>
                <div className="pt-2 text-[11px] text-[#A6C4E7]">
                  <strong className="text-white">Dark Mode — Colorida:</strong> Wordmark colorido
                  com check amarelo sobre superfície azul marinho.
                </div>
              </div>
            </div>

            {/* Row 2: Versões Monocromáticas (Light 1-Cor × Dark 1-Cor) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 pt-2">
              {/* Light Background (#F1F3F6) - 1 Cor (Azul) */}
              <div className="bg-[#F1F3F6] rounded-2xl p-6 sm:p-8 flex flex-col justify-between min-h-[280px] sm:min-h-[320px] transition-all border border-transparent hover:border-[#004185]/20 group">
                <div className="flex items-center justify-between text-xs font-semibold text-[#004185]">
                  <span className="uppercase tracking-wider text-[11px] font-bold">
                    Fundo Claro · 1 Cor (Azul)
                  </span>
                  <span className="text-[11px] font-mono text-[#666666]">#004185</span>
                </div>
                <div className="w-full max-w-[420px] mx-auto py-8 flex items-center justify-center">
                  <ComvenOfficialLogo variant="light-1cor" showTagline={true} width="100%" />
                </div>
                <div className="pt-2 text-[11px] text-[#666666]">
                  <strong className="text-[#141414]">Light Mode — Monocromática:</strong> Aplicação
                  azul sobre claro para documentos e impressos.
                </div>
              </div>

              {/* Dark Background (#0B2A52) - 1 Cor (Branco) */}
              <div className="bg-[#0B2A52] rounded-2xl p-6 sm:p-8 flex flex-col justify-between min-h-[280px] sm:min-h-[320px] transition-all border border-transparent hover:border-white/20 group">
                <div className="flex items-center justify-between text-xs font-semibold text-[#8BB7E7]">
                  <span className="uppercase tracking-wider text-[11px] font-bold">
                    Fundo Escuro · 1 Cor (Branco)
                  </span>
                  <span className="text-[11px] font-mono text-[#A6C4E7]">#FFFFFF</span>
                </div>
                <div className="w-full max-w-[420px] mx-auto py-8 flex items-center justify-center">
                  <ComvenOfficialLogo variant="dark-1cor" showTagline={true} width="100%" />
                </div>
                <div className="pt-2 text-[11px] text-[#A6C4E7]">
                  <strong className="text-white">Dark Mode — Monocromática:</strong> Branco em alto
                  contraste para materiais em negativo.
                </div>
              </div>
            </div>
          </div>

          {/* Grupo 2: Versões sem Tagline (Somente Wordmark - 4 variações) */}
          <div className="space-y-4 pt-4 border-t border-[#F0F2F5]">
            <div>
              <h3 className="text-base font-bold text-[#141414] flex items-center gap-2">
                <span>Versões sem Tagline (Somente Wordmark)</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-[#666666]">
                  Reduções &amp; UI
                </span>
              </h3>
              <p className="text-xs text-[#666666] mt-0.5">
                Aplicações compactas para navegação, headers, footers e locais com restrição de
                altura.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* 5. Light Mode Colorida sem Tagline */}
              <div className="bg-[#F1F3F6] rounded-2xl p-5 flex flex-col justify-between min-h-[200px] border border-transparent hover:border-[#004185]/20 transition-all">
                <span className="text-[10px] font-bold text-[#004185] uppercase tracking-wider">
                  Fundo Claro · Colorida
                </span>
                <div className="w-full py-4 flex items-center justify-center">
                  <ComvenOfficialLogo variant="light-colorida" showTagline={false} width={170} />
                </div>
                <div className="pt-2 text-[11px] text-[#666666]">
                  <div className="font-bold text-[#141414]">Light Colorida</div>
                  <div className="text-[10px] text-[#848484]">Check verde/amarelo</div>
                </div>
              </div>

              {/* 6. Dark Mode Colorida sem Tagline */}
              <div className="bg-[#0B2A52] rounded-2xl p-5 flex flex-col justify-between min-h-[200px] border border-transparent hover:border-white/20 transition-all">
                <span className="text-[10px] font-bold text-[#8BB7E7] uppercase tracking-wider">
                  Fundo Escuro · Colorida
                </span>
                <div className="w-full py-4 flex items-center justify-center">
                  <ComvenOfficialLogo variant="dark-colorida" showTagline={false} width={170} />
                </div>
                <div className="pt-2 text-[11px] text-[#A6C4E7]">
                  <div className="font-bold text-white">Dark Colorida</div>
                  <div className="text-[10px] text-[#8BB7E7]">Wordmark em fundo escuro</div>
                </div>
              </div>

              {/* 7. Light Mode 1 Cor sem Tagline */}
              <div className="bg-[#F1F3F6] rounded-2xl p-5 flex flex-col justify-between min-h-[200px] border border-transparent hover:border-[#004185]/20 transition-all">
                <span className="text-[10px] font-bold text-[#004185] uppercase tracking-wider">
                  Fundo Claro · 1 Cor
                </span>
                <div className="w-full py-4 flex items-center justify-center">
                  <ComvenOfficialLogo variant="light-1cor" showTagline={false} width={170} />
                </div>
                <div className="pt-2 text-[11px] text-[#666666]">
                  <div className="font-bold text-[#141414]">Light 1 Cor</div>
                  <div className="text-[10px] text-[#848484]">Azul #004185</div>
                </div>
              </div>

              {/* 8. Dark Mode 1 Cor sem Tagline */}
              <div className="bg-[#0B2A52] rounded-2xl p-5 flex flex-col justify-between min-h-[200px] border border-transparent hover:border-white/20 transition-all">
                <span className="text-[10px] font-bold text-[#8BB7E7] uppercase tracking-wider">
                  Fundo Escuro · 1 Cor
                </span>
                <div className="w-full py-4 flex items-center justify-center">
                  <ComvenOfficialLogo variant="dark-1cor" showTagline={false} width={170} />
                </div>
                <div className="pt-2 text-[11px] text-[#A6C4E7]">
                  <div className="font-bold text-white">Dark 1 Cor</div>
                  <div className="text-[10px] text-[#8BB7E7]">Branco #FFFFFF</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SEÇÃO 2: CORES                                           */}
        {/* ======================================================== */}
        <section
          id="cores"
          className="scroll-mt-12 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#EBEBEB] shadow-sm space-y-8"
        >
          {/* Card Header */}
          <div className="flex items-start gap-4 pb-2 border-b border-[#F0F2F5]">
            <div className="w-9 h-9 rounded-full bg-[#004185] text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5 shadow-sm">
              2
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#141414] tracking-tight">
                Cores
              </h2>
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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {BRAND_COLORS.map((c) => {
                const isDarkText = !c.textLight
                return (
                  <div
                    key={c.name}
                    onClick={() => copyToClipboard(c.hex)}
                    role="button"
                    tabIndex={0}
                    className="rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer transform hover:-translate-y-1 group border border-[#EBEBEB]"
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
                    <div className="bg-white p-3 border-t border-[#EBEBEB]">
                      <div className="text-xs font-semibold text-[#141414]">{c.role}</div>
                      <div className="text-[11px] text-[#848484] truncate">{c.description}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 5 Escalas 50-900 com 10 células cada */}
          <div className="space-y-6 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#141414]">
                  Escalas de Tonalidade (50–900)
                </h3>
                <p className="text-xs text-[#666666]">
                  Clique em qualquer célula para copiar o código hexadecimal
                </p>
              </div>
              <span className="text-xs text-[#848484] hidden sm:inline">10 tons por escala</span>
            </div>

            <div className="space-y-5">
              {COLOR_FAMILIES.map((family) => (
                <div
                  key={family.id}
                  className="bg-[#FAFBFD] rounded-xl border border-[#EBEBEB] p-5 shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-[#EBEBEB]">
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
        <section
          id="tipografia"
          className="scroll-mt-12 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#EBEBEB] shadow-sm space-y-8"
        >
          {/* Card Header */}
          <div className="flex items-start gap-4 pb-2 border-b border-[#F0F2F5]">
            <div className="w-9 h-9 rounded-full bg-[#004185] text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5 shadow-sm">
              3
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#141414] tracking-tight">
                Tipografia
              </h2>
              <p className="text-sm text-[#666666] mt-0.5">
                Famílias tipográficas para uso oficial
              </p>
            </div>
          </div>

          {/* Open Sans Block */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#EBEBEB] gap-2">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#004185] mb-1">
                  Fonte de apoio oficial
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#141414]">
                  Fonte de apoio — Open Sans
                </h3>
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
              <div className="lg:col-span-4 bg-[#F5F7FA] rounded-2xl p-6 flex flex-col justify-between border border-[#EBEBEB]">
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
                    <div className="text-xs text-[#848484] leading-relaxed">
                      Informações auxiliares, notas de rodapé, timestamps e metadados de suporte.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SEÇÃO 4: ICONOGRAFIA                                     */}
        {/* ======================================================== */}
        <section
          id="iconografia"
          className="scroll-mt-12 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#EBEBEB] shadow-sm space-y-8"
        >
          {/* Card Header */}
          <div className="flex items-start gap-4 pb-2 border-b border-[#F0F2F5]">
            <div className="w-9 h-9 rounded-full bg-[#004185] text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5 shadow-sm">
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

          <div className="space-y-8">
            {/* Size Chips & Style Chips */}
            <div className="flex flex-wrap items-center gap-3 pb-6 border-b border-[#EBEBEB]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#666666] mr-2">
                Tamanhos Oficiais:
              </span>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5F7FA] border border-[#BFBFBF] text-xs font-bold text-[#141414]">
                <span
                  className="material-symbols-rounded icon-outline"
                  style={{ fontSize: '20px' }}
                >
                  search
                </span>
                <span>20px</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#004185]/10 border border-[#004185] text-xs font-bold text-[#004185]">
                <span
                  className="material-symbols-rounded icon-outline"
                  style={{ fontSize: '24px' }}
                >
                  search
                </span>
                <span>24px (Padrão)</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5F7FA] border border-[#BFBFBF] text-xs font-bold text-[#141414]">
                <span
                  className="material-symbols-rounded icon-outline"
                  style={{ fontSize: '32px' }}
                >
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
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 2xl:grid-cols-8 gap-3">
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
        <section
          id="area-de-protecao"
          className="scroll-mt-12 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#EBEBEB] shadow-sm space-y-8"
        >
          {/* Card Header */}
          <div className="flex items-start gap-4 pb-2 border-b border-[#F0F2F5]">
            <div className="w-9 h-9 rounded-full bg-[#004185] text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5 shadow-sm">
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

          <div className="space-y-6">
            {/* Diagram Card with X markers on each side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Diagram with Tagline */}
              <div className="relative bg-[#F5F7FA] rounded-2xl border border-[#EBEBEB] p-10 flex flex-col items-center justify-center min-h-[280px]">
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
              <div className="relative bg-[#F5F7FA] rounded-2xl border border-[#EBEBEB] p-10 flex flex-col items-center justify-center min-h-[280px]">
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

            {/* Explanation captions */}
            <div className="bg-[#FAFBFD] rounded-xl p-5 border border-[#EBEBEB] space-y-2">
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
        <section
          id="aplicacoes-incorretas"
          className="scroll-mt-12 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#EBEBEB] shadow-sm space-y-8"
        >
          {/* Card Header */}
          <div className="flex items-start gap-4 pb-2 border-b border-[#F0F2F5]">
            <div className="w-9 h-9 rounded-full bg-[#004185] text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5 shadow-sm">
              6
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#141414] tracking-tight">
                Aplicações incorretas
              </h2>
              <p className="text-sm text-[#666666] mt-0.5">
                O que evitar ao usar o logotipo COMVEN
              </p>
            </div>
          </div>

          {/* Grid 6 Incorrect Application Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-6">
            {/* 1. Distorção / esticar */}
            <div className="bg-[#FAFBFD] rounded-2xl border border-[#EBEBEB] p-5 shadow-xs relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#FF0000] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                ✕
              </div>
              <div className="h-36 bg-white rounded-xl border border-[#EBEBEB] flex items-center justify-center overflow-hidden">
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
            <div className="bg-[#FAFBFD] rounded-2xl border border-[#EBEBEB] p-5 shadow-xs relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#FF0000] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                ✕
              </div>
              <div className="h-36 bg-white rounded-xl border border-[#EBEBEB] flex items-center justify-center overflow-hidden">
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
            <div className="bg-[#FAFBFD] rounded-2xl border border-[#EBEBEB] p-5 shadow-xs relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#FF0000] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                ✕
              </div>
              <div className="h-36 bg-white rounded-xl border border-[#EBEBEB] flex items-center justify-center overflow-hidden">
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
            <div className="bg-[#FAFBFD] rounded-2xl border border-[#EBEBEB] p-5 shadow-xs relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#FF0000] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                ✕
              </div>
              <div className="h-36 bg-white rounded-xl border border-[#EBEBEB] flex items-center justify-center overflow-hidden">
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
            <div className="bg-[#FAFBFD] rounded-2xl border border-[#EBEBEB] p-5 shadow-xs relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#FF0000] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                ✕
              </div>
              <div className="h-36 bg-[#467CB6] rounded-xl border border-[#EBEBEB] flex items-center justify-center overflow-hidden">
                <div className="font-comven-wordmark text-3xl font-bold tracking-tight text-[#004185]">
                  comven
                </div>
              </div>
              <div className="mt-4">
                <div className="text-xs font-bold uppercase text-[#FF0000]">
                  5. Baixo contraste de fundo
                </div>
                <p className="text-xs text-[#666666] mt-1">
                  Evitar aplicar sobre fundos de luminosidade similar que prejudiquem a
                  legibilidade.
                </p>
              </div>
            </div>

            {/* 6. Abaixo do tamanho mínimo (120px) */}
            <div className="bg-[#FAFBFD] rounded-2xl border border-[#EBEBEB] p-5 shadow-xs relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#FF0000] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                ✕
              </div>
              <div className="h-36 bg-white rounded-xl border border-[#EBEBEB] flex items-center justify-center overflow-hidden">
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
      </div>
    </div>
  )
}
