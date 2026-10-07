import React, { useState, useEffect } from 'react'
import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom'
import { ComvenLogo } from './ComvenLogo'

interface GuiaNavItem {
  id: string
  label: string
  number: string
}

const GUIA_ITEMS: GuiaNavItem[] = [
  { id: 'logotipo', label: 'Logotipo', number: '1' },
  { id: 'cores', label: 'Cores', number: '2' },
  { id: 'tipografia', label: 'Tipografia', number: '3' },
  { id: 'iconografia', label: 'Iconografia', number: '4' },
  { id: 'area-de-protecao', label: 'Área de proteção', number: '5' },
  { id: 'aplicacoes-incorretas', label: 'Aplicações incorretas', number: '6' },
]

export default function Layout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState<string>('logotipo')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isGuiaPage = location.pathname === '/'
  const isComponentesPage = location.pathname.startsWith('/componentes')

  // Smooth scroll helper
  const scrollToTargetElement = (id: string) => {
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

  // Handle clicking a Guia item
  const handleGuiaItemClick = (id: string) => {
    setMobileMenuOpen(false)
    if (!isGuiaPage) {
      // If we are on another page, navigate to home with hash
      navigate(`/#${id}`)
      // Short delay to allow route change before scrolling
      setTimeout(() => {
        scrollToTargetElement(id)
        setActiveSection(id)
      }, 100)
    } else {
      setActiveSection(id)
      history.pushState(null, '', `#${id}`)
      scrollToTargetElement(id)
    }
  }

  // Handle clicking Componentes items
  const handleComponentesItemClick = (componentId: string) => {
    setMobileMenuOpen(false)
    navigate(`/componentes/${componentId}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // On Guia page: IntersectionObserver to sync active section with scroll
  useEffect(() => {
    if (!isGuiaPage) return

    const hash = window.location.hash.replace('#', '')
    if (hash) {
      setActiveSection(hash)
      // Slight delay for initial scroll if needed
      setTimeout(() => scrollToTargetElement(hash), 150)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            if (id) {
              setActiveSection(id)
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

    const sections = GUIA_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean)
    sections.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [isGuiaPage, location.pathname])

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F5F7FA]">
      {/* Mobile Top Header */}
      <header className="lg:hidden sticky top-0 z-40 bg-[#062446] text-white px-4 py-3 flex items-center justify-between border-b border-[#0d3663] shadow-md">
        <Link to="/" className="flex items-center gap-3">
          <ComvenLogo variant="dark-colorida" showTagline={false} width={110} />
          <div className="h-4 w-px bg-[#194575]" />
          <span className="text-xs font-semibold text-[#8BB7E7] uppercase tracking-wider">
            Design System
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 text-white hover:text-[#F2CB05] rounded focus:outline-none transition-colors"
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
        className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-[#062446] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out border-r border-[#0d3663] shadow-xl ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Brand Section & Navigation Items */}
        <div className="pt-9 px-6 pb-2 flex-1 flex flex-col overflow-hidden">
          {/* Official COMVEN Logo for Dark Background with Tagline - clicking it goes to Home */}
          <div className="flex items-center justify-between">
            <Link
              to="/"
              onClick={() => {
                setMobileMenuOpen(false)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="flex flex-col items-start text-left w-full max-w-[210px] group transition-opacity hover:opacity-90"
              title="Voltar ao início do Guia de Estilos"
            >
              <ComvenLogo variant="dark-colorida" showTagline={true} width={190} />
            </Link>

            {/* Mobile close button inside drawer */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-1.5 text-[#8BB7E7] hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Fechar menu"
            >
              <span className="material-symbols-rounded" style={{ fontSize: '20px' }}>
                close
              </span>
            </button>
          </div>

          {/* Subtitle matching Figma screenshot: Design System · v1.0 — Ago/2026 */}
          <div className="mt-4 text-[13px] text-[#7E9AB8] font-normal tracking-tight text-center">
            Design System &nbsp;·&nbsp; v1.0 — Ago/2026
          </div>

          {/* Subtle horizontal divider line matching screenshot */}
          <div className="h-px bg-[#113C68] mt-6 mb-7 w-full" />

          {/* Navigation Links Scrollable Area */}
          <nav className="space-y-7 overflow-y-auto flex-1 pr-1.5 comven-sidebar-scroll">
            {/* Group 1: GUIA DE ESTILOS */}
            <div>
              <div className="px-2 mb-3 flex items-center justify-between select-none">
                <span className="text-[12px] font-bold tracking-[0.14em] uppercase text-white cursor-default">
                  GUIA DE ESTILOS
                </span>
                {isGuiaPage && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F2CB05]" title="Página ativa" />
                )}
              </div>
              <ul className="space-y-2">
                {GUIA_ITEMS.map((item) => {
                  const isActive = isGuiaPage && activeSection === item.id
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => handleGuiaItemClick(item.id)}
                        className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center gap-3.5 transition-colors duration-200 group ${
                          isActive
                            ? 'text-[#F2CB05] font-semibold'
                            : 'text-white hover:text-[#F2CB05]'
                        }`}
                      >
                        {/* Circular number badge: no hover/active preenchido em amarelo com número escuro */}
                        <span
                          className={`w-[26px] h-[26px] rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 transition-all duration-200 ${
                            isActive
                              ? 'bg-[#F2CB05] text-[#062446] font-bold border-none shadow-sm'
                              : 'border border-white/25 text-white/90 group-hover:bg-[#F2CB05] group-hover:text-[#062446] group-hover:font-bold group-hover:border-transparent group-hover:shadow-sm'
                          }`}
                        >
                          {item.number}
                        </span>
                        <span className="text-[14px] leading-snug tracking-normal truncate">
                          {item.label}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Group 2: COMPONENTES */}
            <div>
              <div className="px-2 mb-3 flex items-center justify-between select-none">
                <span className="text-[12px] font-bold tracking-[0.14em] uppercase text-white cursor-default">
                  COMPONENTES
                </span>
                {isComponentesPage && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F2CB05]" title="Página ativa" />
                )}
              </div>
              <ul className="space-y-2">
                {/* 1. Button */}
                <li>
                  <button
                    type="button"
                    onClick={() => handleComponentesItemClick('button')}
                    className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center gap-3.5 transition-colors duration-200 group ${
                      isComponentesPage &&
                      (location.pathname === '/componentes' ||
                        location.pathname === '/componentes/' ||
                        location.pathname === '/componentes/button')
                        ? 'text-[#F2CB05] font-semibold'
                        : 'text-white hover:text-[#F2CB05]'
                    }`}
                  >
                    <span
                      className={`w-[26px] h-[26px] rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 transition-all duration-200 ${
                        isComponentesPage &&
                        (location.pathname === '/componentes' ||
                          location.pathname === '/componentes/' ||
                          location.pathname === '/componentes/button')
                          ? 'bg-[#F2CB05] text-[#062446] font-bold border-none shadow-sm'
                          : 'border border-white/25 text-white/90 group-hover:bg-[#F2CB05] group-hover:text-[#062446] group-hover:font-bold group-hover:border-transparent group-hover:shadow-sm'
                      }`}
                    >
                      1
                    </span>
                    <span className="text-[14px] leading-snug tracking-normal truncate">
                      Button
                    </span>
                  </button>
                </li>

                {/* 2. Input */}
                <li>
                  <button
                    type="button"
                    onClick={() => handleComponentesItemClick('input')}
                    className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center gap-3.5 transition-colors duration-200 group ${
                      isComponentesPage && location.pathname.startsWith('/componentes/input')
                        ? 'text-[#F2CB05] font-semibold'
                        : 'text-white hover:text-[#F2CB05]'
                    }`}
                  >
                    <span
                      className={`w-[26px] h-[26px] rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 transition-all duration-200 ${
                        isComponentesPage && location.pathname.startsWith('/componentes/input')
                          ? 'bg-[#F2CB05] text-[#062446] font-bold border-none shadow-sm'
                          : 'border border-white/25 text-white/90 group-hover:bg-[#F2CB05] group-hover:text-[#062446] group-hover:font-bold group-hover:border-transparent group-hover:shadow-sm'
                      }`}
                    >
                      2
                    </span>
                    <span className="text-[14px] leading-snug tracking-normal truncate">Input</span>
                  </button>
                </li>

                {/* 3. Select */}
                <li>
                  <button
                    type="button"
                    onClick={() => handleComponentesItemClick('select')}
                    className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center gap-3.5 transition-colors duration-200 group ${
                      isComponentesPage && location.pathname.startsWith('/componentes/select')
                        ? 'text-[#F2CB05] font-semibold'
                        : 'text-white hover:text-[#F2CB05]'
                    }`}
                  >
                    <span
                      className={`w-[26px] h-[26px] rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 transition-all duration-200 ${
                        isComponentesPage && location.pathname.startsWith('/componentes/select')
                          ? 'bg-[#F2CB05] text-[#062446] font-bold border-none shadow-sm'
                          : 'border border-white/25 text-white/90 group-hover:bg-[#F2CB05] group-hover:text-[#062446] group-hover:font-bold group-hover:border-transparent group-hover:shadow-sm'
                      }`}
                    >
                      3
                    </span>
                    <span className="text-[14px] leading-snug tracking-normal truncate">
                      Select
                    </span>
                  </button>
                </li>

                {/* 4. Checkbox */}
                <li>
                  <button
                    type="button"
                    onClick={() => handleComponentesItemClick('checkbox')}
                    className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center gap-3.5 transition-colors duration-200 group ${
                      isComponentesPage &&
                      (location.pathname.startsWith('/componentes/checkbox') ||
                        location.pathname.startsWith('/componentes/check'))
                        ? 'text-[#F2CB05] font-semibold'
                        : 'text-white hover:text-[#F2CB05]'
                    }`}
                  >
                    <span
                      className={`w-[26px] h-[26px] rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 transition-all duration-200 ${
                        isComponentesPage &&
                        (location.pathname.startsWith('/componentes/checkbox') ||
                          location.pathname.startsWith('/componentes/check'))
                          ? 'bg-[#F2CB05] text-[#062446] font-bold border-none shadow-sm'
                          : 'border border-white/25 text-white/90 group-hover:bg-[#F2CB05] group-hover:text-[#062446] group-hover:font-bold group-hover:border-transparent group-hover:shadow-sm'
                      }`}
                    >
                      4
                    </span>
                    <span className="text-[14px] leading-snug tracking-normal truncate">
                      Checkbox
                    </span>
                  </button>
                </li>

                {/* 5. Radio Button */}
                <li>
                  <button
                    type="button"
                    onClick={() => handleComponentesItemClick('radio-button')}
                    className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center gap-3.5 transition-colors duration-200 group ${
                      isComponentesPage &&
                      (location.pathname.startsWith('/componentes/radio-button') ||
                        location.pathname.startsWith('/componentes/radio'))
                        ? 'text-[#F2CB05] font-semibold'
                        : 'text-white hover:text-[#F2CB05]'
                    }`}
                  >
                    <span
                      className={`w-[26px] h-[26px] rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 transition-all duration-200 ${
                        isComponentesPage &&
                        (location.pathname.startsWith('/componentes/radio-button') ||
                          location.pathname.startsWith('/componentes/radio'))
                          ? 'bg-[#F2CB05] text-[#062446] font-bold border-none shadow-sm'
                          : 'border border-white/25 text-white/90 group-hover:bg-[#F2CB05] group-hover:text-[#062446] group-hover:font-bold group-hover:border-transparent group-hover:shadow-sm'
                      }`}
                    >
                      5
                    </span>
                    <span className="text-[14px] leading-snug tracking-normal truncate">
                      Radio Button
                    </span>
                  </button>
                </li>

                {/* 6. Badge */}
                <li>
                  <button
                    type="button"
                    onClick={() => handleComponentesItemClick('badge')}
                    className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center gap-3.5 transition-colors duration-200 group ${
                      isComponentesPage && location.pathname.startsWith('/componentes/badge')
                        ? 'text-[#F2CB05] font-semibold'
                        : 'text-white hover:text-[#F2CB05]'
                    }`}
                  >
                    <span
                      className={`w-[26px] h-[26px] rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 transition-all duration-200 ${
                        isComponentesPage && location.pathname.startsWith('/componentes/badge')
                          ? 'bg-[#F2CB05] text-[#062446] font-bold border-none shadow-sm'
                          : 'border border-white/25 text-white/90 group-hover:bg-[#F2CB05] group-hover:text-[#062446] group-hover:font-bold group-hover:border-transparent group-hover:shadow-sm'
                      }`}
                    >
                      6
                    </span>
                    <span className="text-[14px] leading-snug tracking-normal truncate">Badge</span>
                  </button>
                </li>

                {/* 7. Tag */}
                <li>
                  <button
                    type="button"
                    onClick={() => handleComponentesItemClick('tag')}
                    className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center gap-3.5 transition-colors duration-200 group ${
                      isComponentesPage && location.pathname.startsWith('/componentes/tag')
                        ? 'text-[#F2CB05] font-semibold'
                        : 'text-white hover:text-[#F2CB05]'
                    }`}
                  >
                    <span
                      className={`w-[26px] h-[26px] rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 transition-all duration-200 ${
                        isComponentesPage && location.pathname.startsWith('/componentes/tag')
                          ? 'bg-[#F2CB05] text-[#062446] font-bold border-none shadow-sm'
                          : 'border border-white/25 text-white/90 group-hover:bg-[#F2CB05] group-hover:text-[#062446] group-hover:font-bold group-hover:border-transparent group-hover:shadow-sm'
                      }`}
                    >
                      7
                    </span>
                    <span className="text-[14px] leading-snug tracking-normal truncate">Tag</span>
                  </button>
                </li>

                {/* 8. Toast */}
                <li>
                  <button
                    type="button"
                    onClick={() => handleComponentesItemClick('toast')}
                    className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center gap-3.5 transition-colors duration-200 group ${
                      isComponentesPage && location.pathname.startsWith('/componentes/toast')
                        ? 'text-[#F2CB05] font-semibold'
                        : 'text-white hover:text-[#F2CB05]'
                    }`}
                  >
                    <span
                      className={`w-[26px] h-[26px] rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 transition-all duration-200 ${
                        isComponentesPage && location.pathname.startsWith('/componentes/toast')
                          ? 'bg-[#F2CB05] text-[#062446] font-bold border-none shadow-sm'
                          : 'border border-white/25 text-white/90 group-hover:bg-[#F2CB05] group-hover:text-[#062446] group-hover:font-bold group-hover:border-transparent group-hover:shadow-sm'
                      }`}
                    >
                      8
                    </span>
                    <span className="text-[14px] leading-snug tracking-normal truncate">Toast</span>
                  </button>
                </li>

                {/* 9. InfoCard */}
                <li>
                  <button
                    type="button"
                    onClick={() => handleComponentesItemClick('infocard')}
                    className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center gap-3.5 transition-colors duration-200 group ${
                      isComponentesPage && location.pathname.startsWith('/componentes/infocard')
                        ? 'text-[#F2CB05] font-semibold'
                        : 'text-white hover:text-[#F2CB05]'
                    }`}
                  >
                    <span
                      className={`w-[26px] h-[26px] rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 transition-all duration-200 ${
                        isComponentesPage && location.pathname.startsWith('/componentes/infocard')
                          ? 'bg-[#F2CB05] text-[#062446] font-bold border-none shadow-sm'
                          : 'border border-white/25 text-white/90 group-hover:bg-[#F2CB05] group-hover:text-[#062446] group-hover:font-bold group-hover:border-transparent group-hover:shadow-sm'
                      }`}
                    >
                      9
                    </span>
                    <span className="text-[14px] leading-snug tracking-normal truncate">
                      InfoCard
                    </span>
                  </button>
                </li>

                {/* 10. Tooltip */}
                <li>
                  <button
                    type="button"
                    onClick={() => handleComponentesItemClick('tooltip')}
                    className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center gap-3.5 transition-colors duration-200 group ${
                      isComponentesPage && location.pathname.startsWith('/componentes/tooltip')
                        ? 'text-[#F2CB05] font-semibold'
                        : 'text-white hover:text-[#F2CB05]'
                    }`}
                  >
                    <span
                      className={`w-[26px] h-[26px] rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 transition-all duration-200 ${
                        isComponentesPage && location.pathname.startsWith('/componentes/tooltip')
                          ? 'bg-[#F2CB05] text-[#062446] font-bold border-none shadow-sm'
                          : 'border border-white/25 text-white/90 group-hover:bg-[#F2CB05] group-hover:text-[#062446] group-hover:font-bold group-hover:border-transparent group-hover:shadow-sm'
                      }`}
                    >
                      10
                    </span>
                    <span className="text-[14px] leading-snug tracking-normal truncate">
                      Tooltip
                    </span>
                  </button>
                </li>

                {/* 11. Card */}
                <li>
                  <button
                    type="button"
                    onClick={() => handleComponentesItemClick('card')}
                    className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center gap-3.5 transition-colors duration-200 group ${
                      isComponentesPage && location.pathname.startsWith('/componentes/card')
                        ? 'text-[#F2CB05] font-semibold'
                        : 'text-white hover:text-[#F2CB05]'
                    }`}
                  >
                    <span
                      className={`w-[26px] h-[26px] rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 transition-all duration-200 ${
                        isComponentesPage && location.pathname.startsWith('/componentes/card')
                          ? 'bg-[#F2CB05] text-[#062446] font-bold border-none shadow-sm'
                          : 'border border-white/25 text-white/90 group-hover:bg-[#F2CB05] group-hover:text-[#062446] group-hover:font-bold group-hover:border-transparent group-hover:shadow-sm'
                      }`}
                    >
                      11
                    </span>
                    <span className="text-[14px] leading-snug tracking-normal truncate">Card</span>
                  </button>
                </li>

                {/* 12. Accordion */}
                <li>
                  <button
                    type="button"
                    onClick={() => handleComponentesItemClick('accordion')}
                    className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center gap-3.5 transition-colors duration-200 group ${
                      isComponentesPage && location.pathname.startsWith('/componentes/accordion')
                        ? 'text-[#F2CB05] font-semibold'
                        : 'text-white hover:text-[#F2CB05]'
                    }`}
                  >
                    <span
                      className={`w-[26px] h-[26px] rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 transition-all duration-200 ${
                        isComponentesPage && location.pathname.startsWith('/componentes/accordion')
                          ? 'bg-[#F2CB05] text-[#062446] font-bold border-none shadow-sm'
                          : 'border border-white/25 text-white/90 group-hover:bg-[#F2CB05] group-hover:text-[#062446] group-hover:font-bold group-hover:border-transparent group-hover:shadow-sm'
                      }`}
                    >
                      12
                    </span>
                    <span className="text-[14px] leading-snug tracking-normal truncate">
                      Accordion
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Sidebar Footer matching reference: COMVEN © 2026 */}
        <div className="px-6 py-5 text-[12px] text-[#7E9AB8] font-normal tracking-wide">
          COMVEN © 2026
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-[280px] flex flex-col min-h-screen">
        <main className="flex-1 w-full flex flex-col">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
