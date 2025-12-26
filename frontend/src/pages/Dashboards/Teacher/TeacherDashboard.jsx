import React, { useState, useEffect } from 'react';
import {
  Users,
  BookOpen,
  FileText,
  MessageSquare,
  Plus,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import apiClient, { getCourses } from '../../../services/api';
import "./TeacherDashboard.css";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [userName] = useState("Teacher"); // TODO: Get from Auth Context

  // Mock Data for Stars/Overview
  const stats = [
    { title: "Total Students", value: "124", icon: <Users size={24} color="#4f46e5" />, bg: "#e0e7ff" },
    { title: "Active Courses", value: "4", icon: <BookOpen size={24} color="#059669" />, bg: "#d1fae5" },
    { title: "Assignments to Grade", value: "18", icon: <FileText size={24} color="#d97706" />, bg: "#fef3c7" },
    { title: "Unread Messages", value: "5", icon: <MessageSquare size={24} color="#dc2626" />, bg: "#fee2e2" },
  ];

  // Mock Data for Recent Activity
  const activities = [
    { id: 1, type: "submission", text: "Rahul Kumar submitted 'Data Structures Assignment 3'", time: "10 mins ago" },
    { id: 2, type: "alert", text: "Database Management Mid-term is tomorrow", time: "2 hours ago" },
    { id: 3, type: "message", text: "New question in 'Computer Networks' discussion", time: "5 hours ago" },
  ];

  /* Announcement Logic */
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [announcementData, setAnnouncementData] = useState({ title: '', content: '', course: '' });
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchTeacherCourses();
  }, []);

  const fetchTeacherCourses = async () => {
    try {
      const response = await getCourses();
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses", error);
    }
  };

  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: announcementData.title,
        content: announcementData.content,
        course: announcementData.course || null,
        is_global: false
      };
      await apiClient.post('/announcements/', payload);
      alert('Announcement created successfully!');
      setAnnouncementData({ title: '', content: '', course: '' });
      setShowAnnouncementForm(false);
    } catch (error) {
      console.error('Error creating announcement:', error);
      alert('Failed to create announcement');
    }
  };

  return (
    <div className="student-dashboard">
      {/* WELCOME SECTION */}
      <div className="welcome-section">
        <div className="welcome-text">
          <h1>Welcome back, {userName}! 👋</h1>
          <p>Here's what's happening with your courses today.</p>
        </div>
        <div className="date-display">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* STATS GRID */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div className="stat-card" key={index}>
            <div className="stat-icon" style={{ background: stat.bg }}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        {/* LEFT COLUMN */}
        <div className="main-col">

          {/* QUICK ACTIONS */}
          <div className="section-container">
            <div className="section-header">
              <h2>Quick Actions</h2>
            </div>
            <div className="continue-learning-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              <div className="course-card action-card" onClick={() => navigate('/dashboard/teacher/courses')}>
                <div className="course-icon" style={{ background: '#e0e7ff' }}>
                  <Plus size={24} color="#4f46e5" />
                </div>
                <div className="course-info">
                  <h3>Create New Assignment</h3>
                  <p>Post a task for your students</p>
                </div>
              </div>
              <div className="course-card action-card" onClick={() => navigate('/dashboard/teacher/courses')}>
                <div className="course-icon" style={{ background: '#d1fae5' }}>
                  <BookOpen size={24} color="#059669" />
                </div>
                <div className="course-info">
                  <h3>Upload Material</h3>
                  <p>Share notes or videos</p>
                </div>
              </div>
              <div className="course-card action-card" onClick={() => navigate('/dashboard/teacher/exam-builder')}>
                <div className="course-icon" style={{ background: '#fef3c7' }}>
                  <FileText size={24} color="#d97706" />
                </div>
                <div className="course-info">
                  <h3>Create Exam</h3>
                  <p>Set up a new quiz or test</p>
                </div>
              </div>
            </div>
          </div>

          {/* MANAGE ANNOUNCEMENTS SECTION */}
          <div className="section-container">
            <div className="section-header">
              <h2>Manage Announcements</h2>
              <button className="view-all-btn" onClick={() => setShowAnnouncementForm(!showAnnouncementForm)}>
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
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Course (Optional)</label>
                    <select
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                      value={announcementData.course}
                      onChange={(e) => setAnnouncementData({ ...announcementData, course: e.target.value })}
                    >
                      <option value="">Select a course...</option>
                      {courses.map(course => (
                        <option key={course.id} value={course.id}>{course.title}</option>
                      ))}
                    </select>
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

          {/* RECENT SUBMISSIONS (Mock) */}
          <div className="section-container">
            <div className="section-header">
              <h2>Recent Submissions</h2>
              <button className="view-all-btn">View All</button>
            </div>
            <div className="assignments-list">
              {[1, 2, 3].map((i) => (
                <div className="assignment-item" key={i}>
                  <div className="assignment-icon" style={{ background: '#e0e7ff', color: '#4f46e5' }}>
                    <FileText size={20} />
                  </div>
                  <div className="assignment-details">
                    <h4>Data Structures - Assignment {i}</h4>
                    <p>Submitted by Student-{100 + i}</p>
                  </div>
                  <div className="assignment-status submitted">
                    Grade Now
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="side-col">

          {/* RECENT ACTIVITY */}
          <div className="section-container">
            <div className="section-header">
              <h2>Recent Activity</h2>
            </div>
            <div className="activity-feed">
              {activities.map((activity) => (
                <div className="activity-item" key={activity.id}>
                  <div className="activity-icon">
                    {activity.type === 'submission' && <CheckCircle size={16} color="#10b981" />}
                    {activity.type === 'alert' && <AlertCircle size={16} color="#f59e0b" />}
                    {activity.type === 'message' && <MessageSquare size={16} color="#3b82f6" />}
                  </div>
                  <div className="activity-content">
                    <p className="activity-text">{activity.text}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* UPCOMING SCHEDULE */}
          <div className="section-container">
            <div className="section-header">
              <h2>Upcoming Schedule</h2>
            </div>
            <div className="assignments-list">
              <div className="assignment-item">
                <div className="assignment-details">
                  <h4>Web Development Lecture</h4>
                  <p>Tomorrow, 10:00 AM</p>
                </div>
              </div>
              <div className="assignment-item">
                <div className="assignment-details">
                  <h4>Database Quiiz</h4>
                  <p>Dec 20, 02:00 PM</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
