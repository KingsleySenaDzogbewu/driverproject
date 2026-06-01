import { useState } from 'react';
import { INITIAL_LESSONS, CATS } from '../data/mockData';
import { DashboardSubPage } from '../pages/DashboardPage';

interface LessonPlayerProps {
  activeLessonId: number|null;
  setPage: (page: DashboardSubPage) => void;
  setActiveQuizId: (id: number) => void;
}

export default function LessonPlayer({ activeLessonId, setPage, setActiveQuizId }: LessonPlayerProps) {
  // 1. Local state for notes textarea tracking
  const [notes, setNotes] = useState('');

  // 2. Find current dynamic active lesson object reference
  const l = INITIAL_LESSONS.find(x => x.id === activeLessonId);
  if (!l) return <div style={{ padding: '24px' }}>Lesson not found.</div>;
  
  const cat = CATS[l.cat] || { bg: '#eee', color: '#000', emoji: '📚' };

  // 3. Mark Done locally simulation handler
  const handleMarkDone = () => {
    // Locate the item directly in the array instead of using the local 'l' variable
    const targetLesson = INITIAL_LESSONS.find(x => x.id === activeLessonId);
    if (targetLesson) {
      targetLesson.done = true;
    }
    setPage('lessons'); // Redirect back to refresh library view
  };


  const startQuiz = () => {
    setActiveQuizId(l.id);
    setPage('quiz');
  };

  return (
    <div className="anim-fadeup" style={{ padding: '24px' }}>
      <button className="btn btn-ghost btn-sm" style={{ marginBottom: '18px' }} onClick={() => setPage('lessons')}>
        ← Back to Library
      </button>
      
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '18px' }}>
        <div>
          {/* Mock Video Aspect Player Card */}
          <div className="card" style={{ overflow: 'hidden', marginBottom: '16px', padding: 0 }}>
            <div style={{ aspectRatio: '16/9', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(37,99,235,.2)', border: '2px solid rgba(37,99,235,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', cursor: 'pointer' }}>
                ▶
              </div>
              <div style={{ color: '#4b5563', fontSize: '13px' }}>{l.title}</div>
            </div>
          </div>

          {/* Lesson Descriptions Body */}
          <div className="card card-p">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div>
                <div className="badge" style={{ background: cat.bg, color: cat.color, marginBottom: '10px', display: 'inline-block', padding: '4px 8px', borderRadius: '4px' }}>
                  {cat.emoji} {l.cat}
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: '800' }}>{l.title}</h2>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text3)', marginTop: '4px' }}>⏱ {l.dur}</span>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text2)', lineHeight: '1.7', marginBottom: '12px' }}>{l.desc}</p>
            <p style={{ fontSize: '14px', color: 'var(--text2)', lineHeight: '1.7', marginBottom: '18px' }}>
              Study all material in this lesson carefully before moving on. The quiz at the end will test your retention of key concepts.
            </p>
            
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              {l.done ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--greenbg)', color: 'var(--green)', padding: '9px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', border: '1px solid var(--greenborder)' }}>
                    ✓ Completed
                  </div>
                  <button className="btn btn-secondary btn-sm" onClick={startQuiz}>Take Quiz →</button>
                </>
              ) : (
                <button className="btn btn-green" onClick={handleMarkDone}>✓ Mark as Completed</button>
              )}
            </div>
          </div>
        </div>

        {/* Notes and Sidebar Columns */}
        <div>
        <div className="card card-p" style={{ marginBottom: '14px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: '700', marginBottom: '10px' }}>
              Lesson Notes
            </h3>
            <textarea 
              className="input" 
              style={{ width: '100%', height: '160px', resize: 'vertical', fontSize: '13px', lineHeight: '1.6' }} 
              placeholder="Take notes while you study…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="card card-p">
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: '700', marginBottom: '12px' }}>More in {l.cat}</h3>
            {INITIAL_LESSONS.filter(x => x.cat === l.cat && x.id !== l.id).map(x => (
              <div 
                key={x.id}
                onClick={() => setPage('lesson-player')}
                className="more-lesson-row"
                style={{ padding: '9px 0', borderBottom: '1px solid var(--gray2)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'padding 0.2s' }}
              >
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text)' }}>{x.title}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text3)', marginTop: '2px' }}>⏱ {x.dur}</div>
                </div>
                {x.done ? (
                  <span className="badge badge-green" style={{ fontSize: '10px' }}>✓</span>
                ) : (
                  <span style={{ color: 'var(--blue)', fontSize: '12px' }}>→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
