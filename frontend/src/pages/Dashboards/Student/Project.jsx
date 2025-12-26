import React, { useState, useEffect } from 'react';
import {
  GitBranch,
  Folder,
  Download,
  Upload,
  CheckCircle,
  Clock,
  Circle,
  FileText,
  AlertCircle
} from 'lucide-react';
import apiClient from "../../../services/api";

export default function Project() {
  const [activeTab, setActiveTab] = useState('timeline');
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Fetch Project Data
  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const response = await apiClient.get('/projects/');
      // For student, we expect typically one active project or a list. 
      // For MVP, taking the first one if multiple, or null if none.
      if (response.data && response.data.length > 0) {
        setProject(response.data[0]);
      } else {
        setProject(null);
      }
    } catch (error) {
      console.error("Error fetching project:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !project) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('project', project.id);

    setUploading(true);
    try {
      await apiClient.post('/project-files/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      fetchProject(); // Refresh to see new file
      alert("File uploaded successfully.");
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="p-5">Loading project details...</div>;

  if (!project) {
    return (
      <div className="fade-in p-5 text-center">
        <div style={{ background: 'white', padding: '50px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <Folder size={60} color="#cbd5e1" style={{ marginBottom: '20px' }} />
          <h2 style={{ color: '#333' }}>No Active Project</h2>
          <p style={{ color: '#666' }}>You haven't been assigned a project yet. Please contact your mentor.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ paddingBottom: '2rem' }}>

      {/* HEADER CARD */}
      <div style={{
        background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
        borderRadius: '16px',
        padding: '2rem',
        color: 'white',
        marginBottom: '2rem',
        boxShadow: '0 10px 30px rgba(0,123,255,0.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.2)',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: 600,
              marginBottom: '10px'
            }}>
              {project.status}
            </div>
            <h1 style={{ margin: '0 0 10px 0', fontSize: '1.8rem' }}>{project.title}</h1>
            <p style={{ margin: 0, opacity: 0.9, maxWidth: '600px', lineHeight: '1.5' }}>{project.description}</p>
          </div>
          <div style={{ textAlign: 'right', minWidth: '150px' }}>
            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Course</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>{project.course_title}</div>
            <div style={{ marginTop: '10px', fontSize: '0.9rem', opacity: 0.8 }}>Deadline</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>{new Date(project.deadline).toLocaleDateString()}</div>
          </div>
        </div>
        {project.grade && (
          <div style={{ marginTop: '20px', background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '10px' }}>
            <strong style={{ fontSize: '1.1rem' }}>Grade: {project.grade}</strong>
            {project.feedback && <div style={{ marginTop: '5px', fontSize: '0.9rem', opacity: 0.9 }}>"{project.feedback}"</div>}
          </div>
        )}
      </div>

      {/* TABS */}
      <div style={{
        background: 'white',
        padding: '0.5rem',
        borderRadius: '12px',
        display: 'inline-flex',
        gap: '5px',
        background: '#f8f9fa',
        border: '1px solid #eee',
        marginBottom: '2rem'
      }}>
        {[
          { id: 'timeline', label: 'Timeline & Milestones', icon: <GitBranch size={18} /> },
          { id: 'workspace', label: 'Files & Workspace', icon: <Folder size={18} /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === tab.id ? 'white' : 'transparent',
              color: activeTab === tab.id ? '#007bff' : '#666',
              fontWeight: 600,
              boxShadow: activeTab === tab.id ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* TIMELINE TAB */}
      {activeTab === 'timeline' && (
        <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
          {project.milestones && project.milestones.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {project.milestones.map((step, index) => (
                <div key={step.id} style={{ display: 'flex', gap: '20px', position: 'relative' }}>
                  {/* Vertical Line */}
                  {index !== project.milestones.length - 1 && (
                    <div style={{
                      position: 'absolute',
                      top: '40px',
                      left: '20px',
                      width: '2px',
                      height: 'calc(100% - 10px)',
                      background: '#e9ecef'
                    }}></div>
                  )}

                  {/* Icon */}
                  <div style={{ zIndex: 1 }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: step.status === 'completed' ? '#d4edda' : step.status === 'active' ? '#fff3cd' : '#f8f9fa',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `2px solid ${step.status === 'completed' ? '#28a745' : step.status === 'active' ? '#ffc107' : '#e9ecef'}`
                    }}>
                      {step.status === 'completed' ? <CheckCircle size={20} color="#28a745" /> :
                        step.status === 'active' ? <Clock size={20} color="#fd7e14" /> :
                          <Circle size={20} color="#aaa" />}
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, paddingBottom: '2.5rem' }}>
                    <h3 style={{ margin: '0 0 5px 0', fontSize: '1.1rem', color: '#333' }}>
                      {step.title}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#666', marginBottom: '8px' }}>
                      <Clock size={14} />
                      <span>{new Date(step.date).toLocaleDateString()}</span>
                      <span style={{
                        textTransform: 'uppercase',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        padding: '2px 6px',
                        borderRadius: '4px',
                        background: step.status === 'completed' ? '#d4edda' : step.status === 'active' ? '#fff3cd' : '#f0f0f0',
                        color: step.status === 'completed' ? '#155724' : step.status === 'active' ? '#856404' : '#666'
                      }}>
                        {step.status}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.95rem', color: '#666', lineHeight: '1.5' }}>
                      {step.description || "No description provided."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: '#666', fontStyle: 'italic' }}>No milestones defined yet.</p>
          )}
        </div>
      )}

      {/* WORKSPACE TAB */}
      {activeTab === 'workspace' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

          {/* Upload Section */}
          <div>
            <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', marginBottom: '2rem' }}>
              <h3 style={{ margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Upload size={20} color="#28a745" /> Upload File
              </h3>
              <div style={{
                border: '2px dashed #ddd',
                borderRadius: '12px',
                padding: '2rem',
                textAlign: 'center',
                background: '#fafafa',
                cursor: 'pointer',
                transition: 'all 0.2s',
                marginBottom: '1rem',
                position: 'relative'
              }}>
                <Upload size={32} color="#aaa" style={{ marginBottom: '10px' }} />
                <p style={{ margin: '0 0 5px 0', fontWeight: 600, color: '#444' }}>
                  {uploading ? 'Uploading...' : 'Drop files here or click to upload'}
                </p>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                  disabled={uploading}
                />
              </div>
            </div>
          </div>

          {/* Files List */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
            <h3 style={{ margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Folder size={20} color="#007bff" /> Project Files
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {project.files && project.files.length > 0 ? project.files.map((file, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid #eee',
                  background: '#fcfcfc'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
                    <FileText size={20} color="#666" flexshrink={0} />
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ fontWeight: 500, fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {file.file.split('/').pop()}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#999' }}>
                        Uploaded by {file.uploader_name} on {new Date(file.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <a href={file.file} target="_blank" rel="noreferrer" style={{ background: '#f0f7ff', border: 'none', borderRadius: '6px', padding: '6px', cursor: 'pointer', color: '#007bff' }}>
                    <Download size={18} />
                  </a>
                </div>
              )) : (
                <p style={{ color: '#888', fontStyle: 'italic' }}>No files shared yet.</p>
              )}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
