import { Link } from 'react-router-dom'
import { Clock, Linkedin, Mail, MapPin } from 'lucide-react'
import ContactForm from '@/components/ContactForm'
import SectionTitle from '@/components/SectionTitle'
import Seo from '@/components/Seo'

export default function Contact() {
  return (
    <div className="pt-24 pb-20">
      <Seo
        title="Solicitar propuesta | Mrabeh Fathi"
        description="Cuéntame tu proyecto web, automatización o necesidad de seguridad y solicita una propuesta de alcance y presupuesto."
        path="/contacto"
      />

      <div className="section-container">
        <SectionTitle
          as="h1"
          label="propuesta"
          title="Cuéntame qué necesitas"
          highlight="construir o mejorar"
          description="Cuanta más información me des sobre el objetivo, el punto de partida y el plazo, más útil podrá ser la primera respuesta."
        />

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-14">
          <aside>
            <div className="card-glass rounded-2xl p-6 mb-6">
              <h2 className="font-display font-bold text-lg text-text mb-4">Qué pasa después</h2>
              <ol className="space-y-4">
                {[
                  ['01', 'Reviso el objetivo, alcance y encaje del proyecto.'],
                  ['02', 'Si necesito contexto adicional, te pediré solo lo imprescindible.'],
                  ['03', 'Si encaja, te propondré alcance, entregables y siguiente paso.'],
                ].map(([step, text]) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="font-mono text-xs text-accent mt-0.5">{step}</span>
                    <span className="text-sm text-text-dim leading-relaxed">{text}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="space-y-5 mb-6">
              {[
                {
                  icon: Mail,
                  label: 'Email',
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
                  value: 'Madrid · proyectos en remoto',
                  color: '#00ff88',
                },
                {
                  icon: Clock,
                  label: 'Modalidad',
                  value: 'Trabajo por proyecto y por alcance',
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

            <div className="rounded-xl border border-border bg-surface/30 p-5">
              <p className="text-xs font-mono uppercase tracking-wider text-text-muted mb-2">¿Vienes por empleo?</p>
              <p className="text-sm text-text-dim leading-relaxed mb-3">
                Esta página está pensada para proyectos y clientes. Mi experiencia, formación y disponibilidad laboral están separadas para no mezclar ambos objetivos.
              </p>
              <Link to="/cv" className="text-sm text-accent hover:underline">
                Ver CV profesional →
              </Link>
            </div>
          </aside>

          <div className="card-glass rounded-2xl p-6 sm:p-8">
            <div className="mb-6">
              <p className="font-mono text-xs uppercase tracking-wider text-accent mb-2">Solicitud de proyecto</p>
              <h2 className="font-display font-black text-2xl text-text">Datos para preparar la conversación</h2>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
