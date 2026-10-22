import React, { useState, useEffect, useMemo } from 'react'
import { getLogoPackage, LogoPackageDefinition, LogoPackageFile } from '@/data/logoPackages'
import { downloadPackageFile } from '@/lib/logoDownload'
import { useToast } from '@/hooks/use-toast'

export interface LogoDownloadModalProps {
  isOpen: boolean
  onClose: () => void
  /**
   * Identificador ou nome de arquivo da versão de onde o modal foi aberto.
   * O modal exibe EXCLUSIVAMENTE o pacote de arquivos da versão selecionada.
   */
  activeOptionKey?: string | null
}

export const LogoDownloadModal: React.FC<LogoDownloadModalProps> = ({
  isOpen,
  onClose,
  activeOptionKey,
}) => {
  const { toast } = useToast()
  const [downloadingFileId, setDownloadingFileId] = useState<string | null>(null)
  const [isDownloadingAll, setIsDownloadingAll] = useState(false)
  const [downloadAllProgress, setDownloadAllProgress] = useState<{
    current: number
    total: number
  } | null>(null)

  // Obtém o pacote correspondente à versão clicada
  const activePackage: LogoPackageDefinition = useMemo(() => {
    return getLogoPackage(activeOptionKey)
  }, [activeOptionKey])

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

  // Baixa um arquivo individual do pacote
  const handleDownloadSingle = async (file: LogoPackageFile) => {
    if (downloadingFileId || isDownloadingAll) return

    setDownloadingFileId(file.id)
    toast({
      title: 'Download iniciado',
      description: `Baixando ${file.filename}...`,
    })

    try {
      await downloadPackageFile(file, activePackage.sourceImage)
    } catch {
      toast({
        title: 'Erro no download',
        description: `Não foi possível baixar o arquivo ${file.filename}. Tente novamente.`,
        variant: 'destructive',
      })
    } finally {
      setDownloadingFileId(null)
    }
  }

  // Baixa todos os arquivos DESTE pacote em sequência com intervalo de 600ms
  const handleDownloadAll = async () => {
    if (isDownloadingAll || downloadingFileId) return

    const files = activePackage.files
    const total = files.length
    setIsDownloadingAll(true)
    setDownloadAllProgress({ current: 0, total })

    toast({
      title: 'Download iniciado',
      description: `Baixando os ${total} arquivos do pacote ${activePackage.versionName}...`,
    })

    let successCount = 0

    for (let i = 0; i < total; i++) {
      const file = files[i]
      setDownloadAllProgress({ current: i + 1, total })

      try {
        await downloadPackageFile(file, activePackage.sourceImage)
        successCount++
      } catch {
        // Continua os downloads restantes
      }

      if (i < total - 1) {
        await new Promise((resolve) => setTimeout(resolve, 600))
      }
    }

    setIsDownloadingAll(false)
    setDownloadAllProgress(null)

    if (successCount === total) {
      toast({
        title: 'Pacote baixado',
        description: `Todos os ${total} arquivos do pacote foram baixados com sucesso.`,
      })
    } else {
      toast({
        title: 'Download finalizado',
        description: `${successCount} de ${total} arquivos do pacote foram baixados.`,
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
      {/* Container do Modal */}
      <div
        className="w-full max-w-2xl bg-white border border-[#EBEBEB] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-left animate-in zoom-in-95 duration-200 max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header com título e fechamento */}
        <div className="flex items-start justify-between border-b border-[#F0F2F5] bg-white px-5 sm:px-6 py-4 shrink-0">
          <div className="min-w-0 pr-3">
            <h3
              id="comven-logo-download-modal-title"
              className="font-bold text-[#141414] text-base sm:text-lg tracking-tight m-0"
            >
              {activePackage.brandTitle}
            </h3>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 text-xs">
              <span className="font-semibold text-[#004185]">
                Versão: {activePackage.versionName}
              </span>
              <span className="text-[#848484] hidden sm:inline">•</span>
              <span className="text-[#666666]">{activePackage.usageRecommendation}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isDownloadingAll}
            aria-label="Fechar modal"
            className="w-8 h-8 rounded-lg text-[#666666] hover:text-[#141414] hover:bg-[#F0F2F5] transition-colors flex items-center justify-center shrink-0 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <span className="material-symbols-rounded select-none text-lg">close</span>
          </button>
        </div>

        {/* Corpo: Arquivos deste pacote + Aviso de compatibilidade SVG */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-5 flex-1">
          {/* Seção: ARQUIVOS DESTE PACOTE */}
          <section aria-labelledby="heading-arquivos-pacote">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#F0F2F5]">
              <h4
                id="heading-arquivos-pacote"
                className="text-[11px] font-bold uppercase tracking-wider text-[#666666] m-0"
              >
                Arquivos deste pacote
              </h4>
              <span className="text-[11px] text-[#848484] font-medium">
                {activePackage.files.length} arquivos disponíveis
              </span>
            </div>

            <div className="divide-y divide-[#F0F2F5]">
              {activePackage.files.map((file) => {
                const isThisDownloading = downloadingFileId === file.id
                const isBusy =
                  isDownloadingAll || (downloadingFileId !== null && !isThisDownloading)
                const isSvg = file.format === 'svg'

                return (
                  <div
                    key={file.id}
                    className="py-3.5 first:pt-2 last:pb-2 flex flex-col sm:flex-row sm:items-start justify-between gap-3 group hover:bg-[#FAFBFD] -mx-2 px-2.5 rounded-xl transition-colors"
                  >
                    {/* Informações textuais do arquivo */}
                    <div className="min-w-0 flex-1">
                      {/* Nome do arquivo em fonte monoespaçada com badge de formato */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs sm:text-[13px] font-bold text-[#141414] break-all select-all">
                          {file.filename}
                        </span>
                        {file.badgeText && (
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-md shrink-0 ${
                              isSvg
                                ? 'bg-[#7C3AED]/10 text-[#6D28D9]'
                                : 'bg-[#004185]/8 text-[#004185]'
                            }`}
                          >
                            {file.badgeText}
                          </span>
                        )}
                      </div>

                      {/* Especificação técnica / dimensões */}
                      <p className="text-xs text-[#4A5568] m-0 mt-1 font-medium leading-relaxed">
                        {file.dimensionsText}.{' '}
                        <span className="text-[#666666] font-normal">{file.descriptionText}</span>
                      </p>
                    </div>

                    {/* Ação de download individual */}
                    <div className="flex items-center justify-end shrink-0 sm:pt-0.5">
                      <button
                        type="button"
                        onClick={() => handleDownloadSingle(file)}
                        disabled={isBusy}
                        title={`Baixar ${file.filename}`}
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
          </section>

          {/* Seção: COMPATIBILIDADE DO SVG */}
          {activePackage.svgCompatibilityNotice && (
            <div className="p-4 rounded-xl bg-[#FAFBFD] border border-[#E5E9F0] text-left space-y-1.5">
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-rounded text-[#004185] text-base shrink-0 select-none"
                  aria-hidden="true"
                >
                  info
                </span>
                <h5 className="text-[11px] font-bold uppercase tracking-wider text-[#141414] m-0">
                  {activePackage.svgCompatibilityNotice.title}
                </h5>
              </div>
              <p className="text-xs text-[#666666] leading-relaxed m-0 pl-6">
                {activePackage.svgCompatibilityNotice.body}
              </p>
            </div>
          )}
        </div>

        {/* Footer com ações: "Baixar todos" (Primary) + "Cancelar" */}
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
                Pacote com {activePackage.files.length} arquivos prontos para uso
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
              disabled={isDownloadingAll || downloadingFileId !== null}
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
