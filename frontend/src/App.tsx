// src/App.tsx
import { useState } from 'react';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import './App.css';

interface UserProfile {
  id: number;
  name: string;
  role: 'student' | 'instructor' | 'admin'; // Enforces that only these specific roles exist
}

// Define the exact pages the app is allowed to navigate to
type AppPage = 'auth' | 'dashboard';

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(null); // Can be a UserProfile object OR null
  const [page, setPage] = useState<AppPage>('auth');          // Can ONLY be 'auth' or 'dashboard'

  // Enforce that userData MUST match the backend's UserProfile contract
  const handleLogin = (userData: UserProfile) => {
    setUser(userData);
    setPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setPage('auth');
  };

  return (
    <div className="app-container">
      {page === 'auth' ? (
        <AuthPage onLogin={handleLogin} />
      ) : (
        
        <DashboardPage user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}
