import React, { useState } from 'react';
import {
  ArrowLeft,
  Upload,
  Plus,
  FileText,
  Video,
  MessageSquare,
  Trash2,
  Edit
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import "./TeacherDashboard.css";

const TeacherCourseDetails = () => {
  const { courseId } = useParams(); /* eslint-disable-line no-unused-vars */
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('syllabus');

  // Mock Course Data
  const course = {
    title: "Data Structures & Algorithms",
    code: "CS101",
    description: "Advanced concepts of data structures."
  };

  // Tab Content Components (Internal for simplicity in this phase)
  const SyllabusTab = () => (
    <div className="tab-content">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3>Course Content</h3>
        <button className="primary-btn" style={{ fontSize: '0.9rem', padding: '8px 15px' }}>
          <Upload size={16} style={{ marginRight: '5px' }} /> Upload Resource
        </button>
      </div>

      {/* Unit 1 */}
      <div className="course-unit" style={{ background: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px', border: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h4 style={{ margin: '0 0 10px 0' }}>Unit 1: Introduction to Arrays</h4>
          <div>
            <button className="icon-btn-small"><Edit size={16} /></button>
          </div>
        </div>
        <div className="resource-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="resource-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: '#f9fafb', borderRadius: '8px' }}>
            <FileText size={20} color="#dc2626" />
            <span style={{ flex: 1 }}>Lecture Notes PDF</span>
            <button className="icon-btn-small"><Trash2 size={16} color="#ef4444" /></button>
          </div>
          <div className="resource-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: '#f9fafb', borderRadius: '8px' }}>
            <Video size={20} color="#2563eb" />
            <span style={{ flex: 1 }}>Video Lecture 1.1</span>
            <button className="icon-btn-small"><Trash2 size={16} color="#ef4444" /></button>
          </div>
        </div>
      </div>
    </div>
  );

  const AssignmentsTab = () => (
    <div className="tab-content">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3>Assignments</h3>
        <button className="primary-btn" style={{ fontSize: '0.9rem', padding: '8px 15px' }}>
          <Plus size={16} style={{ marginRight: '5px' }} /> Create Assignment
        </button>
      </div>
      <div className="assignment-list">
        {/* Item */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', border: '1px solid #e5e7eb', marginBottom: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h4 style={{ margin: 0 }}>Assignment 1: Array Manipulation</h4>
            <span style={{ fontSize: '0.85rem', color: '#dc2626', background: '#fee2e2', padding: '2px 8px', borderRadius: '4px' }}>Due: Dec 20</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: '5px 0 15px 0' }}>Write a program to reverse an array.</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ padding: '6px 12px', background: '#eff6ff', color: '#1d4ed8', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '0.85rem' }}>View Submissions (12/45)</button>
            <button style={{ padding: '6px 12px', background: '#fff', border: '1px solid #d1d5db', color: '#374151', borderRadius: '5px', cursor: 'pointer', fontSize: '0.85rem' }}>Edit</button>
          </div>
        </div>
      </div>
    </div>
  );

  const AnnouncementsTab = () => (
    <div className="tab-content">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3>Class Announcements</h3>
        <button className="primary-btn" style={{ fontSize: '0.9rem', padding: '8px 15px' }}>
          <MessageSquare size={16} style={{ marginRight: '5px' }} /> Post Update
        </button>
      </div>
      {/* Announcement Input Placeholder */}
      <div style={{ marginBottom: '20px' }}>
        <textarea placeholder="Write something to your class..." style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #d1d5db', minHeight: '100px', fontFamily: 'inherit' }}></textarea>
      </div>
    </div>
  );


  return (
    <div className="student-dashboard">
      {/* HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <ArrowLeft size={20} color="#374151" />
        </button>
        <div>
          <h1 style={{ fontSize: '1.5rem', margin: 0 }}>{course.title}</h1>
          <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>{course.code}</span>
        </div>
      </div>

      {/* TABS */}
      <div className="course-tabs" style={{ display: 'flex', gap: '20px', borderBottom: '1px solid #e5e7eb', marginBottom: '25px' }}>
        <button
          className={`tab-btn ${activeTab === 'syllabus' ? 'active' : ''}`}
          onClick={() => setActiveTab('syllabus')}
          style={{ padding: '10px 5px', background: 'none', border: 'none', borderBottom: activeTab === 'syllabus' ? '2px solid #2563eb' : '2px solid transparent', color: activeTab === 'syllabus' ? '#2563eb' : '#6b7280', fontWeight: '500', cursor: 'pointer' }}
        >
          Syllabus & Content
        </button>
        <button
          className={`tab-btn ${activeTab === 'assignments' ? 'active' : ''}`}
          onClick={() => setActiveTab('assignments')}
          style={{ padding: '10px 5px', background: 'none', border: 'none', borderBottom: activeTab === 'assignments' ? '2px solid #2563eb' : '2px solid transparent', color: activeTab === 'assignments' ? '#2563eb' : '#6b7280', fontWeight: '500', cursor: 'pointer' }}
        >
          Assignments
        </button>
        <button
          className={`tab-btn ${activeTab === 'announcements' ? 'active' : ''}`}
          onClick={() => setActiveTab('announcements')}
          style={{ padding: '10px 5px', background: 'none', border: 'none', borderBottom: activeTab === 'announcements' ? '2px solid #2563eb' : '2px solid transparent', color: activeTab === 'announcements' ? '#2563eb' : '#6b7280', fontWeight: '500', cursor: 'pointer' }}
        >
          Announcements
        </button>
        <button
          className={`tab-btn ${activeTab === 'students' ? 'active' : ''}`}
          onClick={() => setActiveTab('students')}
          style={{ padding: '10px 5px', background: 'none', border: 'none', borderBottom: activeTab === 'students' ? '2px solid #2563eb' : '2px solid transparent', color: activeTab === 'students' ? '#2563eb' : '#6b7280', fontWeight: '500', cursor: 'pointer' }}
        >
          Enrolled Students
        </button>
      </div>

      {/* TAB CONTENT */}
      <div className="tab-content-container">
        {activeTab === 'syllabus' && <SyllabusTab />}
        {activeTab === 'assignments' && <AssignmentsTab />}
        {activeTab === 'announcements' && <AnnouncementsTab />}
        {activeTab === 'students' && <div style={{ color: '#6b7280' }}>Student list component here...</div>}
      </div>

    </div>
  );
};

export default TeacherCourseDetails;
