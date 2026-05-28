const features = [
  { icon: '🔓', title: 'Zero KYC', desc: 'Aucun compte, aucune vérification d\'identité requise' },
  { icon: '⚡', title: 'Lightning Fast', desc: 'Transactions instantanées via le réseau Lightning' },
  { icon: '🔒', title: 'Sécurisé', desc: 'Chiffrement de bout en bout, fonds protégés' },
  { icon: '📱', title: 'Mobile First', desc: 'Conçu pour les utilisateurs mobile money' },
  { icon: '🌍', title: 'Pour l\'Afrique', desc: 'Fait en Afrique, pour l\'Afrique centrale' },
  { icon: '💸', title: '0% Frais', desc: 'Zéro frais de transaction, toujours' },
]

export default function Features() {
  return (
    <section id="features" style={{ padding: '100px 20px', background: 'var(--gray)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="section-eyebrow">Avantages</div>
        <h2 className="section-title">Pourquoi Bridge RDC ↔ Burundi ?</h2>
        <p className="section-sub">La solution la plus rapide pour les transferts transfrontaliers.</p>

        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feat-icon-wrap">
                <span className="feat-icon">{f.icon}</span>
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .features-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1.25rem; margin-top:2.5rem; }
        .feature-card { background:#fff; border-radius:var(--radius); padding:1.75rem 1.5rem; border:1px solid var(--gray-mid); transition:all 0.25s; }
        .feature-card:hover { transform:translateY(-4px); box-shadow:var(--shadow); border-color:transparent; }
        .feat-icon-wrap { width:48px; height:48px; background:var(--green-light); border-radius:12px; display:flex; align-items:center; justify-content:center; margin-bottom:1rem; }
        .feat-icon { font-size:1.4rem; }
        .feature-card h3 { font-size:0.95rem; font-weight:700; color:var(--text); margin-bottom:0.4rem; }
        .feature-card p { font-size:0.83rem; color:var(--muted); line-height:1.6; }
        @media (max-width:768px) { .features-grid { grid-template-columns:repeat(2,1fr); } }
        @media (max-width:480px) { .features-grid { grid-template-columns:1fr; } }
      `}</style>
    </section>
  )
}
