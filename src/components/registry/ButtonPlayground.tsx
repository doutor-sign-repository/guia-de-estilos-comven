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
  let typeClasses = 'bg-[#004185] text-white hover:bg-[#00346A] active:bg-[#002750] shadow-sm'
  if (type === 'Secondary') {
    typeClasses =
      'bg-transparent text-[#004185] border-2 border-[#004185] hover:bg-[#004185]/5 active:bg-[#004185]/10 font-bold'
  } else if (type === 'Tertiary') {
    typeClasses = 'bg-[#E6FAED] text-[#004185] hover:bg-[#CDF6DB] active:bg-[#9BECB8] font-semibold'
  } else if (type === 'Link') {
    typeClasses =
      'bg-transparent text-[#004185] underline underline-offset-4 hover:text-[#002750] active:text-[#001A35] font-semibold'
  }

  if (isDisabled) {
    if (type === 'Primary') {
      typeClasses = 'bg-[#8BB7E7] text-white cursor-not-allowed opacity-90 shadow-none'
    } else if (type === 'Secondary') {
      typeClasses =
        'bg-transparent text-[#8BB7E7] border-2 border-[#8BB7E7] cursor-not-allowed opacity-90 shadow-none'
    } else if (type === 'Tertiary') {
      typeClasses =
        'bg-[#F5F7FA] text-[#848484] border border-[#EBEBEB] cursor-not-allowed opacity-80'
    } else if (type === 'Link') {
      typeClasses =
        'bg-transparent text-[#8BB7E7] underline underline-offset-4 cursor-not-allowed opacity-90'
    }
  }

  // Exact Figma Prototype Link verbatim
  const FIGMA_PROTO_URL =
    'https://www.figma.com/proto/YEMa9j7O8aNm5PVmS8eSlC/Guia-de-Estilos?node-id=34-1734&viewport=-759%2C471%2C0.32&t=wAmAkj8XxXp7cOHD-1&scaling=contain&content-scaling=responsive&page-id=18%3A2'

  return (
    <div className="space-y-6">
      {/* Playground header & caption */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h4 className="text-xl font-bold text-[#141414]">
            Playground interativo — Instâncias do Button
          </h4>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#E6FAED] text-[#047D2E] text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#06D04D]" />
            Componente Oficial
          </span>
        </div>
        <p className="text-sm text-[#666666] mt-1">
          Navegue pelas propriedades de <strong>Type</strong>, <strong>Size</strong>,{' '}
          <strong>State</strong> e <strong>Ícone</strong> para inspecionar cada instância,
          visualizar em tempo real e copiar o CSS oficial correspondente.
        </p>
      </div>

      {/* Main 2-column or stacked grid */}
      <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 lg:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Properties / Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#EBEBEB]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#141414] flex items-center gap-2">
                <span
                  className="material-symbols-rounded text-[#004185]"
                  style={{ fontSize: '18px' }}
                >
                  tune
                </span>
                Propriedades
              </span>
              <span className="text-xs text-[#848484] font-medium">Configuração dinâmica</span>
            </div>

            {/* Label Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-2">
                Texto do Botão (Label)
              </label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Ex: Buscar, Continuar..."
                className="w-full px-3.5 py-2 text-sm bg-[#F5F7FA] border border-[#BFBFBF] rounded-lg text-[#141414] font-medium placeholder-[#848484] focus:outline-none focus:ring-2 focus:ring-[#004185] focus:border-transparent transition-all"
              />
            </div>

            {/* TYPE Controls */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#666666]">
                  T Y P E
                </span>
                <span className="text-[11px] text-[#004185] font-semibold">{type}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['Primary', 'Secondary', 'Tertiary', 'Link'] as ButtonType[]).map((t) => {
                  const isActive = type === t
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setType(t)}
                      className={`px-3 py-2 rounded-lg text-xs font-bold transition-all duration-150 text-center ${
                        isActive
                          ? 'bg-[#004185] text-white shadow-sm ring-2 ring-[#004185] ring-offset-1'
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
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#666666]">
                  S I Z E
                </span>
                <span className="text-[11px] text-[#004185] font-semibold">{size}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['Large', 'Medium', 'Small'] as ButtonSize[]).map((s) => {
                  const isActive = size === s
                  const sizeSubtitle =
                    s === 'Large' ? '48px / L' : s === 'Medium' ? '40px / M' : '32px / S'
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      className={`px-3 py-2 rounded-lg text-xs font-bold transition-all duration-150 flex flex-col items-center justify-center ${
                        isActive
                          ? 'bg-[#004185] text-white shadow-sm ring-2 ring-[#004185] ring-offset-1'
                          : 'bg-white text-[#141414] border border-[#BFBFBF] hover:border-[#004185] hover:bg-[#F5F7FA]'
                      }`}
                    >
                      <span>{s}</span>
                      <span
                        className={`text-[10px] font-normal ${isActive ? 'text-[#9DC6F3]' : 'text-[#848484]'}`}
                      >
                        {sizeSubtitle}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* STATE Controls */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#666666]">
                  S T A T E
                </span>
                <span className="text-[11px] text-[#004185] font-semibold">{state}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(['Default', 'Disabled'] as ButtonState[]).map((st) => {
                  const isActive = state === st
                  return (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setState(st)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-150 text-center ${
                        isActive
                          ? 'bg-[#004185] text-white shadow-sm ring-2 ring-[#004185] ring-offset-1'
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
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#666666]">
                  Í C O N E
                </span>
                <span className="text-[11px] text-[#004185] font-semibold">{icon}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(['Com ícone', 'Sem ícone'] as ButtonIconOption[]).map((ic) => {
                  const isActive = icon === ic
                  return (
                    <button
                      key={ic}
                      type="button"
                      onClick={() => setIcon(ic)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-150 flex items-center justify-center gap-1.5 ${
                        isActive
                          ? 'bg-[#004185] text-white shadow-sm ring-2 ring-[#004185] ring-offset-1'
                          : 'bg-white text-[#141414] border border-[#BFBFBF] hover:border-[#004185] hover:bg-[#F5F7FA]'
                      }`}
                    >
                      {ic === 'Com ícone' ? (
                        <span className="material-symbols-rounded" style={{ fontSize: '16px' }}>
                          search
                        </span>
                      ) : (
                        <span className="material-symbols-rounded" style={{ fontSize: '16px' }}>
                          title
                        </span>
                      )}
                      <span>{ic}</span>
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
                <span className="text-xs font-bold uppercase tracking-wider text-[#141414] flex items-center gap-2">
                  <span
                    className="material-symbols-rounded text-[#004185]"
                    style={{ fontSize: '18px' }}
                  >
                    visibility
                  </span>
                  Visualização em Tempo Real
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-[#F5F7FA] border border-[#EBEBEB] text-[#141414] font-mono">
                    {type} · {size} · {state} · {icon === 'Com ícone' ? 'Icon' : 'NoIcon'}
                  </span>
                </div>
              </div>

              {/* Preview Dropzone */}
              <div className="w-full min-h-[240px] bg-[#F5F7FA] rounded-xl border border-dashed border-[#BFBFBF] flex flex-col items-center justify-center p-8 transition-colors relative overflow-hidden">
                {/* Visual grid watermark in background */}
                <div
                  className="absolute inset-0 opacity-40 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #BFBFBF 1px, transparent 1px)',
                    backgroundSize: '16px 16px',
                  }}
                />

                <div className="relative z-10 flex flex-col items-center">
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

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-[#848484]">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#004185]" />
                      Fonte: Open Sans
                    </span>
                    <span>•</span>
                    <span>Raio: 8px</span>
                    <span>•</span>
                    <span>Gap: 8px</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Figma external link under preview */}
            <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#F5F7FA]">
              <a
                href={FIGMA_PROTO_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#004185] hover:underline"
              >
                <span className="material-symbols-rounded text-xs" style={{ fontSize: '15px' }}>
                  open_in_new
                </span>
                <span>Abrir protótipo no Figma (node 34:1734)</span>
              </a>
              <span className="text-[11px] text-[#848484]">Guia de Estilos · COMVEN DS v1.0</span>
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
