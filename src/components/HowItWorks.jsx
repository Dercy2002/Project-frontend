import { useLang } from '../LangContext'

export default function HowItWorks() {
  const { t } = useLang()

  const steps = [
    { n: '01', icon: '🔀', title: t.step1Title, desc: t.step1Desc },
    { n: '02', icon: '📝', title: t.step2Title, desc: t.step2Desc },
    { n: '03', icon: '✅', title: t.step3Title, desc: t.step3Desc },
    { n: '04', icon: '⚡', title: t.step4Title, desc: t.step4Desc },
  ]

  return (
    <section id="how-it-works" style={{ background: '#fff', padding: '100px 20px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="section-eyebrow">{t.process}</div>
        <h2 className="section-title">{t.howTitle}</h2>
        <p className="section-sub">{t.howSub}</p>

        <div className="steps-grid">
          {steps.map((s, i) => (
            <div key={i} className="step-card">
              <div className="step-top">
                <div className="step-num">{s.n}</div>
                {i < steps.length - 1 && <div className="step-connector" />}
              </div>
              <div className="step-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .section-eyebrow { text-align:center; font-size:0.75rem; font-weight:700; color:var(--green); text-transform:uppercase; letter-spacing:2px; margin-bottom:0.75rem; }
        .section-title { text-align:center; font-size:2rem; font-weight:900; color:var(--black); margin-bottom:0.6rem; letter-spacing:-0.5px; }
        .section-sub { text-align:center; color:var(--muted); margin-bottom:3rem; font-size:1rem; }
        .steps-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:0; }
        .step-card { padding:0 1.5rem 2rem; text-align:center; position:relative; }
        .step-top { display:flex; align-items:center; justify-content:center; margin-bottom:1.25rem; position:relative; }
        .step-num { width:48px; height:48px; background:var(--green); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:0.75rem; font-weight:800; color:#fff; letter-spacing:0.5px; flex-shrink:0; position:relative; z-index:1; }
        .step-connector { position:absolute; left:calc(50% + 24px); right:calc(-50% + 24px); height:1.5px; background:linear-gradient(90deg, var(--green), var(--gray-mid)); top:50%; transform:translateY(-50%); }
        .step-icon { font-size:1.75rem; margin-bottom:0.75rem; }
        .step-card h3 { font-size:0.95rem; font-weight:700; color:var(--text); margin-bottom:0.4rem; }
        .step-card p { font-size:0.83rem; color:var(--muted); line-height:1.6; }
        @media (max-width:768px) {
          .steps-grid { grid-template-columns:repeat(2,1fr); gap:1.5rem; }
          .step-connector { display:none; }
          .step-card { background:var(--gray); border-radius:var(--radius); padding:1.5rem 1rem; }
        }
        @media (max-width:480px) { .steps-grid { grid-template-columns:1fr; } }
      `}</style>
    </section>
  )
}
