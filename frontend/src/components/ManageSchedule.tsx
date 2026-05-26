// src/components/ManageSchedule.jsx
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
      instructor: 'Kofi Mensah', // Logged-in default provider reference
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
    <div style={{ padding: '24px' }}>
      <div className="ph-row ph anim-fadeup" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <div className="ph-title">Session Schedule</div>
          <div className="ph-sub">Manage your live teaching sessions</div>
        </div>
        <button className="btn btn-green" onClick={() => setShowAddSchedule(!showAddSchedule)}>
          {showAddSchedule ? 'Close Form' : '+ New Session'}
        </button>
      </div>

      {/* Conditional Calendar scheduling dropdown layout form */}
      {showAddSchedule && (
        <div className="card card-p anim-pop" style={{ marginBottom: '18px', background: 'var(--greenbg)', borderColor: 'var(--greenborder)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '16px' }}>Schedule New Session</h3>
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="field" style={{ gridColumn: '1 / -1' }}>
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

      {/* Main output schedules render frame block stack */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {schedulesList.map((s, i) => (
          <div key={s.id} className={`card sched-card anim-fadeup d${i + 1}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div className="sched-icon" style={{ background: s.type === 'zoom' ? 'var(--bluebg)' : 'var(--greenbg)', width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                {s.type === 'zoom' ? '📹' : '🎥'}
              </div>
              <div className="sched-info">
                <div className="sched-title" style={{ fontWeight: '700', fontSize: '14px' }}>{s.title}</div>
                <div className="sched-meta" style={{ fontSize: '12px', color: 'var(--text3)', marginTop: '4px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span>📅 {s.date}</span>
                  <span>🕐 {s.time}</span>
                  <span className={`badge ${s.type === 'zoom' ? 'badge-blue' : 'badge-green'}`} style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px' }}>
                    {s.type === 'zoom' ? 'Zoom' : 'Google Meet'}
                  </span>
                </div>
              </div>
            </div>
            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteSchedule(s.id)}>✕ Cancel</button>
          </div>
        ))}
      </div>
    </div>
  );
}
