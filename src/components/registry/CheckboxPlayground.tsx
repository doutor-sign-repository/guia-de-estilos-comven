import React, { useState } from 'react'
import {
  CheckboxConfig,
  CheckboxState,
  CheckboxSize,
  CheckboxOrientation,
  CheckboxCheckState,
  CheckboxOption,
  generateCheckboxCss,
  CHECKBOX_SIZE_METRICS,
} from './types'
import { PlaygroundControlGroup } from './PlaygroundControlGroup'
import { useToast } from '@/hooks/use-toast'

export interface CheckboxPlaygroundProps {
  initialConfig?: Partial<CheckboxConfig>
}

const CHECKBOX_STATES: CheckboxState[] = ['Default', 'Hover', 'Focado', 'Disabled']
const CHECKBOX_SIZES: CheckboxSize[] = ['Large', 'Medium', 'Small']
const CHECKBOX_ORIENTATIONS: CheckboxOrientation[] = ['Horizontal', 'Vertical']

const DEFAULT_OPTIONS: CheckboxOption[] = [
  {
    id: 'chk-1',
    label: 'Notificações por e-mail',
    description: 'Receba alertas diários e resumo da operação',
    checkedState: 'checked',
  },
  {
    id: 'chk-2',
    label: 'Alertas via SMS e WhatsApp',
    description: 'Avisos imediatos sobre pedidos prioritários',
    checkedState: 'indeterminate',
  },
  {
    id: 'chk-3',
    label: 'Relatório semanal consolidado',
    description: 'Exportação automática em PDF e planilha',
    checkedState: 'unchecked',
  },
]

export const CheckboxPlayground: React.FC<CheckboxPlaygroundProps> = ({ initialConfig }) => {
  const { toast } = useToast()

  const [state, setState] = useState<CheckboxState>(initialConfig?.state || 'Default')
  const [size, setSize] = useState<CheckboxSize>(initialConfig?.size || 'Medium')
  const [orientation, setOrientation] = useState<CheckboxOrientation>(
    initialConfig?.orientation || 'Vertical',
  )
  const [groupTitle, setGroupTitle] = useState<string>(
    initialConfig?.groupTitle ?? 'Preferências de comunicação COMVEN',
  )

  // Editable options with individual checkedState (checked | unchecked | indeterminate)
  const [options, setOptions] = useState<CheckboxOption[]>(
    initialConfig?.options && initialConfig.options.length > 0
      ? initialConfig.options
      : DEFAULT_OPTIONS,
  )

  const [copied, setCopied] = useState(false)

  const config: CheckboxConfig = {
    state,
    size,
    orientation,
    groupTitle,
    options,
  }

  const cssCode = generateCheckboxCss(config)

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

  const handleToggleOption = (id: string) => {
    if (state === 'Disabled') return
    setOptions((prev) =>
      prev.map((opt) => {
        if (opt.id !== id) return opt
        // Real checkbox toggle: indeterminate/unchecked -> checked -> unchecked
        const nextState: CheckboxCheckState =
          opt.checkedState === 'checked' ? 'unchecked' : 'checked'
        return { ...opt, checkedState: nextState }
      }),
    )
  }

  const handleSetOptionCheckState = (id: string, newCheckState: CheckboxCheckState) => {
    setOptions((prev) =>
      prev.map((opt) => (opt.id === id ? { ...opt, checkedState: newCheckState } : opt)),
    )
  }

  const addOption = () => {
    if (options.length >= 5) return
    const newId = `chk-${Date.now()}`
    const newIndex = options.length + 1
    setOptions((prev) => [
      ...prev,
      {
        id: newId,
        label: `Opção ${newIndex} — Nova preferência`,
        description: '',
        checkedState: 'unchecked',
      },
    ])
  }

  const removeOption = (indexToRemove: number) => {
    if (options.length <= 2) return
    setOptions((prev) => prev.filter((_, i) => i !== indexToRemove))
  }

  const FIGMA_PROTO_URL =
    'https://www.figma.com/proto/YEMa9j7O8aNm5PVmS8eSlC/Guia-de-Estilos?node-id=34-1734&viewport=-759%2C471%2C0.32&t=wAmAkj8XxXp7cOHD-1&scaling=contain&content-scaling=responsive&page-id=18%3A2'

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EBEBEB] shadow-sm">
      {/* Checkbox Section Header */}
      <div className="flex items-start gap-4">
        <div className="pt-0.5">
          <h2 className="text-2xl sm:text-[28px] font-bold text-[#141414] leading-tight tracking-tight">
            Checkbox (Caixa de Seleção)
          </h2>
          <p className="text-sm sm:text-[15px] text-[#666666] mt-1 font-normal">
            4 estados interativos × 3 tamanhos × 2 orientações — seleção múltipla independente com
            suporte a estado indeterminado (traço), título de grupo e foco acessível COMVEN
            (#004185)
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
            Configure o estado, tamanho e orientação do Checkbox. Alterne marcação, adicione/remova
            opções e teste o estado indeterminado diretamente no grupo de controles ou na prévia.
          </p>
        </div>

        {/* Controls: flex-wrap com grupos padronizados indivisíveis */}
        <div className="mt-6 flex flex-wrap items-start gap-x-8 gap-y-4">
          {/* ESTADO */}
          <PlaygroundControlGroup label="ESTADO">
            {CHECKBOX_STATES.map((st) => {
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
            {CHECKBOX_SIZES.map((sz) => {
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
            {CHECKBOX_ORIENTATIONS.map((ori) => {
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
              htmlFor="checkbox-playground-group-title"
              className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-1.5 block select-none"
            >
              TÍTULO DO GRUPO
            </label>
            <input
              id="checkbox-playground-group-title"
              type="text"
              value={groupTitle}
              onChange={(e) => setGroupTitle(e.target.value)}
              placeholder="Digite o título do grupo de checkboxes"
              maxLength={60}
              className="w-full h-8 px-3 rounded-md border border-[#D5DCE5] bg-white text-xs font-semibold text-[#141414] outline-none focus:border-[#004185] focus:ring-1 focus:ring-[#004185] transition-colors placeholder:font-normal placeholder:text-[#9CA3AF]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2 max-w-3xl">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] select-none">
                RÓTULOS DAS OPÇÕES &amp; ESTADO ({options.length}/5)
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
                <div
                  key={opt.id}
                  className="flex flex-col gap-1.5 p-2.5 rounded-lg border border-[#E2E6EB] bg-[#FAFCFE]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#004185]">Opção #{idx + 1}</span>
                    <div className="flex items-center gap-1">
                      {/* State switch: checked | unchecked | indeterminate */}
                      <button
                        type="button"
                        onClick={() =>
                          handleSetOptionCheckState(
                            opt.id,
                            opt.checkedState === 'checked' ? 'unchecked' : 'checked',
                          )
                        }
                        title="Alternar marcado/desmarcado"
                        className={`px-1.5 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                          opt.checkedState === 'checked'
                            ? 'bg-[#004185] text-white'
                            : 'bg-white border border-[#D5DCE5] text-[#555]'
                        }`}
                      >
                        ✓
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleSetOptionCheckState(
                            opt.id,
                            opt.checkedState === 'indeterminate' ? 'unchecked' : 'indeterminate',
                          )
                        }
                        title="Alternar estado indeterminado (traço)"
                        className={`px-1.5 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                          opt.checkedState === 'indeterminate'
                            ? 'bg-[#004185] text-white'
                            : 'bg-white border border-[#D5DCE5] text-[#555]'
                        }`}
                      >
                        —
                      </button>
                      {options.length > 2 && (
                        <button
                          type="button"
                          onClick={() => removeOption(idx)}
                          title="Remover opção"
                          className="w-5 h-5 inline-flex items-center justify-center rounded text-[#888888] hover:text-[#CC0000] hover:bg-[#FFE5E5] transition-colors ml-1"
                        >
                          <span className="material-symbols-rounded" style={{ fontSize: '14px' }}>
                            close
                          </span>
                        </button>
                      )}
                    </div>
                  </div>

                  <input
                    type="text"
                    value={opt.label}
                    onChange={(e) => handleOptionLabelChange(idx, e.target.value)}
                    placeholder={`Rótulo da opção ${idx + 1}`}
                    maxLength={40}
                    className="w-full h-7 px-2 rounded border border-[#D5DCE5] bg-white text-xs font-medium text-[#141414] outline-none focus:border-[#004185] focus:ring-1 focus:ring-[#004185] transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Preview Container */}
        <div className="mt-6 rounded-2xl bg-[#F5F7FA] p-6 sm:p-8 border border-[#EBEBEB]">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            {/* Live Checkbox Group */}
            <div className="flex-1 w-full min-h-[90px] py-1">
              <SingleCheckboxGroupPreview
                config={config}
                onToggle={(id) => handleToggleOption(id)}
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
      <CheckboxStateGallery options={options} />
    </div>
  )
}

/** Render preview of a single interactive Checkbox Group */
export function SingleCheckboxGroupPreview({
  config,
  onToggle,
  className = '',
}: {
  config: CheckboxConfig
  onToggle?: (id: string) => void
  className?: string
}) {
  const { state, size, orientation, groupTitle, options } = config
  const metrics = CHECKBOX_SIZE_METRICS[size] || CHECKBOX_SIZE_METRICS.Medium

  const isHorizontal = orientation === 'Horizontal'
  const isDisabled = state === 'Disabled'

  return (
    <div className={`w-full ${className}`} role="group" aria-label={groupTitle || 'Checkboxes'}>
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
          return (
            <SingleCheckboxItem
              key={opt.id}
              option={opt}
              state={state}
              size={size}
              onToggle={() => onToggle?.(opt.id)}
            />
          )
        })}
      </div>
    </div>
  )
}

/** Single Checkbox item with accessible square box + icon (check/dash) + label */
export function SingleCheckboxItem({
  option,
  state,
  size,
  onToggle,
}: {
  option: CheckboxOption
  state: CheckboxState
  size: CheckboxSize
  onToggle?: () => void
}) {
  const metrics = CHECKBOX_SIZE_METRICS[size] || CHECKBOX_SIZE_METRICS.Medium
  const isDisabled = state === 'Disabled'
  const isHoverState = state === 'Hover'
  const isFocusState = state === 'Focado'

  const [localHover, setLocalHover] = useState(false)
  const isHovered = isHoverState || (!isDisabled && localHover)

  const isChecked = option.checkedState === 'checked'
  const isIndeterminate = option.checkedState === 'indeterminate'
  const isFilled = isChecked || isIndeterminate

  // Outline COMVEN: estritamente 1px em azul #004185
  const outlineRule = isFocusState ? '1px solid #004185' : 'none'

  let borderColor = '#D5DCE5'
  let boxBg = '#FFFFFF'
  let iconColor = '#FFFFFF'
  let labelColor = '#141414'

  if (isDisabled) {
    borderColor = '#E5E7EB'
    boxBg = isFilled ? '#CBD5E1' : '#F5F7FA'
    iconColor = '#9CA3AF'
    labelColor = '#9CA3AF'
  } else if (isFilled) {
    borderColor = isHovered ? '#00336A' : '#004185'
    boxBg = isHovered ? '#00336A' : '#004185'
    iconColor = '#FFFFFF'
    labelColor = isHovered ? '#004185' : '#141414'
  } else if (isHovered) {
    borderColor = '#004185'
    boxBg = '#F5F7FA'
    labelColor = '#004185'
  }

  return (
    <label
      role="checkbox"
      aria-checked={isIndeterminate ? 'mixed' : isChecked}
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : 0}
      onClick={() => {
        if (!isDisabled) onToggle?.()
      }}
      onKeyDown={(e) => {
        if (!isDisabled && (e.key === ' ' || e.key === 'Enter')) {
          e.preventDefault()
          onToggle?.()
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
      {/* Checkbox Box */}
      <span
        className="relative flex items-center justify-center shrink-0 transition-all duration-150"
        style={{
          width: `${metrics.boxSize}px`,
          height: `${metrics.boxSize}px`,
          borderRadius: `${metrics.borderRadius}px`,
          border: `${metrics.borderWidth}px solid ${borderColor}`,
          backgroundColor: boxBg,
          outline: outlineRule,
          outlineOffset: '2px',
          marginTop: '2px', // align with first line of label
        }}
      >
        {isChecked && (
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke={iconColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: `${metrics.iconSize}px`, height: `${metrics.iconSize}px` }}
          >
            <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
          </svg>
        )}
        {isIndeterminate && (
          <span
            className="rounded-full"
            style={{
              width: `${Math.max(6, metrics.iconSize - 3)}px`,
              height: `${Math.max(2, metrics.borderWidth + 0.5)}px`,
              backgroundColor: iconColor,
            }}
          />
        )}
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

/** Complete variation matrix for Checkbox over #062446 navy background without internal scroll */
function CheckboxStateGallery({ options }: { options: CheckboxOption[] }) {
  const blocks: Array<{
    variant: CheckboxState
    badge: string
    description: string
  }> = [
    {
      variant: 'Default',
      badge: 'Estado Default (Padrão)',
      description:
        'Estado inicial de repouso com borda neutra e fundo branco. Acessível e pronto para interação.',
    },
    {
      variant: 'Hover',
      badge: 'Estado Hover (Ao passar o cursor)',
      description:
        'Borda realçada e fundo sutilmente iluminado em azul-gelo indicando que o controle é clicável.',
    },
    {
      variant: 'Focado',
      badge: 'Estado Focado (Active / Foco por Teclado)',
      description:
        'Foco por anel azul COMVEN (#004185 de 1px) garantindo conformidade de acessibilidade WCAG.',
    },
    {
      variant: 'Disabled',
      badge: 'Estado Disabled (Desabilitado)',
      description:
        'Opacidade reduzida (50%), cursor não-permitido e cor atenuada para opções inoperantes.',
    },
  ]
  const displayLabel1 = options[0]?.label || 'Notificações ativas'
  const displayLabel2 = options[1]?.label || 'Seleção parcial (filhos)'
  const displayLabel3 = options[2]?.label || 'Opção não selecionada'

  return (
    <div className="mt-10 pt-8 border-t border-[#F0F2F5]">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-[#141414]">
          Matriz completa de variações — (4 estados × 3 tamanhos × Marcado, Indeterminado &amp;
          Desmarcado)
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
              {CHECKBOX_SIZES.map((sz) => {
                const metrics = CHECKBOX_SIZE_METRICS[sz]
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
                        Tamanho {sz} ({metrics.boxSize}px)
                      </span>
                      <span className="text-[10px] text-[#A6C8EE] font-mono">
                        Ícone {metrics.iconSize}px
                      </span>
                    </div>

                    <div className="space-y-4 py-1">
                      {/* 1. Marcado */}
                      <div className="flex items-start gap-2.5">
                        <span
                          className="relative flex items-center justify-center shrink-0 transition-all"
                          style={{
                            width: `${metrics.boxSize}px`,
                            height: `${metrics.boxSize}px`,
                            borderRadius: `${metrics.borderRadius}px`,
                            border: `${metrics.borderWidth}px solid ${
                              isDisabled
                                ? '#526980'
                                : isHoverState || isFocusState
                                  ? '#F2CB05'
                                  : '#3B82F6'
                            }`,
                            backgroundColor: isDisabled ? '#1E3A5F' : '#004185',
                            outline: isFocusState && !isDisabled ? '1px solid #F2CB05' : 'none',
                            outlineOffset: '2px',
                            marginTop: '2px',
                          }}
                        >
                          <svg
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke={isDisabled ? '#6B8299' : '#FFFFFF'}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{
                              width: `${metrics.iconSize}px`,
                              height: `${metrics.iconSize}px`,
                            }}
                          >
                            <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
                          </svg>
                        </span>
                        <div className="flex flex-col">
                          <span
                            className="font-semibold leading-tight"
                            style={{
                              fontSize: `${metrics.fontSize}px`,
                              color: isDisabled ? '#6B8299' : isHoverState ? '#F2CB05' : '#FFFFFF',
                            }}
                          >
                            {displayLabel1}
                          </span>
                          <span
                            className="text-[11px] font-mono"
                            style={{ color: isDisabled ? '#526980' : '#8BB7E7' }}
                          >
                            Marcado (Checked) · {b.state}
                          </span>
                        </div>
                      </div>

                      {/* 2. Indeterminado */}
                      <div className="flex items-start gap-2.5">
                        <span
                          className="relative flex items-center justify-center shrink-0 transition-all"
                          style={{
                            width: `${metrics.boxSize}px`,
                            height: `${metrics.boxSize}px`,
                            borderRadius: `${metrics.borderRadius}px`,
                            border: `${metrics.borderWidth}px solid ${
                              isDisabled
                                ? '#526980'
                                : isHoverState || isFocusState
                                  ? '#F2CB05'
                                  : '#3B82F6'
                            }`,
                            backgroundColor: isDisabled ? '#1E3A5F' : '#004185',
                            outline: isFocusState && !isDisabled ? '1px solid #F2CB05' : 'none',
                            outlineOffset: '2px',
                            marginTop: '2px',
                          }}
                        >
                          <span
                            className="rounded-full"
                            style={{
                              width: `${Math.max(6, metrics.iconSize - 3)}px`,
                              height: `${Math.max(2, metrics.borderWidth + 0.5)}px`,
                              backgroundColor: isDisabled ? '#6B8299' : '#FFFFFF',
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
                            {displayLabel2}
                          </span>
                          <span
                            className="text-[11px] font-mono"
                            style={{ color: isDisabled ? '#526980' : '#8BB7E7' }}
                          >
                            Indeterminado (Dash) · {b.state}
                          </span>
                        </div>
                      </div>

                      {/* 3. Desmarcado */}
                      <div className="flex items-start gap-2.5">
                        <span
                          className="relative flex items-center justify-center shrink-0 transition-all"
                          style={{
                            width: `${metrics.boxSize}px`,
                            height: `${metrics.boxSize}px`,
                            borderRadius: `${metrics.borderRadius}px`,
                            border: `${metrics.borderWidth}px solid ${
                              isDisabled ? '#41556B' : isHoverState ? '#8BB7E7' : '#4B6A8A'
                            }`,
                            backgroundColor: isDisabled ? '#152E4D' : 'transparent',
                            outline: isFocusState && !isDisabled ? '1px solid #8BB7E7' : 'none',
                            outlineOffset: '2px',
                            marginTop: '2px',
                          }}
                        />
                        <div className="flex flex-col">
                          <span
                            className="font-semibold leading-tight"
                            style={{
                              fontSize: `${metrics.fontSize}px`,
                              color: isDisabled ? '#6B8299' : isHoverState ? '#D2E4F7' : '#D2E4F7',
                            }}
                          >
                            {displayLabel3}
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
