import React, { useState } from 'react'
import {
  ButtonConfig,
  ButtonType,
  ButtonSize,
  ButtonState,
  ButtonIconOption,
  generateButtonCss,
} from './types'
import { PlaygroundControlGroup } from './PlaygroundControlGroup'
import { useToast } from '@/hooks/use-toast'

export interface ButtonPlaygroundProps {
  initialConfig?: Partial<ButtonConfig>
}

const BUTTON_TYPES: ButtonType[] = ['Primary', 'Secondary', 'Tertiary', 'Link']
const BUTTON_SIZES: ButtonSize[] = ['Large', 'Medium', 'Small']
const BUTTON_STATES: ButtonState[] = ['Default', 'Hover', 'Active/Focus', 'Disabled']
const BUTTON_ICONS: ButtonIconOption[] = ['Com ícone', 'Sem ícone']

export const ButtonPlayground: React.FC<ButtonPlaygroundProps> = ({ initialConfig }) => {
  const { toast } = useToast()

  const [type, setType] = useState<ButtonType>(initialConfig?.type || 'Primary')
  const [size, setSize] = useState<ButtonSize>(initialConfig?.size || 'Large')
  const [state, setState] = useState<ButtonState>(initialConfig?.state || 'Default')
  const [icon, setIcon] = useState<ButtonIconOption>(initialConfig?.icon || 'Com ícone')
  const [label, setLabel] = useState<string>(initialConfig?.label ?? 'Buscar')
  const [copied, setCopied] = useState(false)

  const config: ButtonConfig = { type, size, state, icon, label }
  const cssCode = generateButtonCss(config)

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
      {/* 01 Button Section Header */}
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-[#004185] text-white flex items-center justify-center font-bold text-base shrink-0 select-none">
          01
        </div>
        <div className="pt-0.5">
          <h2 className="text-2xl sm:text-[28px] font-bold text-[#141414] leading-tight tracking-tight">
            Button
          </h2>
          <p className="text-sm sm:text-[15px] text-[#666666] mt-1 font-normal">
            4 tipos × 3 tamanhos × 4 estados — com ícone e texto configuráveis via painel de
            propriedades
          </p>
        </div>
      </div>

      {/* Playground Section */}
      <div className="mt-8 pt-6 border-t border-[#F0F2F5]">
        {/* Playground header */}
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#141414]">
            Playground — exemplos com ícone + label
          </h3>
          <p className="text-xs sm:text-sm text-[#7A7A7A] mt-1 font-normal">
            Clique em qualquer opção de Type, Size ou State abaixo para trocar a variante do botão
            de exemplo em tempo real.
          </p>
        </div>

        {/* Controls: TYPE, SIZE, STATE, ÍCONE — flex-wrap por grupo indivisível */}
        <div className="mt-6 flex flex-wrap items-start gap-x-8 gap-y-4">
          {/* TYPE */}
          <PlaygroundControlGroup label="TYPE">
            {BUTTON_TYPES.map((t) => {
              const isSelected = type === t
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`h-8 px-3.5 rounded-md text-xs font-semibold transition-all select-none shrink-0 ${
                    isSelected
                      ? 'bg-[#004185] text-white shadow-xs'
                      : 'bg-[#F0F2F5] text-[#222222] hover:bg-[#E4E7EC]'
                  }`}
                >
                  {t}
                </button>
              )
            })}
          </PlaygroundControlGroup>

          {/* SIZE */}
          <PlaygroundControlGroup label="SIZE">
            {BUTTON_SIZES.map((s) => {
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

          {/* STATE */}
          <PlaygroundControlGroup label="STATE">
            {BUTTON_STATES.map((st) => {
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
            {BUTTON_ICONS.map((ic) => {
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

          {/* LABEL (campo de edição de texto ao vivo) */}
          <div className="flex-1 min-w-[200px]">
            <label
              htmlFor="button-playground-label"
              className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-1.5 block select-none"
            >
              LABEL
            </label>
            <input
              id="button-playground-label"
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Digite o label do botão"
              maxLength={40}
              className="w-full h-8 px-3 rounded-md border border-[#D5DCE5] bg-white text-xs font-semibold text-[#141414] outline-none focus:border-[#004185] focus:ring-2 focus:ring-[#004185]/15 transition-colors placeholder:font-normal placeholder:text-[#9CA3AF]"
            />
          </div>
        </div>

        {/* Live Preview Container (Soft blue-gray box) */}
        <div className="mt-6 rounded-2xl bg-[#F5F7FA] p-6 sm:p-8 border border-[#EBEBEB]">
          {/* Top row: Button Preview at left, Figma Link at right */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            {/* Left: Button */}
            <div className="flex items-center min-h-[48px]">
              <SingleButtonPreview config={config} />
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
      <ButtonStateGallery label={label} />
    </div>
  )
}

/** Resolves visual sizing tokens for Button */
function getButtonSizeMetrics(size: ButtonSize) {
  if (size === 'Medium') {
    return {
      paddingClass: 'px-4 py-2.5 rounded-[8px]',
      fontSize: 14,
      iconSize: 18,
      height: 40,
    }
  }
  if (size === 'Small') {
    return {
      paddingClass: 'px-3 py-2 rounded-[8px]',
      fontSize: 12,
      iconSize: 16,
      height: 32,
    }
  }
  return {
    paddingClass: 'px-5 py-3 rounded-[8px]',
    fontSize: 16,
    iconSize: 20,
    height: 48,
  }
}

/** Resolves inline style and interactive state for Button in Preview (light background) */
function getButtonPreviewStyle(type: ButtonType, state: ButtonState): React.CSSProperties {
  const isDisabled = state === 'Disabled'

  if (type === 'Primary') {
    if (state === 'Disabled') {
      return {
        backgroundColor: '#8BB7E7',
        color: '#FFFFFF',
        cursor: 'not-allowed',
      }
    }
    if (state === 'Hover') {
      return {
        backgroundColor: '#00346A',
        color: '#FFFFFF',
        cursor: 'pointer',
      }
    }
    if (state === 'Active/Focus') {
      return {
        backgroundColor: '#002750',
        color: '#FFFFFF',
        boxShadow: '0 0 0 3px rgba(0, 65, 133, 0.25)',
        cursor: 'pointer',
      }
    }
    return {
      backgroundColor: '#004185',
      color: '#FFFFFF',
      cursor: 'pointer',
    }
  }

  if (type === 'Secondary') {
    if (state === 'Disabled') {
      return {
        backgroundColor: 'transparent',
        color: '#8BB7E7',
        border: '2px solid #8BB7E7',
        cursor: 'not-allowed',
      }
    }
    if (state === 'Hover') {
      return {
        backgroundColor: '#EBF3FC',
        color: '#00346A',
        border: '2px solid #00346A',
        cursor: 'pointer',
      }
    }
    if (state === 'Active/Focus') {
      return {
        backgroundColor: '#D2E4F7',
        color: '#002750',
        border: '2px solid #002750',
        boxShadow: '0 0 0 3px rgba(0, 65, 133, 0.2)',
        cursor: 'pointer',
      }
    }
    return {
      backgroundColor: 'transparent',
      color: '#004185',
      border: '2px solid #004185',
      cursor: 'pointer',
    }
  }

  if (type === 'Tertiary') {
    if (state === 'Disabled') {
      return {
        backgroundColor: '#F3F4F6',
        color: '#9CA3AF',
        cursor: 'not-allowed',
      }
    }
    if (state === 'Hover') {
      return {
        backgroundColor: '#D2F5DC',
        color: '#004185',
        cursor: 'pointer',
      }
    }
    if (state === 'Active/Focus') {
      return {
        backgroundColor: '#BEEECB',
        color: '#002750',
        boxShadow: '0 0 0 3px rgba(0, 65, 133, 0.15)',
        cursor: 'pointer',
      }
    }
    return {
      backgroundColor: '#E6FAED',
      color: '#004185',
      cursor: 'pointer',
    }
  }

  // Link
  if (state === 'Disabled') {
    return {
      backgroundColor: 'transparent',
      color: '#8BB7E7',
      border: 'none',
      padding: 0,
      cursor: 'not-allowed',
    }
  }
  if (state === 'Hover') {
    return {
      backgroundColor: 'transparent',
      color: '#00346A',
      border: 'none',
      padding: 0,
      textDecoration: 'underline',
      cursor: 'pointer',
    }
  }
  if (state === 'Active/Focus') {
    return {
      backgroundColor: 'transparent',
      color: '#002750',
      border: 'none',
      padding: 0,
      textDecoration: 'underline',
      outline: '2px solid #004185',
      outlineOffset: '2px',
      cursor: 'pointer',
    }
  }
  return {
    backgroundColor: 'transparent',
    color: '#004185',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
  }
}

/** Single Button rendered in the interactive Preview section */
function SingleButtonPreview({ config }: { config: ButtonConfig }) {
  const { type, size, state, icon, label } = config
  const metrics = getButtonSizeMetrics(size)
  const style = getButtonPreviewStyle(type, state)
  const isDisabled = state === 'Disabled'

  return (
    <button
      type="button"
      disabled={isDisabled}
      style={{
        fontFamily: "'Open Sans', sans-serif",
        fontWeight: 700,
        fontSize: `${metrics.fontSize}px`,
        ...style,
      }}
      className={`inline-flex items-center gap-2 font-bold transition-all select-none ${
        type === 'Link' ? 'p-0 bg-transparent border-0' : metrics.paddingClass
      }`}
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
          search
        </span>
      )}
      {label && <span style={{ color: 'inherit' }}>{label}</span>}
    </button>
  )
}

/** Resolves inline styles specifically tuned for high contrast on the dark #062446 navy background */
function getDarkButtonMatrixStyle(type: ButtonType, state: ButtonState): React.CSSProperties {
  if (type === 'Primary') {
    if (state === 'Disabled') {
      return {
        backgroundColor: '#8BB7E7',
        color: '#FFFFFF',
        cursor: 'not-allowed',
        opacity: 0.75,
      }
    }
    if (state === 'Hover') {
      return {
        backgroundColor: '#00346A',
        color: '#FFFFFF',
        cursor: 'pointer',
      }
    }
    if (state === 'Active/Focus') {
      return {
        backgroundColor: '#002750',
        color: '#FFFFFF',
        boxShadow: '0 0 0 3px rgba(139, 183, 231, 0.45)',
        cursor: 'pointer',
      }
    }
    return {
      backgroundColor: '#004185',
      color: '#FFFFFF',
      cursor: 'pointer',
    }
  }

  if (type === 'Secondary') {
    if (state === 'Disabled') {
      return {
        backgroundColor: 'transparent',
        color: '#8BB7E7',
        border: '2px solid #8BB7E7',
        cursor: 'not-allowed',
        opacity: 0.6,
      }
    }
    if (state === 'Hover') {
      return {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: '#FFFFFF',
        border: '2px solid #FFFFFF',
        cursor: 'pointer',
      }
    }
    if (state === 'Active/Focus') {
      return {
        backgroundColor: 'rgba(255, 255, 255, 0.18)',
        color: '#FFFFFF',
        border: '2px solid #FFFFFF',
        boxShadow: '0 0 0 3px rgba(139, 183, 231, 0.45)',
        cursor: 'pointer',
      }
    }
    return {
      backgroundColor: 'transparent',
      color: '#8BB7E7',
      border: '2px solid #8BB7E7',
      cursor: 'pointer',
    }
  }

  if (type === 'Tertiary') {
    if (state === 'Disabled') {
      return {
        backgroundColor: 'rgba(230, 250, 237, 0.25)',
        color: '#94A3B8',
        cursor: 'not-allowed',
      }
    }
    if (state === 'Hover') {
      return {
        backgroundColor: '#D2F5DC',
        color: '#002750',
        cursor: 'pointer',
      }
    }
    if (state === 'Active/Focus') {
      return {
        backgroundColor: '#BEEECB',
        color: '#002750',
        boxShadow: '0 0 0 3px rgba(230, 250, 237, 0.35)',
        cursor: 'pointer',
      }
    }
    return {
      backgroundColor: '#E6FAED',
      color: '#004185',
      cursor: 'pointer',
    }
  }

  // Link
  if (state === 'Disabled') {
    return {
      backgroundColor: 'transparent',
      color: '#8BB7E7',
      border: 'none',
      padding: 0,
      cursor: 'not-allowed',
      opacity: 0.5,
    }
  }
  if (state === 'Hover') {
    return {
      backgroundColor: 'transparent',
      color: '#FFFFFF',
      border: 'none',
      padding: 0,
      textDecoration: 'underline',
      cursor: 'pointer',
    }
  }
  if (state === 'Active/Focus') {
    return {
      backgroundColor: 'transparent',
      color: '#93C5FD',
      border: 'none',
      padding: 0,
      textDecoration: 'underline',
      outline: '2px solid #8BB7E7',
      outlineOffset: '2px',
      cursor: 'pointer',
    }
  }
  return {
    backgroundColor: 'transparent',
    color: '#8BB7E7',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
  }
}

/** Renders a single cell in the dark navy variation matrix */
function DarkButtonCell({
  type,
  size,
  state,
  icon,
  label,
}: {
  type: ButtonType
  size: ButtonSize
  state: ButtonState
  icon: ButtonIconOption
  label: string
}) {
  const metrics = getButtonSizeMetrics(size)
  const style = getDarkButtonMatrixStyle(type, state)
  const isDisabled = state === 'Disabled'

  return (
    <div className="flex flex-col items-start justify-center min-h-[56px] py-1">
      <button
        type="button"
        disabled={isDisabled}
        style={{
          fontFamily: "'Open Sans', sans-serif",
          fontWeight: 700,
          fontSize: `${metrics.fontSize}px`,
          ...style,
        }}
        className={`inline-flex items-center gap-2 font-bold select-none transition-all ${
          type === 'Link' ? 'p-0 bg-transparent border-0' : metrics.paddingClass
        }`}
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
            search
          </span>
        )}
        <span style={{ color: 'inherit' }}>{label}</span>
      </button>
    </div>
  )
}

interface TypeBlockInfo {
  type: ButtonType
  badge: string
  description: string
}

const TYPE_BLOCKS: TypeBlockInfo[] = [
  {
    type: 'Primary',
    badge: '1. Primary (Fundo Azul-Marinho COMVEN #004185)',
    description:
      'Ação principal com alto contraste; hover #00346A, active #002750, disabled #8BB7E7.',
  },
  {
    type: 'Secondary',
    badge: '2. Secondary (Transparente com borda 2px)',
    description: 'Ações secundárias; borda 2px azul COMVEN #004185, hover com fundo translúcido.',
  },
  {
    type: 'Tertiary',
    badge: '3. Tertiary (Fundo verde-suave #E6FAED)',
    description: 'Ações alternativas; fundo verde-suave #E6FAED com texto azul #004185.',
  },
  {
    type: 'Link',
    badge: '4. Link (Texto azul com ícone de lupa)',
    description: 'Navegação inline e links de texto; sem borda ou padding, sublinhado no hover.',
  },
]

const STATE_BADGES: Record<ButtonState, string> = {
  Default: 'Linha 1 — Default (Estado Inicial)',
  Hover: 'Linha 2 — Hover (Ao passar o cursor)',
  'Active/Focus': 'Linha 3 — Active / Focus (Pressionado ou focado)',
  Disabled: 'Linha 4 — Disabled (Desabilitado)',
}

/** Complete variation matrix for Button over #062446 navy background without internal scroll */
function ButtonStateGallery({ label }: { label: string }) {
  const displayLabel = label || 'Buscar'

  return (
    <div className="mt-10 pt-8 border-t border-[#F0F2F5]">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-[#141414]">
          Matriz completa de variações — Figma (4 tipos × 4 estados × 3 tamanhos × com/sem ícone)
        </h3>
        <p className="text-xs sm:text-sm text-[#7A7A7A] mt-1 font-normal">
          Visualização em grid sobre o fundo azul-marinho oficial COMVEN (#062446), organizada em
          blocos por tipo de botão, com todas as combinações de estados, tamanhos e ícones sem barra
          de scroll.
        </p>
      </div>

      <div className="mt-5 space-y-6">
        {TYPE_BLOCKS.map((block) => (
          <div
            key={block.type}
            className="rounded-2xl border border-[#0d3663] bg-[#062446] shadow-md p-6 sm:p-8"
          >
            {/* Block Header */}
            <div className="pb-4 border-b border-[#113C68]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm sm:text-base font-bold text-[#F2CB05] tracking-wide uppercase">
                  {block.badge}
                </span>
                <span className="text-xs text-[#8BB7E7] font-medium">
                  3 tamanhos × 4 estados × com/sem ícone
                </span>
              </div>
              <p className="text-xs text-[#D2E4F7] mt-1 font-normal">{block.description}</p>
            </div>

            {/* Column Headers: 3 sizes (Large, Medium, Small) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 pb-2 border-b border-[#113C68]/60 text-[11px] font-bold uppercase tracking-wider text-[#8BB7E7]">
              <div>Large (16px / ícone 20px)</div>
              <div>Medium (14px / ícone 18px)</div>
              <div>Small (12px / ícone 16px)</div>
            </div>

            {/* Rows by State */}
            <div className="divide-y divide-[#113C68]/40">
              {BUTTON_STATES.map((st) => (
                <div key={st} className="py-5 space-y-3">
                  {/* State badge */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#F2CB05] tracking-wide uppercase">
                      {STATE_BADGES[st]}
                    </span>
                    <div className="flex-1 h-px bg-[#113C68]/60" />
                  </div>

                  {/* Sub-row: COM ÍCONE */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8BB7E7]/80">
                      • Com ícone
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
                      {BUTTON_SIZES.map((sz) => (
                        <DarkButtonCell
                          key={`${block.type}-${st}-${sz}-com-icone`}
                          type={block.type}
                          size={sz}
                          state={st}
                          icon="Com ícone"
                          label={displayLabel}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Sub-row: SEM ÍCONE */}
                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8BB7E7]/80">
                      • Sem ícone
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
                      {BUTTON_SIZES.map((sz) => (
                        <DarkButtonCell
                          key={`${block.type}-${st}-${sz}-sem-icone`}
                          type={block.type}
                          size={sz}
                          state={st}
                          icon="Sem ícone"
                          label={displayLabel}
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
