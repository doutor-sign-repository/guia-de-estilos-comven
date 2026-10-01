import React from 'react'

export type ButtonType = 'Primary' | 'Secondary' | 'Tertiary' | 'Link'
export type ButtonSize = 'Large' | 'Medium' | 'Small'
export type ButtonState = 'Default' | 'Disabled'
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
      lines.push('  background-color: #A9BFDA;')
      lines.push('  cursor: not-allowed;')
      labelColor = '#FFFFFF'
    } else {
      lines.push('  background-color: #004185;')
      labelColor = '#FFFFFF'
    }
  } else if (type === 'Secondary') {
    if (state === 'Disabled') {
      lines.push('  background-color: transparent;')
      lines.push('  border: 1.5px solid #A9BFDA;')
      lines.push('  cursor: not-allowed;')
      labelColor = '#A9BFDA'
    } else {
      lines.push('  background-color: transparent;')
      lines.push('  border: 1.5px solid #004185;')
      labelColor = '#004185'
    }
  } else if (type === 'Tertiary') {
    if (state === 'Disabled') {
      lines.push('  background-color: transparent;')
      lines.push('  cursor: not-allowed;')
      labelColor = '#A9BFDA'
    } else {
      lines.push('  background-color: transparent;')
      labelColor = '#004185'
    }
  } else if (type === 'Link') {
    lines.push('  background-color: transparent;')
    lines.push('  border: none;')
    lines.push('  padding: 0;')
    lines.push('  text-decoration: none;')
    if (state === 'Disabled') {
      lines.push('  cursor: not-allowed;')
      labelColor = '#A9BFDA'
    } else {
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
    focusRing = '\n  box-shadow: 0 0 0 3px rgba(0, 65, 133, 0.15);'
  } else if (state === 'Error') {
    borderColor = '#E11D48'
    borderWidth = '1.5px'
    labelColor = '#E11D48'
    supportingColor = '#E11D48'
    iconColor = '#E11D48'
    focusRing = '\n  box-shadow: 0 0 0 3px rgba(225, 29, 72, 0.12);'
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
