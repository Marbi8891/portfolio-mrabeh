import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Shield } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/sobre-mi', label: 'Sobre mí' },
  { href: '/proyectos', label: 'Proyectos' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/contacto', label: 'Contacto' },
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
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Shield size={22} className="text-accent group-hover:text-accent transition-colors" />
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-accent-green rounded-full animate-pulse" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">
              MF<span className="text-accent">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
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

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/cv" className="btn-outline text-sm py-2 px-4">
              Ver CV
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-text-dim hover:text-text hover:bg-surface transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
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
          <Link to="/cv" className="block btn-primary text-center text-sm mt-2">
            Ver CV
          </Link>
        </div>
      </div>
    </header>
  )
}
