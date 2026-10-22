import React, { useState, useEffect } from 'react'
import { ComvenOfficialLogo } from '@/components/ComvenLogo'
import { LOGO_ASSETS } from '@/data/logos'
import { downloadLogoPng } from '@/lib/logoDownload'
import { useToast } from '@/hooks/use-toast'

export interface LogoDownloadOption {
  id: string
  filename: string
  name: string
  subtitle: string
  badgeText: string
  src: string
  formatText: string // "PNG · fundo transparente" (sem menção a resolução)
  previewVariant: 'light-colorida' | 'dark-colorida' | 'light-1cor' | 'dark-1cor'
  previewShowTagline: boolean
  previewBg: '#F1F3F6' | '#0B2A52'
}

export const LOGO_DOWNLOAD_OPTIONS: LogoDownloadOption[] = [
  // 1. Principal: Light Mode Colorida com Tagline
  {
    id: 'light-colorida-com-tagline',
    filename: 'comven-logo-principal.png',
    name: 'Versão Principal (Fundo Claro)',
    subtitle: 'Colorida com Tagline · Azul #004185, verde #06D04D e check amarelo',
    badgeText: 'Principal',
    src: LOGO_ASSETS.lightColoridaComTagline,
    formatText: 'PNG · Fundo transparente',
    previewVariant: 'light-colorida',
    previewShowTagline: true,
    previewBg: '#F1F3F6',
  },
  // 2. Fundo Escuro: Dark Mode Colorida com Tagline
  {
    id: 'dark-colorida-com-tagline',
    filename: 'comven-logo-fundo-escuro.png',
    name: 'Fundo Escuro — Colorida com Tagline',
    subtitle: 'Wordmark colorido com check amarelo sobre fundo escuro',
    badgeText: 'Fundo Escuro',
    src: LOGO_ASSETS.darkColoridaComTagline,
    formatText: 'PNG · Fundo transparente',
    previewVariant: 'dark-colorida',
    previewShowTagline: true,
    previewBg: '#0B2A52',
  },
  // 3. 1 Cor Azul: Light Mode 1 Cor com Tagline
  {
    id: 'light-1cor-com-tagline',
    filename: 'comven-logo-1cor-azul.png',
    name: 'Fundo Claro — 1 Cor (Azul)',
    subtitle: 'Monocromática com Tagline em azul institucional #004185',
    badgeText: '1 Cor Azul',
    src: LOGO_ASSETS.light1CorComTagline,
    formatText: 'PNG · Fundo transparente',
    previewVariant: 'light-1cor',
    previewShowTagline: true,
    previewBg: '#F1F3F6',
  },
  // 4. 1 Cor Branca: Dark Mode 1 Cor com Tagline
  {
    id: 'dark-1cor-com-tagline',
    filename: 'comven-logo-1cor-branco.png',
    name: 'Fundo Escuro — 1 Cor (Branco)',
    subtitle: 'Monocromática com Tagline em branco #FFFFFF em alto contraste',
    badgeText: '1 Cor Branco',
    src: LOGO_ASSETS.dark1CorComTagline,
    formatText: 'PNG · Fundo transparente',
    previewVariant: 'dark-1cor',
    previewShowTagline: true,
    previewBg: '#0B2A52',
  },
  // 5. Somente marca: Light Mode Colorida sem Tagline
  {
    id: 'light-colorida-sem-tagline',
    filename: 'comven-logo-somente-marca.png',
    name: 'Somente Marca — Fundo Claro (Colorida)',
    subtitle: 'Wordmark compacto colorido sem tagline para reduções e UI',
    badgeText: 'Sem Tagline',
    src: LOGO_ASSETS.lightColoridaSemTagline,
    formatText: 'PNG · Fundo transparente',
    previewVariant: 'light-colorida',
    previewShowTagline: false,
    previewBg: '#F1F3F6',
  },
  // 6. Somente marca: Dark Mode Colorida sem Tagline
  {
    id: 'dark-colorida-sem-tagline',
    filename: 'comven-logo-somente-marca-dark.png',
    name: 'Somente Marca — Fundo Escuro (Colorida)',
    subtitle: 'Wordmark colorido compacto sem tagline para superfícies escuras',
    badgeText: 'Sem Tagline',
    src: LOGO_ASSETS.darkColoridaSemTagline,
    formatText: 'PNG · Fundo transparente',
    previewVariant: 'dark-colorida',
    previewShowTagline: false,
    previewBg: '#0B2A52',
  },
  // 7. Somente marca: Light Mode 1 Cor sem Tagline
  {
    id: 'light-1cor-sem-tagline',
    filename: 'comven-logo-somente-marca-1cor-azul.png',
    name: 'Somente Marca — Fundo Claro (1 Cor Azul)',
    subtitle: 'Wordmark monocromático em azul #004185 para cabeçalhos claros',
    badgeText: 'Sem Tagline',
    src: LOGO_ASSETS.light1CorSemTagline,
    formatText: 'PNG · Fundo transparente',
    previewVariant: 'light-1cor',
    previewShowTagline: false,
    previewBg: '#F1F3F6',
  },
  // 8. Somente marca: Dark Mode 1 Cor sem Tagline
  {
    id: 'dark-1cor-sem-tagline',
    filename: 'comven-logo-somente-marca-1cor-branco.png',
    name: 'Somente Marca — Fundo Escuro (1 Cor Branco)',
    subtitle: 'Wordmark monocromático em branco #FFFFFF para superfícies escuras',
    badgeText: 'Sem Tagline',
    src: LOGO_ASSETS.dark1CorSemTagline,
    formatText: 'PNG · Fundo transparente',
    previewVariant: 'dark-1cor',
    previewShowTagline: false,
    previewBg: '#0B2A52',
  },
]

export interface LogoDownloadModalProps {
  isOpen: boolean
  onClose: () => void
  /**
   * Identificador ou nome de arquivo da opção de onde o modal foi aberto,
   * para dar destaque visual sutil à linha correspondente.
   */
  activeOptionKey?: string | null
}

export const LogoDownloadModal: React.FC<LogoDownloadModalProps> = ({
  isOpen,
  onClose,
  activeOptionKey,
}) => {
  const { toast } = useToast()
  const [downloadingId, setDownloadingId] = useState<string | null>(null)
  const [isDownloadingAll, setIsDownloadingAll] = useState(false)
  const [downloadAllProgress, setDownloadAllProgress] = useState<{
    current: number
    total: number
  } | null>(null)

  // Bloqueia scroll do body e escuta tecla ESC
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (!isDownloadingAll) {
          onClose()
        }
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose, isDownloadingAll])

  if (!isOpen) return null

  // Baixa uma única opção
  const handleDownloadSingle = async (option: LogoDownloadOption) => {
    if (downloadingId || isDownloadingAll) return

    setDownloadingId(option.id)
    toast({
      title: 'Download iniciado',
      description: `Baixando ${option.filename}...`,
    })

    try {
      await downloadLogoPng({
        src: option.src,
        filename: option.filename,
        minWidth: 2400,
      })
    } catch {
      toast({
        title: 'Erro no download',
        description: `Não foi possível baixar o arquivo ${option.filename}. Tente novamente.`,
        variant: 'destructive',
      })
    } finally {
      setDownloadingId(null)
    }
  }

  // Baixa todas as opções em sequência com pequeno intervalo entre downloads
  // para respeitar restrições dos navegadores contra downloads em lote
  const handleDownloadAll = async () => {
    if (isDownloadingAll || downloadingId) return

    setIsDownloadingAll(true)
    const total = LOGO_DOWNLOAD_OPTIONS.length
    setDownloadAllProgress({ current: 0, total })

    toast({
      title: 'Download iniciado',
      description: `Baixando todas as ${total} aplicações do logotipo...`,
    })

    let successCount = 0

    for (let i = 0; i < total; i++) {
      const option = LOGO_DOWNLOAD_OPTIONS[i]
      setDownloadAllProgress({ current: i + 1, total })

      try {
        await downloadLogoPng({
          src: option.src,
          filename: option.filename,
          minWidth: 2400,
        })
        successCount++
      } catch {
        // Continua os downloads restantes mesmo que um falhe
      }

      // Intervalo de 600ms entre downloads para evitar bloqueio pelo browser
      if (i < total - 1) {
        await new Promise((resolve) => setTimeout(resolve, 600))
      }
    }

    setIsDownloadingAll(false)
    setDownloadAllProgress(null)

    if (successCount === total) {
      toast({
        title: 'Downloads concluídos',
        description: `Todas as ${total} versões foram baixadas com sucesso.`,
      })
    } else {
      toast({
        title: 'Download finalizado',
        description: `${successCount} de ${total} arquivos baixados.`,
      })
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="comven-logo-download-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-[#062446]/65 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => {
        if (!isDownloadingAll) onClose()
      }}
    >
      {/* Container do Modal seguindo o padrão de estilo COMVEN */}
      <div
        className="w-full max-w-2xl bg-white border border-[#EBEBEB] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-left animate-in zoom-in-95 duration-200 max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header com título + botão fechar (×) */}
        <div className="flex items-center justify-between border-b border-[#F0F2F5] bg-white px-5 sm:px-6 py-4 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className="material-symbols-rounded shrink-0 select-none text-[#004185] text-xl sm:text-2xl"
              aria-hidden="true"
            >
              download
            </span>
            <div>
              <h3
                id="comven-logo-download-modal-title"
                className="font-bold text-[#141414] text-base sm:text-lg tracking-tight m-0"
              >
                Baixar logos
              </h3>
              <p className="text-xs text-[#666666] m-0 mt-0.5">
                Escolha uma aplicação específica ou baixe todas as 8 versões oficiais.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isDownloadingAll}
            aria-label="Fechar modal"
            className="w-8 h-8 rounded-lg text-[#666666] hover:text-[#141414] hover:bg-[#F0F2F5] transition-colors flex items-center justify-center shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-rounded select-none text-lg">close</span>
          </button>
        </div>

        {/* Corpo com a lista de aplicações */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-3 divide-y divide-[#F0F2F5]/80 flex-1">
          {LOGO_DOWNLOAD_OPTIONS.map((option, index) => {
            // Verifica se esta opção é a que originou a abertura do modal
            const isHighlighted =
              activeOptionKey &&
              (activeOptionKey === option.id ||
                activeOptionKey === option.filename ||
                activeOptionKey.includes(option.id))

            const isThisDownloading = downloadingId === option.id
            const isOtherBusy = isDownloadingAll || (downloadingId !== null && !isThisDownloading)

            return (
              <div
                key={option.id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-3.5 rounded-xl transition-all ${
                  index > 0 ? 'pt-3.5' : ''
                } ${
                  isHighlighted
                    ? 'bg-[#EBF3FC] border border-[#004185]/20 shadow-2xs'
                    : 'bg-white hover:bg-[#FAFBFD] border border-transparent'
                }`}
              >
                {/* Lado Esquerdo: Miniatura + Textos */}
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  {/* Miniatura renderizada com a mesma fidelidade dos cards */}
                  <div
                    className="w-24 sm:w-28 h-14 sm:h-16 rounded-lg flex items-center justify-center p-2 shrink-0 border border-black/5 shadow-2xs"
                    style={{ backgroundColor: option.previewBg }}
                  >
                    <ComvenOfficialLogo
                      variant={option.previewVariant}
                      showTagline={option.previewShowTagline}
                      width={option.previewShowTagline ? 84 : 70}
                      alt={option.name}
                    />
                  </div>

                  {/* Informações da aplicação */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-bold text-xs sm:text-sm text-[#141414] truncate">
                        {option.name}
                      </span>
                      {isHighlighted && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#004185] text-white">
                          Selecionado
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-[#666666] truncate mt-0.5">
                      {option.subtitle}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#004185] bg-[#004185]/8 px-2 py-0.5 rounded-md">
                        <span className="material-symbols-rounded text-xs" aria-hidden="true">
                          check_circle
                        </span>
                        {option.formatText}
                      </span>
                      <span className="text-[10px] font-mono text-[#848484] hidden md:inline">
                        {option.filename}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Lado Direito: Ação de download individual */}
                <div className="flex items-center justify-end shrink-0 sm:pl-2">
                  <button
                    type="button"
                    onClick={() => handleDownloadSingle(option)}
                    disabled={isThisDownloading || isOtherBusy}
                    title={`Baixar ${option.filename}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#004185] hover:text-[#00346A] hover:bg-[#004185]/10 active:bg-[#004185]/15 border border-[#004185]/20 bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-2xs cursor-pointer select-none"
                  >
                    <span className="material-symbols-rounded text-base" aria-hidden="true">
                      {isThisDownloading ? 'hourglass_top' : 'download'}
                    </span>
                    <span>{isThisDownloading ? 'Baixando...' : 'Baixar'}</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer com ações: "Baixar todos" (Primary) + "Cancelar" / Fechar */}
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 px-5 sm:px-6 py-3.5 bg-[#FAFCFE] border-t border-[#F0F2F5] shrink-0">
          <div className="text-xs text-[#666666] flex items-center gap-1.5">
            {isDownloadingAll && downloadAllProgress ? (
              <span className="inline-flex items-center gap-1.5 text-[#004185] font-semibold">
                <span className="material-symbols-rounded animate-spin text-base">
                  progress_activity
                </span>
                Baixando {downloadAllProgress.current} de {downloadAllProgress.total}...
              </span>
            ) : (
              <span className="text-[#848484]">
                Total de 8 aplicações oficiais COMVEN disponíveis
              </span>
            )}
          </div>

          <div className="flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={isDownloadingAll}
              className="px-4 py-2 rounded-lg text-xs font-bold text-[#004185] bg-white border border-[#D5DCE5] hover:bg-[#F5F7FA] active:bg-[#EBF1F8] transition-colors shadow-2xs select-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={handleDownloadAll}
              disabled={isDownloadingAll || downloadingId !== null}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-[#004185] hover:bg-[#00346A] active:bg-[#002750] transition-colors shadow-2xs select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-rounded text-base" aria-hidden="true">
                {isDownloadingAll ? 'hourglass_top' : 'download'}
              </span>
              <span>{isDownloadingAll ? 'Baixando todos...' : 'Baixar todos'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
