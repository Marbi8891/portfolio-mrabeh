export default function Privacidad() {
  return (
    <div className="pt-24 pb-20">
      <div className="section-container max-w-3xl">
        <h1 className="font-display font-black text-4xl text-text mb-2">Política de Privacidad</h1>
        <p className="font-mono text-sm text-text-muted mb-10">Última actualización: septiembre de 2026</p>

        <div className="space-y-8 text-text-dim leading-relaxed">
          <section>
            <h2 className="font-display font-bold text-xl text-text mb-3">1. Responsable del tratamiento</h2>
            <p>Responsable: Mrabeh Fathi Boussayff · Email: mrabehfathiprofesional@gmail.com</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-text mb-3">2. Datos recogidos</h2>
            <p>
              A través del formulario de proyecto se pueden recoger nombre, correo electrónico, empresa o proyecto, servicio solicitado, rango de presupuesto, plazo aproximado y el mensaje que decidas enviar. No incluyas información especialmente sensible que no sea necesaria para valorar el proyecto.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-text mb-3">3. Finalidad y base jurídica</h2>
            <p>
              Los datos se utilizan para responder a solicitudes, valorar el encaje de un proyecto, preparar una propuesta y mantener las comunicaciones necesarias antes de una posible contratación. Cuando la solicitud busca una propuesta o la prestación de un servicio, el tratamiento puede basarse en la aplicación de medidas precontractuales solicitadas por la persona interesada (art. 6.1.b RGPD). Para otras consultas, la base puede ser el consentimiento prestado al enviar voluntariamente el mensaje (art. 6.1.a RGPD).
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-text mb-3">4. Conservación</h2>
            <p>
              Los datos se conservarán durante el tiempo necesario para gestionar la solicitud y, si existe una relación contractual, durante los plazos necesarios para atender obligaciones legales o posibles responsabilidades. Las solicitudes que no continúen podrán eliminarse cuando dejen de ser necesarias.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-text mb-3">5. Proveedores técnicos</h2>
            <p>
              El sitio se aloja en Vercel y el envío del formulario puede utilizar Resend como proveedor de correo transaccional. Estos proveedores pueden tratar datos técnicos o el contenido necesario para prestar el servicio. Resend informa de que almacena datos de sus clientes en Estados Unidos y que las transferencias desde el EEE se cubren mediante las Cláusulas Contractuales Tipo y otros mecanismos descritos en su DPA. Vercel dispone igualmente de un acuerdo de tratamiento de datos para los datos que procesa por cuenta de sus clientes.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-text mb-3">6. Analítica</h2>
            <p>
              Se utiliza Vercel Web Analytics para conocer de forma agregada páginas visitadas, fuentes de tráfico y otros datos técnicos de navegación. La ruta de confirmación “/gracias” permite medir cuántas solicitudes llegan a completarse sin incorporar el contenido del formulario a la analítica.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-text mb-3">7. Tus derechos</h2>
            <p>
              Puedes solicitar acceso, rectificación, supresión, limitación, oposición o portabilidad cuando proceda escribiendo a mrabehfathiprofesional@gmail.com. Si existen dudas razonables sobre la identidad de quien formula la solicitud, podrá pedirse información adicional estrictamente necesaria para verificarla.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-text mb-3">8. Reclamaciones</h2>
            <p>
              Si consideras que el tratamiento de tus datos no se ajusta a la normativa, puedes presentar una reclamación ante la Agencia Española de Protección de Datos u otra autoridad de control competente.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
