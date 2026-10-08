import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle } from 'lucide-react'
import Seo from '@/components/Seo'

export default function ThankYou() {
  return (
    <div className="pt-28 pb-24 min-h-[75vh] flex items-center">
      <Seo
        title="Solicitud enviada"
        description="Confirmación de envío de una solicitud de proyecto a Mrabeh Fathi."
        path="/gracias"
      />

      <div className="section-container w-full">
        <div className="max-w-2xl mx-auto card-glass rounded-2xl p-8 sm:p-12 text-center">
          <div className="w-14 h-14 rounded-full bg-accent-green/10 border border-accent-green/25 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={28} className="text-accent-green" />
          </div>

          <p className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
            Solicitud enviada
          </p>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-text mb-4">
            Ya tengo el contexto inicial.
          </h1>
          <p className="text-text-dim leading-relaxed mb-8">
            Revisaré lo que necesitas y, si el proyecto encaja con lo que puedo ejecutar bien, la siguiente respuesta irá orientada a alcance, entregables y próximos pasos.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/proyectos" className="btn-primary">
              Ver trabajo
              <ArrowRight size={16} />
            </Link>
            <Link to="/" className="btn-outline">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
