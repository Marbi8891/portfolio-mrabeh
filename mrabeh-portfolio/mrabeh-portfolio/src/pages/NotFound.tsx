import { Link } from 'react-router-dom'
import { ArrowLeft, Terminal } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <div className="text-center">
        <p className="font-mono text-accent text-sm mb-4">// error 404</p>
        <h1 className="font-display font-black text-8xl text-text mb-4 opacity-20">404</h1>
        <div className="card-glass rounded-xl p-6 max-w-sm mx-auto mb-8">
          <div className="flex items-center gap-2 mb-3 text-xs font-mono text-text-muted">
            <Terminal size={12} />
            mrabeh@nexaro:~$
          </div>
          <p className="font-mono text-sm text-text-dim">
            <span className="text-accent">$ </span>
            curl https://mrabehfathi.es<span className="text-red-400">/esta-ruta</span>
          </p>
          <p className="font-mono text-sm text-red-400 mt-2">Error: 404 Not Found</p>
          <p className="font-mono text-sm text-text-muted mt-1">Ruta no encontrada en el servidor.</p>
        </div>
        <Link to="/" className="btn-primary inline-flex">
          <ArrowLeft size={16} />
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
