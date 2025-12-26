import React, { useState, useEffect } from 'react';
import { FileText, CheckCircle, Clock, Upload, AlertCircle, File } from 'lucide-react';
import apiClient from "../../../services/api";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(null); // Assignment ID currently uploading

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [assRes, subRes] = await Promise.all([
        apiClient.get('/assignments/'),
        apiClient.get('/submissions/')
      ]);
      setAssignments(assRes.data);
      setSubmissions(subRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getSubmission = (assignmentId) => {
    return submissions.find(s => s.assignment === assignmentId);
  };

  const handleFileUpload = async (assignmentId, file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('assignment', assignmentId);

    setUploading(assignmentId);
    try {
      await apiClient.post('/submissions/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Refresh data to show new submission
      fetchData();
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload submission.");
    } finally {
      setUploading(null);
    }
  };

  if (loading) return <div className="p-5">Loading assignments...</div>;

  return (
    <div className="fade-in" style={{ paddingBottom: '50px' }}>
      <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '5px', color: '#1a1a1a' }}>Assignments</h1>
          <p style={{ color: '#666' }}>Track current tasks and view grades</p>
        </div>
        <div style={{ background: '#e0e7ff', padding: '10px 20px', borderRadius: '12px', color: '#4f46e5', fontWeight: '600' }}>
          {submissions.length} / {assignments.length} Submitted
        </div>
      </div>

      <div style={{ display: 'grid', gap: '20px' }}>
        {assignments.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#888', padding: '40px' }}>No active assignments found.</div>
        ) : (
          assignments.map(assignment => {
            const submission = getSubmission(assignment.id);
            const isSubmitted = !!submission;
            const isGraded = submission && submission.grade;

            return (
              <div key={assignment.id} style={{
                background: 'white',
                borderRadius: '16px',
                padding: '25px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                borderLeft: isSubmitted ? '5px solid #22c55e' : '5px solid #f59e0b',
                transition: 'transform 0.2s',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px'
              }}>

                <div style={{ flex: 1, minWidth: '300px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#333' }}>{assignment.title}</h3>
                    {isSubmitted && <span style={{ background: '#dcfce7', color: '#166534', fontSize: '0.75rem', padding: '4px 8px', borderRadius: '6px', fontWeight: '600' }}>Submitted</span>}
                    {isGraded && <span style={{ background: '#e0e7ff', color: '#4338ca', fontSize: '0.75rem', padding: '4px 8px', borderRadius: '6px', fontWeight: '600' }}>Graded</span>}
                  </div>

                  <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '15px' }}>
                    {assignment.description}
                  </p>

                  <div style={{ display: 'flex', gap: '15px', fontSize: '0.85rem', color: '#888' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Clock size={16} />
                      Due: {new Date(assignment.due_date).toLocaleDateString()}
                    </div>
                    {assignment.file && (
                      <a href={assignment.file} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#4f46e5', textDecoration: 'none' }}>
                        <FileText size={16} />
                        View Attachment
                      </a>
                    )}
                  </div>
                </div>

                {/* ACTION AREA */}
                <div style={{ width: '300px', borderLeft: '1px solid #eee', paddingLeft: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                  {isSubmitted ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#166534', fontWeight: '500' }}>
                        <CheckCircle size={20} />
                        Assignment Submitted
                      </div>
                      {isGraded ? (
                        <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                            <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Grade:</span>
                            <span style={{ fontWeight: 'bold', color: '#333' }}>{submission.grade}</span>
                          </div>
                          {submission.feedback && (
                            <div style={{ fontSize: '0.9rem', color: '#475569' }}>
                              <span style={{ color: '#64748b' }}>Feedback: </span>
                              "{submission.feedback}"
                            </div>
                          )}
                        </div>
                      ) : (
                        <div style={{ fontSize: '0.9rem', color: '#64748b', fontStyle: 'italic' }}>
                          Waiting for grade...
                        </div>
                      )}
                      <a href={submission.file} target="_blank" rel="noreferrer" style={{ fontSize: '0.85rem', color: '#4f46e5', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '5px' }}>
                        <File size={14} /> View your submission
                      </a>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#d97706' }}>
                        <AlertCircle size={20} />
                        Status: Pending
                      </div>

                      <label
                        className="upload-btn"
                        style={{
                          background: uploading === assignment.id ? '#cbd5e1' : '#4f46e5',
                          color: 'white',
                          padding: '12px',
                          borderRadius: '8px',
                          textAlign: 'center',
                          cursor: uploading === assignment.id ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          fontWeight: '500',
                          transition: 'background 0.2s'
                        }}
                      >
                        {uploading === assignment.id ? (
                          <span>Uploading...</span>
                        ) : (
                          <>
                            <Upload size={18} />
                            Upload Submission
                          </>
                        )}
                        <input
                          type="file"
                          style={{ display: 'none' }}
                          onChange={(e) => handleFileUpload(assignment.id, e.target.files[0])}
                          disabled={uploading === assignment.id}
                        />
                      </label>
                    </div>
                  )}
                </div>

              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Assignments;
