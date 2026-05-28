import { useState } from 'react'
import { sendOtpBurundi, validateOtpBurundi, sendOtpDRC, validateOtpDRC } from '../api'

const FLAG_BI = 'https://upload.wikimedia.org/wikipedia/commons/5/50/Flag_of_Burundi.svg'
const FLAG_CD = 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Flag_of_the_Democratic_Republic_of_the_Congo.svg'

const RATES = { BIF_TO_CDF: 0.45, CDF_TO_BIF: 2.22 }

function fmt(n) {
  return Math.floor(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

function validateBI(v) { return /^(62|66|68|71)\d{6}$/.test(v.replace(/\s/g, '')) }
function validateCD(v) {
  const clean = v.replace(/[\s\-]/g, '')
  return /^\+?243\d{9}$/.test(clean) || /^(08|09)\d{8}$/.test(clean)
}

export default function ExchangeCard() {
  const [dir, setDir] = useState('bi-cd')
  const [amountBIF, setAmountBIF] = useState('')
  const [amountCDF, setAmountCDF] = useState('')
  const [senderBI, setSenderBI] = useState('')
  const [senderCD, setSenderCD] = useState('')
  const [recipientCD, setRecipientCD] = useState('')
  const [recipientBI, setRecipientBI] = useState('')
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  // OTP step
  const [step, setStep] = useState('form') // 'form' | 'otp'
  const [otp, setOtp] = useState('')
  const [pendingData, setPendingData] = useState(null)

  const receiveCDF = fmt((parseFloat(amountBIF) || 0) * RATES.BIF_TO_CDF)
  const receiveBIF = fmt((parseFloat(amountCDF) || 0) * RATES.CDF_TO_BIF)

  function validate() {
    if (dir === 'bi-cd') {
      if (!senderBI) throw new Error('Entrez votre numéro Lumicash')
      if (!validateBI(senderBI)) throw new Error('Numéro Lumicash invalide (ex: 62/66/68/71 XXXXXX)')
      if (!amountBIF || parseFloat(amountBIF) <= 0) throw new Error('Montant invalide')
      if (!recipientCD) throw new Error('Entrez le numéro du destinataire')
      if (!validateCD(recipientCD)) throw new Error('Numéro Congo invalide (ex: +243 973 833 744)')
    } else {
      if (!senderCD) throw new Error('Entrez votre numéro Congo')
      if (!validateCD(senderCD)) throw new Error('Numéro Congo invalide (ex: +243 973 833 744)')
      if (!amountCDF || parseFloat(amountCDF) <= 0) throw new Error('Montant invalide')
      if (!recipientBI) throw new Error('Entrez le numéro du destinataire')
      if (!validateBI(recipientBI)) throw new Error('Numéro Lumicash invalide (ex: 62/66/68/71 XXXXXX)')
    }
  }

  async function handleSend() {
    if (loading) return
    try {
      validate()
      setLoading(true)
      setStatus({ type: 'loading', msg: 'Envoi du code OTP...' })

      let body, data
      if (dir === 'bi-cd') {
        body = {
          amount: parseInt(amountBIF),
          sender_number: senderBI.replace(/\s/g, ''),
          recipient_number: recipientCD.replace(/\s/g, ''),
          currency: 'BIF',
          carrier: 'Lumicash',
        }
        data = await sendOtpBurundi(body)
      } else {
        body = {
          amount: parseInt(amountCDF),
          sender_number: senderCD.replace(/\s/g, ''),
          recipient_number: recipientBI.replace(/\s/g, ''),
          currency: 'CDF',
          carrier: 'Airtel',
        }
        data = await sendOtpDRC(body)
      }

      setPendingData(body)
      setStep('otp')
      setStatus({ type: 'success', msg: data.message || 'Code OTP envoyé !' })
      setTimeout(() => setStatus(null), 4000)
    } catch (e) {
      setStatus({ type: 'error', msg: e.message })
      setTimeout(() => setStatus(null), 4000)
    } finally {
      setLoading(false)
    }
  }

  async function handleOtpValidate() {
    if (loading || !otp) return
    try {
      setLoading(true)
      setStatus({ type: 'loading', msg: 'Validation en cours via Lightning Network...' })

      const body = { ...pendingData, otp_code: otp }
      let data
      if (dir === 'bi-cd') {
        data = await validateOtpBurundi(body)
      } else {
        data = await validateOtpDRC(body)
      }

      setStatus({ type: 'success', msg: data.message || 'Paiement effectué avec succès !' })
      setStep('form')
      setOtp('')
      setPendingData(null)
      if (dir === 'bi-cd') { setAmountBIF(''); setRecipientCD(''); setSenderBI('') }
      else { setAmountCDF(''); setRecipientBI(''); setSenderCD('') }
      setTimeout(() => setStatus(null), 6000)
    } catch (e) {
      setStatus({ type: 'error', msg: e.message })
      setTimeout(() => setStatus(null), 4000)
    } finally {
      setLoading(false)
    }
  }

  function handleDirChange(newDir) {
    setDir(newDir)
    setStep('form')
    setOtp('')
    setPendingData(null)
    setStatus(null)
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Envoyer de l'argent</h3>
        <span className="card-badge">⚡ Lightning</span>
      </div>

      <div className="toggle">
        <button className={`dir-btn ${dir === 'bi-cd' ? 'active' : ''}`} onClick={() => handleDirChange('bi-cd')}>
          <img src={FLAG_BI} alt="BI" className="flag-sm" />
          <span>BIF → CDF</span>
        </button>
        <button className={`dir-btn ${dir === 'cd-bi' ? 'active' : ''}`} onClick={() => handleDirChange('cd-bi')}>
          <img src={FLAG_CD} alt="CD" className="flag-sm" />
          <span>CDF → BIF</span>
        </button>
      </div>

      {step === 'form' ? (
        <>
          {dir === 'bi-cd' ? (
            <>
              <InputField label="Votre numéro Lumicash" flag={FLAG_BI} country="Burundi"
                value={senderBI} onChange={setSenderBI} placeholder="62 XX XX XX" type="tel" />
              <InputField label="Montant à envoyer" currency="BIF"
                value={amountBIF} onChange={setAmountBIF} placeholder="0" type="number" />
              <InputField label="Numéro du destinataire" flag={FLAG_CD} country="Congo"
                value={recipientCD} onChange={setRecipientCD} placeholder="+243 9XX XXX XXX" type="tel" />
              <div className="rate-box">
                <div className="rate-row">
                  <span className="rate-label">Taux de change</span>
                  <span className="rate-val">1 BIF = {RATES.BIF_TO_CDF} CDF</span>
                </div>
                <div className="rate-row">
                  <span className="rate-label">Frais</span>
                  <span className="rate-free">Gratuit</span>
                </div>
              </div>
              <div className="result-box">
                <div className="result-label">Le destinataire reçoit</div>
                <div className="result-amount">{receiveCDF} <span className="result-currency">CDF</span></div>
                <div className="result-sub">Airtel · Orange · M-Pesa Congo</div>
              </div>
            </>
          ) : (
            <>
              <InputField label="Votre numéro (Airtel/Orange/M-Pesa)" flag={FLAG_CD} country="Congo"
                value={senderCD} onChange={setSenderCD} placeholder="+243 9XX XXX XXX" type="tel" />
              <InputField label="Montant à envoyer" currency="CDF"
                value={amountCDF} onChange={setAmountCDF} placeholder="0" type="number" />
              <InputField label="Numéro du destinataire" flag={FLAG_BI} country="Burundi"
                value={recipientBI} onChange={setRecipientBI} placeholder="62 XX XX XX" type="tel" />
              <div className="rate-box">
                <div className="rate-row">
                  <span className="rate-label">Taux de change</span>
                  <span className="rate-val">1 CDF = {RATES.CDF_TO_BIF} BIF</span>
                </div>
                <div className="rate-row">
                  <span className="rate-label">Frais</span>
                  <span className="rate-free">Gratuit</span>
                </div>
              </div>
              <div className="result-box">
                <div className="result-label">Le destinataire reçoit</div>
                <div className="result-amount">{receiveBIF} <span className="result-currency">BIF</span></div>
                <div className="result-sub">Lumicash Burundi</div>
              </div>
            </>
          )}

          <button className="send-btn" onClick={handleSend} disabled={loading}>
            {loading
              ? <><span className="spinner" /> Envoi en cours...</>
              : '⚡ Envoyer maintenant'
            }
          </button>
        </>
      ) : (
        <div className="otp-section">
          <div className="otp-info">
            <span className="otp-icon">📱</span>
            <p>Un code OTP a été envoyé au numéro <strong>{pendingData?.sender_number}</strong>. Entrez-le ci-dessous pour confirmer.</p>
          </div>
          <InputField label="Code OTP" currency="OTP"
            value={otp} onChange={setOtp} placeholder="XXXXXX" type="text" />
          <button className="send-btn" onClick={handleOtpValidate} disabled={loading || !otp}>
            {loading
              ? <><span className="spinner" /> Validation...</>
              : '✓ Confirmer le paiement'
            }
          </button>
          <button className="cancel-btn" onClick={() => { setStep('form'); setOtp(''); setStatus(null) }}>
            Annuler
          </button>
        </div>
      )}

      {status && (
        <div className={`status-box status-${status.type}`}>
          <span className="status-icon">
            {status.type === 'success' ? '✓' : status.type === 'error' ? '✕' : '⏳'}
          </span>
          {status.msg}
        </div>
      )}

      <style>{`
        .card { background:#fff; border-radius:var(--radius-lg); padding:1.75rem; box-shadow:var(--shadow-lg); width:100%; max-width:460px; border:1px solid rgba(0,0,0,0.06); }
        .card-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem; }
        .card-title { font-size:1rem; font-weight:700; color:var(--text); }
        .card-badge { background:var(--green-light); color:var(--green); font-size:0.72rem; font-weight:700; padding:0.3rem 0.7rem; border-radius:var(--radius-pill); border:1px solid rgba(15,122,74,0.2); }
        .toggle { display:flex; gap:0.4rem; background:var(--gray); border-radius:12px; padding:0.35rem; margin-bottom:1.25rem; }
        .dir-btn { flex:1; padding:0.65rem 0.5rem; border-radius:9px; font-size:0.82rem; font-weight:600; background:transparent; color:var(--muted); display:flex; align-items:center; justify-content:center; gap:6px; transition:all 0.2s; }
        .dir-btn.active { background:#fff; color:var(--green); box-shadow:var(--shadow-sm); }
        .flag-sm { width:20px; height:14px; border-radius:3px; object-fit:cover; }
        .rate-box { background:var(--gray); border-radius:12px; padding:0.85rem 1rem; margin:0.75rem 0; display:flex; flex-direction:column; gap:0.4rem; }
        .rate-row { display:flex; justify-content:space-between; align-items:center; }
        .rate-label { font-size:0.78rem; color:var(--muted); font-weight:500; }
        .rate-val { font-weight:700; color:var(--green); font-size:0.85rem; }
        .rate-free { font-weight:700; color:#059669; font-size:0.85rem; }
        .result-box { background:linear-gradient(135deg, var(--green) 0%, var(--green-dark) 100%); border-radius:14px; padding:1.25rem; text-align:center; margin-bottom:1.1rem; }
        .result-label { font-size:0.7rem; text-transform:uppercase; letter-spacing:1.5px; color:rgba(255,255,255,0.65); font-weight:600; }
        .result-amount { font-size:2rem; font-weight:900; color:#fff; margin:6px 0 4px; letter-spacing:-0.5px; }
        .result-currency { font-size:1.1rem; font-weight:600; opacity:0.8; }
        .result-sub { font-size:0.72rem; color:rgba(255,255,255,0.6); }
        .send-btn { width:100%; padding:1rem; background:var(--black); border-radius:var(--radius-pill); font-size:0.95rem; font-weight:700; color:#fff; transition:all 0.2s; display:flex; align-items:center; justify-content:center; gap:8px; letter-spacing:0.2px; }
        .send-btn:hover:not(:disabled) { background:#1a1a1a; transform:translateY(-1px); box-shadow:0 8px 24px rgba(0,0,0,0.2); }
        .send-btn:disabled { opacity:0.65; cursor:not-allowed; transform:none; }
        .cancel-btn { width:100%; padding:0.75rem; background:transparent; border-radius:var(--radius-pill); font-size:0.9rem; font-weight:600; color:var(--muted); border:1.5px solid var(--gray-mid); margin-top:0.5rem; transition:all 0.2s; }
        .cancel-btn:hover { background:var(--gray); color:var(--text); }
        .spinner { width:14px; height:14px; border:2px solid rgba(255,255,255,0.3); border-top-color:#fff; border-radius:50%; animation:spin 0.7s linear infinite; }
        @keyframes spin { to { transform:rotate(360deg) } }
        .status-box { margin-top:0.85rem; padding:0.85rem 1rem; border-radius:10px; font-size:0.85rem; font-weight:600; display:flex; align-items:center; gap:8px; }
        .status-icon { width:20px; height:20px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:0.7rem; font-weight:800; flex-shrink:0; }
        .status-success { background:#f0fdf4; color:#166534; border:1px solid #bbf7d0; }
        .status-success .status-icon { background:#dcfce7; color:#166534; }
        .status-error { background:#fef2f2; color:#991b1b; border:1px solid #fecaca; }
        .status-error .status-icon { background:#fee2e2; color:#991b1b; }
        .status-loading { background:#fffbeb; color:#92400e; border:1px solid #fde68a; }
        .status-loading .status-icon { background:#fef3c7; color:#92400e; }
        .otp-section { display:flex; flex-direction:column; gap:0.5rem; }
        .otp-info { display:flex; align-items:flex-start; gap:0.75rem; background:var(--gray); border-radius:12px; padding:1rem; margin-bottom:0.5rem; }
        .otp-icon { font-size:1.5rem; flex-shrink:0; }
        .otp-info p { font-size:0.85rem; color:var(--muted); line-height:1.5; margin:0; }
        .otp-info strong { color:var(--text); }
      `}</style>
    </div>
  )
}

function InputField({ label, flag, country, currency, value, onChange, placeholder, type }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ marginBottom: '0.9rem' }}>
      <label style={{ display:'flex', alignItems:'center', gap:6, marginBottom:6, fontWeight:600, fontSize:'0.78rem', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.5px' }}>
        {flag && <img src={flag} alt={country} style={{ width:18, height:12, borderRadius:2, objectFit:'cover' }} />}
        {label}
      </label>
      <div style={{
        display:'flex', alignItems:'center',
        border: `1.5px solid ${focused ? 'var(--green)' : 'var(--gray-mid)'}`,
        borderRadius: 12, background: '#fff',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        boxShadow: focused ? '0 0 0 3px var(--green-glow)' : 'none',
        overflow: 'hidden',
      }}>
        {currency && (
          <span style={{ padding:'0 0.75rem', fontSize:'0.8rem', fontWeight:700, color:'var(--muted)', borderRight:'1.5px solid var(--gray-mid)', background:'var(--gray)', alignSelf:'stretch', display:'flex', alignItems:'center', whiteSpace:'nowrap' }}>
            {currency}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          inputMode={type === 'number' ? 'numeric' : 'tel'}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex:1, padding:'0.8rem 0.9rem',
            fontSize:'0.95rem', background:'transparent',
            color:'var(--text)', border:'none', outline:'none',
          }}
        />
      </div>
    </div>
  )
}
