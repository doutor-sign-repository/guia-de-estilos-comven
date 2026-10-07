import React, { useState } from 'react'
import {
  CardConfig,
  CardVariant,
  CardSize,
  CardState,
  CardIconOption,
  CardFooterOption,
  generateCardCss,
  CARD_SIZE_METRICS,
} from './types'
import { PlaygroundControlGroup } from './PlaygroundControlGroup'
import { useToast } from '@/hooks/use-toast'

export interface CardPlaygroundProps {
  initialConfig?: Partial<CardConfig>
}

const CARD_VARIANTS: CardVariant[] = ['Elevada', 'Borda', 'Simples']
const CARD_SIZES: CardSize[] = ['Large', 'Medium', 'Small']
const CARD_STATES: CardState[] = ['Default', 'Destaque']
const CARD_ICONS: CardIconOption[] = ['Com ícone', 'Sem ícone']
const CARD_FOOTERS: CardFooterOption[] = ['Com ações', 'Sem ações']

const DEFAULT_TITLE = 'Visão Geral da Operação'
const DEFAULT_CONTENT =
  'Consolidação dos pedidos expedidos, rotas em andamento e indicadores de entrega em tempo real para a rede COMVEN.'

export const CardPlayground: React.FC<CardPlaygroundProps> = ({ initialConfig }) => {
  const { toast } = useToast()

  const [variant, setVariant] = useState<CardVariant>(initialConfig?.variant || 'Elevada')
  const [size, setSize] = useState<CardSize>(initialConfig?.size || 'Large')
  const [state, setState] = useState<CardState>(initialConfig?.state || 'Default')
  const [icon, setIcon] = useState<CardIconOption>(initialConfig?.icon || 'Com ícone')
  const [footer, setFooter] = useState<CardFooterOption>(initialConfig?.footer || 'Com ações')
  const [title, setTitle] = useState<string>(initialConfig?.title ?? DEFAULT_TITLE)
  const [content, setContent] = useState<string>(initialConfig?.content ?? DEFAULT_CONTENT)
  const [copied, setCopied] = useState(false)

  const config: CardConfig = { variant, size, state, icon, footer, title, content }
  const cssCode = generateCardCss(config)

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
      {/* 06 Card Section Header */}
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-[#004185] text-white flex items-center justify-center font-bold text-base shrink-0 select-none">
          06
        </div>
        <div className="pt-0.5">
          <h2 className="text-2xl sm:text-[28px] font-bold text-[#141414] leading-tight tracking-tight">
            Card (Conteúdo Genérico)
          </h2>
          <p className="text-sm sm:text-[15px] text-[#666666] mt-1 font-normal">
            3 variantes estruturais × 3 tamanhos × 2 estados — container de conteúdo com header
            (título + ícone opcional), corpo e footer opcional com ações
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
            Alterne entre variantes de elevação, tamanhos, presença de ícone e ações no rodapé.
            Edite o título e o conteúdo para validar a acomodação textual.
          </p>
        </div>

        {/* Controls: VARIANTE, TAMANHO, ESTADO, ÍCONE, AÇÕES — flex-wrap por grupo */}
        <div className="mt-6 flex flex-wrap items-start gap-x-8 gap-y-4">
          {/* VARIANTE */}
          <PlaygroundControlGroup label="VARIANTE">
            {CARD_VARIANTS.map((v) => {
              const isSelected = variant === v
              const labels: Record<CardVariant, string> = {
                Elevada: 'Elevada (Sombra)',
                Borda: 'Borda (Outline)',
                Simples: 'Simples (Neutro)',
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

          {/* TAMANHO */}
          <PlaygroundControlGroup label="TAMANHO">
            {CARD_SIZES.map((s) => {
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

          {/* ESTADO */}
          <PlaygroundControlGroup label="ESTADO">
            {CARD_STATES.map((st) => {
              const isSelected = state === st
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
                  {st}
                </button>
              )
            })}
          </PlaygroundControlGroup>

          {/* ÍCONE */}
          <PlaygroundControlGroup label="ÍCONE NO HEADER">
            {CARD_ICONS.map((ic) => {
              const isSelected = icon === ic
              return (
                <button
                  key={ic}
                  type="button"
                  onClick={() => setIcon(ic)}
                  className={`h-8 px-3.5 rounded-md text-xs font-semibold transition-all select-none shrink-0 ${
                    isSelected
                      ? 'bg-[#004185] text-white shadow-xs'
                      : 'bg-[#F0F2F5] text-[#222222] hover:bg-[#E4E7EC]'
                  }`}
                >
                  {ic}
                </button>
              )
            })}
          </PlaygroundControlGroup>

          {/* FOOTER / AÇÕES */}
          <PlaygroundControlGroup label="RODAPÉ (AÇÕES)">
            {CARD_FOOTERS.map((ft) => {
              const isSelected = footer === ft
              return (
                <button
                  key={ft}
                  type="button"
                  onClick={() => setFooter(ft)}
                  className={`h-8 px-3.5 rounded-md text-xs font-semibold transition-all select-none shrink-0 ${
                    isSelected
                      ? 'bg-[#004185] text-white shadow-xs'
                      : 'bg-[#F0F2F5] text-[#222222] hover:bg-[#E4E7EC]'
                  }`}
                >
                  {ft}
                </button>
              )
            })}
          </PlaygroundControlGroup>
        </div>

        {/* Inputs de TÍTULO e CONTEÚDO em tempo real */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="card-playground-title"
              className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-1.5 block select-none"
            >
              TÍTULO DO CARD
            </label>
            <input
              id="card-playground-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título do card"
              maxLength={80}
              className="w-full h-8 px-3 rounded-md border border-[#D5DCE5] bg-white text-xs font-semibold text-[#141414] outline-none focus:border-[#004185] focus:ring-1 focus:ring-[#004185] transition-colors placeholder:font-normal placeholder:text-[#9CA3AF]"
            />
          </div>

          <div>
            <label
              htmlFor="card-playground-content"
              className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-1.5 block select-none"
            >
              CONTEÚDO DO CARD
            </label>
            <input
              id="card-playground-content"
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Digite o conteúdo do card"
              maxLength={180}
              className="w-full h-8 px-3 rounded-md border border-[#D5DCE5] bg-white text-xs font-medium text-[#141414] outline-none focus:border-[#004185] focus:ring-1 focus:ring-[#004185] transition-colors placeholder:font-normal placeholder:text-[#9CA3AF]"
            />
          </div>
        </div>

        {/* Live Preview Container */}
        <div className="mt-6 rounded-2xl bg-[#F5F7FA] p-6 sm:p-8 border border-[#EBEBEB]">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            {/* Card Preview */}
            <div className="flex-1 w-full max-w-xl py-1">
              <SingleCardPreview config={config} />
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
      <CardStateGallery currentTitle={title} currentContent={content} />
    </div>
  )
}

/** Render preview of a single Card */
export function SingleCardPreview({
  config,
  className = '',
}: {
  config: CardConfig
  className?: string
}) {
  const { variant, size, state, icon, footer, title, content } = config
  const metrics = CARD_SIZE_METRICS[size] || CARD_SIZE_METRICS.Large
  const isHighlight = state === 'Destaque'

  let bgColor = '#FFFFFF'
  let borderColor = 'transparent'
  let borderWidth = '0px'
  let boxShadow = 'none'

  if (variant === 'Elevada') {
    bgColor = '#FFFFFF'
    if (isHighlight) {
      borderColor = '#004185'
      borderWidth = '1.5px'
      boxShadow = '0 10px 25px -5px rgba(0, 65, 133, 0.18), 0 8px 10px -6px rgba(0, 65, 133, 0.12)'
    } else {
      borderColor = '#EBEBEB'
      borderWidth = '1px'
      boxShadow = '0 8px 20px -4px rgba(6, 36, 70, 0.08), 0 4px 6px -2px rgba(6, 36, 70, 0.04)'
    }
  } else if (variant === 'Borda') {
    bgColor = '#FFFFFF'
    if (isHighlight) {
      borderColor = '#004185'
      borderWidth = '2px'
      boxShadow = '0 0 0 1px #004185'
    } else {
      borderColor = '#D5DCE5'
      borderWidth = '1px'
      boxShadow = 'none'
    }
  } else if (variant === 'Simples') {
    bgColor = '#F5F7FA'
    if (isHighlight) {
      borderColor = '#004185'
      borderWidth = '1.5px'
      boxShadow = '0 0 0 1px #004185'
    } else {
      borderColor = '#E2E6EB'
      borderWidth = '1px'
      boxShadow = 'none'
    }
  }

  return (
    <div
      role="region"
      aria-label={title || 'Card de conteúdo'}
      className={`w-full transition-all duration-200 select-text flex flex-col ${className}`}
      style={{
        backgroundColor: bgColor,
        border: borderWidth !== '0px' ? `${borderWidth} solid ${borderColor}` : 'none',
        borderRadius: `${metrics.radius}px`,
        padding: metrics.padding,
        boxShadow,
        gap: `${metrics.gap}px`,
      }}
    >
      {/* Header */}
      {(title || icon === 'Com ícone') && (
        <div className="flex items-center gap-2.5">
          {icon === 'Com ícone' && (
            <span
              className="material-symbols-rounded shrink-0 select-none text-[#004185]"
              style={{ fontSize: `${metrics.iconSize}px`, lineHeight: 1 }}
              aria-hidden="true"
            >
              folder_open
            </span>
          )}
          {title && (
            <h4
              className="font-bold tracking-tight text-[#141414] m-0"
              style={{
                fontSize: `${metrics.titleFontSize}px`,
                lineHeight: metrics.titleLineHeight,
              }}
            >
              {title}
            </h4>
          )}
        </div>
      )}

      {/* Body */}
      {content && (
        <p
          className="font-normal text-[#525252] m-0"
          style={{
            fontSize: `${metrics.contentFontSize}px`,
            lineHeight: metrics.contentLineHeight,
          }}
        >
          {content}
        </p>
      )}

      {/* Footer */}
      {footer === 'Com ações' && (
        <div className="flex items-center justify-end gap-2.5 pt-3 mt-1 border-t border-[#F0F2F5]">
          <button
            type="button"
            className="rounded-md font-bold text-[#004185] bg-transparent hover:bg-[#004185]/5 transition-colors"
            style={{
              padding: metrics.buttonPadding,
              fontSize: `${metrics.buttonFontSize}px`,
            }}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="rounded-md font-bold text-white bg-[#004185] hover:bg-[#00346A] transition-colors shadow-2xs"
            style={{
              padding: metrics.buttonPadding,
              fontSize: `${metrics.buttonFontSize}px`,
            }}
          >
            Confirmar
          </button>
        </div>
      )}
    </div>
  )
}

/** Complete variation matrix for Card over #062446 navy background without internal scroll */
function CardStateGallery({
  currentTitle,
  currentContent,
}: {
  currentTitle: string
  currentContent: string
}) {
  const blocks: Array<{
    variant: CardVariant
    badge: string
    description: string
  }> = [
    {
      variant: 'Elevada',
      badge: '1. Variante Elevada (Sombra suave)',
      description:
        'Apropriada para destacar blocos principais em fundos neutros com sensação tátil de profundidade.',
    },
    {
      variant: 'Borda',
      badge: '2. Variante com Borda (Outline)',
      description:
        'Delimitação nítida com borda neutra; ganha contorno azul COMVEN #004185 no estado Destaque.',
    },
    {
      variant: 'Simples',
      badge: '3. Variante Simples (Fundo Neutro #F5F7FA)',
      description:
        'Card discreto com preenchimento cinza claro para agrupamentos secundários e formulários.',
    },
  ]

  return (
    <div className="mt-10 pt-8 border-t border-[#F0F2F5]">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-[#141414]">
          Matriz completa de variações — (3 variantes × 3 tamanhos × 2 estados × com/sem ações)
        </h3>
        <p className="text-xs sm:text-sm text-[#7A7A7A] mt-1 font-normal">
          Visualização sobre o fundo azul-marinho oficial COMVEN (#062446), cobrindo Large, Medium e
          Small sem barras internas de scroll.
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
                  3 tamanhos × 2 estados · Elevada / Borda / Simples
                </span>
              </div>
              <p className="text-xs text-[#D2E4F7] mt-1 font-normal">{b.description}</p>
            </div>

            <div className="divide-y divide-[#113C68]/40">
              {CARD_STATES.map((st) => (
                <div key={st} className="py-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#F2CB05] tracking-wide uppercase">
                      Estado: {st}
                    </span>
                    <div className="flex-1 h-px bg-[#113C68]/60" />
                  </div>

                  {/* Com ações */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8BB7E7]/80">
                      • Com ações no rodapé + ícone
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                      {CARD_SIZES.map((sz) => (
                        <SingleCardPreview
                          key={`${b.variant}-${st}-${sz}-com-acoes`}
                          config={{
                            variant: b.variant,
                            size: sz,
                            state: st,
                            icon: 'Com ícone',
                            footer: 'Com ações',
                            title: currentTitle || DEFAULT_TITLE,
                            content: currentContent || DEFAULT_CONTENT,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Sem ações */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8BB7E7]/80">
                      • Sem ações no rodapé
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                      {CARD_SIZES.map((sz) => (
                        <SingleCardPreview
                          key={`${b.variant}-${st}-${sz}-sem-acoes`}
                          config={{
                            variant: b.variant,
                            size: sz,
                            state: st,
                            icon: 'Com ícone',
                            footer: 'Sem ações',
                            title: currentTitle || DEFAULT_TITLE,
                            content: currentContent || DEFAULT_CONTENT,
                          }}
                        />
                      ))}
                    </div>
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
