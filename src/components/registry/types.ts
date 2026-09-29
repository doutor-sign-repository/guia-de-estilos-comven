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

  // Comment header
  const comment = `/* Type=${type}, Size=${size}, State=${state}, Icon=${icon === 'Com ícone' ? 'Show' : 'Hide'} */`

  // Padding based on size
  let padding = '12px 20px'
  if (size === 'Medium') padding = '10px 16px'
  if (size === 'Small') padding = '8px 12px'

  // Background and borders based on type and state
  let bgRule = 'background-color: #004185;'
  let borderRule = ''
  let stateRules = ''

  if (state === 'Disabled') {
    bgRule =
      type === 'Secondary' || type === 'Link'
        ? 'background-color: transparent;'
        : 'background-color: #666666;'
    stateRules = `\n  opacity: 0.4;\n  cursor: not-allowed;`
    if (type === 'Secondary') {
      borderRule = '\n  border: 2px solid #666666;'
    }
  } else {
    if (type === 'Primary') {
      bgRule = 'background-color: #004185;'
    } else if (type === 'Secondary') {
      bgRule = 'background-color: transparent;'
      borderRule = '\n  border: 2px solid #004185;'
    } else if (type === 'Tertiary') {
      bgRule = 'background-color: #E6FAED;'
    } else if (type === 'Link') {
      bgRule = 'background-color: transparent;'
      borderRule = '\n  text-decoration: underline;'
    }
  }

  // Label styling
  let fontSize = '16px'
  if (size === 'Medium') fontSize = '14px'
  if (size === 'Small') fontSize = '12px'

  const fontWeight = type === 'Tertiary' || type === 'Link' ? '600' : '700'

  let labelColor = '#FFFFFF'
  if (state === 'Disabled') {
    labelColor = type === 'Secondary' || type === 'Link' ? '#666666' : '#FFFFFF'
  } else {
    if (type === 'Primary') {
      labelColor = '#FFFFFF'
    } else {
      labelColor = '#004185'
    }
  }

  // Icon sizing
  let iconDim = '20px'
  if (size === 'Medium') iconDim = '18px'
  if (size === 'Small') iconDim = '16px'

  let iconBlock = ''
  if (icon === 'Com ícone') {
    iconBlock = `\n\n.button .icon {\n  width: ${iconDim};\n  height: ${iconDim};\n}`
  }

  return `${comment}
.button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: ${padding};
  border-radius: 8px;
  ${bgRule}${borderRule}${stateRules}
}

.button .label {
  font-family: 'Open Sans', sans-serif;
  font-weight: ${fontWeight};
  font-size: ${fontSize};
  color: ${labelColor};
}${iconBlock}`
}
