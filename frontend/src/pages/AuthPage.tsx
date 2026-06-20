// src/pages/AuthPage.tsx
import { useState } from 'react';
import { USERS } from '../data/mockData';

export default function AuthPage({ onLogin }) {
  // 1. Replicating your original local state configuration
  const [authTab, setAuthTab] = useState('login'); // 'login' or 'register'
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Helper to handle text typing changes in the forms
  const updateAuthForm = (field, value) => {
    setAuthForm(prev => ({ ...prev, [field]: value }));
  };

  // 2. Core Auth Logic Handler
  const handleAuth = (e) => {
    if (e) e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    // Simulate network delay processing
    setTimeout(() => {
      const emailKey = authForm.email.trim().toLowerCase();

      if (authTab === 'login') {
        // Sign In Logic matching mockData keys
        const foundUser = USERS[emailKey];
        if (foundUser && foundUser.password === authForm.password) {
          onLogin(foundUser);
        } else {
          setAuthError('Invalid email or password.');
          setAuthLoading(false);
        }
      } else {
        // Register Logic simulation
        if (!authForm.name || !authForm.email || !authForm.password) {
          setAuthError('Please fill out all input fields.');
          setAuthLoading(false);
          return;
        }
        // Log in immediately as the new user account profile
        onLogin({
          id: 'u_' + Date.now(),
          name: authForm.name,
          email: authForm.email,
          role: authForm.role
        });
      }
    }, 600);
  };

  return (
    <div 
    id="auth-screen"
    style={{ 
      width: '100vw', 
      minHeight: '100vh', 
      margin: 0, 
      padding: 0, 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center' 
    }}
    >
      <div className="auth-bg"></div>
      <div className="auth-grid"></div>
      <div className="auth-box anim-fadeup">
        
        {/* Logo Header Blocks */}
        <div className="auth-logo">
          <div className="auth-logomark">App logo</div>
          <div className="auth-title">App Name</div>
          <div className="auth-sub">App motto</div>
        </div>

        {/* Card Form Element Blocks */}
        <div className="auth-card">

          {/* Conditional Name Field for Register Layout */}
          {authTab === 'register' && (
            <input 
              className="auth-input" 
              placeholder="Full name" 
              value={authForm.name} 
              onChange={(e) => updateAuthForm('name', e.target.value)}
            />
          )}

          <input 
            className="auth-input" 
            placeholder="Email address" 
            type="email" 
            value={authForm.email} 
            onChange={(e) => updateAuthForm('email', e.target.value)}
          />
          
          <input 
            className="auth-input" 
            placeholder="Password" 
            type="password" 
            value={authForm.password} 
            onChange={(e) => updateAuthForm('password', e.target.value)}
          />

          {/* Conditional Role Dropdown selection for Register Layout */}
          {authTab === 'register' && (
            <select 
              className="auth-input auth-select" 
              value={authForm.role}
              onChange={(e) => updateAuthForm('role', e.target.value)}
            >
              <option value="student">I am a Student</option>
              <option value="instructor">I am an Instructor</option>
            </select>
          )}

          {/* Error Message Blocks */}
          {authError && <div className="auth-error">⚠ {authError}</div>}

          {/* Submission CTA Action Control */}
          <button 
            className="btn btn-primary" 
            style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '14px' }} 
            onClick={handleAuth} 
            disabled={authLoading}
          >
            {authLoading ? (
              <>
                <div className="spinner"></div> Authenticating…
              </>
            ) : (
              authTab === 'login' ? 'Sign In →' : 'Create Account →'
            )}
          </button>
        </div>

        {/* Quick Access Action Grid Footer */}
        <div style={{ marginTop: '20px' }}>
          <div style={{ textAlign: 'center', fontSize: '11px', color: '#4b5563', fontWeight: '600', letterSpacing: '.8px', marginBottom: '12px' }}>
            {authTab === 'login' ? 'Don\'t have an account?' : 'Already have an account?'}{' '}
            <span className="auth-link" onClick={() => setAuthTab(authTab === 'login' ? 'register' : 'login')}>
              {authTab === 'login' ? 'Register' : 'Sign In'}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}