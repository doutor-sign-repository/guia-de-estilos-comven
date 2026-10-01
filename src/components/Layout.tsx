import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { ComvenLogo } from './ComvenLogo'

interface NavItem {
  id: string
  label: string
  number?: string
  group: 'guia' | 'componentes'
}

const NAV_ITEMS: NavItem[] = [
  { id: 'logotipo', label: 'Logotipo', number: '1', group: 'guia' },
  { id: 'cores', label: 'Cores', number: '2', group: 'guia' },
  { id: 'tipografia', label: 'Tipografia', number: '3', group: 'guia' },
  { id: 'iconografia', label: 'Iconografia', number: '4', group: 'guia' },
  { id: 'area-de-protecao', label: 'Área de proteção', number: '5', group: 'guia' },
  { id: 'aplicacoes-incorretas', label: 'Aplicações incorretas', number: '6', group: 'guia' },
  { id: 'button', label: 'Button', number: '1', group: 'componentes' },
]

export default function Layout() {
  const [activeSection, setActiveSection] = useState<string>('logotipo')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Sync with Hash & IntersectionObserver
  useEffect(() => {
    // If hash on load, navigate
    const hash = window.location.hash.replace('#', '')
    if (hash) {
      setActiveSection(hash)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            if (id) {
              setActiveSection(id)
              // Update hash smoothly without jumping
              history.replaceState(null, '', `#${id}`)
            }
          }
        })
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      },
    )

    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean)
    sections.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    setActiveSection(id)
    setMobileMenuOpen(false)
    history.pushState(null, '', `#${id}`)
    const element = document.getElementById(id)
    if (element) {
      const topOffset = 30
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - topOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  const guiaItems = NAV_ITEMS.filter((i) => i.group === 'guia')
  const componentesItems = NAV_ITEMS.filter((i) => i.group === 'componentes')

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F5F7FA]">
      {/* Mobile Top Header */}
      <header className="lg:hidden sticky top-0 z-40 bg-[#141414] text-white px-4 py-3 flex items-center justify-between border-b border-[#292929] shadow-md">
        <div className="flex items-center gap-3">
          <ComvenLogo variant="dark-colorida" showTagline={false} width={110} />
          <div className="h-4 w-px bg-[#3D3D3D]" />
          <span className="text-xs font-semibold text-[#848484] uppercase tracking-wider">
            Design System
          </span>
        </div>{' '}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 text-white hover:text-[#9DC6F3] rounded focus:outline-none"
          aria-label="Abrir menu"
        >
          <span className="material-symbols-rounded" style={{ fontSize: '26px' }}>
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </header>

      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation (Fixed on Desktop, Drawer on Mobile) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-[#141414] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out border-r border-[#292929] shadow-xl ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Brand Section */}
        <div className="p-6 pb-2">
          <div className="flex items-center justify-between">
            {/* Official COMVEN Logo for Dark Background with Tagline */}
            <div className="flex flex-col items-start text-left w-full max-w-[210px]">
              <ComvenLogo variant="dark-colorida" showTagline={true} width={190} />
            </div>

            {/* Mobile close button inside drawer */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-1.5 text-[#848484] hover:text-white rounded-lg hover:bg-[#292929] transition-colors"
            >
              <span className="material-symbols-rounded" style={{ fontSize: '20px' }}>
                close
              </span>
            </button>
          </div>

          <div className="flex items-center justify-between mt-3 text-[11px] text-[#848484] font-medium">
            <span>Design System v1.0</span>
            <span className="px-1.5 py-0.5 rounded bg-[#292929] text-[10px] text-[#9DC6F3] font-mono">
              Figma 34:1734
            </span>
          </div>

          <div className="h-px bg-[#292929] my-4" />

          {/* Navigation Links Scrollable Area */}
          <nav className="space-y-6 overflow-y-auto max-h-[calc(100vh-230px)] pr-1">
            {/* Group 1: GUIA DE ESTILOS */}
            <div>
              <div className="flex items-center justify-between px-3 mb-2.5">
                <span className="text-[11px] font-bold tracking-widest text-[#848484] uppercase">
                  GUIA DE ESTILOS
                </span>
                <span className="text-[10px] text-[#666666] font-mono">6</span>
              </div>
              <ul className="space-y-1">
                {guiaItems.map((item) => {
                  const isActive = activeSection === item.id
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left px-3 py-2.5 text-sm font-medium rounded-lg flex items-center justify-between transition-all duration-150 relative group ${
                          isActive
                            ? 'text-white bg-[#004185] font-semibold shadow-sm'
                            : 'text-[#BFBFBF] hover:text-white hover:bg-[#222222]'
                        }`}
                      >
                        {/* Rounded light blue bar indicator on active item */}
                        {isActive && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#9DC6F3] rounded-r-full shadow-sm" />
                        )}
                        <div className="flex items-center gap-2.5 truncate">
                          <span
                            className={`w-5 h-5 rounded flex items-center justify-center text-[11px] font-bold ${
                              isActive
                                ? 'bg-white/20 text-white'
                                : 'bg-[#292929] text-[#848484] group-hover:text-white'
                            }`}
                          >
                            {item.number}
                          </span>
                          <span className="truncate">{item.label}</span>
                        </div>
                        {isActive && (
                          <span
                            className="material-symbols-rounded text-xs text-[#9DC6F3]"
                            style={{ fontSize: '14px' }}
                          >
                            arrow_right
                          </span>
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Group 2: COMPONENTES */}
            <div>
              <div className="flex items-center justify-between px-3 mb-2.5">
                <span className="text-[11px] font-bold tracking-widest text-[#848484] uppercase">
                  COMPONENTES
                </span>
                <span className="text-[10px] text-[#666666] font-mono">1</span>
              </div>
              <ul className="space-y-1">
                {componentesItems.map((item) => {
                  const isActive = activeSection === item.id
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left px-3 py-2.5 text-sm font-medium rounded-lg flex items-center justify-between transition-all duration-150 relative group ${
                          isActive
                            ? 'text-white bg-[#004185] font-semibold shadow-sm'
                            : 'text-[#BFBFBF] hover:text-white hover:bg-[#222222]'
                        }`}
                      >
                        {isActive && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#9DC6F3] rounded-r-full shadow-sm" />
                        )}
                        <div className="flex items-center gap-2.5 truncate">
                          <span
                            className={`w-5 h-5 rounded flex items-center justify-center text-[11px] font-bold ${
                              isActive
                                ? 'bg-white/20 text-white'
                                : 'bg-[#292929] text-[#848484] group-hover:text-white'
                            }`}
                          >
                            {item.number}
                          </span>
                          <span className="truncate">{item.label}</span>
                        </div>
                        {isActive && (
                          <span
                            className="material-symbols-rounded text-xs text-[#9DC6F3]"
                            style={{ fontSize: '14px' }}
                          >
                            arrow_right
                          </span>
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-5 border-t border-[#292929] bg-[#141414] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white font-semibold">COMVEN</span>
            <span className="text-[10px] text-[#848484]">v1.0 Oficial</span>
          </div>
          <div className="text-[10px] text-[#666666] leading-tight">
            Comunicação de venda em tempo real. Todos os direitos reservados © 2026.
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-[280px] flex flex-col min-h-screen">
        <main className="flex-1 w-full max-w-[1200px] mx-auto p-4 sm:p-6 lg:p-10">
          <Outlet />
        </main>

        {/* Global Footer */}
        <footer className="w-full border-t border-[#EBEBEB] bg-white py-6 px-6 text-xs text-[#666666]">
          <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ComvenLogo variant="light-1cor" showTagline={false} width={100} />
              <div className="h-4 w-px bg-gray-200 hidden sm:block" />
              <span>COMVEN © 2026 — Design System v1.0 · Ago/2026</span>
            </div>
            <span className="text-[#848484]">Referência oficial de marca para uso interno</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
