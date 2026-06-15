// src/components/ManageLessons.tsx
import { useState } from 'react';
import { INITIAL_LESSONS, CATS } from '../data/mockData';
import { getLessonQuestionCount } from '../services/lessonNotesService';

interface ManageLessonsProps {
  setPage?: (page: 'practical-lessons-details' | string) => void;
  setActiveLessonId?: (id: number) => void;
  role?: 'student' | 'instructor' | 'admin';
}

export default function ManageLessons({ setPage, setActiveLessonId, role }: ManageLessonsProps) {
  const isInstructorView = role === 'instructor';
  const canAddLessons = isInstructorView;

  const [lessons, setLessons] = useState(INITIAL_LESSONS);
  const [showAddLesson, setShowAddLesson] = useState(false);
  const [newLesson, setNewLesson] = useState({ title: '', cat: 'Road Signs', desc: '', dur: '' });

  const questionLessons = isInstructorView
    ? lessons
        .map((lesson) => ({ lesson, count: getLessonQuestionCount(lesson.id) }))
        .filter((item) => item.count > 0)
    : [];

  const totalQuestions = isInstructorView
    ? questionLessons.reduce((sum, item) => sum + item.count, 0)
    : 0;

  const handleInputChange = (field, value) => {
    setNewLesson(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveLesson = () => {
    if (!newLesson.title || !newLesson.dur) return alert('Please fill in required inputs.');
    
    const createdItem = {
      id: Date.now(),
      title: newLesson.title,
      cat: newLesson.cat,
      desc: newLesson.desc || 'No descriptions added.',
      dur: newLesson.dur,
      done: false, // In your structure, new lessons start as draft/not done
      instructor: 'Kofi Mensah'
    };

    setLessons([createdItem, ...lessons]);
    setNewLesson({ title: '', cat: 'Road Signs', desc: '', dur: '' });
    setShowAddLesson(false);
  };

  const handleDeleteLesson = (id) => {
    setLessons(lessons.filter(l => l.id !== id));
  };

  return (
    <div className="dashboard-wrapper">
      <div className="responsive-header-row anim-fadeup">
        <div>
          <div className="ph-title">Manage Lessons</div>
          <div className="ph-sub">{lessons.length} lessons published</div>
        </div>
        {canAddLessons && (
          <button className="btn btn-primary header-action-btn" onClick={() => setShowAddLesson(!showAddLesson)}>
            {showAddLesson ? 'Close Form' : '+ Add Lesson'}
          </button>
        )}
      </div>

      {isInstructorView && (
        <div className="card card-p anim-fadeup" style={{ marginBottom: '18px', maxWidth: '900px', boxSizing: 'border-box', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', gap: '10px' }}>
            <div style={{ minWidth: 0 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, marginBottom: '4px' }}>Student Questions</h3>
              <div style={{ fontSize: '12px', color: 'var(--text3)' }}>Questions submitted by learners from the lesson pages.</div>
            </div>
            <span className="badge" style={{ background: 'rgba(59,130,246,.12)', color: '#1d4ed8', fontSize: '11px', padding: '6px 10px', borderRadius: '999px', flexShrink: 0 }}>
              {totalQuestions} total
            </span>
          </div>

          {totalQuestions === 0 ? (
            <div style={{ color: 'var(--text3)', fontSize: '13px' }}>No student questions have arrived yet.</div>
          ) : (
            <div style={{ display: 'grid', gap: '12px' }}>
              {questionLessons.map(({ lesson, count }) => (
                <div key={lesson.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', borderRadius: '12px', border: '1px solid var(--gray2)', background: 'var(--bg)', gap: '10px' }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{lesson.title}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text3)', marginTop: '4px' }}>{count} question{count > 1 ? 's' : ''} pending</div>
                  </div>
                  {setPage && setActiveLessonId ? (
                    <button
                      className="btn btn-secondary btn-sm"
                      style={{ flexShrink: 0 }}
                      onClick={() => {
                        setActiveLessonId(lesson.id);
                        setPage('practical-lessons-details');
                      }}
                    >
                      Review
                    </button>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {canAddLessons && showAddLesson && (
        <div className="card card-p anim-pop" style={{ marginBottom: '18px', background: 'var(--bluebg)', borderColor: '#bfdbfe', boxSizing: 'border-box', width: '100%' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '16px' }}>New Lesson</h3>
          <div className="grid-2">
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
              <label className="label" style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold' }}>Duration</label>
              <input className="input" placeholder="e.g. 15 min" value={newLesson.dur} onChange={(e) => handleInputChange('dur', e.target.value)} />
            </div>
            <div className="field">
              <label className="label" style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold' }}>Video URL</label>
              <input className="input" placeholder="https://youtube.com…" />
            </div>
            <div className="field form-full-width">
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

      {/* Main Listings Map Stack */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', boxSizing: 'border-box' }}>
        {lessons.map((l, i) => {
          // RESTORED: Dynamic background color & emoji logic per category
          const cfg = CATS[l.cat] || { bg: 'var(--gray1)', emoji: '📚' };
          return (
            <div key={l.id} className={`card lesson-manage-item anim-fadeup d${Math.min(i + 1, 6)}`}>
              {/* RESTORED: Styled dynamic background mapping box */}
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: cfg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
                {cfg.emoji}
              </div>
              
              <div className="lesson-text-block">
                <div className="lesson-title-text">{l.title}</div>
                <div className="lesson-sub-text">{l.cat} · {l.dur}</div>
              </div>

              <div className="lesson-actions-block">
                {/* RESTORED: Evaluation matching Active vs Draft badge status state styles */}
                {l.done ? (
                  <span className="badge badge-green" style={{ fontSize: '11px' }}>Active</span>
                ) : (
                  <span className="badge badge-gray" style={{ fontSize: '11px' }}>Draft</span>
                )}
                
                <button className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '4px' }} onClick={() => alert('Edit feature placeholder')}>
                  <span>➖</span> Edit
                </button>

                {/* Force-colored red delete trigger button */}
                  <button 
                    className="btn btn-red btn-sm" 
                    style={{ 
                      padding: '6px 10px', 
                      minWidth: '0',
                      backgroundColor: '#dc2626', /* Vibrant Red background */
                      borderColor: '#dc2626',
                      color: '#ffffff'            /* Solid White cross symbol */
                    }} 
                    onClick={() => handleDeleteLesson(l.id)}
                  >
                    ✕
                  </button>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
