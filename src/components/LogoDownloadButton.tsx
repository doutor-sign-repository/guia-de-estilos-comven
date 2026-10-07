import React, { useState } from 'react'
import { downloadLogoPng } from '@/lib/logoDownload'
import { useToast } from '@/hooks/use-toast'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export interface LogoDownloadButtonProps {
  src: string
  filename: string
  label?: string
  hasDarkBgOption?: boolean
  theme?: 'light' | 'dark'
  compact?: boolean
  className?: string
}

export const LogoDownloadButton: React.FC<LogoDownloadButtonProps> = ({
  src,
  filename,
  label = 'Baixar PNG',
  hasDarkBgOption = false,
  theme = 'light',
  compact = false,
  className = '',
}) => {
  const { toast } = useToast()
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async (withBackground = false) => {
    if (isDownloading) return

    const actualFilename = withBackground ? filename.replace(/\.png$/, '') + '-fundo.png' : filename

    setIsDownloading(true)
    toast({
      title: 'Download iniciado',
      description: `Gerando ${actualFilename} em alta resolução (PNG)...`,
    })

    try {
      await downloadLogoPng({
        src,
        filename: actualFilename,
        minWidth: 2400,
        withBackground,
        backgroundColor: '#141414',
      })
    } catch {
      toast({
        title: 'Erro no download',
        description: 'Não foi possível gerar o arquivo PNG. Tente novamente.',
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

  // Se tiver a opção de fundo escuro (para logos de dark mode), exibe o DropdownMenu
  if (hasDarkBgOption) {
    return (
      <div className={`relative inline-block ${className}`}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              disabled={isDownloading}
              className={`${linkStyle} group/btn`}
              title="Opções de download"
            >
              <span
                className="material-symbols-rounded text-sm"
                style={{ fontSize: compact ? '14px' : '16px' }}
                aria-hidden="true"
              >
                {isDownloading ? 'hourglass_top' : 'download'}
              </span>
              <span>{isDownloading ? 'Baixando...' : label}</span>
              <span
                className="material-symbols-rounded text-xs opacity-75 group-hover/btn:opacity-100 transition-opacity"
                style={{ fontSize: '13px' }}
                aria-hidden="true"
              >
                expand_more
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-56 p-1.5 rounded-xl border border-[#EBEBEB] shadow-lg bg-white z-50 text-xs"
          >
            <DropdownMenuItem
              onClick={() => handleDownload(false)}
              className="flex items-start gap-2.5 p-2 rounded-lg cursor-pointer hover:bg-[#F5F7FA] focus:bg-[#F5F7FA] transition-colors"
            >
              <span
                className="material-symbols-rounded text-[#004185] mt-0.5"
                style={{ fontSize: '18px' }}
                aria-hidden="true"
              >
                opacity
              </span>
              <div className="flex flex-col">
                <span className="font-semibold text-[#141414]">Sem fundo</span>
                <span className="text-[10px] text-[#666666]">
                  Ideal para sobrepor em outras superfícies
                </span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDownload(true)}
              className="flex items-start gap-2.5 p-2 rounded-lg cursor-pointer hover:bg-[#F5F7FA] focus:bg-[#F5F7FA] transition-colors mt-0.5"
            >
              <span
                className="material-symbols-rounded text-[#141414] mt-0.5"
                style={{ fontSize: '18px' }}
                aria-hidden="true"
              >
                square
              </span>
              <div className="flex flex-col">
                <span className="font-semibold text-[#141414]">Com fundo escuro</span>
                <span className="text-[10px] text-[#666666]">
                  Com fundo #141414 pronto para uso
                </span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => handleDownload(false)}
      disabled={isDownloading}
      className={`${linkStyle} ${className}`}
      title="Baixar arquivo"
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
