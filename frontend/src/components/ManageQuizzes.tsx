// src/components/ManageQuizzes.tsx
import { QUIZZES, INITIAL_LESSONS } from '../data/mockData';

// 1. Define what a single quiz question looks like
interface QuizQuestion {
  q: string;
  ans: number;
  opts: string[];
}

// 2. Define the shape of the global QUIZZES object map
// This tells TypeScript: "QUIZZES has keys (lesson IDs) that map directly to arrays of QuizQuestions"
interface QuizzesMap {
  [lessonId: string]: QuizQuestion[];
}


export default function ManageQuizzes() {
  return (
    <div style={{ padding: '24px' }}>
      <div className="ph anim-fadeup">
        <div className="ph-title">Manage Quizzes</div>
        <div className="ph-sub">Review and edit quiz questions per lesson</div>
      </div>

      {Object.entries(QUIZZES as QuizzesMap).map(([lid, qs], gi) => {
        const lesson = INITIAL_LESSONS.find(l => l.id === Number(lid));
        return (
          <div key={lid} className={`card anim-fadeup d${gi + 1}`} style={{ marginBottom: '14px', overflow: 'hidden' }}>
            {/* Header row area */}
            <div style={{ padding: '16px 22px', borderBottom: '1px solid var(--gray3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px' }}>
                  {lesson?.title || `Lesson ${lid}`}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text3)', marginTop: '2px' }}>{qs.length} questions</div>
              </div>
              <button className="btn btn-secondary btn-sm">+ Add Question</button>
            </div>

            {/* Questions stack mapper loop */}
            {qs.map((q, qi) => (
              <div key={qi} style={{ padding: '14px 22px', borderBottom: '1px solid var(--gray2)', display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'var(--bluebg)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '12px', fontWeight: 700, flexShrink: 0 }}>
                  {qi + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '13px', marginTop: '6px', marginBottom: '6px' }}>{q.q}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {q.opts.map((o, oi) => {
                      const isCorrect = oi === q.ans;
                      return (
                        <span 
                          key={oi} 
                          style={{ 
                            fontSize: '11px', 
                            padding: '3px 9px', 
                            borderRadius: '20px', 
                            background: isCorrect ? 'var(--greenbg)' : 'var(--gray2)', 
                            color: isCorrect ? 'var(--green)' : 'var(--text3)', 
                            fontWeight: isCorrect ? 700 : 400 
                          }}
                        >
                          {String.fromCharCode(65 + oi)}. {o}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <button className="btn btn-ghost btn-sm">✏</button>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
