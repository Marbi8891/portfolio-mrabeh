import { useState } from 'react'
import { AlertCircle, LoaderCircle, Send } from 'lucide-react'

interface FormData {
  name: string
  email: string
  company: string
  service: string
  budget: string
  timeline: string
  message: string
  website: string
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

const initialFormData: FormData = {
  name: '',
  email: '',
  company: '',
  service: '',
  budget: '',
  timeline: '',
  message: '',
  website: '',
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((previous) => ({ ...previous, [event.target.name]: event.target.value }))
    if (status === 'error') {
      setStatus('idle')
      setErrorMessage('')
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!formData.name || !formData.email || !formData.service || !formData.message) {
      setStatus('error')
      setErrorMessage('Completa nombre, email, servicio y descripción del proyecto.')
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null
        throw new Error(payload?.error || 'No se ha podido enviar la solicitud.')
      }

      window.location.assign('/gracias')
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'No se ha podido enviar la solicitud. Inténtalo de nuevo o escríbeme por email.'
      )
    }
  }

  const inputClass =
    'w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text placeholder-text-muted focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/40 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed'
  const labelClass = 'block text-xs font-mono text-text-muted mb-2 uppercase tracking-wider'
  const submitting = status === 'submitting'

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
            disabled={submitting}
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
            disabled={submitting}
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
          disabled={submitting}
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
          disabled={submitting}
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
            disabled={submitting}
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
            disabled={submitting}
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
          disabled={submitting}
          required
        />
      </div>

      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="cf-website">No rellenar este campo</label>
        <input
          id="cf-website"
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div aria-live="polite">
        {status === 'error' && (
          <div className="flex items-start gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
            <div>
              <p>{errorMessage}</p>
              <a
                href="mailto:mrabehfathiprofesional@gmail.com"
                className="inline-block mt-1 text-accent hover:underline"
              >
                Escribir por email
              </a>
            </div>
          </div>
        )}
      </div>

      <button type="submit" className="btn-primary w-full justify-center" disabled={submitting}>
        {submitting ? <LoaderCircle size={16} className="animate-spin" /> : <Send size={16} />}
        {submitting ? 'Enviando solicitud…' : 'Solicitar propuesta'}
      </button>

      <p className="text-xs text-text-muted text-center leading-relaxed">
        Tus datos se utilizan únicamente para responder a esta solicitud. También puedes escribir directamente a{' '}
        <a href="mailto:mrabehfathiprofesional@gmail.com" className="text-accent hover:underline">
          mrabehfathiprofesional@gmail.com
        </a>.
      </p>
    </form>
  )
}
