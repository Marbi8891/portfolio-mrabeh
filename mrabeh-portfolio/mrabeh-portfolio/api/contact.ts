declare const process: {
  env: Record<string, string | undefined>
}

interface ContactPayload {
  name?: unknown
  email?: unknown
  company?: unknown
  service?: unknown
  budget?: unknown
  timeline?: unknown
  message?: unknown
  website?: unknown
}

const jsonHeaders = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
}

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: jsonHeaders,
  })
}

function clean(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254
}

export const config = {
  runtime: 'edge',
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return json({ error: 'Método no permitido.' }, 405)
  }

  const origin = request.headers.get('origin')
  if (origin) {
    try {
      if (new URL(origin).host !== new URL(request.url).host) {
        return json({ error: 'Origen no permitido.' }, 403)
      }
    } catch {
      return json({ error: 'Origen no válido.' }, 403)
    }
  }

  const contentType = request.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) {
    return json({ error: 'Formato de solicitud no válido.' }, 415)
  }

  const contentLength = Number(request.headers.get('content-length') || '0')
  if (Number.isFinite(contentLength) && contentLength > 16_000) {
    return json({ error: 'La solicitud es demasiado grande.' }, 413)
  }

  let payload: ContactPayload
  try {
    payload = (await request.json()) as ContactPayload
  } catch {
    return json({ error: 'No se han podido leer los datos enviados.' }, 400)
  }

  // Honeypot: bots suelen rellenar este campo oculto. Respondemos OK para no darles señal.
  if (clean(payload.website, 200)) {
    return json({ ok: true })
  }

  const name = clean(payload.name, 100)
  const email = clean(payload.email, 254)
  const company = clean(payload.company, 140)
  const service = clean(payload.service, 140)
  const budget = clean(payload.budget, 80)
  const timeline = clean(payload.timeline, 80)
  const message = clean(payload.message, 4_000)

  if (!name || !email || !service || !message) {
    return json({ error: 'Faltan campos obligatorios.' }, 400)
  }

  if (!isValidEmail(email)) {
    return json({ error: 'Introduce un email válido.' }, 400)
  }

  if (name.length < 2 || message.length < 20) {
    return json({ error: 'Añade un poco más de contexto sobre el proyecto.' }, 400)
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return json(
      { error: 'El formulario está temporalmente fuera de servicio. Escríbeme por email.' },
      503
    )
  }

  const to = process.env.CONTACT_TO_EMAIL || 'mrabehfathiprofesional@gmail.com'
  const from = process.env.CONTACT_FROM_EMAIL || 'Mrabeh Fathi <onboarding@resend.dev>'

  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    company: escapeHtml(company || '—'),
    service: escapeHtml(service),
    budget: escapeHtml(budget || 'No indicado'),
    timeline: escapeHtml(timeline || 'No indicado'),
    message: escapeHtml(message).replaceAll('\n', '<br />'),
  }

  const subject = `Nueva solicitud · ${service} · ${name}`
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;color:#111827">
      <h1 style="font-size:22px;margin-bottom:24px">Nueva solicitud desde mrabehfathi.es</h1>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:8px 0;font-weight:700">Nombre</td><td>${safe.name}</td></tr>
        <tr><td style="padding:8px 0;font-weight:700">Email</td><td>${safe.email}</td></tr>
        <tr><td style="padding:8px 0;font-weight:700">Empresa</td><td>${safe.company}</td></tr>
        <tr><td style="padding:8px 0;font-weight:700">Servicio</td><td>${safe.service}</td></tr>
        <tr><td style="padding:8px 0;font-weight:700">Presupuesto</td><td>${safe.budget}</td></tr>
        <tr><td style="padding:8px 0;font-weight:700">Plazo</td><td>${safe.timeline}</td></tr>
      </table>
      <div style="margin-top:24px;padding-top:20px;border-top:1px solid #e5e7eb">
        <h2 style="font-size:16px">Proyecto / necesidad</h2>
        <p style="line-height:1.6">${safe.message}</p>
      </div>
    </div>
  `

  const text = [
    'Nueva solicitud desde mrabehfathi.es',
    '',
    `Nombre: ${name}`,
    `Email: ${email}`,
    `Empresa: ${company || '—'}`,
    `Servicio: ${service}`,
    `Presupuesto: ${budget || 'No indicado'}`,
    `Plazo: ${timeline || 'No indicado'}`,
    '',
    'Proyecto / necesidad:',
    message,
  ].join('\n')

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': `portfolio-contact/${crypto.randomUUID()}`,
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: [email],
      subject,
      html,
      text,
      tags: [
        { name: 'source', value: 'portfolio' },
        { name: 'type', value: 'project_enquiry' },
      ],
    }),
  })

  if (!resendResponse.ok) {
    console.error('Resend contact error', resendResponse.status, await resendResponse.text())
    return json(
      { error: 'No se ha podido enviar la solicitud. Inténtalo de nuevo o escríbeme por email.' },
      502
    )
  }

  return json({ ok: true })
}
