// src/components/ManageQuizzes.tsx
import { QUIZZES, INITIAL_LESSONS } from '../data/mockData';

interface QuizQuestion {
  q: string;
  ans: number;
  opts: string[];
}

interface QuizzesMap {
  [lessonId: string]: QuizQuestion[];
}

export default function ManageQuizzes() {
  return (
    /* FIX 1: Linked to your responsive padding global class */
    <div className="dashboard-wrapper">
      <div className="ph anim-fadeup">
        <div className="ph-title">Manage Quizzes</div>
        <div className="ph-sub">Review and edit quiz questions per lesson</div>
      </div>

      {Object.entries(QUIZZES as QuizzesMap).map(([lid, qs], gi) => {
        const lesson = INITIAL_LESSONS.find(l => l.id === Number(lid));
        return (
          <div key={lid} className={`card anim-fadeup d${gi + 1}`} style={{ marginBottom: '14px', overflow: 'hidden', width: '100%', boxSizing: 'border-box' }}>
            
            {/* FIX 2: Replaced fixed flex header row with an adaptive CSS layout class */}
            <div className="quiz-card-header">
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', lineHeight: '1.4' }}>
                  {lesson?.title || `Lesson ${lid}`}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text3)', marginTop: '2px' }}>{qs.length} questions</div>
              </div>
              <button className="btn btn-secondary btn-sm quiz-header-btn">+ Add Question</button>
            </div>

            {/* Questions Stack Mapper Loop */}
            {qs.map((q, qi) => (
              /* FIX 3: Turned the item box into a responsive container wrapper class */
              <div key={qi} className="quiz-question-row">
                <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'var(--bluebg)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '12px', fontWeight: 700, flexShrink: 0 }}>
                  {qi + 1}
                </div>
                
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: '13px', marginTop: '4px', marginBottom: '8px', lineHeight: '1.4' }}>{q.q}</div>
                  
                  {/* FIX 4: Replaced flex-wrap with a dynamic stacked column options box layout */}
                  <div className="quiz-options-layout">
                    {q.opts.map((o, oi) => {
                      const isCorrect = oi === q.ans;
                      return (
                        <span 
                          key={oi} 
                          style={{ 
                            fontSize: '11px', 
                            padding: '6px 12px', 
                            borderRadius: '20px', 
                            background: isCorrect ? 'var(--greenbg)' : 'var(--gray1)', 
                            color: isCorrect ? 'var(--green)' : 'var(--text3)', 
                            fontWeight: isCorrect ? 700 : 400,
                            display: 'inline-block',
                            width: 'fit-content',
                            boxSizing: 'border-box'
                          }}
                        >
                          {String.fromCharCode(65 + oi)}. {o}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <button className="btn btn-ghost btn-sm quiz-edit-btn">✏</button>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
