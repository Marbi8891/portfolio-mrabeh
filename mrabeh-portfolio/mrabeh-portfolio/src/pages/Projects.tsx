import { useState } from 'react'
import ProjectCard from '@/components/ProjectCard'
import SectionTitle from '@/components/SectionTitle'
import Seo from '@/components/Seo'
import { projects } from '@/data/projects'
import type { Project } from '@/data/projects'

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

  const filtered: Project[] =
    filter === 'all' ? projects : projects.filter((project) => project.category === filter)

  return (
    <div className="pt-24 pb-20">
      <Seo
        title="Trabajo y casos de estudio | Mrabeh Fathi"
        description="Casos y proyectos de desarrollo web, automatización y seguridad con contexto, decisiones técnicas y evidencia verificable cuando está disponible."
        path="/proyectos"
      />

      <div className="section-container">
        <SectionTitle
          as="h1"
          label="trabajo"
          title="Casos y proyectos"
          highlight="con contexto"
          description="No todos los proyectos están en la misma fase. Aquí separo lo construido, lo que está en desarrollo y lo que sirve como trabajo técnico de aprendizaje. Cuando existe evidencia pública, la enlazo."
        />

        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {[
            ['Problema', 'Qué necesidad o reto intenta resolver cada proyecto.'],
            ['Decisiones', 'Cómo planteo arquitectura, seguridad, pruebas y límites.'],
            ['Evidencia', 'Repositorios, tests, demos o casos detallados cuando existen.'],
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
