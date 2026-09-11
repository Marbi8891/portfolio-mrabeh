# Client Acquisition V1 — puesta en producción

Esta versión convierte el portfolio en una web comercial sin eliminar la ruta `/cv` para recruiters.

## 1. Formulario real

El formulario publica JSON a `/api/contact`. La función serverless:

- valida nombre, email, servicio y mensaje;
- limita tamaño y longitud de campos;
- incluye un honeypot básico contra bots;
- rechaza peticiones cross-origin desde otros hosts;
- escapa el contenido antes de construir el HTML;
- envía el lead por la API REST de Resend;
- configura `reply_to` con el email del posible cliente;
- redirige a `/gracias` solo después de que Resend acepte el envío.

### Variables necesarias en Vercel

Configurar en **Project Settings → Environment Variables**:

```text
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CONTACT_TO_EMAIL=mrabehfathiprofesional@gmail.com
CONTACT_FROM_EMAIL=Mrabeh Fathi <contacto@mrabehfathi.es>
```

`CONTACT_TO_EMAIL` tiene fallback al email profesional actual. `CONTACT_FROM_EMAIL` tiene fallback a `onboarding@resend.dev`, útil para primeras pruebas, pero para producción es preferible utilizar una dirección del dominio verificado en Resend.

No se debe guardar `RESEND_API_KEY` en el repositorio, en el frontend ni en variables `VITE_*`.

## 2. Resend

Pasos de activación:

1. Crear o usar una cuenta de Resend.
2. Generar una API key con permiso de envío.
3. Para producción, verificar el dominio de envío que se vaya a usar.
4. Añadir las tres variables anteriores en Vercel para Production y Preview si se quiere probar la PR.
5. Redeploy después de guardar las variables.
6. Enviar una solicitud de prueba y comprobar tanto la recepción del correo como el log de Resend.

## 3. Web Analytics

`index.html` incluye el script first-party de Vercel Web Analytics. En Vercel debe estar habilitado **Web Analytics** para el proyecto.

La conversión principal se mide mediante la ruta:

```text
/gracias
```

Flujo de conversión:

```text
visita → /servicios o /proyectos → /contacto → POST /api/contact → /gracias
```

Esto permite medir solicitudes completadas como visitas a `/gracias` sin enviar a Analytics el contenido del formulario.

Métricas recomendadas:

- visitas a `/`;
- visitas a `/servicios`;
- visitas a `/proyectos`;
- visitas a `/contacto`;
- visitas a `/gracias`;
- ratio `/gracias` ÷ `/contacto`;
- referrers que terminan en `/gracias`.

## 4. Casos comerciales conceptuales

Se han añadido tres casos diseñados para demostrar criterio comercial sin inventar clientes:

- **LexForma · Despacho jurídico** — web orientada a consultas;
- **Nexo Clínica · Rehabilitación** — accesibilidad y reserva de cita;
- **Atlas Obras · Portal CAE** — automatización documental y estados CAE.

Cada caso incluye una advertencia visible de que es conceptual y no presenta resultados, testimonios o métricas como si procedieran de un cliente real.

## 5. Privacidad

La política de privacidad se ha actualizado para reflejar los campos reales del formulario, el uso de Vercel como infraestructura, Resend para correo transaccional y Vercel Web Analytics para medición agregada. La política de cookies también se ha ajustado a la implementación actual.

Antes de usar el sitio como canal comercial estable, conviene revisar periódicamente estos textos cuando cambien proveedores, finalidades o configuración del tratamiento.

## 6. Validación antes de merge

Ejecutar desde `mrabeh-portfolio/mrabeh-portfolio`:

```bash
npm ci
npm run lint
npm run build
```

Después comprobar en la preview de Vercel:

1. navegación desktop y móvil;
2. tarjetas y páginas de los tres casos conceptuales;
3. envío correcto del formulario;
4. redirección a `/gracias`;
5. recepción del email y `reply-to` correcto;
6. aparición de tráfico en Vercel Web Analytics;
7. rutas legales `/legal/privacidad` y `/legal/cookies`.

## 7. Qué no hace esta versión

- No afirma que los casos conceptuales sean clientes reales.
- Web Security Review no se vende como pentest completo.
- No almacena leads en una base de datos o CRM.
- No incorpora adjuntos en el formulario.
- No implementa rate limiting distribuido; para mayor volumen se recomienda añadir una solución de rate limiting o protección adicional en Vercel.
