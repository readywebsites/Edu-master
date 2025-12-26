import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser, bulkUserAction } from '../../../services/api';
import { Search, Trash2, Edit, UserPlus, Eye, CheckSquare, Square } from 'lucide-react';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';
import UserProfileModal from './UserProfileModal';
import ConfirmDialog from './ConfirmDialog';
import './AdminDashboard.css';

const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmAction, setConfirmAction] = useState({ title: '', message: '', action: null });
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async (search = '') => {
    try {
      setLoading(true);
      const response = await getUsers({ user_type: 'student', search });
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchStudents(value);
  };

  const handleEdit = (student) => {
    setSelectedUser(student);
    setIsEditModalOpen(true);
  };

  const handleViewProfile = (student) => {
    setSelectedUser(student);
    setIsProfileModalOpen(true);
  };

  const handleDeleteClick = (student) => {
    setSelectedUser(student);
    setConfirmAction({
      title: 'Delete Student',
      message: `Are you sure you want to permanently delete "${student.username}"? This action cannot be undone.`,
      action: 'delete'
    });
    setIsConfirmOpen(true);
  };

  const handleConfirm = async () => {
    setActionLoading(true);
    try {
      if (confirmAction.action === 'delete' && selectedUser) {
        await deleteUser(selectedUser.id);
      } else if (confirmAction.action === 'bulk-delete') {
        await bulkUserAction(selectedIds, 'delete');
        setSelectedIds([]);
      } else if (confirmAction.action === 'bulk-deactivate') {
        await bulkUserAction(selectedIds, 'deactivate');
        setSelectedIds([]);
      } else if (confirmAction.action === 'bulk-activate') {
        await bulkUserAction(selectedIds, 'activate');
        setSelectedIds([]);
      }
      fetchStudents(searchTerm);
    } catch (error) {
      console.error('Action failed', error);
    } finally {
      setActionLoading(false);
      setIsConfirmOpen(false);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === students.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(students.map(s => s.id));
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleBulkAction = (action) => {
    const actionMessages = {
      'bulk-delete': { title: 'Delete Selected', message: `Permanently delete ${selectedIds.length} students?` },
      'bulk-deactivate': { title: 'Deactivate Selected', message: `Deactivate ${selectedIds.length} students?` },
      'bulk-activate': { title: 'Activate Selected', message: `Activate ${selectedIds.length} students?` }
    };
    setConfirmAction({ ...actionMessages[action], action });
    setIsConfirmOpen(true);
  };

  return (
    <div className="admin-dashboard">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 className="dashboard-title" style={{ margin: 0 }}>Students</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={handleSearch}
              style={{ padding: '0.5rem 0.5rem 0.5rem 2.25rem', borderRadius: '6px', border: '1px solid #ddd', width: '220px' }}
            />
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            style={{
              background: '#0d6efd', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px',
              display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'
            }}
          >
            <UserPlus size={18} /> Add Student
          </button>
        </div>
      </div>

      {selectedIds.length > 0 && (
        <div style={{
          background: '#e3f2fd', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <span>{selectedIds.length} selected</span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => handleBulkAction('bulk-activate')} style={{ padding: '0.4rem 0.8rem', background: '#2e7d32', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Activate
            </button>
            <button onClick={() => handleBulkAction('bulk-deactivate')} style={{ padding: '0.4rem 0.8rem', background: '#ff9800', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Deactivate
            </button>
            <button onClick={() => handleBulkAction('bulk-delete')} style={{ padding: '0.4rem 0.8rem', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Delete
            </button>
          </div>
        </div>
      )}

      <AddUserModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} role="student" onUserAdded={() => fetchStudents(searchTerm)} />
      <EditUserModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} user={selectedUser} onUserUpdated={() => fetchStudents(searchTerm)} />
      <UserProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} user={selectedUser} />
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirm}
        title={confirmAction.title}
        message={confirmAction.message}
        confirmText={confirmAction.action?.includes('delete') ? 'Delete' : 'Confirm'}
        loading={actionLoading}
      />

      <div className="recent-activity-section">
        <div className="table-container">
          {loading ? <p style={{ padding: '2rem', textAlign: 'center' }}>Loading...</p> : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}>
                    <button onClick={toggleSelectAll} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                      {selectedIds.length === students.length && students.length > 0 ? <CheckSquare size={18} color="#0d6efd" /> : <Square size={18} color="#999" />}
                    </button>
                  </th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Courses</th>
                  <th>Status</th>
                  <th>Date Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.id}>
                    <td>
                      <button onClick={() => toggleSelect(student.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        {selectedIds.includes(student.id) ? <CheckSquare size={18} color="#0d6efd" /> : <Square size={18} color="#999" />}
                      </button>
                    </td>
                    <td style={{ fontWeight: 500 }}>{student.username}</td>
                    <td>{student.email}</td>
                    <td>{student.courses_enrolled_count || 0}</td>
                    <td>
                      <span style={{
                        padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem',
                        background: student.is_active !== false ? '#e8f5e9' : '#ffebee',
                        color: student.is_active !== false ? '#2e7d32' : '#c62828'
                      }}>
                        {student.is_active !== false ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>{new Date(student.date_joined).toLocaleDateString()}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => handleViewProfile(student)} title="View Profile" style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#0d6efd' }}>
                          <Eye size={18} />
                        </button>
                        <button onClick={() => handleEdit(student)} title="Edit" style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#555' }}>
                          <Edit size={18} />
                        </button>
                        <button onClick={() => handleDeleteClick(student)} title="Delete" style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#dc3545' }}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {students.length === 0 && <tr><td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>No students found.</td></tr>}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminStudents;
