// src/pages/DashboardPage.tsx
import { useState } from 'react';
import StudentDash from '../components/StudentDash';
import LessonsList from '../components/LessonsList';
import LessonPlayer from '../components/LessonPlayer';
import QuizSystem from '../components/QuizSystem';
import StudentProgress from '../components/StudentProgress';
import StudentSchedule from '../components/StudentSchedule';
import StudentAiTutor from '../components/StudentAiTutor';
import InstructorDash from '../components/InstructorDash';
import InstructorPracticalLessons from '../components/InstructorPracticalLessons';
import ManageLessons from '../components/ManageLessons';
import ManageQuizzes from '../components/ManageQuizzes';
import ManageSchedule from '../components/ManageSchedule';
import AdminDash from '../components/AdminDash';
import AdminUsers from '../components/AdminUsers';
import AdminAuditLog from '../components/AdminAuditLog';
import PracticalLessons from '../components/PracticalLessons';
import PracticalLessonsDetails from '../components/PracticalLessonsDetails';

// 1. Defines all the allowed sub-page routes across your system dashboard hubs
export type DashboardSubPage = 

  | 'dashboard' | 'lessons' | 'lesson-player' | 'quiz' | 'progress' | 'schedule' | 'practical-lessons' | 'practical-lessons-details' | 'ai-tutor'
  | 'inst-dash' | 'instructor-practical-lessons' | 'manage-lessons' | 'manage-quizzes' | 'manage-schedule'
  | 'admin-dash' | 'admin-users' | 'admin-content' | 'admin-audit';

interface DashboardPageProps {
  user: {
    id: number;
    name: string;
    role: 'student' | 'instructor' | 'admin';
  };
  onLogout: () => void;
}

export default function DashboardPage({ user, onLogout }: DashboardPageProps) {
  const [page, setPageState] = useState<DashboardSubPage>(
    user.role === 'instructor' ? 'inst-dash' : user.role === 'admin' ? 'admin-dash' : 'dashboard'
  );
  // Wrapper to normalize incoming page requests from child components
  const setPage = (p: string | DashboardSubPage) => {
    if (p === 'auth') return setPageState('dashboard');
    setPageState(p as DashboardSubPage);
  };
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  
  // 🔥 FIXED: All React state hooks are grouped here at the top level
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);
  const [activeQuizId, setActiveQuizId] = useState<number>(1);

  const rc = user.role === 'instructor' ? '#16a34a' : user.role === 'admin' ? '#d97706' : '#2563eb';
  const initials = user.name ? user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() : '??';

  interface NavItem {
    id: DashboardSubPage;
    icon?: string;
    label: string;
  }

  const getNavItems = (role: 'student' | 'instructor' | 'admin'): NavItem[] => {
    if (role === 'instructor') return [
      { id: 'inst-dash', icon: '◫', label: 'Dashboard' },
      { id: 'instructor-practical-lessons', icon: '🚗', label: 'Practical Lessons' },
      { id: 'manage-lessons', icon: '▶', label: 'Lessons' },
      { id: 'manage-quizzes', icon: '✦', label: 'Quizzes' },
      { id: 'manage-schedule', icon: '◷', label: 'Schedule' },
    ];
    if (role === 'admin') return [
      { id: 'admin-dash', icon: '◫', label: 'Dashboard' },
      { id: 'admin-users', icon: '◉', label: 'Users' },
      { id: 'admin-content', icon: '▶', label: 'Content' },
      { id: 'admin-audit', icon: '◑', label: 'Audit Log' },
    ];
    return [
      { id: 'dashboard', icon: '◫', label: 'Dashboard' },
      { id: 'lessons', icon: '▶', label: 'Lessons' },
      { id: 'quiz', icon: '✦', label: 'Quizzes' },
      { id: 'progress', icon: '◎', label: 'Progress' },
      { id: 'schedule', icon: '◷', label: 'Schedule' },
      { id: 'practical-lessons', label: 'Practical Lessons' },
      { id: 'ai-tutor', icon: '✧', label: 'AI Tutor' },
    ];
  };

  const navItems = getNavItems(user.role);

   const renderPage = () => {
    switch (page) {
      case 'dashboard':      
        return <StudentDash user={user} setPage={setPage} setActiveLessonId={setActiveLessonId} />;
      case 'lessons':        
        return <LessonsList setPage={setPage} setActiveLessonId={setActiveLessonId} />;
      case 'lesson-player':  
        return <LessonPlayer activeLessonId={activeLessonId} setPage={setPage} setActiveQuizId={setActiveQuizId} />;
      case 'quiz':           
        return <QuizSystem activeQuizId={activeQuizId} setActiveQuizId={setActiveQuizId} setPage={setPage} />;
      case 'progress':       
        return <StudentProgress setActiveLessonId={setActiveLessonId} setPage={setPage} />;
      case 'schedule':       
        return <StudentSchedule />;
      case 'practical-lessons': 
        return <PracticalLessons user={user} setPage={setPage} setActiveLessonId={setActiveLessonId} />;
      case 'practical-lessons-details':
        return <PracticalLessonsDetails user={user} lessonId={activeLessonId} setPage={setPage} />;
      case 'ai-tutor':       
        return <StudentAiTutor />;
      
      
      // Instructor Viewports
      case 'inst-dash':      
        return <InstructorDash setPage={setPage} />;
      case 'instructor-practical-lessons':
        return <InstructorPracticalLessons user={user} setPage={setPage} setActiveLessonId={setActiveLessonId} />;
      case 'manage-lessons': 
        return <ManageLessons setPage={setPage} setActiveLessonId={setActiveLessonId} role={user.role} />;
      case 'manage-quizzes': 
        return <ManageQuizzes />;
      case 'manage-schedule':
        return <ManageSchedule />;
      
      case 'admin-dash':     
        return <AdminDash setPage={setPage} />;
      case 'admin-users':    
        return <AdminUsers setPage={setPage} />;

      case 'admin-content':  
        return <ManageLessons />; 
      case 'admin-audit':    
        return <AdminAuditLog />;
      
      default: 
        return <StudentDash user={user} setPage={setPage} setActiveLessonId={setActiveLessonId} />;
    }
  };


  return (
    <div style={{ display: 'flex', width: '100vw', minHeight: '100vh' }}>
      <div className={`sidebar-overlay ${sidebarOpen ? 'show' : ''}`} onClick={() => setSidebarOpen(false)}></div>
      
      <div id="sidebar" className={sidebarOpen ? 'open' : ''}>
        <div className="sb-logo">
          <div className="sb-logomark">🚗</div>
          <div>
            <div className="sb-brand">DriveLearn</div>
            <div className="sb-tagline">Theory Platform</div>
          </div>
        </div>
        <div className="sb-divider"></div>
        <nav className="sb-nav">
          {navItems.map(n => (
            <button 
              key={n.id}
              className={`sb-item ${page === n.id ? 'active' : ''}`} 
              onClick={() => { setPageState(n.id); setSidebarOpen(false); }}
            >
              <div className="icon">{n.icon}</div>
              {n.label}
            </button>
          ))}
        </nav>
        <div className="sb-footer">
          <div className="sb-user">
            <div className="sb-avatar" style={{ backgroundColor: rc, width: '34px', height: '34px', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', color: '#fff', fontWeight: 'bold' }}>
              {initials}
            </div>
            <div style={{ flex: 1, minWidth: 0, marginLeft: '10px' }}>
              <div className="sb-username" style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{user.name}</div>
              <div className="sb-role" style={{ color: rc, textTransform: 'capitalize', fontSize: '11px', fontWeight: '600' }}>{user.role}</div>
            </div>
          </div>
          <button className="sb-logout" onClick={onLogout}>← Sign out</button>
        </div>
      </div>

      <div id="main" style={{ flex: 1, position: 'relative' }}>
        <button 
          className={`hamburger ${sidebarOpen ? 'open' : ''}`} 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 100 }}
        >
          <div className="hamburger-icon">
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </div>
        </button>
        <div className="page">{renderPage()}</div>
      </div>
    </div>
  );
}
