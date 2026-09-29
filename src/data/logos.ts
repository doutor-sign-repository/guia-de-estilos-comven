/**
 * COMVEN Official Logo Assets & Definitions
 * Contains URLs for the 6 official user-uploaded PNG assets, plus SVG components
 * for the remaining variations and pure vector rendering.
 */

export interface LogoVariation {
  id: string
  name: string
  mode: 'light' | 'dark'
  colorScheme: 'colorida' | '1cor'
  hasTagline: boolean
  src?: string
  bg: '#FFFFFF' | '#141414'
  description: string
  badgeText: string
}

export const LOGO_ASSETS = {
  // Official uploaded PNG assets
  dark1CorComTagline:
    'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/logotipo-dark-mode-1-cor-com-tagline-633cf.png',
  dark1CorSemTagline:
    'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/logotipo-dark-mode-1-cor-sem-tagline-3579c.png',
  darkColoridaComTagline:
    'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/logotipo-dark-mode-colorida-com-tagline-f1d82.png',
  darkColoridaSemTagline:
    'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/logotipo-dark-mode-colorida-sem-tagline-b74b2.png',
  light1CorComTagline:
    'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/logotipo-light-mode-1-cor-com-tagline-835f1.png',
  light1CorSemTagline:
    'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/logotipo-light-mode-1-cor-sem-tagline-493c2.png',
}

export const LOGO_VARIATIONS: LogoVariation[] = [
  // 1. Dark Mode Colorida com Tagline (Versão oficial principal em fundo escuro)
  {
    id: 'dark-colorida-com-tagline',
    name: 'Dark Mode — Colorida com Tagline',
    mode: 'dark',
    colorScheme: 'colorida',
    hasTagline: true,
    src: LOGO_ASSETS.darkColoridaComTagline,
    bg: '#141414',
    description:
      'Versão institucional preferencial para aplicações em superfícies e interfaces escuras.',
    badgeText: 'Fundo Escuro · Colorida',
  },
  // 2. Dark Mode Colorida sem Tagline
  {
    id: 'dark-colorida-sem-tagline',
    name: 'Dark Mode — Colorida sem Tagline',
    mode: 'dark',
    colorScheme: 'colorida',
    hasTagline: false,
    src: LOGO_ASSETS.darkColoridaSemTagline,
    bg: '#141414',
    description:
      'Wordmark simplificado para cabeçalhos compactos, sidebar e reduções em fundo escuro.',
    badgeText: 'Fundo Escuro · Colorida',
  },
  // 3. Dark Mode 1 Cor com Tagline
  {
    id: 'dark-1cor-com-tagline',
    name: 'Dark Mode — Monocromática com Tagline',
    mode: 'dark',
    colorScheme: '1cor',
    hasTagline: true,
    src: LOGO_ASSETS.dark1CorComTagline,
    bg: '#141414',
    description:
      'Aplicações monocromáticas em positivo/negativo ou impressões em uma cor sobre escuro.',
    badgeText: 'Fundo Escuro · 1 Cor (Branco)',
  },
  // 4. Dark Mode 1 Cor sem Tagline
  {
    id: 'dark-1cor-sem-tagline',
    name: 'Dark Mode — Monocromática sem Tagline',
    mode: 'dark',
    colorScheme: '1cor',
    hasTagline: false,
    src: LOGO_ASSETS.dark1CorSemTagline,
    bg: '#141414',
    description:
      'Versão monocromática compacta para rodapés, marcas d’água ou ícones institucionais.',
    badgeText: 'Fundo Escuro · 1 Cor (Branco)',
  },
  // 5. Light Mode Colorida com Tagline (Versão principal oficial em fundo claro)
  {
    id: 'light-colorida-com-tagline',
    name: 'Light Mode — Colorida com Tagline',
    mode: 'light',
    colorScheme: 'colorida',
    hasTagline: true,
    bg: '#FFFFFF',
    description:
      'Versão institucional principal em fundo claro: azul #004185, verde #06D04D e check amarelo.',
    badgeText: 'Fundo Claro · Colorida (Principal)',
  },
  // 6. Light Mode Colorida sem Tagline
  {
    id: 'light-colorida-sem-tagline',
    name: 'Light Mode — Colorida sem Tagline',
    mode: 'light',
    colorScheme: 'colorida',
    hasTagline: false,
    bg: '#FFFFFF',
    description: 'Versão colorida compacta sem tagline para produtos digitais em fundo claro.',
    badgeText: 'Fundo Claro · Colorida',
  },
  // 7. Light Mode 1 Cor com Tagline
  {
    id: 'light-1cor-com-tagline',
    name: 'Light Mode — Monocromática com Tagline',
    mode: 'light',
    colorScheme: '1cor',
    hasTagline: true,
    src: LOGO_ASSETS.light1CorComTagline,
    bg: '#FFFFFF',
    description:
      'Versão 1 cor em azul institucional #004185 para documentos impressos ou telas institucionais.',
    badgeText: 'Fundo Claro · 1 Cor (Azul)',
  },
  // 8. Light Mode 1 Cor sem Tagline
  {
    id: 'light-1cor-sem-tagline',
    name: 'Light Mode — Monocromática sem Tagline',
    mode: 'light',
    colorScheme: '1cor',
    hasTagline: false,
    src: LOGO_ASSETS.light1CorSemTagline,
    bg: '#FFFFFF',
    description:
      'Wordmark monocromático compacto em azul institucional #004185 para superfícies claras.',
    badgeText: 'Fundo Claro · 1 Cor (Azul)',
  },
]
