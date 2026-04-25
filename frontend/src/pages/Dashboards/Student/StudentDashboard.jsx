import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Layout, BookOpen, FileText, Award, TrendingUp, PlayCircle, Layers, Bell, ClipboardList, Book, FileCheck, MessageSquare, Briefcase, Trophy, BarChart2, GraduationCap, User, Phone, Library, Settings } from "lucide-react";
import AnnouncementCard from "../../../components/AnnouncementCard/AnnouncementCard";

export default function StudentDashboard() {
  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('http://edu.biz499.com/api/announcements/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch announcements');
      }

      const data = await response.json();
      setAnnouncements(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching announcements:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="fade-in">
      {/* ANNOUNCEMENTS SECTION */}
      <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#333', marginBottom: '1rem' }}>
        <Bell size={20} />
        Announcements
      </h3>

      {loading ? (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
          textAlign: 'center',
          marginBottom: '2.5rem'
        }}>
          <p style={{ color: '#6c757d' }}>Loading announcements...</p>
        </div>
      ) : error ? (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
          textAlign: 'center',
          marginBottom: '2.5rem'
        }}>
          <p style={{ color: '#dc3545' }}>Error loading announcements: {error}</p>
        </div>
      ) : announcements.length === 0 ? (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '3rem 2rem',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
          textAlign: 'center',
          marginBottom: '2.5rem'
        }}>
          <div style={{ color: '#ccc', marginBottom: '1rem' }}>
            <Bell size={48} strokeWidth={1} />
          </div>
          <p style={{ color: '#6c757d' }}>No announcements at this time.</p>
        </div>
      ) : (
        <div style={{ marginBottom: '2.5rem' }}>
          {announcements.map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))}
        </div>
      )}

      {/* DASHBOARD STATS SECTION */}
      <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#333', marginBottom: '1rem' }}>
        <Layout size={20} />
        Dashboard
      </h3>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>

        {/* Total Courses Card - Blue */}
        <div style={{
          background: '#4361ee',
          borderRadius: '12px',
          padding: '1.5rem',
          color: 'white',
          boxShadow: '0 4px 15px rgba(67, 97, 238, 0.3)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '0.5rem' }}>
              <BookOpen size={20} />
              <span style={{ fontWeight: 500 }}>Total Courses</span>
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>19</div>
            <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>(till semester 4)</div>
            <div style={{ fontSize: '0.85rem', opacity: 0.9, marginTop: '5px' }}>Enrolled: 19</div>
          </div>
        </div>

        {/* Exams Card - Green */}
        <div style={{
          background: '#00a35c',
          borderRadius: '12px',
          padding: '1.5rem',
          color: 'white',
          boxShadow: '0 4px 15px rgba(0, 163, 92, 0.3)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '0.5rem' }}>
              <FileText size={20} />
              <span style={{ fontWeight: 500 }}>Exams</span>
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>19</div>
            <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Passed: 19 | Failed: 0</div>
          </div>
        </div>

        {/* Results Card - Purple */}
        <div style={{
          background: '#8a2be2', // Violet/Purple
          borderRadius: '12px',
          padding: '1.5rem',
          color: 'white',
          boxShadow: '0 4px 15px rgba(138, 43, 226, 0.3)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '0.5rem' }}>
              <Award size={20} />
              <span style={{ fontWeight: 500 }}>Results</span>
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>19</div>
            <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Published: 19 | Unpublished: 0</div>
          </div>
        </div>

        {/* Passing Rate Card - Orange */}
        <div style={{
          background: '#fd7e14',
          borderRadius: '12px',
          padding: '1.5rem',
          color: 'white',
          boxShadow: '0 4px 15px rgba(253, 126, 20, 0.3)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '0.5rem' }}>
              <TrendingUp size={20} />
              <span style={{ fontWeight: 500 }}>% Passing Rate</span>
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>100%</div>
            <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Based on all exams attempted</div>
          </div>
        </div>

      </div>



      {/* CONTINUE LEARNING SECTION */}
      <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#333', marginTop: '2.5rem', marginBottom: '1rem' }}>
        <PlayCircle size={20} />
        Continue Learning
      </h3>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '3rem 2rem',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '2.5rem'
      }}>
        <div style={{ color: '#ccc', marginBottom: '1rem' }}>
          <BookOpen size={48} strokeWidth={1} />
        </div>
        <p style={{ color: '#6c757d', marginBottom: '1.5rem' }}>Start a new course to see it appear here.</p>
        <button style={{
          background: '#696cff',
          color: 'white',
          border: 'none',
          padding: '0.6rem 1.5rem',
          borderRadius: '6px',
          fontWeight: 500,
          cursor: 'pointer'
        }}>
          Browse Courses
        </button>
      </div>

      {/* LEARN SECTION */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '2.5rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#333', fontWeight: 600, fontSize: '1.1rem', whiteSpace: 'nowrap' }}>
          <BookOpen size={20} />
          Learn
        </div>
        <div style={{ flex: 1, height: '2px', background: 'linear-gradient(90deg, #007bff 0%, #00d2ff 100%)', borderRadius: '2px' }}></div>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        <Link to="/dashboard/student/courses" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'inline-flex', alignItems: 'center', gap: '10px', minWidth: '200px', cursor: 'pointer', transition: 'transform 0.2s' }}>
            <div style={{ background: '#f5f5f9', padding: '8px', borderRadius: '8px', color: '#696cff' }}>
              <Layers size={20} />
            </div>
            <span style={{ fontWeight: 500, color: '#566a7f' }}>My Courses</span>
          </div>
        </Link>
      </div>

      {/* COLLABORATE & COMMUNICATION SECTION */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '2.5rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#333', fontWeight: 600, fontSize: '1.1rem', whiteSpace: 'nowrap' }}>
          <MessageSquare size={20} />
          Collaborate & Communication
        </div>
        <div style={{ flex: 1, height: '2px', background: 'linear-gradient(90deg, #ffc107 0%, #ff9800 100%)', borderRadius: '2px' }}></div>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        <Link to="/dashboard/student/discussions" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '10px', minWidth: '200px', cursor: 'pointer', transition: 'transform 0.2s' }}>
            <div style={{ background: '#e8fadf', padding: '8px', borderRadius: '8px', color: '#71dd37' }}>
              <MessageSquare size={20} />
            </div>
            <span style={{ fontWeight: 500, color: '#566a7f' }}>Messenger</span>
          </div>
        </Link>
      </div>

      {/* ASSIGNMENTS & EXAMS SECTION */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '2.5rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#333', fontWeight: 600, fontSize: '1.1rem', whiteSpace: 'nowrap' }}>
          <ClipboardList size={20} />
          Assignments & Exams
        </div>
        <div style={{ flex: 1, height: '2px', background: 'linear-gradient(90deg, #696cff 0%, #a1a3ff 100%)', borderRadius: '2px' }}></div>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        <Link to="/dashboard/student/assignments" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '10px', minWidth: '200px' }}>
            <div style={{ background: '#e0f2ff', padding: '8px', borderRadius: '8px', color: '#007bff' }}>
              <ClipboardList size={20} />
            </div>
            <span style={{ fontWeight: 500, color: '#566a7f' }}>Assignments</span>
          </div>
        </Link>
        <Link to="/dashboard/student/exams" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '10px', minWidth: '200px' }}>
            <div style={{ background: '#f3e5f5', padding: '8px', borderRadius: '8px', color: '#9c27b0' }}>
              <FileText size={20} />
            </div>
            <span style={{ fontWeight: 500, color: '#566a7f' }}>Exams</span>
          </div>
        </Link>
      </div>

      {/* ACADEMIC ACTIVITIES SECTION */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '2.5rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#333', fontWeight: 600, fontSize: '1.1rem', whiteSpace: 'nowrap' }}>
          <Library size={20} />
          Academic Activities
        </div>
        <div style={{ flex: 1, height: '2px', background: 'linear-gradient(90deg, #007bff 0%, #00d2ff 100%)', borderRadius: '2px' }}></div>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        <Link to="/dashboard/student/project" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '10px', minWidth: '200px' }}>
            <div style={{ background: '#e0f2ff', padding: '8px', borderRadius: '8px', color: '#007bff' }}>
              <Briefcase size={20} />
            </div>
            <span style={{ fontWeight: 500, color: '#566a7f' }}>Project</span>
          </div>
        </Link>
      </div>

      {/* YOUR ACHIEVEMENTS SECTION (Reports) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '2.5rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#333', fontWeight: 600, fontSize: '1.1rem', whiteSpace: 'nowrap' }}>
          <Trophy size={20} />
          Reports & Achievements
        </div>
        <div style={{ flex: 1, height: '2px', background: 'linear-gradient(90deg, #696cff 0%, #a1a3ff 100%)', borderRadius: '2px' }}></div>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        <Link to="/dashboard/student/progress-report" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '10px', minWidth: '200px' }}>
            <div style={{ background: '#f3e5f5', padding: '8px', borderRadius: '8px', color: '#9c27b0' }}>
              <BarChart2 size={20} />
            </div>
            <span style={{ fontWeight: 500, color: '#566a7f' }}>Progress Report</span>
          </div>
        </Link>
      </div>

      {/* ACCOUNT CONTROL SECTION */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '2.5rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#333', fontWeight: 600, fontSize: '1.1rem', whiteSpace: 'nowrap' }}>
          <Settings size={20} />
          Account Control
        </div>
        <div style={{ flex: 1, height: '2px', background: 'linear-gradient(90deg, #696cff 0%, #a1a3ff 100%)', borderRadius: '2px' }}></div>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        <Link to="/dashboard/student/contact" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '10px', minWidth: '200px' }}>
            <div style={{ background: '#e0f2ff', padding: '8px', borderRadius: '8px', color: '#007bff' }}>
              <User size={20} />
            </div>
            <span style={{ fontWeight: 500, color: '#566a7f' }}>Personal Profile</span>
          </div>
        </Link>
        <Link to="/dashboard/student/settings" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '10px', minWidth: '200px' }}>
            <div style={{ background: '#e8fadf', padding: '8px', borderRadius: '8px', color: '#71dd37' }}>
              <Settings size={20} />
            </div>
            <span style={{ fontWeight: 500, color: '#566a7f' }}>Account Settings</span>
          </div>
        </Link>
      </div>

    </div>
  );
}
