import React from 'react';
import {
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Download,
  CreditCard,
  CheckCircle,
  Clock,
  XCircle,
  Award,
  Users
} from 'lucide-react';

export default function Enrollment() {

  // MOCK DATA
  const student = {
    name: "John Doe",
    id: "CSE-2023-045",
    course: "B.Tech Computer Science",
    batch: "2023-2027",
    dob: "15 Aug 2004",
    bloodGroup: "O+",
    email: "john.doe@college.edu",
    phone: "+91 98765 43210",
    address: "123, Hostel Block A, University Campus, New Delhi",
    admissionDate: "01 July 2023",
    quota: "Merit Quota",
    guardian: {
      father: "Mr. Robert Doe",
      mother: "Mrs. Jane Doe",
      contact: "+91 98765 43211"
    }
  };

  const academicTimeline = [
    { year: '1st Year', session: '2023-2024', status: 'Passed', gpa: '8.5', result: 'Promoted' },
    { year: '2nd Year', session: '2024-2025', status: 'Current', gpa: 'Pending', result: 'In Progress' },
    { year: '3rd Year', session: '2025-2026', status: 'Upcoming', gpa: '-', result: '-' },
    { year: '4th Year', session: '2026-2027', status: 'Upcoming', gpa: '-', result: '-' },
  ];

  return (
    <div className="fade-in" style={{ paddingBottom: '3rem' }}>

      {/* HEADER */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', color: '#333', margin: '0 0 5px 0' }}>Personal Profile</h1>
        <p style={{ color: '#666', margin: 0 }}>Manage your digital ID, personal information and academic history.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', alignItems: 'start' }}>

        {/* LEFT COLUMN: DIGITAL ID */}
        <div>
          <h3 style={{ margin: '0 0 1rem 0', color: '#444', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CreditCard size={20} color="#007bff" /> Digital ID Card
          </h3>

          {/* ID CARD UI */}
          <div style={{
            background: 'linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%)',
            borderRadius: '16px',
            padding: '2rem',
            color: 'white',
            boxShadow: '0 10px 30px rgba(13, 110, 253, 0.3)',
            position: 'relative',
            overflow: 'hidden',
            aspectRatio: '1.6/1', // Standard ID Card Ratio
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            {/* Background Pattern */}
            <div style={{
              position: 'absolute',
              top: '-50%',
              right: '-20%',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              pointerEvents: 'none'
            }}></div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'white', padding: '2px' }}>
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Profile"
                    style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8 }}>University Student</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{student.name}</div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>{student.course}</div>
                </div>
              </div>
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ExampleID12345" alt="QR" style={{ width: '50px', height: '50px', borderRadius: '8px', background: 'white', padding: '2px' }} />
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', opacity: 0.7, textTransform: 'uppercase' }}>ID Number</div>
                  <div style={{ fontWeight: 600 }}>{student.id}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', opacity: 0.7, textTransform: 'uppercase' }}>Batch</div>
                  <div style={{ fontWeight: 600 }}>{student.batch}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', opacity: 0.7, textTransform: 'uppercase' }}>Blood Group</div>
                  <div style={{ fontWeight: 600 }}>{student.bloodGroup}</div>
                </div>
              </div>
              <div style={{ fontSize: '0.7rem', textAlign: 'center', opacity: 0.6, letterSpacing: '1px' }}>
                ISSUED BY UNIVERSITY AUTHORITY
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <button style={{
              background: 'white',
              border: '1px solid #ddd',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 500,
              color: '#555',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.9rem'
            }}>
              <Download size={16} /> Download ID Card
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: DETAILS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Personal Info Card */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
            <h3 style={{ margin: '0 0 1.2rem 0', fontSize: '1.1rem', color: '#444', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <User size={20} color="#28a745" /> Personal Details
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '4px' }}>Date of Birth</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500, color: '#333' }}>
                  <Calendar size={16} color="#007bff" /> {student.dob}
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '4px' }}>Email Address</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500, color: '#333' }}>
                  <Mail size={16} color="#fd7e14" /> {student.email}
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '4px' }}>Primary Contact</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500, color: '#333' }}>
                  <Phone size={16} color="#28a745" /> {student.phone}
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '4px' }}>Admission Date</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500, color: '#333' }}>
                  <Calendar size={16} color="#6610f2" /> {student.admissionDate}
                </div>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '4px' }}>Permanent Address</label>
                <div style={{ display: 'flex', alignItems: 'start', gap: '8px', fontWeight: 500, color: '#333', lineHeight: '1.5' }}>
                  <MapPin size={18} color="#dc3545" style={{ marginTop: '2px' }} /> {student.address}
                </div>
              </div>
            </div>
          </div>

          {/* Guardian Info Card */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
            <h3 style={{ margin: '0 0 1.2rem 0', fontSize: '1.1rem', color: '#444', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Users size={20} color="#6f42c1" /> Guardian Details
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '4px' }}>Father's Name</label>
                <div style={{ fontWeight: 500, color: '#333' }}>{student.guardian.father}</div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '4px' }}>Mother's Name</label>
                <div style={{ fontWeight: 500, color: '#333' }}>{student.guardian.mother}</div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '4px' }}>Emergency Contact</label>
                <div style={{ fontWeight: 500, color: '#333' }}>{student.guardian.contact}</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ACADEMIC TIMELINE */}
      <div style={{ marginTop: '2rem', padding: '2rem 0', borderTop: '1px solid #eee' }}>
        <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.2rem', color: '#444', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Award size={22} color="#fd7e14" /> Academic Progress Timeline
        </h3>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          padding: '0 20px',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          {/* Horizontal Line (Background) */}
          <div style={{
            position: 'absolute',
            top: '25px',
            left: '40px',
            right: '40px',
            height: '4px',
            background: '#e9ecef',
            zIndex: 0,
            display: 'none' // Hide on mobile/wrap, handle via CSS if complex. Basic here.
          }} className="timeline-line"></div>
          {/* Note: Proper horizontal line needs media queries for mobile stack. Keeping simple flex for stability. */}

          {academicTimeline.map((item, index) => (
            <div key={index} style={{
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              flex: 1,
              minWidth: '150px'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: item.status === 'Passed' ? '#d4edda' : item.status === 'Current' ? '#cff4fc' : '#f8f9fa',
                color: item.status === 'Passed' ? '#28a745' : item.status === 'Current' ? '#0dcaf0' : '#ccc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `3px solid ${item.status === 'Passed' ? '#28a745' : item.status === 'Current' ? '#0dcaf0' : '#eee'}`,
                marginBottom: '15px'
              }}>
                {item.status === 'Passed' ? <CheckCircle size={24} /> :
                  item.status === 'Current' ? <Clock size={24} /> :
                    <CheckCircle size={24} />}
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: item.status === 'Upcoming' ? '#999' : '#333' }}>{item.year}</div>
              <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '5px' }}>{item.session}</div>
              <div style={{
                fontSize: '0.8rem',
                padding: '2px 8px',
                borderRadius: '4px',
                background: item.status === 'Passed' ? '#d4edda' : item.status === 'Current' ? '#cff4fc' : '#e9ecef',
                color: item.status === 'Passed' ? '#155724' : item.status === 'Current' ? '#055160' : '#6c757d',
                fontWeight: 600
              }}>
                {item.status}
              </div>
              {item.status !== 'Upcoming' && (
                <div style={{ marginTop: '5px', fontSize: '0.8rem', fontWeight: 500 }}>GPA: {item.gpa}</div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
