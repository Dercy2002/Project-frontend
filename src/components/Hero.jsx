import ExchangeCard from './ExchangeCard'
import { useLang } from '../LangContext'

export default function Hero() {
  const { t } = useLang()
  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      background: 'linear-gradient(160deg, #f0f7f3 0%, #e8f4ed 40%, #f7f8fa 100%)',
      padding: '100px 20px 80px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute', top: '-10%', right: '-5%',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(15,122,74,0.07) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-15%', left: '-8%',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(15,122,74,0.05) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative' }}>
        <div className="hero-grid">
          {/* Left */}
          <div className="hero-text">
            <div className="hero-badge">
              <span className="badge-dot" />
              Powered by Lightning Network
            </div>
            <h1>
              {t.heroTitle}<br />
              <span className="hero-highlight">{t.heroHighlight}</span>
            </h1>
            <p>{t.heroDesc}</p>
            <div className="hero-pills">
              <span className="pill pill-green">{t.secure}</span>
              <span className="pill">{t.free}</span>
              <span className="pill">{t.instant}</span>
              <span className="pill">{t.noKyc}</span>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-val">&lt;3s</div>
                <div className="stat-label">{t.avgTime}</div>
              </div>
              <div className="stat-divider" />
              <div className="stat">
                <div className="stat-val">0%</div>
                <div className="stat-label">{t.fees}</div>
              </div>
              <div className="stat-divider" />
              <div className="stat">
                <div className="stat-val">24/7</div>
                <div className="stat-label">{t.available}</div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="hero-card">
            <ExchangeCard />
          </div>
        </div>
      </div>

      <style>{`
        .hero-grid { display:grid; grid-template-columns:1fr 1fr; gap:5rem; align-items:center; }
        .hero-text h1 { font-size:3rem; font-weight:900; line-height:1.1; margin:1rem 0; color:var(--black); letter-spacing:-1px; }
        .hero-highlight { color:var(--green); }
        .hero-text p { font-size:1.05rem; color:var(--muted); margin-bottom:1.75rem; line-height:1.75; max-width:440px; }
        .hero-badge { display:inline-flex; align-items:center; gap:7px; background:#fff; color:var(--green); font-weight:600; font-size:0.8rem; padding:0.45rem 1rem; border-radius:var(--radius-pill); border:1px solid var(--gray-mid); box-shadow:var(--shadow-sm); letter-spacing:0.2px; }
        .badge-dot { width:7px; height:7px; background:var(--green); border-radius:50%; animation:pulse 2s infinite; flex-shrink:0; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(1.3)} }
        .hero-pills { display:flex; gap:0.5rem; flex-wrap:wrap; margin-bottom:2rem; }
        .pill { background:#fff; border:1.5px solid var(--gray-mid); border-radius:var(--radius-pill); padding:0.4rem 0.9rem; font-size:0.8rem; font-weight:600; color:var(--muted); }
        .pill-green { background:var(--green-light); border-color:var(--green); color:var(--green); }
        .hero-stats { display:inline-flex; align-items:center; gap:1.5rem; background:#fff; border-radius:var(--radius); padding:1.25rem 1.75rem; box-shadow:var(--shadow); border:1px solid var(--gray-mid); }
        .stat { text-align:center; }
        .stat-val { font-size:1.6rem; font-weight:900; color:var(--green); letter-spacing:-0.5px; }
        .stat-label { font-size:0.7rem; color:var(--muted); font-weight:500; margin-top:2px; text-transform:uppercase; letter-spacing:0.5px; }
        .stat-divider { width:1px; height:40px; background:var(--gray-mid); }
        .hero-card { display:flex; justify-content:center; }
        @media (max-width:960px) {
          .hero-grid { grid-template-columns:1fr; gap:3rem; }
          .hero-text h1 { font-size:2.2rem; }
          .hero-card { justify-content:stretch; }
        }
        @media (max-width:480px) {
          .hero-text h1 { font-size:1.85rem; }
          .hero-stats { gap:1rem; padding:1rem 1.25rem; }
          .stat-val { font-size:1.3rem; }
        }
      `}</style>
    </section>
  )
}
