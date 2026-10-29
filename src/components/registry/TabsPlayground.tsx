import React, { useState } from 'react'
import {
  TabsConfig,
  TabsSize,
  TabsState,
  TabsIconOption,
  TabsBadgeOption,
  TabsWidth,
  TabItemData,
  TABS_SIZE_METRICS,
  generateTabsCss,
} from './types'
import { PlaygroundControlGroup } from './PlaygroundControlGroup'
import { useToast } from '@/hooks/use-toast'

export interface TabsPlaygroundProps {
  initialConfig?: Partial<TabsConfig>
}

const TABS_SIZES: TabsSize[] = ['Large', 'Medium', 'Small']
const TABS_STATES: TabsState[] = ['Default', 'Hover', 'Active', 'Disabled']
const TABS_ICONS: TabsIconOption[] = ['Com ícone', 'Sem ícone']
const TABS_BADGES: TabsBadgeOption[] = ['Sem badge', 'Com badge']
const TABS_WIDTHS: TabsWidth[] = ['Fit', 'Full']
const TABS_COUNTS = [2, 3, 4] as const

const DEFAULT_TAB_ITEMS: TabItemData[] = [
  {
    id: 'tab-1',
    label: 'Consulta Veicular (Placa)',
    icon: 'directions_car',
    badge: '12',
    content:
      'Módulo de consulta rápida por placa: dados cadastrais, histórico de infrações, restrições financeiras e situação de licenciamento em âmbito nacional.',
  },
  {
    id: 'tab-2',
    label: 'Consulta Veicular Premium',
    icon: 'verified',
    badge: 'Novo',
    content:
      'Relatório completo com análise de sinistros, leilões, passagem por seguradoras, histórico de proprietários e laudo cautelar consolidado.',
  },
  {
    id: 'tab-3',
    label: 'Histórico de Frotas',
    icon: 'local_shipping',
    badge: '5',
    content:
      'Painel gerencial de frota com telemetria agregada, rotas ativas, consumo de combustível e alertas de manutenção preventiva preventiva.',
  },
  {
    id: 'tab-4',
    label: 'Configurações de Acesso',
    icon: 'tune',
    content:
      'Gestão de chaves de API, webhooks de sincronização em tempo real e regras de rate limiting para os serviços COMVEN.',
  },
]

export const TabsPlayground: React.FC<TabsPlaygroundProps> = ({ initialConfig }) => {
  const { toast } = useToast()

  const [tabCount, setTabCount] = useState<number>(
    initialConfig?.items?.length ? initialConfig.items.length : 2,
  )
  const [activeTabId, setActiveTabId] = useState<string>(
    initialConfig?.activeTabId || DEFAULT_TAB_ITEMS[0].id,
  )
  const [size, setSize] = useState<TabsSize>(initialConfig?.size || 'Large')
  const [state, setState] = useState<TabsState>(initialConfig?.state || 'Default')
  const [icon, setIcon] = useState<TabsIconOption>(initialConfig?.icon || 'Sem ícone')
  const [badge, setBadge] = useState<TabsBadgeOption>(initialConfig?.badge || 'Sem badge')
  const [width, setWidth] = useState<TabsWidth>(initialConfig?.width || 'Fit')

  // Textos editáveis das abas (simulação de texto editável padrão do guia)
  const [tab1Label, setTab1Label] = useState<string>(
    initialConfig?.items?.[0]?.label ?? DEFAULT_TAB_ITEMS[0].label,
  )
  const [tab2Label, setTab2Label] = useState<string>(
    initialConfig?.items?.[1]?.label ?? DEFAULT_TAB_ITEMS[1].label,
  )
  const [tab3Label, setTab3Label] = useState<string>(
    initialConfig?.items?.[2]?.label ?? DEFAULT_TAB_ITEMS[2].label,
  )
  const [tab4Label, setTab4Label] = useState<string>(
    initialConfig?.items?.[3]?.label ?? DEFAULT_TAB_ITEMS[3].label,
  )

  const [copied, setCopied] = useState(false)

  // Monta lista de tabs ativas
  const currentLabels = [tab1Label, tab2Label, tab3Label, tab4Label]
  const currentItems: TabItemData[] = DEFAULT_TAB_ITEMS.slice(0, tabCount).map((item, idx) => ({
    ...item,
    label: currentLabels[idx] || item.label,
  }))

  // Garante que a tab ativa existe no array atual
  const effectiveActiveTabId = currentItems.some((it) => it.id === activeTabId)
    ? activeTabId
    : currentItems[0].id

  const config: TabsConfig = {
    size,
    state,
    icon,
    badge,
    width,
    activeTabId: effectiveActiveTabId,
    items: currentItems,
  }

  const cssCode = generateTabsCss(config)

  const copyCss = () => {
    navigator.clipboard.writeText(cssCode)
    setCopied(true)
    toast({
      title: 'CSS Copiado!',
      description: 'Código CSS de Tabs copiado para a área de transferência.',
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const FIGMA_PROTO_URL =
    'https://www.figma.com/proto/YEMa9j7O8aNm5PVmS8eSlC/Guia-de-Estilos?node-id=34-1734&viewport=-759%2C471%2C0.32&t=wAmAkj8XxXp7cOHD-1&scaling=contain&content-scaling=responsive&page-id=18%3A2'

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EBEBEB] shadow-sm">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="pt-0.5">
          <h2 className="text-2xl sm:text-[28px] font-bold text-[#141414] leading-tight tracking-tight">
            Tabs (Sistema de Abas)
          </h2>
          <p className="text-sm sm:text-[15px] text-[#666666] mt-1 font-normal">
            Sistema de navegação por abas com linha divisória contínua, aba ativa em azul COMVEN
            (#004185) em peso bold com barra de underline marcante, e abas inativas em cinza médio
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
            Alterne entre quantidade de abas, tamanhos, estados, presença de ícone e badge. Clique
            nas abas para testar a transição ativa e o chaveamento de conteúdo.
          </p>
        </div>

        {/* Controls: Linha fluida com wrap por grupo indivisível */}
        <div className="mt-6 flex flex-wrap items-start gap-x-8 gap-y-4">
          {/* QUANTIDADE */}
          <PlaygroundControlGroup label="QUANTIDADE DE ABAS">
            {TABS_COUNTS.map((count) => {
              const isSelected = tabCount === count
              return (
                <button
                  key={count}
                  type="button"
                  onClick={() => {
                    setTabCount(count)
                    if (
                      !DEFAULT_TAB_ITEMS.slice(0, count).some(
                        (it) => it.id === effectiveActiveTabId,
                      )
                    ) {
                      setActiveTabId(DEFAULT_TAB_ITEMS[0].id)
                    }
                  }}
                  className={`h-8 px-3.5 rounded-md text-xs font-semibold transition-all select-none shrink-0 ${
                    isSelected
                      ? 'bg-[#004185] text-white shadow-xs'
                      : 'bg-[#F0F2F5] text-[#222222] hover:bg-[#E4E7EC]'
                  }`}
                >
                  {count} abas
                </button>
              )
            })}
          </PlaygroundControlGroup>

          {/* TAMANHO */}
          <PlaygroundControlGroup label="TAMANHO">
            {TABS_SIZES.map((sz) => {
              const isSelected = size === sz
              const labels: Record<TabsSize, string> = {
                Large: 'Large (16px)',
                Medium: 'Medium (14px)',
                Small: 'Small (13px)',
              }
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
                  {labels[sz]}
                </button>
              )
            })}
          </PlaygroundControlGroup>

          {/* ESTADO */}
          <PlaygroundControlGroup label="ESTADO (INSPEÇÃO)">
            {TABS_STATES.map((st) => {
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
            {TABS_ICONS.map((ic) => {
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

          {/* BADGE / CONTADOR */}
          <PlaygroundControlGroup label="BADGE / CONTADOR">
            {TABS_BADGES.map((bg) => {
              const isSelected = badge === bg
              return (
                <button
                  key={bg}
                  type="button"
                  onClick={() => setBadge(bg)}
                  className={`h-8 px-3.5 rounded-md text-xs font-semibold transition-all select-none shrink-0 ${
                    isSelected
                      ? 'bg-[#004185] text-white shadow-xs'
                      : 'bg-[#F0F2F5] text-[#222222] hover:bg-[#E4E7EC]'
                  }`}
                >
                  {bg}
                </button>
              )
            })}
          </PlaygroundControlGroup>

          {/* LARGURA */}
          <PlaygroundControlGroup label="LARGURA">
            {TABS_WIDTHS.map((w) => {
              const isSelected = width === w
              const labels: Record<TabsWidth, string> = {
                Fit: 'Ajustada (Fit)',
                Full: 'Largura total (Full)',
              }
              return (
                <button
                  key={w}
                  type="button"
                  onClick={() => setWidth(w)}
                  className={`h-8 px-3.5 rounded-md text-xs font-semibold transition-all select-none shrink-0 ${
                    isSelected
                      ? 'bg-[#004185] text-white shadow-xs'
                      : 'bg-[#F0F2F5] text-[#222222] hover:bg-[#E4E7EC]'
                  }`}
                >
                  {labels[w]}
                </button>
              )
            })}
          </PlaygroundControlGroup>
        </div>

        {/* Inputs de texto editável das abas */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label
              htmlFor="tab-label-1"
              className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-1.5 block select-none"
            >
              TEXTO ABA 1
            </label>
            <input
              id="tab-label-1"
              type="text"
              value={tab1Label}
              onChange={(e) => setTab1Label(e.target.value)}
              placeholder="Nome da aba 1"
              maxLength={40}
              className="w-full h-8 px-3 rounded-md border border-[#D5DCE5] bg-white text-xs font-medium text-[#141414] outline-none focus:border-[#004185] focus:ring-1 focus:ring-[#004185] transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="tab-label-2"
              className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-1.5 block select-none"
            >
              TEXTO ABA 2
            </label>
            <input
              id="tab-label-2"
              type="text"
              value={tab2Label}
              onChange={(e) => setTab2Label(e.target.value)}
              placeholder="Nome da aba 2"
              maxLength={40}
              className="w-full h-8 px-3 rounded-md border border-[#D5DCE5] bg-white text-xs font-medium text-[#141414] outline-none focus:border-[#004185] focus:ring-1 focus:ring-[#004185] transition-colors"
            />
          </div>

          {tabCount >= 3 && (
            <div>
              <label
                htmlFor="tab-label-3"
                className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-1.5 block select-none"
              >
                TEXTO ABA 3
              </label>
              <input
                id="tab-label-3"
                type="text"
                value={tab3Label}
                onChange={(e) => setTab3Label(e.target.value)}
                placeholder="Nome da aba 3"
                maxLength={40}
                className="w-full h-8 px-3 rounded-md border border-[#D5DCE5] bg-white text-xs font-medium text-[#141414] outline-none focus:border-[#004185] focus:ring-1 focus:ring-[#004185] transition-colors"
              />
            </div>
          )}

          {tabCount >= 4 && (
            <div>
              <label
                htmlFor="tab-label-4"
                className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-1.5 block select-none"
              >
                TEXTO ABA 4
              </label>
              <input
                id="tab-label-4"
                type="text"
                value={tab4Label}
                onChange={(e) => setTab4Label(e.target.value)}
                placeholder="Nome da aba 4"
                maxLength={40}
                className="w-full h-8 px-3 rounded-md border border-[#D5DCE5] bg-white text-xs font-medium text-[#141414] outline-none focus:border-[#004185] focus:ring-1 focus:ring-[#004185] transition-colors"
              />
            </div>
          )}
        </div>

        {/* Live Preview Container */}
        <div className="mt-6 rounded-2xl bg-[#F5F7FA] p-6 sm:p-8 border border-[#EBEBEB]">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            {/* Tabs Preview */}
            <div className="flex-1 w-full max-w-4xl py-1">
              <SingleTabsPreview config={config} onSelectTab={(id) => setActiveTabId(id)} />
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

      {/* Matriz Completa de Variações sobre fundo #062446 sem barras de scroll */}
      <TabsStateGallery currentLabels={currentLabels} />
    </div>
  )
}

/** Render preview of interactive Tabs */
export function SingleTabsPreview({
  config,
  onSelectTab,
  className = '',
}: {
  config: TabsConfig
  onSelectTab?: (id: string) => void
  className?: string
}) {
  const { size, icon, badge, width, state = 'Default', activeTabId, items } = config
  const metrics = TABS_SIZE_METRICS[size] || TABS_SIZE_METRICS.Large

  // Local active tab para garantir interatividade caso não passe callback externo
  const [internalActiveId, setInternalActiveId] = useState<string>(activeTabId || items[0]?.id)
  const currentActiveId = activeTabId || internalActiveId

  const activeItem = items.find((it) => it.id === currentActiveId) || items[0]

  const handleTabClick = (item: TabItemData) => {
    if (item.disabled || state === 'Disabled') return
    setInternalActiveId(item.id)
    onSelectTab?.(item.id)
  }

  return (
    <div
      className={`w-full flex flex-col bg-white rounded-xl p-5 sm:p-6 shadow-xs border border-[#EBEBEB] ${className}`}
    >
      {/* Tab List */}
      <div
        role="tablist"
        aria-orientation="horizontal"
        className="w-full flex items-end border-b border-[#DCE3EC] relative select-none"
      >
        {items.map((item) => {
          const isActive = item.id === currentActiveId
          const isDisabled = item.disabled || state === 'Disabled'
          const isHoverSimulated = state === 'Hover' && !isActive && !isDisabled

          let textColor = '#5A6472'
          let fontWeight = metrics.inactiveFontWeight
          let bgColor = 'transparent'

          if (isDisabled) {
            textColor = '#9CA3AF'
          } else if (isActive) {
            textColor = '#004185'
            fontWeight = metrics.activeFontWeight
          } else if (isHoverSimulated) {
            textColor = '#004185'
            bgColor = 'rgba(0, 65, 133, 0.04)'
          }

          return (
            <button
              key={item.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-disabled={isDisabled}
              disabled={isDisabled}
              onClick={() => handleTabClick(item)}
              style={{
                padding: `${metrics.paddingY}px ${metrics.paddingX}px`,
                fontSize: `${metrics.fontSize}px`,
                lineHeight: `${metrics.lineHeight}px`,
                fontWeight,
                color: textColor,
                backgroundColor: bgColor,
                gap: `${metrics.gap}px`,
              }}
              className={`relative inline-flex items-center justify-center transition-colors whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-[#004185] focus-visible:ring-offset-1 group ${
                width === 'Full' ? 'flex-1 text-center' : 'flex-none'
              } ${isDisabled ? 'cursor-not-allowed opacity-60' : isActive ? 'cursor-default' : 'cursor-pointer hover:text-[#004185] hover:bg-[#004185]/[0.04]'}`}
            >
              {/* Ícone opcional */}
              {icon === 'Com ícone' && item.icon && (
                <span
                  className="material-symbols-rounded shrink-0 transition-colors"
                  style={{
                    fontSize: `${metrics.iconSize}px`,
                    color: isActive ? '#004185' : isDisabled ? '#9CA3AF' : '#6B7280',
                  }}
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
              )}

              {/* Rótulo */}
              <span>{item.label}</span>

              {/* Badge opcional */}
              {badge === 'Com badge' && item.badge && (
                <span
                  style={{
                    padding: metrics.badgePadding,
                    fontSize: `${metrics.badgeFontSize}px`,
                  }}
                  className={`inline-flex items-center justify-center font-semibold rounded-full leading-none transition-colors ${
                    isActive
                      ? 'bg-[#004185] text-white'
                      : isDisabled
                        ? 'bg-[#E5E7EB] text-[#9CA3AF]'
                        : 'bg-[#EBF3FC] text-[#004185] group-hover:bg-[#004185] group-hover:text-white'
                  }`}
                >
                  {item.badge}
                </span>
              )}

              {/* Barra de underline grosso para aba ativa alinhada perfeitamente na base */}
              {isActive && (
                <span
                  style={{
                    height: `${metrics.indicatorHeight}px`,
                  }}
                  className="absolute bottom-[-1px] left-0 right-0 bg-[#004185] rounded-t-[2px] transition-all"
                  aria-hidden="true"
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Tab Panel / Conteúdo correspondente à aba ativa */}
      <div
        role="tabpanel"
        className="pt-6 pb-2 px-1 text-sm text-[#374151] animate-in fade-in-50 duration-200"
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#004185]">
            Conteúdo da Aba Ativa:
          </span>
          <span className="text-xs font-semibold text-[#141414] bg-[#F0F2F5] px-2.5 py-0.5 rounded-md">
            {activeItem?.label}
          </span>
        </div>
        <p className="text-[13px] sm:text-sm text-[#525252] leading-relaxed m-0">
          {activeItem?.content ||
            'Conteúdo demonstrativo sincronizado com o chaveamento das abas do componente.'}
        </p>
      </div>
    </div>
  )
}

/** Matriz completa de variações sobre fundo azul-marinho #062446 sem barras de scroll */
function TabsStateGallery({ currentLabels }: { currentLabels: string[] }) {
  const sampleItems: TabItemData[] = [
    {
      id: 'gallery-tab-1',
      label: currentLabels[0] || 'Consulta Veicular (Placa)',
      icon: 'directions_car',
      badge: '12',
    },
    {
      id: 'gallery-tab-2',
      label: currentLabels[1] || 'Consulta Veicular Premium',
      icon: 'verified',
      badge: 'Novo',
    },
    {
      id: 'gallery-tab-3',
      label: currentLabels[2] || 'Histórico de Frotas',
      icon: 'local_shipping',
      badge: '5',
    },
  ]

  const GALLERY_BLOCKS: Array<{
    title: string
    badge: string
    description: string
    icon: TabsIconOption
    badgeOption: TabsBadgeOption
  }> = [
    {
      title: 'Abas Textuais Simples',
      badge: 'Sem Ícone · Sem Badge',
      description:
        'Padrão canônico da referência visual COMVEN: texto com espaçamento balanceado e underline marcante.',
      icon: 'Sem ícone',
      badgeOption: 'Sem badge',
    },
    {
      title: 'Abas com Ícone',
      badge: 'Com Ícone · Sem Badge',
      description:
        'Ícones funcionais que reforçam o reconhecimento semiótico de cada seção do produto.',
      icon: 'Com ícone',
      badgeOption: 'Sem badge',
    },
    {
      title: 'Abas com Badge / Contador',
      badge: 'Com Ícone · Com Badge',
      description: 'Indicadores numéricos ou tags de novidade incorporadas ao rótulo da aba.',
      icon: 'Com ícone',
      badgeOption: 'Com badge',
    },
  ]

  return (
    <div className="mt-10 pt-8 border-t border-[#F0F2F5]">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-[#141414]">
          Matriz completa de variações — (3 tamanhos × 4 estados × com/sem ícone e badge)
        </h3>
        <p className="text-xs sm:text-sm text-[#7A7A7A] mt-1 font-normal">
          Visualização completa sobre o fundo azul-marinho oficial COMVEN (#062446), cobrindo Large,
          Medium e Small sem barras internas de scroll.
        </p>
      </div>

      <div className="mt-5 space-y-6">
        {GALLERY_BLOCKS.map((block) => (
          <div
            key={block.badge}
            className="rounded-2xl border border-[#0d3663] bg-[#062446] shadow-md p-6 sm:p-8"
          >
            {/* Header do Bloco */}
            <div className="pb-4 border-b border-[#113C68]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm sm:text-base font-bold text-[#F2CB05] tracking-wide uppercase">
                  {block.title} — {block.badge}
                </span>
                <span className="text-xs text-[#8BB7E7] font-medium">3 tamanhos × 4 estados</span>
              </div>
              <p className="text-xs text-[#D2E4F7] mt-1 font-normal">{block.description}</p>
            </div>

            {/* Colunas por tamanho */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 pb-2 border-b border-[#113C68]/60 text-[11px] font-bold uppercase tracking-wider text-[#8BB7E7]">
              <div>Large (16px · Padding 14×20 · Underline 3px)</div>
              <div>Medium (14px · Padding 12×16 · Underline 3px)</div>
              <div>Small (13px · Padding 9×12 · Underline 2.5px)</div>
            </div>

            {/* Linhas por Estado */}
            <div className="divide-y divide-[#113C68]/40">
              {TABS_STATES.map((st) => {
                const stateLabels: Record<TabsState, string> = {
                  Default: 'Estado Default (Aba 1 ativa, aba 2 inativa)',
                  Hover: 'Estado Hover (Simulação de cursor sobre aba inativa)',
                  Active: 'Estado Active / Selecionado',
                  Disabled: 'Estado Disabled (Interação desabilitada)',
                }

                return (
                  <div key={st} className="py-5 space-y-3">
                    {/* Badge do estado */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#F2CB05] tracking-wide uppercase">
                        {stateLabels[st]}
                      </span>
                      <div className="flex-1 h-px bg-[#113C68]/60" />
                    </div>

                    {/* Grid dos 3 tamanhos */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                      {TABS_SIZES.map((sz) => (
                        <div
                          key={`${block.badge}-${st}-${sz}`}
                          className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-[#E2E6EB]"
                        >
                          <DarkTabsCell
                            size={sz}
                            state={st}
                            icon={block.icon}
                            badge={block.badgeOption}
                            items={sampleItems}
                          />
                        </div>
                      ))}
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

/** Célula simplificada para renderização compacta na matriz sem scroll */
function DarkTabsCell({
  size,
  state,
  icon,
  badge,
  items,
}: {
  size: TabsSize
  state: TabsState
  icon: TabsIconOption
  badge: TabsBadgeOption
  items: TabItemData[]
}) {
  const metrics = TABS_SIZE_METRICS[size]

  return (
    <div className="w-full flex items-end border-b border-[#DCE3EC] relative select-none">
      {items.slice(0, 2).map((item, idx) => {
        const isFirst = idx === 0
        const isActive = state === 'Active' ? isFirst : isFirst && state !== 'Disabled'
        const isDisabled = state === 'Disabled'
        const isHover = state === 'Hover' && !isFirst && !isDisabled

        let textColor = '#5A6472'
        let fontWeight = metrics.inactiveFontWeight
        let bgColor = 'transparent'

        if (isDisabled) {
          textColor = '#9CA3AF'
        } else if (isActive) {
          textColor = '#004185'
          fontWeight = metrics.activeFontWeight
        } else if (isHover) {
          textColor = '#004185'
          bgColor = 'rgba(0, 65, 133, 0.04)'
        }

        return (
          <div
            key={item.id}
            style={{
              padding: `${metrics.paddingY}px ${metrics.paddingX}px`,
              fontSize: `${metrics.fontSize}px`,
              lineHeight: `${metrics.lineHeight}px`,
              fontWeight,
              color: textColor,
              backgroundColor: bgColor,
              gap: `${metrics.gap}px`,
            }}
            className="relative inline-flex items-center justify-center flex-1 text-center whitespace-nowrap"
          >
            {icon === 'Com ícone' && item.icon && (
              <span
                className="material-symbols-rounded shrink-0"
                style={{
                  fontSize: `${metrics.iconSize}px`,
                  color: isActive ? '#004185' : isDisabled ? '#9CA3AF' : '#6B7280',
                }}
              >
                {item.icon}
              </span>
            )}
            <span className="truncate">{item.label}</span>
            {badge === 'Com badge' && item.badge && (
              <span
                style={{
                  padding: metrics.badgePadding,
                  fontSize: `${metrics.badgeFontSize}px`,
                }}
                className={`inline-flex items-center justify-center font-semibold rounded-full leading-none ${
                  isActive ? 'bg-[#004185] text-white' : 'bg-[#EBF3FC] text-[#004185]'
                }`}
              >
                {item.badge}
              </span>
            )}
            {isActive && (
              <span
                style={{ height: `${metrics.indicatorHeight}px` }}
                className="absolute bottom-[-1px] left-0 right-0 bg-[#004185] rounded-t-[2px]"
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
