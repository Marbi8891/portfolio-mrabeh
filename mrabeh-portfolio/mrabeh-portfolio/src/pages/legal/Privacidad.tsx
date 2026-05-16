export default function Privacidad() {
  return (
    <div className="pt-24 pb-20">
      <div className="section-container max-w-3xl">
        <h1 className="font-display font-black text-4xl text-text mb-2">Política de Privacidad</h1>
        <p className="font-mono text-sm text-text-muted mb-10">Última actualización: {new Date().getFullYear()}</p>

        <div className="space-y-8 text-text-dim leading-relaxed">
          <section>
            <h2 className="font-display font-bold text-xl text-text mb-3">1. Responsable del tratamiento</h2>
            <p>Responsable: Mrabeh Fathi Boussayff · Email: mrabehfathiprofesional@gmail.com</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-text mb-3">2. Datos recogidos</h2>
            <p>A través del formulario de contacto se recogen: nombre, correo electrónico, empresa (opcional), motivo de contacto y mensaje. Estos datos se utilizan exclusivamente para responder a tu solicitud.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-text mb-3">3. Base legal</h2>
            <p>El tratamiento de tus datos se basa en el consentimiento que prestas al enviar el formulario de contacto (Art. 6.1.a RGPD).</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-text mb-3">4. Conservación de datos</h2>
            <p>Los datos se conservarán durante el tiempo necesario para gestionar tu solicitud y, en su caso, durante los plazos legalmente establecidos.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-text mb-3">5. Tus derechos</h2>
            <p>Puedes ejercer tus derechos de acceso, rectificación, supresión, limitación y portabilidad escribiendo a mrabehfathiprofesional@gmail.com, acompañando copia de tu DNI.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-text mb-3">6. Transferencias internacionales</h2>
            <p>Si utilizas el formulario de contacto con Formspree, tus datos podrán tratarse en servidores ubicados fuera del EEE. Formspree garantiza el cumplimiento del RGPD.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
