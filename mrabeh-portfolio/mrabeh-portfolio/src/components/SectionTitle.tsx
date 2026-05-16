interface SectionTitleProps {
  label?: string
  title: string
  highlight?: string
  description?: string
  centered?: boolean
}

export default function SectionTitle({
  label,
  title,
  highlight,
  description,
  centered = false,
}: SectionTitleProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      {label && (
        <p className="font-mono text-accent text-sm mb-3 uppercase tracking-widest">
          // {label}
        </p>
      )}
      <h2 className="font-display font-bold text-3xl sm:text-4xl text-text mb-4">
        {title}
        {highlight && (
          <>
            {' '}
            <span className="gradient-text">{highlight}</span>
          </>
        )}
      </h2>
      {description && (
        <p className={`text-text-dim leading-relaxed text-lg ${centered ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
          {description}
        </p>
      )}
    </div>
  )
}
