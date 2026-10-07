import React, { useState } from 'react'
import {
  InfoCardConfig,
  InfoCardVariant,
  InfoCardSize,
  InfoCardState,
  InfoCardIconOption,
  generateInfoCardCss,
  INFOCARD_SIZE_METRICS,
  INFOCARD_COLOR_TOKENS,
} from './types'
import { PlaygroundControlGroup } from './PlaygroundControlGroup'
import { useToast } from '@/hooks/use-toast'

export interface InfoCardPlaygroundProps {
  initialConfig?: Partial<InfoCardConfig>
}

const INFOCARD_VARIANTS: InfoCardVariant[] = ['Info', 'Success', 'Warning', 'Error', 'Neutral']
const INFOCARD_SIZES: InfoCardSize[] = ['Large', 'Medium', 'Small']
const INFOCARD_STATES: InfoCardState[] = ['Default', 'Destaque', 'Disabled']
const INFOCARD_ICONS: InfoCardIconOption[] = ['Com ícone', 'Sem ícone']

const VARIANT_ICONS: Record<InfoCardVariant, string> = {
  Info: 'info',
  Success: 'check_circle',
  Warning: 'lightbulb',
  Error: 'error',
  Neutral: 'article',
}

const VARIANT_DEFAULT_CONTENT: Record<InfoCardVariant, { title: string; description: string }> = {
  Info: {
    title: 'Informação do sistema',
    description:
      'As atualizações de relatórios operacionais ocorrem diariamente às 06h00 e às 18h00 no padrão oficial COMVEN.',
  },
  Success: {
    title: 'Operação realizada com sucesso',
    description:
      'Todos os dados da proposta de venda foram sincronizados e o comprovante foi emitido para o cliente.',
  },
  Warning: {
    title: 'Diretriz de uso do amarelo (#F2CB05)',
    description:
      'O amarelo COMVEN é permitido em alertas, badges e destaques pontuais. Nunca o utilize como cor principal de uma interface.',
  },
  Error: {
    title: 'Falha na validação dos campos obrigatórios',
    description:
      'Verifique os dados marcados em vermelho antes de reenviar a proposta para aprovação da mesa de operações.',
  },
  Neutral: {
    title: 'Nota de contexto e documentação',
    description:
      'Consulte as diretrizes de tipografia e iconografia no manual da marca antes de publicar novos layouts.',
  },
}

const VARIANT_BLOCKS: Array<{
  variant: InfoCardVariant
  badge: string
  description: string
  iconName: string
}> = [
  {
    variant: 'Info',
    badge: '1. Variante Informativa (Azul #004185)',
    description:
      'Utiliza o tom corporativo COMVEN para avisos neutros, dicas contextuais, atualizações de sistema e fluxos de orientação ao usuário.',
    iconName: 'info',
  },
  {
    variant: 'Success',
    badge: '2. Variante de Sucesso (Verde)',
    description:
      'Comunica confirmações, operações concluídas com êxito, sincronizações aprovadas e etapas finalizadas na esteira de venda.',
    iconName: 'check_circle',
  },
  {
    variant: 'Warning',
    badge: '3. Variante de Atenção / Alerta (Amarelo #F2CB05)',
    description:
      'Aplicação legítima do amarelo COMVEN: permitida expressamente para destacar avisos, pontos de atenção e diretrizes críticas sem virar cor base.',
    iconName: 'lightbulb',
  },
  {
    variant: 'Error',
    badge: '4. Variante de Erro / Restrição (Vermelho)',
    description:
      'Indica pendências impeditivas, bloqueios operacionais, prazos vencidos ou inconsistências que exigem ação corretiva imediata.',
    iconName: 'error',
  },
  {
    variant: 'Neutral',
    badge: '5. Variante Neutra (Cinza / Off-white)',
    description:
      'Apropriada para resumos documentais, notas técnicas de apoio, rodapés informativos e blocos secundários de leitura.',
    iconName: 'article',
  },
]

export const InfoCardPlayground: React.FC<InfoCardPlaygroundProps> = ({ initialConfig }) => {
  const { toast } = useToast()

  const [variant, setVariant] = useState<InfoCardVariant>(initialConfig?.variant || 'Warning')
  const [size, setSize] = useState<InfoCardSize>(initialConfig?.size || 'Large')
  const [state, setState] = useState<InfoCardState>(initialConfig?.state || 'Default')
  const [icon, setIcon] = useState<InfoCardIconOption>(initialConfig?.icon || 'Com ícone')
  const [title, setTitle] = useState<string>(
    initialConfig?.title ?? VARIANT_DEFAULT_CONTENT.Warning.title,
  )
  const [description, setDescription] = useState<string>(
    initialConfig?.description ?? VARIANT_DEFAULT_CONTENT.Warning.description,
  )
  const [copied, setCopied] = useState(false)

  const config: InfoCardConfig = { variant, size, state, icon, title, description }
  const cssCode = generateInfoCardCss(config)

  const handleVariantChange = (newVariant: InfoCardVariant) => {
    setVariant(newVariant)
    // Atualiza título e descrição apenas se forem iguais aos padrões anteriores
    const prevDefaults = VARIANT_DEFAULT_CONTENT[variant]
    if (title === prevDefaults.title && description === prevDefaults.description) {
      setTitle(VARIANT_DEFAULT_CONTENT[newVariant].title)
      setDescription(VARIANT_DEFAULT_CONTENT[newVariant].description)
    }
  }

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
      {/* 05 InfoCard Section Header */}
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-[#004185] text-white flex items-center justify-center font-bold text-base shrink-0 select-none">
          05
        </div>
        <div className="pt-0.5">
          <h2 className="text-2xl sm:text-[28px] font-bold text-[#141414] leading-tight tracking-tight">
            InfoCard (Ícone + Texto)
          </h2>
          <p className="text-sm sm:text-[15px] text-[#666666] mt-1 font-normal">
            5 variantes por intenção × 3 tamanhos × 3 estados — explorando a escala oficial COMVEN
            com fundo pálido, borda suave, ícone, título e texto descritivo
          </p>
        </div>
      </div>

      {/* Playground Section */}
      <div className="mt-8 pt-6 border-t border-[#F0F2F5]">
        {/* Playground header */}
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#141414]">
            Playground — configuração interativa em tempo real
          </h3>
          <p className="text-xs sm:text-sm text-[#7A7A7A] mt-1 font-normal">
            Alterne entre as variantes, tamanhos, estados de destaque e presença de ícone. Modifique
            o título e a descrição para ver a composição e o código CSS se adaptarem
            instantaneamente.
          </p>
        </div>

        {/* Controls: VARIANTE, TAMANHO, ESTADO, ÍCONE — flex-wrap por grupo indivisível */}
        <div className="mt-6 flex flex-wrap items-start gap-x-8 gap-y-4">
          {/* VARIANTE */}
          <PlaygroundControlGroup label="VARIANTE">
            {INFOCARD_VARIANTS.map((v) => {
              const isSelected = variant === v
              const variantLabels: Record<InfoCardVariant, string> = {
                Info: 'Informativa',
                Success: 'Sucesso',
                Warning: 'Alerta (Amarelo)',
                Error: 'Erro',
                Neutral: 'Neutra',
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
                  {variantLabels[v]}
                </button>
              )
            })}
          </PlaygroundControlGroup>

          {/* TAMANHO */}
          <PlaygroundControlGroup label="TAMANHO">
            {INFOCARD_SIZES.map((s) => {
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
            {INFOCARD_STATES.map((st) => {
              const isSelected = state === st
              const stateLabels: Record<InfoCardState, string> = {
                Default: 'Default',
                Destaque: 'Com Destaque',
                Disabled: 'Disabled',
              }
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
                  {stateLabels[st]}
                </button>
              )
            })}
          </PlaygroundControlGroup>

          {/* ÍCONE */}
          <PlaygroundControlGroup label="ÍCONE">
            {INFOCARD_ICONS.map((ic) => {
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
        </div>

        {/* Inputs de TÍTULO e DESCRIÇÃO em tempo real */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="infocard-playground-title"
              className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-1.5 block select-none"
            >
              TÍTULO DO CARD
            </label>
            <input
              id="infocard-playground-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título do InfoCard"
              maxLength={80}
              className="w-full h-8 px-3 rounded-md border border-[#D5DCE5] bg-white text-xs font-semibold text-[#141414] outline-none focus:border-[#004185] focus:ring-1 focus:ring-[#004185] transition-colors placeholder:font-normal placeholder:text-[#9CA3AF]"
            />
          </div>

          <div>
            <label
              htmlFor="infocard-playground-desc"
              className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-1.5 block select-none"
            >
              DESCRIÇÃO / TEXTO DE APOIO
            </label>
            <input
              id="infocard-playground-desc"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Digite o texto explicativo do InfoCard"
              maxLength={160}
              className="w-full h-8 px-3 rounded-md border border-[#D5DCE5] bg-white text-xs font-medium text-[#141414] outline-none focus:border-[#004185] focus:ring-1 focus:ring-[#004185] transition-colors placeholder:font-normal placeholder:text-[#9CA3AF]"
            />
          </div>
        </div>

        {/* Live Preview Container (Soft blue-gray box) */}
        <div className="mt-6 rounded-2xl bg-[#F5F7FA] p-6 sm:p-8 border border-[#EBEBEB]">
          {/* Top row: Preview and Figma Link */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            {/* Left: InfoCard Preview */}
            <div className="flex-1 w-full max-w-2xl py-1">
              <SingleInfoCardPreview config={config} />
            </div>

            {/* Right: Figma link */}
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

      {/* Matriz Completa de Variações — Fundo azul-marinho oficial #062446 sem scrollbar */}
      <InfoCardStateGallery currentTitle={title} currentDescription={description} />
    </div>
  )
}

/** Component for rendering a single InfoCard in preview */
export function SingleInfoCardPreview({
  config,
  className = '',
}: {
  config: InfoCardConfig
  className?: string
}) {
  const { variant, size, state, icon, title, description } = config
  const metrics = INFOCARD_SIZE_METRICS[size] || INFOCARD_SIZE_METRICS.Large
  const colors = INFOCARD_COLOR_TOKENS[variant] || INFOCARD_COLOR_TOKENS.Info
  const iconName = VARIANT_ICONS[variant] || 'info'

  const isDisabled = state === 'Disabled'
  const isHighlight = state === 'Destaque'

  const bgColor = isDisabled ? colors.disabledBg : colors.bg
  const borderColor = isDisabled
    ? colors.disabledBorder
    : isHighlight
      ? colors.highlightBorder
      : colors.border
  const borderWidth = isHighlight ? '1.5px' : '1px'
  const iconColor = isDisabled ? colors.disabledIconColor : colors.iconColor
  const titleColor = isDisabled ? colors.disabledTitleColor : colors.titleColor
  const descColor = isDisabled ? colors.disabledDescColor : colors.descColor
  const boxShadow = isHighlight ? `0 0 0 1px ${colors.highlightBorder}` : undefined

  return (
    <div
      role="region"
      aria-label={title || 'Informação'}
      className={`w-full transition-all duration-200 select-text ${className}`}
      style={{
        backgroundColor: bgColor,
        border: `${borderWidth} solid ${borderColor}`,
        borderRadius: `${metrics.radius}px`,
        padding: metrics.padding,
        boxShadow,
        opacity: isDisabled ? 0.8 : 1,
        cursor: isDisabled ? 'not-allowed' : 'default',
      }}
    >
      <div className="flex items-start" style={{ gap: `${metrics.gap}px` }}>
        {icon === 'Com ícone' && (
          <span
            className="material-symbols-rounded shrink-0 select-none"
            style={{
              fontSize: `${metrics.iconSize}px`,
              lineHeight: 1,
              color: iconColor,
              marginTop: '2px',
            }}
            aria-hidden="true"
          >
            {iconName}
          </span>
        )}
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          {title && (
            <h4
              className="font-bold tracking-tight"
              style={{
                fontSize: `${metrics.titleFontSize}px`,
                lineHeight: metrics.titleLineHeight,
                color: titleColor,
                margin: 0,
              }}
            >
              {title}
            </h4>
          )}
          {description && (
            <p
              className="font-normal"
              style={{
                fontSize: `${metrics.descFontSize}px`,
                lineHeight: metrics.descLineHeight,
                color: descColor,
                margin: 0,
              }}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

/** Complete variation matrix for InfoCard over #062446 navy background without internal scroll */
function InfoCardStateGallery({
  currentTitle,
  currentDescription,
}: {
  currentTitle: string
  currentDescription: string
}) {
  return (
    <div className="mt-10 pt-8 border-t border-[#F0F2F5]">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-[#141414]">
          Matriz completa de variações — (5 variantes × 3 estados × 3 tamanhos × com/sem ícone)
        </h3>
        <p className="text-xs sm:text-sm text-[#7A7A7A] mt-1 font-normal">
          Visualização completa sobre o fundo azul-marinho oficial COMVEN (#062446), dividida em
          blocos por variante, cobrindo Large, Medium e Small sem barras internas de scroll.
        </p>
      </div>

      <div className="mt-5 space-y-6">
        {VARIANT_BLOCKS.map((block) => {
          const defaultTitle = currentTitle || VARIANT_DEFAULT_CONTENT[block.variant].title
          const defaultDesc =
            currentDescription || VARIANT_DEFAULT_CONTENT[block.variant].description

          return (
            <div
              key={block.variant}
              className="rounded-2xl border border-[#0d3663] bg-[#062446] shadow-md p-6 sm:p-8"
            >
              {/* Block Header */}
              <div className="pb-4 border-b border-[#113C68]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm sm:text-base font-bold text-[#F2CB05] tracking-wide uppercase">
                    {block.badge}
                  </span>
                  <span className="text-xs text-[#8BB7E7] font-medium">
                    3 tamanhos × 3 estados × com/sem ícone
                  </span>
                </div>
                <p className="text-xs text-[#D2E4F7] mt-1 font-normal">{block.description}</p>
              </div>

              {/* Column Headers: 3 sizes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 pb-2 border-b border-[#113C68]/60 text-[11px] font-bold uppercase tracking-wider text-[#8BB7E7]">
                <div>Large (Padding 24×28 · Ícone 28px)</div>
                <div>Medium (Padding 18×22 · Ícone 24px)</div>
                <div>Small (Padding 14×18 · Ícone 20px)</div>
              </div>

              {/* Rows by State */}
              <div className="divide-y divide-[#113C68]/40">
                {INFOCARD_STATES.map((st) => {
                  const stateLabels: Record<InfoCardState, string> = {
                    Default: 'Estado Default (Borda suave)',
                    Destaque: 'Estado com Borda de Destaque',
                    Disabled: 'Estado Desabilitado (Inativo)',
                  }

                  return (
                    <div key={st} className="py-6 space-y-4">
                      {/* State badge */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[#F2CB05] tracking-wide uppercase">
                          {stateLabels[st]}
                        </span>
                        <div className="flex-1 h-px bg-[#113C68]/60" />
                      </div>

                      {/* Sub-row: COM ÍCONE */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8BB7E7]/80">
                          • Com ícone ({block.iconName})
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                          {INFOCARD_SIZES.map((sz) => (
                            <SingleInfoCardPreview
                              key={`${block.variant}-${st}-${sz}-com-icone`}
                              config={{
                                variant: block.variant,
                                size: sz,
                                state: st,
                                icon: 'Com ícone',
                                title: defaultTitle,
                                description: defaultDesc,
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Sub-row: SEM ÍCONE */}
                      <div className="space-y-2 pt-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8BB7E7]/80">
                          • Sem ícone (Apenas texto)
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                          {INFOCARD_SIZES.map((sz) => (
                            <SingleInfoCardPreview
                              key={`${block.variant}-${st}-${sz}-sem-icone`}
                              config={{
                                variant: block.variant,
                                size: sz,
                                state: st,
                                icon: 'Sem ícone',
                                title: defaultTitle,
                                description: defaultDesc,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
