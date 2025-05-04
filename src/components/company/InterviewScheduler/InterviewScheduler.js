// filepath: /Users/omaric/Desktop/GUC/SE_Mil2/scad-system/src/components/company/InterviewScheduler/InterviewScheduler.js
import React, { useState } from 'react';

// Mock data for finalized applications
const mockApplications = [
  {
    id: 101,
    studentName: "Alex Johnson",
    studentEmail: "alex.johnson@university.edu",
    studentPhone: "555-123-4567",
    studentImage: "https://via.placeholder.com/50",
    internshipTitle: "Frontend Developer Intern",
    applicationDate: "2025-04-15",
    status: "finalized",
    resumeUrl: "/documents/alex_johnson_resume.pdf"
  },
  {
    id: 102,
    studentName: "Taylor Smith",
    studentEmail: "taylor.smith@university.edu",
    studentPhone: "555-987-6543",
    studentImage: "https://via.placeholder.com/50",
    internshipTitle: "Data Analyst Intern",
    applicationDate: "2025-04-12",
    status: "finalized",
    resumeUrl: "/documents/taylor_smith_resume.pdf"
  },
  {
    id: 103,
    studentName: "Jordan Lee",
    studentEmail: "jordan.lee@university.edu",
    studentPhone: "555-456-7890",
    studentImage: "https://via.placeholder.com/50",
    internshipTitle: "Backend Developer Intern",
    applicationDate: "2025-04-10",
    status: "interview_scheduled",
    resumeUrl: "/documents/jordan_lee_resume.pdf",
    interviewDate: "2025-05-15T14:00:00",
    interviewType: "video",
    interviewNotes: "Focus on system design and API development experience"
  },
  {
    id: 104,
    studentName: "Casey Rivera",
    studentEmail: "casey.rivera@university.edu",
    studentPhone: "555-789-0123",
    studentImage: "https://via.placeholder.com/50",
    internshipTitle: "UX Design Intern",
    applicationDate: "2025-04-08",
    status: "interview_scheduled",
    resumeUrl: "/documents/casey_rivera_resume.pdf",
    interviewDate: "2025-05-10T10:30:00",
    interviewType: "in_person",
    interviewLocation: "Company HQ, Room 304",
    interviewNotes: "Bring portfolio. Will discuss recent projects."
  }
];

const InterviewScheduler = () => {
  const [applications, setApplications] = useState(mockApplications);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isSchedulingModalOpen, setIsSchedulingModalOpen] = useState(false);
  const [interviewForm, setInterviewForm] = useState({
    date: '',
    time: '',
    type: 'video',
    location: '',
    notes: ''
  });

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter applications
  const filteredApplications = applications.filter(application => {
    const matchesSearch = 
      application.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      application.internshipTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === '' || application.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Select application for scheduling
  const handleSelectApplication = (application) => {
    setSelectedApplication(application);
    setIsSchedulingModalOpen(true);
    
    // If interview is already scheduled, populate form with existing data
    if (application.status === 'interview_scheduled' && application.interviewDate) {
      const dateTime = new Date(application.interviewDate);
      
      setInterviewForm({
        date: dateTime.toISOString().split('T')[0],
        time: dateTime.toTimeString().slice(0, 5),
        type: application.interviewType || 'video',
        location: application.interviewLocation || '',
        notes: application.interviewNotes || ''
      });
    } else {
      // Reset form for new scheduling
      setInterviewForm({
        date: '',
        time: '',
        type: 'video',
        location: '',
        notes: ''
      });
    }
  };

  // Update interview form
  const handleInterviewFormChange = (e) => {
    const { name, value } = e.target;
    setInterviewForm({
      ...interviewForm,
      [name]: value
    });
  };

  // Schedule interview
  const handleScheduleInterview = () => {
    // Create ISO date-time string
    const dateTimeString = `${interviewForm.date}T${interviewForm.time}:00`;
    
    // Update application with interview details
    const updatedApplications = applications.map(app => {
      if (app.id === selectedApplication.id) {
        return {
          ...app,
          status: 'interview_scheduled',
          interviewDate: dateTimeString,
          interviewType: interviewForm.type,
          interviewLocation: interviewForm.location,
          interviewNotes: interviewForm.notes
        };
      }
      return app;
    });
    
    setApplications(updatedApplications);
    setIsSchedulingModalOpen(false);
    setSelectedApplication(null);
    
    // In a real application, you would make an API call here to update the backend
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get status badge
  const getStatusBadge = (status) => {
    let color;
    let text;
    
    switch (status) {
      case 'finalized':
        color = 'var(--info-color)';
        text = 'Finalized';
        break;
      case 'interview_scheduled':
        color = 'var(--primary-color)';
        text = 'Interview Scheduled';
        break;
      default:
        color = 'var(--gray-color)';
        text = status.charAt(0).toUpperCase() + status.slice(1);
    }
    
    return (
      <span style={{
        backgroundColor: color,
        color: 'white',
        padding: '0.25rem 0.5rem',
        borderRadius: 'var(--border-radius-sm)',
        fontSize: 'var(--font-sm)',
        fontWeight: '500'
      }}>
        {text}
      </span>
    );
  };

  return (
    <div className="container">
      <h1>Interview Scheduler</h1>
      <p>Schedule interviews with candidates who have reached the finalized stage in the application process.</p>
      
      {/* Search and Filter Section */}
      <div className="card">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label htmlFor="search">Search by candidate or position</label>
            <input 
              type="text" 
              id="search" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          
          <div>
            <label htmlFor="status">Filter by Status</label>
            <select 
              id="status" 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="finalized">Finalized</option>
              <option value="interview_scheduled">Interview Scheduled</option>
            </select>
          </div>
        </div>
        
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <button onClick={() => {
            setSearchTerm('');
            setStatusFilter('');
          }}>
            Clear Filters
          </button>
        </div>
      </div>
      
      {/* Applications List */}
      <div style={{ marginTop: '2rem' }}>
        {filteredApplications.length === 0 ? (
          <div className="card text-center">
            <p>No applications match your search criteria.</p>
          </div>
        ) : (
          filteredApplications.map(application => (
            <div 
              key={application.id} 
              className="card" 
              style={{ marginBottom: '1rem' }}
            >
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ flexShrink: 0 }}>
                  <img 
                    src={application.studentImage} 
                    alt={`${application.studentName}`} 
                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ marginBottom: '0.25rem' }}>{application.studentName}</h3>
                    {getStatusBadge(application.status)}
                  </div>
                  <p style={{ marginBottom: '0.25rem' }}><strong>Position:</strong> {application.internshipTitle}</p>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <span><strong>Email:</strong> {application.studentEmail}</span>
                    <span><strong>Applied:</strong> {application.applicationDate}</span>
                  </div>
                  
                  {application.status === 'interview_scheduled' && (
                    <div style={{ 
                      marginTop: '0.5rem', 
                      padding: '0.5rem', 
                      backgroundColor: 'rgba(var(--primary-rgb), 0.1)',
                      borderRadius: 'var(--border-radius-sm)'
                    }}>
                      <p><strong>Interview:</strong> {formatDate(application.interviewDate)}</p>
                      <p><strong>Type:</strong> {application.interviewType === 'video' ? 'Video Call' : 'In Person'}</p>
                      {application.interviewType === 'in_person' && (
                        <p><strong>Location:</strong> {application.interviewLocation}</p>
                      )}
                    </div>
                  )}
                </div>
                <div>
                  <button 
                    className="btn-primary"
                    onClick={() => handleSelectApplication(application)}
                  >
                    {application.status === 'interview_scheduled' ? 'Reschedule' : 'Schedule Interview'}
                  </button>
                  <a href={application.resumeUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: '0.5rem' }}>
                    View Resume
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Interview Scheduling Modal */}
      {isSchedulingModalOpen && selectedApplication && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '2rem',
            maxWidth: '600px',
            width: '90%'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2>Schedule Interview</h2>
              <button 
                onClick={() => setIsSchedulingModalOpen(false)}
                style={{ 
                  backgroundColor: 'transparent', 
                  color: 'var(--text-primary)',
                  fontSize: '1.5rem',
                  padding: '0.25rem 0.5rem'
                }}
              >
                &times;
              </button>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <p><strong>Candidate:</strong> {selectedApplication.studentName}</p>
              <p><strong>Position:</strong> {selectedApplication.internshipTitle}</p>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              handleScheduleInterview();
            }}>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="date">Interview Date</label>
                <input 
                  type="date" 
                  id="date" 
                  name="date"
                  value={interviewForm.date}
                  onChange={handleInterviewFormChange}
                  required
                />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="time">Interview Time</label>
                <input 
                  type="time" 
                  id="time" 
                  name="time"
                  value={interviewForm.time}
                  onChange={handleInterviewFormChange}
                  required
                />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="type">Interview Type</label>
                <select 
                  id="type" 
                  name="type"
                  value={interviewForm.type}
                  onChange={handleInterviewFormChange}
                  required
                >
                  <option value="video">Video Interview</option>
                  <option value="in_person">In-Person Interview</option>
                </select>
              </div>
              
              {interviewForm.type === 'in_person' && (
                <div style={{ marginBottom: '1rem' }}>
                  <label htmlFor="location">Interview Location</label>
                  <input 
                    type="text" 
                    id="location" 
                    name="location"
                    placeholder="e.g., Company HQ, Room 304"
                    value={interviewForm.location}
                    onChange={handleInterviewFormChange}
                    required
                  />
                </div>
              )}
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="notes">Interview Notes (Optional)</label>
                <textarea 
                  id="notes" 
                  name="notes"
                  placeholder="Additional notes or instructions for the candidate"
                  value={interviewForm.notes}
                  onChange={handleInterviewFormChange}
                  rows={4}
                />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setIsSchedulingModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary"
                >
                  {selectedApplication.status === 'interview_scheduled' ? 'Update Interview' : 'Schedule Interview'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewScheduler;