import React from 'react'

export interface PlaygroundControlGroupProps {
  label: string
  children: React.ReactNode
  className?: string
}

/**
 * Componente padronizado para grupos de controles de playground COMVEN.
 *
 * REGRA FIXA DE LAYOUT:
 * Cada grupo é um bloco indivisível (`inline-flex flex-col shrink-0`).
 * No container pai (`flex flex-wrap items-start gap-x-8 gap-y-5`), todos os grupos
 * ficam em uma única linha horizontal quando couberem; se a janela encolher,
 * o grupo INTEIRO que não couber quebra para a próxima linha, sem quebrar
 * as opções no meio nem fragmentar a leitura.
 */
export const PlaygroundControlGroup: React.FC<PlaygroundControlGroupProps> = ({
  label,
  children,
  className = '',
}) => {
  return (
    <div className={`inline-flex flex-col shrink-0 ${className}`}>
      <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-1.5 select-none">
        {label}
      </span>
      <div className="inline-flex items-center gap-1.5 flex-nowrap">{children}</div>
    </div>
  )
}
