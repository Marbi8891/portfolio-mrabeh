import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Download, ChevronDown,
  Code2, Shield, Zap, Brain, BarChart2, Monitor,
  Database, Lock, Terminal
} from 'lucide-react'
import SectionTitle from '@/components/SectionTitle'
import ProjectCard from '@/components/ProjectCard'
import { projects } from '@/data/projects'
import { techStack } from '@/data/skills'

// Typed text effect
function TypedText({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = words[index % words.length]
    const speed = isDeleting ? 50 : 100

    const timeout = setTimeout(() => {
      if (!isDeleting && text === current) {
        setTimeout(() => setIsDeleting(true), 2000)
        return
      }
      if (isDeleting && text === '') {
        setIsDeleting(false)
        setIndex((prev) => (prev + 1) % words.length)
        return
      }
      setText((prev) =>
        isDeleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
      )
    }, speed)

    return () => clearTimeout(timeout)
  }, [text, isDeleting, index, words])

  return (
    <span className="gradient-text">
      {text}
      <span className="animate-blink text-accent">|</span>
    </span>
  )
}

const specializations = [
  {
    icon: Code2,
    title: 'Desarrollo Web',
    description: 'React, FastAPI, TypeScript. Aplicaciones web modernas, escalables y orientadas a producción.',
    color: '#00d4ff',
  },
  {
    icon: Shield,
    title: 'Ciberseguridad',
    description: 'Blue Team, análisis de vulnerabilidades OWASP, auditoría Linux y seguridad ofensiva junior.',
    color: '#00ff88',
  },
  {
    icon: Lock,
    title: 'GRC y Cumplimiento',
    description: 'Gestión de riesgos, políticas de seguridad y marcos de cumplimiento normativo.',
    color: '#f59e0b',
  },
  {
    icon: Zap,
    title: 'Automatización',
    description: 'Scripts, pipelines y sistemas que eliminan tareas repetitivas y maximizan eficiencia.',
    color: '#7c3aed',
  },
  {
    icon: Brain,
    title: 'IA Aplicada',
    description: 'Integración de IA generativa, LLMs y automatización inteligente en soluciones reales.',
    color: '#00d4ff',
  },
  {
    icon: BarChart2,
    title: 'Análisis de Datos',
    description: 'Power BI, Python y dashboards interactivos para transformar datos en decisiones.',
    color: '#00ff88',
  },
  {
    icon: Monitor,
    title: 'Administración Digital',
    description: 'Digitalización de procesos administrativos, documentación técnica y soporte IT.',
    color: '#7c3aed',
  },
  {
    icon: Database,
    title: 'Soporte IT',
    description: 'Configuración de entornos, servidores Linux, redes y soporte técnico empresarial.',
    color: '#f59e0b',
  },
]

const stats = [
  { label: 'Formación', value: 'DAW/DAM' },
  { label: 'Certificación', value: 'eJPT (en progreso)' },
  { label: 'Certificación', value: 'PCAP (en progreso)' },
  { label: 'Ubicación', value: 'Madrid' },
]

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)

  return (
    <>
      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at 20% 50%, #0d1f3c 0%, #080c14 60%)',
        }}
      >
        {/* Grid background */}
        <div className="absolute inset-0 grid-bg opacity-100" />

        {/* Glow orb */}
        <div
          className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full opacity-8 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }}
        />

        {/* Scan line */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute w-full h-0.5 animate-scan-line"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.05) 20%, rgba(0,212,255,0.1) 50%, rgba(0,212,255,0.05) 80%, transparent 100%)',
            }}
          />
        </div>

        <div className="section-container relative z-10 pt-24 pb-16">
          <div className="max-w-4xl">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-accent/5 border border-accent/15">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
              <span className="text-xs font-mono text-text-dim">
                Disponible para nuevas oportunidades · Madrid, España
              </span>
            </div>

            {/* Name */}
            <p className="font-mono text-sm text-accent mb-2 tracking-widest">
              $ whoami
            </p>
            <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-text mb-4 leading-none tracking-tight">
              Mrabeh Fathi<br />
              <span className="text-accent">Boussayff</span>
            </h1>

            {/* Typed subtitle */}
            <div className="text-xl sm:text-2xl font-display font-semibold mb-6 h-8">
              <TypedText
                words={[
                  'Desarrollador Web en formación',
                  'Ciberseguridad en progreso (eJPT)',
                  'Automatización con Python',
                ]}
              />
            </div>

            <p className="text-text-dim text-lg leading-relaxed mb-8 max-w-2xl">
              Vengo de años gestionando procesos administrativos en el sector público y privado.
              Hoy estoy en transición activa hacia{' '}
              <span className="text-text">desarrollo web</span> y{' '}
              <span className="text-text">ciberseguridad</span>, formándome en DAW/DAM y
              preparando eJPT, y construyendo NEXARO como mi primer proyecto propio serio.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link to="/proyectos" className="btn-primary">
                Ver proyectos
                <ArrowRight size={16} />
              </Link>
              <Link to="/contacto" className="btn-outline">
                Contactar
              </Link>
              <a
                href="/cv-mrabeh-fathi.pdf"
                download
                className="btn-outline"
              >
                <Download size={16} />
                Descargar CV
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <p className="font-display font-black text-2xl text-accent">{stat.value}</p>
                  <p className="text-xs text-text-muted font-mono">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted">
          <span className="text-xs font-mono">scroll</span>
          <ChevronDown size={16} className="animate-bounce" />
        </div>
      </section>

      {/* ─── TECH TICKER ─── */}
      <section className="border-y border-border py-4 overflow-hidden bg-surface/40">
        <div className="flex animate-[marquee_25s_linear_infinite] whitespace-nowrap">
          {[...techStack, ...techStack].map((tech, i) => (
            <span key={i} className="flex items-center gap-6 px-6">
              <span className="font-mono text-sm text-text-muted">{tech}</span>
              <span className="text-accent/30">·</span>
            </span>
          ))}
        </div>
      </section>

      {/* ─── ABOUT BRIEF ─── */}
      <section className="py-20 bg-surface/20">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle
                label="sobre mí"
                title="Tecnología con"
                highlight="visión real"
                description="No soy solo desarrollador. Entiendo el negocio, conozco los procesos y construyo soluciones que funcionan en producción."
              />
              <div className="space-y-4 text-text-dim">
                <p>
                  Vengo de años gestionando procesos administrativos en el sector público y privado.
                  Esa base me da algo que pocos perfiles técnicos tienen: entender qué necesita
                  realmente una empresa, no solo qué puede hacer el código.
                </p>
                <p>
                  Hoy combino esa experiencia con formación en <span className="text-text font-medium">DAW/DAM</span>,
                  preparación de <span className="text-text font-medium">ciberseguridad</span>{' '}
                  (eJPT en progreso), y NEXARO como primer proyecto propio en construcción.
                </p>
              </div>
              <div className="mt-6">
                <Link to="/sobre-mi" className="btn-outline inline-flex">
                  Conocer más
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Terminal card */}
            <div className="card-glass rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface/50">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-2 text-xs font-mono text-text-muted">mrabeh@nexaro:~$</span>
              </div>
              <div className="p-6 font-mono text-sm space-y-2">
                <p><span className="text-accent">$</span> <span className="text-text-dim">cat profile.json</span></p>
                <div className="text-text-muted leading-relaxed">
                  <p>{'{'}</p>
                  <p className="pl-4"><span className="text-accent-green">"nombre"</span>: <span className="text-yellow-400">"Mrabeh Fathi"</span>,</p>
                  <p className="pl-4"><span className="text-accent-green">"rol"</span>: <span className="text-yellow-400">"Full-Stack + Cyber"</span>,</p>
                  <p className="pl-4"><span className="text-accent-green">"ubicación"</span>: <span className="text-yellow-400">"Madrid, ES"</span>,</p>
                  <p className="pl-4"><span className="text-accent-green">"stack"</span>: [<span className="text-yellow-400">"Python"</span>, <span className="text-yellow-400">"React"</span>, <span className="text-yellow-400">"TypeScript"</span>],</p>
                  <p className="pl-4"><span className="text-accent-green">"estado"</span>: <span className="text-yellow-400">"en formación DAW/DAM"</span>,</p>
                  <p className="pl-4"><span className="text-accent-green">"disponible"</span>: <span className="text-accent">true</span></p>
                  <p>{'}'}</p>
                </div>
                <p className="mt-3"><span className="text-accent">$</span> <span className="animate-blink text-accent">_</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SPECIALIZATIONS ─── */}
      <section className="py-20">
        <div className="section-container">
          <SectionTitle
            label="áreas"
            title="Especialización"
            highlight="técnica"
            centered
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {specializations.map((spec) => {
              const Icon = spec.icon
              return (
                <div
                  key={spec.title}
                  className="group card-glass rounded-xl p-5 hover:-translate-y-1 transition-all duration-300 cursor-default"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    style={{ background: `${spec.color}12`, border: `1px solid ${spec.color}25` }}
                  >
                    <Icon size={20} style={{ color: spec.color }} />
                  </div>
                  <h3 className="font-display font-semibold text-sm text-text mb-2">{spec.title}</h3>
                  <p className="text-xs text-text-muted leading-relaxed">{spec.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PROJECTS ─── */}
      <section className="py-20 bg-surface/20">
        <div className="section-container">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <SectionTitle
              label="proyectos"
              title="Trabajo"
              highlight="destacado"
            />
            <Link to="/proyectos" className="btn-outline text-sm py-2">
              Ver todos <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.filter((p) => p.featured).map((project) => (
              <ProjectCard key={project.id} project={project} featured />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20">
        <div className="section-container">
          <div
            className="relative rounded-2xl p-10 text-center overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(0,212,255,0.05) 0%, rgba(124,58,237,0.08) 100%)',
              border: '1px solid rgba(0,212,255,0.15)',
            }}
          >
            <div
              className="absolute inset-0 opacity-5"
              style={{
                background:
                  'radial-gradient(ellipse at center, #00d4ff 0%, transparent 70%)',
              }}
            />
            <p className="font-mono text-accent text-sm mb-4 tracking-widest">// ¿tienes un proyecto?</p>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-text mb-4">
              Hablemos
            </h2>
            <p className="text-text-dim mb-8 max-w-lg mx-auto">
              Estoy disponible para colaboraciones, proyectos freelance o posiciones en empresa.
              Dame contexto y te respondo en menos de 24 horas.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contacto" className="btn-primary">
                Contactar ahora
                <ArrowRight size={16} />
              </Link>
              <a
                href="https://linkedin.com/in/mrabehfathi"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <Terminal size={16} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
