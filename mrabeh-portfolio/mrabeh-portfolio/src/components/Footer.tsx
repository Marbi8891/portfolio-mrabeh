import { Link } from 'react-router-dom'
import { Shield, Linkedin, Mail, MapPin, ExternalLink } from 'lucide-react'

const footerLinks = {
  nav: [
    { href: '/', label: 'Inicio' },
    { href: '/sobre-mi', label: 'Sobre mí' },
    { href: '/proyectos', label: 'Proyectos' },
    { href: '/servicios', label: 'Servicios' },
    { href: '/contacto', label: 'Contacto' },
    { href: '/cv', label: 'CV' },
  ],
  legal: [
    { href: '/legal/aviso-legal', label: 'Aviso Legal' },
    { href: '/legal/privacidad', label: 'Privacidad' },
    { href: '/legal/cookies', label: 'Cookies' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface/30">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Shield size={20} className="text-accent" />
              <span className="font-display font-bold text-lg">
                MF<span className="text-accent">.</span>
              </span>
            </div>
            <p className="text-text-dim text-sm leading-relaxed mb-4 max-w-xs">
              Perfil híbrido en desarrollo web, ciberseguridad, automatización e inteligencia artificial.
              Madrid / Leganés, España.
            </p>
            <div className="flex flex-col gap-2 text-sm text-text-muted">
              <a
                href="mailto:mrabehfathiprofesional@gmail.com"
                className="flex items-center gap-2 hover:text-accent transition-colors"
              >
                <Mail size={14} />
                mrabehfathiprofesional@gmail.com
              </a>
              <a
                href="https://linkedin.com/in/mrabehfathi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-accent transition-colors"
              >
                <Linkedin size={14} />
                linkedin.com/in/mrabehfathi
              </a>
              <span className="flex items-center gap-2">
                <MapPin size={14} />
                Madrid / Leganés, España
              </span>
            </div>
          </div>

          {/* Nav */}
          <div>
            <h3 className="font-display font-semibold text-sm text-text mb-4 uppercase tracking-wider">
              Navegación
            </h3>
            <ul className="space-y-2">
              {footerLinks.nav.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-text-dim hover:text-text transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display font-semibold text-sm text-text mb-4 uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-text-dim hover:text-text transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-border">
              <a
                href="https://linkedin.com/in/mrabehfathi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-dim transition-colors"
              >
                <Linkedin size={14} />
                LinkedIn
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-text-muted font-mono">
            © {new Date().getFullYear()} Mrabeh Fathi Boussayff · Todos los derechos reservados
          </p>
          <p className="text-xs text-text-muted">
            mrabehfathi.com · Madrid, España
          </p>
        </div>
      </div>
    </footer>
  )
}
