import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { createCourse, updateCourse, getUsers } from '../../../services/api';
import './AdminDashboard.css';

const CreateCourseModal = ({ isOpen, onClose, onSuccess, editCourse = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    teacher_id: ''
  });
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchTeachers();
      if (editCourse) {
        setFormData({
          title: editCourse.title || '',
          description: editCourse.description || '',
          teacher_id: editCourse.teacher?.id || ''
        });
      } else {
        setFormData({ title: '', description: '', teacher_id: '' });
      }
    }
  }, [isOpen, editCourse]);

  const fetchTeachers = async () => {
    try {
      const response = await getUsers({ user_type: 'teacher' });
      setTeachers(response.data);
    } catch (err) {
      console.error('Failed to fetch teachers', err);
    }
  };

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        teacher_id: formData.teacher_id ? parseInt(formData.teacher_id) : null
      };

      if (editCourse) {
        await updateCourse(editCourse.id, payload);
      } else {
        await createCourse(payload);
      }
      onSuccess();
      onClose();
    } catch (err) {
      setError('Failed to save course');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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

        <h2 style={{ marginBottom: '1.5rem' }}>{editCourse ? 'Edit Course' : 'Create Course'}</h2>

        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Course Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ddd' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ddd', resize: 'vertical' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Assign Teacher</label>
            <select
              name="teacher_id"
              value={formData.teacher_id}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ddd' }}
            >
              <option value="">-- Select Teacher --</option>
              {teachers.map(t => (
                <option key={t.id} value={t.id}>{t.username} ({t.email})</option>
              ))}
            </select>
          </div>

          <button type="submit" disabled={loading} style={{
            background: '#0d6efd', color: 'white', padding: '0.75rem', border: 'none', borderRadius: '6px',
            fontSize: '1rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', marginTop: '0.5rem'
          }}>
            {loading ? 'Saving...' : (editCourse ? 'Update Course' : 'Create Course')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourseModal;
