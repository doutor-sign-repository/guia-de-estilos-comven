import React from 'react'
import { ButtonConfig, ComponentDefinition, generateButtonCss } from './types'
import { ButtonPlayground } from './ButtonPlayground'

export interface ComponentRegistryItem {
  id: string
  name: string
  number: string
  subtitle: string
  category: 'COMPONENTES'
  component: React.ComponentType
}

/**
 * Scalable Components Registry
 * Easily register future components like 'Input', 'Card', 'Badge', etc.
 */
export const COMPONENTS_REGISTRY: Record<string, ComponentRegistryItem> = {
  button: {
    id: 'button',
    name: 'Button',
    number: '1',
    subtitle:
      '4 tipos × 3 tamanhos × 2 estados — com ícone e texto configuráveis via painel de propriedades',
    category: 'COMPONENTES',
    component: ButtonPlayground,
  },
}

export const BUTTON_DEFINITION: ComponentDefinition<ButtonConfig> = {
  id: 'button',
  name: 'Button',
  number: '01',
  category: 'COMPONENTES',
  subtitle:
    '4 tipos × 3 tamanhos × 2 estados — com ícone e texto configuráveis via painel de propriedades',
  description:
    'Botão padrão para ações primárias, secundárias e links nos produtos digitais COMVEN.',
  figmaUrl: 'https://www.figma.com',
  defaultConfig: {
    type: 'Primary',
    size: 'Large',
    state: 'Default',
    icon: 'Com ícone',
    label: 'Buscar',
  },
  generateCss: generateButtonCss,
  renderPreview: (config) => {
    return React.createElement(ButtonPlayground, { initialConfig: config })
  },
}
