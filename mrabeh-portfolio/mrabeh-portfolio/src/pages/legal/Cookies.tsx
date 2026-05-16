export default function Cookies() {
  return (
    <div className="pt-24 pb-20">
      <div className="section-container max-w-3xl">
        <h1 className="font-display font-black text-4xl text-text mb-2">Política de Cookies</h1>
        <p className="font-mono text-sm text-text-muted mb-10">Última actualización: {new Date().getFullYear()}</p>

        <div className="space-y-8 text-text-dim leading-relaxed">
          <section>
            <h2 className="font-display font-bold text-xl text-text mb-3">¿Qué son las cookies?</h2>
            <p>Las cookies son pequeños archivos de texto que los sitios web almacenan en tu navegador al visitarlos.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-text mb-3">Cookies utilizadas</h2>
            <p>Este sitio web es un portfolio estático que actualmente no utiliza cookies propias de seguimiento ni publicidad. Si en el futuro se añaden herramientas de analítica, se actualizará esta política y se solicitará el consentimiento correspondiente.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-text mb-3">Cookies de terceros</h2>
            <p>Los enlaces externos (LinkedIn, Formspree) pueden establecer sus propias cookies. Consulta las políticas de privacidad de dichos servicios para más información.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-text mb-3">Control de cookies</h2>
            <p>Puedes configurar tu navegador para bloquear o eliminar cookies. Esto puede afectar a la funcionalidad de algunos sitios web.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
