import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../App';
import InternshipApplication from '../../student/InternshipApplication/InternshipApplication';

// Mock data for internships
const mockInternships = [
  {
    id: 1,
    company: "Tech Solutions Inc.",
    companyLogo: "https://via.placeholder.com/50",
    title: "Frontend Developer Intern",
    industry: "Technology",
    duration: "3 months",
    paid: true,
    salary: "$1200/month",
    location: "New York, NY",
    skills: ["JavaScript", "React", "HTML", "CSS"],
    description: "Join our development team to create responsive web applications using modern JavaScript frameworks."
  },
  {
    id: 2,
    company: "Financial Experts Corp",
    companyLogo: "https://via.placeholder.com/50",
    title: "Financial Analyst Intern",
    industry: "Finance",
    duration: "6 months",
    paid: true,
    salary: "$1500/month",
    location: "Chicago, IL",
    skills: ["Excel", "Financial Modeling", "Data Analysis"],
    description: "Assist in financial analysis, creating reports, and financial modeling for clients."
  },
  {
    id: 3,
    company: "Green Health",
    companyLogo: "https://via.placeholder.com/50",
    title: "Healthcare Administration Intern",
    industry: "Healthcare",
    duration: "4 months",
    paid: false,
    salary: null,
    location: "Boston, MA",
    skills: ["Organization", "Communication", "MS Office"],
    description: "Learn about healthcare administration by assisting with daily operations and patient management."
  },
  {
    id: 4,
    company: "Global Education",
    companyLogo: "https://via.placeholder.com/50",
    title: "Education Research Intern",
    industry: "Education",
    duration: "3 months",
    paid: false,
    salary: null,
    location: "Remote",
    skills: ["Research", "Writing", "Analysis"],
    description: "Support research projects focused on improving educational outcomes for disadvantaged communities."
  },
  {
    id: 5,
    company: "Tech Solutions Inc.",
    companyLogo: "https://via.placeholder.com/50",
    title: "Backend Developer Intern",
    industry: "Technology",
    duration: "4 months",
    paid: true,
    salary: "$1300/month",
    location: "San Francisco, CA",
    skills: ["Node.js", "Express", "MongoDB", "API Development"],
    description: "Work with our backend team to develop and maintain APIs and server-side applications."
  }
];

const InternshipListing = () => {
  const { user } = useContext(AuthContext);
  const [internships, setInternships] = useState(mockInternships);
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [durationFilter, setDurationFilter] = useState('');
  const [paidFilter, setPaidFilter] = useState('');
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  // Handle search and filters
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = 
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      internship.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesIndustry = 
      industryFilter === '' || internship.industry === industryFilter;
    
    const matchesDuration = 
      durationFilter === '' || 
      (durationFilter === '3 months or less' && parseInt(internship.duration) <= 3) ||
      (durationFilter === '3-6 months' && parseInt(internship.duration) > 3 && parseInt(internship.duration) <= 6) ||
      (durationFilter === 'Over 6 months' && parseInt(internship.duration) > 6);
    
    const matchesPaid = 
      paidFilter === '' || 
      (paidFilter === 'Paid' && internship.paid) ||
      (paidFilter === 'Unpaid' && !internship.paid);
    
    return matchesSearch && matchesIndustry && matchesDuration && matchesPaid;
  });

  const handleInternshipClick = (internship) => {
    setSelectedInternship(internship);
  };

  const closeInternshipDetails = () => {
    setSelectedInternship(null);
  };

  const handleApplyNow = () => {
    setShowApplicationForm(true);
  };

  const closeApplicationForm = () => {
    setShowApplicationForm(false);
  };

  const isStudent = user && (user.role === 'student' || user.role === 'proStudent');

  return (
    <div className="container">
      <h1>Available Internships</h1>
      
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
            <label htmlFor="industry">Filter by Industry</label>
            <select 
              id="industry" 
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
            >
              <option value="">All Industries</option>
              <option value="Technology">Technology</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Retail">Retail</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="duration">Filter by Duration</label>
            <select 
              id="duration" 
              value={durationFilter}
              onChange={(e) => setDurationFilter(e.target.value)}
            >
              <option value="">All Durations</option>
              <option value="3 months or less">3 months or less</option>
              <option value="3-6 months">3-6 months</option>
              <option value="Over 6 months">Over 6 months</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="paid">Filter by Compensation</label>
            <select 
              id="paid" 
              value={paidFilter}
              onChange={(e) => setPaidFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
            </select>
          </div>
        </div>
        
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <button onClick={() => {
            setSearchTerm('');
            setIndustryFilter('');
            setDurationFilter('');
            setPaidFilter('');
          }}>
            Clear Filters
          </button>
        </div>
      </div>
      
      {/* Internship List */}
      <div style={{ marginTop: '2rem' }}>
        {filteredInternships.length === 0 ? (
          <div className="card text-center">
            <p>No internships match your search criteria.</p>
          </div>
        ) : (
          filteredInternships.map(internship => (
            <div 
              key={internship.id} 
              className="card" 
              style={{ cursor: 'pointer' }}
              onClick={() => handleInternshipClick(internship)}
            >
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ flexShrink: 0 }}>
                  <img 
                    src={internship.companyLogo} 
                    alt={`${internship.company} logo`} 
                    style={{ width: '50px', height: '50px', borderRadius: '4px' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: '0.25rem' }}>{internship.title}</h3>
                  <p style={{ marginBottom: '0.25rem' }}>{internship.company}</p>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <span><strong>Industry:</strong> {internship.industry}</span>
                    <span><strong>Duration:</strong> {internship.duration}</span>
                    <span><strong>Compensation:</strong> {internship.paid ? 'Paid' : 'Unpaid'}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Internship Details Modal */}
      {selectedInternship && !showApplicationForm && (
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
              <h2>{selectedInternship.title}</h2>
              <button 
                onClick={closeInternshipDetails}
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
                src={selectedInternship.companyLogo} 
                alt={`${selectedInternship.company} logo`} 
                style={{ width: '80px', height: '80px', borderRadius: '4px' }}
              />
              <div>
                <h3>{selectedInternship.company}</h3>
                <p>{selectedInternship.location}</p>
              </div>
            </div>
            
            <div className="card" style={{ marginBottom: '1rem' }}>
              <h3>Internship Details</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <p><strong>Industry:</strong> {selectedInternship.industry}</p>
                  <p><strong>Duration:</strong> {selectedInternship.duration}</p>
                </div>
                <div>
                  <p><strong>Compensation:</strong> {selectedInternship.paid ? 'Paid' : 'Unpaid'}</p>
                  {selectedInternship.paid && (
                    <p><strong>Salary:</strong> {selectedInternship.salary}</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="card" style={{ marginBottom: '1rem' }}>
              <h3>Job Description</h3>
              <p>{selectedInternship.description}</p>
            </div>
            
            <div className="card" style={{ marginBottom: '1rem' }}>
              <h3>Required Skills</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {selectedInternship.skills.map((skill, index) => (
                  <span 
                    key={index}
                    style={{
                      backgroundColor: 'var(--light-color)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.875rem'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              {isStudent ? (
                <button className="btn-primary" onClick={handleApplyNow}>Apply Now</button>
              ) : (
                <button className="btn-primary" disabled title="You must be logged in as a student to apply">Apply Now</button>
              )}
              <button className="btn-secondary" onClick={closeInternshipDetails}>Close</button>
            </div>
          </div>
        </div>
      )}
      
      {/* Application Form Modal */}
      {selectedInternship && showApplicationForm && (
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
            <InternshipApplication 
              internship={selectedInternship} 
              onClose={() => {
                closeApplicationForm();
                closeInternshipDetails();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default InternshipListing;