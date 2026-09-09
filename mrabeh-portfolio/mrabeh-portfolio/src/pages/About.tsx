import SectionTitle from '@/components/SectionTitle'
import Timeline from '@/components/Timeline'
import SkillBadge from '@/components/SkillBadge'
import Seo from '@/components/Seo'
import { skillCategories } from '@/data/skills'
import { timeline } from '@/data/experience'
import { GraduationCap, Award } from 'lucide-react'

const certifications = [
  { name: 'eJPT – Junior Penetration Tester', org: 'eLearnSecurity / INE', status: 'En progreso', color: '#00d4ff' },
  { name: 'PCAP – Python Certified Associate', org: 'Python Institute', status: 'En progreso', color: '#7c3aed' },
  { name: 'Desarrollo de Aplicaciones Web (DAW)', org: 'FP Aspasia, Leganés', status: 'En curso', color: '#00ff88' },
  { name: 'Desarrollo de Aplicaciones Multiplataforma (DAM)', org: 'FP Aspasia, Leganés', status: 'En curso', color: '#00ff88' },
]

export default function About() {
  return (
    <div className="pt-24 pb-20">
      <Seo
        title="Sobre mí"
        description="Perfil de Mrabeh Fathi: administración pública y privada, transición hacia desarrollo web y ciberseguridad, formación DAW/DAM en curso."
        path="/sobre-mi"
      />
      <div className="section-container">
        {/* Header */}
        <SectionTitle
          as="h1"
          label="sobre mí"
          title="Perfil"
          highlight="híbrido"
          description="Administración + Tecnología + Ciberseguridad. Un perfil que entiende los procesos, construye soluciones y está aprendiendo a proteger los sistemas."
        />

        {/* Bio */}
        <div className="grid lg:grid-cols-3 gap-12 mb-20">
          <div className="lg:col-span-2 space-y-4 text-text-dim leading-relaxed">
            <p>
              Soy <strong className="text-text">Mrabeh Fathi Boussayff</strong>, un profesional en transición
              hacia la tecnología con una base sólida en administración pública y privada.
              Trabajo desde Madrid / Leganés y construyo soluciones digitales reales orientadas a
              empresas que necesitan eficiencia, seguridad y modernización.
            </p>
            <p>
              Mi trayectoria combina experiencia en gestión administrativa (Ayuntamiento
              de Leganés, Fundación COCEMFE, Construcciones Sando, Agencia Local de Empleo, y
              apoyo administrativo en el proyecto NEOM–Trojena en Arabia Saudí) con formación técnica
              intensiva en <strong className="text-text">DAW/DAM</strong>, preparación
              de <strong className="text-text">ciberseguridad</strong> (eJPT, PCAP) y NEXARO
              como primer proyecto propio.
            </p>
            <p>
              Lo que me diferencia: entiendo los procesos de negocio desde dentro. Sé qué
              necesita una empresa y puedo traducirlo en soluciones técnicas concretas, no
              en promesas vagas.
            </p>
            <p>
              Actualmente construyendo <strong className="text-text">NEXARO TECH, S.L.</strong>,
              empresa de ciberseguridad y desarrollo web con denominación reservada en el
              Registro Mercantil Central.
            </p>
          </div>

          <div className="space-y-4">
            <div className="card-glass rounded-xl p-5">
              <h3 className="font-display font-semibold text-sm text-text mb-4 uppercase tracking-wider">
                Datos clave
              </h3>
              <div className="space-y-3 font-mono text-sm">
                {[
                  ['Ubicación', 'Madrid / Leganés'],
                  ['Email', 'mrabehfathiprofesional@gmail.com'],
                  ['LinkedIn', 'mrabehfathi'],
                  ['Idiomas', 'ES · AR nativos · EN avanzado (TOEIC 950)'],
                  ['Disponibilidad', 'Inmediata'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-2">
                    <span className="text-text-muted flex-shrink-0">{k}</span>
                    <span className="text-text-dim text-right min-w-0 break-words">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-20">
          <SectionTitle label="skills" title="Stack" highlight="tecnológico" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((cat) => (
              <div key={cat.category}>
                <h3 className="font-display font-semibold text-xs text-accent uppercase tracking-widest mb-4 font-mono">
                  {cat.category}
                </h3>
                <div className="space-y-2">
                  {cat.skills.map((skill) => (
                    <SkillBadge key={skill.name} name={skill.name} level={skill.level} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-20">
          <SectionTitle label="formación" title="Certificaciones" highlight="y estudios" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="card-glass rounded-xl p-5 flex items-start gap-4"
                style={{ borderColor: `${cert.color}15` }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${cert.color}12`, border: `1px solid ${cert.color}25` }}
                >
                  {cert.status.includes('progreso') || cert.status === 'Activo' ? (
                    <GraduationCap size={18} style={{ color: cert.color }} />
                  ) : (
                    <Award size={18} style={{ color: cert.color }} />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-display font-semibold text-sm text-text mb-1">{cert.name}</h4>
                  <p className="text-xs text-text-muted mb-2">{cert.org}</p>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-mono"
                    style={{ background: `${cert.color}10`, color: cert.color, border: `1px solid ${cert.color}25` }}
                  >
                    {cert.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <SectionTitle label="trayectoria" title="Línea" highlight="temporal" />
          <Timeline items={timeline} />
        </div>
      </div>
    </div>
  )
}
