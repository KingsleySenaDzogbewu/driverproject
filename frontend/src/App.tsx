// src/App.jsx
import { useState } from 'react';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import './App.css'; // This imports all your existing styling rules

export default function App() {
  // Replace your old "state.page" logic with React state
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('auth'); // 'auth' or 'dashboard'

  // Function to handle clean programmatic logins
  const handleLogin = (userData) => {
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
