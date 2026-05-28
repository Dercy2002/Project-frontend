const BASE = '/api'

async function post(url, body) {
  const res = await fetch(BASE + url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.detail || data.message || 'Erreur serveur')
  return data
}

// BIF -> CDF : Burundi envoie vers DRC
export const sendOtpBurundi = (body) => post('/burundi-to-drc', body)
export const validateOtpBurundi = (body) => post('/burundi-to-drc/otp-code', body)

// CDF -> BIF : DRC envoie vers Burundi
export const sendOtpDRC = (body) => post('/drc-to-burundi', body)
export const validateOtpDRC = (body) => post('/drc-to-burundi/otp-code', body)
