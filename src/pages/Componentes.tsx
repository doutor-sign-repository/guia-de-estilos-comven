import React from 'react'
import { useParams } from 'react-router-dom'
import { ButtonPlayground } from '@/components/registry/ButtonPlayground'
import { InputPlayground } from '@/components/registry/InputPlayground'
import { SelectPlayground } from '@/components/registry/SelectPlayground'
import { CheckboxPlayground } from '@/components/registry/CheckboxPlayground'
import { RadioButtonPlayground } from '@/components/registry/RadioButtonPlayground'
import { BadgePlayground } from '@/components/registry/BadgePlayground'
import { TagPlayground } from '@/components/registry/TagPlayground'
import { ToastPlayground } from '@/components/registry/ToastPlayground'
import { InfoCardPlayground } from '@/components/registry/InfoCardPlayground'
import { TooltipPlayground } from '@/components/registry/TooltipPlayground'
import { CardPlayground } from '@/components/registry/CardPlayground'
import { AccordionPlayground } from '@/components/registry/AccordionPlayground'

export default function Componentes() {
  const { componentId } = useParams<{ componentId?: string }>()

  // Normalize: defaults to 'button' when accessing /componentes directly
  let current:
    | 'button'
    | 'input'
    | 'select'
    | 'checkbox'
    | 'radio-button'
    | 'badge'
    | 'tag'
    | 'toast'
    | 'infocard'
    | 'tooltip'
    | 'card'
    | 'accordion' = 'button'

  if (componentId === 'input') current = 'input'
  else if (componentId === 'select') current = 'select'
  else if (componentId === 'checkbox' || componentId === 'check') current = 'checkbox'
  else if (componentId === 'radio-button' || componentId === 'radio') current = 'radio-button'
  else if (componentId === 'badge') current = 'badge'
  else if (componentId === 'tag') current = 'tag'
  else if (componentId === 'toast') current = 'toast'
  else if (componentId === 'infocard') current = 'infocard'
  else if (componentId === 'tooltip') current = 'tooltip'
  else if (componentId === 'card') current = 'card'
  else if (componentId === 'accordion') current = 'accordion'

  const titleMap = {
    button: 'Button',
    input: 'Input (Text Field)',
    select: 'Select (Dropdown)',
    checkbox: 'Checkbox (Caixa de Seleção)',
    'radio-button': 'Radio Button (Botão de Opção)',
    badge: 'Badge (Status & Alertas)',
    tag: 'Tag (Categorização)',
    toast: 'Toast (Notificação)',
    infocard: 'InfoCard (Ícone + Texto)',
    tooltip: 'Tooltip (Dica)',
    card: 'Card (Conteúdo)',
    accordion: 'Accordion (Acordeão)',
  }

  return (
    <div className="w-full">
      {/* Top Banner / Hero fluido com padding generoso e proporcional */}
      <section className="w-full bg-[#004185] text-white py-12 sm:py-14 lg:py-16 px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="w-full">
          {/* Badge / Pill */}
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#205898] text-[#E8F1FC] text-[11px] font-semibold tracking-[0.12em] uppercase mb-5 select-none shadow-sm">
            COMPONENTES
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] leading-[1.15] font-bold tracking-tight text-white mb-4">
            Componentes · {titleMap[current]}
          </h1>

          {/* Subtitle / Paragraph */}
          <p className="max-w-4xl text-sm sm:text-base lg:text-[17px] leading-relaxed text-[#D2E4F7] font-normal">
            Biblioteca de componentes reutilizáveis para os produtos digitais COMVEN. Interaja com o
            playground configurável para explorar tipos, tamanhos e estados dos componentes.
          </p>
        </div>
      </section>

      {/* Main Content fluido com padding proporcional */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 2xl:px-24 py-8 lg:py-10 space-y-8 pb-16">
        {current === 'button' && (
          <section id="button" className="w-full">
            <ButtonPlayground />
          </section>
        )}
        {current === 'input' && (
          <section id="input" className="w-full">
            <InputPlayground />
          </section>
        )}
        {current === 'select' && (
          <section id="select" className="w-full">
            <SelectPlayground />
          </section>
        )}
        {current === 'checkbox' && (
          <section id="checkbox" className="w-full">
            <CheckboxPlayground />
          </section>
        )}
        {current === 'radio-button' && (
          <section id="radio-button" className="w-full">
            <RadioButtonPlayground />
          </section>
        )}
        {current === 'badge' && (
          <section id="badge" className="w-full">
            <BadgePlayground />
          </section>
        )}
        {current === 'tag' && (
          <section id="tag" className="w-full">
            <TagPlayground />
          </section>
        )}
        {current === 'toast' && (
          <section id="toast" className="w-full">
            <ToastPlayground />
          </section>
        )}
        {current === 'infocard' && (
          <section id="infocard" className="w-full">
            <InfoCardPlayground />
          </section>
        )}
        {current === 'tooltip' && (
          <section id="tooltip" className="w-full">
            <TooltipPlayground />
          </section>
        )}
        {current === 'card' && (
          <section id="card" className="w-full">
            <CardPlayground />
          </section>
        )}
        {current === 'accordion' && (
          <section id="accordion" className="w-full">
            <AccordionPlayground />
          </section>
        )}
      </div>
    </div>
  )
}
