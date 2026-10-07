/**
 * Utilitário para download e exportação de logotipos COMVEN.
 *
 * Arquitetura preparada para arquivos oficiais (SVG mestre / PNG de alta resolução):
 * - Mapa central `OFFICIAL_LOGO_FILES` associa cada identificador/arquivo à sua URL/caminho oficial.
 *   Quando os arquivos forem adicionados (ex.: em `public/logos/...` ou CDN), basta preencher a URL no mapa.
 * - Caso não haja arquivo oficial definido ou ocorra falha no carregamento direto,
 *   a geração interna via Canvas de alta resolução (2400px com fundo transparente) atua como fallback garantido.
 */

/**
 * Mapa central de arquivos oficiais por identificador ou nome de arquivo.
 * Quando os arquivos oficiais forem adicionados (ex.: em `/logos/...`), basta preencher
 * o caminho aqui sem necessidade de alterar a interface de usuário.
 */
export const OFFICIAL_LOGO_FILES: Record<string, string | null> = {
  // Versões com Tagline
  'comven-logo-principal.png': null, // ex.: '/logos/comven-logo-principal.png' ou SVG
  'comven-logo-fundo-escuro.png': null,
  'comven-logo-1cor-azul.png': null,
  'comven-logo-1cor-branco.png': null,

  // Versões sem Tagline (Somente Marca / Reduções)
  'comven-logo-somente-marca.png': null,
  'comven-logo-somente-marca-dark.png': null,
  'comven-logo-somente-marca-1cor-azul.png': null,
  'comven-logo-somente-marca-1cor-branco.png': null,
}

export interface DownloadLogoOptions {
  src: string
  filename: string
  minWidth?: number
}

/**
 * Dispara o download direto de uma URL/Blob no navegador.
 */
function triggerBrowserDownload(url: string, filename: string): void {
  const a = document.createElement('a')
  a.href = url
  a.download = filename.endsWith('.png') ? filename : `${filename}.png`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

/**
 * Tenta baixar diretamente o arquivo estático oficial caso esteja configurado e acessível.
 * Retorna true se o download foi iniciado com sucesso, ou false caso deva usar o fallback.
 */
async function tryDownloadOfficialFile(filename: string): Promise<boolean> {
  const officialPath = OFFICIAL_LOGO_FILES[filename]
  if (!officialPath) {
    return false
  }

  try {
    const res = await fetch(officialPath, { method: 'HEAD' })
    if (!res.ok) return false

    // Baixa como Blob para forçar o download local sem abrir nova aba
    const fileRes = await fetch(officialPath)
    if (!fileRes.ok) return false
    const blob = await fileRes.blob()
    const objectUrl = URL.createObjectURL(blob)
    triggerBrowserDownload(objectUrl, filename)
    setTimeout(() => URL.revokeObjectURL(objectUrl), 2000)
    return true
  } catch {
    return false
  }
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
 * Renderiza o logotipo em canvas com fundo transparente em alta resolução (2400px)
 * e dispara o download do arquivo PNG.
 */
async function generateAndDownloadCanvasPng(options: DownloadLogoOptions): Promise<void> {
  const {
    src,
    filename,
    minWidth = 2400, // Resolução padrão de 2400px para nitidez excelente
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

    // Sempre fundo transparente (limpa o canvas antes de desenhar)
    ctx.clearRect(0, 0, targetWidth, targetHeight)

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
    triggerBrowserDownload(downloadUrl, filename)

    setTimeout(() => {
      URL.revokeObjectURL(downloadUrl)
    }, 2000)
  } finally {
    cleanup()
  }
}

/**
 * Ponto de entrada principal de download do logotipo.
 * Primeiro verifica se existe um arquivo oficial configurado; caso contrário, executa a renderização via Canvas.
 */
export async function downloadLogoPng(options: DownloadLogoOptions): Promise<void> {
  // 1. Tenta servir arquivo oficial se estiver configurado
  const downloadedOfficial = await tryDownloadOfficialFile(options.filename)
  if (downloadedOfficial) {
    return
  }

  // 2. Fallback garantido: geração Canvas transparente em alta resolução (2400px)
  await generateAndDownloadCanvasPng(options)
}
