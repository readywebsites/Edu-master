import React, { useEffect, useState } from 'react';
import { getCourses, deleteCourse } from '../../../services/api';
import { Search, Trash2, Edit, Plus, Eye, Users } from 'lucide-react';
import CreateCourseModal from './CreateCourseModal';
import ConfirmDialog from './ConfirmDialog';
import './AdminDashboard.css';

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await getCourses();
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedCourse(null);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (course) => {
    setSelectedCourse(course);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    setActionLoading(true);
    try {
      await deleteCourse(selectedCourse.id);
      fetchCourses();
    } catch (error) {
      console.error('Delete failed', error);
    } finally {
      setActionLoading(false);
      setIsConfirmOpen(false);
    }
  };

  const filteredCourses = courses.filter(c =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.teacher?.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-dashboard">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 className="dashboard-title" style={{ margin: 0 }}>Courses</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: '0.5rem 0.5rem 0.5rem 2.25rem', borderRadius: '6px', border: '1px solid #ddd', width: '220px' }}
            />
          </div>
          <button
            onClick={handleCreate}
            style={{
              background: '#0d6efd', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px',
              display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'
            }}
          >
            <Plus size={18} /> Create Course
          </button>
        </div>
      </div>

      <CreateCourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchCourses}
        editCourse={selectedCourse}
      />

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Course"
        message={`Are you sure you want to delete "${selectedCourse?.title}"? This will also remove all associated resources.`}
        confirmText="Delete"
        loading={actionLoading}
      />

      <div className="recent-activity-section">
        <div className="table-container">
          {loading ? <p style={{ padding: '2rem', textAlign: 'center' }}>Loading...</p> : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Teacher</th>
                  <th>Students</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map(course => (
                  <tr key={course.id}>
                    <td>#{course.id}</td>
                    <td style={{ fontWeight: 500 }}>{course.title}</td>
                    <td>{course.teacher?.username || <span style={{ color: '#999' }}>Unassigned</span>}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Users size={14} color="#666" />
                        {course.students_count || 0}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => handleEdit(course)} title="Edit" style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#555' }}>
                          <Edit size={18} />
                        </button>
                        <button onClick={() => handleDeleteClick(course)} title="Delete" style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#dc3545' }}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredCourses.length === 0 && <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No courses found.</td></tr>}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCourses;
