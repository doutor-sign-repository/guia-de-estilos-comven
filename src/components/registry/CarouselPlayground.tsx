import React, { useState, useMemo } from 'react'
import {
  CarouselConfig,
  CarouselSize,
  CarouselState,
  CarouselImageOption,
  CarouselTextOption,
  CarouselActionOption,
  CarouselSlideData,
  CAROUSEL_SIZE_METRICS,
  generateCarouselCss,
} from './types'
import { PlaygroundControlGroup } from './PlaygroundControlGroup'
import { useToast } from '@/hooks/use-toast'

export interface CarouselPlaygroundProps {
  initialConfig?: Partial<CarouselConfig>
}

const CAROUSEL_SIZES: CarouselSize[] = ['Large', 'Medium', 'Small']
const CAROUSEL_STATES: CarouselState[] = ['Default', 'Hover']
const CAROUSEL_IMAGE_OPTIONS: CarouselImageOption[] = ['Com imagem', 'Sem imagem']
const CAROUSEL_TEXT_OPTIONS: CarouselTextOption[] = ['Com texto', 'Sem texto']
const CAROUSEL_ACTION_OPTIONS: CarouselActionOption[] = ['Com botão', 'Sem botão']

export const DEFAULT_CAROUSEL_SLIDES: CarouselSlideData[] = [
  {
    id: 'slide-1',
    title: 'Frota Integrada COMVEN',
    text: 'Gestão inteligente de transporte e monitoramento em tempo real para toda a malha rodoviária.',
    imageUrl: 'https://img.usecurling.com/p/800/400?q=truck%20highway&color=navy',
    imageAlt: 'Frota integrada na rodovia',
    actionLabel: 'Conhecer frota',
  },
  {
    id: 'slide-2',
    title: 'Centros de Distribuição',
    text: 'Infraestrutura moderna com alta capacidade de armazenagem e tecnologia de ponta.',
    imageUrl: 'https://img.usecurling.com/p/800/400?q=modern%20warehouse&color=blue',
    imageAlt: 'Centro de distribuição moderno',
    actionLabel: 'Ver instalações',
  },
  {
    id: 'slide-3',
    title: 'Tecnologia em Logística',
    text: 'Roteirização dinâmica e redução de prazos com telemetria e análise preditiva de rotas.',
    imageUrl: 'https://img.usecurling.com/p/800/400?q=logistics%20dashboard&color=darkblue',
    imageAlt: 'Tecnologia de telemetria logística',
    actionLabel: 'Acessar painel',
  },
]

export const CarouselPlayground: React.FC<CarouselPlaygroundProps> = ({ initialConfig }) => {
  const { toast } = useToast()

  const [size, setSize] = useState<CarouselSize>(initialConfig?.size || 'Large')
  const [state, setState] = useState<CarouselState>(initialConfig?.state || 'Default')
  const [hasImage, setHasImage] = useState<CarouselImageOption>(
    initialConfig?.hasImage || 'Com imagem',
  )
  const [hasText, setHasText] = useState<CarouselTextOption>(initialConfig?.hasText || 'Com texto')
  const [hasAction, setHasAction] = useState<CarouselActionOption>(
    initialConfig?.hasAction || 'Com botão',
  )

  const [activeSlideIndex, setActiveSlideIndex] = useState(0)

  // Campos de texto editáveis para o slide atual em tempo real
  const [title, setTitle] = useState(initialConfig?.title || 'Frota Integrada COMVEN')
  const [text, setText] = useState(
    initialConfig?.text ||
      'Gestão inteligente de transporte e monitoramento em tempo real para toda a malha rodoviária.',
  )
  const [actionLabel, setActionLabel] = useState(initialConfig?.actionLabel || 'Conhecer frota')

  const [copied, setCopied] = useState(false)

  const config: CarouselConfig = useMemo(
    () => ({
      size,
      state,
      hasImage,
      hasText,
      hasAction,
      title,
      text,
      actionLabel,
    }),
    [size, state, hasImage, hasText, hasAction, title, text, actionLabel],
  )

  const cssCode = useMemo(() => generateCarouselCss(config), [config])

  const copyCss = () => {
    navigator.clipboard.writeText(cssCode)
    setCopied(true)
    toast({
      title: 'CSS Copiado!',
      description:
        'As regras CSS do componente Carousel foram copiadas para a área de transferência.',
    })
    setTimeout(() => setCopied(false), 2000)
  }

  // Monta os slides dinâmicos considerando as edições do playground
  const liveSlides: CarouselSlideData[] = useMemo(() => {
    return DEFAULT_CAROUSEL_SLIDES.map((slide, idx) => {
      if (idx === activeSlideIndex) {
        return {
          ...slide,
          title,
          text,
          actionLabel,
        }
      }
      return slide
    })
  }, [activeSlideIndex, title, text, actionLabel])

  const FIGMA_PROTO_URL =
    'https://www.figma.com/proto/YEMa9j7O8aNm5PVmS8eSlC/Guia-de-Estilos?node-id=34-1734&viewport=-759%2C471%2C0.32&t=wAmAkj8XxXp7cOHD-1&scaling=contain&content-scaling=responsive&page-id=18%3A2'

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EBEBEB] shadow-sm">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="pt-0.5">
          <h2 className="text-2xl sm:text-[28px] font-bold text-[#141414] leading-tight tracking-tight">
            Carousel (Carrossel de Conteúdo)
          </h2>
          <p className="text-sm sm:text-[15px] text-[#666666] mt-1 font-normal">
            Apresentação de conteúdo em slides navegáveis para produtos digitais COMVEN — opções com
            ou sem imagem, estrutura de texto com título + descrição, e botão de ação primário
          </p>
        </div>
      </div>

      {/* Diretriz oficial */}
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
            Utilize o <strong>Carousel</strong> para destacar novidades da rede, campanhas sazonais
            ou avisos com múltiplos conteúdos sem ocupar espaço vertical excessivo.
          </p>
          <p className="text-[#33567F]">
            Garante acessibilidade e autonomia ao usuário: navegação sempre disponível por setas (‹
            ›) e indicadores (dots), com foco acessível de 1px e transição suave entre os slides.
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
            Alterne entre com/sem imagem, com/sem texto e com/sem botão de ação. Navegue entre os
            slides de demonstração e edite os textos em tempo real.
          </p>
        </div>

        {/* Controles de Grupo (Regra: quebra por grupo inteiro) */}
        <div className="mt-6 flex flex-wrap items-start gap-x-8 gap-y-4">
          {/* TAMANHO */}
          <PlaygroundControlGroup label="TAMANHO">
            {CAROUSEL_SIZES.map((sz) => {
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

          {/* ESTADO DOS BOTÕES */}
          <PlaygroundControlGroup label="ESTADO DOS BOTÕES">
            {CAROUSEL_STATES.map((st) => {
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

          {/* IMAGEM */}
          <PlaygroundControlGroup label="IMAGEM">
            {CAROUSEL_IMAGE_OPTIONS.map((opt) => {
              const isSelected = hasImage === opt
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setHasImage(opt)}
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

          {/* TEXTO */}
          <PlaygroundControlGroup label="TEXTO (TÍTULO + DESCRIÇÃO)">
            {CAROUSEL_TEXT_OPTIONS.map((opt) => {
              const isSelected = hasText === opt
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setHasText(opt)}
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

          {/* BOTÃO DE AÇÃO */}
          <PlaygroundControlGroup label="BOTÃO DE AÇÃO">
            {CAROUSEL_ACTION_OPTIONS.map((opt) => {
              const isSelected = hasAction === opt
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setHasAction(opt)}
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
        </div>

        {/* Campos de texto editáveis */}
        {(hasText === 'Com texto' || hasAction === 'Com botão') && (
          <div className="mt-6 pt-5 border-t border-[#F0F2F5] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] block select-none">
                CAMPOS DE TEXTO EDITÁVEIS (SLIDE {activeSlideIndex + 1} DE {liveSlides.length})
              </span>
              <span className="text-[11px] text-[#004185] font-medium">
                Altera o slide atualmente selecionado
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {hasText === 'Com texto' && (
                <>
                  <div>
                    <label
                      htmlFor="carousel-title-input"
                      className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-1.5 block select-none"
                    >
                      TÍTULO DO SLIDE
                    </label>
                    <input
                      id="carousel-title-input"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Título do slide"
                      maxLength={60}
                      className="w-full h-8 px-3 rounded-md border border-[#D5DCE5] bg-white text-xs font-semibold text-[#141414] outline-none focus:border-[#004185] focus:ring-1 focus:ring-[#004185] transition-colors placeholder:text-[#9CA3AF]"
                    />
                  </div>

                  <div className={hasAction === 'Com botão' ? '' : 'md:col-span-2'}>
                    <label
                      htmlFor="carousel-text-input"
                      className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-1.5 block select-none"
                    >
                      TEXTO DESCRITIVO
                    </label>
                    <input
                      id="carousel-text-input"
                      type="text"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Texto descritivo do slide"
                      maxLength={140}
                      className="w-full h-8 px-3 rounded-md border border-[#D5DCE5] bg-white text-xs font-normal text-[#141414] outline-none focus:border-[#004185] focus:ring-1 focus:ring-[#004185] transition-colors placeholder:text-[#9CA3AF]"
                    />
                  </div>
                </>
              )}

              {hasAction === 'Com botão' && (
                <div className={hasText === 'Sem texto' ? 'md:col-span-3' : ''}>
                  <label
                    htmlFor="carousel-btn-input"
                    className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-1.5 block select-none"
                  >
                    RÓTULO DO BOTÃO
                  </label>
                  <input
                    id="carousel-btn-input"
                    type="text"
                    value={actionLabel}
                    onChange={(e) => setActionLabel(e.target.value)}
                    placeholder="Ex.: Ver mais"
                    maxLength={30}
                    className="w-full h-8 px-3 rounded-md border border-[#D5DCE5] bg-white text-xs font-semibold text-[#141414] outline-none focus:border-[#004185] focus:ring-1 focus:ring-[#004185] transition-colors placeholder:text-[#9CA3AF]"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Live Preview Container */}
        <div className="mt-6 rounded-2xl bg-[#F5F7FA] p-6 sm:p-8 border border-[#EBEBEB]">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] block">
                PRÉVIA INTERATIVA
              </span>
              <p className="text-xs text-[#555555] mt-0.5">
                Navegue usando as setas laterais (‹ ›) ou clicando diretamente nos indicadores
                (dots).
              </p>
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

          {/* Interactive Carousel Preview Box */}
          <div className="w-full py-4 flex items-center justify-center">
            <SingleCarouselPreview
              config={config}
              slides={liveSlides}
              currentIndex={activeSlideIndex}
              onSlideChange={(newIdx) => {
                setActiveSlideIndex(newIdx)
                const nextSlide = liveSlides[newIdx]
                if (nextSlide) {
                  if (nextSlide.title) setTitle(nextSlide.title)
                  if (nextSlide.text) setText(nextSlide.text)
                  if (nextSlide.actionLabel) setActionLabel(nextSlide.actionLabel)
                }
              }}
              onActionClick={(slide) => {
                toast({
                  title: 'Ação acionada!',
                  description: `Botão "${slide.actionLabel || actionLabel}" do slide "${slide.title || 'Slide'}" foi clicado.`,
                })
              }}
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
      <CarouselStateGallery currentTitle={title} currentText={text} currentAction={actionLabel} />
    </div>
  )
}

/**
 * Componente funcional do Carrossel COMVEN
 */
export function SingleCarouselPreview({
  config,
  slides = DEFAULT_CAROUSEL_SLIDES,
  currentIndex: externalIndex,
  onSlideChange,
  onActionClick,
  className = '',
  darkMode = false,
}: {
  config: CarouselConfig
  slides?: CarouselSlideData[]
  currentIndex?: number
  onSlideChange?: (newIndex: number) => void
  onActionClick?: (slide: CarouselSlideData) => void
  className?: string
  darkMode?: boolean
}) {
  const [internalIndex, setInternalIndex] = useState(0)
  const [localHover, setLocalHover] = useState(false)

  const activeIdx = externalIndex !== undefined ? externalIndex : internalIndex
  const totalSlides = slides.length

  const handleIndexChange = (newIdx: number) => {
    let normalized = newIdx
    if (normalized < 0) normalized = totalSlides - 1
    if (normalized >= totalSlides) normalized = 0

    if (externalIndex === undefined) {
      setInternalIndex(normalized)
    }
    onSlideChange?.(normalized)
  }

  const currentSlide = slides[activeIdx] || slides[0]
  const metrics = CAROUSEL_SIZE_METRICS[config.size] || CAROUSEL_SIZE_METRICS.Medium

  const isHoverState = config.state === 'Hover' || localHover
  const showImage = config.hasImage === 'Com imagem'
  const showText = config.hasText === 'Com texto'
  const showAction = config.hasAction === 'Com botão'

  // Cores de botão
  const navBtnBg = isHoverState ? '#00346A' : '#004185'
  const actionBtnBg = isHoverState ? '#00346A' : '#004185'

  // Se não tem texto nem imagem e nem botão, mostra um aviso visual harmonioso
  const isCompletelyEmpty = !showImage && !showText && !showAction

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden transition-all duration-300 shadow-md ${
        darkMode ? 'bg-[#082C56] border border-[#113C68]' : 'bg-white border border-[#E2E6EB]'
      } ${className}`}
      style={{
        maxWidth: `${metrics.maxWidth}px`,
        fontFamily: "'Open Sans', sans-serif",
      }}
      onMouseEnter={() => setLocalHover(true)}
      onMouseLeave={() => setLocalHover(false)}
    >
      {/* Imagem do Slide (quando "Com imagem") */}
      {showImage && (
        <div
          className="relative w-full overflow-hidden bg-[#062446]"
          style={{ height: `${metrics.imageHeight}px` }}
        >
          {currentSlide?.imageUrl ? (
            <img
              src={currentSlide.imageUrl}
              alt={currentSlide.imageAlt || currentSlide.title || 'Slide imagem'}
              className="w-full h-full object-cover transition-opacity duration-300 select-none"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#062446] to-[#004185] text-white p-6 select-none">
              <span
                className="material-symbols-rounded text-[#F2CB05] mb-2"
                style={{ fontSize: '36px' }}
              >
                image
              </span>
              <span className="text-xs font-semibold text-[#D2E4F7] uppercase tracking-wider">
                Imagem ilustrativa COMVEN
              </span>
            </div>
          )}

          {/* Gradiente sutil se houver texto sobreposto quando não houver container de corpo separado */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>
      )}

      {/* Placeholder elegante caso não haja imagem e não haja texto (combinação sem imagem + sem texto) */}
      {!showImage && !showText && (
        <div
          className={`w-full flex flex-col items-center justify-center p-8 text-center select-none ${
            darkMode ? 'bg-[#001D3D]/60' : 'bg-[#F0F5FA]'
          }`}
          style={{ minHeight: `${metrics.imageHeight * 0.75}px` }}
        >
          <span
            className="material-symbols-rounded text-[#004185] mb-2"
            style={{ fontSize: '32px' }}
          >
            view_carousel
          </span>
          <span
            className={`text-xs font-bold uppercase tracking-wider ${
              darkMode ? 'text-[#8BB7E7]' : 'text-[#004185]'
            }`}
          >
            Slide {activeIdx + 1} de {totalSlides} (Sem imagem e sem texto)
          </span>
        </div>
      )}

      {/* Corpo com Título, Texto e Botão de Ação */}
      {(showText || showAction) && (
        <div className="flex flex-col gap-3" style={{ padding: metrics.padding }}>
          {showText && (
            <div className="space-y-1.5">
              <h3
                className={`font-bold tracking-tight m-0 ${
                  darkMode ? 'text-white' : 'text-[#141414]'
                }`}
                style={{
                  fontSize: `${metrics.titleSize}px`,
                  lineHeight: `${metrics.titleLineHeight}px`,
                }}
              >
                {currentSlide?.title || config.title || `Slide ${activeIdx + 1}`}
              </h3>
              <p
                className={`font-normal m-0 leading-relaxed ${
                  darkMode ? 'text-[#D2E4F7]' : 'text-[#525252]'
                }`}
                style={{
                  fontSize: `${metrics.textSize}px`,
                  lineHeight: `${metrics.textLineHeight}px`,
                }}
              >
                {currentSlide?.text || config.text}
              </p>
            </div>
          )}

          {showAction && (
            <div className={showText ? 'pt-1' : ''}>
              <button
                type="button"
                onClick={() => onActionClick?.(currentSlide)}
                className="inline-flex items-center justify-center font-semibold text-white rounded-md transition-colors select-none focus:outline-none"
                style={{
                  height: `${metrics.buttonHeight}px`,
                  padding: '0 20px',
                  backgroundColor: actionBtnBg,
                  fontSize: '13px',
                  outline: isHoverState ? '1px solid #004185' : 'none',
                  outlineOffset: '1px',
                }}
              >
                <span>{currentSlide?.actionLabel || config.actionLabel || 'Acessar'}</span>
                <span
                  className="material-symbols-rounded text-sm ml-1.5"
                  style={{ fontSize: '16px' }}
                >
                  arrow_forward
                </span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Caso totalmente vazio */}
      {isCompletelyEmpty && (
        <div className="p-6 text-center text-xs text-[#7A7A7A]">
          Carrossel sem imagem, texto ou botão — configure os elementos no playground
        </div>
      )}

      {/* Botões de Navegação (‹ e ›) */}
      <button
        type="button"
        aria-label="Slide anterior"
        onClick={() => handleIndexChange(activeIdx - 1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full text-white shadow-lg transition-transform active:scale-95 focus:outline-none z-10"
        style={{
          width: `${metrics.navButtonSize}px`,
          height: `${metrics.navButtonSize}px`,
          backgroundColor: navBtnBg,
          outline: isHoverState ? '1px solid #004185' : 'none',
          outlineOffset: '1px',
        }}
      >
        <span
          className="material-symbols-rounded select-none"
          style={{ fontSize: `${metrics.navIconSize}px` }}
        >
          chevron_left
        </span>
      </button>

      <button
        type="button"
        aria-label="Próximo slide"
        onClick={() => handleIndexChange(activeIdx + 1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full text-white shadow-lg transition-transform active:scale-95 focus:outline-none z-10"
        style={{
          width: `${metrics.navButtonSize}px`,
          height: `${metrics.navButtonSize}px`,
          backgroundColor: navBtnBg,
          outline: isHoverState ? '1px solid #004185' : 'none',
          outlineOffset: '1px',
        }}
      >
        <span
          className="material-symbols-rounded select-none"
          style={{ fontSize: `${metrics.navIconSize}px` }}
        >
          chevron_right
        </span>
      </button>

      {/* Indicadores (Dots) na base */}
      <div className="flex items-center justify-center gap-2 py-3">
        {slides.map((_, dotIdx) => {
          const isActive = dotIdx === activeIdx
          return (
            <button
              key={`dot-${dotIdx}`}
              type="button"
              aria-label={`Ir para slide ${dotIdx + 1}`}
              onClick={() => handleIndexChange(dotIdx)}
              className="transition-all duration-200 select-none focus:outline-none"
              style={{
                width: isActive ? `${metrics.dotSize * 2.2}px` : `${metrics.dotSize}px`,
                height: `${metrics.dotSize}px`,
                borderRadius: '999px',
                backgroundColor: isActive
                  ? darkMode
                    ? '#F2CB05'
                    : '#004185'
                  : darkMode
                    ? '#194575'
                    : '#D5DCE5',
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

/**
 * Matriz completa de variações sobre fundo azul-marinho #062446
 * Exibe todas as 8 combinações solicitadas:
 * [Com/Sem imagem] × [Com/Sem texto] × [Com/Sem botão de ação]
 */
function CarouselStateGallery({
  currentTitle,
  currentText,
  currentAction,
}: {
  currentTitle: string
  currentText: string
  currentAction: string
}) {
  const combinations: Array<{
    id: string
    title: string
    description: string
    hasImage: CarouselImageOption
    hasText: CarouselTextOption
    hasAction: CarouselActionOption
  }> = [
    {
      id: 'comb-1',
      title: '1. Com imagem + Com texto + Com botão (Completo)',
      description: 'Apresentação padrão ideal para campanhas e banners de alta relevância.',
      hasImage: 'Com imagem',
      hasText: 'Com texto',
      hasAction: 'Com botão',
    },
    {
      id: 'comb-2',
      title: '2. Com imagem + Com texto + Sem botão',
      description: 'Slide ilustrado de leitura informativa sem CTA obrigatório.',
      hasImage: 'Com imagem',
      hasText: 'Com texto',
      hasAction: 'Sem botão',
    },
    {
      id: 'comb-3',
      title: '3. Com imagem + Sem texto + Com botão',
      description: 'Slide visual com CTA direto (ex.: banners promocionais com arte fechada).',
      hasImage: 'Com imagem',
      hasText: 'Sem texto',
      hasAction: 'Com botão',
    },
    {
      id: 'comb-4',
      title: '4. Com imagem + Sem texto + Sem botão (Visual puro)',
      description: 'Galeria visual e fotográfica limpa com apenas navegação lateral e dots.',
      hasImage: 'Com imagem',
      hasText: 'Sem texto',
      hasAction: 'Sem botão',
    },
    {
      id: 'comb-5',
      title: '5. Sem imagem + Com texto + Com botão',
      description: 'Comunicação tipográfica com foco no argumento e ação direta.',
      hasImage: 'Sem imagem',
      hasText: 'Com texto',
      hasAction: 'Com botão',
    },
    {
      id: 'comb-6',
      title: '6. Sem imagem + Com texto + Sem botão (Tipográfico puro)',
      description: 'Mensagens institucionais, comunicados e citações em destaque.',
      hasImage: 'Sem imagem',
      hasText: 'Com texto',
      hasAction: 'Sem botão',
    },
    {
      id: 'comb-7',
      title: '7. Sem imagem + Sem texto + Com botão',
      description: 'Módulo ultra compacto para atalhos e acionamentos rápidos.',
      hasImage: 'Sem imagem',
      hasText: 'Sem texto',
      hasAction: 'Com botão',
    },
    {
      id: 'comb-8',
      title: '8. Sem imagem + Sem texto + Sem botão (Estrutural mínimo)',
      description: 'Estrutura mínima de transição para contêineres customizados.',
      hasImage: 'Sem imagem',
      hasText: 'Sem texto',
      hasAction: 'Sem botão',
    },
  ]

  return (
    <div className="mt-10 pt-8 border-t border-[#F0F2F5]">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-[#141414]">
          Matriz completa de variações — (8 combinações sobre fundo azul-marinho #062446)
        </h3>
        <p className="text-xs sm:text-sm text-[#7A7A7A] mt-1 font-normal">
          Cobertura total das combinações: [Com/Sem imagem] × [Com/Sem texto] × [Com/Sem botão de
          ação]. Visualização sem barras de scroll horizontais ou verticais artificiais.
        </p>
      </div>

      <div className="mt-6 space-y-6">
        {combinations.map((comb) => {
          const configVariant: CarouselConfig = {
            size: 'Medium',
            state: 'Default',
            hasImage: comb.hasImage,
            hasText: comb.hasText,
            hasAction: comb.hasAction,
            title: currentTitle || 'Destaque Operacional COMVEN',
            text:
              currentText ||
              'Acompanhe o fluxo consolidado de entregas e indicadores estratégicos.',
            actionLabel: currentAction || 'Acessar módulo',
          }

          return (
            <div
              key={comb.id}
              className="rounded-2xl border border-[#0d3663] bg-[#062446] shadow-md p-6 sm:p-8"
            >
              {/* Header do card da combinação */}
              <div className="pb-4 border-b border-[#113C68] flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-sm sm:text-base font-bold text-[#F2CB05] tracking-wide uppercase block">
                    {comb.title}
                  </span>
                  <p className="text-xs text-[#D2E4F7] mt-1 font-normal">{comb.description}</p>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#001D3D] text-[#8BB7E7] border border-[#113C68]">
                    {comb.hasImage}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#001D3D] text-[#8BB7E7] border border-[#113C68]">
                    {comb.hasText}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#001D3D] text-[#8BB7E7] border border-[#113C68]">
                    {comb.hasAction}
                  </span>
                </div>
              </div>

              {/* Prévia sobre o fundo azul escuro */}
              <div className="pt-6 flex justify-center items-center">
                <SingleCarouselPreview config={configVariant} darkMode={true} className="mx-auto" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
