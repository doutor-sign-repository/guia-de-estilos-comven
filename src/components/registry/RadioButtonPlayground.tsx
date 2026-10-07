import React, { useState } from 'react'
import {
  RadioButtonConfig,
  RadioState,
  RadioSize,
  RadioOrientation,
  RadioOption,
  generateRadioButtonCss,
  RADIO_SIZE_METRICS,
} from './types'
import { PlaygroundControlGroup } from './PlaygroundControlGroup'
import { useToast } from '@/hooks/use-toast'

export interface RadioButtonPlaygroundProps {
  initialConfig?: Partial<RadioButtonConfig>
}

const RADIO_STATES: RadioState[] = ['Default', 'Hover', 'Focado', 'Disabled']
const RADIO_SIZES: RadioSize[] = ['Large', 'Medium', 'Small']
const RADIO_ORIENTATIONS: RadioOrientation[] = ['Horizontal', 'Vertical']

const DEFAULT_OPTIONS: RadioOption[] = [
  {
    id: 'opt-1',
    label: 'Opção 1 — COMVEN Standard',
    description: 'Plano padrão com suporte regular',
  },
  {
    id: 'opt-2',
    label: 'Opção 2 — Plano Empresarial',
    description: 'Acesso multiusuário e relatórios',
  },
  { id: 'opt-3', label: 'Opção 3 — Linha Premium', description: 'Atendimento dedicado 24/7' },
]

export const RadioButtonPlayground: React.FC<RadioButtonPlaygroundProps> = ({ initialConfig }) => {
  const { toast } = useToast()

  const [state, setState] = useState<RadioState>(initialConfig?.state || 'Default')
  const [size, setSize] = useState<RadioSize>(initialConfig?.size || 'Medium')
  const [orientation, setOrientation] = useState<RadioOrientation>(
    initialConfig?.orientation || 'Vertical',
  )
  const [groupTitle, setGroupTitle] = useState<string>(
    initialConfig?.groupTitle ?? 'Selecione o plano desejado',
  )

  // Editable options
  const [options, setOptions] = useState<RadioOption[]>(
    initialConfig?.options && initialConfig.options.length > 0
      ? initialConfig.options
      : DEFAULT_OPTIONS,
  )

  // Selection state (only 1 option checked per group)
  const [selectedId, setSelectedId] = useState<string>(
    initialConfig?.selectedId || options[0]?.id || 'opt-1',
  )

  const [copied, setCopied] = useState(false)

  const config: RadioButtonConfig = {
    state,
    size,
    orientation,
    groupTitle,
    options,
    selectedId,
  }

  const cssCode = generateRadioButtonCss(config)

  const copyCss = () => {
    navigator.clipboard.writeText(cssCode)
    setCopied(true)
    toast({
      title: 'CSS Copiado!',
      description: 'Código CSS copiado para a área de transferência.',
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleOptionLabelChange = (index: number, newLabel: string) => {
    setOptions((prev) => prev.map((opt, i) => (i === index ? { ...opt, label: newLabel } : opt)))
  }

  const addOption = () => {
    if (options.length >= 5) return
    const newId = `opt-${Date.now()}`
    const newIndex = options.length + 1
    setOptions((prev) => [
      ...prev,
      { id: newId, label: `Opção ${newIndex} — Nova opção`, description: '' },
    ])
  }

  const removeOption = (indexToRemove: number) => {
    if (options.length <= 2) return
    const removedOption = options[indexToRemove]
    const updated = options.filter((_, i) => i !== indexToRemove)
    setOptions(updated)
    if (selectedId === removedOption.id) {
      setSelectedId(updated[0]?.id || '')
    }
  }

  const FIGMA_PROTO_URL =
    'https://www.figma.com/proto/YEMa9j7O8aNm5PVmS8eSlC/Guia-de-Estilos?node-id=34-1734&viewport=-759%2C471%2C0.32&t=wAmAkj8XxXp7cOHD-1&scaling=contain&content-scaling=responsive&page-id=18%3A2'

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EBEBEB] shadow-sm">
      {/* 10 Radio Button Section Header */}
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-[#004185] text-white flex items-center justify-center font-bold text-base shrink-0 select-none">
          10
        </div>
        <div className="pt-0.5">
          <h2 className="text-2xl sm:text-[28px] font-bold text-[#141414] leading-tight tracking-tight">
            Radio Button (Botão de Opção)
          </h2>
          <p className="text-sm sm:text-[15px] text-[#666666] mt-1 font-normal">
            4 estados interativos × 3 tamanhos × 2 orientações — seleção exclusiva entre opções
            mutuamente excludentes com suporte a título de grupo e foco acessível COMVEN (#004185)
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
            Configure o estado, tamanho e orientação do Radio Button. Edite o título do grupo e os
            rótulos das opções nos campos de texto abaixo para testar a experiência ao vivo.
          </p>
        </div>

        {/* Controls: flex-wrap com grupos padronizados indivisíveis */}
        <div className="mt-6 flex flex-wrap items-start gap-x-8 gap-y-4">
          {/* ESTADO */}
          <PlaygroundControlGroup label="ESTADO">
            {RADIO_STATES.map((st) => {
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

          {/* TAMANHO */}
          <PlaygroundControlGroup label="TAMANHO">
            {RADIO_SIZES.map((sz) => {
              const isSelected = size === sz
              return (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setSize(sz)}
                  className={`h-8 px-3.5 rounded-md text-xs font-semibold transition-all select-none shrink-0 ${
                    isSelected
                      ? 'bg-[#004185] text-white shadow-xs'
                      : 'bg-[#F0F2F5] text-[#222222] hover:bg-[#E4E7EC]'
                  }`}
                >
                  {sz}
                </button>
              )
            })}
          </PlaygroundControlGroup>

          {/* ORIENTAÇÃO */}
          <PlaygroundControlGroup label="ORIENTAÇÃO">
            {RADIO_ORIENTATIONS.map((ori) => {
              const isSelected = orientation === ori
              return (
                <button
                  key={ori}
                  type="button"
                  onClick={() => setOrientation(ori)}
                  className={`h-8 px-3.5 rounded-md text-xs font-semibold transition-all select-none shrink-0 ${
                    isSelected
                      ? 'bg-[#004185] text-white shadow-xs'
                      : 'bg-[#F0F2F5] text-[#222222] hover:bg-[#E4E7EC]'
                  }`}
                >
                  {ori}
                </button>
              )
            })}
          </PlaygroundControlGroup>
        </div>

        {/* Text Edit Fields: TÍTULO DO GRUPO e RÓTULOS DAS OPÇÕES */}
        <div className="mt-6 pt-5 border-t border-[#F0F2F5] space-y-4">
          <div className="max-w-xl">
            <label
              htmlFor="radio-playground-group-title"
              className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-1.5 block select-none"
            >
              TÍTULO DO GRUPO
            </label>
            <input
              id="radio-playground-group-title"
              type="text"
              value={groupTitle}
              onChange={(e) => setGroupTitle(e.target.value)}
              placeholder="Digite o título do grupo de opções"
              maxLength={60}
              className="w-full h-8 px-3 rounded-md border border-[#D5DCE5] bg-white text-xs font-semibold text-[#141414] outline-none focus:border-[#004185] focus:ring-1 focus:ring-[#004185] transition-colors placeholder:font-normal placeholder:text-[#9CA3AF]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2 max-w-2xl">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] select-none">
                RÓTULOS DAS OPÇÕES ({options.length}/5)
              </span>
              {options.length < 5 && (
                <button
                  type="button"
                  onClick={addOption}
                  className="text-xs font-semibold text-[#004185] hover:underline inline-flex items-center gap-1"
                >
                  <span className="material-symbols-rounded text-sm" style={{ fontSize: '14px' }}>
                    add
                  </span>
                  <span>Adicionar opção</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl">
              {options.map((opt, idx) => (
                <div key={opt.id} className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-[#7A7A7A] w-5 shrink-0">
                    #{idx + 1}
                  </span>
                  <input
                    type="text"
                    value={opt.label}
                    onChange={(e) => handleOptionLabelChange(idx, e.target.value)}
                    placeholder={`Rótulo da opção ${idx + 1}`}
                    maxLength={40}
                    className="flex-1 h-8 px-2.5 rounded-md border border-[#D5DCE5] bg-white text-xs font-medium text-[#141414] outline-none focus:border-[#004185] focus:ring-1 focus:ring-[#004185] transition-colors"
                  />
                  {options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeOption(idx)}
                      title="Remover opção"
                      className="w-7 h-7 inline-flex items-center justify-center rounded-md text-[#888888] hover:text-[#CC0000] hover:bg-[#FFE5E5] transition-colors"
                    >
                      <span className="material-symbols-rounded" style={{ fontSize: '16px' }}>
                        close
                      </span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Preview Container */}
        <div className="mt-6 rounded-2xl bg-[#F5F7FA] p-6 sm:p-8 border border-[#EBEBEB]">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            {/* Live Radio Group */}
            <div className="flex-1 w-full min-h-[90px] py-1">
              <SingleRadioGroupPreview
                config={config}
                selectedId={selectedId}
                onSelect={(id) => {
                  if (state !== 'Disabled') {
                    setSelectedId(id)
                  }
                }}
              />
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

      {/* Matriz Completa sobre fundo #062446 sem barras de scroll */}
      <RadioStateGallery options={options} />
    </div>
  )
}

/** Render preview of a single interactive Radio Group */
export function SingleRadioGroupPreview({
  config,
  selectedId,
  onSelect,
  className = '',
  forceCheckedId,
}: {
  config: RadioButtonConfig
  selectedId?: string
  onSelect?: (id: string) => void
  className?: string
  forceCheckedId?: string
}) {
  const { state, size, orientation, groupTitle, options } = config
  const metrics = RADIO_SIZE_METRICS[size] || RADIO_SIZE_METRICS.Medium
  const currentSelected = forceCheckedId !== undefined ? forceCheckedId : selectedId

  const isHorizontal = orientation === 'Horizontal'
  const isDisabled = state === 'Disabled'

  return (
    <div className={`w-full ${className}`} role="radiogroup" aria-label={groupTitle || 'Opções'}>
      {groupTitle && (
        <div
          className="font-bold mb-3 select-none"
          style={{
            fontSize: `${metrics.fontSize}px`,
            color: isDisabled ? '#9CA3AF' : '#141414',
            fontFamily: "'Open Sans', sans-serif",
          }}
        >
          {groupTitle}
        </div>
      )}

      <div
        className={`flex ${isHorizontal ? 'flex-row flex-wrap items-center' : 'flex-col items-start'}`}
        style={{ gap: `${metrics.groupGap}px` }}
      >
        {options.map((opt) => {
          const isChecked = currentSelected === opt.id
          return (
            <SingleRadioButtonItem
              key={opt.id}
              option={opt}
              isChecked={isChecked}
              state={state}
              size={size}
              onSelect={() => onSelect?.(opt.id)}
            />
          )
        })}
      </div>
    </div>
  )
}

/** Single Radio item button with accessible circle + dot + label */
export function SingleRadioButtonItem({
  option,
  isChecked,
  state,
  size,
  onSelect,
}: {
  option: RadioOption
  isChecked: boolean
  state: RadioState
  size: RadioSize
  onSelect?: () => void
}) {
  const metrics = RADIO_SIZE_METRICS[size] || RADIO_SIZE_METRICS.Medium
  const isDisabled = state === 'Disabled'
  const isHoverState = state === 'Hover'
  const isFocusState = state === 'Focado'

  const [localHover, setLocalHover] = useState(false)
  const isHovered = isHoverState || (!isDisabled && localHover)

  // Outline COMVEN: estritamente 1px em azul #004185
  const outlineRule = isFocusState ? '1px solid #004185' : 'none'

  let borderColor = '#D5DCE5'
  let circleBg = '#FFFFFF'
  let dotBg = '#004185'
  let labelColor = '#141414'

  if (isDisabled) {
    borderColor = '#E5E7EB'
    circleBg = '#F5F7FA'
    dotBg = '#9CA3AF'
    labelColor = '#9CA3AF'
  } else if (isChecked) {
    borderColor = '#004185'
    circleBg = '#FFFFFF'
    dotBg = '#004185'
    labelColor = isHovered ? '#004185' : '#141414'
  } else if (isHovered) {
    borderColor = '#004185'
    circleBg = '#F5F7FA'
    labelColor = '#004185'
  }

  return (
    <label
      role="radio"
      aria-checked={isChecked}
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : 0}
      onClick={() => {
        if (!isDisabled) onSelect?.()
      }}
      onKeyDown={(e) => {
        if (!isDisabled && (e.key === ' ' || e.key === 'Enter')) {
          e.preventDefault()
          onSelect?.()
        }
      }}
      onMouseEnter={() => setLocalHover(true)}
      onMouseLeave={() => setLocalHover(false)}
      className="inline-flex items-start select-none transition-all duration-150 group"
      style={{
        gap: `${metrics.labelGap}px`,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        fontFamily: "'Open Sans', sans-serif",
      }}
    >
      {/* Outer Circle Container */}
      <span
        className="relative flex items-center justify-center shrink-0 transition-all duration-150 rounded-full"
        style={{
          width: `${metrics.outerSize}px`,
          height: `${metrics.outerSize}px`,
          border: `${metrics.borderWidth}px solid ${borderColor}`,
          backgroundColor: circleBg,
          outline: outlineRule,
          outlineOffset: '2px',
          marginTop: '2px', // align with first line of label
        }}
      >
        {/* Inner Selected Dot */}
        <span
          className="rounded-full transition-transform duration-150"
          style={{
            width: `${metrics.innerDotSize}px`,
            height: `${metrics.innerDotSize}px`,
            backgroundColor: dotBg,
            transform: isChecked ? 'scale(1)' : 'scale(0)',
          }}
        />
      </span>

      {/* Label and optional description */}
      <span className="flex flex-col">
        <span
          className="font-semibold leading-tight transition-colors duration-150"
          style={{
            fontSize: `${metrics.fontSize}px`,
            color: labelColor,
          }}
        >
          {option.label}
        </span>
        {option.description && (
          <span
            className="font-normal mt-0.5 leading-snug"
            style={{
              fontSize: `${metrics.descFontSize}px`,
              color: isDisabled ? '#B0B7C3' : '#666666',
            }}
          >
            {option.description}
          </span>
        )}
      </span>
    </label>
  )
}

/** Complete variation matrix for Radio Button over #062446 navy background without internal scroll */
function RadioStateGallery({ options }: { options: RadioOption[] }) {
  const blocks: Array<{
    state: RadioState
    badge: string
    description: string
  }> = [
    {
      state: 'Default',
      badge: '1. Estado Default (Padrão)',
      description:
        'Aparência padrão em repouso. Círculo neutro com borda suave para opção desmarcada e azul primário COMVEN #004185 com ponto central para a opção selecionada.',
    },
    {
      state: 'Hover',
      badge: '2. Estado Hover (Ao passar o cursor)',
      description:
        'Feedback visual imediato com borda e rótulo no azul primário COMVEN #004185, indicando interatividade.',
    },
    {
      state: 'Focado',
      badge: '3. Estado Focado (Active / Foco por Teclado)',
      description:
        'Outline acessível de exatamente 1px em azul COMVEN #004185 (regra rígida do guia de estilos: sempre 1px, nunca maior) com offset de 2px.',
    },
    {
      state: 'Disabled',
      badge: '4. Estado Disabled (Desabilitado)',
      description:
        'Opções bloqueadas e não interagíveis com preenchimento acinzentado suave, cursor not-allowed e texto atenuado.',
    },
  ]

  const displayOptions = options.slice(0, 3)

  return (
    <div className="mt-10 pt-8 border-t border-[#F0F2F5]">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-[#141414]">
          Matriz completa de variações — (4 estados × 3 tamanhos × Selecionado &amp; Não
          Selecionado)
        </h3>
        <p className="text-xs sm:text-sm text-[#7A7A7A] mt-1 font-normal">
          Visualização sobre o fundo azul-marinho oficial COMVEN (#062446), cobrindo Large, Medium e
          Small sem barras de scroll verticais ou horizontais fixas.
        </p>
      </div>

      <div className="mt-5 space-y-6">
        {blocks.map((b) => (
          <div
            key={b.state}
            className="rounded-2xl border border-[#0d3663] bg-[#062446] shadow-md p-6 sm:p-8"
          >
            {/* Header do bloco */}
            <div className="pb-4 border-b border-[#113C68]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm sm:text-base font-bold text-[#F2CB05] tracking-wide uppercase">
                  {b.badge}
                </span>
                <span className="text-xs text-[#8BB7E7] font-medium">Large · Medium · Small</span>
              </div>
              <p className="text-xs text-[#D2E4F7] mt-1 font-normal">{b.description}</p>
            </div>

            {/* Grid de tamanhos */}
            <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {RADIO_SIZES.map((sz) => {
                const metrics = RADIO_SIZE_METRICS[sz]
                const isDisabled = b.state === 'Disabled'
                const isHoverState = b.state === 'Hover'
                const isFocusState = b.state === 'Focado'

                return (
                  <div
                    key={`${b.state}-${sz}`}
                    className="p-5 rounded-xl bg-[#001D3D]/70 border border-[#113C68]/80 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#113C68]/60">
                      <span className="text-[11px] font-bold tracking-wider uppercase text-[#8BB7E7]">
                        Tamanho {sz} ({metrics.outerSize}px)
                      </span>
                      <span className="text-[10px] text-[#A6C8EE] font-mono">
                        Dot {metrics.innerDotSize}px
                      </span>
                    </div>

                    <div className="space-y-4 py-1">
                      {/* Opção 1: Selecionada */}
                      <div className="flex items-start gap-2.5">
                        <span
                          className="relative flex items-center justify-center shrink-0 rounded-full transition-all"
                          style={{
                            width: `${metrics.outerSize}px`,
                            height: `${metrics.outerSize}px`,
                            border: `${metrics.borderWidth}px solid ${
                              isDisabled
                                ? '#526980'
                                : isHoverState || isFocusState
                                  ? '#F2CB05'
                                  : '#3B82F6'
                            }`,
                            backgroundColor: isDisabled ? '#1E3A5F' : '#0B2D55',
                            outline: isFocusState && !isDisabled ? '1px solid #F2CB05' : 'none',
                            outlineOffset: '2px',
                            marginTop: '2px',
                          }}
                        >
                          <span
                            className="rounded-full"
                            style={{
                              width: `${metrics.innerDotSize}px`,
                              height: `${metrics.innerDotSize}px`,
                              backgroundColor: isDisabled
                                ? '#6B8299'
                                : isHoverState || isFocusState
                                  ? '#F2CB05'
                                  : '#60A5FA',
                            }}
                          />
                        </span>
                        <div className="flex flex-col">
                          <span
                            className="font-semibold leading-tight"
                            style={{
                              fontSize: `${metrics.fontSize}px`,
                              color: isDisabled ? '#6B8299' : isHoverState ? '#F2CB05' : '#FFFFFF',
                            }}
                          >
                            {displayOptions[0]?.label || 'Opção selecionada'}
                          </span>
                          <span
                            className="text-[11px] font-mono"
                            style={{ color: isDisabled ? '#526980' : '#8BB7E7' }}
                          >
                            Marcado · {b.state}
                          </span>
                        </div>
                      </div>

                      {/* Opção 2: Desmarcada */}
                      <div className="flex items-start gap-2.5">
                        <span
                          className="relative flex items-center justify-center shrink-0 rounded-full transition-all"
                          style={{
                            width: `${metrics.outerSize}px`,
                            height: `${metrics.outerSize}px`,
                            border: `${metrics.borderWidth}px solid ${
                              isDisabled ? '#41556B' : isHoverState ? '#8BB7E7' : '#4B6A8A'
                            }`,
                            backgroundColor: isDisabled ? '#152E4D' : 'transparent',
                            outline: isFocusState && !isDisabled ? '1px solid #8BB7E7' : 'none',
                            outlineOffset: '2px',
                            marginTop: '2px',
                          }}
                        >
                          <span
                            className="rounded-full scale-0"
                            style={{
                              width: `${metrics.innerDotSize}px`,
                              height: `${metrics.innerDotSize}px`,
                            }}
                          />
                        </span>
                        <div className="flex flex-col">
                          <span
                            className="font-semibold leading-tight"
                            style={{
                              fontSize: `${metrics.fontSize}px`,
                              color: isDisabled ? '#6B8299' : isHoverState ? '#D2E4F7' : '#D2E4F7',
                            }}
                          >
                            {displayOptions[1]?.label || 'Opção não selecionada'}
                          </span>
                          <span
                            className="text-[11px] font-mono"
                            style={{ color: isDisabled ? '#526980' : '#7E9AB8' }}
                          >
                            Desmarcado · {b.state}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
