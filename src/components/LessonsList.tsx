import { useState } from 'react';
import { INITIAL_LESSONS, CATS } from '../data/mockData';

export default function LessonsList({ setPage, setActiveLessonId }) {
  const [catFilter, setCatFilter] = useState('All');
  const [lessonSearch, setLessonSearch] = useState('');

  const cats = ['All', ...Object.keys(CATS)];
  
  const filteredLessons = INITIAL_LESSONS.filter(l =>
    (catFilter === 'All' || l.cat === catFilter) &&
    l.title.toLowerCase().includes(lessonSearch.toLowerCase())
  );

  const openLesson = (id) => {
    setActiveLessonId(id);
    setPage('lesson-player');
  };

  return (
    <>
      <div className="ph-row ph anim-fadeup">
        <div>
          <div className="ph-title">Lesson Library</div>
          <div className="ph-sub">{INITIAL_LESSONS.length} lessons across {Object.keys(CATS).length} categories</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }} className="anim-fadeup d1">
        <input 
          className="input" 
          style={{ flex: 1, minWidth: '200px' }} 
          placeholder="🔍 Search lessons…" 
          value={lessonSearch} 
          onChange={(e) => setLessonSearch(e.target.value)}
        />
      </div>

      <div className="tag-strip anim-fadeup d2">
        {cats.map(c => (
          <div 
            key={c}
            className={`tag ${catFilter === c ? 'active' : ''}`} 
            onClick={() => setCatFilter(c)}
          >
            {c === 'All' ? 'All' : `${CATS[c].emoji} ${c}`}
          </div>
        ))}
      </div>

      <div className="grid-2">
        {filteredLessons.map((l, i) => {
          const cat = CATS[l.cat];
          return (
            <div 
              key={l.id} 
              className={`card lesson-card anim-fadeup d${Math.min(i + 1, 6)}`} 
              onClick={() => openLesson(l.id)}
            >
              {l.done && <div className="lesson-done-tag">✓ Completed</div>}
              <div className="lesson-card-cat" style={{ background: cat.bg, color: cat.color }}>
                {cat.emoji} {l.cat}
              </div>
              <h4>{l.title}</h4>
              <p>{l.desc}</p>
              <div className="lesson-card-footer">
                <span style={{ fontSize: '12px', color: 'var(--text3)' }}>⏱ {l.dur}</span>
                <button className="btn btn-primary btn-sm">{l.done ? 'Review' : '▶ Start'}</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
