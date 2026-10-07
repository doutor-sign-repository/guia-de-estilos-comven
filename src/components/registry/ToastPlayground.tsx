import React, { useState, useEffect } from 'react'
import {
  ToastConfig,
  ToastVariant,
  ToastSize,
  ToastState,
  generateToastCss,
  TOAST_SIZE_METRICS,
  TOAST_COLOR_TOKENS,
} from './types'
import { PlaygroundControlGroup } from './PlaygroundControlGroup'
import { useToast } from '@/hooks/use-toast'

export interface ToastPlaygroundProps {
  initialConfig?: Partial<ToastConfig>
}

const TOAST_VARIANTS: ToastVariant[] = ['Info', 'Success', 'Warning', 'Error', 'Neutral']
const TOAST_SIZES: ToastSize[] = ['Large', 'Medium', 'Small']
const TOAST_STATES: ToastState[] = ['Default', 'Destaque']

const VARIANT_ICONS: Record<ToastVariant, string> = {
  Info: 'info',
  Success: 'check_circle',
  Warning: 'lightbulb',
  Error: 'error',
  Neutral: 'notifications',
}

const VARIANT_DEFAULT_CONTENT: Record<
  ToastVariant,
  { title: string; description: string; actionLabel: string }
> = {
  Info: {
    title: 'Relatório enviado para processamento',
    description: 'A planilha de fechamento foi enfileirada e estará disponível em instantes.',
    actionLabel: 'Ver fila',
  },
  Success: {
    title: 'Proposta comercial atualizada',
    description: 'As alterações de preço e tabela foram sincronizadas com sucesso.',
    actionLabel: 'Desfazer',
  },
  Warning: {
    title: 'Atenção aos prazos de liquidação',
    description: 'Três títulos vencem hoje às 17h00. Verifique as pendências bancárias.',
    actionLabel: 'Revisar',
  },
  Error: {
    title: 'Falha na conexão com a SEFAZ',
    description: 'Não foi possível emitir a nota fiscal. Tente novamente em alguns minutos.',
    actionLabel: 'Tentar de novo',
  },
  Neutral: {
    title: 'Nova mensagem do operador',
    description: 'Uma atualização foi adicionada ao histórico da conta do cliente.',
    actionLabel: 'Abrir chat',
  },
}

export const ToastPlayground: React.FC<ToastPlaygroundProps> = ({ initialConfig }) => {
  const { toast } = useToast()

  const [variant, setVariant] = useState<ToastVariant>(initialConfig?.variant || 'Success')
  const [size, setSize] = useState<ToastSize>(initialConfig?.size || 'Large')
  const [state, setState] = useState<ToastState>(initialConfig?.state || 'Default')
  const [title, setTitle] = useState<string>(
    initialConfig?.title ?? VARIANT_DEFAULT_CONTENT.Success.title,
  )
  const [description, setDescription] = useState<string>(
    initialConfig?.description ?? VARIANT_DEFAULT_CONTENT.Success.description,
  )
  const [actionLabel, setActionLabel] = useState<string>(
    initialConfig?.actionLabel ?? VARIANT_DEFAULT_CONTENT.Success.actionLabel,
  )
  const [copied, setCopied] = useState(false)

  // Estado para a simulação do toast animado flutuante (slide-in no canto)
  const [isToastActive, setIsToastActive] = useState(false)
  const [toastProgress, setToastProgress] = useState(100)

  const config: ToastConfig = { variant, size, state, title, description, actionLabel }
  const cssCode = generateToastCss(config)

  const handleVariantChange = (newVariant: ToastVariant) => {
    setVariant(newVariant)
    const prevDefaults = VARIANT_DEFAULT_CONTENT[variant]
    if (
      title === prevDefaults.title &&
      description === prevDefaults.description &&
      actionLabel === prevDefaults.actionLabel
    ) {
      setTitle(VARIANT_DEFAULT_CONTENT[newVariant].title)
      setDescription(VARIANT_DEFAULT_CONTENT[newVariant].description)
      setActionLabel(VARIANT_DEFAULT_CONTENT[newVariant].actionLabel)
    }
  }

  const triggerLiveToast = () => {
    setIsToastActive(true)
    setToastProgress(100)
  }

  // Timer para o toast interativo simulado (~4s com progresso decrescente)
  useEffect(() => {
    if (!isToastActive) return

    const interval = 40
    const step = 100 / (4000 / interval)

    const timer = setInterval(() => {
      setToastProgress((prev) => {
        if (prev <= step) {
          clearInterval(timer)
          setIsToastActive(false)
          return 0
        }
        return prev - step
      })
    }, interval)

    return () => clearInterval(timer)
  }, [isToastActive])

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
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EBEBEB] shadow-sm relative">
      {/* Toast Section Header */}
      <div className="flex items-start gap-4">
        <div className="pt-0.5">
          <h2 className="text-2xl sm:text-[28px] font-bold text-[#141414] leading-tight tracking-tight">
            Toast (Notificação Flutuante Interativa)
          </h2>
          <p className="text-sm sm:text-[15px] text-[#666666] mt-1 font-normal">
            5 variantes por intenção × 3 tamanhos × 2 estados — notificação flutuante com ícone,
            título, descrição, botão de ação estilo Link (#004185 sem fundo/borda) e botão de fechar
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
            Alterne entre variantes de intenção, tamanhos e estados de destaque. O preview estático
            documenta o CSS padrão; utilize o botão &quot;Disparar toast animado&quot; para testar a
            experiência flutuante real.
          </p>
        </div>

        {/* Controls */}
        <div className="mt-6 flex flex-wrap items-start gap-x-8 gap-y-4">
          {/* VARIANTE */}
          <PlaygroundControlGroup label="VARIANTE">
            {TOAST_VARIANTS.map((v) => {
              const isSelected = variant === v
              const labels: Record<ToastVariant, string> = {
                Info: 'Informativa (Azul)',
                Success: 'Sucesso (Verde)',
                Warning: 'Atenção (Amarelo #F2CB05)',
                Error: 'Erro (Vermelho)',
                Neutral: 'Neutra (Cinza)',
              }
              return (
                <button
                  key={v}
                  type="button"
                  onClick={() => handleVariantChange(v)}
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
            {TOAST_SIZES.map((s) => {
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

          {/* ESTADO */}
          <PlaygroundControlGroup label="ESTADO">
            {TOAST_STATES.map((st) => {
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

          {/* BOTÃO DISPARAR TOAST */}
          <PlaygroundControlGroup label="SIMULAÇÃO AO VIVO">
            <button
              type="button"
              onClick={triggerLiveToast}
              className="h-8 px-3.5 rounded-md text-xs font-bold transition-all select-none shrink-0 inline-flex items-center gap-1.5 bg-[#004185] text-white hover:bg-[#00346A] shadow-xs active:scale-[0.98]"
            >
              <span className="material-symbols-rounded text-sm" style={{ fontSize: '15px' }}>
                play_arrow
              </span>
              <span>Disparar toast flutuante</span>
            </button>
          </PlaygroundControlGroup>
        </div>

        {/* Inputs de TÍTULO, DESCRIÇÃO e LABEL DA AÇÃO */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="toast-playground-title"
              className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-1.5 block select-none"
            >
              TÍTULO DO TOAST
            </label>
            <input
              id="toast-playground-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título do toast"
              maxLength={70}
              className="w-full h-8 px-3 rounded-md border border-[#D5DCE5] bg-white text-xs font-semibold text-[#141414] outline-none focus:border-[#004185] focus:ring-1 focus:ring-[#004185] transition-colors placeholder:font-normal placeholder:text-[#9CA3AF]"
            />
          </div>

          <div>
            <label
              htmlFor="toast-playground-desc"
              className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-1.5 block select-none"
            >
              DESCRIÇÃO / MENSAGEM
            </label>
            <input
              id="toast-playground-desc"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Digite o texto do toast"
              maxLength={140}
              className="w-full h-8 px-3 rounded-md border border-[#D5DCE5] bg-white text-xs font-medium text-[#141414] outline-none focus:border-[#004185] focus:ring-1 focus:ring-[#004185] transition-colors placeholder:font-normal placeholder:text-[#9CA3AF]"
            />
          </div>

          <div>
            <label
              htmlFor="toast-playground-action"
              className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-1.5 block select-none"
            >
              LABEL DA AÇÃO (LINK)
            </label>
            <input
              id="toast-playground-action"
              type="text"
              value={actionLabel}
              onChange={(e) => setActionLabel(e.target.value)}
              placeholder="Ex: Desfazer"
              maxLength={30}
              className="w-full h-8 px-3 rounded-md border border-[#D5DCE5] bg-white text-xs font-semibold text-[#141414] outline-none focus:border-[#004185] focus:ring-1 focus:ring-[#004185] transition-colors placeholder:font-normal placeholder:text-[#9CA3AF]"
            />
          </div>
        </div>

        {/* Live Preview Container */}
        <div className="mt-6 rounded-2xl bg-[#F5F7FA] p-6 sm:p-8 border border-[#EBEBEB]">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            {/* Toast Preview Estático */}
            <div className="flex-1 w-full max-w-xl py-1">
              <SingleToastPreview
                config={config}
                onClose={() => {
                  toast({
                    title: 'Toast fechado',
                    description: 'O botão fechar do toast foi acionado com sucesso.',
                  })
                }}
                onAction={() => {
                  toast({
                    title: `Ação "${actionLabel}" disparada`,
                    description: 'O botão de ação estilo Link executou a operação.',
                  })
                }}
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

      {/* Floating Animated Toast Simulation (fixed at bottom right) */}
      {isToastActive && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300 max-w-md w-[calc(100vw-3rem)] drop-shadow-2xl">
          <div className="relative overflow-hidden rounded-xl">
            <SingleToastPreview
              config={config}
              onClose={() => setIsToastActive(false)}
              onAction={() => {
                toast({
                  title: `Ação "${actionLabel}" acionada`,
                  description: 'Ação executada a partir do toast flutuante.',
                })
                setIsToastActive(false)
              }}
            />
            {/* Auto-dismiss progress bar */}
            <div
              className="absolute bottom-0 left-0 h-1 bg-[#004185]/40 transition-all ease-linear"
              style={{ width: `${toastProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Matriz Completa sobre fundo #062446 sem scrollbar */}
      <ToastStateGallery
        currentTitle={title}
        currentDescription={description}
        currentAction={actionLabel}
      />
    </div>
  )
}

/** Render preview of a single Toast */
export function SingleToastPreview({
  config,
  onClose,
  onAction,
  className = '',
}: {
  config: ToastConfig
  onClose?: () => void
  onAction?: () => void
  className?: string
}) {
  const { variant, size, state, title, description, actionLabel } = config
  const metrics = TOAST_SIZE_METRICS[size] || TOAST_SIZE_METRICS.Large
  const colors = TOAST_COLOR_TOKENS[variant] || TOAST_COLOR_TOKENS.Info
  const iconName = VARIANT_ICONS[variant] || 'info'
  const isHighlight = state === 'Destaque'

  const bgColor = colors.bg
  const borderColor = isHighlight ? colors.highlightBorder : colors.border
  const borderWidth = isHighlight ? '1.5px' : '1px'
  const shadow = isHighlight
    ? `0 12px 28px -6px rgba(6, 36, 70, 0.22), 0 0 0 1px ${colors.highlightBorder}`
    : '0 8px 24px -4px rgba(6, 36, 70, 0.16)'

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`w-full transition-all duration-200 select-text flex items-start ${className}`}
      style={{
        backgroundColor: bgColor,
        border: `${borderWidth} solid ${borderColor}`,
        borderRadius: `${metrics.radius}px`,
        padding: metrics.padding,
        boxShadow: shadow,
        gap: `${metrics.gap}px`,
        maxWidth: '440px',
      }}
    >
      {/* Icon */}
      <span
        className="material-symbols-rounded shrink-0 select-none"
        style={{
          fontSize: `${metrics.iconSize}px`,
          lineHeight: 1,
          color: colors.iconColor,
          marginTop: '1px',
        }}
        aria-hidden="true"
      >
        {iconName}
      </span>

      {/* Content */}
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        {title && (
          <h4
            className="font-bold tracking-tight m-0"
            style={{
              fontSize: `${metrics.titleFontSize}px`,
              lineHeight: metrics.titleLineHeight,
              color: colors.titleColor,
            }}
          >
            {title}
          </h4>
        )}
        {description && (
          <p
            className="font-normal m-0"
            style={{
              fontSize: `${metrics.descFontSize}px`,
              lineHeight: metrics.descLineHeight,
              color: colors.descColor,
            }}
          >
            {description}
          </p>
        )}
      </div>

      {/* Actions: Link button and Close button */}
      <div className="flex items-center gap-3 shrink-0 ml-1">
        {actionLabel && (
          <button
            type="button"
            onClick={onAction}
            className="p-0 m-0 bg-transparent border-none font-bold text-[#004185] hover:text-[#00346A] hover:underline active:text-[#002750] transition-colors focus:outline-none cursor-pointer"
            style={{
              fontSize: `${metrics.actionFontSize}px`,
              fontFamily: "'Open Sans', sans-serif",
            }}
          >
            {actionLabel}
          </button>
        )}
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar notificação"
          className="inline-flex items-center justify-center p-0 m-0 bg-transparent border-none rounded hover:bg-black/10 active:bg-black/15 transition-colors cursor-pointer text-[#666666] hover:text-[#141414]"
          style={{
            width: `${metrics.closeSize}px`,
            height: `${metrics.closeSize}px`,
          }}
        >
          <span
            className="material-symbols-rounded"
            style={{ fontSize: `${metrics.closeSize}px`, lineHeight: 1 }}
          >
            close
          </span>
        </button>
      </div>
    </div>
  )
}

/** Complete variation matrix for Toast over #062446 navy background without internal scroll */
function ToastStateGallery({
  currentTitle,
  currentDescription,
  currentAction,
}: {
  currentTitle: string
  currentDescription: string
  currentAction: string
}) {
  const blocks: Array<{
    variant: ToastVariant
    badge: string
    description: string
  }> = [
    {
      variant: 'Info',
      badge: 'Variante Informativa (Azul #004185)',
      description: 'Avisos neutros do sistema, enfileiramento de relatórios e mensagens de status.',
    },
    {
      variant: 'Success',
      badge: 'Variante de Sucesso (Verde)',
      description:
        'Confirmação de propostas, sincronização concluída e cadastros salvos com sucesso.',
    },
    {
      variant: 'Warning',
      badge: 'Variante de Atenção / Alerta (Amarelo #F2CB05)',
      description:
        'Uso legítimo do amarelo COMVEN: permitido expressamente em alertas para títulos vencendo ou atenção operacional.',
    },
    {
      variant: 'Error',
      badge: 'Variante de Erro (Vermelho)',
      description: 'Falha de comunicação, recusa de autorização ou inconsistência de envio.',
    },
    {
      variant: 'Neutral',
      badge: 'Variante Neutra (Branco / Borda Cinza)',
      description: 'Notificação discreta de mensagens secundárias, dicas e atualizações de chat.',
    },
  ]

  return (
    <div className="mt-10 pt-8 border-t border-[#F0F2F5]">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-[#141414]">
          Matriz completa de variações — (5 intenções × 3 tamanhos × 2 estados)
        </h3>
        <p className="text-xs sm:text-sm text-[#7A7A7A] mt-1 font-normal">
          Visualização sobre o fundo azul-marinho oficial COMVEN (#062446), cobrindo Large, Medium e
          Small com ação Link e botão de fechar, sem barras internas de scroll.
        </p>
      </div>

      <div className="mt-5 space-y-6">
        {blocks.map((b) => {
          const defaultData = VARIANT_DEFAULT_CONTENT[b.variant]
          const title = currentTitle || defaultData.title
          const desc = currentDescription || defaultData.description
          const action = currentAction || defaultData.actionLabel

          return (
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
                    3 tamanhos × 2 estados · Ação Link + Fechar
                  </span>
                </div>
                <p className="text-xs text-[#D2E4F7] mt-1 font-normal">{b.description}</p>
              </div>

              <div className="divide-y divide-[#113C68]/40">
                {TOAST_STATES.map((st) => (
                  <div key={st} className="py-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#F2CB05] tracking-wide uppercase">
                        Estado: {st}
                      </span>
                      <div className="flex-1 h-px bg-[#113C68]/60" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                      {TOAST_SIZES.map((sz) => (
                        <div key={`${b.variant}-${st}-${sz}`} className="flex flex-col gap-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8BB7E7]">
                            Tamanho {sz}
                          </span>
                          <SingleToastPreview
                            config={{
                              variant: b.variant,
                              size: sz,
                              state: st,
                              title,
                              description: desc,
                              actionLabel: action,
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
