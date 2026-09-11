import { useState } from 'react'
import { AlertCircle, CheckCircle, Send } from 'lucide-react'

interface FormData {
  name: string
  email: string
  company: string
  service: string
  budget: string
  timeline: string
  message: string
}

const services = [
  'Web profesional / landing page',
  'Aplicación web / herramienta interna',
  'Automatización de procesos',
  'Web Security Review',
  'Mantenimiento / mejora de una web existente',
  'Otro',
]

const budgets = [
  'Menos de 1.000 €',
  '1.000–2.500 €',
  '2.500–5.000 €',
  'Más de 5.000 €',
  'Aún no lo sé',
]

const timelines = [
  'Lo antes posible',
  'Durante este mes',
  'En 1–3 meses',
  'Más adelante',
  'Solo estoy valorando opciones',
]

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    timeline: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((previous) => ({ ...previous, [event.target.name]: event.target.value }))
    if (status !== 'idle') setStatus('idle')
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!formData.name || !formData.email || !formData.service || !formData.message) {
      setStatus('error')
      return
    }

    const subject = encodeURIComponent(`[Propuesta] ${formData.service} — ${formData.name}`)
    const body = encodeURIComponent(
      [
        `Nombre: ${formData.name}`,
        `Email: ${formData.email}`,
        `Empresa: ${formData.company || '—'}`,
        `Servicio: ${formData.service}`,
        `Presupuesto orientativo: ${formData.budget || 'No indicado'}`,
        `Plazo: ${formData.timeline || 'No indicado'}`,
        '',
        'Proyecto / necesidad:',
        formData.message,
      ].join('\n')
    )

    window.location.href = `mailto:mrabehfathiprofesional@gmail.com?subject=${subject}&body=${body}`
    setStatus('success')
  }

  const inputClass =
    'w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text placeholder-text-muted focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/40 transition-all duration-200'
  const labelClass = 'block text-xs font-mono text-text-muted mb-2 uppercase tracking-wider'

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-name" className={labelClass}>Nombre *</label>
          <input
            id="cf-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Tu nombre"
            className={inputClass}
            autoComplete="name"
            required
          />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelClass}>Email *</label>
          <input
            id="cf-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu@empresa.com"
            className={inputClass}
            autoComplete="email"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-company" className={labelClass}>Empresa / proyecto</label>
        <input
          id="cf-company"
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Nombre de la empresa o proyecto"
          className={inputClass}
          autoComplete="organization"
        />
      </div>

      <div>
        <label htmlFor="cf-service" className={labelClass}>¿Qué necesitas? *</label>
        <select
          id="cf-service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className={inputClass}
          required
        >
          <option value="" disabled>Selecciona un servicio</option>
          {services.map((service) => (
            <option key={service} value={service}>{service}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-budget" className={labelClass}>Presupuesto orientativo</label>
          <select
            id="cf-budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Selecciona una opción</option>
            {budgets.map((budget) => (
              <option key={budget} value={budget}>{budget}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="cf-timeline" className={labelClass}>Plazo aproximado</label>
          <select
            id="cf-timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Selecciona una opción</option>
            {timelines.map((timeline) => (
              <option key={timeline} value={timeline}>{timeline}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className={labelClass}>Cuéntame el proyecto *</label>
        <textarea
          id="cf-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Qué quieres conseguir, qué tienes ahora y qué problema quieres resolver..."
          rows={6}
          className={inputClass}
          required
        />
      </div>

      <div aria-live="polite">
        {status === 'success' && (
          <div className="flex items-start gap-3 p-4 rounded-lg bg-accent-green/10 border border-accent-green/20 text-accent-green text-sm">
            <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
            Se ha preparado el mensaje en tu aplicación de correo. Revisa los datos y pulsa enviar para completar la solicitud.
          </div>
        )}
        {status === 'error' && (
          <div className="flex items-start gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
            Completa nombre, email, servicio y descripción del proyecto.
          </div>
        )}
      </div>

      <button type="submit" className="btn-primary w-full justify-center">
        <Send size={16} />
        Solicitar propuesta
      </button>

      <p className="text-xs text-text-muted text-center leading-relaxed">
        Al enviar se abrirá tu aplicación de correo con la solicitud preparada. También puedes escribir directamente a{' '}
        <a href="mailto:mrabehfathiprofesional@gmail.com" className="text-accent hover:underline">
          mrabehfathiprofesional@gmail.com
        </a>.
      </p>
    </form>
  )
}
