import { useState } from 'react';
import { STUDENTS_DATA } from '../data/mockData';
import { DashboardSubPage } from '../pages/DashboardPage';

interface AdminUsersProps {
  setPage: (page: DashboardSubPage) => void;
}

interface UserRow {
  id: string;
  name: string;
  email: string;
  role: string;
  progress: string | number;
  active: boolean;
}

const initialUsers: UserRow[] = [
  ...STUDENTS_DATA.map(user => ({ ...user, role: 'student', active: true })),
  { id: 'i1', name: 'Kofi Mensah', email: 'instructor@demo.com', role: 'instructor', progress: '—', active: true },
  { id: 'a1', name: 'Admin User', email: 'admin@demo.com', role: 'admin', progress: '—', active: true },
];

export default function AdminUsers({ setPage }: AdminUsersProps) {
  const [users, setUsers] = useState<UserRow[]>(initialUsers);

  const toggleStatus = (id: string) => {
    setUsers(prev => prev.map(user => user.id === id ? { ...user, active: !user.active } : user));
  };

  return (
    <div className="dashboard-wrapper">
      <div className="ph anim-fadeup">
        <div className="ph-title">User Management</div>
        <div className="ph-sub">Review and manage all registered users on the platform.</div>
      </div>

      <div className="card anim-fadeup" style={{ overflowX: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 22px', borderBottom: '1px solid var(--gray3)' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px' }}>All Users</h3>
            <div style={{ fontSize: '12px', color: 'var(--text3)' }}>Students, instructors, and admin accounts.</div>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => setPage('admin-dash')}>Back to dashboard</button>
        </div>

        <table className="tbl" style={{ width: '100%', minWidth: '620px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '14px' }}>Name</th>
              <th style={{ textAlign: 'left', padding: '14px' }}>Email</th>
              <th style={{ textAlign: 'left', padding: '14px' }}>Role</th>
              <th style={{ textAlign: 'left', padding: '14px' }}>Status</th>
              <th style={{ textAlign: 'left', padding: '14px' }}></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} style={{ borderBottom: '1px solid var(--gray2)' }}>
                <td style={{ padding: '14px' }}>{user.name}</td>
                <td style={{ padding: '14px' }}>{user.email}</td>
                <td style={{ padding: '14px', textTransform: 'capitalize' }}>{user.role}</td>
                <td style={{ padding: '14px' }}>
                  <span className={`badge ${user.active ? 'badge-green' : 'badge-red'}`}>{user.active ? 'Active' : 'Deactivated'}</span>
                </td>
                <td style={{ padding: '14px', display: 'flex', gap: '8px' }}>
                  <button className="btn btn-secondary btn-sm" onClick={() => toggleStatus(user.id)}>
                    {user.active ? 'Deactivate' : 'Activate'}
                  </button>
                  <button className="btn btn-ghost btn-sm">Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
