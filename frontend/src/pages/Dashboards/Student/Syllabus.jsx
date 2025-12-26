// src/pages/Dashboards/Student/Syllabus.jsx
import React, { useState } from 'react';
import {
  BookOpen,
  Download,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Circle,
  Search,
  Video,
  FileText,
  Bookmark,
  User,
  Clock,
  Calendar,
  Award
} from 'lucide-react';

export default function Syllabus() {
  const [selectedSubject, setSelectedSubject] = useState('Data Structures');
  const [expandedUnits, setExpandedUnits] = useState({ 1: true }); // Unit 1 open by default
  const [completedTopics, setCompletedTopics] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock Data
  const subjects = ['Data Structures', 'Database Management', 'Computer Networks', 'Operating Systems'];

  const syllabusData = {
    'Data Structures': [
      {
        id: 1,
        title: 'Introduction to Data Structures',
        weight: '10 Marks',
        topics: [
          { id: 101, name: 'Basic Concepts: Algorithms and Flowcharts', type: 'theory' },
          { id: 102, name: 'Time and Space Complexity', type: 'theory', hasResource: true, resourceType: 'video' },
          { id: 103, name: 'Asymptotic Notations (Big O, Omega, Theta)', type: 'theory' }
        ]
      },
      {
        id: 2,
        title: 'Arrays and Linked Lists',
        weight: '15 Marks',
        topics: [
          { id: 201, name: 'Array Operations (Insert, Delete, Update)', type: 'practical' },
          { id: 202, name: 'Singly Linked List Implementation', type: 'practical', hasResource: true, resourceType: 'code' },
          { id: 203, name: 'Doubly and Circular Linked Lists', type: 'practical' }
        ]
      },
      {
        id: 3,
        title: 'Stacks and Queues',
        weight: '15 Marks',
        topics: [
          { id: 301, name: 'Stack Operations (Push, Pop)', type: 'practical' },
          { id: 302, name: 'Queue Operations (Enqueue, Dequeue)', type: 'practical' },
          { id: 303, name: 'Applications: Infix to Postfix Conversion', type: 'theory', hasResource: true, resourceType: 'video' }
        ]
      }
    ],
    'Database Management': [
      {
        id: 1,
        title: 'Introduction to DBMS',
        weight: '12 Marks',
        topics: [
          { id: 101, name: 'Database Architecture', type: 'theory' },
          { id: 102, name: 'Data Models (ER, Relational)', type: 'theory' }
        ]
      }
    ]
  };

  const toggleUnit = (unitId) => {
    setExpandedUnits(prev => ({
      ...prev,
      [unitId]: !prev[unitId]
    }));
  };

  const toggleTopicCompletion = (topicId) => {
    setCompletedTopics(prev => {
      if (prev.includes(topicId)) {
        return prev.filter(id => id !== topicId);
      } else {
        return [...prev, topicId];
      }
    });
  };

  const calculateProgress = () => {
    const currentSyllabus = syllabusData[selectedSubject] || [];
    const totalTopics = currentSyllabus.reduce((acc, unit) => acc + unit.topics.length, 0);
    if (totalTopics === 0) return 0;

    // Count completed topics that belong to the current subject
    const currentSubjectTopicIds = currentSyllabus.flatMap(unit => unit.topics.map(t => t.id));
    const completedCount = completedTopics.filter(id => currentSubjectTopicIds.includes(id)).length;

    return Math.round((completedCount / totalTopics) * 100);
  };

  const currentData = syllabusData[selectedSubject] || [];
  const progress = calculateProgress();

  return (
    <div className="fade-in" style={{ paddingBottom: '2rem' }}>

      {/* HEADER SECTION */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '2rem',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div style={{ flex: 1, minWidth: '250px' }}>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '1.5rem', color: '#333' }}>My Courses & Syllabus</h2>
          <div style={{ position: 'relative', maxWidth: '300px' }}>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 15px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                appearance: 'none',
                background: '#f8f9fa',
                cursor: 'pointer'
              }}
            >
              {subjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
            </select>
            <ChevronDown size={18} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#666' }} />
          </div>
        </div>

        <div style={{ flex: 1, minWidth: '250px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 500 }}>
            <span>Progress</span>
            <span style={{ color: '#007bff' }}>{progress}% Completed</span>
          </div>
          <div style={{ height: '8px', background: '#e9ecef', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: '#007bff', transition: 'width 0.5s ease' }}></div>
          </div>
        </div>

        <div>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            background: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 500
          }}>
            <Download size={18} />
            Download PDF
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>

        {/* MAIN CONTENT - ACCORDION */}
        <div style={{ flex: '2', minWidth: '300px' }}>

          <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
            <input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '12px 15px 12px 45px',
                borderRadius: '8px',
                border: '1px solid #eee',
                fontSize: '0.95rem',
                background: 'white',
                boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {currentData.map((unit) => (
              <div key={unit.id} style={{ background: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                {/* Unit Header */}
                <div
                  onClick={() => toggleUnit(unit.id)}
                  style={{
                    padding: '1.2rem',
                    background: expandedUnits[unit.id] ? '#f8f9fa' : 'white',
                    borderBottom: expandedUnits[unit.id] ? '1px solid #eee' : 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                >
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', color: '#333' }}>{unit.title}</h4>
                    <span style={{ fontSize: '0.85rem', color: '#666', background: '#e9ecef', padding: '2px 8px', borderRadius: '4px' }}>Unit {unit.id}</span>
                  </div>
                  {expandedUnits[unit.id] ? <ChevronUp size={20} color="#666" /> : <ChevronDown size={20} color="#666" />}
                </div>

                {/* Topics List */}
                {expandedUnits[unit.id] && (
                  <div style={{ padding: '0.5rem 0' }}>
                    {unit.topics.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase())).map((topic) => (
                      <div
                        key={topic.id}
                        style={{
                          padding: '12px 1.5rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          borderBottom: '1px solid #f8f9fa'
                        }}
                      >
                        <div
                          onClick={() => toggleTopicCompletion(topic.id)}
                          style={{ cursor: 'pointer', color: completedTopics.includes(topic.id) ? '#28a745' : '#ddd' }}
                        >
                          {completedTopics.includes(topic.id) ? <CheckCircle size={22} fill="#e6fffa" /> : <Circle size={22} />}
                        </div>

                        <div style={{ flex: 1, opacity: completedTopics.includes(topic.id) ? 0.6 : 1, transition: 'opacity 0.2s' }}>
                          <p style={{ margin: 0, fontSize: '0.95rem', color: '#333' }}>{topic.name}</p>
                        </div>

                        {topic.hasResource && (
                          <div title="View Resource" style={{ cursor: 'pointer', color: '#007bff', background: '#e0f2ff', padding: '6px', borderRadius: '6px' }}>
                            {topic.resourceType === 'video' ? <Video size={16} /> : <FileText size={16} />}
                          </div>
                        )}
                      </div>
                    ))}
                    {unit.topics.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                      <div style={{ padding: '1rem', textAlign: 'center', color: '#999', fontSize: '0.9rem' }}>No topics match your search</div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SIDEBAR - INFO */}
        <div style={{ flex: '1', minWidth: '250px' }}>

          {/* COURSE INFO CARD */}
          <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '1.5rem' }}>
            <h4 style={{ marginTop: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={18} color="#007bff" />
              Instructor Info
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>👨‍🏫</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Dr. A. Sharma</div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>Associate Professor</div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #eee', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: '#666', display: 'flex', alignItems: 'center', gap: '5px' }}><Award size={14} /> Credits</span>
                <span style={{ fontWeight: 500 }}>4 Credits</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: '#666', display: 'flex', alignItems: 'center', gap: '5px' }}><Clock size={14} /> Schedule</span>
                <span style={{ fontWeight: 500 }}>Mon, Wed @ 10 AM</span>
              </div>
            </div>
          </div>

          <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '1.5rem' }}>
            <h4 style={{ marginTop: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bookmark size={18} color="#fd7e14" />
              Reference Books
            </h4>
            <ul style={{ paddingLeft: '1.2rem', margin: 0, fontSize: '0.9rem', color: '#555', lineHeight: '1.6' }}>
              <li style={{ marginBottom: '8px' }}>Data Structures using C by Reema Thareja</li>
              <li style={{ marginBottom: '8px' }}>Fundamentals of Data Structures by Ellis Horowitz</li>
              <li>Introduction to Algorithms by CLRS</li>
            </ul>
          </div>

          <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <h4 style={{ marginTop: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={18} color="#20c997" />
              Exam Weightage
            </h4>
            <table style={{ width: '100%', fontSize: '0.9rem', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8f9fa', textAlign: 'left' }}>
                  <th style={{ padding: '8px', borderRadius: '4px 0 0 4px' }}>Unit</th>
                  <th style={{ padding: '8px', borderRadius: '0 4px 4px 0' }}>Marks</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map(unit => (
                  <tr key={unit.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '10px 8px', color: '#333' }}>{unit.title}</td>
                    <td style={{ padding: '10px 8px', fontWeight: 600, color: '#007bff' }}>{unit.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
