import React from 'react';
import { X, User, Mail, Calendar, Clock, BookOpen } from 'lucide-react';
import './AdminDashboard.css';

const UserProfileModal = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="modal-overlay" style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000
    }}>
      <div className="modal-content" style={{
        background: 'white', padding: '2rem', borderRadius: '12px', width: '500px', position: 'relative'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', cursor: 'pointer'
        }}>
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%', background: '#e3f2fd',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem',
            fontSize: '2rem', fontWeight: 600, color: '#1976d2'
          }}>
            {user.username?.[0]?.toUpperCase() || 'U'}
          </div>
          <h2 style={{ margin: 0 }}>{user.username}</h2>
          <span className={`badge ${user.user_type}`} style={{ marginTop: '0.5rem', display: 'inline-block' }}>
            {user.user_type}
          </span>
          <span style={{
            marginLeft: '0.5rem', padding: '0.25rem 0.5rem', borderRadius: '4px',
            background: user.is_active !== false ? '#e8f5e9' : '#ffebee',
            color: user.is_active !== false ? '#2e7d32' : '#c62828',
            fontSize: '0.8rem'
          }}>
            {user.is_active !== false ? 'Active' : 'Inactive'}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: '#f8f9fa', borderRadius: '8px' }}>
            <Mail size={18} color="#666" />
            <div>
              <div style={{ fontSize: '0.75rem', color: '#999' }}>Email</div>
              <div style={{ fontWeight: 500 }}>{user.email}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: '#f8f9fa', borderRadius: '8px' }}>
            <Calendar size={18} color="#666" />
            <div>
              <div style={{ fontSize: '0.75rem', color: '#999' }}>Date Joined</div>
              <div style={{ fontWeight: 500 }}>{user.date_joined ? new Date(user.date_joined).toLocaleDateString() : 'N/A'}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: '#f8f9fa', borderRadius: '8px' }}>
            <Clock size={18} color="#666" />
            <div>
              <div style={{ fontSize: '0.75rem', color: '#999' }}>Last Login</div>
              <div style={{ fontWeight: 500 }}>{user.last_login ? new Date(user.last_login).toLocaleString() : 'Never'}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: '#f8f9fa', borderRadius: '8px' }}>
            <BookOpen size={18} color="#666" />
            <div>
              <div style={{ fontSize: '0.75rem', color: '#999' }}>Courses</div>
              <div style={{ fontWeight: 500 }}>
                {user.user_type === 'student'
                  ? `${user.courses_enrolled_count || 0} enrolled`
                  : `${user.courses_taught_count || 0} teaching`
                }
              </div>
            </div>
          </div>
        </div>

        <button onClick={onClose} style={{
          width: '100%', marginTop: '1.5rem', padding: '0.75rem', background: '#f1f3f4',
          border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 500
        }}>
          Close
        </button>
      </div>
    </div>
  );
};

export default UserProfileModal;
