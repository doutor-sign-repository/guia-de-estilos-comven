import React from 'react'
import {
  ButtonConfig,
  InputConfig,
  SelectConfig,
  BadgeConfig,
  InfoCardConfig,
  CardConfig,
  TooltipConfig,
  TagConfig,
  ToastConfig,
  ComponentDefinition,
  generateButtonCss,
  generateInputCss,
  generateSelectCss,
  generateBadgeCss,
  generateInfoCardCss,
  generateCardCss,
  generateTooltipCss,
  generateTagCss,
  generateToastCss,
} from './types'
import { ButtonPlayground } from './ButtonPlayground'
import { InputPlayground } from './InputPlayground'
import { SelectPlayground } from './SelectPlayground'
import { BadgePlayground } from './BadgePlayground'
import { InfoCardPlayground } from './InfoCardPlayground'
import { CardPlayground } from './CardPlayground'
import { TooltipPlayground } from './TooltipPlayground'
import { TagPlayground } from './TagPlayground'
import { ToastPlayground } from './ToastPlayground'

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
  badge: {
    id: 'badge',
    name: 'Badge',
    number: '4',
    subtitle:
      '6 variantes × 4 tamanhos × 3 estados — explorando a escala de cores COMVEN, incluindo o amarelo de alerta',
    category: 'COMPONENTES',
    component: BadgePlayground,
  },
  infocard: {
    id: 'infocard',
    name: 'InfoCard',
    number: '5',
    subtitle:
      '5 variantes × 3 tamanhos × 2 estados — card informativo com ícone + título + texto descritivo',
    category: 'COMPONENTES',
    component: InfoCardPlayground,
  },
  card: {
    id: 'card',
    name: 'Card',
    number: '6',
    subtitle:
      '3 variantes × 3 tamanhos × 2 estados — card de conteúdo genérico com header, corpo e ações opcionais',
    category: 'COMPONENTES',
    component: CardPlayground,
  },
  tooltip: {
    id: 'tooltip',
    name: 'Tooltip',
    number: '7',
    subtitle:
      '4 posicionamentos × 2 temas × 3 tamanhos — balão de dica contextual acionado ao hover/foco do gatilho',
    category: 'COMPONENTES',
    component: TooltipPlayground,
  },
  tag: {
    id: 'tag',
    name: 'Tag',
    number: '8',
    subtitle:
      '6 variantes × 3 tamanhos × 3 estados — chip compacto para categorização com remoção opcional',
    category: 'COMPONENTES',
    component: TagPlayground,
  },
  toast: {
    id: 'toast',
    name: 'Toast',
    number: '9',
    subtitle:
      '5 variantes × 3 tamanhos × 2 estados — notificação flutuante com botão de ação estilo Link e fechar',
    category: 'COMPONENTES',
    component: ToastPlayground,
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

export const BADGE_DEFINITION: ComponentDefinition<BadgeConfig> = {
  id: 'badge',
  name: 'Badge',
  number: '04',
  category: 'COMPONENTES',
  subtitle:
    '6 variantes × 4 tamanhos × 3 estados — explorando a escala de cores COMVEN, incluindo o amarelo de alerta',
  description:
    'Pílula compacta de status, contadores e alertas, explorando a paleta COMVEN com o amarelo #F2CB05 para alertas e badges.',
  figmaUrl:
    'https://www.figma.com/proto/YEMa9j7O8aNm5PVmS8eSlC/Guia-de-Estilos?node-id=34-1734&viewport=-759%2C471%2C0.32&t=wAmAkj8XxXp7cOHD-1&scaling=contain&content-scaling=responsive&page-id=18%3A2',
  defaultConfig: {
    variant: 'Primary',
    size: 'Large',
    state: 'Default',
    icon: 'Com ícone',
    text: 'Novo',
  },
  generateCss: generateBadgeCss,
  renderPreview: (config) => {
    return React.createElement(BadgePlayground, { initialConfig: config })
  },
}

export const INFOCARD_DEFINITION: ComponentDefinition<InfoCardConfig> = {
  id: 'infocard',
  name: 'InfoCard',
  number: '05',
  category: 'COMPONENTES',
  subtitle:
    '5 variantes × 3 tamanhos × 2 estados — card informativo com ícone + título + texto descritivo',
  description:
    'Card de destaque para informações de contexto, dicas operacionais, confirmações de sucesso e alertas, explorando a escala oficial de cores COMVEN com o amarelo #F2CB05 em alertas.',
  figmaUrl:
    'https://www.figma.com/proto/YEMa9j7O8aNm5PVmS8eSlC/Guia-de-Estilos?node-id=34-1734&viewport=-759%2C471%2C0.32&t=wAmAkj8XxXp7cOHD-1&scaling=contain&content-scaling=responsive&page-id=18%3A2',
  defaultConfig: {
    variant: 'Warning',
    size: 'Large',
    state: 'Default',
    icon: 'Com ícone',
    title: 'Diretriz de uso do amarelo (#F2CB05)',
    description:
      'O amarelo COMVEN é permitido em alertas, badges e destaques pontuais. Nunca o utilize como cor principal de uma interface.',
  },
  generateCss: generateInfoCardCss,
  renderPreview: (config) => {
    return React.createElement(InfoCardPlayground, { initialConfig: config })
  },
}

export const CARD_DEFINITION: ComponentDefinition<CardConfig> = {
  id: 'card',
  name: 'Card',
  number: '06',
  category: 'COMPONENTES',
  subtitle:
    '3 variantes × 3 tamanhos × 2 estados — card de conteúdo genérico com header, corpo e ações opcionais',
  description:
    'Container de conteúdo genérico com suporte a header (título opcional + ícone opcional), corpo textual e footer opcional com ações em botão.',
  figmaUrl:
    'https://www.figma.com/proto/YEMa9j7O8aNm5PVmS8eSlC/Guia-de-Estilos?node-id=34-1734&viewport=-759%2C471%2C0.32&t=wAmAkj8XxXp7cOHD-1&scaling=contain&content-scaling=responsive&page-id=18%3A2',
  defaultConfig: {
    variant: 'Elevada',
    size: 'Large',
    state: 'Default',
    icon: 'Com ícone',
    footer: 'Com ações',
    title: 'Visão Geral da Operação',
    content:
      'Consolidação dos pedidos expedidos, rotas em andamento e indicadores de entrega em tempo real para a rede COMVEN.',
  },
  generateCss: generateCardCss,
  renderPreview: (config) => {
    return React.createElement(CardPlayground, { initialConfig: config })
  },
}

export const TOOLTIP_DEFINITION: ComponentDefinition<TooltipConfig> = {
  id: 'tooltip',
  name: 'Tooltip',
  number: '07',
  category: 'COMPONENTES',
  subtitle:
    '4 posicionamentos × 2 temas × 3 tamanhos — balão de dica contextual acionado ao hover/foco do gatilho',
  description:
    'Balão de dica apresentacional ancorado ao elemento de gatilho, disponível em 4 direções e nos temas Escuro e Claro.',
  figmaUrl:
    'https://www.figma.com/proto/YEMa9j7O8aNm5PVmS8eSlC/Guia-de-Estilos?node-id=34-1734&viewport=-759%2C471%2C0.32&t=wAmAkj8XxXp7cOHD-1&scaling=contain&content-scaling=responsive&page-id=18%3A2',
  defaultConfig: {
    variant: 'Escura',
    placement: 'Topo',
    size: 'Medium',
    state: 'Hover',
    text: 'Dica rápida de apoio ao operador',
    triggerLabel: 'Passe o mouse',
  },
  generateCss: generateTooltipCss,
  renderPreview: (config) => {
    return React.createElement(TooltipPlayground, { initialConfig: config })
  },
}

export const TAG_DEFINITION: ComponentDefinition<TagConfig> = {
  id: 'tag',
  name: 'Tag',
  number: '08',
  category: 'COMPONENTES',
  subtitle:
    '6 variantes × 3 tamanhos × 3 estados — chip compacto para categorização com remoção opcional',
  description:
    'Chip/etiqueta de categorização e taxonomia, explorando a paleta COMVEN com estados interativos e botão de remoção opcional.',
  figmaUrl:
    'https://www.figma.com/proto/YEMa9j7O8aNm5PVmS8eSlC/Guia-de-Estilos?node-id=34-1734&viewport=-759%2C471%2C0.32&t=wAmAkj8XxXp7cOHD-1&scaling=contain&content-scaling=responsive&page-id=18%3A2',
  defaultConfig: {
    variant: 'Primary',
    size: 'Medium',
    state: 'Default',
    removable: 'Com remover',
    text: 'Categoria',
  },
  generateCss: generateTagCss,
  renderPreview: (config) => {
    return React.createElement(TagPlayground, { initialConfig: config })
  },
}

export const TOAST_DEFINITION: ComponentDefinition<ToastConfig> = {
  id: 'toast',
  name: 'Toast',
  number: '09',
  category: 'COMPONENTES',
  subtitle:
    '5 variantes × 3 tamanhos × 2 estados — notificação flutuante com botão de ação estilo Link e fechar',
  description:
    'Notificação flutuante interativa com ícone, título, descrição, botão de ação estilo Link (#004185 sem fundo/borda) e botão de fechar.',
  figmaUrl:
    'https://www.figma.com/proto/YEMa9j7O8aNm5PVmS8eSlC/Guia-de-Estilos?node-id=34-1734&viewport=-759%2C471%2C0.32&t=wAmAkj8XxXp7cOHD-1&scaling=contain&content-scaling=responsive&page-id=18%3A2',
  defaultConfig: {
    variant: 'Success',
    size: 'Large',
    state: 'Default',
    title: 'Proposta comercial atualizada',
    description: 'As alterações de preço e tabela foram sincronizadas com sucesso.',
    actionLabel: 'Desfazer',
  },
  generateCss: generateToastCss,
  renderPreview: (config) => {
    return React.createElement(ToastPlayground, { initialConfig: config })
  },
}

export {
  ButtonPlayground,
  InputPlayground,
  SelectPlayground,
  BadgePlayground,
  InfoCardPlayground,
  CardPlayground,
  TooltipPlayground,
  TagPlayground,
  ToastPlayground,
}
export { PlaygroundControlGroup } from './PlaygroundControlGroup'
