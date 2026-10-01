import React from 'react'
import { ButtonPlayground } from '@/components/registry/ButtonPlayground'

export default function Componentes() {
  return (
    <div className="w-full">
      {/* Top Banner / Hero matching Guia de Estilos style */}
      <section className="w-full bg-[#004185] text-white py-12 sm:py-14 lg:py-16 px-6 sm:px-10 lg:px-14">
        <div className="max-w-[1200px] mx-auto">
          {/* Badge / Pill */}
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#205898] text-[#E8F1FC] text-[11px] font-semibold tracking-[0.12em] uppercase mb-5 select-none shadow-sm">
            COMPONENTES
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] leading-[1.15] font-bold tracking-tight text-white mb-4">
            Componentes · Button
          </h1>

          {/* Subtitle / Paragraph */}
          <p className="max-w-3xl text-sm sm:text-base lg:text-[17px] leading-relaxed text-[#D2E4F7] font-normal">
            Biblioteca de componentes reutilizáveis para os produtos digitais COMVEN. Explore a
            matriz completa de variantes e interaja com o playground configurável.
          </p>
        </div>
      </section>

      {/* Main Content with box cards */}
      <div className="max-w-[1200px] mx-auto p-4 sm:p-6 lg:p-10 space-y-8 pb-16">
        <section id="button">
          <ButtonPlayground />
        </section>
      </div>
    </div>
  )
}
