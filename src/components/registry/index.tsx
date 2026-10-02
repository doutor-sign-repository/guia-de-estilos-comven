import React from 'react'
import {
  ButtonConfig,
  InputConfig,
  SelectConfig,
  ComponentDefinition,
  generateButtonCss,
  generateInputCss,
  generateSelectCss,
} from './types'
import { ButtonPlayground } from './ButtonPlayground'
import { InputPlayground } from './InputPlayground'
import { SelectPlayground } from './SelectPlayground'

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
      '4 tipos × 3 tamanhos × 4 estados — com ícone e texto configuráveis via painel de propriedades',
    category: 'COMPONENTES',
    component: ButtonPlayground,
  },
  input: {
    id: 'input',
    name: 'Input',
    number: '2',
    subtitle:
      '4 estados × 4 tamanhos — com ícone de busca, ícone auxiliar, label e supporting text configuráveis',
    category: 'COMPONENTES',
    component: InputPlayground,
  },
  select: {
    id: 'select',
    name: 'Select',
    number: '3',
    subtitle:
      '5 estados × 4 tamanhos — com label, seta dropdown expansível e supporting text configuráveis',
    category: 'COMPONENTES',
    component: SelectPlayground,
  },
}

export const BUTTON_DEFINITION: ComponentDefinition<ButtonConfig> = {
  id: 'button',
  name: 'Button',
  number: '01',
  category: 'COMPONENTES',
  subtitle:
    '4 tipos × 3 tamanhos × 4 estados — com ícone e texto configuráveis via painel de propriedades',
  description:
    'Botão padrão para ações primárias, secundárias e links nos produtos digitais COMVEN.',
  figmaUrl:
    'https://www.figma.com/proto/YEMa9j7O8aNm5PVmS8eSlC/Guia-de-Estilos?node-id=34-1734&viewport=-759%2C471%2C0.32&t=wAmAkj8XxXp7cOHD-1&scaling=contain&content-scaling=responsive&page-id=18%3A2',
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

export const INPUT_DEFINITION: ComponentDefinition<InputConfig> = {
  id: 'input',
  name: 'Input',
  number: '02',
  category: 'COMPONENTES',
  subtitle:
    '4 estados × 4 tamanhos — com ícone de busca, ícone auxiliar, label e supporting text configuráveis',
  description:
    'Campo de entrada de texto padrão para formulários, filtros e buscas nos produtos digitais COMVEN.',
  figmaUrl:
    'https://www.figma.com/proto/YEMa9j7O8aNm5PVmS8eSlC/Guia-de-Estilos?node-id=34-1734&viewport=-759%2C471%2C0.32&t=wAmAkj8XxXp7cOHD-1&scaling=contain&content-scaling=responsive&page-id=18%3A2',
  defaultConfig: {
    state: 'Default',
    size: 'Large',
    leftIcon: 'Com ícone',
    rightIcon: 'Com ícone',
    label: 'Label',
    placeholder: 'Input',
    supportingText: 'Supporting text',
  },
  generateCss: generateInputCss,
  renderPreview: (config) => {
    return React.createElement(InputPlayground, { initialConfig: config })
  },
}

export const SELECT_DEFINITION: ComponentDefinition<SelectConfig> = {
  id: 'select',
  name: 'Select',
  number: '03',
  category: 'COMPONENTES',
  subtitle:
    '5 estados × 4 tamanhos — com label, seta dropdown expansível e supporting text configuráveis',
  description:
    'Componente dropdown de seleção de opções para formulários, filtros e seletores nos produtos digitais COMVEN.',
  figmaUrl:
    'https://www.figma.com/proto/YEMa9j7O8aNm5PVmS8eSlC/Guia-de-Estilos?node-id=34-1734&viewport=-759%2C471%2C0.32&t=wAmAkj8XxXp7cOHD-1&scaling=contain&content-scaling=responsive&page-id=18%3A2',
  defaultConfig: {
    state: 'Default',
    size: 'Large',
    label: 'Label',
    placeholder: 'Input',
    supportingText: 'Supporting text',
  },
  generateCss: generateSelectCss,
  renderPreview: (config) => {
    return React.createElement(SelectPlayground, { initialConfig: config })
  },
}

export { ButtonPlayground, InputPlayground, SelectPlayground }
export { PlaygroundControlGroup } from './PlaygroundControlGroup'
