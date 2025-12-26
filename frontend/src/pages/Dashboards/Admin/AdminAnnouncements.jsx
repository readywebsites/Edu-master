import React, { useEffect, useState } from 'react';
import { getAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement } from '../../../services/api';
import { Search, Trash2, Edit, Plus, Megaphone, Globe } from 'lucide-react';
import ConfirmDialog from './ConfirmDialog';
import './AdminDashboard.css';

const AdminAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', priority: 0 });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await getAnnouncements();
      setAnnouncements(response.data);
    } catch (error) {
      console.error("Error fetching announcements", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedAnnouncement(null);
    setFormData({ title: '', content: '', priority: 0 });
    setIsModalOpen(true);
  };

  const handleEdit = (announcement) => {
    setSelectedAnnouncement(announcement);
    setFormData({ title: announcement.title, content: announcement.content, priority: announcement.priority || 0 });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    setActionLoading(true);
    try {
      await deleteAnnouncement(selectedAnnouncement.id);
      fetchAnnouncements();
    } catch (error) {
      console.error('Delete failed', error);
    } finally {
      setActionLoading(false);
      setIsConfirmOpen(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const payload = { ...formData, is_global: true };
      if (selectedAnnouncement) {
        await updateAnnouncement(selectedAnnouncement.id, payload);
      } else {
        await createAnnouncement(payload);
      }
      fetchAnnouncements();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Save failed', error);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 className="dashboard-title" style={{ margin: 0 }}>Announcements</h1>
        <button
          onClick={handleCreate}
          style={{
            background: '#0d6efd', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px',
            display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'
          }}
        >
          <Plus size={18} /> New Announcement
        </button>
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="modal-overlay" style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="modal-content" style={{
            background: 'white', padding: '2rem', borderRadius: '12px', width: '500px'
          }}>
            <h2 style={{ marginBottom: '1.5rem' }}>{selectedAnnouncement ? 'Edit Announcement' : 'New Announcement'}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ddd' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={5}
                  required
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ddd', resize: 'vertical' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Priority (higher = more important)</label>
                <input
                  type="number"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 0 })}
                  style={{ width: '100px', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ddd' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{
                  flex: 1, padding: '0.75rem', background: '#f1f3f4', border: 'none', borderRadius: '6px', cursor: 'pointer'
                }}>
                  Cancel
                </button>
                <button type="submit" disabled={actionLoading} style={{
                  flex: 1, padding: '0.75rem', background: '#0d6efd', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer'
                }}>
                  {actionLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Announcement"
        message={`Delete "${selectedAnnouncement?.title}"?`}
        confirmText="Delete"
        loading={actionLoading}
      />

      <div className="recent-activity-section">
        {loading ? <p style={{ padding: '2rem', textAlign: 'center' }}>Loading...</p> : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {announcements.map(a => (
              <div key={a.id} style={{
                background: '#fff', padding: '1.25rem', borderRadius: '10px', border: '1px solid #eee',
                boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                      {a.is_global && <Globe size={14} color="#0d6efd" />}
                      <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{a.title}</h3>
                      {a.priority > 0 && (
                        <span style={{ background: '#fff3e0', color: '#ff9800', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>
                          Priority: {a.priority}
                        </span>
                      )}
                    </div>
                    <p style={{ margin: '0.5rem 0', color: '#555' }}>{a.content}</p>
                    <div style={{ fontSize: '0.8rem', color: '#999' }}>
                      By {a.author_name} • {new Date(a.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => handleEdit(a)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#555' }}>
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDeleteClick(a)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#dc3545' }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {announcements.length === 0 && (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#999' }}>
                <Megaphone size={48} color="#ddd" />
                <p>No announcements yet</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAnnouncements;
