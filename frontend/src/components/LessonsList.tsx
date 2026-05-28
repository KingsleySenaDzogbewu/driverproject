import { useState } from 'react';
import { INITIAL_LESSONS, CATS } from '../data/mockData';

// 1. Define what a single Lesson object looks like inside your mock array
interface LessonData {
  id: number;
  title: string;
  cat: string;
  desc: string;
  dur: string;
  done: boolean;
}

// 2. Define what properties this component expects to receive from its parent
interface LessonsListProps {
  setPage: (page: 'auth' | 'dashboard' | 'lesson-player') => void;
  setActiveLessonId: (id: number) => void;
}

export default function LessonsList({ setPage, setActiveLessonId }: LessonsListProps) {
  const [catFilter, setCatFilter] = useState('All');
  const [lessonSearch, setLessonSearch] = useState('');

  // Cast CATS to help TS understand it has dynamic text keys pointing to style config objects
  const cats = ['All', ...Object.keys(CATS)];
  
  // Explicitly tell the filter loop that "l" is a strict LessonData object
  const filteredLessons = (INITIAL_LESSONS as LessonData[]).filter((l: LessonData) =>
    (catFilter === 'All' || l.cat === catFilter) &&
    l.title.toLowerCase().includes(lessonSearch.toLowerCase())
  );

  // Explicitly tell the function that "id" must be a number
  const openLesson = (id: number) => {
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
            {c === 'All' ? 'All' : `${(CATS as any)[c].emoji} ${c}`}
          </div>
        ))}
      </div>

      <div className="grid-2">
        {filteredLessons.map((l, i) => {
          const cat = (CATS as any)[l.cat];
          return (
            <div 
              key={l.id} 
              className={`card lesson-card anim-fadeup d${Math.min(i + 1, 6)}`} 
              onClick={() => openLesson(l.id)}
            >
              {l.done && <div className="lesson-done-tag">✓ Completed</div>}
              <div className="lesson-card-cat" style={{ background: cat?.bg, color: cat?.color }}>
                {cat?.emoji} {l.cat}
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
