export function normalizeWhatsApp(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  return digits.startsWith('55') ? digits : `55${digits}`
}

export function buildEmailHtml(data: {
  name: string
  whatsapp: string
  email: string
  roomType: string
  area: number | null
  floorPlanUrl: string | null
  photoUrls: string[]
  styles: string[]
  pinterest: string
  mustHave: string
  scopeType: string
  urgency: string
  budget: string
}): string {
  const waUrl = `https://wa.me/${data.whatsapp}`
  const fileLinks = [
    data.floorPlanUrl ? `<a href="${data.floorPlanUrl}">Planta baixa</a>` : null,
    ...data.photoUrls.map((url, i) => `<a href="${url}">Foto ${i + 1}</a>`),
  ]
    .filter(Boolean)
    .join(', ')

  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#333">Novo questionário — ${data.name}</h2>
      <hr/>

      <h3>👤 Identificação</h3>
      <p><strong>Nome:</strong> ${data.name}<br/>
      <strong>WhatsApp:</strong> ${data.whatsapp}<br/>
      <strong>E-mail:</strong> ${data.email}</p>

      <h3>🏠 Ambiente</h3>
      <p><strong>Tipo:</strong> ${data.roomType}<br/>
      ${data.area ? `<strong>Metragem:</strong> ${data.area} m²<br/>` : ''}
      ${fileLinks ? `<strong>Arquivos:</strong> ${fileLinks}` : ''}</p>

      <h3>🎨 Estilo</h3>
      <p><strong>Estilos:</strong> ${data.styles.join(', ') || '—'}<br/>
      ${data.pinterest ? `<strong>Pinterest:</strong> <a href="${data.pinterest}">${data.pinterest}</a><br/>` : ''}
      ${data.mustHave ? `<strong>Deve ter:</strong> ${data.mustHave}` : ''}</p>

      <h3>📋 Escopo</h3>
      <p><strong>Tipo:</strong> ${data.scopeType}<br/>
      ${data.urgency ? `<strong>Urgência:</strong> ${data.urgency}<br/>` : ''}
      ${data.budget ? `<strong>Investimento:</strong> ${data.budget}` : ''}</p>

      <hr/>
      <a href="${waUrl}" style="display:inline-block;background:#25D366;color:white;padding:10px 20px;border-radius:4px;text-decoration:none;font-weight:bold">
        💬 Responder no WhatsApp
      </a>
    </div>
  `
}
