interface SkillBadgeProps {
  name: string
  level?: number
}

export default function SkillBadge({ name, level }: SkillBadgeProps) {
  return (
    <div className="group flex items-center justify-between gap-3 px-4 py-3 rounded-lg bg-surface border border-border hover:border-accent/20 transition-all duration-200">
      <span className="text-sm font-mono text-text-dim group-hover:text-text transition-colors">
        {name}
      </span>
      {level && (
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                i < level ? 'bg-accent' : 'bg-border'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
