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
