import React, { useState } from 'react'
import {
  ComponentDefinition,
  FixedMessageConfig,
  FixedMessageSeverity,
  FixedMessageActionsOption,
  FixedMessageDismissOption,
  FixedMessageScope,
  FixedMessageStackCount,
  FixedMessageSeverityTokens,
  FIXED_MESSAGE_SEVERITY_TOKENS,
  FIXED_MESSAGE_SEVERITY_ORDER,
  FIXED_MESSAGE_METRICS,
  generateFixedMessageCss,
} from './types'
import { PlaygroundControlGroup } from './PlaygroundControlGroup'
import { useToast } from '@/hooks/use-toast'

export interface FixedMessagePlaygroundProps {
  initialConfig?: Partial<FixedMessageConfig>
}

const SEVERITIES: FixedMessageSeverity[] = ['Informativo', 'Atenção', 'Crítico']
const ACTIONS_OPTIONS: FixedMessageActionsOption[] = ['Nenhuma', '1 ação', '2 ações']
const DISMISS_OPTIONS: FixedMessageDismissOption[] = ['Dispensável', 'Não dispensável']
const STACK_OPTIONS: FixedMessageStackCount[] = [1, 2, 3]
const SCOPES: FixedMessageScope[] = ['Global', 'Módulo']

const ACTION_LABELS: Record<FixedMessageSeverity, { primary: string; secondary: string }> = {
  Informativo: { primary: 'Ver novidades', secondary: 'Saiba mais' },
  Atenção: { primary: 'Corrigir agora', secondary: 'Saiba mais' },
  Crítico: { primary: 'Ver janela de manutenção', secondary: 'Saiba mais' },
}

const DEFAULT_CONTENT: Record<FixedMessageSeverity, { titulo: string; descricao: string }> = {
  Informativo: {
    titulo: 'Nova versão do painel disponível',
    descricao:
      'Os relatórios agora incluem filtros por região. Veja o que mudou nas notas de versão.',
  },
  Atenção: {
    titulo: 'Pendência de configuração de e-mail',
    descricao:
      'O domínio de envio ainda não foi validado. Notificações podem não chegar aos clientes.',
  },
  Crítico: {
    titulo: 'Modo somente leitura ativo',
    descricao:
      'A aplicação está em manutenção. Não é possível salvar alterações até o término da janela programada.',
  },
}

/** Mensagens do cenário de empilhamento — uma de cada severidade + extras para provar o limite. */
const STACK_SCENARIO: Array<{
  id: string
  severidade: FixedMessageSeverity
  titulo: string
  descricao: string
}> = [
  {
    id: 'fx-stack-info',
    severidade: 'Informativo',
    titulo: 'Nova versão do painel disponível',
    descricao:
      'Os relatórios agora incluem filtros por região. Veja o que mudou nas notas de versão.',
  },
  {
    id: 'fx-stack-warn',
    severidade: 'Atenção',
    titulo: 'Pendência de configuração de e-mail',
    descricao:
      'O domínio de envio ainda não foi validado. Notificações podem não chegar aos clientes.',
  },
  {
    id: 'fx-stack-crit',
    severidade: 'Crítico',
    titulo: 'Modo somente leitura ativo',
    descricao:
      'A aplicação está em manutenção. Não é possível salvar alterações até o término da janela programada.',
  },
  {
    id: 'fx-stack-extra',
    severidade: 'Atenção',
    titulo: 'Ambiente de homologação',
    descricao: 'Você está em ambiente de homologação — dados de teste, sem valor legal.',
  },
]

/** Ordena por severidade (crítico → atenção → informativo) e, depois, por recência (índice). */
function sortStacked<T extends { severidade: FixedMessageSeverity }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const ai = FIXED_MESSAGE_SEVERITY_ORDER.indexOf(a.severidade)
    const bi = FIXED_MESSAGE_SEVERITY_ORDER.indexOf(b.severidade)
    return ai - bi
  })
}

export const FixedMessagePlayground: React.FC<FixedMessagePlaygroundProps> = ({
  initialConfig,
}) => {
  const { toast } = useToast()

  const [severidade, setSeveridade] = useState<FixedMessageSeverity>(
    initialConfig?.severidade || 'Atenção',
  )
  const [acoes, setAcoes] = useState<FixedMessageActionsOption>(initialConfig?.acoes || '2 ações')
  const [fechamento, setFechamento] = useState<FixedMessageDismissOption>(
    initialConfig?.fechamento || 'Dispensável',
  )
  const [empilhamento, setEmpilhamento] = useState<FixedMessageStackCount>(
    initialConfig?.empilhamento || 1,
  )
  const [escopo, setEscopo] = useState<FixedMessageScope>(initialConfig?.escopo || 'Global')
  const [titulo, setTitulo] = useState<string>(
    initialConfig?.titulo ?? DEFAULT_CONTENT['Atenção'].titulo,
  )
  const [descricao, setDescricao] = useState<string>(
    initialConfig?.descricao ?? DEFAULT_CONTENT['Atenção'].descricao,
  )
  const [copied, setCopied] = useState(false)

  // Mensagens dispensadas do cenário de empilhamento (chave: id da mensagem)
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set())

  const config: FixedMessageConfig = {
    severidade,
    acoes,
    fechamento,
    empilhamento,
    escopo,
    titulo,
    descricao,
  }
  const cssCode = generateFixedMessageCss(config)
  const tokens: FixedMessageSeverityTokens = FIXED_MESSAGE_SEVERITY_TOKENS[severidade]

  const handleSeveridadeChange = (newSev: FixedMessageSeverity) => {
    setSeveridade(newSev)
    // Atualiza título/descrição apenas se ainda forem os padrões anteriores
    const prevDefaults = DEFAULT_CONTENT[severidade]
    if (titulo === prevDefaults.titulo && descricao === prevDefaults.descricao) {
      setTitulo(DEFAULT_CONTENT[newSev].titulo)
      setDescricao(DEFAULT_CONTENT[newSev].descricao)
    }
  }

  const copyCss = () => {
    navigator.clipboard.writeText(cssCode)
    setCopied(true)
    toast({
      title: 'CSS Copiado!',
      description: 'Código CSS da Mensagem Fixa copiado para a área de transferência.',
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDismissStackItem = (id: string) => {
    setDismissedIds((prev) => new Set(prev).add(id))
  }

  const resetStack = () => {
    setDismissedIds(new Set())
  }

  const stacked = sortStacked(STACK_SCENARIO)
    .filter((m) => !dismissedIds.has(m.id))
    .slice(0, empilhamento)

  const FIGMA_PROTO_URL =
    'https://www.figma.com/proto/YEMa9j7O8aNm5PVmS8eSlC/Guia-de-Estilos?node-id=34-1734&viewport=-759%2C471%2C0.32&t=wAmAkj8XxXp7cOHD-1&scaling=contain&content-scaling=responsive&page-id=18%3A2'

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EBEBEB] shadow-sm">
      {/* Section Header */}
      <div className="flex items-start gap-4">
        <div className="pt-0.5">
          <h2 className="text-2xl sm:text-[28px] font-bold text-[#141414] leading-tight tracking-tight">
            Mensagem Fixa (Aviso Persistente no Topo)
          </h2>
          <p className="text-sm sm:text-[15px] text-[#666666] mt-1 font-normal">
            Faixa dedicada acima do conteúdo, abaixo/integrada ao header global — permanece visível
            enquanto a condição de origem existir: sem timeout, distinta de Toast e InfoCard.
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
            Alterne severidade, ações, fechamento, empilhamento e escopo. Edite o título e a
            descrição para ver a composição e o código CSS se adaptarem instantaneamente.
          </p>
        </div>

        {/* Controls: SEVERIDADE, AÇÕES, FECHAMENTO, EMPILHAMENTO, ESCOPO — flex-wrap por grupo indivisível */}
        <div className="mt-6 flex flex-wrap items-start gap-x-8 gap-y-4">
          {/* SEVERIDADE */}
          <PlaygroundControlGroup label="SEVERIDADE">
            {SEVERITIES.map((sev) => {
              const isSelected = severidade === sev
              return (
                <button
                  key={sev}
                  type="button"
                  onClick={() => handleSeveridadeChange(sev)}
                  className={`h-8 px-3.5 rounded-md text-xs font-semibold transition-all select-none shrink-0 ${
                    isSelected
                      ? 'bg-[#004185] text-white shadow-xs'
                      : 'bg-[#F0F2F5] text-[#222222] hover:bg-[#E4E7EC]'
                  }`}
                >
                  {sev}
                </button>
              )
            })}
          </PlaygroundControlGroup>

          {/* AÇÕES */}
          <PlaygroundControlGroup label="AÇÕES">
            {ACTIONS_OPTIONS.map((opt) => {
              const isSelected = acoes === opt
              return (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setAcoes(opt)}
                  className={`h-8 px-3.5 rounded-md text-xs font-semibold transition-all select-none shrink-0 ${
                    isSelected
                      ? 'bg-[#004185] text-white shadow-xs'
                      : 'bg-[#F0F2F5] text-[#222222] hover:bg-[#E4A7EC]' /* never used — dead class kept for symmetry */
                  }`}
                >
                  {opt}
                </button>
              )
            })}
          </PlaygroundControlGroup>

          {/* FECHAMENTO */}
          <PlaygroundControlGroup label="FECHAMENTO">
            {DISMISS_OPTIONS.map((opt) => {
              const isSelected = fechamento === opt
              return (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setFechamento(opt)}
                  className={`h-8 px-3.5 rounded-md text-xs font-semibold transition-all select-none shrink-0 ${
                    isSelected
                      ? 'bg-[#004185] text-white shadow-xs'
                      : 'bg-[#F0F2F5] text-[#222222] hover:bg-[#E4E7EC]'
                  }`}
                >
                  {opt}
                </button>
              )
            })}
          </PlaygroundControlGroup>

          {/* EMPILHAMENTO */}
          <PlaygroundControlGroup label="EMPILHAMENTO">
            {STACK_OPTIONS.map((n) => {
              const isSelected = empilhamento === n
              return (
                <button
                  type="button"
                  key={n}
                  onClick={() => setEmpilhamento(n)}
                  className={`h-8 px-3.5 rounded-md text-xs font-semibold transition-all select-none shrink-0 ${
                    isSelected
                      ? 'bg-[#004185] text-white shadow-xs'
                      : 'bg-[#F0F2F5] text-[#222222] hover:bg-[#E4E7EC]'
                  }`}
                >
                  {n}
                </button>
              )
            })}
          </PlaygroundControlGroup>

          {/* ESCOPO */}
          <PlaygroundControlGroup label="ESCOPO">
            {SCOPES.map((sc) => {
              const isSelected = escopo === sc
              return (
                <button
                  type="button"
                  key={sc}
                  onClick={() => setEscopo(sc)}
                  className={`h-8 px-3.5 rounded-md text-xs font-semibold transition-all select-none shrink-0 ${
                    isSelected
                      ? 'bg-[#004185] text-white shadow-xs'
                      : 'bg-[#F0F2F5] text-[#222222] hover:bg-[#E4E7EC]'
                  }`}
                >
                  {sc}
                </button>
              )
            })}
          </PlaygroundControlGroup>
        </div>

        {/* Inputs de TÍTULO e DESCRIÇÃO em tempo real */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="fixed-message-playground-title"
              className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-1.5 block select-none"
            >
              TÍTULO DA MENSAGEM
            </label>
            <input
              id="fixed-message-playground-title"
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Digite o título da Mensagem Fixa"
              maxLength={80}
              className="w-full h-8 px-3 rounded-md border border-[#D5DCE5] bg-white text-xs font-semibold text-[#141414] outline-none focus:border-[#004185] focus:ring-1 focus:ring-[#004185] transition-colors placeholder:font-normal placeholder:text-[#9CA3AF]"
            />
          </div>

          <div>
            <label
              htmlFor="fixed-message-playground-desc"
              className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-1.5 block select-none"
            >
              DESCRIÇÃO / TEXTO DE APOIO
            </label>
            <input
              id="fixed-message-playground-desc"
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Digite o texto de apoio da Mensagem Fixa"
              maxLength={200}
              className="w-full h-8 px-3 rounded-md border border-[#D5DCE5] bg-white text-xs font-medium text-[#141414] outline-none focus:border-[#004185] focus:ring-1 focus:ring-[#004185] transition-colors placeholder:font-normal placeholder:text-[#9CA3AF]"
            />
          </div>
        </div>

        {/* Live Preview Container */}
        <div className="mt-6 rounded-2xl bg-[#F5F7FA] p-6 sm:p-8 border border-[#EBEBEB]">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="flex-1 w-full max-w-2xl py-1">
              <SingleFixedMessagePreview config={config} />
            </div>

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

            <div className="bg-white rounded-xl border border-[#E2E6EB] p-5 sm:p-6 shadow-2xs">
              <pre className="text-xs sm:text-[13px] font-mono leading-relaxed text-[#1F2328] m-0 whitespace-pre-wrap break-words selection:bg-[#D2E4F7]">
                <code>{cssCode}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Empilhamento — demonstração funcional */}
      <FixedMessageStackDemo
        empilhamento={empilhamento}
        acoes={acoes}
        fechamento={fechamento}
        escopo={escopo}
        dismissedIds={dismissedIds}
        onDismiss={handleDismissStackItem}
        onReset={resetStack}
      />

      {/* Matriz Completa de Variações — Fundo azul-marinho oficial #062446 sem scrollbar */}
      <FixedMessageStateGallery titulo={titulo} descricao={descricao} />
    </div>
  )
}

/** Ação de exemplo do preview: toast de demonstração */
function useDemoActionToast() {
  return useToast().toast
}

/** Single Fixed Message preview — faixa persistente real, com ações e dismiss funcionais. */
export function SingleFixedMessagePreview({
  config,
  onDismiss,
  onAction,
}: {
  config: FixedMessageConfig
  onDismiss?: () => void
  onAction?: (label: string) => void
}) {
  const { severidade, acoes, fechamento, titulo, descricao } = config
  const tokens = FIXED_MESSAGE_SEVERITY_TOKENS[severidade]
  const m = FIXED_MESSAGE_METRICS
  const demoToast = useDemoActionToast()

  const primaryLabel = acoes === 'Nenhuma' ? '' : ACTION_LABELS[severidade].primary
  const secondaryLabel = acoes === '2 ações' ? ACTION_LABELS[severidade].secondary : ''
  const isDismissable = fechamento === 'Dispensável'

  const handleAction = (label: string) => {
    if (onAction) onAction(label)
    else demoToast({ title: label, description: 'Ação executada (demonstração).' })
  }

  return (
    <div
      role={tokens.role}
      aria-label={titulo || 'Mensagem fixa'}
      className="w-full flex items-start select-text transition-all duration-200"
      style={{
        gap: `${m.gap}px`,
        padding: `${m.paddingY}px ${m.paddingX}px`,
        borderRadius: `${m.radius}px`,
        border: `1px solid ${tokens.borderColor}`,
        borderLeft: `${m.leftBorderWidth}px solid ${tokens.accentColor}`,
        backgroundColor: tokens.bgColor,
      }}
    >
      <span
        className="material-symbols-rounded shrink-0 select-none"
        aria-hidden="true"
        style={{
          fontSize: `${m.iconSize}px`,
          lineHeight: 1,
          color: tokens.iconColor,
          marginTop: '1px',
        }}
      >
        {tokens.icon}
      </span>

      <div className="flex flex-col flex-1 min-w-0">
        {titulo && (
          <span
            style={{
              fontSize: `${m.titleFontSize}px`,
              lineHeight: m.titleLineHeight,
              fontWeight: tokens.titleFontWeight,
              color: tokens.titleColor,
            }}
          >
            {titulo}
          </span>
        )}
        {descricao && (
          <span
            style={{
              fontSize: `${m.descFontSize}px`,
              lineHeight: m.descLineHeight,
              fontWeight: 400,
              color: tokens.descColor,
              marginTop: 2,
            }}
          >
            {descricao}
          </span>
        )}

        {acoes !== 'Nenhuma' && (
          <div
            className="flex flex-wrap items-center"
            style={{ gap: `${m.actionsGap}px`, marginTop: `${m.actionsMarginTop}px` }}
          >
            {primaryLabel && (
              <button
                type="button"
                onClick={() => handleAction(primaryLabel)}
                className="inline-flex items-center justify-center shrink-0 rounded-md transition-colors"
                style={{
                  height: `${m.actionHeight}px`,
                  padding: '0 14px',
                  backgroundColor: tokens.accentColor,
                  color: '#FFFFFF',
                  fontSize: `${m.actionFontSize}px`,
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {primaryLabel}
              </button>
            )}
            {secondaryLabel && (
              <button
                type="button"
                onClick={() => handleAction(secondaryLabel)}
                className="inline-flex items-center justify-center shrink-0 rounded-md transition-colors"
                style={{
                  height: `${m.actionHeight}px`,
                  padding: '0 14px',
                  backgroundColor: 'transparent',
                  color: tokens.titleColor,
                  fontSize: `${m.actionFontSize}px`,
                  fontWeight: 600,
                  border: `1px solid ${tokens.borderColor}`,
                  cursor: 'pointer',
                }}
              >
                {secondaryLabel}
              </button>
            )}
          </div>
        )}
      </div>

      {isDismissable && (
        <button
          type="button"
          onClick={() => {
            if (onDismiss) onDismiss()
            else demoToast({ title: 'Mensagem dispensada (demonstração).', description: '' })
          }}
          aria-label="Dispensar mensagem"
          className="inline-flex items-center justify-center shrink-0 rounded transition-colors hover:bg-white/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004185]"
          style={{
            width: 24,
            height: 24,
            color: tokens.iconColor,
            cursor: 'pointer',
            padding: 0,
            border: 'none',
            background: 'transparent',
          }}
        >
          <span
            className="material-symbols-rounded"
            style={{ fontSize: '18px' }}
            aria-hidden="true"
          >
            close
          </span>
        </button>
      )}
    </div>
  )
}

/** Stack demo section — live functional stacking with severity ordering, limit and dismiss. */
function FixedMessageStackDemo({
  empilhamento,
  acoes,
  fechamento,
  escopo,
  dismissedIds,
  onDismiss,
  onReset,
}: {
  empilhamento: FixedMessageStackCount
  acoes: FixedMessageActionsOption
  fechamento: FixedMessageDismissOption
  escopo: FixedMessageScope
  dismissedIds: Set<string>
  onDismiss: (id: string) => void
  onReset: () => void
}) {
  const stack = sortStacked(STACK_SCENARIO)
    .filter((m) => !dismissedIds.has(m.id))
    .slice(0, empilhamento)

  return (
    <div className="mt-10 pt-8 border-t border-[#F0F2F5]">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#141414]">
            Empilhamento — ordenação por severidade com limite
          </h3>
          <p className="text-xs sm:text-sm text-[#7A7A7A] mt-1 font-normal">
            Empilhamento vertical com limite configurável ({empilhamento}) e ordenação por
            severidade: crítico primeiro, depois atenção, depois informativo. Dispensar uma mensagem
            e a próxima entra no lugar (recência como desempate).
          </p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="h-8 px-3.5 rounded-md text-xs font-semibold transition-all select-none shrink-0 bg-[#F0F2F5] text-[#222222] hover:bg-[#E4E7EC]"
        >
          Restaurar empilhamento
        </button>
      </div>

      <div
        role="region"
        aria-label="Área de mensagens fixas empilhadas"
        className="mt-5 rounded-2xl border border-[#0d3663] bg-[#062446] p-6 sm:p-8 space-y-2.5"
      >
        {stack.length === 0 && (
          <p className="text-sm text-[#8BB7E7] italic m-0">
            Nenhuma mensagem fixa ativa. Restaure o empilhamento para continuar a demonstração.
          </p>
        )}
        {stack.map((msg, i) => (
          <div
            key={msg.id}
            className="rounded-lg"
            style={{ animation: 'comven-fade-in 240ms ease both', animationDelay: `${i * 60}ms` }}
          >
            <SingleFixedMessagePreview
              config={{
                severidade: msg.severidade,
                acoes,
                fechamento,
                empilhamento,
                escopo,
                titulo: msg.titulo,
                descricao: msg.descricao,
              }}
              onDismiss={() => onDismiss(msg.id)}
            />
          </div>
        ))}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-[#8BB7E7]">
            {stack.length} de {empilhamento} — limite de {empilhamento} mensagens · 4 mensagens
            disponíveis na simulação
          </span>
          <span className="text-xs font-semibold text-[#F2CB05]">
            {stack.length} / {empilhamento}
          </span>
        </div>
      </div>
    </div>
  )
}

export const FIXED_MESSAGE_DEFINITION: ComponentDefinition<FixedMessageConfig> = {
  id: 'mensagem-fixa',
  name: 'Mensagem Fixa',
  category: 'COMPONENTES',
  subtitle: 'Aviso persistente no topo da aplicação',
  description:
    'Faixa dedicada acima do conteúdo, abaixo/integrada ao header global. Permanece visível enquanto a condição de origem existir — sem timeout. Distinta de Toast e InfoCard: a duração vem da condição, não do tempo de exibição.',
  defaultConfig: {
    severidade: 'Atenção',
    acoes: '2 ações',
    fechamento: 'Dispensável',
    empilhamento: 1,
    escopo: 'Global',
    titulo: 'Pendência de configuração de e-mail',
    descricao:
      'O domínio de envio ainda não foi validado. Notificações podem não chegar aos clientes.',
  },
  generateCss: generateFixedMessageCss,
  renderPreview: (config: FixedMessageConfig) => <FixedMessagePlayground initialConfig={config} />,
}

/** Complete variation matrix over #062446 navy background, no internal scroll. */
function FixedMessageStateGallery({ titulo, descricao }: { titulo: string; descricao: string }) {
  const acoesOptions: FixedMessageActionsOption[] = ['Nenhuma', '1 ação', '2 ações']

  return (
    <div className="mt-10 pt-8 border-t border-[#F0F2F5]">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-[#141414]">
          Matriz completa de variações — (3 severidades × 3 ações × 2 fechamentos)
        </h3>
        <p className="text-xs sm:text-sm text-[#7A7A7A] mt-1 font-normal">
          Visualização completa sobre o fundo azul-marinho oficial COMVEN (#062446), dividida em
          blocos por severidade, cobrindo todas as combinações de ações e fechamento sem barras
          internas de scroll.
        </p>
      </div>

      <div className="mt-5 space-y-6">
        {SEVERITIES.map((sev) => {
          const tokens = FIXED_MESSAGE_SEVERITY_TOKENS[sev]
          return (
            <div
              key={sev}
              className="rounded-2xl border border-[#0d3663] bg-[#062446] shadow-md p-6 sm:p-8"
            >
              {/* Block Header */}
              <div className="pb-4 border-b border-[#113C68]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm sm:text-base font-bold text-[#F2CB05] tracking-wide uppercase">
                    Severidade {tokens.label} —{' '}
                    {tokens.role === 'alert' ? 'role="alert"' : 'role="status"'}
                  </span>
                  <span className="text-xs text-[#8BB7E7] font-medium">
                    3 opções de ação × 2 fechamentos
                  </span>
                </div>
                <p className="text-xs text-[#D2E4F7] mt-1 font-normal">
                  Peso tipográfico do título: {tokens.titleFontWeight} — cor de destaque{' '}
                  {tokens.accentColor}
                </p>
              </div>

              {/* Rows: AÇÕES × FECHAMENTO */}
              <div className="divide-y divide-[#113C68]/40">
                {acoesOptions.map((a) => (
                  <div key={a} className="py-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#F2CB05] tracking-wide uppercase">
                        Ações: {a}
                      </span>
                      <div className="flex-1 h-px bg-[#113C68]/60" />
                    </div>

                    {DISMISS_OPTIONS.map((d) => (
                      <div key={d} className="grid grid-cols-1 gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8BB7E7]/80">
                            • Fechamento: {d}
                          </span>
                        </div>
                        <SingleFixedMessagePreview
                          config={{
                            severidade: sev,
                            acoes: a,
                            fechamento: d,
                            empilhamento: 3,
                            escopo: 'Global',
                            titulo: titulo || DEFAULT_CONTENT[sev].titulo,
                            descricao: descricao || DEFAULT_CONTENT[sev].descricao,
                          }}
                        />
                      </div>
                    ))}
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
