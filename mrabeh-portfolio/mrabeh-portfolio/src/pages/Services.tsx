import { Link } from 'react-router-dom'
import { Code2, Shield, Zap, Monitor, BarChart2, FileText, ArrowRight, type LucideProps } from 'lucide-react'
import SectionTitle from '@/components/SectionTitle'
import { services } from '@/data/experience'
import type { ForwardRefExoticComponent, RefAttributes } from 'react'

type LucideIcon = ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>

const iconMap: Record<string, LucideIcon> = {
  Code2, Shield, Zap, Monitor, BarChart2, FileText,
}

const faq = [
  {
    q: '¿Trabajas de forma remota?',
    a: 'Sí, trabajo completamente en remoto o en híbrido según las necesidades del proyecto o empresa.',
  },
  {
    q: '¿Cuáles son tus tarifas?',
    a: 'Depende del proyecto y alcance. Contáctame y te doy un presupuesto detallado sin compromiso.',
  },
  {
    q: '¿Tienes disponibilidad inmediata?',
    a: 'Sí, estoy disponible para nuevas oportunidades, tanto para posiciones en empresa como para proyectos freelance.',
  },
  {
    q: '¿Puedes trabajar en proyectos de ciberseguridad para empresas sin equipo técnico interno?',
    a: 'Puedo ofrecer una primera revisión de seguridad básica (buenas prácticas OWASP, configuraciones) para empresas sin equipo de seguridad propio. No sustituyo una auditoría profesional para necesidades avanzadas.',
  },
]

export default function Services() {
  return (
    <div className="pt-24 pb-20">
      <div className="section-container">
        <SectionTitle
          label="servicios"
          title="Cómo puedo"
          highlight="ayudarte"
          description="No soy una agencia. Soy un profesional técnico que entiende el negocio y construye soluciones reales."
        />

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Code2
            return (
              <div
                key={service.title}
                className="group card-glass rounded-xl p-6 hover:-translate-y-1 transition-all duration-300"
                style={{ borderColor: `${service.color}15` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"
                  style={{ background: `${service.color}12`, border: `1px solid ${service.color}25` }}
                >
                  <Icon size={24} style={{ color: service.color }} />
                </div>
                <h3 className="font-display font-bold text-base text-text mb-3">{service.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{service.description}</p>
              </div>
            )
          })}
        </div>

        {/* FAQ */}
        <div className="mb-20">
          <SectionTitle label="preguntas" title="FAQ" highlight="rápida" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faq.map((item) => (
              <div key={item.q} className="card-glass rounded-xl p-6">
                <h4 className="font-display font-semibold text-sm text-text mb-3">{item.q}</h4>
                <p className="text-sm text-text-muted leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="rounded-2xl p-10 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(0,212,255,0.05) 0%, rgba(124,58,237,0.08) 100%)',
            border: '1px solid rgba(0,212,255,0.15)',
          }}
        >
          <h2 className="font-display font-black text-3xl text-text mb-4">
            ¿Tienes un proyecto en mente?
          </h2>
          <p className="text-text-dim mb-6 max-w-md mx-auto">
            Cuéntame qué necesitas. Primera consulta gratuita, sin compromiso.
          </p>
          <Link to="/contacto" className="btn-primary inline-flex">
            Hablar ahora
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}
