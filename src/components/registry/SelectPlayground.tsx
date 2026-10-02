import React, { useState, useRef, useEffect } from 'react'
import {
  SelectConfig,
  SelectState,
  SelectSize,
  generateSelectCss,
  SELECT_SIZE_METRICS,
} from './types'
import { PlaygroundControlGroup } from './PlaygroundControlGroup'
import { useToast } from '@/hooks/use-toast'

export interface SelectPlaygroundProps {
  initialConfig?: Partial<SelectConfig>
}

const STATUSES: SelectState[] = ['Default', 'Focus', 'Hover', 'Error', 'Disabled']
const SIZES: SelectSize[] = ['Large', 'Medium', 'Small', 'XSmall']

const SAMPLE_OPTIONS = [
  'Opção 1 — COMVEN Standard',
  'Opção 2 — Plano Empresarial',
  'Opção 3 — Linha Premium',
  'Opção 4 — Customizado',
]

export const SelectPlayground: React.FC<SelectPlaygroundProps> = ({ initialConfig }) => {
  const { toast } = useToast()

  const [state, setState] = useState<SelectState>(initialConfig?.state || 'Default')
  const [size, setSize] = useState<SelectSize>(initialConfig?.size || 'Large')
  const [label, setLabel] = useState(initialConfig?.label || 'Label')
  const [placeholder, setPlaceholder] = useState(initialConfig?.placeholder || 'Input')
  const [supportingText, setSupportingText] = useState(
    initialConfig?.supportingText || 'Supporting text',
  )
  const [selectedValue, setSelectedValue] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const config: SelectConfig = {
    state,
    size,
    label,
    placeholder,
    supportingText,
  }
  const cssCode = generateSelectCss(config)

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
      {/* 03 Select — Section Header */}
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-[#004185] text-white flex items-center justify-center font-bold text-base shrink-0 select-none">
          03
        </div>
        <div className="pt-0.5">
          <h2 className="text-2xl sm:text-[28px] font-bold text-[#141414] leading-tight tracking-tight">
            Select (Dropdown)
          </h2>
          <p className="text-sm sm:text-[15px] text-[#666666] mt-1 font-normal">
            5 estados × 4 tamanhos — com label, seta dropdown expansível e supporting text
            configuráveis
          </p>
        </div>
      </div>

      {/* Playground Section */}
      <div className="mt-8 pt-6 border-t border-[#F0F2F5]">
        {/* Playground header */}
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#141414]">
            Playground — exemplos com label, seta dropdown e supporting text
          </h3>
          <p className="text-xs sm:text-sm text-[#7A7A7A] mt-1 font-normal">
            Clique em qualquer opção de State ou Size abaixo para trocar a variante do dropdown em
            tempo real. Você também pode clicar no preview para abrir o menu de opções.
          </p>
        </div>

        {/* Controls: STATE, SIZE — flex-wrap por grupo indivisível */}
        <div className="mt-6 flex flex-wrap items-start gap-x-8 gap-y-4">
          {/* STATE */}
          <PlaygroundControlGroup label="STATE">
            {STATUSES.map((st) => {
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

          {/* SIZE */}
          <PlaygroundControlGroup label="SIZE">
            {SIZES.map((s) => {
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
        </div>

        {/* Live Preview Container */}
        <div className="mt-6 rounded-2xl bg-[#F5F7FA] p-6 sm:p-8 border border-[#EBEBEB]">
          {/* Top row: Preview at left, Figma Link at right */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            {/* Left: Select Preview */}
            <div className="flex-1 max-w-md" ref={dropdownRef}>
              <InteractiveSelectPreview
                config={config}
                selectedValue={selectedValue}
                isOpen={isOpen}
                onToggle={() => {
                  if (state !== 'Disabled') {
                    setIsOpen(!isOpen)
                  }
                }}
                onSelectOption={(val) => {
                  setSelectedValue(val)
                  setIsOpen(false)
                }}
                onClear={() => setSelectedValue('')}
              />
            </div>

            {/* Right: Figma link */}
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

          {/* Text edit controls: LABEL, PLACEHOLDER, SUPPORTING TEXT — flex-wrap por campo indivisível */}
          <div className="mt-6 flex flex-wrap items-start gap-4">
            {/* LABEL */}
            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="select-playground-label"
                className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-1.5 block select-none"
              >
                LABEL
              </label>
              <input
                id="select-playground-label"
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                maxLength={40}
                className="w-full h-9 px-3 rounded-md border border-[#D5DCE5] bg-white text-sm text-[#141414] outline-none focus:border-[#004185] focus:ring-1 focus:ring-[#004185] transition-colors"
              />
            </div>

            {/* PLACEHOLDER */}
            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="select-playground-placeholder"
                className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-1.5 block select-none"
              >
                PLACEHOLDER
              </label>
              <input
                id="select-playground-placeholder"
                type="text"
                value={placeholder}
                onChange={(e) => setPlaceholder(e.target.value)}
                maxLength={40}
                className="w-full h-9 px-3 rounded-md border border-[#D5DCE5] bg-white text-sm text-[#141414] outline-none focus:border-[#004185] focus:ring-1 focus:ring-[#004185] transition-colors"
              />
            </div>

            {/* SUPPORTING TEXT */}
            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="select-playground-supporting"
                className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-1.5 block select-none"
              >
                SUPPORTING TEXT
              </label>
              <input
                id="select-playground-supporting"
                type="text"
                value={supportingText}
                onChange={(e) => setSupportingText(e.target.value)}
                maxLength={60}
                className="w-full h-9 px-3 rounded-md border border-[#D5DCE5] bg-white text-sm text-[#141414] outline-none focus:border-[#004185] focus:ring-1 focus:ring-[#004185] transition-colors"
              />
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

      {/* Galeria: os 5 estados × 4 tamanhos sobre fundo azul-marinho (fiel à imagem do Figma) */}
      <SelectStateGallery label={label} placeholder={placeholder} supportingText={supportingText} />
    </div>
  )
}

/** Resolves the visual style for a given Select state */
function getSelectStateStyle(state: SelectState): {
  borderColor: string
  borderWidth: number
  backgroundColor: string
  textColor: string
  placeholderColor: string
  arrowColor: string
  labelColor: string
  supportingColor: string
  boxShadow?: string
  cursor: string
} {
  if (state === 'Hover') {
    return {
      borderColor: '#98A2B3',
      borderWidth: 1,
      backgroundColor: '#FFFFFF',
      textColor: '#141414',
      placeholderColor: '#667085',
      arrowColor: '#004185',
      labelColor: '#344054',
      supportingColor: '#667085',
      cursor: 'pointer',
    }
  }
  if (state === 'Focus') {
    return {
      borderColor: '#004185',
      borderWidth: 1.5,
      backgroundColor: '#FFFFFF',
      textColor: '#141414',
      placeholderColor: '#667085',
      arrowColor: '#004185',
      labelColor: '#004185',
      supportingColor: '#667085',
      boxShadow: '0 0 0 1px #004185',
      cursor: 'pointer',
    }
  }
  if (state === 'Error') {
    return {
      borderColor: '#E11D48',
      borderWidth: 1.5,
      backgroundColor: '#FFFFFF',
      textColor: '#141414',
      placeholderColor: '#667085',
      arrowColor: '#E11D48',
      labelColor: '#E11D48',
      supportingColor: '#E11D48',
      boxShadow: '0 0 0 1px #E11D48',
      cursor: 'pointer',
    }
  }
  if (state === 'Disabled') {
    return {
      borderColor: '#E5E7EB',
      borderWidth: 1,
      backgroundColor: '#E5E7EB',
      textColor: '#9CA3AF',
      placeholderColor: '#9CA3AF',
      arrowColor: '#9CA3AF',
      labelColor: '#9CA3AF',
      supportingColor: '#9CA3AF',
      cursor: 'not-allowed',
    }
  }
  return {
    borderColor: '#D0D5DD',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    textColor: '#141414',
    placeholderColor: '#667085',
    arrowColor: '#141414',
    labelColor: '#344054',
    supportingColor: '#667085',
    cursor: 'pointer',
  }
}

/** Interactive Select preview with dropdown menu */
function InteractiveSelectPreview({
  config,
  selectedValue,
  isOpen,
  onToggle,
  onSelectOption,
  onClear,
}: {
  config: SelectConfig
  selectedValue: string
  isOpen: boolean
  onToggle: () => void
  onSelectOption: (val: string) => void
  onClear: () => void
}) {
  const { state, size, label, placeholder, supportingText } = config
  const metrics = SELECT_SIZE_METRICS[size]
  const s = getSelectStateStyle(state)
  const isDisabled = state === 'Disabled'

  return (
    <div className="flex flex-col relative" style={{ gap: 6 }}>
      {/* Label */}
      <label
        className="font-bold leading-snug select-none"
        style={{
          fontSize: `${metrics.labelSize}px`,
          color: s.labelColor,
        }}
      >
        {label || 'Label'}
      </label>

      {/* Field Trigger */}
      <div
        role="button"
        tabIndex={isDisabled ? -1 : 0}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onToggle()
          }
        }}
        className="flex items-center justify-between w-full select-none transition-all outline-none"
        style={{
          height: metrics.height,
          padding: `0 ${metrics.paddingX}px`,
          gap: metrics.gap,
          backgroundColor: s.backgroundColor,
          border: `${s.borderWidth}px solid ${s.borderColor}`,
          borderRadius: metrics.radius,
          boxShadow: isOpen ? '0 0 0 1px #004185' : s.boxShadow,
          cursor: s.cursor,
        }}
      >
        <span
          className="truncate"
          style={{
            fontSize: `${metrics.fontSize}px`,
            color: selectedValue ? s.textColor : s.placeholderColor,
            fontWeight: selectedValue ? 600 : 400,
          }}
        >
          {selectedValue || placeholder || 'Input'}
        </span>

        <div className="flex items-center gap-1 shrink-0">
          {selectedValue && !isDisabled && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onClear()
              }}
              className="text-[#9CA3AF] hover:text-[#141414] p-0.5"
              title="Limpar seleção"
            >
              <span className="material-symbols-rounded" style={{ fontSize: metrics.iconSize - 2 }}>
                close
              </span>
            </button>
          )}
          {/* Chevron dropdown */}
          <span
            className={`material-symbols-rounded transition-transform duration-200 shrink-0 ${
              isOpen ? 'rotate-180' : ''
            }`}
            style={{
              fontSize: metrics.iconSize,
              lineHeight: 1,
              color: s.arrowColor,
            }}
            aria-hidden="true"
          >
            expand_more
          </span>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && !isDisabled && (
        <div
          className="absolute left-0 right-0 z-30 bg-white rounded-xl border border-[#D5DCE5] shadow-lg py-1 animate-in fade-in-50 zoom-in-95"
          style={{ top: `${metrics.labelSize + 6 + metrics.height + 4}px` }}
        >
          <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#848484] border-b border-[#F0F2F5]">
            Opções disponíveis
          </div>
          <ul className="max-h-56 overflow-y-auto py-1">
            {SAMPLE_OPTIONS.map((opt) => {
              const isChosen = selectedValue === opt
              return (
                <li key={opt}>
                  <button
                    type="button"
                    onClick={() => onSelectOption(opt)}
                    className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm flex items-center justify-between transition-colors ${
                      isChosen
                        ? 'bg-[#EBF3FC] text-[#004185] font-semibold'
                        : 'text-[#141414] hover:bg-[#F5F7FA]'
                    }`}
                  >
                    <span>{opt}</span>
                    {isChosen && (
                      <span
                        className="material-symbols-rounded text-[#004185]"
                        style={{ fontSize: 16 }}
                      >
                        check
                      </span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {/* Supporting text */}
      <span
        className="leading-snug select-none"
        style={{
          fontSize: `${metrics.supportingSize}px`,
          color: s.supportingColor,
        }}
      >
        {supportingText || 'Supporting text'}
      </span>
    </div>
  )
}

/**
 * Gallery: 5 states × 4 sizes over the dark navy background (#062446),
 * exactly matching the Figma screenshot attached by the user.
 * Rows:
 * 1. Default (campo branco, borda cinza)
 * 2. Focus (anel azul-claro de foco)
 * 3. Hover (borda destacada/seta azul)
 * 4. Error (borda vermelha, supporting text vermelho)
 * 5. Disabled (campo cinza #E5E7EB, textos e seta acinzentados)
 */
function SelectStateGallery({
  label,
  placeholder,
  supportingText,
}: Pick<SelectConfig, 'label' | 'placeholder' | 'supportingText'>) {
  const rows: { state: SelectState; label: string; badge: string }[] = [
    { state: 'Default', label: 'Default', badge: 'Linha 1 — Estado Inicial' },
    { state: 'Focus', label: 'Focus', badge: 'Linha 2 — Em Foco (Ring Azul)' },
    { state: 'Hover', label: 'Hover', badge: 'Linha 3 — Ao passar o cursor' },
    { state: 'Error', label: 'Error', badge: 'Linha 4 — Validação com Erro' },
    { state: 'Disabled', label: 'Disabled', badge: 'Linha 5 — Desabilitado' },
  ]

  return (
    <div className="mt-10 pt-8 border-t border-[#F0F2F5]">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-[#141414]">
          Matriz completa de variações — Figma (5 estados × 4 tamanhos)
        </h3>
        <p className="text-xs sm:text-sm text-[#7A7A7A] mt-1 font-normal">
          Visualização em grid sobre o fundo azul-marinho oficial COMVEN (#062446), reproduzindo com
          fidelidade as 5 linhas e 4 colunas da especificação de design.
        </p>
      </div>

      <div className="mt-5 rounded-2xl border border-[#0d3663] bg-[#062446] shadow-md p-6 sm:p-8">
        <div className="w-full space-y-6">
          {/* Header row with sizes matching column widths */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-2 border-b border-[#113C68] text-[11px] font-bold uppercase tracking-wider text-[#8BB7E7]">
            <div>Large (48px)</div>
            <div>Medium (40px)</div>
            <div>Small (36px)</div>
            <div>XSmall (32px)</div>
          </div>

          {/* 5 Rows by state */}
          {rows.map((row) => (
            <div key={row.state} className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#F2CB05] tracking-wide uppercase">
                  {row.badge}
                </span>
                <div className="flex-1 h-px bg-[#113C68]/60" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
                {SIZES.map((sz) => (
                  <DarkSelectCell
                    key={`${row.state}-${sz}`}
                    state={row.state}
                    size={sz}
                    label={label || 'Label'}
                    placeholder={placeholder || 'Input'}
                    supportingText={supportingText || 'Supporting text'}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/** Individual Select cell rendered on dark navy background (#062446) matching Figma */
function DarkSelectCell({
  state,
  size,
  label,
  placeholder,
  supportingText,
}: {
  state: SelectState
  size: SelectSize
  label: string
  placeholder: string
  supportingText: string
}) {
  const metrics = SELECT_SIZE_METRICS[size]

  // On dark background (#062446):
  let borderColor = '#D0D5DD'
  let borderWidth = 1
  let bgColor = '#FFFFFF'
  let labelColor = '#FFFFFF'
  let supportingColor = '#8BB7E7'
  let arrowColor = '#141414'
  let placeholderColor = '#667085'
  let shadow: string | undefined = undefined

  if (state === 'Focus') {
    borderColor = '#004185'
    borderWidth = 1.5
    labelColor = '#FFFFFF'
    supportingColor = '#8BB7E7'
    arrowColor = '#004185'
    shadow = '0 0 0 1px #8BB7E7'
  } else if (state === 'Hover') {
    borderColor = '#CBD5E1'
    borderWidth = 1.5
    labelColor = '#FFFFFF'
    supportingColor = '#8BB7E7'
    arrowColor = '#004185'
    shadow = '0 1px 2px rgba(0,0,0,0.1)'
  } else if (state === 'Error') {
    borderColor = '#E11D48'
    borderWidth = 1.5
    labelColor = '#FFFFFF'
    supportingColor = '#FDA4AF'
    arrowColor = '#E11D48'
    shadow = '0 0 0 1px #FDA4AF'
  } else if (state === 'Disabled') {
    borderColor = '#94A3B8'
    borderWidth = 1
    bgColor = '#E2E8F0'
    labelColor = '#94A3B8'
    supportingColor = '#64748B'
    arrowColor = '#94A3B8'
    placeholderColor = '#94A3B8'
  }

  return (
    <div className="flex flex-col w-full" style={{ gap: 5 }}>
      {/* Label above */}
      <span
        className="font-bold select-none leading-tight"
        style={{ fontSize: `${metrics.labelSize}px`, color: labelColor }}
      >
        {label}
      </span>

      {/* Field with placeholder + chevron-down */}
      <div
        className="flex items-center justify-between w-full select-none"
        style={{
          height: metrics.height,
          padding: `0 ${metrics.paddingX}px`,
          gap: metrics.gap,
          backgroundColor: bgColor,
          border: `${borderWidth}px solid ${borderColor}`,
          borderRadius: metrics.radius,
          boxShadow: shadow,
        }}
      >
        <span
          className="truncate"
          style={{
            fontSize: `${metrics.fontSize}px`,
            color: placeholderColor,
          }}
        >
          {placeholder}
        </span>

        <span
          className="material-symbols-rounded shrink-0"
          style={{
            fontSize: metrics.iconSize,
            lineHeight: 1,
            color: arrowColor,
          }}
          aria-hidden="true"
        >
          expand_more
        </span>
      </div>

      {/* Supporting text below */}
      <span
        className="select-none leading-tight"
        style={{ fontSize: `${metrics.supportingSize}px`, color: supportingColor }}
      >
        {supportingText}
      </span>
    </div>
  )
}
