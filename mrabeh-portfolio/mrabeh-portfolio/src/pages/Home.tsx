import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Code2, Lock, Shield, Zap } from 'lucide-react'
import ProjectCard from '@/components/ProjectCard'
import SectionTitle from '@/components/SectionTitle'
import Seo from '@/components/Seo'
import { projects } from '@/data/projects'

const services = [
  {
    icon: Code2,
    title: 'Web profesional',
    description:
      'Webs corporativas y landing pages rápidas, responsive y pensadas para transmitir confianza y convertir visitas en contactos.',
    bullets: ['Diseño y desarrollo a medida', 'Responsive y accesibilidad', 'SEO técnico básico', 'Entrega preparada para producción'],
    price: 'Desde 690 €',
    color: '#00d4ff',
  },
  {
    icon: Zap,
    title: 'Aplicaciones y automatización',
    description:
      'Herramientas internas, dashboards e integraciones que sustituyen tareas repetitivas por flujos simples y medibles.',
    bullets: ['Aplicaciones web', 'APIs e integraciones', 'Dashboards', 'Automatización de procesos'],
    price: 'Presupuesto según alcance',
    color: '#7c3aed',
  },
  {
    icon: Shield,
    title: 'Web Security Review',
    description:
      'Revisión técnica de la superficie web para detectar configuraciones débiles y priorizar mejoras de seguridad sin vender humo.',
    bullets: ['HTTPS y TLS', 'Cabeceras de seguridad', 'Configuración web', 'Informe priorizado'],
    price: 'Desde 390 €',
    color: '#00ff88',
  },
]

const process = [
  {
    step: '01',
    title: 'Entender',
    description: 'Definimos objetivo, público, alcance y qué resultado debe conseguir el proyecto.',
  },
  {
    step: '02',
    title: 'Proponer',
    description: 'Recibes una propuesta clara con alcance, entregables, precio y siguientes pasos.',
  },
  {
    step: '03',
    title: 'Construir',
    description: 'Desarrollo por hitos, con revisiones concretas y decisiones justificadas.',
  },
  {
    step: '04',
    title: 'Entregar',
    description: 'Publicación, documentación esencial y soporte para que el proyecto quede utilizable.',
  },
]

const principles = [
  'Trato directo con quien diseña y desarrolla el proyecto',
  'Seguridad, rendimiento y accesibilidad desde el principio',
  'Alcance y entregables claros antes de empezar',
  'Tecnología elegida por necesidad, no por moda',
]

export default function Home() {
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3)

  return (
    <>
      <Seo
        title="Desarrollo web y seguridad para empresas | Mrabeh Fathi"
        description="Desarrollo webs, aplicaciones y revisiones de seguridad web para autónomos, profesionales y pequeñas empresas. Madrid y proyectos en remoto."
        path="/"
      />

      <section
        className="relative min-h-[92vh] flex items-center overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at 20% 50%, #0d1f3c 0%, #080c14 60%)',
        }}
      >
        <div className="absolute inset-0 grid-bg opacity-100" />
        <div
          className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)' }}
        />

        <div className="section-container relative z-10 pt-28 pb-20">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-accent/5 border border-accent/15">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
              <span className="text-xs font-mono text-text-dim">
                Desarrollo web · Automatización · Seguridad web
              </span>
            </div>

            <p className="font-mono text-sm text-accent mb-4 tracking-widest uppercase">
              Mrabeh Fathi · Madrid / Remoto
            </p>

            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-text mb-6 leading-[1.02] tracking-tight max-w-5xl">
              Construyo soluciones web para empresas que necesitan algo mejor que una plantilla.
            </h1>

            <p className="text-text-dim text-lg sm:text-xl leading-relaxed mb-8 max-w-3xl">
              Diseño y desarrollo webs, aplicaciones y automatizaciones para autónomos, profesionales y pequeñas empresas, con una base clara: rendimiento, accesibilidad y seguridad desde el principio.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link to="/contacto" className="btn-primary">
                Solicitar propuesta
                <ArrowRight size={16} />
              </Link>
              <Link to="/proyectos" className="btn-outline">
                Ver trabajo
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-text-muted">
              {['Proyectos a medida', 'Primera consulta sin compromiso', 'Madrid · toda España en remoto'].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <CheckCircle size={15} className="text-accent-green" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface/30">
        <div className="section-container py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center md:text-left">
            {[
              ['Web', 'Presencia digital profesional'],
              ['Apps', 'Herramientas adaptadas al negocio'],
              ['Automatización', 'Menos tareas repetitivas'],
              ['Security', 'Mejor postura técnica'],
            ].map(([title, subtitle]) => (
              <div key={title}>
                <p className="font-display font-bold text-text">{title}</p>
                <p className="text-xs text-text-muted mt-1">{subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="section-container">
          <SectionTitle
            label="servicios"
            title="Soluciones que una empresa"
            highlight="puede contratar"
            description="Tres líneas de trabajo concretas, con alcance comprensible y sin mezclar una lista interminable de tecnologías."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <article key={service.title} className="card-glass rounded-2xl p-6 flex flex-col">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `${service.color}12`, border: `1px solid ${service.color}25` }}
                  >
                    <Icon size={23} style={{ color: service.color }} />
                  </div>
                  <h2 className="font-display font-bold text-xl text-text mb-3">{service.title}</h2>
                  <p className="text-sm text-text-muted leading-relaxed mb-5">{service.description}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2 text-sm text-text-dim">
                        <CheckCircle size={15} className="text-accent-green mt-0.5 flex-shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-5 border-t border-border flex items-center justify-between gap-4">
                    <span className="text-sm font-mono text-accent">{service.price}</span>
                    <Link to="/servicios" className="text-sm text-text hover:text-accent transition-colors inline-flex items-center gap-1">
                      Ver detalles <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-surface/20">
        <div className="section-container">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <SectionTitle
              label="evidencia"
              title="Trabajo y casos"
              highlight="que puedes revisar"
              description="No te pido que confíes en una lista de habilidades. Puedes revisar cómo planteo, documento y construyo los proyectos."
            />
            <Link to="/proyectos" className="btn-outline text-sm py-2">
              Ver todo el trabajo <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} featured />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionTitle
                label="enfoque"
                title="Desarrollo con"
                highlight="mentalidad de negocio"
                description="Mi experiencia previa gestionando procesos me obliga a empezar por una pregunta sencilla: qué necesita conseguir el negocio, no qué framework queda mejor en una captura."
              />

              <div className="space-y-3">
                {principles.map((principle) => (
                  <div key={principle} className="flex items-start gap-3 text-text-dim">
                    <CheckCircle size={18} className="text-accent-green mt-0.5 flex-shrink-0" />
                    <span>{principle}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/sobre-mi" className="btn-outline">
                  Conocer mi perfil
                </Link>
                <Link to="/cv" className="text-sm text-text-muted hover:text-text inline-flex items-center px-2">
                  ¿Vienes por una oportunidad laboral? Ver CV
                </Link>
              </div>
            </div>

            <div className="card-glass rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <Lock size={19} className="text-accent" />
                </div>
                <div>
                  <p className="font-display font-bold text-text">Seguridad desde el diseño</p>
                  <p className="text-xs text-text-muted">No como añadido de última hora</p>
                </div>
              </div>
              <p className="text-sm text-text-dim leading-relaxed mb-5">
                Una web comercial debe verse bien, pero también cargar bien, exponer lo mínimo necesario y mantenerse con criterio. Integro esas decisiones dentro del desarrollo, y cuando el proyecto requiere una auditoría avanzada lo dejo claro desde el principio.
              </p>
              <Link to="/servicios" className="text-sm text-accent inline-flex items-center gap-2 hover:gap-3 transition-all">
                Ver el alcance de seguridad <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-surface/20">
        <div className="section-container">
          <SectionTitle
            label="proceso"
            title="De la primera conversación"
            highlight="a una entrega utilizable"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {process.map((item) => (
              <div key={item.step} className="card-glass rounded-xl p-6">
                <p className="font-mono text-xs text-accent mb-4">{item.step}</p>
                <h3 className="font-display font-bold text-lg text-text mb-2">{item.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="section-container">
          <div
            className="rounded-2xl p-8 sm:p-12 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(0,212,255,0.06) 0%, rgba(124,58,237,0.08) 100%)',
              border: '1px solid rgba(0,212,255,0.16)',
            }}
          >
            <p className="font-mono text-xs uppercase tracking-widest text-accent mb-4">Siguiente paso</p>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-text mb-4">
              Cuéntame qué quieres mejorar o construir.
            </h2>
            <p className="text-text-dim max-w-2xl mx-auto mb-7">
              Si el proyecto encaja con lo que puedo ejecutar bien, te propondré un alcance concreto. Si no encaja, también te lo diré con claridad.
            </p>
            <Link to="/contacto" className="btn-primary inline-flex">
              Solicitar propuesta
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
