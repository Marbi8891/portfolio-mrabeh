import { Download, FileText, ExternalLink } from 'lucide-react'

export default function CV() {
  return (
    <div className="pt-24 pb-20">
      <div className="section-container max-w-4xl">
        <div className="text-center mb-12">
          <p className="font-mono text-accent text-sm mb-3 tracking-widest">// curriculum vitae</p>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-text mb-4">
            Mrabeh Fathi <span className="gradient-text">Boussayff</span>
          </h1>
          <p className="text-text-dim mb-6">
            Desarrollador Web · Ciberseguridad · Automatización · IA
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/cv-mrabeh-fathi.pdf"
              download
              className="btn-primary"
            >
              <Download size={16} />
              Descargar CV (PDF)
            </a>
            <a
              href="https://linkedin.com/in/mrabehfathi"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <ExternalLink size={16} />
              Ver LinkedIn
            </a>
          </div>
        </div>

        {/* CV Preview card */}
        <div className="card-glass rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
            <FileText size={18} className="text-accent" />
            <span className="font-mono text-sm text-text-dim">cv-mrabeh-fathi.pdf</span>
          </div>

          {/* Quick summary */}
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <h3 className="font-display font-bold text-sm text-accent uppercase tracking-widest mb-4">
                Experiencia profesional
              </h3>
              <div className="space-y-3 text-sm text-text-dim">
                <div>
                  <p className="text-text font-medium">Proyecto NEOM–Trojena (OSSA), Arabia Saudí</p>
                  <p className="text-xs text-text-muted">Apoyo administrativo · Ene–Mar 2025</p>
                </div>
                <div>
                  <p className="text-text font-medium">Construcciones Sánchez Domínguez Sando</p>
                  <p className="text-xs text-text-muted">Apoyo administrativo · Oct–Dic 2023</p>
                </div>
                <div>
                  <p className="text-text font-medium">Ayuntamiento de Leganés</p>
                  <p className="text-xs text-text-muted">Gestión administrativa · Abr–Oct 2021</p>
                </div>
                <div>
                  <p className="text-text font-medium">Agencia Local de Empleo</p>
                  <p className="text-xs text-text-muted">Gestión administrativa · Dic 2017–Jun 2018</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-display font-bold text-sm text-accent uppercase tracking-widest mb-4">
                Formación y certificaciones
              </h3>
              <div className="space-y-3 text-sm text-text-dim">
                <div>
                  <p className="text-text font-medium">DAW + DAM</p>
                  <p className="text-xs text-text-muted">FP Aspasia, Leganés · En curso</p>
                </div>
                <div>
                  <p className="text-text font-medium">eJPT — Junior Penetration Tester</p>
                  <p className="text-xs text-text-muted">eLearnSecurity / INE · En progreso</p>
                </div>
                <div>
                  <p className="text-text font-medium">PCAP — Python Certified Associate</p>
                  <p className="text-xs text-text-muted">Python Institute · En progreso</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <h3 className="font-display font-bold text-sm text-accent uppercase tracking-widest mb-4">
              Proyectos destacados
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              {['NEXARO AI (SaaS Cybersecurity)', 'CLAW Framework (Auditoría Linux)', 'Golytics (ML Analytics)', 'Netseer (Network Analyzer)'].map((p) => (
                <div key={p} className="flex items-center gap-2 text-text-dim">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {p}
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-text-muted font-mono">
          El PDF completo incluye experiencia detallada, referencias y stack técnico.
        </p>
      </div>
    </div>
  )
}
