import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Github, Menu, Shield, X } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/proyectos', label: 'Trabajo' },
  { href: '/sobre-mi', label: 'Sobre mí' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/95 backdrop-blur-xl border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group" aria-label="Ir al inicio">
            <div className="relative">
              <Shield size={22} className="text-accent group-hover:text-accent transition-colors" />
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-accent-green rounded-full" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">
              MF<span className="text-accent">.</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium font-display transition-all duration-200 ${
                  location.pathname === link.href
                    ? 'text-accent bg-accent/5'
                    : 'text-text-dim hover:text-text hover:bg-surface'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com/Marbi8891"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-lg text-text-dim hover:text-text hover:bg-surface transition-colors"
            >
              <Github size={18} />
            </a>
            <Link to="/cv" className="text-sm text-text-muted hover:text-text transition-colors">
              CV profesional
            </Link>
            <Link to="/contacto" className="btn-primary text-sm py-2 px-4">
              Solicitar propuesta
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-text-dim hover:text-text hover:bg-surface transition-colors"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Navegación móvil"
        aria-hidden={!isOpen}
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-background/98 backdrop-blur-xl border-b border-border px-4 pb-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`block px-4 py-3 rounded-lg text-sm font-medium font-display transition-all ${
                location.pathname === link.href
                  ? 'text-accent bg-accent/5'
                  : 'text-text-dim hover:text-text hover:bg-surface'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/contacto" className="block btn-primary text-center text-sm mt-3">
            Solicitar propuesta
          </Link>
          <Link to="/cv" className="block text-center px-4 py-3 text-sm text-text-muted hover:text-text">
            Ver CV profesional
          </Link>
        </div>
      </nav>
    </header>
  )
}
