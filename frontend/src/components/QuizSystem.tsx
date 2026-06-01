import { useState } from 'react';
import { QUIZZES, INITIAL_LESSONS } from '../data/mockData';
import { DashboardSubPage } from '../pages/DashboardPage';

interface QuizSystemProps {
  activeQuizId: number|null;
  setActiveQuizId: (id: number) => void;
  setPage: (page: DashboardSubPage) => void;
}

export default function QuizSystem({ activeQuizId, setActiveQuizId, setPage }: QuizSystemProps) {
  // 1. Grouped Local Reactive States mirroring your engine object schema
  const [quizStep, setQuizStep] = useState(0);
  const [quizSelected, setQuizSelected] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [quizDone, setQuizDone] = useState(false);

  const qs = QUIZZES[activeQuizId] || [];
  
  // Calculate dynamic outputs
  const score = quizDone ? quizAnswers.filter((a, i) => a === qs[i]?.ans).length : 0;
  const pct = qs.length ? Math.round((score / qs.length) * 100) : 0;

  // 2. Next Question / Submit Engine Routine
  const handleQuizNext = () => {
    const updatedAnswers = [...quizAnswers, quizSelected];
    setQuizAnswers(updatedAnswers);
    setQuizSelected(null);

    if (quizStep + 1 === qs.length) {
      setQuizDone(true);
    } else {
      setQuizStep(prev => prev + 1);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizSelected(null);
    setQuizAnswers([]);
    setQuizDone(false);
  };

  return (
    <div style={{ padding: '24px' }}>
      <div className="ph anim-fadeup">
        <div className="ph-title">Quizzes</div>
        <div className="ph-sub">Test your knowledge after each lesson</div>
      </div>

      {/* Quiz Switch Tabs Strip */}
      <div className="tag-strip anim-fadeup d1" style={{ marginBottom: '20px', display: 'flex', gap: '8px' }}>
        {Object.keys(QUIZZES).map(id => (
          <div 
            key={id}
            className={`tag ${Number(id) === activeQuizId ? 'active' : ''}`} 
            onClick={() => {
              setActiveQuizId(Number(id));
              resetQuiz();
            }}
            style={{ cursor: 'pointer' }}
          >
            {INITIAL_LESSONS.find(l => l.id === Number(id))?.title || 'Quiz ' + id}
          </div>
        ))}
      </div>

      {/* Conditional Rendering View Core State machine */}
      {quizDone ? (
        <div className="card card-p anim-pop" style={{ maxWidth: '520px', textAlign: 'center', padding: '48px 32px', margin: '0 auto' }}>
          <div style={{ fontSize: '56px', marginBottom: '16px' }}>{pct === 100 ? '🏆' : pct >= 70 ? '👍' : '📚'}</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: '800', marginBottom: '6px' }}>Quiz Complete!</h2>
          <p style={{ color: 'var(--text3)', marginBottom: '24px' }}>You answered {score} of {qs.length} questions correctly</p>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '64px', fontWeight: '800', color: pct >= 70 ? 'var(--green)' : pct >= 50 ? 'var(--amber)' : 'var(--red)', lineHeight: 1, marginBottom: '28px' }}>{pct}%</div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={resetQuiz}>Try Again</button>
            <button className="btn btn-secondary" onClick={() => setPage('lessons')}>Back to Lessons</button>
          </div>
        </div>
      ) : qs.length ? (
        <div style={{ maxWidth: '620px', margin: '0 auto' }}>
          <div className="card card-p anim-fadeup d2">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontSize: '12px', color: 'var(--text3)', fontWeight: '600' }}>Question {quizStep + 1} of {qs.length}</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                {qs.map((_, i) => (
                  <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: i < quizStep ? 'var(--blue)' : i === quizStep ? 'var(--blue2)' : 'var(--gray3)' }}></div>
                ))}
              </div>
            </div>
            
            <div style={{ height: '3px', background: 'var(--gray2)', borderRadius: '2px', marginBottom: '22px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(quizStep / qs.length) * 100}%`, background: 'var(--blue)', transition: 'width .4s' }}></div>
            </div>

            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: '700', marginBottom: '22px', lineHeight: 1.5 }}>{qs[quizStep].q}</h3>
            
            {qs[quizStep].opts.map((opt, i) => (
              <button 
                key={i}
                className={`quiz-opt ${quizSelected === i ? 'selected' : ''}`} 
                onClick={() => setQuizSelected(i)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', textAlign: 'left', marginBottom: '8px', padding: '12px', border: '1px solid var(--gray3)', borderRadius: '6px', background: quizSelected === i ? 'var(--bluebg)' : 'transparent', cursor: 'pointer' }}
              >
                <div className="opt-letter" style={{ marginRight: '12px', fontWeight: 'bold' }}>{String.fromCharCode(64 + 1 + i)}</div>
                {opt}
              </button>
            ))}

            <div style={{ marginTop: '16px' }}>
              <button 
                className="btn btn-primary" 
                style={{ width: '100%', justifyContent: 'center' }} 
                onClick={handleQuizNext} 
                disabled={quizSelected === null}
              >
                {quizStep + 1 === qs.length ? 'Submit Quiz ✓' : 'Next Question →'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="card card-p"><p style={{ color: 'var(--text3)' }}>No quiz found for this lesson.</p></div>
      )}
    </div>
  );
}
