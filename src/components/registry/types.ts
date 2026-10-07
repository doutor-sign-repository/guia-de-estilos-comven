import React from 'react'

export type ButtonType = 'Primary' | 'Secondary' | 'Tertiary' | 'Link'
export type ButtonSize = 'Large' | 'Medium' | 'Small'
export type ButtonState = 'Default' | 'Hover' | 'Active/Focus' | 'Disabled'
export type ButtonIconOption = 'Com ícone' | 'Sem ícone'

export interface ButtonConfig {
  type: ButtonType
  size: ButtonSize
  state: ButtonState
  icon: ButtonIconOption
  label: string
}

export type InputState = 'Default' | 'Focus' | 'Error' | 'Disabled'
export type InputSize = 'Large' | 'Medium' | 'Small' | 'XSmall'
export type InputIconOption = 'Com ícone' | 'Sem ícone'

export interface InputConfig {
  state: InputState
  size: InputSize
  leftIcon: InputIconOption
  rightIcon: InputIconOption
  label: string
  placeholder: string
  supportingText: string
}

export interface ComponentDefinition<TConfig> {
  id: string
  name: string
  category: 'COMPONENTES'
  number: string
  subtitle: string
  description: string
  figmaUrl?: string
  defaultConfig: TConfig
  generateCss: (config: TConfig) => string
  renderPreview: (config: TConfig) => React.ReactNode
}

/**
 * CSS Generator for the Button component matching the PDF specifications:
 *
 * .button {
 *   display: flex;
 *   align-items: center;
 *   gap: 8px;
 *   padding: 12px 20px; (L) / 10px 16px; (M) / 8px 12px; (S)
 *   border-radius: 8px;
 *   background-color: #004185;
 * }
 * .button .label { ... }
 * .button .icon { ... }
 */
export function generateButtonCss(config: ButtonConfig): string {
  const { type, size, state, icon } = config

  // Comment header matching screenshot: /* Type=Primary, Size=Large, State=Default, Icon=Show */
  const iconStatus = icon === 'Com ícone' ? 'Show' : 'Hide'
  const comment = `/* Type=${type}, Size=${size}, State=${state}, Icon=${iconStatus} */`

  // Dimensions based on size (consistent across all types including Link)
  let padding = '12px 20px'
  let fontSize = '16px'
  let iconDim = '20px'

  if (size === 'Medium') {
    padding = '10px 16px'
    fontSize = '14px'
    iconDim = '18px'
  } else if (size === 'Small') {
    padding = '8px 12px'
    fontSize = '12px'
    iconDim = '16px'
  }

  // Core properties for .button
  const lines: string[] = ['  display: flex;', '  align-items: center;', '  gap: 8px;']

  if (type !== 'Link') {
    lines.push(`  padding: ${padding};`)
    lines.push('  border-radius: 8px;')
  }

  let labelColor = '#FFFFFF'
  const fontWeight = '700'

  if (type === 'Primary') {
    if (state === 'Disabled') {
      lines.push('  background-color: #8BB7E7;')
      lines.push('  cursor: not-allowed;')
      labelColor = '#FFFFFF'
    } else if (state === 'Hover') {
      lines.push('  background-color: #00346A;')
      lines.push('  cursor: pointer;')
      labelColor = '#FFFFFF'
    } else if (state === 'Active/Focus') {
      lines.push('  background-color: #002750;')
      lines.push('  box-shadow: 0 0 0 1px rgba(139, 183, 231, 0.6);')
      lines.push('  cursor: pointer;')
      labelColor = '#FFFFFF'
    } else {
      lines.push('  background-color: #004185;')
      lines.push('  cursor: pointer;')
      labelColor = '#FFFFFF'
    }
  } else if (type === 'Secondary') {
    if (state === 'Disabled') {
      lines.push('  background-color: transparent;')
      lines.push('  border: 2px solid #8BB7E7;')
      lines.push('  cursor: not-allowed;')
      labelColor = '#8BB7E7'
    } else if (state === 'Hover') {
      lines.push('  background-color: rgba(255, 255, 255, 0.08);')
      lines.push('  border: 2px solid #3B82F6;')
      lines.push('  cursor: pointer;')
      labelColor = '#FFFFFF'
    } else if (state === 'Active/Focus') {
      lines.push('  background-color: rgba(255, 255, 255, 0.15);')
      lines.push('  border: 2px solid #FFFFFF;')
      lines.push('  box-shadow: 0 0 0 1px rgba(139, 183, 231, 0.6);')
      lines.push('  cursor: pointer;')
      labelColor = '#FFFFFF'
    } else {
      lines.push('  background-color: transparent;')
      lines.push('  border: 2px solid #004185;')
      lines.push('  cursor: pointer;')
      labelColor = '#004185'
    }
  } else if (type === 'Tertiary') {
    if (state === 'Disabled') {
      lines.push('  background-color: rgba(230, 250, 237, 0.35);')
      lines.push('  cursor: not-allowed;')
      labelColor = '#94A3B8'
    } else if (state === 'Hover') {
      lines.push('  background-color: #CDF6DB;')
      lines.push('  cursor: pointer;')
      labelColor = '#004185'
    } else if (state === 'Active/Focus') {
      lines.push('  background-color: #9BECB8;')
      lines.push('  box-shadow: 0 0 0 1px rgba(0, 65, 133, 0.4);')
      lines.push('  cursor: pointer;')
      labelColor = '#002750'
    } else {
      lines.push('  background-color: #E6FAED;')
      lines.push('  cursor: pointer;')
      labelColor = '#004185'
    }
  } else if (type === 'Link') {
    lines.push('  background-color: transparent;')
    lines.push('  border: none;')
    lines.push('  padding: 0;')
    lines.push('  text-decoration: none;')
    if (state === 'Disabled') {
      lines.push('  cursor: not-allowed;')
      labelColor = '#8BB7E7'
    } else {
      // Tipo Link: sem hover e sem active (o usuário pediu textualmente)
      lines.push('  cursor: pointer;')
      labelColor = '#004185'
    }
  }

  const buttonBlock = `.button {\n${lines.join('\n')}\n}`

  const labelBlock = `.button__label {\n  font-family: 'Open Sans', sans-serif;\n  font-weight: ${fontWeight};\n  font-size: ${fontSize};\n  color: ${labelColor};\n}`

  let iconBlock = ''
  if (icon === 'Com ícone') {
    iconBlock = `\n\n.button__icon {\n  width: ${iconDim};\n  height: ${iconDim};\n}`
  }

  return `${comment}\n${buttonBlock}\n\n${labelBlock}${iconBlock}`
}

export type SelectState = 'Default' | 'Focus' | 'Hover' | 'Error' | 'Disabled'
export type SelectSize = 'Large' | 'Medium' | 'Small' | 'XSmall'

export interface SelectConfig {
  state: SelectState
  size: SelectSize
  label: string
  placeholder: string
  supportingText: string
}

export interface InputSizeMetrics {
  height: number
  fontSize: number
  labelSize: number
  supportingSize: number
  iconSize: number
  radius: number
  paddingX: number
  gap: number
}

export const INPUT_SIZE_METRICS: Record<InputSize, InputSizeMetrics> = {
  Large: {
    height: 48,
    fontSize: 16,
    labelSize: 14,
    supportingSize: 12,
    iconSize: 20,
    radius: 8,
    paddingX: 16,
    gap: 8,
  },
  Medium: {
    height: 40,
    fontSize: 14,
    labelSize: 13,
    supportingSize: 12,
    iconSize: 18,
    radius: 8,
    paddingX: 14,
    gap: 8,
  },
  Small: {
    height: 36,
    fontSize: 13,
    labelSize: 12,
    supportingSize: 11,
    iconSize: 16,
    radius: 8,
    paddingX: 12,
    gap: 6,
  },
  XSmall: {
    height: 32,
    fontSize: 12,
    labelSize: 11,
    supportingSize: 10,
    iconSize: 14,
    radius: 6,
    paddingX: 10,
    gap: 6,
  },
}

/**
 * CSS Generator for the Input/Text Field component matching the COMVEN Figma specification:
 *
 * .text-field-container { ... }
 * .text-field-label { ... }
 * .text-field { ... }
 * .text-field__input { ... }
 * .text-field__icon { ... }
 * .text-field-supporting-text { ... }
 */
export function generateInputCss(config: InputConfig): string {
  const { state, size, leftIcon, rightIcon } = config
  const metrics = INPUT_SIZE_METRICS[size] || INPUT_SIZE_METRICS.Large

  const leftIconStatus = leftIcon === 'Com ícone' ? 'Show' : 'Hide'
  const rightIconStatus = rightIcon === 'Com ícone' ? 'Show' : 'Hide'
  const comment = `/* State=${state}, Size=${size}, LeftIcon=${leftIconStatus}, RightIcon=${rightIconStatus} */`

  let borderColor = '#D0D5DD'
  let borderWidth = '1px'
  let bgColor = '#FFFFFF'
  let textColor = '#141414'
  let placeholderColor = '#667085'
  let iconColor = '#667085'
  let labelColor = '#344054'
  let supportingColor = '#667085'
  let focusRing = ''
  let cursor = 'text'

  if (state === 'Focus') {
    borderColor = '#004185'
    borderWidth = '1.5px'
    labelColor = '#004185'
    iconColor = '#004185'
    focusRing = '\n  box-shadow: 0 0 0 1px #004185;'
  } else if (state === 'Error') {
    borderColor = '#E11D48'
    borderWidth = '1.5px'
    labelColor = '#E11D48'
    supportingColor = '#E11D48'
    iconColor = '#E11D48'
    focusRing = '\n  box-shadow: 0 0 0 1px #E11D48;'
  } else if (state === 'Disabled') {
    borderColor = '#E5E7EB'
    bgColor = '#E5E7EB'
    textColor = '#9CA3AF'
    placeholderColor = '#9CA3AF'
    iconColor = '#9CA3AF'
    labelColor = '#9CA3AF'
    supportingColor = '#9CA3AF'
    cursor = 'not-allowed'
  }

  const containerBlock = `.text-field-container {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  width: 100%;\n}`

  const labelBlock = `.text-field-label {\n  font-family: 'Open Sans', sans-serif;\n  font-weight: 700;\n  font-size: ${metrics.labelSize}px;\n  color: ${labelColor};\n}`

  const fieldLines = [
    '  display: flex;',
    '  align-items: center;',
    `  height: ${metrics.height}px;`,
    `  padding: 0 ${metrics.paddingX}px;`,
    `  gap: ${metrics.gap}px;`,
    `  background-color: ${bgColor};`,
    `  border: ${borderWidth} solid ${borderColor};`,
    `  border-radius: ${metrics.radius}px;`,
  ]
  if (focusRing) {
    fieldLines.push(focusRing.trim())
  }
  if (cursor !== 'text') {
    fieldLines.push(`  cursor: ${cursor};`)
  }
  const fieldBlock = `.text-field {\n${fieldLines.join('\n')}\n}`

  const inputBlock = `.text-field__input {\n  flex: 1;\n  border: none;\n  background: transparent;\n  font-family: 'Open Sans', sans-serif;\n  font-size: ${metrics.fontSize}px;\n  color: ${textColor};\n  outline: none;\n}`
  const placeholderBlock = `.text-field__input::placeholder {\n  color: ${placeholderColor};\n}`

  let iconsBlock = ''
  if (leftIcon === 'Com ícone' || rightIcon === 'Com ícone') {
    iconsBlock = `\n\n.text-field__icon {\n  font-size: ${metrics.iconSize}px;\n  color: ${iconColor};\n  user-select: none;\n}`
  }

  const supportingBlock = `.text-field-supporting-text {\n  font-family: 'Open Sans', sans-serif;\n  font-weight: 400;\n  font-size: ${metrics.supportingSize}px;\n  color: ${supportingColor};\n}`

  return `${comment}\n${containerBlock}\n\n${labelBlock}\n\n${fieldBlock}\n\n${inputBlock}\n\n${placeholderBlock}${iconsBlock}\n\n${supportingBlock}`
}

export type SelectSizeMetrics = InputSizeMetrics
export const SELECT_SIZE_METRICS: Record<SelectSize, SelectSizeMetrics> = INPUT_SIZE_METRICS

/**
 * CSS Generator for the Select (Dropdown) component matching the COMVEN Figma specification:
 *
 * .select-container { ... }
 * .select-label { ... }
 * .select { ... }
 * .select__trigger { ... }
 * .select__arrow { ... }
 * .select-supporting-text { ... }
 */
export function generateSelectCss(config: SelectConfig): string {
  const { state, size } = config
  const metrics = SELECT_SIZE_METRICS[size] || SELECT_SIZE_METRICS.Large

  const comment = `/* State=${state}, Size=${size} */`

  let borderColor = '#D0D5DD'
  let borderWidth = '1px'
  let bgColor = '#FFFFFF'
  let textColor = '#141414'
  let placeholderColor = '#667085'
  let arrowColor = '#141414'
  let labelColor = '#344054'
  let supportingColor = '#667085'
  let focusRing = ''
  let cursor = 'pointer'

  if (state === 'Hover') {
    borderColor = '#98A2B3'
    borderWidth = '1px'
    arrowColor = '#004185'
  } else if (state === 'Focus') {
    borderColor = '#004185'
    borderWidth = '1.5px'
    labelColor = '#004185'
    arrowColor = '#004185'
    focusRing = '\n  box-shadow: 0 0 0 1px #004185;'
  } else if (state === 'Error') {
    borderColor = '#E11D48'
    borderWidth = '1.5px'
    labelColor = '#E11D48'
    supportingColor = '#E11D48'
    arrowColor = '#E11D48'
    focusRing = '\n  box-shadow: 0 0 0 1px #E11D48;'
  } else if (state === 'Disabled') {
    borderColor = '#E5E7EB'
    bgColor = '#E5E7EB'
    textColor = '#9CA3AF'
    placeholderColor = '#9CA3AF'
    arrowColor = '#9CA3AF'
    labelColor = '#9CA3AF'
    supportingColor = '#9CA3AF'
    cursor = 'not-allowed'
  }

  const containerBlock = `.select-container {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  width: 100%;\n}`

  const labelBlock = `.select-label {\n  font-family: 'Open Sans', sans-serif;\n  font-weight: 700;\n  font-size: ${metrics.labelSize}px;\n  color: ${labelColor};\n}`

  const fieldLines = [
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: space-between;',
    `  height: ${metrics.height}px;`,
    `  padding: 0 ${metrics.paddingX}px;`,
    `  gap: ${metrics.gap}px;`,
    `  background-color: ${bgColor};`,
    `  border: ${borderWidth} solid ${borderColor};`,
    `  border-radius: ${metrics.radius}px;`,
  ]
  if (focusRing) {
    fieldLines.push(focusRing.trim())
  }
  fieldLines.push(`  cursor: ${cursor};`)
  fieldLines.push('  user-select: none;')
  const selectBlock = `.select {\n${fieldLines.join('\n')}\n}`

  const triggerBlock = `.select__trigger {\n  flex: 1;\n  font-family: 'Open Sans', sans-serif;\n  font-size: ${metrics.fontSize}px;\n  color: ${placeholderColor};\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}`

  const arrowBlock = `.select__arrow {\n  width: ${metrics.iconSize}px;\n  height: ${metrics.iconSize}px;\n  color: ${arrowColor};\n  transition: transform 0.2s ease;\n}`

  const supportingBlock = `.select-supporting-text {\n  font-family: 'Open Sans', sans-serif;\n  font-weight: 400;\n  font-size: ${metrics.supportingSize}px;\n  color: ${supportingColor};\n}`

  return `${comment}\n${containerBlock}\n\n${labelBlock}\n\n${selectBlock}\n\n${triggerBlock}\n\n${arrowBlock}\n\n${supportingBlock}`
}

/* ==========================================================================
   BADGE COMPONENT DEFINITIONS & CSS GENERATOR
   ========================================================================== */

export type BadgeVariant = 'Primary' | 'Secondary' | 'Success' | 'Warning' | 'Error' | 'Neutral'

export type BadgeSize = 'Large' | 'Medium' | 'Small' | 'XSmall'
export type BadgeState = 'Default' | 'Hover' | 'Disabled'
export type BadgeIconOption = 'Com ícone' | 'Sem ícone'

export interface BadgeConfig {
  variant: BadgeVariant
  size: BadgeSize
  state: BadgeState
  icon: BadgeIconOption
  text: string
}

export interface BadgeSizeMetrics {
  height: number
  fontSize: number
  iconSize: number
  paddingX: number
  gap: number
  radius: number
}

export const BADGE_SIZE_METRICS: Record<BadgeSize, BadgeSizeMetrics> = {
  Large: {
    height: 32,
    fontSize: 13,
    iconSize: 16,
    paddingX: 12,
    gap: 6,
    radius: 9999, // pílula
  },
  Medium: {
    height: 28,
    fontSize: 12,
    iconSize: 14,
    paddingX: 10,
    gap: 5,
    radius: 9999,
  },
  Small: {
    height: 24,
    fontSize: 11,
    iconSize: 13,
    paddingX: 8,
    gap: 4,
    radius: 9999,
  },
  XSmall: {
    height: 20,
    fontSize: 10,
    iconSize: 11,
    paddingX: 6,
    gap: 3,
    radius: 9999,
  },
}

/**
 * CSS Generator for the Badge component matching COMVEN Design System specifications:
 *
 * .badge { ... }
 * .badge--[variant] { ... }
 * .badge--[size] { ... }
 * .badge__icon { ... }
 * .badge__label { ... }
 */
export function generateBadgeCss(config: BadgeConfig): string {
  const { variant, size, state, icon } = config
  const metrics = BADGE_SIZE_METRICS[size] || BADGE_SIZE_METRICS.Medium
  const iconStatus = icon === 'Com ícone' ? 'Show' : 'Hide'
  const comment = `/* Variant=${variant}, Size=${size}, State=${state}, Icon=${iconStatus} */`

  // Palette tokens according to COMVEN guidelines:
  // Primary: background #004185 (COMVEN Blue), text #FFFFFF
  // Secondary (Outline): border 1.5px #004185, background transparent, text #004185
  // Success (Verde): background #E6FAED, border 1px #9BECB8, text #047D2E
  // Warning (Amarelo #F2CB05): background #FEFAE6, border 1px #F7E069, text #917A03
  // Error (Vermelho): background #FFE5E5, border 1px #FF9999, text #CC0000
  // Neutral: background #F5F7FA, border 1px #DCDCDC, text #3D3D3D

  let bgColor = '#004185'
  let textColor = '#FFFFFF'
  let border = 'none'
  let cursor = 'default'
  let ring = ''

  if (variant === 'Primary') {
    if (state === 'Disabled') {
      bgColor = '#8BB7E7'
      textColor = '#FFFFFF'
      cursor = 'not-allowed'
    } else if (state === 'Hover') {
      bgColor = '#00346A'
      cursor = 'pointer'
    } else {
      bgColor = '#004185'
      textColor = '#FFFFFF'
    }
  } else if (variant === 'Secondary') {
    if (state === 'Disabled') {
      bgColor = 'transparent'
      border = '1.5px solid #8BB7E7'
      textColor = '#8BB7E7'
      cursor = 'not-allowed'
    } else if (state === 'Hover') {
      bgColor = 'rgba(0, 65, 133, 0.08)'
      border = '1.5px solid #00346A'
      textColor = '#00346A'
      cursor = 'pointer'
    } else {
      bgColor = 'transparent'
      border = '1.5px solid #004185'
      textColor = '#004185'
    }
  } else if (variant === 'Success') {
    if (state === 'Disabled') {
      bgColor = '#F0FBF4'
      border = '1px solid #CDF6DB'
      textColor = '#6AE394'
      cursor = 'not-allowed'
    } else if (state === 'Hover') {
      bgColor = '#CDF6DB'
      border = '1px solid #6AE394'
      textColor = '#02531F'
      cursor = 'pointer'
    } else {
      bgColor = '#E6FAED'
      border = '1px solid #9BECB8'
      textColor = '#047D2E'
    }
  } else if (variant === 'Warning') {
    // Amarelo COMVEN: permitido para alertas e badges
    if (state === 'Disabled') {
      bgColor = '#FEFDF5'
      border = '1px solid #FCF5CD'
      textColor = '#C2A204'
      cursor = 'not-allowed'
    } else if (state === 'Hover') {
      bgColor = '#FDF3BA'
      border = '1px solid #F2CB05'
      textColor = '#615102'
      ring = '\n  box-shadow: 0 0 0 1px #F2CB05;'
      cursor = 'pointer'
    } else {
      bgColor = '#FEFAE6'
      border = '1px solid #F7E069'
      textColor = '#917A03'
    }
  } else if (variant === 'Error') {
    if (state === 'Disabled') {
      bgColor = '#FFF2F2'
      border = '1px solid #FFCCCC'
      textColor = '#FF9999'
      cursor = 'not-allowed'
    } else if (state === 'Hover') {
      bgColor = '#FFCCCC'
      border = '1px solid #FF6666'
      textColor = '#990000'
      cursor = 'pointer'
    } else {
      bgColor = '#FFE5E5'
      border = '1px solid #FF9999'
      textColor = '#CC0000'
    }
  } else if (variant === 'Neutral') {
    if (state === 'Disabled') {
      bgColor = '#FAFAFA'
      border = '1px solid #EBEBEB'
      textColor = '#A1A1A1'
      cursor = 'not-allowed'
    } else if (state === 'Hover') {
      bgColor = '#EBEBEB'
      border = '1px solid #BFBFBF'
      textColor = '#141414'
      cursor = 'pointer'
    } else {
      bgColor = '#F5F7FA'
      border = '1px solid #DCDCDC'
      textColor = '#3D3D3D'
    }
  }

  const badgeLines: string[] = [
    '  display: inline-flex;',
    '  align-items: center;',
    '  justify-content: center;',
    `  height: ${metrics.height}px;`,
    `  padding: 0 ${metrics.paddingX}px;`,
    `  gap: ${metrics.gap}px;`,
    '  border-radius: 9999px;',
    `  background-color: ${bgColor};`,
  ]

  if (border !== 'none') {
    badgeLines.push(`  border: ${border};`)
  }
  if (ring) {
    badgeLines.push(ring.trim())
  }
  if (cursor !== 'default') {
    badgeLines.push(`  cursor: ${cursor};`)
  }
  badgeLines.push('  user-select: none;')
  badgeLines.push('  white-space: nowrap;')

  const badgeBlock = `.badge {\n${badgeLines.join('\n')}\n}`

  const labelBlock = `.badge__label {\n  font-family: 'Open Sans', sans-serif;\n  font-weight: 600;\n  font-size: ${metrics.fontSize}px;\n  line-height: 1;\n  color: ${textColor};\n  letter-spacing: 0.01em;\n}`

  let iconBlock = ''
  if (icon === 'Com ícone') {
    iconBlock = `\n\n.badge__icon {\n  font-size: ${metrics.iconSize}px;\n  width: ${metrics.iconSize}px;\n  height: ${metrics.iconSize}px;\n  line-height: 1;\n  color: ${textColor};\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}`
  }

  return `${comment}\n${badgeBlock}\n\n${labelBlock}${iconBlock}`
}

/* ==========================================================================
   INFOCARD COMPONENT TYPES & DEFINITIONS (InfoCard)
   ========================================================================== */

export type InfoCardVariant = 'Info' | 'Success' | 'Warning' | 'Error' | 'Neutral'
export type InfoCardSize = 'Large' | 'Medium' | 'Small'
export type InfoCardState = 'Default' | 'Destaque'
export type InfoCardIconOption = 'Com ícone' | 'Sem ícone'

export interface InfoCardConfig {
  variant: InfoCardVariant
  size: InfoCardSize
  state: InfoCardState
  icon: InfoCardIconOption
  title: string
  description: string
}

export interface InfoCardSizeMetrics {
  padding: string
  radius: number
  gap: number
  iconSize: number
  titleFontSize: number
  titleLineHeight: number
  descFontSize: number
  descLineHeight: number
}

export const INFOCARD_SIZE_METRICS: Record<InfoCardSize, InfoCardSizeMetrics> = {
  Large: {
    padding: '24px 28px',
    radius: 16,
    gap: 16,
    iconSize: 28,
    titleFontSize: 16,
    titleLineHeight: 1.4,
    descFontSize: 14,
    descLineHeight: 1.5,
  },
  Medium: {
    padding: '18px 22px',
    radius: 14,
    gap: 14,
    iconSize: 24,
    titleFontSize: 15,
    titleLineHeight: 1.35,
    descFontSize: 13,
    descLineHeight: 1.5,
  },
  Small: {
    padding: '14px 18px',
    radius: 12,
    gap: 12,
    iconSize: 20,
    titleFontSize: 14,
    titleLineHeight: 1.3,
    descFontSize: 12,
    descLineHeight: 1.45,
  },
}

export interface InfoCardColorTokens {
  bg: string
  border: string
  highlightBorder: string
  iconColor: string
  titleColor: string
  descColor: string
}

export const INFOCARD_COLOR_TOKENS: Record<InfoCardVariant, InfoCardColorTokens> = {
  // Azul COMVEN
  Info: {
    bg: '#EBF3FC',
    border: '#B6D5F7',
    highlightBorder: '#004185',
    iconColor: '#004185',
    titleColor: '#002750',
    descColor: '#235F9D',
  },
  // Verde COMVEN
  Success: {
    bg: '#E6FAED',
    border: '#9BECB8',
    highlightBorder: '#05A63E',
    iconColor: '#047D2E',
    titleColor: '#02531F',
    descColor: '#141414',
  },
  // Amarelo COMVEN (#F2CB05) — permitido em alertas/destaques pontuais
  Warning: {
    bg: '#FEFAE6',
    border: '#F7E069',
    highlightBorder: '#C2A204',
    iconColor: '#917A03',
    titleColor: '#302901',
    descColor: '#615102',
  },
  // Vermelho de alerta/erro
  Error: {
    bg: '#FFE5E5',
    border: '#FF9999',
    highlightBorder: '#CC0000',
    iconColor: '#CC0000',
    titleColor: '#660000',
    descColor: '#141414',
  },
  // Neutro oficial COMVEN (#F5F7FA / #EBEBEB)
  Neutral: {
    bg: '#F5F7FA',
    border: '#DCDCDC',
    highlightBorder: '#666666',
    iconColor: '#3D3D3D',
    titleColor: '#141414',
    descColor: '#525252',
  },
}

/**
 * CSS Generator for InfoCard component matching COMVEN Design System specifications:
 *
 * .infocard { ... }
 * .infocard--[variant] { ... }
 * .infocard--[size] { ... }
 * .infocard__icon { ... }
 * .infocard__content { ... }
 * .infocard__title { ... }
 * .infocard__description { ... }
 */
export function generateInfoCardCss(config: InfoCardConfig): string {
  const { variant, size, state, icon } = config
  const metrics = INFOCARD_SIZE_METRICS[size] || INFOCARD_SIZE_METRICS.Large
  const colors = INFOCARD_COLOR_TOKENS[variant] || INFOCARD_COLOR_TOKENS.Info
  const iconStatus = icon === 'Com ícone' ? 'Show' : 'Hide'
  const comment = `/* InfoCard — Variant=${variant}, Size=${size}, State=${state}, Icon=${iconStatus} */`

  const isHighlight = state === 'Destaque'

  const bgColor = colors.bg
  const borderColor = isHighlight ? colors.highlightBorder : colors.border
  const borderWidth = isHighlight ? '1.5px' : '1px'
  const iconColor = colors.iconColor
  const titleColor = colors.titleColor
  const descColor = colors.descColor
  const ring = isHighlight ? `\n  box-shadow: 0 0 0 1px ${colors.highlightBorder};` : ''

  const cardLines: string[] = [
    '  display: flex;',
    '  align-items: flex-start;',
    `  gap: ${metrics.gap}px;`,
    `  padding: ${metrics.padding};`,
    `  border-radius: ${metrics.radius}px;`,
    `  background-color: ${bgColor};`,
    `  border: ${borderWidth} solid ${borderColor};`,
  ]

  if (ring) {
    cardLines.push(ring.trim())
  }
  cardLines.push('  transition: all 0.2s ease;')

  const cardBlock = `.infocard {\n${cardLines.join('\n')}\n}`

  let iconBlock = ''
  if (icon === 'Com ícone') {
    iconBlock = `\n\n.infocard__icon {\n  font-size: ${metrics.iconSize}px;\n  width: ${metrics.iconSize}px;\n  height: ${metrics.iconSize}px;\n  line-height: 1;\n  color: ${iconColor};\n  flex-shrink: 0;\n  margin-top: 2px;\n}`
  }

  const contentBlock = `\n\n.infocard__content {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  flex: 1 1 0%;\n}`

  const titleBlock = `\n\n.infocard__title {\n  font-family: 'Open Sans', sans-serif;\n  font-weight: 700;\n  font-size: ${metrics.titleFontSize}px;\n  line-height: ${metrics.titleLineHeight};\n  color: ${titleColor};\n  margin: 0;\n}`

  const descBlock = `\n\n.infocard__description {\n  font-family: 'Open Sans', sans-serif;\n  font-weight: 400;\n  font-size: ${metrics.descFontSize}px;\n  line-height: ${metrics.descLineHeight};\n  color: ${descColor};\n  margin: 0;\n}`

  return `${comment}\n${cardBlock}${iconBlock}${contentBlock}${titleBlock}${descBlock}`
}

/* ==========================================================================
   CARD COMPONENT TYPES & DEFINITIONS (Card)
   ========================================================================== */

export type CardVariant = 'Elevada' | 'Borda' | 'Simples'
export type CardSize = 'Large' | 'Medium' | 'Small'
export type CardState = 'Default' | 'Destaque'
export type CardIconOption = 'Com ícone' | 'Sem ícone'
export type CardFooterOption = 'Com ações' | 'Sem ações'

export interface CardConfig {
  variant: CardVariant
  size: CardSize
  state: CardState
  icon: CardIconOption
  footer: CardFooterOption
  title: string
  content: string
}

export interface CardSizeMetrics {
  padding: string
  radius: number
  gap: number
  iconSize: number
  titleFontSize: number
  titleLineHeight: number
  contentFontSize: number
  contentLineHeight: number
  buttonPadding: string
  buttonFontSize: number
}

export const CARD_SIZE_METRICS: Record<CardSize, CardSizeMetrics> = {
  Large: {
    padding: '24px 28px',
    radius: 16,
    gap: 16,
    iconSize: 24,
    titleFontSize: 18,
    titleLineHeight: 1.35,
    contentFontSize: 15,
    contentLineHeight: 1.5,
    buttonPadding: '10px 16px',
    buttonFontSize: 14,
  },
  Medium: {
    padding: '20px 24px',
    radius: 12,
    gap: 14,
    iconSize: 22,
    titleFontSize: 16,
    titleLineHeight: 1.35,
    contentFontSize: 14,
    contentLineHeight: 1.5,
    buttonPadding: '8px 14px',
    buttonFontSize: 13,
  },
  Small: {
    padding: '16px 20px',
    radius: 10,
    gap: 12,
    iconSize: 20,
    titleFontSize: 15,
    titleLineHeight: 1.3,
    contentFontSize: 13,
    contentLineHeight: 1.45,
    buttonPadding: '6px 12px',
    buttonFontSize: 12,
  },
}

export function generateCardCss(config: CardConfig): string {
  const { variant, size, state, icon, footer } = config
  const metrics = CARD_SIZE_METRICS[size] || CARD_SIZE_METRICS.Large
  const iconStatus = icon === 'Com ícone' ? 'Show' : 'Hide'
  const footerStatus = footer === 'Com ações' ? 'Show' : 'Hide'
  const comment = `/* Card — Variant=${variant}, Size=${size}, State=${state}, Icon=${iconStatus}, Footer=${footerStatus} */`

  const isHighlight = state === 'Destaque'

  let bgColor = '#FFFFFF'
  let borderColor = 'transparent'
  let borderWidth = '0px'
  let shadow = 'none'

  if (variant === 'Elevada') {
    bgColor = '#FFFFFF'
    if (isHighlight) {
      borderColor = '#004185'
      borderWidth = '1.5px'
      shadow = '0 10px 25px -5px rgba(0, 65, 133, 0.18), 0 8px 10px -6px rgba(0, 65, 133, 0.12)'
    } else {
      borderColor = '#EBEBEB'
      borderWidth = '1px'
      shadow = '0 8px 20px -4px rgba(6, 36, 70, 0.08), 0 4px 6px -2px rgba(6, 36, 70, 0.04)'
    }
  } else if (variant === 'Borda') {
    bgColor = '#FFFFFF'
    if (isHighlight) {
      borderColor = '#004185'
      borderWidth = '2px'
      shadow = '0 0 0 1px #004185'
    } else {
      borderColor = '#D5DCE5'
      borderWidth = '1px'
      shadow = 'none'
    }
  } else if (variant === 'Simples') {
    bgColor = '#F5F7FA'
    if (isHighlight) {
      borderColor = '#004185'
      borderWidth = '1.5px'
      shadow = '0 0 0 1px #004185'
    } else {
      borderColor = '#E2E6EB'
      borderWidth = '1px'
      shadow = 'none'
    }
  }

  const lines = [
    '  display: flex;',
    '  flex-direction: column;',
    `  gap: ${metrics.gap}px;`,
    `  padding: ${metrics.padding};`,
    `  border-radius: ${metrics.radius}px;`,
    `  background-color: ${bgColor};`,
  ]

  if (borderWidth !== '0px') {
    lines.push(`  border: ${borderWidth} solid ${borderColor};`)
  }
  if (shadow !== 'none') {
    lines.push(`  box-shadow: ${shadow};`)
  }
  lines.push('  transition: all 0.2s ease;')

  const cardBlock = `.card {\n${lines.join('\n')}\n}`

  const headerBlock = `\n\n.card__header {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}`

  let iconBlock = ''
  if (icon === 'Com ícone') {
    iconBlock = `\n\n.card__icon {\n  font-size: ${metrics.iconSize}px;\n  width: ${metrics.iconSize}px;\n  height: ${metrics.iconSize}px;\n  color: #004185;\n  flex-shrink: 0;\n}`
  }

  const titleBlock = `\n\n.card__title {\n  font-family: 'Open Sans', sans-serif;\n  font-weight: 700;\n  font-size: ${metrics.titleFontSize}px;\n  line-height: ${metrics.titleLineHeight};\n  color: #141414;\n  margin: 0;\n}`

  const bodyBlock = `\n\n.card__body {\n  font-family: 'Open Sans', sans-serif;\n  font-weight: 400;\n  font-size: ${metrics.contentFontSize}px;\n  line-height: ${metrics.contentLineHeight};\n  color: #525252;\n  margin: 0;\n}`

  let footerBlock = ''
  if (footer === 'Com ações') {
    footerBlock = `\n\n.card__footer {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 10px;\n  margin-top: 4px;\n  padding-top: 12px;\n  border-top: 1px solid #F0F2F5;\n}`
  }

  return `${comment}\n${cardBlock}${headerBlock}${iconBlock}${titleBlock}${bodyBlock}${footerBlock}`
}

/* ==========================================================================
   TOOLTIP COMPONENT TYPES & DEFINITIONS (Tooltip)
   ========================================================================== */

export type TooltipPlacement = 'Topo' | 'Base' | 'Esquerda' | 'Direita'
export type TooltipVariant = 'Escura' | 'Clara'
export type TooltipSize = 'Large' | 'Medium' | 'Small'
export type TooltipState = 'Default' | 'Hover'

export interface TooltipConfig {
  variant: TooltipVariant
  placement: TooltipPlacement
  size: TooltipSize
  state: TooltipState
  text: string
  triggerLabel: string
}

export interface TooltipSizeMetrics {
  padding: string
  fontSize: number
  lineHeight: number
  radius: number
  arrowSize: number
  maxWidth: number
}

export const TOOLTIP_SIZE_METRICS: Record<TooltipSize, TooltipSizeMetrics> = {
  Large: {
    padding: '10px 14px',
    fontSize: 14,
    lineHeight: 1.4,
    radius: 8,
    arrowSize: 6,
    maxWidth: 280,
  },
  Medium: {
    padding: '8px 12px',
    fontSize: 13,
    lineHeight: 1.35,
    radius: 6,
    arrowSize: 5,
    maxWidth: 240,
  },
  Small: {
    padding: '6px 10px',
    fontSize: 12,
    lineHeight: 1.3,
    radius: 6,
    arrowSize: 4,
    maxWidth: 200,
  },
}

export function generateTooltipCss(config: TooltipConfig): string {
  const { variant, placement, size, state } = config
  const metrics = TOOLTIP_SIZE_METRICS[size] || TOOLTIP_SIZE_METRICS.Medium
  const comment = `/* Tooltip — Variant=${variant}, Placement=${placement}, Size=${size}, State=${state} */`

  const isDark = variant === 'Escura'
  const bgColor = isDark ? '#062446' : '#FFFFFF'
  const textColor = isDark ? '#FFFFFF' : '#141414'
  const borderColor = isDark ? '#113C68' : '#D5DCE5'
  const shadow = isDark
    ? '0 6px 16px -2px rgba(6, 36, 70, 0.45)'
    : '0 6px 16px -2px rgba(6, 36, 70, 0.12)'

  const lines = [
    '  position: absolute;',
    '  display: inline-flex;',
    '  align-items: center;',
    '  justify-content: center;',
    `  max-width: ${metrics.maxWidth}px;`,
    `  padding: ${metrics.padding};`,
    `  border-radius: ${metrics.radius}px;`,
    `  background-color: ${bgColor};`,
    `  color: ${textColor};`,
    `  border: 1px solid ${borderColor};`,
    `  box-shadow: ${shadow};`,
    "  font-family: 'Open Sans', sans-serif;",
    '  font-weight: 600;',
    `  font-size: ${metrics.fontSize}px;`,
    `  line-height: ${metrics.lineHeight};`,
    '  white-space: normal;',
    '  text-align: center;',
    '  z-index: 1000;',
    '  pointer-events: none;',
    '  user-select: none;',
    `  opacity: ${state === 'Hover' ? '1' : '0'};`,
    `  visibility: ${state === 'Hover' ? 'visible' : 'hidden'};`,
    '  transition: opacity 0.15s ease, transform 0.15s ease;',
  ]

  const tooltipBlock = `.tooltip {\n${lines.join('\n')}\n}`
  const arrowBlock = `\n\n.tooltip__arrow {\n  position: absolute;\n  width: ${metrics.arrowSize * 2}px;\n  height: ${metrics.arrowSize * 2}px;\n  background-color: ${bgColor};\n  border: 1px solid ${borderColor};\n  transform: rotate(45deg);\n}`

  return `${comment}\n${tooltipBlock}${arrowBlock}`
}

/* ==========================================================================
   TAG COMPONENT TYPES & DEFINITIONS (Tag)
   ========================================================================== */

export type TagVariant = 'Primary' | 'Secondary' | 'Success' | 'Warning' | 'Error' | 'Neutral'
export type TagSize = 'Large' | 'Medium' | 'Small'
export type TagState = 'Default' | 'Hover' | 'Disabled'
export type TagRemovableOption = 'Com remover' | 'Sem remover'

export interface TagConfig {
  variant: TagVariant
  size: TagSize
  state: TagState
  removable: TagRemovableOption
  text: string
}

export interface TagSizeMetrics {
  height: number
  fontSize: number
  paddingX: number
  paddingXRemovable: number
  gap: number
  radius: number
  closeSize: number
}

export const TAG_SIZE_METRICS: Record<TagSize, TagSizeMetrics> = {
  Large: {
    height: 32,
    fontSize: 13,
    paddingX: 12,
    paddingXRemovable: 8,
    gap: 6,
    radius: 6,
    closeSize: 16,
  },
  Medium: {
    height: 28,
    fontSize: 12,
    paddingX: 10,
    paddingXRemovable: 7,
    gap: 5,
    radius: 6,
    closeSize: 14,
  },
  Small: {
    height: 24,
    fontSize: 11,
    paddingX: 8,
    paddingXRemovable: 6,
    gap: 4,
    radius: 4,
    closeSize: 13,
  },
}

export interface TagColorTokens {
  bg: string
  border: string
  text: string
  hoverBg: string
  hoverBorder: string
  hoverText: string
  disabledBg: string
  disabledBorder: string
  disabledText: string
  closeColor: string
}

export const TAG_COLOR_TOKENS: Record<TagVariant, TagColorTokens> = {
  Primary: {
    bg: '#004185',
    border: 'transparent',
    text: '#FFFFFF',
    hoverBg: '#00346A',
    hoverBorder: 'transparent',
    hoverText: '#FFFFFF',
    disabledBg: '#8BB7E7',
    disabledBorder: 'transparent',
    disabledText: '#FFFFFF',
    closeColor: '#FFFFFF',
  },
  Secondary: {
    bg: 'transparent',
    border: '#004185',
    text: '#004185',
    hoverBg: 'rgba(0, 65, 133, 0.08)',
    hoverBorder: '#00346A',
    hoverText: '#00346A',
    disabledBg: 'transparent',
    disabledBorder: '#8BB7E7',
    disabledText: '#8BB7E7',
    closeColor: '#004185',
  },
  Success: {
    bg: '#E6FAED',
    border: '#9BECB8',
    text: '#047D2E',
    hoverBg: '#CDF6DB',
    hoverBorder: '#6AE394',
    hoverText: '#02531F',
    disabledBg: '#F0FBF4',
    disabledBorder: '#CDF6DB',
    disabledText: '#6AE394',
    closeColor: '#047D2E',
  },
  Warning: {
    bg: '#FEFAE6',
    border: '#F7E069',
    text: '#917A03',
    hoverBg: '#FDF3BA',
    hoverBorder: '#F2CB05',
    hoverText: '#615102',
    disabledBg: '#FEFDF5',
    disabledBorder: '#FCF5CD',
    disabledText: '#C2A204',
    closeColor: '#917A03',
  },
  Error: {
    bg: '#FFE5E5',
    border: '#FF9999',
    text: '#CC0000',
    hoverBg: '#FFCCCC',
    hoverBorder: '#FF6666',
    hoverText: '#990000',
    disabledBg: '#FFF2F2',
    disabledBorder: '#FFCCCC',
    disabledText: '#FF9999',
    closeColor: '#CC0000',
  },
  Neutral: {
    bg: '#F5F7FA',
    border: '#DCDCDC',
    text: '#3D3D3D',
    hoverBg: '#EBEBEB',
    hoverBorder: '#BFBFBF',
    hoverText: '#141414',
    disabledBg: '#FAFAFA',
    disabledBorder: '#EBEBEB',
    disabledText: '#A1A1A1',
    closeColor: '#525252',
  },
}

export function generateTagCss(config: TagConfig): string {
  const { variant, size, state, removable } = config
  const metrics = TAG_SIZE_METRICS[size] || TAG_SIZE_METRICS.Medium
  const tokens = TAG_COLOR_TOKENS[variant] || TAG_COLOR_TOKENS.Primary
  const removableStatus = removable === 'Com remover' ? 'Show' : 'Hide'
  const comment = `/* Tag — Variant=${variant}, Size=${size}, State=${state}, Removable=${removableStatus} */`

  let bgColor = tokens.bg
  let borderColor = tokens.border
  let textColor = tokens.text
  let cursor = 'default'

  if (state === 'Hover') {
    bgColor = tokens.hoverBg
    borderColor = tokens.hoverBorder
    textColor = tokens.hoverText
    cursor = 'pointer'
  } else if (state === 'Disabled') {
    bgColor = tokens.disabledBg
    borderColor = tokens.disabledBorder
    textColor = tokens.disabledText
    cursor = 'not-allowed'
  }

  const borderRule = borderColor === 'transparent' ? 'none' : `1px solid ${borderColor}`
  const padRight = removable === 'Com remover' ? metrics.paddingXRemovable : metrics.paddingX

  const lines = [
    '  display: inline-flex;',
    '  align-items: center;',
    '  justify-content: center;',
    `  height: ${metrics.height}px;`,
    `  padding: 0 ${padRight}px 0 ${metrics.paddingX}px;`,
    `  gap: ${metrics.gap}px;`,
    `  border-radius: ${metrics.radius}px;`,
    `  background-color: ${bgColor};`,
    `  border: ${borderRule};`,
    "  font-family: 'Open Sans', sans-serif;",
    '  font-weight: 600;',
    `  font-size: ${metrics.fontSize}px;`,
    `  color: ${textColor};`,
    `  cursor: ${cursor};`,
    '  user-select: none;',
    '  white-space: nowrap;',
    '  transition: all 0.15s ease;',
  ]

  const tagBlock = `.tag {\n${lines.join('\n')}\n}`

  let removeBlock = ''
  if (removable === 'Com remover') {
    removeBlock = `\n\n.tag__close-button {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: ${metrics.closeSize}px;\n  height: ${metrics.closeSize}px;\n  padding: 0;\n  margin-left: 2px;\n  background: transparent;\n  border: none;\n  color: ${tokens.closeColor};\n  border-radius: 50%;\n  cursor: ${state === 'Disabled' ? 'not-allowed' : 'pointer'};\n  transition: opacity 0.15s ease;\n}`
  }

  return `${comment}\n${tagBlock}${removeBlock}`
}

/* ==========================================================================
   TOAST COMPONENT TYPES & DEFINITIONS (Toast)
   ========================================================================== */

export type ToastVariant = 'Info' | 'Success' | 'Warning' | 'Error' | 'Neutral'
export type ToastSize = 'Large' | 'Medium' | 'Small'
export type ToastState = 'Default' | 'Destaque'

export interface ToastConfig {
  variant: ToastVariant
  size: ToastSize
  state: ToastState
  title: string
  description: string
  actionLabel: string
}

export interface ToastSizeMetrics {
  padding: string
  radius: number
  gap: number
  iconSize: number
  titleFontSize: number
  titleLineHeight: number
  descFontSize: number
  descLineHeight: number
  actionFontSize: number
  closeSize: number
}

export const TOAST_SIZE_METRICS: Record<ToastSize, ToastSizeMetrics> = {
  Large: {
    padding: '18px 22px',
    radius: 12,
    gap: 14,
    iconSize: 24,
    titleFontSize: 15,
    titleLineHeight: 1.35,
    descFontSize: 13,
    descLineHeight: 1.45,
    actionFontSize: 13,
    closeSize: 20,
  },
  Medium: {
    padding: '14px 18px',
    radius: 10,
    gap: 12,
    iconSize: 22,
    titleFontSize: 14,
    titleLineHeight: 1.35,
    descFontSize: 12,
    descLineHeight: 1.4,
    actionFontSize: 12,
    closeSize: 18,
  },
  Small: {
    padding: '12px 14px',
    radius: 8,
    gap: 10,
    iconSize: 20,
    titleFontSize: 13,
    titleLineHeight: 1.3,
    descFontSize: 11,
    descLineHeight: 1.35,
    actionFontSize: 11,
    closeSize: 16,
  },
}

export interface ToastColorTokens {
  bg: string
  border: string
  highlightBorder: string
  iconColor: string
  titleColor: string
  descColor: string
}

export const TOAST_COLOR_TOKENS: Record<ToastVariant, ToastColorTokens> = {
  Info: {
    bg: '#EBF3FC',
    border: '#B6D5F7',
    highlightBorder: '#004185',
    iconColor: '#004185',
    titleColor: '#002750',
    descColor: '#235F9D',
  },
  Success: {
    bg: '#E6FAED',
    border: '#9BECB8',
    highlightBorder: '#05A63E',
    iconColor: '#047D2E',
    titleColor: '#02531F',
    descColor: '#141414',
  },
  Warning: {
    bg: '#FEFAE6',
    border: '#F7E069',
    highlightBorder: '#C2A204',
    iconColor: '#917A03',
    titleColor: '#302901',
    descColor: '#615102',
  },
  Error: {
    bg: '#FFE5E5',
    border: '#FF9999',
    highlightBorder: '#CC0000',
    iconColor: '#CC0000',
    titleColor: '#660000',
    descColor: '#141414',
  },
  Neutral: {
    bg: '#FFFFFF',
    border: '#DCDCDC',
    highlightBorder: '#004185',
    iconColor: '#004185',
    titleColor: '#141414',
    descColor: '#525252',
  },
}

export function generateToastCss(config: ToastConfig): string {
  const { variant, size, state } = config
  const metrics = TOAST_SIZE_METRICS[size] || TOAST_SIZE_METRICS.Large
  const colors = TOAST_COLOR_TOKENS[variant] || TOAST_COLOR_TOKENS.Info
  const comment = `/* Toast — Variant=${variant}, Size=${size}, State=${state} */`

  const isHighlight = state === 'Destaque'
  const bgColor = colors.bg
  const borderColor = isHighlight ? colors.highlightBorder : colors.border
  const borderWidth = isHighlight ? '1.5px' : '1px'
  const shadow = isHighlight
    ? `0 12px 28px -6px rgba(6, 36, 70, 0.22), 0 0 0 1px ${colors.highlightBorder}`
    : '0 8px 24px -4px rgba(6, 36, 70, 0.16)'

  const lines = [
    '  display: flex;',
    '  align-items: flex-start;',
    `  gap: ${metrics.gap}px;`,
    `  padding: ${metrics.padding};`,
    `  border-radius: ${metrics.radius}px;`,
    `  background-color: ${bgColor};`,
    `  border: ${borderWidth} solid ${borderColor};`,
    `  box-shadow: ${shadow};`,
    '  width: 100%;',
    '  max-width: 440px;',
    '  transition: all 0.2s ease;',
  ]

  const toastBlock = `.toast {\n${lines.join('\n')}\n}`

  const iconBlock = `\n\n.toast__icon {\n  font-size: ${metrics.iconSize}px;\n  width: ${metrics.iconSize}px;\n  height: ${metrics.iconSize}px;\n  color: ${colors.iconColor};\n  flex-shrink: 0;\n  margin-top: 1px;\n}`

  const contentBlock = `\n\n.toast__content {\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n  flex: 1 1 0%;\n  min-width: 0;\n}`

  const titleBlock = `\n\n.toast__title {\n  font-family: 'Open Sans', sans-serif;\n  font-weight: 700;\n  font-size: ${metrics.titleFontSize}px;\n  line-height: ${metrics.titleLineHeight};\n  color: ${colors.titleColor};\n  margin: 0;\n}`

  const descBlock = `\n\n.toast__description {\n  font-family: 'Open Sans', sans-serif;\n  font-weight: 400;\n  font-size: ${metrics.descFontSize}px;\n  line-height: ${metrics.descLineHeight};\n  color: ${colors.descColor};\n  margin: 0;\n}`

  const actionsBlock = `\n\n.toast__actions {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex-shrink: 0;\n  margin-left: 4px;\n}`

  const linkBtnBlock = `\n\n.toast__action-button {\n  background: transparent;\n  border: none;\n  padding: 0;\n  margin: 0;\n  font-family: 'Open Sans', sans-serif;\n  font-weight: 700;\n  font-size: ${metrics.actionFontSize}px;\n  color: #004185;\n  cursor: pointer;\n  text-decoration: none;\n  outline: none;\n  transition: color 0.15s ease, opacity 0.15s ease;\n}\n\n.toast__action-button:hover {\n  color: #00346A;\n  text-decoration: underline;\n}\n\n.toast__action-button:active {\n  color: #002750;\n}`

  const closeBtnBlock = `\n\n.toast__close-button {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: ${metrics.closeSize}px;\n  height: ${metrics.closeSize}px;\n  background: transparent;\n  border: none;\n  padding: 0;\n  margin: 0;\n  color: #666666;\n  cursor: pointer;\n  border-radius: 4px;\n  transition: color 0.15s ease, background-color 0.15s ease;\n}\n\n.toast__close-button:hover {\n  color: #141414;\n  background-color: rgba(0, 0, 0, 0.06);\n}`

  return `${comment}\n${toastBlock}${iconBlock}${contentBlock}${titleBlock}${descBlock}${actionsBlock}${linkBtnBlock}${closeBtnBlock}`
}

// -----------------------------------------------------------------------------
// 10. RADIO BUTTON COMPONENT DEFINITION & CSS GENERATOR
// -----------------------------------------------------------------------------

export type RadioState = 'Default' | 'Hover' | 'Focado' | 'Disabled'
export type RadioSize = 'Large' | 'Medium' | 'Small'
export type RadioOrientation = 'Horizontal' | 'Vertical'

export interface RadioOption {
  id: string
  label: string
  description?: string
}

export interface RadioButtonConfig {
  state: RadioState
  size: RadioSize
  orientation: RadioOrientation
  groupTitle?: string
  options: RadioOption[]
  selectedId?: string
}

export interface RadioSizeMetrics {
  outerSize: number
  innerDotSize: number
  fontSize: number
  descFontSize: number
  labelGap: number
  groupGap: number
  borderWidth: number
}

export const RADIO_SIZE_METRICS: Record<RadioSize, RadioSizeMetrics> = {
  Large: {
    outerSize: 22,
    innerDotSize: 10,
    fontSize: 16,
    descFontSize: 13,
    labelGap: 10,
    groupGap: 18,
    borderWidth: 2,
  },
  Medium: {
    outerSize: 18,
    innerDotSize: 8,
    fontSize: 14,
    descFontSize: 12,
    labelGap: 8,
    groupGap: 14,
    borderWidth: 2,
  },
  Small: {
    outerSize: 16,
    innerDotSize: 6,
    fontSize: 12,
    descFontSize: 11,
    labelGap: 6,
    groupGap: 10,
    borderWidth: 1.5,
  },
}

export function generateRadioButtonCss(config: RadioButtonConfig): string {
  const { state, size, orientation, selectedId, options } = config
  const metrics = RADIO_SIZE_METRICS[size] || RADIO_SIZE_METRICS.Medium
  const isSelected = selectedId === (options[0]?.id || 'opt-1')

  const comment = `/* Radio Button — State=${state}, Size=${size}, Orientation=${orientation}, Checked=${isSelected ? 'true' : 'false'} */`

  // Base circle styles
  let borderColor = '#D5DCE5'
  let bgColor = '#FFFFFF'
  let dotColor = '#004185'
  let outlineRule = 'none'
  let cursor = 'pointer'
  let labelColor = '#141414'

  if (state === 'Hover') {
    borderColor = '#004185'
    bgColor = isSelected ? '#FFFFFF' : '#F5F7FA'
    labelColor = '#004185'
  } else if (state === 'Focado') {
    borderColor = '#004185'
    // Outline COMVEN: estritamente 1px em azul #004185
    outlineRule = '1px solid #004185'
    labelColor = '#004185'
  } else if (state === 'Disabled') {
    borderColor = '#E5E7EB'
    bgColor = '#F5F7FA'
    dotColor = '#9CA3AF'
    cursor = 'not-allowed'
    labelColor = '#9CA3AF'
    outlineRule = 'none'
  }

  if (isSelected && state !== 'Disabled') {
    borderColor = '#004185'
  }

  const groupLines = [
    '  display: flex;',
    `  flex-direction: ${orientation === 'Horizontal' ? 'row' : 'column'};`,
    `  gap: ${metrics.groupGap}px;`,
    `  align-items: ${orientation === 'Horizontal' ? 'center' : 'flex-start'};`,
  ]

  const itemLines = [
    '  display: inline-flex;',
    '  align-items: flex-start;',
    `  gap: ${metrics.labelGap}px;`,
    `  cursor: ${cursor};`,
    '  user-select: none;',
  ]

  const circleLines = [
    `  width: ${metrics.outerSize}px;`,
    `  height: ${metrics.outerSize}px;`,
    '  border-radius: 50%;',
    `  border: ${metrics.borderWidth}px solid ${borderColor};`,
    `  background-color: ${bgColor};`,
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  flex-shrink: 0;',
    '  transition: all 0.15s ease;',
  ]

  if (outlineRule !== 'none') {
    circleLines.push(`  outline: ${outlineRule};`, '  outline-offset: 2px;')
  }

  const dotLines = [
    `  width: ${metrics.innerDotSize}px;`,
    `  height: ${metrics.innerDotSize}px;`,
    '  border-radius: 50%;',
    `  background-color: ${dotColor};`,
    `  transform: ${isSelected ? 'scale(1)' : 'scale(0)'};`,
    '  transition: transform 0.15s ease;',
  ]

  const labelLines = [
    "  font-family: 'Open Sans', sans-serif;",
    '  font-weight: 600;',
    `  font-size: ${metrics.fontSize}px;`,
    '  line-height: 1.4;',
    `  color: ${labelColor};`,
  ]

  return `${comment}
.comven-radio-group {
${groupLines.join('\n')}
}

.comven-radio-item {
${itemLines.join('\n')}
}

.comven-radio-circle {
${circleLines.join('\n')}
}

.comven-radio-dot {
${dotLines.join('\n')}
}

.comven-radio-label {
${labelLines.join('\n')}
}`
}

// -----------------------------------------------------------------------------
// 11. CHECKBOX COMPONENT DEFINITION & CSS GENERATOR
// -----------------------------------------------------------------------------

export type CheckboxState = 'Default' | 'Hover' | 'Focado' | 'Disabled'
export type CheckboxSize = 'Large' | 'Medium' | 'Small'
export type CheckboxOrientation = 'Horizontal' | 'Vertical'
export type CheckboxCheckState = 'unchecked' | 'checked' | 'indeterminate'

export interface CheckboxOption {
  id: string
  label: string
  description?: string
  checkedState: CheckboxCheckState
}

export interface CheckboxConfig {
  state: CheckboxState
  size: CheckboxSize
  orientation: CheckboxOrientation
  groupTitle?: string
  options: CheckboxOption[]
}

export interface CheckboxSizeMetrics {
  boxSize: number
  iconSize: number
  fontSize: number
  descFontSize: number
  labelGap: number
  groupGap: number
  borderRadius: number
  borderWidth: number
}

export const CHECKBOX_SIZE_METRICS: Record<CheckboxSize, CheckboxSizeMetrics> = {
  Large: {
    boxSize: 22,
    iconSize: 15,
    fontSize: 16,
    descFontSize: 13,
    labelGap: 10,
    groupGap: 18,
    borderRadius: 5,
    borderWidth: 2,
  },
  Medium: {
    boxSize: 18,
    iconSize: 13,
    fontSize: 14,
    descFontSize: 12,
    labelGap: 8,
    groupGap: 14,
    borderRadius: 4,
    borderWidth: 2,
  },
  Small: {
    boxSize: 16,
    iconSize: 11,
    fontSize: 12,
    descFontSize: 11,
    labelGap: 6,
    groupGap: 10,
    borderRadius: 3,
    borderWidth: 1.5,
  },
}

export function generateCheckboxCss(config: CheckboxConfig): string {
  const { state, size, orientation, options } = config
  const metrics = CHECKBOX_SIZE_METRICS[size] || CHECKBOX_SIZE_METRICS.Medium
  const anyChecked = options.some((o) => o.checkedState === 'checked')
  const anyIndeterminate = options.some((o) => o.checkedState === 'indeterminate')

  const comment = `/* Checkbox — State=${state}, Size=${size}, Orientation=${orientation}, HasChecked=${anyChecked}, HasIndeterminate=${anyIndeterminate} */`

  let borderColor = '#D5DCE5'
  let bgColor = '#FFFFFF'
  let iconColor = '#FFFFFF'
  let outlineRule = 'none'
  let cursor = 'pointer'
  let labelColor = '#141414'

  if (state === 'Hover') {
    borderColor = '#004185'
    bgColor = anyChecked || anyIndeterminate ? '#00336A' : '#F5F7FA'
    labelColor = '#004185'
  } else if (state === 'Focado') {
    borderColor = '#004185'
    // Outline COMVEN: estritamente 1px em azul #004185
    outlineRule = '1px solid #004185'
    labelColor = '#004185'
  } else if (state === 'Disabled') {
    borderColor = '#E5E7EB'
    bgColor = '#F5F7FA'
    iconColor = '#9CA3AF'
    cursor = 'not-allowed'
    labelColor = '#9CA3AF'
    outlineRule = 'none'
  }

  const groupLines = [
    '  display: flex;',
    `  flex-direction: ${orientation === 'Horizontal' ? 'row' : 'column'};`,
    `  gap: ${metrics.groupGap}px;`,
    `  align-items: ${orientation === 'Horizontal' ? 'center' : 'flex-start'};`,
  ]

  const itemLines = [
    '  display: inline-flex;',
    '  align-items: flex-start;',
    `  gap: ${metrics.labelGap}px;`,
    `  cursor: ${cursor};`,
    '  user-select: none;',
  ]

  const boxLines = [
    `  width: ${metrics.boxSize}px;`,
    `  height: ${metrics.boxSize}px;`,
    `  border-radius: ${metrics.borderRadius}px;`,
    `  border: ${metrics.borderWidth}px solid ${borderColor};`,
    `  background-color: ${bgColor};`,
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  flex-shrink: 0;',
    '  transition: all 0.15s ease;',
  ]

  if (outlineRule !== 'none') {
    boxLines.push(`  outline: ${outlineRule};`, '  outline-offset: 2px;')
  }

  const labelLines = [
    "  font-family: 'Open Sans', sans-serif;",
    '  font-weight: 600;',
    `  font-size: ${metrics.fontSize}px;`,
    '  line-height: 1.4;',
    `  color: ${labelColor};`,
  ]

  return `${comment}
.comven-checkbox-group {
${groupLines.join('\n')}
}

.comven-checkbox-item {
${itemLines.join('\n')}
}

.comven-checkbox-box {
${boxLines.join('\n')}
}

.comven-checkbox-box--checked,
.comven-checkbox-box--indeterminate {
  background-color: #004185;
  border-color: #004185;
  color: ${iconColor};
}

.comven-checkbox-box--disabled {
  background-color: #F5F7FA;
  border-color: #E5E7EB;
  color: #9CA3AF;
  cursor: not-allowed;
}

.comven-checkbox-label {
${labelLines.join('\n')}
}`
}

// -----------------------------------------------------------------------------
// 12. ACCORDION COMPONENT DEFINITION & CSS GENERATOR
// -----------------------------------------------------------------------------

export type AccordionVariant = 'Default' | 'Separado' | 'Subtil'
export type AccordionSize = 'Large' | 'Medium' | 'Small'
export type AccordionState = 'Default' | 'Hover' | 'Focado' | 'Disabled'
export type AccordionMode = 'Single' | 'Multiple'

export interface AccordionItemData {
  id: string
  title: string
  content: string
  disabled?: boolean
}

export interface AccordionConfig {
  variant: AccordionVariant
  size: AccordionSize
  state: AccordionState
  mode: AccordionMode
  items: AccordionItemData[]
  expandedIds: string[]
}

export interface AccordionSizeMetrics {
  headerPaddingY: number
  headerPaddingX: number
  titleFontSize: number
  contentFontSize: number
  iconSize: number
  borderRadius: number
  gap: number
}

export const ACCORDION_SIZE_METRICS: Record<AccordionSize, AccordionSizeMetrics> = {
  Large: {
    headerPaddingY: 18,
    headerPaddingX: 20,
    titleFontSize: 16,
    contentFontSize: 14,
    iconSize: 20,
    borderRadius: 12,
    gap: 12,
  },
  Medium: {
    headerPaddingY: 14,
    headerPaddingX: 16,
    titleFontSize: 14,
    contentFontSize: 13,
    iconSize: 18,
    borderRadius: 10,
    gap: 10,
  },
  Small: {
    headerPaddingY: 10,
    headerPaddingX: 14,
    titleFontSize: 13,
    contentFontSize: 12,
    iconSize: 16,
    borderRadius: 8,
    gap: 8,
  },
}

export function generateAccordionCss(config: AccordionConfig): string {
  const { variant, size, state, mode, expandedIds } = config
  const metrics = ACCORDION_SIZE_METRICS[size] || ACCORDION_SIZE_METRICS.Medium

  const comment = `/* Accordion — Variant=${variant}, Size=${size}, State=${state}, Mode=${mode}, Expanded=${expandedIds.length} items */`

  let borderColor = '#E2E6EB'
  let headerBg = '#FFFFFF'
  let titleColor = '#141414'
  let iconColor = '#004185'
  let outlineRule = 'none'
  let cursor = 'pointer'

  if (state === 'Hover') {
    borderColor = '#004185'
    headerBg = '#F8FAFC'
    titleColor = '#004185'
  } else if (state === 'Focado') {
    borderColor = '#004185'
    // Outline COMVEN: estritamente 1px em azul #004185
    outlineRule = '1px solid #004185'
    titleColor = '#004185'
  } else if (state === 'Disabled') {
    borderColor = '#E5E7EB'
    headerBg = '#F5F7FA'
    titleColor = '#9CA3AF'
    iconColor = '#9CA3AF'
    cursor = 'not-allowed'
  }

  const containerLines = [
    '  width: 100%;',
    '  display: flex;',
    '  flex-direction: column;',
    variant === 'Separado' ? `  gap: ${metrics.gap}px;` : '  gap: 0;',
    variant === 'Separado'
      ? '  border: none;'
      : `  border: 1px solid ${borderColor}; border-radius: ${metrics.borderRadius}px; overflow: hidden;`,
  ]

  const itemLines = [
    '  width: 100%;',
    variant === 'Separado'
      ? `  border: 1px solid ${borderColor}; border-radius: ${metrics.borderRadius}px; overflow: hidden;`
      : '  border-bottom: 1px solid #E2E6EB;',
    '  transition: all 0.2s ease;',
  ]

  const headerLines = [
    '  width: 100%;',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: space-between;',
    `  padding: ${metrics.headerPaddingY}px ${metrics.headerPaddingX}px;`,
    `  background-color: ${headerBg};`,
    `  cursor: ${cursor};`,
    '  user-select: none;',
    '  transition: background-color 0.15s ease, color 0.15s ease;',
  ]

  if (outlineRule !== 'none') {
    headerLines.push(`  outline: ${outlineRule};`, '  outline-offset: -1px;')
  }

  const titleLines = [
    "  font-family: 'Open Sans', sans-serif;",
    '  font-weight: 600;',
    `  font-size: ${metrics.titleFontSize}px;`,
    `  color: ${titleColor};`,
  ]

  const contentLines = [
    `  padding: ${metrics.headerPaddingY}px ${metrics.headerPaddingX}px;`,
    '  background-color: #FAFCFE;',
    "  font-family: 'Open Sans', sans-serif;",
    `  font-size: ${metrics.contentFontSize}px;`,
    '  line-height: 1.6;',
    '  color: #4A5568;',
    '  border-top: 1px solid #F0F4F8;',
  ]

  return `${comment}
.comven-accordion {
${containerLines.join('\n')}
}

.comven-accordion-item {
${itemLines.join('\n')}
}

.comven-accordion-header {
${headerLines.join('\n')}
}

.comven-accordion-title {
${titleLines.join('\n')}
}

.comven-accordion-icon {
  width: ${metrics.iconSize}px;
  height: ${metrics.iconSize}px;
  color: ${iconColor};
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.comven-accordion-icon--open {
  transform: rotate(180deg);
}

.comven-accordion-content {
${contentLines.join('\n')}
}`
}

/* ========================================================================= */
/* MODAL COMPONENT TYPES & STYLES                                           */
/* ========================================================================= */

export type ModalVariant = 'Completo' | 'Sem rodapé' | 'Simples'
export type ModalSize = 'Large' | 'Medium' | 'Small'
export type ModalState = 'Default' | 'Hover'
export type ModalIconOption = 'Com ícone' | 'Sem ícone'

export interface ModalMetrics {
  maxWidth: number
  padding: string
  titleFontSize: number
  titleLineHeight: string
  titleIconSize: number
  bodyFontSize: number
  bodyLineHeight: string
  buttonFontSize: number
  buttonPadding: string
  closeButtonSize: number
  closeIconSize: number
  borderRadius: number
}

export const MODAL_SIZE_METRICS: Record<ModalSize, ModalMetrics> = {
  Large: {
    maxWidth: 640,
    padding: '28px 32px',
    titleFontSize: 20,
    titleLineHeight: '1.3',
    titleIconSize: 24,
    bodyFontSize: 15,
    bodyLineHeight: '1.6',
    buttonFontSize: 14,
    buttonPadding: '10px 20px',
    closeButtonSize: 36,
    closeIconSize: 20,
    borderRadius: 20,
  },
  Medium: {
    maxWidth: 520,
    padding: '24px 28px',
    titleFontSize: 18,
    titleLineHeight: '1.35',
    titleIconSize: 22,
    bodyFontSize: 14,
    bodyLineHeight: '1.55',
    buttonFontSize: 13,
    buttonPadding: '8px 16px',
    closeButtonSize: 32,
    closeIconSize: 18,
    borderRadius: 16,
  },
  Small: {
    maxWidth: 420,
    padding: '20px 24px',
    titleFontSize: 16,
    titleLineHeight: '1.4',
    titleIconSize: 20,
    bodyFontSize: 13,
    bodyLineHeight: '1.5',
    buttonFontSize: 12,
    buttonPadding: '6px 14px',
    closeButtonSize: 28,
    closeIconSize: 16,
    borderRadius: 14,
  },
}

export interface ModalConfig {
  variant: ModalVariant
  size: ModalSize
  state: ModalState
  icon?: ModalIconOption
  title: string
  content: string
  cancelLabel: string
  confirmLabel: string
}

export function generateModalCss(config: ModalConfig): string {
  const { variant, size, state, icon = 'Com ícone' } = config
  const metrics = MODAL_SIZE_METRICS[size] || MODAL_SIZE_METRICS.Medium

  const isHover = state === 'Hover'
  const primaryBtnBg = isHover ? '#00346A' : '#004185'
  const closeBtnBg = isHover ? '#F0F2F5' : 'transparent'

  const comment = `/* COMVEN Modal — Variante=${variant}, Tamanho=${size}, Estado=${state}, Ícone=${icon} */`

  const overlayLines = [
    '  position: fixed;',
    '  inset: 0;',
    '  background-color: rgba(6, 36, 70, 0.65);',
    '  backdrop-filter: blur(4px);',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  padding: 16px;',
    '  z-index: 1000;',
    '  animation: comvenModalFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);',
  ]

  const dialogLines = [
    '  width: 100%;',
    `  max-width: ${metrics.maxWidth}px;`,
    '  background-color: #FFFFFF;',
    `  border-radius: ${metrics.borderRadius}px;`,
    '  border: 1px solid #EBEBEB;',
    '  box-shadow: 0 24px 48px -12px rgba(6, 36, 70, 0.28), 0 12px 24px -8px rgba(6, 36, 70, 0.16);',
    '  overflow: hidden;',
    '  display: flex;',
    '  flex-direction: column;',
    '  animation: comvenModalScaleUp 0.22s cubic-bezier(0.16, 1, 0.3, 1);',
  ]

  const isSimple = variant === 'Simples'
  const isComplete = variant === 'Completo'

  const headerLines = [
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: space-between;',
    '  padding: ' +
      (isSimple
        ? '16px ' + metrics.padding.split(' ')[1] + ' 8px;'
        : metrics.padding.split(' ')[0] + ' ' + metrics.padding.split(' ')[1] + ' 16px;'),
    ...(isSimple ? [] : ['  border-bottom: 1px solid #F0F2F5;']),
  ]

  const titleGroupLines = ['  display: flex;', '  align-items: center;', '  gap: 10px;']

  const titleIconLines = [
    '  display: inline-flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  color: #004185;',
    `  font-size: ${metrics.titleIconSize}px;`,
    '  line-height: 1;',
    '  flex-shrink: 0;',
  ]

  const titleLines = [
    "  font-family: 'Open Sans', sans-serif;",
    '  font-weight: 700;',
    `  font-size: ${metrics.titleFontSize}px;`,
    `  line-height: ${metrics.titleLineHeight};`,
    '  color: #141414;',
    '  margin: 0;',
  ]

  const bodyLines = [
    `  padding: ${isSimple ? '4px ' + metrics.padding.split(' ')[1] + ' 24px' : '20px ' + metrics.padding.split(' ')[1]};`,
    "  font-family: 'Open Sans', sans-serif;",
    '  font-weight: 400;',
    `  font-size: ${metrics.bodyFontSize}px;`,
    `  line-height: ${metrics.bodyLineHeight};`,
    '  color: #525252;',
  ]

  const footerLines = [
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: flex-end;',
    '  gap: 12px;',
    '  padding: 16px ' + metrics.padding.split(' ')[1] + ' ' + metrics.padding.split(' ')[0] + ';',
    '  border-top: 1px solid #F0F2F5;',
    '  background-color: #FAFCFE;',
  ]

  const primaryButtonLines = [
    "  font-family: 'Open Sans', sans-serif;",
    '  font-weight: 700;',
    `  font-size: ${metrics.buttonFontSize}px;`,
    `  padding: ${metrics.buttonPadding};`,
    '  border-radius: 8px;',
    '  border: none;',
    `  background-color: ${primaryBtnBg};`,
    '  color: #FFFFFF;',
    '  cursor: pointer;',
    '  transition: background-color 0.15s ease, box-shadow 0.15s ease;',
  ]

  const secondaryButtonLines = [
    "  font-family: 'Open Sans', sans-serif;",
    '  font-weight: 700;',
    `  font-size: ${metrics.buttonFontSize}px;`,
    `  padding: ${metrics.buttonPadding};`,
    '  border-radius: 8px;',
    '  border: 1px solid #D5DCE5;',
    '  background-color: #FFFFFF;',
    '  color: #004185;',
    '  cursor: pointer;',
    '  transition: background-color 0.15s ease, border-color 0.15s ease;',
  ]

  const closeButtonLines = [
    `  width: ${metrics.closeButtonSize}px;`,
    `  height: ${metrics.closeButtonSize}px;`,
    '  border-radius: 8px;',
    '  border: none;',
    `  background-color: ${closeBtnBg};`,
    '  color: #666666;',
    '  display: inline-flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  cursor: pointer;',
    '  transition: background-color 0.15s ease, color 0.15s ease;',
    ...(isSimple ? ['  margin-left: auto;'] : []),
  ]

  const sections: string[] = [
    comment,
    `.comven-modal-overlay {\n${overlayLines.join('\n')}\n}`,
    `.comven-modal-dialog {\n${dialogLines.join('\n')}\n}`,
    `.comven-modal-header {\n${headerLines.join('\n')}\n}`,
  ]

  if (!isSimple) {
    sections.push(`.comven-modal-title-group {\n${titleGroupLines.join('\n')}\n}`)
  }

  if (icon === 'Com ícone') {
    sections.push(`.comven-modal-title-icon {\n${titleIconLines.join('\n')}\n}`)
  }

  if (!isSimple) {
    sections.push(`.comven-modal-title {\n${titleLines.join('\n')}\n}`)
  }

  // O botão de fechar está sempre presente em todas as variantes (Completo, Sem rodapé e Simples)
  sections.push(`.comven-modal-close {\n${closeButtonLines.join('\n')}\n}`)

  sections.push(`.comven-modal-body {\n${bodyLines.join('\n')}\n}`)

  if (isComplete) {
    sections.push(`.comven-modal-footer {\n${footerLines.join('\n')}\n}`)
    sections.push(`.comven-modal-btn-primary {\n${primaryButtonLines.join('\n')}\n}`)
    sections.push(`.comven-modal-btn-secondary {\n${secondaryButtonLines.join('\n')}\n}`)
  }

  sections.push(`@keyframes comvenModalFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}`)

  sections.push(`@keyframes comvenModalScaleUp {
  from { opacity: 0; transform: scale(0.96) translateY(8px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}`)

  return sections.join('\n\n')
}
