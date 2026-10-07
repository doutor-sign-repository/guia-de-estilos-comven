import React from 'react'
import {
  ButtonConfig,
  InputConfig,
  SelectConfig,
  CheckboxConfig,
  RadioButtonConfig,
  BadgeConfig,
  TagConfig,
  ToastConfig,
  InfoCardConfig,
  TooltipConfig,
  CardConfig,
  AccordionConfig,
  ComponentDefinition,
  generateButtonCss,
  generateInputCss,
  generateSelectCss,
  generateCheckboxCss,
  generateRadioButtonCss,
  generateBadgeCss,
  generateTagCss,
  generateToastCss,
  generateInfoCardCss,
  generateTooltipCss,
  generateCardCss,
  generateAccordionCss,
  ModalVariant,
  ModalSize,
  ModalState,
  ModalConfig,
  generateModalCss,
} from './types'
import { ButtonPlayground } from './ButtonPlayground'
import { InputPlayground } from './InputPlayground'
import { SelectPlayground } from './SelectPlayground'
import { CheckboxPlayground } from './CheckboxPlayground'
import { RadioButtonPlayground } from './RadioButtonPlayground'
import { BadgePlayground } from './BadgePlayground'
import { TagPlayground } from './TagPlayground'
import { ToastPlayground } from './ToastPlayground'
import { InfoCardPlayground } from './InfoCardPlayground'
import { TooltipPlayground } from './TooltipPlayground'
import { CardPlayground } from './CardPlayground'
import { AccordionPlayground } from './AccordionPlayground'
import { ModalPlayground } from './ModalPlayground'

export interface ComponentRegistryItem {
  id: string
  name: string
  number?: string
  subtitle: string
  category: 'COMPONENTES'
  component: React.ComponentType
}

/**
 * Scalable Components Registry
 * Reorganized by design system domain hierarchy:
 * Formulários e Seleção (Button, Input, Select, Checkbox, Radio Button)
 * Feedback e Status (Badge, Tag, Toast, InfoCard)
 * Overlays e Estrutura de Conteúdo (Tooltip, Card, Accordion, Modal)
 */
export const COMPONENTS_REGISTRY: Record<string, ComponentRegistryItem> = {
  // --- Formulários & Seleção ---
  button: {
    id: 'button',
    name: 'Button',
    subtitle:
      '4 tipos × 3 tamanhos × 4 estados — com ícone e texto configuráveis via painel de propriedades',
    category: 'COMPONENTES',
    component: ButtonPlayground,
  },
  input: {
    id: 'input',
    name: 'Input',
    subtitle:
      '4 estados × 4 tamanhos — com ícone de busca, ícone auxiliar, label e supporting text configuráveis',
    category: 'COMPONENTES',
    component: InputPlayground,
  },
  select: {
    id: 'select',
    name: 'Select',
    subtitle:
      '5 estados × 4 tamanhos — com label, seta dropdown expansível e supporting text configuráveis',
    category: 'COMPONENTES',
    component: SelectPlayground,
  },
  checkbox: {
    id: 'checkbox',
    name: 'Checkbox',
    subtitle:
      '4 estados × 3 tamanhos × 2 orientações — múltipla seleção com estado indeterminado e foco COMVEN (1px)',
    category: 'COMPONENTES',
    component: CheckboxPlayground,
  },
  'radio-button': {
    id: 'radio-button',
    name: 'Radio Button',
    subtitle:
      '4 estados × 3 tamanhos × 2 orientações — seleção exclusiva com foco acessível COMVEN #004185 (1px)',
    category: 'COMPONENTES',
    component: RadioButtonPlayground,
  },

  // --- Feedback & Status ---
  badge: {
    id: 'badge',
    name: 'Badge',
    subtitle:
      '6 variantes × 4 tamanhos × 3 estados — explorando a escala de cores COMVEN, incluindo o amarelo de alerta',
    category: 'COMPONENTES',
    component: BadgePlayground,
  },
  tag: {
    id: 'tag',
    name: 'Tag',
    subtitle:
      '6 variantes × 3 tamanhos × 3 estados — chip compacto para categorização com remoção opcional',
    category: 'COMPONENTES',
    component: TagPlayground,
  },
  toast: {
    id: 'toast',
    name: 'Toast',
    subtitle:
      '5 variantes × 3 tamanhos × 2 estados — notificação flutuante com botão de ação estilo Link e fechar',
    category: 'COMPONENTES',
    component: ToastPlayground,
  },
  infocard: {
    id: 'infocard',
    name: 'InfoCard',
    subtitle:
      '5 variantes × 3 tamanhos × 2 estados — card informativo com ícone + título + texto descritivo',
    category: 'COMPONENTES',
    component: InfoCardPlayground,
  },

  // --- Overlays & Estrutura ---
  tooltip: {
    id: 'tooltip',
    name: 'Tooltip',
    subtitle:
      '4 posicionamentos × 2 temas × 3 tamanhos — balão de dica contextual acionado ao hover/foco do gatilho',
    category: 'COMPONENTES',
    component: TooltipPlayground,
  },
  card: {
    id: 'card',
    name: 'Card',
    subtitle:
      '3 variantes × 3 tamanhos × 2 estados — card de conteúdo genérico com header, corpo e ações opcionais',
    category: 'COMPONENTES',
    component: CardPlayground,
  },
  accordion: {
    id: 'accordion',
    name: 'Accordion',
    subtitle:
      '3 variantes × 3 tamanhos × 4 estados × 2 modos — seções colapsáveis com animação de rotação e foco COMVEN',
    category: 'COMPONENTES',
    component: AccordionPlayground,
  },
  modal: {
    id: 'modal',
    name: 'Modal',
    subtitle:
      '3 variantes × 3 tamanhos × 2 estados — overlay escuro com diálogo centralizado, header com fechar × e rodapé com ações',
    category: 'COMPONENTES',
    component: ModalPlayground,
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

export const CHECKBOX_DEFINITION: ComponentDefinition<CheckboxConfig> = {
  id: 'checkbox',
  name: 'Checkbox',
  number: '04',
  category: 'COMPONENTES',
  subtitle:
    '4 estados × 3 tamanhos × 2 orientações — múltipla seleção com estado indeterminado e foco COMVEN (1px)',
  description:
    'Caixa de seleção múltipla para formulários, filtros e listas nos produtos digitais COMVEN, com suporte a estado indeterminado e anel de foco de 1px em #004185.',
  figmaUrl:
    'https://www.figma.com/proto/YEMa9j7O8aNm5PVmS8eSlC/Guia-de-Estilos?node-id=34-1734&viewport=-759%2C471%2C0.32&t=wAmAkj8XxXp7cOHD-1&scaling=contain&content-scaling=responsive&page-id=18%3A2',
  defaultConfig: {
    state: 'Default',
    size: 'Medium',
    orientation: 'Vertical',
    groupTitle: 'Preferências de comunicação COMVEN',
    options: [
      {
        id: 'chk-1',
        label: 'Notificações por e-mail',
        description: 'Receba alertas diários e resumo da operação',
        checkedState: 'checked',
      },
      {
        id: 'chk-2',
        label: 'Alertas via SMS e WhatsApp',
        description: 'Avisos imediatos sobre pedidos prioritários',
        checkedState: 'indeterminate',
      },
      {
        id: 'chk-3',
        label: 'Relatório semanal consolidado',
        description: 'Exportação automática em PDF e planilha',
        checkedState: 'unchecked',
      },
    ],
  },
  generateCss: generateCheckboxCss,
  renderPreview: (config) => {
    return React.createElement(CheckboxPlayground, { initialConfig: config })
  },
}

export const RADIO_BUTTON_DEFINITION: ComponentDefinition<RadioButtonConfig> = {
  id: 'radio-button',
  name: 'Radio Button',
  number: '05',
  category: 'COMPONENTES',
  subtitle:
    '4 estados × 3 tamanhos × 2 orientações — seleção exclusiva com foco acessível COMVEN #004185 (1px)',
  description:
    'Botão de opção para seleção exclusiva em formulários, filtros e questionários nos produtos digitais COMVEN, com anel de foco de 1px em #004185.',
  figmaUrl:
    'https://www.figma.com/proto/YEMa9j7O8aNm5PVmS8eSlC/Guia-de-Estilos?node-id=34-1734&viewport=-759%2C471%2C0.32&t=wAmAkj8XxXp7cOHD-1&scaling=contain&content-scaling=responsive&page-id=18%3A2',
  defaultConfig: {
    state: 'Default',
    size: 'Medium',
    orientation: 'Vertical',
    groupTitle: 'Selecione o plano desejado',
    options: [
      {
        id: 'opt-1',
        label: 'Opção 1 — COMVEN Standard',
        description: 'Plano padrão com suporte regular',
      },
      {
        id: 'opt-2',
        label: 'Opção 2 — Plano Empresarial',
        description: 'Acesso multiusuário e relatórios',
      },
      { id: 'opt-3', label: 'Opção 3 — Linha Premium', description: 'Atendimento dedicado 24/7' },
    ],
    selectedId: 'opt-1',
  },
  generateCss: generateRadioButtonCss,
  renderPreview: (config) => {
    return React.createElement(RadioButtonPlayground, { initialConfig: config })
  },
}

export const BADGE_DEFINITION: ComponentDefinition<BadgeConfig> = {
  id: 'badge',
  name: 'Badge',
  number: '06',
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

export const TAG_DEFINITION: ComponentDefinition<TagConfig> = {
  id: 'tag',
  name: 'Tag',
  number: '07',
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
  number: '08',
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

export const INFOCARD_DEFINITION: ComponentDefinition<InfoCardConfig> = {
  id: 'infocard',
  name: 'InfoCard',
  number: '09',
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

export const TOOLTIP_DEFINITION: ComponentDefinition<TooltipConfig> = {
  id: 'tooltip',
  name: 'Tooltip',
  number: '10',
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

export const CARD_DEFINITION: ComponentDefinition<CardConfig> = {
  id: 'card',
  name: 'Card',
  number: '11',
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

export const ACCORDION_DEFINITION: ComponentDefinition<AccordionConfig> = {
  id: 'accordion',
  name: 'Accordion',
  number: '12',
  category: 'COMPONENTES',
  subtitle:
    '3 variantes × 3 tamanhos × 4 estados × 2 modos — seções colapsáveis com animação de rotação e foco COMVEN',
  description:
    'Componente de seções retráteis/expansíveis para perguntas frequentes, configurações e organização de conteúdo complexo nos produtos digitais COMVEN.',
  figmaUrl:
    'https://www.figma.com/proto/YEMa9j7O8aNm5PVmS8eSlC/Guia-de-Estilos?node-id=34-1734&viewport=-759%2C471%2C0.32&t=wAmAkj8XxXp7cOHD-1&scaling=contain&content-scaling=responsive&page-id=18%3A2',
  defaultConfig: {
    variant: 'Default',
    size: 'Medium',
    state: 'Default',
    mode: 'Single',
    items: [
      {
        id: 'acc-1',
        title: 'Como funciona o faturamento integrado COMVEN?',
        content:
          'O faturamento integrado consolida pedidos expedidos, notas fiscais eletrônicas e conciliação bancária automaticamente no fim de cada ciclo financeiro.',
      },
      {
        id: 'acc-2',
        title: 'Quais são as políticas de entrega e prazos operacionais?',
        content:
          'As remessas rodoviárias atendem prazos de 24h a 72h úteis para capitais e polos regionais, com rastreamento contínuo por telemetria e notificações automáticas.',
      },
      {
        id: 'acc-3',
        title: 'Requisitos de segurança e controle de acessos da rede',
        content:
          'Todos os acessos administrativos exigem autenticação de dois fatores (2FA), registro completo de auditoria por perfil e isolamento rigoroso por operadora parceira.',
      },
    ],
    expandedIds: ['acc-1'],
  },
  generateCss: generateAccordionCss,
  renderPreview: (config) => {
    return React.createElement(AccordionPlayground, { initialConfig: config })
  },
}

export const MODAL_DEFINITION: ComponentDefinition<ModalConfig> = {
  id: 'modal',
  name: 'Modal',
  category: 'COMPONENTES',
  subtitle:
    '3 variantes × 3 tamanhos × 2 estados — overlay escuro com diálogo centralizado, header com fechar × e rodapé com ações',
  description:
    'Janela sobreposta com bloqueio de interface (overlay) para confirmações críticas, formulários modais e avisos imperativos nos produtos digitais COMVEN.',
  figmaUrl:
    'https://www.figma.com/proto/YEMa9j7O8aNm5PVmS8eSlC/Guia-de-Estilos?node-id=34-1734&viewport=-759%2C471%2C0.32&t=wAmAkj8XxXp7cOHD-1&scaling=contain&content-scaling=responsive&page-id=18%3A2',
  defaultConfig: {
    variant: 'Completo',
    size: 'Medium',
    state: 'Default',
    title: 'Confirmar Atualização de Tabela',
    content:
      'Deseja realmente aplicar as alterações tarifárias para toda a rede COMVEN? Esta ação sincronizará as tabelas de frete em tempo real e não poderá ser desfeita.',
    cancelLabel: 'Cancelar',
    confirmLabel: 'Confirmar',
  },
  generateCss: generateModalCss,
  renderPreview: (config) => {
    return React.createElement(ModalPlayground, { initialConfig: config })
  },
}

export {
  ButtonPlayground,
  InputPlayground,
  SelectPlayground,
  CheckboxPlayground,
  RadioButtonPlayground,
  BadgePlayground,
  TagPlayground,
  ToastPlayground,
  InfoCardPlayground,
  TooltipPlayground,
  CardPlayground,
  AccordionPlayground,
  ModalPlayground,
}
export type { ModalVariant, ModalSize, ModalState, ModalConfig }
export { PlaygroundControlGroup } from './PlaygroundControlGroup'
