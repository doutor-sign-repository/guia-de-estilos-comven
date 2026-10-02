import React, { useState } from 'react'
import { InputConfig, InputState, InputSize, InputIconOption, generateInputCss } from './types'
import { INPUT_SIZE_METRICS } from './types'
import { PlaygroundControlGroup } from './PlaygroundControlGroup'
import { useToast } from '@/hooks/use-toast'

export interface InputPlaygroundProps {
  initialConfig?: Partial<InputConfig>
}

const LEFT_ICON_NAME = 'search'
const RIGHT_ICON_NAME = 'category'

const STATUSES: InputState[] = ['Default', 'Focus', 'Error', 'Disabled']
const SIZES: InputSize[] = ['Large', 'Medium', 'Small', 'XSmall']
const ICON_OPTIONS: InputIconOption[] = ['Com ícone', 'Sem ícone']

export const InputPlayground: React.FC<InputPlaygroundProps> = ({ initialConfig }) => {
  const { toast } = useToast()

  const [state, setState] = useState<InputState>(initialConfig?.state || 'Default')
  const [size, setSize] = useState<InputSize>(initialConfig?.size || 'Large')
  const [leftIcon, setLeftIcon] = useState<InputIconOption>(initialConfig?.leftIcon || 'Com ícone')
  const [rightIcon, setRightIcon] = useState<InputIconOption>(
    initialConfig?.rightIcon || 'Com ícone',
  )
  const [label, setLabel] = useState(initialConfig?.label || 'Label')
  const [placeholder, setPlaceholder] = useState(initialConfig?.placeholder || 'Input')
  const [supportingText, setSupportingText] = useState(
    initialConfig?.supportingText || 'Supporting text',
  )
  const [copied, setCopied] = useState(false)

  const config: InputConfig = {
    state,
    size,
    leftIcon,
    rightIcon,
    label,
    placeholder,
    supportingText,
  }
  const cssCode = generateInputCss(config)

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
      {/* 02 Input — Section Header */}
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-[#004185] text-white flex items-center justify-center font-bold text-base shrink-0 select-none">
          02
        </div>
        <div className="pt-0.5">
          <h2 className="text-2xl sm:text-[28px] font-bold text-[#141414] leading-tight tracking-tight">
            Input
          </h2>
          <p className="text-sm sm:text-[15px] text-[#666666] mt-1 font-normal">
            4 estados × 4 tamanhos — com ícone de busca, ícone auxiliar, label e supporting text
            configuráveis
          </p>
        </div>
      </div>

      {/* Playground Section */}
      <div className="mt-8 pt-6 border-t border-[#F0F2F5]">
        {/* Playground header */}
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#141414]">
            Playground — exemplos com label, ícone e supporting text
          </h3>
          <p className="text-xs sm:text-sm text-[#7A7A7A] mt-1 font-normal">
            Clique em qualquer opção de State, Size ou Ícone abaixo para trocar a variante do campo
            de texto em tempo real.
          </p>
        </div>

        {/* Controls: STATE, SIZE, ÍCONE ESQUERDO, ÍCONE AUXILIAR — flex-wrap por grupo indivisível (cabe em 1 linha em telas largas; quebra de grupo inteiro ao reduzir) */}
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

          {/* ÍCONE ESQUERDO */}
          <PlaygroundControlGroup label="ÍCONE ESQUERDO">
            {ICON_OPTIONS.map((ic) => {
              const isSelected = leftIcon === ic
              return (
                <button
                  key={ic}
                  type="button"
                  onClick={() => setLeftIcon(ic)}
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

          {/* ÍCONE AUXILIAR DIREITO */}
          <PlaygroundControlGroup label="ÍCONE AUXILIAR">
            {ICON_OPTIONS.map((ic) => {
              const isSelected = rightIcon === ic
              return (
                <button
                  key={ic}
                  type="button"
                  onClick={() => setRightIcon(ic)}
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
        </div>

        {/* Live Preview Container */}
        <div className="mt-6 rounded-2xl bg-[#F5F7FA] p-6 sm:p-8 border border-[#EBEBEB]">
          {/* Top row: Preview at left, Figma Link at right */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            {/* Left: Input Preview */}
            <div className="flex-1 max-w-md">
              <InputPreview config={config} />
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
                htmlFor="input-playground-label"
                className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-1.5 block select-none"
              >
                LABEL
              </label>
              <input
                id="input-playground-label"
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
                htmlFor="input-playground-placeholder"
                className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-1.5 block select-none"
              >
                PLACEHOLDER
              </label>
              <input
                id="input-playground-placeholder"
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
                htmlFor="input-playground-supporting"
                className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-1.5 block select-none"
              >
                SUPPORTING TEXT
              </label>
              <input
                id="input-playground-supporting"
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

      {/* Galeria: os 4 estados × 4 tamanhos sobre fundo azul-marinho (fiel ao Figma) */}
      <StateGallery label={label} placeholder={placeholder} supportingText={supportingText} />
    </div>
  )
}

/** Resolves the visual style for a given input state (shared by preview and gallery). */
function getInputStateStyle(state: InputState): {
  borderColor: string
  borderWidth: number
  backgroundColor: string
  textColor: string
  placeholderColor: string
  iconColor: string
  labelColor: string
  supportingColor: string
  boxShadow?: string
  cursor: string
} {
  if (state === 'Focus') {
    return {
      borderColor: '#004185',
      borderWidth: 1.5,
      backgroundColor: '#FFFFFF',
      textColor: '#141414',
      placeholderColor: '#667085',
      iconColor: '#004185',
      labelColor: '#004185',
      supportingColor: '#667085',
      boxShadow: '0 0 0 1px #004185',
      cursor: 'text',
    }
  }
  if (state === 'Error') {
    return {
      borderColor: '#E11D48',
      borderWidth: 1.5,
      backgroundColor: '#FFFFFF',
      textColor: '#141414',
      placeholderColor: '#667085',
      iconColor: '#E11D48',
      labelColor: '#E11D48',
      supportingColor: '#E11D48',
      boxShadow: '0 0 0 1px #E11D48',
      cursor: 'text',
    }
  }
  if (state === 'Disabled') {
    return {
      borderColor: '#E5E7EB',
      borderWidth: 1,
      backgroundColor: '#E5E7EB',
      textColor: '#9CA3AF',
      placeholderColor: '#9CA3AF',
      iconColor: '#9CA3AF',
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
    iconColor: '#667085',
    labelColor: '#344054',
    supportingColor: '#667085',
    cursor: 'text',
  }
}

/** Visual Input component (preview + gallery). State controls all colors. */
function InputPreview({ config, interactive }: { config: InputConfig; interactive?: boolean }) {
  const { state, size, leftIcon, rightIcon, label, placeholder, supportingText } = config
  const metrics = INPUT_SIZE_METRICS[size]
  const s = getInputStateStyle(state)
  const isDisabled = state === 'Disabled'

  return (
    <div className="flex flex-col" style={{ gap: 6 }}>
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

      {/* Field */}
      <div
        className="flex items-center w-full"
        style={{
          height: metrics.height,
          padding: `0 ${metrics.paddingX}px`,
          gap: metrics.gap,
          backgroundColor: s.backgroundColor,
          border: `${s.borderWidth}px solid ${s.borderColor}`,
          borderRadius: metrics.radius,
          boxShadow: s.boxShadow,
          cursor: s.cursor,
        }}
      >
        {leftIcon === 'Com ícone' && (
          <span
            className="material-symbols-rounded shrink-0"
            style={{ fontSize: metrics.iconSize, lineHeight: 1, color: s.iconColor }}
            aria-hidden="true"
          >
            {LEFT_ICON_NAME}
          </span>
        )}

        <input
          type="text"
          disabled={isDisabled}
          placeholder={placeholder || 'Input'}
          style={{
            fontSize: metrics.fontSize,
            color: s.textColor,
            caretColor: isDisabled ? 'transparent' : undefined,
          }}
          className="flex-1 min-w-0 bg-transparent border-0 outline-none p-0 h-full"
          readOnly={interactive ? undefined : true}
        />

        {rightIcon === 'Com ícone' && (
          <span
            className="material-symbols-rounded shrink-0"
            style={{ fontSize: metrics.iconSize, lineHeight: 1, color: s.iconColor }}
            aria-hidden="true"
          >
            {RIGHT_ICON_NAME}
          </span>
        )}
      </div>

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

/** Gallery of the 4 states × 4 sizes over the dark navy background (matching the Figma screenshot). */
function StateGallery({
  label,
  placeholder,
  supportingText,
}: Pick<InputConfig, 'label' | 'placeholder' | 'supportingText'>) {
  return (
    <div className="mt-10 pt-8 border-t border-[#F0F2F5]">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-[#141414]">
          Matriz completa de variações — Figma (4 estados × 4 tamanhos)
        </h3>
        <p className="text-xs sm:text-sm text-[#7A7A7A] mt-1 font-normal">
          Visualização em grid sobre o fundo azul-marinho oficial COMVEN (#062446), exatamente como
          especificado no arquivo de design.
        </p>
      </div>

      <div className="mt-5 rounded-2xl border border-[#0d3663] bg-[#062446] shadow-md p-6 sm:p-8">
        <div className="w-full space-y-6">
          {/* Header row with sizes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-2 border-b border-[#113C68] text-[11px] font-bold uppercase tracking-wider text-[#8BB7E7]">
            <div>Large (48px)</div>
            <div>Medium (40px)</div>
            <div>Small (36px)</div>
            <div>XSmall (32px)</div>
          </div>

          {/* Rows by state */}
          {STATUSES.map((st) => (
            <div key={st} className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#F2CB05] tracking-wide uppercase">
                  Estado: {st}
                </span>
                <div className="flex-1 h-px bg-[#113C68]/60" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
                {SIZES.map((sz) => (
                  <DarkInputCell
                    key={`${st}-${sz}`}
                    state={st}
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

/** Individual cell rendered on the dark background with high-contrast text matching the Figma board */
function DarkInputCell({
  state,
  size,
  label,
  placeholder,
  supportingText,
}: {
  state: InputState
  size: InputSize
  label: string
  placeholder: string
  supportingText: string
}) {
  const metrics = INPUT_SIZE_METRICS[size]
  const isDisabled = state === 'Disabled'

  // On dark background:
  let borderColor = '#D0D5DD'
  let borderWidth = 1
  let bgColor = '#FFFFFF'
  let labelColor = '#FFFFFF'
  let supportingColor = '#8BB7E7'
  let iconColor = '#667085'
  let textColor = '#141414'
  let shadow: string | undefined = undefined

  if (state === 'Focus') {
    borderColor = '#004185'
    borderWidth = 1.5
    labelColor = '#FFFFFF'
    supportingColor = '#8BB7E7'
    shadow = '0 0 0 1px #8BB7E7'
  } else if (state === 'Error') {
    borderColor = '#E11D48'
    borderWidth = 1.5
    labelColor = '#FFFFFF'
    supportingColor = '#FDA4AF'
    shadow = '0 0 0 1px #FDA4AF'
  } else if (state === 'Disabled') {
    borderColor = '#94A3B8'
    borderWidth = 1
    bgColor = '#E2E8F0'
    labelColor = '#94A3B8'
    supportingColor = '#64748B'
    iconColor = '#94A3B8'
    textColor = '#94A3B8'
  }

  return (
    <div className="flex flex-col w-full" style={{ gap: 5 }}>
      <span
        className="font-bold select-none leading-tight"
        style={{ fontSize: `${metrics.labelSize}px`, color: labelColor }}
      >
        {label}
      </span>

      <div
        className="flex items-center w-full"
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
          className="material-symbols-rounded shrink-0"
          style={{ fontSize: metrics.iconSize, lineHeight: 1, color: iconColor }}
          aria-hidden="true"
        >
          {LEFT_ICON_NAME}
        </span>

        <input
          type="text"
          disabled={isDisabled}
          placeholder={placeholder}
          readOnly
          style={{
            fontSize: metrics.fontSize,
            color: textColor,
          }}
          className="flex-1 min-w-0 bg-transparent border-0 outline-none p-0 h-full placeholder:text-[#667085]"
        />

        <span
          className="material-symbols-rounded shrink-0"
          style={{ fontSize: metrics.iconSize, lineHeight: 1, color: iconColor }}
          aria-hidden="true"
        >
          {RIGHT_ICON_NAME}
        </span>
      </div>

      <span
        className="select-none leading-tight"
        style={{ fontSize: `${metrics.supportingSize}px`, color: supportingColor }}
      >
        {supportingText}
      </span>
    </div>
  )
}
