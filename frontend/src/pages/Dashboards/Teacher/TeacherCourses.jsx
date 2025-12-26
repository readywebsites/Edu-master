import React from 'react';
import {
  Search,
  Filter,
  MoreVertical,
  BookOpen,
  Users,
  Clock,
  Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import "./TeacherDashboard.css";

const TeacherCourses = () => {
  const navigate = useNavigate();
  // Mock Data
  const courses = [
    { id: 1, title: "Data Structures & Algorithms", code: "CS101", students: 45, nextClass: "Tomorrow, 10:00 AM" },
    { id: 2, title: "Database Management Systems", code: "CS102", students: 38, nextClass: "Today, 02:00 PM" },
    { id: 3, title: "Computer Networks", code: "CS103", students: 42, nextClass: "Dec 18, 11:00 AM" },
    { id: 4, title: "Web Development", code: "CS104", students: 50, nextClass: "Friday, 09:00 AM" },
  ];

  return (
    <div className="student-dashboard">
      <div className="welcome-section" style={{ marginBottom: '20px' }}>
        <div className="welcome-text">
          <h1>Courses</h1>
          <p>Manage your classes, content, and assignments.</p>
        </div>
        <div>
          <button className="primary-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={18} /> Create New Course
          </button>
        </div>
      </div>

      {/* FILTERS & SEARCH */}
      <div className="dashboard-filters" style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
        <div className="search-bar" style={{ flex: 1, background: 'white', padding: '10px 15px', borderRadius: '10px', display: 'flex', alignItems: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
          <Search size={20} color="#888" />
          <input type="text" placeholder="Search courses..." style={{ border: 'none', marginLeft: '10px', outline: 'none', width: '100%' }} />
        </div>
        <button className="icon-btn" style={{ background: 'white', padding: '10px', borderRadius: '10px', border: 'none', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', cursor: 'pointer' }}>
          <Filter size={20} color="#555" />
        </button>
      </div>

      {/* COURSE GRID */}
      <div className="courses-grid">
        {courses.map((course) => (
          <div className="course-card" key={course.id}>
            <button style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none', cursor: 'pointer' }}>
              <MoreVertical size={20} color="#888" />
            </button>

            <div style={{ width: '50px', height: '50px', background: '#eff6ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px' }}>
              <BookOpen size={24} color="#3b82f6" />
            </div>

            <h3 style={{ margin: '0 0 5px 0', fontSize: '1.2rem', color: '#1f2937' }}>{course.title}</h3>
            <p style={{ margin: '0 0 15px 0', color: '#6b7280', fontSize: '0.9rem' }}>{course.code}</p>

            <div className="course-stats" style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f3f4f6', paddingTop: '15px', color: '#6b7280', fontSize: '0.85rem', marginTop: 'auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Users size={16} /> {course.students} Students
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Clock size={16} /> {course.nextClass}
              </div>
            </div>

            <button className="primary-btn" style={{ width: '100%', marginTop: '15px', padding: '10px', fontSize: '0.9rem' }} onClick={() => navigate(`/dashboard/teacher/courses/${course.id}`)}>
              Manage Course
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherCourses;
