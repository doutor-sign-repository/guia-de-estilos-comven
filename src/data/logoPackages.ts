/**
 * Definições dos pacotes de download para cada versão oficial do logotipo COMVEN.
 *
 * Cada pacote reúne os arquivos oficiais para a versão selecionada:
 * - Versão Impressão (300 dpi, dimensões ampliadas para gráficas, docs, Word, PPT)
 * - Versão Web padrão (800 px)
 * - Versão Web @2x (1600 px para telas de alta densidade / retina)
 * - Arquivo vetorial SVG (para navegadores, Figma, Canva e impressão de alta fidelidade)
 *
 * Os arquivos podem ser ativados no mapa OFFICIAL_LOGO_FILES (src/lib/logoDownload.ts)
 * apontando para `/logos/...` ou URLs oficiais. Enquanto não subidos, o gerador
 * inteligente no app (Canvas/SVG Blob) atua como fallback garantido.
 */

import { LOGO_ASSETS } from '@/data/logos'

export type LogoFileFormat = 'png' | 'svg'

export interface LogoPackageFile {
  id: string
  filename: string
  format: LogoFileFormat
  dimensionsText: string
  descriptionText: string
  width?: number
  height?: number
  dpi?: number
  badgeText?: string
}

export interface LogoPackageDefinition {
  id: string
  // Chaves de correspondência rápida com a chamada do botão
  matchKeys: string[]
  // Título e identificação oficial
  brandTitle: string // "COMVEN — Logotipo com tagline" ou "COMVEN — Somente marca"
  versionName: string // "Fundo claro · Colorida (principal)"
  usageRecommendation: string // "Use sobre fundos claros."
  sourceImage: string
  // SVG base variant
  svgVariant: {
    theme: 'light' | 'dark'
    colorScheme: 'colorida' | '1cor'
    showTagline: boolean
  }
  files: LogoPackageFile[]
  svgCompatibilityNotice?: {
    title: string
    body: string
  }
}

export const OFFICIAL_SVG_NOTICE = {
  title: 'COMPATIBILIDADE DO SVG',
  body: 'O SVG pode não ser exibido corretamente no Word, no PowerPoint e no Affinity. Nesses programas, use o PNG. Todos os PNGs têm fundo transparente (perfil sRGB).',
}

export const LOGO_PACKAGES: LogoPackageDefinition[] = [
  // 1. FUNDO CLARO · COLORIDA (PRINCIPAL) — Com Tagline
  {
    id: 'light-colorida-com-tagline',
    matchKeys: [
      'light-colorida-com-tagline',
      'comven-logo-principal.png',
      'comven-logo-claro-colorida',
      'comven-logo-claro-colorida-impressao.png',
    ],
    brandTitle: 'COMVEN — Logotipo com tagline',
    versionName: 'Fundo claro · Colorida (principal)',
    usageRecommendation: 'Use sobre fundos claros.',
    sourceImage: LOGO_ASSETS.lightColoridaComTagline,
    svgVariant: {
      theme: 'light',
      colorScheme: 'colorida',
      showTagline: true,
    },
    files: [
      {
        id: 'claro-colorida-impressao',
        filename: 'comven-logo-claro-colorida-impressao.png',
        format: 'png',
        dimensionsText: '2362×882 px, 300 dpi (aprox. 20,0×7,5 cm)',
        descriptionText: 'Impressos, gráficas, documentos, Word e PowerPoint.',
        width: 2362,
        height: 882,
        dpi: 300,
        badgeText: 'Impressão 300 dpi',
      },
      {
        id: 'claro-colorida-web',
        filename: 'comven-logo-claro-colorida-web.png',
        format: 'png',
        dimensionsText: '800×299 px',
        descriptionText: 'Sites e e-mail.',
        width: 800,
        height: 299,
        badgeText: 'Web',
      },
      {
        id: 'claro-colorida-web-2x',
        filename: 'comven-logo-claro-colorida-web@2x.png',
        format: 'png',
        dimensionsText: '1600×598 px',
        descriptionText: 'Telas de alta densidade (retina); use com largura de exibição de 800 px.',
        width: 1600,
        height: 598,
        badgeText: 'Retina @2x',
      },
      {
        id: 'claro-colorida-svg',
        filename: 'comven-logo-claro-colorida.svg',
        format: 'svg',
        dimensionsText: 'Arquivo vetorial',
        descriptionText: 'Use em navegadores e no Canva (no Canva funciona também para impressão).',
        badgeText: 'Vetor SVG',
      },
    ],
    svgCompatibilityNotice: OFFICIAL_SVG_NOTICE,
  },

  // 2. FUNDO ESCURO · COLORIDA — Com Tagline
  {
    id: 'dark-colorida-com-tagline',
    matchKeys: [
      'dark-colorida-com-tagline',
      'comven-logo-fundo-escuro.png',
      'comven-logo-escuro-colorida',
      'comven-logo-escuro-colorida-impressao.png',
    ],
    brandTitle: 'COMVEN — Logotipo com tagline',
    versionName: 'Fundo escuro · Colorida',
    usageRecommendation: 'Use sobre fundos escuros (referência: azul marinho #0B2A52).',
    sourceImage: LOGO_ASSETS.darkColoridaComTagline,
    svgVariant: {
      theme: 'dark',
      colorScheme: 'colorida',
      showTagline: true,
    },
    files: [
      {
        id: 'escuro-colorida-impressao',
        filename: 'comven-logo-escuro-colorida-impressao.png',
        format: 'png',
        dimensionsText: '2362×882 px, 300 dpi (aprox. 20,0×7,5 cm)',
        descriptionText: 'Impressos, gráficas, documentos, Word e PowerPoint.',
        width: 2362,
        height: 882,
        dpi: 300,
        badgeText: 'Impressão 300 dpi',
      },
      {
        id: 'escuro-colorida-web',
        filename: 'comven-logo-escuro-colorida-web.png',
        format: 'png',
        dimensionsText: '800×299 px',
        descriptionText: 'Sites e e-mail.',
        width: 800,
        height: 299,
        badgeText: 'Web',
      },
      {
        id: 'escuro-colorida-web-2x',
        filename: 'comven-logo-escuro-colorida-web@2x.png',
        format: 'png',
        dimensionsText: '1600×598 px',
        descriptionText: 'Telas de alta densidade (retina); use com largura de exibição de 800 px.',
        width: 1600,
        height: 598,
        badgeText: 'Retina @2x',
      },
      {
        id: 'escuro-colorida-svg',
        filename: 'comven-logo-escuro-colorida.svg',
        format: 'svg',
        dimensionsText: 'Arquivo vetorial',
        descriptionText: 'Use em navegadores e no Canva (no Canva funciona também para impressão).',
        badgeText: 'Vetor SVG',
      },
    ],
    svgCompatibilityNotice: OFFICIAL_SVG_NOTICE,
  },

  // 3. FUNDO CLARO · 1 COR (AZUL) — Com Tagline
  {
    id: 'light-1cor-com-tagline',
    matchKeys: [
      'light-1cor-com-tagline',
      'comven-logo-1cor-azul.png',
      'comven-logo-claro-1cor-azul',
      'comven-logo-claro-1cor',
      'comven-logo-claro-1cor-azul-impressao.png',
    ],
    brandTitle: 'COMVEN — Logotipo com tagline',
    versionName: 'Fundo claro · 1 cor (azul #004185)',
    usageRecommendation: 'Use sobre fundos claros.',
    sourceImage: LOGO_ASSETS.light1CorComTagline,
    svgVariant: {
      theme: 'light',
      colorScheme: '1cor',
      showTagline: true,
    },
    files: [
      {
        id: 'claro-1cor-azul-impressao',
        filename: 'comven-logo-claro-1cor-azul-impressao.png',
        format: 'png',
        dimensionsText: '2362×882 px, 300 dpi (aprox. 20,0×7,5 cm)',
        descriptionText: 'Impressos, gráficas, documentos, Word e PowerPoint.',
        width: 2362,
        height: 882,
        dpi: 300,
        badgeText: 'Impressão 300 dpi',
      },
      {
        id: 'claro-1cor-azul-web',
        filename: 'comven-logo-claro-1cor-azul-web.png',
        format: 'png',
        dimensionsText: '800×299 px',
        descriptionText: 'Sites e e-mail.',
        width: 800,
        height: 299,
        badgeText: 'Web',
      },
      {
        id: 'claro-1cor-azul-web-2x',
        filename: 'comven-logo-claro-1cor-azul-web@2x.png',
        format: 'png',
        dimensionsText: '1600×598 px',
        descriptionText: 'Telas de alta densidade (retina); use com largura de exibição de 800 px.',
        width: 1600,
        height: 598,
        badgeText: 'Retina @2x',
      },
      {
        id: 'claro-1cor-azul-svg',
        filename: 'comven-logo-claro-1cor-azul.svg',
        format: 'svg',
        dimensionsText: 'Arquivo vetorial',
        descriptionText: 'Use em navegadores e no Canva (no Canva funciona também para impressão).',
        badgeText: 'Vetor SVG',
      },
    ],
    svgCompatibilityNotice: OFFICIAL_SVG_NOTICE,
  },

  // 4. FUNDO ESCURO · 1 COR (BRANCO) — Com Tagline
  {
    id: 'dark-1cor-com-tagline',
    matchKeys: [
      'dark-1cor-com-tagline',
      'comven-logo-1cor-branco.png',
      'comven-logo-escuro-1cor-branco',
      'comven-logo-escuro-1cor',
      'comven-logo-escuro-1cor-branco-impressao.png',
    ],
    brandTitle: 'COMVEN — Logotipo com tagline',
    versionName: 'Fundo escuro · 1 cor (branco #FFFFFF)',
    usageRecommendation: 'Use sobre fundos escuros (referência: azul marinho #0B2A52).',
    sourceImage: LOGO_ASSETS.dark1CorComTagline,
    svgVariant: {
      theme: 'dark',
      colorScheme: '1cor',
      showTagline: true,
    },
    files: [
      {
        id: 'escuro-1cor-branco-impressao',
        filename: 'comven-logo-escuro-1cor-branco-impressao.png',
        format: 'png',
        dimensionsText: '2362×882 px, 300 dpi (aprox. 20,0×7,5 cm)',
        descriptionText: 'Impressos, gráficas, documentos, Word e PowerPoint.',
        width: 2362,
        height: 882,
        dpi: 300,
        badgeText: 'Impressão 300 dpi',
      },
      {
        id: 'escuro-1cor-branco-web',
        filename: 'comven-logo-escuro-1cor-branco-web.png',
        format: 'png',
        dimensionsText: '800×299 px',
        descriptionText: 'Sites e e-mail.',
        width: 800,
        height: 299,
        badgeText: 'Web',
      },
      {
        id: 'escuro-1cor-branco-web-2x',
        filename: 'comven-logo-escuro-1cor-branco-web@2x.png',
        format: 'png',
        dimensionsText: '1600×598 px',
        descriptionText: 'Telas de alta densidade (retina); use com largura de exibição de 800 px.',
        width: 1600,
        height: 598,
        badgeText: 'Retina @2x',
      },
      {
        id: 'escuro-1cor-branco-svg',
        filename: 'comven-logo-escuro-1cor-branco.svg',
        format: 'svg',
        dimensionsText: 'Arquivo vetorial',
        descriptionText: 'Use em navegadores e no Canva (no Canva funciona também para impressão).',
        badgeText: 'Vetor SVG',
      },
    ],
    svgCompatibilityNotice: OFFICIAL_SVG_NOTICE,
  },

  // 5. SOMENTE MARCA — FUNDO CLARO (COLORIDA) — Sem Tagline
  {
    id: 'light-colorida-sem-tagline',
    matchKeys: [
      'light-colorida-sem-tagline',
      'comven-logo-somente-marca.png',
      'comven-logo-somente-marca-claro',
      'comven-wordmark-claro-colorida',
      'comven-wordmark-claro-colorida-impressao.png',
    ],
    brandTitle: 'COMVEN — Wordmark (sem tagline)',
    versionName: 'Fundo claro · Colorida (principal)',
    usageRecommendation: 'Use sobre fundos claros.',
    sourceImage: LOGO_ASSETS.lightColoridaSemTagline,
    svgVariant: {
      theme: 'light',
      colorScheme: 'colorida',
      showTagline: false,
    },
    files: [
      {
        id: 'wordmark-claro-colorida-impressao',
        filename: 'comven-wordmark-claro-colorida-impressao.png',
        format: 'png',
        dimensionsText: '2362×712 px, 300 dpi (aprox. 20,0×6,0 cm)',
        descriptionText: 'Impressos, gráficas, documentos, Word e PowerPoint.',
        width: 2362,
        height: 712,
        dpi: 300,
        badgeText: 'Impressão 300 dpi',
      },
      {
        id: 'wordmark-claro-colorida-web',
        filename: 'comven-wordmark-claro-colorida-web.png',
        format: 'png',
        dimensionsText: '800×241 px',
        descriptionText: 'Sites e e-mail.',
        width: 800,
        height: 241,
        badgeText: 'Web',
      },
      {
        id: 'wordmark-claro-colorida-web-2x',
        filename: 'comven-wordmark-claro-colorida-web@2x.png',
        format: 'png',
        dimensionsText: '1600×482 px',
        descriptionText: 'Telas de alta densidade (retina); use com largura de exibição de 800 px.',
        width: 1600,
        height: 482,
        badgeText: 'Retina @2x',
      },
      {
        id: 'wordmark-claro-colorida-svg',
        filename: 'comven-wordmark-claro-colorida.svg',
        format: 'svg',
        dimensionsText: 'Arquivo vetorial',
        descriptionText: 'Use em navegadores e no Canva (no Canva funciona também para impressão).',
        badgeText: 'Vetor SVG',
      },
    ],
    svgCompatibilityNotice: OFFICIAL_SVG_NOTICE,
  },

  // 6. SOMENTE MARCA — FUNDO ESCURO (COLORIDA) — Sem Tagline
  {
    id: 'dark-colorida-sem-tagline',
    matchKeys: [
      'dark-colorida-sem-tagline',
      'comven-logo-somente-marca-dark.png',
      'comven-logo-somente-marca-escuro',
      'comven-wordmark-escuro-colorida',
      'comven-wordmark-escuro-colorida-impressao.png',
    ],
    brandTitle: 'COMVEN — Wordmark (sem tagline)',
    versionName: 'Fundo escuro · Colorida',
    usageRecommendation: 'Use sobre fundos escuros (referência: azul marinho #0B2A52).',
    sourceImage: LOGO_ASSETS.darkColoridaSemTagline,
    svgVariant: {
      theme: 'dark',
      colorScheme: 'colorida',
      showTagline: false,
    },
    files: [
      {
        id: 'wordmark-escuro-colorida-impressao',
        filename: 'comven-wordmark-escuro-colorida-impressao.png',
        format: 'png',
        dimensionsText: '2362×712 px, 300 dpi (aprox. 20,0×6,0 cm)',
        descriptionText: 'Impressos, gráficas, documentos, Word e PowerPoint.',
        width: 2362,
        height: 712,
        dpi: 300,
        badgeText: 'Impressão 300 dpi',
      },
      {
        id: 'wordmark-escuro-colorida-web',
        filename: 'comven-wordmark-escuro-colorida-web.png',
        format: 'png',
        dimensionsText: '800×241 px',
        descriptionText: 'Sites e e-mail.',
        width: 800,
        height: 241,
        badgeText: 'Web',
      },
      {
        id: 'wordmark-escuro-colorida-web-2x',
        filename: 'comven-wordmark-escuro-colorida-web@2x.png',
        format: 'png',
        dimensionsText: '1600×482 px',
        descriptionText: 'Telas de alta densidade (retina); use com largura de exibição de 800 px.',
        width: 1600,
        height: 482,
        badgeText: 'Retina @2x',
      },
      {
        id: 'wordmark-escuro-colorida-svg',
        filename: 'comven-wordmark-escuro-colorida.svg',
        format: 'svg',
        dimensionsText: 'Arquivo vetorial',
        descriptionText: 'Use em navegadores e no Canva (no Canva funciona também para impressão).',
        badgeText: 'Vetor SVG',
      },
    ],
    svgCompatibilityNotice: OFFICIAL_SVG_NOTICE,
  },

  // 7. SOMENTE MARCA — FUNDO ESCURO (1 COR BRANCO) — Sem Tagline
  {
    id: 'dark-1cor-sem-tagline',
    matchKeys: [
      'dark-1cor-sem-tagline',
      'comven-logo-somente-marca-1cor-branco.png',
      'comven-logo-somente-marca-escuro-1cor',
      'comven-wordmark-escuro-1cor-branco',
      'comven-wordmark-escuro-1cor-branco-impressao.png',
    ],
    brandTitle: 'COMVEN — Wordmark (sem tagline)',
    versionName: 'Fundo escuro · 1 cor (branco #FFFFFF)',
    usageRecommendation: 'Use sobre fundos escuros (referência: azul marinho #0B2A52).',
    sourceImage: LOGO_ASSETS.dark1CorSemTagline,
    svgVariant: {
      theme: 'dark',
      colorScheme: '1cor',
      showTagline: false,
    },
    files: [
      {
        id: 'wordmark-escuro-1cor-branco-impressao',
        filename: 'comven-wordmark-escuro-1cor-branco-impressao.png',
        format: 'png',
        dimensionsText: '2362×712 px, 300 dpi (aprox. 20,0×6,0 cm)',
        descriptionText: 'Impressos, gráficas, documentos, Word e PowerPoint.',
        width: 2362,
        height: 712,
        dpi: 300,
        badgeText: 'Impressão 300 dpi',
      },
      {
        id: 'wordmark-escuro-1cor-branco-web',
        filename: 'comven-wordmark-escuro-1cor-branco-web.png',
        format: 'png',
        dimensionsText: '800×241 px',
        descriptionText: 'Sites e e-mail.',
        width: 800,
        height: 241,
        badgeText: 'Web',
      },
      {
        id: 'wordmark-escuro-1cor-branco-web-2x',
        filename: 'comven-wordmark-escuro-1cor-branco-web@2x.png',
        format: 'png',
        dimensionsText: '1600×482 px',
        descriptionText: 'Telas de alta densidade (retina); use com largura de exibição de 800 px.',
        width: 1600,
        height: 482,
        badgeText: 'Retina @2x',
      },
      {
        id: 'wordmark-escuro-1cor-branco-svg',
        filename: 'comven-wordmark-escuro-1cor-branco.svg',
        format: 'svg',
        dimensionsText: 'Arquivo vetorial',
        descriptionText: 'Use em navegadores e no Canva (no Canva funciona também para impressão).',
        badgeText: 'Vetor SVG',
      },
    ],
    svgCompatibilityNotice: OFFICIAL_SVG_NOTICE,
  },

  // 8. SOMENTE MARCA — FUNDO CLARO (1 COR AZUL) — Sem Tagline
  {
    id: 'light-1cor-sem-tagline',
    matchKeys: [
      'light-1cor-sem-tagline',
      'comven-logo-somente-marca-1cor-azul.png',
      'comven-logo-somente-marca-claro-1cor',
      'comven-wordmark-claro-1cor-azul',
      'comven-wordmark-claro-1cor-azul-impressao.png',
    ],
    brandTitle: 'COMVEN — Wordmark (sem tagline)',
    versionName: 'Fundo claro · 1 cor (azul #004185)',
    usageRecommendation: 'Use sobre fundos claros.',
    sourceImage: LOGO_ASSETS.light1CorSemTagline,
    svgVariant: {
      theme: 'light',
      colorScheme: '1cor',
      showTagline: false,
    },
    files: [
      {
        id: 'wordmark-claro-1cor-azul-impressao',
        filename: 'comven-wordmark-claro-1cor-azul-impressao.png',
        format: 'png',
        dimensionsText: '2362×712 px, 300 dpi (aprox. 20,0×6,0 cm)',
        descriptionText: 'Impressos, gráficas, documentos, Word e PowerPoint.',
        width: 2362,
        height: 712,
        dpi: 300,
        badgeText: 'Impressão 300 dpi',
      },
      {
        id: 'wordmark-claro-1cor-azul-web',
        filename: 'comven-wordmark-claro-1cor-azul-web.png',
        format: 'png',
        dimensionsText: '800×241 px',
        descriptionText: 'Sites e e-mail.',
        width: 800,
        height: 241,
        badgeText: 'Web',
      },
      {
        id: 'wordmark-claro-1cor-azul-web-2x',
        filename: 'comven-wordmark-claro-1cor-azul-web@2x.png',
        format: 'png',
        dimensionsText: '1600×482 px',
        descriptionText: 'Telas de alta densidade (retina); use com largura de exibição de 800 px.',
        width: 1600,
        height: 482,
        badgeText: 'Retina @2x',
      },
      {
        id: 'wordmark-claro-1cor-azul-svg',
        filename: 'comven-wordmark-claro-1cor-azul.svg',
        format: 'svg',
        dimensionsText: 'Arquivo vetorial',
        descriptionText: 'Use em navegadores e no Canva (no Canva funciona também para impressão).',
        badgeText: 'Vetor SVG',
      },
    ],
    svgCompatibilityNotice: OFFICIAL_SVG_NOTICE,
  },
]

/**
 * Encontra a definição de pacote correspondente a uma chave ou id de logotipo.
 * Caso não encontre, retorna a versão principal (Light Colorida com Tagline) por padrão.
 */
export function getLogoPackage(key?: string | null): LogoPackageDefinition {
  if (!key) {
    return LOGO_PACKAGES[0]
  }

  const normalized = key.trim().toLowerCase()
  const found = LOGO_PACKAGES.find((pkg) =>
    pkg.matchKeys.some(
      (k) => k.toLowerCase() === normalized || normalized.includes(k.toLowerCase()),
    ),
  )

  return found || LOGO_PACKAGES[0]
}
