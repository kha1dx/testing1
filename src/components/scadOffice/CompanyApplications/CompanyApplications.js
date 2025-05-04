import React, { useState } from 'react';

// Mock data for company applications
const mockCompanies = [
  {
    id: 1,
    name: 'Tech Solutions Inc.',
    industry: 'Technology',
    size: 'medium',
    email: 'hr@techsolutions.com',
    logo: 'https://via.placeholder.com/100',
    status: 'pending',
    documents: ['tax_doc.pdf', 'business_license.pdf'],
    applicationDate: '2025-04-15'
  },
  {
    id: 2,
    name: 'Financial Experts Corp',
    industry: 'Finance',
    size: 'large',
    email: 'careers@financialexperts.com',
    logo: 'https://via.placeholder.com/100',
    status: 'pending',
    documents: ['tax_doc.pdf', 'business_registration.pdf'],
    applicationDate: '2025-04-18'
  },
  {
    id: 3,
    name: 'Green Health',
    industry: 'Healthcare',
    size: 'small',
    email: 'jobs@greenhealth.org',
    logo: 'https://via.placeholder.com/100',
    status: 'pending',
    documents: ['tax_doc.pdf', 'medical_license.pdf'],
    applicationDate: '2025-04-20'
  },
  {
    id: 4,
    name: 'Global Education',
    industry: 'Education',
    size: 'small',
    email: 'careers@globaledu.org',
    logo: 'https://via.placeholder.com/100',
    status: 'pending',
    documents: ['tax_doc.pdf', 'education_certification.pdf'],
    applicationDate: '2025-04-22'
  },
  {
    id: 5,
    name: 'Manufacturing Pro',
    industry: 'Manufacturing',
    size: 'corporate',
    email: 'recruiting@manufacturingpro.com',
    logo: 'https://via.placeholder.com/100',
    status: 'pending',
    documents: ['tax_doc.pdf', 'safety_certification.pdf'],
    applicationDate: '2025-04-25'
  }
];

const CompanyApplications = () => {
  const [companies, setCompanies] = useState(mockCompanies);
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter companies based on search and industry filter
  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = industryFilter === '' || company.industry === industryFilter;
    return matchesSearch && matchesIndustry;
  });

  // View company details
  const handleViewCompany = (company) => {
    setSelectedCompany(company);
  };

  // Close company details modal
  const closeCompanyDetails = () => {
    setSelectedCompany(null);
  };

  // Handle approve/reject company application
  const handleApplicationDecision = (companyId, decision) => {
    setCompanies(prevCompanies =>
      prevCompanies.map(company =>
        company.id === companyId ? { ...company, status: decision } : company
      )
    );
    
    // Close the modal after decision
    setSelectedCompany(null);
    
    // In a real application, you would also send this decision to the backend
    // and potentially trigger an email notification to the company
    console.log(`Company ${companyId} application ${decision}`);
  };

  return (
    <div className="container">
      <h1>Company Applications</h1>
      
      {/* Search and Filter Section */}
      <div className="card">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label htmlFor="search">Search by company name</label>
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
        </div>
        
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <button onClick={() => {
            setSearchTerm('');
            setIndustryFilter('');
          }}>
            Clear Filters
          </button>
        </div>
      </div>
      
      {/* Company List */}
      <div style={{ marginTop: '2rem' }}>
        {filteredCompanies.length === 0 ? (
          <div className="card text-center">
            <p>No company applications match your search criteria.</p>
          </div>
        ) : (
          filteredCompanies.map(company => (
            <div 
              key={company.id} 
              className="card" 
              style={{ cursor: 'pointer' }}
              onClick={() => handleViewCompany(company)}
            >
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ flexShrink: 0 }}>
                  <img 
                    src={company.logo} 
                    alt={`${company.name} logo`} 
                    style={{ width: '60px', height: '60px', borderRadius: '4px' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: '0.25rem' }}>{company.name}</h3>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <span><strong>Industry:</strong> {company.industry}</span>
                    <span><strong>Size:</strong> {company.size}</span>
                    <span><strong>Applied:</strong> {company.applicationDate}</span>
                    <span>
                      <strong>Status:</strong>{' '}
                      <span style={{
                        color: company.status === 'approved' ? 'var(--success-color)' : 
                              company.status === 'rejected' ? 'var(--danger-color)' : 
                              'var(--warning-color)'
                      }}>
                        {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Company Details Modal */}
      {selectedCompany && (
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
              <h2>{selectedCompany.name}</h2>
              <button 
                onClick={closeCompanyDetails}
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
                src={selectedCompany.logo} 
                alt={`${selectedCompany.name} logo`} 
                style={{ width: '100px', height: '100px', borderRadius: '4px' }}
              />
              <div>
                <h3>{selectedCompany.name}</h3>
                <p><strong>Email:</strong> {selectedCompany.email}</p>
              </div>
            </div>
            
            <div className="card" style={{ marginBottom: '1rem' }}>
              <h3>Company Details</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <p><strong>Industry:</strong> {selectedCompany.industry}</p>
                  <p><strong>Size:</strong> {
                    selectedCompany.size === 'small' ? 'Small (50 employees or less)' :
                    selectedCompany.size === 'medium' ? 'Medium (51-100 employees)' :
                    selectedCompany.size === 'large' ? 'Large (101-500 employees)' :
                    'Corporate (500+ employees)'
                  }</p>
                </div>
                <div>
                  <p><strong>Application Date:</strong> {selectedCompany.applicationDate}</p>
                  <p>
                    <strong>Status:</strong>{' '}
                    <span style={{
                      color: selectedCompany.status === 'approved' ? 'var(--success-color)' : 
                            selectedCompany.status === 'rejected' ? 'var(--danger-color)' : 
                            'var(--warning-color)'
                    }}>
                      {selectedCompany.status.charAt(0).toUpperCase() + selectedCompany.status.slice(1)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="card" style={{ marginBottom: '1rem' }}>
              <h3>Uploaded Documents</h3>
              <ul>
                {selectedCompany.documents.map((doc, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      {doc} <span style={{ color: 'var(--primary-color)' }}>(View)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {selectedCompany.status === 'pending' && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <button 
                  className="btn-success"
                  onClick={() => handleApplicationDecision(selectedCompany.id, 'approved')}
                >
                  Approve Application
                </button>
                <button 
                  className="btn-danger"
                  onClick={() => handleApplicationDecision(selectedCompany.id, 'rejected')}
                >
                  Reject Application
                </button>
                <button className="btn-secondary" onClick={closeCompanyDetails}>Close</button>
              </div>
            )}
            
            {selectedCompany.status !== 'pending' && (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button className="btn-secondary" onClick={closeCompanyDetails}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyApplications;