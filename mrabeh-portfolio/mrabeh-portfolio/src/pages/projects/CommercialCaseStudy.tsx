import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle, CircleAlert, Target } from 'lucide-react'
import Seo from '@/components/Seo'
import { commercialCases } from '@/data/commercialCases'

export default function CommercialCaseStudy() {
  const { projectId } = useParams<{ projectId: string }>()
  const project = commercialCases.find((item) => item.id === projectId)

  if (!project) {
    return <Navigate to="/proyectos" replace />
  }

  const details = project.commercialCase

  return (
    <div className="pt-24 pb-20">
      <Seo
        title={`${project.title} · Caso conceptual`}
        description={`${project.description} Caso conceptual de propuesta comercial; no representa un cliente real.`}
        path={project.caseStudyPath ?? `/proyectos/concepto/${project.id}`}
      />

      <div className="section-container">
        <Link
          to="/proyectos"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft size={15} />
          Volver a trabajo
        </Link>

        <div className="max-w-4xl mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/5 px-3 py-1.5 mb-5">
            <CircleAlert size={14} className="text-amber-300" />
            <span className="font-mono text-xs uppercase tracking-wider text-amber-200">
              Caso conceptual · no es un cliente real
            </span>
          </div>

          <p className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
            {details.sector}
          </p>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-text leading-tight mb-5">
            {project.title}
          </h1>
          <p className="text-xl text-text-dim mb-5">{project.subtitle}</p>
          <p className="text-text-muted text-lg leading-relaxed max-w-3xl">
            {project.longDescription}
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface/30 p-6 sm:p-8 mb-12">
          <p className="font-mono text-xs uppercase tracking-wider text-text-muted mb-2">Transparencia</p>
          <p className="text-sm sm:text-base text-text-dim leading-relaxed">
            Este caso demuestra cómo plantearía un encargo de este tipo: problema, alcance, decisiones, métricas y límites. No contiene resultados inventados, testimonios ni métricas atribuidas a una empresa real.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          <section className="card-glass rounded-2xl p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-wider text-accent mb-3">01 · Reto</p>
            <h2 className="font-display font-black text-2xl text-text mb-4">Qué habría que resolver</h2>
            <p className="text-text-dim leading-relaxed">{details.challenge}</p>
          </section>

          <section className="card-glass rounded-2xl p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-wider text-accent mb-3">02 · Enfoque</p>
            <h2 className="font-display font-black text-2xl text-text mb-4">Cómo lo plantearía</h2>
            <p className="text-text-dim leading-relaxed">{details.approach}</p>
          </section>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          <section className="card-glass rounded-2xl p-6">
            <p className="font-mono text-xs uppercase tracking-wider text-accent mb-4">03 · Entregables</p>
            <ul className="space-y-3">
              {details.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-text-dim leading-relaxed">
                  <CheckCircle size={15} className="text-accent-green mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="card-glass rounded-2xl p-6">
            <p className="font-mono text-xs uppercase tracking-wider text-accent mb-4">04 · Métricas objetivo</p>
            <ul className="space-y-3">
              {details.successMetrics.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-text-dim leading-relaxed">
                  <Target size={15} className="text-accent mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="card-glass rounded-2xl p-6">
            <p className="font-mono text-xs uppercase tracking-wider text-accent mb-4">05 · Límites</p>
            <ul className="space-y-3">
              {details.constraints.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-text-dim leading-relaxed">
                  <CircleAlert size={15} className="text-amber-300 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div
          className="rounded-2xl p-8 sm:p-10 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(0,212,255,0.05) 0%, rgba(124,58,237,0.08) 100%)',
            border: '1px solid rgba(0,212,255,0.15)',
          }}
        >
          <p className="font-mono text-xs uppercase tracking-wider text-accent mb-3">¿Tu negocio se parece a este escenario?</p>
          <h2 className="font-display font-black text-3xl text-text mb-4">
            El siguiente caso ya puede ser real.
          </h2>
          <p className="text-text-dim max-w-2xl mx-auto mb-6">
            Cuéntame el punto de partida y el resultado que necesitas. La propuesta se ajustará a tu contexto; no copiaré este concepto como una plantilla cerrada.
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
