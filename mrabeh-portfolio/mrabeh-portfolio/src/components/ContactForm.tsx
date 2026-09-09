import { useState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

interface FormData {
  name: string
  email: string
  company: string
  reason: string
  message: string
}

const reasons = [
  'Oferta de trabajo',
  'Colaboración técnica',
  'Consultoría / diagnóstico',
  'Proyecto freelance',
  'Otro',
]

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    reason: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.reason || !formData.message) {
      setStatus('error')
      return
    }

    // TODO: switch to a Formspree endpoint (or similar) once a real form ID exists.
    // Until then, submitting opens the visitor's email client with the message
    // pre-filled, so the form is always functional rather than silently failing.
    const subject = encodeURIComponent(`[Portfolio] ${formData.reason} — ${formData.name}`)
    const body = encodeURIComponent(
      `Nombre: ${formData.name}\nEmail: ${formData.email}\nEmpresa: ${formData.company || '—'}\nMotivo: ${formData.reason}\n\n${formData.message}`
    )
    window.location.href = `mailto:mrabehfathiprofesional@gmail.com?subject=${subject}&body=${body}`
    setStatus('success')
  }

  const inputClass =
    'w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text placeholder-text-muted focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/40 transition-all duration-200 font-mono'
  const labelClass = 'block text-xs font-mono text-text-muted mb-2 uppercase tracking-wider'

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-name" className={labelClass}>
            Nombre *
          </label>
          <input
            id="cf-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Tu nombre completo"
            className={inputClass}
            aria-required="true"
            required
          />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelClass}>
            Email *
          </label>
          <input
            id="cf-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu@empresa.com"
            className={inputClass}
            aria-required="true"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-company" className={labelClass}>
            Empresa
          </label>
          <input
            id="cf-company"
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Nombre de la empresa"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="cf-reason" className={labelClass}>
            Motivo *
          </label>
          <select
            id="cf-reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className={inputClass}
            aria-required="true"
            required
          >
            <option value="" disabled>
              Selecciona un motivo
            </option>
            {reasons.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className={labelClass}>
          Mensaje *
        </label>
        <textarea
          id="cf-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Cuéntame en qué puedo ayudarte..."
          rows={5}
          className={inputClass}
          aria-required="true"
          required
        />
      </div>

      {/* Status messages */}
      <div aria-live="polite">
        {status === 'success' && (
          <div className="flex items-center gap-3 p-4 rounded-lg bg-accent-green/10 border border-accent-green/20 text-accent-green text-sm">
            <CheckCircle size={16} />
            Se ha abierto tu cliente de correo con el mensaje listo para enviar. Si no se abre, escríbeme directamente a mrabehfathiprofesional@gmail.com.
          </div>
        )}
        {status === 'error' && (
          <div className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            <AlertCircle size={16} />
            Completa los campos obligatorios (*), o escríbeme directamente a mrabehfathiprofesional@gmail.com
          </div>
        )}
      </div>

      <button type="submit" className="btn-primary w-full justify-center">
        <Send size={16} />
        Enviar mensaje
      </button>

      <p className="text-xs text-text-muted text-center">
        También puedes escribirme directamente a{' '}
        <a
          href="mailto:mrabehfathiprofesional@gmail.com"
          className="text-accent hover:underline"
        >
          mrabehfathiprofesional@gmail.com
        </a>
      </p>
    </form>
  )
}
