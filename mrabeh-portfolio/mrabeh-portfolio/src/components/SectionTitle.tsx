interface SectionTitleProps {
  label?: string
  title: string
  highlight?: string
  description?: string
  centered?: boolean
  /** Semantic heading level. Each page should have exactly one h1. Defaults to h2. */
  as?: 'h1' | 'h2'
}

export default function SectionTitle({
  label,
  title,
  highlight,
  description,
  centered = false,
  as = 'h2',
}: SectionTitleProps) {
  const Heading = as
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      {label && (
        <p className="font-mono text-accent text-sm mb-3 uppercase tracking-widest">
          // {label}
        </p>
      )}
      <Heading className="font-display font-bold text-3xl sm:text-4xl text-text mb-4">
        {title}
        {highlight && (
          <>
            {' '}
            <span className="gradient-text">{highlight}</span>
          </>
        )}
      </Heading>
      {description && (
        <p className={`text-text-dim leading-relaxed text-lg ${centered ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
          {description}
        </p>
      )}
    </div>
  )
}
