import React, { useState, useEffect } from 'react';
import {
  Plus,
  Briefcase,
  Users,
  Calendar,
  Layout,
  FileText,
  CheckCircle,
  Clock,
  X,
  Upload,
  Download
} from 'lucide-react';
import apiClient from "../../../services/api";
import "./TeacherDashboard.css";

const TeacherProjects = () => {
  const [projects, setProjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null); // For details view

  // Create Form State
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    student: '',
    course: '',
    deadline: ''
  });

  // Milestone Form State (for selected project)
  const [newMilestone, setNewMilestone] = useState({ title: '', date: '' });

  // Grading State
  const [gradeInput, setGradeInput] = useState('');
  const [feedbackInput, setFeedbackInput] = useState('');

  useEffect(() => {
    fetchProjects();
    fetchStudentsAndCourses();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await apiClient.get('/projects/');
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchStudentsAndCourses = async () => {
    try {
      const [uRes, cRes] = await Promise.all([
        apiClient.get('/users/'),
        apiClient.get('/courses/')
      ]);
      setStudents(uRes.data.filter(u => u.user_type === 'student'));
      setCourses(cRes.data);
    } catch (error) {
      console.error("Error fetching metadata:", error);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/projects/', newProject);
      setShowCreateModal(false);
      setNewProject({ title: '', description: '', student: '', course: '', deadline: '' });
      fetchProjects();
      alert("Project created successfully!");
    } catch (error) {
      console.error("Create failed:", error);
      alert("Failed to create project.");
    }
  };

  const handleCreateMilestone = async () => {
    if (!newMilestone.title || !newMilestone.date || !selectedProject) return;
    try {
      await apiClient.post('/project-milestones/', {
        project: selectedProject.id,
        title: newMilestone.title,
        date: newMilestone.date,
        status: 'pending'
      });
      refreshSelectedProject();
      setNewMilestone({ title: '', date: '' });
    } catch (error) {
      console.error("Error creating milestone:", error);
    }
  };

  const handleUpdateMilestoneStatus = async (milestoneId, newStatus) => {
    try {
      await apiClient.patch(`/project-milestones/${milestoneId}/`, { status: newStatus });
      refreshSelectedProject();
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const handleUpdateGrade = async () => {
    if (!selectedProject) return;
    try {
      await apiClient.patch(`/projects/${selectedProject.id}/`, {
        grade: gradeInput,
        feedback: feedbackInput,
        status: gradeInput ? 'Completed' : selectedProject.status
      });
      refreshSelectedProject();
      fetchProjects(); // Update list view too
      alert("Grade updated!");
    } catch (error) {
      console.error("Grading failed", error);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !selectedProject) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('project', selectedProject.id);

    try {
      await apiClient.post('/project-files/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      refreshSelectedProject();
      alert("File uploaded!");
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  const refreshSelectedProject = async () => {
    if (!selectedProject) return;
    try {
      const response = await apiClient.get(`/projects/${selectedProject.id}/`);
      setSelectedProject(response.data);
    } catch (error) {
      console.error("Error refreshing project", error);
    }
  };

  // When opening details, populate grade inputs
  const openProjectDetails = (proj) => {
    setSelectedProject(proj);
    setGradeInput(proj.grade || '');
    setFeedbackInput(proj.feedback || '');
  };

  return (
    <div className="student-dashboard">
      <div className="welcome-section">
        <div className="welcome-text">
          <h1>Course Projects</h1>
          <p>Manage academic projects, track milestones, and review submissions.</p>
        </div>
        <button className="primary-btn" onClick={() => setShowCreateModal(true)}>
          <Plus size={18} style={{ marginRight: '8px' }} /> Assign New Project
        </button>
      </div>

      <div className="dashboard-grid">
        {/* LEFT COL - PROJECTS LIST */}
        <div className="main-col">
          <div className="section-container">
            <div className="section-header">
              <h2>Active Projects</h2>
            </div>
            <div className="courses-grid" style={{ gridTemplateColumns: '1fr' }}>
              {projects.length === 0 ? <p style={{ color: '#888' }}>No projects found.</p> : projects.map(proj => (
                <div className="course-card" key={proj.id} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }}>
                  <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <div style={{ width: '50px', height: '50px', background: '#f3f4f6', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Layout size={24} color="#555" />
                    </div>
                    <div>
                      <h3 style={{ margin: '0 0 5px 0', fontSize: '1.1rem' }}>{proj.title}</h3>
                      <span style={{ fontSize: '0.85rem', color: '#666', background: '#f9fafb', padding: '2px 6px', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
                        {proj.student_name}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '0.8rem', color: '#888', display: 'flex', alignItems: 'center', gap: '5px' }}><Clock size={14} /> Status</div>
                      <div style={{ fontWeight: '600' }}>{proj.status}</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '0.8rem', color: '#888', display: 'flex', alignItems: 'center', gap: '5px' }}><Calendar size={14} /> Deadline</div>
                      <div style={{ fontWeight: '600', color: '#dc2626' }}>{new Date(proj.deadline).toLocaleDateString()}</div>
                    </div>
                  </div>

                  <button className="primary-btn" style={{ padding: '8px 15px', fontSize: '0.9rem' }} onClick={() => openProjectDetails(proj)}>Manage</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CREATE PROJECT MODAL */}
      {showCreateModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{ background: 'white', padding: '25px', borderRadius: '15px', width: '500px', maxHeight: '90%', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ margin: 0 }}>Assign Project</h2>
              <button onClick={() => setShowCreateModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
            </div>
            <form onSubmit={handleCreateProject}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Project Title</label>
                <input type="text" required style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}
                  value={newProject.title} onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Description</label>
                <textarea required style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}
                  value={newProject.description} onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Assigned Student</label>
                  <select required style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}
                    value={newProject.student} onChange={e => setNewProject({ ...newProject, student: e.target.value })}
                  >
                    <option value="">Select Student</option>
                    {students.map(s => <option key={s.id} value={s.id}>{s.username}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Related Course</label>
                  <select required style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}
                    value={newProject.course} onChange={e => setNewProject({ ...newProject, course: e.target.value })}
                  >
                    <option value="">Select Course</option>
                    {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Deadline</label>
                <input type="date" required style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}
                  value={newProject.deadline} onChange={e => setNewProject({ ...newProject, deadline: e.target.value })}
                />
              </div>
              <button type="submit" className="primary-btn" style={{ width: '100%' }}>Create Project</button>
            </form>
          </div>
        </div>
      )}

      {/* PROJECT DETAILS / MANAGE MODAL */}
      {selectedProject && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100
        }}>
          <div style={{ background: 'white', padding: '25px', borderRadius: '15px', width: '800px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              <div>
                <h2 style={{ margin: 0 }}>{selectedProject.title}</h2>
                <span style={{ color: '#666' }}>Student: {selectedProject.student_name}</span>
              </div>
              <button onClick={() => setSelectedProject(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
              {/* LEFT: TIMELINE & FILES */}
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>Milestones</h3>
                <div style={{ background: '#f9fafb', padding: '15px', borderRadius: '10px', marginBottom: '20px' }}>
                  {selectedProject.milestones && selectedProject.milestones.map(ms => (
                    <div key={ms.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #eee' }}>
                      <div>
                        <div style={{ fontWeight: '600' }}>{ms.title}</div>
                        <div style={{ fontSize: '0.8rem', color: '#666' }}>{new Date(ms.date).toLocaleDateString()}</div>
                      </div>
                      <select
                        value={ms.status}
                        onChange={(e) => handleUpdateMilestoneStatus(ms.id, e.target.value)}
                        style={{ fontSize: '0.8rem', padding: '2px', borderRadius: '4px', border: '1px solid #ddd' }}
                      >
                        <option value="pending">Pending</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  ))}
                  <div style={{ marginTop: '10px', display: 'flex', gap: '5px' }}>
                    <input placeholder="New Milestone Title" style={{ flex: 1, padding: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                      value={newMilestone.title} onChange={e => setNewMilestone({ ...newMilestone, title: e.target.value })}
                    />
                    <input type="date" style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                      value={newMilestone.date} onChange={e => setNewMilestone({ ...newMilestone, date: e.target.value })}
                    />
                    <button onClick={handleCreateMilestone} style={{ background: '#4f46e5', color: 'white', border: 'none', borderRadius: '4px', padding: '5px 10px', cursor: 'pointer' }}>Add</button>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>Files</h3>
                <div style={{ background: '#f9fafb', padding: '15px', borderRadius: '10px' }}>
                  {selectedProject.files && selectedProject.files.map(f => (
                    <div key={f.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>
                        {f.file.split('/').pop()}
                      </span>
                      <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.7rem', color: '#888' }}>{f.uploader_name}</span>
                        <a href={f.file} target="_blank" rel="noreferrer" style={{ color: '#4f46e5' }}><Download size={16} /></a>
                      </div>
                    </div>
                  ))}
                  <label style={{ display: 'block', marginTop: '10px', cursor: 'pointer', color: '#4f46e5', fontSize: '0.9rem', textAlign: 'center' }}>
                    <Upload size={14} style={{ marginRight: '5px' }} /> Upload New File
                    <input type="file" style={{ display: 'none' }} onChange={handleFileUpload} />
                  </label>
                </div>
              </div>

              {/* RIGHT: GRADING */}
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>Grading & Feedback</h3>
                <div style={{ background: '#f9fafb', padding: '15px', borderRadius: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Grade / Marks</label>
                  <input type="text" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ddd', marginBottom: '15px' }}
                    value={gradeInput} onChange={e => setGradeInput(e.target.value)}
                  />

                  <label style={{ display: 'block', marginBottom: '5px' }}>Instructor Feedback</label>
                  <textarea style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ddd', minHeight: '100px', marginBottom: '15px' }}
                    value={feedbackInput} onChange={e => setFeedbackInput(e.target.value)}
                  />

                  <button onClick={handleUpdateGrade} className="primary-btn" style={{ width: '100%' }}>Update Grade</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TeacherProjects;
