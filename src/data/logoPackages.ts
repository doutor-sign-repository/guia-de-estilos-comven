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
  body: 'O formato SVG é um arquivo vetorial ideal para web e Canva. Em alguns softwares de escritório (versões específicas do Word ou PowerPoint), o arquivo SVG pode não ser exibido ou apresentar limitações de renderização de fontes e gradientes. Nesses casos, utilize o arquivo PNG de Impressão (300 dpi) ou Web @2x.',
}

export const LOGO_PACKAGES: LogoPackageDefinition[] = [
  // 1. FUNDO CLARO · COLORIDA (PRINCIPAL) — Com Tagline
  {
    id: 'light-colorida-com-tagline',
    matchKeys: [
      'light-colorida-com-tagline',
      'comven-logo-principal.png',
      'comven-logo-claro-colorida',
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
        dimensionsText: 'Arquivo vetorial escalável',
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
    ],
    brandTitle: 'COMVEN — Logotipo com tagline',
    versionName: 'Fundo escuro · Colorida',
    usageRecommendation:
      'Use sobre fundos escuros e superfícies institucionais em azul marinho #0B2A52.',
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
        descriptionText: 'Impressos em fundo escuro, gráficas, apresentações e PowerPoint.',
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
        descriptionText: 'Sites, temas escuros e headers noturnos.',
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
        dimensionsText: 'Arquivo vetorial escalável',
        descriptionText: 'Use em navegadores e no Canva para designs em fundo escuro.',
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
    ],
    brandTitle: 'COMVEN — Logotipo com tagline',
    versionName: 'Fundo claro · 1 cor (Azul #004185)',
    usageRecommendation:
      'Use sobre fundos claros em materiais monocromáticos ou impressões institucionais.',
    sourceImage: LOGO_ASSETS.light1CorComTagline,
    svgVariant: {
      theme: 'light',
      colorScheme: '1cor',
      showTagline: true,
    },
    files: [
      {
        id: 'claro-1cor-impressao',
        filename: 'comven-logo-claro-1cor-impressao.png',
        format: 'png',
        dimensionsText: '2362×882 px, 300 dpi (aprox. 20,0×7,5 cm)',
        descriptionText: 'Documentos oficiais monocromáticos, timbrados, Word e PowerPoint.',
        width: 2362,
        height: 882,
        dpi: 300,
        badgeText: 'Impressão 300 dpi',
      },
      {
        id: 'claro-1cor-web',
        filename: 'comven-logo-claro-1cor-web.png',
        format: 'png',
        dimensionsText: '800×299 px',
        descriptionText: 'Aplicações web em azul institucional.',
        width: 800,
        height: 299,
        badgeText: 'Web',
      },
      {
        id: 'claro-1cor-web-2x',
        filename: 'comven-logo-claro-1cor-web@2x.png',
        format: 'png',
        dimensionsText: '1600×598 px',
        descriptionText: 'Telas de alta densidade (retina); use com largura de exibição de 800 px.',
        width: 1600,
        height: 598,
        badgeText: 'Retina @2x',
      },
      {
        id: 'claro-1cor-svg',
        filename: 'comven-logo-claro-1cor.svg',
        format: 'svg',
        dimensionsText: 'Arquivo vetorial escalável',
        descriptionText: 'Use em navegadores e no Canva para impressões e cortes vetoriais.',
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
    ],
    brandTitle: 'COMVEN — Logotipo com tagline',
    versionName: 'Fundo escuro · 1 cor (Branco #FFFFFF)',
    usageRecommendation: 'Use sobre fundos escuros, fotos ou superfícies de alto contraste.',
    sourceImage: LOGO_ASSETS.dark1CorComTagline,
    svgVariant: {
      theme: 'dark',
      colorScheme: '1cor',
      showTagline: true,
    },
    files: [
      {
        id: 'escuro-1cor-impressao',
        filename: 'comven-logo-escuro-1cor-impressao.png',
        format: 'png',
        dimensionsText: '2362×882 px, 300 dpi (aprox. 20,0×7,5 cm)',
        descriptionText: 'Impressões em serigrafia, brindes, uniformes e apresentações.',
        width: 2362,
        height: 882,
        dpi: 300,
        badgeText: 'Impressão 300 dpi',
      },
      {
        id: 'escuro-1cor-web',
        filename: 'comven-logo-escuro-1cor-web.png',
        format: 'png',
        dimensionsText: '800×299 px',
        descriptionText: 'Rodapés e seções escuras em websites.',
        width: 800,
        height: 299,
        badgeText: 'Web',
      },
      {
        id: 'escuro-1cor-web-2x',
        filename: 'comven-logo-escuro-1cor-web@2x.png',
        format: 'png',
        dimensionsText: '1600×598 px',
        descriptionText: 'Telas de alta densidade (retina); use com largura de exibição de 800 px.',
        width: 1600,
        height: 598,
        badgeText: 'Retina @2x',
      },
      {
        id: 'escuro-1cor-svg',
        filename: 'comven-logo-escuro-1cor.svg',
        format: 'svg',
        dimensionsText: 'Arquivo vetorial escalável',
        descriptionText: 'Use em navegadores e no Canva para materiais em negativo.',
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
    ],
    brandTitle: 'COMVEN — Somente marca',
    versionName: 'Fundo claro · Colorida',
    usageRecommendation:
      'Use em cabeçalhos compactos, navegação, reduções e UI sobre fundos claros.',
    sourceImage: LOGO_ASSETS.lightColoridaSemTagline,
    svgVariant: {
      theme: 'light',
      colorScheme: 'colorida',
      showTagline: false,
    },
    files: [
      {
        id: 'somente-marca-claro-impressao',
        filename: 'comven-logo-somente-marca-claro-impressao.png',
        format: 'png',
        dimensionsText: '2362×576 px, 300 dpi',
        descriptionText: 'Impressos compactos, assinaturas de documento e materiais gráficos.',
        width: 2362,
        height: 576,
        dpi: 300,
        badgeText: 'Impressão 300 dpi',
      },
      {
        id: 'somente-marca-claro-web',
        filename: 'comven-logo-somente-marca-claro-web.png',
        format: 'png',
        dimensionsText: '800×195 px',
        descriptionText: 'Headers de websites, barras de navegação e e-mail.',
        width: 800,
        height: 195,
        badgeText: 'Web',
      },
      {
        id: 'somente-marca-claro-web-2x',
        filename: 'comven-logo-somente-marca-claro-web@2x.png',
        format: 'png',
        dimensionsText: '1600×390 px',
        descriptionText: 'Telas de alta densidade (retina); use com largura de exibição de 800 px.',
        width: 1600,
        height: 390,
        badgeText: 'Retina @2x',
      },
      {
        id: 'somente-marca-claro-svg',
        filename: 'comven-logo-somente-marca-claro.svg',
        format: 'svg',
        dimensionsText: 'Arquivo vetorial escalável',
        descriptionText:
          'Use em navegadores e no Canva para reduções compactas sem perda de qualidade.',
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
    ],
    brandTitle: 'COMVEN — Somente marca',
    versionName: 'Fundo escuro · Colorida',
    usageRecommendation: 'Use sobre fundos escuros em navegação, sidebars e interfaces digitais.',
    sourceImage: LOGO_ASSETS.darkColoridaSemTagline,
    svgVariant: {
      theme: 'dark',
      colorScheme: 'colorida',
      showTagline: false,
    },
    files: [
      {
        id: 'somente-marca-escuro-impressao',
        filename: 'comven-logo-somente-marca-escuro-impressao.png',
        format: 'png',
        dimensionsText: '2362×576 px, 300 dpi',
        descriptionText: 'Impressões em fundo escuro, crachás e sinalização.',
        width: 2362,
        height: 576,
        dpi: 300,
        badgeText: 'Impressão 300 dpi',
      },
      {
        id: 'somente-marca-escuro-web',
        filename: 'comven-logo-somente-marca-escuro-web.png',
        format: 'png',
        dimensionsText: '800×195 px',
        descriptionText: 'Headers noturnos, interfaces escuras e apps.',
        width: 800,
        height: 195,
        badgeText: 'Web',
      },
      {
        id: 'somente-marca-escuro-web-2x',
        filename: 'comven-logo-somente-marca-escuro-web@2x.png',
        format: 'png',
        dimensionsText: '1600×390 px',
        descriptionText: 'Telas de alta densidade (retina); use com largura de exibição de 800 px.',
        width: 1600,
        height: 390,
        badgeText: 'Retina @2x',
      },
      {
        id: 'somente-marca-escuro-svg',
        filename: 'comven-logo-somente-marca-escuro.svg',
        format: 'svg',
        dimensionsText: 'Arquivo vetorial escalável',
        descriptionText:
          'Use em navegadores e no Canva para interfaces escuras em qualquer resolução.',
        badgeText: 'Vetor SVG',
      },
    ],
    svgCompatibilityNotice: OFFICIAL_SVG_NOTICE,
  },

  // 7. SOMENTE MARCA — FUNDO CLARO (1 COR AZUL) — Sem Tagline
  {
    id: 'light-1cor-sem-tagline',
    matchKeys: [
      'light-1cor-sem-tagline',
      'comven-logo-somente-marca-1cor-azul.png',
      'comven-logo-somente-marca-claro-1cor',
    ],
    brandTitle: 'COMVEN — Somente marca',
    versionName: 'Fundo claro · 1 cor (Azul #004185)',
    usageRecommendation: 'Use em materiais compactos monocromáticos sobre fundos claros.',
    sourceImage: LOGO_ASSETS.light1CorSemTagline,
    svgVariant: {
      theme: 'light',
      colorScheme: '1cor',
      showTagline: false,
    },
    files: [
      {
        id: 'somente-marca-claro-1cor-impressao',
        filename: 'comven-logo-somente-marca-claro-1cor-impressao.png',
        format: 'png',
        dimensionsText: '2362×576 px, 300 dpi',
        descriptionText: 'Papelaria compacta, notas fiscais e documentos monocromáticos.',
        width: 2362,
        height: 576,
        dpi: 300,
        badgeText: 'Impressão 300 dpi',
      },
      {
        id: 'somente-marca-claro-1cor-web',
        filename: 'comven-logo-somente-marca-claro-1cor-web.png',
        format: 'png',
        dimensionsText: '800×195 px',
        descriptionText: 'Aplicações web compactas em azul #004185.',
        width: 800,
        height: 195,
        badgeText: 'Web',
      },
      {
        id: 'somente-marca-claro-1cor-web-2x',
        filename: 'comven-logo-somente-marca-claro-1cor-web@2x.png',
        format: 'png',
        dimensionsText: '1600×390 px',
        descriptionText: 'Telas de alta densidade (retina); use com largura de exibição de 800 px.',
        width: 1600,
        height: 390,
        badgeText: 'Retina @2x',
      },
      {
        id: 'somente-marca-claro-1cor-svg',
        filename: 'comven-logo-somente-marca-claro-1cor.svg',
        format: 'svg',
        dimensionsText: 'Arquivo vetorial escalável',
        descriptionText: 'Use em navegadores e no Canva para impressões e cortes a laser.',
        badgeText: 'Vetor SVG',
      },
    ],
    svgCompatibilityNotice: OFFICIAL_SVG_NOTICE,
  },

  // 8. SOMENTE MARCA — FUNDO ESCURO (1 COR BRANCO) — Sem Tagline
  {
    id: 'dark-1cor-sem-tagline',
    matchKeys: [
      'dark-1cor-sem-tagline',
      'comven-logo-somente-marca-1cor-branco.png',
      'comven-logo-somente-marca-escuro-1cor',
    ],
    brandTitle: 'COMVEN — Somente marca',
    versionName: 'Fundo escuro · 1 cor (Branco #FFFFFF)',
    usageRecommendation: 'Use sobre fundos escuros em locais compactos ou materiais em negativo.',
    sourceImage: LOGO_ASSETS.dark1CorSemTagline,
    svgVariant: {
      theme: 'dark',
      colorScheme: '1cor',
      showTagline: false,
    },
    files: [
      {
        id: 'somente-marca-escuro-1cor-impressao',
        filename: 'comven-logo-somente-marca-escuro-1cor-impressao.png',
        format: 'png',
        dimensionsText: '2362×576 px, 300 dpi',
        descriptionText: 'Gravações a laser, brindes escuros e impressões monocromáticas.',
        width: 2362,
        height: 576,
        dpi: 300,
        badgeText: 'Impressão 300 dpi',
      },
      {
        id: 'somente-marca-escuro-1cor-web',
        filename: 'comven-logo-somente-marca-escuro-1cor-web.png',
        format: 'png',
        dimensionsText: '800×195 px',
        descriptionText: 'Rodapés e interfaces escuras em alto contraste.',
        width: 800,
        height: 195,
        badgeText: 'Web',
      },
      {
        id: 'somente-marca-escuro-1cor-web-2x',
        filename: 'comven-logo-somente-marca-escuro-1cor-web@2x.png',
        format: 'png',
        dimensionsText: '1600×390 px',
        descriptionText: 'Telas de alta densidade (retina); use com largura de exibição de 800 px.',
        width: 1600,
        height: 390,
        badgeText: 'Retina @2x',
      },
      {
        id: 'somente-marca-escuro-1cor-svg',
        filename: 'comven-logo-somente-marca-escuro-1cor.svg',
        format: 'svg',
        dimensionsText: 'Arquivo vetorial escalável',
        descriptionText:
          'Use em navegadores e no Canva para aplicações em negativo em qualquer tamanho.',
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
