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
    <div style={{ padding: '24px' }}>
      <div className="ph anim-fadeup">
        <div className="ph-title">Practical Lesson Sharing</div>
        <div className="ph-sub">Select the lesson you want to share live location for.</div>
      </div>

      <div className="card card-p anim-fadeup" style={{ marginTop: '22px', maxWidth: '900px' }}>
        {instructorLessons.length === 0 ? (
          <div style={{ color: 'var(--text3)' }}>
            No practical lessons are assigned to you right now.
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '16px' }}>
            {instructorLessons.map((lesson) => {
              const questionCount = getLessonQuestionCount(lesson.id);
              return (
                <div key={lesson.id} className="card anim-fadeup" style={{ padding: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '14px' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '14px' }}>{lesson.date} · {lesson.time}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text3)', marginTop: '6px' }}>
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
                      className="btn btn-primary btn-sm"
                      style={{ height: '40px', alignSelf: 'center' }}
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

        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => setPage('inst-dash')}>
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
