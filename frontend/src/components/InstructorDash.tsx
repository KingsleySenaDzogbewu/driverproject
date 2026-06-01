// src/components/InstructorDash.tsx
import { INITIAL_LESSONS, STUDENTS_DATA, SCHEDULES } from '../data/mockData';

export default function InstructorDash() {
  return (
    <div style={{ padding: '24px' }}>
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

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '16px' }}>
        {/* Student Progress Table Grid */}
        <div className="card anim-fadeup d2" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '20px 22px 14px', borderBottom: '1px solid var(--gray3)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Student Progress</h3>
          </div>
          <table className="tbl" style={{ width: '100%', borderCollapse: 'collapse' }}>
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
                        <div className="avatar" style={{ width: '32px', height: '32px', fontSize: '12px', background: 'var(--blue)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>
                          {initials}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '13px' }}>{s.name}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text3)' }}>{s.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '60px', height: '5px', background: 'var(--gray2)', borderRadius: '3px', overflow: 'hidden' }}>
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

        {/* Right Sidebar Calendar Mini View */}
        <div className="card card-p anim-fadeup d3">
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '14px' }}>Your Sessions</h3>
          {SCHEDULES.map(s => (
            <div key={s.id} style={{ padding: '10px 0', borderBottom: '1px solid var(--gray2)' }}>
              <div style={{ fontWeight: 600, fontSize: '13px', marginBottom: '3px' }}>{s.title}</div>
              <div style={{ fontSize: '11px', color: 'var(--text3)' }}>{s.date} · {s.time}</div>
            </div>
          ))}
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
