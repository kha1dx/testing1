import React, { useState } from 'react';

// Mock data for student applications
const mockApplications = [
  {
    id: 1,
    internshipTitle: "Frontend Developer Intern",
    company: "Tech Solutions Inc.",
    companyLogo: "https://via.placeholder.com/50",
    industry: "Technology",
    duration: "3 months",
    paid: true,
    salary: "$1200/month",
    location: "New York, NY",
    applicationDate: "2025-04-20",
    status: "pending",
    documents: ["CV.pdf", "Cover Letter.pdf", "Certificate.pdf"]
  },
  {
    id: 2,
    internshipTitle: "Data Analyst Intern",
    company: "Financial Experts Corp",
    companyLogo: "https://via.placeholder.com/50",
    industry: "Finance",
    duration: "6 months",
    paid: true,
    salary: "$1500/month",
    location: "Chicago, IL",
    applicationDate: "2025-04-15",
    status: "finalized",
    documents: ["CV.pdf", "Cover Letter.pdf"]
  },
  {
    id: 3,
    internshipTitle: "Marketing Intern",
    company: "Global Education",
    companyLogo: "https://via.placeholder.com/50",
    industry: "Education",
    duration: "3 months",
    paid: false,
    salary: null,
    location: "Remote",
    applicationDate: "2025-04-10",
    status: "accepted",
    documents: ["CV.pdf", "Portfolio.pdf"]
  },
  {
    id: 4,
    internshipTitle: "UX Design Intern",
    company: "Tech Solutions Inc.",
    companyLogo: "https://via.placeholder.com/50",
    industry: "Technology",
    duration: "4 months",
    paid: true,
    salary: "$1300/month",
    location: "San Francisco, CA",
    applicationDate: "2025-04-05",
    status: "rejected",
    documents: ["CV.pdf", "Portfolio.pdf"]
  }
];

const ApplicationsList = () => {
  const [applications, setApplications] = useState(mockApplications);
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
      application.internshipTitle.toLowerCase().includes(searchTerm.toLowerCase()) || 
      application.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === '' || application.status === statusFilter;
    
    return matchesSearch && matchesStatus;
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

  // Status description
  const getStatusDescription = (status) => {
    switch (status) {
      case 'pending':
        return 'Your application has been submitted and is waiting to be reviewed by the company.';
      case 'finalized':
        return 'Your application has been reviewed and you are being considered as one of the top candidates.';
      case 'accepted':
        return 'Congratulations! Your application has been accepted. The company will contact you with further details.';
      case 'rejected':
        return 'Unfortunately, your application was not selected for this position.';
      default:
        return '';
    }
  };

  return (
    <div className="container">
      <h1>My Applications</h1>
      
      {/* Search and Filter Section */}
      <div className="card">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label htmlFor="search">Search by job title or company</label>
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
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ flexShrink: 0 }}>
                  <img 
                    src={application.companyLogo} 
                    alt={`${application.company} logo`} 
                    style={{ width: '50px', height: '50px', borderRadius: '4px' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ marginBottom: '0.25rem' }}>{application.internshipTitle}</h3>
                    {getStatusBadge(application.status)}
                  </div>
                  <p style={{ marginBottom: '0.25rem' }}>{application.company}</p>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <span><strong>Industry:</strong> {application.industry}</span>
                    <span><strong>Duration:</strong> {application.duration}</span>
                    <span><strong>Applied:</strong> {application.applicationDate}</span>
                  </div>
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
                <h2>{selectedApplication.internshipTitle}</h2>
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
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
              <img 
                src={selectedApplication.companyLogo} 
                alt={`${selectedApplication.company} logo`} 
                style={{ width: '80px', height: '80px', borderRadius: '4px' }}
              />
              <div>
                <h3>{selectedApplication.company}</h3>
                <p>{selectedApplication.location}</p>
              </div>
            </div>
            
            <div className="card" style={{ marginBottom: '1rem', backgroundColor: selectedApplication.status === 'accepted' ? '#f0fff4' : selectedApplication.status === 'rejected' ? '#fff0f0' : '#fef9e7' }}>
              <h3>Application Status</h3>
              <p>{getStatusDescription(selectedApplication.status)}</p>
            </div>
            
            <div className="card" style={{ marginBottom: '1rem' }}>
              <h3>Internship Details</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <p><strong>Industry:</strong> {selectedApplication.industry}</p>
                  <p><strong>Duration:</strong> {selectedApplication.duration}</p>
                </div>
                <div>
                  <p><strong>Compensation:</strong> {selectedApplication.paid ? 'Paid' : 'Unpaid'}</p>
                  {selectedApplication.paid && (
                    <p><strong>Salary:</strong> {selectedApplication.salary}</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="card" style={{ marginBottom: '1rem' }}>
              <h3>Application Details</h3>
              <p><strong>Date Applied:</strong> {selectedApplication.applicationDate}</p>
              <div>
                <h4 style={{ marginTop: '1rem' }}>Submitted Documents</h4>
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
            </div>
            
            {selectedApplication.status === 'accepted' && (
              <div className="card" style={{ marginBottom: '1rem', backgroundColor: '#f0fff4' }}>
                <h3>Next Steps</h3>
                <p>Please wait for the company to contact you with further instructions and start date information.</p>
                <p>Once you begin your internship, you'll be able to track your progress and submit reports through the system.</p>
              </div>
            )}
            
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button className="btn-secondary" onClick={closeApplicationDetails}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationsList;