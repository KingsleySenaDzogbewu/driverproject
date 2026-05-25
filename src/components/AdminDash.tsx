// src/components/AdminDash.jsx
import { INITIAL_LESSONS, STUDENTS_DATA, SCHEDULES, AUDIT_LOG } from '../data/mockData';

export default function AdminDash({ setPage }) {
  const typeColors = { auth: 'var(--blue)', lesson: 'var(--green)', quiz: 'var(--amber)', schedule: '#7c3aed', security: 'var(--red)' };

  return (
    <div style={{ padding: '24px' }}>
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

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '16px' }}>
        {/* User Account Registry Overview */}
        <div className="card anim-fadeup d2" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--gray3)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>User Overview</h3>
          </div>
          <table className="tbl" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px' }}>Name</th>
                <th style={{ textAlign: 'left', padding: '12px' }}>Role</th>
                <th style={{ textAlign: 'left', padding: '12px' }}>Progress</th>
                <th style={{ textAlign: 'left', padding: '12px' }}></th>
              </tr>
            </thead>
            <tbody>
              {STUDENTS_DATA.map(s => {
                const initials = s.name ? s.name.split(' ').map(w => w).join('').slice(0, 2).toUpperCase() : '??';
                return (
                  <tr key={s.id} style={{ borderBottom: '1px solid var(--gray2)' }}>
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="avatar" style={{ width: '30px', height: '30px', fontSize: '11px', background: 'var(--blue)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>
                          {initials}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '13px' }}>{s.name}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text3)' }}>{s.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px' }}><span className="badge badge-blue">Student</span></td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ fontWeight: 600, fontSize: '13px', color: s.progress >= 70 ? 'var(--green)' : 'var(--amber)' }}>{s.progress}%</span>
                    </td>
                    <td style={{ padding: '12px' }}><button className="btn btn-danger btn-sm">Deactivate</button></td>
                  </tr>
                );
              })}
              <tr style={{ borderBottom: '1px solid var(--gray2)' }}>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="avatar" style={{ width: '30px', height: '30px', fontSize: '11px', background: 'var(--green)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>KM</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '13px' }}>Kofi Mensah</div>
                      <div style={{ fontSize: '11px', color: 'var(--text3)' }}>instructor@demo.com</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '12px' }}><span className="badge badge-green">Instructor</span></td>
                <td style={{ padding: '12px' }}>—</td>
                <td style={{ padding: '12px' }}><button className="btn btn-secondary btn-sm">Manage</button></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 🛠️ REPLACED WITH YOUR EXACT MVP MINI AUDIT LOG COMPONENT BLOCK */}
        <div className="card card-p anim-fadeup d3">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Recent Activity</h3>
            <button className="btn btn-ghost btn-sm" onClick={() => setPage('admin-audit')}>View all →</button>
          </div>
          {AUDIT_LOG.slice(0, 6).map((e, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '8px 0', borderBottom: '1px solid var(--gray2)' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: typeColors[e.type] || 'var(--gray4)', marginTop: '5px', flexShrink: 0 }}></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: '600' }}>{e.action}</div>
                <div style={{ fontSize: '11px', color: 'var(--text3)' }}>{e.user} · {e.time}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

function StatCard({ icon, label, val, color }) {
  return (
    <div className="card stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-val" style={{ color: color }}>{val}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
