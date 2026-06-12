// src/components/StudentSchedule.tsx
import { SCHEDULES } from '../data/mockData';

export default function StudentSchedule() {
  return (
    /* Changed to your responsive class name wrapper */
    <div className="dashboard-wrapper">
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
                <span className="meta-item">👤 {s.instructor}</span>
                <span className="meta-item">📅 {s.date}</span>
                <span className="meta-item">🕐 {s.time}</span>
              </div>
            </div>
            
            {/* Added a responsive actions container wrapper */}
            <div className="sched-actions">
              {/* Fixed String Literal Bug: Changed to backticks for accurate interpolation */}
              <span className={`badge ${s.type === 'zoom' ? 'badge-blue' : 'badge-green'}`}>
                {s.type === 'zoom' ? 'Zoom' : 'Google Meet'}
              </span>
              <button 
                className={`btn ${s.type === 'zoom' ? 'btn-primary' : 'btn-green'} btn-sm sched-btn`} 
                onClick={() => window.open(s.link, '_blank')}
              >
                Join
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
