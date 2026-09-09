import type { SkillLevel } from '@/data/skills'

interface SkillBadgeProps {
  name: string
  level?: SkillLevel
}

const levelColor: Record<SkillLevel, string> = {
  'Avanzado': '#00ff88',
  'Intermedio': '#00d4ff',
  'Básico': '#7c3aed',
  'En aprendizaje': '#f59e0b',
}

export default function SkillBadge({ name, level }: SkillBadgeProps) {
  return (
    <div className="group flex items-center justify-between gap-3 px-4 py-3 rounded-lg bg-surface border border-border hover:border-accent/20 transition-all duration-200">
      <span className="text-sm font-mono text-text-dim group-hover:text-text transition-colors">
        {name}
      </span>
      {level && (
        <span
          className="text-xs font-mono px-2 py-0.5 rounded-full flex-shrink-0"
          style={{
            color: levelColor[level],
            background: `${levelColor[level]}12`,
            border: `1px solid ${levelColor[level]}30`,
          }}
        >
          {level}
        </span>
      )}
    </div>
  )
}
