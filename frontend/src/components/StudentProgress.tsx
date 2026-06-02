// src/components/StudentProgress.tsx
import { INITIAL_LESSONS, CATS, QUIZ_HISTORY } from '../data/mockData';

//  Define what a Category object looks like
interface CategoryConfig {
  emoji: string;
  color: string;
}

// Define the shape of the CATS object map
interface CatsMap {
  [categoryName: string]: CategoryConfig;
}


export default function StudentProgress({ setActiveLessonId, setPage }) {
  const done = INITIAL_LESSONS.filter(l => l.done).length;
  const readiness = Math.round((done / INITIAL_LESSONS.length) * 60 + 78 * 0.4);

  const openLesson = (id) => {
    setActiveLessonId(id);
    setPage('lesson-player');
  };

  return (
    <div style={{ padding: '24px' }}>
      <div className="ph anim-fadeup">
        <div className="ph-title">Progress Dashboard</div>
        <div className="ph-sub">Your licence readiness at a glance</div>
      </div>

      {/* Grid Analytics Row */}
      <div className="grid-3 anim-fadeup d1" style={{ marginBottom: '20px' }}>
        <StatCard icon="📚" label="Lessons Completed" val={`${done} / ${INITIAL_LESSONS.length}`} color="var(--blue)" />
        <StatCard icon="🧠" label="Quiz Average" val="78%" color="var(--green)" />
        <StatCard icon="🎯" label="Licence Readiness" val={`${readiness}%`} color={readiness >= 70 ? 'var(--green)' : readiness >= 50 ? 'var(--amber)' : 'var(--red)'} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '16px' }}>
        <div>
          {/* Progress by Category Panel */}
          <div className="card card-p anim-fadeup d2" style={{ marginBottom: '16px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: '700', marginBottom: '16px' }}>Progress by Category</h3>
            {Object.entries(CATS as CatsMap).map(([cat, cfg]) => {
              const catLessons = INITIAL_LESSONS.filter(l => l.cat === cat);
              const catDone = catLessons.filter(l => l.done).length;
              return (
                <ProgBar 
                  key={cat}
                  label={`${cfg.emoji} ${cat}`} 
                  color={cfg.color} 
                  pct={(catDone / catLessons.length) * 100} 
                  val={`${catDone}/${catLessons.length}`} 
                />
              );
            })}
          </div>

          {/* Lesson Progress Table Matrix */}
          <div className="card anim-fadeup d3" style={{ overflow: 'hidden' }}>
            <table className="tbl" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Lesson</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Status</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {INITIAL_LESSONS.slice(0, 6).map(l => (
                  <tr key={l.id} style={{ borderBottom: '1px solid var(--gray2)' }}>
                    <td style={{ padding: '12px' }}>
                      <div style={{ fontWeight: '600', fontSize: '13px' }}>{l.title}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text3)' }}>{l.cat}</div>
                    </td>
                    <td style={{ padding: '12px' }}>
                      {l.done ? <span className="badge badge-green">✓ Done</span> : <span className="badge badge-gray">Pending</span>}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => openLesson(l.id)}>
                        {l.done ? 'Review' : 'Start'} →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar Columns */}
        <div>
          {/* Quiz History Cards Wrapper */}
          <div className="card card-p anim-fadeup d2" style={{ marginBottom: '14px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: '700', marginBottom: '14px' }}>Quiz History</h3>
            {QUIZ_HISTORY.map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid var(--gray2)' }}>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '13px' }}>{r.lesson}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text3)' }}>{r.date}</div>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: '800', color: r.score >= 80 ? 'var(--green)' : r.score >= 60 ? 'var(--amber)' : 'var(--red)' }}>
                  {r.score}%
                </div>
              </div>
            ))}
          </div>

          {/* Verdict Summary Card */}
          <div className="card card-p anim-fadeup d3" style={{ textAlign: 'center', backgroundColor: readiness >= 70 ? 'var(--greenbg)' : 'var(--amberbg)', borderColor: readiness >= 70 ? 'var(--greenborder)' : 'var(--amberborder)' }}>
            <div style={{ fontSize: '40px', marginBottom: '8px' }}>{readiness >= 70 ? '🏆' : '⏳'}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: '800', color: readiness >= 70 ? 'var(--green)' : 'var(--amber)' }}>
              {readiness >= 70 ? 'Almost Test Ready!' : 'Keep Going!'}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text3)', marginTop: '6px' }}>
              {readiness >= 70 ? "You're on track. Complete remaining lessons to hit 100%." : 'Complete more lessons and quizzes to boost your readiness score.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Global UI Layout Helpers placed outside component block to protect runtime loop rendering
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
      <div className="prog-track"><div className="prog-fill" style={{ width: `${pct}%`, background: color }}></div></div>
    </div>
  );
}
