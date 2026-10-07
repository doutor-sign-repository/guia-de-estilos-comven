import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { ButtonPlayground } from '@/components/registry/ButtonPlayground'
import { InputPlayground } from '@/components/registry/InputPlayground'
import { SelectPlayground } from '@/components/registry/SelectPlayground'
import { BadgePlayground } from '@/components/registry/BadgePlayground'

export default function Componentes() {
  const { componentId } = useParams<{ componentId?: string }>()

  // Normalize: defaults to 'button' when accessing /componentes directly
  let current: 'button' | 'input' | 'select' | 'badge' = 'button'
  if (componentId === 'input') current = 'input'
  else if (componentId === 'select') current = 'select'
  else if (componentId === 'badge') current = 'badge'

  const titleMap = {
    button: 'Button',
    input: 'Input (Text Field)',
    select: 'Select (Dropdown)',
    badge: 'Badge (Status & Alertas)',
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

          {/* Component Tabs for quick switching inside the page */}
          <div className="mt-8 flex items-center gap-2 flex-wrap">
            <Link
              to="/componentes/button"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                current === 'button'
                  ? 'bg-white text-[#004185] shadow-sm'
                  : 'bg-[#00346A] text-white/90 hover:bg-[#002D5C] hover:text-white'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                  current === 'button' ? 'bg-[#004185] text-white' : 'bg-white/20 text-white'
                }`}
              >
                1
              </span>
              <span>Button</span>
            </Link>

            <Link
              to="/componentes/input"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                current === 'input'
                  ? 'bg-white text-[#004185] shadow-sm'
                  : 'bg-[#00346A] text-white/90 hover:bg-[#002D5C] hover:text-white'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                  current === 'input' ? 'bg-[#004185] text-white' : 'bg-white/20 text-white'
                }`}
              >
                2
              </span>
              <span>Input</span>
            </Link>

            <Link
              to="/componentes/select"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                current === 'select'
                  ? 'bg-white text-[#004185] shadow-sm'
                  : 'bg-[#00346A] text-white/90 hover:bg-[#002D5C] hover:text-white'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                  current === 'select' ? 'bg-[#004185] text-white' : 'bg-white/20 text-white'
                }`}
              >
                3
              </span>
              <span>Select</span>
            </Link>

            <Link
              to="/componentes/badge"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                current === 'badge'
                  ? 'bg-white text-[#004185] shadow-sm'
                  : 'bg-[#00346A] text-white/90 hover:bg-[#002D5C] hover:text-white'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                  current === 'badge' ? 'bg-[#004185] text-white' : 'bg-white/20 text-white'
                }`}
              >
                4
              </span>
              <span>Badge</span>
            </Link>
          </div>
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
        {current === 'badge' && (
          <section id="badge" className="w-full">
            <BadgePlayground />
          </section>
        )}
      </div>
    </div>
  )
}
