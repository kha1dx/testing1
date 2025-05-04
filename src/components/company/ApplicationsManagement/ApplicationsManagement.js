import React, { useState } from 'react';

// Mock data for student applications to company internships
const mockApplications = [
  {
    id: 1,
    jobId: 1,
    jobTitle: "Frontend Developer Intern",
    studentName: "Alex Johnson",
    studentEmail: "alex.johnson@university.edu",
    studentMajor: "Computer Science",
    studentYear: "3rd year",
    applicationDate: "2025-04-20",
    coverLetter: "Dear Hiring Manager, I am excited to apply for the Frontend Developer Intern position at Tech Solutions Inc. As a Computer Science student with strong skills in JavaScript and React, I believe I would be a great fit for your team...",
    status: "pending",
    documents: ["CV.pdf", "Cover Letter.pdf", "Certificate.pdf"]
  },
  {
    id: 2,
    jobId: 1,
    jobTitle: "Frontend Developer Intern",
    studentName: "Jamie Smith",
    studentEmail: "jamie.smith@university.edu",
    studentMajor: "Information Technology",
    studentYear: "4th year",
    applicationDate: "2025-04-19",
    coverLetter: "Hello, I am interested in the Frontend Developer position. I have been working with React for 2 years and have completed several personal projects...",
    status: "finalized",
    documents: ["CV.pdf", "Portfolio.pdf"]
  },
  {
    id: 3,
    jobId: 2,
    jobTitle: "Backend Developer Intern",
    studentName: "Taylor Morgan",
    studentEmail: "taylor.morgan@university.edu",
    studentMajor: "Computer Engineering",
    studentYear: "3rd year",
    applicationDate: "2025-04-18",
    coverLetter: "I am writing to express my interest in the Backend Developer Intern position. I have experience with Node.js and MongoDB through my coursework and personal projects...",
    status: "pending",
    documents: ["CV.pdf", "Cover Letter.pdf", "Project Links.pdf"]
  },
  {
    id: 4,
    jobId: 3,
    jobTitle: "UI/UX Design Intern",
    studentName: "Jordan Lee",
    studentEmail: "jordan.lee@university.edu",
    studentMajor: "Graphic Design",
    studentYear: "4th year",
    applicationDate: "2025-04-16",
    coverLetter: "As a Graphic Design student with a passion for UI/UX, I am excited to apply for the UI/UX Design Intern position. I have extensive experience with design tools like Figma and Adobe XD...",
    status: "pending",
    documents: ["CV.pdf", "Design Portfolio.pdf"]
  },
  {
    id: 5,
    jobId: 3,
    jobTitle: "UI/UX Design Intern",
    studentName: "Riley Cooper",
    studentEmail: "riley.cooper@university.edu",
    studentMajor: "Interactive Media",
    studentYear: "3rd year",
    applicationDate: "2025-04-15",
    coverLetter: "I believe my background in Interactive Media and my passion for creating intuitive user experiences makes me a strong candidate for the UI/UX Design Intern position...",
    status: "rejected",
    documents: ["CV.pdf", "Portfolio.pdf"]
  }
];

// Mock data for job posts
const mockJobPosts = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    applications: 2
  },
  {
    id: 2,
    title: "Backend Developer Intern",
    applications: 1
  },
  {
    id: 3,
    title: "UI/UX Design Intern",
    applications: 2
  }
];

const ApplicationsManagement = () => {
  const [applications, setApplications] = useState(mockApplications);
  const [jobPosts, setJobPosts] = useState(mockJobPosts);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplication, setSelectedApplication] = useState(null);

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter applications
  const filteredApplications = applications.filter(application => {
    const matchesSearch = 
      application.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      application.studentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.studentMajor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === '' || application.status === statusFilter;
    
    const matchesJob = 
      selectedJobId === null || application.jobId === selectedJobId;
    
    return matchesSearch && matchesStatus && matchesJob;
  });

  // View application details
  const handleViewApplication = (application) => {
    setSelectedApplication(application);
  };

  // Close application details modal
  const closeApplicationDetails = () => {
    setSelectedApplication(null);
  };

  // Status badge styling
  const getStatusBadge = (status) => {
    let color;
    let text;
    
    switch (status) {
      case 'pending':
        color = 'var(--warning-color)';
        text = 'Pending';
        break;
      case 'finalized':
        color = 'var(--info-color)';
        text = 'Finalized';
        break;
      case 'accepted':
        color = 'var(--success-color)';
        text = 'Accepted';
        break;
      case 'rejected':
        color = 'var(--danger-color)';
        text = 'Rejected';
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

  // Handle application status update
  const updateApplicationStatus = (applicationId, newStatus) => {
    setApplications(prevApplications => 
      prevApplications.map(app => 
        app.id === applicationId ? { ...app, status: newStatus } : app
      )
    );
    
    // Close the modal after updating status
    setSelectedApplication(null);
  };

  return (
    <div className="container">
      <h1>Manage Applications</h1>
      
      {/* Job Posts Selection */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3>Filter by Job Post</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
          <button 
            onClick={() => setSelectedJobId(null)}
            style={{ 
              backgroundColor: selectedJobId === null ? 'var(--primary-color)' : 'var(--light-color)',
              color: selectedJobId === null ? 'white' : 'var(--text-primary)',
              border: 'none',
              borderRadius: 'var(--border-radius-sm)',
              padding: '0.5rem 1rem',
              cursor: 'pointer'
            }}
          >
            All Jobs
          </button>
          {jobPosts.map(job => (
            <button 
              key={job.id}
              onClick={() => setSelectedJobId(job.id)}
              style={{ 
                backgroundColor: selectedJobId === job.id ? 'var(--primary-color)' : 'var(--light-color)',
                color: selectedJobId === job.id ? 'white' : 'var(--text-primary)',
                border: 'none',
                borderRadius: 'var(--border-radius-sm)',
                padding: '0.5rem 1rem',
                cursor: 'pointer'
              }}
            >
              {job.title} ({job.applications})
            </button>
          ))}
        </div>
      </div>
      
      {/* Search and Filter Section */}
      <div className="card">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label htmlFor="search">Search by student name, email, or major</label>
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
              <option value="pending">Pending</option>
              <option value="finalized">Finalized</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
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
              style={{ cursor: 'pointer' }}
              onClick={() => handleViewApplication(application)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <h3 style={{ margin: 0 }}>{application.studentName}</h3>
                    {getStatusBadge(application.status)}
                  </div>
                  <p style={{ marginBottom: '0.5rem' }}><strong>Position:</strong> {application.jobTitle}</p>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <span><strong>Major:</strong> {application.studentMajor}</span>
                    <span><strong>Year:</strong> {application.studentYear}</span>
                    <span><strong>Applied:</strong> {application.applicationDate}</span>
                  </div>
                </div>
                <div>
                  <a href={`mailto:${application.studentEmail}`} onClick={(e) => e.stopPropagation()} style={{ color: 'var(--primary-color)' }}>
                    {application.studentEmail}
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Application Details Modal */}
      {selectedApplication && (
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
            maxWidth: '800px',
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <h2>{selectedApplication.studentName}</h2>
                {getStatusBadge(selectedApplication.status)}
              </div>
              <button 
                onClick={closeApplicationDetails}
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
            
            <div className="card" style={{ marginBottom: '1rem' }}>
              <h3>Student Details</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <p><strong>Name:</strong> {selectedApplication.studentName}</p>
                  <p><strong>Email:</strong> <a href={`mailto:${selectedApplication.studentEmail}`} style={{ color: 'var(--primary-color)' }}>{selectedApplication.studentEmail}</a></p>
                </div>
                <div>
                  <p><strong>Major:</strong> {selectedApplication.studentMajor}</p>
                  <p><strong>Year:</strong> {selectedApplication.studentYear}</p>
                </div>
              </div>
            </div>
            
            <div className="card" style={{ marginBottom: '1rem' }}>
              <h3>Job Application</h3>
              <p><strong>Position:</strong> {selectedApplication.jobTitle}</p>
              <p><strong>Application Date:</strong> {selectedApplication.applicationDate}</p>
              <p><strong>Status:</strong> {getStatusBadge(selectedApplication.status)}</p>
            </div>
            
            <div className="card" style={{ marginBottom: '1rem' }}>
              <h3>Cover Letter</h3>
              <p style={{ whiteSpace: 'pre-line' }}>{selectedApplication.coverLetter}</p>
            </div>
            
            <div className="card" style={{ marginBottom: '1rem' }}>
              <h3>Submitted Documents</h3>
              <ul>
                {selectedApplication.documents.map((doc, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      {doc} <span style={{ color: 'var(--primary-color)' }}>(View)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="card" style={{ marginBottom: '1.5rem' }}>
              <h3>Update Application Status</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
                <button 
                  onClick={() => updateApplicationStatus(selectedApplication.id, 'pending')}
                  style={{ 
                    backgroundColor: 'var(--warning-color)',
                    color: 'white',
                    opacity: selectedApplication.status === 'pending' ? 1 : 0.6,
                    cursor: selectedApplication.status === 'pending' ? 'default' : 'pointer'
                  }}
                  disabled={selectedApplication.status === 'pending'}
                >
                  Mark as Pending
                </button>
                <button 
                  onClick={() => updateApplicationStatus(selectedApplication.id, 'finalized')}
                  style={{ 
                    backgroundColor: 'var(--info-color)',
                    color: 'white',
                    opacity: selectedApplication.status === 'finalized' ? 1 : 0.6,
                    cursor: selectedApplication.status === 'finalized' ? 'default' : 'pointer'
                  }}
                  disabled={selectedApplication.status === 'finalized'}
                >
                  Mark as Finalized
                </button>
                <button 
                  onClick={() => updateApplicationStatus(selectedApplication.id, 'accepted')}
                  style={{ 
                    backgroundColor: 'var(--success-color)',
                    color: 'white',
                    opacity: selectedApplication.status === 'accepted' ? 1 : 0.6,
                    cursor: selectedApplication.status === 'accepted' ? 'default' : 'pointer'
                  }}
                  disabled={selectedApplication.status === 'accepted'}
                >
                  Accept Application
                </button>
                <button 
                  onClick={() => updateApplicationStatus(selectedApplication.id, 'rejected')}
                  style={{ 
                    backgroundColor: 'var(--danger-color)',
                    color: 'white',
                    opacity: selectedApplication.status === 'rejected' ? 1 : 0.6,
                    cursor: selectedApplication.status === 'rejected' ? 'default' : 'pointer'
                  }}
                  disabled={selectedApplication.status === 'rejected'}
                >
                  Reject Application
                </button>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button className="btn-secondary" onClick={closeApplicationDetails}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationsManagement;