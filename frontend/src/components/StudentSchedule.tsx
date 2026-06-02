// src/components/StudentSchedule.tsx
import { SCHEDULES } from '../data/mockData';

export default function StudentSchedule() {
  return (
    <div style={{ padding: '24px' }}>
      <div className="ph anim-fadeup">
        <div className="ph-title">Upcoming Sessions</div>
        <div className="ph-sub">Live classes and consultations with your instructors</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {SCHEDULES.map((s, i) => (
          <div key={s.id} className={`card sched-card anim-fadeup d${i + 1}`}>
            <div className="sched-icon" style={{ background: s.type === 'zoom' ? 'var(--bluebg)' : 'var(--greenbg)' }}>
              {s.type === 'zoom' ? '📹' : '🎥'}
            </div>
            <div className="sched-info">
              <div className="sched-title">{s.title}</div>
              <div className="sched-meta">
                <span>👤 {s.instructor}</span>
                <span>📅 {s.date}</span>
                <span>🕐 {s.time}</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
              <span className="badge ${s.type==='zoom'?'badge-blue':'badge-green'}">
                {s.type === 'zoom' ? 'Zoom' : 'Google Meet'}
              </span>
              <button 
                className={`btn ${s.type === 'zoom' ? 'btn-primary' : 'btn-green'} btn-sm`} 
                onClick={() => window.open(s.link, '_blank')}
              >
                Join Session
              </button>
            </div>
          </div>
        ))}
        
        {SCHEDULES.length === 0 && (
          <div className="card card-p" style={{ textAlign: 'center', color: 'var(--text3)' }}>
            No upcoming sessions scheduled.
          </div>
        )}
      </div>
    </div>
  );
}
