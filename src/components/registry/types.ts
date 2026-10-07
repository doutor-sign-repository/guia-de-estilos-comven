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
