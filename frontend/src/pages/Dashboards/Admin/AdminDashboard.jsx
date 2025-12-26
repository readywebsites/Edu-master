import React, { useEffect, useState } from 'react';
import { getAdminStats } from '../../../services/api';
import apiClient from '../../../services/api';
import { Users, UserBg, BookOpen, Clock } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* Announcement Logic */
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [announcementData, setAnnouncementData] = useState({ title: '', content: '', is_global: true });

  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: announcementData.title,
        content: announcementData.content,
        is_global: announcementData.is_global
      };
      await apiClient.post('/announcements/', payload);
      alert('Announcement created successfully!');
      setAnnouncementData({ title: '', content: '', is_global: true });
      setShowAnnouncementForm(false);
    } catch (error) {
      console.error('Error creating announcement:', error);
      alert('Failed to create announcement');
    }
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getAdminStats();
        setStats(response.data);
      } catch (err) {
        setError('Failed to load stats');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="p-4">Loading stats...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper blue">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats?.total_students || 0}</h3>
            <p>Total Students</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper green">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats?.total_teachers || 0}</h3>
            <p>Total Teachers</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper purple">
            <BookOpen size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats?.total_courses || 0}</h3>
            <p>Total Courses</p>
          </div>
        </div>
      </div>

      <div className="section-container" style={{ marginBottom: '2rem', background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Manage Announcements</h2>
          <button
            onClick={() => setShowAnnouncementForm(!showAnnouncementForm)}
            style={{ padding: '0.5rem 1rem', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
          >
            {showAnnouncementForm ? 'Cancel' : 'New Announcement'}
          </button>
        </div>

        {showAnnouncementForm && (
          <div className="announcement-form" style={{ marginTop: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
            <form onSubmit={handleCreateAnnouncement}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Title</label>
                <input
                  type="text"
                  required
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                  value={announcementData.title}
                  onChange={(e) => setAnnouncementData({ ...announcementData, title: e.target.value })}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Content</label>
                <textarea
                  required
                  rows="3"
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                  value={announcementData.content}
                  onChange={(e) => setAnnouncementData({ ...announcementData, content: e.target.value })}
                />
              </div>
              <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="checkbox"
                  id="is_global"
                  checked={announcementData.is_global}
                  onChange={(e) => setAnnouncementData({ ...announcementData, is_global: e.target.checked })}
                />
                <label htmlFor="is_global" style={{ fontWeight: 500, cursor: 'pointer' }}>Post Globally (Visible to all students/teachers)</label>
              </div>
              <button
                type="submit"
                style={{ background: '#4f46e5', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Publish Announcement
              </button>
            </form>
          </div>
        )}
      </div>

      <div className="recent-activity-section">
        <h2>Recent Registrations</h2>
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Role</th>
                <th>Joined Date</th>
              </tr>
            </thead>
            <tbody>
              {stats?.recent_users?.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>
                    <span className={`badge ${user.user_type}`}>
                      {user.user_type}
                    </span>
                  </td>
                  <td>{new Date(user.date_joined).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
