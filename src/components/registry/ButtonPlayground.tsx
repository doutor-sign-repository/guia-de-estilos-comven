import React, { useState } from 'react'
import {
  ButtonConfig,
  ButtonType,
  ButtonSize,
  ButtonState,
  ButtonIconOption,
  generateButtonCss,
} from './types'
import { useToast } from '@/hooks/use-toast'

export interface ButtonPlaygroundProps {
  initialConfig?: Partial<ButtonConfig>
}

export const ButtonPlayground: React.FC<ButtonPlaygroundProps> = ({ initialConfig }) => {
  const { toast } = useToast()

  const [type, setType] = useState<ButtonType>(initialConfig?.type || 'Primary')
  const [size, setSize] = useState<ButtonSize>(initialConfig?.size || 'Large')
  const [state, setState] = useState<ButtonState>(initialConfig?.state || 'Default')
  const [icon, setIcon] = useState<ButtonIconOption>(initialConfig?.icon || 'Com ícone')
  const [copied, setCopied] = useState(false)

  const config: ButtonConfig = { type, size, state, icon, label: 'Buscar' }
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

  // Preview button styling
  const isDisabled = state === 'Disabled'

  // Size styling: controls typography and icon dimensions consistently across all variants
  let paddingClass = 'px-5 py-3 text-[16px] rounded-[8px]'
  let fontSizePx = 16
  let iconSize = 20
  if (size === 'Medium') {
    paddingClass = 'px-4 py-2.5 text-[14px] rounded-[8px]'
    fontSizePx = 14
    iconSize = 18
  } else if (size === 'Small') {
    paddingClass = 'px-3 py-2 text-[12px] rounded-[8px]'
    fontSizePx = 12
    iconSize = 16
  }

  // Type styling
  let dynamicButtonStyles: React.CSSProperties = {
    fontFamily: "'Open Sans', sans-serif",
    fontWeight: 700,
    fontSize: `${fontSizePx}px`,
  }

  if (type === 'Primary') {
    dynamicButtonStyles = {
      ...dynamicButtonStyles,
      backgroundColor: isDisabled ? '#A9BFDA' : '#004185',
      color: '#FFFFFF',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
    }
  } else if (type === 'Secondary') {
    dynamicButtonStyles = {
      ...dynamicButtonStyles,
      backgroundColor: 'transparent',
      color: isDisabled ? '#A9BFDA' : '#004185',
      border: `1.5px solid ${isDisabled ? '#A9BFDA' : '#004185'}`,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
    }
  } else if (type === 'Tertiary') {
    dynamicButtonStyles = {
      ...dynamicButtonStyles,
      backgroundColor: 'transparent',
      color: isDisabled ? '#A9BFDA' : '#004185',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
    }
  } else if (type === 'Link') {
    dynamicButtonStyles = {
      ...dynamicButtonStyles,
      backgroundColor: 'transparent',
      color: isDisabled ? '#A9BFDA' : '#004185',
      border: 'none',
      padding: '0px',
      textDecoration: 'none',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
    }
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
            4 tipos × 3 tamanhos × 2 estados — com ícone e texto configuráveis via painel de
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

        {/* Controls: TYPE, SIZE, STATE, ÍCONE */}
        <div className="mt-6 space-y-4">
          {/* Top row of controls: TYPE, SIZE, STATE */}
          <div className="flex flex-wrap items-start gap-x-8 gap-y-4">
            {/* TYPE */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-1.5">
                TYPE
              </div>
              <div className="inline-flex flex-wrap items-center gap-1.5">
                {(['Primary', 'Secondary', 'Tertiary', 'Link'] as ButtonType[]).map((t) => {
                  const isSelected = type === t
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setType(t)}
                      className={`h-8 px-3.5 rounded-md text-xs font-semibold transition-all select-none ${
                        isSelected
                          ? 'bg-[#004185] text-white shadow-xs'
                          : 'bg-[#F0F2F5] text-[#222222] hover:bg-[#E4E7EC]'
                      }`}
                    >
                      {t}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* SIZE */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-1.5">
                SIZE
              </div>
              <div className="inline-flex flex-wrap items-center gap-1.5">
                {(['Large', 'Medium', 'Small'] as ButtonSize[]).map((s) => {
                  const isSelected = size === s
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      className={`h-8 px-3.5 rounded-md text-xs font-semibold transition-all select-none ${
                        isSelected
                          ? 'bg-[#004185] text-white shadow-xs'
                          : 'bg-[#F0F2F5] text-[#222222] hover:bg-[#E4E7EC]'
                      }`}
                    >
                      {s}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* STATE */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-1.5">
                STATE
              </div>
              <div className="inline-flex flex-wrap items-center gap-1.5">
                {(['Default', 'Disabled'] as ButtonState[]).map((st) => {
                  const isSelected = state === st
                  return (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setState(st)}
                      className={`h-8 px-3.5 rounded-md text-xs font-semibold transition-all select-none ${
                        isSelected
                          ? 'bg-[#004185] text-white shadow-xs'
                          : 'bg-[#F0F2F5] text-[#222222] hover:bg-[#E4E7EC]'
                      }`}
                    >
                      {st}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Second row: ÍCONE */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-1.5">
              ÍCONE
            </div>
            <div className="inline-flex flex-wrap items-center gap-1.5">
              {(['Com ícone', 'Sem ícone'] as ButtonIconOption[]).map((ic) => {
                const isSelected = icon === ic
                return (
                  <button
                    key={ic}
                    type="button"
                    onClick={() => setIcon(ic)}
                    className={`h-8 px-3.5 rounded-md text-xs font-semibold transition-all select-none ${
                      isSelected
                        ? 'bg-[#004185] text-white shadow-xs'
                        : 'bg-[#F0F2F5] text-[#222222] hover:bg-[#E4E7EC]'
                    }`}
                  >
                    {ic}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Live Preview Container (Soft blue-gray box) */}
        <div className="mt-6 rounded-2xl bg-[#F5F7FA] p-6 sm:p-8 border border-[#EBEBEB]">
          {/* Top row: Button Preview at left, Figma Link at right */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            {/* Left: Button */}
            <div className="flex items-center min-h-[48px]">
              <button
                type="button"
                disabled={isDisabled}
                style={{
                  ...dynamicButtonStyles,
                  fontSize: `${fontSizePx}px`,
                }}
                className={`inline-flex items-center gap-2 font-bold transition-colors select-none ${
                  type === 'Link'
                    ? 'p-0 bg-transparent border-0 ' +
                      (isDisabled
                        ? 'text-[#A9BFDA]'
                        : 'text-[#004185] hover:text-[#00346A] active:text-[#002B59]')
                    : paddingClass
                }`}
              >
                {icon === 'Com ícone' && (
                  <span
                    className="material-symbols-rounded shrink-0"
                    style={{
                      fontSize: `${iconSize}px`,
                      lineHeight: 1,
                      color: 'inherit',
                    }}
                  >
                    search
                  </span>
                )}
                <span style={{ color: 'inherit', fontSize: `${fontSizePx}px` }}>Buscar</span>
              </button>
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
            <div className="bg-white rounded-xl border border-[#E2E6EB] p-5 sm:p-6 overflow-x-auto shadow-2xs">
              <pre className="text-xs sm:text-[13px] font-mono leading-relaxed text-[#1F2328] m-0 selection:bg-[#D2E4F7]">
                <code>{cssCode}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
