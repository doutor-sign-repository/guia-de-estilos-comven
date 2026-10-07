import React, { useState } from 'react'
import {
  TagConfig,
  TagVariant,
  TagSize,
  TagState,
  TagRemovableOption,
  generateTagCss,
  TAG_SIZE_METRICS,
  TAG_COLOR_TOKENS,
} from './types'
import { PlaygroundControlGroup } from './PlaygroundControlGroup'
import { useToast } from '@/hooks/use-toast'

export interface TagPlaygroundProps {
  initialConfig?: Partial<TagConfig>
}

const TAG_VARIANTS: TagVariant[] = [
  'Primary',
  'Secondary',
  'Success',
  'Warning',
  'Error',
  'Neutral',
]
const TAG_SIZES: TagSize[] = ['Large', 'Medium', 'Small']
const TAG_STATES: TagState[] = ['Default', 'Hover', 'Disabled']
const TAG_REMOVABLE_OPTIONS: TagRemovableOption[] = ['Com remover', 'Sem remover']

const DEFAULT_TAG_TEXT = 'Categoria'

export const TagPlayground: React.FC<TagPlaygroundProps> = ({ initialConfig }) => {
  const { toast } = useToast()

  const [variant, setVariant] = useState<TagVariant>(initialConfig?.variant || 'Primary')
  const [size, setSize] = useState<TagSize>(initialConfig?.size || 'Medium')
  const [state, setState] = useState<TagState>(initialConfig?.state || 'Default')
  const [removable, setRemovable] = useState<TagRemovableOption>(
    initialConfig?.removable || 'Com remover',
  )
  const [text, setText] = useState<string>(initialConfig?.text ?? DEFAULT_TAG_TEXT)
  const [copied, setCopied] = useState(false)

  const config: TagConfig = { variant, size, state, removable, text }
  const cssCode = generateTagCss(config)

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
      {/* Tag Section Header */}
      <div className="flex items-start gap-4">
        <div className="pt-0.5">
          <h2 className="text-2xl sm:text-[28px] font-bold text-[#141414] leading-tight tracking-tight">
            Tag (Categorização & Taxonomia)
          </h2>
          <p className="text-sm sm:text-[15px] text-[#666666] mt-1 font-normal">
            6 variantes na escala COMVEN (incluindo o amarelo #F2CB05) × 3 tamanhos × 3 estados —
            etiqueta compacta com botão de remoção opcional para filtros e taxonomia
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
            Selecione a variante de cor, o tamanho e o estado interativo (Default, Hover, Disabled).
            Ative ou desative o botão &quot;x&quot; de remoção e edite o texto da tag.
          </p>
        </div>

        {/* Controls */}
        <div className="mt-6 flex flex-wrap items-start gap-x-8 gap-y-4">
          {/* VARIANTE */}
          <PlaygroundControlGroup label="VARIANTE DE COR">
            {TAG_VARIANTS.map((v) => {
              const isSelected = variant === v
              const labels: Record<TagVariant, string> = {
                Primary: 'Primária (Azul #004185)',
                Secondary: 'Secundária (Outline)',
                Success: 'Sucesso (Verde)',
                Warning: 'Alerta (Amarelo #F2CB05)',
                Error: 'Erro (Vermelho)',
                Neutral: 'Neutra (Cinza)',
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
            {TAG_SIZES.map((s) => {
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
            {TAG_STATES.map((st) => {
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

          {/* REMOÇÃO */}
          <PlaygroundControlGroup label="ÍCONE / REMOÇÃO">
            {TAG_REMOVABLE_OPTIONS.map((rm) => {
              const isSelected = removable === rm
              return (
                <button
                  key={rm}
                  type="button"
                  onClick={() => setRemovable(rm)}
                  className={`h-8 px-3.5 rounded-md text-xs font-semibold transition-all select-none shrink-0 ${
                    isSelected
                      ? 'bg-[#004185] text-white shadow-xs'
                      : 'bg-[#F0F2F5] text-[#222222] hover:bg-[#E4E7EC]'
                  }`}
                >
                  {rm}
                </button>
              )
            })}
          </PlaygroundControlGroup>
        </div>

        {/* Input de TEXTO DA TAG */}
        <div className="mt-4 max-w-md">
          <label
            htmlFor="tag-playground-text"
            className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-1.5 block select-none"
          >
            TEXTO DA TAG
          </label>
          <input
            id="tag-playground-text"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Digite o rótulo da tag"
            maxLength={40}
            className="w-full h-8 px-3 rounded-md border border-[#D5DCE5] bg-white text-xs font-semibold text-[#141414] outline-none focus:border-[#004185] focus:ring-1 focus:ring-[#004185] transition-colors placeholder:font-normal placeholder:text-[#9CA3AF]"
          />
        </div>

        {/* Live Preview Container */}
        <div className="mt-6 rounded-2xl bg-[#F5F7FA] p-6 sm:p-8 border border-[#EBEBEB]">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            {/* Tag Preview */}
            <div className="flex-1 w-full flex items-center min-h-[60px] py-1">
              <SingleTagPreview config={config} />
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
      <TagStateGallery currentText={text} />
    </div>
  )
}

/** Render preview of a single Tag */
export function SingleTagPreview({
  config,
  className = '',
}: {
  config: TagConfig
  className?: string
}) {
  const { variant, size, state, removable, text } = config
  const metrics = TAG_SIZE_METRICS[size] || TAG_SIZE_METRICS.Medium
  const tokens = TAG_COLOR_TOKENS[variant] || TAG_COLOR_TOKENS.Primary

  let bgColor = tokens.bg
  let borderColor = tokens.border
  let textColor = tokens.text
  let cursor = 'default'

  if (state === 'Hover') {
    bgColor = tokens.hoverBg
    borderColor = tokens.hoverBorder
    textColor = tokens.hoverText
    cursor = 'pointer'
  } else if (state === 'Disabled') {
    bgColor = tokens.disabledBg
    borderColor = tokens.disabledBorder
    textColor = tokens.disabledText
    cursor = 'not-allowed'
  }

  const borderRule = borderColor === 'transparent' ? 'none' : `1px solid ${borderColor}`
  const padRight = removable === 'Com remover' ? metrics.paddingXRemovable : metrics.paddingX

  return (
    <span
      role="status"
      className={`inline-flex items-center select-none transition-all duration-150 ${className}`}
      style={{
        height: `${metrics.height}px`,
        paddingLeft: `${metrics.paddingX}px`,
        paddingRight: `${padRight}px`,
        gap: `${metrics.gap}px`,
        borderRadius: `${metrics.radius}px`,
        backgroundColor: bgColor,
        border: borderRule,
        fontFamily: "'Open Sans', sans-serif",
        fontWeight: 600,
        fontSize: `${metrics.fontSize}px`,
        color: textColor,
        cursor,
        whiteSpace: 'nowrap',
      }}
    >
      <span>{text || DEFAULT_TAG_TEXT}</span>
      {removable === 'Com remover' && (
        <button
          type="button"
          tabIndex={state === 'Disabled' ? -1 : 0}
          disabled={state === 'Disabled'}
          aria-label={`Remover tag ${text || DEFAULT_TAG_TEXT}`}
          className="inline-flex items-center justify-center p-0 m-0 bg-transparent border-none rounded-full transition-opacity hover:opacity-80 active:opacity-60"
          style={{
            width: `${metrics.closeSize}px`,
            height: `${metrics.closeSize}px`,
            color: tokens.closeColor,
            cursor: state === 'Disabled' ? 'not-allowed' : 'pointer',
          }}
        >
          <span
            className="material-symbols-rounded"
            style={{ fontSize: `${metrics.closeSize}px`, lineHeight: 1 }}
          >
            close
          </span>
        </button>
      )}
    </span>
  )
}

/** Complete variation matrix for Tag over #062446 navy background without internal scroll */
function TagStateGallery({ currentText }: { currentText: string }) {
  const blocks: Array<{
    variant: TagVariant
    badge: string
    description: string
  }> = [
    {
      variant: 'Primary',
      badge: 'Variante Primária (Azul #004185)',
      description: 'Tag de destaque principal para categorias selecionadas e filtros ativos.',
    },
    {
      variant: 'Secondary',
      badge: 'Variante Secundária (Outline)',
      description: 'Estrutura vazada com borda azul COMVEN #004185 para filtros secundários.',
    },
    {
      variant: 'Success',
      badge: 'Variante Sucesso (Verde)',
      description: 'Status positivo, conformidade de lote e entregas confirmadas.',
    },
    {
      variant: 'Warning',
      badge: 'Variante Alerta (Amarelo #F2CB05)',
      description:
        'Uso legítimo do amarelo COMVEN: permitido para alertas, badges e tags de atenção pontual.',
    },
    {
      variant: 'Error',
      badge: 'Variante Erro (Vermelho)',
      description: 'Pendências impeditivas, bloqueios e falhas de validação.',
    },
    {
      variant: 'Neutral',
      badge: 'Variante Neutra (Cinza)',
      description: 'Etiquetas gerais para metadados, autores, datas e categorias auxiliares.',
    },
  ]

  return (
    <div className="mt-10 pt-8 border-t border-[#F0F2F5]">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-[#141414]">
          Matriz completa de variações — (6 cores × 3 tamanhos × 3 estados × com/sem remover)
        </h3>
        <p className="text-xs sm:text-sm text-[#7A7A7A] mt-1 font-normal">
          Visualização sobre o fundo azul-marinho oficial COMVEN (#062446), cobrindo Large, Medium e
          Small sem barras de scroll.
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
                  3 tamanhos × 3 estados (Default, Hover, Disabled)
                </span>
              </div>
              <p className="text-xs text-[#D2E4F7] mt-1 font-normal">{b.description}</p>
            </div>

            <div className="divide-y divide-[#113C68]/40">
              {TAG_STATES.map((st) => (
                <div key={st} className="py-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#F2CB05] tracking-wide uppercase">
                      Estado: {st}
                    </span>
                    <div className="flex-1 h-px bg-[#113C68]/60" />
                  </div>

                  {/* Com remover */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8BB7E7]/80">
                      • Com botão remover (&times;)
                    </span>
                    <div className="flex flex-wrap items-center gap-6 py-2">
                      {TAG_SIZES.map((sz) => (
                        <div
                          key={`${b.variant}-${st}-${sz}-com-remover`}
                          className="flex items-center gap-2"
                        >
                          <span className="text-[10px] text-[#8BB7E7] font-mono">{sz}:</span>
                          <SingleTagPreview
                            config={{
                              variant: b.variant,
                              size: sz,
                              state: st,
                              removable: 'Com remover',
                              text: currentText || DEFAULT_TAG_TEXT,
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sem remover */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8BB7E7]/80">
                      • Sem botão remover (Apenas texto)
                    </span>
                    <div className="flex flex-wrap items-center gap-6 py-2">
                      {TAG_SIZES.map((sz) => (
                        <div
                          key={`${b.variant}-${st}-${sz}-sem-remover`}
                          className="flex items-center gap-2"
                        >
                          <span className="text-[10px] text-[#8BB7E7] font-mono">{sz}:</span>
                          <SingleTagPreview
                            config={{
                              variant: b.variant,
                              size: sz,
                              state: st,
                              removable: 'Sem remover',
                              text: currentText || DEFAULT_TAG_TEXT,
                            }}
                          />
                        </div>
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
