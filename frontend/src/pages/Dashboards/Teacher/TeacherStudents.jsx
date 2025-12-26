import React from 'react';
import { Search, Filter, Mail, MoreVertical } from 'lucide-react';
import "./TeacherDashboard.css";

const TeacherStudents = () => {
  // Mock Students Data
  const students = [
    { id: 1, name: "Student One", roll: "101", course: "CS101", grade: "A" },
    { id: 2, name: "Student Two", roll: "102", course: "CS101", grade: "B+" },
    { id: 3, name: "Student Three", roll: "103", course: "CS102", grade: "A-" },
    { id: 4, name: "Student Four", roll: "104", course: "CS103", grade: "B" },
    { id: 5, name: "Student Five", roll: "105", course: "CS101", grade: "C" },
  ];

  return (
    <div className="student-dashboard">
      <div className="welcome-section" style={{ marginBottom: '20px' }}>
        <div className="welcome-text">
          <h1>My Students</h1>
          <p>View student progress and performance.</p>
        </div>
      </div>

      {/* FILTERS & SEARCH */}
      <div className="dashboard-filters" style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
        <div className="search-bar" style={{ flex: 1, background: 'white', padding: '10px 15px', borderRadius: '10px', display: 'flex', alignItems: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
          <Search size={20} color="#888" />
          <input type="text" placeholder="Search students by name or roll number..." style={{ border: 'none', marginLeft: '10px', outline: 'none', width: '100%' }} />
        </div>
        <button className="icon-btn" style={{ background: 'white', padding: '10px', borderRadius: '10px', border: 'none', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', cursor: 'pointer' }}>
          <Filter size={20} color="#555" />
        </button>
      </div>

      {/* STUDENT TABLE */}
      <div className="table-container" style={{ background: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f3f4f6', textAlign: 'left' }}>
              <th style={{ padding: '15px', color: '#6b7280', fontWeight: '600' }}>Name</th>
              <th style={{ padding: '15px', color: '#6b7280', fontWeight: '600' }}>Roll No</th>
              <th style={{ padding: '15px', color: '#6b7280', fontWeight: '600' }}>Course</th>
              <th style={{ padding: '15px', color: '#6b7280', fontWeight: '600' }}>Grade</th>
              <th style={{ padding: '15px', color: '#6b7280', fontWeight: '600' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                    {student.name[0]}
                  </div>
                  <span style={{ fontWeight: '500', color: '#1f2937' }}>{student.name}</span>
                </td>
                <td style={{ padding: '15px', color: '#6b7280' }}>{student.roll}</td>
                <td style={{ padding: '15px', color: '#6b7280' }}>{student.course}</td>
                <td style={{ padding: '15px' }}>
                  <span style={{ padding: '4px 8px', borderRadius: '20px', background: student.grade.startsWith('A') ? '#d1fae5' : '#fff7ed', color: student.grade.startsWith('A') ? '#059669' : '#c2410c', fontSize: '0.85rem', fontWeight: '600' }}>
                    {student.grade}
                  </span>
                </td>
                <td style={{ padding: '15px' }}>
                  <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', marginRight: '10px' }}>
                    <Mail size={18} color="#6b7280" />
                  </button>
                  <button style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                    <MoreVertical size={18} color="#6b7280" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherStudents;
