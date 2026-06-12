// src/components/ManageSchedule.tsx
import { useState } from 'react';
import { SCHEDULES } from '../data/mockData';

export default function ManageSchedule() {
  const [schedulesList, setSchedulesList] = useState(SCHEDULES);
  const [showAddSchedule, setShowAddSchedule] = useState(false);
  const [newSchedule, setNewSchedule] = useState({ title: '', date: '', time: '', type: 'zoom', link: '' });

  const handleInputChange = (field, value) => {
    setNewSchedule(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateSession = () => {
    if (!newSchedule.title || !newSchedule.date || !newSchedule.time) {
      return alert('Please populate session titles, dates, and times.');
    }

    const createdSession = {
      id: Date.now(),
      title: newSchedule.title,
      instructor: 'Kofi Mensah',
      date: newSchedule.date,
      time: newSchedule.time,
      link: newSchedule.link || 'https://zoom.us',
      type: newSchedule.type
    };

    setSchedulesList([...schedulesList, createdSession]);
    setNewSchedule({ title: '', date: '', time: '', type: 'zoom', link: '' });
    setShowAddSchedule(false);
  };

  const handleDeleteSchedule = (id) => {
    setSchedulesList(schedulesList.filter(s => s.id !== id));
  };

  return (
    /* FIX 1: Linked to your responsive padding global dashboard-wrapper class */
    <div className="dashboard-wrapper">
      {/* FIX 2: Turned header row responsive */}
      <div className="responsive-header-row anim-fadeup">
        <div>
          <div className="ph-title">Session Schedule</div>
          <div className="ph-sub">Manage your live teaching sessions</div>
        </div>
        <button className="btn btn-green header-action-btn" onClick={() => setShowAddSchedule(!showAddSchedule)}>
          {showAddSchedule ? 'Close Form' : '+ New Session'}
        </button>
      </div>

      {showAddSchedule && (
        <div className="card card-p anim-pop" style={{ marginBottom: '18px', background: 'var(--greenbg)', borderColor: 'var(--greenborder)', boxSizing: 'border-box', width: '100%' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '16px' }}>Schedule New Session</h3>
          <div className="grid-2">
            <div className="field form-full-width">
              <label className="label" style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold' }}>Session title</label>
              <input className="input" style={{ width: '100%' }} value={newSchedule.title} onChange={(e) => handleInputChange('title', e.target.value)} placeholder="e.g. Roundabouts Deep Dive Q&A" />
            </div>
            <div className="field">
              <label className="label" style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold' }}>Date</label>
              <input className="input" style={{ width: '100%' }} type="date" value={newSchedule.date} onChange={(e) => handleInputChange('date', e.target.value)} />
            </div>
            <div className="field">
              <label className="label" style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold' }}>Time</label>
              <input className="input" style={{ width: '100%' }} type="time" value={newSchedule.time} onChange={(e) => handleInputChange('time', e.target.value)} />
            </div>
            <div className="field">
              <label className="label" style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold' }}>Platform</label>
              <select className="input" style={{ width: '100%' }} value={newSchedule.type} onChange={(e) => handleInputChange('type', e.target.value)}>
                <option value="zoom">Zoom</option>
                <option value="meet">Google Meet</option>
              </select>
            </div>
            <div className="field">
              <label className="label" style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold' }}>Meeting link</label>
              <input className="input" style={{ width: '100%' }} placeholder="https://…" value={newSchedule.link} onChange={(e) => handleInputChange('link', e.target.value)} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
            <button className="btn btn-green" onClick={handleCreateSession}>Create Session</button>
            <button className="btn btn-secondary" onClick={() => setShowAddSchedule(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Main Schedule Listings Stack */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', boxSizing: 'border-box' }}>
        {schedulesList.map((s, i) => (
          /* FIX 3: Replaced tight dynamic layouts with a unified responsive class assignment */
          <div key={s.id} className={`card schedule-manage-item anim-fadeup d${i + 1}`}>
            <div className="schedule-main-content">
              <div className="sched-icon" style={{ background: s.type === 'zoom' ? 'var(--bluebg)' : 'var(--greenbg)', width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
                {s.type === 'zoom' ? '📹' : '🎥'}
              </div>
              <div className="schedule-text-details">
                <div className="schedule-title-heading">{s.title}</div>
                <div className="schedule-meta-row">
                  <span>📅 {s.date}</span>
                  <span>🕐 {s.time}</span>
                  <span className={`badge ${s.type === 'zoom' ? 'badge-blue' : 'badge-green'}`} style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px' }}>
                    {s.type === 'zoom' ? 'Zoom' : 'Google Meet'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* FIX 4: Explicit inline style safeguards for the Cancel action trigger element button */}
            <button 
              className="btn btn-danger btn-sm schedule-cancel-btn" 
              style={{ 
                backgroundColor: '#dc2626', 
                borderColor: '#dc2626', 
                color: '#ffffff',
                padding: '6px 12px'
              }} 
              onClick={() => handleDeleteSchedule(s.id)}
            >
              ✕ Cancel
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
