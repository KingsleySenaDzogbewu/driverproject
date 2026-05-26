// src/components/ManageLessons.jsx
import { useState } from 'react';
import { INITIAL_LESSONS, CATS } from '../data/mockData';

export default function ManageLessons() {
  // 1. Local reactive controls matching old MVP state configuration rules
  const [lessons, setLessons] = useState(INITIAL_LESSONS);
  const [showAddLesson, setShowAddLesson] = useState(false);
  const [newLesson, setNewLesson] = useState({ title: '', cat: 'Road Signs', desc: '', dur: '' });

  const handleInputChange = (field, value) => {
    setNewLesson(prev => ({ ...prev, [field]: value }));
  };

  // 2. Add New Lesson logic append handler
  const handleSaveLesson = () => {
    if (!newLesson.title || !newLesson.dur) return alert('Please fill in required inputs.');
    
    const createdItem = {
      id: Date.now(),
      title: newLesson.title,
      cat: newLesson.cat,
      desc: newLesson.desc || 'No descriptions added.',
      dur: newLesson.dur,
      done: false,
      instructor: 'Kofi Mensah'
    };

    setLessons([createdItem, ...lessons]);
    setNewLesson({ title: '', cat: 'Road Signs', desc: '', dur: '' });
    setShowAddLesson(false);
  };

  // 3. Delete action trigger function
  const handleDeleteLesson = (id) => {
    setLessons(lessons.filter(l => l.id !== id));
  };

  return (
    <div style={{ padding: '24px' }}>
      <div className="ph-row ph anim-fadeup" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <div className="ph-title">Manage Lessons</div>
          <div className="ph-sub">{lessons.length} lessons published</div>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddLesson(!showAddLesson)}>
          {showAddLesson ? 'Close Form' : '+ Add Lesson'}
        </button>
      </div>

      {/* Conditional Form Dropdown Animation Window */}
      {showAddLesson && (
        <div className="card card-p anim-pop" style={{ marginBottom: '18px', background: 'var(--bluebg)', borderColor: '#bfdbfe' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '16px' }}>New Lesson</h3>
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="field">
              <label className="label" style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold' }}>Title</label>
              <input className="input" placeholder="Lesson title" value={newLesson.title} onChange={(e) => handleInputChange('title', e.target.value)} />
            </div>
            <div className="field">
              <label className="label" style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold' }}>Category</label>
              <select className="input" value={newLesson.cat} onChange={(e) => handleInputChange('cat', e.target.value)} style={{ width: '100%' }}>
                {Object.keys(CATS).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="field">
              <label className="label" style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold' }}>Duration (e.g. 12 min)</label>
              <input className="input" placeholder="e.g. 15 min" value={newLesson.dur} onChange={(e) => handleInputChange('dur', e.target.value)} />
            </div>
            <div className="field">
              <label className="label" style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold' }}>Video URL</label>
              <input className="input" placeholder="https://youtube.com/embed/…" />
            </div>
            <div className="field" style={{ gridColumn: '1 / -1' }}>
              <label className="label" style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold' }}>Description</label>
              <textarea className="input" style={{ height: '80px', resize: 'none', width: '100%' }} value={newLesson.desc} onChange={(e) => handleInputChange('desc', e.target.value)} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
            <button className="btn btn-primary" onClick={handleSaveLesson}>Save Lesson</button>
            <button className="btn btn-secondary" onClick={() => setShowAddLesson(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Main Listings Map Scroll stack */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {lessons.map((l, i) => {
          const cfg = CATS[l.cat] || { bg: '#eee', emoji: '📚' };
          return (
            <div key={l.id} className={`card anim-fadeup d${Math.min(i + 1, 6)}`} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 20px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: cfg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
                {cfg.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '14px' }}>{l.title}</div>
                <div style={{ fontSize: '12px', color: 'var(--text3)', marginTop: '2px' }}>{l.cat} · {l.dur}</div>
              </div>
              <span className={`badge ${l.done ? 'badge-green' : 'badge-gray'}`}>{l.done ? 'Active' : 'Draft'}</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn btn-secondary btn-sm">✏ Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteLesson(l.id)}>✕</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
