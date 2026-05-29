const FLAG_BI = 'https://upload.wikimedia.org/wikipedia/commons/5/50/Flag_of_Burundi.svg'
const FLAG_CD = 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Flag_of_the_Democratic_Republic_of_the_Congo.svg'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--black)', color: '#fff', padding: '60px 20px 0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <img src={FLAG_CD} alt="RDC" className="footer-flag" />
              <span>↔</span>
              <img src={FLAG_BI} alt="Burundi" className="footer-flag" />
              <span className="footer-logo-text">Volta Send</span>
            </div>
            <p className="footer-tagline">
              La souveraineté financière pour l'Afrique centrale.
              Transferts instantanés via Lightning Network.
            </p>
            <div className="footer-badge">⚡ Powered by Lightning Network</div>
          </div>

          {/* Links */}
          <div className="footer-col">
            <h4>Navigation</h4>
            <a href="#home">Accueil</a>
            <a href="#how-it-works">Fonctionnement</a>
            <a href="#features">Avantages</a>
          </div>

          <div className="footer-col">
            <h4>Informations</h4>
            <span>0% Frais de transaction</span>
            <span>Sans KYC requis</span>
            <span>Disponible 24h/7j</span>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Volta Send. Tous droits réservés.</p>
          <p>Transfert instantané via Lightning Network</p>
        </div>
      </div>

      <style>{`
        .footer-grid { display:grid; grid-template-columns:2fr 1fr 1fr; gap:3rem; padding-bottom:3rem; }
        .footer-logo { display:flex; align-items:center; gap:8px; font-size:1.1rem; font-weight:800; margin-bottom:1rem; color:#fff; }
        .footer-flag { width:28px; height:19px; border-radius:4px; object-fit:cover; }
        .footer-logo-text { color:#fff; }
        .footer-tagline { font-size:0.85rem; color:rgba(255,255,255,0.5); line-height:1.7; margin-bottom:1rem; max-width:280px; }
        .footer-badge { display:inline-block; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.12); color:rgba(255,255,255,0.7); font-size:0.75rem; font-weight:600; padding:0.35rem 0.85rem; border-radius:var(--radius-pill); }
        .footer-col { display:flex; flex-direction:column; gap:0.6rem; }
        .footer-col h4 { font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; color:rgba(255,255,255,0.4); margin-bottom:0.5rem; }
        .footer-col a, .footer-col span { font-size:0.875rem; color:rgba(255,255,255,0.6); text-decoration:none; transition:color 0.2s; }
        .footer-col a:hover { color:#fff; }
        .footer-bottom { border-top:1px solid rgba(255,255,255,0.08); padding:1.5rem 0; display:flex; justify-content:space-between; align-items:center; font-size:0.78rem; color:rgba(255,255,255,0.35); }
        @media (max-width:768px) {
          .footer-grid { grid-template-columns:1fr 1fr; gap:2rem; }
          .footer-brand { grid-column:1/-1; }
          .footer-bottom { flex-direction:column; gap:0.4rem; text-align:center; }
        }
        @media (max-width:480px) { .footer-grid { grid-template-columns:1fr; } }
      `}</style>
    </footer>
  )
}
