import React from 'react';
import { MessageSquare, Search, Filter } from 'lucide-react';
import "./TeacherDashboard.css";

const TeacherDiscussions = () => {
  return (
    <div className="student-dashboard">
      <div className="welcome-section">
        <div className="welcome-text">
          <h1>Discussion Forum</h1>
          <p>Engage with your students and answer their queries.</p>
        </div>
        <button className="primary-btn">
          <MessageSquare size={18} style={{ marginRight: '8px' }} /> Start New Topic
        </button>
      </div>

      {/* FILTERS & SEARCH */}
      <div className="dashboard-filters" style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
        <div className="search-bar" style={{ flex: 1, background: 'white', padding: '10px 15px', borderRadius: '10px', display: 'flex', alignItems: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
          <Search size={20} color="#888" />
          <input type="text" placeholder="Search discussions..." style={{ border: 'none', marginLeft: '10px', outline: 'none', width: '100%' }} />
        </div>
        <button className="icon-btn" style={{ background: 'white', padding: '10px', borderRadius: '10px', border: 'none', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', cursor: 'pointer' }}>
          <Filter size={20} color="#555" />
        </button>
      </div>

      {/* MOCK DISCUSSIONS LIST */}
      <div className="section-container">
        {/* Discussion Item 1 */}
        <div style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '15px', marginBottom: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#333' }}>Doubts regarding Array Pointers</h3>
            <span style={{ fontSize: '0.8rem', color: '#888' }}>2 hrs ago</span>
          </div>
          <p style={{ margin: '5px 0', color: '#555', fontSize: '0.95rem' }}>
            Sir, I am confused about how array name acts as a pointer in C++. Can you please explain with an example?
          </p>
          <div style={{ display: 'flex', gap: '15px', fontSize: '0.85rem', color: '#666' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><MessageSquare size={14} /> 5 Replies</span>
            <span style={{ color: '#4f46e5', fontWeight: '500' }}>CS101 - Data Structures</span>
            <span>By: Student One</span>
          </div>
        </div>

        {/* Discussion Item 2 */}
        <div style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '15px', marginBottom: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#333' }}>Exam Syllabus Clarification</h3>
            <span style={{ fontSize: '0.8rem', color: '#888' }}>5 hrs ago</span>
          </div>
          <p style={{ margin: '5px 0', color: '#555', fontSize: '0.95rem' }}>
            Will Unit 5 be included in the mid-term exams? The syllabus doc says yes but in class you mentioned it might not be.
          </p>
          <div style={{ display: 'flex', gap: '15px', fontSize: '0.85rem', color: '#666' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><MessageSquare size={14} /> 12 Replies</span>
            <span style={{ color: '#4f46e5', fontWeight: '500' }}>CS102 - DBMS</span>
            <span>By: Student Two</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default TeacherDiscussions;
