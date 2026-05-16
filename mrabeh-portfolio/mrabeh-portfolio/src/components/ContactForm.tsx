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
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setStatus('sending')

    // Formspree integration (replace YOUR_FORM_ID with actual id)
    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', company: '', reason: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text placeholder-text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-200 font-mono'

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono text-text-muted mb-2 uppercase tracking-wider">
            Nombre *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Tu nombre completo"
            className={inputClass}
            required
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-text-muted mb-2 uppercase tracking-wider">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu@empresa.com"
            className={inputClass}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono text-text-muted mb-2 uppercase tracking-wider">
            Empresa
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Nombre de la empresa"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-text-muted mb-2 uppercase tracking-wider">
            Motivo *
          </label>
          <select
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className={inputClass}
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
        <label className="block text-xs font-mono text-text-muted mb-2 uppercase tracking-wider">
          Mensaje *
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Cuéntame en qué puedo ayudarte..."
          rows={5}
          className={inputClass}
          required
        />
      </div>

      {/* Status messages */}
      {status === 'success' && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-accent-green/10 border border-accent-green/20 text-accent-green text-sm">
          <CheckCircle size={16} />
          Mensaje enviado correctamente. Me pondré en contacto contigo pronto.
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          <AlertCircle size={16} />
          Error al enviar. Escríbeme directamente a mrabehfathiprofesional@gmail.com
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={status === 'sending'}
        className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? (
          <>
            <span className="animate-spin w-4 h-4 border-2 border-background border-t-transparent rounded-full" />
            Enviando...
          </>
        ) : (
          <>
            <Send size={16} />
            Enviar mensaje
          </>
        )}
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
    </div>
  )
}
