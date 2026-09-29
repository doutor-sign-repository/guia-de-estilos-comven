import React from 'react'
import { Link } from 'react-router-dom'
import { ComvenLogo } from '@/components/ComvenLogo'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#F5F7FA] text-[#141414]">
      <div className="bg-white p-8 sm:p-12 rounded-2xl border border-[#EBEBEB] shadow-sm max-w-md w-full text-center space-y-6">
        <ComvenLogo variant="light" showTagline={false} scale={0.8} />

        <div className="space-y-2">
          <span className="text-4xl font-bold text-[#004185]">404</span>
          <h1 className="text-xl font-bold text-[#141414]">Página não encontrada</h1>
          <p className="text-sm text-[#666666]">
            O recurso ou seção do Guia de Estilos solicitada não existe ou foi movida.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#004185] text-white text-sm font-bold hover:bg-[#00346A] transition-colors"
        >
          <span className="material-symbols-rounded" style={{ fontSize: '18px' }}>
            arrow_back
          </span>
          <span>Voltar ao Guia de Estilos</span>
        </Link>
      </div>
    </div>
  )
}
