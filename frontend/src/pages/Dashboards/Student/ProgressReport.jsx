import React, { useState } from 'react';
import {
  Download,
  ChevronDown,
  ChevronUp,
  Award,
  BookOpen,
  CheckCircle,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export default function ProgressReport() {
  const [expandedSubject, setExpandedSubject] = useState(null);

  // MOCK DATA
  const studentInfo = {
    name: "John Doe",
    id: "CSE-2023-045",
    semester: "3rd Semester",
    cgpa: 8.7,
    attendance: "92%",
    totalMarks: "450 / 500",
    rank: 5
  };

  const reportData = [
    {
      subject: "Data Structures",
      code: "CS301",
      teacher: "Dr. A. Sharma",
      totalScore: 88,
      grade: "A",
      components: [
        { name: "Monthly Exam 1", marks: 18, total: 20 },
        { name: "Monthly Exam 2", marks: 17, total: 20 },
        { name: "Assignment", marks: 9, total: 10 },
        { name: "Project", marks: 19, total: 20 },
        { name: "Viva", marks: 9, total: 10 },
        { name: "Final Exam", marks: 88, total: 100, weightage: "Converted to 40%" } // Example structure
      ]
    },
    {
      subject: "Database Management",
      code: "CS302",
      teacher: "Mrs. P. Verma",
      totalScore: 92,
      grade: "A+",
      components: [
        { name: "Monthly Exam 1", marks: 19, total: 20 },
        { name: "Monthly Exam 2", marks: 20, total: 20 },
        { name: "Assignment", marks: 10, total: 10 },
        { name: "Project", marks: 20, total: 20 },
        { name: "Viva", marks: 8, total: 10 },
        { name: "Final Exam", marks: 92, total: 100, weightage: "Converted to 40%" }
      ]
    },
    {
      subject: "Computer Networks",
      code: "CS303",
      teacher: "Mr. R. Singh",
      totalScore: 78,
      grade: "B+",
      components: [
        { name: "Monthly Exam 1", marks: 14, total: 20 },
        { name: "Monthly Exam 2", marks: 16, total: 20 },
        { name: "Assignment", marks: 8, total: 10 },
        { name: "Project", marks: 15, total: 20 },
        { name: "Viva", marks: 7, total: 10 },
        { name: "Final Exam", marks: 75, total: 100, weightage: "Converted to 40%" }
      ]
    },
    {
      subject: "Operating Systems",
      code: "CS304",
      teacher: "Dr. K. Lee",
      totalScore: 85,
      grade: "A",
      components: [
        { name: "Monthly Exam 1", marks: 17, total: 20 },
        { name: "Monthly Exam 2", marks: 18, total: 20 },
        { name: "Assignment", marks: 9, total: 10 },
        { name: "Project", marks: 18, total: 20 },
        { name: "Viva", marks: 8, total: 10 },
        { name: "Final Exam", marks: 82, total: 100, weightage: "Converted to 40%" }
      ]
    }
  ];

  const remarks = "John is an excellent student with consistent performance. He needs to focus a bit more on Computer Networks concepts. Overall, keep up the good work!";

  const toggleSubject = (code) => {
    if (expandedSubject === code) {
      setExpandedSubject(null);
    } else {
      setExpandedSubject(code);
    }
  };

  // Simple Chart Visualization Component using CSS
  const PerformanceChart = () => (
    <div style={{ display: 'flex', alignItems: 'flex-end', height: '200px', gap: '20px', padding: '20px 0' }}>
      {reportData.map((data, index) => (
        <div key={index} style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
          <div style={{
            height: `${data.totalScore}%`,
            background: data.totalScore >= 90 ? '#28a745' : data.totalScore >= 75 ? '#007bff' : '#ffc107',
            width: '40px',
            margin: '0 auto',
            borderRadius: '8px 8px 0 0',
            position: 'relative',
            transition: 'height 0.5s ease'
          }}>
            <span style={{
              position: 'absolute',
              top: '-25px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontWeight: 700,
              fontSize: '0.9rem',
              color: '#333'
            }}>
              {data.totalScore}
            </span>
          </div>
          <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#666', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '80px' }}>
            {data.code}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="fade-in" style={{ paddingBottom: '3rem' }}>

      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', color: '#333', margin: '0 0 5px 0' }}>Progress Report</h1>
          <p style={{ color: '#666', margin: 0 }}>Academic Year 2024-2025 • Semester 3</p>
        </div>
        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#6c757d',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 600
        }}>
          <Download size={18} /> Download PDF
        </button>
      </div>

      {/* STATS CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', borderLeft: '5px solid #007bff' }}>
          <div style={{ color: '#888', fontSize: '0.9rem', marginBottom: '5px' }}>Overall CGPA</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#333' }}>{studentInfo.cgpa}</div>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', borderLeft: '5px solid #28a745' }}>
          <div style={{ color: '#888', fontSize: '0.9rem', marginBottom: '5px' }}>Attendance</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#333' }}>{studentInfo.attendance}</div>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', borderLeft: '5px solid #fd7e14' }}>
          <div style={{ color: '#888', fontSize: '0.9rem', marginBottom: '5px' }}>Class Rank</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#333' }}>#{studentInfo.rank}</div>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', borderLeft: '5px solid #6f42c1' }}>
          <div style={{ color: '#888', fontSize: '0.9rem', marginBottom: '5px' }}>Total Marks</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#333' }}>{studentInfo.totalMarks}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', alignItems: 'start' }}>

        {/* LEFT COLUMN: REPORTS */}
        <div>
          <h3 style={{ margin: '0 0 1.5rem 0', color: '#444' }}>Subject-wise Breakdown</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {reportData.map(subject => (
              <div key={subject.code} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                {/* Accordion Header */}
                <div
                  onClick={() => toggleSubject(subject.code)}
                  style={{
                    padding: '1.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: expandedSubject === subject.code ? '#f8f9fa' : 'white',
                    borderBottom: expandedSubject === subject.code ? '1px solid #eee' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{
                      width: '45px',
                      height: '45px',
                      borderRadius: '8px',
                      background: '#e0f2ff',
                      color: '#007bff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700
                    }}>
                      {subject.grade}
                    </div>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', color: '#333' }}>{subject.subject}</h4>
                      <div style={{ fontSize: '0.85rem', color: '#888' }}>{subject.code} • {subject.teacher}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.8rem', color: '#888' }}>Total Score</div>
                      <div style={{ fontWeight: 700, color: '#333' }}>{subject.totalScore}%</div>
                    </div>
                    {expandedSubject === subject.code ? <ChevronUp size={20} color="#999" /> : <ChevronDown size={20} color="#999" />}
                  </div>
                </div>

                {/* Accordion Content */}
                {expandedSubject === subject.code && (
                  <div style={{ padding: '1.5rem', background: '#fff' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid #eee', color: '#888' }}>
                          <th style={{ textAlign: 'left', padding: '8px', fontWeight: 500 }}>Assessment</th>
                          <th style={{ textAlign: 'center', padding: '8px', fontWeight: 500 }}>Marks Obtained</th>
                          <th style={{ textAlign: 'center', padding: '8px', fontWeight: 500 }}>Total Marks</th>
                          <th style={{ textAlign: 'center', padding: '8px', fontWeight: 500 }}>Result</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subject.components.map((comp, idx) => (
                          <tr key={idx} style={{ borderBottom: idx !== subject.components.length - 1 ? '1px solid #f9f9f9' : 'none' }}>
                            <td style={{ padding: '12px 8px', color: '#444' }}>{comp.name}</td>
                            <td style={{ padding: '12px 8px', textAlign: 'center', fontWeight: 600 }}>{comp.marks}</td>
                            <td style={{ padding: '12px 8px', textAlign: 'center', color: '#888' }}>{comp.total}</td>
                            <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                              <span style={{
                                fontSize: '0.8rem',
                                color: (comp.marks / comp.total) >= 0.75 ? '#28a745' : ((comp.marks / comp.total) >= 0.4 ? '#fd7e14' : '#dc3545'),
                                background: (comp.marks / comp.total) >= 0.75 ? '#d4edda' : ((comp.marks / comp.total) >= 0.4 ? '#fff3cd' : '#f8d7da'),
                                padding: '2px 8px',
                                borderRadius: '4px'
                              }}>
                                {Math.round((comp.marks / comp.total) * 100)}%
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: CHART & REMARKS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

          {/* Performance Chart */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#444', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <TrendingUp size={20} color="#007bff" /> Performance Analysis
            </h3>
            <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '12px' }}>
              <PerformanceChart />
            </div>
          </div>

          {/* Remarks */}
          <div style={{ background: '#fffbeb', border: '1px solid #ffeeba', borderRadius: '16px', padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#856404', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlertCircle size={20} /> Class Teacher's Remarks
            </h3>
            <p style={{ fontStyle: 'italic', color: '#555', lineHeight: '1.6', margin: 0 }}>
              "{remarks}"
            </p>
            <div style={{ marginTop: '15px', textAlign: 'right', fontWeight: 600, color: '#333', fontSize: '0.9rem' }}>
              — Mrs. S. Kapoor, Class Teacher
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
