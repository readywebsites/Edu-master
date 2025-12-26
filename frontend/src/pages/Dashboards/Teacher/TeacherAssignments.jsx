import React, { useState, useEffect } from 'react';
import {
  Plus,
  FileText,
  Calendar,
  Users,
  Download,
  Eye,
  MoreVertical,
  Search,
  X,
  Paperclip
} from 'lucide-react';
import apiClient from "../../../services/api";
import "./TeacherDashboard.css";

const TeacherAssignments = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]); // Store fetched courses
  const [showModal, setShowModal] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    course: '',
    description: '',
    due_date: '',
    file: null
  });

  // Fetch Assignments and Courses from API
  useEffect(() => {
    fetchAssignments();
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await apiClient.get('/courses/');
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchAssignments = async () => {
    try {
      const response = await apiClient.get('/assignments/');
      // Transform API data to match UI expected format if necessary
      const formattedData = response.data.map(item => ({
        ...item,
        submitted: 0,
        total: 0,
        status: new Date(item.due_date) > new Date() ? 'Active' : 'Closed'
      }));
      setAssignments(formattedData);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    try {
      // Use FormData for file upload
      const formData = new FormData();
      formData.append('title', newAssignment.title);
      formData.append('course', parseInt(newAssignment.course));
      formData.append('description', newAssignment.description);
      formData.append('due_date', newAssignment.due_date);
      if (newAssignment.file) {
        formData.append('file', newAssignment.file);
      }

      await apiClient.post('/assignments/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      setShowModal(false);
      fetchAssignments(); // Refresh list
      setNewAssignment({ title: '', course: '', description: '', due_date: '', file: null });
      alert("Assignment created successfully!");
    } catch (error) {
      console.error("Error creating assignment:", error);
      alert("Failed to create assignment. Ensure you are logged in and Course is selected.");
    }
  };

  const handleFileChange = (e) => {
    setNewAssignment({ ...newAssignment, file: e.target.files[0] });
  };

  const getCourseTitle = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    return course ? course.title : `Course #${courseId}`;
  };

  // Submission Handling
  const [submissions, setSubmissions] = useState([]);
  const [viewingAssignment, setViewingAssignment] = useState(null); // Assignment ID being viewed
  const [gradingSubmission, setGradingSubmission] = useState(null); // Submission ID being graded
  const [gradeInput, setGradeInput] = useState('');
  const [feedbackInput, setFeedbackInput] = useState('');

  const fetchSubmissions = async () => {
    try {
      const response = await apiClient.get('/submissions/');
      setSubmissions(response.data);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const getSubmissionsForAssignment = (assignmentId) => {
    return submissions.filter(s => s.assignment === assignmentId);
  };

  const handleOpenSubmissions = (assignment) => {
    setViewingAssignment(assignment);
  };

  const handleUpdateGrade = async (submissionId) => {
    try {
      await apiClient.patch(`/submissions/${submissionId}/`, {
        grade: gradeInput,
        feedback: feedbackInput
      });
      setGradingSubmission(null);
      fetchSubmissions(); // Refresh
    } catch (error) {
      console.error("Error updating grade:", error);
    }
  };

  const filteredAssignments = activeTab === 'active'
    ? assignments.filter(a => a.status === 'Active')
    : assignments.filter(a => a.status === 'Closed');

  return (
    <div className="student-dashboard">
      <div className="welcome-section">
        <div className="welcome-text">
          <h1>Assignments</h1>
          <p>Create and manage course assignments with attachments.</p>
        </div>
        <button className="primary-btn" onClick={() => setShowModal(true)}>
          <Plus size={18} style={{ marginRight: '8px' }} /> Create Assignment
        </button>
      </div>

      {/* TABS & FILTERS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <div style={{ display: 'flex', gap: '5px', background: '#f3f4f6', padding: '5px', borderRadius: '10px' }}>
          <button
            onClick={() => setActiveTab('active')}
            style={{
              padding: '8px 20px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'active' ? 'white' : 'transparent',
              boxShadow: activeTab === 'active' ? '0 2px 5px rgba(0,0,0,0.05)' : 'none',
              color: activeTab === 'active' ? '#4f46e5' : '#6b7280',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Active
          </button>
          <button
            onClick={() => setActiveTab('closed')}
            style={{
              padding: '8px 20px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'closed' ? 'white' : 'transparent',
              boxShadow: activeTab === 'closed' ? '0 2px 5px rgba(0,0,0,0.05)' : 'none',
              color: activeTab === 'closed' ? '#4f46e5' : '#6b7280',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Closed
          </button>
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>
          <div className="search-bar" style={{ background: 'white', padding: '8px 15px', borderRadius: '10px', display: 'flex', alignItems: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
            <Search size={18} color="#888" />
            <input type="text" placeholder="Search..." style={{ border: 'none', marginLeft: '10px', outline: 'none', width: '150px' }} />
          </div>
        </div>
      </div>

      {/* ASSIGNMENTS GRID */}
      <div className="courses-grid">
        {filteredAssignments.length === 0 ? <p style={{ color: '#888' }}>No assignments found.</p> : filteredAssignments.map(assignment => (
          <div className="course-card" key={assignment.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <div style={{ width: '45px', height: '45px', background: '#e0e7ff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5' }}>
                <FileText size={24} />
              </div>
              <button style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <MoreVertical size={20} color="#888" />
              </button>
            </div>

            <h3 style={{ fontSize: '1.1rem', margin: '0 0 5px 0', color: '#333' }}>{assignment.title}</h3>
            <span style={{ fontSize: '0.85rem', color: '#6b7280', background: '#f3f4f6', padding: '2px 8px', borderRadius: '4px', alignSelf: 'flex-start', marginBottom: '15px' }}>
              {getCourseTitle(assignment.course)}
            </span>

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#555' }}>
                <Calendar size={16} color="#888" />
                <span>Due: {new Date(assignment.due_date).toLocaleDateString()}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#555' }}>
                <Users size={16} color="#888" />
                <span>Submissions: {assignment.submitted}/{assignment.total}</span>
              </div>

              {/* File Link if exists */}
              {assignment.file && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#4f46e5', marginTop: '5px' }}>
                  <Paperclip size={16} />
                  <a href={assignment.file} target="_blank" rel="noopener noreferrer" style={{ color: '#4f46e5', textDecoration: 'none' }}>
                    View Attachment
                  </a>
                </div>
              )}

              <button
                className="primary-btn"
                style={{ width: '100%', marginTop: '5px' }}
                onClick={() => handleOpenSubmissions(assignment)}
              >
                View Submissions
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE ASSIGNMENT MODAL */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{ background: 'white', padding: '25px', borderRadius: '15px', width: '400px', maxHeight: '90%', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ margin: 0 }}>Create Assignment</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
            </div>
            <form onSubmit={handleCreateAssignment}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: '500' }}>Title</label>
                <input
                  type="text"
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: '500' }}>Select Course</label>
                <select
                  value={newAssignment.course}
                  onChange={(e) => setNewAssignment({ ...newAssignment, course: e.target.value })}
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                >
                  <option value="">Select a Course</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>{course.title}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: '500' }}>Due Date</label>
                <input
                  type="date"
                  value={newAssignment.due_date}
                  onChange={(e) => setNewAssignment({ ...newAssignment, due_date: e.target.value })}
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: '500' }}>Attachment (PDF, Word, etc.)</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.png,.jpg,.jpeg"
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px dashed #ddd' }}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: '500' }}>Description</label>
                <textarea
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', minHeight: '80px' }}
                />
              </div>
              <button type="submit" className="primary-btn" style={{ width: '100%' }}>Create</button>
            </form>
          </div>
        </div>
      )}

      {/* MOCK SUBMISSION PREVIEW SECTION (To demonstrate requirements) */}
      {/* SUBMISSIONS MODAL */}
      {viewingAssignment && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100
        }}>
          <div style={{ background: 'white', padding: '25px', borderRadius: '15px', width: '800px', maxHeight: '85vh', overflowY: 'auto', position: 'relative' }}>
            <button
              onClick={() => { setViewingAssignment(null); setGradingSubmission(null); }}
              style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>

            <h2 style={{ marginBottom: '5px' }}>Submissions: {viewingAssignment.title}</h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>Total Submissions: {getSubmissionsForAssignment(viewingAssignment.id).length}</p>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8f9fa', color: '#666' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Student</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Date</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>File</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Grade</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {getSubmissionsForAssignment(viewingAssignment.id).map(sub => (
                  <tr key={sub.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px' }}>{sub.student_name}</td>
                    <td style={{ padding: '12px' }}>{new Date(sub.submitted_at).toLocaleString()}</td>
                    <td style={{ padding: '12px' }}>
                      <a href={sub.file} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#4f46e5' }}>
                        <Download size={16} /> Download
                      </a>
                    </td>
                    <td style={{ padding: '12px' }}>
                      {gradingSubmission === sub.id ? (
                        <input
                          value={gradeInput}
                          onChange={(e) => setGradeInput(e.target.value)}
                          style={{ width: '60px', padding: '5px', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                      ) : (
                        <span style={{ fontWeight: 'bold', color: sub.grade ? '#166534' : '#888' }}>
                          {sub.grade || 'Pending'}
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '12px' }}>
                      {gradingSubmission === sub.id ? (
                        <div style={{ display: 'flex', gap: '5px' }}>
                          <button
                            onClick={() => handleUpdateGrade(sub.id)}
                            className="primary-btn"
                            style={{ padding: '5px 10px', fontSize: '0.8rem' }}
                          >Save</button>
                          <button
                            onClick={() => setGradingSubmission(null)}
                            style={{ padding: '5px 10px', fontSize: '0.8rem', border: '1px solid #ddd', background: 'white', borderRadius: '4px', cursor: 'pointer' }}
                          >Cancel</button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setGradingSubmission(sub.id);
                            setGradeInput(sub.grade || '');
                            setFeedbackInput(sub.feedback || '');
                          }}
                          style={{ padding: '5px 10px', fontSize: '0.85rem', color: '#4f46e5', border: '1px solid #e0e7ff', background: '#e0e7ff', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}
                        >
                          {sub.grade ? 'Edit Grade' : 'Grade'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Feedback Input if Grading */}
            {gradingSubmission && (
              <div style={{ marginTop: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '10px' }}>
                <h4 style={{ margin: '0 0 10px 0' }}>Provide Feedback</h4>
                <textarea
                  value={feedbackInput}
                  onChange={(e) => setFeedbackInput(e.target.value)}
                  placeholder="Optional feedback for the student..."
                  style={{ width: '100%', minHeight: '80px', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                />
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default TeacherAssignments;
