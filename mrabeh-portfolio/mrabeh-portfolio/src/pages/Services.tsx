import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Code2, Shield, Zap } from 'lucide-react'
import SectionTitle from '@/components/SectionTitle'
import Seo from '@/components/Seo'

const offers = [
  {
    icon: Code2,
    title: 'Web profesional',
    subtitle: 'Para negocios que necesitan una presencia digital seria y útil.',
    description:
      'Diseño y desarrollo de webs corporativas y landing pages enfocadas en claridad, rendimiento y conversión.',
    includes: [
      'Arquitectura y estructura de contenidos',
      'Diseño responsive',
      'Desarrollo a medida',
      'SEO técnico básico',
      'Accesibilidad y rendimiento',
      'Publicación y entrega',
    ],
    idealFor: 'Autónomos, despachos, clínicas, empresas de servicios y pequeños negocios.',
    price: 'Desde 690 €',
    color: '#00d4ff',
  },
  {
    icon: Zap,
    title: 'Aplicaciones y automatización',
    subtitle: 'Para procesos que ya no deberían depender de tareas manuales.',
    description:
      'Herramientas web, dashboards, integraciones y automatizaciones adaptadas al flujo real de trabajo.',
    includes: [
      'Aplicaciones web internas',
      'Dashboards y paneles de gestión',
      'APIs e integraciones',
      'Automatización de tareas repetitivas',
      'Validación y documentación básica',
      'Despliegue según alcance',
    ],
    idealFor: 'Equipos pequeños con procesos repetitivos, hojas de cálculo o herramientas desconectadas.',
    price: 'Presupuesto según alcance',
    color: '#7c3aed',
  },
  {
    icon: Shield,
    title: 'Web Security Review',
    subtitle: 'Para saber qué está mal configurado antes de que se convierta en un problema.',
    description:
      'Revisión técnica de la superficie web y de configuraciones básicas de seguridad, con conclusiones accionables.',
    includes: [
      'HTTPS y TLS',
      'Cabeceras de seguridad',
      'Cookies y políticas web',
      'Exposición técnica observable',
      'Priorización de hallazgos',
      'Informe de recomendaciones',
    ],
    idealFor: 'Pymes y profesionales sin equipo de seguridad interno que necesitan una primera revisión técnica.',
    price: 'Desde 390 €',
    color: '#00ff88',
  },
]

const faq = [
  {
    q: '¿Trabajas con empresas fuera de Madrid?',
    a: 'Sí. Puedo trabajar en remoto con clientes de cualquier punto de España y coordinar el proyecto por videollamada, correo y entregas por hitos.',
  },
  {
    q: '¿Puedes darme un precio cerrado?',
    a: 'Sí, cuando el alcance está definido. Antes de empezar dejo por escrito qué se entrega, qué queda fuera, el precio y los hitos principales.',
  },
  {
    q: '¿Incluyes mantenimiento?',
    a: 'Puede añadirse como servicio recurrente cuando el proyecto lo necesita. El mantenimiento se define aparte para no mezclar desarrollo inicial con soporte continuo.',
  },
  {
    q: '¿La revisión de seguridad sustituye a un pentest?',
    a: 'No. Es una revisión técnica inicial de la postura web y de configuraciones observables. Si necesitas una auditoría ofensiva completa o un requisito regulatorio específico, el alcance debe tratarse de forma independiente.',
  },
]

export default function Services() {
  return (
    <div className="pt-24 pb-20">
      <Seo
        title="Servicios de desarrollo web y seguridad | Mrabeh Fathi"
        description="Webs profesionales, aplicaciones y automatización, y revisiones de seguridad web para autónomos y pequeñas empresas."
        path="/servicios"
      />

      <div className="section-container">
        <SectionTitle
          as="h1"
          label="servicios"
          title="Qué puedes"
          highlight="contratar"
          description="Servicios concretos para resolver problemas concretos. Trato directo, alcance claro y tecnología elegida según la necesidad del proyecto."
        />

        <div className="space-y-6 mb-20">
          {offers.map((offer) => {
            const Icon = offer.icon
            return (
              <article key={offer.title} className="card-glass rounded-2xl p-6 sm:p-8">
                <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8">
                  <div>
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                      style={{ background: `${offer.color}12`, border: `1px solid ${offer.color}25` }}
                    >
                      <Icon size={24} style={{ color: offer.color }} />
                    </div>
                    <p className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: offer.color }}>
                      {offer.price}
                    </p>
                    <h2 className="font-display font-black text-2xl text-text mb-2">{offer.title}</h2>
                    <p className="text-text-dim mb-4">{offer.subtitle}</p>
                    <p className="text-sm text-text-muted leading-relaxed mb-5">{offer.description}</p>
                    <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2">Ideal para</p>
                    <p className="text-sm text-text-dim">{offer.idealFor}</p>
                  </div>

                  <div className="rounded-xl border border-border bg-surface/40 p-5 sm:p-6">
                    <p className="font-display font-semibold text-text mb-4">Qué puede incluir</p>
                    <ul className="space-y-3 mb-6">
                      {offer.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-text-dim">
                          <CheckCircle size={15} className="text-accent-green mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Link to="/contacto" className="btn-primary inline-flex">
                      Pedir propuesta
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mb-20">
          <SectionTitle
            label="forma de trabajo"
            title="Sin paquetes"
            highlight="inflados"
            description="Los precios de entrada orientan. El presupuesto final depende del alcance real, las integraciones, el contenido y el nivel de soporte que necesite el proyecto."
          />

          <div className="grid md:grid-cols-3 gap-4">
            {[
              ['01 · Alcance', 'Primero definimos qué problema hay que resolver y qué entregable tiene sentido.'],
              ['02 · Propuesta', 'Recibes una propuesta concreta con alcance, precio y condiciones antes de empezar.'],
              ['03 · Entrega', 'El trabajo avanza por hitos y termina con una entrega utilizable, no con una demo abandonada.'],
            ].map(([title, description]) => (
              <div key={title} className="card-glass rounded-xl p-6">
                <h3 className="font-display font-bold text-text mb-2">{title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <SectionTitle label="preguntas" title="Antes de" highlight="empezar" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faq.map((item) => (
              <div key={item.q} className="card-glass rounded-xl p-6">
                <h3 className="font-display font-semibold text-sm text-text mb-3">{item.q}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="rounded-2xl p-8 sm:p-10 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(0,212,255,0.05) 0%, rgba(124,58,237,0.08) 100%)',
            border: '1px solid rgba(0,212,255,0.15)',
          }}
        >
          <h2 className="font-display font-black text-3xl text-text mb-4">
            ¿Tienes un proyecto concreto?
          </h2>
          <p className="text-text-dim mb-6 max-w-2xl mx-auto">
            Cuéntame qué necesitas, qué quieres conseguir y qué plazo manejas. Si puedo ejecutarlo bien, te propondré el siguiente paso.
          </p>
          <Link to="/contacto" className="btn-primary inline-flex">
            Solicitar propuesta
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}
