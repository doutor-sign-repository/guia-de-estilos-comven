import React, { useState } from 'react'
import {
  AccordionConfig,
  AccordionVariant,
  AccordionSize,
  AccordionState,
  AccordionMode,
  AccordionItemData,
  generateAccordionCss,
  ACCORDION_SIZE_METRICS,
} from './types'
import { PlaygroundControlGroup } from './PlaygroundControlGroup'
import { useToast } from '@/hooks/use-toast'

export interface AccordionPlaygroundProps {
  initialConfig?: Partial<AccordionConfig>
}

const ACCORDION_VARIANTS: AccordionVariant[] = ['Default', 'Separado', 'Subtil']
const ACCORDION_SIZES: AccordionSize[] = ['Large', 'Medium', 'Small']
const ACCORDION_STATES: AccordionState[] = ['Default', 'Hover', 'Focado', 'Disabled']
const ACCORDION_MODES: AccordionMode[] = ['Single', 'Multiple']

const DEFAULT_ITEMS: AccordionItemData[] = [
  {
    id: 'acc-1',
    title: 'Como funciona o faturamento integrado COMVEN?',
    content:
      'O faturamento integrado consolida pedidos expedidos, notas fiscais eletrônicas e conciliação bancária automaticamente no fim de cada ciclo financeiro.',
  },
  {
    id: 'acc-2',
    title: 'Quais são as políticas de entrega e prazos operacionais?',
    content:
      'As remessas rodoviárias atendem prazos de 24h a 72h úteis para capitais e polos regionais, com rastreamento contínuo por telemetria e notificações automáticas.',
  },
  {
    id: 'acc-3',
    title: 'Requisitos de segurança e controle de acessos da rede',
    content:
      'Todos os acessos administrativos exigem autenticação de dois fatores (2FA), registro completo de auditoria por perfil e isolamento rigoroso por operadora parceira.',
  },
]

export const AccordionPlayground: React.FC<AccordionPlaygroundProps> = ({ initialConfig }) => {
  const { toast } = useToast()

  const [variant, setVariant] = useState<AccordionVariant>(initialConfig?.variant || 'Default')
  const [size, setSize] = useState<AccordionSize>(initialConfig?.size || 'Medium')
  const [state, setState] = useState<AccordionState>(initialConfig?.state || 'Default')
  const [mode, setMode] = useState<AccordionMode>(initialConfig?.mode || 'Single')

  // Editable accordion items
  const [items, setItems] = useState<AccordionItemData[]>(
    initialConfig?.items && initialConfig.items.length > 0 ? initialConfig.items : DEFAULT_ITEMS,
  )

  // Expanded items (stores IDs)
  const [expandedIds, setExpandedIds] = useState<string[]>(initialConfig?.expandedIds || ['acc-1'])

  const [copied, setCopied] = useState(false)

  const config: AccordionConfig = {
    variant,
    size,
    state,
    mode,
    items,
    expandedIds,
  }

  const cssCode = generateAccordionCss(config)

  const copyCss = () => {
    navigator.clipboard.writeText(cssCode)
    setCopied(true)
    toast({
      title: 'CSS Copiado!',
      description: 'Código CSS copiado para a área de transferência.',
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleToggleItem = (id: string) => {
    if (state === 'Disabled') return

    setExpandedIds((prev) => {
      const isCurrentlyOpen = prev.includes(id)
      if (mode === 'Single') {
        // Toggle single: if already open, close it; else open only this one
        return isCurrentlyOpen ? [] : [id]
      } else {
        // Multiple mode: toggle this specific id
        return isCurrentlyOpen ? prev.filter((item) => item !== id) : [...prev, id]
      }
    })
  }

  const handleItemTitleChange = (index: number, newTitle: string) => {
    setItems((prev) => prev.map((it, i) => (i === index ? { ...it, title: newTitle } : it)))
  }

  const handleItemContentChange = (index: number, newContent: string) => {
    setItems((prev) => prev.map((it, i) => (i === index ? { ...it, content: newContent } : it)))
  }

  const addItem = () => {
    if (items.length >= 5) return
    const newId = `acc-${Date.now()}`
    const newIndex = items.length + 1
    setItems((prev) => [
      ...prev,
      {
        id: newId,
        title: `Pergunta ${newIndex} — Novo tópico informativo COMVEN`,
        content:
          'Detalhes adicionais sobre a diretriz ou processo operacional selecionado neste tópico.',
      },
    ])
  }

  const removeItem = (indexToRemove: number) => {
    if (items.length <= 2) return
    const removedItem = items[indexToRemove]
    setItems((prev) => prev.filter((_, i) => i !== indexToRemove))
    setExpandedIds((prev) => prev.filter((id) => id !== removedItem.id))
  }

  const FIGMA_PROTO_URL =
    'https://www.figma.com/proto/YEMa9j7O8aNm5PVmS8eSlC/Guia-de-Estilos?node-id=34-1734&viewport=-759%2C471%2C0.32&t=wAmAkj8XxXp7cOHD-1&scaling=contain&content-scaling=responsive&page-id=18%3A2'

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EBEBEB] shadow-sm">
      {/* Accordion Section Header */}
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-[#004185] text-white flex items-center justify-center font-bold text-base shrink-0 select-none">
          12
        </div>
        <div className="pt-0.5">
          <h2 className="text-2xl sm:text-[28px] font-bold text-[#141414] leading-tight tracking-tight">
            Accordion (Acordeão)
          </h2>
          <p className="text-sm sm:text-[15px] text-[#666666] mt-1 font-normal">
            3 variantes × 3 tamanhos × 4 estados × 2 modos de expansão — seções colapsáveis com
            transição suave, chevron animado e foco acessível COMVEN (#004185)
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
            Configure a variante, tamanho, estado interativo e modo de expansão (único ou múltiplo).
            Edite os títulos e descrições dos itens para testar o comportamento ao vivo.
          </p>
        </div>

        {/* Controls: flex-wrap com grupos padronizados indivisíveis */}
        <div className="mt-6 flex flex-wrap items-start gap-x-8 gap-y-4">
          {/* VARIANTE */}
          <PlaygroundControlGroup label="VARIANTE">
            {ACCORDION_VARIANTS.map((v) => {
              const isSelected = variant === v
              return (
                <button
                  key={v}
                  type="button"
                  onClick={() => setVariant(v)}
                  className={`h-8 px-3.5 rounded-md text-xs font-semibold transition-all select-none shrink-0 ${
                    isSelected
                      ? 'bg-[#004185] text-white shadow-xs'
                      : 'bg-[#F0F2F5] text-[#222222] hover:bg-[#E4E7EC]'
                  }`}
                >
                  {v}
                </button>
              )
            })}
          </PlaygroundControlGroup>

          {/* TAMANHO */}
          <PlaygroundControlGroup label="TAMANHO">
            {ACCORDION_SIZES.map((sz) => {
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

          {/* ESTADO */}
          <PlaygroundControlGroup label="ESTADO">
            {ACCORDION_STATES.map((st) => {
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

          {/* MODO DE EXPANSÃO */}
          <PlaygroundControlGroup label="EXPANSÃO">
            {ACCORDION_MODES.map((md) => {
              const isSelected = mode === md
              return (
                <button
                  key={md}
                  type="button"
                  onClick={() => {
                    setMode(md)
                    // If switching to Single and multiple are open, keep only the first
                    if (md === 'Single' && expandedIds.length > 1) {
                      setExpandedIds([expandedIds[0]])
                    }
                  }}
                  className={`h-8 px-3.5 rounded-md text-xs font-semibold transition-all select-none shrink-0 ${
                    isSelected
                      ? 'bg-[#004185] text-white shadow-xs'
                      : 'bg-[#F0F2F5] text-[#222222] hover:bg-[#E4E7EC]'
                  }`}
                >
                  {md === 'Single' ? 'Único (Single)' : 'Múltiplo (Multi)'}
                </button>
              )
            })}
          </PlaygroundControlGroup>
        </div>

        {/* Text Edit Fields: ITENS DO ACORDEÃO */}
        <div className="mt-6 pt-5 border-t border-[#F0F2F5]">
          <div className="flex items-center justify-between mb-3 max-w-4xl">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] select-none">
              CONTEÚDO DOS ITENS ({items.length}/5)
            </span>
            {items.length < 5 && (
              <button
                type="button"
                onClick={addItem}
                className="text-xs font-semibold text-[#004185] hover:underline inline-flex items-center gap-1"
              >
                <span className="material-symbols-rounded text-sm" style={{ fontSize: '14px' }}>
                  add
                </span>
                <span>Adicionar item</span>
              </button>
            )}
          </div>

          <div className="space-y-3 max-w-4xl">
            {items.map((it, idx) => (
              <div
                key={it.id}
                className="p-3.5 rounded-xl border border-[#E2E6EB] bg-[#FAFCFE] space-y-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-[11px] font-bold text-[#004185] shrink-0">
                      Item #{idx + 1}
                    </span>
                    <input
                      type="text"
                      value={it.title}
                      onChange={(e) => handleItemTitleChange(idx, e.target.value)}
                      placeholder={`Título do item ${idx + 1}`}
                      className="flex-1 h-7 px-2.5 rounded border border-[#D5DCE5] bg-white text-xs font-semibold text-[#141414] outline-none focus:border-[#004185] focus:ring-1 focus:ring-[#004185] transition-colors"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleItem(it.id)}
                      className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors ${
                        expandedIds.includes(it.id)
                          ? 'bg-[#004185] text-white'
                          : 'bg-white border border-[#D5DCE5] text-[#555]'
                      }`}
                    >
                      {expandedIds.includes(it.id) ? 'Aberto' : 'Fechado'}
                    </button>

                    {items.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeItem(idx)}
                        title="Remover item"
                        className="w-6 h-6 inline-flex items-center justify-center rounded text-[#888888] hover:text-[#CC0000] hover:bg-[#FFE5E5] transition-colors"
                      >
                        <span className="material-symbols-rounded" style={{ fontSize: '15px' }}>
                          close
                        </span>
                      </button>
                    )}
                  </div>
                </div>

                <textarea
                  value={it.content}
                  onChange={(e) => handleItemContentChange(idx, e.target.value)}
                  rows={2}
                  placeholder={`Conteúdo detalhado do item ${idx + 1}`}
                  className="w-full p-2 rounded border border-[#D5DCE5] bg-white text-xs font-normal text-[#4A5568] outline-none focus:border-[#004185] focus:ring-1 focus:ring-[#004185] transition-colors resize-none"
                />
              </div>
            ))}
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
                Clique nos cabeçalhos para expandir ou colapsar os itens em tempo real.
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

          {/* Accordion Component Live */}
          <div className="w-full max-w-3xl py-2">
            <SingleAccordionPreview
              config={config}
              expandedIds={expandedIds}
              onToggle={handleToggleItem}
            />
          </div>

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
      <AccordionStateGallery items={items} />
    </div>
  )
}

/** Render preview of a single interactive Accordion */
export function SingleAccordionPreview({
  config,
  expandedIds,
  onToggle,
  className = '',
}: {
  config: AccordionConfig
  expandedIds: string[]
  onToggle?: (id: string) => void
  className?: string
}) {
  const { variant, size, state, items } = config
  const metrics = ACCORDION_SIZE_METRICS[size] || ACCORDION_SIZE_METRICS.Medium

  const isDisabled = state === 'Disabled'
  const isSeparated = variant === 'Separado'
  const isSubtle = variant === 'Subtil'

  const containerBorder = isSeparated
    ? 'border-none'
    : isSubtle
      ? 'border border-[#E2E6EB] rounded-xl shadow-2xs'
      : 'border border-[#D5DCE5] rounded-xl shadow-xs'

  return (
    <div
      className={`w-full flex flex-col ${containerBorder} overflow-hidden ${className}`}
      style={{
        gap: isSeparated ? `${metrics.gap}px` : '0px',
      }}
    >
      {items.map((item, index) => {
        const isOpen = expandedIds.includes(item.id)
        const isLast = index === items.length - 1

        return (
          <SingleAccordionItemRow
            key={item.id}
            item={item}
            isOpen={isOpen}
            isDisabled={isDisabled}
            state={state}
            variant={variant}
            size={size}
            isLast={isLast}
            onToggle={() => onToggle?.(item.id)}
          />
        )
      })}
    </div>
  )
}

/** Single row item inside an Accordion */
function SingleAccordionItemRow({
  item,
  isOpen,
  isDisabled,
  state,
  variant,
  size,
  isLast,
  onToggle,
}: {
  item: AccordionItemData
  isOpen: boolean
  isDisabled: boolean
  state: AccordionState
  variant: AccordionVariant
  size: AccordionSize
  isLast: boolean
  onToggle?: () => void
}) {
  const metrics = ACCORDION_SIZE_METRICS[size] || ACCORDION_SIZE_METRICS.Medium
  const [localHover, setLocalHover] = useState(false)

  const isHovered = (state === 'Hover' || localHover) && !isDisabled
  const isFocado = state === 'Focado' && !isDisabled

  const isSeparated = variant === 'Separado'

  // Outline COMVEN: estritamente 1px em azul #004185
  const outlineRule = isFocado ? '1px solid #004185' : 'none'

  let headerBg = '#FFFFFF'
  let titleColor = '#141414'
  let iconColor = '#004185'

  if (isDisabled) {
    headerBg = '#F5F7FA'
    titleColor = '#9CA3AF'
    iconColor = '#9CA3AF'
  } else if (isOpen) {
    headerBg = isHovered ? '#EDF4FC' : '#F4F8FD'
    titleColor = '#004185'
    iconColor = '#004185'
  } else if (isHovered) {
    headerBg = '#F8FAFC'
    titleColor = '#004185'
    iconColor = '#004185'
  }

  const itemBorder = isSeparated
    ? 'border border-[#D5DCE5] rounded-xl overflow-hidden shadow-2xs'
    : isLast
      ? ''
      : 'border-b border-[#E2E6EB]'

  return (
    <div className={`w-full transition-all duration-200 ${itemBorder}`}>
      <button
        type="button"
        disabled={isDisabled}
        onClick={onToggle}
        onMouseEnter={() => setLocalHover(true)}
        onMouseLeave={() => setLocalHover(false)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between text-left transition-colors duration-150 select-none group focus:outline-none"
        style={{
          padding: `${metrics.headerPaddingY}px ${metrics.headerPaddingX}px`,
          backgroundColor: headerBg,
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          outline: outlineRule,
          outlineOffset: '-1px',
        }}
      >
        <span
          className="font-semibold leading-snug transition-colors duration-150 pr-4"
          style={{
            fontSize: `${metrics.titleFontSize}px`,
            color: titleColor,
            fontFamily: "'Open Sans', sans-serif",
          }}
        >
          {item.title}
        </span>

        {/* Chevron rotacionando com transição suave */}
        <span
          className="shrink-0 flex items-center justify-center transition-transform duration-250 ease-out"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            color: iconColor,
          }}
        >
          <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: `${metrics.iconSize}px`, height: `${metrics.iconSize}px` }}
          >
            <polyline points="4 7 10 13 16 7" />
          </svg>
        </span>
      </button>

      {/* Accordion Content collapsible */}
      {isOpen && (
        <div
          className="border-t border-[#E8EFF7] bg-[#FAFCFE] transition-all duration-200"
          style={{
            padding: `${metrics.headerPaddingY}px ${metrics.headerPaddingX}px`,
          }}
        >
          <p
            className="leading-relaxed font-normal"
            style={{
              fontSize: `${metrics.contentFontSize}px`,
              color: isDisabled ? '#9CA3AF' : '#4A5568',
              fontFamily: "'Open Sans', sans-serif",
            }}
          >
            {item.content}
          </p>
        </div>
      )}
    </div>
  )
}

/** Complete variation matrix for Accordion over #062446 navy background without internal scroll */
function AccordionStateGallery({ items }: { items: AccordionItemData[] }) {
  const blocks: Array<{
    state: AccordionState
    badge: string
    description: string
  }> = [
    {
      state: 'Default',
      badge: '1. Estado Default (Padrão)',
      description:
        'Aparência padrão com bordas suaves, contraste nítido, chevron no azul primário e suporte a itens colapsados e expandidos.',
    },
    {
      state: 'Hover',
      badge: '2. Estado Hover (Ao passar o cursor)',
      description:
        'Feedback visual imediato ao passar o cursor sobre o cabeçalho, com destaque em azul COMVEN #004185 e fundo atenuado.',
    },
    {
      state: 'Focado',
      badge: '3. Estado Focado (Active / Foco por Teclado)',
      description:
        'Outline acessível de exatamente 1px em azul COMVEN #004185 (regra rígida do guia de estilos: sempre 1px, nunca maior) ao redor do cabeçalho focado.',
    },
    {
      state: 'Disabled',
      badge: '4. Estado Disabled (Desabilitado)',
      description:
        'Acordeão bloqueado e não interagível com preenchimento acinzentado suave, cursor not-allowed e texto atenuado.',
    },
  ]

  const item1 = items[0] || DEFAULT_ITEMS[0]
  const item2 = items[1] || DEFAULT_ITEMS[1]

  return (
    <div className="mt-10 pt-8 border-t border-[#F0F2F5]">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-[#141414]">
          Matriz completa de variações — (4 estados × 3 tamanhos × Expandido &amp; Recolhido)
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
              {ACCORDION_SIZES.map((sz) => {
                const metrics = ACCORDION_SIZE_METRICS[sz]
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
                        Tamanho {sz}
                      </span>
                      <span className="text-[10px] text-[#A6C8EE] font-mono">
                        Header {metrics.titleFontSize}px / Chevron {metrics.iconSize}px
                      </span>
                    </div>

                    <div className="space-y-3 py-1">
                      {/* Item 1: Expandido */}
                      <div
                        className="rounded-lg overflow-hidden border transition-all"
                        style={{
                          borderColor: isDisabled
                            ? '#334862'
                            : isFocusState
                              ? '#F2CB05'
                              : isHoverState
                                ? '#60A5FA'
                                : '#1E4976',
                          outline: isFocusState && !isDisabled ? '1px solid #F2CB05' : 'none',
                        }}
                      >
                        {/* Header Expandido */}
                        <div
                          className="flex items-center justify-between transition-colors"
                          style={{
                            padding: `${metrics.headerPaddingY - 2}px ${metrics.headerPaddingX - 2}px`,
                            backgroundColor: isDisabled
                              ? '#1A3352'
                              : isHoverState
                                ? '#0B3A6E'
                                : '#072E58',
                          }}
                        >
                          <span
                            className="font-semibold truncate pr-2"
                            style={{
                              fontSize: `${metrics.titleFontSize}px`,
                              color: isDisabled ? '#6B8299' : isHoverState ? '#F2CB05' : '#FFFFFF',
                            }}
                          >
                            {item1.title}
                          </span>
                          <span
                            className="shrink-0 transition-transform"
                            style={{
                              transform: 'rotate(180deg)',
                              color: isDisabled ? '#6B8299' : '#F2CB05',
                            }}
                          >
                            <svg
                              viewBox="0 0 20 20"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              style={{
                                width: `${metrics.iconSize}px`,
                                height: `${metrics.iconSize}px`,
                              }}
                            >
                              <polyline points="4 7 10 13 16 7" />
                            </svg>
                          </span>
                        </div>

                        {/* Conteúdo Expandido */}
                        <div
                          className="border-t border-[#163B66] bg-[#001830]"
                          style={{
                            padding: `${metrics.headerPaddingY - 2}px ${metrics.headerPaddingX - 2}px`,
                          }}
                        >
                          <p
                            className="leading-relaxed"
                            style={{
                              fontSize: `${metrics.contentFontSize}px`,
                              color: isDisabled ? '#526980' : '#C4DCF7',
                            }}
                          >
                            {item1.content}
                          </p>
                          <span
                            className="inline-block mt-2 text-[10px] font-mono tracking-wider"
                            style={{ color: isDisabled ? '#526980' : '#8BB7E7' }}
                          >
                            Expandido · {b.state}
                          </span>
                        </div>
                      </div>

                      {/* Item 2: Recolhido */}
                      <div
                        className="rounded-lg overflow-hidden border transition-all"
                        style={{
                          borderColor: isDisabled ? '#24374D' : '#14385E',
                          backgroundColor: isDisabled ? '#152E4D' : '#031E3D',
                        }}
                      >
                        <div
                          className="flex items-center justify-between"
                          style={{
                            padding: `${metrics.headerPaddingY - 2}px ${metrics.headerPaddingX - 2}px`,
                          }}
                        >
                          <span
                            className="font-semibold truncate pr-2"
                            style={{
                              fontSize: `${metrics.titleFontSize}px`,
                              color: isDisabled ? '#6B8299' : '#D2E4F7',
                            }}
                          >
                            {item2.title}
                          </span>
                          <span
                            className="shrink-0"
                            style={{
                              transform: 'rotate(0deg)',
                              color: isDisabled ? '#526980' : '#7E9AB8',
                            }}
                          >
                            <svg
                              viewBox="0 0 20 20"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              style={{
                                width: `${metrics.iconSize}px`,
                                height: `${metrics.iconSize}px`,
                              }}
                            >
                              <polyline points="4 7 10 13 16 7" />
                            </svg>
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
