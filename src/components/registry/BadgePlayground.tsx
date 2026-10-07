import React, { useState } from 'react'
import {
  BadgeConfig,
  BadgeVariant,
  BadgeSize,
  BadgeState,
  BadgeIconOption,
  generateBadgeCss,
  BADGE_SIZE_METRICS,
} from './types'
import { PlaygroundControlGroup } from './PlaygroundControlGroup'
import { useToast } from '@/hooks/use-toast'

export interface BadgePlaygroundProps {
  initialConfig?: Partial<BadgeConfig>
}

const BADGE_VARIANTS: BadgeVariant[] = [
  'Primary',
  'Secondary',
  'Success',
  'Warning',
  'Error',
  'Neutral',
]

const BADGE_SIZES: BadgeSize[] = ['Large', 'Medium', 'Small', 'XSmall']
const BADGE_STATES: BadgeState[] = ['Default', 'Hover', 'Disabled']
const BADGE_ICONS: BadgeIconOption[] = ['Com ícone', 'Sem ícone']

const VARIANT_ICON_MAP: Record<BadgeVariant, string> = {
  Primary: 'bookmark',
  Secondary: 'sell',
  Success: 'check_circle',
  Warning: 'warning',
  Error: 'error',
  Neutral: 'info',
}

const VARIANT_DEFAULT_TEXT: Record<BadgeVariant, string> = {
  Primary: 'COMVEN',
  Secondary: 'Tag',
  Success: 'Aprovado',
  Warning: 'Atenção',
  Error: 'Crítico',
  Neutral: 'Novo',
}

export const BadgePlayground: React.FC<BadgePlaygroundProps> = ({ initialConfig }) => {
  const { toast } = useToast()

  const [variant, setVariant] = useState<BadgeVariant>(initialConfig?.variant || 'Primary')
  const [size, setSize] = useState<BadgeSize>(initialConfig?.size || 'Large')
  const [state, setState] = useState<BadgeState>(initialConfig?.state || 'Default')
  const [icon, setIcon] = useState<BadgeIconOption>(initialConfig?.icon || 'Com ícone')
  const [text, setText] = useState<string>(initialConfig?.text ?? 'Novo')
  const [copied, setCopied] = useState(false)

  const config: BadgeConfig = { variant, size, state, icon, text }
  const cssCode = generateBadgeCss(config)

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
      {/* 04 Badge Section Header */}
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-[#004185] text-white flex items-center justify-center font-bold text-base shrink-0 select-none">
          04
        </div>
        <div className="pt-0.5">
          <h2 className="text-2xl sm:text-[28px] font-bold text-[#141414] leading-tight tracking-tight">
            Badge (Status & Alertas)
          </h2>
          <p className="text-sm sm:text-[15px] text-[#666666] mt-1 font-normal">
            6 variantes × 4 tamanhos × 3 estados — explorando a escala oficial de cores, incluindo o
            amarelo de alerta COMVEN, com ícone e texto configuráveis
          </p>
        </div>
      </div>

      {/* Regra de Uso do Amarelo COMVEN */}
      <div className="mt-5 p-4 rounded-xl bg-[#FEFAE6] border border-[#F7E069] flex items-start gap-3">
        <span
          className="material-symbols-rounded text-[#917A03] shrink-0 mt-0.5"
          style={{ fontSize: '20px' }}
          aria-hidden="true"
        >
          lightbulb
        </span>
        <div className="text-xs sm:text-[13px] text-[#615102] leading-relaxed">
          <strong className="font-bold text-[#302901]">
            Diretriz de uso do amarelo (#F2CB05):
          </strong>{' '}
          O amarelo da marca COMVEN não é de uso restrito ao logotipo — ele pode ser utilizado
          estrategicamente em <strong>badges, tags e notificações de alerta</strong>. No entanto,{' '}
          <em>nunca deve ser aplicado como cor de fundo ou elemento principal de uma interface</em>.
        </div>
      </div>

      {/* Playground Section */}
      <div className="mt-8 pt-6 border-t border-[#F0F2F5]">
        {/* Playground header */}
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#141414]">
            Playground — exemplos com ícone + texto
          </h3>
          <p className="text-xs sm:text-sm text-[#7A7A7A] mt-1 font-normal">
            Clique em qualquer opção de Variante, Tamanho ou Estado abaixo para trocar a variante do
            badge em tempo real. Digite no campo de texto para ver a alteração imediata no preview.
          </p>
        </div>

        {/* Controls: VARIANTE, TAMANHO, ESTADO, ÍCONE, TEXTO — flex-wrap por grupo indivisível */}
        <div className="mt-6 flex flex-wrap items-start gap-x-8 gap-y-4">
          {/* VARIANTE */}
          <PlaygroundControlGroup label="VARIANTE">
            {BADGE_VARIANTS.map((v) => {
              const isSelected = variant === v
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
                  {v}
                </button>
              )
            })}
          </PlaygroundControlGroup>

          {/* TAMANHO */}
          <PlaygroundControlGroup label="TAMANHO">
            {BADGE_SIZES.map((s) => {
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
            {BADGE_STATES.map((st) => {
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
          <PlaygroundControlGroup label="ÍCONE">
            {BADGE_ICONS.map((ic) => {
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

          {/* TEXTO (campo de edição de texto ao vivo) */}
          <div className="flex-1 min-w-[200px]">
            <label
              htmlFor="badge-playground-text"
              className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-1.5 block select-none"
            >
              TEXTO
            </label>
            <input
              id="badge-playground-text"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Digite o texto do badge"
              maxLength={30}
              className="w-full h-8 px-3 rounded-md border border-[#D5DCE5] bg-white text-xs font-semibold text-[#141414] outline-none focus:border-[#004185] focus:ring-1 focus:ring-[#004185] transition-colors placeholder:font-normal placeholder:text-[#9CA3AF]"
            />
          </div>
        </div>

        {/* Live Preview Container (Soft blue-gray box) */}
        <div className="mt-6 rounded-2xl bg-[#F5F7FA] p-6 sm:p-8 border border-[#EBEBEB]">
          {/* Top row: Badge Preview at left, Figma Link at right */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            {/* Left: Badge Preview */}
            <div className="flex items-center min-h-[48px] py-1">
              <SingleBadgePreview config={config} />
            </div>

            {/* Right: Figma link with developer exclusive caption */}
            <div className="text-left sm:text-right">
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

          {/* ATRIBUTOS CSS Panel below */}
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

            {/* Light Code Box matching screenshot */}
            <div className="bg-white rounded-xl border border-[#E2E6EB] p-5 sm:p-6 shadow-2xs">
              <pre className="text-xs sm:text-[13px] font-mono leading-relaxed text-[#1F2328] m-0 whitespace-pre-wrap break-words selection:bg-[#D2E4F7]">
                <code>{cssCode}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Matriz Completa de Variações — Fundo azul-marinho oficial #062446 sem scrollbar */}
      <BadgeStateGallery currentText={text} />
    </div>
  )
}

/** Resolves visual styles for Badge in light preview container */
function getBadgePreviewStyle(
  variant: BadgeVariant,
  state: BadgeState,
): {
  backgroundColor: string
  color: string
  border?: string
  boxShadow?: string
  cursor: string
  opacity?: number
} {
  const isHover = state === 'Hover'
  const isDisabled = state === 'Disabled'

  if (variant === 'Primary') {
    if (isDisabled) {
      return {
        backgroundColor: '#8BB7E7',
        color: '#FFFFFF',
        cursor: 'not-allowed',
      }
    }
    if (isHover) {
      return {
        backgroundColor: '#00346A',
        color: '#FFFFFF',
        cursor: 'pointer',
      }
    }
    return {
      backgroundColor: '#004185',
      color: '#FFFFFF',
      cursor: 'default',
    }
  }

  if (variant === 'Secondary') {
    if (isDisabled) {
      return {
        backgroundColor: 'transparent',
        border: '1.5px solid #8BB7E7',
        color: '#8BB7E7',
        cursor: 'not-allowed',
      }
    }
    if (isHover) {
      return {
        backgroundColor: 'rgba(0, 65, 133, 0.08)',
        border: '1.5px solid #00346A',
        color: '#00346A',
        cursor: 'pointer',
      }
    }
    return {
      backgroundColor: 'transparent',
      border: '1.5px solid #004185',
      color: '#004185',
      cursor: 'default',
    }
  }

  if (variant === 'Success') {
    if (isDisabled) {
      return {
        backgroundColor: '#F0FBF4',
        border: '1px solid #CDF6DB',
        color: '#6AE394',
        cursor: 'not-allowed',
      }
    }
    if (isHover) {
      return {
        backgroundColor: '#CDF6DB',
        border: '1px solid #6AE394',
        color: '#02531F',
        cursor: 'pointer',
      }
    }
    return {
      backgroundColor: '#E6FAED',
      border: '1px solid #9BECB8',
      color: '#047D2E',
      cursor: 'default',
    }
  }

  if (variant === 'Warning') {
    if (isDisabled) {
      return {
        backgroundColor: '#FEFDF5',
        border: '1px solid #FCF5CD',
        color: '#C2A204',
        cursor: 'not-allowed',
      }
    }
    if (isHover) {
      return {
        backgroundColor: '#FDF3BA',
        border: '1px solid #F2CB05',
        color: '#615102',
        boxShadow: '0 0 0 1px #F2CB05',
        cursor: 'pointer',
      }
    }
    return {
      backgroundColor: '#FEFAE6',
      border: '1px solid #F7E069',
      color: '#917A03',
      cursor: 'default',
    }
  }

  if (variant === 'Error') {
    if (isDisabled) {
      return {
        backgroundColor: '#FFF2F2',
        border: '1px solid #FFCCCC',
        color: '#FF9999',
        cursor: 'not-allowed',
      }
    }
    if (isHover) {
      return {
        backgroundColor: '#FFCCCC',
        border: '1px solid #FF6666',
        color: '#990000',
        cursor: 'pointer',
      }
    }
    return {
      backgroundColor: '#FFE5E5',
      border: '1px solid #FF9999',
      color: '#CC0000',
      cursor: 'default',
    }
  }

  // Neutral
  if (isDisabled) {
    return {
      backgroundColor: '#FAFAFA',
      border: '1px solid #EBEBEB',
      color: '#A1A1A1',
      cursor: 'not-allowed',
    }
  }
  if (isHover) {
    return {
      backgroundColor: '#EBEBEB',
      border: '1px solid #BFBFBF',
      color: '#141414',
      cursor: 'pointer',
    }
  }
  return {
    backgroundColor: '#F5F7FA',
    border: '1px solid #DCDCDC',
    color: '#3D3D3D',
    cursor: 'default',
  }
}

/** Single Badge rendered in live preview */
function SingleBadgePreview({ config }: { config: BadgeConfig }) {
  const { variant, size, state, icon, text } = config
  const metrics = BADGE_SIZE_METRICS[size]
  const style = getBadgePreviewStyle(variant, state)
  const iconName = VARIANT_ICON_MAP[variant]
  const displayText = text || 'Badge'

  return (
    <div
      className="inline-flex items-center justify-center font-semibold transition-all select-none"
      style={{
        height: `${metrics.height}px`,
        padding: `0 ${metrics.paddingX}px`,
        gap: `${metrics.gap}px`,
        fontSize: `${metrics.fontSize}px`,
        borderRadius: '9999px',
        backgroundColor: style.backgroundColor,
        color: style.color,
        border: style.border || 'none',
        boxShadow: style.boxShadow,
        cursor: style.cursor,
        lineHeight: 1,
      }}
    >
      {icon === 'Com ícone' && (
        <span
          className="material-symbols-rounded shrink-0"
          style={{
            fontSize: `${metrics.iconSize}px`,
            lineHeight: 1,
            color: 'inherit',
          }}
          aria-hidden="true"
        >
          {iconName}
        </span>
      )}
      <span style={{ color: 'inherit' }}>{displayText}</span>
    </div>
  )
}

/* ==========================================================================
   DARK MATRIX GALLERY (sobre o fundo oficial #062446)
   ========================================================================== */

interface VariantBlockInfo {
  variant: BadgeVariant
  badge: string
  description: string
  iconName: string
}

const VARIANT_BLOCKS: VariantBlockInfo[] = [
  {
    variant: 'Primary',
    badge: '1. Primary (Fundo Azul-Marinho COMVEN #004185)',
    description:
      'Destaque principal e status corporativo; hover #00346A, disabled com tom pálido da escala #8BB7E7.',
    iconName: 'bookmark',
  },
  {
    variant: 'Secondary',
    badge: '2. Secondary / Outline (Borda Azul COMVEN #004185)',
    description:
      'Tags, categorização e filtros com leitura suave sobre superfícies claras e escuras.',
    iconName: 'sell',
  },
  {
    variant: 'Success',
    badge: '3. Success (Escala Verde #06D04D)',
    description: 'Confirmações, status positivos, etapas concluídas e itens validados no sistema.',
    iconName: 'check_circle',
  },
  {
    variant: 'Warning',
    badge: '4. Warning (Amarelo COMVEN #F2CB05 — Alertas e Notificações)',
    description:
      'Avisos de atenção, prazos próximos e pendências; uso permitido em badges e alertas.',
    iconName: 'warning',
  },
  {
    variant: 'Error',
    badge: '5. Error / Crítico (Escala Vermelha #FF0000)',
    description:
      'Erros graves, inconformidades, falhas de validação e bloqueios que exigem intervenção.',
    iconName: 'error',
  },
  {
    variant: 'Neutral',
    badge: '6. Neutral (Cinzas da Escala)',
    description:
      'Status em espera, contadores gerais, rascunhos e informações auxiliares de baixo peso visual.',
    iconName: 'info',
  },
]

const BADGE_STATE_LABELS: Record<BadgeState, string> = {
  Default: 'Linha 1 — Default (Estado Inicial)',
  Hover: 'Linha 2 — Hover (Interativo / Clicável)',
  Disabled: 'Linha 3 — Disabled (Desabilitado / Inativo)',
}

/** Resolves visual styles when rendering over #062446 dark navy background */
function getDarkBadgeStyle(
  variant: BadgeVariant,
  state: BadgeState,
): {
  backgroundColor: string
  color: string
  border?: string
  boxShadow?: string
} {
  const isHover = state === 'Hover'
  const isDisabled = state === 'Disabled'

  if (variant === 'Primary') {
    if (isDisabled) {
      return {
        backgroundColor: '#1E3A5F',
        border: '1px solid #365B88',
        color: '#8BB7E7',
      }
    }
    if (isHover) {
      return {
        backgroundColor: '#0059B3',
        color: '#FFFFFF',
        boxShadow: '0 0 0 1px #8BB7E7',
      }
    }
    return {
      backgroundColor: '#004185',
      border: '1px solid #235F9D',
      color: '#FFFFFF',
    }
  }

  if (variant === 'Secondary') {
    if (isDisabled) {
      return {
        backgroundColor: 'transparent',
        border: '1.5px solid #365B88',
        color: '#689ACE',
      }
    }
    if (isHover) {
      return {
        backgroundColor: 'rgba(139, 183, 231, 0.15)',
        border: '1.5px solid #FFFFFF',
        color: '#FFFFFF',
      }
    }
    return {
      backgroundColor: 'transparent',
      border: '1.5px solid #8BB7E7',
      color: '#8BB7E7',
    }
  }

  if (variant === 'Success') {
    if (isDisabled) {
      return {
        backgroundColor: 'rgba(6, 208, 77, 0.08)',
        border: '1px solid rgba(6, 208, 77, 0.25)',
        color: '#6AE394',
      }
    }
    if (isHover) {
      return {
        backgroundColor: 'rgba(6, 208, 77, 0.28)',
        border: '1px solid #06D04D',
        color: '#FFFFFF',
        boxShadow: '0 0 0 1px #06D04D',
      }
    }
    return {
      backgroundColor: 'rgba(6, 208, 77, 0.16)',
      border: '1px solid #38D971',
      color: '#9BECB8',
    }
  }

  if (variant === 'Warning') {
    if (isDisabled) {
      return {
        backgroundColor: 'rgba(242, 203, 5, 0.08)',
        border: '1px solid rgba(242, 203, 5, 0.25)',
        color: '#F7E069',
      }
    }
    if (isHover) {
      return {
        backgroundColor: 'rgba(242, 203, 5, 0.3)',
        border: '1px solid #F2CB05',
        color: '#FFFFFF',
        boxShadow: '0 0 0 1px #F2CB05',
      }
    }
    return {
      backgroundColor: 'rgba(242, 203, 5, 0.18)',
      border: '1px solid #F2CB05',
      color: '#F2CB05',
    }
  }

  if (variant === 'Error') {
    if (isDisabled) {
      return {
        backgroundColor: 'rgba(255, 0, 0, 0.08)',
        border: '1px solid rgba(255, 0, 0, 0.25)',
        color: '#FF9999',
      }
    }
    if (isHover) {
      return {
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
        border: '1px solid #FF3333',
        color: '#FFFFFF',
        boxShadow: '0 0 0 1px #FF6666',
      }
    }
    return {
      backgroundColor: 'rgba(255, 0, 0, 0.18)',
      border: '1px solid #FF6666',
      color: '#FFCCCC',
    }
  }

  // Neutral on dark
  if (isDisabled) {
    return {
      backgroundColor: 'rgba(255, 255, 255, 0.04)',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      color: '#848484',
    }
  }
  if (isHover) {
    return {
      backgroundColor: 'rgba(255, 255, 255, 0.18)',
      border: '1px solid rgba(255, 255, 255, 0.4)',
      color: '#FFFFFF',
    }
  }
  return {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: '#EBEBEB',
  }
}

/** Individual badge cell in dark gallery */
function DarkBadgeCell({
  variant,
  size,
  state,
  icon,
  label,
  iconName,
}: {
  variant: BadgeVariant
  size: BadgeSize
  state: BadgeState
  icon: BadgeIconOption
  label: string
  iconName: string
}) {
  const metrics = BADGE_SIZE_METRICS[size]
  const style = getDarkBadgeStyle(variant, state)

  return (
    <div className="flex items-center min-h-[36px]">
      <div
        className="inline-flex items-center justify-center font-semibold select-none transition-all"
        style={{
          height: `${metrics.height}px`,
          padding: `0 ${metrics.paddingX}px`,
          gap: `${metrics.gap}px`,
          fontSize: `${metrics.fontSize}px`,
          borderRadius: '9999px',
          backgroundColor: style.backgroundColor,
          color: style.color,
          border: style.border || 'none',
          boxShadow: style.boxShadow,
          lineHeight: 1,
        }}
      >
        {icon === 'Com ícone' && (
          <span
            className="material-symbols-rounded shrink-0"
            style={{
              fontSize: `${metrics.iconSize}px`,
              lineHeight: 1,
              color: 'inherit',
            }}
            aria-hidden="true"
          >
            {iconName}
          </span>
        )}
        <span style={{ color: 'inherit' }}>{label}</span>
      </div>
    </div>
  )
}

/** Complete variation matrix for Badge over #062446 navy background without internal scroll */
function BadgeStateGallery({ currentText }: { currentText: string }) {
  return (
    <div className="mt-10 pt-8 border-t border-[#F0F2F5]">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-[#141414]">
          Matriz completa de variações — (6 variantes × 3 estados × 4 tamanhos × com/sem ícone)
        </h3>
        <p className="text-xs sm:text-sm text-[#7A7A7A] mt-1 font-normal">
          Visualização completa sobre o fundo azul-marinho oficial COMVEN (#062446), dividida em
          blocos por variante, cobrindo Large, Medium, Small e XSmall sem barras internas de scroll.
        </p>
      </div>

      <div className="mt-5 space-y-6">
        {VARIANT_BLOCKS.map((block) => {
          const defaultLabel = currentText || VARIANT_DEFAULT_TEXT[block.variant]

          return (
            <div
              key={block.variant}
              className="rounded-2xl border border-[#0d3663] bg-[#062446] shadow-md p-6 sm:p-8"
            >
              {/* Block Header */}
              <div className="pb-4 border-b border-[#113C68]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm sm:text-base font-bold text-[#F2CB05] tracking-wide uppercase">
                    {block.badge}
                  </span>
                  <span className="text-xs text-[#8BB7E7] font-medium">
                    4 tamanhos × 3 estados × com/sem ícone
                  </span>
                </div>
                <p className="text-xs text-[#D2E4F7] mt-1 font-normal">{block.description}</p>
              </div>

              {/* Column Headers: 4 sizes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 pb-2 border-b border-[#113C68]/60 text-[11px] font-bold uppercase tracking-wider text-[#8BB7E7]">
                <div>Large (32px)</div>
                <div>Medium (28px)</div>
                <div>Small (24px)</div>
                <div>XSmall (20px)</div>
              </div>

              {/* Rows by State */}
              <div className="divide-y divide-[#113C68]/40">
                {BADGE_STATES.map((st) => (
                  <div key={st} className="py-5 space-y-3">
                    {/* State badge */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#F2CB05] tracking-wide uppercase">
                        {BADGE_STATE_LABELS[st]}
                      </span>
                      <div className="flex-1 h-px bg-[#113C68]/60" />
                    </div>

                    {/* Sub-row: COM ÍCONE */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8BB7E7]/80">
                        • Com ícone
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
                        {BADGE_SIZES.map((sz) => (
                          <DarkBadgeCell
                            key={`${block.variant}-${st}-${sz}-com-icone`}
                            variant={block.variant}
                            size={sz}
                            state={st}
                            icon="Com ícone"
                            label={defaultLabel}
                            iconName={block.iconName}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Sub-row: SEM ÍCONE */}
                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8BB7E7]/80">
                        • Sem ícone
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
                        {BADGE_SIZES.map((sz) => (
                          <DarkBadgeCell
                            key={`${block.variant}-${st}-${sz}-sem-icone`}
                            variant={block.variant}
                            size={sz}
                            state={st}
                            icon="Sem ícone"
                            label={defaultLabel}
                            iconName={block.iconName}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
