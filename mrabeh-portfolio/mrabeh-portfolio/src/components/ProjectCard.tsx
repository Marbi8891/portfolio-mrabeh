import { ArrowUpRight, Github, ExternalLink, Shield, Terminal, BarChart3, Network, Brain, Lock, Calculator, type LucideProps } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Project } from '@/data/projects'
import type { ForwardRefExoticComponent, RefAttributes } from 'react'

type LucideIcon = ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>

const iconMap: Record<string, LucideIcon> = {
  Shield,
  Terminal,
  BarChart3,
  Network,
  Brain,
  Lock,
  Calculator,
}

const statusLabel: Record<string, string> = {
  active: 'Activo',
  development: 'En desarrollo',
  completed: 'Completado',
}

const statusColor: Record<string, string> = {
  active: '#00ff88',
  development: '#f59e0b',
  completed: '#7c3aed',
}

interface ProjectCardProps {
  project: Project
  featured?: boolean
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const Icon = iconMap[project.icon] || Shield

  return (
    <div
      className={`group relative card-glass rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 ${
        featured ? 'glow-accent' : ''
      }`}
      style={{
        borderColor: `${project.color}15`,
      }}
    >
      {/* Featured badge */}
      {featured && (
        <div
          className="absolute top-4 right-4 text-xs font-mono px-2 py-0.5 rounded-full"
          style={{
            background: `${project.color}15`,
            border: `1px solid ${project.color}30`,
            color: project.color,
          }}
        >
          Destacado
        </div>
      )}

      {/* Icon */}
      <div
        className="w-11 h-11 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
        style={{
          background: `${project.color}12`,
          border: `1px solid ${project.color}25`,
        }}
      >
        <Icon size={22} className="transition-colors" style={{ color: project.color } as React.CSSProperties} />
      </div>

      {/* Content */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-display font-bold text-lg text-text">{project.title}</h3>
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: statusColor[project.status] }}
            title={statusLabel[project.status]}
          />
        </div>
        <p className="text-sm text-text-dim mb-3">{project.subtitle}</p>
        <p className="text-sm text-text-muted leading-relaxed line-clamp-3">{project.description}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
        {project.tags.length > 4 && (
          <span className="tag">+{project.tags.length - 4}</span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <span
          className="text-xs font-mono"
          style={{ color: statusColor[project.status] }}
        >
          ● {statusLabel[project.status]}
        </span>
        <div className="flex items-center gap-3">
          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Repositorio de ${project.title} en GitHub`}
              className="text-text-dim hover:text-accent transition-colors"
            >
              <Github size={16} />
            </a>
          )}
          {project.links?.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Demo de ${project.title}`}
              className="text-text-dim hover:text-accent transition-colors"
            >
              <ExternalLink size={16} />
            </a>
          )}
          <Link
            to={`/proyectos`}
            className="flex items-center gap-1 text-sm text-text-dim hover:text-accent transition-colors group/link"
            style={{ color: project.color }}
          >
            <span className="text-xs font-mono">ver_más</span>
            <ArrowUpRight size={14} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
