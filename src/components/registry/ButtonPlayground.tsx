import React from 'react'
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

export const ButtonPlayground: React.FC<ButtonPlaygroundProps> = () => {
  const { toast } = useToast()

  const [type, setType] = React.useState<ButtonType>('Primary')
  const [size, setSize] = React.useState<ButtonSize>('Large')
  const [state, setState] = React.useState<ButtonState>('Default')
  const [icon, setIcon] = React.useState<ButtonIconOption>('Com ícone')
  const [label, setLabel] = React.useState<string>('Buscar')
  const [copied, setCopied] = React.useState(false)

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

  // Compute live button styling
  const isDisabled = state === 'Disabled'

  // Padding
  let paddingClass = 'px-5 py-3 text-base'
  let iconSize = 20
  if (size === 'Medium') {
    paddingClass = 'px-4 py-2.5 text-sm'
    iconSize = 18
  } else if (size === 'Small') {
    paddingClass = 'px-3 py-2 text-xs'
    iconSize = 16
  }

  // Type styling
  let typeClasses = 'bg-[#004185] text-white hover:bg-[#00346A] active:scale-[0.98]'
  if (type === 'Secondary') {
    typeClasses =
      'bg-transparent text-[#004185] border-2 border-[#004185] hover:bg-[#004185]/5 active:scale-[0.98]'
  } else if (type === 'Tertiary') {
    typeClasses = 'bg-[#E6FAED] text-[#004185] hover:bg-[#CDF6DB] font-semibold active:scale-[0.98]'
  } else if (type === 'Link') {
    typeClasses =
      'bg-transparent text-[#004185] underline underline-offset-4 hover:opacity-80 active:scale-[0.98] font-semibold'
  }

  if (isDisabled) {
    if (type === 'Primary') {
      typeClasses = 'bg-[#666666] text-white opacity-40 cursor-not-allowed'
    } else if (type === 'Secondary') {
      typeClasses =
        'bg-transparent text-[#666666] border-2 border-[#666666] opacity-40 cursor-not-allowed'
    } else if (type === 'Tertiary') {
      typeClasses = 'bg-[#666666] text-white opacity-40 cursor-not-allowed'
    } else if (type === 'Link') {
      typeClasses = 'bg-transparent text-[#666666] underline opacity-40 cursor-not-allowed'
    }
  }

  return (
    <div className="space-y-6">
      {/* Playground header & caption */}
      <div>
        <h4 className="text-xl font-bold text-[#141414]">
          Playground — exemplos com ícone + label
        </h4>
        <p className="text-sm text-[#666666] mt-1">
          Clique em qualquer opção de Type, Size ou State abaixo para trocar a variante do botão de
          exemplo em tempo real.
        </p>
      </div>

      {/* Main 2-column or stacked grid */}
      <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 lg:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Properties / Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#EBEBEB]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#141414]">
                Propriedades
              </span>
              <span className="text-xs text-[#848484]">Configuração dinâmica</span>
            </div>

            {/* Label Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-2">
                Texto do Botão
              </label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Ex: Buscar, Continuar..."
                className="w-full px-3.5 py-2 text-sm bg-[#F5F7FA] border border-[#BFBFBF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004185] focus:border-transparent transition-all"
              />
            </div>

            {/* TYPE Controls */}
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#666666] mb-2">
                T Y P E
              </div>
              <div className="flex flex-wrap gap-2">
                {(['Primary', 'Secondary', 'Tertiary', 'Link'] as ButtonType[]).map((t) => {
                  const isActive = type === t
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setType(t)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                        isActive
                          ? 'bg-[#004185] text-white shadow-sm'
                          : 'bg-white text-[#141414] border border-[#BFBFBF] hover:border-[#004185] hover:bg-[#F5F7FA]'
                      }`}
                    >
                      {t}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* SIZE Controls */}
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#666666] mb-2">
                S I Z E
              </div>
              <div className="flex flex-wrap gap-2">
                {(['Large', 'Medium', 'Small'] as ButtonSize[]).map((s) => {
                  const isActive = size === s
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                        isActive
                          ? 'bg-[#004185] text-white shadow-sm'
                          : 'bg-white text-[#141414] border border-[#BFBFBF] hover:border-[#004185] hover:bg-[#F5F7FA]'
                      }`}
                    >
                      {s}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* STATE Controls */}
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#666666] mb-2">
                S T A T E
              </div>
              <div className="flex flex-wrap gap-2">
                {(['Default', 'Disabled'] as ButtonState[]).map((st) => {
                  const isActive = state === st
                  return (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setState(st)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                        isActive
                          ? 'bg-[#004185] text-white shadow-sm'
                          : 'bg-white text-[#141414] border border-[#BFBFBF] hover:border-[#004185] hover:bg-[#F5F7FA]'
                      }`}
                    >
                      {st}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* ICON Controls */}
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#666666] mb-2">
                Í C O N E
              </div>
              <div className="flex flex-wrap gap-2">
                {(['Com ícone', 'Sem ícone'] as ButtonIconOption[]).map((ic) => {
                  const isActive = icon === ic
                  return (
                    <button
                      key={ic}
                      type="button"
                      onClick={() => setIcon(ic)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                        isActive
                          ? 'bg-[#004185] text-white shadow-sm'
                          : 'bg-white text-[#141414] border border-[#BFBFBF] hover:border-[#004185] hover:bg-[#F5F7FA]'
                      }`}
                    >
                      {ic}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Live Preview + Figma link */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#EBEBEB] mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#141414]">
                  Visualização em Tempo Real
                </span>
                <span className="text-xs text-[#848484]">
                  {type} · {size} · {state}
                </span>
              </div>

              {/* Preview Dropzone */}
              <div className="w-full min-h-[220px] bg-[#F5F7FA] rounded-xl border border-dashed border-[#BFBFBF] flex flex-col items-center justify-center p-8 transition-colors">
                <button
                  type="button"
                  disabled={isDisabled}
                  className={`inline-flex items-center justify-center gap-2 rounded-lg font-bold transition-all duration-150 select-none ${paddingClass} ${typeClasses}`}
                >
                  {icon === 'Com ícone' && (
                    <span
                      className="material-symbols-rounded icon-outline"
                      style={{ fontSize: `${iconSize}px` }}
                    >
                      search
                    </span>
                  )}
                  <span>{label || 'Botão'}</span>
                </button>

                <p className="text-xs text-[#848484] mt-6">
                  Renderização fiel com tipografia Open Sans
                </p>
              </div>
            </div>

            {/* Figma external link under preview */}
            <div className="mt-4 pt-3 flex items-center justify-between">
              <a
                href="https://www.figma.com"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#004185] hover:underline"
              >
                <span>↗ Abrir componente no Figma</span>
              </a>
              <span className="text-[11px] text-[#848484]">v1.0 Component Specs</span>
            </div>
          </div>
        </div>

        {/* Dynamic CSS Terminal Code Output */}
        <div className="mt-8 pt-6 border-t border-[#EBEBEB]">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-bold tracking-widest text-[#141414] uppercase">
              A T R I B U T O S &nbsp; C S S
            </div>
            <button
              type="button"
              onClick={copyCss}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-[#141414] text-white rounded hover:bg-[#3D3D3D] transition-colors"
            >
              <span className="material-symbols-rounded text-xs" style={{ fontSize: '14px' }}>
                content_copy
              </span>
              <span>{copied ? 'Copiado!' : 'Copiar CSS'}</span>
            </button>
          </div>

          <div className="relative rounded-xl overflow-hidden bg-[#141414] text-[#F5F7FA] border border-[#292929] shadow-inner">
            {/* Terminal bar */}
            <div className="px-4 py-2 bg-[#222222] border-b border-[#2e2e2e] flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
              </div>
              <span className="text-[11px] text-[#848484] font-mono">button.styles.css</span>
            </div>

            <pre className="p-4 sm:p-5 text-xs sm:text-sm font-mono overflow-x-auto leading-relaxed text-[#CDF6DB]">
              <code>{cssCode}</code>
            </pre>
          </div>

          <div className="mt-2 text-right">
            <span className="text-[11px] text-[#848484]">Uso exclusivo para desenvolvedores</span>
          </div>
        </div>
      </div>
    </div>
  )
}
