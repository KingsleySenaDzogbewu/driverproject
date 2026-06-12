import { PRACTICAL_LESSONS } from '../data/mockData';
import { getLessonQuestionCount } from '../services/lessonNotesService';

interface UserProfile {
  id: number | string;
  name: string;
  role: 'student' | 'instructor' | 'admin';
}

interface InstructorPracticalLessonsProps {
  user: UserProfile;
  setPage: (page: string) => void;
  setActiveLessonId: (id: number) => void;
}

export default function InstructorPracticalLessons({ user, setPage, setActiveLessonId }: InstructorPracticalLessonsProps) {
  const instructorLessons = PRACTICAL_LESSONS.filter(
    (lesson) => lesson.instructorName === user.name
  );

  return (
    /* FIX 1: Linked to your responsive padding global dashboard-wrapper class */
    <div className="dashboard-wrapper">
      <div className="ph anim-fadeup">
        <div className="ph-title">Practical Lesson Sharing</div>
        <div className="ph-sub">Select the lesson you want to share live location for.</div>
      </div>

      <div className="card card-p anim-fadeup" style={{ marginTop: '22px', maxWidth: '900px', boxSizing: 'border-box', width: '100%' }}>
        {instructorLessons.length === 0 ? (
          <div style={{ color: 'var(--text3)' }}>
            No practical lessons are assigned to you right now.
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '16px' }}>
            {instructorLessons.map((lesson) => {
              const questionCount = getLessonQuestionCount(lesson.id);
              return (
                <div key={lesson.id} className="card anim-fadeup" style={{ padding: '16px', boxSizing: 'border-box', width: '100%' }}>
                  {/* FIX 2: Replaced the rigid inline grid row with a responsive container helper class */}
                  <div className="responsive-lesson-share-row">
                    <div style={{ minWidth: 0, flex: 1 }}>
                      {/* FIX 3: Removed strict wrapping blocks from dates on small screen viewports */}
                      <div style={{ fontWeight: 700, fontSize: '14px', lineHeight: '1.4' }}>{lesson.date} · {lesson.time}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text3)', marginTop: '6px', lineHeight: '1.4' }}>
                        {lesson.pickupLocation} · {lesson.vehicleName}
                      </div>
                      <div style={{ marginTop: '10px', fontSize: '12px' }}>
                        <strong>Status:</strong> {lesson.status.charAt(0).toUpperCase() + lesson.status.slice(1)}
                      </div>
                      {questionCount > 0 && (
                        <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--blue)' }}>
                          {questionCount} student question{questionCount > 1 ? 's' : ''} waiting
                        </div>
                      )}
                    </div>
                    
                    <button
                      className="btn btn-primary btn-sm lesson-review-btn"
                      onClick={() => {
                        setActiveLessonId(lesson.id);
                        setPage('practical-lessons-details');
                      }}
                    >
                      Review Lesson
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* FIX 4: Ensured button is mobile friendly */}
        <div className="responsive-back-btn-wrapper">
          <button className="btn btn-secondary btn-sm back-to-dash-btn" onClick={() => setPage('inst-dash')}>
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
