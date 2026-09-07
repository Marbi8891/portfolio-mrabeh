import { useState } from 'react'
import SectionTitle from '@/components/SectionTitle'
import ProjectCard from '@/components/ProjectCard'
import { projects } from '@/data/projects'
import type { Project } from '@/data/projects'

const categories = [
  { key: 'all', label: 'Todos' },
  { key: 'cybersecurity', label: 'Ciberseguridad' },
  { key: 'web', label: 'Web / SaaS' },
  { key: 'data', label: 'Datos' },
  { key: 'ai', label: 'IA' },
  { key: 'automation', label: 'Automatización' },
]

export default function Projects() {
  const [filter, setFilter] = useState<string>('all')

  const filtered: Project[] =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  return (
    <div className="pt-24 pb-20">
      <div className="section-container">
        <SectionTitle
          label="portfolio"
          title="Proyectos"
          highlight="reales"
          description="Proyectos propios en distintas fases: diseño, construcción y aprendizaje. Cada tarjeta indica su estado real."
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`px-4 py-2 rounded-lg text-sm font-mono transition-all duration-200 ${
                filter === cat.key
                  ? 'bg-accent text-background font-bold'
                  : 'bg-surface border border-border text-text-dim hover:border-accent/30 hover:text-text'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
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
