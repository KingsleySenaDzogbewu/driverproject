// src/components/AdminDash.tsx
import { INITIAL_LESSONS, STUDENTS_DATA, SCHEDULES, AUDIT_LOG } from '../data/mockData';
import { DashboardSubPage } from '../pages/DashboardPage';

interface AdminDashProps {
  setPage: (page: DashboardSubPage) => void;
}

export default function AdminDash({ setPage }: AdminDashProps) {
  const typeColors = { auth: 'var(--blue)', lesson: 'var(--green)', quiz: 'var(--amber)', schedule: '#7c3aed', security: 'var(--red)' };

  return (
    /* FIX 1: Linked to your global responsive padding wrapper */
    <div className="dashboard-wrapper">
      <div className="ph anim-fadeup">
        <div className="ph-title">Admin Dashboard</div>
        <div className="ph-sub">Platform-wide overview and system health</div>
      </div>

      {/* Global Numerical Analytics Matrix */}
      <div className="grid-4 anim-fadeup d1" style={{ marginBottom: '20px' }}>
        <StatCard icon="👥" label="Total Users" val={STUDENTS_DATA.length + 3} color="var(--blue)" />
        <StatCard icon="📚" label="Total Lessons" val={INITIAL_LESSONS.length} color="var(--green)" />
        <StatCard icon="📅" label="Scheduled Sessions" val={SCHEDULES.length} color="var(--amber)" />
        <StatCard icon="🎯" label="Avg. Readiness" val="62%" color="#7c3aed" />
      </div>

      <div className="responsive-admin-grid">
        <div className="card anim-fadeup d2" style={{ overflow: 'hidden', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--gray3)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px' }}>User Overview</h3>
          </div>
          <div style={{ overflowX: 'auto', width: '100%', WebkitOverflowScrolling: 'touch' }}>
            <table className="tbl" style={{ width: '100%', minWidth: '550px', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Name</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Role</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Progress</th>
                </tr>
              </thead>
              <tbody>
                {STUDENTS_DATA.map(s => {
                  const initials = s.name ? s.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() : '??';
                  return (
                    <tr key={s.id} style={{ borderBottom: '1px solid var(--gray2)' }}>
                      <td style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div className="avatar" style={{ width: '30px', height: '30px', fontSize: '11px', background: 'var(--blue)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', flexShrink: 0 }}>
                            {initials}
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap' }}>{s.name}</div>
                            <div style={{ fontSize: '11px', color: 'var(--text3)', whiteSpace: 'nowrap' }}>{s.email}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '12px' }}><span className="badge badge-blue">Student</span></td>
                      <td style={{ padding: '12px' }}>
                        <span style={{ fontWeight: 600, fontSize: '13px', color: s.progress >= 70 ? 'var(--green)' : 'var(--amber)' }}>{s.progress}%</span>
                      </td>
                    </tr>
                  );
                })}
                <tr style={{ borderBottom: '1px solid var(--gray2)' }}>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div className="avatar" style={{ width: '30px', height: '30px', fontSize: '11px', background: 'var(--green)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', flexShrink: 0 }}>KM</div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap' }}>Kofi Mensah</div>
                        <div style={{ fontSize: '11px', color: 'var(--text3)', whiteSpace: 'nowrap' }}>instructor@demo.com</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px' }}><span className="badge badge-green">Instructor</span></td>
                  <td style={{ padding: '12px' }}>—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity Panel */}
        <div className="card card-p anim-fadeup d3" style={{ width: '100%', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', gap: '10px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px' }}>Recent Activity</h3>
            <button className="btn btn-ghost btn-sm" style={{ flexShrink: 0 }} onClick={() => setPage('admin-audit')}>View all →</button>
          </div>
          {AUDIT_LOG.slice(0, 6).map((e, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '8px 0', borderBottom: '1px solid var(--gray2)' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: typeColors[e.type] || 'var(--gray4)', marginTop: '5px', flexShrink: 0 }}></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '13px', fontWeight: '600', lineHeight: '1.4' }}>{e.action}</div>
                <div style={{ fontSize: '11px', color: 'var(--text3)', marginTop: '2px' }}>{e.user} · {e.time}</div>
              </div>
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
