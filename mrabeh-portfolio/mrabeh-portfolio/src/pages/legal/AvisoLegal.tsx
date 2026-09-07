export default function AvisoLegal() {
  return (
    <div className="pt-24 pb-20">
      <div className="section-container max-w-3xl">
        <h1 className="font-display font-black text-4xl text-text mb-2">Aviso Legal</h1>
        <p className="font-mono text-sm text-text-muted mb-10">Última actualización: {new Date().getFullYear()}</p>

        <div className="prose prose-invert max-w-none space-y-8 text-text-dim">
          <section>
            <h2 className="font-display font-bold text-xl text-text mb-3">1. Titular del sitio web</h2>
            <p>Titular: Mrabeh Fathi Boussayff</p>
            <p>Domicilio: Madrid / Leganés, España</p>
            <p>Email: mrabehfathiprofesional@gmail.com</p>
            <p>Web: mrabehfathi.es</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-text mb-3">2. Objeto</h2>
            <p>El presente aviso legal regula el uso del sitio web mrabehfathi.es, del que es titular Mrabeh Fathi Boussayff. La navegación por el sitio web del titular implica la aceptación expresa y plena de los términos y condiciones recogidos en este aviso legal.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-text mb-3">3. Propiedad intelectual</h2>
            <p>Todos los contenidos del sitio web (textos, imágenes, código fuente, diseño gráfico) son propiedad de Mrabeh Fathi Boussayff o dispone de la autorización correspondiente. Queda prohibida su reproducción total o parcial sin autorización expresa.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-text mb-3">4. Responsabilidad</h2>
            <p>El titular no se hace responsable de los daños y perjuicios que puedan derivarse del uso de la información contenida en este sitio web. La información puede no estar actualizada en todo momento.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-text mb-3">5. Legislación aplicable</h2>
            <p>Las presentes condiciones se rigen por la legislación española vigente. Para la resolución de cualquier controversia, las partes se someten a los juzgados y tribunales de Madrid.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
