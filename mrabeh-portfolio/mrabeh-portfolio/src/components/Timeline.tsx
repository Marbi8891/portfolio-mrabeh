import type { TimelineItem } from '@/data/experience'

const typeColor: Record<string, string> = {
  work: '#00d4ff',
  education: '#7c3aed',
  project: '#00ff88',
  milestone: '#f59e0b',
}

const typeLabel: Record<string, string> = {
  work: 'Trabajo',
  education: 'Formación',
  project: 'Proyecto',
  milestone: 'Hito',
}

interface TimelineProps {
  items: TimelineItem[]
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-accent-2/30 to-transparent" />

      <div className="space-y-8">
        {items.map((item, index) => (
          <div key={index} className="relative flex gap-6">
            {/* Dot */}
            <div className="relative z-10 flex-shrink-0">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-mono font-bold"
                style={{
                  background: `${typeColor[item.type]}10`,
                  border: `2px solid ${typeColor[item.type]}40`,
                  color: typeColor[item.type],
                }}
              >
                {item.year.slice(-2)}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 pb-2">
              <div className="flex flex-wrap items-start gap-2 mb-2">
                <h3 className="font-display font-bold text-base text-text">{item.title}</h3>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-mono"
                  style={{
                    background: `${typeColor[item.type]}10`,
                    border: `1px solid ${typeColor[item.type]}25`,
                    color: typeColor[item.type],
                  }}
                >
                  {typeLabel[item.type]}
                </span>
              </div>
              <p className="text-sm text-accent mb-1 font-mono">{item.year}</p>
              <p className="text-sm text-text-dim mb-2">{item.subtitle}</p>
              <p className="text-sm text-text-muted leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
