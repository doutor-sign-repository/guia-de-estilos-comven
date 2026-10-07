import React, { useState, useMemo } from 'react'
import {
  BreadcrumbConfig,
  BreadcrumbSize,
  BreadcrumbState,
  BreadcrumbSeparator,
  BreadcrumbIconOption,
  BreadcrumbItemData,
  BREADCRUMB_SIZE_METRICS,
  generateBreadcrumbCss,
} from './types'
import { PlaygroundControlGroup } from './PlaygroundControlGroup'
import { useToast } from '@/hooks/use-toast'

export interface BreadcrumbPlaygroundProps {
  initialConfig?: Partial<BreadcrumbConfig>
}

const BREADCRUMB_SIZES: BreadcrumbSize[] = ['Large', 'Medium', 'Small']
const BREADCRUMB_STATES: BreadcrumbState[] = ['Default', 'Hover', 'Focado', 'Disabled']
const BREADCRUMB_SEPARATORS: BreadcrumbSeparator[] = ['Chevron', 'Barra', 'MaiorQue']
const BREADCRUMB_ICONS: BreadcrumbIconOption[] = ['Com ícone', 'Sem ícone']

const DEFAULT_ITEMS: BreadcrumbItemData[] = [
  { id: 'level-1', label: 'Negócios', href: '#negocios', icon: 'storefront' },
  { id: 'level-2', label: 'Campanha', href: '#campanha', icon: 'campaign' },
  { id: 'level-3', label: 'Oferta', href: '#oferta', isCurrent: true, icon: 'local_offer' },
]

export const BreadcrumbPlayground: React.FC<BreadcrumbPlaygroundProps> = ({ initialConfig }) => {
  const { toast } = useToast()

  const [size, setSize] = useState<BreadcrumbSize>(initialConfig?.size || 'Large')
  const [state, setState] = useState<BreadcrumbState>(initialConfig?.state || 'Default')
  const [separator, setSeparator] = useState<BreadcrumbSeparator>(
    initialConfig?.separator || 'Chevron',
  )
  const [icon, setIcon] = useState<BreadcrumbIconOption>(initialConfig?.icon || 'Com ícone')
  const [markLastAsCurrent, setMarkLastAsCurrent] = useState<boolean>(
    initialConfig?.markLastAsCurrent !== undefined ? initialConfig.markLastAsCurrent : true,
  )

  const [items, setItems] = useState<BreadcrumbItemData[]>(
    initialConfig?.items && initialConfig.items.length >= 2 ? initialConfig.items : DEFAULT_ITEMS,
  )

  const [copied, setCopied] = useState(false)
  const [activeClickedLevel, setActiveClickedLevel] = useState<string | null>(null)

  const config: BreadcrumbConfig = useMemo(
    () => ({
      size,
      state,
      separator,
      icon,
      markLastAsCurrent,
      items,
    }),
    [size, state, separator, icon, markLastAsCurrent, items],
  )

  const cssCode = useMemo(() => generateBreadcrumbCss(config), [config])

  const copyCss = () => {
    navigator.clipboard.writeText(cssCode)
    setCopied(true)
    toast({
      title: 'CSS Copiado!',
      description:
        'As regras CSS do componente Breadcrumb foram copiadas para a área de transferência.',
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleLevelLabelChange = (index: number, newLabel: string) => {
    setItems((prev) => {
      const copy = [...prev]
      copy[index] = { ...copy[index], label: newLabel }
      return copy
    })
  }

  const addLevel = () => {
    if (items.length >= 5) return
    const newIdx = items.length + 1
    const defaultLabels = ['Negócios', 'Campanha', 'Oferta', 'Segmentação', 'Detalhes da Proposta']
    const icons = ['storefront', 'campaign', 'local_offer', 'filter_alt', 'description']
    const nextLabel = defaultLabels[newIdx - 1] || `Subnível ${newIdx}`
    const nextIcon = icons[newIdx - 1] || 'folder'

    setItems((prev) => [
      ...prev,
      {
        id: `level-${Date.now()}`,
        label: nextLabel,
        href: `#nivel-${newIdx}`,
        icon: nextIcon,
      },
    ])
  }

  const removeLevel = (indexToRemove: number) => {
    if (items.length <= 2) return
    setItems((prev) => prev.filter((_, idx) => idx !== indexToRemove))
  }

  const handleLevelClick = (item: BreadcrumbItemData, isCurrent: boolean) => {
    if (state === 'Disabled') return
    if (isCurrent) {
      toast({
        title: 'Página atual',
        description: `Você já está navegando no nível "${item.label}".`,
      })
      return
    }

    setActiveClickedLevel(item.label)
    toast({
      title: 'Navegação acionada',
      description: `Retornando para "${item.label}" na hierarquia da aplicação.`,
    })
    setTimeout(() => setActiveClickedLevel(null), 1500)
  }

  const FIGMA_PROTO_URL =
    'https://www.figma.com/proto/YEMa9j7O8aNm5PVmS8eSlC/Guia-de-Estilos?node-id=34-1734&viewport=-759%2C471%2C0.32&t=wAmAkj8XxXp7cOHD-1&scaling=contain&content-scaling=responsive&page-id=18%3A2'

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EBEBEB] shadow-sm">
      {/* Breadcrumb Section Header */}
      <div className="flex items-start gap-4">
        <div className="pt-0.5">
          <h2 className="text-2xl sm:text-[28px] font-bold text-[#141414] leading-tight tracking-tight">
            Breadcrumb (Trilha de Navegação)
          </h2>
          <p className="text-sm sm:text-[15px] text-[#666666] mt-1 font-normal">
            Trilha de navegação estrutural para produtos digitais COMVEN com hierarquias profundas —
            níveis clicáveis, foco de 1px em #004185 e último nível destacado como página ativa
          </p>
        </div>
      </div>

      {/* Bloco de Diretriz Oficial COMVEN (Discreto e Informativo) */}
      <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-[#F0F5FA] border border-[#D0E2F5] flex items-start gap-3.5">
        <span
          className="material-symbols-rounded text-[#004185] shrink-0 mt-0.5"
          style={{ fontSize: '22px' }}
          aria-hidden="true"
        >
          info
        </span>
        <div className="space-y-1 text-xs sm:text-[13px] text-[#1E3A5F] leading-relaxed">
          <div className="font-bold text-[#004185] uppercase tracking-wider text-[11px]">
            Diretriz Oficial de Uso · COMVEN
          </div>
          <p>
            Utilizar prioritariamente a partir de{' '}
            <strong>3 níveis de profundidade hierárquica</strong> (ex.:{' '}
            <em>Negócios &gt; Campanha &gt; Oferta</em>).
          </p>
          <p className="text-[#33567F]">
            Com apenas <strong>2 níveis</strong> somados à navegação lateral fixa, o breadcrumb se
            torna redundante. É um <strong>componente condicional</strong>, não obrigatório: inclua
            somente quando a aplicação tiver hierarquia profunda o suficiente para o usuário se
            desorientar na jornada.
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
            Configure o tamanho (Large, Medium, Small), o estado de interação dos links, o separador
            e a exibição de ícones. Edite o rótulo de cada nível e adicione ou remova níveis (2 a
            5).
          </p>
        </div>

        {/* Controls: flex-wrap com grupos padronizados indivisíveis (regra fixa: grupos quebram em bloco) */}
        <div className="mt-6 flex flex-wrap items-start gap-x-8 gap-y-4">
          {/* TAMANHO */}
          <PlaygroundControlGroup label="TAMANHO">
            {BREADCRUMB_SIZES.map((sz) => {
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

          {/* ESTADO DOS LINKS */}
          <PlaygroundControlGroup label="ESTADO DOS LINKS">
            {BREADCRUMB_STATES.map((st) => {
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

          {/* SEPARADOR */}
          <PlaygroundControlGroup label="SEPARADOR">
            {BREADCRUMB_SEPARATORS.map((sep) => {
              const isSelected = separator === sep
              const labels: Record<BreadcrumbSeparator, string> = {
                Chevron: 'Chevron (›)',
                Barra: 'Barra (/)',
                MaiorQue: 'Sinal (>)',
              }
              return (
                <button
                  key={sep}
                  type="button"
                  onClick={() => setSeparator(sep)}
                  className={`h-8 px-3.5 rounded-md text-xs font-semibold transition-all select-none shrink-0 ${
                    isSelected
                      ? 'bg-[#004185] text-white shadow-xs'
                      : 'bg-[#F0F2F5] text-[#222222] hover:bg-[#E4E7EC]'
                  }`}
                >
                  {labels[sep]}
                </button>
              )
            })}
          </PlaygroundControlGroup>

          {/* ÍCONE DE SUPORTE */}
          <PlaygroundControlGroup label="ÍCONES">
            {BREADCRUMB_ICONS.map((ic) => {
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

          {/* DESTAQUE DO ÚLTIMO NÍVEL */}
          <PlaygroundControlGroup label="PÁGINA ATUAL">
            <button
              type="button"
              onClick={() => setMarkLastAsCurrent(!markLastAsCurrent)}
              className={`h-8 px-3.5 rounded-md text-xs font-semibold transition-all select-none shrink-0 ${
                markLastAsCurrent
                  ? 'bg-[#004185] text-white shadow-xs'
                  : 'bg-[#F0F2F5] text-[#222222] hover:bg-[#E4E7EC]'
              }`}
            >
              {markLastAsCurrent ? 'Último = Atual (Negrito)' : 'Último clicável'}
            </button>
          </PlaygroundControlGroup>
        </div>

        {/* Níveis editáveis (mínimo 2, máximo 5) */}
        <div className="mt-6 pt-5 border-t border-[#F0F2F5]">
          <div className="flex items-center justify-between mb-3 max-w-4xl">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] select-none">
              NÍVEIS DA HIERARQUIA ({items.length}/5)
            </span>
            {items.length < 5 && (
              <button
                type="button"
                onClick={addLevel}
                className="text-xs font-semibold text-[#004185] hover:underline inline-flex items-center gap-1"
              >
                <span className="material-symbols-rounded text-sm" style={{ fontSize: '14px' }}>
                  add
                </span>
                <span>Adicionar nível</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl">
            {items.map((it, idx) => {
              const isLast = idx === items.length - 1
              return (
                <div
                  key={it.id}
                  className={`p-3 rounded-xl border transition-all ${
                    isLast && markLastAsCurrent
                      ? 'border-[#004185]/30 bg-[#F4F8FD]'
                      : 'border-[#E2E6EB] bg-[#FAFCFE]'
                  } space-y-2`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold text-[#004185]">Nível {idx + 1}</span>
                      {isLast && markLastAsCurrent && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#004185] text-white uppercase tracking-wider">
                          Atual
                        </span>
                      )}
                    </div>

                    {items.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeLevel(idx)}
                        title="Remover nível"
                        className="w-6 h-6 inline-flex items-center justify-center rounded text-[#888888] hover:text-[#CC0000] hover:bg-[#FFE5E5] transition-colors"
                      >
                        <span className="material-symbols-rounded" style={{ fontSize: '15px' }}>
                          close
                        </span>
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {icon === 'Com ícone' && it.icon && (
                      <span
                        className="material-symbols-rounded text-[#004185] shrink-0"
                        style={{ fontSize: '18px' }}
                      >
                        {it.icon}
                      </span>
                    )}
                    <input
                      type="text"
                      value={it.label}
                      onChange={(e) => handleLevelLabelChange(idx, e.target.value)}
                      placeholder="Rótulo do nível"
                      maxLength={32}
                      className="w-full h-8 px-2.5 rounded border border-[#D5DCE5] bg-white text-xs font-semibold text-[#141414] outline-none focus:border-[#004185] focus:ring-1 focus:ring-[#004185] transition-colors"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Live Preview Container */}
        <div className="mt-6 rounded-2xl bg-[#F5F7FA] p-6 sm:p-8 border border-[#EBEBEB]">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] block">
                PRÉVIA INTERATIVA
              </span>
              <p className="text-xs text-[#555555] mt-0.5">
                Clique nos níveis anteriores para testar a navegação. O último nível reflete a
                página atual ativa.
              </p>
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

          {/* Breadcrumb Live Preview Box */}
          <div className="w-full min-h-[72px] p-5 rounded-xl bg-white border border-[#E2E6EB] shadow-2xs flex items-center">
            <SingleBreadcrumbPreview config={config} onLevelClick={handleLevelClick} />
          </div>

          {activeClickedLevel && (
            <div className="mt-2 text-xs font-semibold text-[#047D2E] animate-in fade-in">
              ✓ Nível clicado com sucesso: &quot;{activeClickedLevel}&quot;
            </div>
          )}

          {/* ATRIBUTOS CSS Panel */}
          <div className="mt-8">
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
      <BreadcrumbStateGallery items={items} />
    </div>
  )
}

/**
 * Render preview of a single interactive Breadcrumb trail
 */
export function SingleBreadcrumbPreview({
  config,
  onLevelClick,
  className = '',
  darkMode = false,
}: {
  config: BreadcrumbConfig
  onLevelClick?: (item: BreadcrumbItemData, isCurrent: boolean) => void
  className?: string
  darkMode?: boolean
}) {
  const { size, state, separator, icon, markLastAsCurrent, items } = config
  const metrics = BREADCRUMB_SIZE_METRICS[size] || BREADCRUMB_SIZE_METRICS.Medium

  const renderSeparatorIcon = () => {
    if (separator === 'Barra') {
      return <span className="select-none font-normal">/</span>
    }
    if (separator === 'MaiorQue') {
      return <span className="select-none font-semibold">&gt;</span>
    }
    return (
      <span
        className="material-symbols-rounded leading-none select-none"
        style={{ fontSize: `${metrics.separatorSize}px` }}
      >
        chevron_right
      </span>
    )
  }

  return (
    <nav aria-label="Breadcrumb" className={`w-full ${className}`}>
      <ol
        className="flex flex-wrap items-center m-0 p-0 list-none"
        style={{ gap: `${metrics.containerGap}px` }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const isCurrent = isLast && markLastAsCurrent

          return (
            <React.Fragment key={item.id}>
              <li
                className="inline-flex items-center"
                style={{
                  fontSize: `${metrics.fontSize}px`,
                  lineHeight: `${metrics.lineHeight}px`,
                  gap: `${metrics.itemGap}px`,
                }}
              >
                <BreadcrumbLevelElement
                  item={item}
                  isCurrent={isCurrent}
                  size={size}
                  state={state}
                  showIcon={icon === 'Com ícone'}
                  darkMode={darkMode}
                  onClick={() => onLevelClick?.(item, isCurrent)}
                />
              </li>

              {!isLast && (
                <li
                  aria-hidden="true"
                  className="inline-flex items-center justify-center select-none"
                  style={{
                    color: darkMode ? '#8BB7E7' : '#7A7A7A',
                    opacity: darkMode ? 0.75 : 0.65,
                    fontSize: `${metrics.separatorSize}px`,
                  }}
                >
                  {renderSeparatorIcon()}
                </li>
              )}
            </React.Fragment>
          )
        })}
      </ol>
    </nav>
  )
}

/** Single item/node in the breadcrumb trail (either a link or current-page span) */
function BreadcrumbLevelElement({
  item,
  isCurrent,
  size,
  state,
  showIcon,
  darkMode,
  onClick,
}: {
  item: BreadcrumbItemData
  isCurrent: boolean
  size: BreadcrumbSize
  state: BreadcrumbState
  showIcon: boolean
  darkMode?: boolean
  onClick?: () => void
}) {
  const metrics = BREADCRUMB_SIZE_METRICS[size] || BREADCRUMB_SIZE_METRICS.Medium
  const [localHover, setLocalHover] = useState(false)

  const isDisabled = state === 'Disabled'
  const isHovered = (state === 'Hover' || localHover) && !isDisabled
  const isFocado = state === 'Focado' && !isDisabled

  // Outline COMVEN: estritamente 1px em azul #004185 (ou #F2CB05 em dark mode)
  const outlineRule = isFocado ? (darkMode ? '1px solid #F2CB05' : '1px solid #004185') : 'none'

  // Text color resolution
  let textColor = '#004185'
  let textWeight = 600
  let bgColor = 'transparent'
  let textDecoration = 'none'

  if (darkMode) {
    if (isDisabled) {
      textColor = '#5E7A9C'
    } else if (isCurrent) {
      textColor = '#FFFFFF'
      textWeight = 700
    } else if (isHovered) {
      textColor = '#F2CB05'
      textDecoration = 'underline'
      bgColor = 'rgba(255, 255, 255, 0.08)'
    } else if (isFocado) {
      textColor = '#8BB7E7'
      bgColor = 'rgba(255, 255, 255, 0.12)'
    } else {
      textColor = '#8BB7E7'
    }
  } else {
    if (isDisabled) {
      textColor = '#9CA3AF'
    } else if (isCurrent) {
      textColor = '#141414'
      textWeight = 700
    } else if (isHovered) {
      textColor = '#00346A'
      textDecoration = 'underline'
      bgColor = 'rgba(0, 65, 133, 0.04)'
    } else if (isFocado) {
      textColor = '#004185'
      bgColor = 'rgba(0, 65, 133, 0.08)'
    } else {
      textColor = '#004185'
    }
  }

  const cursorStyle = isDisabled ? 'not-allowed' : isCurrent ? 'default' : 'pointer'

  return (
    <button
      type="button"
      disabled={isDisabled}
      aria-current={isCurrent ? 'page' : undefined}
      onClick={onClick}
      onMouseEnter={() => setLocalHover(true)}
      onMouseLeave={() => setLocalHover(false)}
      className="inline-flex items-center rounded select-none transition-colors duration-150 focus:outline-none"
      style={{
        gap: `${metrics.itemGap}px`,
        color: textColor,
        fontWeight: textWeight,
        backgroundColor: bgColor,
        textDecoration,
        outline: outlineRule,
        outlineOffset: '1px',
        padding: `${metrics.paddingY}px ${metrics.paddingX}px`,
        cursor: cursorStyle,
        fontFamily: "'Open Sans', sans-serif",
      }}
    >
      {showIcon && item.icon && (
        <span
          className="material-symbols-rounded shrink-0"
          style={{
            fontSize: `${metrics.iconSize}px`,
            width: `${metrics.iconSize}px`,
            height: `${metrics.iconSize}px`,
          }}
        >
          {item.icon}
        </span>
      )}
      <span className="truncate">{item.label}</span>
    </button>
  )
}

/** Complete variation matrix for Breadcrumb over #062446 navy background without internal scroll */
function BreadcrumbStateGallery({ items }: { items: BreadcrumbItemData[] }) {
  const blocks: Array<{
    state: BreadcrumbState
    badge: string
    description: string
  }> = [
    {
      state: 'Default',
      badge: 'Estado Default (Padrão)',
      description:
        'Links de níveis anteriores em azul COMVEN com peso seminegrito; último nível destacado em branco puro como página atual.',
    },
    {
      state: 'Hover',
      badge: 'Estado Hover (Ao passar o cursor)',
      description:
        'Destaque no link com sublinhado e iluminação sutil indicando possibilidade de retorno na hierarquia.',
    },
    {
      state: 'Focado',
      badge: 'Estado Focado (Active / Foco por Teclado)',
      description:
        'Anel de foco acessível em conformidade estrita com o Guia COMVEN (1px em contraste acessível).',
    },
    {
      state: 'Disabled',
      badge: 'Estado Disabled (Desabilitado)',
      description:
        'Tonalidade atenuada e cursor desabilitado para trilhas estáticas ou contextos somente-leitura.',
    },
  ]

  return (
    <div className="mt-10 pt-8 border-t border-[#F0F2F5]">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-[#141414]">
          Matriz completa de variações — (4 estados × 3 tamanhos sobre fundo azul-marinho #062446)
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

            {/* Grid de tamanhos: Large, Medium, Small */}
            <div className="pt-6 space-y-5">
              {BREADCRUMB_SIZES.map((sz) => {
                const metrics = BREADCRUMB_SIZE_METRICS[sz]
                const configVariant: BreadcrumbConfig = {
                  size: sz,
                  state: b.state,
                  separator: 'Chevron',
                  icon: 'Com ícone',
                  markLastAsCurrent: true,
                  items,
                }

                return (
                  <div
                    key={`${b.state}-${sz}`}
                    className="p-5 rounded-xl bg-[#001D3D]/70 border border-[#113C68]/80 flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-[#113C68]/60">
                      <span className="text-[11px] font-bold tracking-wider uppercase text-[#8BB7E7]">
                        Tamanho {sz} ({metrics.fontSize}px)
                      </span>
                      <span className="text-[10px] text-[#A6C8EE] font-mono">
                        Line-height {metrics.lineHeight}px · Ícone {metrics.iconSize}px
                      </span>
                    </div>

                    <div className="py-2">
                      <SingleBreadcrumbPreview config={configVariant} darkMode={true} />
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
