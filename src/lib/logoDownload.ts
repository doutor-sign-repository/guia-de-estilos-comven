/**
 * Utilitário para renderização e download de logotipos COMVEN em PNG de alta resolução.
 * Garante largura mínima de 2000px, suporte a fundo transparente ou fundo institucional (#141414)
 * e aguarda document.fonts.ready antes de gerar o canvas.
 */

export interface DownloadLogoOptions {
  src: string
  filename: string
  minWidth?: number
  withBackground?: boolean
  backgroundColor?: string
}

/**
 * Carrega a imagem tratando CORS e possíveis restrições de canvas
 */
async function loadSourceImage(
  src: string,
): Promise<{ img: HTMLImageElement; cleanup: () => void }> {
  // Aguarda fontes carregadas caso afetem renderização de canvas
  if (typeof document !== 'undefined' && 'fonts' in document && document.fonts?.ready) {
    try {
      await document.fonts.ready
    } catch {
      // Ignora falhas menores no carregamento de webfonts
    }
  }

  // Tenta carregar via fetch para obter Blob URL local (evita qualquer contaminação de canvas)
  try {
    const res = await fetch(src, { mode: 'cors' })
    if (res.ok) {
      const blob = await res.blob()
      const objectUrl = URL.createObjectURL(blob)
      const img = new Image()
      img.src = objectUrl

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = () => reject(new Error('Erro ao decodificar imagem'))
      })

      return {
        img,
        cleanup: () => URL.revokeObjectURL(objectUrl),
      }
    }
  } catch {
    // Segue para fallback direto com crossOrigin anonymous
  }

  // Fallback: Image element direto com crossOrigin
  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.src = src

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve()
    img.onerror = () => reject(new Error('Não foi possível carregar a imagem do logotipo'))
  })

  return {
    img,
    cleanup: () => {},
  }
}

/**
 * Renderiza o logotipo em canvas com largura mínima de 2000px e dispara o download do arquivo PNG
 */
export async function downloadLogoPng(options: DownloadLogoOptions): Promise<void> {
  const {
    src,
    filename,
    minWidth = 2400, // Garante resolução bem acima do mínimo de 2000px para nitidez em slides e impressos
    withBackground = false,
    backgroundColor = '#141414',
  } = options

  const { img, cleanup } = await loadSourceImage(src)

  try {
    const naturalWidth = img.naturalWidth || 2400
    const naturalHeight = img.naturalHeight || 800

    // Calcula dimensões em alta resolução mantendo a proporção original
    const scale = Math.max(1, minWidth / naturalWidth)
    const targetWidth = Math.round(naturalWidth * scale)
    const targetHeight = Math.round(naturalHeight * scale)

    const canvas = document.createElement('canvas')
    canvas.width = targetWidth
    canvas.height = targetHeight

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      throw new Error('Ambiente de execução não suporta renderização em Canvas 2D')
    }

    // Configura interpolação e suavização de alta fidelidade
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    // Renderiza fundo escuro (#141414) se solicitado, ou mantém transparente
    if (withBackground) {
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, targetWidth, targetHeight)
    } else {
      ctx.clearRect(0, 0, targetWidth, targetHeight)
    }

    // Desenha o logotipo no canvas em alta escala
    ctx.drawImage(img, 0, 0, targetWidth, targetHeight)

    // Exporta para Blob PNG
    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob((b) => resolve(b), 'image/png')
    })

    if (!blob) {
      throw new Error('Falha ao exportar imagem em formato PNG')
    }

    // Dispara o download no navegador
    const downloadUrl = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = downloadUrl
    a.download = filename.endsWith('.png') ? filename : `${filename}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    setTimeout(() => {
      URL.revokeObjectURL(downloadUrl)
    }, 2000)
  } finally {
    cleanup()
  }
}
