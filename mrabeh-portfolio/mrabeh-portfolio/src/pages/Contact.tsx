import { Mail, Linkedin, MapPin, Clock } from 'lucide-react'
import SectionTitle from '@/components/SectionTitle'
import ContactForm from '@/components/ContactForm'
import Seo from '@/components/Seo'

export default function Contact() {
  return (
    <div className="pt-24 pb-20">
      <Seo
        title="Contacto"
        description="Contacta con Mrabeh Fathi para roles tech, colaboraciones o proyectos freelance."
        path="/contacto"
      />
      <div className="section-container">
        <SectionTitle
          as="h1"
          label="contacto"
          title="Hablemos"
          highlight="en serio"
          description="Estoy disponible para roles tech, colaboraciones, proyectos freelance y consultoría. Respondo en menos de 24 horas."
        />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <div className="space-y-6 mb-8">
              {[
                {
                  icon: Mail,
                  label: 'Email profesional',
                  value: 'mrabehfathiprofesional@gmail.com',
                  href: 'mailto:mrabehfathiprofesional@gmail.com',
                  color: '#00d4ff',
                },
                {
                  icon: Linkedin,
                  label: 'LinkedIn',
                  value: 'linkedin.com/in/mrabehfathi',
                  href: 'https://linkedin.com/in/mrabehfathi',
                  color: '#7c3aed',
                },
                {
                  icon: MapPin,
                  label: 'Ubicación',
                  value: 'Madrid / Leganés, España',
                  href: undefined,
                  color: '#00ff88',
                },
                {
                  icon: Clock,
                  label: 'Disponibilidad',
                  value: 'Inmediata · Remoto / Híbrido',
                  href: undefined,
                  color: '#f59e0b',
                },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${item.color}12`, border: `1px solid ${item.color}25` }}
                    >
                      <Icon size={18} style={{ color: item.color }} />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="text-sm text-text hover:text-accent transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm text-text">{item.value}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* What I'm looking for */}
            <div className="card-glass rounded-xl p-6">
              <h3 className="font-display font-semibold text-sm text-text mb-4 uppercase tracking-wider">
                Busco activamente
              </h3>
              <ul className="space-y-2">
                {[
                  'Desarrollador web (Junior/Mid)',
                  'Soporte IT o sysadmin',
                  'Analista de ciberseguridad Junior',
                  'GRC Junior / Compliance',
                  'Automatización y scripting',
                  'Proyectos freelance técnicos',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-text-dim">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="card-glass rounded-xl p-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
