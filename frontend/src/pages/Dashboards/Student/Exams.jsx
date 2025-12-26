import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../../services/api';
import {
  Calendar,
  Clock,
  MapPin,
  FileText,
  Award,
  CheckCircle,
  PlayCircle,
  AlertTriangle,
  ChevronRight,
  Download
} from 'lucide-react';

export default function Exams() {
  const [activeTab, setActiveTab] = useState('schedule');
  const [mockTests, setMockTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExam, setSelectedExam] = useState(null);
  const [examMode, setExamMode] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  // MOCK DATA for schedules and results (static for now)
  const schedules = [
    {
      id: 1,
      subject: 'Data Structures',
      type: 'Internal Assessment 2',
      date: '2025-12-18',
      time: '10:00 AM - 11:30 AM',
      location: 'Hall 302',
      syllabus: 'Module 3: Stacks and Queues',
      status: 'upcoming'
    },
    {
      id: 2,
      subject: 'Database Management',
      type: 'Semester Final',
      date: '2026-01-05',
      time: '09:00 AM - 12:00 PM',
      location: 'Main Auditorium',
      syllabus: 'Full Syllabus',
      status: 'scheduled'
    }
  ];

  const results = [
    {
      id: 101,
      subject: 'Computer Networks',
      type: 'Internal Assessment 1',
      date: '2025-11-15',
      marks: 24,
      total: 30,
      grade: 'A',
      status: 'passed'
    },
    {
      id: 102,
      subject: 'Operating Systems',
      type: 'Mid-Term',
      date: '2025-10-20',
      marks: 42,
      total: 50,
      grade: 'A+',
      status: 'passed'
    }
  ];

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await apiClient.get('/exams/');
        setMockTests(response.data);
      } catch (error) {
        console.error('Failed to fetch exams', error);
      } finally {
        setLoading(false);
      }
    };
    fetchExams();
  }, []);

  useEffect(() => {
    if (examMode && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [examMode, timeLeft]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const startExam = (exam) => {
    setSelectedExam(exam);
    setExamMode(true);
    setCurrentQIndex(0);
    setAnswers({});
    setTimeLeft(exam.duration_minutes * 60);
    setShowResult(false);
    setScore(0);
  };

  const handleAnswerSelect = (questionId, choiceId) => {
    setAnswers(prev => ({ ...prev, [questionId]: choiceId }));
  };

  const handleSubmitExam = async () => {
    let calculatedScore = 0;
    selectedExam.questions.forEach(q => {
      const selectedChoiceId = answers[q.id];
      const correctChoice = q.choices.find(c => c.is_correct);
      if (correctChoice && selectedChoiceId === correctChoice.id) {
        calculatedScore += q.marks;
      }
    });
    setScore(calculatedScore);
    setShowResult(true);
    setExamMode(false);

    // Submit to backend
    try {
      await apiClient.post('/exam-submissions/', {
        exam: selectedExam.id,
        score: calculatedScore
      });
    } catch (error) {
      console.error('Failed to submit exam', error);
    }
  };

  const handleExitExam = () => {
    setSelectedExam(null);
    setShowResult(false);
    setExamMode(false);
  };

  // Exam Taking Interface
  if (examMode && selectedExam) {
    const question = selectedExam.questions[currentQIndex];
    return (
      <div className="fade-in" style={{ paddingBottom: '2rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', background: 'white', padding: '1rem', borderRadius: '12px' }}>
          <div>
            <h2 style={{ margin: 0 }}>{selectedExam.title}</h2>
            <p style={{ margin: 0, color: '#666' }}>Question {currentQIndex + 1} of {selectedExam.questions.length}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: '#fee2e2', color: '#dc2626', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold' }}>
              <Clock size={16} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
              {formatTime(timeLeft)}
            </div>
            <button onClick={handleSubmitExam} style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
              Submit Exam
            </button>
          </div>
        </div>

        {/* Question */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', marginBottom: '1rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>{question.text}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {question.choices.map((choice, idx) => (
              <label
                key={choice.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px 16px',
                  border: answers[question.id] === choice.id ? '2px solid #4f46e5' : '1px solid #ddd',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  background: answers[question.id] === choice.id ? '#eef2ff' : 'white'
                }}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  checked={answers[question.id] === choice.id}
                  onChange={() => handleAnswerSelect(question.id, choice.id)}
                  style={{ marginRight: '12px' }}
                />
                {choice.text}
              </label>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            disabled={currentQIndex === 0}
            onClick={() => setCurrentQIndex(prev => prev - 1)}
            style={{ padding: '10px 20px', border: '1px solid #ddd', background: 'white', borderRadius: '8px', cursor: currentQIndex === 0 ? 'not-allowed' : 'pointer' }}
          >
            Previous
          </button>
          {currentQIndex < selectedExam.questions.length - 1 ? (
            <button
              onClick={() => setCurrentQIndex(prev => prev + 1)}
              style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmitExam}
              style={{ padding: '10px 20px', background: '#16a34a', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
            >
              Finish & Submit
            </button>
          )}
        </div>

        {/* Question Palette */}
        <div style={{ marginTop: '2rem', background: 'white', padding: '1rem', borderRadius: '12px' }}>
          <h4>Question Palette</h4>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {selectedExam.questions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setCurrentQIndex(idx)}
                style={{
                  width: '35px',
                  height: '35px',
                  borderRadius: '50%',
                  border: currentQIndex === idx ? '2px solid #4f46e5' : '1px solid #ddd',
                  background: answers[q.id] ? '#22c55e' : '#f3f4f6',
                  color: answers[q.id] ? 'white' : '#333',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Result Screen
  if (showResult && selectedExam) {
    const totalMarks = selectedExam.questions.reduce((sum, q) => sum + q.marks, 0);
    return (
      <div className="fade-in" style={{ paddingBottom: '2rem', textAlign: 'center' }}>
        <div style={{ background: 'white', padding: '3rem', borderRadius: '16px', maxWidth: '500px', margin: '0 auto' }}>
          <CheckCircle size={64} color="#22c55e" style={{ marginBottom: '1rem' }} />
          <h2>Exam Submitted!</h2>
          <p style={{ color: '#666', marginBottom: '2rem' }}>{selectedExam.title}</p>

          <div style={{ background: '#f0fdf4', padding: '2rem', borderRadius: '12px', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '3rem', margin: 0, color: '#16a34a' }}>{score}</h1>
            <p style={{ margin: 0, color: '#666' }}>out of {totalMarks} marks</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button onClick={handleExitExam} style={{ padding: '12px 24px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              Back to Exams
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ paddingBottom: '2rem' }}>

      {/* HEADER */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', color: '#333', margin: '0 0 5px 0' }}>Examinations</h1>
        <p style={{ color: '#666', margin: 0 }}>View schedules, check results, and practice.</p>
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
          { id: 'schedule', label: 'Exam Schedule', icon: <Calendar size={18} /> },
          { id: 'results', label: 'Results & Grades', icon: <Award size={18} /> },
          { id: 'mock', label: 'Practice / Mock Tests', icon: <PlayCircle size={18} /> }
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

      {/* CONTENT: SCHEDULE */}
      {activeTab === 'schedule' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {schedules.map(exam => (
            <div key={exam.id} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '2rem',
              alignItems: 'center',
              borderLeft: '5px solid #007bff'
            }}>
              {/* Date Box */}
              <div style={{ textAlign: 'center', minWidth: '80px', padding: '10px', background: '#f0f7ff', borderRadius: '10px' }}>
                <span style={{ display: 'block', fontSize: '0.9rem', color: '#007bff', fontWeight: 600, textTransform: 'uppercase' }}>
                  {new Date(exam.date).toLocaleString('default', { month: 'short' })}
                </span>
                <span style={{ display: 'block', fontSize: '2rem', fontWeight: 700, color: '#333' }}>
                  {new Date(exam.date).getDate()}
                </span>
              </div>

              {/* Details */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '20px', background: '#e9ecef', fontSize: '0.75rem', fontWeight: 600, color: '#495057', marginBottom: '8px' }}>
                  {exam.type}
                </div>
                <h3 style={{ margin: '0 0 5px 0', color: '#333', fontSize: '1.3rem' }}>{exam.subject}</h3>
                <div style={{ display: 'flex', gap: '20px', color: '#666', fontSize: '0.9rem', marginTop: '10px', flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Clock size={16} /> {exam.time}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><MapPin size={16} /> {exam.location}</span>
                </div>
                <div style={{ marginTop: '10px', fontSize: '0.9rem', color: '#555' }}>
                  <strong>Syllabus:</strong> {exam.syllabus}
                </div>
              </div>

              {/* Action */}
              <div>
                <button style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  background: 'white',
                  cursor: 'pointer',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <Download size={16} /> Admit Card
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CONTENT: RESULTS */}
      {activeTab === 'results' && (
        <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f8f9fa' }}>
              <tr>
                <th style={{ padding: '15px 20px', textAlign: 'left', fontSize: '0.85rem', color: '#666', textTransform: 'uppercase' }}>Subject | Exam</th>
                <th style={{ padding: '15px 20px', textAlign: 'left', fontSize: '0.85rem', color: '#666', textTransform: 'uppercase' }}>Date</th>
                <th style={{ padding: '15px 20px', textAlign: 'center', fontSize: '0.85rem', color: '#666', textTransform: 'uppercase' }}>Marks</th>
                <th style={{ padding: '15px 20px', textAlign: 'center', fontSize: '0.85rem', color: '#666', textTransform: 'uppercase' }}>Grade</th>
                <th style={{ padding: '15px 20px', textAlign: 'right', fontSize: '0.85rem', color: '#666', textTransform: 'uppercase' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {results.map(res => (
                <tr key={res.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px 20px' }}>
                    <div style={{ fontWeight: 600, color: '#333' }}>{res.subject}</div>
                    <div style={{ fontSize: '0.85rem', color: '#888' }}>{res.type}</div>
                  </td>
                  <td style={{ padding: '15px 20px', color: '#555', fontSize: '0.9rem' }}>
                    {formatDate(res.date)}
                  </td>
                  <td style={{ padding: '15px 20px', textAlign: 'center' }}>
                    <span style={{ fontWeight: 600, color: '#333' }}>{res.marks}</span>
                    <span style={{ color: '#999', fontSize: '0.85rem' }}> / {res.total}</span>
                  </td>
                  <td style={{ padding: '15px 20px', textAlign: 'center' }}>
                    <span style={{
                      display: 'inline-block',
                      width: '35px',
                      height: '35px',
                      lineHeight: '35px',
                      background: '#e0f2ff',
                      color: '#007bff',
                      borderRadius: '50%',
                      fontWeight: 700,
                      fontSize: '0.9rem'
                    }}>
                      {res.grade}
                    </span>
                  </td>
                  <td style={{ padding: '15px 20px', textAlign: 'right' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      color: '#28a745',
                      background: '#d4edda',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: 600
                    }}>
                      <CheckCircle size={12} /> Passed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* CONTENT: MOCK TESTS */}
      {activeTab === 'mock' && (
        <div>
          {loading ? (
            <p>Loading exams...</p>
          ) : mockTests.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '12px' }}>
              <p style={{ color: '#666' }}>No practice tests available yet.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {mockTests.map(test => (
                <div key={test.id} style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                  border: '1px solid #eee',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  minHeight: '200px'
                }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: '#4f46e5',
                        background: '#e0e7ff',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        textTransform: 'uppercase'
                      }}>
                        MCQ
                      </span>
                      <span style={{ fontSize: '0.8rem', color: '#999' }}>{test.questions?.length || 0} questions</span>
                    </div>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem', color: '#333' }}>{test.title}</h3>
                    <div style={{ display: 'flex', gap: '15px', color: '#666', fontSize: '0.9rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Clock size={14} /> {test.duration_minutes} Mins</span>
                    </div>
                    {test.description && <p style={{ fontSize: '0.85rem', color: '#888', marginTop: '10px' }}>{test.description}</p>}
                  </div>

                  <button
                    onClick={() => startExam(test)}
                    disabled={!test.questions || test.questions.length === 0}
                    style={{
                      marginTop: '1.5rem',
                      width: '100%',
                      padding: '10px',
                      background: test.questions && test.questions.length > 0 ? '#007bff' : '#ccc',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 600,
                      cursor: test.questions && test.questions.length > 0 ? 'pointer' : 'not-allowed',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'background 0.2s'
                    }}>
                    Start Test <ChevronRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
