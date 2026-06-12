import { PRACTICAL_LESSONS, PracticalLesson } from '../data/mockData';
import { locationService } from '../services/locationService';


interface UserProfile {
  id: string | number;
  name: string;
  role: 'student' | 'instructor' | 'admin';
}

interface PracticalLessonsComponentProps {
  user: UserProfile;
  setPage: (page: string) => void;
  setActiveLessonId: (id: number) => void;
}

export default function PracticalLessons({ user, setPage, setActiveLessonId }: PracticalLessonsComponentProps) {
  // Filter for upcoming lessons to match your heading requirement
  const upcomingLessons = PRACTICAL_LESSONS.filter((lesson: PracticalLesson) => lesson.status === 'upcoming');

  function metersBetween(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371e3; // metres
    const toRad = (v: number) => (v * Math.PI) / 180;
    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lon2 - lon1);

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  const getInstructorStatus = (lesson: PracticalLesson) => {
    const loc = locationService.getLocation(lesson.id);
    if (!loc) return { text: 'No status', color: 'var(--text3)' };
    const d = metersBetween(lesson.siteLat ?? 0, lesson.siteLng ?? 0, loc.lat, loc.lng);
    if (d <= 500) return { text: 'Instructor nearby', color: 'var(--green)' };
    if (d <= 5000) return { text: 'Instructor en route', color: 'var(--amber)' };
    return { text: 'Instructor sharing', color: 'var(--blue)' };
  };

  return (
     <div className="dashboard-wrapper">
      <div className="ph anim-fadeup">
        <div className="ph-title">Practical Lessons</div>
        <div className="ph-sub">{user.name}, here are your practical driving lessons.</div>
      </div>

      {/* Upcoming Lessons */}
      <div style={{ marginTop: '24px' }}>
        <div className="card card-p anim-fadeup" style={{ marginBottom: '20px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: '700', marginBottom: '10px' }}>Upcoming Lessons</h3>
          <div style={{ fontSize: '13px', color: 'var(--text3)', marginBottom: '18px' }}>{upcomingLessons.length} upcoming lesson{upcomingLessons.length === 1 ? '' : 's'}</div>

          {upcomingLessons.length === 0 ? (
            <div className="card card-p" style={{ background: 'var(--gray1)', borderColor: 'var(--gray2)', color: 'var(--text3)' }}>
              No upcoming lessons scheduled.
            </div>
          ) : (
            /* FIX 1: Applied a fluid grid class instead of rigid inline styles */
            <div className="responsive-lessons-grid">
              {upcomingLessons.map((lesson: PracticalLesson) => (
                <div key={lesson.id} className="card anim-fadeup" style={{ padding: '18px', minWidth: '0', width: '100%', boxSizing: 'border-box' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginBottom: '14px', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '14px' }}>{lesson.instructorName}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text3)' }}>{lesson.vehicleName}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span className="badge badge-blue" style={{ fontSize: '11px' }}>{lesson.status}</span>
                      {user.role === 'student' && (
                        (() => {
                          const st = getInstructorStatus(lesson);
                          return (
                            <span style={{ fontSize: '11px', padding: '6px 8px', borderRadius: '12px', background: st.color, color: '#fff', fontWeight: 700 }}>
                              {st.text}
                            </span>
                          );
                        })()
                      )}
                    </div>
                  </div>

                  <div style={{ fontSize: '12px', color: 'var(--text3)', marginBottom: '8px' }}>Date</div>
                  <div style={{ fontWeight: 600, marginBottom: '10px' }}>{lesson.date} · {lesson.time}</div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                    <div className="info-block">
                      <div style={{ fontSize: '11px', color: 'var(--text3)', marginBottom: '4px' }}>Duration</div>
                      <div style={{ fontWeight: 600 }}>{lesson.duration}</div>
                    </div>
                    <div className="info-block">
                      <div style={{ fontSize: '11px', color: 'var(--text3)', marginBottom: '4px' }}>Pickup</div>
                      <div style={{ fontWeight: 600 }}>{lesson.pickupLocation}</div>
                    </div>
                  </div>

                  <button
                    className="btn btn-primary btn-sm"
                    style={{ width: '100%' }}
                    onClick={() => {
                      setActiveLessonId(lesson.id);
                      setPage('practical-lessons-details');
                    }}
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: '40px' }}>
        <div className="responsive-split-footer">
          <div className="card card-p anim-fadeup">
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: '700', marginBottom: '12px' }}>Driving Progress</h3>
            
            <div className="responsive-stat-row">
              <StatCard label="Practical Lessons Completed" val={`${PRACTICAL_LESSONS.filter(l => l.status === 'completed').length} / ${PRACTICAL_LESSONS.length}`} color="var(--blue)" />
              <StatCard label="Hours Logged" val={`${PRACTICAL_LESSONS.filter(l => l.status === 'completed').reduce((acc, l) => acc + (parseInt(l.duration) || 0), 0)}h`} color="var(--green)" />
              <StatCard label="Road readiness" val={`${Math.round((PRACTICAL_LESSONS.filter(l => l.status === 'completed').length / Math.max(1, PRACTICAL_LESSONS.length)) * 100)}%`} color="var(--amber)" />
            </div>

            <div style={{ marginTop: '6px' }}>
              <ProgBar label="Practical Completion" color="#2563eb" pct={(PRACTICAL_LESSONS.filter(l => l.status === 'completed').length / Math.max(1, PRACTICAL_LESSONS.length)) * 100} val={`${Math.round((PRACTICAL_LESSONS.filter(l => l.status === 'completed').length / Math.max(1, PRACTICAL_LESSONS.length)) * 100)}%`} />
            </div>
          </div>

          <div className="card anim-fadeup d3" style={{ padding: '16px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: '700', marginBottom: '12px' }}>Lesson History</h3>
            {PRACTICAL_LESSONS.filter(l => l.status === 'completed').length ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {PRACTICAL_LESSONS.filter(l => l.status === 'completed').map((l) => (
                  <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--gray2)' }}>
                    <div style={{ minWidth: 0, flex: 1, marginRight: '8px' }}>
                      <div style={{ fontWeight: 600, fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.instructorName} · {l.vehicleName}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text3)' }}>{l.date} · {l.time}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                      <button className="btn btn-ghost btn-sm">View</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ color: 'var(--text3)' }}>No completed practical lessons yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, val, color }: { icon?: string; label: string; val: string | number; color: string }) {
  return (
    <div className="card stat-card" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px' }}>
      <div style={{ fontSize: '20px' }}>{icon}</div>
      <div>
        <div style={{ fontSize: '14px', fontWeight: 700, color }}>{val}</div>
        <div style={{ fontSize: '12px', color: 'var(--text3)' }}>{label}</div>
      </div>
    </div>
  );
}

function ProgBar({ label, color, pct, val }: { label: string; color: string; pct: number; val: string }) {
  const pctSafe = Math.max(0, Math.min(100, Math.round(pct)));
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <div style={{ fontSize: '13px', fontWeight: 600 }}>{label}</div>
        <div style={{ fontSize: '13px', fontWeight: 700, color: color }}>{val}</div>
      </div>
      <div style={{ height: '8px', background: 'var(--gray2)', borderRadius: '6px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pctSafe}%`, background: color, transition: 'width .4s' }}></div>
      </div>
    </div>
  );
}
