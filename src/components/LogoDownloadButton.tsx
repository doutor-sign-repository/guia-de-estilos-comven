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

  // Estilos discretos e elegantes adaptados ao fundo do card (claro ou escuro)
  const isDarkCard = theme === 'dark'

  const baseButtonClasses = isDarkCard
    ? 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white/90 bg-white/10 hover:bg-white/20 border border-white/15 transition-all shadow-xs disabled:opacity-50 select-none'
    : 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#004185] bg-white hover:bg-[#004185]/5 border border-[#BFBFBF]/60 hover:border-[#004185]/40 transition-all shadow-xs disabled:opacity-50 select-none'

  const compactButtonClasses = isDarkCard
    ? 'inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold text-white/90 bg-white/10 hover:bg-white/20 border border-white/15 transition-all disabled:opacity-50 select-none'
    : 'inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold text-[#004185] bg-white hover:bg-[#004185]/5 border border-[#BFBFBF]/60 hover:border-[#004185]/40 transition-all disabled:opacity-50 select-none'

  const buttonStyle = compact ? compactButtonClasses : baseButtonClasses

  // Se tiver a opção de fundo escuro (para logos de dark mode), exibe o DropdownMenu
  if (hasDarkBgOption) {
    return (
      <div className={`relative inline-block ${className}`}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              disabled={isDownloading}
              className={`${buttonStyle} group/btn`}
              title="Opções de download em alta resolução"
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
                className="material-symbols-rounded text-xs opacity-75 group-hover/btn:opacity-100"
                style={{ fontSize: '13px' }}
                aria-hidden="true"
              >
                expand_more
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
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
                <span className="font-semibold text-[#141414]">PNG transparente</span>
                <span className="text-[10px] text-[#666666]">Sem fundo, ideal para sobrepor</span>
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
                <span className="font-semibold text-[#141414]">PNG com fundo escuro</span>
                <span className="text-[10px] text-[#666666]">Com fundo #141414 para slides</span>
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
      className={`${buttonStyle} ${className}`}
      title="Baixar imagem em PNG alta resolução com fundo transparente"
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
