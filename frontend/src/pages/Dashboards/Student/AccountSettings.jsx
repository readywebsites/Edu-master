// src/pages/Dashboards/Student/AccountSettings.jsx
import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, BookOpen, Bell, Globe, Save, Camera } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export default function AccountSettings() {
  const { user } = useAuth();

  // Personal Information
  const [personalInfo, setPersonalInfo] = useState({
    firstName: user?.username?.split(' ')[0] || '',
    lastName: user?.username?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  // Academic Information
  const [academicInfo, setAcademicInfo] = useState({
    studentId: 'STU' + Math.floor(Math.random() * 100000),
    enrollmentYear: '2024',
    program: 'B.Tech Computer Science',
    semester: '5th Semester',
    rollNumber: ''
  });

  // Preferences
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    assignmentReminders: true,
    examAlerts: true,
    discussionUpdates: false,
    language: 'en',
    timezone: 'Asia/Kolkata'
  });

  const [activeTab, setActiveTab] = useState('personal');
  const [saveMessage, setSaveMessage] = useState('');

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo({ ...personalInfo, [field]: value });
  };

  const handleAcademicInfoChange = (field, value) => {
    setAcademicInfo({ ...academicInfo, [field]: value });
  };

  const handlePreferenceChange = (field, value) => {
    setPreferences({ ...preferences, [field]: value });
  };

  const handleSave = () => {
    // TODO: Implement API call to save settings
    setSaveMessage('Settings saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <div className="fade-in">
      <h1 style={{ marginBottom: '1.5rem' }}>Account Settings</h1>

      {/* Profile Header */}
      <div style={{ background: 'white', padding: '2rem', borderRadius: '10px', marginBottom: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              fontWeight: 'bold'
            }}>
              {user?.username?.[0]?.toUpperCase() || 'S'}
            </div>
            <button style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              background: '#009ef7',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}>
              <Camera size={16} />
            </button>
          </div>
          <div>
            <h2 style={{ margin: 0 }}>{user?.username || 'Student Name'}</h2>
            <p style={{ margin: '0.25rem 0', color: '#6c757d' }}>{academicInfo.studentId}</p>
            <p style={{ margin: '0.25rem 0', color: '#6c757d' }}>{academicInfo.program}</p>
            <span style={{
              display: 'inline-block',
              marginTop: '0.5rem',
              padding: '0.25rem 0.75rem',
              background: '#e8fff3',
              color: '#00a35c',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: 500
            }}>
              Active Student
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', borderBottom: '2px solid #f5f8fa', padding: '0 1rem' }}>
          {[
            { id: 'personal', label: 'Personal Information', icon: <User size={18} /> },
            { id: 'academic', label: 'Academic Details', icon: <BookOpen size={18} /> },
            { id: 'preferences', label: 'Preferences', icon: <Bell size={18} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '1rem 1.5rem',
                background: 'none',
                border: 'none',
                borderBottom: activeTab === tab.id ? '3px solid #009ef7' : '3px solid transparent',
                color: activeTab === tab.id ? '#009ef7' : '#6c757d',
                fontWeight: activeTab === tab.id ? 600 : 400,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ padding: '2rem' }}>
          {/* Personal Information Tab */}
          {activeTab === 'personal' && (
            <div>
              <h3 style={{ marginTop: 0 }}>Personal Information</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>
                    <User size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                    First Name
                  </label>
                  <input
                    type="text"
                    value={personalInfo.firstName}
                    onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.95rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>
                    <User size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={personalInfo.lastName}
                    onChange={(e) => handlePersonalInfoChange('lastName', e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.95rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>
                    <Mail size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.95rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>
                    <Phone size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={personalInfo.phone}
                    onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.95rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>
                    <Calendar size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={personalInfo.dateOfBirth}
                    onChange={(e) => handlePersonalInfoChange('dateOfBirth', e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.95rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>Gender</label>
                  <select
                    value={personalInfo.gender}
                    onChange={(e) => handlePersonalInfoChange('gender', e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.95rem' }}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>
                    <MapPin size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                    Address
                  </label>
                  <input
                    type="text"
                    value={personalInfo.address}
                    onChange={(e) => handlePersonalInfoChange('address', e.target.value)}
                    placeholder="Street Address"
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.95rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>City</label>
                  <input
                    type="text"
                    value={personalInfo.city}
                    onChange={(e) => handlePersonalInfoChange('city', e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.95rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>State</label>
                  <input
                    type="text"
                    value={personalInfo.state}
                    onChange={(e) => handlePersonalInfoChange('state', e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.95rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>ZIP Code</label>
                  <input
                    type="text"
                    value={personalInfo.zipCode}
                    onChange={(e) => handlePersonalInfoChange('zipCode', e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.95rem' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Academic Details Tab */}
          {activeTab === 'academic' && (
            <div>
              <h3 style={{ marginTop: 0 }}>Academic Information</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>Student ID</label>
                  <input
                    type="text"
                    value={academicInfo.studentId}
                    disabled
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.95rem', background: '#f5f8fa', color: '#6c757d' }}
                  />
                  <small style={{ color: '#6c757d', fontSize: '0.8rem' }}>This field cannot be edited</small>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>Roll Number</label>
                  <input
                    type="text"
                    value={academicInfo.rollNumber}
                    onChange={(e) => handleAcademicInfoChange('rollNumber', e.target.value)}
                    placeholder="Enter your roll number"
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.95rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>Program</label>
                  <select
                    value={academicInfo.program}
                    onChange={(e) => handleAcademicInfoChange('program', e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.95rem' }}
                  >
                    <option value="B.Tech Computer Science">B.Tech Computer Science</option>
                    <option value="B.Tech Mechanical">B.Tech Mechanical</option>
                    <option value="B.Tech Electrical">B.Tech Electrical</option>
                    <option value="MBA">MBA</option>
                    <option value="MCA">MCA</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>Current Semester</label>
                  <select
                    value={academicInfo.semester}
                    onChange={(e) => handleAcademicInfoChange('semester', e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.95rem' }}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                      <option key={sem} value={`${sem}th Semester`}>{sem}th Semester</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>Enrollment Year</label>
                  <select
                    value={academicInfo.enrollmentYear}
                    onChange={(e) => handleAcademicInfoChange('enrollmentYear', e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.95rem' }}
                  >
                    {[2024, 2023, 2022, 2021, 2020].map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ marginTop: '2rem', padding: '1rem', background: '#f1faff', borderRadius: '8px', borderLeft: '4px solid #009ef7' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#009ef7' }}>Academic Performance Summary</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#6c757d' }}>Current CGPA</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#009ef7' }}>8.5</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#6c757d' }}>Courses Enrolled</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#009ef7' }}>6</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#6c757d' }}>Credits Earned</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#009ef7' }}>120</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div>
              <h3 style={{ marginTop: 0 }}>Notification Preferences</h3>
              <div style={{ marginBottom: '2rem' }}>
                {[
                  { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates via email' },
                  { key: 'assignmentReminders', label: 'Assignment Reminders', desc: 'Get notified about upcoming assignment deadlines' },
                  { key: 'examAlerts', label: 'Exam Alerts', desc: 'Receive notifications about exam schedules' },
                  { key: 'discussionUpdates', label: 'Discussion Updates', desc: 'Get updates when someone replies to your discussions' }
                ].map(pref => (
                  <div key={pref.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid #f5f8fa' }}>
                    <div>
                      <div style={{ fontWeight: 500 }}>{pref.label}</div>
                      <div style={{ fontSize: '0.85rem', color: '#6c757d' }}>{pref.desc}</div>
                    </div>
                    <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
                      <input
                        type="checkbox"
                        checked={preferences[pref.key]}
                        onChange={(e) => handlePreferenceChange(pref.key, e.target.checked)}
                        style={{ opacity: 0, width: 0, height: 0 }}
                      />
                      <span style={{
                        position: 'absolute',
                        cursor: 'pointer',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: preferences[pref.key] ? '#009ef7' : '#ccc',
                        transition: '0.3s',
                        borderRadius: '24px'
                      }}>
                        <span style={{
                          position: 'absolute',
                          content: '""',
                          height: '18px',
                          width: '18px',
                          left: preferences[pref.key] ? '28px' : '3px',
                          bottom: '3px',
                          background: 'white',
                          transition: '0.3s',
                          borderRadius: '50%'
                        }} />
                      </span>
                    </label>
                  </div>
                ))}
              </div>

              <h3>Regional Settings</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>
                    <Globe size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                    Language
                  </label>
                  <select
                    value={preferences.language}
                    onChange={(e) => handlePreferenceChange('language', e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.95rem' }}
                  >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="mr">Marathi</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>Timezone</label>
                  <select
                    value={preferences.timezone}
                    onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.95rem' }}
                  >
                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    <option value="America/New_York">America/New York (EST)</option>
                    <option value="Europe/London">Europe/London (GMT)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #f5f8fa', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {saveMessage && (
              <div style={{ color: '#00a35c', fontWeight: 500 }}>
                ✓ {saveMessage}
              </div>
            )}
            <button
              onClick={handleSave}
              style={{
                marginLeft: 'auto',
                padding: '0.75rem 2rem',
                background: '#009ef7',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '1rem',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
