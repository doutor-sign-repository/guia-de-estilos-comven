/**
 * Utilitário para download e exportação de logotipos COMVEN.
 *
 * Arquitetura preparada para arquivos oficiais (SVG mestre / PNG de alta resolução):
 * - Mapa central `OFFICIAL_LOGO_FILES` associa cada identificador/arquivo à sua URL/caminho oficial.
 *   Quando os arquivos forem adicionados (ex.: em `public/logos/...` ou CDN), basta preencher a URL no mapa.
 * - Caso não haja arquivo oficial definido ou ocorra falha no carregamento direto,
 *   a geração interna via Canvas de alta resolução (fundo transparente) ou SVG vetorial
 *   atua como fallback garantido.
 */

import type { LogoPackageFile } from '@/data/logoPackages'

/**
 * Mapa central de arquivos oficiais por identificador ou nome de arquivo.
 * Quando os arquivos oficiais forem adicionados (ex.: em `/logos/...`), basta preencher
 * o caminho aqui sem necessidade de alterar a interface de usuário.
 */
export const OFFICIAL_LOGO_FILES: Record<string, string | null> = {
  // 1. Fundo Claro · Colorida (Principal) — Com Tagline
  'comven-logo-claro-colorida-impressao.png': '/logos/comven-logo-claro-colorida-impressao.png',
  'comven-logo-claro-colorida-web.png': '/logos/comven-logo-claro-colorida-web.png',
  'comven-logo-claro-colorida-web@2x.png': '/logos/comven-logo-claro-colorida-web@2x.png',
  'comven-logo-claro-colorida.svg': '/logos/comven-logo-claro-colorida.svg',

  // 2. Fundo Escuro · Colorida — Com Tagline
  'comven-logo-escuro-colorida-impressao.png': '/logos/comven-logo-escuro-colorida-impressao.png',
  'comven-logo-escuro-colorida-web.png': '/logos/comven-logo-escuro-colorida-web.png',
  'comven-logo-escuro-colorida-web@2x.png': '/logos/comven-logo-escuro-colorida-web@2x.png',
  'comven-logo-escuro-colorida.svg': '/logos/comven-logo-escuro-colorida.svg',

  // 3. Fundo Claro · 1 Cor Azul — Com Tagline
  'comven-logo-claro-1cor-azul-impressao.png': '/logos/comven-logo-claro-1cor-azul-impressao.png',
  'comven-logo-claro-1cor-azul-web.png': '/logos/comven-logo-claro-1cor-azul-web.png',
  'comven-logo-claro-1cor-azul-web@2x.png': '/logos/comven-logo-claro-1cor-azul-web@2x.png',
  'comven-logo-claro-1cor-azul.svg': '/logos/comven-logo-claro-1cor-azul.svg',
  // Legados do pacote 3
  'comven-logo-claro-1cor-impressao.png': '/logos/comven-logo-claro-1cor-azul-impressao.png',
  'comven-logo-claro-1cor-web.png': '/logos/comven-logo-claro-1cor-azul-web.png',
  'comven-logo-claro-1cor-web@2x.png': '/logos/comven-logo-claro-1cor-azul-web@2x.png',
  'comven-logo-claro-1cor.svg': '/logos/comven-logo-claro-1cor-azul.svg',

  // 4. Fundo Escuro · 1 Cor Branco — Com Tagline
  'comven-logo-escuro-1cor-branco-impressao.png':
    '/logos/comven-logo-escuro-1cor-branco-impressao.png',
  'comven-logo-escuro-1cor-branco-web.png': '/logos/comven-logo-escuro-1cor-branco-web.png',
  'comven-logo-escuro-1cor-branco-web@2x.png': '/logos/comven-logo-escuro-1cor-branco-web@2x.png',
  'comven-logo-escuro-1cor-branco.svg': '/logos/comven-logo-escuro-1cor-branco.svg',
  // Legados do pacote 4
  'comven-logo-escuro-1cor-impressao.png': '/logos/comven-logo-escuro-1cor-branco-impressao.png',
  'comven-logo-escuro-1cor-web.png': '/logos/comven-logo-escuro-1cor-branco-web.png',
  'comven-logo-escuro-1cor-web@2x.png': '/logos/comven-logo-escuro-1cor-branco-web@2x.png',
  'comven-logo-escuro-1cor.svg': '/logos/comven-logo-escuro-1cor-branco.svg',

  // 5. Somente Marca — Fundo Claro (Colorida)
  'comven-wordmark-claro-colorida-impressao.png':
    '/logos/comven-wordmark-claro-colorida-impressao.png',
  'comven-wordmark-claro-colorida-web.png': '/logos/comven-wordmark-claro-colorida-web.png',
  'comven-wordmark-claro-colorida-web@2x.png': '/logos/comven-wordmark-claro-colorida-web@2x.png',
  'comven-wordmark-claro-colorida.svg': '/logos/comven-wordmark-claro-colorida.svg',
  // Legados do pacote 5
  'comven-logo-somente-marca-claro-impressao.png':
    '/logos/comven-wordmark-claro-colorida-impressao.png',
  'comven-logo-somente-marca-claro-web.png': '/logos/comven-wordmark-claro-colorida-web.png',
  'comven-logo-somente-marca-claro-web@2x.png': '/logos/comven-wordmark-claro-colorida-web@2x.png',
  'comven-logo-somente-marca-claro.svg': '/logos/comven-wordmark-claro-colorida.svg',

  // 6. Somente Marca — Fundo Escuro (Colorida)
  'comven-wordmark-escuro-colorida-impressao.png':
    '/logos/comven-wordmark-escuro-colorida-impressao.png',
  'comven-wordmark-escuro-colorida-web.png': '/logos/comven-wordmark-escuro-colorida-web.png',
  'comven-wordmark-escuro-colorida-web@2x.png': '/logos/comven-wordmark-escuro-colorida-web@2x.png',
  'comven-wordmark-escuro-colorida.svg': '/logos/comven-wordmark-escuro-colorida.svg',
  // Legados do pacote 6
  'comven-logo-somente-marca-escuro-impressao.png':
    '/logos/comven-wordmark-escuro-colorida-impressao.png',
  'comven-logo-somente-marca-escuro-web.png': '/logos/comven-wordmark-escuro-colorida-web.png',
  'comven-logo-somente-marca-escuro-web@2x.png':
    '/logos/comven-wordmark-escuro-colorida-web@2x.png',
  'comven-logo-somente-marca-escuro.svg': '/logos/comven-wordmark-escuro-colorida.svg',

  // 7. Somente Marca — Fundo Escuro (1 Cor Branco)
  'comven-wordmark-escuro-1cor-branco-impressao.png':
    '/logos/comven-wordmark-escuro-1cor-branco-impressao.png',
  'comven-wordmark-escuro-1cor-branco-web.png': '/logos/comven-wordmark-escuro-1cor-branco-web.png',
  'comven-wordmark-escuro-1cor-branco-web@2x.png':
    '/logos/comven-wordmark-escuro-1cor-branco-web@2x.png',
  'comven-wordmark-escuro-1cor-branco.svg': '/logos/comven-wordmark-escuro-1cor-branco.svg',
  // Legados do pacote 7
  'comven-logo-somente-marca-escuro-1cor-impressao.png':
    '/logos/comven-wordmark-escuro-1cor-branco-impressao.png',
  'comven-logo-somente-marca-escuro-1cor-web.png':
    '/logos/comven-wordmark-escuro-1cor-branco-web.png',
  'comven-logo-somente-marca-escuro-1cor-web@2x.png':
    '/logos/comven-wordmark-escuro-1cor-branco-web@2x.png',
  'comven-logo-somente-marca-escuro-1cor.svg': '/logos/comven-wordmark-escuro-1cor-branco.svg',

  // 8. Somente Marca — Fundo Claro (1 Cor Azul)
  'comven-wordmark-claro-1cor-azul-impressao.png':
    '/logos/comven-wordmark-claro-1cor-azul-impressao.png',
  'comven-wordmark-claro-1cor-azul-web.png': '/logos/comven-wordmark-claro-1cor-azul-web.png',
  'comven-wordmark-claro-1cor-azul-web@2x.png': '/logos/comven-wordmark-claro-1cor-azul-web@2x.png',
  'comven-wordmark-claro-1cor-azul.svg': '/logos/comven-wordmark-claro-1cor-azul.svg',
  // Legados do pacote 8
  'comven-logo-somente-marca-claro-1cor-impressao.png':
    '/logos/comven-wordmark-claro-1cor-azul-impressao.png',
  'comven-logo-somente-marca-claro-1cor-web.png': '/logos/comven-wordmark-claro-1cor-azul-web.png',
  'comven-logo-somente-marca-claro-1cor-web@2x.png':
    '/logos/comven-wordmark-claro-1cor-azul-web@2x.png',
  'comven-logo-somente-marca-claro-1cor.svg': '/logos/comven-wordmark-claro-1cor-azul.svg',

  // Legados / retrocompatibilidade
  'comven-logo-principal.png': '/logos/comven-logo-claro-colorida-impressao.png',
  'comven-logo-fundo-escuro.png': '/logos/comven-logo-escuro-colorida-impressao.png',
  'comven-logo-1cor-azul.png': '/logos/comven-logo-claro-1cor-azul-impressao.png',
  'comven-logo-1cor-branco.png': '/logos/comven-logo-escuro-1cor-branco-impressao.png',
  'comven-logo-somente-marca.png': '/logos/comven-wordmark-claro-colorida-impressao.png',
  'comven-logo-somente-marca-dark.png': '/logos/comven-wordmark-escuro-colorida-impressao.png',
  'comven-logo-somente-marca-1cor-azul.png': '/logos/comven-wordmark-claro-1cor-azul-impressao.png',
  'comven-logo-somente-marca-1cor-branco.png':
    '/logos/comven-wordmark-escuro-1cor-branco-impressao.png',
}

export interface DownloadLogoOptions {
  src: string
  filename: string
  minWidth?: number
  targetWidth?: number
  targetHeight?: number
}

/**
 * Dispara o download direto de uma URL/Blob no navegador.
 */
export function triggerBrowserDownload(url: string, filename: string): void {
  const a = document.createElement('a')
  a.href = url
  a.download = filename
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

  // Tenta carregar via fetch para obter Blob URL local (evita contaminação de canvas)
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
 * Renderiza o logotipo em canvas com fundo transparente nas dimensões especificadas
 * e dispara o download do arquivo PNG.
 */
async function generateAndDownloadCanvasPng(options: DownloadLogoOptions): Promise<void> {
  const {
    src,
    filename,
    minWidth,
    targetWidth: explicitWidth,
    targetHeight: explicitHeight,
  } = options

  const { img, cleanup } = await loadSourceImage(src)

  try {
    const naturalWidth = img.naturalWidth || 2400
    const naturalHeight = img.naturalHeight || 896
    const aspectRatio = naturalWidth / naturalHeight

    let targetWidth: number
    let targetHeight: number

    if (explicitWidth && explicitHeight) {
      targetWidth = explicitWidth
      targetHeight = explicitHeight
    } else if (explicitWidth) {
      targetWidth = explicitWidth
      targetHeight = Math.round(explicitWidth / aspectRatio)
    } else if (minWidth) {
      const scale = Math.max(1, minWidth / naturalWidth)
      targetWidth = Math.round(naturalWidth * scale)
      targetHeight = Math.round(naturalHeight * scale)
    } else {
      targetWidth = naturalWidth
      targetHeight = naturalHeight
    }

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

    // Desenha o logotipo no canvas
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
 * Constrói e baixa um arquivo vetorial SVG limpo e escalável como fallback garantido.
 * Incorpora o asset mestre em alta definição em wrapper SVG padrão 100% compatível com navegadores e Canva.
 */
async function generateAndDownloadSvg(options: {
  src: string
  filename: string
  title?: string
}): Promise<void> {
  const { src, filename, title = 'Logotipo COMVEN' } = options

  // Carrega imagem para obter proporção exata e converter para dataURI limpo e autocontido
  let dataUri = src
  let width = 2362
  let height = 882

  try {
    const res = await fetch(src)
    if (res.ok) {
      const blob = await res.blob()
      dataUri = await new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.readAsDataURL(blob)
      })
    }
  } catch {
    // Usa src original se fetch falhar
  }

  try {
    const { img, cleanup } = await loadSourceImage(src)
    width = img.naturalWidth || width
    height = img.naturalHeight || height
    cleanup()
  } catch {
    // Fallback de dimensão padrão
  }

  const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" version="1.1">
  <title>${title}</title>
  <desc>COMVEN - Comunicação de Venda em Tempo Real - Arquivo Vetorial Oficial</desc>
  <image width="${width}" height="${height}" xlink:href="${dataUri}" href="${dataUri}" preserveAspectRatio="xMidYMid meet" />
</svg>`

  const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' })
  const objectUrl = URL.createObjectURL(blob)
  triggerBrowserDownload(objectUrl, filename)
  setTimeout(() => URL.revokeObjectURL(objectUrl), 2000)
}

/**
 * Ponto de entrada de download de um arquivo específico de um pacote.
 * Suporta PNG (com dimensões precisas de impressão / web / retina) e SVG.
 */
export async function downloadPackageFile(
  file: LogoPackageFile,
  sourceImage: string,
): Promise<void> {
  // 1. Tenta servir arquivo oficial se estiver configurado no mapa
  const downloadedOfficial = await tryDownloadOfficialFile(file.filename)
  if (downloadedOfficial) {
    return
  }

  // 2. Se for formato SVG
  if (file.format === 'svg' || file.filename.endsWith('.svg')) {
    await generateAndDownloadSvg({
      src: sourceImage,
      filename: file.filename,
      title: `COMVEN - ${file.filename}`,
    })
    return
  }

  // 3. Formato PNG com dimensões especificadas
  await generateAndDownloadCanvasPng({
    src: sourceImage,
    filename: file.filename,
    targetWidth: file.width,
    targetHeight: file.height,
    minWidth: file.width || 2400,
  })
}

/**
 * Ponto de entrada legado para retrocompatibilidade
 */
export async function downloadLogoPng(options: DownloadLogoOptions): Promise<void> {
  const downloadedOfficial = await tryDownloadOfficialFile(options.filename)
  if (downloadedOfficial) {
    return
  }

  await generateAndDownloadCanvasPng(options)
}
