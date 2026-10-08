import { useState } from 'react'
import ProjectCard from '@/components/ProjectCard'
import SectionTitle from '@/components/SectionTitle'
import Seo from '@/components/Seo'
import { projects } from '@/data/projects'
import { commercialCases } from '@/data/commercialCases'
import type { Project } from '@/data/projects'
import type { CommercialCaseProject } from '@/data/commercialCases'

type PortfolioProject = Project | CommercialCaseProject

const categories = [
  { key: 'all', label: 'Todo' },
  { key: 'web', label: 'Web / SaaS' },
  { key: 'automation', label: 'Automatización' },
  { key: 'cybersecurity', label: 'Seguridad' },
  { key: 'data', label: 'Datos' },
  { key: 'ai', label: 'IA' },
]

export default function Projects() {
  const [filter, setFilter] = useState<string>('all')
  const allProjects: PortfolioProject[] = [...commercialCases, ...projects]

  const filtered: PortfolioProject[] =
    filter === 'all' ? allProjects : allProjects.filter((project) => project.category === filter)

  return (
    <div className="pt-24 pb-20">
      <Seo
        title="Trabajo y casos de estudio | Mrabeh Fathi"
        description="Casos comerciales conceptuales y proyectos técnicos de desarrollo web, automatización y seguridad, diferenciados con total transparencia."
        path="/proyectos"
      />

      <div className="section-container">
        <SectionTitle
          as="h1"
          label="trabajo"
          title="Casos y proyectos"
          highlight="con contexto"
          description="Los primeros casos son propuestas comerciales conceptuales para mostrar cómo abordaría problemas de negocio concretos. Están identificados como tales. Después encontrarás proyectos técnicos construidos o en desarrollo."
        />

        <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-5 mb-8">
          <p className="font-mono text-xs uppercase tracking-wider text-amber-200 mb-2">Transparencia primero</p>
          <p className="text-sm text-text-dim leading-relaxed">
            Un caso marcado como “conceptual” no es un cliente ni contiene resultados reales. Sirve para enseñar criterio de producto, alcance, accesibilidad, seguridad y métricas antes de tener casos comerciales publicables.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {[
            ['Problema', 'Qué necesidad o reto intenta resolver cada proyecto.'],
            ['Decisiones', 'Cómo planteo arquitectura, seguridad, experiencia y límites.'],
            ['Evidencia', 'Repositorios y tests en proyectos reales; disclosure explícito en los conceptuales.'],
          ].map(([title, description]) => (
            <div key={title} className="rounded-xl border border-border bg-surface/30 p-5">
              <h2 className="font-display font-bold text-text mb-2">{title}</h2>
              <p className="text-sm text-text-muted leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-10" aria-label="Filtrar proyectos por categoría">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setFilter(category.key)}
              aria-pressed={filter === category.key}
              className={`px-4 py-2 rounded-lg text-sm font-mono transition-all duration-200 ${
                filter === category.key
                  ? 'bg-accent text-background font-bold'
                  : 'bg-surface border border-border text-text-dim hover:border-accent/30 hover:text-text'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} featured={project.featured} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-text-muted font-mono">
            No hay proyectos en esta categoría todavía.
          </div>
        )}
      </div>
    </div>
  )
}
