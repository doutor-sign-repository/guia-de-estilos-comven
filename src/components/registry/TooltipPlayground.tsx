import React, { useState } from 'react'
import {
  TooltipConfig,
  TooltipVariant,
  TooltipPlacement,
  TooltipSize,
  TooltipState,
  generateTooltipCss,
  TOOLTIP_SIZE_METRICS,
} from './types'
import { PlaygroundControlGroup } from './PlaygroundControlGroup'
import { useToast } from '@/hooks/use-toast'

export interface TooltipPlaygroundProps {
  initialConfig?: Partial<TooltipConfig>
}

const TOOLTIP_VARIANTS: TooltipVariant[] = ['Escura', 'Clara']
const TOOLTIP_PLACEMENTS: TooltipPlacement[] = ['Topo', 'Base', 'Esquerda', 'Direita']
const TOOLTIP_SIZES: TooltipSize[] = ['Large', 'Medium', 'Small']
const TOOLTIP_STATES: TooltipState[] = ['Hover', 'Default']

const DEFAULT_TOOLTIP_TEXT = 'Dica rápida de apoio ao operador'
const DEFAULT_TRIGGER_LABEL = 'Passe o mouse'

export const TooltipPlayground: React.FC<TooltipPlaygroundProps> = ({ initialConfig }) => {
  const { toast } = useToast()

  const [variant, setVariant] = useState<TooltipVariant>(initialConfig?.variant || 'Escura')
  const [placement, setPlacement] = useState<TooltipPlacement>(initialConfig?.placement || 'Topo')
  const [size, setSize] = useState<TooltipSize>(initialConfig?.size || 'Medium')
  const [state, setState] = useState<TooltipState>(initialConfig?.state || 'Hover')
  const [text, setText] = useState<string>(initialConfig?.text ?? DEFAULT_TOOLTIP_TEXT)
  const [triggerLabel, setTriggerLabel] = useState<string>(
    initialConfig?.triggerLabel ?? DEFAULT_TRIGGER_LABEL,
  )
  const [isHovered, setIsHovered] = useState(false)
  const [copied, setCopied] = useState(false)

  // O estado exibido no preview pode ser forçado via controle (Hover vs Default) OU pelo mouse
  const effectiveState: TooltipState = state === 'Hover' || isHovered ? 'Hover' : 'Default'

  const config: TooltipConfig = {
    variant,
    placement,
    size,
    state: effectiveState,
    text,
    triggerLabel,
  }
  const cssCode = generateTooltipCss(config)

  const copyCss = () => {
    navigator.clipboard.writeText(cssCode)
    setCopied(true)
    toast({
      title: 'CSS Copiado!',
      description: 'Código CSS copiado para a área de transferência.',
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const FIGMA_PROTO_URL =
    'https://www.figma.com/proto/YEMa9j7O8aNm5PVmS8eSlC/Guia-de-Estilos?node-id=34-1734&viewport=-759%2C471%2C0.32&t=wAmAkj8XxXp7cOHD-1&scaling=contain&content-scaling=responsive&page-id=18%3A2'

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EBEBEB] shadow-sm">
      {/* Tooltip Section Header */}
      <div className="flex items-start gap-4">
        <div className="pt-0.5">
          <h2 className="text-2xl sm:text-[28px] font-bold text-[#141414] leading-tight tracking-tight">
            Tooltip (Dica Contextual Flutuante)
          </h2>
          <p className="text-sm sm:text-[15px] text-[#666666] mt-1 font-normal">
            4 posições (Topo, Base, Esquerda, Direita) × 2 temas (Escuro e Claro) × 3 tamanhos —
            balão apresentacional de dica contextual acionado por hover/foco
          </p>
        </div>
      </div>

      {/* Playground Section */}
      <div className="mt-8 pt-6 border-t border-[#F0F2F5]">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#141414]">
            Playground — configuração interativa em tempo real
          </h3>
          <p className="text-xs sm:text-sm text-[#7A7A7A] mt-1 font-normal">
            Alterne entre temas, posições e tamanhos. No preview abaixo, passe o mouse sobre o botão
            ou force o estado Hover/Default para inspecionar a ancoragem e o código CSS gerado.
          </p>
        </div>

        {/* Controls */}
        <div className="mt-6 flex flex-wrap items-start gap-x-8 gap-y-4">
          {/* VARIANTE */}
          <PlaygroundControlGroup label="VARIANTE (TEMA)">
            {TOOLTIP_VARIANTS.map((v) => {
              const isSelected = variant === v
              const labels: Record<TooltipVariant, string> = {
                Escura: 'Escura (Marinho #062446)',
                Clara: 'Clara (Branco / Borda)',
              }
              return (
                <button
                  key={v}
                  type="button"
                  onClick={() => setVariant(v)}
                  className={`h-8 px-3.5 rounded-md text-xs font-semibold transition-all select-none shrink-0 ${
                    isSelected
                      ? 'bg-[#004185] text-white shadow-xs'
                      : 'bg-[#F0F2F5] text-[#222222] hover:bg-[#E4E7EC]'
                  }`}
                >
                  {labels[v]}
                </button>
              )
            })}
          </PlaygroundControlGroup>

          {/* POSICIONAMENTO */}
          <PlaygroundControlGroup label="POSICIONAMENTO">
            {TOOLTIP_PLACEMENTS.map((p) => {
              const isSelected = placement === p
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPlacement(p)}
                  className={`h-8 px-3.5 rounded-md text-xs font-semibold transition-all select-none shrink-0 ${
                    isSelected
                      ? 'bg-[#004185] text-white shadow-xs'
                      : 'bg-[#F0F2F5] text-[#222222] hover:bg-[#E4E7EC]'
                  }`}
                >
                  {p}
                </button>
              )
            })}
          </PlaygroundControlGroup>

          {/* TAMANHO */}
          <PlaygroundControlGroup label="TAMANHO">
            {TOOLTIP_SIZES.map((s) => {
              const isSelected = size === s
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`h-8 px-3.5 rounded-md text-xs font-semibold transition-all select-none shrink-0 ${
                    isSelected
                      ? 'bg-[#004185] text-white shadow-xs'
                      : 'bg-[#F0F2F5] text-[#222222] hover:bg-[#E4E7EC]'
                  }`}
                >
                  {s}
                </button>
              )
            })}
          </PlaygroundControlGroup>

          {/* ESTADO CONTROLADO */}
          <PlaygroundControlGroup label="ESTADO (PREVIEW)">
            {TOOLTIP_STATES.map((st) => {
              const isSelected = state === st
              const labels: Record<TooltipState, string> = {
                Hover: 'Hover (Visível)',
                Default: 'Default (Oculto / Ao mouse)',
              }
              return (
                <button
                  key={st}
                  type="button"
                  onClick={() => setState(st)}
                  className={`h-8 px-3.5 rounded-md text-xs font-semibold transition-all select-none shrink-0 ${
                    isSelected
                      ? 'bg-[#004185] text-white shadow-xs'
                      : 'bg-[#F0F2F5] text-[#222222] hover:bg-[#E4E7EC]'
                  }`}
                >
                  {labels[st]}
                </button>
              )
            })}
          </PlaygroundControlGroup>
        </div>

        {/* Inputs de TEXTO DO TOOLTIP e LABEL DO GATILHO */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="tooltip-playground-text"
              className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-1.5 block select-none"
            >
              TEXTO DO TOOLTIP
            </label>
            <input
              id="tooltip-playground-text"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Digite a dica do tooltip"
              maxLength={80}
              className="w-full h-8 px-3 rounded-md border border-[#D5DCE5] bg-white text-xs font-semibold text-[#141414] outline-none focus:border-[#004185] focus:ring-1 focus:ring-[#004185] transition-colors placeholder:font-normal placeholder:text-[#9CA3AF]"
            />
          </div>

          <div>
            <label
              htmlFor="tooltip-playground-trigger"
              className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-1.5 block select-none"
            >
              LABEL DO GATILHO (BOTÃO)
            </label>
            <input
              id="tooltip-playground-trigger"
              type="text"
              value={triggerLabel}
              onChange={(e) => setTriggerLabel(e.target.value)}
              placeholder="Label do elemento de disparo"
              maxLength={40}
              className="w-full h-8 px-3 rounded-md border border-[#D5DCE5] bg-white text-xs font-medium text-[#141414] outline-none focus:border-[#004185] focus:ring-1 focus:ring-[#004185] transition-colors placeholder:font-normal placeholder:text-[#9CA3AF]"
            />
          </div>
        </div>

        {/* Live Preview Container */}
        <div className="mt-6 rounded-2xl bg-[#F5F7FA] p-6 sm:p-8 border border-[#EBEBEB]">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            {/* Interactive Tooltip Anchor Box */}
            <div className="flex-1 w-full min-h-[180px] flex items-center justify-center p-8 bg-white/60 rounded-xl border border-dashed border-[#D5DCE5]">
              <div
                className="relative inline-flex items-center justify-center"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Trigger Button (Secondary COMVEN outline) */}
                <button
                  type="button"
                  className="px-5 py-2.5 rounded-lg border-2 border-[#004185] text-[#004185] font-bold text-sm bg-white hover:bg-[#004185]/5 focus:outline-none transition-colors select-none shadow-2xs inline-flex items-center gap-2"
                >
                  <span className="material-symbols-rounded text-base">info</span>
                  <span>{triggerLabel || DEFAULT_TRIGGER_LABEL}</span>
                </button>

                {/* The Tooltip Balloon */}
                <TooltipBalloon config={config} />
              </div>
            </div>

            {/* Figma link */}
            <div className="text-left sm:text-right shrink-0">
              <a
                href={FIGMA_PROTO_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#004185] hover:underline"
              >
                <span>↗ Abrir componente no Figma</span>
              </a>
              <p className="text-[11px] text-[#848484] mt-0.5">
                Uso exclusivo para desenvolvedores
              </p>
            </div>
          </div>

          {/* ATRIBUTOS CSS Panel */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A]">
                ATRIBUTOS CSS
              </span>
              <button
                type="button"
                onClick={copyCss}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-[#004185] bg-white border border-[#D5DCE5] rounded-md hover:bg-[#F0F2F5] transition-colors shadow-2xs"
              >
                <span className="material-symbols-rounded text-xs" style={{ fontSize: '13px' }}>
                  content_copy
                </span>
                <span>{copied ? 'Copiado!' : 'Copiar CSS'}</span>
              </button>
            </div>

            <div className="bg-white rounded-xl border border-[#E2E6EB] p-5 sm:p-6 shadow-2xs">
              <pre className="text-xs sm:text-[13px] font-mono leading-relaxed text-[#1F2328] m-0 whitespace-pre-wrap break-words selection:bg-[#D2E4F7]">
                <code>{cssCode}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Matriz Completa sobre fundo #062446 sem scrollbar */}
      <TooltipStateGallery currentText={text} />
    </div>
  )
}

/** Component for rendering the Tooltip balloon relative to trigger */
export function TooltipBalloon({ config }: { config: TooltipConfig }) {
  const { variant, placement, size, state, text } = config
  const metrics = TOOLTIP_SIZE_METRICS[size] || TOOLTIP_SIZE_METRICS.Medium

  const isVisible = state === 'Hover'
  const isDark = variant === 'Escura'

  const bgColor = isDark ? '#062446' : '#FFFFFF'
  const textColor = isDark ? '#FFFFFF' : '#141414'
  const borderColor = isDark ? '#113C68' : '#D5DCE5'
  const shadow = isDark
    ? '0 6px 16px -2px rgba(6, 36, 70, 0.45)'
    : '0 6px 16px -2px rgba(6, 36, 70, 0.12)'

  // Placement positioning and arrow styles
  let placementStyles: React.CSSProperties = {}
  let arrowStyles: React.CSSProperties = {}

  const arrowOffset = -metrics.arrowSize

  if (placement === 'Topo') {
    placementStyles = {
      bottom: 'calc(100% + 10px)',
      left: '50%',
      transform: 'translateX(-50%)',
    }
    arrowStyles = {
      bottom: `${arrowOffset}px`,
      left: '50%',
      transform: 'translateX(-50%) rotate(45deg)',
      borderRight: `1px solid ${borderColor}`,
      borderBottom: `1px solid ${borderColor}`,
    }
  } else if (placement === 'Base') {
    placementStyles = {
      top: 'calc(100% + 10px)',
      left: '50%',
      transform: 'translateX(-50%)',
    }
    arrowStyles = {
      top: `${arrowOffset}px`,
      left: '50%',
      transform: 'translateX(-50%) rotate(45deg)',
      borderLeft: `1px solid ${borderColor}`,
      borderTop: `1px solid ${borderColor}`,
    }
  } else if (placement === 'Esquerda') {
    placementStyles = {
      right: 'calc(100% + 10px)',
      top: '50%',
      transform: 'translateY(-50%)',
    }
    arrowStyles = {
      right: `${arrowOffset}px`,
      top: '50%',
      transform: 'translateY(-50%) rotate(45deg)',
      borderTop: `1px solid ${borderColor}`,
      borderRight: `1px solid ${borderColor}`,
    }
  } else if (placement === 'Direita') {
    placementStyles = {
      left: 'calc(100% + 10px)',
      top: '50%',
      transform: 'translateY(-50%)',
    }
    arrowStyles = {
      left: `${arrowOffset}px`,
      top: '50%',
      transform: 'translateY(-50%) rotate(45deg)',
      borderBottom: `1px solid ${borderColor}`,
      borderLeft: `1px solid ${borderColor}`,
    }
  }

  return (
    <div
      role="tooltip"
      aria-hidden={!isVisible}
      className="absolute pointer-events-none select-none z-50 transition-all duration-150"
      style={{
        ...placementStyles,
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? 'visible' : 'hidden',
        width: 'max-content',
        maxWidth: `${metrics.maxWidth}px`,
      }}
    >
      <div
        style={{
          position: 'relative',
          backgroundColor: bgColor,
          color: textColor,
          border: `1px solid ${borderColor}`,
          borderRadius: `${metrics.radius}px`,
          padding: metrics.padding,
          boxShadow: shadow,
          fontSize: `${metrics.fontSize}px`,
          lineHeight: metrics.lineHeight,
          fontWeight: 600,
          textAlign: 'center',
          whiteSpace: 'normal',
        }}
      >
        <span>{text || DEFAULT_TOOLTIP_TEXT}</span>
        {/* Arrow pointer */}
        <div
          style={{
            position: 'absolute',
            width: `${metrics.arrowSize * 2}px`,
            height: `${metrics.arrowSize * 2}px`,
            backgroundColor: bgColor,
            ...arrowStyles,
          }}
        />
      </div>
    </div>
  )
}

/** Complete variation matrix for Tooltip over #062446 navy background without internal scroll */
function TooltipStateGallery({ currentText }: { currentText: string }) {
  const blocks: Array<{
    theme: TooltipTheme
    badge: string
    description: string
  }> = [
    {
      theme: 'Dark',
      badge: 'Variante Escura (Fundo Marinho #062446 · Texto Branco)',
      description:
        'Padrão recomendado para fundos claros e neutros, proporcionando máximo contraste e legibilidade.',
    },
    {
      theme: 'Light',
      badge: 'Variante Clara (Fundo Branco · Borda Neutra · Texto Escuro)',
      description:
        'Indicada para superfícies escuras ou imagens, mantendo acabamento limpo com borda de 1px.',
    },
  ]
  return (
    <div className="mt-10 pt-8 border-t border-[#F0F2F5]">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-[#141414]">
          Matriz completa de variações — (2 temas × 4 posicionamentos × 3 tamanhos)
        </h3>
        <p className="text-xs sm:text-sm text-[#7A7A7A] mt-1 font-normal">
          Visualização sobre o fundo azul-marinho oficial COMVEN (#062446), apresentando todos os
          posicionamentos (Topo, Base, Esquerda, Direita) e tamanhos de balão sem barras de scroll.
        </p>
      </div>

      <div className="mt-5 space-y-6">
        {blocks.map((b) => (
          <div
            key={b.variant}
            className="rounded-2xl border border-[#0d3663] bg-[#062446] shadow-md p-6 sm:p-8"
          >
            <div className="pb-4 border-b border-[#113C68]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm sm:text-base font-bold text-[#F2CB05] tracking-wide uppercase">
                  {b.badge}
                </span>
                <span className="text-xs text-[#8BB7E7] font-medium">
                  4 posições (Topo, Base, Esquerda, Direita) × 3 tamanhos
                </span>
              </div>
              <p className="text-xs text-[#D2E4F7] mt-1 font-normal">{b.description}</p>
            </div>

            <div className="divide-y divide-[#113C68]/40">
              {TOOLTIP_PLACEMENTS.map((plc) => (
                <div key={plc} className="py-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#F2CB05] tracking-wide uppercase">
                      Posicionamento: {plc}
                    </span>
                    <div className="flex-1 h-px bg-[#113C68]/60" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center py-6">
                    {TOOLTIP_SIZES.map((sz) => (
                      <div
                        key={`${b.variant}-${plc}-${sz}`}
                        className="flex flex-col items-center justify-center p-6 bg-[#001D3D]/60 rounded-xl border border-[#113C68]/80 min-h-[140px]"
                      >
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8BB7E7] mb-3">
                          Tamanho {sz}
                        </span>
                        <div className="relative inline-flex items-center justify-center">
                          <div className="px-3 py-1.5 rounded-md bg-white/10 text-white text-xs font-semibold select-none border border-white/20">
                            Gatilho
                          </div>
                          <TooltipBalloon
                            config={{
                              variant: b.variant,
                              placement: plc,
                              size: sz,
                              state: 'Hover',
                              text: currentText || DEFAULT_TOOLTIP_TEXT,
                              triggerLabel: 'Gatilho',
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
