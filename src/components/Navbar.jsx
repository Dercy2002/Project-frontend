import { useState, useEffect } from 'react'
import { useLang } from '../LangContext'

const FLAG_BI = 'https://upload.wikimedia.org/wikipedia/commons/5/50/Flag_of_Burundi.svg'
const FLAG_CD = 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Flag_of_the_Democratic_Republic_of_the_Congo.svg'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { lang, setLang, t } = useLang()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { href: '#home', label: t.home },
    { href: '#how-it-works', label: t.howItWorks },
    { href: '#features', label: t.features },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, width: '100%', zIndex: 1000,
      background: scrolled ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.92)',
      boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.08), 0 4px 24px rgba(0,0,0,0.06)' : 'none',
      backdropFilter: 'blur(16px)',
      transition: 'all 0.3s ease',
      borderBottom: scrolled ? 'none' : '1px solid rgba(0,0,0,0.06)',
    }}>
      <div className="nav-inner">
        <a href="#home" className="logo" style={{ textDecoration: 'none' }}>
          <div className="logo-flags">
            <img src={FLAG_CD} alt="RDC" className="flag" />
            <span className="logo-sep">↔</span>
            <img src={FLAG_BI} alt="Burundi" className="flag" />
          </div>
          <div className="logo-text">
            <span className="logo-main">Volta Send</span>
            <span className="logo-sub">RDC · Burundi</span>
          </div>
        </a>

        <div className="nav-links">
          {links.map(l => (
            <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
          ))}
        </div>

        <button onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')} style={{ background:'var(--gray)', border:'1.5px solid var(--gray-mid)', borderRadius:8, padding:'0.4rem 0.75rem', fontWeight:700, fontSize:'0.8rem', color:'var(--text)', cursor:'pointer', marginRight:'0.5rem' }}>
          {lang === 'fr' ? '🇬🇧 EN' : '🇫🇷 FR'}
        </button>
        <a href="#home" className="nav-cta">⚡ {t.send}</a>

        <button className="burger" onClick={() => setOpen(!open)} aria-label="Menu">
          <span className={`bar ${open ? 'bar-top' : ''}`} />
          <span className={`bar ${open ? 'bar-mid' : ''}`} />
          <span className={`bar ${open ? 'bar-bot' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="mobile-menu">
          {links.map(l => (
            <a key={l.href} href={l.href} className="mobile-link" onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <button onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')} style={{ background:'var(--gray)', border:'1.5px solid var(--gray-mid)', borderRadius:8, padding:'0.7rem', fontWeight:700, fontSize:'0.9rem', color:'var(--text)', cursor:'pointer', textAlign:'center' }}>
            {lang === 'fr' ? '🇬🇧 Switch to English' : '🇫🇷 Passer en Français'}
          </button>
          <a href="#home" className="mobile-cta" onClick={() => setOpen(false)}>⚡ {t.send}</a>
        </div>
      )}

      <style>{`
        .nav-inner { max-width:1200px; margin:0 auto; padding:0 1.5rem; height:64px; display:flex; justify-content:space-between; align-items:center; gap:1rem; }
        .logo { display:flex; align-items:center; gap:10px; }
        .logo-flags { display:flex; align-items:center; gap:4px; }
        .flag { width:28px; height:19px; border-radius:4px; object-fit:cover; box-shadow:0 1px 4px rgba(0,0,0,0.15); }
        .logo-sep { font-size:0.75rem; color:var(--muted); font-weight:600; }
        .logo-text { display:flex; flex-direction:column; line-height:1.1; }
        .logo-main { font-weight:800; font-size:1rem; color:var(--green); letter-spacing:-0.3px; }
        .logo-sub { font-size:0.65rem; color:var(--muted); font-weight:500; letter-spacing:0.5px; text-transform:uppercase; }
        .nav-links { display:flex; gap:0.25rem; margin-left:auto; margin-right:1rem; }
        .nav-link { color:var(--muted); text-decoration:none; font-weight:500; font-size:0.875rem; padding:0.5rem 0.75rem; border-radius:8px; transition:all 0.2s; }
        .nav-link:hover { color:var(--green); background:var(--green-light); }
        .nav-cta { background:var(--green); color:#fff; text-decoration:none; font-weight:700; font-size:0.875rem; padding:0.55rem 1.2rem; border-radius:var(--radius-pill); transition:all 0.2s; white-space:nowrap; }
        .nav-cta:hover { background:var(--green-hover); transform:translateY(-1px); box-shadow:0 4px 12px var(--green-glow); }
        .burger { display:none; flex-direction:column; gap:5px; background:none; padding:6px; border-radius:8px; }
        .bar { width:22px; height:2px; background:var(--text); border-radius:2px; display:block; transition:all 0.25s; }
        .mobile-menu { border-top:1px solid var(--gray-mid); background:#fff; padding:0.75rem 1.5rem 1.25rem; display:flex; flex-direction:column; gap:0.25rem; }
        .mobile-link { color:var(--text); text-decoration:none; font-weight:500; padding:0.7rem 0.5rem; font-size:0.95rem; border-radius:8px; transition:background 0.2s; }
        .mobile-link:hover { background:var(--gray); }
        .mobile-cta { margin-top:0.5rem; background:var(--green); color:#fff; text-decoration:none; font-weight:700; padding:0.85rem; border-radius:12px; text-align:center; font-size:0.95rem; }
        @media (max-width:768px) { .nav-links { display:none; } .nav-cta { display:none; } .burger { display:flex; } }
      `}</style>
    </nav>
  )
}
