// src/components/InstructorDash.tsx
import { INITIAL_LESSONS, STUDENTS_DATA, SCHEDULES } from '../data/mockData';

interface InstructorDashProps {
  setPage: (page: string) => void;
}

export default function InstructorDash({ setPage }: InstructorDashProps) {
  return (
    /* FIX 1: Replaced inline padding with your global dashboard-wrapper class */
    <div className="dashboard-wrapper">
      <div className="ph anim-fadeup">
        <div className="ph-title">Instructor Dashboard</div>
        <div className="ph-sub">Manage your lessons, quizzes and scheduled sessions</div>
      </div>

      {/* Grid Stats Row */}
      <div className="grid-4 anim-fadeup d1" style={{ marginBottom: '20px' }}>
        <StatCard icon="📚" label="Total Lessons" val={INITIAL_LESSONS.length} color="var(--blue)" />
        <StatCard icon="👥" label="Active Students" val={STUDENTS_DATA.length} color="var(--green)" />
        <StatCard icon="📅" label="Sessions" val={SCHEDULES.length} color="var(--amber)" />
        <StatCard icon="🧠" label="Avg. Score" val="73%" color="#7c3aed" />
      </div>

      {/* FIX 2: Replaced the rigid 3fr 2fr inline split with a responsive class */}
      <div className="responsive-instructor-grid">
        {/* Student Progress Table Grid */}
        <div className="card anim-fadeup d2" style={{ overflow: 'hidden', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ padding: '20px 22px 14px', borderBottom: '1px solid var(--gray3)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px' }}>Student Progress</h3>
          </div>
          
          {/* FIX 3: Wrapped the table with a touch-friendly horizontal overflow box */}
          <div style={{ overflowX: 'auto', width: '100%', WebkitOverflowScrolling: 'touch' }}>
            <table className="tbl" style={{ width: '100%', minWidth: '500px', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Student</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Readiness</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Quiz Avg</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}></th>
                </tr>
              </thead>
              <tbody>
                {STUDENTS_DATA.map(s => {
                  const initials = s.name ? s.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() : '??';
                  return (
                    <tr key={s.id} style={{ borderBottom: '1px solid var(--gray2)' }}>
                      <td style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div className="avatar" style={{ width: '32px', height: '32px', fontSize: '12px', background: 'var(--blue)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', flexShrink: 0 }}>
                            {initials}
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap' }}>{s.name}</div>
                            <div style={{ fontSize: '11px', color: 'var(--text3)', whiteSpace: 'nowrap' }}>{s.email}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '60px', height: '5px', background: 'var(--gray2)', borderRadius: '3px', overflow: 'hidden', flexShrink: 0 }}>
                            <div style={{ height: '100%', width: `${s.progress}%`, background: s.progress >= 70 ? 'var(--green)' : 'var(--amber)' }}></div>
                          </div>
                          <span style={{ fontSize: '12px', fontWeight: 600, color: s.progress >= 70 ? 'var(--green)' : 'var(--amber)' }}>{s.progress}%</span>
                        </div>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <span style={{ fontWeight: 600, color: s.quizAvg >= 80 ? 'var(--green)' : s.quizAvg >= 60 ? 'var(--amber)' : 'var(--red)' }}>{s.quizAvg}%</span>
                      </td>
                      <td style={{ padding: '12px' }}><button className="btn btn-ghost btn-sm">View</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar Calendar Mini View */}
        <div className="card card-p anim-fadeup d3" style={{ width: '100%', boxSizing: 'border-box' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '14px', fontSize: '15px' }}>Your Sessions</h3>
          {SCHEDULES.map(s => (
            <div key={s.id} style={{ padding: '10px 0', borderBottom: '1px solid var(--gray2)' }}>
              <div style={{ fontWeight: 600, fontSize: '13px', marginBottom: '3px' }}>{s.title}</div>
              <div style={{ fontSize: '11px', color: 'var(--text3)' }}>{s.date} · {s.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Location Card Panel */}
      <div className="card anim-fadeup" style={{ marginTop: '22px', padding: '22px', width: '100%', boxSizing: 'border-box' }}>
        {/* FIX 4: Replaced the fixed inline flex bar with a responsive layout helper class */}
        <div className="responsive-location-row">
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '8px', fontSize: '15px' }}>Share Your Live Location</div>
            <div style={{ fontSize: '13px', color: 'var(--text3)', lineHeight: '1.4' }}>
              Open your next student session and share your location so the student can track you in real time.
            </div>
          </div>
          <button className="btn btn-primary btn-sm location-btn" onClick={() => setPage('instructor-practical-lessons')}>
            Go to Practical Lessons
          </button>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: string;
  label: string;
  val: string | number;
  color: string;
}

function StatCard({ icon, label, val, color }: StatCardProps) {
  return (
    <div className="card stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-val" style={{ color: color }}>{val}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
