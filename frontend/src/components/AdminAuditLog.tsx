// src/components/AdminAuditLog.tsx
import { AUDIT_LOG } from '../data/mockData';

export default function AdminAuditLog() {
  const typeColors = { auth: 'var(--blue)', lesson: 'var(--green)', quiz: 'var(--amber)', schedule: '#7c3aed', security: 'var(--red)' };

  return (
    /* FIX 1: Linked to your global responsive padding dashboard-wrapper class */
    <div className="dashboard-wrapper">
      <div className="ph anim-fadeup">
        <div className="ph-title">Audit Log</div>
        <div className="ph-sub">All system events with timestamps and user attribution</div>
      </div>

      <div className="card anim-fadeup d1" style={{ overflow: 'hidden', width: '100%', boxSizing: 'border-box' }}>
        {/* FIX 2: Wrapped table in a responsive, touch-friendly horizontal scroll container */}
        <div style={{ overflowX: 'auto', width: '100%', WebkitOverflowScrolling: 'touch' }}>
          {/* FIX 3: Added a safe min-width baseline to keep tabular columns legible */}
          <table className="tbl" style={{ width: '100%', minWidth: '500px', borderCollapse: 'collapse' }}>
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
                  {/* FIX 4: Constrained cell padding and wrapped long string data safely */}
                  <td style={{ padding: '12px', fontWeight: 600, fontSize: '13px', lineHeight: '1.4' }}>{e.action}</td>
                  <td style={{ padding: '12px', color: 'var(--text2)', fontSize: '13px', whiteSpace: 'nowrap' }}>{e.user}</td>
                  <td style={{ padding: '12px' }}>
                    <span className="badge" style={{ background: `${typeColors[e.type]}18`, color: typeColors[e.type], padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>
                      {e.type}
                    </span>
                  </td>
                  <td style={{ padding: '12px', color: 'var(--text3)', fontSize: '12px', whiteSpace: 'nowrap' }}>{e.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
