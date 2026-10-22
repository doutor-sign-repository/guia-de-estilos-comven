import React, { useState } from 'react'
import { downloadLogoPng } from '@/lib/logoDownload'
import { useToast } from '@/hooks/use-toast'

export interface LogoDownloadButtonProps {
  src?: string
  filename?: string
  label?: string
  theme?: 'light' | 'dark'
  compact?: boolean
  className?: string
  /**
   * Callback para abrir o modal de download COMVEN.
   * Quando fornecido, o clique no botão delega a abertura do modal
   * permitindo ao usuário baixar qualquer variação ou todas.
   */
  onClick?: () => void
}

export const LogoDownloadButton: React.FC<LogoDownloadButtonProps> = ({
  src,
  filename,
  label = 'Baixar logo',
  theme = 'light',
  compact = false,
  className = '',
  onClick,
}) => {
  const { toast } = useToast()
  const [isDownloading, setIsDownloading] = useState(false)

  const handleAction = async () => {
    // Se foi passado handler customizado (ex.: abrir o modal), executa-o
    if (onClick) {
      onClick()
      return
    }

    if (isDownloading || !src || !filename) return

    setIsDownloading(true)
    toast({
      title: 'Download iniciado',
      description: `Baixando ${filename}...`,
    })

    try {
      await downloadLogoPng({
        src,
        filename,
        minWidth: 2400,
      })
    } catch {
      toast({
        title: 'Erro no download',
        description: 'Não foi possível baixar o logotipo. Tente novamente.',
        variant: 'destructive',
      })
    } finally {
      setIsDownloading(false)
    }
  }

  // Estilo Link do design system COMVEN:
  // Fundo claro: texto azul #004185, sem fundo, sem borda, sem padding de botão
  // Fundo escuro (#0B2A52/#141414): texto branco text-white hover:text-white/80, sem fundo, sem borda, sem padding
  const isDarkCard = theme === 'dark'

  const baseLinkClasses = isDarkCard
    ? 'inline-flex items-center gap-1.5 p-0 bg-transparent border-0 text-xs font-bold text-white hover:text-white/80 active:text-white/70 transition-colors disabled:opacity-50 select-none cursor-pointer disabled:cursor-not-allowed'
    : 'inline-flex items-center gap-1.5 p-0 bg-transparent border-0 text-xs font-bold text-[#004185] hover:text-[#00346A] active:text-[#002750] transition-colors disabled:opacity-50 select-none cursor-pointer disabled:cursor-not-allowed'

  const compactLinkClasses = isDarkCard
    ? 'inline-flex items-center gap-1 p-0 bg-transparent border-0 text-[11px] font-bold text-white hover:text-white/80 active:text-white/70 transition-colors disabled:opacity-50 select-none cursor-pointer disabled:cursor-not-allowed'
    : 'inline-flex items-center gap-1 p-0 bg-transparent border-0 text-[11px] font-bold text-[#004185] hover:text-[#00346A] active:text-[#002750] transition-colors disabled:opacity-50 select-none cursor-pointer disabled:cursor-not-allowed'

  const linkStyle = compact ? compactLinkClasses : baseLinkClasses

  return (
    <button
      type="button"
      onClick={handleAction}
      disabled={isDownloading}
      className={`${linkStyle} ${className}`}
      title="Baixar logo"
    >
      <span
        className="material-symbols-rounded text-sm"
        style={{ fontSize: compact ? '14px' : '16px' }}
        aria-hidden="true"
      >
        {isDownloading ? 'hourglass_top' : 'download'}
      </span>
      <span>{isDownloading ? 'Baixando...' : label}</span>
    </button>
  )
}
