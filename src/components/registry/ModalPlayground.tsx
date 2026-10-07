import React, { useState, useEffect } from 'react'
import {
  ModalConfig,
  ModalVariant,
  ModalSize,
  ModalState,
  ModalIconOption,
  generateModalCss,
  MODAL_SIZE_METRICS,
} from './types'
import { PlaygroundControlGroup } from './PlaygroundControlGroup'
import { useToast } from '@/hooks/use-toast'

export interface ModalPlaygroundProps {
  initialConfig?: Partial<ModalConfig>
}

const MODAL_VARIANTS: ModalVariant[] = ['Completo', 'Sem rodapé', 'Simples']
const MODAL_SIZES: ModalSize[] = ['Large', 'Medium', 'Small']
const MODAL_STATES: ModalState[] = ['Default', 'Hover']
const MODAL_ICONS: ModalIconOption[] = ['Com ícone', 'Sem ícone']

const DEFAULT_TITLE = 'Confirmar Atualização de Tabela'
const DEFAULT_CONTENT =
  'Deseja realmente aplicar as alterações tarifárias para toda a rede COMVEN? Esta ação sincronizará as tabelas de frete em tempo real e não poderá ser desfeita.'
const DEFAULT_CANCEL = 'Cancelar'
const DEFAULT_CONFIRM = 'Confirmar'

export const ModalPlayground: React.FC<ModalPlaygroundProps> = ({ initialConfig }) => {
  const { toast } = useToast()

  const [variant, setVariant] = useState<ModalVariant>(initialConfig?.variant || 'Completo')
  const [size, setSize] = useState<ModalSize>(initialConfig?.size || 'Medium')
  const [state, setState] = useState<ModalState>(initialConfig?.state || 'Default')
  const [icon, setIcon] = useState<ModalIconOption>(initialConfig?.icon || 'Com ícone')
  const [title, setTitle] = useState<string>(initialConfig?.title ?? DEFAULT_TITLE)
  const [content, setContent] = useState<string>(initialConfig?.content ?? DEFAULT_CONTENT)
  const [cancelLabel, setCancelLabel] = useState<string>(
    initialConfig?.cancelLabel ?? DEFAULT_CANCEL,
  )
  const [confirmLabel, setConfirmLabel] = useState<string>(
    initialConfig?.confirmLabel ?? DEFAULT_CONFIRM,
  )
  const [copied, setCopied] = useState(false)
  const [isLiveOpen, setIsLiveOpen] = useState(false)

  const config: ModalConfig = {
    variant,
    size,
    state,
    icon,
    title,
    content,
    cancelLabel,
    confirmLabel,
  }

  const cssCode = generateModalCss(config)

  const copyCss = () => {
    navigator.clipboard.writeText(cssCode)
    setCopied(true)
    toast({
      title: 'CSS Copiado!',
      description: 'Código CSS copiado para a área de transferência.',
    })
    setTimeout(() => setCopied(false), 2000)
  }

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isLiveOpen) {
        setIsLiveOpen(false)
      }
    }
    if (isLiveOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isLiveOpen])

  const FIGMA_PROTO_URL =
    'https://www.figma.com/proto/YEMa9j7O8aNm5PVmS8eSlC/Guia-de-Estilos?node-id=34-1734&viewport=-759%2C471%2C0.32&t=wAmAkj8XxXp7cOHD-1&scaling=contain&content-scaling=responsive&page-id=18%3A2'

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EBEBEB] shadow-sm">
      {/* Modal Section Header - sem badge/número */}
      <div className="flex items-start gap-4">
        <div className="pt-0.5">
          <h2 className="text-2xl sm:text-[28px] font-bold text-[#141414] leading-tight tracking-tight">
            Modal (Janela Sobreposta)
          </h2>
          <p className="text-sm sm:text-[15px] text-[#666666] mt-1 font-normal">
            3 variantes estruturais × 3 tamanhos × 2 estados interativos — diálogo centralizado
            sobre overlay escuro com header (título + fechar ×), corpo descritivo e footer com ações
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
            Alterne entre variantes de estrutura, tamanhos e estados interativos (Default e Hover
            nos gatilhos/botões). Edite os textos para validar a acomodação e abra a prévia real na
            página.
          </p>
        </div>

        {/* Controls: VARIANTE, TAMANHO, ESTADO — flex-wrap por grupo */}
        <div className="mt-6 flex flex-wrap items-start gap-x-8 gap-y-4">
          {/* VARIANTE */}
          <PlaygroundControlGroup label="VARIANTE">
            {MODAL_VARIANTS.map((v) => {
              const isSelected = variant === v
              const labels: Record<ModalVariant, string> = {
                Completo: 'Completo (Header + Ações)',
                'Sem rodapé': 'Sem rodapé (Informativo)',
                Simples: 'Simples (Corpo + Fechar ×)',
              }
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
                  {labels[v]}
                </button>
              )
            })}
          </PlaygroundControlGroup>

          {/* TAMANHO */}
          <PlaygroundControlGroup label="TAMANHO">
            {MODAL_SIZES.map((s) => {
              const isSelected = size === s
              const labels: Record<ModalSize, string> = {
                Large: 'Large (640px)',
                Medium: 'Medium (520px)',
                Small: 'Small (420px)',
              }
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
                  {labels[s]}
                </button>
              )
            })}
          </PlaygroundControlGroup>

          {/* ESTADO */}
          <PlaygroundControlGroup label="ESTADO DOS BOTÕES">
            {MODAL_STATES.map((st) => {
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
            {MODAL_ICONS.map((ic) => {
              const isSelected = icon === ic
              const isNotApplicable = variant === 'Simples'

              if (isNotApplicable) {
                return (
                  <span
                    key={ic}
                    title="Não aplicável para a variante Simples (não possui ícone/header)"
                    className="h-8 px-3.5 rounded-md text-xs font-medium inline-flex items-center text-[#9CA3AF] bg-[#F5F7FA] border border-dashed border-[#D5DCE5] cursor-not-allowed select-none shrink-0"
                  >
                    {ic} (N/A)
                  </span>
                )
              }

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
        </div>

        {/* Inputs de TEXTO em tempo real */}
        <div className="mt-6 pt-5 border-t border-[#F0F2F5] space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] block select-none">
            CAMPOS DE TEXTO EDITÁVEIS
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {variant !== 'Simples' && (
              <div>
                <label
                  htmlFor="modal-playground-title"
                  className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-1.5 block select-none"
                >
                  TÍTULO DO MODAL
                </label>
                <input
                  id="modal-playground-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Digite o título do modal"
                  maxLength={80}
                  className="w-full h-8 px-3 rounded-md border border-[#D5DCE5] bg-white text-xs font-semibold text-[#141414] outline-none focus:border-[#004185] focus:ring-1 focus:ring-[#004185] transition-colors placeholder:font-normal placeholder:text-[#9CA3AF]"
                />
              </div>
            )}

            <div className={variant === 'Simples' ? 'md:col-span-2' : ''}>
              <label
                htmlFor="modal-playground-content"
                className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-1.5 block select-none"
              >
                CORPO / DESCRIÇÃO
              </label>
              <input
                id="modal-playground-content"
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Digite a mensagem ou descrição do modal"
                maxLength={240}
                className="w-full h-8 px-3 rounded-md border border-[#D5DCE5] bg-white text-xs font-normal text-[#141414] outline-none focus:border-[#004185] focus:ring-1 focus:ring-[#004185] transition-colors placeholder:text-[#9CA3AF]"
              />
            </div>

            {variant === 'Completo' && (
              <>
                <div>
                  <label
                    htmlFor="modal-playground-cancel"
                    className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-1.5 block select-none"
                  >
                    LABEL DO BOTÃO SECUNDÁRIO
                  </label>
                  <input
                    id="modal-playground-cancel"
                    type="text"
                    value={cancelLabel}
                    onChange={(e) => setCancelLabel(e.target.value)}
                    placeholder="Cancelar"
                    maxLength={30}
                    className="w-full h-8 px-3 rounded-md border border-[#D5DCE5] bg-white text-xs font-semibold text-[#141414] outline-none focus:border-[#004185] focus:ring-1 focus:ring-[#004185] transition-colors placeholder:font-normal placeholder:text-[#9CA3AF]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="modal-playground-confirm"
                    className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-1.5 block select-none"
                  >
                    LABEL DO BOTÃO PRIMÁRIO
                  </label>
                  <input
                    id="modal-playground-confirm"
                    type="text"
                    value={confirmLabel}
                    onChange={(e) => setConfirmLabel(e.target.value)}
                    placeholder="Confirmar"
                    maxLength={30}
                    className="w-full h-8 px-3 rounded-md border border-[#D5DCE5] bg-white text-xs font-semibold text-[#141414] outline-none focus:border-[#004185] focus:ring-1 focus:ring-[#004185] transition-colors placeholder:font-normal placeholder:text-[#9CA3AF]"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Live Preview Container (Soft blue-gray box) */}
        <div className="mt-6 rounded-2xl bg-[#F5F7FA] p-6 sm:p-8 border border-[#EBEBEB]">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] block">
                PRÉVIA DO COMPONENTE
              </span>
              <p className="text-xs text-[#555555] mt-0.5">
                Caixa de diálogo simulada no painel e botão para testar o modal real com overlay
                escuro, blur e tecla Esc.
              </p>
            </div>

            {/* Figma link and Trigger button */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setIsLiveOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#004185] hover:bg-[#00346A] active:bg-[#002750] rounded-lg transition-colors shadow-sm select-none"
              >
                <span className="material-symbols-rounded text-sm" style={{ fontSize: '18px' }}>
                  open_in_new
                </span>
                <span>Testar Modal Real (Overlay)</span>
              </button>

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
          </div>

          {/* Embedded Dialog Preview */}
          <div className="w-full py-4 flex items-center justify-center">
            <SingleModalPreview config={config} />
          </div>

          {/* ATRIBUTOS CSS Panel below */}
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

            {/* Light Code Box matching screenshot */}
            <div className="bg-white rounded-xl border border-[#E2E6EB] p-5 sm:p-6 shadow-2xs">
              <pre className="text-xs sm:text-[13px] font-mono leading-relaxed text-[#1F2328] m-0 whitespace-pre-wrap break-words selection:bg-[#D2E4F7]">
                <code>{cssCode}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Matriz Completa sobre fundo #062446 sem scrollbar */}
      <ModalStateGallery
        currentTitle={title}
        currentContent={content}
        currentCancel={cancelLabel}
        currentConfirm={confirmLabel}
      />

      {/* Live Interactive Real Modal Overlay */}
      {isLiveOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#062446]/65 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsLiveOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="comven-live-modal-title"
        >
          <div
            className="w-full animate-in zoom-in-95 duration-200 shadow-2xl"
            style={{ maxWidth: `${MODAL_SIZE_METRICS[size].maxWidth}px` }}
            onClick={(e) => e.stopPropagation()}
          >
            <SingleModalPreview
              config={{
                ...config,
                state: 'Default',
              }}
              onClose={() => setIsLiveOpen(false)}
              onConfirm={() => {
                toast({
                  title: 'Ação confirmada!',
                  description: 'O modal foi confirmado e concluído com sucesso.',
                })
                setIsLiveOpen(false)
              }}
              onCancel={() => setIsLiveOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

/** Render preview of a single Modal dialog box */
export function SingleModalPreview({
  config,
  className = '',
  onClose,
  onConfirm,
  onCancel,
}: {
  config: ModalConfig
  className?: string
  onClose?: () => void
  onConfirm?: () => void
  onCancel?: () => void
}) {
  const {
    variant,
    size,
    state,
    icon = 'Com ícone',
    title,
    content,
    cancelLabel,
    confirmLabel,
  } = config
  const metrics = MODAL_SIZE_METRICS[size] || MODAL_SIZE_METRICS.Medium

  const isHover = state === 'Hover'
  const primaryBg = isHover ? '#00346A' : '#004185'
  const secondaryBg = isHover ? '#F5F7FA' : '#FFFFFF'
  const closeBtnBg = isHover ? '#F0F2F5' : 'transparent'

  const isSimple = variant === 'Simples'
  const showHeader = !isSimple
  const showFooter = variant === 'Completo'
  const hasIcon = !isSimple && icon === 'Com ícone'

  const [topPadding, sidePadding] = metrics.padding.split(' ')

  return (
    <div
      role="dialog"
      aria-labelledby={isSimple ? undefined : 'comven-dialog-title'}
      className={`relative w-full bg-white border border-[#EBEBEB] rounded-2xl shadow-xl flex flex-col overflow-hidden text-left ${className}`}
      style={{
        maxWidth: `${metrics.maxWidth}px`,
        borderRadius: `${metrics.borderRadius}px`,
      }}
    >
      {/* Header (Completo e Sem rodapé) */}
      {showHeader && (
        <div
          className="flex items-center justify-between border-b border-[#F0F2F5] bg-white gap-3"
          style={{
            padding: `${topPadding} ${sidePadding} 16px`,
          }}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {hasIcon && (
              <span
                className="material-symbols-rounded shrink-0 select-none text-[#004185]"
                style={{
                  fontSize: `${metrics.titleIconSize}px`,
                  lineHeight: 1,
                }}
                aria-hidden="true"
              >
                info
              </span>
            )}
            <h3
              id="comven-dialog-title"
              className="font-bold text-[#141414] tracking-tight m-0 truncate"
              style={{
                fontSize: `${metrics.titleFontSize}px`,
                lineHeight: metrics.titleLineHeight,
              }}
            >
              {title || DEFAULT_TITLE}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar modal"
            className="rounded-lg text-[#666666] hover:text-[#141414] transition-colors flex items-center justify-center shrink-0"
            style={{
              width: `${metrics.closeButtonSize}px`,
              height: `${metrics.closeButtonSize}px`,
              backgroundColor: closeBtnBg,
            }}
          >
            <span
              className="material-symbols-rounded select-none"
              style={{ fontSize: `${metrics.closeIconSize}px` }}
            >
              close
            </span>
          </button>
        </div>
      )}

      {/* Botão fechar (x) na variante Simples: posicionado no topo direito, alinhado exatamente ao topo do texto do corpo */}
      {isSimple && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar modal"
          className="absolute rounded-lg text-[#666666] hover:text-[#141414] transition-colors flex items-center justify-center z-10"
          style={{
            top: topPadding,
            right: sidePadding,
            width: `${metrics.closeButtonSize}px`,
            height: `${metrics.closeButtonSize}px`,
            backgroundColor: closeBtnBg,
          }}
        >
          <span
            className="material-symbols-rounded select-none"
            style={{ fontSize: `${metrics.closeIconSize}px` }}
          >
            close
          </span>
        </button>
      )}

      {/* Body: na variante Simples, sobe para o topo ocupando o lugar do header com padding direito reservado para o × */}
      <div
        className="bg-white"
        style={{
          padding: isSimple
            ? `${topPadding} calc(${sidePadding} + ${metrics.closeButtonSize + 8}px) ${topPadding} ${sidePadding}`
            : `20px ${sidePadding}`,
        }}
      >
        <p
          className="font-normal text-[#525252] m-0 leading-relaxed"
          style={{
            fontSize: `${metrics.bodyFontSize}px`,
            lineHeight: metrics.bodyLineHeight,
          }}
        >
          {content || DEFAULT_CONTENT}
        </p>
      </div>

      {/* Footer */}
      {showFooter && (
        <div className="flex items-center justify-end gap-3 px-6 py-3.5 bg-[#FAFCFE] border-t border-[#F0F2F5]">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg font-bold text-[#004185] border border-[#D5DCE5] transition-colors shadow-2xs select-none"
            style={{
              padding: metrics.buttonPadding,
              fontSize: `${metrics.buttonFontSize}px`,
              backgroundColor: secondaryBg,
            }}
          >
            {cancelLabel || DEFAULT_CANCEL}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg font-bold text-white transition-colors shadow-2xs select-none"
            style={{
              padding: metrics.buttonPadding,
              fontSize: `${metrics.buttonFontSize}px`,
              backgroundColor: primaryBg,
            }}
          >
            {confirmLabel || DEFAULT_CONFIRM}
          </button>
        </div>
      )}
    </div>
  )
}

/** Complete variation matrix for Modal over #062446 navy background without internal scroll */
function ModalStateGallery({
  currentTitle,
  currentContent,
  currentCancel,
  currentConfirm,
}: {
  currentTitle: string
  currentContent: string
  currentCancel: string
  currentConfirm: string
}) {
  const blocks: Array<{
    variant: ModalVariant
    badge: string
    description: string
  }> = [
    {
      variant: 'Completo',
      badge: 'Variante Completa (Header com fechar × + Corpo + Rodapé de Ações)',
      description:
        'Padrão recomendado para decisões importantes, confirmações destrutivas e fluxos transacionais.',
    },
    {
      variant: 'Sem rodapé',
      badge: 'Variante Informativa (Header com fechar × + Corpo informativo)',
      description:
        'Diálogo informativo ou de ajuda contextual fechado pelo botão de fechar (×) ou clique no overlay.',
    },
    {
      variant: 'Simples',
      badge: 'Variante Simples (Corpo + Fechar ×)',
      description:
        'Apresentação direta sem cabeçalho nem ícone: o corpo ocupa o topo e o botão fechar (×) fica alinhado ao topo do texto.',
    },
  ]

  return (
    <div className="mt-10 pt-8 border-t border-[#F0F2F5]">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-[#141414]">
          Matriz completa de variações — (3 variantes × 3 tamanhos × 2 estados interativos)
        </h3>
        <p className="text-xs sm:text-sm text-[#7A7A7A] mt-1 font-normal">
          Visualização sobre o fundo azul-marinho oficial COMVEN (#062446), cobrindo Large, Medium e
          Small sem barras internas de scroll.
        </p>
      </div>

      <div className="mt-5 space-y-6">
        {blocks.map((b) => (
          <div
            key={b.variant}
            className="rounded-2xl border border-[#0d3663] bg-[#062446] shadow-md p-6 sm:p-8"
          >
            <div className="pb-4 border-b border-[#113C68]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm sm:text-base font-bold text-[#F2CB05] tracking-wide uppercase">
                  {b.badge}
                </span>
                <span className="text-xs text-[#8BB7E7] font-medium">
                  {b.variant === 'Simples'
                    ? '3 tamanhos × 2 estados (Sem ícone)'
                    : '3 tamanhos × 2 estados × 2 ícones'}
                </span>
              </div>
              <p className="text-xs text-[#D2E4F7] mt-1 font-normal">{b.description}</p>
            </div>

            <div className="divide-y divide-[#113C68]/40">
              {MODAL_STATES.map((st) => (
                <div key={st} className="py-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#F2CB05] tracking-wide uppercase">
                      Estado dos Botões: {st}
                    </span>
                    <div className="flex-1 h-px bg-[#113C68]/60" />
                  </div>

                  {b.variant === 'Simples' ? (
                    /* Variante Simples não possui ícone: apenas uma forma direta */
                    <div className="space-y-2">
                      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
                        {MODAL_SIZES.map((sz) => (
                          <div key={`${b.variant}-${st}-${sz}`} className="flex flex-col gap-2">
                            <span className="text-[11px] font-mono text-[#8BB7E7] uppercase">
                              Tamanho: {sz} ({MODAL_SIZE_METRICS[sz].maxWidth}px)
                            </span>
                            <SingleModalPreview
                              config={{
                                variant: b.variant,
                                size: sz,
                                state: st,
                                icon: 'Sem ícone',
                                title: currentTitle || DEFAULT_TITLE,
                                content: currentContent || DEFAULT_CONTENT,
                                cancelLabel: currentCancel || DEFAULT_CANCEL,
                                confirmLabel: currentConfirm || DEFAULT_CONFIRM,
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Sub-row: COM ÍCONE */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8BB7E7]/80">
                          • Com ícone
                        </span>
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
                          {MODAL_SIZES.map((sz) => (
                            <div
                              key={`${b.variant}-${st}-${sz}-com-icone`}
                              className="flex flex-col gap-2"
                            >
                              <span className="text-[11px] font-mono text-[#8BB7E7] uppercase">
                                Tamanho: {sz} ({MODAL_SIZE_METRICS[sz].maxWidth}px)
                              </span>
                              <SingleModalPreview
                                config={{
                                  variant: b.variant,
                                  size: sz,
                                  state: st,
                                  icon: 'Com ícone',
                                  title: currentTitle || DEFAULT_TITLE,
                                  content: currentContent || DEFAULT_CONTENT,
                                  cancelLabel: currentCancel || DEFAULT_CANCEL,
                                  confirmLabel: currentConfirm || DEFAULT_CONFIRM,
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Sub-row: SEM ÍCONE */}
                      <div className="space-y-2 pt-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8BB7E7]/80">
                          • Sem ícone
                        </span>
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
                          {MODAL_SIZES.map((sz) => (
                            <div
                              key={`${b.variant}-${st}-${sz}-sem-icone`}
                              className="flex flex-col gap-2"
                            >
                              <span className="text-[11px] font-mono text-[#8BB7E7] uppercase">
                                Tamanho: {sz} ({MODAL_SIZE_METRICS[sz].maxWidth}px)
                              </span>
                              <SingleModalPreview
                                config={{
                                  variant: b.variant,
                                  size: sz,
                                  state: st,
                                  icon: 'Sem ícone',
                                  title: currentTitle || DEFAULT_TITLE,
                                  content: currentContent || DEFAULT_CONTENT,
                                  cancelLabel: currentCancel || DEFAULT_CANCEL,
                                  confirmLabel: currentConfirm || DEFAULT_CONFIRM,
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
