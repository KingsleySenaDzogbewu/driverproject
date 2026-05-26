// src/components/AdminAuditLog.jsx
import { AUDIT_LOG } from '../data/mockData';

export default function AdminAuditLog() {
  const typeColors = { auth: 'var(--blue)', lesson: 'var(--green)', quiz: 'var(--amber)', schedule: '#7c3aed', security: 'var(--red)' };

  return (
    <div style={{ padding: '24px' }}>
      <div className="ph anim-fadeup">
        <div className="ph-title">Audit Log</div>
        <div className="ph-sub">All system events with timestamps and user attribution</div>
      </div>

      <div className="card anim-fadeup d1" style={{ overflow: 'hidden' }}>
        <table className="tbl" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '12px' }}>Event</th>
              <th style={{ textAlign: 'left', padding: '12px' }}>User</th>
              <th style={{ textAlign: 'left', padding: '12px' }}>Type</th>
              <th style={{ textAlign: 'left', padding: '12px' }}>Time</th>
            </tr>
          </thead>
          <tbody>
            {AUDIT_LOG.map((e, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--gray2)' }}>
                <td style={{ padding: '12px', fontWeight: 600, fontSize: '13px' }}>{e.action}</td>
                <td style={{ padding: '12px', color: 'var(--text2)', fontSize: '13px' }}>{e.user}</td>
                <td style={{ padding: '12px' }}>
                  <span className="badge" style={{ background: `${typeColors[e.type]}18`, color: typeColors[e.type], padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>
                    {e.type}
                  </span>
                </td>
                <td style={{ padding: '12px', color: 'var(--text3)', fontSize: '12px' }}>{e.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
