import { useState } from 'react'
import ExchangeCard from './ExchangeCard'

const FLAG_BI = 'https://upload.wikimedia.org/wikipedia/commons/5/50/Flag_of_Burundi.svg'
const FLAG_CD = 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Flag_of_the_Democratic_Republic_of_the_Congo.svg'

const tabs = [
  { id: 'send', label: 'Envoyer', icon: '⚡' },
  { id: 'how', label: 'Comment', icon: '📖' },
  { id: 'about', label: 'À propos', icon: 'ℹ️' },
]

const steps = [
  { n: '01', icon: '🔀', title: 'Choisissez la direction', desc: 'BIF → CDF ou CDF → BIF' },
  { n: '02', icon: '📝', title: 'Entrez les détails', desc: 'Montant et numéros mobile money' },
  { n: '03', icon: '📱', title: 'Validez l\'OTP', desc: 'Code reçu sur votre téléphone' },
  { n: '04', icon: '⚡', title: 'Réception instantanée', desc: 'Fonds reçus en quelques secondes' },
]

export default function MobileApp() {
  const [tab, setTab] = useState('send')

  return (
    <div style={{ minHeight: '100vh', background: '#f7f8fa', display: 'flex', flexDirection: 'column', maxWidth: 480, margin: '0 auto', position: 'relative' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0f7a4a 0%, #094d2e 100%)', padding: '1.25rem 1.25rem 2.5rem', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <img src={FLAG_CD} alt="RDC" style={{ width: 28, height: 19, borderRadius: 4, objectFit: 'cover' }} />
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>↔</span>
              <img src={FLAG_BI} alt="BI" style={{ width: 28, height: 19, borderRadius: 4, objectFit: 'cover' }} />
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.3px' }}>Volta Send</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.6rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>RDC · Burundi</div>
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: '0.3rem 0.75rem', display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 6, height: 6, background: '#4ade80', borderRadius: '50%', display: 'inline-block' }} />
            <span style={{ color: '#fff', fontSize: '0.72rem', fontWeight: 600 }}>Lightning</span>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {[['⚡', '<3s', 'Instantané'], ['💸', '0%', 'Frais'], ['🔓', 'No KYC', 'Requis']].map(([icon, val, label]) => (
            <div key={label} style={{ flex: 1, background: 'rgba(255,255,255,0.12)', borderRadius: 12, padding: '0.6rem 0.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.9rem' }}>{icon}</div>
              <div style={{ color: '#fff', fontWeight: 800, fontSize: '0.85rem' }}>{val}</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.6rem', fontWeight: 500 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '0 1rem 5rem', marginTop: '-1.25rem' }}>

        {tab === 'send' && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ExchangeCard />
          </div>
        )}

        {tab === 'how' && (
          <div style={{ background: '#fff', borderRadius: 20, padding: '1.5rem', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1a1d23', marginBottom: '1.25rem' }}>Comment ça marche ?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {steps.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: 40, height: 40, background: '#0f7a4a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.7rem', fontWeight: 800, flexShrink: 0 }}>{s.n}</div>
                  <div style={{ flex: 1, paddingTop: 4 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1a1d23', marginBottom: 2 }}>{s.icon} {s.title}</div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280', lineHeight: 1.5 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'about' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ background: '#fff', borderRadius: 20, padding: '1.5rem', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1a1d23', marginBottom: '0.75rem' }}>Volta Send</h2>
              <p style={{ fontSize: '0.85rem', color: '#6b7280', lineHeight: 1.7 }}>
                Transferts instantanés entre le Congo et le Burundi via le réseau Lightning Network. Sans compte, sans KYC, sans frais.
              </p>
            </div>
            {[
              ['⚡', 'Lightning Network', 'Transactions instantanées et sécurisées'],
              ['🔒', '100% Sécurisé', 'Chiffrement de bout en bout'],
              ['🌍', 'Fait pour l\'Afrique', 'Conçu pour l\'Afrique centrale'],
              ['💸', '0% Frais', 'Zéro frais de transaction'],
            ].map(([icon, title, desc]) => (
              <div key={title} style={{ background: '#fff', borderRadius: 16, padding: '1rem 1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: 44, height: 44, background: '#e6f4ed', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1a1d23' }}>{title}</div>
                  <div style={{ fontSize: '0.78rem', color: '#6b7280' }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Tab Bar */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 480, background: '#fff', borderTop: '1px solid #e2e5ea', display: 'flex', padding: '0.5rem 0 0.75rem', boxShadow: '0 -4px 20px rgba(0,0,0,0.08)' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, background: 'none', border: 'none', cursor: 'pointer', padding: '0.4rem 0' }}>
            <span style={{ fontSize: '1.2rem' }}>{t.icon}</span>
            <span style={{ fontSize: '0.65rem', fontWeight: 600, color: tab === t.id ? '#0f7a4a' : '#6b7280' }}>{t.label}</span>
            {tab === t.id && <span style={{ width: 4, height: 4, background: '#0f7a4a', borderRadius: '50%' }} />}
          </button>
        ))}
      </div>
    </div>
  )
}
