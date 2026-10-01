import React from 'react'
import { ButtonPlayground } from '@/components/registry/ButtonPlayground'

export default function Componentes() {
  return (
    <div className="w-full">
      {/* Top Banner / Hero matching Guia de Estilos style */}
      <section className="w-full bg-[#004185] text-white py-12 sm:py-14 lg:py-16 px-6 sm:px-10 lg:px-14">
        <div className="max-w-[1200px] mx-auto">
          {/* Badge / Pill */}
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#205898] text-[#E8F1FC] text-[11px] font-semibold tracking-[0.12em] uppercase mb-5 select-none shadow-sm">
            COMPONENTES
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] leading-[1.15] font-bold tracking-tight text-white mb-4">
            Componentes · Button
          </h1>

          {/* Subtitle / Paragraph */}
          <p className="max-w-3xl text-sm sm:text-base lg:text-[17px] leading-relaxed text-[#D2E4F7] font-normal">
            Biblioteca de componentes reutilizáveis para os produtos digitais COMVEN. Explore a
            matriz completa de variantes e interaja com o playground configurável.
          </p>
        </div>
      </section>

      {/* Main Content with box cards */}
      <div className="max-w-[1200px] mx-auto p-4 sm:p-6 lg:p-10 space-y-8 pb-16">
        {/* Component Header Card */}
        <section
          id="button"
          className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-[#EBEBEB] shadow-sm space-y-8"
        >
          {/* Header inside card matching style */}
          <div className="flex items-start gap-4 pb-2 border-b border-[#F0F2F5]">
            <div className="w-9 h-9 rounded-full bg-[#004185] text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5 shadow-sm">
              1
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#141414] tracking-tight">
                Button
              </h2>
              <p className="text-sm text-[#666666] mt-0.5">
                4 tipos × 3 tamanhos × 2 estados — com ícone e texto configuráveis via painel de
                propriedades.
              </p>
            </div>
          </div>

          {/* Matriz Completa de Instâncias do Button — Type × Size × State × Ícone */}
          <div className="bg-[#FAFBFD] rounded-2xl border border-[#EBEBEB] p-5 sm:p-7 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EBEBEB] gap-2">
              <div>
                <h3 className="text-lg font-bold text-[#141414] flex items-center gap-2">
                  <span>Matriz de Variantes do Componente</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-[#004185]/10 text-[#004185] font-semibold">
                    Figma Node 34:1734
                  </span>
                </h3>
                <p className="text-xs text-[#666666] mt-0.5">
                  Visualização sistemática de todas as instâncias: Primary, Secondary, Tertiary e
                  Link em Default e Disabled, com e sem ícone.
                </p>
              </div>
              <span className="text-xs font-mono text-[#848484]">Raio padrão: 8px · Gap: 8px</span>
            </div>

            {/* Matriz em Grid com 4 Categorias (Types) */}
            <div className="space-y-6">
              {/* Type: Primary */}
              <div className="bg-white rounded-xl p-5 border border-[#EBEBEB] space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#004185]">
                      Type: Primary
                    </span>
                    <span className="text-[11px] text-[#666666]">
                      (Fundo #004185 · Texto #FFFFFF · Disabled #8BB7E7)
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#848484]">Ação principal</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 items-center">
                  <div className="flex flex-col items-center gap-1.5 p-3 bg-[#F5F7FA] rounded-lg border border-[#EBEBEB]">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#004185] text-white font-bold text-base shadow-sm"
                    >
                      <span
                        className="material-symbols-rounded icon-outline"
                        style={{ fontSize: '20px' }}
                      >
                        search
                      </span>
                      <span>Label</span>
                    </button>
                    <span className="text-[10px] text-[#848484]">Large / Default / Ícone</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-3 bg-[#F5F7FA] rounded-lg border border-[#EBEBEB]">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#004185] text-white font-bold text-sm shadow-sm"
                    >
                      <span
                        className="material-symbols-rounded icon-outline"
                        style={{ fontSize: '18px' }}
                      >
                        search
                      </span>
                      <span>Label</span>
                    </button>
                    <span className="text-[10px] text-[#848484]">Medium / Default / Ícone</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-3 bg-[#F5F7FA] rounded-lg border border-[#EBEBEB]">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#004185] text-white font-bold text-xs shadow-sm"
                    >
                      <span
                        className="material-symbols-rounded icon-outline"
                        style={{ fontSize: '16px' }}
                      >
                        search
                      </span>
                      <span>Label</span>
                    </button>
                    <span className="text-[10px] text-[#848484]">Small / Default / Ícone</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-3 bg-[#F5F7FA] rounded-lg border border-[#EBEBEB]">
                    <button
                      type="button"
                      className="inline-flex items-center px-5 py-3 rounded-lg bg-[#004185] text-white font-bold text-base shadow-sm"
                    >
                      <span>Label</span>
                    </button>
                    <span className="text-[10px] text-[#848484]">Large / Sem ícone</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-3 bg-[#F5F7FA] rounded-lg border border-[#EBEBEB]">
                    <button
                      type="button"
                      disabled
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#8BB7E7] text-white font-bold text-sm cursor-not-allowed"
                    >
                      <span
                        className="material-symbols-rounded icon-outline"
                        style={{ fontSize: '18px' }}
                      >
                        search
                      </span>
                      <span>Label</span>
                    </button>
                    <span className="text-[10px] text-[#848484]">Medium / Disabled</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-3 bg-[#F5F7FA] rounded-lg border border-[#EBEBEB]">
                    <button
                      type="button"
                      disabled
                      className="inline-flex items-center px-4 py-2.5 rounded-lg bg-[#8BB7E7] text-white font-bold text-sm cursor-not-allowed"
                    >
                      <span>Label</span>
                    </button>
                    <span className="text-[10px] text-[#848484]">Disabled / Sem ícone</span>
                  </div>
                </div>
              </div>

              {/* Type: Secondary */}
              <div className="bg-white rounded-xl p-5 border border-[#EBEBEB] space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#004185]">
                      Type: Secondary
                    </span>
                    <span className="text-[11px] text-[#666666]">
                      (Transparente · Borda 2px #004185 · Texto #004185 · Disabled #8BB7E7)
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#848484]">Ação secundária</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 items-center">
                  <div className="flex flex-col items-center gap-1.5 p-3 bg-[#F5F7FA] rounded-lg border border-[#EBEBEB]">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 border-[#004185] text-[#004185] font-bold text-base hover:bg-[#004185]/5"
                    >
                      <span
                        className="material-symbols-rounded icon-outline"
                        style={{ fontSize: '20px' }}
                      >
                        search
                      </span>
                      <span>Label</span>
                    </button>
                    <span className="text-[10px] text-[#848484]">Large / Default</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-3 bg-[#F5F7FA] rounded-lg border border-[#EBEBEB]">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-[#004185] text-[#004185] font-bold text-sm hover:bg-[#004185]/5"
                    >
                      <span
                        className="material-symbols-rounded icon-outline"
                        style={{ fontSize: '18px' }}
                      >
                        search
                      </span>
                      <span>Label</span>
                    </button>
                    <span className="text-[10px] text-[#848484]">Medium / Default</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-3 bg-[#F5F7FA] rounded-lg border border-[#EBEBEB]">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-[#004185] text-[#004185] font-bold text-xs hover:bg-[#004185]/5"
                    >
                      <span
                        className="material-symbols-rounded icon-outline"
                        style={{ fontSize: '16px' }}
                      >
                        search
                      </span>
                      <span>Label</span>
                    </button>
                    <span className="text-[10px] text-[#848484]">Small / Default</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-3 bg-[#F5F7FA] rounded-lg border border-[#EBEBEB]">
                    <button
                      type="button"
                      className="inline-flex items-center px-5 py-2.5 rounded-lg border-2 border-[#004185] text-[#004185] font-bold text-base hover:bg-[#004185]/5"
                    >
                      <span>Label</span>
                    </button>
                    <span className="text-[10px] text-[#848484]">Large / Sem ícone</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-3 bg-[#F5F7FA] rounded-lg border border-[#EBEBEB]">
                    <button
                      type="button"
                      disabled
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-[#8BB7E7] text-[#8BB7E7] font-bold text-sm cursor-not-allowed"
                    >
                      <span
                        className="material-symbols-rounded icon-outline"
                        style={{ fontSize: '18px' }}
                      >
                        search
                      </span>
                      <span>Label</span>
                    </button>
                    <span className="text-[10px] text-[#848484]">Medium / Disabled</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-3 bg-[#F5F7FA] rounded-lg border border-[#EBEBEB]">
                    <button
                      type="button"
                      disabled
                      className="inline-flex items-center px-4 py-2 rounded-lg border-2 border-[#8BB7E7] text-[#8BB7E7] font-bold text-sm cursor-not-allowed"
                    >
                      <span>Label</span>
                    </button>
                    <span className="text-[10px] text-[#848484]">Disabled / Sem ícone</span>
                  </div>
                </div>
              </div>

              {/* Type: Tertiary */}
              <div className="bg-white rounded-xl p-5 border border-[#EBEBEB] space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#004185]">
                      Type: Tertiary
                    </span>
                    <span className="text-[11px] text-[#666666]">
                      (Fundo #F5F7FA · Texto #004185 · Sem borda · Disabled #8BB7E7)
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#848484]">Ação sutil / neutra</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 items-center">
                  <div className="flex flex-col items-center gap-1.5 p-3 bg-[#F5F7FA] rounded-lg border border-[#EBEBEB]">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#EAEFF5] text-[#004185] font-bold text-base hover:bg-[#DFE7F1]"
                    >
                      <span
                        className="material-symbols-rounded icon-outline"
                        style={{ fontSize: '20px' }}
                      >
                        search
                      </span>
                      <span>Label</span>
                    </button>
                    <span className="text-[10px] text-[#848484]">Large / Default</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-3 bg-[#F5F7FA] rounded-lg border border-[#EBEBEB]">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#EAEFF5] text-[#004185] font-bold text-sm hover:bg-[#DFE7F1]"
                    >
                      <span
                        className="material-symbols-rounded icon-outline"
                        style={{ fontSize: '18px' }}
                      >
                        search
                      </span>
                      <span>Label</span>
                    </button>
                    <span className="text-[10px] text-[#848484]">Medium / Default</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-3 bg-[#F5F7FA] rounded-lg border border-[#EBEBEB]">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#EAEFF5] text-[#004185] font-bold text-xs hover:bg-[#DFE7F1]"
                    >
                      <span
                        className="material-symbols-rounded icon-outline"
                        style={{ fontSize: '16px' }}
                      >
                        search
                      </span>
                      <span>Label</span>
                    </button>
                    <span className="text-[10px] text-[#848484]">Small / Default</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-3 bg-[#F5F7FA] rounded-lg border border-[#EBEBEB]">
                    <button
                      type="button"
                      className="inline-flex items-center px-5 py-3 rounded-lg bg-[#EAEFF5] text-[#004185] font-bold text-base hover:bg-[#DFE7F1]"
                    >
                      <span>Label</span>
                    </button>
                    <span className="text-[10px] text-[#848484]">Large / Sem ícone</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-3 bg-[#F5F7FA] rounded-lg border border-[#EBEBEB]">
                    <button
                      type="button"
                      disabled
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#F5F7FA] text-[#8BB7E7] font-bold text-sm cursor-not-allowed"
                    >
                      <span
                        className="material-symbols-rounded icon-outline"
                        style={{ fontSize: '18px' }}
                      >
                        search
                      </span>
                      <span>Label</span>
                    </button>
                    <span className="text-[10px] text-[#848484]">Medium / Disabled</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-3 bg-[#F5F7FA] rounded-lg border border-[#EBEBEB]">
                    <button
                      type="button"
                      disabled
                      className="inline-flex items-center px-4 py-2.5 rounded-lg bg-[#F5F7FA] text-[#8BB7E7] font-bold text-sm cursor-not-allowed"
                    >
                      <span>Label</span>
                    </button>
                    <span className="text-[10px] text-[#848484]">Disabled / Sem ícone</span>
                  </div>
                </div>
              </div>

              {/* Type: Link */}
              <div className="bg-white rounded-xl p-5 border border-[#EBEBEB] space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#004185]">
                      Type: Link
                    </span>
                    <span className="text-[11px] text-[#666666]">
                      (Transparente · Texto sublinhado #004185 · Disabled #8BB7E7)
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#848484]">Navegação inline</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 items-center">
                  <div className="flex flex-col items-center gap-1.5 p-3 bg-[#F5F7FA] rounded-lg border border-[#EBEBEB]">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-[#004185] underline underline-offset-4 font-semibold text-base"
                    >
                      <span
                        className="material-symbols-rounded icon-outline"
                        style={{ fontSize: '20px' }}
                      >
                        search
                      </span>
                      <span>Label</span>
                    </button>
                    <span className="text-[10px] text-[#848484]">Large / Default</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-3 bg-[#F5F7FA] rounded-lg border border-[#EBEBEB]">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-[#004185] underline underline-offset-4 font-semibold text-sm"
                    >
                      <span
                        className="material-symbols-rounded icon-outline"
                        style={{ fontSize: '18px' }}
                      >
                        search
                      </span>
                      <span>Label</span>
                    </button>
                    <span className="text-[10px] text-[#848484]">Medium / Default</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-3 bg-[#F5F7FA] rounded-lg border border-[#EBEBEB]">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-[#004185] underline underline-offset-4 font-semibold text-xs"
                    >
                      <span
                        className="material-symbols-rounded icon-outline"
                        style={{ fontSize: '16px' }}
                      >
                        search
                      </span>
                      <span>Label</span>
                    </button>
                    <span className="text-[10px] text-[#848484]">Small / Default</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-3 bg-[#F5F7FA] rounded-lg border border-[#EBEBEB]">
                    <button
                      type="button"
                      className="inline-flex items-center px-5 py-3 rounded-lg text-[#004185] underline underline-offset-4 font-semibold text-base"
                    >
                      <span>Label</span>
                    </button>
                    <span className="text-[10px] text-[#848484]">Large / Sem ícone</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-3 bg-[#F5F7FA] rounded-lg border border-[#EBEBEB]">
                    <button
                      type="button"
                      disabled
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-[#8BB7E7] underline underline-offset-4 font-semibold text-sm cursor-not-allowed"
                    >
                      <span
                        className="material-symbols-rounded icon-outline"
                        style={{ fontSize: '18px' }}
                      >
                        search
                      </span>
                      <span>Label</span>
                    </button>
                    <span className="text-[10px] text-[#848484]">Medium / Disabled</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-3 bg-[#F5F7FA] rounded-lg border border-[#EBEBEB]">
                    <button
                      type="button"
                      disabled
                      className="inline-flex items-center px-4 py-2.5 rounded-lg text-[#8BB7E7] underline underline-offset-4 font-semibold text-sm cursor-not-allowed"
                    >
                      <span>Label</span>
                    </button>
                    <span className="text-[10px] text-[#848484]">Disabled / Sem ícone</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Button Playground (Registry Item) */}
          <div className="pt-2">
            <ButtonPlayground />
          </div>
        </section>
      </div>
    </div>
  )
}
