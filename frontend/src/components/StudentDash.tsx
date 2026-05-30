// src/components/StudentDash.jsx
import { INITIAL_LESSONS, SCHEDULES, CATS } from '../data/mockData';

export default function StudentDash({ user, setPage, setActiveLessonId }) {
  const done = INITIAL_LESSONS.filter(l => l.done).length;
  const readiness = Math.round((done / INITIAL_LESSONS.length) * 60 + 78 * 0.4);
  const nextSession = SCHEDULES[0];

  const openLesson = (id) => {
    setActiveLessonId(id);
    setPage('lesson-player');
  };

  return (
    <>
      {/* Header Panel */}
      <div className="ph anim-fadeup">
        <div className="ph-title">Welcome back, {user?.name ? user.name.split(' ')[0] : 'Student'} 👋</div>
        <div className="ph-sub">Pick up where you left off on your journey to your driving licence.</div>
      </div>

      {/* Numerical Metrics Matrix */}
      <div className="grid-4 anim-fadeup d1" style={{ marginBottom: '20px' }}>
        <StatCard icon="📚" label="Lessons Done" val={`${done} / ${INITIAL_LESSONS.length}`} color="var(--blue)" />
        <StatCard icon="🧠" label="Quiz Average" val="78%" color="var(--green)" />
        <StatCard icon="🎯" label="Readiness" val={`${readiness}%`} color={readiness >= 70 ? 'var(--green)' : readiness >= 50 ? 'var(--amber)' : 'var(--red)'} />
        <StatCard icon="📅" label="Sessions" val={SCHEDULES.length} color="#7c3aed" />
      </div>

      {/* Main Splitting Columns Layout row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '16px' }}>
        
        {/* Progress Assessment Cards Wrapper */}
        <div className="card card-p anim-fadeup d2">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: '700' }}>Your Progress</h3>
            <button className="btn btn-ghost btn-sm" onClick={() => setPage('progress')}>Full report →</button>
          </div>
          <ProgBar label="Lessons completed" color="#2563eb" pct={(done / INITIAL_LESSONS.length) * 100} val={`${done} / ${INITIAL_LESSONS.length}`} />
          <ProgBar label="Average quiz score" color="#16a34a" pct={78} val="78%" />
          <ProgBar label="Licence readiness" color={readiness >= 70 ? '#16a34a' : readiness >= 50 ? '#d97706' : '#dc2626'} pct={readiness} val={`${readiness}%`} />
        </div>

        {/* Next Calendar Event Drawer Panel */}
        <div className="card card-p anim-fadeup d3">
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: '700', marginBottom: '14px' }}>Next Session</h3>
          {nextSession ? (
            <div style={{ marginBottom: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: nextSession.type === 'zoom' ? 'var(--bluebg)' : 'var(--greenbg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '10px' }}>
                {nextSession.type === 'zoom' ? '📹' : '🎥'}
              </div>
              <div style={{ fontWeight: '700', fontSize: '13px', marginBottom: '6px', lineHeight: '1.4' }}>{nextSession.title}</div>
              <div style={{ fontSize: '12px', color: 'var(--text3)', marginBottom: '4px' }}>👤 {nextSession.instructor}</div>
              <div style={{ fontSize: '12px', color: 'var(--text3)', marginBottom: '14px' }}>📅 {nextSession.date} · {nextSession.time}</div>
              <button className="btn btn-green btn-sm" style={{ width: '100%', justifyContent: 'center' }} onClick={() => window.open(nextSession.link, '_blank')}>Join Session</button>
            </div>
          ) : (
            <div style={{ color: 'var(--text3)', fontSize: '13px' }}>No upcoming sessions.</div>
          )}
        </div>
      </div>

      {/* Continue Learning Bottom Cards Shelf (Wired up cleanly) */}
      <div className="card card-p anim-fadeup d4">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: '700' }}>Continue Learning</h3>
          <button className="btn btn-ghost btn-sm" onClick={() => setPage('lessons')}>All lessons →</button>
        </div>
        <div className="grid-3">
          {INITIAL_LESSONS.filter(l => !l.done).slice(0, 3).map(l => (
            <div 
              key={l.id}
              className="card" 
              style={{ padding: '16px', cursor: 'pointer', border: '1.5px solid var(--gray3)', transition: 'all .2s' }} 
              onClick={() => openLesson(l.id)}
            >
              <div style={{ fontSize: '22px', marginBottom: '8px' }}>{CATS[l.cat]?.emoji || '📚'}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: '700', marginBottom: '5px', lineHeight: '1.3' }}>{l.title}</div>
              <div style={{ fontSize: '11px', color: 'var(--text3)' }}>⏱ {l.dur}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ════════════════════════════════════════════════════
// PURE REUSABLE HELPERS (OUTSIDE MAIN COMPONENT RENDER)
// ════════════════════════════════════════════════════

function StatCard({ icon, label, val, color }) {
  return (
    <div className="card stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-val" style={{ color: color }}>{val}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function ProgBar({ label, color, pct, val }) {
  return (
    <div className="prog-wrap">
      <div className="prog-header">
        <span className="prog-label">{label}</span>
        <span className="prog-val">{val}</span>
      </div>
      <div className="prog-track">
        <div className="prog-fill" style={{ width: `${pct}%`, background: color }}></div>
      </div>
    </div>
  );
}
